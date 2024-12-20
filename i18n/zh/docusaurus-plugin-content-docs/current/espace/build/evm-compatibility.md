---
sidebar_position: 3
title: EVM兼容性
description: Conflux eSpace 的 EVM 兼容性
displayed_sidebar: eSpaceSidebar
keywords:
  - Conflux eSpace
  - EVM兼容性
  - Transaction Types
  - EVM 操作码
  - 区块时间
  - 合约大小
  - 交易费用
  - 燃气上限
  - Precompiles
  - Phantom Transactions
  - Cross-Space Transactions
  - BLOCKHASH
  - SSTORE
  - SUICIDE
  - ECRecover
  - SHA256
  - RIPEMD160
  - ModExp
  - BN128Add
  - BN128Mul
  - BN128Pair
  - Blake2F
  - PointEvaluation
  - Gas Refund
  - Storage Costs
  - CrossSpaceCall
  - Virtual Transactions
tags:
  - eSpace
---

eSpace 实现了一个以太坊虚拟机 (EVM)。 以下是 eSpace 和以太坊之间的一些区别：

## 交易类型

- eSpace initially only supports **155 type** transaction (legacy transactions)
- [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) (type 1) & [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) (type 2) transactions are supported after hardfork v2.4.0.
- [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) (type 3) transactions are not supported.

## EVM 操作码

* **Before v2.4.0** the `BLOCKHASH` opcode can only take `NUMBER-1` as input. （与以太坊不同的是，以太坊可以接受 `NUMBER-256` 到 `NUMBER-1` 之间的任何整数作为输入）。 After v2.4.0 it is fully compatible with Ethereum with an advanced input range up to 65536 blocks (implemented by [CIP-133](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-133.md)).
* The 4844 opcode `BLOBHASH` `BLOBBASEFEE` is not supprted.

## 区块时间

`NUMBER` opcode将返回树图`epoch number`。 因此，在 eSpace 合约中使用的 `block.number` 不会以稳定和可预测的速率增长，因此它可能不适合用于测量时间。

区块的生成速率是每个区块 1.25 秒（主网），与 Core Space Epoch 时间相同。

## 合约大小

合约最大代码大小是 `49152` ，是以太坊的两倍。

## 交易费用

* `SSTORE` 操作码和 `SUICIDE` opcode中不会退还gas。
* 占用存储的操作有不同的gas消耗。
  1. 当将存储条目从零更改为非零时，`SSTORE` 花费 40000 gas（而以太坊中为 20000 gas）。
  2. 部署新合约时，每个字节花费 400 gas（而以太坊中为 200 gas）。
  3. 通过 `CALL` 或 `SUICIDE` 创建新账户时，该操作消耗 50000 gas（而以太坊中为 25000 gas）。
* 最多 `1/4` 的交易 `gasLimit` 可以被退还（如果未使用）

## 交易的 Gas 上限

Only blocks whose height is a multiple of `5` can include Ethereum-type transactions. The total gas limit of these transactions cannot exceed half of the block gas limit, which is 15 million gas before v2.4.0 and 30 million gas after v2.4.0.

## EVM 预编译合约

支持所有标准预编译合约。

<div class="compat-evm-precompiles-table"></div>

| 地址   | ID                | 名称                                                                                       | 规范               | 状态 | 版本     |
| ---- | ----------------- | ---------------------------------------------------------------------------------------- | ---------------- | -- | ------ |
| 0x01 | `ECRecover`       | ECDSA 公钥恢复                                                                               | [Yellow Paper][] | ✅  |        |
| 0x02 | `SHA256`          | SHA-2 256 哈希函数                                                                           | [Yellow Paper][] | ✅  |        |
| 0x03 | `RIPEMD160`       | RIPEMD 160 哈希函数                                                                          | [Yellow Paper][] | ✅  |        |
| 0x04 | `Identity`        | 身份函数                                                                                     | [Yellow Paper][] | ✅  |        |
| 0x05 | `ModExp`          | 大整数模幂运算                                                                                  | [EIP-198][]      | ✅  |        |
| 0x06 | `BN128Add`        | 椭圆曲线加法                                                                                   | [EIP-196][]      | ✅  |        |
| 0x07 | `BN128Mul`        | 椭圆曲线标量乘法                                                                                 | [EIP-196][]      | ✅  |        |
| 0x08 | `BN128Pair`       | 椭圆曲线配对检查                                                                                 | [EIP-197][]      | ✅  |        |
| 0x09 | `Blake2F`         | BLAKE2b `F` 压缩函数                                                                         | [EIP-152][]      | ✅  |        |
| 0x0a | `PointEvaluation` | Verify p(z) = y given commitment that corresponds to the polynomial p(x) and a KZG proof | [EIP-4844][]     | ✅  | V2.4.0 |

## 幽灵交易

*跨空间交易*是在 Conflux 核心空间中的交易，它在执行过程中的某个时刻调用了 `CrossSpaceCall` 内置合约的状态更改方法（即非 `view`方法） 这样的交易可以更改 core 和 eSpace 两个空间中的 CFX 余额和合约存储。

由于 EVM 客户端不知道 Conflux 空间交易（两个空间使用不同的交易格式），我们为每次调用 `CrossSpaceCall` 内置合约构造一个或多个*幽灵*交易（又称*虚拟*交易）。 这些幽灵交易来自相应的 core space 交易，它们并不存在于账本中。 幽灵交易具有以下特殊属性：

- 其中，`gas` 和 `gasPrice` 值均为 `0`。 跨空间交易的 gas 费用将在Core Space中收取。 因此，相应的 phantom 交易不会消耗任何 gas。
- 无效的签名（`r`、`s`、`v`、`standardV`）。 Conflux 协议无法代表跨空间交易的发送者签名交易。 因此，phantom 交易使用一个伪造的签名，而这个签名无法通过 ECDSA 验证。

### 示例

当我们检索 Conflux 核心空间中的 epoch `0x72819` 时，我们发现其中包含一个 Conflux 交易。

```
cfx_getBlockByEpochNumber(0x72819, true)

{
  "epochNumber": "0x72819",
  "hash": "0x7440c9e8ebb2e87a7d187e4ad6d09027d860b3948cf4364bb883c028b6c3a858",
  "transactions": [
    {
      "hash": "0xe89ef4b61434ec331b621b8687033f9e4058e76759a3522bdc50e0cb358f505e",
      "blockHash": "0x7440c9e8ebb2e87a7d187e4ad6d09027d860b3948cf4364bb883c028b6c3a858",
      "from": "NET8888:TYPE.USER:AAJFT5SK5RGK2KTJPMPUEJ69989N15KCCY7JAJEUP2",
      "to": "NET8888:TYPE.CONTRACT:ACAP3N9KXZ7C4TU5NUU8G65FJ7A09MG1FY77ZAYSVW",
      "gasPrice": "0x1",
      "gas": "0x8b28d",
      "storageLimit": "0x54",
      "r": "0x2b943e84111cd5f95fbdf15667329ac546c9e5b99548d3c3702aeced4f07de6d",
      "s": "0x2f47ae3c15ec2d1cbcf5bde3870aa21e1df54e8b7b926840a54faa9951cb3321",
      "v": "0x0",
      ...
    }
  ],
}
```

当我们检索 eSpace 中对应的区块时，我们发现它包含两个幽灵交易。

```
eth_getBlockByNumber(0x72819, true)

{
  "hash": "0x7440c9e8ebb2e87a7d187e4ad6d09027d860b3948cf4364bb883c028b6c3a858",
  "number": "0x72819",
  "transactions": [
    {
      "hash": "0xfcdcf304b6b9dc263625b0924efaf3a7eb7044a17d27c0b8d631025b55d1147e",
      "blockHash": "0x7440c9e8ebb2e87a7d187e4ad6d09027d860b3948cf4364bb883c028b6c3a858",
      "from": "0x0000000000000000000000000000000000000000",
      "to": "0xf709629eee416c2d2a53692d38f1568538d8022f",
      "gasPrice": "0x0",
      "gas": "0x0",
      "r": "0x1",
      "s": "0x1",
      "v": "0x4593",
      ...
    },
    {
      "hash": "0xca2f5c5848458bea556f99e626db7108377d600e24add1920c4106358a1a5502",
      "blockHash": "0x7440c9e8ebb2e87a7d187e4ad6d09027d860b3948cf4364bb883c028b6c3a858",
      "from": "0xf709629eee416c2d2a53692d38f1568538d8022f",
      "to": "0xdacf3af269b55ece5fe3239626a27f2a76c48245",
      "gasPrice": "0x0",
      "gas": "0x0",
      "r": "0x1",
      "s": "0x1",
      "v": "0x4593",
      ...
    }
  ],
}
```

## 其他资源

- [EVM操作码参考](https://www.evm.codes/)

[Yellow Paper]: https://ethereum.github.io/yellowpaper/paper.pdf
[EIP-152]: https://eips.ethereum.org/EIPS/eip-152
[EIP-196]: https://eips.ethereum.org/EIPS/eip-196
[EIP-197]: https://eips.ethereum.org/EIPS/eip-197
[EIP-198]: https://eips.ethereum.org/EIPS/eip-198
[EIP-4844]: https://eips.ethereum.org/EIPS/eip-4844#point-evaluation-precompile