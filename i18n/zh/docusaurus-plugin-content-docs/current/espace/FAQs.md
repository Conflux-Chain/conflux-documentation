---
sidebar_position: 15
title: 常见问题解答
description: 关于 Conflux eSpace 的常见问题
displayed_sidebar: eSpaceSidebar
---

## 如何运行 eSpace 节点

eSpace and Core Space share a common node program, so please refer to the [Core Space Node Operation Guide](/docs/category/run-a-node). 与 Core Space 的 RPC 端口不同，eSpace 默认的 RPC 端口是 8545。

## Use which SDK(js-conflux-sdk or ethers.js) to develop eSpace DApp?

eSpace 与以太坊兼容，您可以使用与以太坊相同的 SDK。 因此，ethers.js、web3.js、[viem](https://viem.sh/)、web3py、web3j 和其他 SDK 都可以用来开发 eSpace DApp。

`js-conflux-sdk` is only used to develop DApp for Conflux Core, and it is not compatible with Ethereum or eSpace.

## How to bridge CFX between eSpace and Core Space?

You can use [Confluxhub Space Bridge](https://confluxhub.io/espace-bridge/cross-space) to bridge CFX between eSpace and Core Space.

## Can I use base32 address in eSpace?

[Base32 address](../core/core-space-basics/addresses.md) is only used in core space, and eSpace is not supported. You can use the hex address in eSpace.

## eSpace 的 TPS 是多少？

大约是 300 TPS。

## Is it easy to migrate an Ethereum DApp to eSpace?

Yes, it is very easy, normally you only need to change the RPC endpoint url to the eSpace RPC endpoint url, and the DApp can run on eSpace.

## What's the eSpace hardfork block number?

- Mainnet: EpochNumber 36935000, BlockNumber 92060600
- Testnet: EpochNumber 61465000, BlockNumber 77340000

## 在 eSpace 中执行一笔交易需要多长时间？

Typically, it takes 10 seconds from the time a transaction is sent to when it is executed.
