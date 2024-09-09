---
sidebar_position: 2
title: JS SDK Complete Guide
description: A comprehensive guide to using the js-conflux-sdk.
displayed_sidebar: coreSidebar
---

The [Developer Quickstart](../core-developer-quickstart.md) demonstrates how to install and use the js-conflux-sdk for sending transactions. This guide delves into the details of the js-conflux-sdk.

- Account Generation
- Querying Blockchain Data
- Deploying Smart Contracts
- Calling Smart Contracts
- Common Utilities
- Unit Conversion
- Hashing and Signing

For further details and examples, please refer to the [js-conflux-sdk documentation](https://confluxnetwork.gitbook.io/js-conflux-sdk).

## Account Generation

Generate a new account using **PrivateKeyAccount**.

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

## Querying Blockchain Data

Numerous functions are available to query blockchain data, such as block, transaction, receipt, epoch, etc.

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

// Other available methods:
// cfxClient.cfx.getBalance
// cfxClient.cfx.getNextNonce
// cfxClient.cfx.getBlockByHash
// cfxClient.cfx.getTransactionByHash
// cfxClient.cfx.getTransactionReceipt
```

Explore the [Conflux cfx namespace API](https://github.com/Conflux-Chain/js-conflux-sdk/blob/v2/docs/api/Conflux.md) for a complete method list. For more on JSON-RPC, see [Conflux Core JSON-RPC API](../build/json-rpc/).

## Deploying Smart Contracts

The js-conflux-sdk simplifies smart contract deployment.

```javascript
// Prerequisites: an account with sufficient balance and the smart contract's bytecode and ABI from solc or hardhat
const abi = []; // Replace with your contract's ABI
const bytecode = '0xabcd'; // Replace with your contract's bytecode

const contract = cfxClient.Contract({
  abi,
  bytecode,
});

async function main() {
    // Deploy the contract (modify if the constructor has parameters)
    const receipt = await contract.constructor().sendTransaction({
        from: account,
    }).executed();
    console.log('New deployed contract address: ', receipt.contractCreated);
}
```

## Calling Smart Contracts

To call a smart contract, you need its ABI and address.

```javascript
const address = ''; // Replace with your contract's address
const abi = []; // Replace with your contract's ABI

const contract = cfxClient.Contract({
  abi,
  address,
});

async function main() {
    // Call a view function
    const result = await contract.viewFunctionName(params);
    console.log(result);
    // Call a non-view function
    const receipt = await contract.nonViewFunctionName(params).sendTransaction({
        from: account,
    }).executed();
    console.log(receipt);
}
```

Consult the sdk's [Contract interaction guide](https://confluxnetwork.gitbook.io/js-conflux-sdk/docs/interact_with_contract) for more information.

## Common Utilities

### Address

The address module offers functions for encoding and decoding cfx addresses and address validation.

```javascript
const { address } = require('js-conflux-sdk');

// Encode a hex address to a base32 cfx address
const cfxAddress = address.encodeCfxAddress('0x166d0ff7691030b0ca33d4e60e842cd300a3010d', 1);

// Decode a base32 cfx address to a hex address
const decoded = address.decodeCfxAddress('cfxtest:aang4d91rejdbpgmgtmspdyefxkubj2bbywrwm9j3z');

// Check if an address is valid
address.isValidCfxAddress('cfxtest:aang4d91rejdbpgmgtmspdyefxkubj2bbywrwm9j3z'); // Returns true

// Calculate the mapped EVM address
address.cfxMappedEVMSpace

Address('cfxtest:aang4d91rejdbpgmgtmspdyefxkubj2bbywrwm9j3z');
```

Discover more at the [address utils API](https://github.com/Conflux-Chain/js-conflux-sdk/blob/v2/docs/api/util/address.md).

### Format

The format module includes functions to convert data between various formats.

```javascript
const { format } = require('js-conflux-sdk');

// Examples:
format.uInt(3); // Returns 3
format.hex(Buffer.from('hi')); // Returns 0x6869
format.bytes('0x03'); // Returns <Buffer 03>
```

Explore the [format API](https://github.com/Conflux-Chain/js-conflux-sdk/blob/v2/docs/api/util/format.md) for more details.

## Token Unit Conversion

Use the `Drip` class for conversions between **Drip** and **CFX**.

```javascript
const { Drip } = require('js-conflux-sdk');

// Initialize a Drip instance
let drip = new Drip('1000000000000000000'); // Equivalent to 1 CFX

// Initialize from CFX
drip = Drip.fromCFX(1); // Equivalent to 1 CFX

// Convert to CFX
drip.toCFX(); // Returns 1
```

## Hashing and Signing

The `sign` module facilitates hashing and signing data.

```js
const { sign } = require('js-conflux-sdk');

// Generate a random buffer
let buf = sign.randomBuffer(0);

// Generate a keccak hash
let keccakHash = sign.keccak256(buf);

// Generate a random private key
let privateKey = sign.randomPrivateKey(buf);

// Convert private key to public key
let pubKey = sign.privateKeyToPublicKey(privateKey);

// Convert public key to address
let address = sign.publicKeyToAddress(pubKey);

// Sign a buffer with the private key
let signResult = sign.ecdsaSign(buf, privateKey);

// Recover public key from signature and buffer, then convert it to address
sign.publicKeyToAddress(sign.ecdsaRecover(buf, sign.ecdsaSign(signResult, privateKey)))
```
