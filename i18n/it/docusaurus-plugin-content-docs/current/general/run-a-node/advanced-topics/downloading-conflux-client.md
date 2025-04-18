---
sidebar_position: 4
title: Downloading the Conflux Client
displayed_sidebar: generalSidebar
tags:
  - node
---

[Conflux-rust](https://github.com/conflux-chain/conflux-rust) is a high-performance implementation of the Conflux protocol developed by the foundation with the Rust language. Conflux-rust is a Conflux node that connects to other nodes on the Conflux network and provides an RPC interface that you can use to query and interact with the blockchain. It is also a command-line tool that manages local accounts and conducts RPC interaction with nodes. You can download the released package through any of the ways listed:

## Download pre-built binaries

The [**release page on the conflux-rust GitHub repository**](https://github.com/Conflux-Chain/conflux-rust/releases) providers pre-built binaries that you can download and run directly. There are two versions for the **mainnet** and the **testnet**: the mainnet version is Conflux `vx.x.x`, while the version for testnet is `Conflux vx.x.x-testnet` (which has a suffix of `testnet`). Each program will be provided for Linux, Windows10, and macOS.

On the Release page, each version will have a version update description and `Assets` that you can download. After selecting the corresponding platform, you can click the link to download the zip package. For example, when unzipping the `conflux_linux_v2.0.3.zip` file, a `run` folder that contains node programs, configuration files, and startup scripts will appear. The specific documents include:

```bash
.
└── run
    ├── clear_state.bat
    ├── clear_state.sh
    ├── conflux
    ├── hydra.toml
    ├── log.yaml
    ├── pos_config
    │   ├── genesis_file
    │   ├── initial_nodes.json
    │   └── pos_config.yaml
    ├── start.bat
    ├── start.sh
    └── throttling.toml

2 directories, 11 files

```

* `conflux` Node program - This is the executable file for the Conflux node. You will use this to run the Conflux network node on your machine.
* `hydra.toml` - This file serves as the main configuration for the Conflux network. If you're setting up a node for the testnet instead of the mainnet, you would use a file named `testnet.toml`. This file contains various settings that determine how your node interacts with the Conflux network.
* `log.yaml` - This is the log configuration file. It defines how logging is handled by the node program, including log levels and log output locations. This is important for troubleshooting and monitoring the node's operation.
* `throttling.toml` - The internet speed flow limit configuration file. This file is particularly useful during development and testing phases. It allows you to set limits on the node's use of internet bandwidth, which can be helpful for simulating different network conditions or for ensuring that the node does not exceed certain usage limits.
* `start.sh` - The startup script for Linux systems. You would use this script to start the node program on a Linux machine. It simplifies the process of launching the node, setting up environment variables, and applying any necessary runtime configurations.
* `start.bat` - Similar to `start.sh`, this is the startup script for Windows systems. It serves the same purpose but is designed to work in the Windows command line environment.
* `pos_config` - This directory contains configuration files related to the Proof of Stake (PoS) consensus mechanism. Inside, you will find the `genesis_file`, which defines the initial state of the blockchain; `initial_nodes.json`, which lists the initial nodes participating in the network; and `pos_config.yaml`, which contains various settings for the PoS mechanism. Normally, you won't need to edit these files unless you are setting up a new network or making specific adjustments to the PoS mechanism.

**Make sure you only run binaries downloaded from the official Conflux-Chain/conflux-rust GitHub repository.**

Then you can use the startup script to start the node. For example, on Linux, you can run the following command to start the node:

```bash
./start.sh
```

Or you can run the following command to start the node:

```bash
./conflux --config hydra.toml
```

## Docker

Conflux provides an official [Docker image of conflux-rust](https://hub.docker.com/r/confluxchain/conflux-rust). You can use it to quickly start a node. You can start a node within two steps:  Download image and  Run container.

```sh
$ docker pull confluxchain/conflux-rust
$ docker run -p 12537:12537 --rm --name cfx-node confluxchain/conflux-rust
```

So far, there are three tag lines in the officially released image:

1. x.x.x
2. x.x.x-mainnet
3. x.x.x-testnet

The first type of image will run a **private chain node** in **dev mode** by default. The chainId and miner account will be randomly generated. At the same time, 10 genesis accounts will be created (the defult password is `123456`), and 1000 CFX will be distributed to each account for developing and testing.

The image with mainnet/testnet suffix tag will activate the nodes of the main network/test network by default. The nodes will start to synchronize data from Epoch 0 through the network. (The process of sychronizing might take a long time, and the transaction sending request won't be processed.)

They all support the use of custom configuration files and data directories through mounting directories. You can check the tutorial at: [Conflux-rust docker file on Github](https://github.com/conflux-chain/conflux-docker)

## FAQs

### illegal instruction

If you encounter this error when running the node, you can try to download the **compatible** version binary from the release page for example `conflux_linux_glibc2.27_x64_v2.3.3-compatible.zip` , or compile the source code yourself.
