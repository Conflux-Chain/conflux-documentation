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

# Comparison Operators

In the Ethereum Virtual Machine (EVM), the selection of comparison operators influences the efficiency and gas consumption of smart contracts. Opting for `<` (less than) and `>` (greater than) over `≤` (less than or equal to) and `≥` (greater than or equal to) is notably more gas-efficient. This is due to the absence of direct opcode instructions for `≤` and `≥` in the EVM's design, which requires additional operations to achieve these comparisons.

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

Assuming `value` is 7, both functions will return the same result. However, the `<` operator will be more gas-efficient than the `<=` operator.

关于 gas 优化的建议：

🌟 Using the `<` and `>` operators is more gas-efficient than `<=` and `>=` in smart contracts.
