---
sidebar_position: 6
title: 虚拟机的差异
displayed_sidebar: coreSidebar
keywords:
  - 虚拟机的差异
  - EVM兼容性
  - 地址的计算
  - 1820 注册表
  - BLOCKHASH Opcode
  - 区块 Gas 限制
  - 区块编号（block.number）
  - 内置合约
  - Gas Usage
  - Gas Fee Refund
  - Core Space
  - 以太坊
  - 智能合约
  - Solidity
tags: [ 虚拟机的差异 ]
---

Core Space 的虚拟机在大多数情况下与 EVM 兼容，但存在一些差异。 本页列出了两者之间的差异。

## 地址的计算

The EOA and contract address calculation in core space is different from Ethereum.

Check [EOA address](addresses#eoa-hex-address-computation) and [Contract Address](addresses#contract-address-computation) for more details.

## 1820 注册表

:::note

Certain EIPs relying on EIP-1820, for example, EIP-777, is not recommended to be used any more. Using ERC-20 would be good enough for most cases. You can check [Exploring ERC777 Tokens: Vulnerabilities and Potential DOS Attacks on Smart Contracts](https://medium.com/@JohnnyTime/exploring-erc777-tokens-vulnerabilities-and-potential-dos-attacks-on-smart-contracts-507d44604281) for why.

:::

1820 注册表是一个存储了实现某些接口的其他合约地址的合约 它用于实现 EIP-1820 标准。 1820 注册表部署在 Core Space hex40 地址 `0x88887eD889e776bCBe2f0f9932EcFaBcDfCd1820`

## 区块 Gas 限制

The core space block gas limit is 54 million gas after v2.4.0.

## 区块编号（block.number）

`block.number ` 是整个树图的序列号。

## 内置合约

Core Space has some [internal contracts](./internal-contracts/) that are not in Ethereum.

## Gas Pricing

### 存储抵押

Conflux Core 引入了存储抵押物(CFS)机制，作为**使用存储空间的定价方法**。 原则上，该机制需要锁定一定数量的资金作为抵押品，以占用存储空间。 (**each storage entry occupies 64B (B is Bytes, byte)**, which is the size of the key/value pair in the world state). 这些抵押资金将保持锁定，直到相应的存储空间释放或被其他人接管。

Please refer to [Storage](./storage.md) for more details.

### BLOCKHASH Gas Pricing

While Ethereum allows querying blocks in the range `[n-256, n-1]` for block height `n`, Conflux supports a larger range of `[n-65535, n]` ([CIP-133](./cip-133.md)). Corresponding gas prices for `BLOCKHASH` are adjusted as follows:

- **Ethereum**: `20 gas` (uniform for all cases)
- **Conflux**: `2100 gas` (for the range `[n-65535, n-257]`), `100 gas` (for blocks in `[n-256, n-1]`)

### Gas Refunds

- **Gas refund cap**: In Ethereum, if a transaction's gas limit exceeds the actual gas cost, the remaining gas is fully refunded. 相比之下，Conflux 最多退还 **gas limit** 的 **1/4**。 Check [Gas Limit, Gas Used, and Gas Charged](../../general/conflux-basics/gas#gas-limit-gas-used-and-gas-charged) for more details.
- **EIP-7702 refund difference**: When updating delegate addresses (rather than creating a new delegation), Conflux does not issue the 12500 gas refund that Ethereum provides.

### 交易的 Gas 上限

- A transaction's gas limit should be no less than 100 times the byte size of its call data. Check [CIP-130](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-130.md) for more details.

### Transaction Balance Handling

When transaction balance cannot afford maximum cost (`max gas price × gas limit + tx value`):

- **Ethereum**: Transaction fails without nonce increment or fee deduction
- **Conflux**: Nonce is incremented and maximum effective gas price × gas limit is deducted (or entire balance if insufficient)

> The maximum effective gas price equals to `gasPrice` if `gasPrice` is specified otherwise `min(maxFeePerGas, baseFeePerGas+maxPriorityFeePerGas)`.

### 其他

- **EIP-2200 in Core Space**: Both original and new values are treated as non-zero to accommodate [core space storage collateral mechanism](./storage.md).
- **Warm/cold for Internal contracts**: All [internal contracts](./internal-contracts/internal-contracts.mdx) are treated as warm addresses, but their storage entries are consistently treated as cold.

## 其他资源

- [CIP-645: Align Conflux eSpace Behavior with EVM](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-645.md)
