---
sidebar_position: 7
title: Run an eSpace Node
displayed_sidebar: eSpaceSidebar
---

eSpace 和 Core Space 共用一个节点程序，请参考 [Core Space 节点操作指南](/docs/category/run-a-node) 来运行节点。 以下是一些特定于 eSpace 的配置。

## eSpace RPC 配置

要设置一个 eSpace RPC 节点，您需要打开以下配置项：

```toml
jsonrpc_http_eth_port=8545
jsonrpc_ws_eth_port=8546
public_evm_rpc_apis = "evm"
```

eSpace 的 RPC 端点端口与 Core Space 不同，您**不能**在 **Core Space 的 RPC 端口**访问 eth RPC 接口。

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

## 常见问题解答

### the method eth_getTransactionCount does not exist/is not available

Please check if the RPC port is correct. The default RPC port of eSpace is 8545, is different with Core Space RPC port.

### Is eSpace use same node with Core Space ?

Yes

### Does eSpace node have blockchain data snapshot?

Yes, same with Core Space.
