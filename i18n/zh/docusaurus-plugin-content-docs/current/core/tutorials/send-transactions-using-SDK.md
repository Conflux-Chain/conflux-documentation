---
sidebar_position: 2
title: 使用 SDK 发送交易
---

## 安装

`npm install js-conflux-sdk`

## 使用 SDK 发送交易

* 导入`js-conflux-sdk`并设置一个Conflux provider。 对于Conflux测试网，你可以使用提供在`https://test.confluxrpc.com`的节点。 它也可以改为任何其他Conflux节点，甚至是你自己的。

```javascript
const { Conflux, Drip } = require('js-conflux-sdk');

const conflux = new Conflux({
  url: 'https://test.confluxrpc.com',
  logger: console,
  networkId: 1,
});
```

* 将你的私钥粘贴到程序中

```javascript
const PRIVATE_KEY = 'Your Private Key';
// const PRIVATE_KEY = '0x5f15f9e52fc5ec6f77115a9f306c120a7e80d83115212d33a843bb6b7989c261';
const account = conflux.wallet.addPrivateKey(PRIVATE_KEY); // create account instance
const receiver = 'cfxtest:aarc9abycue0hhzgyrr53m6cxedgccrmmy8m50bu1p'
```

* 组装你的交易：

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

> 每个字段的详细解释可以在[这里](../learn/core-space-basics/core-transactions.md)找到

* 通过`cfx.sendTransaction`发送组装完成的交易，并获得返回的交易哈希。 然后你可以通过使用`tx.mined()`或`tx.executed()`来查看交易详情，这些API将在交易被完成或执行时返回交易数据或交易收据。 注意这两个API是对`cfx.getTransactionByHash`和`cfx.getTransactionReceipt`的简单封装层。 你也可以在[Conflux Scan](http://confluxscan.io/)上搜索哈希。

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

## 其他语言示例

Refer to [SDKs](../build/sdks-and-tools/sdks.md) for examples of other SDKs.
