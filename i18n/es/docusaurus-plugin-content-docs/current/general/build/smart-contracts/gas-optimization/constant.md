---
displayed_sidebar: generalSidebar
---

# Constant vs Immutable

1. `constant`: Declares a constant that must be initialized at the time of declaration and cannot be altered thereafter.

2. `immutable`: Declares a constant that can be initialized either at the time of declaration or within the constructor, and cannot be altered after deployment.

3. `variable`: Declares a variable that can be assigned and modified at any stage of the contract lifecycle.

The following examples illustrate three variables defined with different modifiers.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ConstantExample {
    uint256 public constant FIXED_VALUE = 100;
}

contract ImmutableExample {
    uint256 public immutable SETUP_VALUE = 100;
}

contract VariableExample {
    uint256 public dynamicValue = 100;
}
```

Recommendations for gas optimization:

🌟 Using variables consumes more gas, so avoid them if you can.

🌟 For constants that do not require modifications after deployment, **defining them as `immutable` is optimal both functionally and in terms of gas efficiency.**
