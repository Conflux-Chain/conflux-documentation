---
sidebar_position: 3
title: 存储抵押
keywords:
  - 存储
displayed_sidebar: coreSidebar
---

Conflux Core 引入了存储抵押物(CFS)机制，作为**使用存储空间的定价方法**。 与以太坊的一次性存储费用相比，CFS 机制更加公平合理。 原则上，该机制需要锁定一定数量的资金作为抵押品，以占用存储空间。 这些抵押资金将保持锁定，直到相应的存储空间释放或被其他人接管。 锁定的抵押资金产生的利息将直接分配给矿工，以维护存储空间。 因此，Conflux 中的存储成本也取决于占用存储空间的持续时间。 Conflux 在其 [Conflux 协议规范](https://confluxnetwork.org/files/Conflux_Protocol_Specification.pdf)的第 7 章详细描述了这一机制。

## 存储成本的计算

在 Conflux 网络中，**每个存储条目占用 64B (B 是字节)**，这是在世界状态中键/值对的大小。 需要注意的是，区块链中的键通常长度为 256 位，值的长度也为 256 位(每个长 32B，总共 64B)。 The deposit required for storage is proportional to the smallest multiple of 64B that can encompass all stored items. 在世界状态中，在存储抵押物的整个周期中，抵押物所有者必须锁定一定量的 CFX 作为存储抵押金。 具体来说，对于每 64 字节的存储条目，所有者将锁定 1/16 个 CFX。 **占用 `1KB` 空间，您将支付 `1CFX`** 作为押金。 相应的公式如下：

![Locale Dropdown](./img/storage-formula-635173b54f6e13ba21a689cc691d4ecd.png)

## 存储的所有权

对于每条存储，**最后一个**写入该条目的账户会被视为此存储条目的所有者。 存储的所有者需要为存储条目支付存储抵押物。

> 如果在合约 C 的执行中写入了一个存储条目，并且该合约对抵押物有赞助，则 C 被视为对该条目的写入账户，因此相应地会成为所有者（详情请参见 [Conflux 协议规范](https://www.confluxnetwork.org/files/Conflux_Protocol_Specification.pdf) for more details)第 8.1 节）。

当账户 α 成为存储条目的所有者（无论是通过创建还是修改），α 必须立即为该条目锁定 1/16 CFX。 如果 α 账户内有足够的余额，所需的押金将被自动锁定。 然而，如果 α 账户内的余额不足，操作将失败，不能创建或修改该条目。

如果合约被代付了，代付方将支付存储条目的存储抵押，然后代付方将成为这个存储条目的所有者。 如果合约的代付方发生变更，新的代付方将支付存储条目的存储抵押，成为新的所有者。

## 抵押物的退还

当存储物品**从世界状态中**删除时，相应的 1/16 CFX 押金将解锁并退还到物品所有者的余额中。

如果存储物品的所有权发生变更，上一个所有者的 1/16 CFX 押金将解锁，新的所有者必须同时锁定 1/16 CFX 作为他们的押金。

需要注意的是，**押金退款会“悄无声息”的加入余额**；没有可供查询的转账交易。

## 在交易中指定存储抵押物

When users **send a Conflux Core transaction**, they must fill in a `storageLimit` field (**in bytes**). The storage limit functions similarly to the gas limit, but for storage. It sets an upper limit, stipulating that the increase in the deposit payer's deposit before and after executing the transaction should not exceed the `storage upper limit` multiplied by 1/1024 CFX. If this value is set too low, the deposit may exceed the upper limit after execution, leading to transaction failure. Therefore, this field generally needs to be set higher than the actual usage, and **any excess will not generate a storage mortgage**. However, setting it excessively high is not recommended, as it might result in an insufficient balance to cover the deposit, causing the transaction to fail. The Fullnode provides the RPC method `cfx_estimateGasAndCollateral` to estimate the storage size a transaction will use.

After executing the transaction, the `Receipt` includes several fields related to storage changes:

- `storageCollateralized`: This shows the amount of data that is stored and collateralized.
- `storageCoveredBySponsor`: Indicates whether the storage mortgage for this transaction is sponsored.
- `storageReleased`: The amount of storage released by this transaction.

The `cfx_getCollateralForStorage` method can be used to query the storage size currently mortgaged by an address; the unit is bytes. The mortgaged amount of CFX can be calculated by dividing this value by 1024. Additionally, this information can be obtained through the `cfx_getAccount` method. The returned information includes the `collateralForStorage` field.

## Sponsorship Mechanism and CIP-107

Conflux implements a [sponsorship mechanism](./internal-contracts/sponsor-whitelist-control.md) to subsidize the usage of smart contracts. This mechanism allows the sponsor of a contract to pay the collateral for storage occupied by transactions, instead of the transaction sender.

Following the [`v2.3.0` hardfork](../../general/hardforks/v2.3.md), [CIP-107](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-107.md) was activated. This introduced storage points as a new type of collateral for storage, where 1 KB of storage space costs 1,024 storage points.

Collateral storage points are also refunded when the storage space they cover is freed or when its ownership changes. However, it is important to note that these storage points are non-transferrable and do not generate storage interest.

For more detailed information on the sponsorship mechanism and CIP-107, please refer to [Sponsorship Mechanism](./internal-contracts/sponsor-whitelist-control.md) and [CIP-107 DAO-Adjustable Burn of Storage Collateral](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-107.md).

## 常见问题解答

### Does eSpace Have Storage Collateral?

No. The storage collateral mechanism is applicable exclusively to the Conflux Core Space.
