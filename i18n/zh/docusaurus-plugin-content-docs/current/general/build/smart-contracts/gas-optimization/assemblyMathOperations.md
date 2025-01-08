---
displayed_sidebar: generalSidebar
---

# Using Assembly for Math Operations

When optimizing gas usage in Ethereum smart contracts, common mathematical operations can be made more efficient using assembly. While Solidity provides high-level math operations, using assembly implementations can lead to significant gas savings.

### Standard vs Assembly Math Operations

Here's a comparison showing both approaches:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MathOperations {
    // Standard implementation
    function standardMax(uint256 x, uint256 y) public pure returns (uint256) {
        return x > y ? x : y;
    }

    // Assembly optimized implementation
    function assemblyMax(uint256 x, uint256 y) public pure returns (uint256 z) {
        /// @solidity memory-safe-assembly
        assembly {
            z := xor(x, mul(xor(x, y), gt(y, x)))
        }
    }

    // Standard implementation
    function standardMin(uint256 x, uint256 y) public pure returns (uint256) {
        return x < y ? x : y;
    }

    // Assembly optimized implementation
    function assemblyMin(uint256 x, uint256 y) public pure returns (uint256 z) {
        /// @solidity memory-safe-assembly
        assembly {
            z := xor(x, mul(xor(x, y), lt(y, x)))
        }
    }
}
```

### Gas Comparison

| Operation | Standard Implementation  | Assembly Implementation  | Potential Savings        |
| --------- | ------------------------ | ------------------------ | ------------------------ |
| Max       | ~300 gas | ~200 gas | ~100 gas |
| Min       | ~300 gas | ~200 gas | ~100 gas |

### Common Assembly Math Operations

1. **Maximum Value**

```solidity
function max(uint256 x, uint256 y) public pure returns (uint256 z) {
    assembly {
        z := xor(x, mul(xor(x, y), gt(y, x)))
    }
}
```

2. **Minimum Value**

```solidity
function min(uint256 x, uint256 y) public pure returns (uint256 z) {
    assembly {
        z := xor(x, mul(xor(x, y), lt(y, x)))
    }
}
```

3. **Average (with rounding up)**

```solidity
function average(uint256 x, uint256 y) public pure returns (uint256 z) {
    assembly {
        z := add(div(add(x, y), 2), and(and(x, y), 1))
    }
}
```

### Why Assembly is More Efficient

1. **Fewer Operations**: Assembly implementations often use fewer EVM operations than their high-level counterparts.

2. **No Conditional Jumps**: Assembly implementations can avoid conditional jumps (JUMPI operations) which are gas-intensive.

3. **Direct Memory Access**: Assembly allows direct manipulation of values without additional overhead.

### When to Use Assembly Math

✅ **Recommended for:**

- High-frequency mathematical operations
- Gas-critical contracts
- Simple mathematical functions
- When maximum efficiency is required

❌ **Not recommended for:**

- Complex mathematical operations
- When code readability is crucial
- When maintaining type safety is important
- Inexperienced developers

### 其他资源

For more optimized math operations, consider exploring:

- [Solady Library](https://github.com/Vectorized/solady)
- [PRBMath Library](https://github.com/PaulRBerg/prb-math)

**Warning**: Assembly code bypasses Solidity's safety features. Ensure thorough testing and auditing before deployment.

#### 关于 gas 优化的建议：

🌟 Consider using these assembly implementations for frequently called math operations in your smart contracts.
