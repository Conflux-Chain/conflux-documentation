---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - Solidity
  - gas-optimization
  - MethodId
  - function-sorting
  - EVM
  - function-calls
  - Optimizer
  - gas-efficiency
  - function-array
tags:
  - MethodId Sort Optimization
  - Gas Optimization
  - Contratos Inteligentes
---

# MethodId Sort Optimization

In the contract, all functions are organized into an array and systematically sorted by their MethodID, a unique identifier for each function. This organization not only streamlines the management of function calls but also facilitates quick access by imposing a structured order that can be efficiently searched during function executions.

When a function is called, the system does not immediately execute the function but begins a sequential search through the function array. It uses the MethodID to accurately locate and execute the intended function.

During this search process, each iteration of comparing MethodIDs incurs a gas cost of 22 units. This cost is associated with the computational effort required by the Ethereum Virtual Machine (EVM) to read and compare MethodIDs.

To optimize gas usage, particularly in contracts with numerous functions, it is advantageous for developers to order functions based on their frequency of calls. Placing the most commonly called functions at the beginning of the array can reduce the number of iterations needed for most calls, thereby reducing the overall gas costs and improving the efficiency of the contract.

**DemoCode**
In this example, calling the `func2_r3o` function saves 66 gas per call compared to calling `func1`. Assuming `func2` is the most frequently called function, optimizing it to `func2_r3o` and positioning its MethodID at the beginning of the array reduces comparison costs.

```solidity
contract Optimizer {
    // methodID: 0x74135154 
    // gas: 142
    function func1() external {
    }

    // methodId: 0xb1ade4db
    // gas: 164 
    function func2() external {
    }

    // methodId: 0x013d45d6
    // gas:120
    function func3() external {
    }

    // methodId: 0x000029ed
    // gas:98
    function func2_r3o() external {
    }
}
```

Recommendations for gas optimization:

🌟 By sorting functions based on the frequency of calls, and placing the most called function at the top of the array, we can reduce the gas cost, especially for high-frequency operations.

