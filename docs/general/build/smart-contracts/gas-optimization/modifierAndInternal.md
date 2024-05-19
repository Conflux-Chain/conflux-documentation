---
displayed_sidebar: generalSidebar
---

# Modifiers vs Internal Functions for Gas Optimization

In Solidity, the choice between using modifiers and internal functions can significantly impact the gas costs associated with contract operations. This article explores the differences in gas usage between **modifiers** and **internal functions** when performing typical operations. Understanding these differences can help developers optimize their smart contracts for both functionality and cost.

**Modifiers** inject their implementation bytecode directly where they are used, which can reduce runtime gas costs but increase the deployment size due to code repetition. **Internal functions** involve a jump to the function's implementation, which can reduce deployment size but slightly increase runtime gas costs.

Below are two contracts demonstrating typical uses of modifiers and internal functions. These examples illustrate the operational gas costs associated with each.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/** Deployment gas cost: 195,435
 Gas per call:
 - restrictedAction1: 28,367
 - restrictedAction2: 28,377
 - restrictedAction3: 28,411
*/
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

    function restrictedAction1() external onlyOwner {
        value = 1;
    }

    function restrictedAction2() external onlyOwner {
        value = 2;
    }

    function restrictedAction3() external onlyOwner {
        value = 3;
    }
}

/** Deployment gas cost: 159,309
 Gas per call:
 - restrictedAction1: 28,391
 - restrictedAction2: 28,401
 - restrictedAction3: 28,435
*/
contract UsingInternalFunctions {
    address owner;
    uint256 value;

    constructor() {
        owner = msg.sender;
    }

    function onlyOwner() internal view {
        require(msg.sender == owner, "Not the owner");
    }

    function restrictedAction1() external {
        onlyOwner();
        value = 1;
    }

    function restrictedAction2() external {
        onlyOwner();
        value = 2;
    }

    function restrictedAction3() external {
        onlyOwner();
        value = 3;
    }
}
```

From the above example, we can see that:

- The contract using modifiers incurs higher deployment gas costs (195,435) compared to the contract using internal functions (159,309) due to repetition of the `onlyOwner` functionality in three functions.
- During runtime, each function using modifiers costs a fixed 24 gas units less than the functions using internal functions.

### Recommendations for Gas Optimization:

🌟 **Use Modifiers**: If runtime gas cost is your primary concern, and you are okay with the increase in deployment size, modifiers are a good choice. They reduce the gas cost during function calls by avoiding the jump to internal functions.

🌟 **Use Internal Functions**: If minimizing deployment gas cost and reducing the size of the creation code is more important, internal functions are preferable. They offer greater flexibility since they can be called at any point in a function, not just at the start or end.

By understanding these trade-offs, you can make more informed decisions to optimize your smart contract's gas consumption based on your specific needs.
