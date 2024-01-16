---
sidebar_position: 0
title: Intro
displayed_sidebar: coreSidebar
---

我们将为您快速介绍 Core Space。 它是一个类似于以太坊的智能合约平台。 如果您熟悉以太坊，这个指南将帮助您快速理解 Core Space。

## Base32 地址

Core Space 使用 Base32 地址而非十六进制地址。 The Base32 address is a base32-encoded string that starts with `cfx` or `cfxtest`. 例如：

- cfx:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg
- cfxtest:aarc9abycue0hhzgyrr53m6cxedgccrmmy8m50bu1p

想要了解更多详情，请查看此[地址](./address)。 Additionally, the recommended wallet for Core Space is [Fluent](https://fluentwallet.com/).

## CFX

CFX is the native token of Core Space which can be used to pay for gas and storage. `Drip` 是 `CFX` 的最小单位。 1 CFX = 10^18 Drip。 `GDrip` 是 CFX 的中间单位。 1 CFX = 10^9 GDrip。

## Gas & 存储

Core Space incorporates a gas mechanism, akin to the one used in Ethereum, detailed further in the [gas mechanism overview](../../general/conflux-basics/gas). Additionally, it employs a storage collateral mechanism that serves as a pricing strategy for utilizing contract storage space. For more in-depth information, refer to the [storage specification](./storage).

## Sponsorship

Core Space features a unique sponsorship mechanism. This system enables users to cover the gas fees as well as storage collateral for other users, facilitating a more collaborative environment. For an in-depth understanding of this mechanism, please refer to [Sponsorship](./sponsor-mechanism).

## CVM

At the heart of Core Space is the Conflux Virtual Machine (CVM). While it largely aligns with the Ethereum Virtual Machine (EVM), there are notable differences. To explore these distinctions in detail, visit [CVM Differences](./vm-difference).

## 内置合约

Core Space is equipped with several internal contracts. These contracts are integral in providing foundational functions for the platform. For comprehensive information about these contracts, please consult [Internal Contracts](./internal-contracts) for more details.
