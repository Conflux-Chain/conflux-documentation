---
sidebar_position: 4
title: JSON-RPC Compatibility
description: JSON-RPC compatibility with Ethereum
displayed_sidebar: eSpaceSidebar
keywords:
  - Conflux eSpace
  - JSON-RPC
tags:
  - JSON-RPC
  - EVM Methods
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

| Method                                  | Status | Note                                                         |
| --------------------------------------- | ------ | ------------------------------------------------------------ |
| web3_clientVersion                      | ✅      |                                                              |
| net_version                             | ✅      |                                                              |
| eth_protocolVersion                     | ✅      |                                                              |
| eth_chainId                             | ✅      |                                                              |
| eth_gasPrice                            | ✅      |                                                              |
| eth_blockNumber                         | ✅      |                                                              |
| eth_getBalance                          | ✅      |                                                              |
| eth_getStorageAt                        | ✅      |                                                              |
| eth_getCode                             | ✅      |                                                              |
| eth_getTransactionCount                 | ✅      |                                                              |
| eth_sendRawTransaction                  | ✅      |                                                              |
| eth_submitTransaction                   | ✅      |                                                              |
| eth_call                                | ✅      |                                                              |
| eth_estimateGas                         | ✅      |                                                              |
| eth_getTransactionByHash                | ✅      |                                                              |
| eth_getTransactionReceipt               | ✅      |                                                              |
| eth_getLogs                             | ✅      | The max gap between fromBlock and toBlock is limited to 1000 |
| eth_getBlockByHash                      | ✅      |                                                              |
| eth_getBlockByNumber                    | ✅      |                                                              |
| eth_getBlockTransactionCountByHash      | ✅      |                                                              |
| eth_getBlockTransactionCountByNumber    | ✅      |                                                              |
| eth_getTransactionByBlockHashAndIndex   | ✅      |                                                              |
| eth_getTransactionByBlockNumberAndIndex | ✅      |                                                              |
| eth_syncing                             | ✅      |                                                              |
| eth_hashrate                            | ✅      |                                                              |
| eth_coinbase                            | ✅      |                                                              |
| eth_mining                              | ✅      |                                                              |
| eth_maxPriorityFeePerGas                | ✅      |                                                              |
| eth_accounts                            | ✅      |                                                              |
| eth_submitHashrate                      | ✅      |                                                              |
| eth_getUncleByBlockHashAndIndex         | ✅      |                                                              |
| eth_getUncleByBlockNumberAndIndex       | ✅      |                                                              |
| eth_getUncleCountByBlockHash            | ✅      |                                                              |
| eth_getUncleCountByBlockNumber          | ✅      |                                                              |
| parity_getBlockReceipts                 | ✅      |                                                              |
| eth_pendingTransactions                 | 🚧      |                                                              |
| web3_sha3                               | 🚧      |                                                              |
| trace_block                             | ✅      | Compatible with parity and erigon since v3.0.0               |
| trace_filter                            | ✅      | Compatible with parity and erigon since v3.0.0               |
| trace_transaction                       | ✅      | Compatible with parity and erigon since v3.0.0               |
| trace_get                               | ✅      | Supported at v3.0.0                                          |
| trace_call                              | 🚧      |                                                              |
| trace_rawTransaction                    | 🚧      |                                                              |
| trace_replayTransaction                 | 🚧      |                                                              |
| trace_replayBlockTransactions           | 🚧      |                                                              |
| eth_feeHistory                          | ✅      | Supported at v2.4.0                                          |
| eth_getFilterChanges                    | ✅      | Supported at v2.1.1                                          |
| eth_getFilterLogs                       | ✅      | Supported at v2.1.1                                          |
| eth_newBlockFilter                      | ✅      | Supported at v2.1.1                                          |
| eth_newFilter                           | ✅      | Supported at v2.1.1                                          |
| eth_newPendingTransactionFilter         | ✅      | Supported at v2.1.1                                          |
| eth_uninstallFilter                     | ✅      | Supported at v2.1.1                                          |
| debug_traceTransaction                  | ✅      | Supported at v2.4.0                                          |
| debug_traceBlockByHash                  | ✅      | Supported at v2.4.0                                          |
| debug_traceBlockByNumber                | ✅      | Supported at v2.4.0                                          |
| debug_traceCall                         | ✅      | Supported at v2.4.1                                          |
| txpool_status                           | ✅      | Supported at v3.0.0                                          |
| txpool_inspect                          | ✅      | Supported at v3.0.0                                          |
| txpool_content                          | ✅      | Supported at v3.0.0                                          |
| txpool_contentFrom                      | ✅      | Supported at v3.0.0                                          |
| net_listening                           | ❌      |                                                              |
| net_peerCount                           | ❌      |                                                              |
| eth_compileLLL                          | ❌      |                                                              |
| eth_compileSerpent                      | ❌      |                                                              |
| eth_compileSolidity                     | ❌      |                                                              |
| eth_getCompilers                        | ❌      |                                                              |
| eth_getProof                            | ❌      | EIP-1186                                                     |
| eth_getWork                             | ❌      |                                                              |
| db_*                                    | ❌      |                                                              |
| shh_*                                   | ❌      |                                                              |
|                                         |        |                                                              |

Legend: ❌ = not supported. 🚧 = work in progress. ✅ = supported.

### Conflux Specific RPCs

#### `trace_blockSetAuth`

`trace_blockSetAuth` is a Conflux specific RPC used to retrieve the trace data for SetAuth operations in EIP-7702 transactions. The returned result is as follows:

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": [
        {
            "action": {
                "address": "0xf0109fc8df283027b6285cc889f5aa624eac1f55",
                "chainId": "0x401",
                "nonce": "0x1",
                "author": "0x3d69d968e3673e188b2d2d42b6a385686186258f"
            },
            "result": "invalid_nonce",
            "transactionPosition": 0,
            "transactionHash": "0x716f6f3294346099d98d5f9b0e12846647e1d17b9076d1a5ac0e42dac72f7229",
            "blockNumber": 7800,
            "blockHash": "0x015880a004ff96fed4161353994958d0f09eeae770f73ca888f105dc9f4ef1cc"
        }
    ]
}
```

Check [trace_blockSetAuth](https://github.com/Conflux-Chain/conflux-rust/blob/master/docs/transaction-trace/parity-style-trace.md#trace-setauth7702) for more details.

## Notes

* `eth_sendRawTransaction` supports legacy(EIP-155), type-1(EIP-2930) and type-2(EIP-1559) transactions. Type-3 transactions (EIP-4844) transactions are not supported yet.
* Methods not listed here are also not supported.
* There is no concept of uncle (aka ommer) blocks. The `eth_getUncleByBlockHashAndIndex` and `eth_getUncleByBlockNumberAndIndex` methods always return `null`. The `eth_getUncleCountByBlockHash` and `eth_getUncleCountByBlockNumber` methods return zero for valid block IDs and `null` for invalid block IDs. Additionally, uncle-related block metadata such as `sha3Uncles` is sha3 of empty hash array.
* The nonstandard Geth tracing APIs are not supported at present
* The nonstandard Parity tracing APIs are in progress
* A breaking change at v3.0.0: Trace RPC methods is compatible with parity and erigon, including `trace_block`, `trace_transaction`, `trace_filter`.

### Extra Fields RPC Response

#### Extra Fields of Transaction Receipts

Transaction receipts returned by the `eth_getTransactionReceipt` RPC have the following extra fields:

- `burntGasFee`: The amount of fees that is burned. In Conflux, the base fee of the transaction is partially burned rather than entirely burned. Check [CIP-137](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-137.md) for more details.
- `gasFee`: The amount of fees of a transaction. Added at v3.0.0.

#### Extra Fields of Block

Block object returned by the `eth_getBlockByNumber`, `eth_getBlockByHash` RPC has the following extra fields:

- `espaceGasLimit`: The actual gas limit for eSpace transactions, which is different from `gasLimit` in the block object. Check [Spaces](../../general/conflux-basics/spaces.md#graph-illustration) for more details. Added at v3.0.0.

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
