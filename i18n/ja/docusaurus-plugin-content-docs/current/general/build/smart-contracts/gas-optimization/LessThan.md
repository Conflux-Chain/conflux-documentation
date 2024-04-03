---
displayed_sidebar: generalSidebar
---

# Comparison Operators

In the Ethereum Virtual Machine (EVM), the selection of comparison operators influences the efficiency and gas consumption of smart contracts. Opting for `<` (less than) and `>` (greater than) over `≤` (less than or equal to) and `≥` (greater than or equal to) is notably more gas-efficient. This is due to the absence of direct opcode instructions for `≤` and `≥` in the EVM's design, which requires additional operations to achieve these comparisons.

Given that iszero consumes 3 units of gas, utilizing `≤` and `≥` in contracts that frequently perform comparisons can lead to increased gas expenditures.

**DemoCode**

Below are examples of code achieving the same result using `<` and `<=`, respectively.

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

Recommendations for gas optimization:

🌟 Using the `<` and `>` operators is more gas-efficient than `<=` and `>=` in smart contracts.
