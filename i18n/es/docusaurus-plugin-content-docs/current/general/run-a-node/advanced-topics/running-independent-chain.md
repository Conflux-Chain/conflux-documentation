---
sidebar_position: 13
title: Running an Independent Chain
displayed_sidebar: generalSidebar
---

# Run an Independent Chain

You may want to run Conflux on a single node chain to develop and test smart contracts. You can run Conflux as your independent chain with several machines.

## Run Single Node Development Chain

In order to run a single node Conflux chain for development, you can follow the following steps:

1. Get executable Conflux binary file (use precompiled binary or build from the latest source code). You can refer to the document [Downloading](./downloading-conflux-client.md).
2. Create a directory and prepare a configuration file `devnode.toml`. You can copy the `hydra.toml` provided in the directory and start from there following the guide [Configuration Files](./configuration-files.md).
3. Set the `bootnodes` parameter in the configuration file to empty (or comment the setting line).
4. Set the `mode` parameter to "dev". If you copy from `hydra.toml`, you should find the line being commented and you can uncomment it.
5. Set the `dev_block_interval_ms` parameter to the block generation interval you want. In the development mode, Conflux will automatically generate a block in a fixed interval.
6. Generate PoS related configurations according [this guide](https://github.com/Conflux-Chain/conflux-docker/blob/master/docs/about-dev-node-config.md#how-to-generate-pos_config-files)
7. Set history CIPs enable height to make sure the history CIPs are enabled. Check [here for an example](https://github.com/Conflux-Chain/conflux-docker/blob/master/docs/about-dev-node-config.md#how-to-enable-cips).
8. Run Conflux binary with `devnode.toml` as the configuration file. Por ejemplo:

```bash
$ ./conflux --config devnode.toml
```

You can download all sample configuration file [here](https://github.com/Conflux-Chain/conflux-docker/tree/master/fullnode-configs/dev-node)

## Run Multiple Node Production Chain

To have your independent Conflux chain with multiple nodes in the production mode, you need to ensure that your nodes can be connected to other nodes in this chain, and will not connect to other chains (like our testnet).

To achieve this, you should setup your own boot node, and let other nodes connect to it. Then they will connect to others with our discovery protocol.

You need the IP address, the port number, and the node id of the bootnode for others to connect. The node id is the public key corresponding the node's unique private key for identification at the network layer. And here is an instruction to let the bootnode generate its private key automatically, and get the node id through the log file.

## A Simple Instruction

1. Get executable Conflux binary file (use precompiled binary or build from the latest source code). You can refer to the document [Downloading](./downloading-conflux-client.md).

2. Create a directory and prepare a configuration file `bootnode.toml` for the bootnode (the default port is 32323 if not set). You can refer to [Configuration Files](./configuration-files.md).

```bash
Ensure that `bootnode.toml` does not contain the `bootnode` entry, and the
log level for `network` is at least `debug`.

$ mkdir run
$ cd run
# Put Conflux executable `conflux` and the configuration file `bootnode.toml` under `run`


If you are editing based on our provided `hydra.toml`, you need to
comment out the `bootnode` entry. Otherwise the node will connect to the
existing Conflux net.
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
