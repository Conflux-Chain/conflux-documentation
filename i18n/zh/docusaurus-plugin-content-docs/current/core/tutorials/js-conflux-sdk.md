---
sidebar_position: 2
title: JS SDK 指南
description: 使用 js-conflux-sdk 的全面指南。
displayed_sidebar: coreSidebar
---

[开发者快速入门](../core-developer-quickstart.md) 演示了如何安装和使用 js-conflux-sdk 来发送交易。 这份指南深入探讨了 js-conflux-sdk 的细节。

- 账户生成
- 查询区块链数据
- 部署智能合约
- 调用智能合约
- 常见工具
- 单位换算
- 哈希和签名

For further details and examples, please refer to the [js-conflux-sdk documentation](https://confluxnetwork.gitbook.io/js-conflux-sdk).

## 账户生成

使用 **PrivateKeyAccount** 生成新账户。

```javascript
const { PrivateKeyAccount } = require('js-conflux-sdk');

// 生成一个随机的测试网络账户
PrivateKeyAccount.random(undefined, 1)
/* PrivateKeyAccount {
    privateKey: '0xd28edbdb7bbe75787b84c5f525f47666a3274bb06561581f00839645f3c26f66',
    publicKey: '0xc42b53ae2ef95fee489948d33df391c4a9da31b7a3e29cf772c24eb42f74e94ab3bfe00bf29a239c17786a5b921853b7c5344d36694db43aa849e401f91566a5',
    address: 'cfxtest:aass3rfcwjz1ab9cg5rtbv61531fmwnsuuy8c26f20',
    networkId: 1
} */
// 生成一个随机的主网账户
PrivateKeyAccount.random(undefined, 1029) // 与上述账户不同
/* PrivateKeyAccount {
    privateKey: '0x1b67150f56f49556ef7e3899024d83c125d84990d311ec08fa98aa1433bc0f53',
    publicKey: '0xd442207828ffd4dad918fea0d75d42dbea1fe5e3789c00a82e18ce8229714eae3f70b12f2f1abd795ad3e5c52a5a597289eb5096548438c233431f498b47b9a6',
    address: 'cfx:aanpezyvznsdg29zu20wpudwnbhx7t4gcp9k23xchw',
    networkId: 1029
} */
// 使用随机源生成随机账户
PrivateKeyAccount.random('0xabcdefabcdef', 1);
/* PrivateKeyAccount {
    privateKey: '0x1d41e006afd28ea339922d8ab4be93154a14d4f1b6d0ad4e7aabf807e7536a5f',
    publicKey: '0x4c07c75d3fdc5b1d6afef6ec374b0eaac86bcaa771a1d536bc4ce6f111b1c60e414b370e4cf31bf7770ae6818a3518c485398a43857d9053153f6eb4f5644a90',
    address: 'cfxtest:aajx4wn2kwarr8h71uf880w40dp6x91feac1n6ur3s',
    networkId: 1
} */
```

## 查询区块链数据

我们还提供了许多函数以查询区块链数据，包括区块、交易、收据、纪元等。

```javascript
const { Conflux } = require('js-conflux-sdk');

const cfxClient = new Conflux({
  url: 'https://test.confluxrpc.com',
  networkId: 1,
  //   logger: console, // 用于调试
});

async function main() {
    const status = await cfxClient.cfx.getStatus();
    console.log(status);
}

// 其他可用的方法：
// cfxClient.cfx.getBalance
// cfxClient.cfx.getNextNonce
// cfxClient.cfx.getBlockByHash
// cfxClient.cfx.getTransactionByHash
// cfxClient.cfx.getTransactionReceipt
```

浏览 [ Conflux cfx 命名空间 API](https://github.com/Conflux-Chain/js-conflux-sdk/blob/v2/docs/api/Conflux.md) ，以获取完整的方法列表。 有关 JSON-RPC 的更多信息，请浏览 [Conflux Core JSON-RPC API](../build/json-rpc/).

## 部署智能合约

js-conflux-sdk 简化了智能合约的部署。

```javascript
// 先决条件：账户具有足够余额且已有来自 solc 或 hardhat 的智能合约字节码和 ABI
const abi = []; // Replace with your contract's ABI
const bytecode = '0xabcd'; // 替换为您合约的字节码

const contract = cfxClient.Contract({
  abi,
  bytecode,
});

async function main() {
    // 部署合约（如果构造函数内有参数，请进行修改）
    const receipt = await contract.constructor().sendTransaction({
        from: account,
    }).executed();
    console.log('New deployed contract address: ', receipt.contractCreated);
}
```

## 调用智能合约

要进行智能合约的调用，您需要有合约 ABI 和合约地址。

```javascript
const address = '';  // 替换为您的合约地址
const abi = []; // 替换为您合约的 ABI

const contract = cfxClient.Contract({
  abi,
  address,
});

async function main() {
    // 调用视图函数
    const result = await contract.viewFunctionName(params);
    console.log(result);
    // 调用非视图函数
    const receipt = await contract.nonViewFunctionName(params).sendTransaction({
        from: account,
    }).executed();
    console.log(receipt);
}
```

Consult the sdk's [Contract interaction guide](https://confluxnetwork.gitbook.io/js-conflux-sdk/docs/interact_with_contract) for more information.

## 常用工具

### 地址

地址模块提供了对 cfx 地址进行编码和解码以及验证的功能。

```javascript
const { address } = require('js-conflux-sdk');

// 将十六进制地址编码为 base32 格式的 cfx 地址
const cfxAddress = address.encodeCfxAddress('0x166d0ff7691030b0ca33d4e60e842cd300a3010d', 1);

// 将 base32 格式的 cfx 地址解码为十六进制地址
const decoded = address.decodeCfxAddress('cfxtest:aang4d91rejdbpgmgtmspdyefxkubj2bbywrwm9j3z');

// 检查地址是否有效
address.isValidCfxAddress('cfxtest:aang4d91rejdbpgmgtmspdyefxkubj2bbywrwm9j3z'); // Returns true

// 计算 EVM 映射地址
address.cfxMappedEVMSpace

Address('cfxtest:aang4d91rejdbpgmgtmspdyefxkubj2bbywrwm9j3z');
```

查看[地址工具 API ](https://github.com/Conflux-Chain/js-conflux-sdk/blob/v2/docs/api/util/address.md)获取更多信息。

### 格式

格式模块中包括在各种格式之间转换数据的函数。

```javascript
const { format } = require('js-conflux-sdk');

// 示例：
format.uInt(3); // 返回 3
format.hex(Buffer.from('hi')); // 返回 0x6869
format.bytes('0x03'); // 返回 <Buffer 03>
```

探索[格式 API](https://github.com/Conflux-Chain/js-conflux-sdk/blob/v2/docs/api/util/form.md) 以获取更多信息。

## 代币单位换算

使用 `Drip` 类进行 **Drip** 和 **CFX** 之间的转换。

```javascript
const { Drip } = require('js-conflux-sdk');

// 初始化 Drip 实例
let drip = new Drip('1000000000000000000'); // Equivalent to 1 CFX

// 从 CFX 初始化
drip = Drip.fromCFX(1); // Equivalent to 1 CFX

// 转换为 CFX
drip.toCFX(); // Returns 1
```

## 哈希和签名

`签名`模块提供了计算数据哈希和签名的功能。

```js
const { sign } = require('js-conflux-sdk');

// 生成随机 buffer
let buf = sign.randomBuffer(0);

// 生成 keccak 哈希
let keccakHash = sign.keccak256(buf);

// 生成一个随机私钥
let privateKey = sign.randomPrivateKey(buf);

// 将私钥转换为公钥
let pubKey = sign.privateKeyToPublicKey(privateKey);

// 将公钥转换为地址
let address = sign.publicKeyToAddress(pubKey);

// 使用私钥对 buffer 签名
let signResult = sign.ecdsaSign(buf, privateKey);

// 从签名和 buffer 中恢复公钥，然后将其转换为地址
sign.publicKeyToAddress(sign.ecdsaRecover(buf, sign.ecdsaSign(signResult, privateKey)))
```
