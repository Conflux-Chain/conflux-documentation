---
sidebar_position: 4
title: 下载 Conflux 节点客户端
displayed_sidebar: generalSidebar
---

[Conflux-rust](https://github.com/conflux-chain/conflux-rust)是Conflux基金会使用Rust语言开发的一个Conflux协议的高性能实现。 Conflux-rust 是一个连接到 Conflux 网络上其他节点的 Conflux 节点，并提供了一个 RPC 接口，你可以使用它来查询和与区块链交互。 它还是一个命令行工具，用于管理本地账户并与节点进行 RPC 交互。 你可以通过以下任何方式下载已发布的软件包：

## 下载预构建的二进制文件

[**conflux-rust的github仓库的发行版页面**](https://github.com/Conflux-Chain/conflux-rust/releases)提供了预构建的二进制文件，你可以直接下载并运行。 Conflux-rust发行版有两个版本，分别是**主网**和**测试网**：主网版本是Conflux `vx.x.x` ，而测试网版本是`Conflux vx.x.x-testnet` (带有 `testnet`后缀)。 每个程序都提供了适用于Linux、Windows10和macOS的版本。

在发布页面上，每个版本都将有一个版本更新描述和你可以下载的`Assets` 。 在选择相应的平台后，你可以点击链接下载zip压缩包。 For example, when unzipping the `conflux_linux_v2.0.3.zip` file, a `run` folder that contains node programs, configuration files, and startup scripts will appear. The specific documents include:

```bash
➜  run tree
.
├── conflux
├── log.yaml
├── start.bat
├── start.sh
├── hydra.toml
├── pos_config
└── throttling.toml

0 directories, 6 files
```

* `conflux` Node program
* `hydra.toml` Mainnet configuration file (If you download the testnet program, the configuration file is called `testnet.toml`)
* `log.yaml` Log configuration file
* `throttling.toml` Internet speed flow limit configuration file (used for development and testing)
* `start.sh` Linux system startup script
* `start.bat` Windows system startup script
* `pos_config` Configuration files for the PoS consensus mechanism. Normally you don't need to edit it.

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

## 常见问题解答

### illegal instruction

If you encounter this error when running the node, you can try to download the **compatible** version binary from the release page for example `conflux_linux_glibc2.27_x64_v2.3.3-compatible.zip` , or compile the source code yourself.
