---
sidebar_position: 1
id: conflux_papers
title: 论文
displayed_sidebar: generalSidebar
keywords:
  - Conflux-Protocol
  - research-papers
  - yellow-paper
  - consensus-mechanism
  - 树图
  - GHAST
  - high-throughput
  - fast-confirmation
  - decentralized-blockchain
  - adaptive-weighted-blocks
  - technical-presentation
tags:
  - Conflux Papers
---

The Conflux Protocol is defined and analyzed in a number of research papers.

## [Conﬂux协议规范（黄皮书）](https://www.confluxnetwork.org/files/Conflux_Protocol_Specification.pdf)
[协议规范](https://www.confluxnetwork.org/files/Conflux_Protocol_Specification.pdf)是Conflux协议的参考。 它描述了账本结构、共识机制、工作量证明、激励机制和系统的许多其他方面。

## [A Decentralized Blockchain with High Throughput and Fast Confirmation](https://www.usenix.org/conference/atc20/presentation/li-chenxing)
这篇论文提出了Conflux，一个可扩展和去中心化的区块链系统，提供高吞吐量和快速确认。 Conflux运行在一种新颖的共识协议上，它乐观地处理并发区块而不丢弃任何分叉，并根据它们在Conflux账本结构（称为Tree-Graph）中的拓扑结构自适应地为区块分配权重。 自适应权重机制使Conflux能够检测和阻止活性攻击，通过在正常情况下使用一种乐观策略来实现快速确认，在活性攻击期间使用一种保守策略来确保共识进展。

## [GHAST: Breaking Confirmation Delay Barrier in Nakamoto Consensus via Adaptive Weighted Blocks](https://arxiv.org/abs/2006.01072)
这篇论文已经发表在https://arxiv.org/。 在这篇论文中，我们提出了一种新的共识协议，名为GHAST（Greedy Heaviest Adaptive Sub-Tree），它将区块组织在一个Tree-Graph结构中（即一个有向无环图（DAG）嵌入了一棵树），允许快速和并发地生成区块。

## [技术演示](https://confluxnetwork.org/files/Conflux_Technical_Presentation_20200309.pdf)
这是一个关于Conflux的主要思想和架构的技术演示，你可以找到它是如何设计的，以及Conflux如何实现对双花攻击的安全性和对活性攻击的鲁棒性。
