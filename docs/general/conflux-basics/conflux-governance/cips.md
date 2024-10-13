---
sidebar_position: 2
title: CIPs
displayed_sidebar: generalSidebar
tags:
  - Conflux-Network
  - CIPs
  - Conflux-Improvement-Proposals
  - governance
  - protocol-changes
  - network-upgrades
  - hard-forks
  - community-voting
  - EIP-712
  - Base32-Checksum-Addresses
  - block-rewards
  - PoW-PoS-consensus
  - eSpace
  - on-chain-DAO
---

# CIPs

## Overview

As a decentralized network, major changes to the Conflux protocol need to reach consensus before they can be enacted. Such changes are proposed in the form of a **Conflux Improvement Proposal**, or CIP for short. After a CIP is discussed, the specification is finalized, and popular support is achieved, a set of CIPs is implemented and rolled out as a network upgrade, also known as a hard fork.

The process of submitting a CIP is described in [CIP-1](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-1.md). CIPs have the following stages:

```
[ IDEA ] -> [ DRAFT ] -> [ LAST CALL ] -> [ ACCEPTED ] -> [ FINAL ]
```

For more details, please refer to [CIP-1](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-1.md).

## Highlighted CIPs

Below are some of the most impactful CIPs since the launch of the Conflux mainnet.

- [CIP-23](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-23.md): **Typed structured data hashing and signing**. This CIP defined Conflux signature standards, based on Ethereum’s [EIP-712](https://eips.ethereum.org/EIPS/eip-712).
- [CIP-37](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-37.md): **Introduce Base32 Checksum Addresses**. The Core Space address format that you’re familiar with from [Fluent](https://fluentwallet.com/) and other wallets was defined in CIP-37.
- [CIP-40](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-40.md): **Reduce block base reward to 2 CFX**. In the first hard fork upgrade after mainnet launch, the block base reward was reduced from 7 CFX to 2 CFX. This was also the first CIP that was confirmed in a [governance vote](https://governance.confluxnetwork.org/en/governance/).
- [CIP-43](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-43.md): **Introduce Finality via Voting Among Staked**. This CIP introduced the idea of the hybrid PoW-PoS consensus, implemented in the Hydra hard fork.
- [CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md): **A Space Fully EVM compatible**. The other major update in the Hydra hard fork was the introduction of [Conflux eSpace](https://medium.com/conflux-network/conflux-espace-a-high-level-overview-cdca29bc422a), defined in this CIP.
- [CIP-94](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-94.md): **On-chain DAO Vote for Chain Parameters**. On-chain mechanism for community governance, to be rolled out in an upcoming network upgrade.

## How can I submit a CIP?

If you want to submit a Conflux Improvement Proposal, you should start by copying the [CIP Markdown template](https://github.com/Conflux-Chain/CIPs/blob/master/cip-template.md) and filling some basic information in the preamble, such as the title of this CIP, the list of authors, and the type of the change that. you are proposing. After this, you can proceed to fill all the sections: ```Simple Summary```, ```Abstract```, ```Motivation```, ```Specification```, ```Rationale```, ```Backwards Compatibility```, ```Test Cases```, ```Implementation```, ```Security Considerations```. Once your CIP draft is ready for its initial publication, submit it to the [CIPs GitHub repository](https://github.com/Conflux-Chain/CIPs) in a new [PR](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

## Next steps

Once your CIP draft has been submitted, the CIP editors will review it and address any editorial issues. At this point, you should share the CIP with the Conflux community, start a discussion, find and address issues, and work to achieve popular support for the proposed change or improvement.
