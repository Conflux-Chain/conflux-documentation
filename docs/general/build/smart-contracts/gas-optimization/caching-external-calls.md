---
displayed_sidebar: generalSidebar
---

# Efficient Use of Caching External Calls in Smart Contracts

This tutorial explores how caching return data from external contracts, like Chainlink oracles, can result in substantial gas savings. Caching data is recommended to avoid duplication in memory when the same data is needed multiple times during a single execution process. This approach minimizes the expensive external calls, leading to more efficient smart contract execution.

In Solidity, making calls to external contracts (such as oracles) can be costly in terms of gas. When multiple operations need the same external data, it's more efficient to store this data in memory rather than making repeated calls. This method significantly reduces the number of external calls and thus the gas consumed.

**Demo Code**

Below are two versions of a contract. The first one makes repeated external calls to get the ETH price from a Chainlink oracle. The optimized version caches the ETH price in memory to reduce gas consumption.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IChainlinkOracle {
    function latestAnswer() external view returns (int256);
}

contract ETHPriceUnoptimized {
    IChainlinkOracle public oracle;

    constructor(address _oracle) {
        oracle = IChainlinkOracle(_oracle);
    }

    function performOperations() public view returns (int256, int256) {
        int256 ethPrice1 = oracle.latestAnswer();
        int256 ethPrice2 = oracle.latestAnswer();
        return (ethPrice1, ethPrice2);
    }
}

contract ETHPriceOptimized {
    IChainlinkOracle public oracle;

    constructor(address _oracle) {
        oracle = IChainlinkOracle(_oracle);
    }

    function performOperations() public view returns (int256, int256) {
        int256 ethPrice = oracle.latestAnswer();
        return (ethPrice, ethPrice);
    }
}
```

The optimized contract demonstrates a significant gas saving compared to the unoptimized version. The key change here is the caching of the ETH price in memory (`int256 ethPrice = oracle.latestAnswer()`) instead of making multiple external calls. This method reduces the gas cost by avoiding duplicated external calls:

- Unoptimized Version: Makes two separate calls to the Chainlink oracle, each call consuming additional gas.
- Optimized Version: Makes a single call to the Chainlink oracle, caches the result in memory, and reuses the cached value for subsequent operations.

**Recommendations for Gas Optimization**

🌟 Cache data from external calls in memory if the same data is needed multiple times during the execution of a function. This approach reduces the number of expensive external calls.

🌟 Analyze the flow and access patterns of your data to determine when caching can be beneficial.

🌟 Ensure the cached data remains valid for the duration it is used to avoid inconsistencies.

🌟 Use local variables to store data temporarily during the execution of a function to minimize storage operations.

By implementing these best practices, developers can significantly optimize the gas efficiency of their smart contracts.
