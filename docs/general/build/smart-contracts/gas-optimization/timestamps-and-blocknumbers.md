---
title: Optimize Timestamps and Block Numbers
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - gas-optimization
  - Solidity
  - timestamps
  - block-numbers
  - uint256
  - uint48
  - uint32
  - storage-efficiency
  - EfficientStorage
tags: [Timestamps and Block Numbers, Gas Optimization, Smart Contracts]
---

In Solidity, the way data is stored can significantly impact the gas costs associated with deploying and interacting with smart contracts. Gas costs can quickly become a major concern, especially in applications that handle a large number of transactions.
 
By default, many developers use uint256 for all integers because it is the largest unsigned integer type available, ensuring maximum range and precision. However, this often leads to inefficient gas usage since smaller data types are sufficient for many applications, and using uint256 unnecessarily can increase costs.

This tutorial delves into how to judiciously choose storage types for elements like timestamps and block numbers, which do not typically require the full capacity provided by uint256. By selecting more appropriate data types, you can optimize your contract's gas consumption, thereby reducing transaction costs and improving overall contract efficiency.

## Understanding the Optimization

A `uint256` is often used by default in Solidity for all integer types; however, this can be overkill for many applications. For example, a timestamp can be comfortably stored in a `uint48`, as it can represent time well into the future without running out of capacity. Similarly, a block number, which increments at the second level, can be stored in smaller data types than `uint256`.

**DemoCode**

Below, we demonstrate how to use smaller integer types for storing timestamps and block numbers to optimize gas costs:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract EfficientStorage {
    // Using uint48 for timestamps
    uint48 public lastUpdatedTimestamp;

    // Using uint32 for block numbers
    uint32 public lastBlockNumber;

    // Function to update the timestamp and block number
    function updateState() external {
        lastUpdatedTimestamp = uint48(block.timestamp);
        lastBlockNumber = uint32(block.number);
    }
}
```

Recommendations for gas optimization:

🌟 Timestamps and block numbers in storage don't need to use `uint256`. A timestamp can be stored in a `uint48`, and a block number can be stored in a `uint32`.
