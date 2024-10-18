---
sidebar_position: 1
title: Node Setup
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
  - Docker
  - Ethereum
  - Ubuntu
  - Installation
  - Configuration
  - Database Setup
  - Source Build
  - Docker Compose
  - JSON-RPC API
  - EVM Compatibility
  - Subgraph Deployment
tags:
  - The Graph
  - Indexing
---

Graph Node is the component which indexes subgraphs, and makes the resulting data available to query via a GraphQL API. As such it is central to the indexer stack, and correct operation of Graph Node is crucial to running a successful indexer.

This provides a contextual overview of Graph Node, and some of the more advanced options available to indexers. Detailed documentation and instructions can be found in the [Graph Node repository](https://github.com/graphprotocol/graph-node).

## Graph Node

[Graph Node](https://github.com/graphprotocol/graph-node) is the reference implementation for indexing Subgraphs on The Graph Network, connecting to blockchain clients, indexing subgraphs and making indexed data available to query.

Graph Node (and the whole indexer stack) can be run on bare metal, or in a cloud environment. This flexibility of the central indexing component is crucial to the robustness of The Graph Protocol. Similarly, Graph Node can be [built from source](https://github.com/graphprotocol/graph-node), or indexers can use one of the [provided Docker Images](https://hub.docker.com/r/graphprotocol/graph-node).

### PostgreSQL database

The main store for the Graph Node, this is where subgraph data is stored, as well as metadata about subgraphs, and subgraph-agnostic network data such as the block cache, and eth_call cache.

### Network clients

In order to index a network, Graph Node needs access to a network client via an EVM-compatible JSON-RPC API. This RPC may connect to a single client or it could be a more complex setup that load balances across multiple.

While some subgraphs may just require a full node, some may have indexing features which require additional RPC functionality. Specifically subgraphs which make `eth_calls` as part of indexing will require an archive node which supports [EIP-1898](https://eips.ethereum.org/EIPS/eip-1898), and subgraphs with `callHandlers`, or `blockHandlers` with a `call` filter, require `trace_filter` support ([see trace module documentation here](https://openethereum.github.io/JSONRPC-trace-module)).

### IPFS Nodes

Subgraph deployment metadata is stored on the IPFS network. The Graph Node primarily accesses the IPFS node during subgraph deployment to fetch the subgraph manifest and all linked files. Network indexers do not need to host their own IPFS node. An IPFS node for the network is hosted at [https://ipfs.network.thegraph.com](https://ipfs.network.thegraph.com/).

### Getting started from source

### Install prerequisites

- **Rust**
- **PostgreSQL**
- **IPFS**
- **Additional Requirements for Ubuntu users** - To run a Graph Node on Ubuntu a few additional packages may be needed.

`sudo apt-get install -y clang libpg-dev libssl-dev pkg-config`

### Setup

1. Start a PostgreSQL database server

`initdb -D .postgres
pg_ctl -D .postgres -l logfile start
createdb graph-node`

1. Clone [Graph Node](https://github.com/graphprotocol/graph-node) repo and build the source by running `cargo build`
2. Now that all the dependencies are setup, start the Graph Node:

`cargo run -p graph-node --release -- \   --postgres-url postgresql://[USERNAME]:[PASSWORD]@localhost:5432/graph-node \   --ethereum-rpc [NETWORK_NAME]:[URL] \   --ipfs https://ipfs.network.thegraph.com`

### Getting started using Docker

### Prerequisites

- **Ethereum node** - By default, the docker compose setup will use mainnet: [http://host.docker.internal:8545](http://host.docker.internal:8545/) to connect to the Ethereum node on your host machine. You can replace this network name and url by updating `docker-compose.yml`.

### Setup

1. Clone Graph Node and navigate to the Docker directory:

`git clone http://github.com/graphprotocol/graph-node
cd graph-node/docker`

1. For linux users only - Use the host IP address instead of `host.docker.internal` in the `docker-compose.yml`using the included script:

`./setup.sh`

1. Start a local Graph Node that will connect to your Ethereum endpoint:

`docker-compose up`

_**References**_

[https://thegraph.com/docs/en/operating-graph-node/](https://thegraph.com/docs/en/operating-graph-node/)

[https://hub.docker.com/r/graphprotocol/graph-node/](https://hub.docker.com/r/graphprotocol/graph-node/)

[https://github.com/pranavdaa/Graph-Node-Local](https://github.com/pranavdaa/Graph-Node-Local)
