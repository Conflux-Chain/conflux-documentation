---
sidebar_position: 4
title: Network Endpoints
---

## Confura

### 香港

| Network             | Chain ID     | RPC Endpoint URL                    | Explorer                             |
| ------------------- | ------------ | ----------------------------------- | ------------------------------------ |
| [Mainnet](#mainnet) | 1030 (0x406) | <https://evm.confluxrpc.com>        | <https://evm.confluxscan.net>        |
| [Testnet](#testnet) | 71 (0x47)    | <https://evmtestnet.confluxrpc.com> | <https://evmtestnet.confluxscan.net> |

### US East

| Network             | Chain ID     | RPC Endpoint URL                    | Explorer                            |
| ------------------- | ------------ | ----------------------------------- | ----------------------------------- |
| [Mainnet](#mainnet) | 1030 (0x406) | <https://evm.confluxrpc.org>        | <https://evm.confluxscan.io>        |
| [Testnet](#testnet) | 71 (0x47)    | <https://evmtestnet.confluxrpc.org> | <https://evmtestnet.confluxscan.io> |


### 速率限制

To ensure the service availability, we've added several rate limiters (implemented with token bucket algorithm) to mitigrate against bursts of incoming traffic. 用户如果在短时间内发送多个请求，可能会看到显示为状态码`429`的错误响应。

| Method                  | QPS | Burst | Comment                                                            |
| ----------------------- | --- | ----- | ------------------------------------------------------------------ |
| all                     | 100 | 1000  | limits the number of all requests per second                       |
| eth_getLogs             | 20  | 20    | limits the number of `eth_getLogs` requests per second             |
| eth_call                | 10  | 200   | limits the number of `eth_call` requests per second                |
| eth_sendRawTransaction  | 50  | 500   | limits the number of `eth_sendRawTransaction` requests per second  |
| eth_getTransactionCount | 50  | 500   | limits the number of `eth_getTransactionCount` requests per second |
| eth_getBlockByNumber    | 5   | 500   | limits the number of `eth_getBlockByNumber` requests per second    |

If you are in the demand for higher QPS need, please visit [Conflux Hub](https://test.confluxhub.io/payment/consumer/app/subscription/0x4805C5B2741088B8458ed781083eA8940186E477) to purchase our VIP subscription plan (testnet supported only for the moment) with the following new QPS standards.

| Method                  | QPS | Burst | Comment                                                            |
| ----------------------- | --- | ----- | ------------------------------------------------------------------ |
| all                     | 200 | 1000  | limits the number of all requests per second                       |
| eth_getLogs             | 20  | 20    | limits the number of `eth_getLogs` requests per second             |
| eth_call                | 20  | 200   | limits the number of `eth_call` requests per second                |
| eth_sendRawTransaction  | 50  | 500   | limits the number of `eth_sendRawTransaction` requests per second  |
| eth_getTransactionCount | 100 | 500   | limits the number of `eth_getTransactionCount` requests per second |
| eth_getBlockByNumber    | 20  | 50    | limits the number of `eth_getBlockByNumber` requests per second    |

### 常见原因和缓解措施

速率限制可能发生在各种情况下，但最常见的情况是这些情况：

* 一次性发出多个状态调用请求可能导致速率限制。 我们建议使用`Multicall`，它可以聚合多个合约常量函数调用的结果，并减少需要发送的单独JSON RPC请求的数量。
* Running high frequency `eth_getLogs` requests to catch up latest block can trigger rate limitting. As `eth_getLogs` request calls are expensive, we recommend adapting the epoch range or block range within your log query filter to reduces request calls.

### 其他注意事项

* The `eth_getLogs` method no longer restrict the maximum gap between `from_block` and `to_block` for log query filter. 不过，现在的查询是以合理的查询集大小为界限的，最大运行时间为3秒，结果集大小不超过10,000，在其他情况下，你可能需要缩小你的搜索条件。

## Confura

| Network             | Chain ID     | RPC Endpoint URL                          | Explorer                      |
| ------------------- | ------------ | ----------------------------------------- | ----------------------------- |
| [Mainnet](#mainnet) | 1030 (0x406) | <https://conflux-espace-public.unifra.io> | <https://evm.confluxscan.net> |


## Hardfork number

* Mainnet: EpochNumber 36935000, BlockNumber 92060600
* Testnet: EpochNumber 61465000, BlockNumber 77340000
