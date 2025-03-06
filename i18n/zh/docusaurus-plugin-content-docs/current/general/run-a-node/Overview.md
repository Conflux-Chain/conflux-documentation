---
title: 概览
sidebar_position: 0
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - node operation
  - decentralization
  - PoW mining
  - PoS staking
  - RPC node
  - Conflux-rust
  - client software
  - network security
  - transaction validation
  - block verification
  - node types
  - node setup
  - node configuration
  - snapshot tool
  - troubleshooting
tags:
  - node
---

Conflux是一组运行着特定软件的计算机（即节点）组成的分布式网络，该软件用于验证区块和交易数据。 该软件必须在你的计算机或服务器上运行，以将其转变为Conflux节点。

"节点"是任何一个Conflux客户端软件实例，它连接到其他同样运行Conflux软件的计算机，形成一个网络。 客户端是Conflux的一种实现，可以根据协议规则验证数据并保持网络安全。

[Conflux-rust](https://github.com/conflux-chain/conflux-rust)是由Conflux基金会开发的用Rust语言实现的高性能Conflux协议客户端。 它是Conflux网络的核心组件，负责验证区块和交易数据。

如果你希望**为Conflux网络的去中心化**做出贡献，参与**PoW挖矿，PoS质押**，或设置**自己的RPC节点**，你需要运行一个Conflux节点。

下面是一个视频，讲述了节点是什么、为什么重要以及如何运行一个节点：

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="youtube" label="Running a Conflux Node">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/ocsbQRkL9fQ?si=wRmI5Aa6Ewfv-BCx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
    </iframe>
  </TabItem>
</Tabs>

## 运行你自己的节点

你可以跟随["运行一个节点"](./run-a-node.md)指南，在你的计算机或服务器上快速建立一个Conflux节点。

我们为每一个步骤提供了详细文档：

- [节点类型](./node-types.md)之间的区别
- 如何[下载](./advanced-topics/downloading-conflux-client.md)或者[编译](./advanced-topics/compiling-conflux-client.md)Conflux软件
- 我们提供Conflux客户端的[docker镜像](./advanced-topics/downloading-conflux-client#docker)
- 使用[快照](./snapshot-tool.md)加速同步
- 常见的[配置选项](./advanced-topics/node-configuration.md)解释
- 用于主网的[配置文件模板](./advanced-topics/configuration-files.md)和[主网启动节点列表](./advanced-topics/official-bootnodes.md)
- 如何[搭建私有链](./advanced-topics/running-independent-chain.md)

如果您遇到任何问题，请查看[常见问题解答](./nodes-faqs.md)和[故障排除](./TroubleShooting)页面。