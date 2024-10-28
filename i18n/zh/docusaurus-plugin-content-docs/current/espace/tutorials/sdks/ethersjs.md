---
sidebar_position: 3
title: ethers.js
displayed_sidebar: eSpaceSidebar
description: 这个页面旨在指导您在Conflux eSpace开发时如何使用ethers.js的基础知识。
keywords:
  - ethers.js
  - JavaScript
  - Conflux eSpace
  - 智能合约
  - 交易
  - 区块链交互
  - Solidity
  - 应用程序二进制接口（ABI）
  - 字节码（Bytecode）
  - HTTP连接
  - 账户余额
  - 合约方法
  - 调用方法
  - 发送方法
  - 燃气估算
  - 交易签名
  - Node.js
  - RPC 端点
  - 私钥
  - Web3提供者
tags:
  - ethers.js
  - 教程
---

ethers.js 是一个用于构建以太坊应用程序的 JavaScript 库。 由于 Conflux eSpace 兼容以太坊，我们可以直接在 Conflux eSpace 中使用这个库。 目前，ethers 有两个主要版本：v6 和 v5。 本教程重点展示如何在 Conflux eSpace 中使用 v6 版本。

本教程涵盖了如何在 Conflux eSpace 中使用 ethers发送交易、与合约交互以及查询链上数据。

## 安装

```bash
mkdir demo && cd demo && npm init -y && npm install ethers
```

```js
import { ethers } from "ethers";
```

ethers 提供了几个抽象函数和类供开发者使用：

- `providers`:提供用于连接以太坊网络的抽象函数。 例如， [`JsonRpcProvider`](https://docs.ethers.org/v6/api/providers/jsonrpc/#JsonRpcProvider)用于通过HTTP从链上获取数据，[`WebSocketProvider`](https://docs.ethers.org/v6/api/providers/#WebSocketProvider)用于通过 WebSocket从链上获取数据，以及更常见的浏览器插件[`BrowserProvider`](https://docs.ethers.org/v6/api/providers/#BrowserProvider)。

- `signers`: 提供管理账户的抽象函数。 例如，[`Wallet`](https://docs.ethers.org/v6/api/wallet/#Wallet)通过管理单个私钥来方便交易和消息签名，而[`HdWallet`](https://docs.ethers.org/v6/api/wallet/#hd-wallets) 则通过助记词生成多个私钥，用于交易和消息签名。

- `contracts`: 提供与合约交互的抽象函数，如[`Contract`](https://docs.ethers.org/v6/api/contract/#Contract)。

## 使用ethers

### Provider

First, we need to use a provider to connect to the Conflux blockchain space.

```js
import { JsonRpcProvider, WebSocketProvider } from "ethers";
// use HTTP
const provider = new JsonRpcProvider("https://evm.confluxrpc.com");

// use WebSocket
const provider = new WebSocketProvider("wss://evm.confluxrpc.com/ws");

const blockNumber = await provider.getBlockNumber();
```

在通过 JsonRpcProvider 或 WebSocketProvider 连接到 Conflux eSpace 后，我们可以轻松地从链上获取所需的数据和状态。 在这里，您可以找到 Conflux eSpace 官方提供的所有 RPC，但开发者通常更喜欢直接连接到用户的插件钱包。 以下示例将演示如何直接连接到用户的钱包。

```js
import { BrowserProvider } from "ethers";
if (window.ethereum) {
  const provider = new BrowserProvider(window.ethereum);

  // get addresses from Metamask
  const addresses = await provider.send("eth_requestAccounts", []);

  // You can also retrieve blockchain data from Metamask.
  const balance = await provider.getBalance(addresses[0]);
  console.log(`Current address balance is: ${balance.toString()}`);
} else {
  console.warn("Please install Metamask");
}
```

### 数值

在以太坊中，所有单位都表示为整数。 然而，长数字可能难以阅读和书写。 因此，ethers提供了多种用于处理这些数字的实用功能。 由于Conflux eSpace与以太坊兼容，因此使用这些实用功能也很方便。

```js
// Convert user-provided strings in cfx to wei for a value

const cfx = parseEther("1.0"); // 1000000000000000000n

// Convert gwei to wei
const feePerGas = parseUnits("3.3", "gwei"); // 3300000000n

// Convert a value in wei to a string in cfx to display in a UI

const cfxDisplay = formatEther(cfx);

//// Convert a value in wei to a string in gwei to display in a UI
const feePerGasDisplay = formatUnits(feePerGas, "gwei");
```

### 交易

一般而言，我们使用钱包发送交易。 不过，我们也可以直接用私钥来签名和发送交易。 接下来，我们将分别演示如何使用钱包和私钥签名和发送交易的例子。

```js
import { BrowserProvider } from "ethers";
import { parseEther, parseUnits } from "ethers";
if (window.ethereum) {
  const provider = new BrowserProvider(window.ethereum);
  const [address] = await provider.send("eth_requestAccounts", []);

  const signer = await provider.getSigner(address);

  // get  balance
  const balance = await provider.getBalance(address);

  const tx = await signer.sendTransaction({
    to: address,
    value: parseEther("0.01"), // send 0.01 cfx to self.
  });

  const receipt = await provider.waitForTransaction(tx.hash);

  console.log(receipt);
} else {
  console.warn("Please install Metamask");
}
```

下面的示例演示如何使用私钥在本地签名并发送交易。

```js
import { Wallet } from "ethers";
import { JsonRpcProvider } from "ethers";

// the provider URL you can find in the Conflux eSpace documentation
const provider = new JsonRpcProvider("https://evm.confluxrpc.com");

// you need input your private key here to replace the "0x..."
const wallet = new Wallet("0x...", provider);

// get  balance
const balance = await wallet.provider.getBalance(wallet.address);

// you can get the address from the private key
console.log("Wallet balance:", wallet.address);

// send transaction
const tx = await wallet.sendTransaction({
  to: wallet.address,
  value: parseEther("0.001"), // send 0.001 cfx to self
});

// wait the transaction and get the receipt
const receipt = await wallet.provider.waitForTransaction(tx.hash);
```

### 智能合约

在 ethers 中，合约被抽象为类，通过解析提供的 ABI 来确定合约的属性和方法。 接下来，我们将演示一个调用合约函数的示例。

#### ABI

在 Ether.js 中，您可以使用通过编译 Solidity 合约生成的 JSON 格式 ABI，它还支持人类可读的 ABI（Solidity 签名）。 在实践中，不需要列出所有 ABI；只需指定你想要的方法就可以了。

以下是两个 ABI 的示例。

```js
const ABI = [
  "function decimals() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address addr) view returns (uint)",
];
```

```js
const ABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
```

#### 只读函数(`view` 与 `pure`)

只读函数(`view` 与 `pure`)的特性不会被修改，通常用于从合约中检索相关数据。

```js
import { JsonRpcProvider } from "ethers";
const ABI = [
  "function decimals() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address addr) view returns (uint)",
];

const provider = new JsonRpcProvider("https://evm.confluxrpc.com");

const contract = new Contract(
  "0xba2289fee4673ef00ee8d8dae260965ab543b68f",
  ABI,
  provider
);

const symbol = await contract.symbol();

const balance = await contract.balanceOf("0x...");
```

#### 更改合同状态的方法

有些方法会导致合同状态的改变。 通常，这些方法需要将交易提交给区块链，例如`transfer`, `approve`, `transferFrom`等。

```js
import { Wallet, Contract, JsonRpcProvider, BrowserProvider } from "ethers";

const ABI = ["function transfer(address to, uint amount)"];

// you can use the private wallet
const provider = new JsonRpcProvider("https://evm.confluxrpc.com");
const wallet = new Wallet("0x...", provider);
const contract = new Contract("0x...", ABI, wallet);

// then we can call the transfer method
const tx = await contract.transfer("0x...", parseUnits("1.0", 18));

// wait the transaction
await tx.wait();

// or you can use the browser wallet
const provider = new BrowserProvider(window.ethereum);
const [address] = await provider.send("eth_requestAccounts", []);
const signer = await provider.getSigner(address);
const contract = new Contract("0x...", ABI, signer);

// then we can call the transfer method
const tx = await contract.transfer("0x...", parseUnits("1.0", 18));

// wait the transaction
await tx.wait();
```

#### 签名消息

许多去中心化应用（DAPP）要求用户签名消息以验证其身份。 参见下面的示例。

```js
// you can use the private wallet
const provider = new JsonRpcProvider("https://evm.confluxrpc.com");
const wallet = new Wallet("0x...", provider);
const signedMessage = await wallet.signMessage("hello");

// or you can use the browser wallet
const provider = new BrowserProvider(window.ethereum);
const [address] = await provider.send("eth_requestAccounts", []);
const signer = await provider.getSigner(address);
const signedMessage = await signer.signMessage("Hello, World!");
```

[ethers.js 文档](https://docs.ethers.org/v6/)
