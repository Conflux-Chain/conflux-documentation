---
sidebar_position: 4
title: JSON-RPC Compatibility
description: JSON-RPC compatibility with Ethereum
displayed_sidebar: eSpaceSidebar
keywords:
  - Conflux eSpace
  - JSON-RPC
tags: [JSON-RPC, EVM Methods]
 
---

Conflux eSpace implements the Web3 JSON-RPC protocol.

Check out the following video to get a quick overview of this topic:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs>
  <TabItem value="youtube" label="JSON-RPC Compatibility Video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/svpqUAjzdk0?si=j6Ia3OEi8Go5DTPq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>
</Tabs>

## Methods

| Method                 | Status      | Note    |
| ---------------------- | ----------- |-------- |
| web3_clientVersion     | ✅       |  |
| net_version | ✅       |  |
| eth_protocolVersion | ✅       |  |
| eth_chainId | ✅ | |
| eth_gasPrice | ✅ | |
| eth_blockNumber | ✅ | |
| eth_getBalance | ✅ | |
| eth_getStorageAt | ✅ | |
| eth_getCode | ✅ | |
| eth_getTransactionCount | ✅ | |
| eth_sendRawTransaction | ✅ | |
| eth_submitTransaction | ✅ | |
| eth_call | ✅ | |
| eth_estimateGas | ✅ | |
| eth_getTransactionByHash | ✅ |  |
| eth_getTransactionReceipt | ✅ |  |
| eth_getLogs | ✅ | The max gap between fromBlock and toBlock is limited to 1000|
| eth_getBlockByHash | ✅ |  |
| eth_getBlockByNumber | ✅ | |
| eth_getBlockTransactionCountByHash | ✅ | |
| eth_getBlockTransactionCountByNumber | ✅ | |
| eth_getTransactionByBlockHashAndIndex | ✅ | |
| eth_getTransactionByBlockNumberAndIndex | ✅ | |
| eth_syncing | ✅ |  |
| eth_hashrate | ✅ |  |
| eth_coinbase | ✅ |  |
| eth_mining | ✅ |  |
| eth_maxPriorityFeePerGas | ✅ |  |
| eth_accounts | ✅ |  |
| eth_submitHashrate | ✅ |  |
| eth_getUncleByBlockHashAndIndex | ✅ |  |
| eth_getUncleByBlockNumberAndIndex | ✅ |  |
| eth_getUncleCountByBlockHash | ✅ |  |
| eth_getUncleCountByBlockNumber | ✅ |  |
| parity_getBlockReceipts | ✅ |  |
| eth_pendingTransactions | 🚧 | |
| web3_sha3 | 🚧 | |
| trace_block | ✅ | Parity RPC |
| trace_filter | ✅ | Parity RPC  |
| trace_transaction | ✅ | Parity RPC  |
| eth_feeHistory | ✅ | Supported at v2.4.0 |
| eth_getFilterChanges | ✅ | Supported at v2.1.1 |
| eth_getFilterLogs | ✅ | Supported at v2.1.1 |
| eth_newBlockFilter | ✅ | Supported at v2.1.1 |
| eth_newFilter | ✅ | Supported at v2.1.1 |
| eth_newPendingTransactionFilter | ✅ | Supported at v2.1.1 |
| eth_uninstallFilter | ✅ | Supported at v2.1.1 |
| debug_traceTransaction | ✅ | Supported at v2.4.0 |
| debug_traceBlockByHash | ✅ | Supported at v2.4.0 |
| debug_traceBlockByNumber | ✅ | Supported at v2.4.0 |
| debug_traceCall | ✅ | Supported at v2.4.1 |
| net_listening | ❌ | |
| net_peerCount | ❌ | |
| eth_compileLLL | ❌ | |
| eth_compileSerpent | ❌ | |
| eth_compileSolidity | ❌ | |
| eth_getCompilers | ❌ | |
| eth_getProof | ❌ | EIP-1186 |
| eth_getWork | ❌ | |
| db_* | ❌ | |
| shh_* | ❌ | |
|  |  | |

Legend: ❌ = not supported. 🚧 = work in progress. ✅ = supported.

## Notes

* `eth_sendRawTransaction` supports legacy(EIP-155), type-1(EIP-2930) and type-2(EIP-1559) transactions. Type-3 transactions (EIP-4844) transactions are not supported yet.
* Methods not listed here are also not supported.
* There is no concept of uncle (aka ommer) blocks. The `eth_getUncleByBlockHashAndIndex` and `eth_getUncleByBlockNumberAndIndex` methods always return `null`. The `eth_getUncleCountByBlockHash` and `eth_getUncleCountByBlockNumber` methods return zero for valid block IDs and `null` for invalid block IDs. Additionally, uncle-related block metadata such as `sha3Uncles` is sha3 of empty hash array.
* The nonstandard Geth tracing APIs are not supported at present
* The nonstandard Parity tracing APIs are in progress

### extra `burntGasFee` field of transaction receipts

The implementation of 1559 in Conflux eSpace differs slightly from Ethereum. The base fee of the transaction is not entirely burned; instead, it is partially burned according to a certain ratio, with the remaining part still serving as the miner's revenue. An additional field `burntGasFee` is added to the transaction receipt (e.g. got from `eth_getTransactionReceipt` RPC) to record the amount of fees that is burned.

For more information, please refer to [CIP-137](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-137.md).

### `pending` tag

Only `eth_getTransactionCount` method has supported `pending` tag. Other method will treat `pending` tag as `latest`

* eth_getTransactionCount ✅
* eth_getBalance
* eth_getCode
* eth_getStorageAt
* eth_call

Note: filter related methods also not support `pending` tag

## Data verifiability

Below fields can not guarantee the verifiability

### Block

* hash
* stateRoot
* receiptsRoot
* transactionsRoot
* totalDifficulty

### Receipt

* logsBloom

## pub/sub

Starting from v2.1.0 `newHeads` and `logs` is supported

## ETH RPC docs

* [Ethereum JSON-RPC Specification](https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/eth1.0-apis/assembled-spec/openrpc.json&uiSchema%5BappBar%5D%5Bui:splitView%5D=false&uiSchema%5BappBar%5D%5Bui:input%5D=false&uiSchema%5BappBar%5D%5Bui:examplesDropdown%5D=false)
* [ethereum/execution-apis](https://github.com/ethereum/execution-apis)
* [Infura JSON-RPC doc](https://infura.io/docs/ethereum#tag/JSON-RPC-Methods)
* [eth RPC wiki](https://eth.wiki/json-rpc/API)
* [geth RPC doc](https://geth.ethereum.org/docs/rpc/server)
* [Parity RPC doc](https://openethereum.github.io/JSONRPC)
