---
sidebar_position: 0
title: Intro
displayed_sidebar: coreSidebar
---

我们将为您快速介绍 Core Space。 它是一个类似于以太坊的智能合约平台。 如果您熟悉以太坊，这个指南将帮助您快速理解 Core Space。

## Base32 地址

Core Space 使用 Base32 地址而非十六进制地址。 Base32 地址是以 `cfx` 或 `cfxtest` 开头的 base32 编码字符串。 例如：

- cfx:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg
- cfxtest:aarc9abycue0hhzgyrr53m6cxedgccrmmy8m50bu1p

想要了解更多详情，请查看此[地址](./address)。 Core Space 的钱包是 [Fluent](https://fluentwallet.com/)

## CFX

CFX 是 Core Space 的原生代币。 它用于支付 gas 费和存储费。 `Drip` 是 `CFX` 的最小单位。 1 CFX = 10^18 Drip。 `GDrip` 是 CFX 的中间单位。 1 CFX = 10^9 GDrip。

## Gas & 存储

Core Space 有一个 [gas 费机制](../../general/conflux-basics/gas)。 它与以太坊的 gas 费机制类似。 It also has a storage mechanism as a **pricing method for using storage**, check [storage specification](./storage) for details.

## Sponsorship

Core Space has a sponsorship mechanism. It allows users to pay for the gas fee of other users. Check [Sponsorship](./sponsor-mechanism) for more details.

## CVM

Core Space has a virtual machine called CVM. It is compatible with EVM in most cases, but there are some differences. Check [CVM Differences](./vm-difference) for more details.

## 内置合约

Core Space has several internal contracts. They are used to provide some basic functions. Check [Internal Contracts](./internal-contracts) for more details.
