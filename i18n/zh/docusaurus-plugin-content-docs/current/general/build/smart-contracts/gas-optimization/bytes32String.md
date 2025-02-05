---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - gas-optimization
  - bitmap
  - bitwise-operations
  - Solidity
  - uint8
  - boolean-array
  - AND-operation
  - bit-shift
  - gas-efficiency
tags:
  - Bytes32 与 String
  - GAS 优化
  - 智能合约
---

# Bytes32 与 String

在 Solidity 中，不同的数据存储类型的选择可能会在合约操作时带来不同的 gas 消耗，尤其是存储或修改状态变量时。 以太坊虚拟机（EVM）对所有操作收取燃气费，选择使用`bytes32`或 `string`类型会影响这些消耗。

**代码演示**

Below, we present two simple contracts, `SetBytes32` and `SetString`, which illustrate the difference in gas usage when setting a `bytes32` type versus a `string` type with the same content.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SetBytes32 {
    bytes32 public b32;

    // use bytes32: 22222 gas
    function setBytes32() public {
        b32 = "Hello Conflux!";
    }
}

contract SetString {
    string public str;

    // use string: 22682 gas
    function setString() public {
        str = "Hello Conflux!";
    }
}
```

When deployed and executed, the `SetBytes32` contract uses less gas (22,222 gas) compared to the `SetString` contract (22,682 gas). The difference, while not substantial, highlights how `bytes32` is more gas-efficient for storing fixed-size data compared to `string`, which is designed for dynamically sized data.

**关于节省燃气的详细说明**

The choice between `bytes32` and `string` in Solidity impacts gas consumption due to the differences in how each handles data storage:

- **bytes32**: 固定大小的数据类型，无论内容长度如何，固定占用32个字节。 Since `bytes32` is fixed, there's no need for additional space to store data length, simplifying the contract's storage requirements. 在以太坊智能合约中，存储操作很昂贵，但是 `bytes32`通过紧凑地适应EVM的单个存储槽（恰好为32字节）优化这些操作。 This configuration allows for efficient read and write operations, minimizing gas costs.

- **string**: 动态大小的数据类型，每次存储时都需要额外存储长度信息。 这种动态特性带来了复杂性，`string`常常占用多个存储槽，特别是超过32字节时。 Managing these dynamic arrays increases computational demands for locating the start and end points of the data, leading to higher gas usage.

**燃气优化建议:**

对于长度不超过32字节的固定长度字符串，请使用`bytes32`，对于可变长度内容或长度可能超过32字节的情况，请使用`string`。

🌟 尽可能使用`bytes32`来存储固定大小的数据，以节省燃气消耗。
