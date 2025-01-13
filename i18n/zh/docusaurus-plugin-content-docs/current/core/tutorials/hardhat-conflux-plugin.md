---
sidebar_position: 3
title: Hardhat Conflux 插件
description: Hardhat Conflux 插件使用教程
displayed_sidebar: coreSidebar
keywords:
  - Hardhat
  - Conflux Plugin
  - Development Environment
  - 智能合约
  - Solidity
  - Core Space
  - eSpace
  - Contract Deployment
  - 合约验证
  - 网络配置
  - JavaScript
  - TypeScript
  - hardhat-conflux
  - js-conflux-sdk
  - Ethereum Compatibility
  - Task Runner
tags:
  - Hardhat
  - Conflux Plugin
---

[Hardhat](https://hardhat.org/) 是构建智能合约的卓越工具。 它为像以太坊这样的区块链（比如 Conflux）提供了开发环境、测试框架和资产管理流程。 The [Hardhat Conflux Plugin](https://github.com/conflux-chain/hardhat-conflux) adds Conflux Core Space support to Hardhat.

Developers can use Hardhat to compile Solidity code and the Hardhat-Conflux plugin to deploy, interact with, and test contracts on Core Space.

The Hardhat-Conflux plugin is built on top of `js-conflux-sdk`, making its usage for deployment and interaction very similar to that of `js-conflux-sdk`.

如果您不熟悉 Hardhat，请参考 [Hardhat 文档](https://hardhat.org/getting-started/)。

## 安装

安装完 Hardhat 后，您可以使用以下命令安装插件：

```bash
npm install hardhat-conflux js-conflux-sdk
```

## 配置

首先，在您的 `hardhat.config.js` 中导入插件：

```js
require("hardhat-conflux");
```

或者在 `hardhat.config.ts` 中:

```ts
import "hardhat-conflux";
```

然后，在您的 `hardhat.config.js` 中添加 Conflux 网络：

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

如果您的配置文件是 `hardhat.config.ts`，设置是类似的。

确保您使用的私钥账户有足够的余额与 Core Space 互动。 如果没有的话，您可以使用[水龙头](https://faucet.confluxnetwork.org/)获取一些测试代币。

## Hardhat-Conflux 插件提供的功能

### 任务

此插件提供了 `verifyCfxContract` 任务，允许您通过 ConfluxScan 的服务验证合约。

```shell
npx hardhat verifyCfxContract Greeter cfxtest:acba7cvb1k6bhctzsfshybg5zgch39gnpuc8teem53
```

### 环境扩展

此插件通过添加以下内容来扩展 Hardhat 运行时环境：

#### ConfluxSDK

这是 `js-conflux-sdk` 对象，与通过 `require('js-conflux-sdk')` 获取的对象相同。

#### conflux 对象

Hardhat 运行时环境中添加了 Conflux 字段，这是一个自动连接到所选网络的 Conflux 实例，具有额外的 Hardhat 特定功能。

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

## 使用方法

开发者可以通过编写 Hardhat 脚本在 Core Space 上部署、交互和测试合约。

### 部署合约

以下是部署合约的简单示例：

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

    const contractAddress = receipt.contractCreated;

    console.log(`Newly deployed contract address: ${contractAddress}`);
}

main().catch(err => {
    console.log(err);
    process.exit(1);
});
```

然后，您可以使用以下命令运行此脚本：

```shell
npx hardhat run scripts/deploy.js --network cfxTestnet
```

执行脚本后，您可以在控制台中查看合约地址。

### 与合约交互

以下是与合约交互的简单示例：

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

然后，您可以使用以下命令运行此脚本：

```shell
npx hardhat run scripts/interact.js --network cfxTestnet
```

### 验证合约

使用 **verifyCfxContract** 任务来通过 ConfluxScan 的服务验证合约。

```shell
npx hardhat verifyCfxContract Greeter cfxtest:acba7cvb1k6bhctzsfshybg5zgch39gnpuc8teem53
```

## 完整示例

完整示例您可在 [hardhat-conflux-example](https://github.com/Conflux-Chain/hardhat-conflux-example) 中找到。

## 常见问题解答

### 我可以在 Conflux Core 上使用 Hardhat 网络测试合约吗？

如果您的合约不使用任何 Conflux 特定功能（如内部合约、1820、create2），您可以使用 Hardhat 网络测试您的合约。 有关 Hardhat 网络和 Conflux Core 之间的 VM 差异，请参阅 [VM 差异](../core-space-basics/vm-difference.md)。

### 我可以在 Conflux Core 上使用 Hardhat 的分叉功能吗？

不可以 Conflux Core 不支持 Hardhat 的分叉功能。

### 当我在 TypeScript 中使用助手方法时，出现类似 `Property 'getContractFactory' does not exist on 'hre.conflux'` 的错误

目前，此插件没有提供 TypeScript 的类型定义。 您可以使用 `// @ts-ignore ` 来避免错误信息的提示；这并不会对代码执行产生影响。 我们计划未来提供 TypeScript 类型定义。
