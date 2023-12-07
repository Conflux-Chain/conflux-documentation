---
sidebar_position: 5
title: 网络 RPC 端点
description: Conflux eSpace RPC endpoints
displayed_sidebar: eSpaceSidebar
---

## 1. Confura

### 香港

| Network             | Chain ID     | RPC Endpoint URL                                                                                      | Explorer                             |
| ------------------- | ------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------ |
| [Mainnet](#mainnet) | 1030 (0x406) | *HTTP*: <https://evm.confluxrpc.com><br/> *Websocket*: wss://evm.confluxrpc.com/ws              | <https://evm.confluxscan.net>        |
| [Testnet](#testnet) | 71 (0x47)    | *HTTP*: <https://evmtestnet.confluxrpc.com><br/>*Websocket*: wss://evmtestnet.confluxrpc.com/ws | <https://evmtestnet.confluxscan.net> |

### US East

| Network             | Chain ID     | RPC Endpoint URL                                                                              | Explorer                            |
| ------------------- | ------------ | --------------------------------------------------------------------------------------------- | ----------------------------------- |
| [Mainnet](#mainnet) | 1030 (0x406) | *HTTP*: <https://evm.confluxrpc.org><br/>*Websocket*: wss://evm.confluxrpc.org/ws       | <https://evm.confluxscan.io>        |
| [Testnet](#testnet) | 71 (0x47)    | <https://evmtestnet.confluxrpc.org><br/>*Websocket*: wss://evmtestnet.confluxrpc.org/ws | <https://evmtestnet.confluxscan.io> |

### 速率限制

Reference for various fee tiers and their rate limits.

| Fee Tier   | Price                                | 速率限制                                        | Buy Links                                                                                                                                                                                                                                    |
| ---------- | ------------------------------------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Free       | $0                                   | 50 calls/second, up to  100,000 calls/day   | -                                                                                                                                                                                                                                            |
| Standard   | $150/mo                              | 100 calls/second, up to 1,000,000 calls/day | [mainnet](https://confluxhub.io/payment/consumer/app/subscription/0x33A9451ee070d750a077C93f71D2cFcD0180Fa7D) <br/> [testnet](https://test.confluxhub.io/payment/consumer/app/subscription/0x4805C5B2741088B8458ed781083eA8940186E477) |
| Enterprise | please inquire bd@confluxnetwork.org | customize on demand                         | -                                                                                                                                                                                                                                            |

**Notes**
- `getLogs`调用的结果集最大大小为10,000。
- 由于数据裁剪，旧的存档事件日志可能无法访问。
- Append your api key to the endpoint for privileged access (eg., `https://evm.confluxrpc.com/<api-key>`);
- 每个RPC方法也有速率限制，请查阅以下规范以了解更多详细信息。

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

## 2. Unifra

| Network             | Chain ID     | RPC Endpoint URL                          | Explorer                      |
| ------------------- | ------------ | ----------------------------------------- | ----------------------------- |
| [Mainnet](#mainnet) | 1030 (0x406) | <https://conflux-espace-public.unifra.io> | <https://evm.confluxscan.net> |


## Hardfork number

* Mainnet: EpochNumber 36935000, BlockNumber 92060600
* Testnet: EpochNumber 61465000, BlockNumber 77340000
