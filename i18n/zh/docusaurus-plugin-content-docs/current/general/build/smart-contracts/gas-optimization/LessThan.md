---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - Solidity
  - gas-optimization
  - comparison-operators
  - EVM
  - less-than
  - less-than-or-equal-to
  - iszero
  - opcode
  - DemoCode
tags:
  - LessThan
  - GAS 优化
  - 智能合约
---

# 比较运算符

在以太坊虚拟机（EVM）中，选择比较运算符会影响智能合约的效率和燃气消耗。 Opting for `<` (less than) and `>` (greater than) over `≤` (less than or equal to) and `≥` (greater than or equal to) is notably more gas-efficient. 这是因为 EVM 的设计中没有直接的操作码指令支持 `≤` 和 `≥`，实现这些比较需要额外的操作。

Given that iszero consumes 3 units of gas, utilizing `≤` and `≥` in contracts that frequently perform comparisons can lead to increased gas expenditures.

**代码演示**

```solidity
contract CompareLessThan {
    // gas: 247
    function isSmallerThan(uint256 value) external pure returns (bool) {
        return value < 8;
    }
}

contract CompareLessThanOrEqual {
    // gas: 250
    function isSmallerThanOrEqual(uint256 value) external pure returns (bool) {
        return value <= 7;
    }
}
```

假设 `value` 值为7，两个函数将返回相同的结果。 However, the `<` operator will be more gas-efficient than the `<=` operator.

关于 gas 优化的建议：

🌟 Using the `<` and `>` operators is more gas-efficient than `<=` and `>=` in smart contracts.
