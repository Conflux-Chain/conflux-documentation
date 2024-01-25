---
sidebar_position: 1
title: 运行节点
description: 运行 Conflux 节点的快速指南
toc_max_heading_level: 4
displayed_sidebar: generalSidebar
---

Conflux Network是一个具有可扩展性的区块链平台，旨在实现高吞吐量和安全性。 运行Conflux节点可以让你参与到网络中，验证交易，并与Conflux区块链进行交互。

通过运行Conflux节点来参与Conflux网络可以提高Conflux网络的去中心化程度。 Here's a step-by-step guide to setting up and running a Conflux node.

## 硬件要求

The hardware requirements depend on the type of node you want to run. For the specific requirements of each type of node, please visit the section [Node Types](./node-types)

For a Full Node, requirements are the following:

* 至少16GB RAM(推荐32GB)，4个CPU 核心。
* 至少1.5TB磁盘空间(推荐使用SSD)。
* 一个稳定的互联网网络连接。
* 推荐使用 **ext4 （为了可靠性和稳定性）**，因为XFS虽然性能好但是不稳定。

## 步骤

### Step 1: Get the Conflux Client

There are two options, downloading a pre-built Conflux Client, or compiling the Conflux Client from source.

#### Option 1: Downloading the Conflux Client

你可以直接从[conflux-rust仓库的发行版页面](https://github.com/Conflux-Chain/conflux-rust/releases) 下载二进制的Conflux客户段软件发行版，然后直接运行。 具体信息可以访问[该页面](./advanced-topics/downloading-conflux-client.md)。

#### Option 2: Compiling the Conflux Client

Compiling the Conflux Client is another option, before compiling the Conflux node software, you'll need to install `openssl`.

On Linux (Ubuntu)

```shell
sudo apt-get update 
sudo apt upgrade –y 
sudo apt install -y libssl-dev
```

On macOS

```shell
brew install openssl 
```

The building can be done in two steps:

1. 克隆Conflux仓库到本地，执行以下语句：

```shell
git clone https://github.com/Conflux-Chain/conflux-rust.git 
```

2. 从源代码编译出Conflux客户端软件的二进制程序，使用以下语句：

```shell
cd conflux-rust 
cargo build --release 
```

想了解更多详细信息，请访问[该页面](./advanced-topics/compiling-conflux-client.md)。

### Step 2: Using Snapshot Tool (Optional)

Conflux快照工具（又称为归档工具）可以帮助用户从快照快速建立Conflux节点。 该工具提供了下载链接，且默认情况下仅下载当天的数据库快照数据 快照工具在运行一个节点时可以节省用于下载和同步所有区块链数据所需的数周时间。 强烈推荐使用该工具，虽然该工具是可选的。

有关该工具的更多信息，请访问[该部分](./snapshot-tool)或[GitHub仓库](https://github.com/conflux-fans/archive-tool) 。

#### 使用示例：（Linux和Mac - 主网 - 全节点）

首先，下载快照下载软件：

```shell
wget <https://conflux-blockchain-data.oss-cn-beijing.aliyuncs.com/fullnode-db/M/download.sh> 
```

之后，运行“download”程序：

```shell
bash download.sh 
```

压缩的快照数据大小为几百GB。 下载完成后，将其内容解压到节点的 **run** 文件夹中。

### Step 3: Configure the Node

您可能想要通过编辑配置文件来配置您的 Conflux 节点。 你可以在Conflux仓库中找到一个示例配置文件，一般命名为**hydra.toml**（或者类似名字），实际命名取决于网络版本。

你可以根据需要进行编辑：

```shell
nano ./run/hydra.toml 
```

Make sure to review and modify the settings according to your preferences and system capabilities.

更多详细指导请访问[该页面](./advanced-topics/node-configuration.md)。

### Step 4: Running the Node

您可以通过运行以下命令启动Conflux节点：

建议将最大打开文件数设置为10000。 Linux中默认值为1024，运行Conflux节点需要更多。 您可以在Linux终端使用如下命令设置该参数。

```shell
ulimit -n 10000 
```

为了运行Conflux节点，最后请转到conflux-rust文件夹，通过以下命令来使用指定的配置文件启动Conflux客户端：

```shell
conflux --config ./run/hydra.toml 
```

或者：

```shell
./start.sh
```

这将使用你之前编辑的配置文件启动Conflux节点。

### Step 5: Interacting with the Node

你可以使用RPC调用与Conflux节点交互。 Conflux节点提供了HTTP JSON-RPC服务，您可以借助该服务发送请求并与区块链交互。

Example:

```shell
curl -H "Content-Type: application/json" -X POST –data '{"jsonrpc":"2.0","method":"cfx_clientVersion","params":[],"id":67}' 127.0.0.1:12537
```

### Step 6: Keeping Your Node Updated

确保将[Conflux节点软件更新](./how-to-upgrad.md) 到最新版本，以确保与网络的兼容性并包含最新的功能和安全补丁。

## 常见问题解答

如果你在节点建立过程中遇到任何问题，请查看[常见问题解答](./nodes-faqs.md) 和[故障排除](./TroubleShooting.md) 部分。
