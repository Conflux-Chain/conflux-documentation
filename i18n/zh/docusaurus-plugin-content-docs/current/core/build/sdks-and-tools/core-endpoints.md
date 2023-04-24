---
id: conflux_rpcs
title: Network Endpoints
sidebar_position: 3
keywords:
  - endpoints
---

Public available Conflux network RPC endpoints

## Confura

Confura是Conflux网络上的一个与以太坊Infura等效的公共JSON-RPC服务，由Conflux基金会开发和维护。

我们的公共RPC服务位于全球不同的地区。 通过利用地理DNS路由，开发者可以请求与他们物理距离最近的区域RPC服务。

### 公共端点

#### 香港

| Network | Chain ID | Explorer                        | Endpoint                                                             |
| ------- | -------- | ------------------------------- | -------------------------------------------------------------------- |
| Mainnet | 1029     | https://confluxscan.net         | https://main.confluxrpc.com <br/> wss://main.confluxrpc.com/ws |
| Testnet | 1        | https://testnet.confluxscan.net | https://test.confluxrpc.com <br/> wss://test.confluxrpc.com/ws |

#### US East

| Network | Chain ID | Explorer                       | Endpoint                                                             |
| ------- | -------- | ------------------------------ | -------------------------------------------------------------------- |
| Mainnet | 1029     | https://confluxscan.io         | https://main.confluxrpc.org <br/> wss://main.confluxrpc.org/ws |
| Testnet | 1        | https://testnet.confluxscan.io | https://test.confluxrpc.org <br/> wss://test.confluxrpc.org/ws |

### 速率限制

为了确保服务的可用性，我们添加了一些速率限制器（用令牌桶算法实现），以缓解突发的流入流量。 用户如果在短时间内发送多个请求，可能会看到显示为状态码`429`的错误响应。

| Method                 | QPS | Burst | Comment                                                |
| ---------------------- | --- | ----- | ------------------------------------------------------ |
| all                    | 100 | 1000  | limits the number of all requests per second           |
| cfx_getLogs            | 20  | 20    | limits the number of `cfx_getLogs` requests per second |
| cfx_call               | 10  | 200   | limits the number of `cfx_call` requests per second    |
| cfx_sendRawTransaction | 50  | 500   | 限制每秒 `cfx_sendRawTransaction` 请求数量                     |
| cfx_getNextNonce       | 50  | 500   | 限制每秒 `cfx_getNextNonce` 请求数量                           |

如果你有更高的QPS需求，请访问 [Conflux Hub](https://confluxhub.io/payment/consumer/apps) 购买我们的VIP订阅计划，该计划具有以下新的QPS标准。

| Method                 | QPS | Burst | Comment                                                |
| ---------------------- | --- | ----- | ------------------------------------------------------ |
| all                    | 200 | 1000  | limits the number of all requests per second           |
| cfx_getLogs            | 40  | 40    | limits the number of `cfx_getLogs` requests per second |
| cfx_call               | 20  | 200   | limits the number of `cfx_call` requests per second    |
| cfx_sendRawTransaction | 50  | 500   | 限制每秒 `cfx_sendRawTransaction` 请求数量                     |
| cfx_getNextNonce       | 100 | 500   | 限制每秒 `cfx_getNextNonce` 请求数量                           |

#### 常见原因和缓解措施

速率限制可能发生在各种情况下，但最常见的情况是这些情况：

* 一次性发出多个状态调用请求可能导致速率限制。 我们建议使用`Multicall`，它可以聚合多个合约常量函数调用的结果，并减少需要发送的单独JSON RPC请求的数量。
* 高频运行 `cfx_getLogs` 请求以赶上最新纪元可能触发速率限制。 由于 `cfx_getLogs` 请求调用是昂贵的，我们建议调整你的日志查询过滤器中的纪元范围或区块范围，以减少请求调用。

### 其他注意事项

* `cfx_getLogs` 方法不再限制日志查询过滤器中`from_epoch` 和 `to_epoch` 之间的最大间隙。 不过，现在的查询是以合理的查询集大小为界限的，最大运行时间为3秒，结果集大小不超过10,000，在其他情况下，你可能需要缩小你的搜索条件。

## Unifra

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
