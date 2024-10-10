---
sidebar_position: 20
title: CIP-90
displayed_sidebar: eSpaceSidebar
tags:
  - CIP-90
  - Conflux eSpace
  - Conflux Core
  - EVM兼容性
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
  - Base32 地址
  - Hex Addresses
  - CrossSpaceCall
  - Internal Contract
  - Cross-Space Operations
  - Atomic Operations
  - Layer-1 Security
  - RPC Methods
  - eth_getBalance
---

Conflux 有一个类似于 EVM 的虚拟机。 然而，Conflux 和以太坊之间仍然有一些相当大的区别。 Conflux 使用不同的交易格式，其从公钥生成地址的规则也与以太坊不同。 这些差异通常使得将 EVM 兼容的 dApps 移植到 Conflux 变得困难。 [CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md) 用 Conflux eSpace 替换了 CIP-72 和 CIP-80，引入了一个称为 **Conflux eSpace** 的交易执行环境。 eSpace 实现了完全的 EVM 兼容性，而不改变现有的账户和交易。

[CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md) 引入了一个新的完全 EVM 兼容的空间。 新空间称为 **Conflux eSpace**，而当前空间称为 **Conflux Core Space**。 Conflux eSpace 遵循与以太坊的 EVM 相同的规则，并支持像 `eth_getBalance` 这样的 RPC。 GPT 因此，以太坊生态系统中现有的工具（如 MetaMask、Remix、Hardhat、web3.js、ethers.js）可以直接在 Conflux eSpace 上使用。

Conflux Core 和 Conflux eSpace 中的账户是**独立的**。 这意味着 Conflux 交易只能在Core Space账户之间发送（使用它们的 [CIP-37](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-37.md) base32 地址），而以太坊兼容的 EIP-155 交易只能在 eSpace 账户之间发送（使用它们的 [EIP-55](https://eips.ethereum.org/EIPS/eip-55) 十六进制地址）。 资产和数据可以通过新的 `CrossSpaceCall` 内置合约在两个空间之间转移。 与跨链操作不同，**跨空间**操作是**原子性的**，它们具有**Layer 1 安全性**。

:::tip

Refer to [Transferring Funds](../../general/tutorials/transferring-funds/transferring-funds.mdx) and [Wallets](../../general/tutorials/wallets/wallets.mdx) for cross chain and wallet usage tutorials.

:::
