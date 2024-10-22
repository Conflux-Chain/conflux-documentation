---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - Solidity
  - gas-optimization
  - monolithic-architecture
  - contract-design
  - inter-contract-calls
  - modularity
  - ContractA
  - ContractB
  - MonolithicContract
tags:
  - Monolithic Architecture
  - GAS 优化
  - 智能合约
---

# Use Monolithic Contract Architecture

This tutorial explores how making the architecture of your smart contracts monolithic, rather than having several contracts that communicate with each other, can result in gas savings. Inter-contract calls can be expensive, and by consolidating logic into a single contract, you can avoid these costs, albeit with some trade-offs in terms of complexity and modularity.

In Solidity, the default approach might be to modularize your code into multiple contracts that interact with each other. While this is great for maintainability and separation of concerns, it can lead to increased gas costs due to the overhead of contract calls. By designing a monolithic architecture, where most of the logic resides within a single contract, you can reduce these gas costs.

**代码演示**

Below are two versions of a contract system. The first one uses multiple contracts that call each other, while the optimized version consolidates the logic into a single contract to minimize contract calls.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Multiple contracts approach
contract ContractA {
    uint256 public data;

    function setData(uint256 _data) public {
        data = _data;
    }

    function getData() public view returns (uint256) {
        return data;
    }
}

contract ContractB {
    ContractA public contractA;

    constructor(address _contractA) {
        contractA = ContractA(_contractA);
    }

    function updateAndFetchData(uint256 _data) public returns (uint256) {
        contractA.setData(_data);
        return contractA.getData();
    }
}

// Monolithic contract approach
contract MonolithicContract {
    uint256 public data;

    function setData(uint256 _data) public {
        data = _data;
    }

    function updateAndFetchData(uint256 _data) public returns (uint256) {
        data = _data;
        return data;
    }
}
```

In the optimized monolithic version, the `MonolithicContract` handles both setting and getting data within the same contract, eliminating the need for inter-contract calls. This approach can save approximately 20,000 gas units per call compared to the multiple contracts approach.

**Benefits of Monolithic Architecture**

- **Reduced Gas Costs**: Eliminates the overhead of contract calls, leading to significant gas savings.
- **Simplified Gas Management**: Easier to estimate and manage gas consumption when all logic resides in a single contract.

**Trade-offs**

- **Increased Complexity**: The contract might become more complex and harder to maintain.
- **Reduced Modularity**: Harder to reuse components in other contracts or projects.

**Recommendations for Gas Optimization**

🌟 Consolidate logic into fewer contracts to reduce inter-contract call overhead. Aim to implement most of your functionalities within a single contract where feasible. But you need to carefully evaluate the trade-offs between maintainability and gas costs.
