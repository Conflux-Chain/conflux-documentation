---
sidebar_position: 2
title: CIPs
displayed_sidebar: generalSidebar
keywords:
  - Conflux-Network
  - CIPs
  - Conflux-Improvement-Proposals
  - governance
  - protocol-changes
  - network-upgrades
  - hard-forks
  - community-voting
  - EIP-712
  - Base32-Checksum-Addresses
  - block-rewards
  - PoW-PoS-consensus
  - eSpace
  - on-chain-DAO
tags:
  - CIPs
---

# CIPs

## 概览

作为一个去中心化的网络，对Conflux协议的重大变化需要在实施之前达成共识。 这样的变化以**Conflux改进提案**，或简称CIP的形式提出。 在一个CIP被讨论，规范被确定，并获得广泛支持后，一组CIP被实现并作为网络升级（也称为硬分叉）推出。

提交一个CIP的过程在[CIP-1](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-1.md)中有描述。 CIP有以下阶段：

```
[ IDEA ] -> [ DRAFT ] -> [ LAST CALL ] -> [ ACCEPTED ] -> [ FINAL ]
```

更多细节，请参考[CIP-1](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-1.md)。

## 重要的CIP

以下是自Conflux主网启动以来最具影响力的一些CIP。

- [CIP-23](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-23.md): **类型结构化数据哈希和签名**。 这个CIP定义了Conflux签名标准，基于以太坊的[EIP-712](https://eips.ethereum.org/EIPS/eip-712)。
- [CIP-37](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-37.md): **引入Base32校验和地址**。 你从 [Fluent](https://fluentwallet.com/) 和其他钱包熟悉的Core Space地址格式是在CIP-37中定义的。
- [CIP-40](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-40.md): **将区块基础奖励降低到2 CFX**。 在主网启动后的第一个硬分叉升级中，区块基础奖励从7 CFX降低到2 CFX。 这也是第一个在[治理投票](https://governance.confluxnetwork.org/en/governance/)中确认的CIP。
- [CIP-43](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-43.md): **通过对质押者投票引入最终性**。 这个CIP引入了混合PoW-PoS共识的思想，在Hydra硬分叉中实现。
- [CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md): **一个完全与EVM兼容的空间**。 Hydra硬分叉中的另一个主要更新是引入了[Conflux eSpace](https://medium.com/conflux-network/conflux-espace-a-high-level-overview-cdca29bc422a)，该更新在这个CIP中定义。
- [CIP-94](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-94.md): **链参数的链上DAO投票**。 On-chain mechanism for community governance, to be rolled out in an upcoming network upgrade.

## 我如何提交CIP？

If you want to submit a Conflux Improvement Proposal, you should start by copying the [CIP Markdown template](https://github.com/Conflux-Chain/CIPs/blob/master/cip-template.md) and filling some basic information in the preamble, such as the title of this CIP, the list of authors, and the type of the change that. you are proposing. 在此之后，你可以继续填写所有的部分：`简单摘要`，`摘要`，`动机`，`规范`，`理由`，`向后兼容性`，`测试用例`，`实现`，`安全考虑`。 一旦你的CIP草案准备好了初步发布，就把它提交到[CIPs GitHub 仓库](https://github.com/Conflux-Chain/CIPs)中的一个新的[PR](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).。

## 下一步

一旦你的CIP草案被提交，CIP编辑人员会审查它并处理任何编辑问题。 此时，你应该与Conflux社区分享CIP，讨论、找到并解决问题，并努力获得对提出的变化或改进的普遍支持。
