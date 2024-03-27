---
sidebar_position: 4
title: Nonce Management
displayed_sidebar: coreSidebar
keywords:
  - transaction
  - nonce
---

在Conflux中，每个账户都有一个nonce值，表示该账户执行的交易序号。 可以使用RPC方法[`cfx_getNextNonce`](/docs/core/build/json-rpc/cfx-namespace/#cfx_getnextnonce)获取此值。 交易中的nonce字段用于指定执行顺序，较低的nonce值表示较早地执行。 通常情况下，可以直接将这个值作为下一次交易的nonce。

然而，在网络交易量高(拥堵)或需要快速提交交易的情况下，获取nonce值变得更为复杂。 本文将详细解释nonce更新机制以及如何在特殊情况下管理交易的nonce。

## Nonce机制

这里是一些**nonce机制**的细节:

1. 在区块链上，交易的执行顺序是按照账户的nonce值从小到大的顺序执行的。
2. Nonce 的初始值是 0，每执行一次交易，nonce 就增加 1。
3. Nonce 不能重复使用。
4. Nonce 不能跳过：假设一个账户的当前 nonce 是 n。 如果交易的nonce值为m，且m > n, 那么该交易**不会被执行** 直到所有**nonce < m的交易都被执行**。
5. 通过[`cfx_sendRawTransaction`](/docs/core/build/json-rpc/cfx-namespace#cfx_sendrawtransaction) 方法发送交易后, **不会立即执行**。 你必须等待矿工先打包它。 一旦打包，它将延迟 5 个 epoch 执行。 交易执行后，账户的 nonce 将增加一。

## Nonce 使用不当引起的问题

用户在发送交易时设置 nonce 不正确可能会导致交易失败或在交易池中卡住，无法被打包和执行。 以下是一些常见的错误消息及其相应的解决方案。

### 由于nonce值过时而被丢弃

如果新发送的交易的nonce小于账户的当前nonce，则该交易将被拒绝，并返回如下的错误消息：

```json
"\"Transaction 0x0101010110 is discarded due to a too stale nonce\""
```

此错误表示使用的nonce 值已经过时或已被重新使用，需要更新到最新的nonce值。

### 交易的nonce与交易池中的交易相同

如果交易已发送到交易池但尚未执行，再发送具有相同nonce的交易将导致如下错误消息，比如：

```json
"Tx with the same nonce already inserted. To replace it, you need to specify a gas price > {}""
```

在这种情况下，你应该等待交易池中的交易被执行。 If you want to replace the transaction in the pool, you need to set a **higher gas price** and resend it.

有时，错误消息也可能是：

```json
"\"tx already exist\""
```

处理方式与上面相同。

### 由于nonce值过大而被丢弃

如果交易的nonce值过大，比用户当前nonce值大2000以上，将返回如下错误消息：

```json
"\"Transaction 0x0101010101010101 is discarded due to in too distant future\""
```

解决方案: 发送交易时使用正确的nonce值。

除了nonce配置错误导致交易失败外，还会有一些其他情况。 欲了解更多详情，请参阅[发送交易错误](./send-tx-error.md)。

### 发送交易后无法获取交易收据

有一种情况是，在发送交易后，在长时间内无法获取交易收据。 这通常是由于交易使用非连续的nonce值导致的。 在这种情况下，交易被卡在交易池内，等待先前交易的执行完成。

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

## 常见问题解答

### 如何获得正确的nonce？

Through the  [`cfx_getNextNonce`](/docs/core/build/json-rpc/cfx-namespace/#cfx_getnextnonce) RPC, the next available nonce of an account can be obtained. 使用过的 nonce 值不能再次使用。 如果使用一个大于当前 nonce 值的 nonce，交易将无法被打包。

### How and When Does the Nonce Value Change in Transactions?

The nonce value in a transaction increments by 1 upon the transaction's execution, regardless of whether the transaction succeeds or fails. If you query the nonce using [`cfx_getNextNonce`](/docs/core/build/json-rpc/cfx-namespace/#cfx_getnextnonce) after sending a transaction, it may appear unchanged. This unchanged status occurs because the transaction is either still in the transaction pool pending inclusion in a block, or it has been included in a block but is in a 'defer' state awaiting execution.

Refer to [nonce mechanism](./nonce.md#nonce-mechanism) for more example.

### 如果您想批量发送交易，如何管理 nonce？

当批量发送交易时，需要手动管理 nonce 值。 每次发送交易时，需要手动将 nonce 值加一。
在这种情况下，如果有一个交易失败，导致它的 nonce 没有被使用，您需要手动调整交易参数并重新发送该交易。
因此，在批量发送交易时，您需要保留所有交易的哈希值，并监控这些交易的状态。

### Why doesn't the account's nonce increase immediately after transaction is packed into a block?

The account's nonce does not increase immediately after a transaction appears on chain. Instead, the nonce increases after the transaction is packaged and executed.
