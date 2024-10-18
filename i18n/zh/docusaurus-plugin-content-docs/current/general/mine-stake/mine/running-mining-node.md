---
sidebar_position: 1
title: 运行矿工节点
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - mining
  - PoW
  - GPU mining
  - NVIDIA GPU
  - mining node
  - fullnode
  - cfxmine
  - Hydra network
  - Windows mining
  - Linux mining
  - mining configuration
  - mining wallet
  - remote mining
  - stratum protocol
tags:
  - 挖矿
---

## Conflux网络PoW（工作量证明）- GPU挖矿指南

网络：Conflux Hydra

版本：v2.2.1-fixpos

显卡类型：NVIDIA GPU

显存容量：8GB或更多

安装NVIDIA驱动程序：[下载链接](https://www.nvidia.cn/Download/index.aspx?lang=cn)

## 下载最新版本
要下载Conflux节点的最新版本，请参考以下链接：https://github.com/Conflux-Chain/conflux-rust/releases


## Windows 测试指南
注意：

1. 建议关闭防病毒软件。
2. 需要Win 10, version 1903 或者更高

## 运行文件

1. **cfxmine.win.zip: 挖矿程序：[点击查看Conflux PoW挖矿算法](https://github.com/Conflux-Chain/open-cfxmine/releases)
2. **conflux_v2.2.1-fixpos.zip：全节点程序：**[点击查看全节点程序](https://github.com/Conflux-Chain/conflux-rust/releases)

## 准备运行 Conflux
1. 创建一个名为“conflux”的目录
2. 解压下载包到目录
3. 请下载 pos_config 包并将解压后的文件夹移动到运行目录

:warning: 目录结构应如下所示：

```
conflux
└── run
    └── pos_config
    └── conflux.exe
    └── conflux.pdb
    └── hydra.toml
    └── log.yaml
    └── clear_state.bat
    └── clear_state.sh
    └── libcrypto-1_1-x64.dll
    └── libssl-1_1-x64.dll
    └── start.bat
    └── start.sh
    └── throttling.toml
```

注意：之前的 tethys.toml 已更改为 hydra.toml。


## 配置说明

如果您只运行 PoS 节点，这里无需进行任何修改； 如果您计划运行 GPU 挖矿软件，您需要编辑 hydra.toml 文件以进行配置设置。

```
# mining_author="cfx:xxxxxxxxxx..."
```

请将 "cfx:xxxx..." 修改为您自己的钱包地址，并删除 "mining_author..." 前面的 "#" 符号。


## 运行 GPU 挖矿程序

Conflux GPU 挖矿程序 **cfxmine** 需要与 Conflux 全节点程序一起运行。 按照以下步骤：

- 在命令提示符（cmd）中打开 **run** 可执行文件所在的目录，并启动全节点，请按照以下步骤操作：

```bash
cd conflux\run
conflux --config hydra.toml --full 2>stderr.txt
```

然后就可以开始挖矿了。

- 在命令提示符（cmd）中打开 cfxmine 可执行文件，并启动 Conflux GPU 挖矿程序，请按照以下步骤操作：

```bash
cd conflux
cfxmine --gpu 1
```

注意：在完成全节点的同步之后，才执行 GPU 命令行。

## Linux测试指南

**运行文件**

- **cfxmine.linux.gz:** [Mining ProgramClick to see Conflux PoW Mining Algorithm](https://github.com/Conflux-Chain/open-cfxmine/releases)
- **conflux_linux_v2.2.1-fixpos：全节点程序** \[点击查看全节点程序\] (https://github.com/Conflux-Chain/conflux-rust/releases)
- （与先前版本的区别：在主网发布中，default.toml 将被重命名为 tethys.toml，在测试网中将被命名为 testnet.toml。）

## 准备运行 Conflux

1. 创建一个名为“conflux”的目录
2. 解压下载包到目录
3. 请下载 pos_config 包并将解压后的文件夹移动到运行目录。

:warning: 目录结构应如下所示：

```
conflux
└── run
    └── pos_config
    └── conflux.exe
    └── conflux.pdb
    └── hydra.toml
    └── log.yaml
    └── clear_state.bat
    └── clear_state.sh
    └── libcrypto-1_1-x64.dll
    └── libssl-1_1-x64.dll
    └── start.bat
    └── start.sh
    └── throttling.toml
```

注意：之前的 tethys.toml 已更改为 hydra.toml。

## 配置说明

请使用文本编辑器打开 `run/hydra.toml` 文件，并配置与挖矿相关的参数。

```
# mining_author="cfx:xxxxxxxxxx..."
```

请将 "cfx:xxxx..." 修改为您自己的钱包地址，并删除 "mining_author..." 前面的 "#" 符号。


## 运行 GPU 挖矿程序

Conflux GPU 挖矿程序 **cfxmine** 需要与 Conflux 全节点程序一起运行。 按照以下步骤：

- 在 Bash（或任何符合 POSIX 标准的 Shell）中，启动全节点，请按照以下步骤操作：

```bash
cd conflux/run
./conflux --config hydra.toml --full 2>stderr.txt
```

然后就可以开始挖矿了。

- 在 Bash（或任何符合 POSIX 标准的 Shell）中打开 cfxmine 可执行文件所在的目录，并启动 Conflux GPU 挖矿程序，请按照以下步骤操作：

```bash
cd conflux
./cfxmine --gpu 1
```

注意：在完成全节点的同步之后，才执行 GPU 命令行。

## 温馨提示：

如果 Conflux 全节点程序和 **cfxmine** 不在同一台计算机上，您可以在启动 cfxmine 时指定远程 Conflux 全节点程序的 IP 地址和端口（默认为 32525）。

```
./cfxmine --gpu --addr A.B.C.D
```

或者

```
./cfxmine --gpu --addr A.B.C.D --port xxxx
```

如果您希望指定远程节点，您需要将节点的配置更改为：stratum_listen_address="0.0.0.0"，并删除 # 符号。

注意：在完成全节点的同步之后，才执行 GPU 命令行。
