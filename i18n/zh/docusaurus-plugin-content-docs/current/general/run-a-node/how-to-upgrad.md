---
sidebar_position: 4
title: 升级节点
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - node upgrade
  - software update
  - node operation
  - Conflux-Rust
  - release version
  - PoS node
  - forced retirement
  - node restart
  - version check
  - Docker upgrade
  - block synchronization
  - node migration
  - Linux commands
tags:
  - node
---

当节点软件发布新版本时，节点运营者需要升级节点软件以确保其正常运行。

## 如何升级节点

节点更新步骤非常直接。 只需用用新的节点软件（Conflux）替换旧的软件并重新启动。

### 1. 下载新的节点软件

访问[发布页面](https://github.com/Conflux-Chain/conflux-rust/releases) 并下载最新的节点软件。 解压后，你将找到一个名为conflux的可执行文件。

### 2. 停止旧的节点进程

通常，在Linux上，您可以通过按Ctrl + C来停止节点软件。 如果无法停止，您可以使用kill命令强制停止。

如果你正在运行一个PoS节点，则需要采取额外的步骤来防止强制退休。 请参阅[如何安全重启一个PoS节点](/docs/general/mine-stake/stake/safe_node_restart)。

### 3. 替换旧节点软件并启动

将新的节点软件 `conflux` 复制到存放节点软件的目录中，并重新启动节点软件。

## 常见问题解答

### 如何确认节点软件的版本？

```shell
/conflux --version
conflux conflux-rust/v2.3.3-89f0ce5-20231215/x86_64-linux-gnu/rustc1.73.0
```

### 如何知道节点软件何时发布最新版本？

我们将通过论坛、社区和其他渠道通知节点运营者。 您还可以在[发布页面](https://github.com/Conflux-Chain/conflux-rust/releases)上检查最新版本。

### 如果节点在发布新版本后不升级会发生什么？

如果发布的版本是硬分叉版本，则没升级将导致节点无法同步区块，从而导致节点发生故障。 对于非硬分叉的更新，不升级不会产生重大影响，但建议升级，特别是对于bug修复版本。

### 重新启动节点后，将区块数据同步到最新需要多长时间？

如果你的节点在升级前已与最新区块同步，那么节点将在升级后从上次同步的区块开始同步。 It usually takes `several minutes to 30 of minutes`. If not then it may take a `few hours to 2 days` to sync to the latest block.

### 如何迁移节点？

如果需要更换或扩展机器，并且需要将节点数据迁移到新机器上，请将整个节点软件目录复制到新机器上并启动节点软件。

### 如果使用Docker，如何升级？

如果您正在使用Docker，请首先停止Docker容器，然后将Docker镜像更新到最新版本，最后启动Docker容器。