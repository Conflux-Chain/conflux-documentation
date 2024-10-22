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
  - Configuration
  - Database Setup
  - Source Build
  - Docker Compose
  - JSON-RPC API
  - EVM兼容性
  - Subgraph Deployment
tags:
  - The Graph
  - 教程
---

Graph Node是索引子图并通过 GraphQL API 提供查询结果数据的组件。 因此，它是索引器堆栈的核心，Graph Node的正确操作对于运行成功的索引器至关重要。

此文提供了Graph Node的概述，以及一些索引器可用的更高级选项。 详细的文档和说明可以在[Graph Node repository](https://github.com/graphprotocol/graph-node)中找到。

## Graph Node

[Graph Node](https://github.com/graphprotocol/graph-node) 是在 The Graph Network 上为 Subgraphs 进行索引的参考实现，它连接区块链客户端，索引 subgraphs 并使索引的数据可供查询。

Graph Node（以及整个索引器堆栈）可以在裸机或云环境中运行。 该中心化索引组件的灵活性对于The Graph Protocol的鲁棒性至关重要。 Graph Node可以通过[源代码编译构建](https://github.com/graphprotocol/graph-node)，索引器可以使用提供的[Docker镜像](https://hub.docker.com/r/graphprotocol/graph-node)之一。

### PostgreSQL 数据库

Graph Node 的主要存储库，其中存储了 Subgraph 数据，以及关于 Subgraph 的元数据和与 Subgraph 无关的网络数据，例如块缓存和 eth_call 缓存。

### 网络客户端

为了对一个网络进行索引，Graph Node需要通过EVM兼容的JSON-RPC API访问网络客户端。 该 RPC 可能连接到单个客户端，也可能是更复杂的设置，跨多个客户端进行负载均衡。

一些子图只需要一个全节点就能支持索引特性，而部分子图可能需要支持额外RPC功能的节点。 具体而言，作为索引的一部分进行`eth_calls`的子图将需要支持[EIP-1898](https://eips.ethereum.org/EIPS/eip-1898)的存档节点，而具有`callHandlers`、`blockHandlers`和`call`过滤器的子图则需要支持`trace_filter`（[请参见此处的跟踪模块文档](https://openethereum.github.io/JSONRPC-trace-module)）。

### IPFS 节点

Subgraph 部署元数据存储在 IPFS 网络中。 Graph Node主要在子图部署期间访问IPFS节点，以获取子图清单和所有链接文件。 网络索引程序不需要托管自己的IPFS节点。 网络的IPFS节点托管在[https://ipfs.network.thegraph.com](https://ipfs.network.thegraph.com/)。

### 从源代码开始

### 安装前置

- **Rust**
- **PostgreSQL**
- **IPFS**
- **Ubuntu 用户的额外要求** - 在 Ubuntu 上运行 Graph Node 需要安装一些额外的软件包。

`sudo apt-get install -y clang libpg-dev libssl-dev pkg-config`

### 设置

1. 启动 PostgreSQL 数据库服务器。

`initdb -D .postgres
pg_ctl -D .postgres -l logfile start
createdb graph-node`

1. 克隆[Graph Node](https://github.com/graphprotocol/graph-node)仓库并通过运行`cargo build`构建源代码。
2. 现在所有依赖项都设置好了，可以启动Graph Node了：

`cargo run -p graph-node --release -- \
  --postgres-url postgresql://[USERNAME]:[PASSWORD]@localhost:5432/graph-node \
  --ethereum-rpc [NETWORK_NAME]:[URL] \
  --ipfs https://ipfs.network.thegraph.com`

### 从使用 Docker开始

### 前提条件

- **Ethereum node** - 默认情况下，docker compose设置将使用 mainnet: [http://host.docker.internal:8545](http://host.docker.internal:8545/) 连接到您主机上的以太坊节点。 你可以通过更新`docker-compose.yml`文件中的网络名称和URL来替换此设置。

### 设置

1. 克隆Graph Node并切换到Docker目录：

`git clone http://github.com/graphprotocol/graph-node
cd graph-node/docker`

1. 对于 Linux 用户 - 使用包含在脚本中的以下命令，将 docker-compose.yml 文件中的 host.docker.internal 替换为主机的 IP 地址：

`./setup.sh`

1. 启动一个本地的Graph Node，使其连接到你的Ethereum节点：

`docker-compose up`

***参考资料***

[https://thegraph.com/docs/en/operating-graph-node/](https://thegraph.com/docs/en/operating-graph-node/)

[https://hub.docker.com/r/graphprotocol/graph-node/](https://hub.docker.com/r/graphprotocol/graph-node/)

[https://github.com/pranavdaa/Graph-Node-Local](https://github.com/pranavdaa/Graph-Node-Local)
