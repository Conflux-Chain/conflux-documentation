---
sidebar_position: 3
title: 开发者快速入门
displayed_sidebar: coreSidebar
description: 本教程将向您展示如何使用 js-conflux-sdk 发送交易。
tags:
  - js-conflux-sdk
  - Core Space
  - 交易
  - JavaScript
  - SDK
  - 快速入门
  - Conflux 地址
  - Account Balance
  - Private Key
  - RPC 端点
  - CFX
  - Drip
  - Transaction Sending
  - Error Handling
  - 测试网
  - 水龙头
  - ConfluxScan
---

为了在 Conflux Core Space 上发送交易，您需要使用其特有的 SDK。 本教程将向您展示如何使用 js-conflux-sdk 发送交易。

:::tip

以太坊的 SDK（如 ethers.js、web3.js、web3.py、web3j）与 Conflux Core Space 并不兼容。 您需要使用 Conflux Core Space 的 SDK。

:::

## 简介

[**js-conflux-sdk**](https://github.com/conflux-chain/js-conflux-sdk) 是一个基于 JavaScript 开发并用于 Conflux Core Space 的 SDK。 它是大量库的集合，允许您使用 HTTP、WebSocket 与本地或远程的 Conflux 节点进行交互。 您可以用它来发送交易、部署并与智能合约交互等等。

它相当于 Conflux Core Space 中的以太坊 web3.js。 只是 API 不同。

## 前提条件

1. 安装并使用该 SDK 需要 Node.js 环境。
2. 您需要连接到任意 Conflux 节点。 您可以使用公共测试网 RPC 端点 `https://test.confluxrpc.com`。
3. 用于签署交易的账户私钥。 该账户需有一些测试网 CFX 用于支付交易和其产生的费用。 您可以从 [Conflux Core Faucet](https://faucet.confluxnetwork.org/) 获取一些测试网 CFX。

注意：私钥可以从 Fluent Wallet 设置页面导出。 请不要在测试网上使用与主网相同的私钥。

## 安装

您需要在 [Node.js](https://nodejs.org/en) 环境下使用它。 您可以通过 npm 安装：

```shell
npm install js-conflux-sdk 
```

## 如何使用？

### 导入并创建 Conflux 实例

从 `js-conflux-sdk` 导入 `Conflux` 类并设置 Conflux 服务提供者。 对于 Conflux Core 测试网，您可以直接使用公共 RPC 端点 `https://test.confluxrpc.com`。 这里的“提供者”指的是允许您的应用程序与 Conflux 区块链通信的服务或节点。 它也可以改为任何其他Conflux节点，甚至是你自己的。

```javascript
const { Conflux } = require('js-conflux-sdk');

const cfxClient = new Conflux({
  url: 'https://test.confluxrpc.com',
  networkId: 1,
  //   logger: console, // for debug
});
```

### 添加私钥

在发送交易之前，您需要将您的私钥添加到 Conflux 实例中。

```javascript
const PRIVATE_KEY = '您的私钥';
// const PRIVATE_KEY = '0x5f15f9e52fc5ec6f77115a9f306c120a7e80d83115212d33a843bb6b7989c261';
const account = cfxClient.wallet.addPrivateKey(PRIVATE_KEY); // 创建账户实例
console.log("账户地址: ", account.address);
```

### Conflux 地址

Conflux Core Space 的地址与以太坊不同。 它是由 [CIP-37](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-37.md) 引入的 base32 编码字符串。

不同网络的地址前缀不同。 例如，Conflux Core 测试网的地址前缀为 cfxtest，而主网为 cfx。

例如：

- 主网地址：`cfx:aamjy3abae3j0ud8ys0npt38ggnunk5r4ps2pg8vcc`
- 测试网地址：`cfxtest:aamjy3abae3j0ud8ys0npt38ggnunk5r4pex9025gj`

您可以点击[这里](./core-space-basics/addresses.md)了解更多关于 Conflux Core 地址的信息。

### 查询账户余额

您可以使用 `cfxClient.cfx.getBalance` 来查询账户余额：

```javascript
// Drip 是 CFX 的最小单位，可以用 Drip 工具转换 CFX 单位
const { Drip } = require('js-conflux-sdk');

async function main() {
  const balance = await conflux.cfx.getBalance(account.address);
  console.log(`账户 ${account.address} 的余额是 ${new Drip(balance).toCFX()} CFX`);
}

main().catch(e => console.error(e));
```

在 `cfx` 命名空间下还有很多其他 API 可用于查询区块链数据。 您可以在 [SDK API 参考](https://github.com/Conflux-Chain/js-conflux-sdk/blob/v2/docs/api/Conflux.md#conflux) 和 Conflux [Core RPC API](./build/json-rpc/) 参考中找到它们。

### 发送交易

添加私钥后，您可以使用 `cfxClient.cfx.sendTransaction` 来发送交易。 步骤如下：

1. 组合交易参数。

```javascript
const receiver = 'cfxtest:aarc9abycue0hhzgyrr53m6cxedgccrmmy8m50bu1p';
let txParams = {
  from: account, // 来自账户实例，并将由 account.privateKey 签名
  to: receiver, // 可以为地址字符串或账户实例
  value: Drip.fromCFX(0.125), // 使用转换工具函数
};
```

> 每个字段的详细说明可以在[这里](./core-space-basics/transactions/overview.md)找到。

1. 通过 `cfxClient.cfx.sendTransaction ` 发送组成的交易，并获取返回的交易哈希。 随后您可以使用 `tx.mined()` 或 `tx.executed()` 查看交易详情，这些 API 将在交易被挖掘或执行时返回交易数据或交易收据。 注意，这两个 API 是对 `cfxClient.cfx.getTransactionByHash` 和 `cfxClient.cfx.getTransactionReceipt` 的简单封装。 您也可以使用交易哈希在 [Conflux Scan](https://confluxscan.io/) 中搜索已发送的交易。

```javascript
async function main() {
  const receiver = 'cfxtest:aarc9abycue0hhzgyrr53m6cxedgccrmmy8m50bu1p';
  let txParams = {
    from: account, // 来自账户实例，并将由 account.privateKey 签名
    to: receiver, // 接受地址字符串或账户实例
    value: Drip.fromCFX(0.125), // 使用转换工具函数
  };
  const txHash = await conflux.cfx.sendTransaction(txParams);
  console.log('交易哈希: ', txHash);

  // 需要几秒钟时间来挖掘交易
  const txData = await txHash.mined()
  console.log('交易信息: ', txData)

  // 通常需要不到 20 秒来执行交易
  const txReceipt = await txHash.executed()
  console.log('交易收据', txReceipt)
}

main().catch(e => console.error(e));
```

## 常见错误

### 余额不足

如果您的账户余额不足，您将遇到以下错误：`Insufficient balance` 或者 `Balance is not enough to pay transaction`

## 其他资源

1. Check [js-conflux-sdk's documentation](https://confluxnetwork.gitbook.io/js-conflux-sdk) for more details
2. 参考 [SDKs](./build/sdks-and-tools/sdks.md) 了解其他 SDK 的示例。
3. [Core Space 水龙头](https://faucet.confluxnetwork.org/)
4. [Conflux Core 区块链浏览器](https://confluxscan.io/)
5. [use-wallet](../general/build/tools/use-wallet.md)：一个面向前端的钱包钩子库，为轻量级 dApp 提供快速开发支持，支持 React 和 Vue3。
