---
sidebar_position: 2
title: web3.js
displayed_sidebar: eSpaceSidebar
description: This page is meant to guide you through the basics on how to use web3.js when developing on Conflux eSpace.
keywords:
  - web3.js - JavaScript - Conflux eSpace - Smart Contracts - Transactions - Blockchain Interaction - Solidity - ABI - Bytecode - HTTP Connection - Account Balance - Contract Deployment - Contract Methods - Call Methods - Send Methods - Gas Estimation - Transaction Signing - npm - Node.js - RPC Endpoint - Private Key - Incrementer Contract - Compilation - Web3 Provider - Contract Instance - Transaction Receipt
tags: [ Web3.js, 教程 ]
---

Web3.py 和 Web3.js 是一组库，通过 HTTP、IPC 或 WebSocket 通信协议，分别使用 Python 和 JavaScript 编程语言，帮助开发者与 Conflux 节点进行交互。 本指南将为您提供使用[**Web3.js**](https://web3js.readthedocs.io/en/v1.8.2/)库传输交易和部署智能合约的专业知识。

## 初始化项目

首先，创建一个目录，用于存储本指南中生成的所有相关文件。 使用以下命令执行此任务：

```shell
mkdir web3-examples && cd web3-examples 

```

为了成功实现接下来的部分，您需要安装Web3库和Solidity编译器。 执行以下命令来获取这两个包：

```shell
npm install web3 solc@0.8.0 
```

## 设置HTTP连接

Prepare your Web3 HTTP connection to align with any evm-powered network. 为了同步您的项目，您必须确保拥有自己的端点和API密钥。

以下是您可以开始的方式：

```javascript
// Create a Web3 instance: 

const Web3 = require('web3'); 
 
// Insert your RPC URL to establish an HTTP connection to your RPC endpoint:

const web3 = new Web3('RPC-API-ENDPOINT-HERE'); 

```

您可以在这里找到Conflux eSpace网络端点 [**here**](../../network-endpoints.md)。

## 发送交易并检查余额

本节中，您将学习如何创建两个脚本，以便在两个账户之间发送交易。 第一个脚本将用于检查交易前后账户的余额。 第二个脚本将实际发送交易。

### 检查余额

要检查交易前后的账户余额，您只需要创建一个文件。
您可以通过执行以下命令开始创建一个balances.js文件：

```shell

vim balances.js 
```

之后，您可以创建该文件的脚本。

以下是脚本的代码：

```javascript
// Add the Web3 provider snippet 

const Web3 = require('web3'); 
const web3 = new Web3('RPC-API-ENDPOINT-HERE'); 

// Create address variables 

const sender_address = 'ADDRESS-FROM-HERE'; 
const recipient_address = 'ADDRESS-TO-HERE'; 
 
// Create balances function 

const balances = async () => { 

// Get balance info 

  const balance_sender = web3.utils.fromWei(await web3.eth.getBalance(sender_address), 'ether'); 
  const balance_recipient = web3.utils.fromWei(await web3.eth.getBalance(recipient_address), 'ether'); 
  console.log(The balance of ${sender_address} is: ${balance_sender} CFX); 
  console.log(The balance of ${recipient_address} is: ${balance_recipient} CFX); 
}; 
 
// Call balances function 

balances(); 
```

要获取账户余额，只需运行以下命令：

```shell
node balances.js 
```

If successful, the balances for the origin and receiving addresses will be displayed in your terminal in CFX.

### 发送交易

Create a .js file by "vim transaction.js" and fill it with the code below. By "node transaction.js" you can execute it.

```javascript
// Add the Web3 provider snippet 
const Web3 = require('web3'); 
const web3 = new Web3('RPC-API-ENDPOINT-HERE'); 


/// Create account variables 
const sender = { 
  privateKey: 'YOUR-PRIVATE-KEY-HERE', 
  address: 'PUBLIC-ADDRESS-OF-PK-HERE', 
}; 
const receiver = 'ADDRESS-TO-HERE'; 

 
// Create send function 
const send = async () => { 
  console.log(`Attempting to send transaction from ${sender.address} to ${receiver}`); 
 
// Sign tx with PK 
  const createTransaction = await web3.eth.accounts.signTransaction( 
	{ 
  	gas: 21000, 
  	to: receiver, 
  	value: web3.utils.toWei('1', 'ether'), 
	}, 
	sender.privateKey 
  ); 
 
/// Send tx and wait for receipt
  const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction); 
  console.log(`Transaction successful with hash: ${createReceipt.transactionHash}`); 
};  
 
// Call send function 
send(); 
```

## 部署合约

### 初始化智能合约

在接下来的部分中，您将初始化和执行一个名为Incrementer.sol的简单的增量合约。 You may commence the process by generating a file for the contract:

```shell
vim Incrementer.sol
```

一旦您创建了文件，接下来的步骤是将Solidity代码输入到文件中：

```solidity
// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0; 
contract Incrementer { 
  uint256 public numericVal; 
  constructor(uint256 _startVal) { 
    numericVal = _startVal; 
  } 
  function increaseVal(uint256 _inputVal) public { 
    numericVal = numericVal + _inputVal; 
  } 
  function resetVal() public { 
    numericVal = 0; 
  } 
} 
```

当合约部署时，构造函数执行并将起始值赋给存储在区块链上的numericVal变量(默认值为0)。 通过调用increaseVal函数，会将提供的_inputVal添加到现有值上。 请注意，执行此函数需要发送交易，这会更改存储的数据。 最后，resetVal函数将存储的值重新赋为零。

### 编译合约

This section will guide you through the process of building a script that leverages the Solidity compiler to produce the ABI and bytecode for the Incrementer.sol contract. Start by generating a compile.js and fill it as bellow:

```javascript
// Import packages 
const fs = require('fs'); 
const solc = require('solc'); 
 
// Load contract 

const source = fs.readFileSync('Incrementer.sol', 'utf8'); 
 
 
// Create input 

const inputObject = { 
   language: 'Solidity', 
   sources: { 
  	'Incrementer.sol': { 
     	content: source, 
  	}, 
   }, 
   settings: { 
  	outputSelection: { 
     	'*': { 
        	'*': ['*'], 
     	}, 
  	}, 
   }, 
}; 
 
// Compile the contract 
const compOutput = JSON.parse(solc.compile(JSON.stringify(inputObject))); 
const contract = compOutput.contracts['Incrementer.sol']['Incrementer']; 
 
// Export contract data  
module.exports = contract; 
```

### 部署

要部署Incrementer.sol合约，您需要首先使用脚本编译合约，然后创建一个名为deploy.js的部署脚本文件。 The deployment script file must complete several steps, including importing the ABI and bytecode, setting up the Web3 provider, defining the account_from with the private_key, creating a contract instance, building a constructor transaction, signing the transaction, sending it using web3.eth.send_raw_transaction function, and waiting for the transaction receipt by using web3.eth.wait_for_transaction_receipt function.

```javascript
const contractFile = require('./compile'); 
 
const Web3 = require('web3'); 
const web3 = new Web3('RPC-API-ENDPOINT-HERE'); 
 
const accountFrom = { 
  privateKey: 'YOUR-PRIVATE-KEY-HERE', 
  address: 'PUBLIC-ADDRESS-OF-PK-HERE', 
}; 
 
const bytecode = contractFile.evm.bytecode.object; 
const abi = contractFile.abi; 
 
 
const deploy = async () => { 
  console.log(`Attempting to deploy from account ${accountFrom.address}`); 
 
 
  const incrementer = new web3.eth.Contract(abi); 
 
 
  const incrementerTx = incrementer.deploy({ 
	data: bytecode, 
	arguments: [5], 
  }); 
 
 
  const createTransaction = await web3.eth.accounts.signTransaction( 
	{ 
  	data: incrementerTx.encodeABI(), 
  	gas: await incrementerTx.estimateGas(), 
	}, 
	accountFrom.privateKey 
  ); 
 
 
  const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction); 
  console.log(`Contract deployed at address: ${createReceipt.contractAddress}`); 
}; 
deploy(); 
```

## 调用方法

When you interact with a contract through call methods, the contract's storage remains unchanged. 这意味着不需要发送交易。 相反，调用方法只是简单地读取部署合约的各种存储变量。 To create a script for this purpose, start by creating a file named get.js. Then, import the ABI, set up the Web3 provider, and define the account_from, including the private_key, which is required to sign the transaction.

Note that this is only for example purposes, and you should never store your private keys in a JS file. 之后，使用web3.eth.contract函数创建一个合约实例，并传入已部署合约的ABI和地址。 最后，使用合约实例调用number函数。

```javascript
const { abi } = require('./compile'); 
const Web3 = require('web3'); 
const web3 = new Web3('RPC-API-ENDPOINT-HERE'); 
 
const contractAddress = 'CONTRACT-ADDRESS-HERE'; 
 
const incrementer = new web3.eth.Contract(abi, contractAddress); 
 
const get = async () => { 
  console.log(`Making a call to contract at address: ${contractAddress}`); 
 
 
  const data = await incrementer.methods.numericVal().call(); 
  console.log(`The current number stored is: ${data}`); 
}; 
 
get(); 
```

## Send Methods

In this section, we'll cover the send methods used to modify a contract's storage, which requires signing and sending a transaction. The purpose is to create a script to increment the incrementer. To get started, you can create a file named increment.js. Begin by importing the ABI and setting up the Web3 provider. Define the account_from, including the private_key, contract_address of the deployed contract, and the value to increment by. However, it's not recommended to store private keys in a JS file.

Next, create a contract instance using web3.eth.contract function by passing in the ABI and address of the deployed contract. Generate the increment transaction using the contract instance, passing in the value to increment by. Use the buildTransaction function to include the transaction details, such as the from address and the nonce for the sender. Obtain the nonce by calling web3.eth.get_transaction_count function. Sign the transaction by calling the web3.eth.account.sign_transaction function and passing in the increment transaction and the private_key of the sender.

Finally, send the signed transaction using web3.eth.send_raw_transaction function and wait for the transaction receipt by calling web3.eth.wait_for_transaction_receipt function.

```javascript
const { abi } = require('./compile'); 
 
const Web3 = require('web3'); 
const web3 = new Web3('RPC-API-ENDPOINT-HERE'); 
 
const accountFrom = { 
  privateKey: 'YOUR-PRIVATE-KEY-HERE', 
}; 
const contractAddress = 'CONTRACT-ADDRESS-HERE'; 
const _value = 3; 
 
const incrementer = new web3.eth.Contract(abi, contractAddress); 
 
 
const incrementTx = incrementer.methods.increaseVal(_value); 
 
const increment = async () => { 
  console.log( 
	`Calling the increment by ${_value} function in contract at address: ${contractAddress}` 
  ); 
 
  const createTransaction = await web3.eth.accounts.signTransaction( 
	{ 
  	to: contractAddress, 
  	data: incrementTx.encodeABI(), 
  	gas: await incrementTx.estimateGas(), 
	}, 
	accountFrom.privateKey 
  ); 
 
  const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction); 
  console.log(`Tx successful with hash: ${createReceipt.transactionHash}`); 
}; 
 
 
increment(); 
```

## 教育视频：

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
    <TabItem value="youtube6" label="web3.js Demo">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/DZTl38-aNn8?si=PXKEpqknSUPfdOAy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </TabItem>
</Tabs>

## 其他资源:

- [**Web3.js Documentation**](https://web3js.readthedocs.io/en/v1.8.2/)
