---
sidebar_position: 6
title: 配置节点
displayed_sidebar: generalSidebar
tags:
  - node
---

Conflux节点提供了丰富的配置选项，允许通过修改这些设置来调整节点行为。 本文档提供了节点配置选项及其含义的概述。

## 如何配置节点

### 配置文件

Conflux节点的配置文件为`hydra.toml`，默认位于节点程序下载的`run`目录中。 通过修改此文件中的配置选项，您可以调整节点的行为。

### 命令行参数

节点也可以使用命令行参数进行配置，**命令行参数的优先级高于配置文件**。 例如，可以使用`--jsonrpc-http-port`参数指定节点的JSON-RPC端口。

```shell
./conflux --jsonrpc-http-port 12537
```

可以通过运行`./conflux -h`查看参数的详细列表。

## 配置文件选项简介

### 节点类型

节点类型，有三个可能的值：`full（完整）`、`archive（归档）`、`light（轻）`。 默认值为`full`。

```toml
node_type="full"
```

### 链ID

链ID，用于识别Conflux网络。 核心空间（Core Space）主网的链ID为**1029**，eSpace主网的链ID为**1030**。 测试网的链ID分别为1和71。

```toml
chain_id=1029
evm_chain_id=1030
```

通常，除非您想要设置本地测试网络，否则无需修改此配置选项。

### Core Space RPC

Core Space RPC相关选项。

```toml
jsonrpc_http_port=12537 # JSON-RPC HTTP port
jsonrpc_ws_port=12535 # JSON-RPC WebSocket port
public_rpc_apis='safe' # JSON-RPC API namespace list，Multiple namespaces are separated by commas, and using "all" represents enabling all APIs.
poll_lifetime_in_seconds=60 # To open filter related methods
```

### eSpace RPC

eSpace RPC相关选项。

```toml
jsonrpc_http_eth_port=8545
jsonrpc_ws_eth_port=8546
public_evm_rpc_apis = "evm"
```

### 数据索引

与交易（tx）和区块相关的RPC接口默认不支持查询历史数据。 如果需要查询历史数据，必须启用数据索引。

```toml
persist_block_number_index=true
persist_tx_index=true
```

### 交易跟踪

Parity style transaction trace related options.

```toml
executive_trace=true
```

如果想要启用此配置，需要重新同步数据。

### 全状态（fullstate）

全状态模式支持查询区块链的历史状态。

要为单个空间启用全状态模式，可以使用`single_mpt_space`配置选项指定空间名称。

```toml
single_mpt_space = "evm" # 核心空间使用"native"
```

启用双空间的全状态模式。

```toml
enable_single_mpt_storage=true
```

### cfx_getLogs/eth_getLogs相关选项

`getLogs` RPC方法对节点造成了显著的性能负担。 过度查询此方法的数据可能导致节点负载高。 为了缓解这一点，调整以下配置选项以限制每个`getLogs`请求请求的数据量。

```toml
get_logs_filter_max_limit=1000
get_logs_epoch_batch_size=1000
get_logs_filter_max_epoch_range=1000
get_logs_filter_max_block_number_range=2000
```

### 日志

与节点日志相关的配置选项。

```toml
log_conf="log.yaml" # 日志配置文件
log_file="conflux.log"
log_level="info" # 值应为 "error"、"warn"、"info"、"debug"、"trace"、"off" 其中之一
```

### PoW挖矿

与工作量证明（PoW）挖矿相关的配置选项。

```toml
mining_author="cfx:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg"
stratum_listen_address="127.0.0.1"
stratum_port=32525
stratum_secret="aaaa"
pow_problem_window_size=1
```

### 交易池

与交易池相关的配置选项。

```toml
tx_pool_size=50000 # 交易池大小
tx_pool_min_native_tx_gas_price=1_000_000_000 # 核心空间交易最低燃气价格
tx_pool_min_eth_tx_gas_price=20_000_000_000 # eSpace交易最低燃气价格
```

### 存储目录

区块链数据存储目录配置：

```toml
conflux_data_dir="./blockchain_data"
block_db_dir="./blockchain_data/blockchain_db"
netconf_dir="./blockchain_data/net_config"
```

### pos 相关选项

#### pos_key 密码

用于加密PoS私钥的密码，用来保护PoS私钥。 默认情况下，这个密码是在节点首次启动时通过命令行交互设置的。 您可以通过配置文件设置此密码以避免命令行交互。

```toml
dev_pos_private_key_encryption_password="aaaa"
```

Or you can pass it through environment variable: `CFX_POS_KEY_ENCRYPTION_PASSWORD`.

#### pos 配置文件

以下是 PoS 配置文件、初始节点文件和私钥文件的默认路径。 您可以修改这些路径来自定义 PoS 配置。

```toml
# PoS 配置文件路径
pos_config_path=./pos_config/pos_config.yaml
# PoS 初始节点文件路径
pos_initial_nodes_path=./pos_config/initial_nodes.json
# PoS 账户私钥文件路径
pos_private_key_path=./pos_config/pos_key
```

发布包含一个默认的 PoS 配置文件，可以在 `pos_config` 目录中找到。 `pos_key` 文件将在第一次节点启动后自动生成。

### 存储优化

相关的存储优化选项。

```toml
# 为 MPT 表使用独立数据库
# 将其设置为 true 将减少磁盘使用量
# 在 v2.3.4 中引入 https://github.com/Conflux-Chain/conflux-rust/releases/tag/v2.3.4
use_isolated_db_for_mpt_table=true 
```

## 配置文件示例

要获得更全面的配置文件示例，您可以参考[hydra.toml](./configuration-files.md)。

## 常见问题解答

### 我想运行一个Core Space RPC节点，我需要配置哪些参数？

```toml
node_type="archive"
jsonrpc_http_port=12537
jsonrpc_ws_port=12535
public_rpc_apis='safe'
persist_block_number_index=true
persist_tx_index=true
```

### 我想运行一个eSpace RPC节点，我需要配置哪些参数？

```toml
node_type="archive"
jsonrpc_http_eth_port=8545
jsonrpc_ws_eth_port=8546
public_evm_rpc_apis = "evm"
persist_block_number_index=true
persist_tx_index=true
```

### 我的节点运行了一段时间后，我想启用`executive_trace`配置。 我需要重新同步数据吗？

是的，您需要重新同步数据。

### 官方提供的归档节点快照数据是否包含trace数据？

是的，包含。

### 修改配置后，我需要清除数据然后重启节点吗？

根据情况而定，有时需要，有时不需要。 如果配置涉及数据存储或数据索引，配置更改时需要重启节点，例如：

- `persist_tx_index`
- `executive_trace`
- `persist_block_number_index`

其他一般不需要重启。

### I want to access Core Space debug/test RPC methods, what parameters do I need to configure?

```toml
jsonrpc_local_http_port=12539 # this is the port for debug/test RPC methods
```
