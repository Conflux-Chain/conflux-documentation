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
  - 方法标识（MethodId）优化
  - GAS 优化
  - 智能合约
---

# 方法标识（MethodId）优化

当以太坊虚拟机（EVM）执行交易时，随附的调用数据（calldata）指定了要执行的合约函数，会产生 gas 费。 These fees are calculated based on the calldata size, with 0 bytes costing 4 gas units and non-0 bytes costing 16 gas units. 这种定价结构鼓励有效利用调用数据以减少交易成本，特别是在交易量大或操作复杂的合约中。

The first four bytes of calldata, known as the MethodId, identify the specific contract function to be executed. Optimizing function names to increase the number of 0 bytes in the MethodId can reduce gas costs. 这种优化对需要频繁调用的函数的影响尤为明显，因为它直接影响了合约间的整体交互的 gas 效率。

We can optimize function names using this tool: [Online Function Name Optimizer](https://emn178.github.io/solidity-optimize-name/).

**代码演示**

以下是标准函数调用及其使用 **methodId 优化** 的优化对应示例。

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

关于 gas 优化的建议：

🌟 By refining function names to maximize the occurrence of 0 bytes in the MethodId, we can decrease the gas expenses. （需要注意的是，这种方法会在一定程度上影响代码的可读性。）
