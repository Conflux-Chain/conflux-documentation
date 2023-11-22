---
sidebar_position: 0
title: Overview
---

# Documentation Overview

Welcome to the Conflux Network Developer Portal! This comprehensive portal is designed to guide you through the complexities of the Conflux Network, a high-performance, decentralized blockchain network. Here, you'll find detailed summaries of the platform's foundational concepts, tools, and guidelines.

## **Understanding the Conflux Network**

- [**Consensus Mechanism**](conflux-basics/consensus-mechanisms): Discover Conflux's hybrid PoW-PoS consensus mechanism, combining Proof of Work with Proof of Stake for enhanced security and performance.

- [**Spaces**](conflux-basics/spaces):
Explore the dual space ecosystem of Conflux, facilitating seamless integration of Conflux-format and Ethereum-format transactions within one network.

- [**Accounts**](conflux-basics/accounts):
Learn about network accounts, capable of holding balances and initiating transactions.

- [**Core Space Addresses**](../core/learn/core-space-basics/addresses):
Understand how Conflux accounts are identified by addresses, with Core Space using a base32 encoding format.

- [**Transactions**](conflux-basics/transactions):
Explore the transactions – transfers and other actions that modify Conflux's state. Notably, this section also elucidates the unique aspects of the Conflux transaction lifecycle, distinct from Ethereum's model.

- [**Transactions(core space)**](../core/learn/core-space-basics/transaction_explain#differences-between-conflux-and-ethereum):
Understand the nuances differentiating Conflux Core Space transactions from Ethereum transactions.

- [**Gas**](conflux-basics/gas):
Learn about the gas mechanism in Conflux, which is utilized to compute transaction costs and incentivize network operations.

- [**Storage(core space)**](../core/learn/core-space-basics/storage):
Understand Conflux's Collateral for Storage (CFS) mechanism, the pricing method for using storage in Conflux **core space**, which is more fair and reasonable than Ethereum.

- [**Internal Contracts(core space)**](../core/learn/core-space-basics/internal-contracts/):
Conflux introduces several built-in internal contracts for better system maintenance and on-chain governance in core space: `AdminControl`, `SponsorWhitelistControl`, `Staking`, `ConfluxContext`, `PoSRegister`, and `ParamsControl`. This section provides a comprehensive look at the internal contracts in Conflux that provide foundational functionality for the network here.

## **Build with Conflux Network**

- [**Run a Node**](run-a-node/):
Familiarize yourself with the process of setting up and operating a Conflux node, becoming an integral part of the network.

- [**Getting Started with Core Space**](../core/tutorials/getting-started/):
Begin your journey in Conflux's Core space, understanding its fundamental concepts and operations.

- [**SDKs & Tools**](category/sdks-and-tools):
Access a suite of software development kits and tools tailored for seamless integration and development on Conflux core space.

- [**Sponsorship Tutorial**](../core/learn/core-space-basics/internal-contracts/sponsor-whitelist-control):
Discover Conflux’s gas sponsorship mechanism, which facilitates smart contract usage without gas costs, allowing sponsored contract executions even by new, zero-balance accounts.

- [**Core Space Network Endpoints**](../core/build/sdks-and-tools/conflux_rpcs) & [**eSpace Network Endpoints**](../espace/build/network-endpoints):
Find the list of network endpoints for both Conflux's Core Space and eSpace.

- [**Core Space JSON-RPC**](../core/build/json-rpc/) & [**eSpace JSON-RPC**](../espace/build/resources/json-rpc):
Learn about the JSON-RPC protocols in the Core Space or eSpace for remote procedures.

- [**EVM Compatibility**](../espace/build/evm-compatibility):
Learn about Conflux's compatibility with the Ethereum Virtual Machine (EVM), helping to deploy evm-compatible smart contracts and dapps to Conflux.

## One more thing

- [**Contributing**](CONTRIBUTING):
Learn how you can contribute to improving the Conflux Network documentation portal, sharing expertise, and collaborating with the community.
