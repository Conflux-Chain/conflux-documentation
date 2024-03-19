---
sidebar_position: 7
title: Why TX is Pending?
keywords:
  - transaction
displayed_sidebar: coreSidebar
---

由于当前的区块链系统可能存在吞吐量低和准入门槛高等问题，因此通过区块链发送的某些交易可能无法被打包确认。 以 Conflux 为例，Conflux 网络通常每秒可以产生两个区块。 在交易` 成功发送后 `，它应该在约` 20 秒 `内被打包并执行，具体时间取决于网络拥塞程度。 如果交易长时间未被打包，很可能出现了问题，需要发送者进行手动干预。

![Tx Pending](./img/tx-pending-01.png)

## 如何查找待处理交易的原因？

如果待处理交易已成功插入 [ConfluxScan](https://www.confluxscan.io/) 使用的节点的交易池中，则可以在 Scan 上通过哈希搜索该交易，并在交易详细信息页面上查看交易状态为` Pending `。

![Tx Pending](./img/scan-pending-detail-02.png)

 此时，我们可以进入交易发送者的` 账户详情页面 `，并通过账户页面上的` View Pending Txns `选项卡查看用户的待处理交易。

![Tx Pending](./img/scan-pending-entry-03.png)

在这个选项卡中，您可以看到该用户的待处理交易总数以及最早的待处理交易（最多 10 笔）。 The most important thing is that you can also see the **pending reasons for the first pending transaction**.

![Tx Pending](./img/scan-pending-tx-list-04.png)

该页面使用 RPC 方法 [`cfx_getAccountPendingTransactions`](../../../core/build/json-rpc/cfx-namespace.md#cfx_getaccountpendingtransactions) 来获取一个账户的当前待处理交易信息。

## Possible Pending Reasons

There are four possible reasons:

* Wrong nonce
* Stale epoch height
* Internal error
* Ready to pack

### Wrong Nonce

This kind of error means that the sent transaction used the wrong nonce. Normally, the transaction needs to be executed one by one in the order of nonce. If there are transactions with a smaller nonce pending in the queue or missing, this transaction will wait until all previous transactions are successfully executed.

If non-consecutive nonce are used when sending a transaction or if certain transactions in the transaction pool are cleared by garbage collection (GC) during network congestion, it will result in some transactions pending in the transaction pool, unable to be packaged for an extended period.

In this case, we need to **resend the transaction with the correct nonce**. 需要注意的是，在所有先前的交易都执行完成之后（并且余额充足的情况下），待处理交易将自动执行。

### Stale Epoch Height

The error message tells that `The epoch height of the first tx is too old to be packed. The sender needs to submit a new transaction to update the tx pool.`. Update the corresponding transaction with a correct `epochHeight` parameter(e.g. use `cfx_epochNumber`) will solve the issue.

### 内部错误

The error message tells that `The full node internal error. The sender needs to submit a new transaction to update the tx pool.`. This is typically triggered by certain complex balance setting. Make sure your account has enough balance, then submit a new transaction will solve the issue.

### Ready to Pack

This situation means that the transaction itself has reached the conditions that can be packaged, but because the entire network is relatively congested or for other reasons, it has not been packaged.

如果交易长时间处于这种状态，可以适当提高交易的 gasPrice 以重新发送交易，这可以提高交易的打包和执行速度。

## How to solve?

First make sure your account has enough balance, then if a transaction is pending for a skipped nonce, you should resend the transaction with **the correct nonce**. If a transaction is pending for other reasons, you can **resend the transaction with a higher gasPrice** and same nonce.

### 如何正确设置 gasPrice？

交易的打包和执行速度主要受交易的 gasPrice 影响。 gasPrice 越高，交易被矿工打包的速度就越快，因此正确设置 gasPrice 非常重要。

You can use the [`cfx_gasPrice`](/docs/core/build/json-rpc/cfx-namespace#cfx_gasprice) RPC method of fullnode to get a suggested gasPrice value. 该方法会根据最新几个块的 gas 使用情况和其中交易的 gasPrice 给出建议的值。

In the case of network congestion, you can check the current gasPrice situation on Scan's gasPrice panel. Using the highest gasPrice allows you to achieve the fastest transaction processing speed.

![](./img/scan-gas-price2.png)
