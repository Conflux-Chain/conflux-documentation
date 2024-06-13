---
displayed_sidebar: generalSidebar
---

# Caching External Calls

This tutorial explores how caching return data from external contracts, like Chainlink oracles, can result in substantial gas savings. By storing this data in memory when multiple operations need the same information, you can avoid repeated, costly external calls. This approach minimizes expensive external calls and leads to more efficient smart contract execution.

**Demo Code**

Below are two versions of a contract. The first one makes repeated external calls to get the price of a trading pair from a price oracle. The optimized version caches the price in memory to reduce gas consumption.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPriceOracle {
    function getPrice(address tokenA, address tokenB) external view returns (uint256);
}

contract DexUnoptimized {
    IPriceOracle public priceOracle;

    constructor(address _priceOracle) {
        priceOracle = IPriceOracle(_priceOracle);
    }

    function calculateTradingFees(address tokenA, address tokenB, uint256 amount) public view returns (uint256) {
        uint256 fee1 = amount * priceOracle.getPrice(tokenA, tokenB); / 1000;  // Calculate fee
        uint256 fee2 = amount * priceOracle.getPrice(tokenA, tokenB); / 2000;  // Calculate another fee
        return fee1 + fee2;
    }
}

contract DexOptimized {
    IPriceOracle public priceOracle;

    constructor(address _priceOracle) {
        priceOracle = IPriceOracle(_priceOracle);
    }

    function calculateTradingFees(address tokenA, address tokenB, uint256 amount) public view returns (uint256) {
        uint256 price = priceOracle.getPrice(tokenA, tokenB);
        uint256 fee1 = amount * price / 1000;  // Calculate fee
        uint256 fee2 = amount * price / 2000;  // Calculate another fee
        return fee1 + fee2;
    }
}
```

The optimized contract can significantly save gas compared to the unoptimized version. The key change here is the caching of the trading pair price in memory (`uint256 price = priceOracle.getPrice(tokenA, tokenB)`) instead of making multiple external calls. This method reduces the gas cost by avoiding duplicated external calls:

- Unoptimized Version: Makes two separate calls to the price oracle, each call consuming additional gas.
- Optimized Version: Makes a single call to the price oracle, caches the result in memory, and reuses the cached value for subsequent operations.

**Recommendations for Gas Optimization**

🌟 Cache data from external calls in memory if the same data is needed multiple times during the execution of a function.
