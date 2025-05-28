---
sidebar_position: 6
title: 配置节点
displayed_sidebar: generalSidebar
tags:
  - node
---

Conflux节点提供了丰富的配置选项，允许通过修改这些设置来调整节点行为。 本文档提供了节点配置选项及其含义的概述。

## How to configure nodes

### 配置文件

The configuration file for Conflux nodes is `hydra.toml`(`testnet.toml` for testnet), and by default, it is located in the `run` directory where the node program is downloaded. 通过修改此文件中的配置选项，您可以调整节点的行为。

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

### bootnodes

Bootnodes are the initial nodes that the node connects to when it starts. The node will discover other nodes in the network through these bootnodes.

```toml
bootnodes="cfxnode://25265e1aa470d9d8667947820c4830a64e9f9678d6cb23ecde91e0447527f4926257b9637923a305ce91e15c929ed28164e6c32b76213764eb4a9624120ae1d7@39.97.180.246:32323,cfxnode://2b72adc3f52a80945db10fa35c3f6d02c73f65ff98b4a9eae4f7b244e8a51f01690e7dcef7a30bfb67fb07fcb2949e67c27487169623d40f6a9e55a8d04ca34f@39.107.143.220:32323"
```

Note: The mainnet and testnet bootnodes are different, you can get mainnet bootnodes from the [official-bootnodes](./official-bootnodes.md) page.

### Core Space RPC

Core Space RPC相关选项。

```toml
jsonrpc_http_port=12537 # JSON-RPC HTTP port
jsonrpc_ws_port=12535 # JSON-RPC WebSocket port
# Specify the APIs available through the public JSON-RPC interfaces (HTTP, TCP, WebSocket)
# using a comma-delimited list of API names.
# Possible Core space names are: all, safe, cfx, pos, debug, pubsub, test, trace, txpool.
# `safe` only includes `cfx` and `pubsub`, `txpool`.
public_rpc_apis='safe' 
poll_lifetime_in_seconds=60 # To open filter related methods
```

Note: if some method is not available(eg. `method not found`), you can check the `public_rpc_apis` and `poll_lifetime_in_seconds` configuration.

### eSpace RPC

eSpace RPC相关选项。

```toml
jsonrpc_http_eth_port=8545
jsonrpc_ws_eth_port=8546
# Possible eSpace names are: eth, ethpubsub, ethdebug.
# `evm` only includes `eth` and `ethpubsub`
# to use eth_debugTraceTransaction and other trace methods, you need to enable `ethdebug`
public_evm_rpc_apis = "evm"
```

### eth_call/cfx_call max gas limit

```toml
# By default, the maximum gas limit supported by gas estimation is 27 million for 
# core space and 15 million for espace. These limits are also supported by the majority 
# of transaction pools. You can override this parameter, but be aware that the estimated 
# gas may be rejected by transaction pools, including the transaction pool on yourself,
#
max_estimation_gas_limit = 30_000_000
```

### 数据索引

与交易（tx）和区块相关的RPC接口默认不支持查询历史数据。 如果需要查询历史数据，必须启用数据索引。

```toml
persist_block_number_index=true
persist_tx_index=true
```

### 交易跟踪

Parity 风格的交易跟踪相关选项

```toml
executive_trace=true
```

如果想要启用此配置，需要重新同步数据。

### 全状态（fullstate）

全状态模式支持查询区块链的历史状态。

To run a **fullstate node**, you need to use a specially compiled Conflux client program. 目前，官方的二进制发布版本未启用此功能，您需要自行编译。 The compilation command is:
```bash
cargo build --release --features u64-mpt-db-key
```

To enabling the fullstate mode for dual spaces.

```toml
enable_single_mpt_storage=true
```

To enable the fullstate mode for a single Space, an addition configuration can be used:

```toml
enable_single_mpt_storage=true
single_mpt_space = "evm" # core-space use "native"
```

> 目前，Conflux 基金会不提供包含完整历史状态的快照数据，用户需要自行同步数据。

### PivotHint

If you want to `fully synchronize the data`, you need to enable the pivot_hint related configuration option.

* `pivot_hint_path`: pivot hint文件的路径
* `pivot_hint_checksum`:Page Digests 部分的预期校验和（十六进制字符串，不带“0x”前缀）

Note: These two configurations must either both be specified or both be omitted. Specifying only one will result in an error.

PivotHint file can be downloaded [here](https://github.com/Conflux-Chain/conflux-rust/pull/2935)

### cfx_getLogs/eth_getLogs相关选项

The `getLogs` RPC method imposes a significant performance overhead on the node. Excessive querying of data with this method can lead to high node loads. To mitigate this, adjust the following configuration option to limit the amount of data requested per `getLogs` request.

```toml
get_logs_filter_max_limit=1000
get_logs_epoch_batch_size=1000
get_logs_filter_max_epoch_range=1000
get_logs_filter_max_block_number_range=2000
```

### 日志

Configuration options related to node logs.

```toml
log_conf="log.yaml" # 日志配置文件
log_file="conflux.log"
log_level="info" # 值应为 "error"、"warn"、"info"、"debug"、"trace"、"off" 其中之一
```

### PoW挖矿

Configuration options related to Proof-of-Work (PoW) mining.

```toml
mining_author="cfx:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg"
stratum_listen_address="127.0.0.1"
stratum_port=32525
stratum_secret="aaaa"
pow_problem_window_size=1
```

### 交易池

Transaction pool-related configuration options.

```toml
tx_pool_size=50000 # tx pool size
tx_pool_min_native_tx_gas_price=1_000_000_000 # core space tx minimum gas price
tx_pool_min_eth_tx_gas_price=20_000_000_000 # eSpace tx minimum gas price
# Controls whether transactions exceeding half of the gas limit are allowed to be packed.
# If set to false, transactions exceeding half of the gas limit will not be packed.
# For eSpace the block gas limit is 30 million, so the threshold is 15 million.
tx_pool_allow_gas_over_half_block = false
```

### 存储目录

Blockchain data storage directory configuration:

```toml
conflux_data_dir="./blockchain_data"
block_db_dir="./blockchain_data/blockchain_db"
netconf_dir="./blockchain_data/net_config"
```

### pos 相关选项

#### pos_key 密码

Password for encrypting the POS private key, used to secure the POS private key. By default, this password is set interactively through the command line during the first node startup. You can set this password through the configuration file to avoid command line interaction.

```toml
dev_pos_private_key_encryption_password="aaaa"
```

Or you can pass it through environment variable: `CFX_POS_KEY_ENCRYPTION_PASSWORD`.

#### pos 配置文件

Below are the default paths for the POS configuration file, initial nodes file, and private key file. You can modify these paths to customize the POS configuration.

```toml
# PoS 配置文件路径
pos_config_path=./pos_config/pos_config.yaml
# PoS 初始节点文件路径
pos_initial_nodes_path=./pos_config/initial_nodes.json
# PoS 账户私钥文件路径
pos_private_key_path=./pos_config/pos_key
```

The release package contains a default PoS configuration file, which can be found in the `pos_config` directory. The `pos_key` file will be generated automatically after the first node startup.

### 存储优化

Storage optimization related options.

```toml
# 为 MPT 表使用独立数据库
# 将其设置为 true 将减少磁盘使用量
# 在 v2.3.4 中引入 https://github.com/Conflux-Chain/conflux-rust/releases/tag/v2.3.4
use_isolated_db_for_mpt_table=true 
```

## 配置文件示例

For a more comprehensive configuration file example, you can refer to [hydra.toml](./configuration-files.md). There are more configuration options (with annotated explanations) available in the configuration file, and you can adjust them according to your needs.

## 常见问题解答

### 我想运行一个Core Space RPC节点，我需要配置哪些参数？

```toml
node_type="archive"
jsonrpc_http_port=12537
jsonrpc_ws_port=12535
public_rpc_apis='safe'
persist_block_number_index=true
persist_tx_index=true
max_estimation_gas_limit=30000000
```

### 我想运行一个eSpace RPC节点，我需要配置哪些参数？

```toml
node_type="archive"
jsonrpc_http_eth_port=8545
jsonrpc_ws_eth_port=8546
public_evm_rpc_apis = "evm"
persist_block_number_index=true
persist_tx_index=true
max_estimation_gas_limit=30000000
```

### 我的节点运行了一段时间后，我想启用`executive_trace`配置。 我需要重新同步数据吗？

Yes, you need to resynchronize the data.

### 官方提供的归档节点快照数据是否包含trace数据？

Yes, it does.

### 修改配置后，我需要清除数据然后重启节点吗？

Depending on the situation, sometimes it does, sometimes it doesn’t. If the configuration involves data store or data index, you need to restart the node if the configuration changes, for example:

- `persist_tx_index`
- `executive_trace`
- `persist_block_number_index`

Other restart are generally not required.

### 我要访问 Core Space 的调试/测试 RPC 方法，需要配置哪些参数？

```toml
jsonrpc_local_http_port=12539 # this is the port for debug/test RPC methods
```
