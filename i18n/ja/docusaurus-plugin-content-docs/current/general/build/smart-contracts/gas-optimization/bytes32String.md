---
displayed_sidebar: generalSidebar
---

# Bytes32 vs String

In Solidity, the type of data storage you choose can affect the gas cost of your contract operations, especially when storing or modifying state variables. The Ethereum Virtual Machine (EVM) charges gas for all operations, and the choice between using `bytes32` and `string` types can impact these costs.

**Demo Code**

Below, we present two simple contracts, `SetBytes32` and `SetString`, which illustrate the difference in gas usage when setting a `bytes32` type versus a `string` type with the same content.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SetBytes32 {
    bytes32 public b32;

    // use bytes32: 22222 gas
    function setBytes32() public {
        b32 = "Hello Conflux!";
    }
}

contract SetString {
    string public str;

    // use string: 22682 gas
    function setString() public {
        str = "Hello Conflux!";
    }
}
```

When deployed and executed, the `SetBytes32` contract uses less gas (22,222 gas) compared to the `SetString` contract (22,682 gas). The difference, while not substantial, highlights how `bytes32` is more gas-efficient for storing fixed-size data compared to `string`, which is designed for dynamically sized data.

**Detailed Explanation of Gas Savings**

The choice between `bytes32` and `string` in Solidity impacts gas consumption due to the differences in how each handles data storage:

- **bytes32**: A fixed-size data type occupying exactly 32 bytes, regardless of the content's length. Since `bytes32` is fixed, there's no need for additional space to store data length, simplifying the contract's storage requirements. In Ethereum smart contracts, storage operations are expensive, but `bytes32` optimizes these by compactly fitting into a single storage slot of the EVM, which is precisely 32 bytes. This configuration allows for efficient read and write operations, minimizing gas costs.

- **string**: A dynamically sized data type that requires additional storage for length information every time it is stored. This dynamic nature introduces complexity, as `string` often occupies multiple storage slots, particularly when exceeding 32 bytes. Managing these dynamic arrays increases computational demands for locating the start and end points of the data, leading to higher gas usage.

**Recommendations for Gas Optimization:**

Use bytes32 for fixed-length strings up to 32 bytes, and string for variable-length content or when lengths may exceed 32 bytes.

🌟 When possible, use `bytes32` for fixed-size data to save on gas costs.
