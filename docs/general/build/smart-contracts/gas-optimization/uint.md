---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - gas-optimization
  - Solidity
  - uint-types
  - EVM
  - storage-slots
  - uint8
  - uint32
  - uint256
  - arithmetic-operations
  - Uint8Example
  - Uint32Example
  - Uint256Example
tags: [Uint Types, Gas Comparison, Smart Contracts]
---


# Uint Types Gas Comparison

It's a common belief that in Solidity, smaller integer types like `uint8`, `uint16`, `uint32`, `uint64`, `uint128`, and `uint256` might save gas due to their smaller size. However, this isn't always the case.

The Ethereum Virtual Machine (EVM) allocates a 256-bit slot for each stored variable. For instance, if we declare a variable of type `uint8`, the EVM fills the missing bits with zeros to fit it into a single slot. Additionally, during execution, the EVM converts `uintN` types to `uint256` for computations.

**DemoCode**

Let's test `uint8`, `uint32`, and `uint256` to observe their behavior in terms of writing data.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Uint8Example {
    uint8 public uint8val;

    // gas 22234
    function set() external {
        uint8val = 1;
    }

    // gas 53427
    function compute() external returns (uint8) {
        uint8 target = 50;
        for (uint8 i = 0; i < target; i++) {
            uint8val += 1;
        }
        return uint8val;
    }
}

contract Uint32Example {

    uint32 public uint32val;

    // gas 22234
    function set() external {
        uint32val = 1;
    }

    // gas 53895
    function compute() external returns (uint32) {
        uint32 target = 50;
        for (uint32 i = 0; i < target; i++) {
            uint32val += 1;
        }
        return uint32val;
    }
}

contract Uint256Example {
    uint256 public uint256val;

    // gas 22238
    function set() external {
        uint256val = 1;
    }

    // gas 42950
    function compute() external returns (uint256) {
        uint256 target = 50;
        for (uint256 i = 0; i < target; i++) {
            uint256val += 1;
        }
        return uint256val;
    }
}


```

As observed, in loop computations, `uint256` saves over 10,000 gas. Therefore, smaller variables don't necessarily equate to gas savings.

Recommendations for gas optimization:

🌟If variables cannot be packed together, using `uint` or `uint256` is the optimal choice.
