---
sidebar_position: 5
title: Network RPC Endpoints
description: Conflux eSpace RPC endpoints
keywords:
  - network endpoints
  - Conflux eSpace
  - RPC
  - JSON-RPC
  - Mainnet
  - Testnet
  - Chain ID
  - HTTP endpoints
  - WebSocket endpoints
  - Confura
  - Rate limits
  - API key
  - Web3 Paywall
  - Commercial RPC service
  - Blockchain explorer
  - EVM compatibility
  - Web3 development
  - dApp infrastructure
  - Blockchain node
  - Public RPC service
  - Enterprise solutions
displayed_sidebar: eSpaceSidebar
tags: [Network Endpoints]
---

:::tip

This page lists the public RPC endpoints for Conflux eSpace. Public RPC endpoints for **Conflux Core Space** is provided [here](../core/core-endpoints.md).

:::

## Confura

Confura, a public RPC service offered by the Conflux Foundation, is available for free use.

### Public Endpoints

Confura provides several available RPC endpoints for the mainnet and testnet. We have sorted them by selected priority and provided brief descriptions. If you are unsure which one to choose, please select an RPC endpoint near the top of the list.

#### Mainnet

Chain ID for Conflux eSpace Mainnet is `1030(0x406)`. The corresponding blockchain explorer URL is https://evm.confluxscan.org.

| RPC Endpoint | Type | Notes |
| -------- | -------- | -------- |
| https://evm.confluxrpc.com | HTTP |
| https://evmmain-china.confluxrpc.com | HTTP | RPC Service for China Users |
| https://evmmain-global.confluxrpc.com | HTTP | RPC Service for Global Users |
| https://evm.confluxrpc.org | HTTP | Backup RPC Service |
| wss://evm.confluxrpc.com/ws | Websocket |
| wss://evm.confluxrpc.org/ws | Websocket | Backup RPC Service |

#### Testnet

Chain ID for Conflux eSpace Mainnet is `71(0x47)`. The corresponding blockchain explorer URL is https://evmtestnet.confluxscan.org.

| RPC Endpoint | Type | Notes |
| -------- | --- | --- |
| https://evmtestnet.confluxrpc.com | HTTP ||
| https://evmtest.confluxrpc.com | HTTP ||
| https://evmtestnet.confluxrpc.org | HTTP | Backup RPC Service |
| wss://evmtestnet.confluxrpc.com/ws | Websocket ||
| wss://evmtestnet.confluxrpc.org/ws | Websocket ||

### Rate Limits

To maintain the service's usability, there are rate limits in place for the free tier. For access to a higher tier of RPC service, you can make a purchase through the [Web3 Paywall](../general/build/tools/web3paywall.md), or you can apply directly to the Conflux Foundation by emailing [bd@confluxnetwork.org](mailto:bd@confluxnetwork.org).

Here are references for various fee tiers and their rate limits.

| Fee Tier | Price | Rate Limits | Buy Links |
|--|--|--|--|
| Free | $0 | 50 calls/second, up to  100,000 calls/day | - |
| Standard | $150/mo | 100 calls/second, up to 1,000,000 calls/day | [mainnet](https://confluxhub.io/payment/consumer/app/subscription/0x33A9451ee070d750a077C93f71D2cFcD0180Fa7D) <br/> [testnet](https://test.confluxhub.io/payment/consumer/app/subscription/0x4805C5B2741088B8458ed781083eA8940186E477) |
| Enterprise | please inquire bd@confluxnetwork.org | customize on demand | - |

**Notes** 
- Maximum result-set size is 10,000 for `getLogs` call;
- Old archived event logs may be inaccessible due to data prune;
- Append your api key(get from [Web3 Paywall](../general/build/tools/web3paywall.md) or Conflux Foundation) to the endpoint for privileged access (eg., `https://evm.confluxrpc.com/<mainnet-api-key>` or for testnet, `https://evmtestnet.confluxrpc.org/<testnet-api-key>`);
- Rate limits are also imposed per RPC method, please check the following specification for more details.

<details>
<summary>Rate Limit Specification</summary>

| RPC Method | Free tier | Standard Tier | Comment |
| -------- | -------- | --------| -------- |
| all | QPS < 50; <br/> daily total < 100k | QPS < 100; <br/> daily total < 1million | overall RPC requests |
| eth_getLogs | QPS < 5 | QPS < 20 | - |
| eth_call | QPS < 5 | QPS < 50 | - |
| eth_getBlockBy* | QPS < 5 | QPS < 20 | includes: <br/> `eth_getBlockByHash`, <br/>`eth_getBlockByNumber` |
| eth_getTransaction* | QPS < 5 | QPS < 20 | includes: <br/> `eth_getTransactionByHash`, <br/> `eth_getTransactionReceipt` |
| debug RPC | not supported | QPS < 20 | includes: <br/> `parity_getBlockReceipts` etc. |
| trace RPC | not supported | QPS < 20 | includes: <br/> `trace_block`, `trace_filter`, `trace_transaction` |
| filter API | not supported | supported | includes: <br/> `eth_newFilter`, `eth_getFilterChanges` etc. |

</details>

import ConfuraError from '../templates/confura-error.md'

<details>
<summary>Confura Common Errors</summary>
<ConfuraError basicUnitName="block" />
</details>

## Commercial RPC Service

There are couple of commercial RPC service providers, you can check them [here](./build/infrastructure/RPC-Provider.md)

## FAQs

### How to get a Confura advanced API key?

Confura is a public RPC service provided by Conflux Foundation, it is free to use. For using the free tier, you don't need an API key. To get a higher tier RPC service, you can buy it at [Web3 Paywall](../general/build/tools/web3paywall.md) or apply from Conflux foundation by sending email to [bd@confluxnetwork.org](mailto:bd@confluxnetwork.org).
