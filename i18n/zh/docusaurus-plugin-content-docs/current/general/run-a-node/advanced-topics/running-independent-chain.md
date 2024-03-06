---
sidebar_position: 13
title: 运行私有链
displayed_sidebar: generalSidebar
---

# 运行私有链

您可能希望在单节点链上运行Conflux以开发和测试智能合约。 您也可以使用多台计算机将Conflux作为私有链来运行。

## 运行单节点开发链

为了运行一个单节点的Conflux链用于开发，您可以按照以下步骤进行：

1. 获取可执行的Conflux二进制文件（使用预编译的二进制文件或从最新的源代码构建） 你可以参考 [下载Conflux客户端](./downloading-conflux-client.md) 文档

2. 创建一个目录并准备一个名为 `development.toml` 的配置文件。 可以复制目录中提供的`hydra.toml`文件，然后根据 [节点配置文件](./configuration-files.md) 的指导进行修改。

3. 将配置文件中的 bootnodes 参数设置为空（或将设置行注释掉）。

4. 将配置文件中的 `mode` 参数设置为 "dev"。 如果您是从`hydra.toml`复制的，您应该会发现该行被注释了，您可以取消注释。

5. 设置`dev_block_interval_ms`参数为您想要的区块生成间隔。 在开发模式下，Conflux会以固定间隔自动生成区块。

6. 使用`development.toml`作为配置文件运行Conflux二进制文件。 例如：

```bash
$ ./conflux --config development.toml
```

## 运行多节点生产链

要拥有自己的Conflux链，并在生产模式下拥有多个节点，您需要确保您的节点可以连接到这个链中的其他节点，并且不会连接到其他链（如Conflux的测试网）。

为此，您应该设置自己的启动节点，并让其他节点连接到它。 然后，它们将通过我们的发现协议连接到其他节点。

您需要启动节点的IP地址、端口号和节点ID，以便其他节点连接。 节点ID是网络层用于识别的节点唯一私钥对应的公钥。 以下是让启动节点自动生成其私钥并通过日志文件获取节点ID的指导。

## A Simple Instruction

1. 获取可执行的Conflux二进制文件（使用预编译的二进制文件或从最新的源代码构建） 你可以参考 [下载Conflux客户端](./downloading-conflux-client.md) 文档

2. 创建一个目录，并为启动节点准备一个配置文件`bootnode.toml`（如果未设置，默认端口为32323）。 您可以参考[节点配置文件](./configuration-files.md)文档。

```bash
确保 `bootnode.toml` 不包含 `bootnode` 条目，并且 `network` 的日志级别至少为 `debug` 。

$ mkdir run
$ cd run
# 将Conflux可执行文件`conflux`和配置文件`bootnode.toml`放在`run`下


如果您是基于我们提供的hydra.toml进行编辑，需要注释掉bootnode条目。 否则节点将连接到现有的Conflux网络。
```

3. 启动bootnode，并在控制台打印中找到节点ID。 节点ID的信息为`Self node id: $ID`，其中`$ID`是此启动节点的0x前缀节点ID。 去掉0x前缀后，您将获得节点ID `$NODEID`。 如果您错过了屏幕上的行，可以使用以下命令查看日志文件：

```bash
grep "Self node id" log/conflux.log|awk '{print $9}'|sed -e "s/^0x//"
```
4. 现在我们有启动节点的`$IP`、`$PORT$`和`$NODEID`，我们可以使用格式`cfxnode://$NODEID@$IP:$PORT`获取此启动节点的URL。 记为`$BOOTNODE_URL`。

5. 通过在配置中设置`bootnodes="$BOOTNODE_URL"`启动其他节点。

注意，根据上述指导，连接到启动节点的其他节点将在一段时间内（默认为3天）保持不受信任状态，并且在我们的发现协议中不受信任的节点不会被广播。 因此，在其他节点被提升为受信任状态之前，网络结构将是以启动节点为中心的星形。 You can change `node_table_promotion_timeout_s` in the configurations to make this period shorter.

## 设置多个启动节点（Bootnodes）

您也可以在一开始就设置多个启动节点。 然而，这不能通过简单地多次重复上述启动节点设置步骤来完成，因为您需要在启动每个启动节点之前设置它们的`启动节点`。

一种实现方法是启动这些启动节点然后立即停止它们。 然后收集它们的节点ID，设置它们的配置，并重新启动所有节点。

另一种更好的方法是分别生成它们的私钥，并手动设置它们的`net_key`以启动。 这可以通过我们的python测试框架中提供的函数来完成，在`test`目录下。

```js
from conflux.utils import *

num_of_bootnodes=10
for _ in range(num_of_bootnodes):
    pri_key, pub_key = ec_random_keys()
    node_id = encode_hex(encode_int32(pub_key[0]) + encode_int32(pub_key[1]))
    print(encode_hex(pri_key), node_id)
```
然后您可以用生成的节点ID构建启动节点URL，并通过将`net_key="$NET_KEY"`字段设置为私钥或通过命令行选项`--net-key $NET_KEY`来启动每个节点。

## 设置创世账户（Genesis Accounts）

在生产环境中，您可以通过将`genesis_accounts`设置为一个帐户文件来初始化初始创世状态，格式如下：

```js
0f947e34fc907008968ec99baa1dbb677b927531="1000000000000"
ab4a32bca7500d94a2cc1f3150e12686c692c590="1000000000000"
```

每行是一个账户。 键是账户地址，值是表示其余额的字符串（单位为Drip）。 请注意，如果`mode`是`测试（test）`或`开发（dev）`，则`genesis_accounts`不适用。

如果`mode`是`test` 或 `dev`，您可以通过设置`genesis_secrets`来用它们的私钥设置初始账户。 每行是一个没有0x前缀的账户私钥。 The balance of each account is set to `10000000000000000000000` by default.
