---
sidebar_position: 0
title: 介绍
displayed_sidebar: coreSidebar
keywords:
  - Core Space - Base32 Address - CFX - Gas - Storage - Sponsorship - CVM - Internal Contracts - Smart Contract Platform - Ethereum Compatibility - Fluent Wallet - Drip - GDrip
tags:
  - Base32 地址
  - Addresses
  - Conflux Addresses
  - 账户
  - Core Space
---

我们将为您快速介绍 Core Space。 它是一个类似于以太坊的智能合约平台。 如果您熟悉以太坊，这个指南将帮助您快速理解 Core Space。

## Base32 地址

Core Space 使用 Base32 地址而非十六进制地址。 Base32 地址是以 `cfx` 或 `cfxtest` 开头的 base32 编码字符串。 例如：

- cfx:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg
- cfxtest:aarc9abycue0hhzgyrr53m6cxedgccrmmy8m50bu1p

想要了解更多详情，请查看此[地址](./addresses)。 此外，Core Space 上推荐的钱包是 [Fluent](https://fluentwallet.com/)。

## CFX

CFX 是 Core Space 的原生代币，可用于支付燃气和存储费用。 `Drip` 是 `CFX` 的最小单位。 1 CFX = 10^18 Drip。 `GDrip` 是 CFX 的中间单位。 1 CFX = 10^9 GDrip。

## Gas & 存储

Core Space 采用了类似于 Ethereum 中使用的 Gas 机制，更多细节请参见 [Gas 机制概述](../../general/conflux-basics/gas)。 此外，它采用了存储抵押机制，作为使用合约存储空间的定价策略。 想要获取更深入的信息，请参阅 [存储规范](./storage)。

## 代付

Core Space 特有一个独特的代付机制。 该系统允许用户为其他用户支付燃气费用以及存储抵押费用，从而促进了一个更具协作性的环境。 为了深入理解这一机制，请参阅 [代付](./sponsor-mechanism)。

## CVM

Core Space 的核心是 Conflux 虚拟机（CVM）。 虽然它在很大程度上与以太坊虚拟机（EVM）保持一致，但存在一些显著的差异。 要详细了解这些差异，请访问 [CVM差异](./vm-difference)。

## 内置合约

Core Space 配备了几个内部合约。 这些合约在为平台提供基础功能方面起着不可或缺的作用。 想要全面地了解这些合约的信息，请查阅 [内部合约](./internal-contracts) 以获取更多信息。
