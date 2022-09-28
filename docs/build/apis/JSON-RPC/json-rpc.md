---
id: json_rpc
sidebar_position: 1
title: cfx Namespace
custom_edit_url: https://github.com/Conflux-Chain/conflux-doc/edit/master/docs/json-rpc.md
keywords:
  - conflux
  - json-rpc
  - sdk
---

In order for a software application to interact with the Conflux blockchain - either by reading blockchain data or sending transactions to the network - it must connect to an Conflux node.

For this purpose, every [Conflux client](https://github.com/conflux-chain/conflux-rust) implements a [JSON-RPC specification](https://github.com/Conflux-Chain/jsonrpc-spec), so there are a uniform set of methods that applications can rely on regardless of the specific node or client implementation.

[JSON-RPC](https://www.jsonrpc.org/specification) is a stateless, light-weight remote procedure call (RPC) protocol. It defines several data structures and the rules around their processing. It is transport agnostic in that the concepts can be used within the same process, over sockets, over HTTP, or in many various message passing environments. It uses JSON (RFC 4627) as data format.

## CONVENIENCE LIBRARIES

While you may choose to interact directly with Conflux clients via the JSON-RPC API, there are often easier options for dapp developers. Many [JavaScript](https://github.com/conflux-chain/js-conflux-sdk) and [backend API](https://github.com/conflux-chain/go-conflux-sdk) libraries exist to provide wrappers on top of the JSON-RPC API. With these libraries, developers can write intuitive, one-line methods in the programming language of their choice to initialize JSON-RPC requests (under the hood) that interact with Conflux.

## SPEC

[Read the full JSON-RPC API spec on GitHub.](https://github.com/Conflux-Chain/jsonrpc-spec)

## JSON-RPC endpoints

Currently, Conflux has a [Rust implementation](https://github.com/Conflux-Chain/conflux-rust) that supports JSON-RPC 2.0 over an HTTP, TPC, or WebSocket connection.

If you are a node operator, you can enable and configure various RPC interfaces through the TOML config file, or directly by passing command line arguments. The main configuration items are listed in the table below. Note that if you want to enable HTTPS or access control, you will need to set up a proxy for your node.

| config parameter          | cli parameter         | default port   | enabled by default   |
|---------------------------|-----------------------|:--------------:|:--------------------:|
| `jsonrpc_ws_port`         | `--jsonrpc-ws-port`   | 12535          | no                   |
| `jsonrpc_tcp_port`        | `--jsonrpc-tcp-port`  | 12536          | no                   |
| `jsonrpc_http_port`       | `--jsonrpc-http-port` | 12537          | no                   |
| `jsonrpc_local_tcp_port`  | -                     | 12538          | no                   |
| `jsonrpc_local_http_port` | -                     | 12539          | yes                  |

The examples in the rest of this document will use the HTTP endpoint.

## CONVENTIONS

### HEX value encoding

Two key data types get passed over JSON: unformatted byte arrays and quantities. Both are passed with a hex encoding but with different requirements for formatting.

#### Quantities

When encoding **QUANTITIES** (integers, numbers): encode as hex using the most compact representation and prefix with `"0x"`. Zero should be represented as `"0x0"`. Examples:

* `0x41` (65 in decimal)
* `0x400` (1024 in decimal)
* **WRONG**: `0x` (should always have at least one digit - zero is `"0x0"`)
* **WRONG**: `0x0400` (no leading zeroes allowed)
* **WRONG**: `ff` (missing `0x` prefix)

#### Unformatted data

When encoding **UNFORMATTED DATA** (byte arrays, hashes, bytecode arrays): encode as hex using two hex digits per byte and prefix with `"0x"`. Examples:

* `0x41` (size 1, `"A"`)
* `0x004200` (size 3, `"\0B\0"`)
* `0x` (size 0, `""`)
* **WRONG**: `0xf0f0f` (must be even number of digits)
* **WRONG**: `004200` (missing `0x` prefix)

Note that block and transaction hashes are represented using 32 bytes.

### Base32 Address

`BASE32`: Base32 **addresses** should be encoded as an ASCII string of 42-characters plus network prefix, separators, and optional fields. Please note the following constraints for base32 addresses as RPC parameters:

* The network-prefix should match the node's network, i.e. `cfx:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp` can be sent to mainnet nodes and `cfxtest:acc7uawf5ubtnmezvhu9dhc6sghea0403ywjz6wtpg` can be sent to testnet nodes. Note that these two example addresses correspond to the same account on different networks.
* Including and omitting the address-type are both accepted, i.e. `cfx:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg` and `cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg` are equivalent. However, addresses with an incorrect type, e.g. `cfx:type.contract:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg`, are rejected.
* Both lowercase (`cfx:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg`) and uppercase (`CFX:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG`) addresses are accepted. Mixed-case addresses are rejected.

### The default epochNumber parameter

Several RPC methods have an epoch number parameter. The concept of epochs in Conflux is somewhat analogous to the concept of block numbers (height) in other ledgers, but one epoch might contain multiple blocks.

The epoch number specifies a point in time and the corresponding state of the system, subject to consensus. The following options are possible for the epoch number parameter:

* `HEX String` - an integer epoch number. For example, `0x3e8` is epoch 1000.
* `String "earliest"` for the epoch of the genesis block.
* `String "latest_checkpoint"` for the earliest epoch stored in memory.
* `String "latest_finalized"` - for the latest finalized (by PoS) epoch. (Added from conflux-rust `v2.0.0`)
* `String "latest_confirmed"` - for the latest confirmed epoch (using the confirmation meter's estimate).
* `String "latest_state"` - for the latest epoch that has been executed.
* `String "latest_mined"` - for the latest known epoch.

<!---
TODO: Add links to deferred execution documentation.
-->

Please note that due to performance optimization, the latest mined epochs are not executed, so there is no state available for these epochs. For most RPCs related to state query, `"latest_state"` is recommended.

## EXAMPLES

On this page we provide examples of how to use individual JSON_RPC API endpoints using the command line tool, [curl](https://curl.se/). These individual endpoint examples are found below in the Curl examples section. Further down the page, we also provide an end-to-end example for compiling and deploying a smart contract using a Geth node, the JSON_RPC API and curl.

## CURL EXAMPLES

Examples of using the JSON_RPC API by making [curl](https://curl.se/) requests to an Conflux node are provided below. Each example includes a description of the specific endpoint, its parameters, return type, and a worked example of how it should be used.

The curl requests might return an error message relating to the content type. This is because the --data option sets the content type to application/x-www-form-urlencoded. If your node does complain about this, manually set the header by placing -H "Content-Type: application/json" at the start of the call. The examples also do not include the URL/IP & port combination which must be the last argument given to curl (e.g. 127.0.0.1:12537). A complete curl request including these additional data takes the following form:

```shell
$ curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"cfx_clientVersion","params":[],"id":67}' 127.0.0.1:12537
```

## State and transaction availability

Conflux archive and full nodes remove historical state tries to reduce storage use. Full nodes will also discard transactions and receipts for historical blocks. As a result, some RPC interfaces might be unavailable for historical queries.

Below is a list of the Conflux RPC APIs and their availability on archive and full nodes. *"recent"* means that the RPC is only supported for recent items, *"OK"* means that it should work for any valid input.

| RPC                                                                               | archive node | full node |
|-----------------------------------------------------------------------------------|:------------:|:---------:|
| [`cfx_call`](#cfx_call)                                                           |    recent    |   recent  |
| [`cfx_checkBalanceAgainstTransaction`](#cfx_checkbalanceagainsttransaction)       |    recent    |   recent  |
| [`cfx_clientVersion`](#cfx_clientversion)                                         |      OK      |     OK    |
| [`cfx_epochNumber`](#cfx_epochnumber)                                             |      OK      |     OK    |
| [`cfx_estimateGasAndCollateral`](#cfx_estimategasandcollateral)                   |    recent    |   recent  |
| [`cfx_gasPrice`](#cfx_gasprice)                                                   |      OK      |     OK    |
| [`cfx_getAccount`](#cfx_getaccount)                                               |    recent    |   recent  |
| [`cfx_getAccumulateInterestRate`](#cfx_getaccumulateinterestrate)                 |      OK      |     OK    |
| [`cfx_getAdmin`](#cfx_getadmin)                                                   |    recent    |   recent  |
| [`cfx_getBalance`](#cfx_getbalance)                                               |    recent    |   recent  |
| [`cfx_getBestBlockHash`](#cfx_getbestblockhash)                                   |      OK      |     OK    |
| [`cfx_getBlockByEpochNumber`](#cfx_getblockbyepochnumber)                         |      OK      |   recent  |
| [`cfx_getBlockByHash`](#cfx_getblockbyhash)                                       |      OK      |   recent  |
| [`cfx_getBlockByHashWithPivotAssumption`](#cfx_getblockbyhashwithpivotassumption) |      OK      |   recent  |
| [`cfx_getBlockRewardInfo`](#cfx_getblockrewardinfo)                               |      OK      |   recent  |
| [`cfx_getBlocksByEpoch`](#cfx_getblocksbyepoch)                                   |      OK      |     OK    |
| [`cfx_getCode`](#cfx_getcode)                                                     |    recent    |   recent  |
| [`cfx_getCollateralForStorage`](#cfx_getcollateralforstorage)                     |    recent    |   recent  |
| [`cfx_getConfirmationRiskByHash`](#cfx_getconfirmationriskbyhash)                 |      OK      |   recent  |
| [`cfx_getDepositList`](#cfx_getdepositlist)                                       |    recent    |   recent  |
| [`cfx_getInterestRate`](#cfx_getinterestrate)                                     |    recent    |   recent  |
| [`cfx_getLogs`](#cfx_getlogs)                                                     |      OK      |   recent  |
| [`cfx_getNextNonce`](#cfx_getnextnonce)                                           |    recent    |   recent  |
| [`cfx_getSkippedBlocksByEpoch`](#cfx_getskippedblocksbyepoch)                     |      OK      |     OK    |
| [`cfx_getSponsorInfo`](#cfx_getsponsorinfo)                                       |    recent    |   recent  |
| [`cfx_getStakingBalance`](#cfx_getstakingbalance)                                 |    recent    |   recent  |
| [`cfx_getStatus`](#cfx_getstatus)                                                 |      OK      |     OK    |
| [`cfx_getStorageAt`](#cfx_getstorageat)                                           |    recent    |   recent  |
| [`cfx_getStorageRoot`](#cfx_getstorageroot)                                       |    recent    |   recent  |
| [`cfx_getTransactionByHash`](#cfx_gettransactionbyhash)                           |      OK      |   recent  |
| [`cfx_getTransactionReceipt`](#cfx_gettransactionreceipt)                         |      OK      |   recent  |
| [`cfx_getVoteList`](#cfx_getvotelist)                                             |    recent    |   recent  |
| [`cfx_sendRawTransaction`](#cfx_sendrawtransaction)                               |      OK      |     OK    |

If you query a state entry that is unavailable on the node, you will get an error response:

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getBalance","params":["cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg", "earliest"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "error": {
    "code": -32016,
    "message": "Error processing request: State for epoch (number=0 hash=0x24dcc768132dc7f651d7cb35c52e7bba632eda073d8743f81cfe905ff7e4157a) does not exist: out-of-bound StateAvailabilityBoundary { synced_state_height: 0, lower_bound: 9510001, upper_bound: 9569393, optimistic_executed_height: Some(9569392) }"
  },
  "id": 1
}
```

In this example, we are told that the earliest available state is at epoch `9510001` (`0x911c71`).

### Migrating from Ethereum JSON-RPC

There is a correspondence between some JSON-RPCs from Ethereum and Conflux. Even though the details of JSON-RPC may differ, the following mapping table could be helpful when migrating from Ethereum to Conflux:

| Ethereum                    | Conflux                                                         |
|-----------------------------|-----------------------------------------------------------------|
| `eth_blockNumber`           | [`cfx_epochNumber`](#cfx_epochnumber)                           |
| `eth_call`                  | [`cfx_call`](#cfx_call)                                         |
| `eth_estimateGas`           | [`cfx_estimateGasAndCollateral`](#cfx_estimategasandcollateral) |
| `eth_gasPrice`              | [`cfx_gasPrice`](#cfx_gasprice)                                 |
| `eth_getBalance`            | [`cfx_getBalance`](#cfx_getbalance)                             |
| `eth_getBlockByHash`        | [`cfx_getBlockByHash`](#cfx_getblockbyhash)                     |
| `eth_getBlockByNumber`      | [`cfx_getBlockByEpochNumber`](#cfx_getblockbyepochnumber)       |
| `eth_getCode`               | [`cfx_getCode`](#cfx_getcode)                                   |
| `eth_getLogs`               | [`cfx_getLogs`](#cfx_getlogs)                                   |
| `eth_getStorageAt`          | [`cfx_getStorageAt`](#cfx_getstorageat)                         |
| `eth_getTransactionByHash`  | [`cfx_getTransactionByHash`](#cfx_gettransactionbyhash)         |
| `eth_getTransactionCount`   | [`cfx_getNextNonce`](#cfx_getnextnonce)                         |
| `eth_getTransactionReceipt` | [`cfx_getTransactionReceipt`](#cfx_gettransactionreceipt)       |
| `eth_sendRawTransaction`    | [`cfx_sendRawTransaction`](#cfx_sendrawtransaction)             |

## GOSSIP, STATE, HISTORY

A handful of core JSON-RPC methods require data from the Conflux network, and fall neatly into three main categories: Gossip, State, and History. Use the links in these sections to jump to each method, or use the table of contents to explore the whole list of methods.

### Gossip Method

These methods track the head of the chain. This is how transactions make their way around the network, find their way into blocks, and how clients find out about new blocks.

* cfx_getStatus
* cfx_epochNumber
* cfx_sendRawTransaction

### State Methods

Methods that report the current state of all the data stored. The "state" is like one big shared piece of RAM, and includes account balances, contract data, and gas estimations.

* cfx_getBalance
* cfx_getStorageAt
* cfx_getNonce
* cfx_getCode
* cfx_call
* cfx_estimateGasAndCollateral

### History Methods

Fetches historical records of every block back to genesis. This is like one large append-only file, and includes all block headers, block bodies, uncle blocks, and transaction receipts.

* cfx_getBlockByHash
* cfx_getBlockByEpochNumber
* cfx_getTransactionByHash
* cfx_getTransactionReceipt

## JSON-RPC methods

### cfx_getTransactionByHash

Returns information about a transaction, identified by its hash.

#### Parameters

1. `DATA`, 32 Bytes - hash of a transaction

```json
params: [
    "0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"
]
```

#### Returns

`Object` - a transaction object, or `null` when no transaction was found:

* `blockHash`: `DATA`, 32 Bytes - hash of the block where this transaction was in and got executed. `null` when the transaction is pending.
* `chainId`: `QUANTITY` - the chain ID specified by the sender.
* `contractCreated`: `BASE32` - address of the contract created. `null` when it is not a contract deployment transaction.
* `data`: `DATA` - the data sent along with the transaction.
* `epochHeight`: `QUANTITY` - the epoch proposed by the sender. Note that this is NOT the epoch of the block containing this transaction.
* `from`: `BASE32` - address of the sender.
* `gas`: `QUANTITY` - gas provided by the sender.
* `gasPrice`: `QUANTITY` - gas price provided by the sender in Drip.
* `hash`: `DATA`, 32 Bytes - hash of the transaction.
* `nonce`: `QUANTITY` - the number of transactions made by the sender prior to this one.
* `r`: `DATA`, 32 Bytes - ECDSA signature r.
* `s`: `DATA`, 32 Bytes - ECDSA signature s.
* `status`: `QUANTITY` - 0 for success, 1 if an error occurred, 2 for skiped, `null` when the transaction is skipped or not packed.
* `storageLimit`: `QUANTITY` - the storage limit specified by the sender.
* `to`: `BASE32` - address of the receiver. `null` when it is a contract deployment transaction.
* `transactionIndex`: `QUANTITY` - the transaction's position in the block. `null` when the transaction is pending.
* `v`: `QUANTITY` - ECDSA recovery id.
* `value`: `QUANTITY` - value transferred in Drip.

Note that the fields `blockHash`, `contractCreated`, `status`, and `transactionIndex` are provided by the node as they depend on the transaction's position within the ledger. The rest of the fields are included in or derived from the original transaction.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getTransactionByHash","params":["0x497755f45baef13a35347933c48c0b8940f2cc3347477b5ed9f165581b082699"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": {
    "blockHash": "0x564750c06c7afb10de8beebcf24411cc73439295d5abb1264d2c9b90eee5606f",
    "chainId": "0x2",
    "contractCreated": null,
    "data": "0x0",
    "epochHeight": "0x909c9f",
    "from": "CFX:TYPE.USER:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG",
    "gas": "0xf4240",
    "gasPrice": "0x174876e800",
    "hash": "0x497755f45baef13a35347933c48c0b8940f2cc3347477b5ed9f165581b082699",
    "nonce": "0x3b518",
    "r": "0x14da6cff1a3cd864b04d1b16f480fa023f449322e318b04bb1109b5754b516ce",
    "s": "0x304070abe6488c3532ecb66f4be32b88ee35ce48a4607b8d0c86461987a79fc7",
    "status": "0x0",
    "storageLimit": "0x100",
    "to": "CFX:TYPE.CONTRACT:ACC7UAWF5UBTNMEZVHU9DHC6SGHEA0403Y2DGPYFJP",
    "transactionIndex": "0x0",
    "v": "0x1",
    "value": "0x3635c9adc5dea00000"
  },
  "id": 1
}
```
---

### cfx_getBlockByHash

Returns information about a block, identified by its hash.

#### Parameters

1. `DATA`, 32 Bytes - hash of a block.
2. `Boolean` - if `true`, it returns the full transaction objects. If `false`, only the hashes of the transactions are returned.

```json
params: [
    "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331",
    true
]
```

#### Returns

`Object` - A block object, or `null` when no block was found:

* `adaptive`: `Boolean` - `true` if the weight of the block is adaptive under the GHAST rule.
* `blame`: `QUANTITY` - if 0, then this block does not blame any blocks on its parent path. If it is `n > 0`, then this block blames its `n` predecessors on its parent path, e.g. when `n = 1`, then the block blames its parent but not its parent's parent.
* `deferredLogsBloomHash`: `DATA`, 32 Bytes - the hash of the logs bloom after deferred execution at the block's epoch (assuming it is the pivot block).
* `deferredReceiptsRoot`: `DATA`, 32 Bytes - the Merkle root of the receipts after deferred execution at the block's epoch (assuming it is the pivot block).
* `deferredStateRoot`: `DATA`, 32 Bytes - the hash of the state trie root triplet after deferred execution at the block's epoch (assuming it is the pivot block).
* `difficulty`: `QUANTITY` - the PoW difficulty of this block.
* `epochNumber`: `QUANTITY` - the number of the epoch containing this block in the node's view of the ledger. `null` when the epoch number is not determined (e.g. the block is not in the best block's past set).
* `gasLimit`: `QUANTITY` - the maximum gas allowed in this block.
* `gasUsed`: `QUANTITY` - the total gas used in this block. `null` when the block is pending.
* `hash`: `DATA`, 32 Bytes - hash of the block.
* `height`: `QUANTITY` - the height of the block.
* `miner`: `BASE32` - the address of the beneficiary to whom the mining rewards were given.
* `nonce`: `DATA`, 8 Bytes - hash of the generated proof-of-work.
* `parentHash`: `DATA`, 32 Bytes - hash of the parent block.
* `powQuality`: `DATA` - the PoW quality. `null` when the block is pending.
* `refereeHashes`: `Array` - array of referee block hashes.
* `size`: `QUANTITY` - the size of this block in bytes, excluding the block header.
* `timestamp`: `QUANTITY` - the unix timestamp for when the block was created.
* `transactions`: `Array` - array of transaction objects, or 32-byte transaction hashes, depending on the second parameter.
* `transactionsRoot`: `DATA`, 32 Bytes - the Merkle root of the transactions in this block.
* `custom`: `Array`- customized information. Note from v2.0 `custom`'s type has changed from array of `number array` to array of `hex string`.
* `blockNumber`: `QUANTITY` - the number of this block's total order in the tree-graph. `null` when the order is not determined. Added from `Conflux-rust v1.1.5`
* `posReference`: `DATA`, 32 Bytes - the hash of the PoS newest committed block. Added from `Conflux-rust v2.0.0`

Note that the fields `epochNumber` and `gasUsed` are provided by the node as they depend on the ledger. The rest of the fields are included in or derived from the block header directly.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getBlockByHash","params":["0x692373025c7315fa18b2d02139d08e987cd7016025920f59ada4969c24e44e06", false],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": {
    "adaptive": false,
    "blame": 0,
    "deferredLogsBloomHash": "0xd397b3b043d87fcd6fad1291ff0bfd16401c274896d8c63a923727f077b8e0b5",
    "deferredReceiptsRoot": "0x522717233b96e0a03d85f02f8127aa0e23ef2e0865c95bb7ac577ee3754875e4",
    "deferredStateRoot": "0xd449df4ba49f5ab02abf261e976197beecf93c5198a6f0b6bd2713d84115c4ec",
    "difficulty": "0xeee440",
    "epochNumber": "0x1394cb",
    "gasLimit": "0xb2d05e00",
    "gasUsed": "0xad5ae8",
    "hash": "0x692373025c7315fa18b2d02139d08e987cd7016025920f59ada4969c24e44e06",
    "height": "0x1394c9",
    "miner": "CFX:TYPE.USER:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG",
    "nonce": "0x329243b1063c6773",
    "parentHash": "0xd1c2ff79834f86eb4bc98e0e526de475144a13719afba6385cf62a4023c02ae3",
    "powQuality": "0x2ab0c3513",
    "refereeHashes": [
      "0xcc103077ede14825a5667bddad79482d7bbf1f1a658fed6894fa0e9287fc6be1"
    ],
    "size": "0x180",
    "timestamp": "0x5e8d32a1",
    "transactions": [
      "0xedfa5b9c38ba51e791cc72b8f75ff758533c8c38f426eddee3fd95d984dd59ff"
    ],
    "custom": ["0x12"],
    "transactionsRoot": "0xfb245dae4539ea49812e822adbffa9dd2ee9b3de8f3d9a7d186d351dcc9a6ed4",
    "posReference": "0xd1c2ff79834f86eb4bc98e0e526de475144a13719afba6385cf62a4023c02ae3",
  },
  "id": 1
}
```

---

### cfx_getBlockByEpochNumber

Returns information about a block, identified by its epoch number.

#### Parameters

1. `QUANTITY|TAG` - the epoch number, or the string `"latest_mined"`, `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter).
2. `Boolean` - if `true`, it returns the full transaction objects. If `false`, only the hashes of the transactions are returned

```json
params: [
    "latest_mined",
    true
]
```

#### Returns

See [cfx_getBlockByHash](#cfx_getblockbyhash).

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getBlockByEpochNumber","params":["latest_mined", false],"id":1}' -H "Content-Type: application/json" localhost:12539
```

Result see [cfx_getBlockByHash](#cfx_getblockbyhash).

---

### cfx_getBestBlockHash

Returns the hash of the best block.

#### Parameters

None.

#### Returns

`DATA`, 32 Bytes - hash of the best block.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getBestBlockHash","id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
    "jsonrpc" : "2.0",
    "result" : "0x7d54c03f4fe971d5c45d95dddc770a0ec8d5bd27d57c049ce8adc469269e35a4",
    "id" : 1
}
```

---


### cfx_epochNumber


Returns the epoch number corresponding to the given tag.

#### Parameters

1. `TAG` - (optional, default: `"latest_mined"`) String `"latest_mined"`, `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter).

#### Returns

`QUANTITY` - the integer epoch number corresponding to the given tag.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_epochNumber","params":["latest_mined"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
    "jsonrpc" : "2.0",
    "result" : "0x49",
    "id" : 1
}
```

---

### cfx_gasPrice

Returns the current price per gas in Drip.

#### Parameters

None.

#### Returns

`QUANTITY` - integer of the current gas price in Drip.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_gasPrice","id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
    "jsonrpc" : "2.0",
    "result" : "0x09184e72a000",
    "id" : 1
}
```

---

### cfx_getBlocksByEpoch

Returns the block hashes in the specified epoch.

#### Parameters

1. `QUANTITY|TAG` - the epoch number, or the string `"latest_mined"`, `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter).

#### Returns

`Array` - array of block hashes, sorted by their execution (topological) order. Note that the last one is the pivot hash.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getBlocksByEpoch","params":["0x11"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
    "jsonrpc": "2.0",
    "result": [
        "0x618e813ed93f1020bab13a1ab77e1550da6c89d9c69de837033512e91ac46bd0",
        "0x0f6ac81dcbc612e72e0019681bcec32254a34bd29a6bbab91e5e8dc37ecb64d5",
        "0xad3238c00456adfbf847d251b004c1e306fe637227bb1b9917d77bd5b207af68",
        "0x0f92c2e796be7b016d8b74c6c270fb1851e47fabaca3e464d407544286d6cd34",
        "0x5bcc2b8d2493797fcadf7b80228ef5b713eb9ff65f7cdd86562db629d0caf721",
        "0x7fcdc6fff506b19a2bd72cd3430310915f19a59b046759bb790ba4eeb95e9956",
        "0xf4f33ed08e1c625f4dde608eeb92991d77fff26122bab28a6b3a2037511dcc83",
        "0xa3762adc7f066d5cb62c683c2655be3bc3405ff1397f77d2e1dbeff2d8522e00",
        "0xba7588476a5ec7e0ade00f060180cadb7430fd1be48940414baac48c0d39556d",
        "0xe4dc4541d07118b598b2ec67bbdaa219eb1d649471fe7b5667a0001d83b1e9b6",
        "0x93a15564544c57d6cb68dbdf60133b318a94439e1f0a9ccb331b0f5a0aaf8049"
    ],
    "id": 1
}
```
---

### cfx_getBalance

Returns the balance of the given account, identified by its address.

#### Parameters

1. `BASE32` - address to check for balance.
2. `QUANTITY|TAG` - (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter)

```json
params: [
   "cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg",
   "latest_state"
]
```

#### Returns

`QUANTITY` - integer of the current balance in Drip.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getBalance","params":["cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg", "latest_state"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
    "jsonrpc": "2.0",
    "result": "0x0234c8a3397aab58", // 158972490234375000
    "id": 1
}
```

---

### cfx_getStakingBalance

Returns the stacking balance of the given account, identified by its address.

#### Parameters

1. `BASE32` - address to check for staking balance.
2. `QUANTITY|TAG` - (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter)

```json
params: [
   "cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg",
   "latest_state"
]
```

#### Returns

`QUANTITY` - integer of the current staking balance in Drip.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getStakingBalance","params":["cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg", "latest_state"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
    "jsonrpc": "2.0",
    "result": "0x0234c8a3397aab58", // 158972490234375000
    "id": 1
}
```

---


### cfx_getCollateralForStorage

Returns the size of the collateral storage of a given address, in bytes.

#### Parameters

1. `BASE32` - address to check for collateral storage.
2. `QUANTITY|TAG` - (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter)

```json
params: [
   "cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg",
   "latest_state"
]
```

#### Returns

`QUANTITY` - integer of the collateral storage in Byte.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getCollateralForStorage","params":["cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg", "latest_state"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
    "jsonrpc": "2.0",
    "result": "0x0234c8a8",
    "id": 1
}
```

---

### cfx_getAdmin

Returns the admin of the specified contract.

#### Parameters

1. `BASE32` - address of the contract.
2. `QUANTITY|TAG` - (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter)

```json
params: [
    "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
    "latest_state"
]
```

#### Returns

`BASE32` - address of admin, or `null` if the contract does not exist.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getAdmin","params":["cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": "CFX:TYPE.USER:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG",
  "id": 1
}
```

---

### cfx_getCode

Returns the code of the specified contract. If contract not exist will return `0x0`

#### Parameters

1. `BASE32` - address of the contract.
2. `QUANTITY|TAG` - (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter)

```json
params: [
    "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
    "latest_state"
]
```

#### Returns

`DATA` - byte code of the contract, or `0x` if the account has no code.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getCode","params":["cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp","latest_state"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": "0x6080604052600436106100705760003560e01c80638da5cb5b1161004e5780638da5cb5b14610146578063a035b1fe14610",
  "id": 1
}
```

---

### cfx_getStorageAt

Returns storage entries from a given contract.

#### Parameters

1. `BASE32` - address of the contract.
2. `QUANTITY` - a storage position (see [here](https://solidity.readthedocs.io/en/v0.7.1/internals/layout_in_storage.html) for more info).
3. `QUANTITY|TAG` - (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter)

```json
params: [
    "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
    "0x100",
    "latest_state"
]
```

#### Returns

`DATA` - 32 Bytes - the contents of the storage position, or `null` if the contract does not exist.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getStorageAt","params":["cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp","0x100","latest_state"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000001dbda5dd2e952914bc74a802510d0fa59f9d7636",
  "id": 1
}
```

---

### cfx_getStorageRoot

Returns the storage root of a given contract.

#### Parameters

1. `BASE32` - address of the contract.
2. `QUANTITY|TAG` - (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter)

```json
params: [
    "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
    "latest_state"
]
```

#### Returns

`Object` - A storage root object, or `null` if the contract does not exist:

* `delta`: `DATA`, 32 Bytes - the storage root in the delta trie, or the string `"TOMBSTONE"`, or `null`.
* `intermediate`: `DATA`, 32 Bytes - storage root in the intermediate trie, or the string `"TOMBSTONE"`, or `null`.
* `snapshot`: `DATA`, 32 Bytes - storage root in the snapshot, or the string `"TOMBSTONE"`, or `null`.

If all three of these fields match for two invocations of this RPC, the contract's storage is guaranteed to be identical.
If they do not match, storage has likely changed (or the system transitioned into a new era).

<!---
TODO: Add links to snapshot/checkpoint documentation.
-->

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getStorageRoot","params":["cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp","latest_state"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": {
    "delta": "0x0240a5a3486ac1cee71db22b8e12f1bb6ac9f207ecd81b06031c407663c20a94",
    "intermediate": "0x314a41f277b678a1dc811a1fc0393b6d30c35e900cb27762ec9e9042bfdbdd49",
    "snapshot": "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
  },
  "id" :1
}
```

---

### cfx_getSponsorInfo

Returns the sponsor info of a given contract.

#### Parameters

1. `BASE32` - address of the contract.
2. `QUANTITY|TAG` - (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter)

```json
params: [
    "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
    "latest_state"
]
```

#### Returns

`Object` - A sponsor info object. If the contract doesn't have a sponsor, then all fields in the object returned will be `0`:

   * `sponsorBalanceForCollateral`: `QUANTITY` - the sponsored balance for storage.
   * `sponsorBalanceForGas`: `QUANTITY` - the sponsored balance for gas.
   * `sponsorGasBound`: `QUANTITY` - the max gas that could be sponsored for one transaction.
   * `sponsorForCollateral`: `BASE32` - the address of the storage sponsor.
   * `sponsorForGas`: `BASE32` - the address of the gas sponsor.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getSponsorInfo","params":["cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": {
    "sponsorBalanceForCollateral": "0x0",
    "sponsorBalanceForGas": "0x0",
    "sponsorForCollateral": "CFX:TYPE.NULL:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0SFBNJM2",
    "sponsorForGas": "CFX:TYPE.NULL:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0SFBNJM2",
    "sponsorGasBound": "0x0"
  },
  "id": 1
}
```

---
### cfx_getNextNonce

Returns the next nonce that should be used by the given account when sending a transaction.

#### Parameters

1. `BASE32` - address of the account.
2. `QUANTITY|TAG` - (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter)

```json
params: [
    "cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg",
    "latest_state"
]
```

#### Returns

`QUANTITY` - integer of the next nonce that should be used by the given address.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getNextNonce","params":["cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg", "latest_state"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
    "jsonrpc" : "2.0",
    "result" : "0xe3269d",
    "id" : 1
}
```

---
### cfx_sendRawTransaction

Sends a signed transaction into the network for processing.

#### Parameters

1. `DATA`, the signed transaction data.

```json
params: [
    "0xf86eea8201a28207d0830f4240943838197c0c88d0d5b13b67e1bfdbdc132d4842e389056bc75e2d631000008080a017b8b26f473820475edc49bd153660e56b973b5985bbdb2828fceacb4c91f389a03452f9a69da34ef35acc9c554d7b1d63e9041141674b42c3abb1b57b9f83a2d3"
]
```

#### Returns

`DATA`, 32 Bytes - the transaction hash.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_sendRawTransaction","params":[{see above}],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
    "jsonrpc": "2.0",
    "result": "0xf5338a6cb85d10acc9108869f94fe322b2dfa2715d16d264676c91f6a0404b61",
    "id": 1
}
```

---

### cfx_call

Virtually calls a contract, returns the output data. The transaction will not be added to the blockchain.

#### Parameters

1. `Object` - a call request object:
    * `from`: `BASE32` - (optional, default: random address) address of sender.
    * `to`: `BASE32` - (optional, default: `null` for contract creation) address of receiver.
    * `gasPrice`: `QUANTITY` - (optional, default: `0`) gas price provided by the sender in Drip.
    * `gas`: `QUANTITY` - (optional, default: `500000000`) gas provided by the sender.
    * `value`: `QUANTITY` - (optional, default: `0`) value transferred in Drip.
    * `data`: `DATA` - (optional, default: `0x`) the data send along with the transaction.
    * `nonce`: `QUANTITY` - (optional, default: `0`) the number of transactions made by the sender prior to this one.

2. `QUANTITY|TAG` - (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter)

```json
params: [
    {
        "from": "cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg",
        "to": "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
        "data": "0xa6f2ae3a",
        "gasPrice": "0x2540be400",
        "nonce": "0x0"
    },
    "latest_state"
]
```

#### Returns

`DATA`, Bytes - the output data, or an execution error.

##### Example

```json
// Request
curl -X POST --data '{"method":"cfx_call","id":1,"jsonrpc":"2.0","params":[{"from":"cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg","to":"cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp","data":"0xa6f2ae3a","gasPrice":"0x2540be400","nonce":"0x0"}]}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": "0x",
  "id": 1
}
```

---

### cfx_estimateGasAndCollateral

Virtually executes a transaction, returns an estimate for the size of storage collateralized and the gas used by the transaction. The transaction will not be added to the blockchain.

#### Parameters

See [cfx_call](#cfx_call).

```json
params: [
    {
        "from": "cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg",
        "to": "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
        "data": "0x",
        "gasPrice": "0x2540be400",
        "nonce": "0x0"
    },
    "latest_state"
]
```

#### Returns

`Object` - an estimate result object:
   * `gasLimit`: `QUANTITY` - the recommended gas_limit.
   * `gasUsed`: `QUANTITY` - gas used during execution.
   * `storageCollateralized`: `QUANTITY` - size of storage collateralized, in bytes.

##### Example

```json
// Request
curl -X POST --data '{"method":"cfx_estimateGasAndCollateral","id":1,"jsonrpc":"2.0","params":[{"from":"cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg","to":"cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp","data":"0x","gasPrice":"0x2540be400","nonce":"0x0"}]}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": {
    "gasLimit": "0x6d60",
    "gasUsed": "0x5208",
    "storageCollateralized": "0x80"
  },
  "id": 1
}
```

---

### cfx_getLogs

Returns logs matching the filter provided.

#### Parameters

1. `Object` - A log filter object:
    * `fromEpoch`: `QUANTITY|TAG` - (optional, default: `"latest_checkpoint"`) the epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter). Search will be applied from this epoch number.
    * `toEpoch`: `QUANTITY|TAG` - (optional, default: `"latest_state"`) the epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter). Search will be applied up until (and including) this epoch number.
    * `blockHashes`: `Array` of `DATA` - (optional, default: `null`) Array of up to 128 block hashes that the search will be applied to. This will override from/to epoch fields if it's not `null`.
    * `address`: `Array` of `BASE32` - (optional, default: `null`) Search contract addresses. If `null`, match all. If specified, the log must be produced by one of these contracts.
    * `topics`: `Array` - (optional, default: `null`) 32-byte earch topics. Logs can have `4` topics: the event signature and up to `3` indexed event arguments. The elements of `topics` match the corresponding log topics. Example: `["0xA", null, ["0xB", "0xC"], null]` matches logs with `"0xA"` as the 1st topic AND (`"0xB"` OR `"0xC"`) as the 3rd topic. If `null`, match all.
    * `limit`: `QUANTITY` - (optional, default: `null`) If `null` return all logs, otherwise should only return the **last** `limit` logs. Note: if the node has `get_logs_filter_max_limit` set, it will override `limit` if it is `null` or greater than the preset value.
    * `offset`: `QUANTITY` - If specified, the response will skip the `last` offset logs. For instance, with 10 matching logs (0..9) and offset=0x1, limit=0x5, the response will contain logs 4..8. Note: Even if you specify offset, the corresponding logs still need to be processed by the node, so a filter with offset=10000, limit=10 has about the same performance as a filter with offset=0, limit=100010

```json
params: [
    {
        "fromEpoch": "0x873e12",
        "toEpoch": "0x87431b",
        "address": "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
        "topics": [["0x233e08777131763a85257b15eafc9f96ef08f259653d9944301ff924b3917cf5", "0xd7fb65c06987247ab480a21659e16bdf0b5862a19869ec264075d50ab3525435"], null, "0x0000000000000000000000001d618f9b63eca8faf90faa9cb799bf4bfe616c26"],
        "limit": "0x2",
        "offset": "0x1"
    }
]
```

#### Returns

`Array` - array of log objects corresponding to the matching logs:

   * `address`: `BASE32` - address of the contract that emitted the log.
   * `topics`: `Array` of `DATA` - array of 32-byte event topics.
   * `data`: `DATA` - data of log.
   * `blockHash`: `DATA` - 32 Bytes - hash of the block containing the log.
   * `epochNumber`: `QUANTITY` - epoch number of the block containing the log.
   * `transactionHash`: `DATA`, 32 Bytes - hash of the transaction that created the log.
   * `transactionIndex`: `QUANTITY` - transaction index in the block.
   * `logIndex`: `QUANTITY` - log index in block.
   * `transactionLogIndex`: `QUANTITY` - log index in transaction.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getLogs","params":[{ "fromEpoch": "0x873e12", "toEpoch": "0x87431b", "address": "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp", "topics": [["0x233e08777131763a85257b15eafc9f96ef08f259653d9944301ff924b3917cf5", "0xd7fb65c06987247ab480a21659e16bdf0b5862a19869ec264075d50ab3525435"], null, "0x0000000000000000000000001d618f9b63eca8faf90faa9cb799bf4bfe616c26"], "limit": "0x2" }],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": [{
    "address": "CFX:TYPE.CONTRACT:ACC7UAWF5UBTNMEZVHU9DHC6SGHEA0403Y2DGPYFJP",
    "blockHash": "0x44531df7bad30d39dfaf844e7c7eb44628467e9bd8474d313397c664a1b9fd14",
    "data": "0x0000000000000000000000001d618f9b63eca8faf90faa9cb799bf4bfe616c26",
    "epochNumber": "0x873e12",
    "logIndex": "0x0",
    "topics": [
        "0x233e08777131763a85257b15eafc9f96ef08f259653d9944301ff924b3917cf5",
        "0x000000000000000000000000873c4bd4d847bcf7dc066bf4a7cd31dcf182258c",
        "0x0000000000000000000000001d618f9b63eca8faf90faa9cb799bf4bfe616c26",
    ],
    "transactionHash": "0x7c2536d287c9ac5445f30ccfa067d1f4a2d68d6843f4ba25a5e6d20349367eb3",
    "transactionIndex": "0x0",
    "transactionLogIndex": "0x0"
  }, {
    "address": "CFX:TYPE.CONTRACT:ACC7UAWF5UBTNMEZVHU9DHC6SGHEA0403Y2DGPYFJP",
    "blockHash": "0x82da9c6ef8a93036ac75b176230dd88c8fe1727104ab01878b54180f0fa25638",
    "data": "0x00000000000000000000000019a3224214fe29107d84af9baa02118b614e46d5",
    "epochNumber": "0x87431b",
    "logIndex": "0x0",
    "topics": [
        "0xd7fb65c06987247ab480a21659e16bdf0b5862a19869ec264075d50ab3525435",
        "0x000000000000000000000000873c4bd4d847bcf7dc066bf4a7cd31dcf182258c",
        "0x0000000000000000000000001d618f9b63eca8faf90faa9cb799bf4bfe616c26",
    ],
    "transactionHash": "0xef11f262e31bc7ead1d0880b7c90855eb8f0ef7c26a198e805f2b9f1e9bc938b",
    "transactionIndex": "0x0",
    "transactionLogIndex": "0x0"
  }],
  "id": 1
}
```
---

### cfx_getTransactionReceipt

Returns a transaction receipt, identified by the corresponding transaction hash.

#### Parameters

1. DATA, 32 Bytes - hash of a transaction

```json
params: [
    "0x53fe995edeec7d241791ff32635244e94ecfd722c9fe90f34ddf59082d814514",
]
```

#### Returns

`Object` - a transaction receipt object, or `null` when no transaction was found or the transaction was not executed yet:

* `transactionHash`: `DATA`, 32 Bytes - hash of the given transaction.
* `index`: `QUANTITY` - transaction index within the block.
* `blockHash`: `DATA`, 32 Bytes - hash of the block where this transaction was in and got executed.
* `epochNumber`: `QUANTITY` - epoch number of the block where this transaction was in and got executed.
* `from`: `BASE32` - address of the sender.
* `to`: `BASE32` - address of the receiver. `null` when it is a contract deployment transaction.
* `gasUsed`: `QUANTITY` - gas used for executing the transaction.
* `gasFee`: `QUANTITY` - gas charged to the sender's account. If the provided gas (gas limit) is larger than the gas used, at most 1/4 of it is refunded.
* `gasCoveredBySponsor`: `Boolean`, true if this transaction's gas fee was covered by the sponsor.
* `storageCollateralized`: `QUANTITY`, the amount of storage collateral this transaction required.
* `storageCoveredBySponsor`: `Boolean`, true if this transaction's storage collateral was covered by the sponsor.
* `storageReleased`: `Array`, array of storage change objects, each specifying an address and the corresponding amount of storage collateral released, e.g., `[{ 'address': 'CFX:TYPE.USER:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG', 'collaterals': '0x280' }]`
* `contractCreated`: `BASE32` - address of the contract created. `null` when it is not a contract deployment transaction.
* `stateRoot`: `DATA`, 32 Bytes - hash of the state root after the execution of the corresponding block. `0` if the state root is not available.
* `outcomeStatus`: `QUANTITY` - the outcome status code. `0x0` means success. `0x1` means failed. `0x2` means skipped
* `logsBloom`: `DATA`, 256 Bytes - bloom filter for light clients to quickly retrieve related logs.
* `logs`: `Array` - array of log objects that this transaction generated, see [cfx_getLogs](#cfx_getlogs).
* `txExecErrorMsg`: `String`, tx exec fail message, if transaction exec success this will be null.


##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getTransactionReceipt","params":["0x53fe995edeec7d241791ff32635244e94ecfd722c9fe90f34ddf59082d814514"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": {
    "blockHash": "0xbb1eea3c8a574dc19f7d8311a2096e23a39f12e649a20766544f2df67aac0bed",
    "contractCreated": null,
    "epochNumber": "0x87431b",
    "from": "CFX:TYPE.USER:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG",
    "gasCoveredBySponsor": true,
    "gasFee": "0x108ca",
    "gasUsed": "0x8465",
    "index": "0x0",
    "logs": [{
      "address": "CFX:TYPE.CONTRACT:ACC7UAWF5UBTNMEZVHU9DHC6SGHEA0403Y2DGPYFJP",
      "data": "0x00000000000000000000000019a3224214fe29107d84af9baa02118b614e46d5",
      "topics": ["0x233e08777131763a85257b15eafc9f96ef08f259653d9944301ff924b3917cf5"]
    }],
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000080000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000",
    "outcomeStatus": "0x0",
    "stateRoot": "0x1bc37c63c03d7e7066f9427f69e515988d19ebb26998087d75b50d2235e55ee7",
    "storageCollateralized": "0x40",
    "storageCoveredBySponsor": true,
    "storageReleased": [{
      "address": "CFX:TYPE.USER:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG",
      "collaterals": "0x40"
    }],
    "to": "CFX:TYPE.CONTRACT:ACC7UAWF5UBTNMEZVHU9DHC6SGHEA0403Y2DGPYFJP",
    "transactionHash": "0x53fe995edeec7d241791ff32635244e94ecfd722c9fe90f34ddf59082d814514",
    "txExecErrorMsg": null
  },
  "id": 1
}
```

---

### cfx_getAccount

Returns an account, identified by its address.

#### Parameters

1. `BASE32` - address of the account.
2. `QUANTITY|TAG` - (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter)

```json
params: [
   "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
   "latest_state"
]
```

#### Returns

`Object` - the state of the given account:

* `address`: `BASE32` - address of the account.
* `balance`: `QUANTITY` - the balance of the account.
* `nonce`: `QUANTITY` - the nonce of the account's next transaction.
* `codeHash`: `DATA` - the code hash of the account.
* `stakingBalance`: `QUANTITY` - the staking balance of the account.
* `collateralForStorage`: `QUANTITY` - the collateral storage of the account.
* `accumulatedInterestReturn`: `QUANTITY` - accumulated interest return of the account.
* `admin`: `BASE32` - admin of the account.

##### Example

```json
// Request
curl --data '{"jsonrpc":"2.0","method":"cfx_getAccount","params":["cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp", "latest_state"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": {
    "accumulatedInterestReturn": "0x0",
    "admin": "CFX:TYPE.USER:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG",
    "balance": "0x0",
    "codeHash": "0x45fed62dd2b7c5ed76a63628ddc811e69bb5770cf31dd55647ca219aaee5434f",
    "collateralForStorage": "0x0",
    "nonce": "0x1",
    "stakingBalance": "0x0"
  },
  "id": 1
}
```

---


### cfx_getInterestRate

Returns the interest rate at the given epoch.

#### Parameters

1. `QUANTITY|TAG` - (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter)

```json
params: [
   "latest_state"
]
```

#### Returns

`QUANTITY` - the interest rate at the given epoch.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getInterestRate","params":["latest_state"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": "0x24b675dc000",
  "id": 1
}
```

---

### cfx_getAccumulateInterestRate

Returns the accumulate interest rate at the given epoch.

#### Parameters

1. `QUANTITY|TAG` - (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter)

```json
params: [
   "latest_state"
]
```

#### Returns

`QUANTITY` - the accumulate interest rate at the given epoch.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getAccumulateInterestRate","params":["latest_state"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": "0x3c35a9e557dc9ef76719db0226f",
  "id": 1
}
```
---

### cfx_checkBalanceAgainstTransaction

Check if a user's balance is enough to send a transaction with the specified gas and storage limits to the specified contract. The balance is enough if the user can cover the up-front payment of both execution and storage, or if these costs are sponsored by the contract.

#### Parameters

1. `BASE32`, account address
2. `BASE32`, contract address
3. `QUANTITY`, gas limit
4. `QUANTITY`, gas price
5. `QUANTITY`, storage limit
6. `QUANTITY|TAG`, (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter).

```json
params: [
  "cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg",
  "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
  "0x5208",
  "0x2540be400",
  "0x0",
  "0xbf63"
]
```

#### Returns

* `isBalanceEnough`: `Boolean` - indicate balance is enough for gas fee and collateral storage
* `willPayCollateral`: `Boolean` - false if the transaction is eligible for storage collateral sponsorship, true otherwise.
* `willPayTxFee`: `Boolean` - false if the transaction is eligible for gas sponsorship, true otherwise.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_checkBalanceAgainstTransaction","params":["cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg", "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp", "0x5208", "0x2540be400", "0x0", "0xbf63"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": {
    "isBalanceEnough": true,
    "willPayCollateral": true,
    "willPayTxFee": true
  },
  "id": 1
}
```
---

### cfx_getSkippedBlocksByEpoch

Returns the list of non-executed blocks in an epoch. By default, Conflux only executes the last 200 blocks in each epoch (note that under normal circumstances, epochs should be much smaller).

#### Parameters

1. `QUANTITY|TAG` - integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter)

```json
params: [
  "0xba28"
]
```

#### Returns

* `Array` of block hashes

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getSkippedBlocksByEpoch","params":["0xba28"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": [],
  "id": 1
}
```

---

### cfx_getConfirmationRiskByHash

Returns the confirmation risk of a given block, identified by its hash.

#### Parameters

1. `DATA`, 32 Bytes - the block hash.

```json
params: [
  "0x3912275cf09f8982a69735a876c14584dae95078762090c5d32fdf0dbec0647c"
]
```

#### Returns

* `QUANTITY`, the integer confirmation risk, or `null` if the block does not exist.

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getConfirmationRiskByHash","params":["0x3912275cf09f8982a69735a876c14584dae95078762090c5d32fdf0dbec0647c"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": "0x2af31dc4611873bf3f70834acdae9f0f4f534f5d60585a5f1c1a3ced1b",
  "id": 1
}
```

---

### cfx_getStatus

Returns the node status.

#### Parameters

None.

#### Returns

* `bestHash`: `DATA` - hash of the latest epoch's pivot block
* `blockNumber`: `QUANTITY` - total block number
* `chainId`: `QUANTITY` - chainId
* `networkId`: `QUANTITY` - networkId
* `ethereumSpaceChainId`: `QUANTITY` - eSpace's chainId (Added from v2.0)
* `epochNumber`: `QUANTITY` - latest epoch number
* `latestCheckpoint`: `QUANTITY` - latest checkpoint epoch number
* `latestConfirmed`: `QUANTITY` - latest confirmed epoch number
* `latestFinalized`: `QUANTITY` - latest finallized epoch number (Added from v2.0)
* `latestState`: `QUANTITY` - latest state epoch number
* `pendingTxNumber`: `QUANTITY` - current pending transaction count

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getStatus","id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": {
    "bestHash": "0xe4bf02ad95ad5452c7676d3dfc2e57fde2a70806c2e68231c58c77cdda5b7c6c",
    "chainId": "0x1",
    "networkId": "0x1",
    "blockNumber": "0x1a80325",
    "epochNumber": "0xaf28ab",
    "latestCheckpoint": "0xada520",
    "latestConfirmed": "0xaf2885",
    "latestState": "0xaf28a7",
    "latestFinalized": "0x2a420c",
    "ethereumSpaceChainId": "0x22b9",
    "pendingTxNumber": "0x0"
  },
  "id": 1
}
```

---

### cfx_clientVersion

Returns the conflux-rust version.

#### Parameters

None.

#### Returns

* `STRING` - the client version

##### Example

```json
//Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_clientVersion","id":1}' -H "Content-Type: application/json" localhost:12539

//Result
{
  "jsonrpc": "2.0",
  "result": "conflux-rust-0.6.3",
  "id": 1
}
```
---

### cfx_getBlockRewardInfo

Returns the reward info for all executed blocks in the specified epoch.

#### Parameters

1. `QUANTITY|TAG` - integer epoch number, or the string `"latest_checkpoint"`, see the [epoch number parameter](#the-epoch-number-parameter)

```json
params: [
  "0x5ee248"
]
```

Please note that reward calculation is delayed so it might not be available for the latest few epochs (including `"latest_state"`).

#### Returns

`Array` - array of reward info objects

* `blockHash`: `DATA` - the block hash
* `author`: `BASE32` - the address of block miner
* `totalReward`: `QUANTITY` - total reward of the block including base reward, tx fee, staking reward
* `baseReward`: `QUANTITY` - base reward
* `txFee`: `QUANTITY` - tx fee

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getBlockRewardInfo","params":["0x5ee248"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": [
    {
      "author": "CFX:TYPE.USER:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG",
      "baseReward": "0x9ccda666a9516000",
      "blockHash": "0xa4a409ea5f1d31e787cd5e20a3eec1fd43851d29608d2de98fb127f518e1a211",
      "totalReward": "0x9ccdca639a29ece1",
      "txFee": "0x0"
    }
  ],
  "id": 1
}
```

---

### cfx_getBlockByHashWithPivotAssumption

Returns the requested block if the provided pivot hash is correct, returns an error otherwise.

#### Parameters

* `DATA`, block hash
* `DATA`, assumed pivot hash
* `QUANTITY`, integer epoch number.

```json
params: [
   "0x3912275cf09f8982a69735a876c14584dae95078762090c5d32fdf0dbec0647c",
   "0x3912275cf09f8982a69735a876c14584dae95078762090c5d32fdf0dbec0647c",
   "0xba28"
]
```

#### Returns
See [cfx_getBlockByHash](#cfx_getblockbyhash).

##### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getBlockByHashWithPivotAssumption","params":["0x3912275cf09f8982a69735a876c14584dae95078762090c5d32fdf0dbec0647c", "0x3912275cf09f8982a69735a876c14584dae95078762090c5d32fdf0dbec0647c", "0xba28"],"id":1}' -H "Content-Type: application/json" localhost:12539
```

Result see [cfx_getBlockByHash](#cfx_getblockbyhash).

---

### cfx_getDepositList

Returns the deposit list of the given account, identified by its address.

#### Parameters

1. `BASE32` - address of the account.
2. `QUANTITY|TAG` - (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter)

```json
params: [
   "cfx:aan02vpwvz8crpa1n10j17ufceefptdc2yzkagxk5u",
   "latest_state"
]
```

#### Returns

`Array` - array of deposit info objects:

* `accumulatedInterestRate`: `QUANTITY` - the accumulated interest rate at the time of the deposit.
* `amount`: `QUANTITY` - the number of tokens deposited.
* `depositTime`: `QUANTITY` - the time of the deposit.

##### Example

```json
// Request
curl --data '{"jsonrpc":"2.0","method":"cfx_getDepositList","params":["cfx:aan02vpwvz8crpa1n10j17ufceefptdc2yzkagxk5u", "latest_state"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": [{
    "accumulatedInterestRate": "0x3c4517ac75006c913c52c2402e8",
    "amount": "0x8ac7230489e80000",
    "depositTime": 3135949
  }, {
    "accumulatedInterestRate": "0x3c451870afdac66f40804d95742",
    "amount": "0x8ac7230489e80000",
    "depositTime": 3136255
  }],
  "id": 1
}
```

---

### cfx_getVoteList

Returns the vote list of the given account, identified by its address.

#### Parameters

1. `BASE32` - address of the account.
2. `QUANTITY|TAG` - (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter)

```json
params: [
   "cfx:aan02vpwvz8crpa1n10j17ufceefptdc2yzkagxk5u",
   "latest_state"
]
```

#### Returns

`Array` - array of vote info objects:

* `amount`: `QUANTITY` - the number of tokens locked.
* `unlockBlockNumber`: `QUANTITY` - the block number at which the locked tokens are released.

For getting the current block number, please refer to [conflux-rust#1973](https://github.com/Conflux-Chain/conflux-rust/issues/1973).

##### Example

```json
// Request
curl --data '{"jsonrpc":"2.0","method":"cfx_getVoteList","params":["cfx:aan02vpwvz8crpa1n10j17ufceefptdc2yzkagxk5u", "latest_state"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": [{
    "amount": "0x8ac7230489e80000",
    "unlockBlockNumber": 1000000000000
  }],
  "id": 1
}
```

### cfx_getSupplyInfo

Returns summary supply info of the entire chain.

#### Parameters

None.

#### Returns

`Object` - Object include the supply summary info.

* `totalIssued`: `QUANTITY` - Amount of total issued CFX in Drip
* `totalCollateral`: `QUANTITY` - Amount of total storage collateraled CFX in Drip
* `totalStaking`: `QUANTITY` - Amount of total staking CFX in Drip
* `totalCirculating`: `QUANTITY` - Amount: `TotalIssued` - `FourYearUnlock` - `TwoYearUnlock`
* `totalEspaceTokens`: `QUANTITY` - Amount of total eSpace CFX in Drip (Added in Conflux-Rust v2.0.1)

#### Example

```json
// Request
curl --data '{"jsonrpc":"2.0","method":"cfx_getSupplyInfo","params":[],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": {
    "totalCirculating": "0x1ed09beade67915041ca95cb0ea3b",
    "totalCollateral": "0x2b95bdcc39b610000",
    "totalIssued": "0x1ed09ced5cda57e32eec33328ea3b",
    "totalStaking": "0x56bc75e2d63100000"
  },
  "id": "15922956697249514502"
}
```

### cfx_getAccountPendingInfo

Returns transaction pool pending info of one account

#### Parameters

1. `BASE32` - address of the account.

```json
params: [
    "cfx:aan02vpwvz8crpa1n10j17ufceefptdc2yzkagxk5u"
]
```

#### Returns

`Object` - Object include account's pending info.

* `localNonce`: `QUANTITY` - User's transaction pool nonce that can be used for next transaction.
* `pendingNonce`: `QUANTITY` - User's current pending nonce
* `pendingCount`: `QUANTITY` - Count of pending transaction
* `nextPendingTx`: `DATA` - Hash of next pending transaction

#### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getAccountPendingInfo","params":["cfx:aan02vpwvz8crpa1n10j17ufceefptdc2yzkagxk5u"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Response
{
    "jsonrpc": "2.0",
    "result": {
        "localNonce": "0x1ed",
        "nextPendingTx": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "pendingCount": "0x0",
        "pendingNonce": "0x0"
    },
    "id": "15922956697249514502"
}
```

### cfx_getAccountPendingTransactions

Returns pending transactions in pool of one account

#### Parameters

1. `BASE32` - address of the account.
2. [`QUANTITY`] - Optional start nonce to return
3. [`QUANTITY`] - Optional `limit` of pending transactions to return

```json
params: [
    "cfx:aan02vpwvz8crpa1n10j17ufceefptdc2yzkagxk5u"
]
```

#### Returns

`Object` - Object include account's pending transaction info.

* `firstTxStatus`: `OBJECT` - An object with only one field `pending`, it's value is the first pending transaction's status. Only have three case `futureNonce`, `notEnoughCash`. Or just a string `ready`
* `pendingCount`: `QUANTITY` - Count of pending transactions
* `pendingTransactions`: `ARRAY` - Array of pending [transaction](#cfx_gettransactionbyhash)

#### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getAccountPendingTransactions","params":["cfx:aan02vpwvz8crpa1n10j17ufceefptdc2yzkagxk5u"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Response
{
    "jsonrpc": "2.0",
    "result": {
        "firstTxStatus": {
            "pending": "futureNonce"
        },
        "pendingCount": "0x1",
        // Reference transaction example
        "pendingTransactions": [
            {
                "...": "..."
            }
        ]
    },
    "id": "15922956697249514502"
}
```

### cfx_getBlockByBlockNumber

Returns information about a block, identified by its block number (block's tree-graph order number).

#### Added at

`Conflux-rust v1.1.5`

#### Parameters

1. `QUANTITY` - the block number.
2. `Boolean` - if `true`, it returns the full transaction objects. If `false`, only the hashes of the transactions are returned

```json
params: [
    "0x1000",
    true
]
```

#### Returns

See [cfx_getBlockByHash](#cfx_getblockbyhash).

#### Example

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getBlockByBlockNumber","params":["0x1000", false],"id":1}' -H "Content-Type: application/json" localhost:12539
```

Result see [cfx_getBlockByHash](#cfx_getblockbyhash).

---

### cfx_getPoSEconomics

Returns PoS economics summary info.

#### Added at

`Conflux-rust v2.0.0`

#### Parameters

1. [`QUANTITY`] - (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter)

#### Returns

* `distributablePosInterest`: `QUANTITY` Total distributable PoS interest (Unit is Drip)
* `lastDistributeBlock`: `QUANTITY` Last block that distributable PoS interest
* `totalPosStakingTokens`: `QUANTITY` Total tokens staked in PoS (Unit is Drip)

#### Example

```shell
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw ' {
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "method": "cfx_getPoSEconomics",
    "params": []
  }'
```

```json
{
    "jsonrpc": "2.0",
    "result": {
        "distributablePosInterest": "0x6fd7fd91140603a45caff2",
        "lastDistributeBlock": "0x100",
        "totalPosStakingTokens": "0x29cbb85e5a6e849c00000"
    },
    "id": "15922956697249514502"
}
```

### cfx_getPoSRewardByEpoch

Get rewards information of a PoS epoch by it's correspond PoW epoch number. Only PoW epoch happen's at PoS epoch end will have rewards information. Others will return null.

#### Added at

`Conflux-rust v2.0.0`

#### Parameters

1. `QUANTITY`: PoW epoch number

```json
params: [
  "0x4a"
]
```

#### Returns

* `accountRewards`: `Array` of [AccountReward](#accountreward)
* `powEpochHash`: `HASH` - the hash value of the PoW block when the rewards are made

##### AccountReward

* `posAddress`: `ADDRESS` - PoS account address
* `powAddress`: `BASE32` - PoW account address
* `reward`: `QUANTITY` - the number of rewards, in the unit of Drip

##### Example

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "cfx_getPoSRewardByEpoch",
    "params": ["0x4a"]
}'
```

Response

```json
{
    "jsonrpc": "2.0",
    "result": {
        "accountRewards": [
            {
                "posAddress": "0x459b19e745eb410c3696ff1ed15f9de9bb46aa5fefc27b0b6e8b8d7aaadfe8c0",
                "powAddress": "NET8888:TYPE.USER:AAKSNR7XKKFFAM17MNESKAGU076T8FAG3YJ6PTHN16",
                "reward": "0x14931d20aa21eae3e6f"
            },
            {
                "posAddress": "0x046ca462890f25ed9394ca9f92c979ff48e1738a81822ecab96d83813c1a433c",
                "powAddress": "NET8888:TYPE.USER:AAPXUPNXG96GZ4077DAV0151K7P8498N9A6DMAWK1N",
                "reward": "0x2d49549e023888cd390"
            }
        ],
        "powEpochHash": "0x361cb0f19fd13c30da467d20a84ef01aabcd55e9812c5e2fd0721ea11a52e9f1"
    },
    "id": 1
}
```

### cfx_getParamsFromVote

Returns DAO vote params info

#### Added at

`Conflux-rust v2.1.0`

#### Parameters

1. `QUANTITY`: (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-epoch-number-parameter)

```json
params: [
  "0x4a"
]
```

#### Returns

* `powBaseReward`: `QUANTITY` - The PoW base reward amount
* `interestRate`: `QUANTITY` - The PoS interest rate

##### Example

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "cfx_getParamsFromVote",
    "params": ["0x4a"]
}'
```

Response

```json
{
    "jsonrpc": "2.0",
    "result": {
        "powBaseReward": "0x1",
        "interestRate": "0x2",
    },
    "id": 1
}
```

## Related Topics

* [JSON-RPC specification](https://github.com/conflux-chain/jsonrpc-spec)
* [Nodes and clients](https://github.com/conflux-chain/conflux-rust)
* [JavaScript APIs](https://github.com/conflux-chain/js-conflux-sdk)
* [Backend APIs](https://github.com/conflux-chain/go-conflux-sdk)