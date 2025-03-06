---
id: safe_node_restart
title: Safe Node Restart Procedure
sidebar_position: 6
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - PoS 共识机制
  - node maintenance
  - validator
  - slashing
  - penalties
  - node restart
  - stop_election
  - committee
  - staking safety
tags:
  - Staking
  - Node Operation
---

# Safe Node Restart Procedure

Operating a Proof of Stake (PoS) validator node requires careful maintenance to avoid penalties. One critical maintenance task is properly restarting your node when necessary for updates or system maintenance. Improper shutdowns can lead to penalties or even slashing of your staked tokens.

## Why Proper Restart Procedures Matter

In Conflux's PoS mechanism, validators who participate in the consensus committee have responsibilities to vote on blocks. Sudden disappearance from the committee without proper exit can result in severe penalties including:

**Slashing** - Permanent loss of staked tokens due to behaviors that threaten consensus security, such as running duplicate nodes with the same PoS key or inconsistent node configurations. This most commonly occurs when restarting a node without properly exiting the committee first.

For more details on penalties, see [Penalties and Slashing in PoS](/docs/general/conflux-basics/consensus-mechanisms/proof-of-stake/penalties_and_slash).

## Safe Restart Procedure to Prevent Slash

To safely restart your PoS node while avoiding penalties, follow this procedure:

1. Exit the committee by running:

     ./conflux rpc local pos stop_election

  This command returns either `NULL` or a future PoS block number. Once executed, your node will not participate in the next committee election.

2. If you receive a block number response:
  - Maintain node operation
  - Wait for the specified block to be generated (~2-4 hours)
  - Re-run the command until it returns `NULL`
  - Note that PoS rewards will cease after this block

3. When the command returns `NULL`:
  - The node can be safely stopped
  - Upon restart, PoS voting will automatically resume
  - New rewards will begin after ~2-3 hours

This procedure ensures a clean shutdown and prevents accidental slashing that could occur from running duplicate instances. Always follow these steps when performing maintenance or updates on your PoS node.

## Related Resources

- [PoS Staking Overview](/docs/general/mine-stake/stake/staking-overview)
- [Become a Solo Validator](/docs/general/mine-stake/stake/become-a-solo-validator)
- [PoS Technical Overview](/docs/general/conflux-basics/consensus-mechanisms/proof-of-stake/pos_overview)
- [Running a Staking Pool](/docs/general/mine-stake/stake/running-staking-pool)
