---
sidebar_position: 2
title: 用户指南
description: 如何将 MetaMask 连接到 eSpace
keywords:
  - MetaMask
  - EVMSpace
displayed_sidebar: eSpaceSidebar
---


:::tip

本指南将帮助用户将他们的 MetaMask 钱包连接到 Conflux eSpace。

:::

## 简介

[MetaMask](https://metamask.io/) 是一个具有用户界面的浏览器扩展，用于与兼容以太坊的区块链(例如 Conflux eSpace)进行交互。 基于本指南的目的，我们将假定您已熟悉 MetaMask 并已安装它。 如果您需要关于如何开始使用 MetaMask 的帮助，请[查看 MetaMask 文档](https://metamask.io/faqs.html)和[以太坊文档](https://ethereum.org/en/)。

在本教程中，我们将介绍如何将 MetaMask 连接到 Conflux eSpace Testnet。

:::note
本教程中的屏幕截图来自MetaMask 浏览器扩展版本 10.8.1。
:::

## 连接 MetaMask 到 Conflux eSpace。

### 通过 Chainlist 添加 eSpace

您可以通过以下步骤添加 Conflux eSpace 网络到您的 MetaMask 钱包：

1. 打开您的浏览器，访问 https://chainlist.org。
2. 搜索“Conflux eSpace”。
3. 在“Conflux eSpace”下点击“连接钱包”，以允许此站点向 MetaMask 发送请求。
4. 在“Conflux eSpace”下点击“添加到 MetaMask”。
5. 当 MetaMask 提示“允许此站点添加网络？”时，点击“批准”。
6. 当 MetaMask 提示“允许此站点切换网络？”时，点击“批准”。

您的 MetaMask 钱包现在已连接到 Conflux eSpace。 您可以随时通过Metamask中的网络选择菜单切换到其他网络。

### 手动添加 eSpace

或者，您可以通过在网络选择下拉菜单中选择“添加网络”(或“自定义 RPC”)手动将 Conflux eSpace 添加到 MetaMask：

 ![Metamask 的网络选择](./img/metamask_choose_network-0.png)

对于eSpace **mainnet**, 请使用以下配置值：

- **网络名称**：Conflux eSpace
- **新的 RPC URL**：https://evm.confluxrpc.com
- **链 ID**：1030
- **货币符号**：CFX
- **区块浏览器 URL**：https://evm.confluxscan.io

对于 eSpace **testnet**，请使用以下配置值：

- **网络名称**: Conflux eSpace (Testnet)
- **新的 RPC URL**：https://evmtestnet.confluxrpc.com
- **链 ID**：71
- **货币符号**：CFX
- **区块浏览器 URL**：https://evmtestnet.confluxscan.io

![MetaMask-create-EVM-Space-rpc](./img/metamask_add_network-ce.png)

:::note
所有Conflux eSpace RPC 端点URL 和 chain ID都可以在我们的网络页面上找到。
:::

点击 `保存`，然后您应该在 MetaMask 中看到 `Conflux eSpace` 是当前选择的网络。 为了让您体验 MetaMask操作情况，我们将把它连接到 Remix 并执行一些交易。 本指南的其余部分将假设您的 MetaMask 已连接到 `Conflux eSpace(Testnet)`。

## 水龙头

要与我们的测试网交互，首先您需要在 eSpace Testnet 上获取测试网 CFX。 您可以从我们的[水龙头](https://efaucet.confluxnetwork.org/)获取测试网 CFX。 Paste your wallet address in the address input box, input the captcha and click `Claim` to receive testnet CFX.
