---
title: 运行归档节点
sidebar_position: 12
displayed_sidebar: generalSidebar
---

Conflux存档节点存储了Conflux区块链的完整历史记录。 这使它们能够向其他节点和应用程序提供历史数据。

### 1. 硬件要求

#### 存档节点的硬件要求

* 至少32GB的RAM。
* 至少2TB的可用磁盘空间(推荐使用SSD)。
* 稳定的网络连接。

#### 文件限制

打开文件限制：建议将最大打开文件数设置为10,000。 在Linux上，默认值为1,024，可能不足够。 你可以在Linux终端使用如下命令设置该参数。

```shell
ulimit -n 10000 
```

### 2. 配置节点

Conflux节点可以使用CLI选项或配置文件进行配置。 如果CLI标志和配置文件之间存在差异，则**CLI 优先**。

#### 使用配置文件

配置文件采用TOML格式。

使用CLI选项-config path/to/hydra.toml可以设置配置文件的路径。

在**run** 目录中提供了一个名为**hydra.toml** 的默认配置文件，可用作自定义的起点。

在配置文件中将 **node_type** 参数设置为"archive"：

```toml
node_type = "archive" 
```

#### CLI选项

运行$ ./conflux --help以列出所有CLI选项。

大多数CLI的选项会映射到TOML文件的一个设置中。 例如，可以通过 -public-address 127.0.0.1:32323 覆写配置文件的 public_address 部分

### 4. 运行节点

使用自定义配置文件启动节点：

```shell
conflux --config ./run/hydra.toml 
```
