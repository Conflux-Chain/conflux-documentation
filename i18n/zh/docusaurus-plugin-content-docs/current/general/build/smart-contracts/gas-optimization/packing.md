---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - gas-optimization
  - Solidity
  - variable-packing
  - struct-packing
  - storage-slots
  - EVM
  - uint64
  - uint256
  - 地址
  - gas-efficiency
tags:
  - Packing
  - GAS 优化
  - 智能合约
---

# Packing

### 变量打包

以太坊虚拟机（EVM）以连续的 32 字节槽存储变量。 当我们将多个变量放在单个槽中时，这称为变量打包。

如果我们试图打包的变量超过了当前槽的 32 字节限制，它们将被存储在一个新的槽中。 确定变量之间最优的组合方式，以最大化地减少空间浪费非常重要。

尽管 Solidity 会自动尝试将较小的基本类型打包到同一个槽中，但不良的结构成员排序可能会阻止编译器这样做。

了解更多：[存储状态变量的布局](https://docs.soliditylang.org/en/v0.8.25/internals/layout_in_storage.html)

**代码演示**

以下，我们演示了如何在合约中使用打包，并对比了 gas 使用情况。

```solidity

// gas: 188616
contract Standard {
    uint64 a = 5;
    uint256 b = 5;
    uint64 c = 5;
}

// gas: 166178
contract OptimizedPacking {
    uint256 b = 5;
    uint64 a = 5;
    uint64 c = 5;
}
```

关于 gas 优化的建议：

🌟在选择数据类型时注意变量打包。 如果可能将变量与其他变量打包到单个存储槽中，那么选择较小的数据类型可能会有利。

### Struct Packing

Packing struct items, similar to packing related state variables, can be an effective strategy to save gas in Solidity. It's essential to understand that struct members are stored sequentially in the contract's storage, beginning from the initial slot where they are declared. This characteristic not only allows for the efficient organization of individual variables within a slot but also extends to the packing of entire structs.

By designing your structs with an awareness of how storage is handled, you can enhance the gas efficiency of your smart contract operations, which is critical for developing cost-effective and optimized contracts.

**代码演示**

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

**燃气优化建议:**

🌟 Carefully consider the order and types of your struct members. Packing smaller-sized types and logically grouping them can save storage slots.

🌟 Use smaller data types where possible and pack them together to maximize the usage of each 256-bit storage slot.