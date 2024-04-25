---
displayed_sidebar: generalSidebar
---

# Packing Structs

Packing struct items, similar to packing related state variables, can be an effective strategy to save gas in Solidity. It's essential to understand that struct members are stored sequentially in the contract's storage, beginning from the initial slot where they are declared. This characteristic not only allows for the efficient organization of individual variables within a slot but also extends to the packing of entire structs.

By designing your structs with an awareness of how storage is handled, you can significantly enhance the gas efficiency of your smart contract operations, which is critical for developing cost-effective and optimized contracts.

**Demo Code**

Consider two examples where struct members are arranged differently, affecting the number of storage slots they use and thus the gas cost.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ContractWithUnpackedStruct {
    struct ExampleStruct {
        uint64 creationTime; // Takes one slot - uses 64 bits (8 bytes) out of 256 bits (32 bytes).
        uint256 balance; // This will take a new slot because it is a complete 256 bits (32 bytes) value.
        address owner; // An address occupies only 160 bits (20 bytes).
    }
    // Starts at slot 0
    ExampleStruct public details = ExampleStruct(53_000, 21_000, address(0xdeadbeef));

    function getDetails() external view returns (ExampleStruct memory) {
        return details;
    }
}

contract ContractWithPackedStruct {
    struct EfficientStruct {
        uint64 creationTime; // In this case, both `creationTime` (64 bits) and `owner` (160 bits) are packed in the same slot.
        address owner; // Same slot as `creationTime`. Together they occupy 224 bits (28 bytes) out of 256 bits (32 bytes).
        uint256 balance; // This will take a new slot because it is a complete 256 bits (32 bytes) value.
    }

    // Starts at slot 0
    EfficientStruct public details = EfficientStruct(53_000, address(0xdeadbeef), 21_000);

    function getDetails() external view returns (EfficientStruct memory) {
        return details;
    }
}
```

When deployed and executed, the `ContractWithPackedStruct` will generally use less gas for storage operations compared to `ContractWithUnpackedStruct`. This difference arises because `ContractWithPackedStruct` optimizes the allocation of struct members to minimize the number of storage slots used.

- **ContractWithUnpackedStruct**: Each member of the struct is placed in a separate storage slot due to its data type and size, leading to three slots being used in total.
- **ContractWithPackedStruct**: The `creationTime` and `owner` are combined into a single slot, reducing the total slot usage for the struct members. Only two slots are used, which makes operations like reading and writing to these members cheaper in terms of gas.

**Recommendations for Gas Optimization:**

🌟 Carefully consider the order and types of your struct members. Packing smaller-sized types and logically grouping them can save storage slots.

🌟 Use smaller data types where possible and pack them together to maximize the usage of each 256-bit storage slot.
