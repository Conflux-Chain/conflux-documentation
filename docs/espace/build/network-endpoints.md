---
sidebar_position: 4
title: Network Endpoints
---

## Confura

### Hong Kong

Network  | Chain ID                | RPC Endpoint URL | Explorer 
-------- | ----------------------- | ------------ |------------ 
[Mainnet](#mainnet) | 1030 (0x406) | <https://evm.confluxrpc.com> | <https://evm.confluxscan.net> 
[Testnet](#testnet) | 71 (0x47) | <https://evmtestnet.confluxrpc.com> | <https://evmtestnet.confluxscan.net> 

### US East

Network  | Chain ID                | RPC Endpoint URL | Explorer 
-------- | ----------------------- | ------------ |------------ 
[Mainnet](#mainnet) | 1030 (0x406) | <https://evm.confluxrpc.org> | <https://evm.confluxscan.io> 
[Testnet](#testnet) | 71 (0x47) | <https://evmtestnet.confluxrpc.org> | <https://evmtestnet.confluxscan.io> 


### Rate Limits

To ensure the service availability, we've added several rate limiters (implemented with token bucket algorithm) to mitigrate against bursts of incoming traffic. Users who send many requests in quick succession may see error responses that show up as status code `429`.

| Method | QPS | Burst | Comment |
| -------- | -------- | --------| -------- |
| all | 100 | 1000 |  limits the number of all requests per second |
| eth_getLogs | 20 | 20 | limits the number of `eth_getLogs` requests per second |
| eth_call | 10 | 200 | limits the number of `eth_call` requests per second |
| eth_sendRawTransaction | 50 | 500 | limits the number of `eth_sendRawTransaction` requests per second |
| eth_getTransactionCount | 50 | 500 | limits the number of `eth_getTransactionCount` requests per second |
| eth_getBlockByNumber | 5 | 500 | limits the number of `eth_getBlockByNumber` requests per second |

If you are in the demand for higher QPS need, please visit [Conflux Hub](https://test.confluxhub.io/payment/consumer/app/subscription/0x4805C5B2741088B8458ed781083eA8940186E477) to purchase our VIP subscription plan (testnet supported only for the moment) with the following new QPS standards.

| Method | QPS | Burst | Comment |
| -------- | -------- | --------| -------- |
| all | 200 | 1000 |  limits the number of all requests per second |
| eth_getLogs | 20 | 20 | limits the number of `eth_getLogs` requests per second |
| eth_call | 20 | 200 | limits the number of `eth_call` requests per second |
| eth_sendRawTransaction | 50 | 500 | limits the number of `eth_sendRawTransaction` requests per second |
| eth_getTransactionCount | 100 | 500 | limits the number of `eth_getTransactionCount` requests per second |
| eth_getBlockByNumber | 20 | 50 | limits the number of `eth_getBlockByNumber` requests per second |

### Common causes and mitigations

Rate limiting can occur under a variety of conditions, but it’s most common in these scenarios:

* Issuing multiple state call requests all at once can lead to rate limitting. We recommend using `Multicall`, which aggregates results from multiple contract constant function calls, and reduces the number of separate JSON RPC requests that need to be sent.
* Running high frequency `eth_getLogs` requests to catch up latest block can trigger rate limitting. As `eth_getLogs` request calls are expensive, we recommend adapting the epoch range or block range within your log query filter to reduces request calls.

### Other Notes

* The `eth_getLogs` method no longer restrict the maximum gap between `from_block` and `to_block` for log query filter. Instead the query is now bounded with reasonable queryset size, 3s maximum running time and no more than 10,000 resultset size, under other circumstance you may need to narrow down your search condition.

## Confura

Network  | Chain ID                | RPC Endpoint URL | Explorer 
-------- | ----------------------- | ------------ |------------ 
[Mainnet](#mainnet) | 1030 (0x406) | <https://conflux-espace-public.unifra.io> | <https://evm.confluxscan.net> 


## Hardfork number

* Mainnet: EpochNumber 36935000, BlockNumber 92060600
* Testnet: EpochNumber 61465000, BlockNumber 77340000
