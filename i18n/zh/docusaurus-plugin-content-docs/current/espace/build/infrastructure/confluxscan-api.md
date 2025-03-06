---
sidebar_position: 3
title: ConfluxScan API
displayed_sidebar: eSpaceSidebar
description: Conflux 网络的区块浏览器提供了一个 RESTful API，用于访问**聚合的**区块链数据。
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
  - 合约验证
  - ABI
  - Block Query
  - eSpace
  - Mainnet
  - Testnet
  - Rate Limits
  - API Key
  - Web3 Paywall
tags:
  - ConfluxScan
---

[ConfluxScan](https://evm.confluxscan.io/) 是 Conflux 网络的区块链浏览器，就像 Etherscan 对于以太坊一样。 它提供了 [**RESTful API**](https://evmapi.confluxscan.io/doc) ，供开发者查询**聚合的区块链数据**。 该 API 可以免费使用，并且与 [Etherscan API](https://etherscan.io/apis) 兼容。

## 使用场景

如果您想获取像这样的数据：

- 某个地址的交易历史
- 某个地址或合约拥有的 NFT
- 某个地址或合约拥有的 ERC20 代币
- 某个地址或合约的 ERC20 代币转账历史
- 验证合约的源代码，获取合约的 ABI
- 通过时间戳查询区块号

您可以使用 ConfluxScan API 来获取您想要的数据。 要查看完整的 API 端点列表，请参阅 [API swagger 文档](https://evmapi.confluxscan.io/doc)。

## API 端点

API 端点如下所示：

- 主网: `https://evmapi.confluxscan.io`
- 测试网： `https://evmapi-testnet.confluxscan.io`

请在 [swagger 文档](https://evmapi.confluxscan.io/doc) 中查看 API 的速率限制。

## API Key

如果免费配额不足以满足您的使用需求，您可以通过向 [bd@confluxnetwork.org](mailto:bd@confluxnetwork.org) 发送电子邮件申请或通过 [Web3 Paywall](../../../general/build/tools/web3paywall) 购买 API 密钥。