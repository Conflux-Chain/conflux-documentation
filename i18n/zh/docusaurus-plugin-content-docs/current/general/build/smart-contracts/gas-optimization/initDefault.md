---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - Solidity
  - gas-optimization
  - variable-initialization
  - default-values
  - deployment-cost
  - EVM
  - state-variables
  - uint256
tags: [ Initialization, GAS 优化, 智能合约 ]
---

# Efficient Initialization

In Solidity, how you initialize state variables can have a impact on the deployment cost of your contracts, specifically in terms of gas usage. The Ethereum Virtual Machine (EVM) requires gas for every operation, including the initialization of variables.

**代码演示**

In the example below, we have two contracts, `Default` and `InitDefault`. Both contracts declare a state variable `foo` of type `uint256`. However, they differ in how `foo` is initialized:

- `Default` 不初始化`foo` ，因此依赖Solidity将其设置为`uint256`的默认值，即 `0`。
- `InitDefault` explicitly initializes `foo` to `0` during declaration.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Default {
    uint256 foo; // good: 67148 gas
}

contract InitDefault {
    uint256 foo = 0; // bad: 69332 gas
}
```

When the `Default` contract is deployed, it uses less gas (67,148 gas) compared to the `InitDefault` contract (69,332 gas).

The reason behind this difference is that explicitly initializing a variable to its default value generates additional bytecode, which in turn consumes more gas. Solidity's compiler optimizes storage by minimizing the need to explicitly set variables to their default values.

关于 gas 优化的建议：

🌟 If a variable does not need a value other than the default, do not explicitly initialize it. This reduces the contract’s deployment gas cost. While explicitly initializing variables can sometimes enhance code readability by making initial values explicit, it comes at the cost of increased gas.
