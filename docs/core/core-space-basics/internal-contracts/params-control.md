---
sidebar_position: 7
title: ParamsControl
displayed_sidebar: coreSidebar
keywords:   
  - Chain Parameters
  - DAO Voting
  - Governance
  - Testnet
  - Mainnet
  - cfx_getParamsFromVote
  - Voting Interface
  - powBaseReward
  - interestRate
  - storagePointProp
  - baseFeeShareProp
  - Voting Rounds
  - PoS Stake
tags:
  - ParamsControl
  - Internal Contracts
---

`ParamsControl` is a smart contract at address `0x0888000000000000000000000000000000000007` that allows participation in the chain parameter DAO vote on the Conflux network. Below are the addresses for both the Testnet and Mainnet environments, where you can interact with this contract:

- **Testnet Address**: [`cfxtest:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa64p5db1w9`](https://testnet.confluxscan.org/address/cfxtest:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa64p5db1w9)
- **Mainnet Address**: [`cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa6uhjxh70z`](https://confluxscan.org/address/cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa6uhjxh70z)

To check the current chain parameters, you can use the `cfx_getParamsFromVote` JSON-RPC method. Detailed information on this method can be found in the [cfx_getParamsFromVote documentation](../../build/json-rpc/cfx-namespace.md#cfx_getparamsfromvote).

Additionally, a [frontend panel](https://confluxhub.io/governance/vote/onchain-dao-voting) is available for on-chain DAO voting, providing a user-friendly interface for participating in governance activities.

## Interface

```js
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

interface ParamsControl {
    struct Vote {
        uint16 topic_index;
        uint256[3] votes;
    }

    /*** Query Functions ***/
    /**
     * @dev cast vote for parameters
     * @param vote_round The round to vote for
     * @param vote_data The list of votes to cast
     */
    function castVote(uint64 vote_round, Vote[] calldata vote_data) external;

    /**
     * @dev read the vote data of an account
     * @param addr The address of the account to read
     */
    function readVote(address addr) external view returns (Vote[] memory);

    /**
     * @dev Current vote round
     */
    function currentRound() external view returns (uint64);

    /**
     * @dev read the total votes of given round
     * @param vote_round The vote number
     */
    function totalVotes(uint64 vote_round) external view returns (Vote[] memory);

    /**
     * @dev read the PoS stake for the round.
     */
    function posStakeForVotes(uint64) external view returns (uint256);

    event CastVote(uint64 indexed vote_round, address indexed addr, uint16 indexed topic_index, uint256[3] votes);
    event RevokeVote(uint64 indexed vote_round, address indexed addr, uint16 indexed topic_index, uint256[3] votes);
}
```

### topic_index

The `topic_index` in the `Vote` struct is used to specify which chain parameter is being voted on. Here is the structure of the `Vote`:

```solidity
struct Vote {
    uint16 topic_index;
    uint256[3] votes;
}
```

Currently, there are four chain parameters available for voting:

- **powBaseReward**:
  - Determines the base reward of a Proof of Work (PoW) block.
- **interestRate**:
  - Determines the base interest rate for Proof of Stake (PoS).
- **storagePointProp**:
  - This integer parameter defines the proportion of sponsored storage that will be converted to storage points.
  - The proportion is calculated using the formula: `storagePointProp / (storagePointProp + 10**18)`.
- **baseFeeShareProp**:
  - This integer parameter determines the proportion of the transaction [**base fee**](../../../general/conflux-basics/basefee.md) that will be rewarded to the miner.
  - The proportion is calculated using the formula: `baseFeeShareProp / (baseFeeShareProp + 10**18)`.

These parameters allow the community to participate in the governance of the Conflux network by voting on key operational metrics.
