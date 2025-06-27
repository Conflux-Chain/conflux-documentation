---
sidebar_position: 4
title: 预言机
displayed_sidebar: eSpaceSidebar
description: 预言机为链下数据源提供了一个桥梁，使其能够在区块链内被访问，对于智能合约来说是必不可少的。
keywords:
  - 预言机
  - 智能合约
  - Off-chain Data
  - 区块链
  - eSpace
  - Pyth
  - Witnet
  - Data Feeds
  - 以太坊
  - Decentralized Oracle
  - Market Data
  - Price Feeds
  - Chainlink
  - DeFi
  - EVM Compatible
  - Real-world Data
  - Oracle Integration
  - Blockchain Infrastructure
  - 智能合约安全
  - Decentralized Applications
tags: [ 预言机, Pyth, Witnet ]
---

预言机是一种数据提供服务，使得区块链上的智能合约能够访问链下数据源。 这一功能至关重要，因为基于以太坊的智能合约，默认情况下无法访问存储在区块链网络之外的信息。 想要了解更多信息，您可以查阅[以太坊的预言机文档](https://ethereum.org/en/developers/docs/oracles/)。

Conflux eSpace 上已经有可用的预言机服务。

## [Pyth](https://pyth.network/)

Pyth 是业内知名的预言机服务，提供**更智能的数据用于更智能的合约**。 通过提供来自机构级供应商的可靠、低延迟市场数据，确保您智能合约的安全性。 开发者可以利用高保真度的预言机数据源构建应用程序，这些数据源专为关键任务系统设计。

Pyth 已经集成在 Conflux eSpace 中，您可以直接使用。 请查看其[文档](https://docs.pyth.network/documentation/pythnet-price-feeds/evm#mainnets)了解如何在智能合约中使用它。

## [Wit/Oracle](https://witnet.io/)

**[Wit/Oracle](https://witnet.io)** 是一个公开的、无需许可的、完全去中心化的 _权益证明（Proof-of-Stake）_ 区块链，由其原生加密货币 _$WIT_ 代币驱动。

通过_**Wit/Oracle桥接框架**_（由[_Witnet基金会_](https://witnet.foundation)部署的已验证且具备反事实特性的智能合约组），任何可通过HTTP/GET、HTTP/POST或HTTP/HEAD请求在互联网公开获取的数据，均可被验证和聚合后直接写入智能合约，确保与数据源完全一致。

为您的智能合约提供最通用、无缝且值得信赖的预言机解决方案：

- **多功能性**
  - 支持获取各类数据，不限于价格信息。
  - 构建您自己的自定义和参数化数据源。
  - 可依赖互联网上任意公共数据源与API的组合
  - 获取完全不可预测且无偏的随机数
  - 通过CCDR实现多链合约互连 (_跨链数据请求_)
- **无缝衔接**
  - 支持从智能合约直接获取数据更新
  - 支持使用原生 _$CFX_ 代币向预言机支付查询费用
  - 无需通过第三方ERC-20代币预存合约资金
  - 无需进行链下订阅，也无需完成 KYC 流程。
  - 无需自行维护节点或其他基础设施组件
- **可信可靠**
  - 通过依赖多个数据源来提高数据可靠性。
  - 可根据安全需求配置见证委员会规模
  - 每次数据更新时随机选取见证委员会成员
  - 对数据源、链下计算与采样时间戳执行形式化验证

请参阅[立即开始构建](https://medium.com/witnet/solidity-and-the-wit-oracle-852bc4b338c1)，获取Witnet Solidity工具包与合约框架介绍，以及构建和获取自定义数据源的教程指南 .

## 常见问题解答

### Chainlink 支持 Conflux 吗？

目前 Chainlink 还**没有集成**在 Conflux eSpace 中，我们正在努力。
