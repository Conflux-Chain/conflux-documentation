---
sidebar_position: 2
title: web3.py
displayed_sidebar: eSpaceSidebar
description: This page is meant to guide you through the basics on how to use web3.py when developing on Conflux eSpace.
tags:
  - web3.py
  - Python
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
  - pip
  - RPC Endpoint
  - Private Key
  - Incrementer Contract
  - Compilation
  - Web3 Provider
  - Contract Instance
  - Transaction Receipt
  - solc-x
  - Gas Price Strategy
---

Web3.py and Web3.js are a set of libraries that facilitate the interaction of developers with Conflux nodes via the HTTP, IPC, or WebSocket communication protocols, using the Python and JavaScript programming languages respectively. This guide will provide you with the expertise to leverage the [**Web3.py**](https://web3py.readthedocs.io/) library for transmitting transactions and deploying smart contracts.

## Initiate a Project

To start, first create a directory where all the relevant files generated throughout this guide can be stored. Execute this task with the following command:

```shell
mkdir web3-examples && cd web3-examples 

```

For the successful implementation of the upcoming sections, you'll need to install the Web3 library and the Solidity compiler. To obtain both packages, execute the following command:

```shell
pip3 install web3 py-solc-x 
```

## Setup the HTTP connection

Prepare your Web3 HTTP connection to align with any evm-powered network. To synchronize your project, you must secure an endpoint and API key of your own. Here's how you can get started with each network, step by step.

```python
# Import Web3 library into your project: 
from web3 import Web3 

# Configure the HTTP connection to your RPC endpoint: 
web3 = Web3(Web3.HTTPProvider('RPC-API-ENDPOINT-HERE')) 
```

You can find Conflux eSpace Network Endpoints [**here**](../../network-endpoints.md).

## Send a Transaction and check the balances

In this section, you will learn how to create two scripts in order to send a transaction between two accounts. The first script will be used to check the balances of the accounts before and after the transaction is sent. The second script will actually send the transaction.

### Check the balances

To begin with the first script, you need to create a file called "balances.py" using the command "vim balances.py". In this file, you will set up the Web3 provider, define the variables "sender_address" and "recipient_address", and retrieve the balances of these accounts using the "web3.eth.get_balance" function. You will then format the results using the "web3.fromWei" function and print the balances in your terminal using the "print" function.
To run the balances script, enter the command "python3 balances.py" in your terminal. The balances for the sender and recipient addresses will be displayed in your terminal in CFX.

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

### Send a transaction

To begin with the second script, you need to create a "transaction.py" file using the command "vim transaction.py". Within this file, you will import "rpc_gas_price_strategy" to obtain the gas price for the transaction. Then you will establish the Web3 provider, define the "sender" and "receiver" variables (including the private key for the "sender" account), establish the gas price strategy using the "web3.eth.set_gas_price_strategy" function, create and sign the transaction using the "web3.eth.account.sign_transaction" function, and send the transaction using the "web3.eth.send_raw_transaction" function. You will then wait for the transaction receipt using the "web3.eth.wait_for_transaction_receipt" function and print the transaction hash in your terminal.

To execute the transaction script, run the command "python3 transaction.py" in your terminal. If the transaction is successful, the transaction hash will be displayed in your terminal. You can also use the balances script to verify that the balances for the origin and receiving accounts have changed.

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

This section will guide you through the process of building a script that leverages the Solidity compiler to produce the ABI and bytecode for the Incrementer.sol contract. Start by generating a compile.py and fill it as bellow:

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

### Deployment

To deploy the Incrementer.sol contract, you need to first compile the contract using a script and then create a deployment script file called deploy.py. The deployment script file must complete several steps, including importing the ABI and bytecode, setting up the Web3 provider, defining the account_from with the private_key, creating a contract instance, building a constructor transaction, signing the transaction, sending it using web3.eth.send_raw_transaction function, and waiting for the transaction receipt by using web3.eth.wait_for_transaction_receipt function. It's essential to note that the private key should never be stored in a Python file. With these steps completed, you can successfully deploy the Incrementer.sol contract.

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

## Call methods

When you interact with a contract through call methods, the contract's storage remains unchanged. This means that no transaction needs to be sent. Rather, call methods simply read various storage variables of the deployed contract. To create a script for this purpose, start by creating a file named get.py. Then, import the ABI, set up the Web3 provider, and define the account_from, including the private_key, which is required to sign the transaction.

Note that this is only for example purposes, and you should never store your private keys in a Python file. After that, create a contract instance using the web3.eth.contract function and passing in the ABI and address of the deployed contract. Finally, use the contract instance to call the number function.

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

In this section, we'll cover the send methods used to modify a contract's storage, which requires signing and sending a transaction. The purpose is to create a script to increment the incrementer. To get started, you can create a file named increment.py. Begin by importing the ABI and setting up the Web3 provider. Define the account_from, including the private_key, contract_address of the deployed contract, and the value to increment by. However, it's not recommended to store private keys in a Python file.

Next, create a contract instance using web3.eth.contract function by passing in the ABI and address of the deployed contract. Generate the increment transaction using the contract instance, passing in the value to increment by. Use the buildTransaction function to include the transaction details, such as the from address and the nonce for the sender. Obtain the nonce by calling web3.eth.get_transaction_count function. Sign the transaction by calling the web3.eth.account.sign_transaction function and passing in the increment transaction and the private_key of the sender.

Finally, send the signed transaction using web3.eth.send_raw_transaction function and wait for the transaction receipt by calling web3.eth.wait_for_transaction_receipt function.

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

## Additional Resources:

- [**Web3.py Documentation**](https://web3py.readthedocs.io/)
