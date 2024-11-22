---
sidebar_position: 2
title: web3.js
displayed_sidebar: eSpaceSidebar
description: This page is meant to guide you through the basics on how to use web3.js when developing on Conflux eSpace.
keywords:
- web3.js
  - JavaScript
  - Conflux eSpace
  - Smart Contracts
  - Transactions
  - Blockchain Interaction
  - Solidity
  - ABI
  - Bytecode
  - HTTP Connection
  - Account Balance
  - Contract Deployment
  - Contract Methods
  - Call Methods
  - Send Methods
  - Gas Estimation
  - Transaction Signing
  - npm
  - Node.js
  - RPC Endpoint
  - Private Key
  - Incrementer Contract
  - Compilation
  - Web3 Provider
  - Contract Instance
  - Transaction Receipt
tags: [Web3.js, Tutorial]
  
---

Web3.py and Web3.js are a set of libraries that facilitate the interaction of developers with Conflux nodes via the HTTP, IPC, or WebSocket communication protocols, using the Python and JavaScript programming languages respectively. This guide will provide you with the expertise to leverage the [**Web3.js**](https://web3js.readthedocs.io/en/v1.8.2/) library for transmitting transactions and deploying smart contracts. 
 
 
## Initiate a Project 
 
 
To start, first create a directory where all the relevant files generated throughout this guide can be stored. Execute this task with the following command: 


```shell
mkdir web3-examples && cd web3-examples 

```

For the successful implementation of the upcoming sections, you'll need to install the Web3 library and the Solidity compiler. To obtain both packages, execute the following command: 

```shell
npm install web3 solc@0.8.0 
``` 
 
## Setup the HTTP connection 
 
 
Prepare your Web3 HTTP connection to align with any evm-powered network. To synchronize your project, you must secure an endpoint and API key of your own. 

Here's how you can get started: 

```javascript 
// Create a Web3 instance: 

const Web3 = require('web3'); 
 
// Insert your RPC URL to establish an HTTP connection to your RPC endpoint:

const web3 = new Web3('RPC-API-ENDPOINT-HERE'); 

```
You can find Conflux eSpace Network Endpoints [**here**](../../network-endpoints.md). 
 
 
## Send a Transaction and check the balances 
 
 
In this section, you will learn how to create two scripts in order to send a transaction between two accounts. The first script will be used to check the balances of the accounts before and after the transaction is sent. The second script will actually send the transaction. 
 
 
### Check the balances 
  
To check the account balances before and after the transaction, you just need to create a single file. 
You can start by creating a balances.js file by executing: 

```shell 

vim balances.js 
``` 
 
After that, you can create the script for the file.

Here's the code for the script: 

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
 
 
To fetch the account balances, simply run the following command: 

```shell
node balances.js 
``` 
 
If successful, the balances for the origin and receiving addresses will be displayed in your terminal in CFX. 
 
 
### Send a transaction 

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
 
## Deploy a Contract 
 
### Initialize a Smart Contract 
 
Within the following sections, you will be initializing and executing a straightforward incremental contract named Incrementer.sol. You may commence the process by generating a file for the contract:

```shell
vim Incrementer.sol
```

Once you have created the file, the subsequent step is to input the Solidity code into the file: 

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
 
When the contract is deployed, the constructor function executes and assigns the starting value to the numericVal variable that is stored on the blockchain (the default is 0). By invoking the increaseVal function, the supplied _inputVal is added to the existing value. Note that executing this function requires sending a transaction, which alters the stored data. Lastly, the resetVal function reassigns the stored value to zero. 
 
### Compile the Contract 
 
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
 
 
### Deployment 
 
To deploy the Incrementer.sol contract, you need to first compile the contract using a script and then create a deployment script file called deploy.js. The deployment script file must complete several steps, including importing the ABI and bytecode, setting up the Web3 provider, defining the account_from with the private_key, creating a contract instance, building a constructor transaction, signing the transaction, sending it using web3.eth.send_raw_transaction function, and waiting for the transaction receipt by using web3.eth.wait_for_transaction_receipt function. 


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

## Call methods 
 
When you interact with a contract through call methods, the contract's storage remains unchanged. This means that no transaction needs to be sent. Rather, call methods simply read various storage variables of the deployed contract. To create a script for this purpose, start by creating a file named get.js. Then, import the ABI, set up the Web3 provider, and define the account_from, including the private_key, which is required to sign the transaction. 

Note that this is only for example purposes, and you should never store your private keys in a JS file. After that, create a contract instance using the web3.eth.contract function and passing in the ABI and address of the deployed contract. Finally, use the contract instance to call the number function. 
 

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


## Educational Videos:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
    <TabItem value="youtube6" label="web3.js Demo">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/DZTl38-aNn8?si=PXKEpqknSUPfdOAy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </TabItem>
</Tabs>


## Additional Resources:
- [**Web3.js Documentation**](https://web3js.readthedocs.io/en/v1.8.2/) 
