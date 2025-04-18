---
displayed_sidebar: generalSidebar
---

# Using SUB or XOR Instead of ISZERO(EQ)

When optimizing gas usage in Ethereum smart contracts, comparison operations in assembly can be optimized by using SUB or XOR instead of ISZERO(EQ). This optimization can lead to gas savings in specific scenarios, particularly for equality checks.

### Standard EQ vs SUB/XOR Comparison

Here's a comparison showing different approaches:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ComparisonExample {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // Standard EQ approach
    function checkOwnerEQ() external view {
        assembly {
            if iszero(eq(caller(), sload(owner.slot))) {
                revert(0, 0)
            }
        }
    }

    // Optimized SUB approach
    function checkOwnerSUB() external view {
        assembly {
            if sub(caller(), sload(owner.slot)) {
                revert(0, 0)
            }
        }
    }

    // Alternative XOR approach
    function checkOwnerXOR() external view {
        assembly {
            if xor(caller(), sload(owner.slot)) {
                revert(0, 0)
            }
        }
    }
}
```

### Gas Comparison

| Implementation                | Gas Cost (Approximate) |
| ----------------------------- | ----------------------------------------- |
| ISZERO(EQ) | ~22 gas                   |
| SUB                           | ~20 gas                   |
| XOR                           | ~20 gas                   |
| Potential Savings             | ~2 gas per check          |

### When to Use Each Approach

#### ISZERO(EQ)

- Standard approach for equality checks
- Clear and straightforward
- Slightly higher gas cost compared to SUB and XOR

#### SUB (Subtraction)

- Best for comparing numerical values or addresses
- Clearer intention in code
- No risk of bit-flip issues
- Slightly more gas efficient than ISZERO(EQ)

```solidity
assembly {
    // Reverts if caller is not owner
    if sub(caller(), sload(owner.slot)) {
        revert(0, 0)
    }
}
```

#### XOR (Exclusive OR)

- Slightly more efficient for bitwise operations
- Must be used carefully due to bit-flip vulnerability
- Not recommended for security-critical comparisons
- Slightly more gas efficient than ISZERO(EQ)

```solidity
assembly {
    if xor(caller(), sload(owner.slot)) {
        revert(0, 0)
    }
}
```

### When to Use This Optimization

✅ **Recommended for:**

- High-frequency equality checks
- Gas-critical loops or functions
- Simple numerical or address comparisons

❌ **Not recommended for:**

- Security-critical comparisons (when using XOR)
- Complex comparison logic
- When code clarity is paramount

#### Gas Optimization Tips

🌟 Use SUB for equality checks to save gas, avoid XOR unless necessary for bitwise operations, and ensure to document your optimization decisions clearly.
