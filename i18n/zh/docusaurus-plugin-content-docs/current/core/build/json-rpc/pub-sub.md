---
id: pubsub
title: 发布/订阅 API
description: The Publish-Subscribe API of Conflux Core Space
sidebar_position: 6
keywords:
  - conflux
  - pubsub
  - publish-subscribe
  - websocket
  - tcp
  - real-time
  - newHeads
  - epochs
  - logs
  - subscription
  - event streaming
  - blockchain events
  - real-time updates
  - chain reorganization
tags:
  - API
  - PubSub
  - WebSocket
  - TCP
  - Real-Time
  - NewHeads
  - Epochs
  - Logs
  - Subscription
  - Event-Streaming
  - Blockchain-Events
  - Real-Time-Updates
  - Chain-Reorganization
  - Node-Communication
  - Data-Streaming
  - Block-Notifications
  - Transaction-Notifications
  - Log-Filtering
  - Epoch-Tracking
  - Pivot-Chain-Updates
  - Subscription-Management
  - Event-Driven-Architecture
  - Asynchronous-Notifications
  - Continuous-Data-Feed
  - State-Synchronization
displayed_sidebar: coreSidebar
---

Conflux 的发布-订阅 API（也称为 pub-sub）使得可以持续地查询特定的项目，而不需要通过 JSON-RPC HTTP 接口进行轮询。 你可以在 TCP 或 WebSocket 连接之上使用 Conflux 的发布-订阅 API（也称为 pub-sub）。

使用发布-订阅 API，请确保您可以访问具有 TCP 或 WebSocket 端口打开的节点。 如果您维护自己的节点，请确保其 TCP 或 WebSocket 端口已打开，以便使用发布-订阅 API。您可以使用命令行接口（CLI）标志`--jsonrpc-tcp-port PORT` 和`--jsonrpc-ws-port PORT`（参见`conflux --help`），或者通过 `jsonrpc_tcp_port` 和 `jsonrpc_ws_port` 配置参数（参见 `run/default.toml`）进行设置。 在本文档中，我们将使用默认的 TCP 端口（`12536`）和 WebSocket 端口（`12535`）。

## 订阅

您可以通过 `cfx_subscribe` JSON-RPC 订阅主题。 这将返回一个订阅 ID，稍后可以使用 `cfx_unsubscribe` JSON-RPC 取消订阅。

以下是如何使用 `nc`（`netcat`）在 TCP 连接上创建订阅的示例：

```json
> nc localhost 12536
{ "jsonrpc": "2.0", "method": "cfx_subscribe", "params": ["topic"], "id": 1 }
{ "jsonrpc": "2.0", "result": "0x2ee8e71befef9049", "id": 1 }
...
{ "jsonrpc": "2.0", "method": "cfx_unsubscribe", "params": ["0x2ee8e71befef9049"], "id": 2 }
{ "jsonrpc": "2.0", "result": true, "id": 2 }
```

以下示例展示了如何使用 `websocat` 在 WebSocket 连接上创建订阅：

```json
> websocat ws://localhost:12535
{ "jsonrpc": "2.0", "method": "cfx_subscribe", "params": ["topic"], "id": 1 }
{ "jsonrpc": "2.0", "result": "0x2ee8e71befef9049", "id": 1 }
...
{ "jsonrpc": "2.0", "method": "cfx_unsubscribe", "params": ["0x2ee8e71befef9049"], "id": 2 }
{ "jsonrpc": "2.0", "result": true, "id": 2 }
```

目前，我们支持以下主题：`newHeads`，`epochs`，`logs`。

## `newHeads`

`newHeads` 主题流式传输所有参与共识的新区块头。

```json
{ "jsonrpc": "2.0", "method": "cfx_subscribe", "params": ["newHeads"], "id": 1 }
{ "jsonrpc": "2.0", "result": "0x2ee8e71befef9049", "id": 1 }

{ "jsonrpc": "2.0", "method": "cfx_subscription", "params": { "result": { "adaptive": false, "blame": 0, "deferredLogsBloomHash": "0xd397b3b043d87fcd6fad1291ff0bfd16401c274896d8c63a923727f077b8e0b5", "deferredReceiptsRoot": "0x959684cc863003d5ac5cb31bcf5baf7e1b4fc60963fcc36fbc1bf4394a0e2e3c", "deferredStateRoot": "0x72884d26f7de73cce4a06bddb985a7d9f8406c836dffdc8000f309684e55f9f3", "difficulty": "0x4", "epochNumber": "0x6a", "gasLimit": "0xb2d05e00", "hash": "0xcdd3831280b42552c4bdfe2893892d96008f1788f37122cbccf09b172f7035df", "height": "0x6a", "miner": "CFX:TYPE.USER:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG", "nonce": "0xd68368be06ba1a73", "parentHash": "0x16a3dfdb6beeb91a36019efedcb4863b854d98353ed1b260e4088f3cbb6510ad", "refereeHashes": [], "stable": true, "timestamp": "0x5e478223", "transactionsRoot": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347" }, "subscription": "0x7b40ad26c24752d3" }}
{ "jsonrpc": "2.0", "method": "cfx_subscription", "params": { "result": { "adaptive": false, "blame": 0, "deferredLogsBloomHash": "0xd397b3b043d87fcd6fad1291ff0bfd16401c274896d8c63a923727f077b8e0b5", "deferredReceiptsRoot": "0x959684cc863003d5ac5cb31bcf5baf7e1b4fc60963fcc36fbc1bf4394a0e2e3c", "deferredStateRoot": "0xd7bb2ad6406b7ec8c4ed3f424b5cb08f23483a6208f1c551e7f8a54e7c764462", "difficulty": "0x4", "epochNumber": "0x6b", "gasLimit": "0xb2d05e00", "hash": "0xd8f1eead32f32fdd909e3654357d90846114e26931448701af086a41fcf725ef", "height": "0x6b", "miner": "CFX:TYPE.USER:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG", "nonce": "0xf590aad206a65c1c", "parentHash": "0xcdd3831280b42552c4bdfe2893892d96008f1788f37122cbccf09b172f7035df", "refereeHashes": [], "stable": true, "timestamp": "0x5e478224", "transactionsRoot": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347" }, "subscription": "0x7b40ad26c24752d3" }}
...
```

## `epochs`

`epochs` 主题流式传输共识结果：区块的全序，由一系列 epoch 表示。

返回的纪元数（epoch number）序列是单调递增的，每个数字之间增加一。 如果你看到同一个 epoch 两次，说明可能发生了主链重组（这可能发生在最近的 epoch 中）。

一个可选的参数可以传递以控制订阅的 epoch。 可用的值为 `latest_state` 和 `latest_mined`（默认值）。

```json
{ "jsonrpc": "2.0", "method": "cfx_subscribe", "params": ["epochs"], "id": 1 }
{ "jsonrpc": "2.0", "result": "0xde5801fda9520049", "id": 1 }

{ "jsonrpc": "2.0", "method": "cfx_subscription", "params": { "result": { "epochNumber": "0x6a7", "epochHashesOrdered": ["0x6f21f408476f404ecc07f0a52170ffdf62ca23497bdc3e3d64429b2c26308e00"]}, "subscription": "0xcd73be4533944f33" }}
{ "jsonrpc": "2.0", "method": "cfx_subscription", "params": { "result": { "epochNumber": "0x6a8", "epochHashesOrdered": ["0x1bb99ee21dade175959da6a0a373a6f75732a2a7ea67adbda97f1bf7b4574ff1"]}, "subscription": "0xcd73be4533944f33" }}
{ "jsonrpc": "2.0", "method": "cfx_subscription", "params": { "result": { "epochNumber": "0x6a8", "epochHashesOrdered": ["0xd8d4ed0ff02c3d61bbcd13095b1a4d21eb43cee8c40e7e7e7c5a41a861cda409"]}, "subscription": "0xcd73be4533944f33" }}
{ "jsonrpc": "2.0", "method": "cfx_subscription", "params": { "result": { "epochNumber": "0x6a9", "epochHashesOrdered": ["0x1bb99ee21dade175959da6a0a373a6f75732a2a7ea67adbda97f1bf7b4574ff1", "0x9df97d1c8228d33dacd7367e4db4fd29f879fcf2679f947ee90f5d4ce035a206"]}, "subscription": "0xcd73be4533944f33" }}
{ "jsonrpc": "2.0", "method": "cfx_subscription", "params": { "result": { "epochNumber": "0x6aa", "epochHashesOrdered": ["0xe322882ee1acb79e0b7eb394db9aeede67c6198641762da8a50b4bb6b48cc2a4"]}, "subscription": "0xcd73be4533944f33" }}
...
```

每个 epoch，`epochHashesOrdered` 中的 **最后一个** 哈希是主链区块的哈希。 以下是示例中，我们知道当前主链的最后一部分：

```
0x6f21f408476f404ecc07f0a52170ffdf62ca23497bdc3e3d64429b2c26308e00 (epoch 0x6a7)
0xd8d4ed0ff02c3d61bbcd13095b1a4d21eb43cee8c40e7e7e7c5a41a861cda409 (epoch 0x6a8)
0x9df97d1c8228d33dacd7367e4db4fd29f879fcf2679f947ee90f5d4ce035a206 (epoch 0x6a9)
0xe322882ee1acb79e0b7eb394db9aeede67c6198641762da8a50b4bb6b48cc2a4 (epoch 0x6aa)
```

## `logs`

`logs` 主题按顺序流式传输与特定筛选条件匹配的所有日志。

筛选器格式遵循 `cfx_getLogs` JSON-RPC API。 这是一个 JSON 对象，包含以下（可选）字段： `address` （合约地址）和 `topics` （有序索引日志主题数组）。

如果发生 pivot chain 重组（可能会影响最近的日志），则会发送一个特殊的 `revert` 消息。 所有之前接收到的属于大于该消息中所述的 epochs 的日志都应视为无效。

```json
{ "jsonrpc": "2.0", "method": "cfx_subscribe", "params": ["logs", { "topics": ["0xc822296d568499547c3a5b93a500428bab54ef8f6a481f352c7086f1daf4277f"] }], "id": 1 }
{ "jsonrpc": "2.0", "result": "0x2dd59588c475a772", "id": 1 }

{ "jsonrpc": "2.0", "method": "cfx_subscription", "params": { "result": { "epochNumber": "0x3f3", "transactionHash": "0x89ee0aa76bc1a7c9340f3efcfc7c8263a212cadcb32f0231ef1395ef9c587899", "address": "CFX:TYPE.CONTRACT:ACC7UAWF5UBTNMEZVHU9DHC6SGHEA0403Y2DGPYFJP", "blockHash": "0x929ad718797e03cce31f66f234e12893c8be5e959dba14b8328205c9c136ddbe", "data": "0x000000000000000000000000f8b133b3dad547cdf0be685399b39241f2e6e77d", "logIndex": "0x0", "topics": ["0xc822296d568499547c3a5b93a500428bab54ef8f6a481f352c7086f1daf4277f", "0x000000000000000000000000f8b133b3dad547cdf0be685399b39241f2e6e77d"], "transactionIndex": "0x0", "transactionLogIndex": "0x0" }, "subscription": "0x2dd59588c475a772" }}
{ "jsonrpc": "2.0", "method": "cfx_subscription", "params": { "result": { "epochNumber": "0x40f", "transactionHash": "0x5cf00bb4ee966c340f459c57a53e4be7357bdf23bb055a95066d4408d5ecf118", "address": "CFX:TYPE.CONTRACT:ACCKUCYY5FHZKNBXMEEXWTAJ3BXMEG25B2B50PTA6V", "blockHash": "0xede319ddfa7a9710aef627aa152052da190d3798d2ad7fd7da8d953b48a1785e", "data": "0x000000000000000000000000f8b133b3dad547cdf0be685399b39241f2e6e77d", "logIndex": "0x0", "topics": ["0xc822296d568499547c3a5b93a500428bab54ef8f6a481f352c7086f1daf4277f", "0x000000000000000000000000f8b133b3dad547cdf0be685399b39241f2e6e77d"], "transactionIndex": "0x0", "transactionLogIndex": "0x0" }, "subscription": "0x2dd59588c475a772" }}
{ "jsonrpc": "2.0", "method": "cfx_subscription", "params": { "result": { "epochNumber": "0x411", "transactionHash": "0xf639c7b26df0d60bc8306c7877d7ec3c361b2157d14b12b704ea5500d70d8798", "address": "CFX:TYPE.CONTRACT:ACC7UAWF5UBTNMEZVHU9DHC6SGHEA0403Y2DGPYFJP", "blockHash": "0x3742f695f9b2270b51b9a409ff499caf298dd46dc9d3bbe8360c4997ce9b00c7", "data": "0x000000000000000000000000f8b133b3dad547cdf0be685399b39241f2e6e77d", "logIndex": "0x0", "topics": ["0xc822296d568499547c3a5b93a500428bab54ef8f6a481f352c7086f1daf4277f", "0x000000000000000000000000f8b133b3dad547cdf0be685399b39241f2e6e77d"], "transactionIndex": "0x0", "transactionLogIndex": "0x0" }, "subscription": "0x2dd59588c475a772" }}
{ "jsonrpc": "2.0", "method": "cfx_subscription", "params": { "result": { "revertTo": "0x40f" }, "subscription": "0x2dd59588c475a772" }}
{ "jsonrpc": "2.0", "method": "cfx_subscription", "params": { "result": { "epochNumber": "0x410", "transactionHash": "0xf639c7b26df0d60bc8306c7877d7ec3c361b2157d14b12b704ea5500d70d8798", "address": "CFX:TYPE.CONTRACT:ACCKUCYY5FHZKNBXMEEXWTAJ3BXMEG25B2B50PTA6V", "blockHash": "0x24faa39196ee34d1d04cd4c44012bd28a757b251e0551d9503bf6685b467e0d5", "data": "0x000000000000000000000000f8b133b3dad547cdf0be685399b39241f2e6e77d", "logIndex": "0x0", "topics": ["0xc822296d568499547c3a5b93a500428bab54ef8f6a481f352c7086f1daf4277f", "0x000000000000000000000000f8b133b3dad547cdf0be685399b39241f2e6e77d"], "transactionIndex": "0x0", "transactionLogIndex": "0x0" }, "subscription": "0x2dd59588c475a772" }}
...
```

在上面的例子中，`revert` 消息**使所有具有大于 `0x40f` 的 epoch 号的日志无效**（即 epoch `0x410`、`0x411` 等）。 交易 `0xf639c7b...` 被重新执行并对应的日志被再次发布。 这一次，交易结束时处于 `0x410` 块而不是 `0x411`。 所有在包括 **`0x40f`** 在内的 epochs 的日志仍然有效。

*注意：轻节点不支持 `logs` pub-sub 主题。*

## Node.js 示例

以下是通过 Node.js 使用 pub-sub API 的简单示例。 在这个例子中，我们使用 `epochs` 主题检测 pivot chain 重组。 我们依赖于 `js-conflux-sdk`。 为了简单起见，我们省略了错误处理。

```js
const sdk = require("js-conflux-sdk")
const cfx = new sdk.Conflux({ url: "ws://127.0.0.1:12535" });

(async function () {
    subscription = await cfx.subscribeEpochs()
    let latest_epoch = 0;
    subscription.on('data', data => {
        let epoch = data.epochNumber
        console.log(`epoch ${epoch} produced`)
        if (epoch <= latest_epoch) {
            console.log(`chain reorg of depth ${latest_epoch - epoch} (${latest_epoch} --> ${epoch})`);
        }
        latest_epoch = epoch;
    })
})()

```

示例输出：

```
epoch 3136 produced
epoch 3137 produced
epoch 3138 produced
epoch 3139 produced
epoch 3140 produced
epoch 3141 produced
chain reorg of depth 1 (3142 --> 3141)
chain reorg of depth 1 (3143 --> 3142)
...
```

*注意: 轻度的 pivot chain 重组是非常常见的，因为在主链的末端在稳定前常常会出现波动。*
