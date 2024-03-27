---
sidebar_position: 3
title: Developer Quickstart
displayed_sidebar: coreSidebar
description: This tutorial will show you how to send a transaction using the js-conflux-sdk.
---

To send a transaction on Conflux Core Space, you need to use it's own SDKs. This tutorial will show you how to send a transaction using the js-conflux-sdk.

:::tip

Ethereum SDKs (ethers.js, web3.js, web3,py, web3j) are not compatible with Conflux Core Space. You need to use Conflux Core Space SDKs.

:::

## Introduction

[**js-conflux-sdk**](https://github.com/conflux-chain/js-conflux-sdk) is a JavaScript SDK for Conflux Core Space. It is a collection of libraries that allow you to interact with a local or remote Conflux node using HTTP, WebSocket. You can use it to send transactions, deploy and interact with smart contracts, and so on.

It is the equivalent of web3.js of Ethereum for Conflux Core Space. But APIs are different.

## Prerequisites

1. Node.js environment to install and use the SDK.
2. A Conflux node to connect to. You can use the public testnet rpc endpoint `https://test.confluxrpc.com`.
3. An account private key to sign the transaction. The account should have some testnet CFX to pay for the transaction value and fee. You can get some testnet CFX from [Conflux Core Faucet](https://faucet.confluxnetwork.org/).

Note: The private key can be exported from Fluent Wallet settings page. Do not use your mainnet private key on testnet.

## Installation

To use it, the [Node.js](https://nodejs.org/en) environment is required. You can install it via npm:

```shell
npm install js-conflux-sdk 
```

## How to use?

### Import And Create Conflux Instance

Import class `Conflux` from `js-conflux-sdk` and set a Conflux provider. For the Conflux Core Testnet, you can directly use the public RPC endpoint `https://test.confluxrpc.com`. A "provider" in this context refers to a service or node that allows your application to communicate with the Conflux blockchain. It can also be changed to any other Conflux node, even your own.

```javascript
const { Conflux } = require('js-conflux-sdk');

const cfxClient = new Conflux({
  url: 'https://test.confluxrpc.com',
  networkId: 1,
  //   logger: console, // for debug
});
```

### Add Private Key

Before sending a transaction, you need to add your private key to the Conflux instance.

```javascript
const PRIVATE_KEY = 'Your Private Key';
// const PRIVATE_KEY = '0x5f15f9e52fc5ec6f77115a9f306c120a7e80d83115212d33a843bb6b7989c261';
const account = cfxClient.wallet.addPrivateKey(PRIVATE_KEY); // create account instance
console.log("Account address: ", account.address);
```

### Conflux Address

The address of Conflux Core Space is different from Ethereum. It is a base32 encoded string introduced by [CIP-37](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-37.md).

Different network's address prefix is different. For example, the address prefix of Conflux Core Testnet is `cfxtest` and mainnet is `cfx`.

Por ejemplo:

- Mainnet Address: `cfx:aamjy3abae3j0ud8ys0npt38ggnunk5r4ps2pg8vcc`
- Testnet Address: `cfxtest:aamjy3abae3j0ud8ys0npt38ggnunk5r4pex9025gj`

You can learn more about Conflux Core address [here](./core-space-basics/addresses.md).

### Query Account Balance

You can query the account balance by using `cfxClient.cfx.getBalance`:

```javascript
// Drip is the smallest unit of CFX, can use it to convert to CFX
const { Drip } = require('js-conflux-sdk');

async function main() {
  const balance = await conflux.cfx.getBalance(account.address);
  console.log(`Balance of ${account.address} is ${new Drip(balance).toCFX()} CFX`);
}

main().catch(e => console.error(e));
```

There are a lot of other APIs under `cfx` namespace to query the blockchain data. You can find them in the [SDK API Reference](https://github.com/Conflux-Chain/js-conflux-sdk/blob/v2/docs/api/Conflux.md#conflux) and Conflux [Core RPC API Reference](./build/json-rpc/).

### Send transaction

After adding the private key, you can send a transaction by using `cfxClient.cfx.sendTransaction`. The steps are as follows:

1. Compose the transaction parameters.

```javascript
const receiver = 'cfxtest:aarc9abycue0hhzgyrr53m6cxedgccrmmy8m50bu1p';
let txParams = {
  from: account, // from account instance and will by sign by account.privateKey
  to: receiver, // accept address string or account instance
  value: Drip.fromCFX(0.125), // use the conversion utility function
};
```

> The detailed explanation of each field can be found [here](./core-space-basics/transactions/overview.md)

1. Send the composed transaction via `cfxClient.cfx.sendTransaction` and get the returned transaction hash. Then you can view the transaction details by using `tx.mined()` or `tx.executed()`, which APIs will return the transaction data or transaction receipt when transaction is mined or executed. Noting these 2 APIs are a simple wrapping layer for `cfxClient.cfx.getTransactionByHash` and `cfxClient.cfx.getTransactionReceipt`. You can also search the sent transaction at [Conflux Scan](https://confluxscan.io/) using transaction hash.

```javascript
async function main() {
  const receiver = 'cfxtest:aarc9abycue0hhzgyrr53m6cxedgccrmmy8m50bu1p';
  let txParams = {
    from: account, // from account instance and will by sign by account.privateKey
    to: receiver, // accept address string or account instance
    value: Drip.fromCFX(0.125), // use the conversion utility function
  };
  const txHash = await conflux.cfx.sendTransaction(txParams);
  console.log('Transaction hash: ', txHash);

  // It need a couple of seconds to mine the transaction
  const txData = await txHash.mined()
  console.log('Transaction info: ', txData)

  // Normally tt need less 20 seconds to execute the transaction
  const txReceipt = await txHash.executed()
  console.log('Transaction receipt', txReceipt)
}

main().catch(e => console.error(e));
```

## Common Errors

### Balance not enough

If your account does not have enough balance, you will encounter the following error: `Insufficient balance` or `Balance is not enough to pay transaction`

## Resources

1. Check [js-conflux-sdk's documentation](https://docs.confluxnetwork.org/js-conflux-sdk/) for more details
2. Refer to [SDKs](./build/sdks-and-tools/sdks.md) for examples of other SDKs.
3. [Core Space Faucet](https://faucet.confluxnetwork.org/)
4. [Conflux Core Scan](https://confluxscan.io/)
5. [use-wallet](../general/build/tools/use-wallet.md): a front-end perspective wallet hooks library providing rapid development support for lightweight dapps, with React and Vue3 support.
