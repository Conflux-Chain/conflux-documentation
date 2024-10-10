---
sidebar_position: 7
title: Run an eSpace Node
displayed_sidebar: eSpaceSidebar
tags:
  - Conflux eSpace
  - Node Operation
  - RPC Configuration
  - Full State
  - Chain ID
  - JSON-RPC
  - WebSocket
  - EVM
  - Archive Node
  - State Query
  - Mainnet
  - Testnet
  - Configuration
  - TOML
  - Blockchain Data
  - Snapshot
  - Core Space
  - Shared Node
  - Port Configuration
  - eth_getTransactionCount
  - Troubleshooting
---

eSpace and Core Space share a common node program, so please refer to the [Core Space Node Operation Guide](/docs/category/run-a-node) for running a node. Below are some eSpace specific configurations.

## eSpace RPC configuration

To setup a **eSpace RPC node**, you need to open the following configuration items:

```toml
jsonrpc_http_eth_port=8545
jsonrpc_ws_eth_port=8546
public_evm_rpc_apis = "evm"
```

eSpace's RPC endpoint port is different from Core Space, you **can not** access the eth RPC interface at the **Core Space RPC port**.

## Full State

To enable full state for eSpace, you need to set the `single_mpt_space` parameter to `evm` and run a archive node.

```toml
single_mpt_space = "evm"
```

By enable full state, you can query the state of the contract or account **at any block height**.

## eSpace Chain ID

The eSpace mainnet chain ID is 1030, testnet is 71. Normally you don't need to change this.

```toml
evm_chain_id = 1030
```

## FAQs

### the method eth_getTransactionCount does not exist/is not available

Please check if the RPC port is correct. The default RPC port of eSpace is 8545, is different with Core Space RPC port.

### Is eSpace use same node with Core Space ?

Yes

### Does eSpace node have blockchain data snapshot?

Yes, same with Core Space.
