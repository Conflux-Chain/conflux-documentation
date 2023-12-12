---
sidebar_position: 7
title: Spaces
displayed_sidebar: generalSidebar
---

## **Introduction to Spaces**

In the Conflux v2.0 (Hydra) upgrade, a new feature called Spaces was introduced through **[CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md)**. Spaces is an abstract concept that is used to distinguish Conflux-format transactions from Ethereum-format transactions. Spaces is a way to virtually create a sub-chain of the original Conflux network, known as **`eSpace`**.

Core Space refers to the original Conflux network, while eSpace is the virtualized Ethereum chain running on top of the Core Space network. The two spaces are logically independent of each other and do not affect each other.

In other words, we can think of Spaces as a virtualization technology from operating system concepts, where eSpace is a virtualized Ethereum chain running on the original Conflux network.

## **Why Introduce eSpace?**

Conflux is a high-performance, fully decentralized public chain enabled by an innovative Tree-Graph consensus algorithm. The transaction fee of Conflux is very low, which can be seen as almost free compared to other networks such as Ethereum. However, Ethereum has already built a mature ecosystem, including tools, SDKs, wallets, and Solidity libraries. To reduce the migration cost of projects and users and make users experience the advantages of low fees and high TPS of Conflux, eSpace was introduced.

Through the fully compatible interface, smart contracts, and dApps of Ethereum can be directly deployed to eSpace without any modification. Development tools, SDKs, wallets, and services of Ethereum can be directly used in eSpace. Users do not need to learn new knowledge but can use the original tools to get started directly.

eSpace is very easy to use for Ethereum developers and users, just like BSC, Polygon, Aurora.

## **The Relationship Between the Two Spaces**

Core Space and eSpace are two logically independent spaces with their own transactions, account status, and contracts. They share the same ledger (chain) for underlying data storage. A block may contain transactions from both Spaces, and they are only differentiated by the transaction type when transactions are executed. Each will only impact the account status in its own Space.

To interact with Core Space, use Conflux-compatible wallet (Fluent), SDK (*-conflux-SDK), and development tools (chainIDE, hardhat). To interact with eSpace directly, use the existing tools and products from the Ethereum ecosystem, such as Metamask, Hardhat, Ethers.js, etc. (by simply setting the RPC network of the tool to **[Conflux eSpace RPC](../../espace/network-endpoints.md)**.

## **How to Communicate Between Spaces**

To communicate between Conflux Core Space and eSpace, the [CrossSpaceCall](../../core/core-space-basics/internal-contracts/crossSpaceCall.md) contract can be used to transfer CFX and deploy contracts from Core Space to eSpace, as well as call eSpace contract methods in Core Space. Each account in Core Space has a corresponding [mirror address](../../espace/build/accounts.md#mapped-addresses-in-cross-space-operations) in eSpace, calculated by decoding the original Base32 address and hashing it with Keccak. The internal contract provides **synchronous** cross-space transfers of CFX, making it simple, safe, and fast. The built-in event system and On-chain Message Passing can also be used for communication between spaces.

## **Which To Choose**

Conflux Core Space is a native space that supports [contract sponsorship](../../core/core-space-basics/internal-contracts/sponsor-whitelist-control.md) and has more network capacity (higher TPS). However, its [address format](../../core/core-space-basics/addresses.md) and [RPC](../../core/build/json-rpc/cfx-namespace.md) is different from Ethereum, so developers is expected to adopt Conflux-specific [toolchains](../../core/build/sdks-and-tools/sdks.md) to develop. Therefore, if you want to develop a brand new project, you can choose the Core Space. The contract sponsorship mechanism makes it possible for project users to interact with the contract without a balance, helping to lower the threshold of blockchain usage and expand the user base. Moreover, this feature allows developers to develop public chain applications in compliance with regulations in countries or regions where digital currencies are strictly monitored.

If you want to deploy an Ethereum project to take advantage of Conflux's high performance and low cost in order to reduce user costs, you can choose eSpace. The project can be deployed directly without any modification. If you are a skilled Ethereum engineer, you can also choose eSpace directly and use the tools and SDKs that you are familiar with to get started quickly.

## Reference

- [CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md).
- [Espace RPC Compatibility](../../espace/build/jsonrpc-compatibility.md).
- [Espace EVM Compatibility](../../espace/build/evm-compatibility.md).
