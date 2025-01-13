---
sidebar_position: 7
title: 运行 eSpace 节点
displayed_sidebar: eSpaceSidebar
keywords:
  - Conflux eSpace
  - Node Operation
  - RPC Configuration
  - Full State
  - Chain ID
  - JSON-RPC
  - WebSocket
  - EVM
  - 归档节点
  - State Query
  - Mainnet
  - Testnet
  - 配置
  - TOML
  - Blockchain Data
  - Snapshot
  - Core Space
  - Shared Node
  - Port Configuration
  - eth_getTransactionCount
  - 故障排除
tags:
  - 节点
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

为了启用完整的 eSpace，您需要将 `single_mpt_space` 参数设置为 `evm` 并运行一个归档节点。

```toml
sinle_mpt_space = "evm"
```

启用全状态后，您可以查询合约或账户**在任何区块高度**的状态。

## eSpace 的链 ID

eSpace 主网的链 ID 是 1030，测试网是 71。 通常情况下，您不需要更改这个设置。

```toml
evm_chain_id = 1030
```

## 常见问题解答

### eth_getTransactionCount 方法不存在或不可用

请检查 RPC 端口是否正确。 eSpace 的默认的 RPC 端口是 8545，与 Core Space 的 RPC 端口不同。

### eSpace 是否与 Core Space 使用相同的节点？

是的

### eSpace 节点是否有区块链数据快照？

是的，与 Core Space 相同。
