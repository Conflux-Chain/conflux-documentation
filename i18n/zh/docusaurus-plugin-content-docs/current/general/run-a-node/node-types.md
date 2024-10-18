---
sidebar_position: 2
title: 节点类型
description: 了解Conflux 网络中不同类型的节点。
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - node types
  - 全节点
  - 归档节点
  - light node
  - storage requirements
  - hardware requirements
  - RPC service
  - mining
  - staking
  - transaction index
  - persist_tx_index
  - Exchange requirements
  - node configuration
  - hydra.toml
tags:
  - node
---

在 Conflux 网络中，你可以运行三种不同类型的节点，每种类型都有不同的目的和不同的硬件要求。 这三类分别是：**归档节点，全节点和轻节点**。

三种类型的节点之间的区别在于**存储的数据量**。 归档节点需要的存储最多，而轻节点需要的最少。 当然，更多的数据会消耗更多的硬件资源。 一般而言，**如果您想参与挖矿，运行一个全节点即可**。 如果您想提供 RPC 服务，则需要运行归档节点。 轻节点主要用作钱包。

在Conflux网络中运行所有类型节点的要求和它们之间的区别，具体描述如下：

## 节点类型差异

* **全节点**：存储最近**100,000个纪元** 的所有区块头和区块。 **适用于大多数用户和开发者**。
* **归档节点（Archive Node）**：存储整个区块链和所有历史数据。 需要大量存储空间，适用于进行数据分析和需要访问完整历史数据的应用。
* **轻节点（Light Node）**：仅存储区块头和一小部分区块链和历史数据。 适用于资源有限的设备，可以在不存储整个区块链的情况下与区块链网络交互。

## 全节点

一个全节点存储了最近100,000个纪元内的所有区块头和区块。

### 硬件要求

* 至少16GB 内存。

* 至少1.5TB的可用磁盘空间（推荐使用SSD）。

* 稳定的互联网网络连接。

### 如何运行全节点

按照先前教程中的步骤安装和配置Conflux节点，然后在配置文件中将mode参数设置为"full"：

```toml
mode = "full" 
```

使用以下命令启动具有自定义配置文件的节点：

```shell
conflux --config ./run/hydra.toml 
```

## 归档节点

归档节点存储区块链的全部数据，包括所有区块和交易。 它需要比全节点更多的存储空间。

### 归档节点安装要求

* 至少32GB 内存。

* 至少2TB的可用磁盘空间（推荐使用SSD）。

* 稳定的互联网网络连接。

### 如何运行归档节点

在配置文件中将mode参数设置为“archive"：

```toml
mode = "archive" 
```

使用以下命令启动具有自定义配置文件的节点：

```shell
conflux --config ./run/hydra.toml 
```

## 轻节点

轻节点仅存储区块头和一小部分其他数据，使其能够验证数据的真实性，而无需存储整个区块链。

### 轻节点安装要求

* 至少4GB 内存。
* 至少300GB的可用磁盘空间（推荐使用SSD）。
* 稳定的互联网网络连接。

### 如何运行轻节点

在配置文件中将mode参数设置为“light"：

```toml
mode = "light" 
```

使用以下命令启动具有自定义配置文件的节点：

```shell
conflux --config ./run/hydra.toml 
```

## 常见问题解答

### 为什么cfx_getTransactionByhash API返回null？

如果您想获取交易详情，您需要运行一个 `全节点` 或 `归档节点`，并将 `persist_tx_index` 配置设置为 `true`。 The fullnode only store transactions in latest 100,000 Epoch.

### 全节点对交易所是否足够？

Yes, fullnode only support querying transactions in latest 100,000 Epoch

### 我想参与挖矿或质押，应该运行哪种节点类型？

全节点就足够了。
