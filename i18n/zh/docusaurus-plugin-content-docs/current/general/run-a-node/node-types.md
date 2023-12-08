---
sidebar_position: 2
title: 节点类型
displayed_sidebar: generalSidebar
---

# Node Types Overview

In the Conflux Network, there are different types of nodes that you can run, each serving different purposes and having different requirements. There are 3 types of nodes: Archive Node, Full Node and Light Node. 三种类型的Conflux节点之间的差异在于其储存的数据量不同。 The Archive Node takes the most and the Light Node takes the least. Of course, more data consumes more hardware resources. In general, if you want to participate in mining, a fullnode will suffice . you need to run an archivenode if you want to use it as RPC service. The lightnode is mainly used as a wallet.

Here's a detail on the requirements for running all types of nodes in the Conflux Network, along with the differences between each one.



## Differences Between Node Types

* Full Node: Stores the entire blockchain but not all historical states. Suitable for most users and developers.

* Archive Node: Stores the entire blockchain and all historical states. Requires significant storage and is suitable for data analysis and applications that need access to the full historical state.

* Light Node: Stores only block headers and a small subset of data. Suitable for low-resource devices and provides a way to interact with the network without storing the entire blockchain.



## Full Node

A full node stores the entire state of the blockchain, including all blocks and transactions, but not all historical states.

### Requirements

* At least 8GB of RAM.

* A minimum of 1TB free disk space (SSD is recommended).

* A stable internet connection.

### How to Run

Follow the steps in the previous tutorial to install and configure the Conflux node, then set the mode parameter in the configuration file to "full":

```
mode = "full" 
```

Start the node with the custom configuration file, using the following command:

```
./target/release/conflux --config ./run/hydra.toml 
```


## Archive Node

An archive node stores the entire state of the blockchain, including all blocks, transactions, and every historical state. It requires more storage than a full node.

### Requirements

* At least 16GB of RAM.

* A minimum of 2TB free disk space (SSD is recommended).

* A stable internet connection.

### How to Run

Set the mode parameter in the configuration file to "archive":

```
mode = "archive" 
```

Start the node with the custom configuration file, using the following command:

```
./target/release/conflux --config ./run/hydra.toml 
```


## Light Node

A light node only stores the block headers and a small subset of other data, allowing it to verify the authenticity of the data without storing the entire blockchain.

### Requirements

* At least 4GB of RAM.
* A minimum of 200GB free disk space (SSD is recommended).
* A stable internet connection.

### How to Run

Set the mode parameter in the configuration file to "light":

```
mode = "light" 
```

Start the node with the custom configuration file, using the following command:

```
./target/release/conflux --config ./run/hydra.toml 
```
