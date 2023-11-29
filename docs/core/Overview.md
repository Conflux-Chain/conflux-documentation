---
sidebar_position: 1
title: Overview
displayed_sidebar: coreSidebar
---

Conflux Core Space 是 Conflux 网络的原生空间. 得益于 Conflux 创新性的树图账本结构和共识算法, Core Space 在不牺牲去中心化的前提下, 实现了远超比特币和以太坊的性能. 从而为 Conflux 生态的发展提供了强有力的支撑.

Core Space 是一个智能合约平台, 脱胎于 EVM, 智能合约可使用 **Solidity** 开发, 并在其基础之上进行了大量的优化和改进, 包括合约的管理员机制, 以及**燃气费赞助机制**等. 除此之外 Core Space 还引入了多个内置合约, 以实现 **PoS 质押**, **跨 Space 通信**, **链上治理**等功能.

Core Space 的账户地址格式为 **base32 编码格式**, 与以太坊地址不同, 并且提供一套**独有的 JSON-RPC 接口**. 因此同 Conflux Core Space 交互, 需要使用**专有**的钱包(Fluent) 和 SDK(js-conflux-sdk等).

## Quick Start

* [User Guide](./getting-started/)
* [Developer Quickstart](./tutorials/core-developer-quickstart)

## Tutorials

* [JS SDK Complete Guide](./tutorials/js-conflux-sdk)
* hardhat-conflux Tutorial
* chainIDE Tutorial
* Contract Sponsor Tutorial
* NFT Tutorial

## Technical Details

1. Base32 Address
2. Account State
3. Transaction
4. Gas & Storage Collateral
5. VM Differences with EVM
6. Internal Contract explanation
7. Sponsor mechanism

## Resources

1. Testnet Faucet
2. How to run a node
3. Core Space SDKs: js, go, python, java

## References

1. Network JSON-RPC endpoints
2. JSON-RPC APIs
3. Internal Contract APIs

## FAQs
