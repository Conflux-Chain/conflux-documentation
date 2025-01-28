---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - Solidity
  - gas-optimization
  - arrays
  - fixed-size-arrays
  - dynamic-arrays
  - memory-allocation
  - ArrayGasOpt
  - push-operation
  - storage-efficiency
tags:
  - 固定大小/动态数组
  - GAS 优化
  - 智能合约
---

# 固定大小/动态数组

In Solidity, the way you manage and interact with arrays can impact the gas cost of your smart contract operations. This tutorial demonstrates the difference in gas usage between **fixed-size arrays** and **dynamic arrays** when they are filled with values. This understanding can help developers make more cost-effective decisions when designing smart contracts.

Solidity支持两种数组类型：固定大小数组和动态数组。
Fixed-size arrays have a predefined length and occupy a continuous block of storage, while dynamic arrays can change in size and potentially consume more gas due to the need for resizing and memory allocation.

**演示代码**

To illustrate the differences in gas consumption between these two types of arrays, the contract `ArrayGasOpt` includes two functions: one for filling a dynamic array and another for a fixed-size array.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ArrayGasOpt {
    uint[] public dynamicArr;
    uint[1000] public staticArr;

    // fill dynamic-length array: 2,224,770 gas
    function fillDynamic() public {
        for(uint i = 0; i < 99; i++) {
            dynamicArr.push(i);
        }
    }

      // fill fixed-length array: 2,182,608 gas
    function fillStatic() public {
        for(uint i = 0; i < 99; i++) {
            staticArr[i] = i;
        }
    }
}
```

**Fixed-size Arrays**: These are generally more gas-efficient for storing a large number of elements known at compile time. 这是因为数组使用连续的存储块，从而减少了额外的内存分配或调整大小的需求。

**Dynamic Arrays**: While flexible, they can be more costly in terms of gas, especially when frequently resized or when elements are added in a loop. Each `push` operation might require additional gas to handle memory resizing, depending on the state of the array.

关于 gas 优化的建议：

🌟 When the size of the array is known beforehand and not expected to change, prefer using fixed-size arrays. Use dynamic arrays when you need flexibility in the size of the array.
