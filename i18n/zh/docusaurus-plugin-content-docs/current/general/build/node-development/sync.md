---
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - block synchronization
  - synchronization graph
  - blockchain
  - node development
  - validity checks
  - garbage collection
  - peer-to-peer
tags:
  - Synchronization
---

# 区块同步过程

## 同步图

同步图旨在组织新到达的区块（来自对等节点接收、从本地存储加载或自行挖掘的），即使它们的过去区块尚未完全收集。 一旦某个区块的所有过去区块都在同步图中被收集完毕，它将被分派到共识图进行进一步处理。

区块头和区块体在同步图中通过不同的流程进入，因为通常区块头和体在对等网络层中是分开传输的。 同步图中的图结构是通过区块头到达来构建的。 每个区块在图结构中表示为一个节点，节点通过区块间的父/子和引用块/被引用块关系连接。

同步图检查到达区块的有效性。 未通过有效性检查的区块是无效的，将不会进一步分派到共识图。 进行以下有效性检查：

1. 检查区块的父区块或被引用块是否无效。 若其中之一无效，则该区块亦无效。
2. 检查区块头中的随机数是否根据区块头中的难度正确设置，即矿工是否正确解决了POW难题。
3. 检查区块头中的被引用块数量是否超过阈值（200）。 如果是，则该区块无效。
4. 检查区块的父区块和被引用块中是否有重复的哈希值。 如果是，则该区块无效。
5. 检查区块头中自定义字段的长度（以字节计）是否超过阈值（64）。 如果是，则该区块无效。
6. Check whether the height of a block is larger than the height of its parent block by 1. 如果不是，则该区块无效。
7. 检查区块的时间戳是否大于或等于其父区块的时间戳。 如果不是，则该区块无效。
8. Check the block gas limit is correctly set.
9. 检查区块难度是否正确设置。
10. 检查区块头是否包含根据区块体中的交易正确设置的交易根。
11. 检查区块体中的每笔交易是否具有有效的签名结构。
12. 检查区块体中的交易总大小是否超过区块大小限制（800KB）。 如果是，则该区块无效。
13. Check whether the total gas limit of transactions in the block body is larger than the block gas limit. 如果是，则该区块无效。

The validity checks 1~9 only use information in block header. The validity checks 10~13 use the information in block body. The checks 6~9 require graph structure information like parent information and are conducted on a block when the headers of all its past blocks have entered the synchronization graph. To speed up the block relay process, when both the header and body of a block have entered the synchronization graph and the headers of all its past blocks have also entered, the block can be relayed to the peers. 无需等待该区块的所有过去区块的体被接收即可中继该区块。 这可能导致中继无效区块，但由于所有被中继的区块已具有有效的难度和POW设置，制造这种情况的攻击者也支付了相应的计算能力成本。

### 图形结构维护

同步图的节点结构定义如下：

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

图结构由 `parent`, `children`, `referees`, 和 `referrers` 字段维护。 每个节点有一个 `graph_status` 字段，表示从头到达到区块准备好被派发到共识图的时间段内其状态的变化。

当一个区块头进入同步图时，首先检查该区块是否已经被同步图处理。
如果没有，它将被添加到图中，并相应地更新图结构。
首先，建立 _父/子_ 边。
如果这个新到达的区块的父区块尚未进入同步图，图使用一个集合 `children_by_hash` 来处理这种情况。
这是一个从区块哈希到图节点集的映射。
在这种情况下，代表这个新到达的区块头的图节点将被添加到从这个区块的父区块哈希映射的图节点集中。
这作为一种记账方式，用来记住父区块哈希与这个新到达区块之间的关系。
一旦这个父区块将来进入同步图，父子节点之间的相应边可以建立，并且父区块的哈希将从 `children_by_hash` 映射中删除。
其次，也将建立 _引用者/被引用者_ 边。
同步图使用一个映射 `referrers_by_hash` 来记住未到达的被引用区块和新到达的引用者区块之间的关系。
图节点还维护一个 `pending_referee_count` 字段，以记住区块的多少引用者尚未进入同步图。

图节点可能处于以下 5 种状态之一：

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

当一个区块头刚进入同步图并触发一个新的图节点被创建并添加到图中时，节点的初始状态是 `BLOCK_HEADER_ONLY`。
根据这个图结构的更新，图中其他节点的状态也可能改变。
这些变化的影响是通过从该节点到其所有后代的 BFS 遍历来实现的。
在这个遍历过程中，对于每个节点，

1. 如果该节点无效，则其所有后代节点都无效；
2. 如果它是新的 `BLOCK_HEADER_GRAPH_READY`，则对其应用一些图相关的有效性检查（6~9）。
  如果它通过了这些检查，然后检查它的区块体是否已经进入同步图（通过检查图节点的 `block_ready` 字段）。
  如果是，那么这个块已准备好被发布。 并且这个区块可能使它的一些后代变成 `BLOCK_HEADER_GRAPH_READY`。
  请注意，这不能使它的后代变成 `BLOCK_GRAPH_READY` ，因为新到达区块头的原始节点（BFS 过程的起点）只能是 `BLOCK_HEADER_GRAPH_READY`；

当一个区块体刚进入同步图时，相应的图节点应该已经存在于同步图中，否则该区块将被忽略（这种情况可能发生在垃圾回收时）。
这个节点的 `block_ready` 字段现在将被设置为 true。
然后，区块将通过相应的有效性检查（10～13）。
And similarly, this newly arrived block body will change the status of some of its descendants.
这也是通过从这个节点进行广度优先搜索（BFS）遍历来完成的。
在这个遍历过程中，对于每个节点，

1. 如果它无效，则其所有后代都无效；
2. 如果它是新的 `BLOCK_GRAPH_READY`，则它会被派发到共识图。
  它可能使它的一些后代变成 `BLOCK_GRAPH_READY`。
  如果新到达体的区块至少是 `BLOCK_HEADER_GRAPH_READY`，则表示它已经准备好被传播。

### 回收悬挂区块

Some (adversarial) nodes may send to a full node some blocks that cannot be in status of `BLOCK_GRAPH_READY` forever, e.g., to conduct DDOS attack or to be in the case of serious message delay so that the block does not belong to the current checkpoint era anymore.
这些区块将被保留在同步图中，但最终应该被垃圾回收，以避免浪费内存资源。
为了做到这一点，同步图维护了一组代表这些图未准备好区块的边界区块。
A block should be a frontier block if

1. 该区块的状态不是 `BLOCK_GRAPH_READY` ，但其父区块是；
2. 其父区块尚未进入同步图。

为了回收这些图未准备好的区块，它从这些区块的边界开始，通过遵循子节点和引用者边缘的广度优先搜索遍历，移除它们以及所有可以到达的子代。
将边界区块的所有子代从同步图中移除的原因，与区块同步过程的设计有关。
在区块同步过程中，它会遵循新到达区块的父节点和被引用边缘，并尝试获取丢失的先前区块。
当它遇到已经存在于同步图中的这样一个先前区块时，该过程将停止进一步遵循其父节点和被引用边缘。
因此，如果某个先前的区块是一些已经被垃圾回收的边界图未准备好区块的后代区块，这个被移除的未准备好的区块将永远没有机会再次从同伴那里获取。
However, this removed frontier block may be graph-unready merely because a temporary bad network situation which may recover later.

这个垃圾回收过程会被定期触发，在每个过程中，它只尝试移除那些已经长时间处于未准备好状态的边界区块及其子代。
为了获取时间信息，每个图节点有一个 `last_update_timestamp` 字段来记住节点状态最后更新的时间戳。

同步过程中的一个优化是，它不总是从其他节点那里获取新到达的区块的父节点和引用信息。
它检查区块的高度，是否远低于处于本地最佳纪元区块的高度。
如果是这样，这个区块的先前区块很可能存在于本地数据库中，因此应首先尝试从本地数据库获取这些区块。
这同样也是一种有效的方法，以避免仅根据其他节点信息而进行不必要的向后树图遍历，我们在恢复过程部分也会更详细地介绍这一点。
