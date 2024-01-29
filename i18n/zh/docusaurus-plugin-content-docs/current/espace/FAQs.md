---
sidebar_position: 15
title: 常见问题解答
description: 关于 Conflux eSpace 的常见问题
displayed_sidebar: eSpaceSidebar
---

## 如何运行 eSpace 节点

eSpace 和 Core Space 共用一个节点程序，具体请查阅 [Core Space 节点操作指南](/docs/category/run-a-node)。 与 Core Space 的 RPC 端口不同，eSpace 默认的 RPC 端口是 8545。

## 使用哪个 SDK（js-conflux-sdk 或 ethers.js）来开发 eSpace DApp？

eSpace 与以太坊兼容，您可以使用与以太坊相同的 SDK。 因此，ethers.js、web3.js、[viem](https://viem.sh/)、web3py、web3j 和其他 SDK 都可以用来开发 eSpace DApp。

`js-conflux-sdk` 仅可用于开发 Conflux Core 上的 DApp，不兼容以太坊和 eSpace。

## How to bridge CFX between eSpace and Core Space?

You can use [Confluxhub Space Bridge](https://confluxhub.io/espace-bridge/cross-space) to bridge CFX between eSpace and Core Space.

## Can I use base32 address in eSpace?

[Base32 address](../core/core-space-basics/addresses.md) is only used in core space, and eSpace is not supported. You can use the hex address in eSpace.

## eSpace 的 TPS 是多少？

大约是 300 TPS。

## 将以太坊 DApp 迁移到 eSpace 中容易吗？

Yes, it is very easy, normally you only need to change the RPC endpoint url to the eSpace RPC endpoint url, and the DApp can run on eSpace.

## What's the eSpace hardfork block number?

- Mainnet: EpochNumber 36935000, BlockNumber 92060600
- Testnet: EpochNumber 61465000, BlockNumber 77340000

## 在 eSpace 中执行一笔交易需要多长时间？

通常，从交易的发送到执行大约需要 10 秒钟。
