---
sidebar_position: 6
title: FAQs
displayed_sidebar: generalSidebar
---

## What is forced retirement?

If a candidate is elected to join the committee but does not participate in signing between two elections, all the locked votes will unlock automatically. This can happen if your PoS node is offline for some reason. In this case, the node's PoS account will be unable to acquire voting power for the following 1-14 days. This mechanism is often referred to as *forced retirement*.

## How can I safely restart my PoS node?

To prevent forced retirement while restarting your PoS node, it is recommended to follow the these steps:

1. Run `./conflux RPC local pos stop_election` on the PoS node. The node will return either `NULL` or a future PoS block number. After running this command, the node will not apply to join the PoS committee in the next term.
2. If the command returns a block number, keep the node running. Run the same command again after the PoS block of the returned block number has been generated (est. several hours later). At this point, the command should return `NULL`. The node will no longer receive PoS rewards after this block.
3. Once the command returns `NULL`, the node can be safely stopped. The PoS voting process will resume to normal automatically after the node has been restarted (est. 2-3 hours to generate new PoS rewards).
