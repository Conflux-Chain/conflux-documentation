---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - Solidity
  - gas-optimization
  - modifiers
  - internal-functions
  - bytecode
  - deployment-size
  - runtime-gas-costs
  - UsingModifiers
  - UsingInternalFunctions
tags:
  - Modifiers vs Internal Functions
  - GAS 优化
  - 智能合约
---

# Modifiers vs Internal Functions

In Solidity, the choice between using modifiers and internal functions can impact the gas costs associated with contract operations. This article explores the differences in gas usage between **modifiers** and **internal functions** when performing typical operations. 了解这些差异可以帮助开发者优化他们的智能合约，以优化合约功能并控制成本。

**Modifiers** inject their implementation bytecode directly where they are used, which can reduce runtime gas costs but increase the deployment size due to code repetition. **Internal functions** involve a jump to the function's implementation, which can reduce deployment size but slightly increase runtime gas costs.

Below are two contracts demonstrating typical uses of modifiers and internal functions. 这些示例展示了每种操作的 gas 成本。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Deployment gas cost: 195,435
contract UsingModifiers {
    address owner;
    uint256 value;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    // gas: 28,367
    function restrictedAction1() external onlyOwner {
        value = 1;
    }


    // gas: 28,377
    function restrictedAction2() external onlyOwner {
        value = 2;
    }

    // gas: 28,411
    function restrictedAction3() external onlyOwner {
        value = 3;
    }
}

// Deployment gas cost: 159,309
contract UsingInternalFunctions {
    address owner;
    uint256 value;

    constructor() {
        owner = msg.sender;
    }

    function onlyOwner() internal view {
        require(msg.sender == owner, "Not the owner");
    }

    // gas: 28,391
    function restrictedAction1() external {
        onlyOwner();
        value = 1;
    }

    // gas: 28,401
    function restrictedAction2() external {
        onlyOwner();
        value = 2;
    }

    // gas: 28,435
    function restrictedAction3() external {
        onlyOwner();
        value = 3;
    }
}
```

From the above example, we can see that:

- The contract using modifiers incurs higher deployment gas costs (195,435) compared to the contract using internal functions (159,309) due to repetition of the `onlyOwner` functionality in three functions.
- During runtime, each function using modifiers costs a fixed 24 gas units less than the functions using internal functions.

**燃气优化建议:**

🌟 If runtime gas cost is your primary concern, and you are okay with the increase in deployment size, modifiers are a good choice. They reduce the gas cost during function calls by avoiding the jump to internal functions.

🌟 If minimizing deployment gas cost and reducing the size of the creation code is more important, internal functions are preferable. They offer greater flexibility since they can be called at any point in a function, not just at the start or end.
