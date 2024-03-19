---
displayed_sidebar: generalSidebar
---

# Conflux 共识层的设计与实现

Conflux 的共识层处理从同步层接收到的所有区块，根据 Conflux GHAST 共识算法产生区块的完整顺序，并调用底层的交易执行引擎以按确定的顺序运行交易。 它提供了必要的信息，以协助 **区块生成器** 准备新区块的骨架。 它还通知 **交易池(transaction pool)** 已处理好的交易，以便交易池可以做出更好的交易选择决策。

本文档旨在为想要了解 Conflux 共识层（位于目录core/src/consensus中）的 Rust 实现的读者提供高级概述。 对于更多的实现细节，请查看代码中的内联注释。 对于 Conflux 共识算法的更多信息，请参阅 Conflux 协议规范和 Conflux 论文（https\://arxiv.org/abs/1805.03870）。

## 设计目标

共识层有以下设计目标。

1. 在后台按照一致的共识算法处理新的区块

2. 我们希望最小化共识图中每个块的内存使用。
   即使有检查点机制，在正常情况下图中会包含 300K-500K 个块，在面对存活性攻击时可能会超过 1M 个块。 这可能会给内存带来压力。

3. 我们想要快速处理每个区块。 因为全节点/归档节点在从零开始同步网络时必须处理从_初始创世区块_开始的之后每一个区块，因此快速处理区块对于缩短所需时间是非常重要的。

4. 面对潜在攻击时具有稳健性。 恶意攻击者可能会在TreeGraph的任意位置生成恶意区块。

## 结构与组成部分。

### ConsensusGraph

`ConsensusGraph` (core/src/consensus/mod.rs) is the main struct of the
consensus layer. The synchronization layer constructs `ConsensusGraph` with a
`BlockDataManager` which stores all block metadata information on disk.
`ConsensusGraph::on_new_block()` is the key function to send new blocks to the
`ConsensusGraph` struct to process. It also provides a set of public functions
to query the status of blocks/transactions. This should be the main interface
with which other components interact.

### ConsensusGraphInner

`ConsensusGraphInner` (core/src/consensus/consensus_inner/mod.rs) is the inner
structure of `ConsensusGraph`. `ConsensusGraph::on_new_block()` acquires the
write lock of the inner struct at the start of the function. The rest are
query functions that only acquire read locks.

The internal structure of `ConsensusGraphInner` is fairly complicated.
Generally speaking, it maintains two kinds of information. The first kind of
information is the state of the whole TreeGraph, i.e., the current _pivot
chain_, _timer chain_, _difficulty_, etc.. The second kind of information is
the state of each block (i.e., `ConsensusGraphNode` struct for each block).
Each block corresponds to a `ConsensusGraphNode` struct for its information.
When it first enters `ConsensusGraphInner`, it will be inserted into
`ConsensusGraphInner::arena : Slab<ConsensusGraphNode>`. The index in the
slab will become the arena index of the block in `ConsensusGraphInner`. We use
the arena index to represent a block internally instead of `H256` because it is
much cheaper. We will refer back to the fields in `ConsensusGraphInner` and
`ConsensusGraphNode` when we talk about algorithm mechanism and their
implementations.

### ConsensusNewBlockHandler

`ConsensusNewBlockHandler`
(core/src/consensus/consensus_inner/consensus_new_block_handler.rs) contains a
set of routines for processing a new block. In theory, this code could be part
of `ConsensusGraphInner` because it mostly manipulates the inner struct.
However, these routines are all subroutine of the `on_new_block()` and the
consensus_inner/mod.rs is already very complicated. We therefore decided to put
them into a separate file.

### ConsensusExecutor

`ConsensusExecutor` (core/src/consensus/consensus_inner/consensus_executor.rs)
is the interface struct for the standalone transaction execution thread.
`ConsensusExecutor::enqueue_epoch()` allows other threads to send an execution
task to execute the epoch of a given pivot chain block asynchronously. Once the
computation finishes, the resulting state root will be stored into
`BlockDataManager`. Other threads can call
`ConsensusExecutor::wait_for_result()` to wait for the execution of an epoch if
desired. In the current implementation, `ConsensusExecutor` also contains the
routines for the calculation for block rewards, including
`get_reward_execution_info()` and its subroutines.

### ConfirmationMeter

`ConfirmationMeter` (core/src/consensus/consensus_inner/confirmation_meter.rs)
conservatively calculates the confirmation risk of each pivot chain block. Its
result will be useful for the storage layer to determine when it is _safe_ to
discard old snapshots. It can also be used to serve RPC queries about block
confirmation if we decide to provide such RPC.

### AnticoneCache and PastsetCache

`AnticoneCache` (core/src/consensus/anticone_cache.rs) and `PastsetCache`
(core/src/consensus/pastset_cache.rs) are two structs that implement customized
caches for data structures in `ConsensusGraphInner`. In the implementation of
the inner struct, we need to calculate and store the anticone set and the past
set of each block. However, it is not possible to store all of these sets in
memory. We therefore implement cache style data structures to store sets for
recently inserted/accessed blocks. If an anticone/past set is not found in the
cache, we will recalculate the set in the current inner struct implementation.

## Important Algorithmic Mechanisms

There are several important algorithmic mechanisms in the Conflux Consensus
Layer. Here we will talk about them from the implementation aspect. See XXX for
the algorithmic reasoning behind them.

### Pivot Chain and Total Order

The basic idea of the Conflux consensus algorithm is to first make everyone
agree on a pivot chain. It then expands the total order from the pivot chain to
cover all blocks with a topological sort. As long as the pivot chain does not
change/reorg, the total order of blocks will stay the same, so does the derived
order of transactions.

Comparing with Bitcoin/Ethereum, the consensus in Conflux has two key
differences:

1. _almost every block_ will go into the total order, not just the agreed pivot
   chain.

2. The transaction validity and the block validity are _independent_. For example, a
   transaction is invalid if it was included before or it cannot carry out due to
   insufficient balance. Such invalid transactions will become noop during the
   execution. However, _unlike Bitcoin and Ethereum blocks containing such
   transactions will not become invalid_.

In `ConsensusGraphInner`, the arena index of the current pivot chain blocks are
stored in order in the `pivot_chain[]` vector. To maintain it, we calculate the
lowest common ancestor (LCA) between the newly inserted block and the current best
block following the GHAST rule. If the fork corresponding to the newly inserted
block for the LCA ended up to be heavier, we will update the `pivot_chain[]` from
the forked point.

### Timer Chain

Blocks whose PoW quality is `timer_chain_difficulty_ratio` times higher than the target
difficulty are _timer blocks_. The `is_timer` field of the block will be set to
True. The consensus algorithm then finds the longest timer block chain (more
accurately, with greatest accumulated difficulty) similar to the Bitcoin
consensus algorithm of finding the longest chain. The arena index of this
longest timer chain will be stored into `timer_chain[]`.

The rationale of the timer chain is to provide a coarse-grained measurement of
time that cannot be influenced by a malicious attacker. Because timer blocks
are rare and generated slowly (if `timer_chain_difficulty_ratio` is properly
high), a malicious attacker cannot prevent the growth of the timer chain unless
it has the majority of the computation power. Therefore how many timer chain
blocks appear in the past set of a block is a good indication about the latest
possible generation time of the block. We compute this value for each block and
store it in `timer_chain_height` field of the block.

### Weight Maintenance with Link-Cut Tree

To effectively maintain the pivot chain, we need to query the total weight of a
subtree. Conflux uses a Link-Cut Tree data structure to maintain the subtree
weights in O(log n). The Link-Cut Tree can also calculate the LCA of any two nodes
in the TreeGraph in O(log n). The `weight_tree` field in `ConsensusGraphInner`
is the link-cut tree that stores the subtree weight of every node. Note that
the implementation of the Link-Cut Tree is in the utils/link-cut-tree
directory.

### Adaptive Weight

If the TreeGraph is under a liveness attack, it may fail to converge under one
block for a while. To handle this situation, the GHAST algorithm idea is to
start to generate adaptive blocks, i.e., blocks whose weights are redistributed
significantly so that there will be many zero weight blocks with a rare set of
very heavy blocks. Specifically, if the PoW quality of an adaptive block is
`adaptive_heavy_block_ratio` times of the target difficulty, the block
will have a weight of `adaptive_heavy_block_ratio`; otherwise, the block will
have a weight of zero. This effectively slows down the confirmation
temporarily but will ensure the consensus progress.

Because adaptive weight is a mechanism to defend against rare liveness attacks,
it should not be turned on during the normal scenario. A new block is adaptive
only if: 1) one of its ancestor blocks is still not the dominant subtree
comparing to its siblings, and 2) a significantly long period of time has passed
between the generation of that ancestor block and the new block (i.e., the
difference of `timer_chain_height` is sufficiently large). `ConsensusGraphInner::adaptive_weight()`
and its subroutines implement the algorithm to determine whether a block is
adaptive or not. Note that the implementation uses another link-cut-tree
`adaptive_tree` as a helper. Please see the inlined comments for the
implementation details.

### Partial Invalid

Note that the past set of a new block denotes all the blocks that the generator
of the new block observes at the generation time. Therefore, from the past set
of a new block, other full nodes could determine whether it chooses the correct
parent block and whether it should be adaptive or not.

The Conflux consensus algorithm defines those blocks who choose incorrect
parents or fill in incorrect adaptive status as _partial invalid blocks_. For a
partial invalid block, the `partial_invalid` field will be set to True. The
algorithm requires the partial invalid blocks being treated differently from
the normal blocks in three ways:

1. All honest nodes will not reference directly or indirectly partial invalid
   blocks until a significant period of time. This time period is measured with
   the `timer_chain_height` and the difference has to be more than
   `timer_chain_beta`. Yes, it means that if another otherwise perfectly fine
   block referencing the partial invalid block, both of these two blocks will not
   be referenced for a while.

2. Partial invalid blocks will have no block reward. They are extremely
   unlikely to get any reward anyway because of their large anticone set due to
   the first rule.

3. Partial invalid blocks are excluded from the timer chain consideration.

To implement the first rule, the `on_new_block()` routine in
`ConsensusNewBlockHandler` is separated into two subroutine
`preactivate_block()` and `activate_block()`. `preactivate_block()` compute and
determine whether a block is partial invalid or not, while `activate_block()`
fully integrate a block into the consensus graph inner data structures. For
every new block, the field `active_cnt` tracks how many inactive blocks it
references. A block is inactive if it references directly or indirectly a
partial invalid block. `activate_block()` will be called on a block only when
`active_cnt` of the block becomes zero. The field `activated` denotes whether a
block is active or not. For partially invalid blocks, their activation will be
delayed till the current timer chain height of the ledger is `timer_chain_beta`
higher than the invalid block. Newly generated blocks will not reference any
inactive blocks, i.e., these inactive blocks are treated as if they were not in
the TreeGraph.

### Anticone, Past View, and Ledger View

In order to check the partial invalid status of each block, we need to operate
under the _past view_ of the block to determine its correct parent and its
adaptivity. This is different from the current state of the TreeGraph or we
call it the _ledger view_, i.e., all blocks in the anticone and the future set
of the block are excluded. Because we process blocks in topological order, the
future set of a new block is empty. We therefore need to eliminate all anticone
blocks only.

`compute_and_update_anticone()` in `ConsensusNewBlockHandler` computes the
anticone set of a new block. Note that because the anticone set may be very
large, we have two implementation level optimizations. First, we represent the
anticone set as a set of barrier nodes in the TreeGraph, i.e., a set of
subtrees where each block in the subtrees is in the anticone set. Second, we
will maintain the anticone set of the recently accessed/inserted blocks
only. When checking whether a block is valid in its past view or not (e.g., in
`adaptive_weight()` and in `check_correct_parent()`), we first cut all barrier
subtrees from the link-cut weight trees accordingly to get the state of the
past view. After the computation, we restore these anticone subtrees.

### Check Correct Parent

To check whether a new block chooses a correct parent block or not, we first
compute the set of blocks inside the epoch of the new block assuming that
the new block is on the pivot chain. We store this set to the field
`blockset_in_own_view_of_epoch`. We then iterate over every candidate block in
this set to make sure that the chosen parent block is better than it.
Specifically, we find out the two fork blocks of the candidate block and the
parent block from their LCA and make sure that the fork of the parent is
heavier. This logic is implemented in `check_correct_parent()` in
`ConsensusNewBlockHandler`.

Note that `blockset_in_own_view_of_epoch` may become too large to hold
consistently in memory as well. Especially if a malicious attacker tries to
generate invalid blocks to blow up this set. The current implementation will
only periodically clear the set and only keep the sets for pivot chain blocks.
Note that for pivot chain blocks, this set will also be used during the
transaction execution.

### Fallback Brute Force Methods

There are situations where the anticone barrier set is too large if a malicious
attacker tries to launch a performance attack on Conflux. This will make the
default strategy worse than O(n) because there is a factor of O(log n) for each
block in the barrier set when we do the link-cut tree chopping. To this end, we
implemented a brute force routine `compute_subtree_weights()` to compute the
subtree weights of each block in a past view for O(n). We also implement
`check_correct_parent_brutal()` and `adaptive_weight_impl_brutal()` to use the
brute-force computed subtree weight to do the checking instead.

### Force Confirmation

The Conflux consensus algorithm will _force confirm_ a block if 1) there are
`timer_chain_beta` consecutive timer chain blocks under the subtree of the
block and 2) afterward there are at least `timer_chain_beta` timer chain blocks
following (not required in the subtree though). Force confirmation means that
new blocks should follow this block as their ancestor no matter what, ignoring
subtree weights. Though extremely unlikely a force confirmed block will have
lesser weights than its siblings.

The force confirmation mechanism is to enable checkpoint, which we will
describe later. It is based on the rationale that:

1. Reverting a `timer_chain_beta` length timer chain is impossible.

2. Therefore force confirmed block will always move along the pivot chain, not
   drifting between its siblings.

We compute the accumulative LCA of the last `timer_chain_beta` timer chain
blocks and store it at the `timer_chain_accumulative_lca[]` field. This vector
is `timer_chain_beta` shorter than `timer_chain[]` because the force confirm
needs at least `timer_chain_beta` timer chain block trailing, so their LCAs do
not matter. `check_correct_parent()` and `adaptive_weight()` and their
subroutines also respect this force confirm point during their checking.
Specifically, any fork before the force confirm height is ignored.

Note that this force confirm rule is also defined based on _past view_ of each
block. With the computed anticone information, `compute_timer_chain_tuple()` in
`ConsensusGraphInner` computes the timer chain related information of each
block under its past view. The results of this function include the difference of
the `timer_chain[]`, `timer_chain_accumulative_lca[]`, and `timer_chain_height`
between the ledger view and the past view. We can use the diff and the current
ledger view values to get the past view values.

### Era

In order to implement the checkpoint mechanism, the Conflux consensus algorithm split the
graph into eras. Every era contains `era_epoch_count` epochs. For example, if the
`era_epoch_count` is 50000, then there is a new era every 50000 epochs. The
pivot chain block at the height 50000 will be the genesis of a new era.
At the era boundary, there are several differences from the normal case.

1. A block will enter the total order for execution only if 1) it is under the
   subtree of the previous era genesis and 2) it is inside the past set of the next era genesis in
   the pivot chain.

2. Anticone penalty calculation for the block reward does not go across the era
   boundary.

### Checkpoint

Inside `ConsensusGraphInner`, there are two key height pointers, the current
checkpoint era genesis block height (`cur_era_genesis_height`) and the current
stable era genesis block height (`cur_era_stable_height`). These two height pointers
will always point to some era genesis (being a multiple of `era_epoch_count`).
Initially, both of these two pointers will point to the true genesis (height
0\).

A new era genesis block becomes stable (i.e., `cur_era_stable_height` moves) if
the block is _force confirmed_ in the current TreeGraph. A stable era genesis
block becomes a new checkpoint (i.e., `cur_era_genesis_height` moves) if:

1. The block is _force confirmed in the past view of the stable era genesis block_.

2. In the anticone of this block, there is no timer chain block.

`should_move_stable_height()` and `should_form_checkpoint_at()` in
`ConsensusNewBlockHandler` are invoked after every newly inserted block to test
the above two conditions. Generally speaking, the stable era genesis block will never be
reverted off the pivot chain. Any block in the past set of the checkpoint block
is no longer required for the future computation of the consensus layer.
Therefore, after a new checkpoint is formed, `make_checkpoint_at()` in
`ConsensusNewBlockHandler` is called to clean up those blocks that are not in
the future set of the new checkpoint.

Note that the checkpoint mechanism also changes how we handle a new block. For
a new block:

1. If the new block is outside the subtree of the current checkpoint, we only
   need to insert a stub into our data structure (because a block under the
   subtree may be indirectly referenced via this stub block). We do not need to
   care about such a block because it is not going to change the timer chain and it
   is not going to be executed.

2. If the past set of the new block does not contain the stable era genesis block, we
   do not need to check the partial invalid status of this block. This is because
   this block will not change the timer chain (recall our assumption that the timer
   chain will not reorg for more than `timer_chain_beta` blocks) and future blocks can reference
   this block directly (since the timer chain difference is already more than `timer_chain_beta`).

### Deferred Execution

Because the TreeGraph pivot chain may oscillate temporarily, we defer the
transaction execution for `DEFERRED_STATE_EPOCH_COUNT` epochs (default 5).
After a pivot chain update, `activate_block()` routine will enqueue the
execution task of the new pivot chain except for the last five epochs. It calls
`enqueue_epoch()` in `ConsensusExecutor` to enqueue each task.

### Block Reward Calculation

Because there is no explicit coinbase transaction in Conflux, all block rewards
are computed implicitly during the transaction execution. In Conflux, the block
reward is determined by the base reward and the penalty ratio based on the total weight of
its anticone blocks divided by its epoch pivot block's target difficulty. This anticone set only
considers blocks appearing no later than the next `REWARD_EPOCH_COUNT` epochs.
Specifically, if there is a new era then the anticone set will not count across
the era boundary as well. `get_pivot_reward_index()` in `ConsensusExecutor`
counts this reward anticone threshold.
`get_reward_execution_info_from_index()` in `ConsensusExecutor` and its
subroutines compute this anticone set given the threshold point in the pivot
chain.

### Blaming Mechanism

It is infeasible to validate the filled state root of a block because we
would need to execute all transactions in a different order in the past view of
that block. Instead, we will only ask full nodes to validate the state root
results on the current pivot chain. It then fills a blame number to indicate
how many levels ancestors from the parent who do not have correct state root.
When this number is greater than zero, the filled deferred state root becomes a
Merkel H256 vector that contains the corrected state roots of the ancestors
along with the correct one. `get_blame_and_deferred_state_for_generation()` in
`ConsensusGraph` computes the blame information for the block generation.
`first_trusted_header_starting_from()` in `ConsensusGraph` is a useful helper
function to compute the first trustworthy header based on the subtree blame
information.

## Multi-Thread Design

The consensus layer has one thread dedicated to processing new blocks from the
synchronization layer and one thread dedicated to executing transactions. It of
course also has a set of interface APIs that RPC threads and synchronization
threads may call.

### Consensus Worker

`Consensus Worker` is a thread created by the synchronization layer. During
the normal running phase, every new block will be sent to a channel connecting
the synchronization thread and the consensus worker thread. The consensus work
thread consumes each block one by one and invokes `consensus::on_new_block()`
to process it. Note that the synchronization layer ensures the new block to be
_header-ready_ when it is delivered to `Consensus Worker`, i.e., all of its
ancestor/past blocks are already delivered to the consensus layer before itself.
This enables the consensus layer to always deal with a well-defined
direct acyclic graph without holes.

One advantage of having a single thread to be dedicated to the consensus
protocol is that it simplifies the protocol implementation a lot. Because the
details of the consensus protocol are complicated and the implementation involves
many sophisticated data structure manipulations, the single thread design makes
sure that we do not need to worry about deadlocks or races. Upon the entrance
of `consensus::on_new_block()`, the thread acquires the write lock of the inner
of the consensus struct (i.e., ConsensusGraphInner). During the normal phase,
this thread should be the only one modifying the inner struct of the consensus
layer.

### Consensus Execution Worker

`Consensus Execution Worker` is a thread created at the start of the consensus
layer. It is dedicated to transaction execution. There is a channel connecting
`Consensus Worker` with `Consensus Execution Worker`. Once the consensus
protocol determines the order of the pivot chain, it will send an `ExecutionTask`
for each epoch in the pivot chain to the channel. These tasks will be picked up
by the `Consensus Execution Worker` thread one by one. The thread loads the
previous state before the executed epoch from the storage layer as the input,
runs all transactions in the executed epoch (see
`ConsensusExecutor::process_epoch_transactions()`), and produces the result
state as the output.

The rationale of separating the transaction execution from the consensus
protocol implementation is for performance. With our _blaming mechanism_, the
execution result state is completely separated from the consensus protocol
implementation. The _deferred execution mechanism_ gives us extra room to
pipeline the consensus protocol and the transaction execution. It is therefore
not wise to block the `Consensus Worker` thread to wait for the execution
results from coming back.

## Key Assumptions, Invariants, and Rules

If you want to write code to interact with the Conflux consensus layer, it is
very important to understand the following assumptions and rules.

1. The consensus layer assumes that the passed `BlockDataManager` is in a
   consistent state. It means that the `BlockDataManager` contains the correct current
   checkpoint/stable height. Blocks before the checkpoint and the stable height
   are properly checked during previous execution and they are persisted into the
   `BlockDataManager` properly. The consensus layer **does not check** the results
   it fetches from the block data manager. If it is inconsistent, the consensus
   layer will execute incorrectly or crash!

2. Besides the subroutines of `on_new_block()`, **no one should hold the write
   lock of the inner struct**! Right now the only exception for this rule is
   `assemble_new_block_impl()` because of computing the adaptive field and this is
   not good we plan to change it. Acquiring the write lock of the inner struct
   is very likely to cause deadlock given the complexity of the Consensus layer
   and its dependency with many other components. Always try to avoid this!
