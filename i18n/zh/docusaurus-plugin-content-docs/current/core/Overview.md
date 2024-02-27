---
sidebar_position: 1
title: 概览
displayed_sidebar: coreSidebar
---

Conflux Core Space 是 Conflux 网络的原生空间。 得益于 Conflux 创新的树图账本结构以及共识算法，Core Space 在不牺牲去中心化的前提下拥有远超比特币和以太坊的性能。 这为 Conflux 生态系统的发展提供了有力支持。

Core Space 是一个由 EVM 发展而来的智能合约平台。 可以使用 **Solidity** 进行智能合约的开发，并在此基础上进行了众多优化和改进。 These include the contract administration mechanism and the **transaction fee sponsorship mechanism**. 除此之外，Core Space 还引入了几个内置合约，以实现诸如 **PoS 质押**、**跨空间通信**和**链上治理**等功能。

Core Space 中的账户地址使用 **base32编码**，与以太坊不同。 它还提供了一套**独有的 JSON-RPC 接口**。 因此，与 Conflux Core Space 的交互需要使用**专有**钱包（如 Fluent）和 SDK（如 js-conflux-sdk）。

## 快速入门

- [User Guides](./getting-started/)
- [Developer QuickStart](./core-developer-quickstart)
- [QuickStart for Ethereum Developers](./build/quickstart-for-eth-devs)

## 教程

- [JS SDK 完整指南](./tutorials/js-conflux-sdk)
- [hardhat-conflux 教程](./tutorials/hard-conflux-plugin)
- [chainIDE 教程](./tutorials/chainide)
- [合约代付教程](./tutorials/how-to-sponsor-contract)
- [NFT 教程](./tutorials/nft-tutorial)

## 技术细节

1. [Base32 地址](./core-space-basics/addses)
2. [账户状态](./core-space-basics/account)
3. [Transaction explain](./core-space-basics/transactions/overview.md)
4. [Storage Collateral Intro](./core-space-basics/storage)
5. [虚拟机与 EVM 的差异](./core-space-basics/vm-difference)
6. [内置合约相关解释](./core-space-basics/internal-contracts/)
7. [代付机制](./core-space-basics/sponsor-mechanism)

## 其他资源

1. [测试网水龙头](https://faucet.confluxnetwork.org/)
2. [如何运行节点](../general/run-a-node/Overview)
3. [Core Space SDKs: js, go, python, java](./build/sdks-and-tools/sdks.md)

## 参考资料

1. [网络 JSON-RPC 端点](./core-endpoints.md)
2. [JSON-RPC API](./build/json-rpc/)
3. [内置合约 API ](./core-space-basics/internal-contracts/)

## 常见问题解答

1. [常见问题解答](./FAQs.md)
