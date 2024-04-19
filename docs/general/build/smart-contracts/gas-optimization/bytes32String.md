---
displayed_sidebar: generalSidebar
---

# Efficient Data Storage in Solidity

In Solidity, the type of data storage you choose can significantly affect the gas cost of your contract operations, especially when storing or modifying state variables. The Ethereum Virtual Machine (EVM) charges gas for all operations, and the choice between using `bytes32` and `string` types can impact these costs.

**Demo Code**

Below, we present two simple contracts, `SetBytes32` and `SetString`, which illustrate the difference in gas usage when setting a `bytes32` type versus a `string` type with the same content.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract SetBytes32 {
    bytes32 public b32;

    // use bytes32: 22222 gas
    function setBytes32() public {
        b32 = "Hello WTF!";
    }
}

contract SetString {
    string public str;

    // use string: 22682 gas
    function setString() public {
        str = "Hello WTF!";
    }
}
```

When deployed and executed, the `SetBytes32` contract uses less gas (22,222 gas) compared to the `SetString` contract (22,682 gas). The difference, while not substantial, highlights how `bytes32` is more gas-efficient for storing fixed-size data compared to `string`, which is designed for dynamically sized data.

The gas cost difference can be attributed to the overhead associated with managing the dynamically-sized data in a `string`, which requires more computational resources compared to a fixed-size `bytes32`.

**Recommendations for Gas Optimization:**

🌟 When possible, use `bytes32` for fixed-size data to save on gas costs.

🌟 Consider the data type and size implications when designing your smart contracts to optimize for gas efficiency.
