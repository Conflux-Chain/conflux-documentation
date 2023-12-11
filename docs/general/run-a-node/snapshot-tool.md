---
sidebar_position: 3
title: Snapshot Tool
description: Learn how to use the Conflux Snapshot Tool to quickly set up a Conflux node from a snapshot.
displayed_sidebar: generalSidebar
---

## Introduction

The Conflux Blockchain Data Snapshot Tool (aka Archive-Tool) is designed to help users quickly set up a Conflux node from a snapshot. This tool provides the download links, and by default, it downloads the DB snapshot data of the current day. The Snapshot tool can help save weeks of time required to download and sync all the blockchain data at the moment of running a node. Using this tool is optional, **but highly recommended**. The tool supports resuming downloads from breakpoints using the curl command. If an error occurs during the process, users are advised to follow the script prompts.

## Prerequisites

Ensure you have curl installed on your system. If not, you can download and install it from [here](https://curl.se/).

## Download Snapshot Data

1. For Linux & Mac - Mainnet - Archive Node:

```shell
wget https://conflux-blockchain-data.oss-cn-beijing.aliyuncs.com/archivenode-db/M/download.sh
wget https://conflux-blockchain-data-us.s3.us-west-1.amazonaws.com/archivenode-db/M/download.sh
wget https://conflux-blockchain-data-eu.s3.eu-central-1.amazonaws.com/archivenode-db/M/download.sh
bash download.sh 
```
  
2. For Windows - Mainnet - Archive Node:

```shell
wget https://conflux-blockchain-data.oss-cn-beijing.aliyuncs.com/archivenode-db/M/download.bat
wget https://conflux-blockchain-data-us.s3.us-west-1.amazonaws.com/archivenode-db/M/download.bat
get https://conflux-blockchain-data-eu.s3.eu-central-1.amazonaws.com/archivenode-db/M/download.bat
download.bat 
```
  
3. For Linux & Mac - Mainnet - Full Node:
```shell
wget https://conflux-blockchain-data.oss-cn-beijing.aliyuncs.com/fullnode-db/M/download.sh
bash download.sh 
```
  
4. For Linux & Mac - Testnet - Archive Node:
```shell
wget https://conflux-blockchain-data.oss-cn-beijing.aliyuncs.com/archivenode-db/T/download.sh
bash download.sh 
```

5. For Windows - Testnet - Archive Node: 
```shell
wget https://conflux-blockchain-data.oss-cn-beijing.aliyuncs.com/archivenode-db/T/download.bat
download.bat 
```

## Unzip Snapshot Data

Then, you’ll need to unzip the file, and copy (or move) its content into your node folder, usually named "run". 

For example:

```shell
tar -xvzf conflux-fullnode-db-snapshot-2023-09-20.tgz ./run
```

The snapshot data also includes the `pos_config` folder, and the Conflux client release will also include the `pos_config` folder. You can use either one.

Then you can start your node.

## Resources

- [Conflux Blockchain Data Snapshot Archive-tool](https://github.com/conflux-fans/archive-tool).

## FAQs

### service is not available?

Please download the latest version of the snapshot tool.