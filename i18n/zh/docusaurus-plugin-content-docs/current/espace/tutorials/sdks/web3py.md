---
sidebar_position: 2
title: web3.py
displayed_sidebar: eSpaceSidebar
description: 本页面旨在指导您如何在Conflux eSpace上开发时使用web3.py的基础知识。
keywords:
  - web3.py - Python - Conflux eSpace - Smart Contracts - Transactions - Blockchain Interaction - Solidity - ABI - Bytecode - HTTP Connection - Account Balance - Contract Deployment - Contract Methods - Call Methods - Send Methods - Gas Estimation - Transaction Signing - pip - RPC Endpoint - Private Key - Incrementer Contract - Compilation - Web3 Provider - Contract Instance - Transaction Receipt - solc-x - Gas Price Strategy
tags: [ Web3.py, 教程 ]
---

Web3.py和Web3.js是一组库，通过HTTP、IPC或WebSocket通信协议，分别使用Python和JavaScript编程语言，为开发者与Conflux节点互动提供便利。 本指南将为您提供使用[**Web3.py**](https://web3py.readthedocs.io/)库进行交易传输和部署智能合约的专业知识。

## 初始化项目

首先，创建一个目录，用于存储本指南中生成的所有相关文件。 使用以下命令执行此任务：

```shell
mkdir web3-examples && cd web3-examples 

```

为了成功实现后续部分，您需要安装Web3库和Solidity编译器。 要获取两个包，请执行以下命令：

```shell
pip3 install web3 py-solc-x 
```

## 设置HTTP连接

Prepare your Web3 HTTP connection to align with any evm-powered network. 为了同步您的项目，您必须获得您自己的端点和API密钥。 以下是如何逐步开始使用每个网络的方法。

```python
# Import Web3 library into your project: 
from web3 import Web3 

# Configure the HTTP connection to your RPC endpoint: 
web3 = Web3(Web3.HTTPProvider('RPC-API-ENDPOINT-HERE')) 
```

您可以在[**这里**](../../network-endpoints.md)找到Conflux eSpace网络端点。

## 发送交易并检查余额

在本节中，您将学习如何创建两个脚本以便在两个账户之间发送交易。 第一个脚本将用于在发送交易前后检查账户余额。 第二个脚本将实际发送交易。

### 检查余额

从第一个脚本开始，您需要使用命令"vim balances.py"创建一个名为"balances.py"的文件。 在这个文件中，您将设置Web3提供者，定义"sender_address"和"recipient_address"变量，并使用"web3.eth.get_balance"函数检索这些账户的余额。 然后使用"web3.fromWei"函数格式化结果，并使用"print"函数在您的终端中打印余额。
要运行余额脚本，请在终端中输入命令“python3 balances.py”。 发送方和接收方地址的余额将在您的终端中以CFX显示。

```python
 
# Set up the Web3 provider 
from web3 import Web3 
web3 = Web3(Web3.HTTPProvider('RPC-API-ENDPOINT-HERE')) 

# Define address variables 
sender_address = "SENDER-ADDRESS-HERE" 
recipient_address = "RECIPIENT-ADDRESS-HERE" 
 
# Retrieve balance data 
balance_sender = web3.fromWei(web3.eth.get_balance(sender_address), "ether") 
balance_recipient = web3.fromWei(web3.eth.get_balance(recipient_address), "ether") 

# Display balances in the terminal 
print(f"The balance of { sender_address } is: { balance_sender } CFX") 
print(f"The balance of { recipient_address } is: { balance_recipient } CFX") 
```

### 发送交易

从第二个脚本开始，您需要使用命令"vim transaction.py"创建一个"transaction.py"文件。 在这个文件中，您将导入"rpc_gas_price_strategy"以获取交易的燃料价格。 然后，您将建立Web3提供者，定义"sender"和"receiver"变量（包括"sender"账户的私钥），使用"web3.eth.set_gas_price_strategy"函数建立燃料价格策略，使用"web3.eth.account.sign_transaction"函数创建和签名交易，使用"web3.eth.send_raw_transaction"函数发送交易。 然后使用"web3.eth.wait_for_transaction_receipt"函数等待交易收据，并在您的终端中打印交易哈希。

要执行交易脚本，请在您的终端中运行命令 "python3 transaction.py"。 如果交易成功，您的终端中将显示交易哈希。 You can also use the balances script to verify that the balances for the origin and receiving accounts have changed.

```python

# Import the gas strategy 
from web3.gas_strategies.rpc import rpc_gas_price_strategy 

# Put the Web3 provider snippet here 
from web3 import Web3 
web3 = Web3(Web3.HTTPProvider('RPC-API-ENDPOINT-HERE')) 

# Define variables for addresses 
sender = { 
"private_key": "YOUR-PRIVATE-KEY-HERE", 
"address": "PUBLIC-ADDRESS-OF-PK-HERE", 
} 
receiver = "ADDRESS-TO-HERE" 
print(f'Attempting to send transaction from { sender["address"] } to { receiver}') 
 
# Establish the gas price strategy 
web3.eth.set_gas_price_strategy(rpc_gas_price_strategy) 
 
# Sign transaction with private key 
tx_create = web3.eth.account.sign_transaction( 
{ 
    "nonce": web3.eth.get_transaction_count(sender["address"]), 
    "gasPrice": web3.eth.generate_gas_price(), 
    "gas": 21000, 
    "to": receiver, 
    "value": web3.toWei("1", "ether"), 
}, 
sender["private_key"], 
) 
 
# Send transaction and wait for receipt 
tx_hash = web3.eth.send_raw_transaction(tx_create.rawTransaction) 
tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash) 
print(f"Transaction successful with hash: { tx_receipt.transactionHash.hex() }") 
```

## 部署合约

### 初始化智能合约

在接下来的部分中，您将初始化并执行一个名为Incrementer.sol的简单增量合约。 您可以通过生成一个用于合约的文件开始这个过程：

```shell
vim Incrementer.sol
```

创建文件后，下一步是将Solidity代码输入到文件中：

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

当合约被部署时，构造函数执行，并将初始值分配给存储在区块链上的numericVal变量（默认为0）。 通过调用increaseVal函数，会将提供的_inputVal添加到现有值上。 请注意，执行此函数需要发送一个交易，这会改变存储的数据。 最后，resetVal函数将存储的值重新分配为零。

### 编译合约

This section will guide you through the process of building a script that leverages the Solidity compiler to produce the ABI and bytecode for the Incrementer.sol contract. 首先，生成一个compile.py文件，并填写如下内容：

```python
# Import the compiler library 
import solcx 
 
# If you have already installed the Solidity compiler, comment next line 
 solcx.install_solc() 

# Compile contract 
comp_output = solcx.compile_files('Incrementer.sol') 
 
# Export contract data 
abi = comp_output['Incrementer.sol:Incrementer']['abi'] 
bytecode = comp_output['Incrementer.sol:Incrementer']['bin'] 
```

### 部署

要部署Incrementer.sol合约，您首先需要使用脚本编译合约，然后创建一个名为deploy.py的部署脚本文件。 部署脚本文件必须完成几个步骤，包括导入ABI和字节码，设置Web3提供者，定义带有私钥的account_from，创建合约实例，构建构造函数交易，签名交易，使用web3.eth.send_raw_transaction函数发送交易，并通过web3.eth.wait_for_transaction_receipt函数等待交易收据。 重要的是，请不要在Python文件中存储私钥。 完成这些步骤后，您可以成功部署Incrementer.sol合约。

```python
from compile import abi, bytecode 
 
from web3 import Web3 
web3 = Web3(Web3.HTTPProvider('RPC-API-ENDPOINT-HERE')) 
 
account_from = { 
	'private_key': 'YOUR-PRIVATE-KEY-HERE', 
	'address': 'PUBLIC-ADDRESS-OF-PK-HERE', 
} 
 
print(f'Attempting to deploy from account: { account_from["address"] }') 
 
Incrementer = web3.eth.contract(abi=abi, bytecode=bytecode) 
 
construct_txn = Incrementer.constructor(5).buildTransaction( 
	{ 
    	'from': account_from['address'], 
    	'nonce': web3.eth.get_transaction_count(account_from['address']), 
	} 
) 
 
tx_create = web3.eth.account.sign_transaction(construct_txn, account_from['private_key']) 
 
tx_hash = web3.eth.send_raw_transaction(tx_create.rawTransaction) 
tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash) 
 
print(f'Contract deployed at address: { tx_receipt.contractAddress }') 

```

## 调用方法

当您通过调用方法与合约交互时，合约的存储保持不变。 这意味着不需要发送交易。 相反，调用方法只是简单地读取部署合约的各种存储变量。 为此目的创建一个脚本，请首先创建一个名为get.py的文件。 然后，导入ABI，设置Web3提供者，并定义account_from，包括私钥，该私钥用于签署交易。

请注意，这只是为了示例目的，您绝不应在Python文件中存储您的私钥。 之后，使用web3.eth.contract函数创建一个合约实例，并传入已部署合约的ABI和地址。 最后，使用合约实例调用number函数。

```python
from compile import abi 
 
from web3 import Web3 
web3 = Web3(Web3.HTTPProvider('RPC-API-ENDPOINT-HERE')) 
 
 
contract_address = 'CONTRACT-ADDRESS-HERE' 
print(f'Making a call to contract at address: { contract_address }') 
 
Incrementer = web3.eth.contract(address=contract_address, abi=abi) 
 
number = Incrementer.functions.number().call() 
print(f'The current number stored is: { number } ') 
```

## Send Methods

In this section, we'll cover the send methods used to modify a contract's storage, which requires signing and sending a transaction. 目的是创建一个脚本来增加增量器的值。 开始之前，您可以创建一个名为increment.py的文件。 首先导入ABI并设置Web3提供者。 定义account_from，包括私钥，部署合约的contract_address和要增加的值。 However, it's not recommended to store private keys in a Python file.

接下来，使用web3.eth.contract函数创建一个合约实例，并传入ABI和部署合约的地址。 Generate the increment transaction using the contract instance, passing in the value to increment by. 使用buildTransaction函数包含交易详情，如发送方的from地址和nonce。 通过调用web3.eth.get_transaction_count函数获取nonce。 通过调用web3.eth.account.sign_transaction函数并传入增量交易和发送方的私钥来签署交易。

最后，使用web3.eth.send_raw_transaction函数发送已签名的交易，并通过调用web3.eth.wait_for_transaction_receipt函数等待交易收据。

```python
from compile import abi 
from web3 import Web3 
web3 = Web3(Web3.HTTPProvider('RPC-API-ENDPOINT-HERE')) 
 
account_from = { 
	'private_key': 'YOUR-PRIVATE-KEY-HERE', 
	'address': 'PUBLIC-ADDRESS-OF-PK-HERE', 
} 
contract_address = 'CONTRACT-ADDRESS-HERE' 
value = 3 
print( 
	f'Calling the increment by { value } function in contract at address: { contract_address }' 
) 
Incrementer = web3.eth.contract(address=contract_address, abi=abi) 
 
increment_tx = Incrementer.functions.increment(value).buildTransaction( 
	{ 
    	'from': account_from['address'], 
    	'nonce': web3.eth.get_transaction_count(account_from['address']), 
	} 
) 
 
tx_create = web3.eth.account.sign_transaction(increment_tx, account_from['private_key']) 
 
tx_hash = web3.eth.send_raw_transaction(tx_create.rawTransaction) 
tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash) 
print(f'Tx successful with hash: { tx_receipt.transactionHash.hex() }') 
```

## 其他资源:

- [**Web3.py 文档**](https://web3py.readthedocs.io/)

