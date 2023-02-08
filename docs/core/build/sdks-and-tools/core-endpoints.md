---
id: conflux_rpcs
title: Network Endpoints
sidebar_position: 3
keywords:
  - endpoints
---

Public available Conflux network RPC endpoints

## Confura

Confura is an Ethereum Infura equivalent public JSON-RPC service on Conflux network, which is developed and maintained by Conflux foundation.

Our public RPC services are located in different regions globally. By utilizing geographic DNS routing, developers can request the regional RPC services which are physically closest to them.

### Public Endpoint

#### Hong Kong

| Network | Chain ID | Explorer | Endpoint | 
| -------- | -------- | --------| -------- |
| Mainnet | 1029 | https://confluxscan.net | https://main.confluxrpc.com <br/> wss://main.confluxrpc.com/ws |
| Testnet | 1 | https://testnet.confluxscan.net |https://test.confluxrpc.com <br/> wss://test.confluxrpc.com/ws |

#### US East

| Network | Chain ID | Explorer | Endpoint | 
| -------- | -------- | --------| -------- |
| Mainnet | 1029 | https://confluxscan.io | https://main.confluxrpc.org <br/> wss://main.confluxrpc.org/ws |
| Testnet | 1 | https://testnet.confluxscan.io |https://test.confluxrpc.org <br/> wss://test.confluxrpc.org/ws |

### Rate Limits

To ensure the service availability, we've added several rate limiters (implemented with token bucket algorithm) to mitigate against bursts of incoming traffic. Users who send many requests in quick succession may see error responses that show up as status code `429`.

| Method | QPS | Burst | Comment | 
| -------- | -------- | --------| -------- |
| all | 100 | 1000 |  limits the number of all requests per second |
| cfx_getLogs | 20 | 20 | limits the number of `cfx_getLogs` requests per second |
| cfx_call | 10 | 200 | limits the number of `cfx_call` requests per second |
| cfx_sendRawTransaction | 50 | 500 | limits the number of `cfx_sendRawTransaction` requests per second |
| cfx_getNextNonce | 50 | 500 | limits the number of `cfx_getNextNonce` requests per second |

If you are have higher QPS requirements, please visit [Conflux Hub](https://confluxhub.io/payment/consumer/apps) to purchase our VIP subscription plan with the following new QPS standards.

| Method | QPS | Burst | Comment |
| -------- | -------- | --------| -------- |
| all | 200 | 1000 |  limits the number of all requests per second |
| cfx_getLogs | 40 | 40 | limits the number of `cfx_getLogs` requests per second |
| cfx_call | 20 | 200 | limits the number of `cfx_call` requests per second |
| cfx_sendRawTransaction | 50 | 500 | limits the number of `cfx_sendRawTransaction` requests per second |
| cfx_getNextNonce | 100 | 500 | limits the number of `cfx_getNextNonce` requests per second |

#### Common causes and mitigations

Rate limiting can occur under a variety of conditions, but it’s most common in these scenarios:

* Issuing multiple state call requests all at once can lead to rate limitting. We recommend using `Multicall`, which aggregates results from multiple contract constant function calls, and reduces the number of separate JSON RPC requests that need to be sent.
* Running high frequency `cfx_getLogs` requests to catch up latest epoch can trigger rate limitting. As `cfx_getLogs` request calls are expensive, we recommend adapting the epoch range or block range within your log query filter to reduces request calls.

### Other Notes

* The `cfx_getLogs` method no longer restrict the maximum gap between `from_epoch` and `to_epoch` for log query filter. Instead the query is now bounded with reasonable queryset size, 3s maximum running time and no more than 10,000 resultset size, under other circumstance you may need to narrow down your search condition.

## Unifra

Unifra is a Web3 developer platform focused on simplifying blockchain development. It has built a suite of developer tools, enhanced APIs, and a superior node infrastructure to seamlessly build and run blockchain applications. Unifra provide API services for multiple chains including Ethereum, BNS Smart Chain, Polygon and Conflux.

Unifra provides:

- Open access to free public end-points
- Real-time webhook alerts via Notify
- Best-in-class support and reliability / stability
- Unifra's NFT API
- Dashboard with Request Explorer

To use Unifra's service, developer need to register an account first and find the RPC endpoint in [Unifra console](https://console.unifra.io/). For detail infomation check [Unifra's documentation](https://docs.unifra.io/)

### Public Endpoint

| Network | Chain ID | Explorer | Endpoint | 
| -------- | -------- | --------| -------- |
| Mainnet | 1029 | https://confluxscan.net | https://conflux-core-public.unifra.io |
