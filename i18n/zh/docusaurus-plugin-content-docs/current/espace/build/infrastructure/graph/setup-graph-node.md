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

此文提供了Graph Node的概述，以及一些索引器可用的更高级选项。 详细文档和说明可以在 [Graph Node仓库](https://github.com/graphprotocol/graph-node)中找到。

## Graph Node

[Graph Node](https://github.com/graphprotocol/graph-node) 是The Graph Network上索引子图的参考实现，连接区块链客户端，索引子图并使索引数据可供查询。

Graph Node（以及整个索引器堆栈）可以在裸机或云环境中运行。 该中心化索引组件的灵活性对于The Graph Protocol的鲁棒性至关重要。 类似地，Graph Node可以从 [源代码构建](https://github.com/graphprotocol/graph-node)，或者索引器可以使用 [提供的Docker镜像](https://hub.docker.com/r/graphprotocol/graph-node)。

### PostgreSQL 数据库

Graph Node 的主要存储库，其中存储了 Subgraph 数据，以及关于 Subgraph 的元数据和与 Subgraph 无关的网络数据，例如块缓存和 eth_call 缓存。

### 网络客户端

为了对一个网络进行索引，Graph Node需要通过EVM兼容的JSON-RPC API访问网络客户端。 该 RPC 可能连接到单个客户端，也可能是更复杂的设置，跨多个客户端进行负载均衡。

一些子图只需要一个全节点就能支持索引特性，而部分子图可能需要支持额外RPC功能的节点。 具体来说，作为索引一部分的 `eth_calls` 的子图将需要一个支持 [EIP-1898](https://eips.ethereum.org/EIPS/eip-1898)的归档节点，而包含 `callHandlers`或带有 `call` 过滤器的 `blockHandlers` 的子图则需要 `trace_filter` 支持 ([请查看此处的trace模块文档](https://openethereum.github.io/JSONRPC-trace-module))。

### IPFS 节点

Subgraph 部署元数据存储在 IPFS 网络中。 Graph Node主要在子图部署期间访问IPFS节点，以获取子图清单和所有链接文件。 网络索引程序不需要托管自己的IPFS节点。 网络的IPFS节点托管在 [https://ipfs.network.thegraph.com](https://ipfs.network.thegraph.com/)。

### 从源代码开始

### 安装前置

- **Rust**
- **PostgreSQL**
- **IPFS**
- **Ubuntu用户的额外要求** - 在Ubuntu 上运行一个Graph Node，可能需要一些额外的软件包。

`sudo apt-get install -y clang libpg-dev libssl-dev pkg-config`

### 设置

1. 启动 PostgreSQL 数据库服务器。

`initdb -D .postgres
pg_ctl -D .postgres -l logfile start
createdb graph-node`

1. 克隆 [Graph Node](https://github.com/graphprotocol/graph-node) repo并通过运行 `cargo build`来构建源代码。
2. 现在所有依赖项都设置好了，可以启动Graph Node了：

`cargo run -p graph-node --release -- \   --postgres-url postgresql://[USERNAME]:[PASSWORD]@localhost:5432/graph-node \   --ethereum-rpc [NETWORK_NAME]:[URL] \   --ipfs https://ipfs.network.thegraph.com`

### 从使用 Docker开始

### 前提条件

- **以太坊节点** - 默认情况下，docker compose设置将使用主网: [http://host.docker.internal:8545](http://host.docker.internal:8545/) 来连接你主机上的以太坊节点。 您可以通过更新 `docker-compose.yml` 来替换此网络名称和网址。

### 设置

1. 克隆Graph Node并切换到Docker目录：

`git clone http://github.com/graphprotocol/graph-node
cd graph-node/docker`

1. For linux users only - Use the host IP address instead of `host.docker.internal` in the `docker-compose.yml`using the included script:

`./setup.sh`

1. 启动一个本地的Graph Node，使其连接到你的Ethereum节点：

`docker-compose up`

_**参考资料**_

[https://thegraph.com/docs/en/operating-graph-node/](https://thegraph.com/docs/en/operating-graph-node/)

[https://hub.docker.com/r/graphprotocol/graph-node/](https://hub.docker.com/r/graphprotocol/graph-node/)

[https://github.com/pranavdaa/Graph-Node-Local](https://github.com/pranavdaa/Graph-Node-Local)
