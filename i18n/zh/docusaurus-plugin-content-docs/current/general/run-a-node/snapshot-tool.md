---
sidebar_position: 3
title: 节点快照工具
description: 学习如何使用Conflux快照工具从快照中快速建立一个Conflux节点。
displayed_sidebar: generalSidebar
---

## 简介

The Conflux Blockchain Data [Snapshot Tool (aka Archive-Tool)](https://github.com/conflux-fans/archive-tool) is designed to help users quickly set up a Conflux node from a snapshot. 该工具提供了下载链接，且默认情况下会下载当天的数据库快照数据。 快照工具在运行一个节点时可以节省用于下载和同步所有区块链数据所需的数周时间。 此工具是可选的，但**强烈建议使用**。 此工具支持使用curl命令的**断点续传** 。 如果在此过程中发生错误，建议用户跟随脚本提示操作。

## 先决条件

首先，确保你的系统中安装了curl。 如果没有安装，你可以从[这里](https://curl.se/)下载并安装。

## 下载快照数据

根据节点类型和您的地理位置选择快照下载链接：

### Mainnet Archive Node

1. Linux & Mac - 主网 - 归档节点:

```shell
# Beijing
wget https://conflux-blockchain-bj.oss-cn-beijing.aliyuncs.com/archivenode-db/mainnet/download.sh
# US West
wget https://conflux-blockchain-data-us.s3.us-west-1.amazonaws.com/archivenode-db/M/download.sh
# EU Central
wget https://conflux-blockchain-data-eu.s3.eu-central-1.amazonaws.com/archivenode-db/M/download.sh

bash download.sh 
```

2. Windows - 主网 - 归档节点 :

```shell
# Beijing
wget https://conflux-blockchain-bj.oss-cn-beijing.aliyuncs.com/archivenode-db/mainnet/download.bat
# US West
wget https://conflux-blockchain-data-us.s3.us-west-1.amazonaws.com/archivenode-db/M/download.bat
# EU Central
wget https://conflux-blockchain-data-eu.s3.eu-central-1.amazonaws.com/archivenode-db/M/download.bat

download.bat 
```

### Mainnet Full Node

Linux & Mac - 主网 - 全节点 :

```shell
# Beijing
wget https://conflux-blockchain-bj.oss-cn-beijing.aliyuncs.com/fullnode-db/mainnet/download.sh
# US West
wget https://conflux-blockchain-data-us.s3.us-west-1.amazonaws.com/fullnode-db/M/download.sh

bash download.sh 
```

### Testnet Archive Node

1. Linux & Mac - 测试网 - 归档节点:

```shell
wget https://conflux-blockchain-bj.oss-cn-beijing.aliyuncs.com/archivenode-db/testnet/download.sh
bash download.sh 
```

2. For Windows - 测试网 - 归档节点:

```shell
wget https://conflux-blockchain-bj.oss-cn-beijing.aliyuncs.com/archivenode-db/testnet/download.bat
download.bat 
```

## 解压缩快照数据

接下来，你需要解压文件，并将其内容复制(或移动)到你的节点文件夹，通常命名为"run"。

例如：

```shell
tar -xvzf conflux-fullnode-db-snapshot-2023-09-20.tgz -C ./run
```

快照数据包括`pos_config`文件夹，Conflux客户端版本也包含`pos_config` 文件夹。 你可以选择其中任何一个。

然后，你可以启动你的节点。

## 其他资源

- [Conflux区块链数据快照归档工具](https://github.com/conflux-fans/archive-tool)。

## 常见问题解答

### 服务不可用？

请下载快照工具的最新版本。

### 快照数据的大小是多少？

截至撰写本报告时(2023年12月22日)，全节点快照数据大小约为200GB，存档节点快照数据大小为550GB。

你可以在 `download.sh` 文件中查看最新的快照数据大小。

### 归档节点快照数据是否包含 trace 数据？

是的，包含。

### 归档节点快照数据是否包含全状态数据？

不包含。 如果你想设置一个全状态归档节点，你需要从头同步数据。

Confura公共RPC服务是一个全状态归档节点。 你可以使用它来查询全状态数据。
