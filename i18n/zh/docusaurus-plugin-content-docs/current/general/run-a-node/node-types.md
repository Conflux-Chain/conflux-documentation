---
sidebar_position: 2
title: 节点类型
description: 了解Conflux 网络中不同类型的节点。
displayed_sidebar: generalSidebar
---

在 Conflux 网络中，你可以运行三种不同类型的节点，每种类型都有不同的目的和不同的硬件要求。 这三类分别是：**归档节点，全节点和轻节点**。

三种类型的节点之间的区别在于**存储的数据量**。 归档节点需要的存储最多，而轻节点需要的最少。 当然，更多的数据会消耗更多的硬件资源。 一般而言，**如果您想参与挖矿，运行一个全节点即可**。 如果您想提供 RPC 服务，则需要运行归档节点。 轻节点主要用作钱包。

在Conflux网络中运行所有类型节点的要求和它们之间的区别，具体描述如下：

## 节点类型差异

* **全节点（Full Node）**：存储所有区块头和最近的**10万个纪元（Epoch）**区块。 **适用于大多数用户和开发者**。
* **归档节点（Archive Node）**：存储整个区块链和所有历史数据。 需要大量存储空间，适用于进行数据分析和需要访问完整历史数据的应用。
* **轻节点（Light Node）**：仅存储区块头和一小部分区块链和历史数据。 适用于资源有限的设备，可以在不存储整个区块链的情况下与区块链网络交互。

## 全节点

A full node stores the entire block headers and most **recent 10w Epoch blocks** of the blockchain.

### 硬件要求

* At least 16GB of RAM.

* A minimum of 1.5TB free disk space (SSD is recommended).

* A stable internet connection.

### How to Run

Follow the steps in the previous tutorial to install and configure the Conflux node, then set the mode parameter in the configuration file to "full":

```toml
mode = "full" 
```

Start the node with the custom configuration file, using the following command:

```shell
conflux --config ./run/hydra.toml 
```

## Archive Node

An archive node stores the entire data of the blockchain, including all blocks, transactions. It requires more storage than a full node.

### 硬件要求

* At least 32GB of RAM.

* A minimum of 2TB free disk space (SSD is recommended).

* A stable internet connection.

### How to Run

Set the mode parameter in the configuration file to "archive":

```toml
mode = "archive" 
```

Start the node with the custom configuration file, using the following command:

```shell
conflux --config ./run/hydra.toml 
```

## Light Node

A light node only stores the block headers and a small subset of other data, allowing it to verify the authenticity of the data without storing the entire blockchain.

### 硬件要求

* At least 4GB of RAM.
* A minimum of 300GB free disk space (SSD is recommended).
* A stable internet connection.

### How to Run

Set the mode parameter in the configuration file to "light":

```toml
mode = "light" 
```

Start the node with the custom configuration file, using the following command:

```shell
conflux --config ./run/hydra.toml 
```

## 常见问题解答

### Why the cfx_getTransactionByHash API returns null?

If you want to get the transaction details, you need to run a `fullnode` or `archivenode`, and set the `persist_tx_index` config to `true`. The fullnode only store transactions in latest 10w Epoch.

### Is fullnode enough for Exchange?

Yes, fullnode only support querying transactions in latest 10w Epoch

### I want to participate in mining or staking, which node type should I run?

Fullnode will be enough.
