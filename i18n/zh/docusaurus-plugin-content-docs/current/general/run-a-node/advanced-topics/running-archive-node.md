---
title: 运行归档节点
sidebar_position: 12
displayed_sidebar: generalSidebar
---

# 运行归档节点



## Introduction

There are three types of Conflux nodes: archivenode, fullnode, and lightnode. The distinction between these nodes is based on the amount of data they store, with the archive node storing the most data.

### 1. Node Types and Requirements

#### 1.1 Archive Node vs Full Node

Archive Node: This node type stores the most data and is essential if you want to use it as an RPC service.

Full Node: Suitable for those who want to participate in mining. It stores less data compared to the archive node.

Light Node: Primarily used as a wallet and stores the least amount of data.

#### 1.2 Hardware Requirements for Archive Node

* At least 16GB of RAM.

* A minimum of 2TB free disk space (SSD is recommended).

* A stable internet connection.

Open Files Limit: It's recommended to set the maximum number of open files to 10,000. On Linux, the default is 1,024, which may be insufficient. You can configure this using the following command on the Linux terminal

```
ulimit -n 10000 
```

### 2. Configuring the Node

Conflux nodes can be configured using either CLI options or a configuration file. If there's a discrepancy between the CLI flags and the config file, the CLI takes precedence.

#### 2.1 Using Configuration File

The configuration file follows the TOML format.

The path for the configuration file can be set using the CLI option -config path/to/hydra.toml.

A default configuration file named hydra.toml is provided in the run directory, which can be used as a starting point for customization.

Set the mode parameter in the configuration file to "archive":

```
mode = "archive" 
```
#### 2.2 CLI Options

List all CLI options by running $ ./conflux --help.

Most CLI options map to a setting in the TOML file. For instance, -public-address 127.0.0.1:32323 can be set in the config file under public_address.


### 4. Running the Node

Start the node with the custom configuration file:

```
./target/release/conflux --config ./run/hydra.toml 
```
