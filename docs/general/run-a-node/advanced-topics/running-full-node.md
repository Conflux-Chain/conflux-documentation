---
sidebar_position: 11
title: Running a Full Node
displayed_sidebar: generalSidebar
tags: [node]
---
### Requirements 

* At least 16GB of RAM. 

* A minimum of 1TB free disk space (SSD is recommended). 

* A stable internet connection. 

## Configuring Conflux Full Node

Conflux can be configured using either the CLI options or a config file. Should the CLI flags and the config file disagree about a setting, the CLI takes precedence.  

The config file follows the format of [TOML](https://github.com/toml-lang/toml). The path of the configuration file can be set with the CLI option `--config path/to/conflux.toml`. A default configuration file `hydra.toml` with every configuration explained has been provided in the directory `run`, and you can start customizing your configuration from there.

You can list all CLI options by running  `$ ./conflux --help`. The vast majority of CLI options map to a setting in the TOML file, for example `--public-address 127.0.0.1:32323` can be set by creating a config file:

```toml
public_address="127.0.0.1:32323"
```

If you are going to set up a node and let it join the Conflux mainnet(testnet), you need to set the `public_address` appropriately. It should be set as the IP address of your node which can be accessed publicly from Internet. If your node is covered under a public gateway, you can get its public address by searching "ip" in [Google](https://www.google.com).

If you want to let your node participate the mining process, you need to enable it by setting `start_mining` as "true" and `mining_author` as the account address that receives the mining reward. 

If you want to open the http or websocket RPC, you need to enable it by setting `jsonrpc_http_port` or `jsonrpc_ws_port`. 
**Note that to serve transaction-related RPCs, `persist_tx_index` should also be set to `true` or the node will only be able to handle very recent transactions.**

## Running Test

We have both unit tests written in Rust and integration tests written in python. After you make some modifications to the code, you can run these tests to see if the system still runs correctly.

First, you need to install the dependencies as instructed in [Install Test Dependencies](./compiling-conflux-client.md#install-test-dependencies).

Then you can run the tests as follows

* Linux:

        $ ./dev-support/test.sh

    This will automatically run the unit tests in our Rust code and the python tests.

* Others:

    To run unit tests in Rust:

        $ cargo test --release --all

    To run python integration tests:

        $ ./tests/test_all.py

