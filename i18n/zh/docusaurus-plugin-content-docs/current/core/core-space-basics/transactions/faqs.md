---
title: 常见问题解答
sidebar_position: 15
displayed_sidebar: coreSidebar
keywords:
  - 交易
  - Sending Transactions
  - Transaction Cancellation
  - Transaction Replacement
  - Transaction Types
  - Gas Price
  - EIP-1559
  - EIP-2718
  - Tree Graph
  - Concurrent Block Emission
tags:
  - 155 transaction
  - Core Space transaction differences with Ethereum
  - 交易
---

## 其他

### 如何发送交易？

使用钱包（如Conflux Fluent）发送交易的最简单方法是直接设置金额并单击“发送”。 如果您是开发人员，可以使用Conflux SDK（JS，Java，Go）自己构建交易，然后通过节点RPC将其发送到链上。

### 是否可以取消或替换交易？

如果一笔交易还没有被打包进区块，仍在交易池中，那么可以通过发送一个新交易，nonce相同但是gasPrice更高的方式，替换原来的交易。

交易无法取消，但可以用价值为0的交易替换。 这是一种达到与取消交易相同结果的方法。

### 为什么一笔交易会同时打包到多个区块中？

这是由树状图账本结构引起的并发区块生成。（这是由于树状账本结构引起的并发区块发射所致。） 尽管一笔交易可能被打包到多个区块中，但最终它只会在一个区块中执行。

### Core Space支持哪种类型的交易？

只支持一种类型，类似于以太坊的155 交易。

### 以太坊155交易和Conflux Core Space交易之间的区别是什么：

与以太坊155交易相比，通过Conflux Core Space的交易有以下几点不同：

- 字段不同: 增加了两个字段 `storageLimit`, and `epochHeight`。
- 编码交易时的差异：
  1. 计算交易哈希的 RLP 结构为：[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data]\`
  2. RawTx 的 RLP 结构为：[[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data], v, r, s]\`
- 在Conflux Core Space中，由ecdsaSign签名的`v`值不会被特别修改，而在以太坊中，对v值会进行一些特殊处理。

### Core Space支持EIP-1559交易或EIP-2718吗？

Core space支持类型化交易以及EIP-1559中描述的`maxFeePerGas`和`maxPriorityFeePerGas`交易字段。 需要注意的是，Conflux Core Space采用了不同的RLP结构来实现类型化交易，这与以太坊 155 交易和 Core Space 传统交易之间的差异类似。
