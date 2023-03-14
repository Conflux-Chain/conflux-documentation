---
sidebar_position: 1
title: What is Conflux?
---

Conflux is a public blockchain that offers high performance and scalability while maintaining a high level of decentralization and security.This achieves a significant improvement in transaction throughput (TPS) and finality latency by using a novel design for the consensus protocol, authenticated storage, and transaction relay protocol.

One of the unique features of Conflux is its hybrid consensus mechanism, which combines Proof of Work (PoW) and Proof of Stake (PoS) to achieve both security and scalability. This also allows Conflux to maintain a high degree of decentralization while achieving high throughput.

Conflux has two separate Spaces - Conflux Core Space and Conflux eSpace. Conflux Core Space is the main blockchain network that uses the hybrid consensus mechanism described above. Conflux eSpace, on the other hand, is fully compatible with Ethereum Virtual Machine (EVM), which means that it can run smart contracts written in Solidity, the same programming language used in Ethereum. This makes it easy for developers to migrate their existing Ethereum contracts to Conflux eSpace and take advantage of its high performance and scalability.

The Tree-Graph ledger structure of Conflux is another innovative feature that enables quick block generation and low transaction confirmation latency. In this structure, blocks are organized as a Tree-Graph, where each block references some other blocks with one of them being its parent block. By only looking at the blocks linked with parent edges, the ledger appears to be a tree structure (parental tree), while by looking at all the blocks, it appears to be a directed acyclic graph. The Greedy-Heaviest-Adaptive-SubTree (GHAST) consensus algorithm used in Conflux enables all the nodes in the blockchain network to consistently agree on a pivot chain of blocks by applying the heaviest subtree rule on the parental tree in the ledger, and in turn reach the consensus on the total order of all the blocks based on the pivot chain. This design ensures the high throughput and low confirmation latency of the Conflux network.

![Locale Dropdown](./img/tree_graph.jpg)

Conflux also uses a merkle patricia tree as the major structure for its authenticated storage used for the states of the accounts and the smart contracts. Instead of using a single multi-version merkle tree, Conflux uses multiple merkle trees for each version of the states, which makes the transaction execution in Conflux more efficient.

Finally, Conflux employs a novel transaction relay protocol that improves the effective utilization of the network bandwidth for transaction propagation. In order to reduce the redundant transaction propagation, a Conflux node first sends out to its peers an announcement containing the transaction ids that the peers may not have seen before, and then let the peers request the transactions that they really need. This efficient encoding for the transaction id achieves a good trade-off between the size and the security.

Overall, Conflux is a high-performance and scalable public blockchain that offers a hybrid consensus mechanism, EVM compatibility, Tree-Graph ledger structure, and efficient transaction relay protocol. It is an excellent choice for developers who want to build decentralized applications that require high throughput and low confirmation latency.
