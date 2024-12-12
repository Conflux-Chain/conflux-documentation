---
sidebar_position: 4
title: Oracles
displayed_sidebar: eSpaceSidebar
description: Oracles provide a bridge for off-chain data sources to be accessible within the blockchain, essential for smart contracts.
keywords:
  - Oracles
  - Contratos Inteligentes
  - Off-chain Data
  - Cadena de bloques
  - eSpace
  - Pyth
  - Witnet
  - Data Feeds
  - Ethereum
  - Decentralized Oracle
  - Market Data
  - Price Feeds
  - Chainlink
  - DeFi
  - EVM Compatible
  - Real-world Data
  - Oracle Integration
  - Blockchain Infrastructure
  - Smart Contract Security
  - Decentralized Applications
tags:
  - Oracles
  - Pyth
  - Witnet
---

Oracles are data feeds that enable smart contracts on the blockchain to access off-chain data sources. This functionality is crucial, as Ethereum-based smart contracts are inherently unable to access information stored outside the blockchain network by default. For further information, you can explore [Ethereum's Oracle documentation](https://ethereum.org/en/developers/docs/oracles/).

There are already oracle services available on Conflux eSpace.

## [Pyth](https://pyth.network/)

Pyth is a renowned oracle service in the industry, offering **Smarter Data for Smarter Contracts**. It ensures the security of your smart contracts by providing reliable, low-latency market data sourced from institutional-grade providers. Developers can build applications utilizing high-fidelity oracle feeds, specifically designed for mission-critical systems.

Pyth is already integrated in Conflux eSpace, you can use it directly. Check it's [documentation](https://docs.pyth.network/documentation/pythnet-price-feeds/evm#mainnets) for how to use it in your smart contracts.

## [Wit/Oracle](https://witnet.io/)

The **[Wit/Oracle](https://witnet.io)** is a public, permissionless, and fully decentralized _Proof-of-Stake_ blockchain that is powered by its own cryptocurrency, the _$WIT_ coin.

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

## FAQs

### Does chainlink support Conflux?

Currently Chainlink **is not integrated** in Conflux eSpace, we are working on it.
