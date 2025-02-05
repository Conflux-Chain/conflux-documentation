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

# 使用单体合约架构

This tutorial explores how making the architecture of your smart contracts monolithic, rather than having several contracts that communicate with each other, can result in gas savings. 合约间的调用可能会非常昂贵，通过将逻辑整合到单个合约中，可以避免这些成本，尽管在复杂性和模块化方面会有一些权衡。

在 Solidity 中，默认的方法可能是将代码模块化为多个相互交互的合约。 虽然这对于可维护性和关注点分离非常有利，但由于合约调用的开销，可能会导致 gas 成本增加。 通过设计单体架构，大多数逻辑都在单个合约中，可以降低这些 gas 成本。

**代码演示**

以下是一个合约的两个版本。 第一版本使用多个相互调用的合约，而优化版则将逻辑整合到一个单一的合约中，以最小化合约调用。

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

在优化的单体版本中，`MonolithicContract`在同一个合约中设置和获取数据，消除了合约间调用的需求。 与多合约方法相比，这种方法每次调用大约可以节省 20,000 个 gas 单位。

**单体构架的好处**

- **降低 gas 成本**: 消除了合约调用的开销，显著节省 gas。
- **简化Gas管理**:：当所有逻辑在单个合约中时，更容易估算和管理 gas 消耗。

**权衡**

- **增加复杂性**：合约可能变得更加复杂且难以维护。
- **降低模块化程度**:更难在其他合约或项目中重复使用组件。

**燃气优化建议**

🌟 将逻辑整合到较少的合约中，以减少合约间调用的开销。 在可行的情况下，尽量在单个合约中实现大部分功能。 但您需要仔细评估可维护性和 gas 成本之间的权衡。
