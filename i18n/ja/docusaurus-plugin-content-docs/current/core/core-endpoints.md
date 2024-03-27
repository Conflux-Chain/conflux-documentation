---
id: conflux_rpcs
title: Network RPC Endpoints
sidebar_position: 4
keywords:
  - endpoints
displayed_sidebar: coreSidebar
---

Public available Conflux Core Space network RPC endpoints

## 1. Confura

Confura is an Ethereum Infura equivalent public JSON-RPC service on Conflux network, which is developed and maintained by Conflux foundation.

Our public RPC services are located in different regions globally. By utilizing geographic DNS routing, developers can request the regional RPC services which are physically closest to them.

### Public Endpoint

#### Hong Kong

| Network | Chain ID | Explorer                        | RPC Endpoint                                                                            |
| ------- | -------- | ------------------------------- | --------------------------------------------------------------------------------------- |
| Mainnet | 1029     | https://confluxscan.net         | *HTTP*: https://main.confluxrpc.com<br/>*Websocket*: wss://main.confluxrpc.com/ws |
| Testnet | 1        | https://testnet.confluxscan.net | *HTTP*: https://test.confluxrpc.com<br/>*Websocket*: wss://test.confluxrpc.com/ws |

#### US East

| Network | Chain ID | Explorer                       | RPC Endpoint                                                                            |
| ------- | -------- | ------------------------------ | --------------------------------------------------------------------------------------- |
| Mainnet | 1029     | https://confluxscan.io         | *HTTP*: https://main.confluxrpc.org<br/>*Websocket*: wss://main.confluxrpc.org/ws |
| Testnet | 1        | https://testnet.confluxscan.io | *HTTP*: https://test.confluxrpc.org<br/>*Websocket*: wss://test.confluxrpc.org/ws |

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
- Append your api key to the endpoint for privileged access (eg., `https://main.confluxrpc.com/<api-key>`);
- Rate limits are also imposed per RPC method, please check the following specification for more details.

<details>
<summary>Rate Limit Specification</summary>

| RPC Method          | Free tier                                | Standard Tier                                 | Comment                                                                                   |
| ------------------- | ---------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------- |
| all                 | QPS < 50; <br/> daily total < 100k | QPS < 100; <br/> daily total < 1million | overall RPC requests                                                                      |
| cfx_getLogs         | QPS < 5                                  | QPS < 20                                      | -                                                                                         |
| cfx_call            | QPS < 5                                  | QPS < 50                                      | -                                                                                         |
| cfx_getBlockBy*     | QPS < 5                                  | QPS < 20                                      | includes: <br/> `cfx_getBlockByHash`, <br/>`cfx_getBlockByEpochNumber`        |
| cfx_getTransaction* | QPS < 5                                  | QPS < 20                                      | includes: <br/> `cfx_getTransactionByHash`, <br/> `cfx_getTransactionReceipt` |
| debug RPC           | not supported                            | QPS < 20                                      | includes: <br/> `cfx_getEpochReceipts` etc.                                         |
| trace RPC           | not supported                            | QPS < 20                                      | includes: <br/> `trace_block`, `trace_filter`, `trace_transaction`                  |
| filter API          | not supported                            | supported                                     | includes: <br/> `cfx_newFilter`, `cfx_getFilterChanges` etc.                        |

</details>

import ConfuraError from '../templates/confura-error.md'

<details>
<summary>Confura Common Errors</summary>
<ConfuraError basicUnitName="epoch" /> </details>

## 2. Unifra

Unifra is a Web3 developer platform focused on simplifying blockchain development. It has built a suite of developer tools, enhanced APIs, and a superior node infrastructure to seamlessly build and run blockchain applications. Unifra provide API services for multiple chains including Ethereum, BNB Smart Chain, Polygon and Conflux.

Unifra provides:

- Open access to free public end-points
- Real-time webhook alerts via Notify
- Best-in-class support and reliability / stability
- Unifra's NFT API
- Dashboard with Request Explorer

To use Unifra's service, developer need to register an account first and find the RPC endpoint in [Unifra console](https://console.unifra.io/). For detail infomation check [Unifra's documentation](https://docs.unifra.io/)

### Public Endpoint

| Network | Chain ID | Explorer                | Endpoint                              |
| ------- | -------- | ----------------------- | ------------------------------------- |
| Mainnet | 1029     | https://confluxscan.net | https://conflux-core-public.unifra.io |
