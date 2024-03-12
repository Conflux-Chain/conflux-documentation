---
sidebar_position: 3
title: Hardhat Conflux 插件
description: Hardhat Conflux 插件使用教程
displayed_sidebar: coreSidebar
---

[Hardhat](https://hardhat.org/) is an exceptional tool for building smart contracts. It serves as a development environment, testing framework, and asset pipeline for Ethereum-like blockchains, such as Conflux. The [Hardhat Conflux Plugin](https://github.com/conflux-chain/hardhat-conflux) adds Conflux Core Space support to Hardhat.

Developers can use Hardhat to compile Solidity code and the Hardhat-Conflux plugin to deploy, interact with, and test contracts on Core Space.

The Hardhat-Conflux plugin is built on top of `js-conflux-sdk`, making its usage for deployment and interaction very similar to that of `js-conflux-sdk`.

If you are not familiar with Hardhat, please refer to the [Hardhat documentation](https://hardhat.org/getting-started/).

## 安装

After installing Hardhat, you can install the plugin with:

```bash
npm install hardhat-conflux js-conflux-sdk
```

## Configuration

First, import the plugin in your `hardhat.config.js`:

```js
require("hardhat-conflux");
```

Or in `hardhat.config.ts`:

```ts
import "hardhat-conflux";
```

Then, add the Conflux network to your `hardhat.config.js`:

```js
const PRIVATE_KEY = "0x0123456789012345678901234567890123456789012345678901234567890123"; // replace with your private key
module.exports = {
    defaultNetwork: "cfxTestnet",
    networks: {
        cfx: {
            url: "https://main.confluxrpc.com",
            accounts: [PRIVATE_KEY],
            chainId: 1029,
        },
        cfxTestnet: {
            url: "https://test.confluxrpc.com",
            accounts: [PRIVATE_KEY],
            chainId: 1,
        },
    }
}
```

If your configuration file is `hardhat.config.ts`, the settings are similar.

Ensure that the private key's account you use has enough balance to interact with Core Space. If not, you can use the [faucet](https://faucet.confluxnetwork.org/) to obtain some test tokens.

## What the Hardhat-Conflux Plugin Provides

### Tasks

This plugin provides the `verifyCfxContract` task, which allows you to verify contracts through ConfluxScan's service.

```shell
npx hardhat verifyCfxContract Greeter cfxtest:acba7cvb1k6bhctzsfshybg5zgch39gnpuc8teem53
```

### Environment Extensions

This plugin extends the Hardhat Runtime Environment by adding the following members:

#### ConfluxSDK

This is the `js-conflux-sdk` object, which is the same as the one obtained by `require('js-conflux-sdk')`.

#### conflux object

A Conflux field is added to the Hardhat Runtime Environment, which is a Conflux instance automatically connected to the selected network, with extra Hardhat-specific functionality.

```js
// Get a signer array
function getSigners(): Promise<ConfluxSDK.PrivateKeyAccount[]>;
// Get js-conflux-sdk Contract Factory by name
function getContractFactory(name: string): Promise<ConfluxSDK.Contract>;
// Get js-conflux-sdk Contract Factory by ABI and bytecode
function getContractFactory(abi: any[], bytecode: string): Promise<ConfluxSDK.Contract>;
// Get js-conflux-sdk Contract instance by name and address
function getContractAt(name: string, address: string): Promise<ConfluxSDK.Contract>;
// Get js-conflux-sdk Contract instance by ABI and address
function getContractAt(abi: any[], address: string): Promise<ConfluxSDK.Contract>;
```

## 用法

Developers can write Hardhat scripts to deploy, interact with, and test contracts on Core Space.

### 部署合约

Here is a simple example of deploying a contract:

```js

async function main() {
    const signers = await hre.conflux.getSigners();
    const defaultAccount = signers[0];

    // Deploy the contract
    const Greeter = await hre.conflux.getContractFactory('Greeter');
    const receipt = await Greeter.constructor('Hello').sendTransaction({
        from: defaultAccount.address,
    }).executed();

    console.log(`Contract deployment ${receipt.outcomeStatus === 0 ? 'succeeded' : 'failed'}`);
    
    if (receipt.outcomeStatus !== 0) {
        console.log(`Error message: ${receipt.outcomeErr}`);
        return;
    }

    const contractAddress = receipt.contract

Created;
    console.log(`Newly deployed contract address: ${contractAddress}`);
}

main().catch(err => {
    console.log(err);
    process.exit(1);
});
```

Then, you can run this script with:

```shell
npx hardhat run scripts/deploy.js --network cfxTestnet
```

After executing the script, you can view the contract address in the console.

### Interact with Contract

Here is a simple example of interacting with a contract:

```js
async function main() {
    const signers = await hre.conflux.getSigners();
    const defaultAccount = signers[0];
    const contractAddress = 'cfxtest:acba7cvb1k6bhctzsfshybg5zgch39gnpuc8teem53'; // replace with your contract address
    
    // Get the contract instance
    const greeter = await hre.conflux.getContractAt('Greeter', contractAddress);
    
    // Read the contract state
    const greet = await greeter.greet();
    
    // Update the contract state by sending a transaction
    const receipt = await greeter.setGreeting('new greet').sendTransaction({
        from: defaultAccount.address,
    }).executed();
    console.log('Update contract state transaction hash: ', receipt.transactionHash);
}

main().catch(err => {
    console.log(err);
    process.exit(1);
});
```

Then, you can run this script with:

```shell
npx hardhat run scripts/interact.js --network cfxTestnet
```

### Verify Contract

Use the **verifyCfxContract** task to verify contracts through ConfluxScan's service.

```shell
npx hardhat verifyCfxContract Greeter cfxtest:acba7cvb1k6bhctzsfshybg5zgch39gnpuc8teem53
```

## Complete Example

A complete example is available at [hardhat-conflux-example](https://github.com/Conflux-Chain/hardhat-conflux-example).

## 常见问题解答

### Can I use the Hardhat network to test contracts for Conflux Core?

If your contracts do not use any Conflux-specific features (like Internal Contracts, 1820, create2), you can use the Hardhat network to test your contracts. For the VM differences between the Hardhat network and Conflux Core, please refer to [VM differences](../core-space-basics/vm-difference.md).

### Can I use the Hardhat fork feature on Conflux Core?

No. The Hardhat fork feature is not supported on Conflux Core.

### When I use helper methods in TypeScript, it shows an error like `Property 'getContractFactory' does not exist on 'hre.conflux'`

Currently, this plugin does not provide TypeScript type definitions. You can use `// @ts-ignore` to suppress the error message; it will not affect the code's execution. We plan to provide TypeScript type definitions in the future.
