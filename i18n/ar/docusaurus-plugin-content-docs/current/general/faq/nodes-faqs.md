---
title: Nodes FAQs
sidebar_position: 3
displayed_sidebar: generalSidebar
---

# Nodes FAQs

### Why does synchronization take a long time after restart?

After a node is restarted, it synchronizes data from the last checkpoint and replays block data. It will take different amounts of time according to the distance to the last checkpoint. After that, it will start synchronizing from the latest block.

It’s normal, generally it will take a few minutes to more than ten minutes.

### Why does the block height stop increasing?

If the block height stops increasing, you can check the log or terminal to determine whether there is any error. If there is no error, it is most likely due to network reasons, you can try to restart the node.

### After the configuration is modified, do I need to clear the data when restarting the node?

Depending on the situation, sometimes it does, sometimes it doesn’t. If the configuration involves data store or data index, you need to restart the node if the configuration changes, for example:

- `persist_tx_index`
- `executive_trace`
- `persist_block_number_index`

Other restart are generally not required.

### What is the size of the current archive node data?

Up to 2023.10.30, the block data compression package size is around 950 GB

### How to get involved in mining?

Mining requires GPU, you can see here for [details](https://forum.conflux.fun/t/conflux-tethys-gpu-mining-instruction-v1-1-4/3775)

### How to synchronize data quickly to run an archive node?

You can use [fullnode-node 64](https://github.com/conflux-fans/fullnode-tool) to download the data snapshot of the archive node, node data can be quickly synchronized to the latest data using a snapshot.

### How to check the error log?

If you run the node through `start.sh`, you can check the error log in `stderr.txt` in the same directory.

### How to run a PoS node?

Refer to [THIS](../mine-stake/stake/run-pos-node) section.
