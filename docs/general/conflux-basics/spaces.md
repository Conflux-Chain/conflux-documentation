---
sidebar_position: 7
title: Spaces
keywords: 
---

## **Introduction to Spaces**

In the Conflux v2.0 (Hydra) upgrade, a new feature called Spaces was introduced through **[CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md)**. Spaces is an abstract concept that is used to distinguish Conflux-format transactions from Ethereum-format transactions. Spaces is a way to virtually create a sub-chain of the original Conflux network, known as **`eSpace`**.

CoreSpace refers to the original Conflux network, while eSpace is the virtualized Ethereum chain running on top of the CoreSpace network. The two spaces are logically independent of each other and do not affect each other.

In other words, we can think of Spaces as a virtualization technology from operating system concepts, where eSpace is a virtualized Ethereum chain running on the original Conflux network.

## **Why Introduce eSpace?**

Conflux is a high-performance, fully decentralized public chain enabled by an innovative Tree-Graph consensus algorithm. The transaction fee of Conflux is very low, which can be seen as almost free compared to other networks such as Ethereum. However, Ethereum has already built a mature ecosystem, including tools, SDKs, wallets, and Solidity libraries. To reduce the migration cost of projects and users and make users experience the advantages of low fees and high TPS of Conflux, eSpace was introduced.

Through the fully compatible interface, smart contracts, and dApps of Ethereum can be directly deployed to eSpace without any modification. Development tools, SDKs, wallets, and services of Ethereum can be directly used in eSpace. Users do not need to learn new knowledge but can use the original tools to get started directly.

eSpace is very easy to use for Ethereum developers and users, just like BSC, Polygon, Aurora.

## **The Relationship Between the Two Spaces**

CoreSpace and eSpace are two logically independent spaces with their own transactions, account status, and contracts. They share the same ledger (chain) for underlying data storage. A block may contain transactions from both Spaces, and they are only differentiated by the transaction type when transactions are executed. Each will only impact the account status in its own Space.

To interact with CoreSpace, use Conflux-compatible wallet (Fluent), SDK (*-conflux-SDK), and development tools (chainIDE, conflux-truffle). To interact with eSpace directly, use the existing tools and products from the Ethereum ecosystem, such as Metamask, Truffle, Hardhat, Ethers.js, etc. (by simply setting the RPC network of the tool to **[Conflux eSpace RPC](../../espace/build/network-endpoints.md)**.

## **How to Communicate Between Spaces**

Since the newly introduced eSpace chain has not introduced any new tokens, CFX is still used as the native token in eSpace to pay transaction fees. However, CFX can be easily transferred between the two spaces using the internal contract **`CrossSpaceCall`**. This contract enables cross-space transfers of CFX, as well as the deployment of contracts from CoreSpace to eSpace and the calling of eSpace contract methods in CoreSpace. This makes it easy to interact between the two spaces and leverage the unique features of each space to build powerful decentralized applications.

## **Mirror Address**

Each account in CoreSpace has a corresponding account in eSpace, which we call the **`Mirror Address`**. However, eSpace accounts do not have the corresponding account in CoreSpace. The mirror address from CoreSpace to eSpace is calculated by fixed steps:

1. Decode the original Base32 address to get the address payload with the Buffer format.
2. Hash the payload by Keccak and take the last 20 bytes.
3. The mirror address is the result of the previous step in hex encoding.

Conflux SDKs provide methods to calculate the base32 mirror address.

```
jsCopy code
// js-conflux-sdk example
> const { address } = require('js-conflux-sdk')
> address.cfxMappedEVMSpaceAddress('cfx:aamgvyzht7h1zxdghb9ee9w26wrz8rd3gj837392dp')
'0x62954816cE133B41Ab888e1b68b62549DE2f32e0'

```

Note: Do not directly use the hex address that is resulted from decoding the base32 address as the **`eSpace mirror address`** or **`eSpace address`**. This operation is wrong and will lead to loss of assets.

## **Internal Contract CrossSpaceCall**

CrossSpaceCall is an internal contract located in **`CoreSpace`** with hex40 format address **`0x08880000000000000000000000000000000000000006`**. The specific interface of the contract can be found in its **[interface documentation](../../core/learn/core-space-basics/internal-contracts/crossSpaceCall.md)**.

The internal contract CrossSpaceCall provides several functions.

1. It enables the cross-space transfers of CFX.
2. It enables deploy contracts to eSpace from CoreSpace.
3. It enables eSpace contract methods to be called in CoreSpace.

The cross-space transfers of CFX are synchronous and can be done within one transaction. It is simpler, safer, and faster compared to cross-chain transfers.

**[ConfluxHub CrossSpace app](https://confluxhub.io/espace-bridge/cross-space)** is a CFX, ERC20 cross-space transfer application based on this internal contract, which is very user-friendly.

## **How To Communicate Between Spaces**

Communicating between spaces is a critical aspect of using Conflux Network Spaces. The following are some recommended methods:

1. The most straightforward method is to use the built-in **`CrossSpaceCall`** contract to transfer CFX and call contracts between spaces.
2. Another method is to use the built-in event system. If a contract in one space generates an event, a contract in another space can listen to the event by setting the address of the listening contract in the event data.
3. An advanced method is to use **`On-chain Message Passing`** to exchange messages between spaces.

## **How To Choose**

Conflux CoreSpace is a native space that supports **`contract sponsorship`** and **`has more network capacity (higher TPS)`**, but requires unique Base32 addresses, RPC, SDK, etc. Therefore, if you want to develop a brand new project, you can choose the CoreSpace and the users of the project can interact with the project by paying no gas fee.

If you want to deploy an Ethereum project to take advantage of Conflux's high performance and low cost in order to reduce user costs, you can choose eSpace. The project can be deployed directly without any modification. If you are a skilled Ethereum engineer, you can also choose eSpace directly and use the tools and SDKs that you are familiar with to get started quickly.

## Reference

- [CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md).
- [Espace RPC Compatibility](../../espace/build/compatibility/rpc-compatibility.md).
- [Espace EVM Compatibility](../../espace/build/compatibility/evm-compatibility.md).
