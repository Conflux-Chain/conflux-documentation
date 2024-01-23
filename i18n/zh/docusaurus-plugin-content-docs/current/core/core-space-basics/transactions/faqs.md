---
title: 常见问题解答
sidebar_position: 15
displayed_sidebar: coreSidebar
keywords:
  - faq
  - transaction
---

## Misc

### 如何发送交易？

使用钱包（如Conflux Fluent）发送交易的最简单方法是直接设置金额并单击“发送”。 如果您是开发人员，可以使用Conflux SDK（JS，Java，Go）自己构建交易，然后通过节点RPC将其发送到链上。

### 是否可以取消或替换交易？

如果一笔交易还没有被打包进区块，仍在交易池中，那么可以通过发送一个新交易，nonce相同但是gasPrice更高的方式，替换原来的交易。

交易无法取消，但可以用价值为0的交易替换。 这是一种达到与取消交易相同结果的方法。

### Why is a transaction packaged into multiple blocks simultaneously?

This is due to the concurrent block emission caused by the tree chart ledger structure. Although a transaction may be packaged into multiple blocks, it will ultimately be executed in only one block.

### What types of transactions does Core Space support?

There is only one type, similar to Ethereum 155 transactions.

### Does Core Space support EIP-1559 transactions or EIP-2718?

No, it does not support them.

### What's the differences between Ethereum 155 Transaction and Core Space Transaction

Compared to Ethereum `155 transaction`, transactions through Conflux Core Space have several differences:

- Fields are different: with 2 more field `storageLimit`, and `epochHeight`.
- 编码交易时的差异：
  1. The RLP structure to compute transaction hash is `[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data]`
  2. The RLP structure of a rawTx is `[[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data], v, r, s]`
- The `v` value signed by ecdsaSign will not be specifically modified in Conflux Core Space, while in Ethereum, there will be some special treatments to the v value.
