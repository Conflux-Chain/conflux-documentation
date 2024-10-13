---
displayed_sidebar: generalSidebar
sidebar_position: 2
tags:
  - smart-contracts
  - Solidity
  - gas-optimization
  - memory
  - calldata
  - data-location
  - EVM
  - function-parameters
  - CalldataAndMemory
---
# Memory vs Calldata 

1. `memory`: Typically used for function parameters and temporary variables within functions. Stored in memory and not persistent on the blockchain.

2. `calldata`: Similar to memory, stored in memory and not persistent on the blockchain. The key difference is that calldata variables are immutable and commonly used for function parameters.


Learn more:
[Data location and assignment behavior](https://docs.soliditylang.org/en/latest/types.html#data-location)

Below, we demonstrate how to write data using both `calldata` and `memory` 

```solidity
contract CalldataAndMemory {
    struct Confi {
        uint16 age;
        string name;
        string wish;
    }

    Confi John;
    Confi Jane;

    function writeToJohn(Confi calldata JohnData) external {
        John = JohnData;
    }

    function writeToJane(Confi memory JaneData) external {
        Jane = JaneData;
    }
}
```

Recommendations for gas optimization:

🌟 In practical situations, if it's possible to use calldata, it is recommended to use `calldata` instead of `memory`.


