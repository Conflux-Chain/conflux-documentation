---
id: cfx-namespace
sidebar_position: 1
title: cfx 命名空间
description: Conflux的核心JSON-RPC API
keywords:
  - conflux
  - json-rpc
  - sdk
displayed_sidebar: coreSidebar
---

## JSON-RPC规范说明

在[GitHub](https://github.com/Conflux-Chain/jsonrpc-spec)上有一个cfx命名空间的[**JSON-RPC API**](https://open-rpc.org/)规范。 你可以在 [open-rpc 测试平台](https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/Conflux-Chain/jsonrpc-spec/main/src/cfx/cfx.json&uiSchema%5BappBar%5D%5Bui:splitView%5D=false&uiSchema%5BappBar%5D%5Bui:input%5D=false&uiSchema%5BappBar%5D)中查看它。 查看 [Conflux-Rust RPC 的更新日志](https://github.com/Conflux-Chain/conflux-rust/blob/master/changelogs/JSONRPC.md) 以了解更多。

## 惯例

### 十六进制值编码

有两种关键的数据类型通过 JSON 传递：未格式化的字节数组和数量。 二者都使用十六进制编码传递，但对格式化有不同的要求。

#### 数值

当编码**数值**（整数，数字）时：使用最紧凑的表示方式编码为十六进制，并加上`“0x”`前缀。 零应表示为`"0x0"`。 例如：

* `0x41`（十进制的 65）
* `0x400`（十进制的 1024）
* **错误样例**：`0x`（应该至少有一位数字 - 零是`“0x0”`）
* **错误样例**：`0x0400`（不允许有前导零）
* **错误样例：**：`ff`（缺少`0x`前缀）

#### 未格式化的数据

当编码**未格式化的数据**（字节数组、哈希值、字节码数组）时：使用两个十六进制数字表示每个字节，并在前面加上`“0x”`作为前缀。 例如：

* `0x41` (size 1, `"A"`)
* `0x004200` (size 3, `"\0B\0"`)
* `0x` (size 0, `""`)
* **错误**： `0xf0f0f`（必须是偶数位数）。
* **错误**： `004200`（缺少`0x`前缀）。

请注意，区块和交易的哈希值是用32个字节来表示的。

### Base32 地址

`BASE32`：Base32 **地址**应该编码为一个ASCII字符串，包含42个字符加上网络前缀、分隔符和可选字段。 请注意以下关于base32地址作为RPC参数的限制条件：

* 网络前缀应该与节点的网络匹配，例如：`cfx:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp`可以发送给主网节点，`cfxtest:acc7uawf5ubtnmezvhu9dhc6sghea0403ywjz6wtpg`可以发送给测试网节点。 值得注意的是，这两个示例地址对应于不同网络上的同一个账户。
* 无论包含还是省去地址类型都是可以接受的，例如：`cfx:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg`和`cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg`是等价的。 但是，类型不正确的地址，例如：`cfx:type.contract:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg`，会被拒绝。
* 全大写或者全小写地址都是可以接受的，例如：`cfx:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg`和`CFX:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG`都是有效的。 但混合大小写地址会被拒绝。

为获取更多关于 Base32 地址的信息，请参阅 [地址](../../core-space-basics/addresses.md)。

### 默认的 epochNumber （纪元数） 参数

有几个RPC方法有一个epoch number参数。 Epoch的概念在Conflux中有点类似于其他账本中的区块号（高度），但是一个epoch可能包含多个区块。

Epoch number指定了在一个时间点时，系统的相应状态，这些状态受到共识的约束。 Epoch number参数有以下几种可能的选项：

* `HEX String` - 整数纪元数。 例如，`0x3e8`是epoch 1000。
* `String “earliest”`表示创世区块的epoch。
* `String “latest_checkpoint”`表示存储在内存中的最早的epoch。
* `String “latest_finalized”` - 表示最新的已经确定（通过PoS）的epoch。 （添加自conflux-rust `v2.0.0`）
* `String “latest_confirmed”` - 表示最新的已经确认的epoch（使用确认计量器的估计值）。
* `string "latest_state"` - 表示已经执行的最新纪元。
* `String “latest_mined”` - 表示最新的已知epoch。


<!---
TODO: Add links to deferred execution documentation.
-->

请注意，由于性能优化，最新的已知epoch没有被执行，所以这些epoch没有可用的状态。 对于大多数与状态查询有关的RPC，推荐使用`"latest_state"`。 （有关Conflux中交易生命周期的更多信息，请参考[交易生命周期](../../../general/conflux-basics/transactions.md#transaction-lifecycle)）

#### 遵循 EIP-1898 的Conflux epochNumber 参数

Conflux core space 支持纪元数参数在 [EIP-1898](https://eips.ethereum.org/EIPS/eip-1898) 样式中为某些RPC 服务。 [EIP-1898](https://eips.ethereum.org/EIPS/eip-1898) 样式的纪元参数是一个包含3个可选字段的对象：

- `epochNumber`. 对应于EIP-1898定义的`blockNumber`。
- `blockHash`. 与EIP-1898的`blockHash`相同。
- `requirePivot`. 对应于EIP-1898的`requireCanonical`。 默认值为`true`

例如：

```json
{
  "blockHash": "0x692373025c7315fa18b2d02139d08e987cd7016025920f59ada4969c24e44e06",
  "requirePivot": false
}
```

EIP-1898中的纪元号参数现在可用于以下RPC：

* [cfx_getBalance](#cfx_getbalance)
* [cfx_getStorageAt](#cfx_getstorageat)
* [cfx_call](#cfx_call)
* [cfx_getNextNonce](#cfx_getnextnonce)
* [cfx_getCode](#cfx_getcode)
* [cfx_getEpochReceipts](#cfx_getepochreceipts)

## CURL 请求示例

下面提供了通过向Conflux节点发出 [curl](https://curl.se/) 请求来使用 JSON_RPC 应用程序接口的示例。 每个示例都包括对特定端点、其参数、返回类型的描述，以及应该如何使用它的工作示例。

Curl 请求可能会返回与内容类型相关的错误消息。 这是因为 `--data` 选项将内容类型设置为 `application/x-www-form-urlencoded`。 如果你的节点确实抱怨此问题，请通过在调用开始时放置 `-H "Content-Type: application/json"` 来手动设置标头。 这些示例也未包括网址/互联网协议与端口组合，该组合必须是 curl 的最后一个参数（例如 ` 127.0.0.1:12537 `）。 包含这些附加数据的完整 curl 请求采用以下形式：

```shell
$ curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"cfx_clientVersion","params":[],"id":67}' 127.0.0.1:12537
```

本文档剩余部分的示例将使用 HTTP endpoint。

## 状态和交易可用性

Conflux的归档节点和全节点会删除历史状态树，以减少存储空间的占用。 全节点也会丢弃历史区块的交易和收据。 因此，一些RPC接口可能无法用于历史查询。

下面是Conflux RPC API的列表，以及它们在归档节点和全节点上的可用性。 *“recent”*表示该RPC只支持最近的项目，*“OK”*表示它应该对任何有效的输入都能正常工作。

| RPC                                                                               |  归档节点  |  全节点   |
| --------------------------------------------------------------------------------- |:------:|:------:|
| [`cfx_call`](#cfx_call)                                                           | recent | recent |
| [`cfx_checkBalanceAgainstTransaction`](#cfx_checkbalanceagainsttransaction)       | recent | recent |
| [`cfx_clientVersion`](#cfx_clientversion)                                         |   OK   |   OK   |
| [`cfx_epochNumber`](#cfx_epochnumber)                                             |   OK   |   OK   |
| [`cfx_estimateGasAndCollateral`](#cfx_estimategasandcollateral)                   | recent | recent |
| [`cfx_gasPrice`](#cfx_gasprice)                                                   |   OK   |   OK   |
| [`cfx_getAccount`](#cfx_getaccount)                                               | recent | recent |
| [`cfx_getAccumulateInterestRate`](#cfx_getaccumulateinterestrate)                 |   OK   |   OK   |
| [`cfx_getAdmin`](#cfx_getadmin)                                                   | recent | recent |
| [`cfx_getBalance`](#cfx_getbalance)                                               | recent | recent |
| [`cfx_getBestBlockHash`](#cfx_getbestblockhash)                                   |   OK   |   OK   |
| [`cfx_getBlockByEpochNumber`](#cfx_getblockbyepochnumber)                         |   OK   | recent |
| [`cfx_getBlockByHash`](#cfx_getblockbyhash)                                       |   OK   | recent |
| [`cfx_getBlockByHashWithPivotAssumption`](#cfx_getblockbyhashwithpivotassumption) |   OK   | recent |
| [`cfx_getBlockRewardInfo`](#cfx_getblockrewardinfo)                               |   OK   | recent |
| [`cfx_getBlocksByEpoch`](#cfx_getblocksbyepoch)                                   |   OK   |   OK   |
| [`cfx_getCode`](#cfx_getcode)                                                     | recent | recent |
| [`cfx_getCollateralForStorage`](#cfx_getcollateralforstorage)                     | recent | recent |
| [`cfx_getConfirmationRiskByHash`](#cfx_getconfirmationriskbyhash)                 |   OK   | recent |
| [`cfx_getDepositList`](#cfx_getdepositlist)                                       | recent | recent |
| [`cfx_getInterestRate`](#cfx_getinterestrate)                                     | recent | recent |
| [`cfx_getLogs`](#cfx_getlogs)                                                     |   OK   | recent |
| [`cfx_getNextNonce`](#cfx_getnextnonce)                                           | recent | recent |
| [`cfx_getSkippedBlocksByEpoch`](#cfx_getskippedblocksbyepoch)                     |   OK   |   OK   |
| [`cfx_getSponsorInfo`](#cfx_getsponsorinfo)                                       | recent | recent |
| [`cfx_getStakingBalance`](#cfx_getstakingbalance)                                 | recent | recent |
| [`cfx_getStatus`](#cfx_getstatus)                                                 |   OK   |   OK   |
| [`cfx_getStorageAt`](#cfx_getstorageat)                                           | recent | recent |
| [`cfx_getStorageRoot`](#cfx_getstorageroot)                                       | recent | recent |
| [`cfx_getTransactionByHash`](#cfx_gettransactionbyhash)                           |   OK   | recent |
| [`cfx_getTransactionReceipt`](#cfx_gettransactionreceipt)                         |   OK   | recent |
| [`cfx_getVoteList`](#cfx_getvotelist)                                             | recent | recent |
| [`cfx_sendRawTransaction`](#cfx_sendrawtransaction)                               |   OK   |   OK   |

如果您查询的状态条目在节点上不可用，您将收到错误响应：

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

在这个例子中，我们被告知最早可用的状态是在纪元`9510001`（`0x911c71`）处。

### 从以太坊 JSON-RPC 迁移

以太坊和 Conflux 的一些 JSON-RPC 有对应关系。 即使 JSON-RPC 的细节可能有所不同，但以下映射表在从以太坊迁移到 Conflux 时可能会有所帮助：

| 以太坊                        | Conflux                                                         |
| -------------------------- | --------------------------------------------------------------- |
| `eth_blockNumber`          | [`cfx_epochNumber`](#cfx_epochnumber)                           |
| `eth_call`                 | [`cfx_call`](#cfx_call)                                         |
| `eth_estimateGas`          | [`cfx_estimateGasAndCollateral`](#cfx_estimategasandcollateral) |
| `eth_gasPrice`             | [`cfx_gasPrice`](#cfx_gasprice)                                 |
| `eth_getBalance`           | [`cfx_getBalance`](#cfx_getbalance)                             |
| `eth_getBlockByHash`       | [`cfx_getBlockByHash`](#cfx_getblockbyhash)                     |
| `eth_getBlockByNumber`     | [`cfx_getBlockByEpochNumber`](#cfx_getblockbyepochnumber)       |
| `eth_getCode`              | [`cfx_getCode`](#cfx_getcode)                                   |
| `eth_getLogs`              | [`cfx_getLogs`](#cfx_getlogs)                                   |
| `eth_getStorageAt`         | [`cfx_getStorageAt`](#cfx_getstorageat)                         |
| `eth_getTransactionByHash` | [`cfx_getTransactionByHash`](#cfx_gettransactionbyhash)         |
| `eth_getTransactionCount`  | [`cfx_getNextNonce`](#cfx_getnextnonce)                         |
| `eth_getTransactionrecipt` | [`cfx_getTransactionReceipt`](#cfx_gettransactionreceipt)       |
| `eth_sendRawTransaction`   | [`cfx_sendRawTransaction`](#cfx_sendrawtransaction)             |

## GOSSIP, STATE, HISTORY

一些核心的 JSON-RPC 方法需要从 Conflux 网络获取数据，它们可以分为三个主要类别：Gossip, State 和 History。 你可以使用这些部分中的链接跳转到每个方法，或者使用目录来浏览所有方法的列表。

### Gossip 方法

这些方法跟踪链的头部。 这是交易在网络中传播、进入区块的方式，以及客户端发现新区块的方式。

* cfx_getStatus
* cfx_epochNumber
* cfx_sendRawTransaction

### State 方法

这些方法报告存储的所有数据的当前状态。 “状态”就像一块大的共享内存，包括账户余额、合约数据和 gas 估算。

* cfx_getBalance
* cfx_getStorageAt
* cfx_getNonce
* cfx_getCode
* cfx_call
* cfx_estimateGasAndCollateral

### History 方法

获取从创世区块开始的每个区块的历史记录。 这就像一个大型的只追加文件，包括所有区块头、区块体和交易收据。

* cfx_getBlockByHash
* cfx_getBlockByEpochNumber
* cfx_getTransactionByHash
* cfx_getTransactionReceipt

## JSON-RPC 方法

### cfx_getTransactionByHash

返回关于一个交易的信息，通过它的哈希来识别。

#### 参数

1. `DATA`，32 字节 - 交易的哈希。

```json
params: [
    "0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"
]
```

#### 返回值

`Object` - 交易对象，如果没有找到交易，则为 `null`：

* `type`: `QUANTITY`，交易的类型。 `0x0` 表示传统交易，`0x1` 表示 CIP-2930 交易，`0x2` 表示 CIP-1559 交易。
* `blockHash`: `DATA`，32 字节，包含并执行了这个交易的区块的哈希。 `null` 当交易是 pending 时为 null
* `chainId`: `QUANTITY` - 发送者指定的链 ID
* `contractCreated`: `BASE32`，创建的合约的地址。 `null` 当它不是一个合约部署交易时为 null
* `data`: `DATA`，随交易发送的数据。
* `epochHeight`: `QUANTITY` - 发送者指定的 epoch。 注意这不是包含这个交易的区块的 epoch。
* `from`: `BASE32` - 发送者的地址。
* `gas`: `QUANTITY` - 发送者提供的 gas。
* `gasPrice`: `QUANTITY` - 发送者以 Drip 为单位提供的 gas 价格。
* `hash`: `DATA`, 32 Bytes - 交易的哈希。
* `nonce`: `QUANTITY` - 发送者在这之前发送的交易数量。
* `r`: `DATA`, 32 字节 - ECDSA 签名 r
* `s`: `DATA`, 32 字节 - ECDSA 签名 s
* `status`: `QUANTITY` - 0表示成功，1表示发生错误，2表示跳过， `null`表示交易被跳过或未被打包。
* `storageLimit`: `QUANTITY` - 发送者指定的存储限制。
* `to`: `BASE32` - 接收者的地址。 `null` 当它是一个合约部署交易时为 null
* `transactionIndex`：`QUANTITY` - 表示区块中的交易索引位置。 `null` 当交易是 pending 时为 null
* `v`：`QUANTITY` - ECDSA 恢复 ID
* `value`：`QUANTITY` - 转移的价值，以 Drip 为单位。
* `maxGasFeePerGas`: `QUANTITY` ，发送者愿意支付的每单位燃气的最大总费用（包括网络/基础费用和矿工/优先费用），以Drip为单位。
* `maxPriorityFeePerGas`: `QUANTITY` ，发送者愿意支付给矿工的每单位燃气的最大费用，以Drip为单位。
* `accessList`: `ARRAY` ，EIP-2930访问列表。
* `yParity`: `QUANTITY` ，secp256k1签名中y值的奇偶性（0表示偶数，1表示奇数）。

注意，字段 `blockHash`, `contractCreated`, `status` 和 `transactionIndex` 是由节点提供的，因为它们依赖于交易在账本中的位置。 其余的字段是包含在原始交易中或从原始交易中派生出来的。

请注意，字段 `type`，`maxGasFeePerGas`，`maxPriorityFeePerGas`，`yParity`和 `accessList` 包含在 `Conflux-rust v2.4.0` 的响应中。

##### 示例

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getTransactionByHash","params":["0x497755f45baef13a35347933c48c0b8940f2cc3347477b5ed9f165581b082699"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": {
    "type": "0x2",
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
    "value": "0x3635c9adc5dea00000",
    "accessList": [],
    "maxFeePerGas": "0x4a817c800",
    "maxPriorityFeePerGas": "0x4a817c800",
    "yParity": "0x0"
  },
  "id": 1
}
```

---

### cfx_getBlockByHash

返回关于一个区块的信息，通过它的哈希来识别。

#### 参数

1. `DATA`：32 字节，区块的哈希值。
2. `Boolean` - 如果 `true`，返回完整的交易对象。 如果 `false`, 只返回交易的哈希值

```json
params: [
    "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331",
    true
]
```

#### 返回值

`Object` - 区块对象，或 `null`（当没有找到区块时）：

* `adaptive`: `Boolean` - `true` 则该区块在 GHAST 规则下的权重是自适应的。
* `blame`: `QUANTITY` - 如果为 0，则该区块不责怪其父路径上的任何区块。 如果 `n > 0`, 则该区块责怪其父路径上的 `n` n 个前任，例如， 当 `n = 1`, 则该区块责怪其父区块，但不责怪其父区块的父区块。
* `deferredLogsBloomHash`: `DATA`, 32 Bytes - 在该区块所在 epoch 的延迟执行后的事件地址和事件topic的布隆滤波器的哈希（假设它是主区块）。
* `deferredReceiptsRoot`: `DATA`, 32 Bytes - 在该区块所在 epoch 的延迟执行后的收据的 Merkle 根（假设它是枢轴区块）。
* `deferredStateRoot`: `DATA`, 32 Bytes - 在该区块所在 epoch 的延迟执行后的状态 trie 根三元组的哈希（假设它是枢轴区块）。
* `difficulty`: `QUANTITY` - 该区块的 PoW 难度。
* `epochNumber`: `QUANTITY` - 包含该区块的 epoch 的编号，在节点对账本的视图中。 `null` 当 epoch 编号未确定时为 null（例如，该区块不在最佳区块的过去集合中）。
* `gasLimit`：`QUANTITY`， 决定区块的燃气限制。 从 `Conflux-rust v2.4.0`开始，乘以[系数`0.9`](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-1559.md#independent-gas-limit-calculation)以计算出Core Space区块的燃气限制。 例如，如果 `gasLimit` 字段值为 `60,000,000`，则交易Gas限制总和的实际最大值为 `54,000,000`。
* `gasUsed`: `QUANTITY` - 该区块使用的总 gas。 `null` 当区块是 pending 时为 null。
* `hash`：`DATA`，32 字节 - 区块的哈希。
* `height`: `QUANTITY` - 区块的高度。
* `miner`: `BASE32` - 获得挖矿奖励的受益人地址。
* `nonce`：`DATA`，8 字节 - 已生成的工作量证明的哈希。
* `parentHash`：`DATA`，32 字节 - 父区块的哈希。
* `powQuality`: `DATA` - PoW 质量。 `null` 当区块是 pending 时为 null。
* `refereeHashes`: `Array` - 裁判区块哈希数组。
* `size`: `QUANTITY` - 该区块的字节大小，不包括区块头。
* `timestamp`: `QUANTITY` - 该区块创建的 unix 时间戳。
* `transactions`: `Array` - 交易对象数组，或者 32 字节的交易哈希，取决于第二个参数。
* `transactionsRoot`: `DATA`, 32 字节 - 该区块中交易的 Merkle 根。
* `custom`: `Array`- 自定义信息。 注意从 v2.0 开始，`custom` 的类型已经从`数字数组`的数组变成了`十六进制字符串`的数组。
* `blockNumber`: `QUANTITY` - 该区块在树图中的总顺序编号。 `null` 当顺序未确定时为 null。 添加自` Conflux-rust v1.1.5 `
* `posReference`: `DATA`, 32 字节 - PoS 最新提交区块的哈希。 添加自` Conflux-rust v2.0.0 `
* `baseFeePerGas`：`QUANTITY`，区块中的每单位燃气的基础费用。 添加自 `Conflux-rust v2.4.0` 。

注意，字段 `epochNumber `和 `gasUsed `是由节点提供的，因为它们依赖于账本。 其余的字段是直接包含在区块头中或从区块头中派生出来的。

##### 示例

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
    "baseFeePerGas": "0x4a817c800"
  },
  "id": 1
}
```

---

### cfx_getBlockByEpochNumber

返回一个区块的信息，该区块由它的纪元号（epoch number）标识。

#### 参数

1. `QUANTITY|TAG` - 纪元号，或字符串`"latest_mined"`、`"latest_state"`、`"latest_confirmed"`、"`latest_checkpoint"`或`"earliest"`，请参见[纪元号参数](#the-default-epochnumber-parameter)。
2. `Boolean` - 如果为 `true`，它会返回完整的交易对象。 如果为 `false`，只会返回交易的哈希值。

```json
params: [
    "latest_mined",
    true
]
```

#### 返回值

查看 [cfx_getBlockByhash](#cfx_getblockbyhash)。

##### 示例

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getBlockByEpochNumber","params":["latest_mined", false],"id":1}' -H "Content-Type: application/json" localhost:12539
```

结果参见 [cfx_getBlockByHash](#cfx_getblockbyhash).

---

### cfx_getBestBlockHash

返回最佳区块的哈希值。

#### 参数

无。

#### 返回值

`DATA`, 32 Bytes - 最佳区块的哈希值。

##### 示例

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


返回给定标签对应的纪元号。

#### 参数

1. `TAG` - (可选，默认为 `"latest_mined"`) 字符串 `"latest_mined"`, `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, 详见[纪元号参数](#the-default-epochnumber-parameter)。

#### 返回值

`QUANTITY` - 与给定标签对应的整数纪元号。

##### 示例

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

返回当前每单位gas的价格，单位为Drip。

#### 参数

无。

#### 返回值

`QUANTITY` - 当前 Gas 价格的整数表示，单位为 Drip。

##### 示例

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

### cfx_maxPriorityFeePerGas

返回当前每单位燃气的优先费用，以Drip为单位。

#### 参数

无。

#### 返回值

`QUANTITY` ，当前每单位燃气的优先费用的整数值，以Drip为单位。

##### 示例

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_maxPriorityFeePerGas","id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
    "jsonrpc" : "2.0",
    "result" : "0x09184e72a000",
    "id" : 1
}
```

---

### cfx_feeHistory

返回交易的每单位燃气基础费用和有效优先费用，用于请求/支持的纪元范围。

添加自 `Conflux-rust v2.4.0` 。

#### 参数

1. `QUANTITY`：要查询的纪元数量。
2. `QUANTITY|TAG`：纪元编号或字符如`"latest_state"`，`"latest_confirmed"`，`"latest_checkpoint"` 或者`"earliest"`，见 [纪元编号参数](#the-default-epochnumber-parameter)。
3. `Array`：单调递增的浮点百分位值列表。 对于请求范围内的每个区块，按每单位燃气的有效小费升序排序交易，并确定相应百分位的有效小费，同时考虑消耗的燃气。

#### 返回值

- `baseFeePerGas`：`Array`-每单位燃气的区块基础费用数组。 此数组将包含一个额外的元素。
- `gasUsedRatio`：`Array`- 一个包含区块燃气使用比率的数组。 内容为交易GasLimit总和与区块GasLimit的比率。
- `oldestEpoch`：`QUANTITY`-返回范围内最小的纪元编号。
- `reward`：`Array` -请求区块百分位的每单位燃气有效优先费用的二维数组。

##### 示例

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_feeHistory", "params": ["0x5", "latest_state", [20, 30]],"id":1}' -H "Content-Type: application/json" localhost:12537

// Result
{
    "jsonrpc": "2.0",
    "result": {
        "baseFeePerGas": [
            "0x3b9aca00",
            "0x3b9aca00",
            "0x3b9aca00",
            "0x3b9aca00",
            "0x3b9aca00",
            "0x3b9aca00"
        ],
        "gasUsedRatio": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ],
        "oldestEpoch": "0x2a8d0",
        "reward": [
            [
                "0x0",
                "0x0"
            ],
            [
                "0x0",
                "0x0"
            ],
            [
                "0x0",
                "0x0"
            ],
            [
                "0x0",
                "0x0"
            ],
            [
                "0x0",
                "0x0"
            ]
        ]
    },
    "id": "15922956697249514502"
}
```

---

### cfx_getBlocksByEpoch

返回指定纪元中的区块哈希值。

#### 参数

1. `QUANTITY|TAG` - 纪元号，或字符串`"latest_mined"`、`"latest_state"`、`"latest_confirmed"`、"`latest_checkpoint"`或`"earliest"`，请参见[纪元号参数](#the-default-epochnumber-parameter)。

#### 返回值

`数组` - 区块哈希的数组，按照它们的执行（拓扑）顺序排序。 请注意，最后一个哈希值是主轴哈希。

##### 示例

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

返回给定账户的余额，该账户由它的地址标识。

#### 参数

1. `BASE32` - 用于检查余额的地址，采用 base32 编码。
2. `QUANTITY|TAG` - （可选，默认为`"latest_state"`）整数纪元号，或字符串 `"latest_state"`、`"latest_confirmed"`、`"latest_checkpoint"` 或 `"earliest"`，详见 [纪元号参数](#the-default-epochnumber-parameter)。

```json
params: [
   "cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg",
   "latest_state"
]
```

#### 返回值

`QUANTITY` - 当前余额的整数表示，单位为 Drip。

##### 示例

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

返回给定账户的质押余额，该账户由它的地址标识。

#### 参数

1. `BASE32` - 用于检查质押余额的地址，采用 base32 编码。
2. `QUANTITY|TAG` - （可选，默认为`"latest_state"`）整数纪元号，或字符串 `"latest_state"`、`"latest_confirmed"`、`"latest_checkpoint"` 或 `"earliest"`，详见 [纪元号参数](#the-default-epochnumber-parameter)。

```json
params: [
   "cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg",
   "latest_state"
]
```

#### 返回值

`QUANTITY` - 当前抵押金余额的整数表示，以Drip为单位。

##### 示例

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

返回给定地址的抵押存储的大小，单位为字节。

#### 参数

1. `BASE32` - 要检查抵押存储的地址。
2. `QUANTITY|TAG` - （可选，默认为`"latest_state"`）整数纪元号，或字符串 `"latest_state"`、`"latest_confirmed"`、`"latest_checkpoint"` 或 `"earliest"`，详见 [纪元号参数](#the-default-epochnumber-parameter)。

```json
params: [
   "cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg",
   "latest_state"
]
```

#### 返回值

`QUANTITY` - 以字节为单位的抵押存储的整数。

##### 示例

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

返回指定合约的管理员。

#### 参数

1. `BASE32` - 合约地址
2. `QUANTITY|TAG` - （可选，默认为`"latest_state"`）整数纪元号，或字符串 `"latest_state"`、`"latest_confirmed"`、`"latest_checkpoint"` 或 `"earliest"`，详见 [纪元号参数](#the-default-epochnumber-parameter)。

```json
params: [
    "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
    "latest_state"
]
```

#### 返回值

`BASE32` - 管理员地址，合约不存在时为 `null`。

:::note

虽然没有意义，但也可以使用用户地址作为 `cfx_getAdmin` 方法的输入参数。 在这种情况下，如果输入用户地址存在于世界状态，返回值将为零地址。 否则将返回 `null`。

:::

##### 示例

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

返回指定合约的代码。 如果合约不存在，将返回`0x0`。

#### 参数

1. `BASE32` - 合约地址
2. `QUANTITY|TAG` - （可选，默认为`"latest_state"`）整数纪元号，或字符串 `"latest_state"`、`"latest_confirmed"`、`"latest_checkpoint"` 或 `"earliest"`，详见 [纪元号参数](#the-default-epochnumber-parameter)。

```json
params: [
    "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
    "latest_state"
]
```

#### 返回值

`DAT` - 合约的字节码，如果账户没有代码则为 `0x`。

##### 示例

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

返回给定合约的存储条目。

#### 参数

1. `BASE32` - 合约地址
2. `QUANTITY` - 存储位置 (查看 [这里](https://solidity.readthedocs.io/en/v0.7.1/internals/layout_in_storage.html) 获取更多信息)。
3. `QUANTITY|TAG` - （可选，默认为`"latest_state"`）整数纪元号，或字符串 `"latest_state"`、`"latest_confirmed"`、`"latest_checkpoint"` 或 `"earliest"`，详见 [纪元号参数](#the-default-epochnumber-parameter)。

```json
params: [
    "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
    "0x100",
    "latest_state"
]
```

#### 返回值

`DATA` - 32字节 - 存储位置的内容，如果合约不存在则为`null`。

##### 示例

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

返回给定合约的存储根。

#### 参数

1. `BASE32` - 合约地址
2. `QUANTITY|TAG` - （可选，默认为`"latest_state"`）整数纪元号，或字符串 `"latest_state"`、`"latest_confirmed"`、`"latest_checkpoint"` 或 `"earliest"`，详见 [纪元号参数](#the-default-epochnumber-parameter)。

```json
params: [
    "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
    "latest_state"
]
```

#### 返回值

`Object` - 存储根对象，如果合约不存在则为`null`：

* `delta`: `DATA`，32字节 - 增量字典树中的存储根对象，或字符串 `"TOMBSTONE"`，或 `null`。
* `intermediate`: `DATA`，32字节 - 中间字典树中的存储根对象，或字符串`"TOMBSTONE"`，或 `null`。
* `snapshot`: `DATA`，32字节 - 快照中的存储根对象，或字符串 `"TOMBSTONE"`，或 `null`。

如果两次调用此 RPC 的三个字段完全匹配，则保证合同的存储是相同的。 如果它们不匹配，则存储很可能已更改（或系统转移到了新的纪元）。


<!---
TODO: Add links to snapshot/checkpoint documentation.
-->

##### 示例

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

返回给定合约的赞助者信息。

#### 参数

1. `BASE32` - 合约地址
2. `QUANTITY|TAG` - （可选，默认为`"latest_state"`）整数纪元号，或字符串 `"latest_state"`、`"latest_confirmed"`、`"latest_checkpoint"` 或 `"earliest"`，详见 [纪元号参数](#the-default-epochnumber-parameter)。

```json
params: [
    "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
    "latest_state"
]
```

#### 返回值

` Object ` - 代付方信息对象。 如果合同没有代付方，则返回对象中的所有字段将是 `0`：

* `sponsorBalanceForCollateral`: `QUANTITY` - 用于存储的代付余额。
* `sponsorBalanceForGas`: `QUANTITY` - 燃气的代付余额。
* `sponsorGasBound`: `QUANTITY` - 可以为一次交易代付的最大燃气。
* `sponsorForCollateral`: `BASE32` - 存储代付方的地址。
* `sponsorForGas`: `BASE32` - 燃气代付方的地址。
* `usedStoragePoints`: `QUANTITY` - 已被使用的存储点。
* `availableStoragePoints`: `QUANTITY` - 可供代付的存储点

[Hard fork v2.3](../../../general/hardforks/v2.3.md#cip-107) 提供了存储点的介绍。 详见 [CIP-107](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-107.md)

##### 示例

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

返回给定账户在发送交易时应该使用的下一个nonce值。

#### 参数

1. `BASE32` - 账户地址。
2. `QUANTITY|TAG` - (可选，默认为`"latest_state"`)整数纪元号，或字符串 `"latest_state"`、`"latest_confirmed"`、`"latest_checkpoint"` 或 `"earliest"`，详见 [纪元号参数](#the-default-epochnumber-parameter)。

```json
params: [
    "cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg",
    "latest_state"
]
```

#### 返回值

`QUANTITY` - 下一个应被指定地址使用的nonce。

##### 示例

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

发送一个已签名的交易到网络中进行处理。

#### 参数

1. `DATA`，签名的交易数据。

```json
params: [
    "0xf86eea8201a28207d0830f4240943838197c0c88d0d5b13b67e1bfdbdc132d4842e389056bc75e2d631000008080a017b8b26f473820475edc49bd153660e56b973b5985bbdb2828fceacb4c91f389a03452f9a69da34ef35acc9c554d7b1d63e9041141674b42c3abb1b57b9f83a2d3"
]
```

#### 返回值

`DAT`, 32 字节 - 交易哈希。

#### 常见错误

检查 [发送原始交易错误](./rpc-behaviour/cfx_sendTransaction-errors.md) 了解详情。

##### 示例

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

虚拟地调用一个合约，返回输出数据。 该交易不会被添加到区块链中。 `cfx_call` 的错误信息类似于 `cfx_estimateGasAndCollatory` 错误解决方案可以在 [cfx_estimateGasAndCollatory behaviour#error](./rpc-behaviour/cfx_estimateGasAndCollateral-behaviour.md#errors) 中找到。

#### 参数

1. `object` - 呼叫请求对象：
    * `from`：`BASE32` - 发送者地址 (可选，默认：随机地址)。
    * `to`: `BASE32` - (可选，默认： `null` 用于合约创建) 接收者地址。
    * `gasPrice`: `QUANTITY` - 发送者以 Drip 为单位提供的 gas 价格(可选, 默认: `0`)。
    * `gas`: `QUANTITY` - 发送者以 Drip 为单位提供的 gas 价格(可选，默认: `500000000`)。
    * `value`: `QUANTITY` - 发送者以 Drip 为单位提供的 gas 价格(可选，默认: `0`)。
    * `data`: `DATA` - (可选, 默认: `0x`) 与交易一起发送的数据。
    * `nonce`: `QUANTITY` - (可选, 默认: `0`)发送者在此次交易之前所进行的交易数量。
    * `type`：`QUANTITY` -（可选，默认值：0x0）交易的类型，`0x0` 表示传统交易，`0x1` 表示 EIP-2930，`0x2` 表示 EIP-1559。 添加自 `Conflux-rust v2.4.0` 。
    * `accessList`：`ARRAY` -（可选，默认值：`[]`）EIP-2930 访问列表。 添加自 `Conflux-rust v2.4.0` 。
    * `maxFeePerGas`：`QUANTITY` -（可选，默认值：`0`)）每单位燃气的最大费用，以 Drip 为单位。 添加自 `Conflux-rust v2.4.0` 。
    * `maxPriorityFeePerGas`：`QUANTITY` -可选，默认值：`0`）每单位燃气的最大优先费用，以 Drip 为单位。 添加自 `Conflux-rust v2.4.0` 。

2. `QUANTITY|TAG` - （可选，默认为`"latest_state"`）整数纪元号，或字符串 `"latest_state"`、`"latest_confirmed"`、`"latest_checkpoint"` 或 `"earliest"`，详见 [纪元号参数](#the-default-epochnumber-parameter)。

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

#### 返回值

`DATA`, 字节- 输出数据或执行错误。

##### 示例

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

虚拟地执行一个交易，返回存储抵押和交易使用的gas的大小估计。 该交易不会被添加到区块链中。

`cfx_estimateGasAndCollatory` 接口的响应取决于输入中是否存在特定字段。 详情请参阅 [cfx_estimateGasAndCollatory](./rpc-behaviour/cfx_estimateGasAndCollateral-behaviour.md)。 错误原因和解决方案也可以在 [cfx_estimateGasAndCollatory behaviour#errors](./rpc-behaviour/cfx_estimateGasAndCollateral-behaviour.md#errors) 中找到。

#### 参数

详见 [cfx_call](#cfx_call)。

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

#### 返回值

`object` - 估算结果对象：
   * `gasLimit`: `QUANTITY` - 推荐的gas限制。
   * `gasUsed`: `QUANTITY` - 用于执行交易的 gas 。
   * `storageCollateralized`: `QUANTITY`，该交易所需的存储抵押金额。

##### 示例

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

返回与提供的过滤器匹配的日志。

#### 参数

1. `object` - 日志过滤对象：
    * `fromEpoch`: `QUANTITY|TAG` - (可选，默认为: `"latest_checkpoint"`) 纪元号，或字符串 `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, 详见 [纪元号参数](#the-default-epochnumber-parameter)。 搜索将从这个纪元号开始应用。
    * `toEpoch`: `QUANTITY|TAG` - (可选，默认为: `"latest_state"`) 纪元号，或字符串 `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, 详见 [纪元号参数](#the-default-epochnumber-parameter)。 搜索将持续到(包括)这个纪元数。
    * `fromBlock`: `QUANTITY` - (可选，默认为: `null`)。 搜索将从这个的区块号开始应用。
    * `toBlock`: `QUANTITY` - (可选， 默认为: `null`)。 搜索将被应用持续到(包括) 此指定区块。
    * `blockHashes`: `Array` `DATA` - (可选，默认为: `null`)搜索会被应用到最多128个区块哈希的数组。 如果不是`null`，则会覆盖 from/to 纪元 字段。
    * `address`: `Array` of `BASE32` - (可选, 默认为: `null`) 搜索合约地址。 如果为 `null`, 匹配所有。 如果指定了，日志必须由这些合约中的一个生成。
    * `topics`: `Array` - (可选, 默认值: `null`) 每个主题32个字节。 日志可以有 `4` 个主题：事件签名和最多 `3` 个索引事件参数。 `topics` 的元素与相应的日志主题匹配。 示例： `["0xA", null, ["0xB", "0xC", 空]` 将日志与 `"0xA"` 匹配为第一个主题和 (`"0xB"` 或 `"0xC"`)为第三个主题。 如果 `null`, 匹配所有。

```json
params: [
    {
        "fromEpoch": "0x873e12",
        "toEpoch": "0x87431b",
        "address": "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
        "topics": [["0x233e08777131763a85257b15eafc9f96ef08f259653d9944301ff924b3917cf5", "0xd7fb65c06987247ab480a21659e16bdf0b5862a19869ec264075d50ab3525435"], null, "0x0000000000000000000000001d618f9b63eca8faf90faa9cb799bf4bfe616c26"],
    }
]
```

#### 返回值

`Array` - 匹配日志对象的数组：

   * `address`: `BASE32` - 发送日志的合约地址。
   * `topics` `Array` of `DATA` - 32字节事件主题数组。
   * `data`: `DATA` - 日志数据。
   * `blockHash`: `DATA` - 32 Bytes - 包含日志的区块哈希。
   * `epochNumber`: `QUANTITY` - 包含日志的区块的纪元号
   * `transactionHash`: `DATA`，32 字节 - 创建此日志的交易的哈希。
   * `transactionIndex`：`QUANTITY` - 区块中的交易索引位置。
   * `logIndex`: `QUANTITY` - 区块内的日志索引。
   * `transactionLogIndex`: `QUANTITY` - 交易中的日志索引。

##### 示例

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

返回一个交易收据，由相应的交易哈希值标识。

#### 参数

1. DATA，32 字节 - 交易的哈希。

```json
params: [
    "0x53fe995edeec7d241791ff32635244e94ecfd722c9fe90f34ddf59082d814514",
]
```

#### 返回值

`Object` - 交易收据对象，当没有发现交易或交易尚未执行时为 `null` ：

* `type`：`QUANTITY` ， 交易的类型，`0x0` 表示传统交易，`0x1` 表示 EIP-2930，`0x2`表示 EIP-1559。 添加自 `Conflux-rust v2.4.0` 。
* `transactionHash`: `DATA`，32 字节 - 给定交易的哈希值。
* `index`：`QUANTITY` - 交易在块中的索引。
* `blockHash`: `DATA`，32 字节，包含并执行了这个交易的区块的哈希。
* `epochNumber`：`QUANTITY` - 包含该交易的块所在的epoch编号，该交易在该epoch中被执行。
* `from`: `BASE32` - 发送者的地址。
* `to`: `BASE32` - 接收者的地址。 `null` 当它是一个合约部署交易时为 null
* `gasUsed`: `QUANTITY` - 用于执行交易的 gas 用量。
* `gasFee`: `QUANTITY` - 消息发送者账户被收取的 gas 费用。 如果提供的 gas（gas limit）大于使用的 gas，则最多可以退还其中的 1/4。
* `gasCoveredBySponsor`: `Boolean`，如果该交易的gas费被代付，则为true。
* `storageCollateralized`: `QUANTITY`，该交易所需的存储抵押金额。
* `storageCoveredBySponsor`: `Boolean`，如果此交易的存储抵押已被代付，则为真。
* `storageReleased`: `Array`，包含多个存储释放的对象，每个对象包含一个地址和相应的存储抵押品数量，例如：`[{ 'address': 'CFX:TYPE.USER:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG', 'collaterals': '0x280' }]`。
* `contractCreated`: `BASE32`，创建的合约的地址。 `null` 当它不是一个合约部署交易时为 null
* `stateRoot`: `DATA`，32字节 - 在对应区块执行之后的状态根的哈希值。 如果状态根不可用，即为`0` 。
* `outcomeStatus`: `QUANTITY` - 结果状态代码 `0x0` 表示成功。 `0x1` 表示失败。 `0x2` 表示已被跳过
* `logsBloom`：`DATA`，256 字符 - 轻节点用于快速检索相关日志的布隆过滤器。
* `logs`: `Array` - 交易生成的日志对象数组，见 [cfx_getLogs](#cfx_getlogs)。
* `txExecErrorMsg`: `String`, 交易执行故障消息，如果交易执行成功将为空。
* `effectiveGasPrice`：`QUANTITY`，交易的有效燃气价格。 添加自 `Conflux-rust v2.4.0` 。
* `burntGasFee`：`QUANTITY`，交易的烧毁燃气费用。 添加自 `Conflux-rust v2.4.0` 。


##### 示例

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

返回一个账户，由它的地址标识。

#### 参数

1. `BASE32` - 账户地址。
2. `QUANTITY|TAG` - （可选，默认为`"latest_state"`）整数纪元号，或字符串 `"latest_state"`、`"latest_confirmed"`、`"latest_checkpoint"` 或 `"earliest"`，详见 [纪元号参数](#the-default-epochnumber-parameter)。

```json
params: [
   "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
   "latest_state"
]
```

#### 返回值

`Object` - 给定账户的状态：

* `from`: `BASE32` - 账户地址。
* `balance`: `QUANTITY` - 账户余额。
* `nonce`: `QUANTITY` - 帐户下一次交易的随机数。
* `codeHash`: `DATA` - 账户的字节码哈希。
* `stakingBalance`: `QUANTITY` - 账户质押余额。
* `collateralForStorage`: `QUANTITY` - 账户的抵押存储。
* `accumulatedInterestReturn`: `QUANTITY` - 账户累计的利息回报。
* `admin`: `BASE32` - 账户的管理员。

##### 示例

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

返回给定纪元的利率。

#### 参数

1. `QUANTITY|TAG` - （可选，默认为`"latest_state"`）整数纪元号，或字符串 `"latest_state"`、`"latest_confirmed"`、`"latest_checkpoint"` 或 `"earliest"`，详见 [纪元号参数](#the-default-epochnumber-parameter)。

```json
params: [
   "latest_state"
]
```

#### 返回值

`QUANTITY` - 在给定纪元的利率。

##### 示例

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

返回给定纪元的累积利率。

#### 参数

1. `QUANTITY|TAG` - （可选，默认为`"latest_state"`）整数纪元号，或字符串 `"latest_state"`、`"latest_confirmed"`、`"latest_checkpoint"` 或 `"earliest"`，详见 [纪元号参数](#the-default-epochnumber-parameter)。

```json
params: [
   "latest_state"
]
```

#### 返回值

`QUANTITY` - 在给定纪元的累计利率。

##### 示例

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

检查用户的余额是否足够发送一个带有指定gas和存储限制的交易到指定合约。 如果用户可以支付执行和存储的预付款，或者这些费用由合约赞助，那么余额就足够了。

#### 参数

1. `BASE32`, 帐户地址
2. `BASE32`, 合约地址
3. `QUANTITY`, 交易的燃气上限
4. `QUANTITY`, 燃气价格
5. `QUANTITY`, 存储限制
6. `QUANTITY|TAG` - (可选，默认为`"latest_state"`) 为整数纪元号，或字符串如 `"latest_state"`、`"latest_confirmed"`、`"latest_checkpoint"` 或 `"earliest"`，详见 [纪元号参数](#the-default-epochnumber-parameter)。

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

#### 返回值

* `isBalanceEnough`: `Boolean` - 表示余额足以支付燃气费和抵押存储。
* `willPayCollateral`: `Boolean` - 如果交易符合存储抵押代付的条件，则为false；否则为true。
* `willPayTxFee`: `Boolean` - 如果交易符合燃气代付的条件，则为false；否则为true。

##### 示例

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

返回一个纪元中未执行的区块列表。 默认情况下，Conflux每个纪元只执行最后200个区块（请注意，在正常情况下，纪元应该要小得多）。

#### 参数

1. `QUANTITY|TAG` - 整数纪元号，或字符串如`"latest_mined"`、`"latest_state"`、`"latest_confirmed"`、`"latest_checkpoint"`或 `"earliest"`，请参见[纪元号参数](#the-default-epochnumber-parameter)。

```json
params: [
  "0xba28"
]
```

#### 返回值

* `Array` - 区块哈希

##### 示例

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

返回给定区块的确认风险，该区块通过其哈希值标识。

#### 参数

1. `DATA`, 32 字节 - 区块哈希。

```json
params: [
  "0x3912275cf09f8982a69735a876c14584dae95078762090c5d32fdf0dbec0647c"
]
```

#### 返回值

* `QUANTITY`, 以整形返回的给定区块确认风险, 若区块不存在即返回 `null` 。

##### 示例

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

返回节点状态。

#### 参数

无。

#### 返回值

* `bestHash`: `DATA` - 最新纪元主区块的哈希
* `blockNumber`: `QUANTITY` - 区块总数
* `chainId`: `QUANTITY` - 链ID
* `networkId`: `QUANTITY` - 网络ID
* `ethereumSpaceChainId`: `QUANTITY` - eSpace的链ID（从v2.0添加）
* `epochNumber`: `QUANTITY` - 最新纪元编号
* `latestCheckpoint`: `QUANTITY` - 最新检查点纪元编号
* `latestConfirmed`: `QUANTITY` - 最新确认纪元编号
* `latestFinalized`: `QUANTITY` - latest finallized epoch number (Added from v2.0)
* `latestState`: `QUANTITY` - 最新状态纪元编号
* `pendingTxNumber`: `QUANTITY` - 当前待处理纪元数

##### 示例

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

返回conflux-rust版本。

#### 参数

无。

#### 返回值

* `STRING` - 客户端版本

##### 示例

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

返回指定纪元中所有已执行区块的奖励信息。

#### 参数

1. `QUANTITY|TAG` - 整数纪元编号，或字符串 `"latest_checkpoint"`, 参见 [纪元编号参数](#the-default-epochnumber-parameter)

```json
params: [
  "0x5ee248"
]
```

Please note that reward calculation is delayed so it might not be available for the latest few epochs (including `"latest_state"`).

#### 返回值

`Array` - 奖励信息对象的数组

* `blockHash`: `DATA` - 区块哈希
* `author`: `BASE32` - 挖得区块的矿工地址
* `totalReward`: `QUANTITY` - 区块的总奖励，包括基础奖励、交易费、质押奖励
* `baseReward`: `QUANTITY` - 基础奖励
* `txFee`: `QUANTITY` - 交易费

##### 示例

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

如果提供的主区块哈希正确，则返回请求的区块；否则返回错误。

#### 参数

* `DATA`, 区块哈希
* `DATA`, 提供的主区块哈希
* `QUANTITY`, 整数纪元号

```json
params: [
   "0x3912275cf09f8982a69735a876c14584dae95078762090c5d32fdf0dbec0647c",
   "0x3912275cf09f8982a69735a876c14584dae95078762090c5d32fdf0dbec0647c",
   "0xba28"
]
```

#### 返回值
查看 [cfx_getBlockByhash](#cfx_getblockbyhash)。

##### 示例

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getBlockByHashWithPivotAssumption","params":["0x3912275cf09f8982a69735a876c14584dae95078762090c5d32fdf0dbec0647c", "0x3912275cf09f8982a69735a876c14584dae95078762090c5d32fdf0dbec0647c", "0xba28"],"id":1}' -H "Content-Type: application/json" localhost:12539
```

结果参见 [cfx_getBlockByHash](#cfx_getblockbyhash).

---

### cfx_getDepositList

Returns the deposit list of the given account, identified by its address.

#### 参数

1. `BASE32` - 账户地址。
2. `QUANTITY|TAG` - （可选，默认为`"latest_state"`）整数纪元号，或字符串 `"latest_state"`、`"latest_confirmed"`、`"latest_checkpoint"` 或 `"earliest"`，详见 [纪元号参数](#the-default-epochnumber-parameter)。

```json
params: [
   "cfx:aan02vpwvz8crpa1n10j17ufceefptdc2yzkagxk5u",
   "latest_state"
]
```

#### 返回值

`Array` - array of deposit info objects:

* `accumulatedInterestRate`: `QUANTITY` - the accumulated interest rate at the time of the deposit.
* `amount`: `QUANTITY` - the number of tokens deposited.
* `depositTime`: `QUANTITY` - the time of the deposit.

##### 示例

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

#### 参数

1. `BASE32` - 账户地址。
2. `QUANTITY|TAG` - （可选，默认为`"latest_state"`）整数纪元号，或字符串 `"latest_state"`、`"latest_confirmed"`、`"latest_checkpoint"` 或 `"earliest"`，详见 [纪元号参数](#the-default-epochnumber-parameter)。

```json
params: [
   "cfx:aan02vpwvz8crpa1n10j17ufceefptdc2yzkagxk5u",
   "latest_state"
]
```

#### 返回值

`Array` - array of vote info objects:

* `amount`: `QUANTITY` - the number of tokens locked.
* `unlockBlockNumber`: `QUANTITY` - the block number at which the locked tokens are released.

For getting the current block number, please refer to [conflux-rust#1973](https://github.com/Conflux-Chain/conflux-rust/issues/1973).

##### 示例

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

#### 参数

无。

#### 返回值

`Object` - Object include the supply summary info.

* `totalIssued`: `QUANTITY` - Amount of total issued CFX in Drip
* `totalCollateral`: `QUANTITY` - Amount of total storage collateraled CFX in Drip
* `totalStaking`: `QUANTITY` - Amount of total staking CFX in Drip
* `totalCirculating`: `QUANTITY` - Amount: `TotalIssued` - `FourYearUnlock` - `TwoYearUnlock`
* `totalEspaceTokens`: `QUANTITY` - Amount of total eSpace CFX in Drip (Added in Conflux-Rust v2.0.1)

#### 示例

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

#### 参数

1. `BASE32` - 账户地址。

```json
params: [
    "cfx:aan02vpwvz8crpa1n10j17ufceefptdc2yzkagxk5u"
]
```

#### 返回值

`Object` - Object include account's pending info.

* `localNonce`: `QUANTITY` - User's transaction pool nonce that can be used for next transaction.
* `pendingNonce`: `QUANTITY` - User's current pending nonce
* `pendingCount`: `QUANTITY` - Count of pending transaction
* `nextPendingTx`: `DATA` - Hash of next pending transaction

#### 示例

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

#### 参数

1. `BASE32` - 账户地址。
2. [`QUANTITY`] - Optional start nonce to return
3. [`QUANTITY`] - Optional `limit` of pending transactions to return

```json
params: [
    "cfx:aan02vpwvz8crpa1n10j17ufceefptdc2yzkagxk5u"
]
```

#### 返回值

`Object` - Object include account's pending transaction info.

* `firstTxStatus`: `OBJECT` - An object with only one field `pending`, it's value is the first pending transaction's status. Only have three case `futureNonce`, `notEnoughCash`. Or just a string `ready`
* `pendingCount`: `QUANTITY` - Count of pending transactions
* `pendingTransactions`: `ARRAY` - Array of pending [transaction](#cfx_gettransactionbyhash)

#### 示例

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

#### 参数

1. `QUANTITY` - the block number.
2. `Boolean` - 如果 `true`，返回完整的交易对象。 如果为 `false`，只会返回交易的哈希值。

```json
params: [
    "0x1000",
    true
]
```

#### 返回值

查看 [cfx_getBlockByhash](#cfx_getblockbyhash)。

#### 示例

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getBlockByBlockNumber","params":["0x1000", false],"id":1}' -H "Content-Type: application/json" localhost:12539
```

结果参见 [cfx_getBlockByHash](#cfx_getblockbyhash).

---

### cfx_getPoSEconomics

Returns PoS economics summary info.

#### Added at

`Conflux-rust v2.0.0`

#### 参数

1. [`QUANTITY`] - (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-default-epochnumber-parameter)

#### 返回值

* `distributablePosInterest`: `QUANTITY` Total distributable PoS interest (Unit is Drip)
* `lastDistributeBlock`: `QUANTITY` Last block that distributable PoS interest
* `totalPosStakingTokens`: `QUANTITY` Total tokens staked in PoS (Unit is Drip)

#### 示例

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

#### 参数

1. `QUANTITY`: PoW epoch number

```json
params: [
  "0x4a"
]
```

#### 返回值

* `accountRewards`: `Array` of [AccountReward](#accountreward)
* `powEpochHash`: `HASH` - the hash value of the PoW block when the rewards are made

##### AccountReward

* `posAddress`: `ADDRESS` - PoS account address
* `powAddress`: `BASE32` - PoW account address
* `reward`: `QUANTITY` - the number of rewards, in the unit of Drip

##### 示例

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

#### 参数

1. `QUANTITY`: (optional, default: `"latest_state"`) integer epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-default-epochnumber-parameter)

```json
params: [
  "0x4a"
]
```

#### 返回值

* `powBaseReward`: `QUANTITY` - The PoW base reward amount
* `interestRate`: `QUANTITY` - The PoS interest rate
* `storagePointProp`: `QUANTITY` - The integer parameter determining the proportion of sponsored storage which will transfer to storage point. The proportion is calculated as `storagePointProp / (storagePointProp + 10**18)`.
* `baseFeeShareProp`: `QUANTITY` - The integer parameter determining the proportion of transaction base fee which will reward to miner. Added in Conflux-Rust v2.4.0. The proportion is calculated as `baseFeeShareProp / (baseFeeShareProp + 10**18)`.

##### 示例

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "cfx_getParamsFromVote",
    "params": []
}'
```

Response

```json
{
    "jsonrpc": "2.0",
    "result": {
        "powBaseReward": "0xdeeb372cab9eb32",
        "interestRate": "0x9f69",
        "storagePointProp": "0xde0b6b3a7640000",
        "baseFeeShareProp": "0xde0b6b3a7640000"
    },
    "id": 1
}
```

### cfx_newFilter

This function creates a log filter for tracking usage. It returns a log filter ID, which can be employed through the [cfx_getFilterChanges](#cfx_getfilterchanges) command to retrieve logs newly generated from recently executed transactions. The `from*` field in this context will be disregarded by this RPC (Remote Procedure Call). This function can also be used via [cfx_getFilterLogs](#cfx_getfilterlogs) to retrieve all logs that match the filter criteria. In this instance, the `from*` fields are considered.

It is important to note that the filter object will expire after a certain period of inactivity from the last request, typically 60 seconds. This expiration duration is configured by the node. To avoid losing log tracking, it is recommended to refresh or recreate the filter as necessary.

#### 参数

1. `object` - 日志过滤对象：
    * `fromEpoch`: `QUANTITY|TAG` - (可选，默认为: `"latest_checkpoint"`) 纪元号，或字符串 `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, 详见 [纪元号参数](#the-default-epochnumber-parameter)。 The start epoch to search. Noting that [cfx_getFilterChanges] will ignore this parameter.
    * `toEpoch`: `QUANTITY|TAG` - (可选，默认为: `"latest_state"`) 纪元号，或字符串 `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, 详见 [纪元号参数](#the-default-epochnumber-parameter)。 搜索将持续到(包括)这个纪元数。
    * `fromBlock`: `QUANTITY` - (可选，默认为: `null`)。 The start block to search. Noting that [cfx_getFilterChanges] will ignore this parameter.
    * `toBlock`: `QUANTITY` - (可选， 默认为: `null`)。 搜索将被应用持续到(包括) 此指定区块。
    * `blockHashes`: `Array` `DATA` - (可选，默认为: `null`)搜索会被应用到最多128个区块哈希的数组。 如果不是`null`，则会覆盖 from/to 纪元 字段。
    * `address`: `Array` of `BASE32` - (可选, 默认为: `null`) 搜索合约地址。 如果为 `null`, 匹配所有。 如果指定了，日志必须由这些合约中的一个生成。
    * `topics`: `Array` - (可选, 默认值: `null`) 每个主题32个字节。 日志可以有 `4` 个主题：事件签名和最多 `3` 个索引事件参数。 `topics` 的元素与相应的日志主题匹配。 示例： `["0xA", null, ["0xB", "0xC", 空]` 将日志与 `"0xA"` 匹配为第一个主题和 (`"0xB"` 或 `"0xC"`)为第三个主题。 如果为 `null`, 匹配所有。

```json
params: [
    {
        "fromEpoch": "0x873e12",
        "toEpoch": "0x87431b",
        "address": "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
        "topics": [["0x233e08777131763a85257b15eafc9f96ef08f259653d9944301ff924b3917cf5", "0xd7fb65c06987247ab480a21659e16bdf0b5862a19869ec264075d50ab3525435"], null, "0x0000000000000000000000001d618f9b63eca8faf90faa9cb799bf4bfe616c26"],
    }
]
```

#### 返回值

`QUANTITY` - the id of the log filter object.

##### 示例

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "cfx_newFilter",
    "params": ["fromEpoch": "0x873e12"]
}'
```

Response

```json
{
    "jsonrpc": "2.0",
    "result": "0x09294f7b3b63b52d3771fcafb7b7ed61",
    "id": 1
}
```

### cfx_newBlockFilter

Create a block filter for following up usage. Returns the block filter id which can be used via [cfx_getFilterChanges](#cfx_getfilterchanges) to retrieve latest executed blocks.

It is important to note that the filter object will expire after a certain period of inactivity from the last request, typically 60 seconds. This expiration duration is configured by the node. To avoid losing log tracking, it is recommended to refresh or recreate the filter as necessary.

#### 参数

无。

#### 返回值

`QUANTITY` - the id of the block filter object.

##### 示例

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "cfx_newBlockFilter",
    "params": []
}'
```

Response

```json
{
    "jsonrpc": "2.0",
    "result": "0x09294f7b3b63b52d3771fcafb7b7ed61",
    "id": 1
}
```

### cfx_newPendingTransactionFilter

Create a pending transaction filter for following up usage. Returns the transaction filter id which can be used via [cfx_getFilterChanges](#cfx_getfilterchanges) to retrieve **ready but not executed** transactions.

:::note

The created filter will only filter out ready transactions, which means a pending transaction with a future nonce will never be listed via corresponding [cfx_getFilterChanges](#cfx_getfilterchanges).

:::

Besides, it is important to note that the filter object will expire after a certain period of inactivity from the last request, typically 60 seconds. This expiration duration is configured by the node. To avoid losing log tracking, it is recommended to refresh or recreate the filter as necessary.

#### 参数

无。

#### 返回值

`QUANTITY` - the id of the pending transaction filter object.

##### 示例

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "cfx_newPendingTransactionFilter",
    "params": []
}'
```

Response

```json
{
    "jsonrpc": "2.0",
    "result": "0x09294f7b3b63b52d3771fcafb7b7ed61",
    "id": 1
}
```

### cfx_getFilterChanges

Get filter changes since last retrieve. Return value depends on which type of filter id is provided. Filter id can be returned from current RPCs:

* [cfx_newFilter](#cfx_newfilter): new logs generated from newly executed transactions matching the filter. Noting that `from*` fields will be ignored by this RPC.
* [cfx_newBlockFilter](#cfx_newblockfilter): new executed blocks.
* [cfx_newPendingTransactionFilter](#cfx_newpendingtransactionfilter): new pending transactions which are **ready to execute**.

:::note

The created filter will only filter out ready transactions, which means a pending transaction with a future nonce will never be listed via corresponding [cfx_getFilterChanges](#cfx_getfilterchanges).

:::

#### 参数

1. `QUANTITY` - the filter id.

```json
params: [
  "0x09294f7b3b63b52d3771fcafb7b7ed61"
]
```

#### 返回值

`Array` - array of log receipts (same format as [cfx_getLogs](#cfx_getlogs) return value), block hashes, or transaction hashes depending on the input.

##### 示例

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "cfx_getFilterChanges",
    "params": [0x09294f7b3b63b52d3771fcafb7b7ed61]
}'
```

Response

```json
{
    "jsonrpc": "2.0",
    "result": ["0xcc103077ede14825a5667bddad79482d7bbf1f1a658fed6894fa0e9287fc6be1"],
    "id": 1
}
```

### cfx_getFilterLogs

Returns **all** logs matching the log filter (Unlike `cfx_getFilterChanges`, `from*` fields still work).

#### 参数

1. `QUANTITY` - the filter id.

```json
params: [
  "0x09294f7b3b63b52d3771fcafb7b7ed61"
]
```

#### 返回值

`Array` - array of log receipts (same as [cfx_getLogs](#cfx_getlogs)).

##### 示例

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "cfx_getFilterLogs",
    "params": [0x09294f7b3b63b52d3771fcafb7b7ed61]
}'
```

Response

Refer to [cfx_getLogs](#cfx_getlogs).

### cfx_uninstallFilter

Uninstall the specified filter. Returns a bool whether the uninstallation succeeds.

#### 参数

1. `QUANTITY` - the filter id.

```json
params: [
  "0x09294f7b3b63b52d3771fcafb7b7ed61"
]
```

#### 返回值

`Boolean` - whether the uninstallation succeeds.

##### 示例

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "cfx_uninstallFilter",
    "params": [0x09294f7b3b63b52d3771fcafb7b7ed61]
}'
```

Response

```json
{
    "jsonrpc" : "2.0",
    "result" : true,
    "id" : 1
}
```

### cfx_getEpochReceipts

Returns all transaction receipts within the specific epoch.

:::note

This method is supported by [Confura](../../core-endpoints.md#1-confura) if api key is provided. For normal nodes, this method is also supported, but can only be accessed in local environment.

:::

#### 参数

1. `QUANTITY|TAG` - the epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-default-epochnumber-parameter).
2. `Boolean` - whether eSpace transaction receipts will be included in the return value, defaults to `false`.

```json
params: [
    "0x1000",
    true
]
```

#### 返回值

`Array` -  This is a two-dimensional array of [transaction receipts](#cfx_gettransactionreceipt). Each sub-array represents transactions within a block. Noting an extra field of `space` will be added to each transaction receipt if the second parameter is set to `true`. The value of `space` will be either `native` meaning this is a core space transaction receipt or `evm` meaning the transaction is from eSpace.

##### 示例

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "cfx_getEpochReceipts",
    "params": ["0x1000", true]
}'
```

Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    [],
    [
      {
        "transactionHash": "0x386442f263e3d4b382f97efe577e3bb5956872a322936b8581133be4ec392153",
        "index": "0x0",
        "blockHash": "0x6ebb905fbfcc80506080e639b80d7bc696dab2f6168e01daedf3c15597987da2",
        "epochNumber": "0x7e6f164",
        "from": "cfxtest:aakvz2e5nt82c9nvbbg84hzbrjy53nsdf20ng5wuj1",
        "to": "cfxtest:acbpnfz9mu42a6ubhdcyadj04m2w8wt6sex7atgyg6",
        "gasUsed": "0x15a1b",
        "accumulatedGasUsed": "0x15a1b",
        "gasFee": "0x50957e574e00",
        "contractCreated": null,
        "logs": [],
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "stateRoot": "0x6ef7bcc4d8cb7c777a587a22002930c5d44e62e1047043c44dd44f89d16e462d",
        "outcomeStatus": "0x0",
        "txExecErrorMsg": null,
        "gasCoveredBySponsor": false,
        "storageCoveredBySponsor": false,
        "storageCollateralized": "0x0",
        "storageReleased": [],
        "space": "native"
      }
    ]
  ]
}
```

### cfx_getCollateralInfo

Returns current chain collateral status info.

#### 参数

1. `QUANTITY|TAG` - (optional, default: `"latest_state"`) the epoch number, or the string ``"latest_state"`,`"latest_confirmed"`,`"latest_checkpoint"`or`"earliest"`, see the [epoch number parameter](#the-default-epochnumber-parameter).

```json
params: [
    "latest_state",
]
```

#### 返回值

`Object` - The storage collateral info object of the chain.

* `totalStorageTokens`
* `convertedStoragePoints` - converted storage points of the total chain
* `usedStoragePoints` - storage points already used for sponsorship

##### 示例

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "cfx_getCollateralInfo",
    "params": ["latest_executed"]
}'
```

Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "totalStorageTokens": "0x12c6e8ec75a2740998000",
    "convertedStoragePoints": "0x485ec66",
    "usedStoragePoints": "0x290bc0"
  }
}
```

### cfx_getFeeBurnt

Returns the total burnt tx gas fee by 1559. Added in Conflux-Rust v2.4.0.

#### 参数

无。

#### 返回值

`QUANTITY` - the total burnt tx gas fee by 1559 in Drip.

##### 示例

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getFeeBurnt","id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
    "jsonrpc" : "2.0",
    "result" : "0x09184e72a000",
    "id" : 1
}
```

## Related Topics

* [JSON-RPC specification](https://github.com/conflux-chain/jsonrpc-spec)
* [Nodes and clients](https://github.com/conflux-chain/conflux-rust)
* [JavaScript APIs](https://github.com/conflux-chain/js-conflux-sdk)
* [Backend APIs](https://github.com/conflux-chain/go-conflux-sdk)
