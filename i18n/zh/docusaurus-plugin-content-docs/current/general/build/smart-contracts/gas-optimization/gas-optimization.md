---
title: GAS 优化
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - gas-optimization
  - Solidity
  - EVM
  - storage
  - data-types
  - variable-packing
  - loops
  - functions
  - libraries
  - delegate-calls
tags:
  - GAS 优化
  - 智能合约
---

## 降低 gas 费用的小窍门

### 优化数据存储

使用紧凑的变量打包(Use Tight Variable Packing)：将较小的数据类型组合到一个单一的存储槽中，以利用 Solidity 的存储打包的优势。 例如，在一个结构体中将 uint8、uint16 或 bool 型组合使用，使它们适应单个 32 字节的存储槽。

最小化状态变量：仅在链上存储必要的数据。 对于较大的数据，考虑使用链下存储解决方案（如 IPFS），并在链上存储其哈希值以保证数据的完整性。

Use bytes32 over string: If possible, use bytes32 for fixed-size strings, as it is more gas-efficient than the dynamically-sized string type.

### 优化函数执行

使用 view 和 pure 修饰的函数：将不修改状态的函数标记为 view(如果只需要读取状态)或 pure(如果不需要读取状态)，这样在外部调用时可以减少 gas 消耗。

Limit Visibility: Use the most restrictive visibility (private or internal) for functions and variables, as operations are cheaper when they are internal to a contract.

Reuse Computed Values: Store computed values in local variables if they are used multiple times within a function to avoid redundant computation costs.

### Efficient Loops and Conditions

Avoid Loops When Possible: Loops can significantly increase gas costs, especially if their iteration count can grow. Consider alternatives like mapping for direct access.

Short-Circuit Evaluation: In if statements and logical expressions, order conditions by likelihood or cost. Solidity evaluates conditions from left to right and stops as soon as the result is determined.

### Use Libraries and Delegate Calls

Libraries for Reusable Code: Deploy reusable code as libraries. Libraries can be deployed once and then used by many contracts, reducing the deployment and execution gas costs.
Delegate Calls: Use delegate calls for modular architecture. This can reduce the amount of bytecode in a contract, lowering deployment and execution costs.

### Efficient Event Logging

Use Events for Data Not Requiring Immediate Retrieval: Instead of storing information that doesn't need to be immediately retrieved in storage variables, emit events. Logs cost significantly less gas than storage.

### Testing and Optimization Tools

Use Gas Reporting Tools: Tools like Hardhat and Truffle can report gas usage for contract functions. Identify high-gas functions for optimization.
Use Remix IDE: It provides detailed gas consumption for transactions and can help identify expensive operations.

### Upgradeable Contracts

Consider Proxy Patterns: Using proxies allows for the logic contract to be upgraded without redeploying the entire contract, saving gas on deploying large contracts.

### More Detailed Tutorial of Gas Optimization

- [Constant VS Immutable](/docs/general/build/smart-contracts/gas-optimization/constant)
