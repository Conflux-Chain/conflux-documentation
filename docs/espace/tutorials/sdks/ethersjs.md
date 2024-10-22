---
sidebar_position: 3
title: ethers.js
displayed_sidebar: eSpaceSidebar
description: This page is meant to guide you through the basics on how to use ethers.js when developing on Conflux eSpace.
keywords:
  - ethers.js
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
  - Contract Methods
  - Call Methods
  - Send Methods
  - Gas Estimation
  - Transaction Signing
  - Node.js
  - RPC Endpoint
  - Private Key
  - Web3 Provider
tags: [ethers.js, Tutorial]
---


ethers.js is a JavaScript library for building Ethereum applications. As Conflux eSpace is compatible with Ethereum, we can directly use this library within Conflux eSpace. Currently, ethers has two main versions: v6 and v5. This tutorial focuses on demonstrating how to utilize the v6 version within Conflux eSpace.

The tutorial covers sending transactions, interacting with contracts, and querying on-chain data using ethers within Conflux eSpace.

# Installation

```bash
mkdir demo && cd demo && npm init -y && npm install ethers
```

```js
import { ethers } from "ethers";
```


ethers provides several abstract functions and class for developers:

- `providers`: provides abstract functions for connecting to the Ethereum network. For example, [`JsonRpcProvider`](https://docs.ethers.org/v6/api/providers/jsonrpc/#JsonRpcProvider) for fetching data from the chain using HTTP, [`WebSocketProvider`](https://docs.ethers.org/v6/api/providers/#WebSocketProvider) for fetching data from the chain using WebSocket, and the more common browser plugin [`BrowserProvider`](https://docs.ethers.org/v6/api/providers/#BrowserProvider)

- `signers`: provides abstract functions for managing accounts. For example, [`Wallet`](https://docs.ethers.org/v6/api/wallet/#Wallet) facilitates transactions and message signing by managing a single private key, while [`HdWallet`](https://docs.ethers.org/v6/api/wallet/#hd-wallets) generates multiple private keys from a mnemonic phrase for transaction and message signing

- `contracts`: provides abstract functions for interacting with contracts, such as [`Contract`](https://docs.ethers.org/v6/api/contract/#Contract)

# Using ethers

## Provider

First, we need to use a provider to connect to the Conflux blockchain space.

```js
import { JsonRpcProvider, WebSocketProvider } from "ethers";
// use HTTP
const provider = new JsonRpcProvider("https://evm.confluxrpc.com");

// use WebSocket
const provider = new WebSocketProvider("wss://evm.confluxrpc.com/ws");

const blockNumber = await provider.getBlockNumber();
```


After connecting to Conflux eSpace with JsonRpcProvider or WebSocketProvider, we can easily retrieve the desired data and status from the chain. Here you can find all the RPCs officially provided by Conflux eSpace, but developers often prefer to directly connect to the user's plugin wallet. The following example will demonstrate how to directly connect to the user's wallet.

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

## Numerical Values


In Ethereum, all units are represented as integers. However, long numbers can be difficult to read and write. Therefore, ethers provides a variety of utility functions for handling these numbers. As Conflux eSpace is compatible with Ethereum, it is also easy to use these utility functions.

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

## Transaction

In general, we send transactions using a wallet. However, we can also sign and send transactions directly using a private key. Next, we will demonstrate examples of signing and sending transactions using a wallet and a private key, respectively.

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
The following example demonstrates how to sign and send a transaction locally using a private key.

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

## Contracts

In ethers, contracts are abstracted as class, determining the contract's properties and methods by parsing the provided ABI. Next, we will demonstrate an example of calling a contract function.

### ABI

In Ether.js, you can utilize the JSON format ABI generated by compiling contracts in Solidity, and it also supports human-readable ABI (Solidity signatures). In practice, there is no need to list out all ABIs; you only need to specify the methods you want.

there are examples of two ABIs.
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

### Read-only functions (`view` and `pure`)

The properties of read-only functions (`view` and `pure`) are not modified and are typically used to retrieve relevant data from the contract.

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

### Method for Changing Contract State

Some methods result in changes to the contract's state. Typically, such methods require a transaction to be submitted to the chain, for example `transfer`, `approve`, `transferFrom` etc.
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

### Sign Messages


Many DAPPs require users to sign messages to verify their identity. Here is an example.
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

[ethers.js Documentation](https://docs.ethers.org/v6/)
