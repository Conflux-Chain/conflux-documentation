---
sidebar_position: 1
title: 节点配置
displayed_sidebar: eSpaceSidebar
keywords:
  - The Graph
  - Graph Node
  - Indexing
  - GraphQL API
  - PostgreSQL
  - Network Clients
  - IPFS
  - Rust
  - 容器(Docker)
  - 以太坊
  - Ubuntu
  - 安装
  - 配置
  - Database Setup
  - Source Build
  - Docker Compose
  - JSON-RPC API
  - EVM兼容性
  - Subgraph Deployment
tags:
  - The Graph
  - Indexing
---

Graph Node是索引子图并通过 GraphQL API 提供查询结果数据的组件。 因此，它是索引器堆栈的核心，Graph Node的正确操作对于运行成功的索引器至关重要。

此文提供了Graph Node的概述，以及一些索引器可用的更高级选项。 Detailed documentation and instructions can be found in the [Graph Node repository](https://github.com/graphprotocol/graph-node).

## Graph Node

[Graph Node](https://github.com/graphprotocol/graph-node) is the reference implementation for indexing Subgraphs on The Graph Network, connecting to blockchain clients, indexing subgraphs and making indexed data available to query.

Graph Node（以及整个索引器堆栈）可以在裸机或云环境中运行。 该中心化索引组件的灵活性对于The Graph Protocol的鲁棒性至关重要。 Similarly, Graph Node can be [built from source](https://github.com/graphprotocol/graph-node), or indexers can use one of the [provided Docker Images](https://hub.docker.com/r/graphprotocol/graph-node).

### PostgreSQL 数据库

Graph Node 的主要存储库，其中存储了 Subgraph 数据，以及关于 Subgraph 的元数据和与 Subgraph 无关的网络数据，例如块缓存和 eth_call 缓存。

### 网络客户端

为了对一个网络进行索引，Graph Node需要通过EVM兼容的JSON-RPC API访问网络客户端。 该 RPC 可能连接到单个客户端，也可能是更复杂的设置，跨多个客户端进行负载均衡。

一些子图只需要一个全节点就能支持索引特性，而部分子图可能需要支持额外RPC功能的节点。 Specifically subgraphs which make `eth_calls` as part of indexing will require an archive node which supports [EIP-1898](https://eips.ethereum.org/EIPS/eip-1898), and subgraphs with `callHandlers`, or `blockHandlers` with a `call` filter, require `trace_filter` support ([see trace module documentation here](https://openethereum.github.io/JSONRPC-trace-module)).

### IPFS 节点

Subgraph 部署元数据存储在 IPFS 网络中。 Graph Node主要在子图部署期间访问IPFS节点，以获取子图清单和所有链接文件。 网络索引程序不需要托管自己的IPFS节点。 An IPFS node for the network is hosted at [https://ipfs.network.thegraph.com](https://ipfs.network.thegraph.com/).

### 从源代码开始

### 安装前置

- **Rust**
- **PostgreSQL**
- **IPFS**
- **Additional Requirements for Ubuntu users** - To run a Graph Node on Ubuntu a few additional packages may be needed.

`sudo apt-get install -y clang libpg-dev libssl-dev pkg-config`

### 设置

1. 启动 PostgreSQL 数据库服务器。

`initdb -D .postgres
pg_ctl -D .postgres -l logfile start
createdb graph-node`

1. Clone [Graph Node](https://github.com/graphprotocol/graph-node) repo and build the source by running `cargo build`
2. 现在所有依赖项都设置好了，可以启动Graph Node了：

`cargo run -p graph-node --release -- \   --postgres-url postgresql://[USERNAME]:[PASSWORD]@localhost:5432/graph-node \   --ethereum-rpc [NETWORK_NAME]:[URL] \   --ipfs https://ipfs.network.thegraph.com`

### 从使用 Docker开始

### 前提条件

- **Ethereum node** - By default, the docker compose setup will use mainnet: [http://host.docker.internal:8545](http://host.docker.internal:8545/) to connect to the Ethereum node on your host machine. You can replace this network name and url by updating `docker-compose.yml`.

### 设置

1. 克隆Graph Node并切换到Docker目录：

`git clone http://github.com/graphprotocol/graph-node
cd graph-node/docker`

1. For linux users only - Use the host IP address instead of `host.docker.internal` in the `docker-compose.yml`using the included script:

`./setup.sh`

1. 启动一个本地的Graph Node，使其连接到你的Ethereum节点：

`docker-compose up`

_**References**_

[https://thegraph.com/docs/en/operating-graph-node/](https://thegraph.com/docs/en/operating-graph-node/)

[https://hub.docker.com/r/graphprotocol/graph-node/](https://hub.docker.com/r/graphprotocol/graph-node/)

[https://github.com/pranavdaa/Graph-Node-Local](https://github.com/pranavdaa/Graph-Node-Local)
