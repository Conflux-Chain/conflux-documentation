---
sidebar_position: 3
title: MetaMask
keywords:
  - MetaMask
  - EVMSpace
---


:::tip

This wallet supports eSpace ONLY.

:::

## Introduction

[MetaMask](https://metamask.io/) 是一个具有用户界面的浏览器扩展，用于与兼容以太坊的区块链(例如 Conflux eSpace)进行交互。 For the purpose of this guide, we will assume you are already familiar with MetaMask and have it installed. 如果您需要了解如何使用 MetaMask 本身，请[查看Metamask的文档](https://metamask.io/faqs.html)。

在本教程中，我们将演示如何连接 MetaMask 到 Conflux eSpace Testnet，使用 [Remix](https://remix.ethereum.org) 部署一个简单的 ERC-20 合约，并使用 MetaMask 转移新代币。

:::note
本教程中的屏幕截图来自MetaMask 浏览器扩展版本 10.8.1。
:::

## 连接 MetaMask 到 Conflux eSpace。

您可以通过以下步骤添加 Conflux eSpace 网络到您的 MetaMask 钱包：

1. 打开您的浏览器，访问 https://chainlist.org。
2. 搜索“Conflux eSpace”
1. 在“Conflux eSpace”下点击“连接钱包”，以允许此站点向 MetaMask 发送请求。
1. 在“Conflux eSpace”下点击“添加到 MetaMask”。
1. 当 MetaMask 提示“允许此站点添加网络？”时，点击“批准”。
1. 当 MetaMask 提示“允许此站点切换网络？”时，点击“批准”。

您的 MetaMask 钱包现在已连接到 Conflux eSpace。 您可以随时通过Metamask中的网络选择菜单切换到其他网络。

或者，您可以通过在网络选择下拉菜单中选择“添加网络”(或“自定义 RPC”)手动将 Conflux eSpace 添加到 MetaMask：

 ![MetaMask-network-select](./img/metamask_choose_network-0.png)

对于eSpace **mainnet**, 请使用以下配置值：

- **Network Name**: Conflux eSpace
- **New RPC URL**: https://evm.confluxrpc.com
- **Chain ID**: 1030
- **Currency Symbol**: CFX
- **Block Explorer URL**: https://evm.confluxscan.net

对于 eSpace **testnet**，请使用以下配置值：

- **Network Name**: Conflux eSpace (Testnet)
- **New RPC URL**: https://evmtestnet.confluxrpc.com
- **Chain ID**: 71
- **Currency Symbol**: CFX
- **Block Explorer URL**: https://evmtestnet.confluxscan.net

![MetaMask-create-EVM-Space-rpc](./img/metamask_add_network-ce.png)

:::note
所有Conflux eSpace RPC 端点URL 和 chain ID都可以在我们的网络页面上找到。
:::

点击 `保存`，然后您应该在 MetaMask 中看到 `Conflux eSpace` 是当前选择的网络。 为了让您体验 MetaMask操作情况，我们将把它连接到 Remix 并执行一些交易。 本指南的其余部分将假设您的 MetaMask 已连接到 `Conflux eSpace(Testnet)`。


