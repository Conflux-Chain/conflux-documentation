---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - gas-optimization
  - Solidity
  - payable
  - constructors
  - admin-functions
  - EVM
  - BasicConstructor
  - AdvancedConstructor
  - Admin
  - AdminPayable
tags:
  - Using Payable
  - Gas Optimization
  - Smart Contracts
---

# Using Payable

In Solidity, leveraging the `payable` keyword can be a subtle yet effective way to optimize gas usage. In this article, we explore two distinct scenarios where using `payable` can lead to gas savings: in constructors and admin functions.

### Payable Constructor

The way you write constructors can influence the deployment cost of your contracts, particularly with respect to gas usage. The Ethereum Virtual Machine (EVM) requires gas for all operations, including contract deployment.

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

### Payable Admin Functions

Admin functions can be made payable to save gas. Making admin-specific functions payable reduces gas costs because the compiler won't check the callvalue of the function. This approach also makes the contract smaller and cheaper to deploy as there will be fewer opcodes in the creation and runtime code.

**Demo Code**

Below is an example demonstrating how to implement payable admin functions:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Admin {
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    // gas: 23348
    function adminFunction() external onlyAdmin {
        // Admin specific logic here
    }
}

contract AdminPayable {
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    // gas: 23324
    function adminFunction() external payable onlyAdmin {
        // Admin specific logic here
    }
}
```

In this example, the `adminFunction` is payable, which can help save gas costs.

**Recommendations for Gas Optimization**

🌟 Using a `payable` modifier in a constructor will slightly reduce gas costs during contract deployment.

🌟 Consider making admin functions payable to reduce gas costs associated with value checks by the compiler.
