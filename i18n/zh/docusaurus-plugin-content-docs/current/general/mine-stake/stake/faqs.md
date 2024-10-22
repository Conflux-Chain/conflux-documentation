---
sidebar_position: 6
title: 常见问题解答
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - PoS 共识机制
  - PoW
  - hybrid consensus
  - node operation
  - forced retirement
  - node restart
  - PoS rewards
  - Core Space
  - eSpace
  - PoS committee
  - voting power
  - node synchronization
  - pos_config
  - pos_db
  - secure_storage
  - stop_election
  - PoS block generation
tags:
  - Staking
---

## Is Conflux PoS node and PoW node use the same client?

Yes, the PoS node and PoW node use the same client. A conflux node works as a PoS node and a PoW node at the same time. And the snapshot data of the PoS and PoW also share the same data.

## 什么是“强制退休”？

如果一个候选人被选入委员会但在两次选举之间没有参与签名，所有锁定的投票将自动解锁。 这可能发生在您的PoS节点由于某种原因处于离线状态时。 In this case, the node's PoS account will be unable to acquire voting power for the following 1-14 days. 这个机制通常被称为*”强制退休“*

## Why my node is force retired?

If a PoS node is elected to the PoS committee but fails to actively participate in voting for PoS blocks and other election-related activities, it will be forcibly retired. The following situations may lead to the forced retirement of a node:

1. PoS node downtime or lag in data synchronization.
2. Mismatch between the `pos_config/pos_key` file and the `pos_db/secure_storage.json` file, resulting in abnormal voting.

The second scenario may occur if the `pos_config/pos_key` file of an existing node is deleted without removing the corresponding `pos_db/secure_storage.json` file. If you need to regenerate the PoS account private key, both of these files need to be deleted together.

## 我可以如何安全地重新启动 PoS 节点？

为了防止在重新启动PoS节点时发生强制退休，建议按照以下步骤进行操作：

1. Run `./conflux rpc local pos stop_election` on the PoS node. 节点将返回`NULL`或未来的PoS区块号。 After running this command, the node will not apply to join the PoS committee in the next term.
2. If the command returns a block number, keep the node running. Run the same command again after the PoS block of the returned block number has been generated (est. several hours later). At this point, the command should return `NULL`. The node will no longer receive PoS rewards after this block.
3. Once the command returns `NULL`, the node can be safely stopped. The PoS voting process will resume to normal automatically after the node has been restarted (est. 2-3 hours to generate new PoS rewards).

## On which chain are PoS rewards distributed?

PoW chain.
