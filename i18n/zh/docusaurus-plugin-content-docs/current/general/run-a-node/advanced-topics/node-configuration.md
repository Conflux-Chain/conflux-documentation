---
sidebar_position: 6
title: 配置节点
displayed_sidebar: generalSidebar
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
jsonrpc_http_port=12537 # JSON-RPC HTTP端口
jsonrpc_ws_port=12535 # JSON-RPC WebSocket端口
public_rpc_apis='safe' # JSON-RPC API命名空间列表，多个命名空间用逗号分隔，使用"all"表示启用所有API。
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

交易跟踪相关选项。

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

### pos related options

#### pos_key password

Password for encrypting the POS private key, used to secure the POS private key. By default, this password is set interactively through the command line during the first node startup. You can set this password through the configuration file to avoid command line interaction.

```toml
dev_pos_private_key_encryption_password="aaaa"
```

#### pos config file

Below are the default paths for the POS configuration file, initial nodes file, and private key file. You can modify these paths to customize the POS configuration.

```toml
# PoS config file path
pos_config_path=./pos_config/pos_config.yaml
# PoS initial nodes file path
pos_initial_nodes_path=./pos_config/initial_nodes.json
# PoS account private key file path
pos_private_key_path=./pos_config/pos_key
```

The release package contains a default PoS configuration file, which can be found in the `pos_config` directory. The `pos_key` file will be generated automatically after the first node startup.

### storage optimization

Storage optimization related options.

```toml
# Use isolated database for MPT table
# Setting it to true will reduce the disk usage
# Was introduced in v2.3.4 https://github.com/Conflux-Chain/conflux-rust/releases/tag/v2.3.4
use_isolated_db_for_mpt_table=true 
```

## 配置文件示例

For a more comprehensive configuration file example, you can refer to [hydra.toml](./configuration-files.md).

## 常见问题解答

### I want to run a Core Space RPC node, what parameters do I need to configure?

```toml
node_type="archive"
jsonrpc_http_port=12537
jsonrpc_ws_port=12535
public_rpc_apis='safe'
persist_block_number_index=true
persist_tx_index=true
```

### I want to run an eSpace RPC node, what parameters do I need to configure?

```toml
node_type="archive"
jsonrpc_http_eth_port=8545
jsonrpc_ws_eth_port=8546
public_evm_rpc_apis = "evm"
persist_block_number_index=true
persist_tx_index=true
```

### After my node has been running for a while, I want to enable the `executive_trace` configuration. Do I need to resynchronize the data?

Yes, you need to resynchronize the data.

### Does the archive node snapshot data provided by the official source include trace data?

Yes, it does.

### After the configuration is modified, do I need to clear the data then restart the node?

Depending on the situation, sometimes it does, sometimes it doesn’t. If the configuration involves data store or data index, you need to restart the node if the configuration changes, for example:

- `persist_tx_index`
- `executive_trace`
- `persist_block_number_index`

Other restart are generally not required.