---
sidebar_position: 3
title: EVM Compatibility
description: EVM Compatibility of Conflux eSpace
displayed_sidebar: eSpaceSidebar
keywords:
  - Conflux eSpace
  - EVM Compatibility
  - Transaction Types
  - EVM Opcodes
  - Block Time
  - Contract Size
  - Transaction Fees
  - Gas Limit
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

The eSpace implements an Ethereum Virtual Machine (EVM). Below are some differences between eSpace and Ethereum:

## Transaction Type

- eSpace initially only supports **155 type** transaction (legacy transactions)
- [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) (type 1) & [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) (type 2) transactions are supported after hardfork v2.4.0.
- [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) (type 3) transactions are not supported.

## EVM Opcodes

* **Before v2.4.0** the `BLOCKHASH` opcode can only take `NUMBER-1` as input. (Unlike Ethereum, which takes any integer in `NUMBER-256` to `NUMBER-1` as input). After v2.4.0 it is fully compatible with Ethereum with an advanced input range up to 65536 blocks (implemented by [CIP-133](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-133.md)).
* The 4844 opcode `BLOBHASH` `BLOBBASEFEE` is not supprted.

## Block Time

The `NUMBER` opcode will return the tree-graph `epoch number`. As a result, `block.number` used in eSpace contracts will not grow at a stable and predictable rate, and so it might not be suitable for measuring time.

Block generate rate is 1.25s per block (mainnet), is same as Core Space Epoch time.

## Contract Size

Contract max code size is `49152` double as Ethereum

## Transaction Fees

* No gas refund in `SSTORE` opcode and `SUICIDE` opcode.
* The operations which occupy storage have a different gas cost.
  1. `SSTORE` costs 40000 gas (instead of 20000 gas in Ethereum) when changing a storage entry from zero to non-zero.
  2. When deploying a new contract, each byte costs 400 gas (instead of 200 gas in Ethereum).
  3. When creating a new account by `CALL` or `SUICIDE`, it consumes 50000 gas (instead of 25000 gas in Ethereum).
* At most `1/4` of transaction `gasLimit` will be refund (if not used)

## Transaction Gas limit

Only the block whose block height is a multiple of `5` can pack Ethereum type transaction. The total gas limit of these transaction cannot exceed half of the block gas limit (15,000,000).

## EVM Precompiles

All standard precompiles are supported.

<div class="compat-evm-precompiles-table"></div>

| Address | ID                | Name                                                                                     | Spec             | Status | Version |
| ------- | ----------------- | ---------------------------------------------------------------------------------------- | ---------------- | ------ | ------- |
| 0x01    | `ECRecover`       | ECDSA public key recovery                                                                | [Yellow Paper][] | ✅      |         |
| 0x02    | `SHA256`          | SHA-2 256-bit hash function                                                              | [Yellow Paper][] | ✅      |         |
| 0x03    | `RIPEMD160`       | RIPEMD 160-bit hash function                                                             | [Yellow Paper][] | ✅      |         |
| 0x04    | `Identity`        | Identity function                                                                        | [Yellow Paper][] | ✅      |         |
| 0x05    | `ModExp`          | Big integer modular exponentiation                                                       | [EIP-198][]      | ✅      |         |
| 0x06    | `BN128Add`        | Elliptic curve addition                                                                  | [EIP-196][]      | ✅      |         |
| 0x07    | `BN128Mul`        | Elliptic curve scalar multiplication                                                     | [EIP-196][]      | ✅      |         |
| 0x08    | `BN128Pair`       | Elliptic curve pairing check                                                             | [EIP-197][]      | ✅      |         |
| 0x09    | `Blake2F`         | BLAKE2b `F` compression function                                                         | [EIP-152][]      | ✅      |         |
| 0x0a    | `PointEvaluation` | Verify p(z) = y given commitment that corresponds to the polynomial p(x) and a KZG proof | [EIP-4844][]     | ✅      | V2.4.0  |

## Phantom transactions

A *cross-space transaction* is a transaction in the Conflux core space that, at some point during its execution, calls one of the state-changing (i.e., not `view`) methods of the `CrossSpaceCall` internal contract. Such transactions can change CFX balances and contract storage in both spaces, core and eSpace.

As EVM clients are not aware of Conflux space transactions (the two spaces use different transaction formats), we construct one or more *phantom* transactions (aka *virtual* transactions) for each call to the `CrossSpaceCall` internal contract. These phantom transactions are derived from the corresponding core space transaction, they do not exist in the ledger. Phantom transactions have the following special properties:

- `gas` and `gasPrice` are `0`. Gas for cross-space transactions is charged in the core space. Therefore, the corresponding phantom transactions do not consume any gas.
- Invalid signature (`r`, `s`, `v`, `standardV`). The Conflux protocol is unable to sign transactions on behalf of the sender of the cross-space transaction. Therefore, phantom transactions use a fake signature that will not pass ECDSA verification.

### Example

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

## Resources

- [EVM opcodes reference](https://www.evm.codes/)

[Yellow Paper]: https://ethereum.github.io/yellowpaper/paper.pdf
[EIP-152]: https://eips.ethereum.org/EIPS/eip-152
[EIP-196]: https://eips.ethereum.org/EIPS/eip-196
[EIP-197]: https://eips.ethereum.org/EIPS/eip-197
[EIP-198]: https://eips.ethereum.org/EIPS/eip-198
[EIP-4844]: https://eips.ethereum.org/EIPS/eip-4844#point-evaluation-precompile