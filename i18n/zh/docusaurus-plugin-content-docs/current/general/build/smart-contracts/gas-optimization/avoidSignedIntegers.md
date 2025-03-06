---
displayed_sidebar: generalSidebar
---

# 通过减少非零字节来降低燃气费用

When optimizing gas usage in smart contracts, it's crucial to consider every aspect of data representation. 有一种常被忽视的优化技术是在可能的情况下避免在 calldata 中使用有符号整数。 这种方法可以在处理小的负数时节省燃气费用。

以太坊对零字节的calldata收取`4`个燃气费用，而对非零字节收取`16`个燃气费用。 这种定价模式适用于函数调用。 因此，在某些场景下，使用无符号整数而非有符号整数可以节省燃气费用。

**要点:**

- Solidity 使用二进制补码表示有符号整数。
- 在二进制补码形式中，小的负数主要由非零字节组成。
- 在 calldata 中使用无符号整数可以导致更多的零字节，从而降低燃气成本。

**例如:**
数字 `-1`在二进制补码中表示为`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff` (256 位)。

### Understanding Two's Complement

二进制补码是一种用于在二进制中表示带符号整数的数学运算。 在该系统中，负数是通过反转正数的所有位并加1来表示的。

**二进制补码示例:**

| 十进制  | 8 位二进制(无符号数) | 8 位二进制(带符号数，二进制补码) |
| ---- | ------------------------------- | ------------------------------------- |
| 1    | 00000001                        | 00000001                              |
| -1   | N/A                             | 11111111                              |
| 127  | 01111111                        | 01111111                              |
| -128 | N/A                             | 10000000                              |

### Gas Savings Analysis

Let's compare the gas costs for using signed vs. unsigned integers in calldata:

| 场景                              | 燃气消耗                                                                                            | 总燃气     |
| ------------------------------- | ----------------------------------------------------------------------------------------------- | ------- |
| 使用带符号整数 (-1) | 32 non-zero bytes (32 × 16 gas)                                              | 512 gas |
| 使用无符号整数 (1)  | 31 zero bytes (31 × 4 gas) + 1 non-zero byte (1 × 16 gas) | 140 gas |

### 实现优化

下面是如何在智能合约中实现这个优化的示例：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OptimizedContract {
    // Less efficient for negative numbers
    function processSignedInteger(int256 value) external pure returns (int256) {
        return value * 2;
    }

    // More efficient, especially for small numbers
    function processUnsignedInteger(uint256 value) external pure returns (uint256) {
        return value * 2;
    }

    // If negative values are necessary, consider offsetting
    function processOffsetInteger(uint256 value) external pure returns (int256) {
        // Assuming the range is -128 to 127
        require(value <= 255, "Value out of range");
        return int256(value) - 128;
    }
}
```

### 燃气优化建议

🌟 在设计接受整数参数的函数时：

1. 尽可能使用无符号整数 (`uint`)而不是有符号整数 (`int`) 。
2. 如果必须使用负数，考虑使用偏移量方法，通过无符号整数表示值的范围，并在合约逻辑中应用偏移量。
3. 请注意权衡利弊：虽然这个优化可以节省燃气，但它可能会使合约的使用变得不那么直观，并且需要额外的文档说明。

**安全提示**: 在实现此优化时，确保你的合约逻辑能够正确处理所有预期值的范围。 不当使用无符号整数或偏移量表示法，如果不认真管理，可能导致下溢或溢出问题。

