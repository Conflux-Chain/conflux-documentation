---
sidebar_position: 4
title: Downloading the Conflux Client
displayed_sidebar: generalSidebar
---

[Conflux-rust](https://github.com/conflux-chain/conflux-rust) is a high-performance implementation of the Conflux protocol developed by the foundation with the Rust language. Conflux-rust is a Conflux node that connects to other nodes on the Conflux network and provides an RPC interface that you can use to query and interact with the blockchain. It is also a command-line tool that manages local accounts and conducts RPC interaction with nodes. You can download the released package through any of the ways listed:

## Download pre-built binaries

The [release](https://github.com/Conflux-Chain/conflux-rust/releases) page on the conflux-rust GitHub repository providers pre-built binaries that you can download and run directly. There are two versions for the mainnet and the testnet: the mainnet version is Conflux `vx.x.x`, while the version for testnet is `Conflux vx.x.x-testnet` (which has a suffix of `testnet`). Each program will be provided for Linux, Windows10, and macOS.

On the Release page, each version will have a version update description and `Assets` that you can download. After selecting the corresponding platform, you can click the link to download the zip package. For example, when unzipping the `conflux_linux_v2.0.3.zip` file, a `run` folder that contains node programs, configuration files, and startup scripts will appear. The specific documents include:

```bash
➜  run tree
.
├── conflux
├── log.yaml
├── start.bat
├── start.sh
├── hydra.toml
└── throttling.toml

0 directories, 6 files
```

* `conflux` Node program
* `hydra.toml` Mainnet configuration file (If you download the testnet program, the configuration file is called `testnet.toml`)
* `log.yaml` Log configuration file
* `throttling.toml` Internet speed flow limit configuration file (used for development and testing) 
* `start.sh` Linux system startup script
* `start.bat` Windows system startup script

**Make sure you only run binaries downloaded from the official Conflux-Chain/conflux-rust GitHub repository.**

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

The first type of image will run a private chain node in dev mode by default. The chainId and miner account will be randomly generated. At the same time, 10 genesis accounts will be created (the defult password is `123456`), and 1000 CFX will be distributed to each account for developing and testing.

The image with mainnet/testnet suffix tag will activate the nodes of the main network/test network by default. The nodes will start to synchronize data from Epoch 0 through the network. (The process of sychronizing might take a long time, and the transaction sending request won't be processed.)

They all support the use of custom configuration files and data directories through mounting directories. You can check the tutorial at:
[Conflux-rust docker file on Github](https://github.com/conflux-chain/conflux-docker)
