---
sidebar_position: 10
title: Running a Light Node
displayed_sidebar: generalSidebar
tags: [node]
---

# Running a Light Node

> Note: Currently, eSpace (EVM full-compatible space) RPC methods are not supported on the Conflux Light Node.

## Overview
**Node version: `conflux-rust v2.1.0`**.

Light nodes are special nodes in the Conflux network that store block headers only and retrieve everything else from their peers on-demand. This means that by default light nodes do not store transactions nor do they store state trees either. This can drastically reduce the disk and bandwidth use of light nodes compared to full and archive nodes, especially under high TPS. As a trade-off RPC queries have a higher latency on light nodes.

Light nodes execute **GHAST** consensus on their local header graph and they also verify each item retrieved on-demand using Merkle proofs and other similar mechanisms. Items retrieved on-demand include accounts, bloom filters, transactions, and transaction receipts. While light nodes need to rely on their peers to fulfill RPC queries they do this in a trustless way.

> The current light node implementation is still considered experimental therefore bugs are expected to exist. If you encounter any issues please let us know by opening an issue on the [conflux-rust](https://github.com/Conflux-Chain/conflux-rust/issues) repository.

## Running a light node

Light nodes can be enabled in the `hydra.toml` settings file (`testnet.toml` for testnet) in the `node_type` variable.

```bash
node_type = "light"
```

> Alternatively Light nodes can be enabled using the `--light` command line flag:

Start by downloading the latest release from the [conflux-rust](https://github.com/Conflux-Chain/conflux-rust/) repository or by building from source code following this guide. Then, you can simply run the node using these commands:

```bash
> cd run
> ./conflux --config hydra.toml
```

Similarly to full nodes you will know when your node is fully synced with the network once the `console` prints:

```bash+
Catch-up mode: false
```

## Interacting with a light node

Similarly to full and archive nodes, you can interact with a light node through an `HTTP`, `TCP`, or `WebSocket` connection. By default local HTTP queries are enabled through `port 12539`. For details, please refer to the JSON-RPC documentation.

### RPC queries
Light nodes support most Conflux RPC APIs and support for the rest is also [on the way](https://github.com/Conflux-Chain/conflux-rust/issues/1461). As light nodes need to query their peers to fulfill RPC requests, the overall latency is slightly larger. (It is significantly larger for `cfx_getLogs`.)

```bash
> curl -X POST --data '{ "jsonrpc": "2.0", "method": "cfx_clientVersion", "id": 1 }' -H "Content-Type: application/json" localhost:12539
{ "jsonrpc": "2.0", "result": "conflux-rust-1.0.0", "id": 1 }

> curl -X POST --data '{ "jsonrpc":"2.0", "method":"cfx_getBalance", "params": ["cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg"], "id": 2 }' -H "Content-Type: application/json" localhost:12539
{ "jsonrpc": "2.0", "result": "0x5fc346d4363f84249d4a", "id": 2 }

> curl -X POST --data '{ "jsonrpc": "2.0", "method": "cfx_getLogs", "params": [{ "address": "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp", "fromEpoch": "0x1c8b8", "toEpoch": "0x1c8d6" }], "id": 3}' -H "Content-Type: application/json" localhost:12539
{ "jsonrpc": "2.0", "result": [{ "address": "CFX:TYPE.CONTRACT:ACC7UAWF5UBTNMEZVHU9DHC6SGHEA0403Y2DGPYFJP", "blockHash": "0x694898c77602511b6c411860ec230ac7ca58c08a4cbe3cad904e724b2eb97fee", "data": "0x0000000000000000000000000000000000000000000000049b9ca9a694340000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000141da5f533abef1b82a4a6d698415b8a56894b7b410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "epochNumber": "0x1c8bf", "logIndex": "0x0", "topics": ["0x06b541ddaa720db2b10a4d0cdac39b8d360425fc073085fac19bc82614677987","0x0000000000000000000000001da5f533abef1b82a4a6d698415b8a56894b7b41","0x0000000000000000000000001da5f533abef1b82a4a6d698415b8a56894b7b41","0x00000000000000000000000080bb30efc5683758128b404fe5da03432eb16634"], "transactionHash": "0x7dcfeb245369e509f2d154f2d5523e3ebe0b54f1d420e02edf56c70cdcae278d", "transactionIndex": "0x0", "transactionLogIndex": "0x0" },{ "address": "CFX:TYPE.CONTRACT:ACC7UAWF5UBTNMEZVHU9DHC6SGHEA0403Y2DGPYFJP", "blockHash": "0x694898c77602511b6c411860ec230ac7ca58c08a4cbe3cad904e724b2eb97fee", "data": "0x0000000000000000000000000000000000000000000000049b9ca9a694340000", "epochNumber": "0x1c8bf", "logIndex": "0x1", "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000001da5f533abef1b82a4a6d698415b8a56894b7b41","0x00000000000000000000000080bb30efc5683758128b404fe5da03432eb16634"], "transactionHash": "0x7dcfeb245369e509f2d154f2d5523e3ebe0b54f1d420e02edf56c70cdcae278d", "transactionIndex": "0x0", "transactionLogIndex": "0x1" }], "id": 3 } -H "Content-Type: application/json" localhost:12539
```

### JavaScript
Light nodes support most of the functionalities of the JavaScript SDK ([js-conflux-sdk](https://www.npmjs.com/package/js-conflux-sdk)). You can install the SDK using the following command:

```bash
npm install --save js-conflux-sdk
```

Then, you can query the blockchain and send transactions:

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

### Other SDKs

While it has not been tested, light nodes are expected to work with the [Java](https://github.com/Conflux-Chain/java-conflux-sdk), [Python](https://github.com/Conflux-Chain/python-conflux-sdk) and [Go](https://github.com/Conflux-Chain/go-conflux-sdk) SDKs as well.

## Troubleshooting
### Why do I get an error when calling a contract method?#

If you run the following code:

```js
const admin = await cfx.InternalContract('AdminControl').getAdmin('cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp');
console.log('admin:', admin);
```

...You will get this error:

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

This is because contract calls use the `cfx_call` RPC API which is not yet supported on light nodes.

Suppose you would like to send a transaction to a smart contract:

```js
conflux.InternalContract('AdminControl').setAdmin('cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp', 'cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg').sendTransaction({
  from: account,
}).executed();
```

You will get a similar error. This is because for contract transactions, `js-conflux-sdk` will automatically attempt to estimate the gas limit and storage limit using the `cfx_estimateGasAndCollateral` RPC which is not yet supported on light nodes. You can address this by manually setting these parameters:

```js
conflux.InternalContract('AdminControl').setAdmin('cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp', 'cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg').sendTransaction({
  from: account,
  gas: 1000000000,
  storageLimit: '0x0',
  gasPrice: '0x1',
}).executed();
```

If you encounter a `This API is not implemented yet` error, you can set the debug logger on the conflux object to find out which RPC is causing it.

```js
const cfx = new Conflux({
  url: 'http://localhost:12539',
  logger: console,
});
```

### Why do I see timeout instead of null
For most operations, you might sometimes see a timeout error:

```bash
RPCError: Operation timeout: "Timeout while retrieving transaction with hash 0x497755f45baef13a35347933c48c0b8940f2cc3347477b5ed9f165581b082699"
```

This is because light nodes have to retrieve transactions and other items from their peers. If no peer responds within 4 seconds, you will get a timeout error. In most cases, retrying the query will succeed.

You will also get a timeout if you call `conflux.getTransactionByHash` and pass a transaction hash that does not exist. This is because the "non-existence" or transactions is not something light nodes can verify, so returning `null` might be misleading. This behavior might change in the future.

### I'm searching through event logs, why is it so slow?#

Log filtering is a very expensive operation on light nodes. For each epoch in the range you specify, the node needs to perform 1 to 3 queries. We recommend you make multiple queries with smaller epoch ranges.

instead of:

```js
const fromEpoch = 110000;
const toEpoch = 119999;

// NOT RECOMMENDED
const logs = await cfx.getLogs({ fromEpoch, toEpoch, address: 'cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp' });
console.log('logs:', logs);
```

You are encouraged to do this:

```js
for (ii = 0; ii < 10; ++ii) {
  const fromEpoch = 110000 + ii * 1000;
  const toEpoch = 110000 + (ii + 1) * 1000 - 1;
  const logs = await cfx.getLogs({ fromEpoch, toEpoch, address: 'cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp' });
  console.log('logs:', logs);
}
```

## RPC availability

| RPC  | status |
| --------- | ---------------------- |
| [cfx_call](../../../core/build/json-rpc/cfx-namespace.md#cfx_call)  |  ❌ Not supported yet  |
| [cfx_checkBalanceAgainstTransaction](../../../core/build/json-rpc/cfx-namespace.md#cfx_checkbalanceagainsttransaction)  |  ✅ Supported  |
| [cfx_clientVersion](../../../core/build/json-rpc/cfx-namespace.md#cfx_clientversion) |  ✅ Supported  |
| [cfx_epochNumber](../../../core/build/json-rpc/cfx-namespace.md#cfx_epochnumber) |  ✅ Supported  |
| [cfx_estimateGasAndCollateral](../../../core/build/json-rpc/cfx-namespace.md#cfx_estimategasandcollateral)  |  ❌ Not supported yed  |
| [cfx_gasPrice](../../../core/build/json-rpc/cfx-namespace.md#cfx_gasprice) |  ✅ Supported  |
| [cfx_getAccount](../../../core/build/json-rpc/cfx-namespace.md#cfx_getaccount) |  ✅ Supported  |
| [cfx_getAccumulateInterestRate](../../../core/build/json-rpc/cfx-namespace.md#cfx_getaccumulateinterestrate) |  ✅ Supported  |
| [cfx_getAdmin](../../../core/build/json-rpc/cfx-namespace.md#cfx_getadmin) |  ✅ Supported  |
| [cfx_getBalance](../../../core/build/json-rpc/cfx-namespace.md#cfx_getbalance) |  ✅ Supported  |
| [cfx_getBestBlockHash](../../../core/build/json-rpc/cfx-namespace.md#cfx_getbestblockhash) |  ✅ Supported  |
| [cfx_getBlockByEpochNumber](../../../core/build/json-rpc/cfx-namespace.md#cfx_getblockbyepochnumber) |  ✅ Supported  |
| [cfx_getBlockByHash](../../../core/build/json-rpc/cfx-namespace.md#cfx_getblockbyhash) |  ✅ Supported  |
| [cfx_getBlockByHashWithPivotAssumption](../../../core/build/json-rpc/cfx-namespace.md#cfx_getblockbyhashwithpivotassumption) |  ✅ Supported  |
| [cfx_getBlockRewardInfo](../../../core/build/json-rpc/cfx-namespace.md#cfx_getblockrewardinfo)  |  ❌ Not supported yet  |
| [cfx_getBlocksByEpoch](../../../core/build/json-rpc/cfx-namespace.md#cfx_getblocksbyepoch) |  ✅ Supported  |
| [cfx_getCode](../../../core/build/json-rpc/cfx-namespace.md#cfx_getcode) |  ✅ Supported  |
| [cfx_getCollateralForStorage](../../../core/build/json-rpc/cfx-namespace.md#cfx_getcollateralforstorage) |  ✅ Supported  |
| [cfx_getConfirmationRiskByHash](../../../core/build/json-rpc/cfx-namespace.md#cfx_getconfirmationriskbyhash) |  ✅ Supported  |
| [cfx_getInterestRate](../../../core/build/json-rpc/cfx-namespace.md#cfx_getinterestrate) |  ✅ Supported  |
| [cfx_getLogs](../../../core/build/json-rpc/cfx-namespace.md#cfx_getlogs) |  ✅ Supported  |
| [cfx_getNextNonce](../../../core/build/json-rpc/cfx-namespace.md#cfx_getnextnonce) |  ✅ Supported  |
| [cfx_getSkippedBlocksByEpoch](../../../core/build/json-rpc/cfx-namespace.md#cfx_getskippedblocksbyepoch) |  ✅ Supported  |
| [cfx_getSponsorInfo](../../../core/build/json-rpc/cfx-namespace.md#cfx_getsponsorinfo) |  ✅ Supported  |
| [cfx_getStakingBalance](../../../core/build/json-rpc/cfx-namespace.md#cfx_getstakingbalance) |  ✅ Supported  |
| [cfx_getStatus](../../../core/build/json-rpc/cfx-namespace.md#cfx_getstatus) |  ✅ Supported  |
| [cfx_getStorageAt](../../../core/build/json-rpc/cfx-namespace.md#cfx_getstorageat) |  ✅ Supported  |
| [cfx_getStorageRoot](../../../core/build/json-rpc/cfx-namespace.md#cfx_getstorageroot) |  ✅ Supported  |
| [cfx_getTransactionByHash](../../../core/build/json-rpc/cfx-namespace.md#cfx_gettransactionbyhash) |  ✅ Supported  |
| [cfx_getTransactionReceipt](../../../core/build/json-rpc/cfx-namespace.md#cfx_gettransactionreceipt) |  ✅ Supported  |
| [cfx_sendRawTransaction](../../../core/build/json-rpc/cfx-namespace.md#cfx_sendrawtransaction) |  ✅ Supported  |
| [cfx_getSupplyInfo](../../../core/build/json-rpc/cfx-namespace.md#cfx_getsupplyinfo) |  ❌ Not supported yet  |
