---
sidebar_position: 0
title: Overview
keywords:
  - transaction
displayed_sidebar: coreSidebar
---

Transaction is an important concept in blockchain. If you are not familiar with the concept of transactions and would like to quickly understand it, you can read [Transaction Quick Intro](/docs/general/conflux-basics/transactions.md).

Typically, we use wallets or SDKs to send transactions, and these tools will assist us in completing complex tasks such as constructing transactions, sending them to the network, and ultimately confirming them., making the process relatively straightforward.

However, if you wish to delve deeper into the principles of transactions or encounter issues while sending transactions, you may need to understand the details of transactions.

## Transactions Fields

A transaction consists of multiple fields, each with its own meaning and purpose. To understand their meanings and how to correctly set these fields, please refer to [Transaction Fields](./tx-fields.md). If a transaction fails to send or gets stuck without being mined, it may be due to incorrect settings of certain transaction fields.

## Nonce Mechanism

The `nonce` field in a transaction is crucial, as it determines the execution order of transactions. Nonce updates are not real-time, so understanding the [nonce mechanism](./nonce.md) is essential, especially when there is a need to quickly send transactions to the chain. Additional [nonce management](./nonce.md) may be required in such cases.

## Gas Fees

The `gas` and `gasPrice` fields in a transaction are also crucial. These fields are used to set the execution cost of the transaction. Setting `gas` too low may result in transaction failure, while setting it too high leads to unnecessary fees. The `gasPrice` field affects the transaction's priority in the block, particularly in congested networks. Understanding the [gas mechanism](./gas-fee.md) can help you set these two fields more effectively.

## Encoding and Signing

After preparing all transaction fields, the transaction needs to be [encoded and signed](./encoding-signning.md) according to specific rules before being sent. It is then sent to the network using the RPC method [`cfx_sendRawTransaction`](/docs/core/build/json-rpc/cfx-namespace#cfx_sendrawtransaction).

## Lifecycle

Once a transaction is sent to the network, it doesn't immediately get mined and executed. Instead, it undergoes a series of state changes. Understanding the [transaction lifecycle](./lifecycle.md) can help you better comprehend the status changes of a transaction and troubleshoot issues encountered during the transaction sending process.

## Transaction Receipt

After a transaction is executed, a [transaction receipt](./receipt.md) is generated. The transaction receipt includes information about the transaction's execution results, whether it was successful, how much fee was paid, and details about the block in which the transaction resides.

## Transaction Sending Failures

During the process of sending a transaction, various issues may arise. It could be an error in obtaining values for transaction fields, network problems when calling RPC, or errors when calling the [`cfx_sendRawTransaction`](/docs/core/build/json-rpc/cfx-namespace#cfx_sendrawtransaction) method. We have compiled common issues and solutions related to sending transactions, please refer to [Common Transaction Sending Issues](./send-tx-error.md).

## Pending Transactions

After successfully sending a transaction, it should normally be mined within a few seconds. However, there are cases where a transaction remains pending. This can be due to network congestion and a too-low `gasPrice`, or an incorrect `nonce` setting (often caused by rapid transaction sending). Please refer to [Reasons for Pending Transactions](./why-transaction-is-pending.md) to avoid or resolve this issue.

## Transaction Execution Failures

Some transactions may result in failure. The `txExecErrorMsg` field in the transaction receipt may contain error information, but sometimes it is minimal. Analysis based on the specific situation and environment is required. Possible errors include:

1. `VmError(OutOfGas)`: The transaction specified gas fee is not enough.
2. `VmError(ExceedStorageLimit)`: The transaction specified upper-limit storage is not enough.
3. `NotEnoughCash`: Insufficient user balance.
4. `Vm reverted, Reason provided by the contract: xxxx`: The contract execution failed with details provided.
5. `VmError(BadInstruction xxxx)`: Contract deployment failed.
6. `Vm reverted, xxxx`: The contract execution failed with no details provided.

## FAQs

## Can a transaction be canceled or replaced?

If a transaction has not been packed into a block and is in the transaction pool, it can be replaced by sending a new transaction with the same nonce and a higher gasPrice.

Transactions cannot be canceled but can be replaced with a transaction of value 0. This is a way to reach the same result as canceling the transaction.

## How do I know that a transaction has been successfully executed?

Check the `status` field of the transaction or the `outcomeStatus` field of the receipt to determine whether the transaction is successful, 0 means success and 1 means failure.

## How to determine whether a transaction is safe and confirmed?

If the epochNumber of the epoch that the transaction belongs to is less than the currently confirmed epochNumber, it is considered safe.
You can also get the confirmationRisk of the block that the transaction belongs to through the [`cfx_getConfirmationRiskByHash`](/docs/core/build/json-rpc/cfx-namespace/#cfx_getconfirmationriskbyhash) RPC.
If the obtained value is less than 1e-8, it is considered safe.

## What is a receipt, and what information does it contain?

A receipt is the receipt information of a transaction. Through a receipt, you can know some results of the transaction execution, such as whether the transaction is successful, whether a contract is created, gas fee usage, eventLog generated by a transaction execution, etc.

## Why is a transaction packaged into multiple blocks simultaneously?

This is due to the concurrent block emission caused by the tree chart ledger structure. Although a transaction may be packaged into multiple blocks, it will ultimately be executed in only one block.

### What types of transactions does Core Space support?

There is only one type, similar to Ethereum 155 transactions.

### Does Core Space support EIP-1559 transactions or EIP-2718?

No, it does not support them.

### What's the differences between Ethereum 155 Transaction and Core Space Transaction

Compared to Ethereum `155 transaction`, transactions through Conflux Core Space have several differences:

* Fields are different: with 2 more field `storageLimit`, and `epochHeight`.
* Differences when encoding transactionss:
  1. The RLP structure to compute transaction hash is `[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data]`
  2. The RLP structure of a rawTx is `[[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data], v, r, s]`
* The `v` value signed by ecdsaSign will not be specifically modified in Conflux Core Space, while in Ethereum, there will be some special treatments to the v value.

### More Faqs

[Other frequently asked questions.](./faqs.md)
