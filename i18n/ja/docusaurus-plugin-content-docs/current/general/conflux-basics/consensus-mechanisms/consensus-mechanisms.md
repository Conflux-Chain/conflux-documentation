---
sidebar_position: 2
title: Consensus
displayed_sidebar: generalSidebar
keywords:
  - Conflux-Network
  - consensus-mechanism
  - blockchain
  - distributed-ledger
  - Proof-of-Work
  - Proof-of-Stake
  - hybrid-consensus
  - Tree-Graph
  - GHAST
  - transaction-validation
  - decentralization
  - security
  - scalability
tags:
  - Consensus Mechanisms
---

In blockchain, **consensus** refers to the process by which all nodes in the network agree on the current state of the ledger. To achieve consensus, each node in the network must validate and confirm that new transactions added to the blockchain are valid and follow the rules of the protocol. This process is typically achieved through a consensus algorithm, such as Proof of Work or Proof of Stake, which incentivizes nodes to maintain the consistency and availability of the blockchain.

Consensus is critical to the security and trustworthiness of the blockchain, as it ensures that all participants in the network have a consistent view of the state of the ledger and that new transactions will be appended to the blockchain.

Conflux’s consensus is a hybrid mechanism that combines PoW and PoS. PoW miners produce blocks and sort them using the Tree-Graph algorithm, achieving high throughput and scalability. PoS nodes sign pivot blocks to finalize them, which reduces fork probability. The PoS nodes are selected based on their stake in CFX tokens, which incentivizes them to behave honestly. The PoW/PoS consensus enables Conflux to achieve high performance without compromising decentralization.

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```
