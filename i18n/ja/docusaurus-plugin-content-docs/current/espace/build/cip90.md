---
sidebar_position: 20
title: CIP-90
displayed_sidebar: eSpaceSidebar
tags:
  - CIP-90
  - Conflux eSpace
  - Conflux Core
  - EVM Compatibility
  - Transaction Format
  - Address Generation
  - dApp Portability
  - Ethereum Ecosystem
  - MetaMask
  - Remix
  - Hardhat
  - web3.js
  - ethers.js
  - CIP-37
  - EIP-155
  - EIP-55
  - Base32 Addresses
  - Hex Addresses
  - CrossSpaceCall
  - Internal Contract
  - Cross-Space Operations
  - Atomic Operations
  - Layer-1 Security
  - RPC Methods
  - eth_getBalance
---

Conflux has a virtual machine that is similar to the EVM. However, there are still some considerable differences between Conflux and Ethereum. Conflux uses a different transaction format and a different rule for generating addresses from public keys. These differences often make it hard to port EVM compatible dApps to Conflux. Replacing CIP-72 and CIP-80, [CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md) introduces a transaction execution environment called the **Conflux eSpace**. eSpace achieves full EVM compatibility without changing the existing accounts and transactions.

[CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md) introduces a new fully EVM-compatible space. The new space is called **Conflux eSpace**, while the current space is called **Conflux Core** space. Conflux eSpace follows the same rule as Ethereum's EVM and supports RPCs like `eth_getBalance`. As a result, existing tooling from the Ethereum ecosystem (MetaMask, Remix, Hardhat, web3.js, ethers.js) can be used on Conflux eSpace directly.

Accounts in Conflux Core and Conflux eSpace are **separated**. This means that Conflux transactions can only be sent between core space accounts (using their [CIP-37](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-37.md) base32 addresses), while Ethereum-compatible EIP-155 transactions can only be sent between eSpace accounts (using their [EIP-55](https://eips.ethereum.org/EIPS/eip-55) hex addresses). Assets and data can be transferred across the two spaces using the new `CrossSpaceCall` internal contract. Unlike cross-chain operations, **cross-space** operations are **atomic** and they have **layer-1 security**.

:::tip

Refer to [Transferring Funds](../../general/tutorials/transferring-funds/transferring-funds.mdx) and [Wallets](../../general/tutorials/wallets/wallets.mdx) for cross chain and wallet usage tutorials.

:::
