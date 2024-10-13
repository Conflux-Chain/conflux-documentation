---
title: Gas Optimization
displayed_sidebar: generalSidebar
tags:
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
---

## Some Tips to Make Gas Fee Lower

### Optimize Data Storage
Use Tight Variable Packing: Group smaller data types together in a single storage slot to take advantage of Solidity's storage packing. For example, use uint8, uint16, or bool together in a struct to fit them into a single 32-byte storage slot.

Minimize State Variables: Only store essential data on-chain. Consider off-chain storage solutions (like IPFS) for larger data, and store hashes on-chain if integrity is needed.

Use bytes32 over string: If possible, use bytes32 for fixed-size strings, as it is more gas-efficient than the dynamically-sized string type.
### Optimize Function Execution
Use view and pure Functions: Mark functions that do not modify state with view (if they read the state) or pure (if they don't read the state) to reduce gas cost when called externally.

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
