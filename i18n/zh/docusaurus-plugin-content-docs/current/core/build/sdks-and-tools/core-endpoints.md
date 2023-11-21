---
id: conflux_rpcs
title: Network Endpoints
sidebar_position: 3
keywords:
  - endpoints
---

Public available Conflux network RPC endpoints

## 1. Confura

Confura是Conflux网络上的一个与以太坊Infura等效的公共JSON-RPC服务，由Conflux基金会开发和维护。

我们的公共RPC服务位于全球不同的地区。 通过利用地理DNS路由，开发者可以请求与他们物理距离最近的区域RPC服务。

### 公共端点

#### 香港

| Network | Chain ID | Explorer                        | RPC Endpoint                                                                            |
| ------- | -------- | ------------------------------- | --------------------------------------------------------------------------------------- |
| Mainnet | 1029     | https://confluxscan.net         | *HTTP*: https://main.confluxrpc.com<br/>*Websocket*: wss://main.confluxrpc.com/ws |
| Testnet | 1        | https://testnet.confluxscan.net | *HTTP*: https://test.confluxrpc.com<br/>*Websocket*: wss://test.confluxrpc.com/ws |

#### US East

| Network | Chain ID | Explorer                       | RPC Endpoint                                                                            |
| ------- | -------- | ------------------------------ | --------------------------------------------------------------------------------------- |
| Mainnet | 1029     | https://confluxscan.io         | *HTTP*: https://main.confluxrpc.org<br/>*Websocket*: wss://main.confluxrpc.org/ws |
| Testnet | 1        | https://testnet.confluxscan.io | *HTTP*: https://test.confluxrpc.org<br/>*Websocket*: wss://test.confluxrpc.org/ws |

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
- Append your api key to the endpoint for privileged access (eg., `https://main.confluxrpc.com/<api-key>`);
- 每个RPC方法也有速率限制，请查阅以下规范以了解更多详细信息。

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

## 2. Unifra

Unifra是一个专注于简化区块链开发的Web3开发者平台。 它建立了一套开发者工具，增强了API，以及一个卓越的节点基础设施，以无缝构建和运行区块链应用程序。 Unifra 为多个链提供 API 服务，包括 以太坊、BNB 智能链、Polygon 和 Conflux。

Unifra提供：

- 开放访问免费的公共端点
- 通过Notify提供实时的webhook提醒
- 一流的支持和可靠性/稳定性
- Unifra的NFT API
- 带有请求浏览器的仪表板

要使用Unifra的服务，开发者需要先注册一个账户，并在[Unifra 控制台](https://console.unifra.io/)中找到RPC端点。 详细信息请查看[Unifra的文档](https://docs.unifra.io/)

### 公共端点

| Network | Chain ID | Explorer                | Endpoint                              |
| ------- | -------- | ----------------------- | ------------------------------------- |
| Mainnet | 1029     | https://confluxscan.net | https://conflux-core-public.unifra.io |
