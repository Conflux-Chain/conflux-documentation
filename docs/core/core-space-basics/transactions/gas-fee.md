---
sidebar_position: 3
title: Transaction Fee
displayed_sidebar: coreSidebar
---

In the Conflux Core Space, transactions are processed by miners who charge a fee for their service. This fee incentivises miners to participate in the network and keep it running smoothly. The fees are paid in CFX and are specified by the transaction initiator through the `gas`, `gasPrice` and `storageLimit` fields in the transaction.

## Gas Fee

The transaction gasFee is specified by `gas` and `gasPrice` fields. Is calculated as `gasCharged` * `gasPrice`.

We have a [detail documentation](/docs/general/conflux-basics/gas.md) about what is gas and how to calculate it.

## How to Set gas and gasPrice Properly

### gasPrice

The Conflux consensus don't limit the transaction gas prices and the minimum gas price depends on the miners' setting. Here are the minimum gas price settings of Confura, the public RPC endpoints supported by Conflux foundation:

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

### gas

For regular CFX transfers, setting the gas to 21,000 is sufficient.

For contract interactions, it is recommended to set gas based on the return value of core space / espace RPC:

- Core space: `gasLimit` field of [`cfx_estimateGasAndCollateral`](/docs/core/build/json-rpc/cfx-namespace/#cfx_estimategasandcollateral)
- eSpace: `eth_estimateGas`

These methods simulates the execution of the transaction and return the estimated amount of gas used for the transaction. Actually, in most cases, the value `gasUsed` returned by [`cfx_estimateGasAndCollateral`](/docs/core/build/json-rpc/cfx-namespace/#cfx_estimategasandcollateral) is accurate, but it is not recommended to use `gasUsed` due to two main reasons: 

1. Due to [EIP-150](https://eips.ethereum.org/EIPS/eip-150), setting the gas to the actual gas consumption may often lead to transaction failure.
2. The result is based on the current blockchain state during the simulation, but the actual execution states may be different. 

The `gasLimit` field typically equals `1.3 * gasUsed`. This ensures that the gas limit is sufficient for the transaction, and any excessive gas fee will be refunded.

## Storage Collateral

In addition to transaction fees, the Conflux network requires the pledging of CFX for occupying new storage space or modifying existed storage during a transaction. The pledged CFX generates a 4% annual interest, which is paid to miners to subsidise their storage costs. When the occupied space is released or modified by others, the pledged CFX is returned. 

The `storageLimit` field specifies the upper limit of the storage space that can be occupied by a transaction. And it is recommended to use the `storageCollaterized` field of returned value from [`cfx_estimateGasAndCollateral`](/docs/core/build/json-rpc/cfx-namespace/#cfx_estimategasandcollateral) as the `storageLimit` field.

:::info
Refer to [storage](../storage.md) for more information.
:::

When sending a transaction, the sender must ensure that there is sufficient balance to cover the `value + storageLimit * (10^18/1024) + gas * gasPrice`. If the balance is insufficient, the transaction will be rejected by nodes.

If the specified `storageLimit` exceeds the actual storage occupied by the transaction, **no additional fees will be incurred**, and the excess will be refunded.

If the transaction is [sponsored](../internal-contracts/sponsor-whitelist-control.md), the sender only needs to ensure sufficient funds for the value cost. 

The current SDK provides methods to automatically set reasonable values for `gas`, `storageLimit`, and `gasPrice`, but users can also specify these values manually.

## FAQs

### What Happens if the Set Gas Value is Too Low?

If the set gas value is too low, the transaction may fail to execute.

### If the Set Gas Value is Too High, Will Extra Gas Be Charged?

If the set gas value is too high, the excess gas will be refunded, but only up to a maximum of one-fourth of the gas limit. For example, if the transaction's gas limit is 100, but only 50 is actually consumed during execution, a maximum of 25 gas fees will be refunded.

### What Occurs if the storageLimit is Set Too Low?

It will result in failure.

### If the storageLimit is Set Too High, Will Extra Charges be Incurred?

No, the excess will be refunded.

### What is the Relationship Between gas and storageLimit?

There is no relationship between the two.

### If the Transaction's gas is set to the result of cfx_estimateGasAndCollateral Method, Why Might the Transaction Fail During Execution?

The estimate method provides a simulated execution, and the actual execution may require more gas. It is advisable to increase the gas limit appropriately to avoid failures.