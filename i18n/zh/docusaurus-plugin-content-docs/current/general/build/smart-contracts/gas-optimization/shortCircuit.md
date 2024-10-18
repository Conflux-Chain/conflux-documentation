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
  - 短路运算
  - GAS 优化
  - 智能合约
---

# 短路运算

在Solidity中，每一个需要上链的操作都需要消耗gas，短路运算是一种编码技巧，它仅在第一个参数没有确定结果时才评估逻辑操作的第二个参数，从而显著减少不必要的gas消耗，提高效率。

**代码演示**

下面，我们演示如何使用短路运算来最大限度地减少 gas 使用：

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

🌟 使用 **short-couriting** 来减少不必要的函数调用或计算。

🌟 在逻辑运算中将可能成功的(或消耗更少 gas 的)函数或条件放在其他**之前**。

🌟 了解操作所需的 gas 成本并组织你的代码以尽可能降低这些成本。
