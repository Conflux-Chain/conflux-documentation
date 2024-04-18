---
displayed_sidebar: generalSidebar
---

# Payable Constructor

In Solidity, the way you write constructors can influence the deployment cost of your contracts, particularly with respect to gas usage. The Ethereum Virtual Machine (EVM) requires gas for all operations, including contract deployment.

**Demo Code**

Below, we have two simple contracts, `BasicConstructor` and `AdvancedConstructor`. Both are minimal, but they differ in whether the constructor is marked as `payable`.

- `BasicConstructor` has a non-payable constructor.
- `AdvancedConstructor` has a payable constructor, allowing it to receive Ether during deployment.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BasicConstructor {
    constructor() {} // Gas: 67161
}

contract AdvancedConstructor {
    constructor() payable {} // Gas: 67102
}
```

When deployed, the `AdvancedConstructor` uses less gas (67,102 gas) compared to the `BasicConstructor` (67,161 gas). Although the difference is minor, marking a constructor as `payable` does not necessarily increase deployment costs and in this case, it marginally reduces them.

The difference in gas cost can be attributed to how the EVM handles the deployment bytecode. The `payable` modifier might influence the constructor's bytecode slightly differently than a non-payable one, potentially due to optimizations in how storage access and function accessibility are handled during deployment.

Recommendations for Gas Optimization:

🌟 Using a `payable` modifier in a constructor will slightly reduce gas costs during contract deployment.
