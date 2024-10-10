---
sidebar_position: 0
title: Overview
keywords:
  - transaction
tags:
  - Transactions
  - Core Space
  - Transaction Fields
  - Nonce
  - Gas
  - Gas Price
  - Storage Limit
  - Transaction Fees
  - Encoding
  - Signing
  - Transaction Lifecycle
  - Transaction Receipt
  - Pending Transactions
  - cfx_sendRawTransaction
  - Wallets
  - SDKs
displayed_sidebar: coreSidebar
---

Transaction is an important concept in blockchain. If you are not familiar with the concept of transactions and would like to quickly understand it, you can read [Transaction Quick Intro](/docs/general/conflux-basics/transactions.md).

Typically, we use [wallets](../../../general/conflux-basics/wallets.md) or [SDKs](../../build/sdks-and-tools/sdks.md) to send transactions, and these tools will assist us in completing complex tasks such as constructing transactions, sending them to the network, and ultimately waiting for the transaction be confirmed or finalized, making the process relatively straightforward.

However, if you wish to delve deeper into the principles of transactions or encounter issues while sending transactions, you may need to understand the details of transactions.

## Transactions Fields

A transaction consists of multiple fields, each with its own meaning and purpose. To understand their meanings and how to correctly set these fields, please refer to [Transaction Fields](./tx-fields.md). If a transaction fails to send or gets stuck without being mined, it may be due to incorrect settings of certain transaction fields.

## Nonce

The `nonce` field in a transaction is crucial, as it determines the execution order of transactions. Nonce updates are not real-time, so understanding the [nonce](./nonce.md) is essential, especially when there is a need to quickly send transactions to the chain. Additional [nonce management guidelines](./nonce.md) are also provided for such cases.

## Transaction Fees

The `gas`, `gasPrice` as well as `storageLimit` fields in a transaction are also crucial. These fields are used to set the execution cost of the transaction. Setting `gas` too low may result in transaction failure, while setting it too high leads to unnecessary fees. The `gasPrice` field affects the transaction's priority in the block, particularly in congested networks. `storageLimit` is a unique field used to specify [storage collateral](../storage.md) could be used by a transaction. Understanding the [transaction fee](./transaction-fee.md) can help you set the fields more effectively.

## Encoding and Signing

After preparing all transaction fields, the transaction needs to be [encoded and signed](./encoding-signning.md) according to specific rules before being sent. It is then sent to the network using the RPC method [`cfx_sendRawTransaction`](/docs/core/build/json-rpc/cfx-namespace#cfx_sendrawtransaction).

## Lifecycle

Once a transaction is sent to the network, it doesn't immediately get mined and executed. Instead, it undergoes a series of state changes. Understanding the [transaction lifecycle](./lifecycle.md) can help you better comprehend the status changes of a transaction and troubleshoot issues encountered during the transaction sending process.

## Transaction Receipt

After a transaction is executed, a [transaction receipt](./receipt.md) is generated. The transaction receipt includes information about the transaction's execution results, whether it was successful, how much fee was paid, and details about the block in which the transaction resides.

## Transaction Sending Failures

During the process of sending a transaction, various issues may arise. It could be an error in obtaining values for transaction fields, network problems when calling RPC, or errors when calling the [`cfx_sendRawTransaction`](/docs/core/build/json-rpc/cfx-namespace#cfx_sendrawtransaction) method. We have compiled common issues and solutions related to sending transactions, please refer to [Common Transaction Sending Issues](./send-tx-error.md).

## Pending Transactions

After successfully sending a transaction, it should normally be mined within a few seconds. However, there are cases where a transaction remains pending. This can be due to network congestion and a low `gasPrice`, or an incorrect `nonce` setting (often caused by rapid transaction sending). Please refer to [Reasons for Pending Transactions](./why-transaction-is-pending.md) to avoid or resolve this issue.

## FAQs

[Frequently asked questions](./faqs.md)
