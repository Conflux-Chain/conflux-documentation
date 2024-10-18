---
sidebar_position: 2
title: 树图账本结构
displayed_sidebar: generalSidebar
keywords:
  - Conflux-Network
  - 树图
  - GHAST
  - consensus-mechanism
  - distributed-ledger
  - forks
  - longest-chain-rule
  - scalability
  - security
  - parent-edge
  - reference-edges
  - pivot-chain
  - DAG
  - transaction-ordering
  - block-creation-rate
tags:
  - Proof-of-Work
---

# 树图账本结构

Conflux的核心是[树图](https://arxiv.org/pdf/1805.03870.pdf) 账本结构和 [GHAST](https://confluxnetwork.medium.com/conflux-research-group-ghast-mechanism-adaptive-weight-ghast-explained-part-1-ffe8224a7282)链选择规则。

分布式账本需要处理并发区块，也就是分叉。 像比特币和以太坊这样的区块链使用[最长链规则](https://confluxnetwork.medium.com/advantages-and-disadvantages-of-the-longest-chain-rule-bc27225a2728) 来选择一个分叉，并丢弃其余的所有分叉。 被丢弃的区块既不能为系统的安全性贡献，也不能为其吞吐量贡献。 因此，这些区块链存在着可扩展性和安全性之间的[固有冲突](https://eprint.iacr.org/2013/881.pdf)。 而Conflux则将所有并发区块纳入其账本，实现了非常高的安全性和性能水平。

首先，Conflux用GHAST链选择规则取代了最长链规则。 根据这个规则，一个分叉是根据在其子树上的所有算力来选择的，而不仅仅是一条链上的算力，这反过来使得这种选择更具健壮性。 这使得Conflux可以使用高达每秒2个区块的区块创建速率。 GHAST还可以抵抗活性攻击。

其次，Conflux使用树图作为其账本结构。 每个区块除了有一个单一的父边之外，还包含了指向前面区块的引用边列表。 这引入了关于区块之间先后关系的新信息。 这种结构本质上是一个[有向树](https://en.wikipedia.org/wiki/Polytree)（仅父边）嵌入在一个[DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph)（所有边）中，因此称为树图。

当处理交易时，Conflux首先使用GHAST在树图中选择一个主链。 然后，使用主链和引用边，将账本排序为一个线性的区块序列。 最后，按照这个线性顺序执行交易。

![Tree Graph](../../img/tree_graph.jpg)
