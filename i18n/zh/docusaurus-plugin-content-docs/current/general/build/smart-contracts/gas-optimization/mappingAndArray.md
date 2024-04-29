---
displayed_sidebar: generalSidebar
---

# 映射 vs 动态数组

在 Solidity 中，不同的数据结构会显著影响因合约操作而产生的 gas 成本。 本文探讨了在执行插入、删除和检索等典型操作时，**映射** 和 **动态数组** 在 gas 使用上的差异。 了解这些差异可以帮助开发者优化他们的智能合约，以优化合约功能并控制成本。

Solidity 提供了映射和动态数组这两种灵活的数据结构。 映射提供了一种高效的键值存储机制，通常比动态数组的操作花费的 gas 更少，因为动态数组的大小通常可变且需要更复杂的管理。

**代码演示**

以下是演示映射和动态数组的典型用法的两个合约。 这些示例展示了每种操作的 gas 成本。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract UseMapping {
    mapping(uint => uint) public data;

    // 插入: 22,385 gas
    function insert(uint key, uint value) public {
        data[key] = value;
    }

    // 删除: 305 gas
    function remove(uint key) public {
        delete data[key];
    }

    // 检索: 451 gas
    function get(uint key) public view returns (uint) {
        return data[key];
    }
}

contract UseArray {
    uint[] public data;

    // 插入: 44,442 gas
    function insert(uint value) public {
        data.push(value);
    }

    // 删除: 748 gas
    function remove(uint index) public {
        require(index < data.length, "Index out of bounds");
        for (uint i = index; i < data.length - 1; i++) {
            data[i] = data[i + 1];
        }
        data.pop();
    }

    // 检索: 710 gas
    function get(uint index) public view returns (uint) {
        require(index < data.length, "Index out of bounds");
        return data[index];
    }
}
```

**映射**：适用于键和值之间是强关联的情况。 在插入和检索操作中，映射可以十分高效地控制 gas 消耗，因此在访问模式不可预测的大数据集中映射十分适用。 与数组不同，映射不会进行边界检查，虽然这一特性可以节省访问元素时的 gas 消耗，但需要小心因为读取到不存在的键而导致出错。

**动态数组**：它们提供了高灵活性，但在进行元素移动操作（如删除）时 gas 成本可能很高。 每个 `push` 操作也需要成本，而且可能随着数组大小的增加而增加。 Solidity 中的数组具有内置的边界检查，这虽然因为防止了越界访问而提高了安全性，但也增加了 gas 开销。

关于 gas 优化的建议：

🌟 当您需要存储一系列需要特定排序，并且可由特定的键或索引访问的项目时，使用映射可以通过键实现高效且经济的存储和检索。
