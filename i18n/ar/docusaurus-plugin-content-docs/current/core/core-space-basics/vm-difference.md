---
sidebar_position: 6
title: VM Differences
displayed_sidebar: coreSidebar
keywords:
  - VM Differences
  - EVM Compatibility
  - Address Calculation
  - 1820 Registry
  - BLOCKHASH Opcode
  - Block Gas Limit
  - block.number
  - Internal Contracts
  - Gas Usage
  - Gas Fee Refund
  - Core Space
  - Ethereum
  - Smart Contracts
  - Solidity
tags:
  - VM Differences
---

The Core Space VM is compatible with the EVM in most cases, but there are some differences. This page lists the differences between the two.

## Address Calculation

The contract address calculation is different from Ethereum. Check [Core Address](addresses#contract-address-computation) for more details.

## 1820 Registry

The 1820 registry is a contract that stores the addresses of other contracts that implement certain interfaces. It is used to implement the EIP-1820 standard. The 1820 registry is deployed at Core Space hex40 address `0x88887eD889e776bCBe2f0f9932EcFaBcDfCd1820`

## Opcode

Before v2.4.0 the `BLOCKHASH` opcode can only take `NUMBER-1` as input. (Unlike Ethereum, which takes any integer in `NUMBER-256` to `NUMBER-1` as input). Which means the Solidity built-in function `blockhash` can only take `block.number - 1` as input.

After v2.4.0 it is fully compatible with Ethereum with an advanced input range up to 65536 blocks (implemented by [CIP-133](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-133.md)).

## Block Gas Limit

The block gas limit is 30 million before v2.4.0 and 60 million gas after v2.4.0.

## block.number

The `block.number` is the sequence number in whole tree-graph.

## Internal Contracts

Core Space has some built-in [internal contracts](./internal-contracts/) that are not in Ethereum.

## Gas

1. Gas used and refund: Conflux requires less gas in `SSTORE` operation but no longer refunds resetting storage and contract destruction.
2. Gas Fee Refund: In Ethereum, if a transaction's gas limit exceeds the actual gas cost, the remaining gas is fully refunded. In contrast, Conflux refunds a **maximum of 1/4** of the **gas limit**. Setting an excessively high gas limit in Conflux can lead to additional transaction fee costs. However, no extra fees are incurred if the gas limit is set to less than 4/3 of the actual cost. Therefore, providing an accurate gas estimate for a transaction is crucial for optimizing transaction fees.
