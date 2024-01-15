---
sidebar_position: 4
title: Nonce Management
displayed_sidebar: coreSidebar
---

In Conflux, each account has a nonce value, representing the number of transactions executed by that account. This value can be obtained using the RPC method `cfx_getNextNonce`. The nonce field in a transaction is used to specify the execution order, with lower nonce values indicating earlier execution. Typically, you can directly use this value as the nonce for the next transaction.

However, in scenarios with high network transaction volume (congestion) or when quick transaction submission is required, obtaining the nonce value becomes more complex. This article will provide a detailed explanation of the nonce update mechanism and how to manage transaction nonces in special circumstances.

## nonce mechanism

Here are some details about the **nonce mechanism**:

1. The execution of transactions on the blockchain is in the order of account nonce from small to large.
2. The initial value of nonce is 0, and the nonce is incremented by 1 for each transaction execution.
3. The nonce cannot be reused.
4. The nonce cannot be skipped: Suppose that the current nonce of an account is n. If the nonce of the transaction is m such that m > n, then the transaction **will not be executed** until all **transactions with nonce < m have been executed**.
5. After the transaction is sent via the `cfx_sendRawTransaction` method, it will **not be executed immediately**. You must wait for the miner to pack it first. Once packed, it will be executed with a delay of 5 epochs. After the transaction is executed, the nonce of the account will be increased by one.

## Issues Caused by Improper Nonce Usage

Setting the nonce incorrectly when sending transactions can result in transaction failures or getting stuck in the transaction pool, preventing it from being packaged and executed. Below are some common error messages and their corresponding solutions.

### Discarded Due to a Too Stale Nonce

If the nonce of a newly sent transaction is less than the current nonce of the account, the transaction will be rejected, and an error message like the following will be returned:

```json
"\"Transaction 0x0101010110 is discarded due to a too stale nonce\""
```

This error indicates that the nonce value used is outdated or has been reused, and it needs to be updated to the latest nonce value.

### Tx With Same Nonce Already Inserted

If a transaction is sent to the transaction pool but has not been executed yet, sending another transaction with the same nonce will result in an error message like:

```json
"Tx with the same nonce already inserted. To replace it, you need to specify a gas price > {}""
```

In this case, you should wait for the transaction in the pool to be executed. If you want to replace the transaction in the pool, you need to set a **higher gas price** and resend it.

Sometimes, the error message may also be:

```json
"\"tx already exist\""
```

The handling is the same as above.

### discarded due to in too distant future

If the nonce value for a transaction is too large, exceeding the user's current nonce by more than 2000, an error message will be returned:

```json
"\"Transaction 0x0101010101010101 is discarded due to in too distant future\""
```

Solution: Use the correct nonce value when sending the transaction.

In addition to nonce misconfiguration causing transaction failures, there are other scenarios as well. For more details, refer to [Sending Transaction Errors](./send-tx-error.md).

### Unable to Retrieve Transaction Receipt After Sending

There is a situation where, after sending a transaction, the receipt cannot be obtained for an extended period. This is typically due to the transaction using non-consecutive nonces. In such cases, the transaction gets stuck in the transaction pool, awaiting the execution of prior transactions.

For example, if the account's current nonce is 1 and you send a transaction with nonce 5, it will be stuck in the transaction pool, waiting for transactions with nonces 1, 2, 3, and 4 to be sent and executed.

To ensure the execution of this transaction, you need to send transactions with nonces 1, 2, 3, and 4 to the transaction pool. Once these transactions are packaged, the transaction with nonce 5 will automatically be included and executed.

For more information on pending transactions, refer to [Transaction Pending](./why-transaction-is-pending.md).

## How to Quickly Send Transactions

In most cases, transactions can be sent one by one, meaning you send a transaction, wait for it to be packaged and executed, and then send the next one. In this scenario, you can directly use `cfx_getNextNonce` to obtain the nonce. However, this method of sending transactions is relatively slow, with an average transaction time of around 15 seconds.

If you need to send transactions quickly, you need to manage the nonce values for sending transactions yourself. The general implementation steps are as follows:

1. Before starting to send transactions, obtain the current nonce value of the account, denoted as `nextNonce`.
2. Use `nextNonce` to construct the next transaction to be sent. After a successful transaction, increment the `nextNonce` value and record the hash and nonce of that transaction.
3. Repeat step 2 to quickly send multiple transactions.
4. Continuously monitor the status of each transaction. Use `getTransactionByHash` and `getTransactionReceipt` to obtain the transaction status:
   - If a transaction receipt is obtained and confirmed, it means the transaction has been successfully sent, and monitoring for that transaction can be stopped.
   - If a transaction is removed from the transaction pool or rolled back after being mined (cannot be retrieved using `getTransactionByHash`), resend the transaction with the corresponding nonce.
   - If a transaction is delayed in being mined (exceeding 30 seconds or even a few minutes), it may be due to network congestion. In this case, try increasing the gasPrice and resend the transaction with the corresponding nonce.

Additionally, here are some points to note:

1. It is recommended to control the number of pending transactions in the transaction pool to be not too large, ideally between 100-200. If too large, managing subsequent transactions can become challenging if one transaction gets stuck or is rolled back.
2. Ensure that the sending account has enough CFX to cover the transfer amount and gas fees; otherwise, transaction packaging may get stuck.
3. Using multiple accounts to send transactions can further increase transaction sending speed.

## FAQs

### Why doesn't the account's nonce increase immediately after a successful transaction?

After a successful transaction, the account's nonce does not increase immediately. Instead, it increases after the transaction is packaged and executed.