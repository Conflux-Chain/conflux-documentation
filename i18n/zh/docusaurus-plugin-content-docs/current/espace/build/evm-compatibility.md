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
  - EIP Implementations
  - Transient Storage
tags:
  - eSpace
---

The eSpace implements an Ethereum Virtual Machine (EVM) with alignment to Ethereum's behavior through [CIP-645](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-645.md). 以下是 eSpace 和以太坊之间的一些区别：

## 交易类型

- eSpace最初只支持**155类型**交易(传统交易)。
- 在 v2.4.0 硬分叉后，开始支持 [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)（类型 1）和 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)（类型 2）交易。
- 不支持[EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)（类型3）交易。
- [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) (type 4) transactions are supported after hardfork v3.0.0.

## EVM 操作码

As of hardfork v3.0.0 (CIP-645), Conflux eSpace implements multiple Ethereum Improvement Proposals (EIPs) to align behavior with Ethereum's EVM:

### Opcode-Specific Changes

* **BLOBHASH** and **BLOBBASEFEE** opcodes (EIP-4844) are implemented with consistent "zero" results

## 区块时间

`NUMBER` opcode将返回树图`epoch number`。 因此，在 eSpace 合约中使用的 `block.number` 不会以稳定和可预测的速率增长，因此它可能不适合用于测量时间。

区块的生成速率是每个区块 1.25 秒（主网），与 Core Space Epoch 时间相同。

## 合约大小

Contract max code size is `49152` (double as Ethereum).

## 交易费用

### Storage-Related Gas Costs

Due to Conflux's storage collateral mechanism and high-performance design, storage-related operations have adjusted gas costs (doubled from Ethereum's values):

1. **SSTORE**: 40000 gas (instead of 20000 gas in Ethereum) when changing a storage entry from zero to non-zero
2. **Contract deployment**: Each byte costs 400 gas (instead of 200 gas in Ethereum)
3. **EIP-7702 PER_EMPTY_ACCOUNT_COUNT**: 50000 gas (instead of 25000 gas in Ethereum)

### Gas Refunds

* **Gas refund cap**: In Ethereum, if a transaction's gas limit exceeds the actual gas cost, the remaining gas is fully refunded. In contrast, Conflux refunds a **maximum of 1/4** of the **gas limit**. Check [Gas Limit, Gas Used, and Gas Charged](../../general/conflux-basics/gas#gas-limit-gas-used-and-gas-charged) for more details.
* **EIP-7702 refund difference**: When updating delegate addresses (rather than creating a new delegation), Conflux does not issue the 12500 gas refund that Ethereum provides.

### BLOCKHASH Gas Pricing

Conflux supports querying a larger range of blocks `[n-65535, n]` compared to Ethereum's `[n-256, n-1]`. Corresponding gas prices for `BLOCKHASH` are adjusted as follows:

- **Ethereum**: `20 gas` (uniform for all cases)
- **Conflux**: `2100 gas` (for the range `[n-65535, n-257]`), `100 gas` (for blocks in `[n-256, n-1]`)

## 交易的 Gas 上限

- 只有区块高度为`5`的整数倍时，才能包含以太坊类型交易。 The total gas limit of these transactions cannot exceed half of the block gas limit, which is 30 million gas.
- A transaction's gas limit should be no less than 100 times the byte size of its call data. Check [CIP-130](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-130.md) for more details.

## COINBASE Address Handling

The `COINBASE` opcode returns a hex20 address corresponding to Core Space rather than eSpace. The eSpace address with the same hex20 value is not considered "warm" per EIP-2929.

## Transaction Balance Handling

When transaction balance cannot afford maximum cost (`max gas price × gas limit + tx value`):

- **Ethereum**: Transaction fails without nonce increment or fee deduction
- **Conflux**: Nonce is incremented and maximum effective gas price × gas limit is deducted (or entire balance if insufficient)

> The maximum effective gas price equals to `gasPrice` if `gasPrice` is specified otherwise `min(maxFeePerGas, baseFeePerGas+maxPriorityFeePerGas)`.

## EVM 预编译合约

支持所有标准预编译合约。

<div class="compat-evm-precompiles-table"></div>

| 地址   | ID                    | 名称                                           | 规范               | 状态 | 版本     |
| ---- | --------------------- | -------------------------------------------- | ---------------- | -- | ------ |
| 0x01 | `ECRecover`           | ECDSA 公钥恢复                                   | [Yellow Paper][] | ✅  |        |
| 0x02 | `SHA256`              | SHA-2 256 哈希函数                               | [Yellow Paper][] | ✅  |        |
| 0x03 | `RIPEMD160`           | RIPEMD 160 哈希函数                              | [Yellow Paper][] | ✅  |        |
| 0x04 | `Identity`            | 身份函数                                         | [Yellow Paper][] | ✅  |        |
| 0x05 | `ModExp`              | 大整数模幂运算                                      | [EIP-198][]      | ✅  |        |
| 0x06 | `BN128Add`            | 椭圆曲线加法                                       | [EIP-196][]      | ✅  |        |
| 0x07 | `BN128Mul`            | 椭圆曲线标量乘法                                     | [EIP-196][]      | ✅  |        |
| 0x08 | `BN128Pair`           | 椭圆曲线配对检查                                     | [EIP-197][]      | ✅  |        |
| 0x09 | `Blake2F`             | BLAKE2b `F` 压缩函数                             | [EIP-152][]      | ✅  |        |
| 0x0a | `PointEvaluation`     | 将多项式 p(x) 对应的承诺和一个 KZG 证明给定的情况下，验证 p(z) = y。 | [EIP-4844][]     | ✅  | V2.4.0 |
| 0x0b | `BLS12_G1ADD`         | BLS12-381 G1 addition                        | [EIP-2537][]     | ✅  | V3.0.0 |
| 0x0c | `BLS12_G1MSM`         | BLS12-381 G1 multi-scalar multiplication     | [EIP-2537][]     | ✅  | V3.0.0 |
| 0x0d | `BLS12_G2ADD`         | BLS12-381 G2 addition                        | [EIP-2537][]     | ✅  | V3.0.0 |
| 0x0e | `BLS12_G2MSM`         | BLS12-381 G2 multi-scalar multiplication     | [EIP-2537][]     | ✅  | V3.0.0 |
| 0x0f | `BLS12_PAIRING_CHECK` | BLS12-381 pairing check                      | [EIP-2537][]     | ✅  | V3.0.0 |
| 0x10 | `BLS12_MAP_FP_TO_G1`  | BLS12-381 map FP to G1                       | [EIP-2537][]     | ✅  | V3.0.0 |
| 0x11 | `BLS12_MAP_FP2_TO_G2` | BLS12-381 map FP2 to G2                      | [EIP-2537][]     | ✅  | V3.0.0 |

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
- [CIP-645: Align Conflux eSpace Behavior with EVM](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-645.md)

[Yellow Paper]: https://ethereum.github.io/yellowpaper/paper.pdf
[EIP-152]: https://eips.ethereum.org/EIPS/eip-152
[EIP-196]: https://eips.ethereum.org/EIPS/eip-196
[EIP-197]: https://eips.ethereum.org/EIPS/eip-197
[EIP-198]: https://eips.ethereum.org/EIPS/eip-198
[EIP-4844]: https://eips.ethereum.org/EIPS/eip-4844#point-evaluation-precompile
[EIP-2537]: https://eips.ethereum.org/EIPS/eip-2537
