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

3. Launch the bootnode, and find the node id in the console print out. The information for node id is `Self node id: $ID` where `$ID` is the 0x-prefixed node id of this bootnode. Remove the 0x prefix and you'll get the node id `$NODEID`. If you missed the line from the screen, you can look at the log file with:

```bash
grep "Self node id" log/conflux.log|awk '{print $9}'|sed -e "s/^0x//"
```
4. Now we have the `$IP`, `$PORT$`, and `$NODEID` of the boot node, we can get the url for this boot node with the format `cfxnode://$NODEID@$IP:$PORT`. Denote this as `$BOOTNODE_URL`.

5. Start other nodes by setting `bootnodes="$BOOTNODE_URL"` in their configuration.

Note that with the instruction above, other nodes connected to the boot node will stay in untrusted state for a while (3 days by default), and untrusted nodes will not be broadcast in our discovery protocol. Thus, the network structure will be a star with the boot node in the center before other nodes are promoted to trusted state. You can change `node_table_promotion_timeout_s` in the configurations to make this period shorter.

## Setting Multiple Bootnodes

You can also setup multiple bootnodes at the very beginning. However, this cannot be done by simply replaying the boot node setup steps above multiple times, because you need to set `bootnodes` of every boot node before they are started.

One way to achieve this is to start these bootnodes and stop them immediately. Then gather their node ids, set their configuration, and restart them all.

Another better way is to generate their private keys seperately, and manually set their `net_key` to start. This can be done with the functions provided in our python test framework in the directory `test`.

```js
from conflux.utils import *

num_of_bootnodes=10
for _ in range(num_of_bootnodes):
    pri_key, pub_key = ec_random_keys()
    node_id = encode_hex(encode_int32(pub_key[0]) + encode_int32(pub_key[1]))
    print(encode_hex(pri_key), node_id)
```
Then you can construct the bootnode url with the generated node id, and start each node by setting the `net_key="$NET_KEY"` field to the private key or pass it with the command line option `--net-key $NET_KEY`.

## Setting Genesis Accounts

In a production environment, you can initialize the initial genesis state with your accounts by setting the `genesis_accounts` to an account file with formats like

```js
0f947e34fc907008968ec99baa1dbb677b927531="1000000000000"
ab4a32bca7500d94a2cc1f3150e12686c692c590="1000000000000"
```

Every line is an account. The key is the account address, and the value is a string representing its balance in Drip. Note that `genesis_accounts` does not apply if `mode` is `test` or `dev`.

If the `mode` is `test` or `dev`, you can setup the genesis accounts with their secret keys by setting `genesis_secrets`. Each line is an account private key without 0x-prefix. The balance of each account is set to `10000000000000000000000` by default.
