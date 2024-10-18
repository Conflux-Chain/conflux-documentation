---
sidebar_position: 15
title: FAQs
description: Frequently asked questions about Conflux eSpace
displayed_sidebar: eSpaceSidebar
keywords:
  - Conflux eSpace
  - FAQs
  - Node Operation
  - Development Tools
  - Cross-Space Bridge
  - Performance
  - Ethereum Compatibility
  - Blockchain Basics
  - Contratos Inteligentes
  - DApp Development
tags:
  - Node Operation
---

## How to run eSpace node?

eSpace and Core Space share a common node program, so please refer to the [Core Space Node Operation Guide](/docs/category/run-a-node). The eSpace default RPC port is 8545, is not same with Core Space RPC port.

## Use which SDK(js-conflux-sdk or ethers.js) to develop eSpace DApp?

eSpace is compatible with Ethereum, you can use the same SDK as Ethereum. So ethers.js, web3.js, [viem](https://viem.sh/), web3py, web3j and other SDKs can be used to develop eSpace DApp.

`js-conflux-sdk` is only used to develop DApp for Conflux Core, and it is not compatible with Ethereum or eSpace.

## How to bridge CFX between eSpace and Core Space?

You can use [Confluxhub Space Bridge](https://confluxhub.io/espace-bridge/cross-space) to bridge CFX between eSpace and Core Space.

## Can I use base32 address in eSpace?

[Base32 address](../core/core-space-basics/addresses.md) is only used in core space, and eSpace is not supported. You can use the hex address in eSpace.

## What is the TPS of eSpace?

It's about 300 TPS.

## Is it easy to migrate an Ethereum DApp to eSpace?

Yes, it is very easy, normally you only need to change the RPC endpoint url to the eSpace RPC endpoint url, and the DApp can run on eSpace.

## What's the eSpace hardfork block number?

- Mainnet: EpochNumber 36935000, BlockNumber 92060600
- Testnet: EpochNumber 61465000, BlockNumber 77340000

## How long does it take to execute a transaction in eSpace?

Typically, it takes 10 seconds from the time a transaction is sent to when it is executed.
