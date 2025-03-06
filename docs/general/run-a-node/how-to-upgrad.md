---
sidebar_position: 4
title: Upgrade a Node
displayed_sidebar: generalSidebar
keywords: [Conflux Network, node upgrade, software update, node operation, Conflux-Rust, release version, PoS node, forced retirement, node restart, version check, Docker upgrade, block synchronization, node migration, Linux commands]
tags: [node]
---

When the node software releases a new version, node operators need to upgrade the node software to ensure its proper functioning.

## How to Upgrade

The upgrade process is straightforward. Simply replace the old node software (Conflux) with the new one and restart.

### 1. Download the New Node Software

Visit the [Release page](https://github.com/Conflux-Chain/conflux-rust/releases) of Conflux-Rust and download the latest node software. After extracting, you will find an executable file named `conflux`.

### 2. Stop the Old Node Process

Typically, on Linux, you can stop the node software by pressing `Ctrl + C`. If it cannot be stopped, you can use the `kill` command to force stop.

If you are running a PoS node, additional steps are required to prevent forced retirement. See [How to Safely Restart a PoS Node](/docs/general/mine-stake/stake/safe_node_restart).

### 3. Replace the Old Node Software and Start

Copy the new node software `conflux` to the directory where the node software is located and restart the node software.

## FAQs

### How to Check the Version of the Node Software?

```shell
/conflux --version
conflux conflux-rust/v2.3.3-89f0ce5-20231215/x86_64-linux-gnu/rustc1.73.0
```

### How to Know When the Node Software Releases the Latest Version?

We will notify node operators through forums, communities, and other channels. You can also check the latest version on the [Release page](https://github.com/Conflux-Chain/conflux-rust/releases).

### What Happens if Nodes Do Not Upgrade After a New Version Release?

If the released version is a hardfork version, not upgrading the nodes will result in the nodes being unable to synchronize blocks, thus causing the nodes to malfunction. For other versions, not upgrading will not have a significant impact, but it is recommended to upgrade, especially for bugfix versions.

### After Restarting the Node, How Long Does It Take to Sync Block Data to the Latest?

If your node was already synchronized with the latest block before the upgrade, the node will sync from the last synchronized block after the upgrade. It usually takes `several minutes to 30 of minutes`. If not then it may take a `few hours to 2 days` to sync to the latest block.

### How to Migrate Nodes?

If the machine needs replacement or expansion, and you need to migrate the node data to a new machine, copy the entire node software directory to the new machine and start the node software.

### How to Upgrade if Using Docker?

If you are using Docker, stop the Docker container first, then update the Docker image to the latest version, and finally, start the Docker container.