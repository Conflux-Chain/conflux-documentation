---
sidebar_position: 2
title: Node Types
description: Learn about the different types of nodes in the Conflux Network.
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - node types
  - full node
  - archive node
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

In the Conflux Network, there are different types of nodes that you can run, each serving different purposes and having different requirements. There are 3 types of nodes: **Archive Node, Full Node and Light Node**.

The difference between three types of nodes lies in **the amount of data reserved for storage**. The Archive Node takes the most and the Light Node takes the least. Of course, more data consumes more hardware resources. In general, **if you want to participate in mining, a fullnode will suffice** . you need to run an archive node if you want to use it as RPC service. The lightnode is mainly used as a wallet.

Here's a detail on the requirements for running all types of nodes in the Conflux Network, along with the differences between each one.

## Differences Between Node Types

* **Full Node**: Stores all block headers and blocks in the most recent **100,000 Epochs**. **Suitable for most users and developers**.
* **Archive Node**: Stores the entire blockchain and all historical data. Requires significant storage and is suitable for data analysis and applications that need access to the full historical data.
* **Light Node**: Stores only block headers and a small subset of data. Suitable for low-resource devices and provides a way to interact with the network without storing the entire blockchain.

## Full Node

A full node stores the entire block headers and blocks in the most recent **100,000 Epochs**.

### Requirements

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

### Requirements

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

### Requirements

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

## FAQs

### Why the cfx_getTransactionByHash API returns null?

If you want to get the transaction details, you need to run a `fullnode` or `archivenode`, and set the `persist_tx_index` config to `true`. The fullnode only store transactions in latest 100,000 Epoch.

### Is fullnode enough for Exchange?

Yes, fullnode only support querying transactions in latest 100,000 Epoch

### I want to participate in mining or staking, which node type should I run?

Fullnode will be enough.
