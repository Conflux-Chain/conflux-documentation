---
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - consensus layer
  - GHAST algorithm
  - TreeGraph
  - blockchain
  - consensus protocol
  - 枢轴链
  - timer chain
  - adaptive weight
tags:
  - Consensus Layer
---

# Conflux 共识层的设计与实现

Conflux 的共识层处理从同步层接收到的所有区块，根据 Conflux GHAST 共识算法产生区块的完整顺序，并调用底层的交易执行引擎以按确定的顺序运行交易。 它提供了必要的信息，以协助 **区块生成器** 准备新区块的骨架。 它还通知 **交易池(transaction pool)** 已处理好的交易，以便交易池可以做出更好的交易选择决策。

本文档旨在为想要了解 Conflux 共识层（位于目录core/src/consensus中）的 Rust 实现的读者提供高级概述。 对于更多的实现细节，请查看代码中的内联注释。 对于 Conflux 共识算法的更多信息，请参阅 Conflux 协议规范和 Conflux 论文（https://arxiv.org/abs/1805.03870）。

## 设计目标

共识层有以下设计目标。

1. 在后台按照一致的共识算法处理新的区块

2. 我们希望最小化共识图中每个块的内存使用。
   即使有检查点机制，在正常情况下图中会包含 300K-500K 个块，在面对存活性攻击时可能会超过 1M 个块。 这可能会给内存带来压力。

3. 我们想要快速处理每个区块。 因为全节点/归档节点在从零开始同步网络时必须处理从_初始创世区块_开始的之后每一个区块，因此快速处理区块对于缩短所需时间是非常重要的。

4. 面对潜在攻击时具有稳健性。 恶意攻击者可能会在TreeGraph的任意位置生成恶意区块。

## 结构与组成部分。

### 共识图（ConsensusGraph）

`ConsensusGraph`（core/src/consensus/mod.rs）是共识层的主要结构体。 同步层通过一个存储所有区块元数据信息的 `BlockDataManager` 来构建 `ConsensusGraph`。
`ConsensusGraph::on_new_block()` 是将新区块发送给 `ConsensusGraph` 结构体进行处理的关键函数。 它还提供了一组公共函数，用于查询区块/交易的状态。 这应该是其他组件与之交互的主要接口。

### 共识图核心（ConsensusGraphInner）

`ConsensusGraphInner` (core/src/consensus/consensus_inner/mod.rs)是 `ConsensusGraph` 的内部结构。 `ConsensusGraph::on_new_block()` 在函数开始时会获取内部结构的写入锁。 其余的查询函数只会获取读锁。

`ConsensusGraphInner` 的内部结构相当复杂。
一般来说，它维护两种类型的信息。 第一种信息是整个TreeGraph的状态，即当前的_pivot chain_、_timer chain_、_difficulty_等等。 第二种信息是每个区块的状态(即每个区块的`ConsensusGraphNode`结构)。
每个区块对应一个 `ConsensusGraphNode` 结构，用于存储其信息。
当第一次进入 `ConsensusGraphInner` 时，它将被插入到 `ConsensusGraphInner::arena : Slab<ConsensusGraphNode>` 中。 在Slab中的索引将成为 `ConsensusGraphInner` 中区块的arena索引。 我们在内部使用arena索引来表示一个区块，而不是使用`H256`，因为它更加经济高效。 在讨论算法机制和实现时，我们将回顾 `ConsensusGraphInner` 和 `ConsensusGraphNode` 中的字段。

### ConsensusNewBlockHandler

`ConsensusNewBlockHandler`
(core/src/consensus/consensus_inner/consensus_new_block_handler.rs) contains a
set of routines for processing a new block. 从理论上讲，这段代码可以成为 `ConsensusGraphInner` 的一部分，因为它主要操作内部结构。
然而，这些程序都是 `on_new_block()` 的子程序，而且consensus_inner/mod.rs已经非常复杂了。 因此，我们决定将它们放入一个单独的文件中。

### ConsensusExecutor

`ConsensusExecutor`（core/src/consensus/consensus_inner/consensus_executor.rs）是独立交易执行线程的接口结构体。
ConsensusExecutor::enqueue_epoch() 允许其他线程异步地向执行线程发送一个执行任务，以执行给定 pivot chain 区块的纪元。 Once the
computation finishes, the resulting state root will be stored into
`BlockDataManager`. 如有需要，其它线程可以调用
`ConsensusExecutor::wait_for_result()` 以等待执行一个纪元. In the current implementation, `ConsensusExecutor` also contains the
routines for the calculation for block rewards, including
`get_reward_execution_info()` and its subroutines.

### ConfirmationMeter

`ConfirmationMeter` (core/src/consensus/consensus_inner/confirmation_meter.rs)
conservatively calculates the confirmation risk of each pivot chain block. Its
result will be useful for the storage layer to determine when it is _safe_ to
discard old snapshots. 如果我们决定提供关于区块确认的RPC查询，它还可以用于提供这样的RPC服务。

### AnticoneCache and PastsetCache

`AnticoneCache` (core/src/consensus/anticone_cache.rs) 和 `PastsetCache` (core/src/consensus/pastset_cache.rs) 是两个结构体，它们为 `ConsensusGraphInner` 中的数据结构实现了定制化的缓存。 In the implementation of
the inner struct, we need to calculate and store the anticone set and the past
set of each block. However, it is not possible to store all of these sets in
memory. 因此，我们实现了缓存样式的数据结构来存储最近插入/访问的区块集合。 If an anticone/past set is not found in the
cache, we will recalculate the set in the current inner struct implementation.

## 重要算法机制

Conflux 共识层中有几个重要的算法机制。 在这里，我们将从实现的角度来讨论它们。 See XXX for
the algorithmic reasoning behind them.

### 主链和全序

Conflux 共识算法的基本思想是首先让所有人都同意一个主链（pivot chain）。 然后，从主链开始，通过拓扑排序来扩展总排序，覆盖所有的区块。 只要主链不发生改变/重组，区块的总排序以及派生的交易顺序将保持不变。

与比特币/以太坊相比，Conflux的共识机制有两个关键的不同之处：

1. 与仅仅将枢轴链纳入总排序不同，Conflux中几乎每个区块都会进入总排序。

2. The transaction validity and the block validity are _independent_. 例如，如果一个交易已经被包含在区块中或由于余额不足无法执行，那么该交易就是无效的。 这些无效的交易将在执行过程中成为空操作（noop）。 然而，与比特币和以太坊不同，包含这种无效交易的区块并不会变为无效。

In `ConsensusGraphInner`, the arena index of the current pivot chain blocks are
stored in order in the `pivot_chain[]` vector. 为了维护它，我们按照 GHAST 规则计算新插入区块与当前最佳区块之间的最近公共祖先 (LCA)。 If the fork corresponding to the newly inserted
block for the LCA ended up to be heavier, we will update the `pivot_chain[]` from
the forked point.

### Timer Chain

Blocks whose PoW quality is `timer_chain_difficulty_ratio` times higher than the target
difficulty are _timer blocks_. The `is_timer` field of the block will be set to
True. 然后共识算法找到最长的计时器块链（更准确地说，是累积难度最大的链），类似于比特币共识算法寻找最长链的方式。 最长计时器链的竞技场索引将存储到 `timer_chain[]`。

计时器链的原理是提供一种粗粒度的时间测量，很难被恶意攻击者影响 因为计时器块
罕见并缓慢生成(如果`timer_chain_difficulty_ratio` 是适当的
高), 恶意攻击者不能阻止计时器链的增长，除非
它拥有大多数计算能力。 因此，在一个块的先前设置中出现了多少计时器链块，是关于该块的最新可能生成时间的良好指示。 We compute this value for each block and
store it in `timer_chain_height` field of the block.

### 使用Link-Cut Tree（链剖树）进行权重维护。

为了有效地维护主链，我们需要查询子树的总权重。 Conflux使用Link-Cut Tree（链剖树）数据结构来在O(log n)的时间复杂度下维护子树权重。 Link-Cut Tree（链剖树）还可以在O(log n)的时间复杂度下计算树图中任意两个节点的LCA（最近公共祖先） `ConsensusGraphInner`
中的`weight_tree`字段是存储每个节点的子树重量的链剖树。 请注意，Link-Cut Tree（链剖树）的实现位于utils/link-cut-tree目录下。

### Adaptive Weight

如果TreeGraph处于活性攻击状态，它可能在一段时间内无法在一个块下收敛。 为了应对这种情况，GHAST算法的想法是开始生成适应性块，即块的权重被显著重新分配，以便会有许多零权重块和一组罕见的非常重的块。 Specifically, if the PoW quality of an adaptive block is
`adaptive_heavy_block_ratio` times of the target difficulty, the block
will have a weight of `adaptive_heavy_block_ratio`; otherwise, the block will
have a weight of zero. 这将有效地暂时减慢确认的速度，但将确保共识的进展。

因为适应性权重是一种防御罕见活性攻击的机制，所以在正常情况下不应该启用它。 一个新区块只有在以下情况下才是适应性的：1) 它的一个祖先区块相比其兄弟区块仍不是占主导地位的子树，以及2) 在那个祖先区块和新区块生成之间过去了相当长的时间（即，`timer_chain_height` 的差异足够大）。 `ConsensusGraphInner::adaptive_weight()` 及其子程序实现了确定一个区块是否是适应性的算法。 注意，该实现使用了另一个名为 `adaptive_tree` 的链剖树（link-cut-tree）作为辅助。 Please see the inlined comments for the
implementation details.

### 部分无效

需要注意的是，新区块的过去集表示生成新区块时其生成者观察到的所有区块。 因此，从新区块的过去集中，其他完整节点可以确定它是否选择了正确的父区块，以及它是否应该是适应性的。

Conflux 共识算法定义那些选择了错误父区块或填写了不正确的适应状态的区块为_部分无效区块_。 对于部分无效的区块，`partial_invalid` 字段将被设置为 True。 该算法中部分无效区块与正常区块被要求以三种不同方式进行处理：

1. 所有诚实的节点在较长的一段时间内都不会直接或间接引用部分无效区块。 这个时间周期是使用 `timer_chain_height` 测量的，差异必须超过 `timer_chain_beta`。 因此这意味着如果另一个本来完全正常的区块引用了部分无效区块，这两个区块在一段时间内都不会被引用。

2. 部分无效区块将没有区块奖励。 由于第一条规则导致的大量反锥区块集，它们大概率不会获得任何奖励。

3. 部分无效区块被排除在计时链考虑之外。

为了实现第一条规则， `ConsensusNewBlockHandler` 中的 `on_new_block()` 例程被分成了两个子程序 `preactivate_block()` 和 `activate_block()`。 `preactivate_block()` 计算并确定一个区块是否部分无效，而 `activate_block()` 将一个区块完整地整合到共识图内部数据结构中。 对于每个新区块，字段 `active_cnt` 跟踪它引用了多少个不活跃的区块。 如果一个区块直接或间接引用了一个部分无效区块，则该区块是不活跃的。 只有当一个区块的 `active_cnt` 变为零时，才会对该区块调用 `activate_block()`。 字段 `activated` 表示一个区块是否活跃。 对于部分无效的区块，它们的激活将被延迟，直到账本的当前计时链高度比无效区块高出 `timer_chain_beta`。 新生成的区块不会引用任何不活跃的区块，即这些不活跃的区块将会被当作排除在 TreeGraph 外的区块

### 反锥体，过去视图，账本视图

为了检查每个区块的部分无效状态，我们需要在该区块的_过去视图_下操作，以确定其正确的父区块及其适应性。 这与 TreeGraph 的当前状态不同，或者我们称之为_账本视图_，即排除了区块的反锥体和该区块的未来集合中的所有区块。 因为我们按照拓扑顺序处理区块，新区块的未来集合是空的。 因此，我们只需要排除所有反锥体区块。

`compute_and_update_anticone()` 在 `ConsensusNewBlockHandler` 中计算新区块的反锥体集合。 注意，由于反锥集合可能非常大，我们有两个在执行层面上的优化。 首先，我们将反锥集合表示为 TreeGraph 中的一组屏障节点，即每个子树中的每个区块都在反锥集合中。 其次，我们只维护最近访问/插入区块的反锥集合。 在检查区块在其过去视图中是否有效时（例如，`在 adaptive_weight()` 和 `check_correct_parent()` 中），我们首先相应地从Link-Cut Tree (链剖树) 中切除所有屏障子树，以获得过去视图的状态。 在计算之后，我们将会还原这些反锥子树。

### 检查正确的父区块

为了检查一个新区块是否选择了正确的父区块，我们首先计算假设新区块在主链上时，该新区块纪元内的区块集合。 我们将这个集合存储到字段 `blockset_in_own_view_of_epoch` 中。 然后我们遍历这个集合中的每一个候选区块，确保所选的父区块比它更好。
具体来说，我们找出候选区块和父区块从它们的最近公共祖先(LCA)出发的两个分叉区块，并确保父区块的分叉更重。 这个逻辑在 `ConsensusNewBlockHandler` 中的 `check_correct_parent()` 中实现。

值得注意的是，`blockset_in_own_view_of_epoch` 也可能因为过大而无法一直在内存中保持。 特别是如果恶意攻击者试图生成无效区块来扩大这个集合。 目前的实现将会定期清理这个集合，只保留主链区块的集合。
请注意，对于主链区块，这个集合在交易执行期间也会被使用。

### 备用暴力方法

在Conflux中，如果恶意攻击者试图针对系统发起性能攻击，反锥屏障子树集合可能会过大。 这会使得默认策略变得比O(n)更糟，因为当我们进行LCT（链剖树）剖分时，每个屏障集合中的区块都会带来一个O(log n)的因子。 为此，我们实现了一个蛮力例程 `compute_subtree_weights()` ，以O(n)计算过去视图中每个区块的子树权重。 我们还实现了 `check_correct_parent_brutal()` 和 `adaptive_weight_impl_brutal()` ，使用蛮力计算的子树权重进行检查。

### 强制确认

如果 1）一个区块的子树下有连续的 `timer_chain_beta` 个计时链区块，以及 2）之后至少有 `timer_chain_beta` 个计时链区块跟随（尽管不要求在子树中），那么Conflux共识算法将 _强制确认_ 一个区块。 强制确认意味着新区块应该将这个区块作为它们的祖先遵循，忽略子树权重。 虽然可能性极小，但一个被强制确认的区块会比其兄弟区块的权重小。

强制确认机制是为了启用检查点，我们稍后会描述。 它基于以下理由：

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
