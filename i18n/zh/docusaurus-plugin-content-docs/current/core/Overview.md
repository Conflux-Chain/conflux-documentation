---
sidebar_position: 1
title: 概览
displayed_sidebar: coreSidebar
keywords:
  - Core Space
  - 树图
  - 智能合约
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
  - 常见问题解答
---

Conflux Core Space 是 Conflux 网络的原生空间。 得益于 Conflux 创新的树图账本结构以及共识算法，Core Space 在不牺牲去中心化的前提下拥有远超比特币和以太坊的性能。 这为 Conflux 生态系统的发展提供了有力支持。

Core Space 是一个由 EVM 发展而来的智能合约平台。 可以使用 **Solidity** 进行智能合约的开发，并在此基础上进行了众多优化和改进。 这包括合约管理机制和**交易费用代付机制**。 除此之外，Core Space 还引入了几个内置合约，以实现诸如 **PoS 质押**、**跨空间通信**和**链上治理**等功能。

Core Space 中的账户地址使用 **base32编码**，与以太坊不同。 它还提供了一套**独有的 JSON-RPC 接口**。 因此，与 Conflux Core Space 的交互需要使用**专有**钱包（如 Fluent）和 SDK（如 js-conflux-sdk）。

## 快速入门

- [用户指南](./getting-started/)
- [开发者快速入门](./core-developer-quickstart)
- [以太坊开发者快速入门](./build/quickstart-for-eth-devs)

## Tutorials

- [JS SDK 完整指南](./tutorials/js-conflux-sdk)
- [hardhat-conflux 教程](./tutorials/hardhat-conflux-plugin)
- [chainIDE 教程](./tutorials/chainide)
- [合约代付教程](./tutorials/how-to-sponsor-contract)
- [NFT 教程](./tutorials/nft-tutorial)

## Technical Details

1. [Base32 地址](./core-space-basics/addresses)
2. [账户状态](./core-space-basics/accounts)
3. [交易说明](./core-space-basics/transactions/overview.md)
4. [存储抵押介绍](./core-space-basics/storage)
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
