---
sidebar_position: 2
title: Send Transactions Using SDKs
---

## Installation

`npm install js-conflux-sdk`

## Send transaction using SDK

* Import `js-conflux-sdk` and set a Conflux provider. For the Conflux test-net, there is a node provided at `https://test.confluxrpc.com`. It can also be changed to any other Conflux node, even your own.

```javascript
const { Conflux, Drip } = require('js-conflux-sdk');

const conflux = new Conflux({
  url: 'https://test.confluxrpc.com',
  logger: console,
  networkId: 1,
});
```

* Paste your private key into the program

```javascript
const PRIVATE_KEY = 'Your Private Key';
// const PRIVATE_KEY = '0x5f15f9e52fc5ec6f77115a9f306c120a7e80d83115212d33a843bb6b7989c261';
const account = conflux.wallet.addPrivateKey(PRIVATE_KEY); // create account instance
const receiver = 'cfxtest:aarc9abycue0hhzgyrr53m6cxedgccrmmy8m50bu1p'
```

* Compose your transaction:

```javascript
let txParams = {
  from: account, // from account instance and will by sign by account.privateKey
  // nonce
  // gasPrice
  // gas
  to: receiver, // accept address string or account instance
  value: Drip.fromCFX(0.125), // use the conversion utility function
  // storageLimit
  // epochHeight
  // data
};
```

> The detailed explanation of each field can be found [here](../learn/core-space-basics/core-transactions.md)

* Send the composed transaction via `cfx.sendTransaction` and get the returned transaction hash. Then you can view the transaction details by using `tx.mined()` or `tx.executed()`, which APIs will return the transaction data or transaction receipt when transaction is mined or executed. Noting these 2 APIs are a simple wrapping layer for `cfx.getTransactionByHash` and `cfx.getTransactionReceipt`. You can also search the hash at [Conflux Scan](http://confluxscan.io/).

```javascript
async function main() {
  const txHash = await conflux.cfx.sendTransaction(txParams);
  console.log(txHash);
  const txData = await txHash.mined()
  console.log(txData)
  const txReceipt = await txHash.executed()
  console.log(txReceipt)
}

main().catch(e => console.error(e));
```

## Other language examples

Refer to [SDKs](./sdks-and-tools/sdks.md) for examples of other SDKs.
