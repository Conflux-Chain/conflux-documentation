---
sidebar_position: 7
title: 空间（Spaces）
displayed_sidebar: generalSidebar
---

## **Spaces介绍**

在Conflux v2.0（Hydra）升级中，通过**[CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md)**引入了一种名为“Spaces”的新特性。 Spaces是一个抽象概念，用于区分Conflux格式的交易和以太坊格式的交易。 Spaces是一种在原始Conflux网络上虚拟创建子链的方式，称为**`eSpace`**。

Core Space指的是原始Conflux网络，而eSpace指的是在Core Space网络之上运行的虚拟化以太坊链。 两个空间在逻辑上是相互独立的，不会相互影响。

换句话说，我们可以把空间看作是操作系统概念中的虚拟化技术，其中eSpace是一个虚拟化的以太坊链，在原始Conflux网络之上运行。

## **为什么要引入eSpace？**

Conflux是一个高性能、完全去中心化的公链，它采用了一种创新的树图共识算法。 Conflux的交易费用非常低，相比于其他网络如以太坊，可以看作是几乎免费的。 然而，以太坊已经建立了一个成熟的生态系统，包括工具、SDK、钱包和Solidity库。 为了降低项目和用户的迁移成本，让用户体验到Conflux低费用和高TPS的优势，eSpace被引入。

通过完全兼容的接口，以太坊的智能合约和dApps可以直接部署到eSpace，无需任何修改。 以太坊的开发工具、SDK、钱包和服务可以直接在eSpace中使用。 用户无需学习新知识，就可以使用原有的工具直接上手。

eSpace对于以太坊的开发者和用户来说非常容易使用，就像BSC、Polygon、Aurora一样。

## **两个空间之间的关系**

Core Space和eSpace是两个逻辑上独立的空间，它们有自己的交易、账户状态和合约。 它们共享同一个账本（链）作为底层数据存储。 一个区块可能包含来自两个空间的交易，当交易被执行时，它们只根据交易类型进行区分。 每个space只会影响自己space内的账户状态。

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
