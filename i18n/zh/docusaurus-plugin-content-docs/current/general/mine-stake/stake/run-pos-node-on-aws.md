---
sidebar_position: 5
title: Run a PoS Node on AWS
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - PoS 共识机制
  - AWS
  - EC2 instance
  - Ubuntu Server
  - node setup
  - SSH
  - key pair
  - server configuration
  - Conflux client
  - archive node snapshot
  - node synchronization
  - PoW block
  - PoS block
  - hydra.toml
  - PoS encryption password
tags:
  - Staking
---

以下是如何在AWS上搭建Conflux节点的教程。

## 设置AWS实例

在本节中，您将配置并启动一个 AWS EC2 实例，在这个实例中，您将会建立起您自己的Conflux PoS 质押池。

1. 创建或登录您的AWS账户。
2. 在AWS中，转到“服务 > EC2管理控制台”并启动一个新的EC2实例。
3. 选择Ubuntu Server 20.04 64位（x86）镜像，点击选择。 虽然也可以选择其他Linux或Windows基础镜像，但本教程将使用这一镜像。
4. 选择 t2.large 实例类型，然后点击“下一步：配置实例详情”。
5. 保留默认的“配置实例详情”参数，然后点击“下一步：添加存储”。
6. 在“添加存储”中，设置镜像大小为1000 GiB，然后点击“查看和启动”。 :::note  
   之后可以将大小调整为400 GiB，但这将加快节点搭建速度。
:::
7. 查看实例详情并点击“启动”。

您已成功创建并启动了一个 EC2 实例。 现在让我们从本地机器登录它。

## 登录到EC2实例

1. 在本节中，您将第一次登录到EC2实例。
2. 实例创建后，在EC2管理控制台中转到“网络&安全 > 密钥对”。 如果您已经有AWS密钥对，可跳到第6步。
3. 在“密钥对”中，点击“创建密钥对”。
4. 创建并下载密钥对。
5. 创建时，输入密钥对名称（例如，我们输入conflux），然后点击“创建密钥对”。
6. 下载新创建的密钥对。
7. 在EC2管理控制台中转到“实例 > 实例”。
8. 点击新创建的实例ID，查看实例详情。
9. 确保实例状态为“运行中”，复制其公共IPv4地址。
10. 在本地机器的终端中，连接到您的实例： You can do this by typing:

:::note
您需要更改密钥对文件的权限。
:::

```shell
ssh -i <密钥对路径> ubuntu@ <机器的IP地址或IPv4 DNS> 
```

11. 输入您在密钥对中定义的密码。

现在，您已成功登录到您的 EC2 实例！ 让我们登录我们的实例并准备服务器。

## 服务器上的首要步骤

建议先采取以下步骤：

- 更新已安装的应用程序：

```shell
sudo apt-get update
sudo apt-get upgrade
```

- 为您的PoS节点添加一个新的专用用户。
- 并将其添加到sudoers。
- 更改服务器的主机名。

当然，这些步骤不是必需的，因此您可以跳过它们或稍后再做。

现在您已经在您的服务器上完成了这些初步设置， 让我们按照本指南中的首要步骤继续往后，并搭建 Conflux 节点。

## 搭建Conflux节点

在本节中，您将完成下载、安装、配置、运行、同步您的 Conflux 节点。

大概会分为两个步骤

1. 安装和配置 Conflux 客户端。
2. 运行 Conflux 客户端并同步节点。

## 安装和配置Conflux客户端：

1. 下载归档节点快照。 这将帮助我们通过下载链上的最新快照来加速节点同步过程。

:::note
归档节点快照的文件大小大约为200GB。 下载可能需要几个小时。
:::

```shell
wget https://conflux-blockchain-data.oss-cn-beijing.aliyuncs.com/fullnode-db/M/download.sh
```

2. 按照以下步骤[下载](../../run-a-node/advanced-topics/downloading-conflux-client)Conflux客户端预构建二进制文件

3. 将归档节点快照提取到conflux-rust/run

```shell
tar -xvzf <归档节点快照>.tar.gz conflux-rust/run 
```

4. 按照以下步骤配置和[运行Conflux节点](../../run-a-node)

## 运行Conflux客户端并同步节点

In this process, we’ll run a Conflux node. Once the node is running, it will first sync to the latest PoW block. Once this process is done it will then sync to the latest PoS block.

1. Run the Conflux client.

```shell
cd run 
./conflux --config hydra.toml 
```

2. Set a secure PoS encryption password.
3. Wait for the PoS node to sync.

:::note
This step might take a few hours.
:::

You have successfully installed, configured, and ran a fully-synched Conflux PoS node!
