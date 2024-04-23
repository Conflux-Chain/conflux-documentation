---
sidebar_position: 7
title: ParamsControl
displayed_sidebar: coreSidebar
---

`ParamsControl`位于地址`0x0888000000000000000000000000000000000007`，具有以下接口。 它可以用来参与链参数投票。

```js
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

interface ParamsControl {
    struct Vote {
        uint16 topic_index;
        uint256[3] votes;
    }

/*** 查询函数 ***/
/**
 * @dev 为参数投票
 * @param vote_round 投票轮次
 * @param vote_data 投票列表
 */
function castVote(uint64 vote_round, Vote[] calldata vote_data) external;

/**
 * @dev 读取账户的投票数据
 * @param addr 要读取的账户地址
 */
function readVote(address addr) external view returns (Vote[] memory);

/**
 * @dev 当前投票轮次
 */
function currentRound() external view returns (uint64);

/**
 * @dev 读取指定轮次的总投票数
 * @param vote_round 投票轮次
 */
function totalVotes(uint64 vote_round) external view returns (Vote[] memory);

/**
 * @dev 读取该轮次的 PoS 质押额。
 */
     function posStakeForVotes(uint64) external view returns (uint256);

event CastVote(uint64 indexed vote_round, address indexed addr, uint16 indexed topic_index, uint256[3] votes);
event RevokeVote(uint64 indexed vote_round, address indexed addr, uint16 indexed topic_index, uint256[3] votes);
```
