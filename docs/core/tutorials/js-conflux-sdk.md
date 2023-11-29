---
sidebar_position: 2
title: JS SDK Complete Guide
description: This is a complete guide for the js-conflux-sdk.
---

[Developer Quickstart](./core-developer-quickstart.md) demonstrate how to install and use the js-conflux-sdk send transactions. This guide will go through the js-conflux-sdk in detail.

* Account generation
* Query blockchain data
* Deploy smart contract
* Call smart contract
* Common utils
* Unit conversion
* Hash and sign

For more details, and examples, please check the [js-conflux-sdk's documentation](https://docs.confluxnetwork.org/js-conflux-sdk/)

## Account generation

Use **PrivateKeyAccount** to random generate a new account.

```javascript
const { PrivateKeyAccount } = require('js-conflux-sdk');

// generate a random testnet account
PrivateKeyAccount.random(undefined, 1)
/* PrivateKeyAccount {
    privateKey: '0xd28edbdb7bbe75787b84c5f525f47666a3274bb06561581f00839645f3c26f66',
    publicKey: '0xc42b53ae2ef95fee489948d33df391c4a9da31b7a3e29cf772c24eb42f74e94ab3bfe00bf29a239c17786a5b921853b7c5344d36694db43aa849e401f91566a5',
    address: 'cfxtest:aass3rfcwjz1ab9cg5rtbv61531fmwnsuuy8c26f20',
    networkId: 1
} */
// generate a random mainnet account
PrivateKeyAccount.random(undefined, 1029) // gen a different account from above
/* PrivateKeyAccount {
    privateKey: '0x1b67150f56f49556ef7e3899024d83c125d84990d311ec08fa98aa1433bc0f53',
    publicKey: '0xd442207828ffd4dad918fea0d75d42dbea1fe5e3789c00a82e18ce8229714eae3f70b12f2f1abd795ad3e5c52a5a597289eb5096548438c233431f498b47b9a6',
    address: 'cfx:aanpezyvznsdg29zu20wpudwnbhx7t4gcp9k23xchw',
    networkId: 1029
} */
// generate a random account with a random source
PrivateKeyAccount.random('0xabcdefabcdef', 1);
/* PrivateKeyAccount {
    privateKey: '0x1d41e006afd28ea339922d8ab4be93154a14d4f1b6d0ad4e7aabf807e7536a5f',
    publicKey: '0x4c07c75d3fdc5b1d6afef6ec374b0eaac86bcaa771a1d536bc4ce6f111b1c60e414b370e4cf31bf7770ae6818a3518c485398a43857d9053153f6eb4f5644a90',
    address: 'cfxtest:aajx4wn2kwarr8h71uf880w40dp6x91feac1n6ur3s',
    networkId: 1
} */
```

## Query blockchain data

There are a lot of functions to query blockchain data, such as block, transaction, receipt, epoch, etc.

```javascript
const { Conflux } = require('js-conflux-sdk');

const cfxClient = new Conflux({
  url: 'https://test.confluxrpc.com',
  networkId: 1,
  //   logger: console, // for debug
});

async function main() {
    const status = await cfxClient.cfx.getStatus();
    console.log(status);
}

/*
cfxClient.cfx.getStatus
cfxClient.cfx.getBalance
cfxClient.cfx.getNextNonce
cfxClient.cfx.getBlockByHash
cfxClient.cfx.getTransactionByHash
cfxClient.cfx.getTransactionReceipt
*/
```

Check [Conflux cfx namespace API](https://github.com/Conflux-Chain/js-conflux-sdk/blob/v2/docs/api/Conflux.md) for complete method list.

Check [Conflux Core JSON-RPC API](../build/json-rpc/) for more information about the JSON-RPC.

## Deploy smart contract

The js conflux sdk provides a simple way to deploy smart contract.

```javascript
// to deploy a smart contract, you need a account with enough balance
// and the smart contract's bytecode and abi, which can get from solc or hardhat tools
const abi = []; // replace with your smart contract's abi
const bytecode = '0xabcd'; // replace with your smart contract's bytecode

const contract = cfxClient.Contract({
  abi,
  bytecode,
});

async function main() {
    // if the contract's constructor has no params, you can use the following code
    // if has params, you need to use contract.constructor(params).sendTransaction
    const receipt = await contract.constructor().sendTransaction({
        from: account,
    }).executed();
    console.log('New deployed contract address: ', receipt.contractCreated);
}
```

## Call smart contract

To call a smart contract, you need the contract's abi and address.

```javascript
const address = ''; // replace with your contract's address
const abi = []; // replace with your contract's abi

const contract = cfxClient.Contract({
  abi,
  address,
});

async function main() {
    // call a view function
    const result = await contract.viewFunctionName(params);
    console.log(result);
    // call a non-view function
    const receipt = await contract.nonViewFunctionName(params).sendTransaction({
        from: account,
    }).executed();
    console.log(receipt);
}
```

Check sdk's [Contract interaction guide](https://docs.confluxnetwork.org/js-conflux-sdk/docs/interact_with_contract) for more details.

## Common utils

### Address

The address module provides functions to encode and decode cfx address, address checker.

```javascript
const { address } = require('js-conflux-sdk');

// encode hex address to base32 cfx address
const address = address.encodeCfxAddress('0x166d0ff7691030b0ca33d4e60e842cd300a3010d', 1);
// 'cfxtest:aang4d91rejdbpgmgtmspdyefxkubj2bbywrwm9j3z'

// decode base32 cfx address to hex address
const decoded = address.decodeCfxAddress('cfxtest:aang4d91rejdbpgmgtmspdyefxkubj2bbywrwm9j3z');
/*
{
  hexAddress: <Buffer 16 6d 0f f7 69 10 30 b0 ca 33 d4 e6 0e 84 2c d3 00 a3 01 0d>,
  netId: 1,
  type: 'user'
}
*/

// check if the address is valid
address.isValidCfxAddress('cfxtest:aang4d91rejdbpgmgtmspdyefxkubj2bbywrwm9j3z'); // true

// calculate the mapped evm address
address.cfxMappedEVMSpaceAddress('cfxtest:aang4d91rejdbpgmgtmspdyefxkubj2bbywrwm9j3z');
// 0xe24a38C4F38b39FD288fedEB3388d924B26817df
```

Check [address utils api](https://github.com/Conflux-Chain/js-conflux-sdk/blob/v2/docs/api/util/address.md) for more details.

### format

format has many useful functions to format the data, which can be used convert data from one format to another.

```javascript
const { format } = require('js-conflux-sdk');

// uInt
format.uInt(3) // 3
format.uInt('3') // 3
format.uInt('0x3') // 3

// hex
format.hex(3) // 0x03
format.hex(Buffer.from('hi')) // 0x6869 
format.hex('0x3') // 0x03

// bytes
format.bytes('0x03') // <Buffer 03>
```

Check [format api](https://github.com/Conflux-Chain/js-conflux-sdk/blob/v2/docs/api/util/format.md) for more details.

## Unit conversion

The `Drip` class is used to convert between **Drip** and **CFX**.

```javascript
const { Drip } = require('js-conflux-sdk');

// init Drip instance
let drip = new Drip('1000000000000000000'); // 1 CFX
drip = new Drip(1000000000000000000n); // 1 drip
drip = new Drip(1); // 1 drip

// init from CFX
drip = Drip.fromCFX(1); // 1 CFX

// convert to CFX

drip.toCFX(); // 1
```

## Hash and sign

The `sign` module provides functions to hash and sign data.

```js
const { sign } = require('js-conflux-sdk');
// generate a random buffer
let buf = sign.randomBuffer(0);
// 
let keccakHash = sign.keccak256(buf);
// random generate a private key
let privateKey = sign.randomPrivateKey(buf);
// get public key from private key
let pubKey = sign.privateKeyToPublicKey(privateKey);
// get address from public key
let address = sign.publicKeyToAddress(pubKey);
// use private key sign (ecdsa) a buffer
let signResult = sign.ecdsaSign(buf, privateKey);
// recover public key from signature and buf, then convert it to address
sign.publicKeyToAddress(sign.ecdsaRecover(buf, sign.ecdsaSign(signResult, privateKey)))
```