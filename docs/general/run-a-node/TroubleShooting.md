---
title: Trouble Shooting
sidebar_position: 14
description: How to solve common problems
displayed_sidebar: generalSidebar
---

## Node Startup

### illegal instruction?

## Node Sync

### How to determine if a node is running properly?

### How to determine if a node is synchronized to the latest block?

### Why is my node not synchronizing?

### Why does synchronization take a long time after restart?

After a node is restarted, it synchronizes data from the last checkpoint and replays block data. It will take different amounts of time according to the distance to the last checkpoint. After that, it will start synchronizing from the latest block.

It’s normal, generally it will take a few minutes to more than ten minutes.

### Why does the block height stop increasing?

If the block height stops increasing, you can check the log or terminal to determine whether there is any error. If there is no error, it is most likely due to network reasons, you can try to restart the node.

### How to check the error log?

If you run the node through `start.sh`, you can check the error log in `stderr.txt` in the same directory.