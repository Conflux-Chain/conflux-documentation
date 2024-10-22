---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - Solidity
  - gas-optimization
  - MethodId
  - calldata
  - EVM
  - function-names
  - zero-bytes
  - function-selectors
  - ExampleContract
tags:
  - MethodId Optimization
  - Gas Optimization
  - Contratos Inteligentes
---

# MethodId Optimization

When transactions are executed by the Ethereum Virtual Machine (EVM), the accompanying calldata, which specifies the contract function to be executed, incurs gas fees. These fees are calculated based on the calldata size, with 0 bytes costing 4 gas units and non-0 bytes costing 16 gas units. This pricing structure encourages the efficient use of calldata to reduce transaction costs, especially in contracts with high transaction volumes or complex operations.

The first four bytes of calldata, known as the MethodId, identify the specific contract function to be executed. Optimizing function names to increase the number of 0 bytes in the MethodId can reduce gas costs. This optimization is particularly impactful for frequently called functions, as it directly affects the overall gas efficiency of contract interactions.

We can optimize function names using this tool: [Online Function Name Optimizer](https://emn178.github.io/solidity-optimize-name/).

**Demo Code**

Below are examples of standard function calls and their optimized counterparts using **methodId optimization**.

```solidity
contract ExampleContract {
    // gas: 5285
    function exampleFunction() external {
    }
}

contract OptimizedExampleContract {
    // gas: 5265
    function exampleFunction_X8p() external {
    }
}
```

Recommendations for gas optimization:

🌟 By refining function names to maximize the occurrence of 0 bytes in the MethodId, we can decrease the gas expenses. (It's also important to note that this approach can affect code readability to some extent.)
