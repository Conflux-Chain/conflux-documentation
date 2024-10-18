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
  - GAS 优化
  - 智能合约
---

# Using Payable

In Solidity, leveraging the `payable` keyword can be a subtle yet effective way to optimize gas usage. In this article, we explore two distinct scenarios where using `payable` can lead to gas savings: in constructors and admin functions.

### Payable Constructor

The way you write constructors can influence the deployment cost of your contracts, particularly with respect to gas usage. 以太坊虚拟机（EVM）中包括部署合约等的所有操作都需要 gas。

**代码演示**

下面有两个简单的合约，`BasicConstructor` 和 `AdvancedConstructor`。 它们都很简单，唯一的区别是构造函数是否被标记为 `payable`。

- `BasicConstructor` 没有使用 `payable` 修饰。
- `AdvancedConstructor` 使用 `payable` 修饰，它可以在部署时接收以太币。

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

部署时，`AdvancedConstructor` 使用的 gas（67102）比 `BasicConstructor`（67161）少。 在这种情况下，被标记为 `payable` 的构造函数稍微减少了 gas。尽管差异很小，但也说明了使用 `payable` 修饰构造函数会在一定程度上减少部署开销。

gas 消耗的差异可以归因于 EVM 处理部署字节码的方式。 `payable` 修饰符可能会使构造函数的字节码有略微不同，这可能是由于在部署期间对存储访问和函数访问方式的优化。

### Payable Admin Functions

Admin functions can be made payable to save gas. Making admin-specific functions payable reduces gas costs because the compiler won't check the callvalue of the function. This approach also makes the contract smaller and cheaper to deploy as there will be fewer opcodes in the creation and runtime code.

**代码演示**

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

🌟 在构造函数中使用 `payable` 修饰符会略微减少部署合约时的 gas 成本。

🌟 Consider making admin functions payable to reduce gas costs associated with value checks by the compiler.
