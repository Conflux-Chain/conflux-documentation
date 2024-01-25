---
sidebar_position: 9
title: Gnosis Safe Wallet
displayed_sidebar: eSpaceSidebar
---

[Gnosis Safe Wallet](https://safe.global/) is a well-known multisignature wallet service in the industry, providing users with secure fund management services. It is widely used in the Ethereum and EVM-compatible chain ecosystems. Its core code, including smart contracts and frontend/backend code, is entirely open source. Additionally, they continue to innovate by introducing features such as account abstraction. Many DeFi projects use Gnosis Safe Wallet as their fund management tool, including Uniswap, Chainlink, MakerDAO, and more.

## Safe on eSpace

To facilitate eSpace developers and DeFi projects, eSpace has integrated Gnosis Safe Wallet. Safe contract [v1.3.0](https://github.com/safe-global/safe-smart-account/blob/main/CHANGELOG.md#version-130-libs0) and [v1.4.1](https://github.com/safe-global/safe-smart-account/blob/main/CHANGELOG.md#version-141) have been deployed on eSpace's mainnet and testnet. Additionally, a [Safe-Wallet-Web frontend](https://safe.conflux123.xyz/) is provided for the mainnet. Users can use this wallet to create multisignature accounts and manage CFX and ERC20 assets.

![](../img/gnosis-safe-web-wallet.png)

## FAQs

### 1. What is the URL for Safe-Wallet-Web?

https://safe.conflux123.xyz/

### 2. What is the default contract version currently in use?

The default contract version currently in use is Safe v1.3.0, and this version's contracts are deployed on eSpace's mainnet and testnet.

### 3. What is the URL for Safe-Wallet-Web on the testnet?

Safe-Wallet-Web frontend has not been deployed on the testnet yet, but interaction with the contracts is possible through [Safe-SDK](https://github.com/safe-global/safe-core-sdk) or [Cli](https://github.com/safe-global/safe-cli).

### 4. Can the official Safe Web Wallet or App be used on eSpace?

Not currently.

### 5. Does eSpace have a mobile version of the Safe App?

Not currently.