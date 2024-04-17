---
sidebar_position: 3
title: Transaction Fee
displayed_sidebar: coreSidebar
keywords:
  - transaction
  - gas
  - 存储抵押
---

在Conflux网络的核心空间中，交易由矿工处理，矿工为其服务收费。 这个费用激励矿工参与网络并保持其顺畅运行。 这些费用是用CFX支付的，并由交易发起者通过交易中的`gas`, `gasPrice` and `storageLimit` 字段指定。

## 交易中的燃气费

在Conflux中，交易的燃气费由两个关键字段确定：`gas` and `gasPrice`。

- **`gas`**: 该字段指定了交易可以消耗的最大计算能力。
- **`gasPrice`**:表示您愿意支付的每单位计算能力。

实际的燃气成本计算为 `gasCharged`乘以`gasPrice`。 需要注意，`gasCharged`不会超过 `gas` 字段设定的限制。

有关Conflux中燃气及其计算的更详细信息，请访问我们的 [关于燃气的详细文档](../../zh-CN/docs/general/conflux-basics/gas.md).。

### How to Set `gasPrice` field

The Conflux consensus doesn't set a limit for transaction gas price and the minimum gas price depends on the miners' setting. Here are the minimum gas price settings of Confura, the public RPC endpoints supported by Conflux foundation:

- Core space: 1 GDrip
- eSpace: 20 GDrip

Besides, it is recommended to set gas price based on Core space / eSpace RPC return value:

- core space: [`cfx_gasPrice`](/docs/core/build/json-rpc/cfx-namespace#cfx_gasprice)
- eSpace: `eth_gasPrice`

#### Speeding up a transaction

`gasPrice` affects the speed at which a transaction is included in a block. Generally, the higher the `gasPrice`, the faster the transaction is likely to be mined. However, a higher `gasPrice` also means higher transaction fees.

In situations of network congestion, a transaction may experience delays in being mined and added to the blockchain. In such cases, it is advisable to increase the `gasPrice` to expedite the transaction. The gas station in the upper right corner of Scan can be used to check the current gas price situation on the network.

![](./img/scan-gas-price2.png)

Using the **High** value for `gasPrice` corresponds to obtaining the fastest transaction processing speed. For transactions that have already been sent, it is possible to increase the `gasPrice` and resend the transaction to replace the previous one.

### How to Set `gas` field

For regular CFX transfers, setting the gas to 21,000 is sufficient.

For contract interactions, it is recommended to set gas based on the return value of core space / espace RPC:

- Core space: `gasLimit` field of [`cfx_estimateGasAndCollateral`](/docs/core/build/json-rpc/cfx-namespace/#cfx_estimategasandcollateral)
- eSpace: `eth_estimateGas`

These methods simulate the execution of the transaction and return the estimated amount of gas used for the transaction. Actually, in most cases, the value `gasUsed` returned by [`cfx_estimateGasAndCollateral`](/docs/core/build/json-rpc/cfx-namespace/#cfx_estimategasandcollateral) is accurate, but it is not recommended to use `gasUsed` due to two main reasons:

1. Due to [EIP-150](https://eips.ethereum.org/EIPS/eip-150), setting the gas to the actual gas consumption may often lead to transaction failure.
2. The result is based on the current blockchain state during the simulation, but the actual execution states may be different.

The `gasLimit` field typically equals `1.3 * gasUsed`. This ensures that the gas limit is sufficient for the transaction, and any excessive gas fee will be refunded.

## 存储抵押

除了交易费用外，Conflux 网络还要求在交易过程中为占用新的存储空间或修改已有的存储空间的质押 CFX。 质押的 CFX 产生 4% 的年利息，这部分利息支付给矿工，以补贴他们的存储成本。 当占用的空间被释放或被他人修改时，质押的 CFX 将被返还。

The `storageLimit` field specifies the upper limit of the storage space that can be occupied by a transaction. And it is recommended to use the `storageCollaterized` field of returned value from [`cfx_estimateGasAndCollateral`](../../build/json-rpc/cfx-namespace.md#cfx_estimategasandcollateral) as the `storageLimit` field.

:::info

Refer to [storage](../storage.md) for more information.

:::

When sending a transaction, the sender must ensure that there is sufficient balance to cover the `value + storageLimit * (10^18/1024) + gas * gasPrice`. 如果余额不足，交易将被节点拒绝。

If the specified `storageLimit` exceeds the actual storage occupied by the transaction, **no additional fees will be incurred**, and the excess will be refunded.

If the transaction is [sponsored](../internal-contracts/sponsor-whitelist-control.md), the sender only needs to ensure sufficient funds for the value cost.

The current SDK provides methods to automatically set reasonable values for `gas`, `storageLimit`, and `gasPrice`, but users can also specify these values manually.

## 常见问题解答

### What Happens if the Set `gas` Value is Too Low?

If the set gas value is too low, the transaction may fail to execute.

### If the Set `gas` Value is Too High, Will Extra Gas Be Charged?

If the set gas value is too high, the excess gas will be refunded, but only up to a maximum of one-fourth of the gas limit. For example, if the transaction's gas limit is 100000, but only 50000 is actually consumed during execution, only 25000 gas fees will be refunded.

### What Occurs if the `storageLimit` is Set Too Low?

It will result in transaction execution failure.

### If the storageLimit is Set Too High, Will Extra Charges be Incurred?

No, the excess will be refunded.

### What is the Relationship Between `gas` and `storageLimit`?

There is no relationship between the two.

### Reasons for Transaction Failure Despite Using `gas` Returned from `cfx_estimateGasAndCollateral`

When setting the `gas` amount for a transaction based on the estimate from `cfx_estimateGasAndCollateral`, there are key considerations to prevent failure:

1. **Correct Field Usage**: Ensure that the `gasLimit` provided by `cfx_estimateGasAndCollateral` is utilized, not the `gasUsed` field.

2. **Dynamic Execution Environments**: The estimation method simulates execution based on the current state of the blockchain at the time of the call. However, the actual execution environment may change, potentially requiring more gas than estimated. To mitigate the risk of failure due to these variations, you can set `gas` that is higher than the estimated amount.

### What are the Costs for Gas and Storage in Transactions?

When sending a transaction, you incur a gas fee and a storage fee. The gas fee, necessary for transaction processing, is calculated using the formula: `gasFee` = `gasPrice` \* `gasCharged`. This fee compensates miners for transaction validation and execution.

In addition to the gas fee, transactions may utilize new storage space. While there's no direct charge for this storage use, it necessitates staking a certain amount of CFX. This staked CFX, proportional to the storage used, is refunded once the storage is no longer needed. The rate is 1 CFX per 1024 bytes of storage.

### 如何计算交易中实际使用的燃气费用？

On ConfluxScan, users can view gas usage, gas price, gas fee, and other relevant information of a transaction, which is obtained through `cfx_getTransactionReceipt`: `gasFee = gasCharged * gasPrice`, but the gasCharged is not necessarily equal to gasUsed.
There is a rule in Conflux: `gas` is used to set the upper limit of gas that can be used in a transaction. 在 Conflux 中，交易中的 <code>gas</code> 必须大于实际使用的燃气量（gasUsed）的值。
对于超出实际使用的部分，最多只会退还 1/4 的 gas 费用：如果超出部分小于 gasLimit 的 1/4，将全部退还；但如果超出部分大于 gasLimit 的 1/4，只有 1/4 的 gas 费用会被返还。 因此，在发送交易时，尽量给出准确的 gas 值是很重要的。

### How to know the amount of gas and storage used by a transaction?

The [`cfx_estimateGasAndCollateral`](/docs/core/build/json-rpc/cfx-namespace/#cfx_estimategasandcollateral) RPC can be used to estimate the amount of gas and storage that a transaction needs to use, but the estimation is not 100% accurate.
Hence, the returned gas can be adjusted manually, such as multiplying by `1.3`.

### 为什么与合约进行交互后余额没有改变，但交易燃气费已被支付？

Conflux 网络具有赞助机制。 如果一个合约有代付方，该合约与其他账户之间的交互所产生的燃气费用和存储费用将由代付方支付。
