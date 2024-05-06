---
displayed_sidebar: generalSidebar
---

# Mapping vs Dynamic Array

In Solidity, different data structures can significantly impact the gas costs associated with contract operations. This article explores the differences in gas usage between **mapping** and **dynamic array** when performing typical operations like insertions, deletions, and retrievals. Understanding these differences can help developers optimize their smart contracts for both functionality and cost.

Solidity provides mapping and dynamic array as flexible data structures. Mapping offers a highly efficient key-value storage mechanism, usually costing less gas for operations compared to dynamic array, which may have variable sizes and require more complex management.

**Demo Code**

Below are two contracts demonstrating typical uses of mapping and dynamic array. These examples illustrate the operational gas costs associated with each.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract UseMapping {
    mapping(uint => uint) public data;

    // Insertion: 22,385 gas
    function insert(uint key, uint value) public {
        data[key] = value;
    }

    // Deletion: 305 gas
    function remove(uint key) public {
        delete data[key];
    }

    // Retrieval: 451 gas
    function get(uint key) public view returns (uint) {
        return data[key];
    }
}

contract UseArray {
    uint[] public data;

    // Insertion: 44,442 gas
    function insert(uint value) public {
        data.push(value);
    }

    // Deletion: 748 gas
    function remove(uint index) public {
        require(index < data.length, "Index out of bounds");
        for (uint i = index; i < data.length - 1; i++) {
            data[i] = data[i + 1];
        }
        data.pop();
    }

    // Retrieval: 710 gas
    function get(uint index) public view returns (uint) {
        require(index < data.length, "Index out of bounds");
        return data[index];
    }
}
```

**Mapping**: These are ideal for cases where the association between keys and values is critical. They are very efficient in gas consumption for insertion and retrieval, making them suitable for large datasets where the access pattern is unpredictable. Unlike arrays, mappings do not perform bounds checking, which saves gas when accessing elements but requires careful handling to avoid errors in reading non-existent keys.

**Dynamic Array**: They offer flexibility but can be costly in gas, especially during operations that shift elements, such as deletions. Each `push` operation also carries a cost that might escalate with the array's size due to resizing. Arrays in Solidity have built-in bounds checking which, although ensures safety against out-of-bounds access, comes with a gas overhead.

Recommendations for gas optimization:

🌟 When you need to store a collection of items that require specific ordering and access via a predetermined key or index, opt for mappings to achieve efficient and economical storage and retrieval by key.
