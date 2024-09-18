---
sidebar_position: 5
title: Ethereum 开发者的快速入门
displayed_sidebar: coreSidebar
---

Conflux Core Space 是一个基于创新树图账本结构的区块链协议。 它与虚拟机和以太坊虚拟机兼容，而它的其核心概念（账户，交易，智能合约等） 与以太坊相似。 如果你是一个以太坊的开发者，你可以很快上手Conflux Core Space开发。 这篇文章将指导以太坊开发者们如何迅速上手Conflux Core Space的开发。

如果您不熟悉以太坊的开发，强烈建议先学习以太坊开发，因为它有丰富的文档、全面的开发工具和社区支持。 这篇文章不会涵盖有关以太坊开发的基础知识。

## Conflux Core Space和以太坊的区别

不同于以太坊，Conflux的基础账本结构是一个树图。 建议先了解 [Conflux 的树图账本结构](/docs/general/conflux-basics/consensus-mechanisms/proof-of-work/tree-graph)。 这将涉及新的概念，例如 [Epoch](/docs/general/conflux-basics/glossary#epoch)。

Conflux Core Space有两种类似于以太坊的账户：外部账户和合约账户。 然而，Conflux Core Space中的账户地址是不同的，有不同的生成方法和编码规则。 详见[Conflux Core 地址](/docs/core/core-space-basics/address)。 如果你不想深入了解太多，你可以直接使用Fluent Wallet或Core Space SDK来获取地址。

由于地址和账本结构不同，Conflux Core Space的RPC(远程过程调用)接口也有一些区别。 详见[Conflux Core RPC](/docs/core/build/json-rpc/cfx-namespace)。 总之，Conflux Core Space的核心RPC方法与以太坊相似，唯一的变化是从`eth_`到`cfx_`前缀。 此外，在参数和返回结构方面也有一些新的方法和小差别。

Conflux Core Space的交易结构与以太坊的155类交易几乎相同，包括核心交易信息和Gas费。 然而，Conflux Core Space的交易结构也包括一些额外的内容。 详见[Conflux Core Transactions](/docs/core/core-space-basics/transactions/overview)和 [Transaction Comparison](/docs/core/core-space-basics/transactions/faqs#whats-the-differences-between-ethereum-155-transaction-and-core-space-transaction)。

Conflux Core Space的虚拟机基本可以完全兼容以太坊虚拟机，这意味着绝大多数以太坊智能合约都可以在 Conflux Core Space上直接部署并运行。 热门的Solidity库(例如OpenZeppelin)和工具也可以被直接使用，只是在合约地址计算规则和 1820 合约地址上有一些细微差别。 详见[VM difference](/docs/core/core-space-basics/vm-difference)。

## Conflux Core Space的创新

作为下一代区块链协议，Conflux Core Space 引入了一些创新功能，例如：

1. 除了交易燃料费用，它提出了更合理的存储费用方案。 可以在[存储费用](/docs/core/core-space-basics/storage)中找到更多详细内容，其中存储费用以抵押品的形式出现，存储释放后可退还。

2. 最重大的创新是交易费用[代付机制](/docs/core/core-space-basics/sponsor-mechanism)的实施。 该机制允许合约得到代付，意味着被代付的合约在互动时不需要用户支付燃料费；相反，代付方承担费用。 这种机制显著降低了用户的入门门槛，并允许合约开发者在设计合约时更加灵活。

此外，Conflux Core Space 提供了几个内置合约，用于治理、代付、跨Space功能等。 详见[内置合约](https://doc.confluxnetwork.org/docs/core/core-space-basics/internal-contracts/) 。

## 快速入门

以太坊开发者可以通过以下步骤快速开始 Conflux Core Space 开发：

1. 您可以安装 Fluent 钱包，这是 Conflux Core Space 的官方钱包，支持其所有功能。 参见 [Fluent 钱包](https://fluentwallet.com/)。

2. 切换网络到测试网，并通过 Core Space 水龙头领取测试 CFX。 参考 [水龙头](https://faucet.confluxnetwork.org/)。

3. 快速熟悉 Conflux Core Space 的 [js-conflux-sdk](/docs/core/core-developer-quickstart)，一个类似于 web3.js 或 ethers.js 的 SDK，但使用上有一些差异。

4. 使用 Hardhat 并使用 [hardhat-conflux](/docs/core/tutorials/hardhat-conflux-plugin) 插件进行合约开发。 合约开发体验与以太坊相同，部署和交互脚本使用 js-conflux-sdk 编写。

5. 对于后端服务，使用[其他语言的 SDK](/docs/core/build/sdks-and-tools/sdks)，包括 Golang、Python、Java 等。

## 迁移以太坊 Dapps 到 Conflux Core Space

如果您已经有了以太坊Dapp并想要将其迁移到Conflux Core Space，遵循这些步骤：

1. 部署合约(通常不需要修改合约代码)到Conflux Core Space，使用Hardhat与Hardhat-conflux插件或直接使用 js-conflux-sdk。

2. 用 js-conflux-sdk 替换Dapp前端代码中的以太坊 SDK，并将钱包切换到 Fluent 钱包。

## 其他资源

- [官方的公开RPC 端点](/docs/core/conflux_rpcs)
- [区块链浏览器](https://confluxscan.io/)
- [如何为合约提供代付](/docs/core/tutorials/how-to-sponsor-contract)
- [常见问题](/docs/core/FAQs)
