---
sidebar_position: 15
title: 常见问题解答
description: Frequently asked questions about Conflux eSpace
displayed_sidebar: eSpaceSidebar
---

## How to run eSpace node?

eSpace and Core Space share a common node program, so please refer to the [Core Space Node Operation Guide](/docs/category/run-a-node). The eSpace default RPC port is 8545, is not same with Core Space RPC port.

## Use which SDK(js-conflux-sdk or ethers.js) to develop eSpace DApp?

eSpace is compatible with Ethereum, you can use the same SDK as Ethereum. So ethers.js, web3.js, [viem](https://viem.sh/), web3py, web3j and other SDKs can be used to develop eSpace DApp.

`js-conflux-sdk` is only used to develop DApp for Conflux Core, and it is not compatible with Ethereum or eSpace.

## How to bridge CFX between eSpace and Core Space?

You can use [Confluxhub Space Bridge](https://confluxhub.io/espace-bridge/cross-space) to bridge CFX between eSpace and Core Space.

## Can I use base32 address in eSpace?

[Base32 address](../core/learn/core-space-basics/addresses.md) is only used in core space, and eSpace is not supported. You can use the hex address in eSpace.

## What is the eSpace TPS ?

It's about 300 TPS.
