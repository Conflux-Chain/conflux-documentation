---
displayed_sidebar: generalSidebar
---

# Reducing Gas Costs through Reduction of Non-Zero Bytes

When optimizing gas usage in smart contracts, it's crucial to consider every aspect of data representation. One often overlooked optimization technique involves avoiding signed integers in calldata when possible. This approach can lead to gas savings, especially when dealing with small negative numbers.

Ethereum charges `4` gas for a zero byte of calldata and `16` gas for a non-zero byte. This pricing model applies during function calls. As a result, using unsigned integers instead of signed integers can lead to gas savings in certain scenarios.

**Key Points:**

- Solidity uses two's complement to represent signed integers.
- Small negative numbers in two's complement form consist mostly of non-zero bytes.
- Using unsigned integers in calldata can result in more zero bytes, thus reducing gas costs.

**Example:**
The number `-1` is represented as `0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff` in two's complement form (256 bits).

### Understanding Two's Complement

Two's complement is a mathematical operation used to represent signed integers in binary. In this system, negative numbers are represented by inverting all the bits of the positive number and adding 1.

**Example of Two's Complement:**

| Decimal | 8-bit Binary (Unsigned) | 8-bit Binary (Signed, Two's Complement) |
| ------- | ------------------------------------------ | ---------------------------------------------------------- |
| 1       | 00000001                                   | 00000001                                                   |
| -1      | N/A                                        | 11111111                                                   |
| 127     | 01111111                                   | 01111111                                                   |
| -128    | N/A                                        | 10000000                                                   |

### Gas Savings Analysis

Let's compare the gas costs for using signed vs. unsigned integers in calldata:

| Scenario                                      | Gas Consumption                                                                                 | Total Gas |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------- |
| Using signed integer (-1)  | 32 non-zero bytes (32 × 16 gas)                                              | 512 gas   |
| Using unsigned integer (1) | 31 zero bytes (31 × 4 gas) + 1 non-zero byte (1 × 16 gas) | 140 gas   |

### Implementing the Optimization

Here's an example of how to implement this optimization in your smart contracts:

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

### Recommendations for Gas Optimization

🌟 When designing functions that accept integer parameters:

1. Use unsigned integers (`uint`) instead of signed integers (`int`) whenever possible.
2. If negative values are necessary, consider using an offset approach where you represent the range of values using unsigned integers and apply the offset in the contract logic.
3. Be aware of the trade-offs: while this optimization can save gas, it may make your contract less intuitive to use and require additional documentation.

**Security Note**: When implementing this optimization, ensure that your contract logic correctly handles the full range of expected values. Improper use of unsigned integers or offset representations can lead to underflow or overflow issues if not carefully managed.
