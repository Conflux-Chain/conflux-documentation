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
tags:
  - 预言机
  - Pyth
  - Witnet
---

预言机是一种数据提供服务，使得区块链上的智能合约能够访问链下数据源。 这一功能至关重要，因为基于以太坊的智能合约，默认情况下无法访问存储在区块链网络之外的信息。 想要了解更多信息，您可以查阅[以太坊的预言机文档](https://ethereum.org/en/developers/docs/oracles/)。

Conflux eSpace 上已经有可用的预言机服务。

## [Pyth](https://pyth.network/)

Pyth 是业内知名的预言机服务，提供**更智能的数据用于更智能的合约**。 通过提供来自机构级供应商的可靠、低延迟市场数据，确保您智能合约的安全性。 开发者可以利用高保真度的预言机数据源构建应用程序，这些数据源专为关键任务系统设计。

Pyth 已经集成在 Conflux eSpace 中，您可以直接使用。 请查看其[文档](https://docs.pyth.network/documentation/pythnet-price-feeds/evm#mainnets)了解如何在智能合约中使用它。

## [Wit/Oracle](https://witnet.io/)

**[Wit/Oracle](https://witnet.io)** 是一个公开的、无需许可的、完全去中心化的 _权益证明（Proof-of-Stake）_ 区块链，由其原生加密货币 _$WIT_ 代币驱动。

By means of the _**Wit/Oracle Bridging Framework**_ (a set of verified and counter-factual smart contracts deployed by the [_Witnet Foundation_](https://witnet.foundation)), all data that is publicly accessible on the Internet using HTTP/GET, HTTP/POST or even HTTP/HEAD requests, can be attested, aggregated and brought right into your smart contracts, truthful to the data sources being referred.

The most versatile, seamless and trustworthy oracle solution for your smart contracts:

- **Versatile**
  - Access to data of any type, not just price feeds.
  - Build your own custom and parameterized data feeds.
  - Rely on any combination of public sources and APIs on the Internet.
  - Fetch fully unpredictable and unbiased randomness.
  - Link contracts across multiple chains via CCDRs (_i.e. Cross Chain Data Requests_).
- **Seamless**
  - Pull data updates straight from your smart contracts.
  - Pay queries to the Wit/Oracle in plain _$CFX_ currency.
  - No need to pre-fund your contracts with third-party ERC-20 tokens.
  - No need to undergo off-chain subscriptions, nor KYC workflows.
  - No need to run your own nodes, nor any other sort of infrastructure.
- **Trustworthy**
  - Improve data reliability by relying on multiple data sources.
  - Settle the size of witnessing committees depending on your security concerns.
  - Witnessing committee members get randomnly selected upon every data update.
  - Formally verify data sources, off-chain computations and sampling timestamps.

You can check [start building now](https://medium.com/witnet/solidity-and-the-wit-oracle-852bc4b338c1) for the introduction of the Witnet solidity package and contracts framework as well as the tutorial of how to build and pull your own custom data feeds. .

## 常见问题解答

### Chainlink 支持 Conflux 吗？

目前 Chainlink 还**没有集成**在 Conflux eSpace 中，我们正在努力。
