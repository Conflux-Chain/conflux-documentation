---
sidebar_position: 2
title: Creating Subgraphs
displayed_sidebar: eSpaceSidebar
keywords:
  - The Graph
  - Subgraphs
  - GraphQL
  - Graph CLI
  - Subgraph Manifest
  - Schema Definition
  - AssemblyScript
  - Contratos Inteligentes
  - Data Indexing
  - Blockchain Data
  - Subgraph Studio
  - Ethereum
  - ABI
  - Event Handling
  - Entity Creation
  - Data Sources
  - Subgraph Deployment
tags:
  - The Graph
  - Subgraphs
---


A subgraph extracts data from a blockchain, processing it and storing it so that it can be easily queried via GraphQL.

The subgraph definition consists of a few files:

- `subgraph.yaml`: a YAML file containing the subgraph manifest
- `schema.graphql`: a GraphQL schema that defines what data is stored for your subgraph, and how to query it via GraphQL
- `AssemblyScript Mappings`: [AssemblyScript](https://github.com/AssemblyScript/assemblyscript) code that translates from the event data to the entities defined in your schema (e.g. `mapping.ts` in this tutorial)

> In order to use your subgraph on The Graph's decentralized network, you will need to create an API key. It is recommended that you add signal to your subgraph with at least 10,000 GRT.

Before you go into detail about the contents of the manifest file, you need to install the [Graph CLI](https://github.com/graphprotocol/graph-cli) which you will need to build and deploy a subgraph.

## Install the Graph CLI

The Graph CLI is written in JavaScript, and you will need to install either `yarn` or `npm` to use it; it is assumed that you have yarn in what follows.

Once you have `yarn`, install the Graph CLI by running

**Install with yarn:**

`yarn global add @graphprotocol/graph-cli`

**Install with npm:**

`npm install -g @graphprotocol/graph-cli`

Once installed, the `graph init` command can be used to set up a new subgraph project, either from an existing contract or from an example subgraph. This command can be used to create a subgraph on the Subgraph Studio by passing in `graph init --product subgraph-studio`. If you already have a smart contract deployed to your preferred network, bootstrapping a new subgraph from that contract can be a good way to get started.

## From An Existing Contract

The following command creates a subgraph that indexes all events of an existing contract. It attempts to fetch the contract ABI from Etherscan and falls back to requesting a local file path. If any of the optional arguments are missing, it takes you through an interactive form.

```
graph init \
  --product subgraph-studio
  --from-contract <CONTRACT_ADDRESS> \
  [--network <ETHEREUM_NETWORK>] \
  [--abi <FILE>] \
  <SUBGRAPH_SLUG> [<DIRECTORY>]
```

The `<SUBGRAPH_SLUG>` is the ID of your subgraph in Subgraph Studio, it can be found on your subgraph details page.

## From An Example Subgraph

The second mode `graph init` supports is creating a new project from an example subgraph. The following command does this:

```
graph init --studio <SUBGRAPH_SLUG>
```

The example subgraph is based on the Gravity contract by Dani Grant that manages user avatars and emits `NewGravatar` or `UpdateGravatar` events whenever avatars are created or updated. The subgraph handles these events by writing `Gravatar` entities to the Graph Node store and ensuring these are updated according to the events. The following sections will go over the files that make up the subgraph manifest for this example.

## Add New dataSources To An Existing Subgraph

Since `v0.31.0` the `graph-cli` supports adding new dataSources to an existing subgraph through the `graph add` command.

```
graph add <address> [<subgraph-manifest default: "./subgraph.yaml">]

Options:

      --abi <path>              Path to the contract ABI (default: download from Etherscan)
      --contract-name           Name of the contract (default: Contract)
      --merge-entities          Whether to merge entities with the same name (default: false)
      --network-file <path>     Networks config file path (default: "./networks.json")
```

The `add` command will fetch the ABI from Etherscan (unless an ABI path is specified with the `--abi` option), and will create a new `dataSource` in the same way that `graph init` command creates a `dataSource` `--from-contract`, updating the schema and mappings accordingly.

The `--merge-entities` option identifies how the developer would like to handle `entity` and `event` name conflicts:

- If `true`: the new `dataSource` should use existing `eventHandlers` & `entities`.
- If `false`: a new entity & event handler should be created with `${dataSourceName}{EventName}`.

The contract `address` will be written to the `networks.json` for the relevant network.

> Note: When using the interactive cli, after successfully running graph init, you'll be prompted to add a new dataSource.
