---
sidebar_position: 3
title: Storage
keywords:
  - storage
---

Conflux 引入了存储抵押（CFS）机制作为使用存储空间的定价方法。 与 Ethereum 中的一次性存储费用相比，CFS 机制将更加公平合理。 原则上，这种机制要求锁定一定数量的资金作为抵押，以占用存储空间。 在相应的存储空间被释放或被他人覆盖之前，抵押的资金将被锁定，而锁定抵押品所产生的相应利息将直接分配给矿工，用于维护存储空间。 因此，Conflux 的存储成本也取决于占用存储空间的时间长短。 Conflux specifically introduced this mechanism in detail in chapter 7 of its [Conflux_Protocol_Specification](https://confluxnetwork.org/files/Conflux_Protocol_Specification_20201020.pdf).

在 Conflux 网络中，每个存储条目占用 64B（B 是字节，byte）的空间，这也是世界状态中键/值对的大小。 需要注意的是，区块链中的键通常是 256 位长，值也是 256 位长（每个都是 32B 长，总共是 64B 长）。 存储所需的抵押与可以覆盖所有存储项的 64B 的最小倍数成正比。 对于每个存储条目，最后写入该条目的账户被称为该存储条目的所有者。 If a storage item is written during the execution of contract C, and a guarantor provides guarantee for it, then C is regarded as the writer of the item and accordingly becomes the owner of the item (see section 7.1 for details). 在世界状态中，在一个存储项的整个生命周期中，该项的所有者必须锁定一定数量的 CFX 作为存储空间的存储抵押。 具体来说，对于一个大小为 64B 的存储条目，其所有者将被锁定 1/16CFX。 为了占用 `1KB` 的空间，你将支付 `1CFX` 作为抵押，相应的公式如下：


![Locale Dropdown](./img/storage-formula-635173b54f6e13ba21a689cc691d4ecd.png)


当账户 α 成为一个存储条目的所有者（无论是创建还是修改）时，α 应该立即为该条目锁定 1/16 CFX。 如果 α 有足够的余额，那么所需的抵押将自动锁定，否则如果 α 没有足够的余额，操作将失败，α 不能创建或修改该条目。

当一个存储项从世界状态中删除时，相应的 1/16 CFX 抵押将被解锁并返回到该项所有者的余额中。 如果一个存储项的所有权发生变化，旧所有者的 1/16 CFX 抵押将被解锁，新所有者必须同时锁定 1/16 CFX 作为抵押。 值得一提的是，抵押退款是“悄悄地”添加到余额中的，并没有可供查询的转账交易。

## 如何使用存储抵押

当用户发送 Conflux 交易时，他们需要填写一个 `storageLimit` 字段（以字节为单位）。 Storage limit 对于存储来说，就像 gas limit 对于执行一样，起着相同的作用。 The upper limit stipulates that the deposit increase of the deposit payer before and after the transaction is executed shall not exceed the `storage upper limit` multiplied by 1/1024 CFX. 如果这个值填得太低，会导致执行后存款超过上限而执行失败。 因此，一般来说，这个字段需要设置为一个比实际使用量大的值，多余的部分不会产生存储抵押。 但是不建议填得太高，因为可能会导致发送者的余额不足以支付存款，从而导致交易失败。 全节点提供了 `cfx_estimateGasAndCollateral` RPC 方法来估算一个交易将使用的存储大小。

交易执行后，`Receipt` 中包含了几个关于存储变化的字段：

* `storageCollateralized` 这是存储并抵押的数据量
* `storageCoveredBySponsor` 这个交易的存储抵押是否由赞助者赞助
* `storageReleased` 这个交易释放的存储空间

你可以使用 `cfx_getCollateralForStorage` 方法来查询一个地址当前抵押的存储大小，单位是字节，值除以 1024 就是 CFX 存储抵押的数量。 另外，也可以通过 `cfx_getAccount` 方法获取，返回的信息中包含了 `collateralForStorage` 字段。

### Sponsorship Mechanism and Storage Points

Conflux implements a [sponsorship mechanism](./internal-contracts/sponsor-whitelist-control.md) to subsidize the usage of smart contracts. Thus, a new account with zero balance is able to call smart contracts as long as the execution is sponsored.

As is mentioned above, CFX acts as collateral when utilizing storage space. And if the storage space in use is freed or its ownership changes, the collateralized CFX is refunded. However, circumstance slightly changes for storage collateral sponsorship with the activation of [CIP-107 DAO-Adjustable Burn of Storage Collateral](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-107.md).

When a sponsor adds storage collateral for a contract, `p` proportion (starts at 0.5 and can be adjusted by [On-Chain DAO Vote for Chain Parameters](./internal-contracts/params-control.md)) of the CFX tokens will be burned and corresponding amount of "storage point" will be minted. The converted CFX is permanently burned and non-refundable under all circumstances, including situations where the contract is destroyed or the sponsor is replaced. For every 1 CFX burned, 1024 storage points will be generated. These storage points are non-transferrable and won't generate storage interest but can be used to cover storage collateral costs.

:::note

Sponsor collateral balances are prioritized for usage over storage points.

:::

Refer to [sponsorship mechanism](./internal-contracts/sponsor-whitelist-control.md) or [CIP-107 DAO-Adjustable Burn of Storage Collateral](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-107.md) for more information of the mentioned mechanisms.
