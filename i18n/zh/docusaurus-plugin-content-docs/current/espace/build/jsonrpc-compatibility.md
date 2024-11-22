---
sidebar_position: 4
title: JSON-RPC 的兼容性
description: 与以太坊 JSON-RPC 的兼容性
displayed_sidebar: eSpaceSidebar
keywords:
  - Conflux eSpace
  - JSON-RPC
tags:
  - JSON-RPC
  - EVM Methods
---

Conflux eSpace 实现了 Web3 JSON-RPC 协议。

查看以下视频以快速了解这个主题：

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs>
  <TabItem value="youtube" label="JSON-RPC Compatibility Video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/svpqUAjzdk0?si=j6Ia3OEi8Go5DTPq" title="YouTube 视频播放器" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>
</Tabs>

## 方法

| 方法                                      | 状态 | 备注                               |
| --------------------------------------- | -- | -------------------------------- |
| web3_clientVersion                      | ✅  |                                  |
| net_version                             | ✅  |                                  |
| eth_protocolVersion                     | ✅  |                                  |
| eth_chainId                             | ✅  |                                  |
| eth_gasPrice                            | ✅  |                                  |
| eth_blockNumber                         | ✅  |                                  |
| eth_getBalance                          | ✅  |                                  |
| eth_getStorageAt                        | ✅  |                                  |
| eth_getCode                             | ✅  |                                  |
| eth_getTransactionCount                 | ✅  |                                  |
| eth_sendRawTransaction                  | ✅  |                                  |
| eth_submitTransaction                   | ✅  |                                  |
| eth_call                                | ✅  |                                  |
| eth_estimateGas                         | ✅  |                                  |
| eth_getTransactionByHash                | ✅  |                                  |
| eth_getTransactionReceipt               | ✅  |                                  |
| eth_getLogs                             | ✅  | fromBlock 与 toBlock 的差值最大限制为1000 |
| eth_getBlockByHash                      | ✅  |                                  |
| eth_getBlockByNumber                    | ✅  |                                  |
| eth_getBlockTransactionCountByHash      | ✅  |                                  |
| eth_getBlockTransactionCountByNumber    | ✅  |                                  |
| eth_getTransactionByBlockHashAndIndex   | ✅  |                                  |
| eth_getTransactionByBlockNumberAndIndex | ✅  |                                  |
| eth_syncing                             | ✅  |                                  |
| eth_hashrate                            | ✅  |                                  |
| eth_coinbase                            | ✅  |                                  |
| eth_mining                              | ✅  |                                  |
| eth_maxPriorityFeePerGas                | ✅  |                                  |
| eth_accounts                            | ✅  |                                  |
| eth_submitHashrate                      | ✅  |                                  |
| eth_getUncleByBlockHashAndIndex         | ✅  |                                  |
| eth_getUncleByBlockNumberAndIndex       | ✅  |                                  |
| eth_getUncleCountByBlockHash            | ✅  |                                  |
| eth_getUncleCountByBlockNumber          | ✅  |                                  |
| parity_getBlockReceipts                 | ✅  |                                  |
| eth_pendingTransactions                 | 🚧  |                                  |
| web3_sha3                               | 🚧  |                                  |
| trace_block                             | ✅  | Parity RPC                       |
| trace_filter                            | ✅  | Parity RPC                       |
| trace_transaction                       | ✅  | Parity RPC                       |
| eth_feeHistory                          | ✅  | Supported at v2.4.0              |
| eth_getFilterChanges                    | ✅  | 在v2.1.1版本中支持                     |
| eth_getFilterLogs                       | ✅  | 在v2.1.1版本中支持                     |
| eth_newBlockFilter                      | ✅  | 在v2.1.1版本中支持                     |
| eth_newFilter                           | ✅  | 在v2.1.1版本中支持                     |
| eth_newPendingTransactionFilter         | ✅  | 在v2.1.1版本中支持                     |
| eth_uninstallFilter                     | ✅  | 在v2.1.1版本中支持                     |
| debug_traceTransaction                  | ✅  | Supported at v2.4.0              |
| debug_traceBlockByHash                  | ✅  | Supported at v2.4.0              |
| debug_traceBlockByNumber                | ✅  | Supported at v2.4.0              |
| net_listening                           | ❌  |                                  |
| net_peerCount                           | ❌  |                                  |
| eth_compileLLL                          | ❌  |                                  |
| eth_compileSerpent                      | ❌  |                                  |
| eth_compileSolidity                     | ❌  |                                  |
| eth_getCompilers                        | ❌  |                                  |
| eth_getProof                            | ❌  | EIP-1186                         |
| eth_getWork                             | ❌  |                                  |
| db_*                                    | ❌  |                                  |
| shh_*                                   | ❌  |                                  |
|                                         |    |                                  |

图例解释：❌ = 不支持。 🚧 = 开发中。 ✅ = 已支持。

## 备注

* `eth_sendRawTransaction` supports legacy(EIP-155), type-1(EIP-2930) and type-2(EIP-1559) transactions. Type-3 transactions (EIP-4844) transactions are not supported yet.
* 此处未列出的方法也不支持。
* 没有所谓的 uncle（又称 ommer）区块。 `eth_getUncleByBlockHashAndIndex` 和 `eth_getUncleByBlockNumberAndIndex` 方法总是返回 `null`。 `eth_getUncleCountByBlockHash` 和 `eth_getUncleCountByBlockNumber` 方法对有效的区块 ID 返回零，对无效的区块 ID 返回 `null`。 此外，与 uncle 相关的区块元数据如 `sha3Uncles` 是空的哈希数组 sha3。
* 目前不支持非标准的 Geth 跟踪 API
* 非标准 Parity 跟踪 API 正在开发中

### extra `burntGasFee` field of transaction receipts

The implementation of 1559 in Conflux eSpace differs slightly from Ethereum. The base fee of the transaction is not entirely burned; instead, it is partially burned according to a certain ratio, with the remaining part still serving as the miner's revenue. An additional field `burntGasFee` is added to the transaction receipt (e.g. got from `eth_getTransactionReceipt` RPC) to record the amount of fees that is burned.

For more information, please refer to [CIP-137](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-137.md).

### `pending` 标签

仅 `eth_getTransactionCount` 方法支持`pending` 标签。 其他方法将 `pending` 标签视为`latest`

* eth_getTransactionCount ✅
* eth_getBalance
* eth_getCode
* eth_getStorageAt
* eth_call

注意：过滤相关的方法也不支持 `pending` 标签

## 数据可验证性

以下字段无法保证可验证性

### Block

* hash
* stateRoot
* receiptsRoot
* transactionsRoot
* totalDifficulty

### Receipt

* logsBloom

## 发布/订阅

从 v2.1.0 版本开始支持 `newHeads` 和 `logs`

## ETH RPC 文档

* [以太坊 JSON-RPC 规范](https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/eth1.0-apis/assembled-spec/openrpc.json&uiSchema%5BappBar%5D%5Bui:splitView%5D=false&uiSchema%5BappBar%5D%5Bui:input%5D=false&uiSchema%5BappBar%5D%5Bui:examplesDropdown%5D=false)
* [以太坊/执行 api](https://github.com/ethereum/execution-apis)
* [Infura JSON-RPC 文档](https://infura.io/docs/ethereum#tag/JSON-RPC-Methods)
* [eth RPC wiki](https://eth.wiki/json-rpc/API)
* [geth RPC 文档](https://geth.ethereum.org/docs/rpc/server)
* [Parity RPC 文档](https://openethereum.github.io/JSONRPC)
