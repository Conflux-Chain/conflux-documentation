---
sidebar_position: 1
title: What is Conflux?
displayed_sidebar: generalSidebar
---

Conflux是一条具有卓越性能、独特共识机制和创新双空间设计的公链。 这些特点使得 Conflux 能够提供一个快速、安全、去中心化的平台，非常适合于各种应用，包括去中心化金融和游戏。

Conflux使用了一种工作量证明（PoW）- 权益证明（PoS）混合[共识](./consensus-mechanisms/consensus-mechanisms.md)，这种设计为Conflux网络提供了高安全性、高吞吐量并保证了网络的去中心化程度。 Conflux采用了[Tree-Graph账本结构](./consensus-mechanisms/proof-of-work/tree-graph.md)和[GHAST算法](./consensus-mechanisms/proof-of-work/ghast.md)，实现了PoW共识机制。这些特点使得Conflux具有高达3,000TPS的高交易吞吐量和1分钟以内的确认延迟，同时保持与比特币和以太坊相同的去中心化程度。 Conflux的PoS共识提供网络最终性，减轻了[51%攻击的风险](./consensus-mechanisms/proof-of-stake/why-pos.md)。 因此，Conflux 有能力高效处理大量的交易，使其成为广泛应用的强大可靠的平台。

The Conflux network comprises two distinct [spaces](./spaces.md): Conflux [Core Space](../../core/core.mdx) and Conflux [eSpace](../../espace/build/cip90.md). Core Space 是主要的区块链网络，采用混合共识机制，具有[合约赞助机制](../../core/learn/core-space-basics/internal-contracts/sponsor-whitelist-control.md)。 代付机制使项目用户在没有余额的情况下与智能合约交互，降低了区块链使用门槛并扩大了用户群体。 eSpace 完全兼容以太坊虚拟机 (EVM) 的区块链空间，使开发人员可以轻松地将其现有的以太坊智能合约迁移到 Conflux eSpace，并从其高性能和可扩展性中获益。 Conflux的Core Space和eSpace可以通过[CrossSpaceCall](../../core/learn/core-space-basics/internal-contracts/crossSpaceCall.md)合约相互通信，该合约促进了两个空间之间的资金原子转移和智能合约调用的原子执行。

:::tip

欢迎您访问 Conflux 文档站点，这将是您了解 Conflux 基本概念和开发的起点。 祝您探索愉快！

:::
