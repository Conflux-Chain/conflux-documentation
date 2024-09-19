---
title: FAQs
sidebar_position: 15
displayed_sidebar: coreSidebar
keywords:
  - faq
  - transaction
---

## Misc

### How to send a transaction?

The easiest way to send a transaction is to use a wallet such as Conflux Fluent, and click “send” to directly set the amount. If you are a developer, you can use the Conflux SDK (JS, Java, Go) to construct the transaction yourself, and then send it to the chain via the node RPC.

### Can a transaction be canceled or replaced?

If a transaction has not been packed into a block and is in the transaction pool, it can be replaced by sending a new transaction with the same nonce and a higher gasPrice.

Transactions cannot be canceled but can be replaced with a transaction of value 0. This is a way to reach the same result as canceling the transaction.

### Why is a transaction packaged into multiple blocks simultaneously?

This is due to the concurrent block emission caused by the tree chart ledger structure. Although a transaction may be packaged into multiple blocks, it will ultimately be executed in only one block.

### What types of transactions does Core Space support?

There is only one type, similar to Ethereum 155 transactions.

### What's the differences between Ethereum 155 Transaction and Core Space Transaction

Compared to Ethereum `155 transaction`, transactions through Conflux Core Space have several differences:

- Fields are different: with 2 more field `storageLimit`, and `epochHeight`.
- Differences when encoding transactionss:
  1. The RLP structure to compute transaction hash is `[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data]`
  2. The RLP structure of a rawTx is `[[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data], v, r, s]`
- The `v` value signed by ecdsaSign will not be specifically modified in Conflux Core Space, while in Ethereum, there will be some special treatments to the v value.

### Does Core Space support EIP-1559 transactions or EIP-2718?

Core space supports typed transaction as well as `maxFeePerGas`, `maxPriorityFeePerGas` transaction fields as described in EIP-1559. But it should be noticed Conflux Core Space adopts a different RLP structure to implement typed transaction, just similar to the difference between Ethereum 155 transaction and Core Space legacy transaction.
