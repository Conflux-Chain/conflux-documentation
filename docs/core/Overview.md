---
sidebar_position: 1
title: Overview
displayed_sidebar: coreSidebar
keywords:
  - Core Space
  - Tree-Graph
  - Smart Contracts
  - Solidity
  - Transaction Sponsorship
  - PoS Staking
  - Cross-Space Communication
  - On-chain Governance
  - Base32 Encoding
  - JSON-RPC
  - Fluent Wallet
  - js-conflux-sdk
  - Developer Resources
  - Tutorials
  - Technical Details
  - Testnet
  - Node Operation
  - SDKs
  - FAQs 
---

Conflux Core Space is the native space of the Conflux network. Thanks to Conflux's innovative Tree-Graph ledger structure and consensus algorithm, Core Space achieves performance far surpassing that of Bitcoin and Ethereum without sacrificing decentralization. This provides strong support for the development of the Conflux ecosystem.

Core Space is a smart contract platform that evolved from the EVM. Smart contracts can be developed using **Solidity**, and numerous optimizations and improvements have been made on this basis. These include the contract administration mechanism and the **transaction fee sponsorship mechanism**. In addition to this, Core Space has introduced several built-in contracts to implement features such as **PoS staking**, **cross-Space communication**, and **on-chain governance**.

The account address format in Core Space is in **base32 encoding**, which is different from Ethereum addresses. It also offers a set of **unique JSON-RPC interfaces**. Therefore, interacting with Conflux Core Space requires the use of **proprietary** wallets (such as Fluent) and SDKs (like js-conflux-sdk).

## Quick Start

* [User Guides](./getting-started/)
* [Developer QuickStart](./core-developer-quickstart)
* [QuickStart for Ethereum Developers](./build/quickstart-for-eth-devs)

## Tutorials

* [JS SDK Complete Guide](./tutorials/js-conflux-sdk)
* [hardhat-conflux Tutorial](./tutorials/hardhat-conflux-plugin)
* [chainIDE Tutorial](./tutorials/chainide)
* [Contract Sponsor Tutorial](./tutorials/how-to-sponsor-contract)
* [NFT Tutorial](./tutorials/nft-tutorial)

## Technical Details

1. [Base32 Address](./core-space-basics/addresses)
2. [Account State](./core-space-basics/accounts)
3. [Transaction explain](./core-space-basics/transactions/overview.md)
4. [Storage Collateral Intro](./core-space-basics/storage)
5. [VM Differences with EVM](./core-space-basics/vm-difference)
6. [Internal Contract explanation](./core-space-basics/internal-contracts/)
7. [Sponsor mechanism](./core-space-basics/sponsor-mechanism)

## Resources

1. [Testnet Faucet](https://faucet.confluxnetwork.org/)
2. [How to run a node](../general/run-a-node/Overview)
3. [Core Space SDKs: js, go, python, java](./build/sdks-and-tools/sdks.md)

## References

1. [Network JSON-RPC endpoints](./core-endpoints.md)
2. [JSON-RPC APIs](./build/json-rpc/)
3. [Internal Contract APIs](./core-space-basics/internal-contracts/)

## FAQs

1. [FAQs](./FAQs.md)
