---
sidebar_position: 3
title: Snapshot Tool
description: Learn how to use the Conflux Snapshot Tool to quickly set up a Conflux node from a snapshot.
displayed_sidebar: generalSidebar
---

## Introduction

The Conflux Blockchain Data [Snapshot Tool (aka Archive-Tool)](https://github.com/conflux-fans/archive-tool) is designed to help users quickly set up a Conflux node from a snapshot. This tool provides the download links, and by default, it downloads the DB snapshot data of the current day. The Snapshot tool can help save weeks of time required to download and sync all the blockchain data at the moment of running a node. Using this tool is optional, **but highly recommended**. The tool supports **resuming downloads** from breakpoints using the curl command. If an error occurs during the process, users are advised to follow the script prompts.

## Prerequisites

Ensure you have curl installed on your system. If not, you can download and install it from [here](https://curl.se/).

## Download Snapshot Data

Select the snapshot download link based on the node type and location:

### Mainnet Archive Node

1. For Linux & Mac - Mainnet - Archive Node:

```shell
# Beijing
wget https://conflux-blockchain-bj.oss-cn-beijing.aliyuncs.com/archivenode-db/mainnet/download.sh
# US West
wget https://conflux-blockchain-data-us.s3.us-west-1.amazonaws.com/archivenode-db/M/download.sh
# EU Central
wget https://conflux-blockchain-data-eu.s3.eu-central-1.amazonaws.com/archivenode-db/M/download.sh

bash download.sh 
```
  
2. For Windows - Mainnet - Archive Node:

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
  
For Linux & Mac - Mainnet - Full Node:

```shell
# Beijing
wget https://conflux-blockchain-bj.oss-cn-beijing.aliyuncs.com/fullnode-db/mainnet/download.sh
# US West
wget https://conflux-blockchain-data-us.s3.us-west-1.amazonaws.com/fullnode-db/M/download.sh

bash download.sh 
```

### Testnet Archive Node

1. For Linux & Mac - Testnet - Archive Node:

```shell
wget https://conflux-blockchain-bj.oss-cn-beijing.aliyuncs.com/archivenode-db/testnet/download.sh
bash download.sh 
```

2. For Windows - Testnet - Archive Node:

```shell
wget https://conflux-blockchain-bj.oss-cn-beijing.aliyuncs.com/archivenode-db/testnet/download.bat
download.bat 
```

## Unzip Snapshot Data

Then, you’ll need to unzip the file, and copy (or move) its content into your node folder, usually named "run". 

For example:

```shell
tar -xvzf conflux-fullnode-db-snapshot-2023-09-20.tgz -C ./run
```

The snapshot data also includes the `pos_config` folder, and the Conflux client release will also include the `pos_config` folder. You can use either one.

Then you can start your node.

## Resources

- [Conflux Blockchain Data Snapshot Archive-tool](https://github.com/conflux-fans/archive-tool).

## FAQs

### service is not available?

Please download the latest version of the snapshot tool.

### What's the snapshot data size?

At the time of writing(2023.12.22), the fullnode snapshot data size is about 200G, the archivenode snapshot data size is 550G.

You can check the newest snapshot data size in `download.sh` file.

### Does the archive node snapshot data include the trace data?

Yes, it does.

### Does the archive node snapshot data include the fullstate data?

No, it doesn't. If you want to setup a fullstate archive node, you need sync the data from beginning.

The Confura public RPC service is a fullstate archive node. You can use it to query the fullstate data.
