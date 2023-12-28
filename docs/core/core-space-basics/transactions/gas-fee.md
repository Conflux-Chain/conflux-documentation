---
sidebar_position: 3
title: Gas Fee
displayed_sidebar: coreSidebar
---

In the Conflux network, transactions are processed by miners who charge a fee for their service. This fee incentivises miners to participate in the network and keep it running smoothly. The fees are paid in CFX and are specified by the transaction initiator through the `gas`, `gasPrice` and `storageLimit` fields in the transaction.

The `gas` field represents the maximum amount of gas that can be used to execute the transaction. If the actual amount of gas consumed during the execution exceeds this limit, the transaction will fail. And if the actual consumption was less than the `gas` set, the sender must pay at least 75% of the `gas`, and up to 25% can be refunded, which means setting the `gas` too high is not encouraged. The gas consumption depends on the complexity of the contract code (or `21000` if it is a simple transfer transaction) and can be estimated using the `cfx_estimateGasAndCollateral` method, which returns the `gasUsed`, `gasLimit` and `storageCollaterized` fields. It is recommended to use `gasLimit` as the `gas` field.

The `gasPrice` field is the amount of Drip(10**-18 CFX) the sender is willing to pay per unit of gas, and should be greater than 1G(10**9). As Conflux default setting, miners prioritise transactions with higher `gasPrice`, and the `gasPrice` can be increased to speed up the processing of a stuck transaction. The `cfx_gasPrice` method provides a reasonable gas price based on network conditions.

In addition to transaction fees, the Conflux network requires the pledging of CFX for occupying new storage space or modifying existed storage during a transaction. The pledged CFX generates a 4% annual interest, which is paid to miners to subsidise their storage costs. When the occupied space is released or modified by others, the pledged CFX is returned. The `storageLimit` field specifies the upper limit of the storage space that can be occupied by a transaction. And it is recommended to use the `storageCollaterized` field of returned value from `cfx_estimateGasAndCollateral` as the `storageLimit` field.

:::info

Refer to [storage](./storage.md) for more information.

:::

When sending a transaction, the sender must ensure that there is sufficient balance to cover the `value + storageLimit * (10^18/1024) + gas * gasPrice`. If the balance is insufficient, the transaction will be rejected by nodes. If the transaction is [sponsored](./internal-contracts/sponsor-whitelist-control.md), the sender only needs to ensure sufficient funds for the value cost. The current SDK provides methods to automatically set reasonable values for `gas`, `storageLimit`, and `gasPrice`, but users can also specify these values manually.