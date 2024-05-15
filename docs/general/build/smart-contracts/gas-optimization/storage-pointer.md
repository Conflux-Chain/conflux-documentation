---
displayed_sidebar: generalSidebar
---

# Efficient Use of Storage Pointers in Solidity

Solidity smart contracts can significantly benefit from optimal storage use, which can directly impact the gas costs associated with contract operations. This tutorial explores how using storage pointers instead of copying data to memory can result in substantial gas savings. Storage pointers allow developers to directly reference storage without unnecessary copying of data, leading to more efficient smart contract execution.

**Context and Optimization**

In Solidity, the default behavior when interacting with complex data types like structs from mappings is to copy them into memory. However, this can be inefficient when only a subset of the data is needed. By using storage pointers, we can directly reference and manipulate these data types in storage, thus avoiding the gas costs associated with memory operations.

**Demo Code**

Below are two versions of a contract. The first one uses memory for temporary storage of data, while the optimized version uses storage pointers to reduce gas consumption.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UserActivityUnoptimized {
    struct User {
        uint256 id;
        string name;
        uint256 lastSeen;
    }

    mapping(uint256 => User) public users;

    constructor() {
        users[0] = User(0, "John Doe", block.timestamp);
    }

    // Returns the number of seconds since the user was last seen.
    function secondsSinceLastSeen(uint256 userId) public view returns (uint256) {
        User memory user = users[userId];
        return block.timestamp - user.lastSeen;
    }
}

contract UserActivityOptimized {
    struct User {
        uint256 id;
        string name;
        uint256 lastSeen;
    }

    mapping(uint256 => User) public users;

    constructor() {
        users[0] = User(0, "John Doe", block.timestamp);
    }

    // Optimized function using a storage pointer.
    function secondsSinceLastSeenOptimized(uint256 userId) public view returns (uint256) {
        User storage user = users[userId];
        return block.timestamp - user.lastSeen;
    }
}
```

**Explanation of the Optimization**

The optimized contract demonstrates an approximate gas saving of 5,000 units compared to the unoptimized version. The key change here is the use of a storage pointer (`User storage user = users[userId]`) instead of copying the User struct to memory. This method significantly reduces the number of storage operations performed:

- **Unoptimized Version**: Copies entire struct from storage to memory, involving multiple storage reads.
- **Optimized Version**: Directly references the struct in storage using a storage pointer, minimizing the storage access to only what is necessary.

**Recommendations for Gas Optimization**

🌟 Use storage pointers to manipulate or read data directly in storage when only a specific part of the data structure is needed, avoiding unnecessary copying to memory.
🌟 Understand the context and access patterns of your data to determine when storage pointers are more beneficial than memory copies.

