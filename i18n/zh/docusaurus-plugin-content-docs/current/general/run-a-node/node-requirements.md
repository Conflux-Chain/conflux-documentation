---
sidebar_position: 1
title: Node Requirements
---

Conflux is a fully decentralized network based on PoW (proof of work). If you want to participate in mining of this decentralized network, or have your own RPC service, you need to run a Node (also called a client).This article shows you how to run a Conflux node.

## Archivenode VS fullnode
There are 3 types of Conflux nodes : archivenode, fullnode and lightnode. The difference between three types of nodes lies in the amount of data reserved for storage. The archive node takes the most and the light node takes the least. Of course, more data consumes more hardware resources. Click here for detailed information of nodes.

In general, if you want to participate in mining, a fullnode will suffice . you need to run an archivenode if you want to use it as RPC service. The lightnode is mainly used as a wallet.

## Hardware Requirements
- The hardware requirement to run an archivenode are roughly as follows:

- CPU: 4 Cores
- RAM: 16GB
- Hard Disk: 1,5TB

Fullnode has a lower HDD requirement (1TB) and requires a discrete graphics card if you want to participate in mining.

In addition, the maximum number of open files are advised to set to 10000. In Linux, the default value is 1024, which is insufficient.