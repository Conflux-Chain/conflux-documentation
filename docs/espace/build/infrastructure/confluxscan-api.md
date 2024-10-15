---
sidebar_position: 3
title: ConfluxScan API
displayed_sidebar: eSpaceSidebar
description: The block explorer for the Conflux network providing a RESTful API for accessing **aggregated** blockchain data.
keywords:
  - ConfluxScan
  - API
  - Block Explorer
  - RESTful
  - Blockchain Data
  - Etherscan Compatible
  - Transaction History
  - NFT Data
  - ERC20 Tokens
  - Contract Verification
  - ABI
  - Block Query
  - eSpace
  - Mainnet
  - Testnet
  - Rate Limits
  - API Key
  - Web3 Paywall
tags: [ConfluxScan]

---

[ConfluxScan](https://evm.confluxscan.io/) is a block explorer for the Conflux network, just like Etherscan for Ethereum. It provides a [**RESTful API**](https://evmapi.confluxscan.io/doc) for developers to query **aggregated blockchain data**. The API is free to use and compatible with the [Etherscan API](https://etherscan.io/apis).

## Usage Scenarios

If you want get data like these:

* The transaction history of an address
* The NFTs owned by an address or a contract
* The ERC20 tokens owned by an address or a contract
* The ERC20 token transfer history of an address or a contract
* Verify the source code of a contract, get the ABI of a contract
* Query block number by timestamp

Then you can use the ConfluxScan API to get the data you want. For a complete list of API endpoints, see [API swagger doc](https://evmapi.confluxscan.io/doc).

## API Endpoints

The API endpoints are listed below:

* Mainnet: `https://evmapi.confluxscan.io`
* Testnet: `https://evmapi-testnet.confluxscan.io`

Check API's rate limit, notes in it's [swagger doc](https://evmapi.confluxscan.io/doc).

## API Key

If the free quota is not enough for your usage, you can apply for an API key by contact us via email at [bd@confluxnetwork.org](mailto:bd@confluxnetwork.org) or make a purchase through the [Web3 Paywall](../../../general/build/tools/web3paywall)