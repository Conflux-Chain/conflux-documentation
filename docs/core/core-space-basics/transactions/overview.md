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

Typically, we use wallets or SDKs to send transactions, and these tools help us complete the aforementioned three steps, making the process relatively straightforward.

However, if you wish to delve deeper into the principles of transactions or encounter issues while sending transactions, this article might be helpful. Here, we will provide a detailed overview of the following aspects of Core Space transactions:

- [Basic information about transactions](./tx-fields.md), the meanings of various fields, and how to correctly set these fields.
- [Transaction encoding and signing](./encoding-signning.md).
- [Gas fee mechanism for transactions](./gas-fee.md)
- [Nonce mechanism for transactions.](./nonce.md)
- [Transaction lifecycle.](./lifecycle.md)
- [Execution status and results of transactions.](./receipt.md)
- [Common errors and solutions when sending transactions.](./send-tx-error.md)
- [Why is a transaction stuck in a pending state?](./why-transaction-is-pending.md)
- [Other frequently asked questions.](./faqs.md)

## FAQs

### What types of transactions does Core Space support?

There is only one type, similar to Ethereum 155 transactions.

### Does Core Space support EIP-1559 transactions or EIP-2718?

No, it does not support them.
