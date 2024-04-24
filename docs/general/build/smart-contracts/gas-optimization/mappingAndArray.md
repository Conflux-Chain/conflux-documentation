---
displayed_sidebar: generalSidebar
---

# Using Mappings vs Dynamic Arrays in Solidity

In Solidity, different data structures can significantly impact the gas costs associated with contract operations. This tutorial explores the differences in gas usage between **mappings** and **dynamic arrays** when performing typical operations like insertions, deletions, and retrievals. Understanding these differences can help developers optimize their smart contracts for both functionality and cost.

Solidity provides mappings and dynamic arrays as flexible data structures. Mappings offer a highly efficient key-value storage mechanism, usually costing less gas for operations compared to dynamic arrays, which may have variable sizes and require more complex management.

**Demo Code**

Below are two contracts demonstrating typical uses of mappings and dynamic arrays. These examples illustrate the operational gas costs associated with each.

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

**Mappings**: These are ideal for cases where the association between keys and values is critical. They are very efficient in gas consumption for insertion and retrieval, making them suitable for large datasets where the access pattern is unpredictable.

**Dynamic Arrays**: They offer flexibility but can be costly in gas, especially during operations that shift elements, such as deletions. Each `push` operation also carries a cost that might escalate with the array's size due to resizing.

Recommendations for gas optimization:

🌟 Use mappings when you need efficient, cost-effective storage and retrieval by keys.
🌟 Dynamic arrays are better suited for ordered storage and when elements need to be iterated over or managed sequentially.

By considering these aspects, developers can better design their smart contracts to balance functionality and operational costs effectively.
