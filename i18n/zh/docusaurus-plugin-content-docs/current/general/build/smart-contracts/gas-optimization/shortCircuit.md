---
displayed_sidebar: generalSidebar
---

# Short-Circuiting

在Solidity中，每一个需要上链的操作都需要消耗gas，短路运算是一种编码技巧，它仅在第一个参数没有确定结果时才评估逻辑操作的第二个参数，从而显著减少不必要的gas消耗，提高效率。

**代码演示**

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

关于 gas 优化的建议：

🌟 Utilize **short-circuiting** to prevent unnecessary function calls or computations.

🌟 Place functions or conditions likely to succeed (or that are less gas-consuming) **before** others in logical operations.

🌟 Understand the gas cost of operations and structure your code to minimize these costs whenever possible.
