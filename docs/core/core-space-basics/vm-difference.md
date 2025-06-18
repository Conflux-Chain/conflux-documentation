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
tags: [VM Differences]

---

The Core Space VM is compatible with the EVM in most cases, but there are some differences. This page lists the differences between the two.

## Address Calculation

The EOA and contract address calculation in core space is different from Ethereum.

Check [EOA address](addresses#eoa-hex-address-computation) and [Contract Address](addresses#contract-address-computation) for more details.

## 1820 Registry

:::note

Certain EIPs relying on EIP-1820, for example, EIP-777, is not recommended to be used any more. Using ERC-20 would be good enough for most cases. You can check [Exploring ERC777 Tokens: Vulnerabilities and Potential DOS Attacks on Smart Contracts](https://medium.com/@JohnnyTime/exploring-erc777-tokens-vulnerabilities-and-potential-dos-attacks-on-smart-contracts-507d44604281) for why.

:::

The 1820 registry is a contract that stores the addresses of other contracts that implement certain interfaces. It is used to implement the EIP-1820 standard. The 1820 registry is deployed at Core Space hex40 address `0x88887eD889e776bCBe2f0f9932EcFaBcDfCd1820`

## Block Gas Limit

The core space block gas limit is 54 million gas after v2.4.0.

## block.number

The `block.number` is the sequence number in whole tree-graph.

## Internal Contracts

Core Space has some [internal contracts](./internal-contracts/) that are not in Ethereum.

## Gas Pricing

### Storage Collateral

Conflux Core introduced the Collateral for Storage (CFS) mechanism as a **pricing method for using storage**. In principle, this mechanism requires locking a certain amount of funds as collateral to occupy storage space. (**each storage entry occupies 64B (B is Bytes, byte)**, which is the size of the key/value pair in the world state). This collateral remains locked until the corresponding storage space is either released or taken over by others.

Please refer to [Storage](./storage.md) for more details.

### BLOCKHASH Gas Pricing

While Ethereum allows querying blocks in the range `[n-256, n-1]` for block height `n`, Conflux supports a larger range of `[n-65535, n]` ([CIP-133](./cip-133.md)). Corresponding gas prices for `BLOCKHASH` are adjusted as follows:
- **Ethereum**: `20 gas` (uniform for all cases)  
- **Conflux**: `2100 gas` (for the range `[n-65535, n-257]`), `100 gas` (for blocks in `[n-256, n-1]`)

### Gas Refunds

* **Gas refund cap**: In Ethereum, if a transaction's gas limit exceeds the actual gas cost, the remaining gas is fully refunded. In contrast, Conflux refunds a **maximum of 1/4** of the **gas limit**. Check [Gas Limit, Gas Used, and Gas Charged](../../general/conflux-basics/gas#gas-limit-gas-used-and-gas-charged) for more details.
* **EIP-7702 refund difference**: When updating delegate addresses (rather than creating a new delegation), Conflux does not issue the 12500 gas refund that Ethereum provides.

### Transaction Gas limit

- A transaction's gas limit should be no less than 100 times the byte size of its call data. Check [CIP-130](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-130.md) for more details.

### Transaction Balance Handling

When transaction balance cannot afford maximum cost (`max gas price × gas limit + tx value`):

- **Ethereum**: Transaction fails without nonce increment or fee deduction
- **Conflux**: Nonce is incremented and maximum effective gas price × gas limit is deducted (or entire balance if insufficient)

> The maximum effective gas price equals to `gasPrice` if `gasPrice` is specified otherwise `min(maxFeePerGas, baseFeePerGas+maxPriorityFeePerGas)`.

### Others

- **EIP-2200 in Core Space**: Both original and new values are treated as non-zero to accommodate [core space storage collateral mechanism](./storage.md).
- **Warm/cold for Internal contracts**: All [internal contracts](./internal-contracts/internal-contracts.mdx) are treated as warm addresses, but their storage entries are consistently treated as cold.

## Resources

- [CIP-645: Align Conflux eSpace Behavior with EVM](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-645.md)
