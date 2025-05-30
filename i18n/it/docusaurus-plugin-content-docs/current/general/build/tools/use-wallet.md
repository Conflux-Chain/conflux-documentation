---
sidebar_position: 1
title: use-wallet
displayed_sidebar: generalSidebar
keywords:
  - use-wallet
  - DApp-development
  - wallet-integration
  - React
  - Vue3
  - Conflux
  - Ethereum
  - Portal
  - Fluent
tags:
  - use-wallet
---

# use-wallet Library

## Introduction

use-wallet is a front-end-view wallet hooks library designed for lightweight decentralized application (DApp) development. It only encapsulates the wallet injection in the window provider. If you need more complete and powerful support, js-conflux-sdk or web3.js will be more suitable. It serves as a simpler way to 'use' wallet in web development.

## Benefits and Features

1. **Supports Multiple Chains, Wallets, and Frameworks:** The use-wallet library can support any chain, any wallet, and any framework. It currently supports the React and Vue3 frameworks, and the Conflux and Ethereum chains. For wallets, it supports Portal, Fluent, MetaMask, MetaX, and CoinBase.
2. **Easy to Use:** The library provides high-level encapsulation, meaning you don't need to pay attention to the provider and other specification-oriented concepts. As a front-end developer, you can focus on hooks and functions and simply use them.
3. **Fine-grained Hooks:** The use-wallet library provides fine-grained hooks to avoid duplicate render, which is a common problem with similar hooks wrappers in the community that often return a lot of data wrapped together, causing unnecessary render.
4. **Lightweight:** use-wallet communicates with the wallet through the wallet-injected provider and provides some lightweight tooling methods. This means you don't need to import a large and comprehensive library like js-conflux-sdk or web3.js for many DApp development cases. The source code of the library is only 3.7kb (gzip) and 20kb when it includes decimal.js.

## Installation

You can install the use-wallet library using yarn. For the React version, use:

```
yarn add @cfxjs/use-wallet-react
```

And for the Vue3 version, use:

```
yarn add @cfxjs/use-wallet-vue
```

## Basic Usage

Here's an example of how you can use the use-wallet library in a basic React application:

```
import React, { memo, useCallback } from 'react';
import { useStatus, useAccount, useChainId, useBalance, connect, Unit } from '@cfxjs/use-wallet-react/conflux';
```

And for Ethereum/MetaMask, you can use:

```
import { useStatus, ... } from '@cfxjs/use-wallet-react/ethereum/MetaMask
```

For more detailed usage and API information, please refer to the official documentation and demo site:

- [**Website**](https://use-wallet.fluentwallet.dev/#/)

- [**API Documentation**](https://use-wallet.fluentwallet.dev/#/api/react)

- [**Demo Page**](https://use-wallet.fluentwallet.dev/#/demo)

- [**Repository**](https://github.com/Conflux-Chain/use-wallet)

## Demo Projects

The [use-wallet Github repository](https://github.com/Conflux-Chain/use-wallet/tree/main/examples) provides several sample projects to demonstrate how to use `use-wallet` in a minimal manner.

- [React Demo](https://github.com/Conflux-Chain/use-wallet/tree/main/examples/ReactDemo)
- [Vue.js Demo](https://github.com/Conflux-Chain/use-wallet/tree/main/examples/Vue3Demo)
- [Pure Javascript Demo (no extra frontend framework)](https://github.com/Conflux-Chain/use-wallet/tree/main/examples/VanillaDemo)
