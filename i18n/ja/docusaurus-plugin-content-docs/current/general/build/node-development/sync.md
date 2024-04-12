---
displayed_sidebar: generalSidebar
---

# Block Synchronization Process

## Synchronization Graph

Synchronization graph is designed to organize newly arrived blocks (received from the peers, loaded from local storage, or self-mined) even when their past blocks haven’t been completely collected. Once all the past blocks of a block have been collected in synchronization graph, it will be dispatched to consensus graph for further processing.

The block header and block body enter the synchronization graph in separate processes, because, typically, the block header and body are transferred separately in peer-to-peer layer. The graph structure in the synchronization graph is constructed by block header arrival. Each block is represented as a node in the graph structure, and the nodes are linked through the parent/child and referrer/referee relations between blocks.

Synchronization graph checks the validity of arriving blocks. The blocks that do not pass the validity checks are invalid and will not be dispatched to consensus graph further. The following validity checks are conducted:

1. Check whether the parent or referees of a block are invalid. If one of them is invalid, the block is invalid too.
2. Check whether the nonce in the block header is correctly set based on the difficulty in the block header, i.e., the miner of the block correctly solved the POW puzzle.
3. Check whether the number of referees in the block header is larger than a threshold (200). If so, the block is invalid.
4. Check whether there are duplicated hashes in the parent and referees of a block. If so, the block is invalid.
5. Check whether the length (in byte) of the custom field in the block header is beyond a threshold (64). If so, the block is invalid.
6. Check whether the height of a block is larger than the height of its parent block by 1. If NOT, the block is invalid.
7. Check whether the timestamp of a block is larger than or equal to the timestamp of its parent block. If NOT, the block is invalid.
8. Check the block gas limit is correctly set.
9. Check the block difficulty is correctly set.
10. Check whether the block header contains the correct transaction root according to the transactions in the block body.
11. Check whether every transaction in the block body has valid signature structure.
12. Check whether the total size of the transactions in the block body is larger than the block size limit (800KB). If so, the block is invalid.
13. Check whether the total gas limit of transactions in the block body is larger than the block gas limit. If so, the block is invalid.

The validity checks 1~9 only use information in block header. The validity checks 10~13 use the information in block body. The checks 6~9 require graph structure information like parent information and are conducted on a block when the headers of all its past blocks have entered the synchronization graph. To speed up the block relay process, when both the header and body of a block have entered the synchronization graph and the headers of all its past blocks have also entered, the block can be relayed to the peers. It is not needed to wait for the bodies of all the past blocks of a block to be received in order to relay the block. This may lead to relaying invalid blocks, but since all the relayed blocks already have valid difficulty and POW settings, the attackers who make this case also pay the corresponding cost of computation power.

### Graph Structure Maintenance

The node structure of synchronization graph is defined as follows:

```c
pub struct SynchronizationGraphNode {
    pub block_header: Arc<BlockHeader>,
    // The status of graph connectivity in the current block view.
    pub graph_status: u8,
    // Whether the block body is ready.
    pub block_ready: bool,
    // Whether parent is in old era and already reclaimed
    pub parent_reclaimed: bool,
    // The index of the parent of the block.
    pub parent: usize,
    // The indices of the children of the block.
    pub children: Vec<usize>,
    // The indices of the blocks referenced by the block.
    pub referees: Vec<usize>,
    // The number of blocks referenced by the block but
    // haven't been inserted in synchronization graph.
    pub pending_referee_count: usize,
    // The indices of the blocks referencing the block.
    pub referrers: Vec<usize>,
    // the timestamp in seconds when graph_status updated
    pub last_update_timestamp: u64,
}

```

The graph structure is maintained by the fields `parent`, `children`, `referees`, and `referrers`. Each node has a `graph_status` field representing its status changing during the period from the time when the header arrives to the time when the block is ready to be dispatched to consensus graph.

When a block header enters synchronization graph, it is first checked whether this block is already processed by synchronization graph.
If not, it will be added into the graph and the graph structure will be updated accordingly.
First, the _parent/children_ edge will be established.
If the parent of this newly arrived block hasn’t come into synchronization graph, the graph uses a collection `children_by_hash` to handle this.
This is a map from block hash to a set of graph nodes.
In this case, the graph node representing this newly arrived block header will be added into the graph node set mapped from the parent block hash of this block.
This functions as a bookkeeping to remember the relation between the parent block hash and this newly arrived block.
Once this parent block comes into the synchronization graph in the future, the corresponding edge between the parent and child nodes can be established and the hash of the parent block will be removed from the `children_by_hash` map.
Secondly, the _referees/referrers_ edges will also be established.
Similarly, the synchronization graph uses a map `referrers_by_hash` to remember the relation between the unarrived referee block and the newly arrived referrer block.
The graph node also maintains a `pending_referee_count` field to remember how many referees of the block haven’t come into the synchronization graph.

A graph node may be in the following 5 status:

```c
// This block is an invalid block.
const BLOCK_INVALID: u8 = 0;
// Just get the header of the block.
const BLOCK_HEADER_ONLY: u8 = 1;
// The headers of all the blocks in the past set of this block have already entered
// synchronization graph. 
const BLOCK_HEADER_GRAPH_READY: u8 = 2;
// Both the headers and bodies of all the blocks in the past set of this block have
// entered synchronization graph.
const BLOCK_GRAPH_READY: u8 = 3;
```

When a block header just enters the synchronization graph and triggers a new graph node being created and added in the graph, the initial status of the node is `BLOCK_HEADER_ONLY`.
And according to this graph structure update, the status of other nodes in the graph may also change.
The effects of these changes are fulfilled by conducting a BFS traversal from the node to all its descendants.
During this traversal process, for each node,

1. if it is invalid, all its descendants are invalid;
2. if it is new to be `BLOCK_HEADER_GRAPH_READY`, some graph-related validity checks (6~9) are applied on it.
   If it passes these checks, it is then checked whether its block body has already entered synchronization graph (by checking the `block_ready` field of the graph node).
   If so, this block is ready to be relayed. And this block may make some of its descendants become `BLOCK_HEADER_GRAPH_READY`.
   Note that this cannot make its descendants become `BLOCK_GRAPH_READY` since the original node (at the starting point of the BFS process) for the newly arrived block header can only be `BLOCK_HEADER_GRAPH_READY`;

When a block body just enters the synchronization graph, the corresponding graph node should already exist in synchronization graph, otherwise, the block will be ignored (this may happen if it is garbage collected).
The `block_ready` field of this node will be set as true now.
The block then goes through the corresponding validity checks (10~13).
And similarly, this newly arrived block body will change the status of some of its descendants.
This is also done by conducting a BFS traversal from this node.
During this traversal process, for each node,

1. if it is invalid, all its descendants are invalid;
2. if it is new to be `BLOCK_GRAPH_READY`, it is dispatched to consensus graph.
   It may make some of its descendants become `BLOCK_GRAPH_READY`.
   If the block with the newly arrived body is at least `BLOCK_HEADER_GRAPH_READY`, it becomes ready to be relayed.

### Garbage Collect Dangling Blocks

Some (adversarial) nodes may send to a full node some blocks that cannot be in status of `BLOCK_GRAPH_READY` forever, e.g., to conduct DDOS attack or to be in the case of serious message delay so that the block does not belong to the current checkpoint era anymore.
These blocks will be held in synchronization graph but should be garbage-collected eventually to avoid wasting memory resources.
In order to do this, the synchronization graph maintains a set of blocks representing the frontier of these graph-unready blocks.
A block should be a frontier block if

1. the block is not in status of `BLOCK_GRAPH_READY` but its parent block is; or
2. its parent block has not come into the synchronization graph.

To garbage collect these graph-unready blocks, it starts from the frontier of these blocks, and removes them and all their descendants that can be reached through BFS traversal by following children and referrers edges.
The reason that we must remove all the descendants of the frontier blocks from the synchronization graph is related to the design of block synchronization process.
During the block synchronization, it follows the parent and referees edges of a newly arrived block and tries to fetch the missing ancestors.
When it encounters such an ancestor block that already exists in synchronization graph, the process stops following its parent and referees edges further.
Therefore, if the ancestor block is the descendant block of some frontier graph-unready block that has already been garbage collected, this removed unready block will never get chance to be fetched from peer again.
However, this removed frontier block may be graph-unready merely because a temporary bad network situation which may recover later.

This garbage collection process is triggered periodically, and in each of this process, it only tries to remove frontier blocks and their descendants which have already been in unready status for a long time.
In order to get the timing information, each graph node has a field `last_update_timestamp` to remember the timestamp of the last update of the node status.

One optimization in the synchronization process is that it does not always fetch from peers the parent and referees of newly arrived block that are missing in memory.
It checks whether the height of the block is far less than the height of the local best epoch block.
If so, it is highly probable that the ancestors of this block exist in local database, so it deserves the effort of trying to get these blocks from local database first.
It is also an effective way to avoid unnecessary backward tree-graph traversing merely according to the peer information, which we also cover a bit more detail in Recovery Process section.
