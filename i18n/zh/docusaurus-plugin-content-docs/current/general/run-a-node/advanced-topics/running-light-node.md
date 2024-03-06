---
sidebar_position: 10
title: 运行轻节点
displayed_sidebar: generalSidebar
---

# 运行轻节点

> 注意：目前Conflux轻节点不支持eSpace(EVM完全兼容空间)的RPC方法。

## 概览
**Node version: `conflux-rust v2.1.0`**.

Light nodes are special nodes in the Conflux network that store block headers only and retrieve everything else from their peers on-demand. This means that by default light nodes do not store transactions nor do they store state trees either. This can drastically reduce the disk and bandwidth use of light nodes compared to full and archive nodes, especially under high TPS. As a trade-off RPC queries have a higher latency on light nodes.

Light nodes execute **GHAST** consensus on their local header graph and they also verify each item retrieved on-demand using Merkle proofs and other similar mechanisms. Items retrieved on-demand include accounts, bloom filters, transactions, and transaction receipts. While light nodes need to rely on their peers to fulfill RPC queries they do this in a trustless way.

> The current light node implementation is still considered experimental therefore bugs are expected to exist. If you encounter any issues please let us know by opening an issue on the [conflux-rust](https://github.com/Conflux-Chain/conflux-rust/issues) repository.

## 运行轻节点

轻节点可以在`hydra.toml`设置文件中启用（对于测试网是`testnet.toml`），在`node_type`变量中设置。

```bash
node_type = "light"
```

> 或者，可以使用`--light`在命令行中启用轻节点：

首先从[conflux-rust](https://github.com/Conflux-Chain/conflux-rust/)仓库下载最新版本，或按照本指南从源代码构建。 然后，您可以使用这些命令运行节点：

```bash
> cd run
> ./conflux --config hydra.toml
```

与完整节点一样，一旦`控制台`打印出以下信息，您就会知道您的节点已经与网络完全同步了：

```bash+
Catch-up mode: false
```

## 与轻节点交互

与全节点和归档节点一样，您可以通过`HTTP`、`TCP`或`WebSocket`连接与轻节点交互。 默认情况下，本地HTTP查询通过`端口12539`调用。 有关详细信息，请参阅JSON-RPC文档。

### RPC查询
轻节点支持大多数Conflux RPC API，对于其他的API支持也[在开发中](https://github.com/Conflux-Chain/conflux-rust/issues/1461)。 由于轻节点需要查询它们的同伴节点来完成RPC请求，总体延迟略有增加。 （对于`cfx_getLogs`，延迟会显著增加。）

```bash
> curl -X POST --data '{ "jsonrpc": "2.0", "method": "cfx_clientVersion", "id": 1 }' -H "Content-Type: application/json" localhost:12539
{ "jsonrpc": "2.0", "result": "conflux-rust-1.0.0", "id": 1 }

> curl -X POST --data '{ "jsonrpc":"2.0", "method":"cfx_getBalance", "params": ["cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg"], "id": 2 }' -H "Content-Type: application/json" localhost:12539
{ "jsonrpc": "2.0", "result": "0x5fc346d4363f84249d4a", "id": 2 }

> curl -X POST --data '{ "jsonrpc": "2.0", "method": "cfx_getLogs", "params": [{ "address": "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp", "fromEpoch": "0x1c8b8", "toEpoch": "0x1c8d6" }], "id": 3}' -H "Content-Type: application/json" localhost:12539
{ "jsonrpc": "2.0", "result": [{ "address": "CFX:TYPE.CONTRACT:ACC7UAWF5UBTNMEZVHU9DHC6SGHEA0403Y2DGPYFJP", "blockHash": "0x694898c77602511b6c411860ec230ac7ca58c08a4cbe3cad904e724b2eb97fee", "data": "0x0000000000000000000000000000000000000000000000049b9ca9a694340000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000141da5f533abef1b82a4a6d698415b8a56894b7b410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "epochNumber": "0x1c8bf", "logIndex": "0x0", "topics": ["0x06b541ddaa720db2b10a4d0cdac39b8d360425fc073085fac19bc82614677987","0x0000000000000000000000001da5f533abef1b82a4a6d698415b8a56894b7b41","0x0000000000000000000000001da5f533abef1b82a4a6d698415b8a56894b7b41","0x00000000000000000000000080bb30efc5683758128b404fe5da03432eb16634"], "transactionHash": "0x7dcfeb245369e509f2d154f2d5523e3ebe0b54f1d420e02edf56c70cdcae278d", "transactionIndex": "0x0", "transactionLogIndex": "0x0" },{ "address": "CFX:TYPE.CONTRACT:ACC7UAWF5UBTNMEZVHU9DHC6SGHEA0403Y2DGPYFJP", "blockHash": "0x694898c77602511b6c411860ec230ac7ca58c08a4cbe3cad904e724b2eb97fee", "data": "0x0000000000000000000000000000000000000000000000049b9ca9a694340000", "epochNumber": "0x1c8bf", "logIndex": "0x1", "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000001da5f533abef1b82a4a6d698415b8a56894b7b41","0x00000000000000000000000080bb30efc5683758128b404fe5da03432eb16634"], "transactionHash": "0x7dcfeb245369e509f2d154f2d5523e3ebe0b54f1d420e02edf56c70cdcae278d", "transactionIndex": "0x0", "transactionLogIndex": "0x1" }], "id": 3 } -H "Content-Type: application/json" localhost:12539
```

### JavaScript
轻节点支持JavaScript SDK（[js-conflux-sdk](https://www.npmjs.com/package/js-conflux-sdk)）的大部分功能。 您可以使用以下命令安装SDK：

```bash
npm install --save js-conflux-sdk
```

然后，您可以查询区块链和发送交易：

```js
const { Conflux, Drip } = require('js-conflux-sdk');

const PRIVATE_KEY = '0x...';
const RECEIVER = 'cfx:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg';

async function main() {
  const conflux = new Conflux({ url: 'http://localhost:12539' });

  // query node version
  const client_version = await conflux.provider.call('cfx_clientVersion');
  console.log('client_version:', client_version);

  // query account balance
  const balance = await conflux.getBalance('cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg');
  console.log('balance:', balance.toString(10));

  // query smart contract logs
  const logs = await conflux.getLogs({
    address: 'cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp',
    fromEpoch: 116920,
    toEpoch: 116950,
  });

  console.log('logs:', logs);

  // send transaction
  const account = conflux.wallet.addPrivateKey(PRIVATE_KEY);

  const tx = {
    from: account.address,
    to: RECEIVER,
    value: Drip.fromCFX(0.1),
    gasPrice: 1000000000,
  };

  try {
    const receipt = await conflux.sendTransaction(tx).executed();
    console.log('receipt:', receipt);
  } catch (e) {
    console.error(e);
  }
}

main();
```

### 其他SDK

虽然尚未经过测试，但预期轻节点也能与[Java](https://github.com/Conflux-Chain/java-conflux-sdk)、[Python](https://github.com/Conflux-Chain/python-conflux-sdk)和[Go](https://github.com/Conflux-Chain/go-conflux-sdk) SDK适配。

## 故障排除
### 为什么在调用合约方法时出错？

如果您运行以下代码：

```js
const admin = await cfx.InternalContract('AdminControl').getAdmin('cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp');
console.log('admin:', admin);
```

您将得到此错误：

```bash
RPCError: This API is not implemented yet
    at HttpProvider.call
    at processTicksAndRejections
    at async Conflux.call
    at async MethodTransaction.call
    at async MethodTransaction.then {
  code: -32000,
  data: 'Tracking issue: https://github.com/Conflux-Chain/conflux-rust/issues/1461'
}
```

这是因为合约调用使用`cfx_call` RPC API，而轻节点尚未支持此API。

假设您想向智能合约发送交易：

```js
conflux.InternalContract('AdminControl').setAdmin('cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp', 'cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg').sendTransaction({
  from: account,
}).executed();
```

您将得到一个类似的错误。 这是因为对于合约交易，`js-conflux-sdk`会自动尝试使用`cfx_estimateGasAndCollateral` RPC估算燃料限制和存储限制，而这在轻节点上尚未支持。 您可以通过手动设置这些参数来解决这个问题：

```js
conflux.InternalContract('AdminControl').setAdmin('cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp', 'cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg').sendTransaction({
  from: account,
  gas: 1000000000,
  storageLimit: '0x0',
  gasPrice: '0x1',
}).executed();
```

如果您遇到了`This API is not implemented yet`错误，您可以在conflux对象上设置debug日志记录器，以找出是哪个RPC造成了这个问题。

```js
const cfx = new Conflux({
  url: 'http://localhost:12539',
  logger: console,
});
```

### 为什么我看到超时而不是null？
对于大多数操作，您有时可能会看到超时错误：

```bash
RPCError: Operation timeout: "Timeout while retrieving transaction with hash 0x497755f45baef13a35347933c48c0b8940f2cc3347477b5ed9f165581b082699"
```

这是因为轻节点必须从它们的同伴节点检索交易和其他项目。 如果没有同伴节点在4秒内响应，您将得到一个超时错误。 在大多数情况下，若重试查询，通常都会成功。

如果您调用`conflux.getTransactionByHash`并传递一个不存在的交易哈希值，您也会得到一个超时错误。 这是因为轻节点无法验证交易的“不存在”，因此返回`null`可能会产生误导。 此行为将来可能会更改。

### 我在搜索事件日志，为什么这么慢？

在轻节点上进行日志过滤是一个非常昂贵的操作。 对于您指定范围内的每个纪元，节点需要执行1到3次查询。 我们建议您使用更小的纪元范围进行多次查询。

与其用下面这种交互方式

```js
const fromEpoch = 110000;
const toEpoch = 119999;

// NOT RECOMMENDED
const logs = await cfx.getLogs({ fromEpoch, toEpoch, address: 'cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp' });
console.log('logs:', logs);
```

我们更推荐您使用这种交互方式

```js
for (ii = 0; ii < 10; ++ii) {
  const fromEpoch = 110000 + ii * 1000;
  const toEpoch = 110000 + (ii + 1) * 1000 - 1;
  const logs = await cfx.getLogs({ fromEpoch, toEpoch, address: 'cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp' });
  console.log('logs:', logs);
}
```

## RPC可用性

| RPC                                                                                                                          | 状态     |
| ---------------------------------------------------------------------------------------------------------------------------- | ------ |
| [cfx_call](../../../core/build/json-rpc/cfx-namespace.md#cfx_call)                                                           | ❌ 暂不支持 |
| [cfx_checkBalanceAgainstTransaction](../../../core/build/json-rpc/cfx-namespace.md#cfx_checkbalanceagainsttransaction)       | ✅ 支持   |
| [cfx_clientVersion](../../../core/build/json-rpc/cfx-namespace.md#cfx_clientversion)                                         | ✅ 支持   |
| [cfx_epochNumber](../../../core/build/json-rpc/cfx-namespace.md#cfx_epochnumber)                                             | ✅ 支持   |
| [cfx_estimateGasAndCollateral](../../../core/build/json-rpc/cfx-namespace.md#cfx_estimategasandcollateral)                   | ❌ 暂不支持 |
| [cfx_gasPrice](../../../core/build/json-rpc/cfx-namespace.md#cfx_gasprice)                                                   | ✅ 支持   |
| [cfx_getAccount](../../../core/build/json-rpc/cfx-namespace.md#cfx_getaccount)                                               | ✅ 支持   |
| [cfx_getAccumulateInterestRate](../../../core/build/json-rpc/cfx-namespace.md#cfx_getaccumulateinterestrate)                 | ✅ 支持   |
| [cfx_getAdmin](../../../core/build/json-rpc/cfx-namespace.md#cfx_getadmin)                                                   | ✅ 支持   |
| [cfx_getBalance](../../../core/build/json-rpc/cfx-namespace.md#cfx_getbalance)                                               | ✅ 支持   |
| [cfx_getBestBlockHash](../../../core/build/json-rpc/cfx-namespace.md#cfx_getbestblockhash)                                   | ✅ 支持   |
| [cfx_getBlockByEpochNumber](../../../core/build/json-rpc/cfx-namespace.md#cfx_getblockbyepochnumber)                         | ✅ 支持   |
| [cfx_getBlockByHash](../../../core/build/json-rpc/cfx-namespace.md#cfx_getblockbyhash)                                       | ✅ 支持   |
| [cfx_getBlockByHashWithPivotAssumption](../../../core/build/json-rpc/cfx-namespace.md#cfx_getblockbyhashwithpivotassumption) | ✅ 支持   |
| [cfx_getBlockRewardInfo](../../../core/build/json-rpc/cfx-namespace.md#cfx_getblockrewardinfo)                               | ❌ 暂不支持 |
| [cfx_getBlocksByEpoch](../../../core/build/json-rpc/cfx-namespace.md#cfx_getblocksbyepoch)                                   | ✅ 支持   |
| [cfx_getCode](../../../core/build/json-rpc/cfx-namespace.md#cfx_getcode)                                                     | ✅ 支持   |
| [cfx_getCollateralForStorage](../../../core/build/json-rpc/cfx-namespace.md#cfx_getcollateralforstorage)                     | ✅ 支持   |
| [cfx_getConfirmationRiskByHash](../../../core/build/json-rpc/cfx-namespace.md#cfx_getconfirmationriskbyhash)                 | ✅ 支持   |
| [cfx_getInterestRate](../../../core/build/json-rpc/cfx-namespace.md#cfx_getinterestrate)                                     | ✅ 支持   |
| [cfx_getLogs](../../../core/build/json-rpc/cfx-namespace.md#cfx_getlogs)                                                     | ✅ 支持   |
| [cfx_getNextNonce](../../../core/build/json-rpc/cfx-namespace.md#cfx_getnextnonce)                                           | ✅ 支持   |
| [cfx_getSkippedBlocksByEpoch](../../../core/build/json-rpc/cfx-namespace.md#cfx_getskippedblocksbyepoch)                     | ✅ 支持   |
| [cfx_getSponsorInfo](../../../core/build/json-rpc/cfx-namespace.md#cfx_getsponsorinfo)                                       | ✅ 支持   |
| [cfx_getStakingBalance](../../../core/build/json-rpc/cfx-namespace.md#cfx_getstakingbalance)                                 | ✅ 支持   |
| [cfx_getStatus](../../../core/build/json-rpc/cfx-namespace.md#cfx_getstatus)                                                 | ✅ 支持   |
| [cfx_getStorageAt](../../../core/build/json-rpc/cfx-namespace.md#cfx_getstorageat)                                           | ✅ 支持   |
| [cfx_getStorageRoot](../../../core/build/json-rpc/cfx-namespace.md#cfx_getstorageroot)                                       | ✅ 支持   |
| [cfx_getTransactionByHash](../../../core/build/json-rpc/cfx-namespace.md#cfx_gettransactionbyhash)                           | ✅ 支持   |
| [cfx_getTransactionReceipt](../../../core/build/json-rpc/cfx-namespace.md#cfx_gettransactionreceipt)                         | ✅ 支持   |
| [cfx_sendRawTransaction](../../../core/build/json-rpc/cfx-namespace.md#cfx_sendrawtransaction)                               | ✅ 支持   |
| [cfx_getSupplyInfo](../../../core/build/json-rpc/cfx-namespace.md#cfx_getsupplyinfo)                                         | ❌ 暂不支持 |
