---
sidebar_position: 0
title: Overview
keywords:
  - transaction
displayed_sidebar: coreSidebar
---

Transaction is the only method of storing or modifying data on the blockchain. This includes both the transfer of CFX and the modification of contract states.

To quick learn about transactions, you can read the [Transaction](/docs/general/conflux-basics/transactions.md) page. This page will focus on the Core Space transactions.

The process of sending a transaction consists of three steps: 

1. Preparing the transaction information.
2. Signing and encoding the transaction.
3. Broadcasting it to the network.

通常我们使用钱包或 SDK 来发送交易，这些工具会帮助我们完成上述三个步骤，且使用起来比较简单。

但是如果你想深入了解交易的原理，或者在发送交易时遇到问题，那么这篇文章可能会对你有所帮助。在这里我们会详细介绍 Core Space 交易的如下内容：

- 交易的基本信息，各个字段的含义，以及如何正确的设置这些字段。
- 交易的编码和签名方式。
- 交易的 Gas 费机制。
- 交易的 nonce 机制。
- 交易的生命周期。
- 交易执行的状态及结果。
- 交易的回滚机制。
- 发送交易的常见错误及解决方案。
- 为什么交易一直处于 pending 状态？
- 其他常见问题。
