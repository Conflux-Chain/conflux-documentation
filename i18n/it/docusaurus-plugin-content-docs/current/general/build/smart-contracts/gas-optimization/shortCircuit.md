---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - gas-optimization
  - Solidity
  - short-circuiting
  - logical-operations
  - boolean-logic
  - LogicOptimization
  - function-ordering
  - gas-efficiency
tags:
  - Short-Circuiting
  - Gas Optimization
  - Smart Contracts
---

# Short-Circuiting

In Solidity, where every blockchain-affecting operation requires gas, short-circuiting is a coding technique that evaluates the second argument of a logical operation only if the first doesn't conclusively determine the outcome, thus significantly reducing unnecessary gas consumption and enhancing efficiency.

**DemoCode**

Below, we demonstrates how short-circuiting can be applied to minimize gas usage:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract LogicOptimization {
    // High gas consumption function
    function heavy() public pure returns (bool ok) {
        uint num;
        for (uint256 i = 0; i < 1000; i++) {
            num = i + 1;
        }
        ok = true;
    }

    // Low gas consumption function
    function light() public pure returns (bool ok) {
        ok = true;
    }

    // No short-circuiting: higher gas usage
    function basic() external pure {
        heavy() || light(); // Evaluates both heavy() and light()
    }

    // With short-circuiting: reduced gas usage
    function efficient() external pure {
        light() || heavy(); // light() evaluated first, heavy() skipped if light() is true
    }
}
```

Recommendations for gas optimization:

🌟 Utilize **short-circuiting** to prevent unnecessary function calls or computations.

🌟 Place functions or conditions likely to succeed (or that are less gas-consuming) **before** others in logical operations.

🌟 Understand the gas cost of operations and structure your code to minimize these costs whenever possible.
