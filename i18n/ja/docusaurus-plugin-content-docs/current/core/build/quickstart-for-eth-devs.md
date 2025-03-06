---
sidebar_position: 5
title: QuickStart for Ethereum Developers
displayed_sidebar: coreSidebar
keywords:
  - Ethereum
  - migration
  - compatibility
  - EVM
  - smart contracts
  - Conflux Core Space
  - development
  - quickstart
tags:
  - Ethereum compatibility
  - Core Space development
---

Conflux Core Space is a blockchain protocol based on an innovative tree graph ledger structure. It is compatible with both VM and EVM (Ethereum Virtual Machine), and its core concepts (accounts, transactions, smart contracts, etc.) are similar to Ethereum. If you are an Ethereum developer, you can quickly get started with Conflux Core Space development. This article will guide Ethereum developers on how to quickly dive into Conflux Core Space development.

If you are not familiar with Ethereum development, it is strongly recommended to learn Ethereum development first, as it has rich documentation, comprehensive development tools, and community support. This article will not cover the basics of Ethereum development.

## Differences between Conflux Core Space and Ethereum

Conflux's underlying ledger structure is a tree graph, which differs from Ethereum. It is recommended to first understand [Conflux's tree graph ledger structure](/docs/general/conflux-basics/consensus-mechanisms/proof-of-work/tree-graph). This will involve new concepts such as [Epoch](/docs/general/conflux-basics/glossary#epoch).

Conflux Core Space has two types of accounts, similar to Ethereum: external accounts and contract accounts. However, the account addresses in Conflux Core Space are different, with distinct generation methods and encoding rules. For details, refer to [Conflux Core Addresses](/docs/core/core-space-basics/addresses). If you prefer not to delve into the details, you can directly use the Fluent wallet or Core Space SDK to obtain addresses.

Due to differences in address and ledger structure, Conflux Core Space's RPC (Remote Procedure Call) interface also has some variations. For details, see [Conflux Core RPC](/docs/core/build/json-rpc/cfx-namespace). In summary, the core RPC methods of Conflux Core Space are similar to Ethereum, with the only change being the prefix from `eth_` to `cfx_`. Additionally, there are some new methods and slight differences in parameters and return structures.

The transaction structure in Conflux Core Space is almost the same as Ethereum's 155-type transactions, including core transaction information and gas fees. However, Conflux Core Space's transaction structure also includes some additional fields. Refer to [Conflux Core Transactions](/docs/core/core-space-basics/transactions/overview) and [Transaction Comparison](/docs/core/core-space-basics/transactions/faqs#whats-the-differences-between-ethereum-155-transaction-and-core-space-transaction) for details.

Conflux Core Space's VM is compatible with EVM, meaning that most Ethereum smart contracts can be deployed directly on Conflux Core Space. Popular Solidity libraries (e.g., OpenZeppelin) and tools can also be used directly, with some subtle differences in contract address calculation rules and the 1820 contract address. See [VM Difference](/docs/core/core-space-basics/vm-difference) for more information.

## Innovations in Conflux Core Space

As a next-generation blockchain protocol, Conflux Core Space introduces some innovative features, such as:

1. Beyond transaction gas fees, it proposes a more reasonable storage fee. Details can be found in [Storage Fees](/docs/core/core-space-basics/storage), where storage fees are in the form of collateral, refundable after storage release.

2. The most significant innovation is the implementation of a transaction fee [sponsorship mechanism](/docs/core/core-space-basics/sponsor-mechanism). This mechanism allows contracts to be sponsored, meaning that sponsored contracts do not require users to pay gas fees during interactions; instead, the sponsor covers the fees. This mechanism significantly lowers user entry barriers and allows contract developers more flexibility in designing contracts.

In addition, Conflux Core Space provides several built-in contracts for governance, sponsorship, cross-space functionality, etc. See [Internal Contracts](https://doc.confluxnetwork.org/docs/core/core-space-basics/internal-contracts/) for details.

## Getting Started Quickly

Ethereum developers can quickly get started with Conflux Core Space development through the following steps:

1. Install the Fluent wallet, the official wallet for Conflux Core Space, supporting all its features. See [Fluent Wallet](https://fluentwallet.com/).

2. Switch the network to the testnet and claim test CFX through the Core Space faucet. Refer to [Faucet](https://faucet.confluxnetwork.org/).

3. Quickly familiarize yourself with Conflux Core's [js-conflux-sdk](/docs/core/core-developer-quickstart), a SDK similar to web3.js or ethers.js, with some usage differences.

4. Use Hardhat with [hardhat-conflux](/docs/core/tutorials/hardhat-conflux-plugin) plugin for contract development. The contract development experience is identical to Ethereum, with deployment and interaction scripts written using js-conflux-sdk.

5. For backend services, use [SDKs in other languages](/docs/core/build/sdks-and-tools/sdks), including Golang, Python, Java, etc.

## Migrating Ethereum Dapps to Conflux Core Space

If you already have an Ethereum Dapp and want to migrate it to Conflux Core Space, follow these steps:

1. Deploy the contracts (usually requiring no modification to the contract code) to Conflux Core Space using Hardhat with the hardhat-conflux plugin or directly using js-conflux-sdk.

2. Replace the Ethereum SDK in the Dapp's frontend code with js-conflux-sdk, and switch the wallet to the Fluent wallet.

## Other Resources

- [Official Public RPC Endpoint](/docs/core/conflux_rpcs)
- [Blockchain Explorer](https://confluxscan.io/)
- [How to Sponsor a Contract](/docs/core/tutorials/how-to-sponsor-contract)
- [FAQs](/docs/core/FAQs)