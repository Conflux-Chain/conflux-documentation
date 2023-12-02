---
sidebar_position: 4
title: ConfluxContext
displayed_sidebar: coreSidebar
---

This contract can be used in `Solidity contract` to query Conflux Core network info including:

- `epochNumber` - 当前纪元号
- `posHeight` - PoS链的当前区块高度
- `finalizedEpochNumber` - （由PoS链）最新确定的PoW纪元号

## Interface

`ConfluxContext`的hex40合约地址是`0x0888000000000000000000000000000000000004`

```js
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.15;

interface ConfluxContext {
    /*** Query Functions ***/
    /**
     * @dev get the current epoch number
     * @return the current epoch number
     */
    function epochNumber() external view returns (uint256);
    /**
     * @dev get the height of the referred PoS block in the last epoch
`    * @return the current PoS block height
     */
    function posHeight() external view returns (uint256);
    /**
     * @dev get the epoch number of the finalized pivot block.
     * @return the finalized epoch number
     */
    function finalizedEpochNumber() external view returns (uint256);
}
```
