---
sidebar_position: 5
title: 网络 RPC 端点
description: Conflux eSpace RPC 端点
displayed_sidebar: eSpaceSidebar
---

## Public RPC Endpoints

Confura 是由 Conflux 基金会提供的公共 RPC 服务，可以免费使用。 但为了维持服务的可用性，免费级别的服务有速率限制。 如果你需要更高级别的 RPC 服务，你可以通过 [Web3 Paywall](../general/build/tools/web3paywall.md) 进行购买，或者可以直接发送邮件到 [bd@confluxnetwork.org](mailto:bd@confluxnetwork.org) 向 Conflux 基金会申请。

### 香港

| 网络名称            | 链 ID         | RPC 端点 URL                                                                                          | 浏览器网址                              |
| --------------- | ------------ | --------------------------------------------------------------------------------------------------- | ---------------------------------- |
| [主网](#mainnet)  | 1030 (0x406) | *HTTP*: https://evm.confluxrpc.com<br/> *Websocket*: wss://evm.confluxrpc.com/ws              | https://evm.confluxscan.net        |
| [测试网](#testnet) | 71 (0x47)    | *HTTP*: https://evmtestnet.confluxrpc.com<br/>*Websocket*: wss://evmtestnet.confluxrpc.com/ws | https://evmtestnet.confluxscan.net |

### 美国东部

| 网络名称            | 链 ID         | RPC 端点 URL                                                                                  | 浏览器网址                             |
| --------------- | ------------ | ------------------------------------------------------------------------------------------- | --------------------------------- |
| [主网](#mainnet)  | 1030 (0x406) | *HTTP*: https://evm.confluxrpc.org<br/>*Websocket*: wss://evm.confluxrpc.org/ws       | https://evm.confluxscan.io        |
| [测试网](#testnet) | 71 (0x47)    | https://evmtestnet.confluxrpc.org<br/>*Websocket*: wss://evmtestnet.confluxrpc.org/ws | https://evmtestnet.confluxscan.io |

### 速率限制

不同费率档次和其速率限制的参考。

| 付费级别 | 价格                          | 速率限制                          | 购买链接                                                                                                                                                                                                                                         |
| ---- | --------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 免费   | $0                          | 每秒 50 次调用，每天最多100,000次 调用     | -                                                                                                                                                                                                                                            |
| 标准   | 150 美元/月                    | 每秒 100 次调用，每天最多 1,000,000 次调用 | [mainnet](https://confluxhub.io/payment/consumer/app/subscription/0x33A9451ee070d750a077C93f71D2cFcD0180Fa7D) <br/> [testnet](https://test.confluxhub.io/payment/consumer/app/subscription/0x4805C5B2741088B8458ed781083eA8940186E477) |
| 企业用户 | 请发邮件至 bd@confluxnetwork.org | 按需定制                          | -                                                                                                                                                                                                                                            |

**备注**
- `getLogs`调用的结果集最大大小为10,000。
- 由于数据裁剪，旧的存档事件日志可能无法访问。
- Append your api key(get from [Web3 Paywall](../general/build/tools/web3paywall.md) or Conflux Foundation) to the endpoint for privileged access (eg., `https://evm.confluxrpc.com/<api-key>`);
- 每个RPC方法也有速率限制，请查阅以下规范以了解更多详细信息。

<details>
<summary>速率限制细则</summary>

| RPC 方法              | 免费级别                                | 标准级别                                  | 注释                                                                                        |
| ------------------- | ----------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------- |
| 全部                  | 每秒请求数< 50；<br/>每日总数 < 100,000 | 每秒请求数< 100；<br/>每日总数 < 100,0000 | RPC 请求总数                                                                                  |
| eth_getLogs         | 每秒请求数< 5                            | 每秒请求数< 20                             | -                                                                                         |
| eth_call            | 每秒请求数< 5                            | 每秒请求数< 50                             | -                                                                                         |
| eth_getBlockBy*     | 每秒请求数< 5                            | 每秒请求数< 20                             | includes: <br/> `eth_getBlockByHash`, <br/>`eth_getBlockByNumber`             |
| eth_getTransaction* | 每秒请求数< 5                            | 每秒请求数< 20                             | includes: <br/> `eth_getTransactionByHash`, <br/> `eth_getTransactionReceipt` |
| debug RPC           | 暂不支持                                | 每秒请求数< 20                             | includes: <br/> `parity_getBlockReceipts` etc.                                      |
| trace RPC           | 暂不支持                                | 每秒请求数< 20                             | 包括： <br/> `trace_block`, `trace_filter`, `trace_transaction`                        |
| filter API          | 暂不支持                                | 支持                                    | includes: <br/> `eth_newFilter`, `eth_getFilterChanges` etc.                        |

</details>

import ConfuraError from '../templates/confura-error.md'

<details>
<summary>Confura Common Errors</summary>
<ConfuraError basicUnitName="block" /> </details>

## Commercial RPC Service

There are couple of commercial RPC service providers, you can check them [here](./build/infrastructure/RPC-Provider.md)

## 常见问题解答

### 如何获取 Confura 高级 API 密钥？

Confura 是由 Conflux 基金会提供的公共 RPC 服务，可以免费使用。 对于免费级别，您不需要 API 密钥。 To get a higher tier RPC service, you can buy it at [Web3 Paywall](../general/build/tools/web3paywall.md) or apply from Conflux foundation by sending email to [bd@confluxnetwork.org](mailto:bd@confluxnetwork.org).
