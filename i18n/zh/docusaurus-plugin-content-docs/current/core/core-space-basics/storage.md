---
sidebar_position: 3
title: 存储抵押
keywords:
  - 存储
displayed_sidebar: coreSidebar
---

Conflux Core 引入了存储抵押物(CFS)机制，作为**使用存储空间的定价方法**。 与以太坊的一次性存储费用相比，CFS 机制更加公平合理。 原则上，该机制需要锁定一定数量的资金作为抵押品，以占用存储空间。 这些抵押资金将保持锁定，直到相应的存储空间释放或被其他人接管。 锁定的抵押资金产生的利息将直接分配给矿工，以维护存储空间。 因此，Conflux 中的存储成本也取决于占用存储空间的持续时间。 Conflux 在其 [Conflux 协议规范](https://confluxnetwork.org/files/Conflux_Protocol_Specification.pdf)的第 7 章详细描述了这一机制。

## 存储成本的计算

在 Conflux 网络中，**每个存储条目占用 64B (B 是字节)**，这是在世界状态中键/值对的大小。 需要注意的是，区块链中的键通常长度为 256 位，值的长度也为 256 位(每个长 32B，总共 64B)。 存储所需的押金与能涵盖的所有存储项的 64B 的最小倍数成正比。 在世界状态中，在存储抵押物的整个周期中，抵押物所有者必须锁定一定量的 CFX 作为存储抵押金。 具体来说，对于每 64 字节的存储条目，所有者将锁定 1/16 个 CFX。 **占用 `1KB` 空间，您将支付 `1CFX`** 作为押金。 相应的公式如下：

![Locale Dropdown](./img/storage-formula-635173b54f6e13ba21a689cc691d4ecd.png)

## 存储的所有权

对于每条存储，**最后一个**写入该条目的账户会被视为此存储条目的所有者。 存储的所有者需要为存储条目支付存储抵押。

> 如果在合约 C 的执行中写入了一个存储条目，并且该合约对抵押物有赞助，则 C 被视为对该条目的写入账户，因此相应地会成为所有者（详情请参见 [Conflux 协议规范](https://www.confluxnetwork.org/files/Conflux_Protocol_Specification.pdf) for more details)第 8.1 节）。

当账户 α 成为存储条目的所有者（无论是通过创建还是修改），α 必须立即为该条目锁定 1/16 CFX。 如果 α 账户内有足够的余额，所需的押金将被自动锁定。 然而，如果 α 账户内的余额不足，操作将失败，不能创建或修改该条目。

如果合约被代付了，代付方将支付存储条目的存储抵押，然后代付方将成为这个存储条目的所有者。 如果合约的代付方发生变更，新的代付方将支付存储条目的存储抵押，成为新的所有者。

## 抵押物的退还

当存储物品**从世界状态中**删除时，相应的 1/16 CFX 押金将解锁并退还到物品所有者的余额中。

如果存储物品的所有权发生变更，上一个所有者的 1/16 CFX 押金将解锁，新的所有者必须同时锁定 1/16 CFX 作为他们的押金。

需要注意的是，**押金退款会“悄无声息”的加入余额**；没有可供查询的转账交易。

## 在交易中指定存储抵押

当用户**发送 Conflux Core 交易**时，他们必须填写`storageLimit` 字段（以**字节**为单位）。 用于存储的存储限制的功能类似于 gas limit 它设置了一个 gas 上限，规定了执行交易前后存款支付者的存款增加不得超过存储上限乘以 1/1024 CFX。 如果这个值设置得太低，执行交易后的押金可能超过上限，导致交易失败。 因此，这个字段通常需要设置得高于实际的 gas 使用量，多余的部分不会产生存储抵押。 然而，我们也不推荐设置过高的 gas limit，因为者可能导致余额不足以支付押金，从而导致交易失败。 全节点提供 RPC 方法 `cfx_estimateGasAndCollateral` 可以用来估计交易将使用的存储大小。

执行交易后，`收据`将包括几个与存储更改相关的字段：

- `storageCollateralized`：显示存储抵押的数据。
- `storageCoveredBySponsor`：表示此交易的存储抵押是否由赞助者支付。
- `storageReleased`：此交易释放的存储数量。

可以使用 `cfx_getCollateralForStorage` 方法来查询地址当前抵押的存储大小；单位是字节。 抵押的 CFX 金额可以通过将此值除以 1024 来计算。 此外，这些信息也可以通过 `cfx_getAccount` 方法获得。 返回的信息包括 `collateralForStorage` 字段。

## 赞助机制与 CIP-107

Conflux 实现了一种[赞助机制](./internal-contracts/sponsor-whitelist-control.md) ，用于赞助智能合约的使用费用。 这种机制允许合约的赞助者来支付交易占用的存储抵押，而不是由交易的发送者支付。

在[ v2.3.0 版本的硬分叉](../../general/hardforks/v2.3.md)之后，激活了 [CIP-107](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-107.md) 。 这引入了存储点作为新类型的存储抵押，其中每 1 KB 的存储空间成本为 1,024 存储点。

当覆盖的存储空间被释放或其所有权发生变化时，抵押的存储点也会随之退还。 然而，需要要注意的是，这些存储点是不可转让的，并且不会产生存储利息。

有关赞助机制和 CIP-107 的更多详细信息，请参考[赞助机制](./internal-contracts/sponsor-whitelist-control.md) 以及 [CIP-107 DAO 可调控的存储抵押的销毁机制](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-107.md)。

## 常见问题解答

### eSpace 中有存储抵押吗？

没有。 存储抵押机制仅适用于 Conflux Core Space。
