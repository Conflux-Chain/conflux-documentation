---
sidebar_position: 4
title: 下载 Conflux 节点客户端
displayed_sidebar: generalSidebar
tags:
  - node
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

* `conflux` Node program - 这是 Conflux 节点的可执行文件。 您将使用它在您的机器上运行 Conflux 网络节点。
* `hydra.toml` - 这个文件作为 Conflux 网络的主要配置文件。 如果您正在为测试网而不是主网设置节点，您将使用一个名为 `testnet.toml` 的文件。 这个文件包含各种设置，决定了您的节点如何与 Conflux 网络交互。
* `log.yaml` - 这是日志配置文件。 它定义了节点程序如何处理日志，包括日志级别和日志输出位置。 这对于故障排除和进行节点监控非常重要。
* `throttling.toml` - 互联网速度流量限制配置文件。 这个文件在开发和测试阶段特别有用。 它允许您设置节点使用互联网带宽的限制，这对于模拟不同的网络条件或确保节点不超过某些使用限制很有帮助。
* `start.sh` - Linux 系统的启动脚本。 您将使用这个脚本在 Linux 机器上启动节点程序。 它简化了启动节点的过程，设置环境变量，并应用任何必要的运行时配置。
* `start.bat` - 类似于 `start.sh`，这是 Windows 系统的启动脚本。 它具有相同的用途，但它被设计为在 Windows 命令行环境中工作。
* `pos_config` - 这个目录包含与权益证明（PoS）共识机制相关的配置文件。 里面，您会找到 `genesis_file`——它定义了区块链的初始状态；`initial_nodes.json`——它列出了参与网络的初始节点；以及 `pos_config.yaml`，它包含了 PoS 机制的各种设置。 通常，除非您正在设置一个新网络或对 PoS 机制进行特定调整，否则您不需要编辑这些文件。

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
