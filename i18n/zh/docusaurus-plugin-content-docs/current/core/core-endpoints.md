---
id: conflux_rpcs
title: 网络 RPC 端点
sidebar_position: 4
keywords:
  - 端点
displayed_sidebar: coreSidebar
---

公开可用的 Conflux Core 空间网络 RPC 端点

## 1. Confura

Confura是Conflux网络上的一个与以太坊Infura等效的公共JSON-RPC服务，由Conflux基金会开发和维护。

我们的公共RPC服务位于全球不同的地区。 通过利用地理DNS路由，开发者可以请求与他们物理距离最近的区域RPC服务。

### 公共端点

#### 香港

| 网络名称 | 链 ID | 浏览器网址                           | RPC 端点                                                                                  |
| ---- | ---- | ------------------------------- | --------------------------------------------------------------------------------------- |
| 主网   | 1029 | https://confluxscan.net         | *HTTP*: https://main.confluxrpc.com<br/>*Websocket*: wss://main.confluxrpc.com/ws |
| 测试网  | 1    | https://testnet.confluxscan.net | *HTTP*: https://main.confluxrpc.com<br/>*Websocket*: wss://test.confluxrpc.com/ws |

#### 美国东部

| 网络名称 | 链 ID | 浏览器网址                          | RPC 端点                                                                                  |
| ---- | ---- | ------------------------------ | --------------------------------------------------------------------------------------- |
| 主网   | 1029 | https://confluxscan.io         | *HTTP*: https://main.confluxrpc.org<br/>*Websocket*: wss://main.confluxrpc.org/ws |
| 测试网  | 1    | https://testnet.confluxscan.io | *HTTP*: https://test.confluxrpc.org<br/>*Websocket*: wss://test.confluxrpc.org/ws |

### 速率限制

不同费率档次和其速率限制的参考。

| 付费级别 | 价格                          | 速率限制                          | 购买链接                                                                                                                                                                                                                                         |
| ---- | --------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 免费   | $0                          | 每秒 50 次调用，每天最多100,000次 调用     | -                                                                                                                                                                                                                                            |
| 标准   | 150 美元/月                    | 每秒 100 次调用，每天最多 1,000,000 次调用 | [mainnet](https://confluxhub.io/payment/consumer/app/subscription/0x33A9451ee070d750a077C93f71D2cFcD0180Fa7D) <br/> [testnet](https://test.confluxhub.io/payment/consumer/app/subscription/0x4805C5B2741088B8458ed781083eA8940186E477) |
| 企业用户 | 请发邮件至 bd@confluxnetwork.org | 按需定制                          | -                                                                                                                                                                                                                                            |

**说明**
- `getLogs`调用的结果集最大大小为10,000。
- 由于数据裁剪，旧的存档事件日志可能无法访问。
- 请将您的 Api 密钥附加到端点上以获取特权访问（例如：`https://main.confluxrpc.com/<api-key>`）。
- 每个RPC方法也有速率限制，请查阅以下规范以了解更多详细信息。

<details>
<summary>速率限制细则</summary>

| RPC 方法              | 免费级别                                | 标准级别                                  | 注释                                                                                  |
| ------------------- | ----------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------- |
| 全部                  | 每秒请求数< 50；<br/>每日总数 < 100,000 | 每秒请求数< 100；<br/>每日总数 < 100,0000 | RPC 请求总数                                                                            |
| cfx_getLogs         | 每秒请求数< 5                            | 每秒请求数< 20                             | -                                                                                   |
| cfx_call            | 每秒请求数< 5                            | 每秒请求数< 50                             | -                                                                                   |
| cfx_getBlockBy*     | 每秒请求数< 5                            | 每秒请求数< 20                             | 包括： <br/> `cfx_getBlockByHash`, <br/>`cfx_getBlockByEPochNumber`        |
| cfx_getTransaction* | 每秒请求数< 5                            | 每秒请求数< 20                             | 包括： <br/> `cfx_getTransactionByHash`, <br/> `cfx_getTransactionreceipt` |
| debug RPC           | 暂不支持                                | 每秒请求数< 20                             | 包括： <br/> `cfx_getEpochreceips` 等。                                            |
| trace RPC           | 暂不支持                                | 每秒请求数< 20                             | 包括： <br/> `trace_block`, `trace_filter`, `trace_transaction`                  |
| filter API          | 暂不支持                                | 支持                                    | 包括： <br/> `cfx_newFilter`, `cfx_getFilterChanges` 等。                          |

</details>

import ConfuraError from '../templates/confura-error.md'

<details>
<summary>Confura Common Errors</summary>
<ConfuraError basicUnitName="epoch" /> </details>

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

| 网络名称 | 链 ID | 浏览器网址                   | 端点                                    |
| ---- | ---- | ----------------------- | ------------------------------------- |
| 主网   | 1029 | https://confluxscan.net | https://conflux-core-public.unifra.io |
