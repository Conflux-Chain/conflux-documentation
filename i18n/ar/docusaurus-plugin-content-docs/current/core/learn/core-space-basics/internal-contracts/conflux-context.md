---
sidebar_position: 4
title: ConfluxContext
displayed_sidebar: coreSidebar
---

This contract can be used to query Conflux network info including:

- `epochNumber` - Current epoch number
- `posHeight` - Current block height of PoS chain
- `finalizedEpochNumber` - The latest finalized (by PoS chain) PoW epoch number

`ConfluxContext`'s hex40 contract address is `0x0888000000000000000000000000000000000004`

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
