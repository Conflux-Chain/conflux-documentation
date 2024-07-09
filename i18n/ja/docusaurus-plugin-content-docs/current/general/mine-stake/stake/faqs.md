---
sidebar_position: 6
title: FAQs
displayed_sidebar: generalSidebar
---

## Is Conflux PoS node and PoW node use the same client?

Yes, the PoS node and PoW node use the same client. A conflux node works as a PoS node and a PoW node at the same time. And the snapshot data of the PoS and PoW also share the same data.

## What is forced retirement?

If a candidate is elected to join the committee but does not participate in signing between two elections, all the locked votes will unlock automatically. This can happen if your PoS node is offline for some reason. In this case, the node's PoS account will be unable to acquire voting power for the following 1-14 days. This mechanism is often referred to as *forced retirement*.

## Why my node is force retired?

If a PoS node is elected to the PoS committee but fails to actively participate in voting for PoS blocks and other election-related activities, it will be forcibly retired. The following situations may lead to the forced retirement of a node:

1. PoS node downtime or lag in data synchronization.
2. Mismatch between the `pos_config/pos_key` file and the `pos_db/secure_storage.json` file, resulting in abnormal voting.

The second scenario may occur if the `pos_config/pos_key` file of an existing node is deleted without removing the corresponding `pos_db/secure_storage.json` file. If you need to regenerate the PoS account private key, both of these files need to be deleted together.

## How can I safely restart my PoS node?

To prevent forced retirement while restarting your PoS node, it is recommended to follow the these steps:

1. Run `./conflux rpc local pos stop_election` on the PoS node. The node will return either `NULL` or a future PoS block number. After running this command, the node will not apply to join the PoS committee in the next term.
2. If the command returns a block number, keep the node running. Run the same command again after the PoS block of the returned block number has been generated (est. several hours later). At this point, the command should return `NULL`. The node will no longer receive PoS rewards after this block.
3. Once the command returns `NULL`, the node can be safely stopped. The PoS voting process will resume to normal automatically after the node has been restarted (est. 2-3 hours to generate new PoS rewards).

## On which chain are PoS rewards distributed?

PoW chain.
