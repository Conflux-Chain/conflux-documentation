---
title: Running an Archive Node
sidebar_position: 12
displayed_sidebar: generalSidebar
tags:
  - node
---

Conflux archive nodes store the entire history of the Conflux blockchain. This allows them to serve historical data to other nodes and applications.

### 1. Requirements

#### Hardware Requirements for Archive Node

* At least 32GB of RAM.
* A minimum of 2TB free disk space (SSD is recommended).
* A stable internet connection.

#### File Limit

Open Files Limit: It's recommended to set the maximum number of open files to 10,000. On Linux, the default is 1,024, which may be insufficient. You can configure this using the following command on the Linux terminal

```shell
ulimit -n 10000 
```

### 2. Configuring the Node

Conflux nodes can be configured using either CLI options or a configuration file. If there's a discrepancy between the CLI flags and the config file, **the CLI takes precedence**.

#### 2.1 Using Configuration File

The configuration file follows the TOML format.

The path for the configuration file can be set using the CLI option -config path/to/hydra.toml.

A default configuration file named **hydra.toml** is provided in the **run** directory, which can be used as a starting point for customization.

Set the **node_type** parameter in the configuration file to "archive":

```toml
node_type = "archive" 
```

#### 2.2 CLI Options

List all CLI options by running $ ./conflux --help.

Most CLI options map to a setting in the TOML file. For instance, -public-address 127.0.0.1:32323 can be set in the config file under public_address.

### 4. Running the Node

Start the node with the custom configuration file:

```shell
conflux --config ./run/hydra.toml 
```
