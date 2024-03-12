---
sidebar_position: 2
title: EVM兼容性
description: Conflux eSpace 的 EVM 兼容性
keywords:
  - EVM
  - 兼容性
displayed_sidebar: eSpaceSidebar
---

eSpace 实现了一个以太坊虚拟机 (EVM)。 以下是 eSpace 和以太坊之间的一些区别：

## 交易类型

目前 eSpace 仅支持 **155 类型** 交易。 暂不支持 1559 类型交易。

## EVM 操作码

* `BLOCKHASH` 操作码只能接受 `NUMBER-1` 作为输入。 （与以太坊不同的是，以太坊可以接受 `NUMBER-256` 到 `NUMBER-1` 之间的任何整数作为输入）。 这是**唯一的中断操作码**.。

## 区块时间

`NUMBER` opcode将返回树图`epoch number`。 因此，在 eSpace 合约中使用的 `block.number` 不会以稳定和可预测的速率增长，因此它可能不适合用于测量时间。

区块的生成速率是每个区块 1.25 秒（主网），与 Core Space Epoch 时间相同。

## 合约大小

合约最大代码大小是 `49152` ，是以太坊的两倍。

## Transaction Fees

* `SSTORE` 操作码和 `SUICIDE` opcode中不会退还gas。
* 占用存储的操作有不同的gas消耗。
  1. 当将存储条目从零更改为非零时，`SSTORE` 花费 40000 gas（而以太坊中为 20000 gas）。
  2. 部署新合约时，每个字节花费 400 gas（而以太坊中为 200 gas）。
  3. 通过 `CALL` 或 `SUICIDE` 创建新账户时，该操作消耗 50000 gas（而以太坊中为 25000 gas）。
* 最多 `1/4` 的交易 `gasLimit` 可以被退还（如果未使用）

## Transaction Gas limit

Only the block whose block height is a multiple of `5` can pack Ethereum type transaction. The total gas limit of these transaction cannot exceed half of the block gas limit (15,000,000).

## EVM Precompiles

All standard precompiles are supported.

<div class="compat-evm-precompiles-table"></div>

| Address | ID          | 名称                                   | Spec             | Status |
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

A *cross-space transaction* is a transaction in the Conflux core space that, at some point during its execution, calls one of the state-changing (i.e., not `view`) methods of the `CrossSpaceCall` internal contract. Such transactions can change CFX balances and contract storage in both spaces, core and eSpace.

As EVM clients are not aware of Conflux space transactions (the two spaces use different transaction formats), we construct one or more *phantom* transactions (aka *virtual* transactions) for each call to the `CrossSpaceCall` internal contract. These phantom transactions are derived from the corresponding core space transaction, they do not exist in the ledger. Phantom transactions have the following special properties:

- 其中，`gas` 和 `gasPrice` 值均为 `0`。 跨空间交易的 gas 费用将在Core Space中收取。 因此，相应的 phantom 交易不会消耗任何 gas。
- 无效的签名（`r`、`s`、`v`、`standardV`）。 Conflux 协议无法代表跨空间交易的发送者签名交易。 因此，phantom 交易使用一个伪造的签名，而这个签名无法通过 ECDSA 验证。

### 示例

When we retrieve epoch `0x72819` in the Conflux core space, we see it contains a single Conflux transaction.

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

When we retrieve the corresponding block in the eSpace, we see it contains two phantom transactions.

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

## 其他资源

- [EVM opcodes reference](https://www.evm.codes/)

[Yellow Paper]: https://ethereum.github.io/yellowpaper/paper.pdf
[EIP-152]: https://eips.ethereum.org/EIPS/eip-152
[EIP-196]: https://eips.ethereum.org/EIPS/eip-196
[EIP-197]: https://eips.ethereum.org/EIPS/eip-197
[EIP-198]: https://eips.ethereum.org/EIPS/eip-198