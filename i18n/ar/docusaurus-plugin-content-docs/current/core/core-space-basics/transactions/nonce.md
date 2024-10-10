---
sidebar_position: 4
title: Nonce Management
displayed_sidebar: coreSidebar
keywords:
  - transaction
  - nonce
tags:
  - Nonce
  - Transaction
  - cfx_getNextNonce
  - Transaction Execution Order
  - Nonce Mechanism
  - Transaction Pool
  - Network Congestion
  - Transaction Failure
  - Transaction Replacement
  - Rapid Transaction Processing
  - Manual Nonce Management
  - Transaction Monitoring
  - Pending Transactions
  - Account Management
---

In Conflux, each account has a nonce value, representing the number of transactions executed by that account. This value can be obtained using the RPC method [`cfx_getNextNonce`](/docs/core/build/json-rpc/cfx-namespace/#cfx_getnextnonce). The nonce field in a transaction is used to specify the execution order, with lower nonce values indicating earlier execution. Typically, you can directly use this value as the nonce for the next transaction.

However, in scenarios with high network transaction volume (congestion) or when quick transaction submission is required, obtaining the nonce value becomes more complex. This article will provide a detailed explanation of the nonce update mechanism and how to manage transaction nonces in special circumstances.

## Nonce Mechanism

Here are some details about the **nonce mechanism**:

1. The execution of transactions on the blockchain is in the order of account nonce from small to large.
2. The initial value of nonce is 0, and the nonce is incremented by 1 for each transaction execution.
3. The nonce cannot be reused.
4. The nonce cannot be skipped: Suppose that the current nonce of an account is n. If the nonce of the transaction is m such that m > n, then the transaction **will not be executed** until all **transactions with nonce < m have been executed**.
5. After the transaction is sent via the [`cfx_sendRawTransaction`](/docs/core/build/json-rpc/cfx-namespace#cfx_sendrawtransaction) method, it will **not be executed immediately**. You must wait for the miner to pack it first. Once packed, it will be executed with a delay of 5 epochs. After the transaction is executed, the nonce of the account will be increased by one.

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

## Rapid Transaction Processing through Manual Nonce Management

In most situations, transactions are sent sequentially: sending one transaction, waiting for it to be executed, and then sending the next. In such cases, `cfx_getNextNonce` can be used directly to obtain the nonce for each transaction. However, this method has a slower processing time, typically averaging around 15 seconds per transaction.

For rapid transaction processing, managing nonce values manually is essential. The general steps for this approach are:

1. **Initial Nonce Retrieval**: Obtain the current nonce of your account, referred to as `nextNonce`, before beginning the transaction process.

2. **Transaction Submission**: For each transaction:
   - Use `nextNonce` for the transaction.
   - After transaction is successful sent to RPC nodes, increment `nextNonce`.
   - Record the hash and nonce of each transaction.

3. **Repeated Execution**: Continue step 2 for multiple transactions.

4. **Transaction Monitoring**:
   - Use `cfx_getTransactionByHash` and `cfx_getTransactionReceipt` for transaction status updates.
   - If a receipt is confirmed, stop monitoring that transaction.
   - If a transaction is dropped or reverted, resend it using the same nonce.
   - For delayed transactions, possibly due to network congestion, consider increasing `gasPrice` and resending them.

**Additional Considerations**:

- **Pending Transaction Management**: Aim to keep pending transactions in the pool to a manageable number, ideally between 100-200. Exceeding this can complicate handling if transactions are delayed or reverted.

- **Sufficient Funds**: Ensure the account has adequate CFX for both the transfer amount and transaction fees to prevent transaction processing delays.

- **Multiple Accounts for Increased Speed (for certain situations)**: Using several accounts in parellel for transactions can further enhance processing speed.

## FAQs

### How to get the correct nonce?

Through the  [`cfx_getNextNonce`](/docs/core/build/json-rpc/cfx-namespace/#cfx_getnextnonce) RPC, the next available nonce of an account can be obtained. The used nonce cannot be used again. The transaction will not be packaged if using a nonce with a value greater than the current nonce.

### How and When Does the Nonce Value Change in Transactions?

The nonce value in a transaction increments by 1 upon the transaction's execution, regardless of whether the transaction succeeds or fails. If you query the nonce using [`cfx_getNextNonce`](/docs/core/build/json-rpc/cfx-namespace/#cfx_getnextnonce) after sending a transaction, it may appear unchanged. This unchanged status occurs because the transaction is either still in the transaction pool pending inclusion in a block, or it has been included in a block but is in a 'defer' state awaiting execution.

Refer to [nonce mechanism](./nonce.md#nonce-mechanism) for more example.

### If you want to send transactions in batches, how to manage nonce?

When sending transactions in batches, you need to manually manage the nonce. Every time you send a transaction, the nonce is manually incremented by one.
In this case, for a failed transaction of which nonce is not used, you need to manually adjust the transaction parameters to resend it.
Therefore, you need to keep all transaction hashes and monitor the status of the transactions when sending in batches.

### Why doesn't the account's nonce increase immediately after transaction is packed into a block?

The account's nonce does not increase immediately after a transaction appears on chain. Instead, the nonce increases after the transaction is packaged and executed.
