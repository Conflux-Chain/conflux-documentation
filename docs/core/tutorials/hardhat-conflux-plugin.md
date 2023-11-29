---
sidebar_position: 3
title: Hardhat Conflux Plugin
description: Tutorial for using Hardhat Conflux Plugin
displayed_sidebar: coreSidebar
---

[Hardhat](https://hardhat.org/) is a fantastic tool for building smart contracts. It is a development environment, testing framework, and asset pipeline for Ethereum-like blockchains, such as Conflux. [Hardhat Conflux Plugin](https://github.com/conflux-chain/hardhat-conflux) is a plugin for Hardhat that adds Conflux Core Space support.

Developers can use Hardhat to compile solidity code, use hardhat-conflux plugin to deploy, interact, test contracts on Core Space.

Hardhat-conflux plugin is build on top of `js-conflux-sdk`, so the usage of deploy and interact is very similar to `js-conflux-sdk`.

If you are not familiar with Hardhat, please refer to [Hardhat documentation](https://hardhat.org/getting-started/).

## Installation

After installing Hardhat, you can install the plugin with:

```bash
npm install hardhat-conflux js-conflux-sdk
```

## Configuration

First you need import the plugin in your hardhat.config.js:

```js
require("hardhat-conflux");
```

Or hardhat.config.ts:

```ts
import "hardhat-conflux";
```

Then you need to add conflux network to your hardhat.config.js:

```js
const PRIVATE_KEY = "0x0123456789012345678901234567890123456789012345678901234567890123"; // replace with your private key
module.export = {
    defaultNetwork: "cfxTestnet",
    networks: {
        cfx: {
            url: "https://main.confluxrpc.com",
            accounts: [
                PRIVATE_KEY,
            ],
            chainId: 1029,
        },
        cfxTestnet: {
            url: "https://test.confluxrpc.com",
            accounts: [
                PRIVATE_KEY,
            ],
            chainId: 1,
        },
    }
}
```

If your config file is hardhat.config.ts, the settings is more or less.

Make sure the private key's account you use has enough balance to interact with Core Space. If not you can use [faucet](https://faucet.confluxnetwork.org/) to get some test tokens.

## What hardhat-conflux plugin provides

### Tasks

This plugin provides the verifyCfxContract task, which allows you to verify contracts through ConfluxScan's service.

```shell
npx hardhat verifyCfxContract Greeter cfxtest:acba7cvb1k6bhctzsfshybg5zgch39gnpuc8teem53
```

### Environment extensions

This plugins extend Hardhat Runtime Environment by adding the following members:

#### ConfluxSDK

This is the js-conflux-sdk object, which is the same as the one you get by `require('js-conflux-sdk')`.

#### conflux object

A conflux field is added to Hardhat Runtime Environment, which is an Conflux instance automatically connected to the selected network, with some extra Hardhat-specific functionality.

```js
// get a signer array
function getSigners(): Promise<ConfluxSDK.PrivateKeyAccount[]>;
// get js-conflux-sdk Contract Factory by name
function getContractFactory(name: string): Promise<ConfluxSDK.Contract>;
// get js-conflux-sdk Contract Factory by abi and bytecode
function getContractFactory(abi: any[], bytecode: string): Promise<ConfluxSDK.Contract>;
// get js-conflux-sdk Contract instance by name and address
function getContractAt(name: string, address: string): Promise<ConfluxSDK.Contract>;
// get js-conflux-sdk Contract instance by name and address
function getContractAt(abi: any[], address: string): Promise<ConfluxSDK.Contract>;
```

## Usage

Developers can write hardhat scripts to deploy, interact, test contracts on Core Space.

### Deploy Contract

Here is a simple example of deploying a contract:

```js

async function main() {
    const signers = await hre.conflux.getSigners();
    const defaultAccount = signers[0];

    // deploy contract
    const Greeter = await hre.conflux.getContractFactory('Greeter');
    const receipt = await Greeter.constructor('Hello').sendTransaction({
        from: defaultAccount.address,
    }).executed();

    console.log(`Contract deploy ${receipt.outcomeStatus === 0 ? 'Success' : 'Failed'}`);
    
    if (receipt.outcomeStatus !== 0) {
        console.log(`Error message: ${receipt.outcomeErr}`);
        return;
    }

    const contractAddress = receipt.contractCreated;
    console.log(`New deployed contract address: ${contractAddress}`);
}

main().catch(err => {
    console.log(err);
    process.exit(1);
})
```

Then you can run this script with:

```shell
npx hardhat run scripts/deploy.js --network cfxTestnet
```

After the script is executed, you can see the contract address in the console.

### Interact with Contract

Here is a simple example of interacting with a contract:

```js
async function main() {
    const signers = await hre.conflux.getSigners();
    const defaultAccount = signers[0];
    const contractAddress = 'cfxtest:acba7cvb1k6bhctzsfshybg5zgch39gnpuc8teem53'; // replace with your contract address
    
    // get contract instance
    const greeter = await hre.conflux.getContractAt('Greeter', contractAddress);
    
    // read contract state
    const greet = await greeter.greet();
    
    // update contract state through sending transaction
    const receipt = await greeter.setGreeting('new greet').sendTransaction({
        from: defaultAccount.address,
    }).executed();
    console.log('Update contract state transaction hash: ', receipt.transactionHash);
}

main().catch(err => {
    console.log(err);
    process.exit(1);
})
```

Then you can run this script with:

```shell
npx hardhat run scripts/interact.js --network cfxTestnet
```

### Verify Contract

You can use the **verifyCfxContract** task to verify contracts through ConfluxScan's service.

```shell
npx hardhat verifyCfxContract Greeter cfxtest:acba7cvb1k6bhctzsfshybg5zgch39gnpuc8teem53
```

## Complete Example

There is a complete example in [hardhat-conflux-example](https://github.com/Conflux-Chain/hardhat-conflux-example)

## FAQs

### Can I use Hardhat network to test contracts for Conflux Core?

If your contracts are not using any Conflux specific features(Builtin Contracts, 1820, create2), you can use Hardhat network to test your contracts. For the VM difference between Hardhat network and Conflux Core, please refer to [VM difference](../learn/core-space-basics/vm-difference.md).

### Can I use Hardhat fork feature on Conflux Core?

No. Hardhat fork feature is not supported on Conflux Core.

### When I use helper methods in typescript, it shows error like `Property 'getContractFactory' does not exist on 'hre.conflux'`

Currently, this plugin do not provide typescript type definition. You can use `// @ts-ignore` to close the error message, it will not affect the code to run. We will provide typescript type definition in the future.
