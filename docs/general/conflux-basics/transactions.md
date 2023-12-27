---
title: Transactions
sidebar_position: 9
keywords:
  - transaction
displayed_sidebar: generalSidebar
---

A transaction is a single instruction composed by an external actor with a Conflux account, and this instruction is cryptographically signed using the sender account’s private key. A transaction can involve a **simple transfer of CFX** (the native currency of Conflux), a **transfer of tokens** (such as ERC20 or ERC721), a **deployment of a new smart contract**, or an **execution of a function on an existing smart contract**. Transactions are the only way to store or update data on the blockchain.

## Prerequisites

To help you better understand this page, we recommend you first read [Accounts](./accounts.md).

## What's a Transaction?

An transaction refers to an action initiated by an externally-owned account, in other words an account managed by a human, not a contract. For example, if Bob sends Alice 1 CFX, Bob's account must be debited and Alice's must be credited. This state-changing action takes place within a transaction.

![](./img/tx.png)

Transactions, which change the state of the EVM, need to be broadcast to the whole network. Any node can broadcast a request for a transaction to be executed on the EVM; after this happens, a validator will execute the transaction and propagate the resulting state change to the rest of the network.

A submitted transaction includes the following information:

* from – the address of the sender, that will be signing the transaction. This will be an externally-owned account as contract accounts cannot send transactions.
* recipient – the receiving address (if an externally-owned account, the transaction will transfer value. If a contract account, the transaction will execute the contract code)
* signature – the identifier of the sender. This is generated when the sender's private key signs the transaction and confirms the sender has authorized this transaction
* nonce - a sequentially incrementing counter which indicates the transaction number from the account
* value – amount of CFX to transfer from sender to recipient (denominated in Drip, where 1CFX equals 1e+18Drip)
* input data – optional field to include arbitrary data
* gasLimit – the maximum amount of gas units that can be consumed by the transaction. The EVM specifies the units of gas required by each computational step
* gasPrice - the price of the consumed gas to be included as a tip to the validator
* chainId - the id of the blockchain, which is used to prevent replay attacks

The Core Space transaction includes the following additional information:

* storageLimit - the maximum amount of storage space that can be consumed by the transaction. 
* epochHeight - the epoch number of the blockchain, which is used to sets an expiration time for the transaction

## Gas Fee

Transactions require a fee and must be included in a validated block. The fee is paid in CFX and is calculated by multiplying the gasCharged by the gasPrice.

Gas fee 被用来支付矿工费用，来激励他们打包，验证区块，维护区块链的安全。

具体的计算方式可参看 [Transaction Fee](./fake-link)。

## Transaction Lifecycle

Once the transaction has been submitted the following happens:

1. A transaction hash is cryptographically generated: 0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017
2. The transaction is then broadcasted to the network and added to a transaction pool consisting of all other pending network transactions.
3. A validator must pick your transaction and include it in a block in order to verify the transaction and consider it "successful".
4. As time passes the block containing your transaction will be upgraded to "justified" then "finalized". These upgrades make it much more certain that your transaction was successful and will never be altered. Once a block is "finalized" it could only ever be changed by a network level attack that would cost many billions of dollars.

想要了解更详细的交易生命周期，可参看 [Transaction Lifecycle](./fake-link)。

## Transaction Status

被打包进区块的交易，最终会被执行并产生交易 **Receipt**，但并不是所有的交易都会执行成功，通常交易的执行有两种状态**成功**或**失败**. 

eSpace 交易可通过 Receipt 的 **status** 字段来判断执行状态， 1 代表成功，0 代表失败。

Core 交易可通过 Receipt 的 **outcomeStatus** 字段来判断执行状态，0 代表成功，1 代表失败。

除此以外 Receipt 还包含了交易执行的[其他信息](./fake-link)，例如区块信息，事件信息等

## 其他

1. 发送交易的常见问题
2. 交易提交后为什么一直不执行？