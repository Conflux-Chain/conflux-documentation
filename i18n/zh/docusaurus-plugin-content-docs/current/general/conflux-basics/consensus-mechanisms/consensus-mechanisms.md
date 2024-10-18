---
sidebar_position: 2
title: 共识
displayed_sidebar: generalSidebar
keywords:
  - Conflux-Network
  - consensus-mechanism
  - blockchain
  - distributed-ledger
  - Proof-of-Work
  - Proof-of-Stake
  - hybrid-consensus
  - 树图
  - GHAST
  - transaction-validation
  - decentralization
  - security
  - scalability
tags:
  - Consensus Mechanisms
---

在区块链中，**共识**指的是网络中所有节点对账本当前状态达成一致的过程。 为了实现共识，网络中的每个节点必须验证和确认添加到区块链上的新交易是有效的，并遵循协议的规则。 This process is typically achieved through a consensus algorithm, such as Proof of Work or Proof of Stake, which incentivizes nodes to maintain the consistency and availability of the blockchain.

Consensus is critical to the security and trustworthiness of the blockchain, as it ensures that all participants in the network have a consistent view of the state of the ledger and that new transactions will be appended to the blockchain.

Conflux的共识是一种结合了PoW和PoS的混合机制。 PoW矿工产生区块，并使用树图算法对它们进行排序，实现高吞吐量和可扩展性。 PoS节点对主链区块进行签名以确定它们，从而降低分叉概率。 PoS节点是根据已质押的CFX代币来选择的，这能激励PoS节点诚实地行事。 PoW/PoS共识使得Conflux能够在不牺牲去中心化的情况下实现高性能。

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```
