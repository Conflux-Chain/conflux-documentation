---
sidebar_position: 6
title: 虚拟机的差异
displayed_sidebar: coreSidebar
tags:
  - 虚拟机的差异
  - EVM兼容性
  - 地址的计算
  - 1820 注册表
  - BLOCKHASH Opcode
  - 区块的 Gas 限制
  - 区块编号（block.number）
  - 内置合约
  - Gas Usage
  - Gas Fee Refund
  - Core Space
  - 以太坊
  - 智能合约
  - Solidity
---

Core Space 的虚拟机在大多数情况下与 EVM 兼容，但存在一些差异。 本页列出了两者之间的差异。

## 地址的计算

Core Space 的合约地址的计算方式与以太坊不同。 更多详情请查看 [Core 地址](addresses#contract-address-computation) 。

## 1820 注册表

1820 注册表是一个存储了实现某些接口的其他合约地址的合约 它用于实现 EIP-1820 标准。 1820 注册表部署在 Core Space hex40 地址 `0x88887eD889e776bCBe2f0f9932EcFaBcDfCd1820`

## 操作码

- `区块哈希`操作码只能以 `NUMBER-1` 作为输入。 （与以太坊不同，以太坊可以接受 `NUMBER-256` 到 `NUMBER-1` 之间的任何整数作为输入）。 这是唯一的**中断操作码**。

这意味着 Solidity 内置函数 `blockhash` 只能以 `block.number - 1` 作为输入。

## 区块的 Gas 限制

区块的 gsa 限制固定为 30000000。

## block.number

`block.number ` 是整个树图的序列号。

## 内置合约

Core Space 拥有一些在以太坊中并不存在的[内置合约](./internal-contracts/) 。

## Gas

1. Gas 的使用与返还：Conflux 在 `SSTORE` 操作中需要的 gas 较少，但不再返还重置存储和合约销毁的 gas。
2. Gas 费的返还：在以太坊，如果交易的 gas 限制超过了实际 gas 花费，剩下的 gas 会被完全返还。 而在 Conflux 中，只会返还最多 1/4 的 **gas 限制**。 在 Conflux 设置过高的 gas 限制可能会增加额外的交易费用。 但是，如果 gas 限制设置为低于实际花费的 4/3，则不会产生额外费用。 因此，为交易提供准确的 gas 估计是优化交易费用的关键。
