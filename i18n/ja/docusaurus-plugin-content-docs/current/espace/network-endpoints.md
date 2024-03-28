---
sidebar_position: 5
title: Network RPC Endpoints
description: Conflux eSpace RPC endpoints
displayed_sidebar: eSpaceSidebar
---

## Public RPC Endpoints

Confura, a public RPC service offered by the Conflux Foundation, is available for free use. However, to maintain the service's usability, there are rate limits in place for the free tier. For access to a higher tier of RPC service, you can make a purchase through the [Web3 Paywall](../general/build/tools/web3paywall.md), or you can apply directly to the Conflux Foundation by emailing [bd@confluxnetwork.org](mailto:bd@confluxnetwork.org).

### Hong Kong

| Network             | Chain ID     | RPC Endpoint URL                                                                                    | Explorer                           |
| ------------------- | ------------ | --------------------------------------------------------------------------------------------------- | ---------------------------------- |
| [Mainnet](#mainnet) | 1030 (0x406) | *HTTP*: https://evm.confluxrpc.com<br/> *Websocket*: wss://evm.confluxrpc.com/ws              | https://evm.confluxscan.net        |
| [Testnet](#testnet) | 71 (0x47)    | *HTTP*: https://evmtestnet.confluxrpc.com<br/>*Websocket*: wss://evmtestnet.confluxrpc.com/ws | https://evmtestnet.confluxscan.net |

### US East

| Network             | Chain ID     | RPC Endpoint URL                                                                            | Explorer                          |
| ------------------- | ------------ | ------------------------------------------------------------------------------------------- | --------------------------------- |
| [Mainnet](#mainnet) | 1030 (0x406) | *HTTP*: https://evm.confluxrpc.org<br/>*Websocket*: wss://evm.confluxrpc.org/ws       | https://evm.confluxscan.io        |
| [Testnet](#testnet) | 71 (0x47)    | https://evmtestnet.confluxrpc.org<br/>*Websocket*: wss://evmtestnet.confluxrpc.org/ws | https://evmtestnet.confluxscan.io |

### Rate Limits

Reference for various fee tiers and their rate limits.

| Fee Tier   | Price                                | Rate Limits                                 | Buy Links                                                                                                                                                                                                                                    |
| ---------- | ------------------------------------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Free       | $0                                   | 50 calls/second, up to  100,000 calls/day   | -                                                                                                                                                                                                                                            |
| Standard   | $150/mo                              | 100 calls/second, up to 1,000,000 calls/day | [mainnet](https://confluxhub.io/payment/consumer/app/subscription/0x33A9451ee070d750a077C93f71D2cFcD0180Fa7D) <br/> [testnet](https://test.confluxhub.io/payment/consumer/app/subscription/0x4805C5B2741088B8458ed781083eA8940186E477) |
| Enterprise | please inquire bd@confluxnetwork.org | customize on demand                         | -                                                                                                                                                                                                                                            |

**Notes**
- Maximum result-set size is 10,000 for `getLogs` call;
- Old archived event logs may be inaccessible due to data prune;
- Append your api key(get from [Web3 Paywall](../general/build/tools/web3paywall.md) or Conflux Foundation) to the endpoint for privileged access (eg., `https://evm.confluxrpc.com/<mainnet-api-key>` or for testnet, `https://evmtestnet.confluxrpc.org/<testnet-api-key>`);
- Rate limits are also imposed per RPC method, please check the following specification for more details.

<details>
<summary>Rate Limit Specification</summary>

| RPC Method          | Free tier                                | Standard Tier                                 | Comment                                                                                   |
| ------------------- | ---------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------- |
| all                 | QPS < 50; <br/> daily total < 100k | QPS < 100; <br/> daily total < 1million | overall RPC requests                                                                      |
| eth_getLogs         | QPS < 5                                  | QPS < 20                                      | -                                                                                         |
| eth_call            | QPS < 5                                  | QPS < 50                                      | -                                                                                         |
| eth_getBlockBy*     | QPS < 5                                  | QPS < 20                                      | includes: <br/> `eth_getBlockByHash`, <br/>`eth_getBlockByNumber`             |
| eth_getTransaction* | QPS < 5                                  | QPS < 20                                      | includes: <br/> `eth_getTransactionByHash`, <br/> `eth_getTransactionReceipt` |
| debug RPC           | not supported                            | QPS < 20                                      | includes: <br/> `parity_getBlockReceipts` etc.                                      |
| trace RPC           | not supported                            | QPS < 20                                      | includes: <br/> `trace_block`, `trace_filter`, `trace_transaction`                  |
| filter API          | not supported                            | supported                                     | includes: <br/> `eth_newFilter`, `eth_getFilterChanges` etc.                        |

</details>

import ConfuraError from '../templates/confura-error.md'

<details>
<summary>Confura Common Errors</summary>
<ConfuraError basicUnitName="block" /> </details>

## Commercial RPC Service

There are couple of commercial RPC service providers, you can check them [here](./build/infrastructure/RPC-Provider.md)

## FAQs

### How to get a Confura advanced API key?

Confura is a public RPC service provided by Conflux Foundation, it is free to use. For using the free tier, you don't need an API key. To get a higher tier RPC service, you can buy it at [Web3 Paywall](../general/build/tools/web3paywall.md) or apply from Conflux foundation by sending email to [bd@confluxnetwork.org](mailto:bd@confluxnetwork.org).
