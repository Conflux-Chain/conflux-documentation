---
sidebar_position: 6
title: VM Differences
displayed_sidebar: coreSidebar
---

The Core Space VM is compatible with the EVM in most cases, but there are some differences. This page lists the differences between the two.

## Contract Address Calculation

The contract address calculation is different from Ethereum. Check [Core Address](addresses#contract-address-computation) for more details.

## 1820 Registry

The 1820 registry is a contract that stores the addresses of other contracts that implement certain interfaces. It is used to implement the EIP-1820 standard. The 1820 registry is deployed at Core Space hex40 address `0x88887eD889e776bCBe2f0f9932EcFaBcDfCd1820`

## Opcode

* The `BLOCKHASH` opcode can only take `NUMBER-1` as input. (Unlike Ethereum, which takes any integer in `NUMBER-256` to `NUMBER-1` as input). This is the **only break opcode**.

Which means the Solidity built-in function `blockhash` can only take `block.number - 1` as input.

## Block Gas Limit

The block gas limit is fixed at 3000w.

## block.number

The `block.number` is the sequence number in whole tree-graph.

## Built-in Contracts

Core Space has some [built-in contracts](./internal-contracts/) that are not in Ethereum.

## Gas

1. Gas used and refund: Conflux requires less gas in `SSTORE` operation but no longer refunds resetting storage and contract destruction.
2. Gas fee refund: Conflux will refund at most 1/4 of gas limit. So try to provide an accurate estimation for gas limit
before signing transactions.