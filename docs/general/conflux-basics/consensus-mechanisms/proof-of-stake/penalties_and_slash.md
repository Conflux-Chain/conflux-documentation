---
id: penalties_and_slash
title: Penalties and Slashing
sidebar_position: 3
displayed_sidebar: generalSidebar
---

To encourage honest participation in Proof of Stake (PoS) and maintain system security, inactive participation in consensus will result in loss of rewards, and any attack behavior against the consensus will lead to slashing.

## Force Retire

### Criteria

A PoS node will be force retired if it is selected into the PoS committee and fails to send any consensus messages for 3 consecutive epochs (approximately 3 hours).

### Penalty Details

Force retiring a node is equivalent to automatically triggering the unstaking mechanism. This process is identical to voluntary unstaking, except it is not initiated by the node operator. Any new staked token during force retire period will also automatically triggering the unstake mechanism. Force retire period will last for **one day**.

After the PoS unlocking waiting period (which requires the token to be staked for at least 14 days and the unstaking process to be triggered for at least 1 day), the staker can choose to withdraw their CFX tokens or restake them.

### Possible Causes

1. Node malfunction due to network, hard drive, or software issues.
2. Anomalies caused by unauthorized modifications to the official conflux-rust code.

## Slash

### Criteria

Slashing occurs when behaviors that attack the consensus mechanism are detected. For security reasons, the complete rules for detection are not disclosed.

### Penalty Details

All staked tokens of the validator will be permanently locked and cannot be unstaked.

### Possible Causes

1. Running multiple PoS nodes but sharing the same PoS Key, leading to inconsistent behaviors from the same key.
2. Tampering with or loss of the `pos_db/secure_storage.json` file. (If the file is lost, it is recommended to unstake, wait for the unlocking period, and then bind a new PoS key.)
3. Anomalies caused by unauthorized modifications to the official conflux-rust code.
 