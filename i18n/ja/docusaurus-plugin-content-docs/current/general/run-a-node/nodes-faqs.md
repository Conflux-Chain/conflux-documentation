---
title: Nodes FAQs
sidebar_position: 13
description: Frequently asked questions about running a node.
displayed_sidebar: generalSidebar
---

## Common

### How long does it take to synchronize the data from beginning?

It takes about 3 weeks to synchronize the data from beginning.

### How to synchronize data quickly to run an archive node?

You can use [snapshot-tool](./snapshot-tool.md) to download the data snapshot of the archive node, node data can be quickly synchronized to the latest data using a snapshot.

### What is the size of the current archive node data?

Check it at [HERE](./snapshot-tool#whats-the-snapshot-data-size)

### How to get involved in mining?

Mining requires GPU, you can see here for [details](https://forum.conflux.fun/t/conflux-tethys-gpu-mining-instruction-v1-1-4/3775)

### How to run a PoS node?

Refer to [THIS](/docs/general/mine-stake/stake/) section.

### Does running a Conflux node requires a public IP address?

No

### Are the configuration files and node programs the same for the mainnet and testnet, and can they be used interchangeably?

The mainnet and testnet's client software and configuration files are different, and cannot be used interchangeably.

### Can I invoke RPC methods during node synchronization?

Some RPC methods are unavailable during node synchronization; it is advisable to access RPC methods only after the node synchronization process is complete.
