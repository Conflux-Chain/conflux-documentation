---
title: Overview
sidebar_position: 0
displayed_sidebar: generalSidebar
tags: [Conflux Network, node operation, decentralization, PoW mining, PoS staking, RPC node, Conflux-rust, client software, network security, transaction validation, block verification, node types, node setup, node configuration, snapshot tool, troubleshooting]
---

Conflux is a distributed network of computers (known as nodes) running software that can verify blocks and transaction data. The software must be run on your computer or server to turn it into an Conflux node.

A "node" is any instance of Conflux client software that is connected to other computers also running Conflux software, forming a network. A client is an implementation of Conflux that verifies data against the protocol rules and keeps the network secure. 

[Conflux-rust](https://github.com/conflux-chain/conflux-rust) is a high-performance Conflux protocol client implemented in the Rust language, developed by the Conflux Foundation. It serves as a core component of the Conflux network, responsible for validating block and transaction data.

If you want to **contribute to the decentralization of the Conflux network**, participate in **PoW mining, PoS staking**, or set up **your own RPC node**, you need to run a Conflux node.

Here is a video about what's a node, why it's important, and how to run a node:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="youtube" label="Running a Conflux Node">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/ocsbQRkL9fQ?si=wRmI5Aa6Ewfv-BCx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
    </iframe>
  </TabItem>
</Tabs>

## Running your own node

Follow guide ["run a node"](./run-a-node.md) to quickly set up a Conflux node on your computer or server.

We also provider detail documentation for every step:

* The difference between [node types](./node-types.md)
* How to [download](./advanced-topics/downloading-conflux-client.md) or [compile](./advanced-topics/compiling-conflux-client.md) the Conflux software
* We also provide [docker image](./advanced-topics/downloading-conflux-client#docker) for Conflux client
* Use [snapshot](./snapshot-tool.md) to accelerate the synchronization process
* The common [configuration options](./advanced-topics/node-configuration.md) explained
* A [configuration file template](./advanced-topics/configuration-files.md) for mainnet, and [mainnet bootnodes list](./advanced-topics/official-bootnodes.md)
* How to [setup a private chain](./advanced-topics/running-independent-chain.md)

If you have encountered any problem, please check [FAQs](./nodes-faqs.md) and [troubleshooting](./TroubleShooting) page.