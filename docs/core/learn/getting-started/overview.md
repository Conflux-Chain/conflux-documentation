---
sidebar_position: 1
title: Overview
---

Conflux is a new secure and reliable public blockchain with very high
performance and scalability. It can achieve the same level of decentralization
and security as Bitcoin and Ethereum but provide more than two orders of
magnitude improvement on transaction throughput (TPS) and finality latency.  

The major superiority of Conflux hinges on its novel design of consensus
protocol, authenticated storage, and transaction relay protocol. In Conflux
ledger, blocks are organized as **Tree-Graph** where each block references some
other blocks with one of them being its parent block. By only looking at the
blocks linked with parent edges, the ledger appears to be a tree structure
(parental tree), while by looking at all the blocks, it appears to be a directed
acyclic graph. This is also the reason that we call the ledger structure of
Conflux as Tree-Graph. 

![Locale Dropdown](./img/tree_graph.jpg)

The consensus algorithm of Conflux, which is called
**Greedy-Heaviest-Adaptive-SubTree** (GHAST), enables all the nodes in the
blockchain network to consistently agree on a **pivot chain** of blocks by
applying the *heaviest subtree rule* on the parental tree in the ledger, and in
turn reach the consensus on the total order of all the blocks based on the pivot
chain. GHAST also allows the Conflux nodes to detect some attacks (e.g., balance
attack that tries to generate two balanced subtrees) that may hurt the liveness,
i.e., the ability to confirm transactions, and thwart these attacks by
adaptively adjusting the weights of the blocks.  

The Tree-Graph ledger and the GHAST consensus algorithm make Conflux nodes be
able to quickly generate new blocks without worrying about that the existence of
forks in the ledger may harm the security of the network, and hence enable the
system to achieve both the high throughput and the low transaction confirmation
latency.  

Conflux employs account model and supports the smart contract. Its smart
contract is compatible with Solidity, which is Turing complete, as used in
Ethereum. Conflux uses merkle patricia tree as the major structure for its
authenticated storage used for the states of the accounts and the smart
contracts. Instead of using a single multi-version merkle tree, Conflux uses
multiple merkle trees for each version of the states. High-level speaking, it
consists of a snapshot tree and the delta trees. The delta tree is always held
in memory and it contains all the state updates from the last snapshot. The
snapshot tree, instead, is read-only during the execution of the transactions.
This design makes the transaction execution in Conflux more efficient because it
can utilize the memory more effectively when accessing the state in the storage.
The delta tree typically contains the most frequently accessed data, and since
the state size is small in delta tree, the depth of the tree can also be
shallow, which makes the memory be able to hold more effective data.  

In addition, Conflux employs a novel transaction relay protocol to improve the
effective utilization of the network bandwidth for transaction propagation
since, in Conflux, the network bandwidth could become the real bottleneck. In
order to reduce the redundant transaction propagation, a Conflux node first
sends out to its peers an announcement containing the transaction ids that the
peers may not have seen before, and then let the peers request the transactions
that they really need. Conflux introduces an efficient encoding for the
transaction id to achieve a good trade-off between the size and the security.  
