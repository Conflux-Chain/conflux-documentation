---
sidebar_position: 1
title: 什么是 Conflux？
---

Conflux stands out as a public blockchain with superior performance, a unique consensus mechanism, and an innovative dual-space design. These features enable Conflux to deliver a fast, secure, and decentralized platform that is well-suited for various applications, including decentralized finance and gaming.

Conflux使用了一种工作量证明（PoW）- 权益证明（PoS）混合[共识](./consensus-mechanisms/consensus-mechanisms.md)，这种设计为Conflux网络提供了高安全性、高吞吐量并保证了网络的去中心化程度。 Conflux's PoW consensus leverages the [Tree-Graph ledger structure](./consensus-mechanisms/proof-of-work/tree-graph.md) and [GHAST algorithm](./consensus-mechanisms/proof-of-work/ghast.md), delivering a high transaction throughput of up to 3,000 TPS and confirmation latency within 1 minute, while maintaining the same level of decentralization as Bitcoin and Ethereum. Conflux's PoS consensus offers the network finality, mitigating [the risk of 51% attack](./consensus-mechanisms/proof-of-stake/why-pos.md). Consequently, Conflux has the capability to efficiently handle a large number of transactions, making it a robust and reliable platform for a wide range of applications.

The Conflux network comprises two distinct [spaces](./spaces.md): Conflux [Core Space](../../core/core.mdx) and Conflux [eSpace](../../espace/learn/espace-guide.md). The Core Space is the primary blockchain network that utilizes the hybrid consensus mechanism and features a [contract sponsorship mechanism](../../core/learn/core-space-basics/internal-contracts/sponsor-whitelist-control.md). The sponsorship mechanism allows project users to interact with contracts without a balance, lowering the threshold for blockchain usage and expanding the user base. The eSpace is fully compatible with the Ethereum Virtual Machine (EVM), enabling developers to easily migrate their existing Ethereum smart contracts to Conflux eSpace and benefit from its high performance and scalability. Conflux Core Space and eSpace can communicate with each other via the [CrossSpaceCall](../../core/learn/core-space-basics/internal-contracts/crossSpaceCall.md) contract, which facilitates atomic transfer of funds and atomic execution of smart contract calls between the two spaces.

:::tip

We warmly welcome you to the Conflux documentation site, your starting point for learning about Conflux's basic concepts and development. Happy exploring!

:::
