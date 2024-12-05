---
title: 节点常见问题解答
sidebar_position: 13
description: 运行节点的常见问题。
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - node operation
  - 常见问题解答
  - data synchronization
  - 归档节点
  - snapshot tool
  - node data size
  - mining
  - GPU mining
  - PoS node
  - public IP
  - mainnet
  - testnet
  - RPC methods
  - node configuration
  - client software
tags:
  - node
---

## Common

### 从零开始同步数据需要多长时间？

It takes about two month to synchronize the data from beginning. As blockchain data grows, the time required for syncing from scratch will increase.

### 运行一个归档节点时如何快速同步数据？

你可以使用[snapshot-tool](./snapshot-tool.md)下载归档节点的数据快照，使用快照可以将节点数据快速同步到最新数据。

### 当前归档节点数据的大小是多少？

在[这儿](./snapshot-tool#whats-the-snapshot-data-size)查看。

### 如何参与挖矿？

如何要参与Conflux网络的挖矿，通常需要使用GPU，有关详细信息，请点击[详细信息](https://forum.conflux.fun/t/conflux-tethys-gpu-mining-instruction-v1-1-4/3775)。

### 如何运行 PoS 节点？

请参考[这部分](/docs/general/mine-stake/stake/) 。

### 运行 Conflux 节点是否需要公共IP地址？

不需要。

### 主网和测试网的配置文件和节点程序是否相同？它们可以互换使用吗？

主网和测试网的客户端软件和配置文件是不同的，不能互换使用。

### 节点同步期间能调用RPC方法吗？

在节点同步期间，某些RPC方法不可用；建议仅在节点同步过程完成后访问RPC方法。
