---
sidebar_position: 2
title: EVM Compatibility
description: EVM Compatibility of Conflux eSpace
keywords:
  - EVM
  - Compatibility
displayed_sidebar: eSpaceSidebar
---

eSpace 实现了一个以太坊虚拟机 (EVM)。 以下是 eSpace 和以太坊之间的一些区别：

## Transaction Type

Currently eSpace only support 155 type transaction. 1559 type transaction is not support.

## EVM Opcodes

* `BLOCKHASH` opcode只能将 `NUMBER-1` 作为输入。 (Unlike Ethereum, which takes any integer in `NUMBER-256` to `NUMBER-1` as input). This is the only break  opcode.
* `NUMBER` opcode将返回树图`epoch number`。 因此，在 eSpace 合约中使用的 `block.number` 不会以稳定和可预测的速率增长，因此它可能不适合用于测量时间。

## Block Time

Block generate rate is 1.25s per block (mainnet), is same as Core Space Epoch time.

## Contract Size

合约最大代码大小为 `49152`，是以太坊的两倍

## Transaction Fees

* `SSTORE` 操作码和 `SUICIDE` opcode中不会退还gas。
* 占用存储的操作有不同的gas消耗。
  1. 当将存储条目从零更改为非零时，`SSTORE` 花费 40000 gas（而以太坊中为 20000 gas）。
  2. 部署新合约时，每个字节花费 400 gas（而以太坊中为 200 gas）。
  3. 通过 `CALL` 或 `SUICIDE` 创建新账户时，该操作消耗 50000 gas（而以太坊中为 25000 gas）。
* 最多 `1/4` 的交易 `gasLimit` 可以被退还（如果未使用）

## Transaction Gas limit

只有区块高度是 `5` 的倍数的区块才能打包以太坊类型的交易。 这些交易的总gas limit不能超过区块gas limit的一半（1500w）。

## EVM Precompiles

All standard precompiles are supported.

<div class="compat-evm-precompiles-table"></div>

| Address | ID          | Name                                 | Spec             | Status |
| ------- | ----------- | ------------------------------------ | ---------------- | ------ |
| 0x01    | `ECRecover` | ECDSA public key recovery            | [Yellow Paper][] | ✅      |
| 0x02    | `SHA256`    | SHA-2 256-bit hash function          | [Yellow Paper][] | ✅      |
| 0x03    | `RIPEMD160` | RIPEMD 160-bit hash function         | [Yellow Paper][] | ✅      |
| 0x04    | `Identity`  | Identity function                    | [Yellow Paper][] | ✅      |
| 0x05    | `ModExp`    | Big integer modular exponentiation   | [EIP-198][]      | ✅      |
| 0x06    | `BN128Add`  | Elliptic curve addition              | [EIP-196][]      | ✅      |
| 0x07    | `BN128Mul`  | Elliptic curve scalar multiplication | [EIP-196][]      | ✅      |
| 0x08    | `BN128Pair` | Elliptic curve pairing check         | [EIP-197][]      | ✅      |
| 0x09    | `Blake2F`   | BLAKE2b `F` compression function     | [EIP-152][]      | ✅      |

## Phantom transactions

*跨空间交易*是 Conflux Core Space中的一种交易，在其执行过程中，调用了 `CrossSpaceCall` 内部合约的一个状态改变（即非`只读/view`）方法。 这样的交易可以在Core Space和eSpace中更改 CFX 的余额和合约存储。

由于 EVM 客户端不知道 Conflux 空间交易（两个空间使用不同的交易格式），因此我们为每次对 `CrossSpaceCall` 内部合约的调用构造一个或多个 *phantom* 交易（也称为 *虚拟* 交易）。 这些 phantom 交易源自相应的 Core Space 交易，它们并不存在于账本中。 Phantom 交易具有以下特殊属性：

- 其中，`gas` 和 `gasPrice` 值均为 `0`。 跨空间交易的 gas 费用将在Core Space中收取。 因此，相应的 phantom 交易不会消耗任何 gas。
- 无效的签名（`r`、`s`、`v`、`standardV`）。 Conflux 协议无法代表跨空间交易的发送者签名交易。 因此，phantom 交易使用一个伪造的签名，而这个签名无法通过 ECDSA 验证。

### 示例

当我们在 Conflux Core Space中检索 epoch `0x72819` 时，我们会看到它包含一个单独的 Conflux 交易。

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
  ...
}
```

当我们在eSpace中检索相应的区块时，我们会看到它包含两个 phantom 交易。

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
  ...
}
```

[Yellow Paper]: https://ethereum.github.io/yellowpaper/paper.pdf
[EIP-152]: https://eips.ethereum.org/EIPS/eip-152
[EIP-196]: https://eips.ethereum.org/EIPS/eip-196
[EIP-197]: https://eips.ethereum.org/EIPS/eip-197
[EIP-198]: https://eips.ethereum.org/EIPS/eip-198
