---
sidebar_position: 7
title: ParamsControl
displayed_sidebar: coreSidebar
keywords:
  - Chain Parameters
  - DAO Voting
  - Governance
  - 测试网
  - 主网
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
  - 内置合约
---

:::note
Check [CIP-94](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-94.md) for more details.
:::

`ParamsControl` 是一个地址为 `0x0888000000000000000000000000000000000007` 的智能合约，允许参与 Conflux 网络上的链参数 DAO 投票。 以下是该合约在测试网和主网环境中的地址，您可以在这些环境中与该合约进行交互：

- **Testnet Address**: [`cfxtest:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa64p5db1w9`](https://testnet.confluxscan.org/address/cfxtest:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa64p5db1w9)
- **Mainnet Address**: [`cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa6uhjxh70z`](https://confluxscan.org/address/cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa6uhjxh70z)

要检查当前的链参数，您可以使用`cfx_getParamsFromVote` JSON-RPC方法。 有关此方法的详细信息，参见 [cfx_getParamsFromVote文档](../../build/json-rpc/cfx-namespace.md#cfx_getparamsfromvote)。

此外，还有一个[前端面板](https://confluxhub.io/governance/vote/onchain-dao-voting)用于链上 DAO 投票，为参与治理活动提供了一个用户友好的界面。

## 接口

```js
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

interface ParamsControl {
    struct Vote {
        // 0: powBaseReward, 1: interestRate, 2: storagePointProp, 3: baseFeeShareProp
        uint16 topic_index;
        // [n_unchange, n_increase, n_decrease]
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
     function posStakeForVotes(uint64) external view returns (uint256);

event CastVote(uint64 indexed vote_round, address indexed addr, uint16 indexed topic_index, uint256[3] votes);
event RevokeVote(uint64 indexed vote_round, address indexed addr, uint16 indexed topic_index, uint256[3] votes);
```

### topic_index

`Vote` 结构中，`topic_index` 用于指定正在进行投票的链参数。 以下是 `Vote` 结构的定义：

```solidity
struct Vote {
    uint16 topic_index;
    uint256[3] votes;
}
```

目前，有四个链参数可供投票：

- **powBaseReward**:
  - 确定工作量证明 (PoW) 区块的基础奖励。
- **interestRate**:
  - 确定权益证明 (PoS) 的基本利率。
- **storagePointProp**:
  - 此整数参数定义了将转换为存储点的赞助存储比例。
  - 该比例的计算公式为: `storagePointProp / (storagePointProp + 10**18)`.
- **baseFeeShareProp**:
  - 此整数参数确定在交易的[**基础费用**](../../../general/conflux-basics/basefee.md)中奖励给矿工的比例。
  - 该比例的计算公式为: `baseFeeShareProp / (baseFeeShareProp + 10**18)`.

这些参数允许社区通过对决定关键运营指标进行投票来参与 Conflux 网络的治理。
