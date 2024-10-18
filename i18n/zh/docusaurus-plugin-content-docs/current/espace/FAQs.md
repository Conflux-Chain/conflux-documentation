---
sidebar_position: 15
title: 常见问题解答
description: 关于 Conflux eSpace 的常见问题
displayed_sidebar: eSpaceSidebar
keywords:
  - Conflux eSpace
  - 常见问题解答
  - Node Operation
  - Development Tools
  - Cross-Space Bridge
  - Performance
  - Ethereum Compatibility
  - Blockchain Basics
  - 智能合约
  - DApp Development
tags:
  - Node Operation
---

## 如何运行 eSpace 节点

eSpace 和 Core Space 共用一个节点程序，具体请查阅 [Core Space 节点操作指南](/docs/category/run-a-node)。 与 Core Space 的 RPC 端口不同，eSpace 默认的 RPC 端口是 8545。

## 使用哪个 SDK（js-conflux-sdk 或 ethers.js）来开发 eSpace DApp？

eSpace 与以太坊兼容，您可以使用与以太坊相同的 SDK。 因此，ethers.js、web3.js、[viem](https://viem.sh/)、web3py、web3j 和其他 SDK 都可以用来开发 eSpace DApp。

`js-conflux-sdk` 仅可用于开发 Conflux Core 上的 DApp，不兼容以太坊和 eSpace。

## 如何在 eSpace 和 Core Space 之间桥接 CFX？

您可以使用 [Confluxhub Space Bridge](https://confluxhub.io/espace-bridge/cross-space) 在 eSpace 和 Core Space 之间桥接 CFX。

## 可以在 eSpace 中使用 base32 地址吗？

[Base32 地址](../core/core-space-basics/addresses.md)仅可在 Core Space 中使用，不支持 eSpace。 您可以在 eSpace 中使用十六进制地址。

## eSpace 的 TPS 是多少？

大约是 300 TPS。

## 将以太坊 DApp 迁移到 eSpace 中容易吗？

是的，非常容易，通常您只需要将 RPC 端点 URL 更改为 eSpace 的 RPC 端点 URL，就可以在 eSpace 上运行 DApp 。

## eSpace 硬分叉的区块号是多少？

- 主网：EpochNumber 36935000，BlockNumber 92060600。
- 测试网： EpochNumber 61465000, BlockNumber 7734000

## 在 eSpace 中执行一笔交易需要多长时间？

通常，从交易的发送到执行大约需要 10 秒钟。
