---
sidebar_position: 6
title: Node Configuration
displayed_sidebar: generalSidebar
---

Conflux nodes offer a rich set of configuration options, allowing the adjustment of node behavior by modifying these settings. This document provides an overview of the node configuration options and their meanings.

## How to configure nodes.

### Configuration File

The configuration file for Conflux nodes is `hydra.toml`, and by default, it is located in the `run` directory where the node program is downloaded. By modifying the configuration options in this file, you can adjust the behavior of the node.

### Command Line Parameters

Nodes can also be configured using command line parameters, where the **priority of command line parameters is higher than that of the configuration file**. For example, the JSON-RPC port of the node can be specified using the `--jsonrpc-http-port` parameter.

```shell
./conflux --jsonrpc-http-port 12537
```

A detailed list of parameters can be viewed by running `./conflux -h`.

## Introduction to Configuration File Options

### node type

Node types, with three possible values: `full`, `archive`, `light`. The default value is `full`.

```toml
node_type="full"
```

### chain id

Chain ID, used to identify the Conflux network. The Chain ID for the Core Space mainnet is **1029**, and for the eSpace mainnet, it is **1030**. The testnets have Chain IDs of 1 and 71, respectively.

```toml
chain_id=1029
evm_chain_id=1030
```

Usually, this configuration option does not need to be modified unless you want to set up a local test network.

### Core Space RPC

Core Space RPC related options.

```toml
jsonrpc_http_port=12537 # JSON-RPC HTTP port
jsonrpc_ws_port=12535 # JSON-RPC WebSocket port
public_rpc_apis='safe' # JSON-RPC API namespace list，Multiple namespaces are separated by commas, and using "all" represents enabling all APIs.
poll_lifetime_in_seconds=60 # To open filter related methods
```

### eSpace RPC

eSpace RPC related options.

```toml
jsonrpc_http_eth_port=8545
jsonrpc_ws_eth_port=8546
public_evm_rpc_apis = "evm"
```

### Data indexing

RPC interfaces related to transactions (tx) and blocks do not support querying historical data by default. If you need to query historical data, you must enable data indexing.

```toml
persist_block_number_index=true
persist_tx_index=true
```

### transaction trace

Parity style transaction trace related options.

```toml
executive_trace=true
```

If you want to enable this configuration, you will need to resynchronize the data.

### fullstate

Fullstate mode supports querying the historical state of the blockchain.

To enable the fullstate mode for a single Space, you can specify the Space name using the `single_mpt_space` configuration option.

```toml
single_mpt_space = "evm" # core-space use "native"
```

Enabling the fullstate mode for dual spaces.

```toml
enable_single_mpt_storage=true
```

### cfx_getLogs/eth_getLogs related options

The `getLogs` RPC method imposes a significant performance overhead on the node. Excessive querying of data with this method can lead to high node loads. To mitigate this, adjust the following configuration option to limit the amount of data requested per `getLogs` request.

```toml
get_logs_filter_max_limit=1000
get_logs_epoch_batch_size=1000
get_logs_filter_max_epoch_range=1000
get_logs_filter_max_block_number_range=2000
```

### log

Configuration options related to node logs.

```toml
log_conf="log.yaml" # log configuration file
log_file="conflux.log"
log_level="info" # The value should be one of "error", "warn", "info", "debug", "trace", "off"
```

### pow mining

Configuration options related to Proof-of-Work (PoW) mining.

```toml
mining_author="cfx:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg"
stratum_listen_address="127.0.0.1"
stratum_port=32525
stratum_secret="aaaa"
pow_problem_window_size=1
```

### tx pool

Transaction pool-related configuration options.

```toml
tx_pool_size=50000 # tx pool size
tx_pool_min_native_tx_gas_price=1_000_000_000 # core space tx minimum gas price
tx_pool_min_eth_tx_gas_price=20_000_000_000 # eSpace tx minimum gas price
```

### storage directory

Blockchain data storage directory configuration:

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

Or you can pass it through environment variable: `CFX_POS_KEY_ENCRYPTION_PASSWORD`.

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

## Configuration File Example

For a more comprehensive configuration file example, you can refer to [hydra.toml](./configuration-files.md).

## FAQs

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

### I want to access Core Space debug/test RPC methods, what parameters do I need to configure?

```toml
jsonrpc_local_http_port=12539 # this is the port for debug/test RPC methods
```
