---
sidebar_position: 4
title: Network Endpoints
---

## 1. Confura

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

Reference for various fee tiers and their rate limits.

| Fee Tier                                                                                                       | Price                                | 速率限制                                        |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------- |
| Free                                                                                                           | $0                                   | 50 calls/second, up to  100,000 calls/day   |
| [Standard](https://confluxhub.io/payment/consumer/app/subscription/0x33A9451ee070d750a077C93f71D2cFcD0180Fa7D) | $150/mo                              | 100 calls/second, up to 1,000,000 calls/day |
| Enterprise                                                                                                     | please inquire bd@confluxnetwork.org | customize on demand                         |

**Notes**
- Maximum result-set size is 10,000 for `getLogs` call;
- Old archived event logs may be inaccessible due to data prune;
- Append your api key to the endpoint for privileged access (eg., `https://evm.confluxrpc.com/<api-key>`);
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

## 2. Unifra

| Network             | Chain ID     | RPC Endpoint URL                          | Explorer                      |
| ------------------- | ------------ | ----------------------------------------- | ----------------------------- |
| [Mainnet](#mainnet) | 1030 (0x406) | <https://conflux-espace-public.unifra.io> | <https://evm.confluxscan.net> |


## Hardfork number

* Mainnet: EpochNumber 36935000, BlockNumber 92060600
* Testnet: EpochNumber 61465000, BlockNumber 77340000
