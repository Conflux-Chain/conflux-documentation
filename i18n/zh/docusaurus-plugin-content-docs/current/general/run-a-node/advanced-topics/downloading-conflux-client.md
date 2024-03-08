---
sidebar_position: 4
title: 下载 Conflux 节点客户端
displayed_sidebar: generalSidebar
---

[Conflux-rust](https://github.com/conflux-chain/conflux-rust)是Conflux基金会使用Rust语言开发的一个Conflux协议的高性能实现。 Conflux-rust 是一个连接到 Conflux 网络上其他节点的 Conflux 节点，并提供了一个 RPC 接口，你可以使用它来查询和与区块链交互。 它还是一个命令行工具，用于管理本地账户并与节点进行 RPC 交互。 你可以通过以下任何方式下载已发布的软件包：

## 下载预构建的二进制文件

[**conflux-rust的github仓库的发行版页面**](https://github.com/Conflux-Chain/conflux-rust/releases)提供了预构建的二进制文件，你可以直接下载并运行。 Conflux-rust发行版有两个版本，分别是**主网**和**测试网**：主网版本是Conflux `vx.x.x` ，而测试网版本是`Conflux vx.x.x-testnet` (带有 `testnet`后缀)。 每个程序都提供了适用于Linux、Windows10和macOS的版本。

在发布页面上，每个版本都将有一个版本更新描述和你可以下载的`Assets` 。 在选择相应的平台后，你可以点击链接下载zip压缩包。 例如，解压缩 `conflux_linux_v2.0.3.zip` 文件时,将会出现一个包含节点程序，配置文件和启动脚本的`run`文件夹。 具体的文件包括：

```bash
.
└── run
    ├── clear_state.bat
    ├── clear_state.sh
    ├── conflux
    ├── hydra.toml
    ├── log.yaml
    ├── pos_config
    │   ├── genesis_file
    │   ├── initial_nodes.json
    │   └── pos_config.yaml
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

**请确保您只运行从官方的Conflux-Chain/comflux-rust GitHub仓库下载的二进制文件。**

然后你可以使用启动脚本启动节点。 例如，在Linux上，你可以运行以下命令来启动节点：

```bash
./start.sh
```

或者，你可以运行以下命令启动节点：

```bash
./conflux --config ./run/hydra.toml
```

## 容器(Docker)

Conflux 提供了conflux-rust官方的[容器](https://hub.docker.com/r/confluxchain/conflux-rust)。 你可以使用它快速启动一个节点。 你可以通过如下两个步骤启动一个节点：下载镜像和运行容器。

```sh
$ docker pull confluxchain/conflux-rust
$ docker run -p 12537:12537 --rm --name cfx-node confluxchain/conflux-rust
```

到目前为止，官方发布的图像中有三个标签：

1. x.x.x
2. x.x.x-mainnet
3. x.x.x-testnet

默认情况下，第一类镜像会在**开发模式**下运行一个**私有链节点** 。 将随机生成链的ID和矿工账户。 同时，将创建10个创世账户(口令是`123456`)，并向每个账户分发1000 CFX用于开发和测试。

默认情况下，包含主网/测试网后缀标签的镜像将默认激活主网/测试网节点。 这些节点将通过网络开始从Epoch 0同步数据。 (同步过程可能需要很长时间，并且同步期间将不能处理任何交易请求)。

上述三类镜像都支持通过挂载目录使用自定义配置文件和数据目录。 你可以在这里查看教程：[Conflux-rust docker file](https://github.com/conflux-chain/conflux-docker)。

## 常见问题解答

### 非法指令

如果在运行节点时遇到此错误，你可以尝试从发布页面下载**兼容**版本的二进制文件，例如`conflux_linux_glibc2.27_x64_v2.3.3-compatible.zip`，或者自己编译源代码。
