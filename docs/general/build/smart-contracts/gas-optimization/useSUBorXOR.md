---
displayed_sidebar: generalSidebar
---

# Using SUB or XOR Instead of ISZERO(EQ)

When optimizing gas usage in Ethereum smart contracts, comparison operations in assembly can be optimized by using SUB or XOR instead of ISZERO(EQ). This optimization can lead to gas savings in specific scenarios, particularly for equality checks.

### Standard EQ vs SUB/XOR Comparison

Here's a comparison showing different approaches:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

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

| Implementation     | Gas Cost (Approximate) |
| ----------------- | --------------------- |
| ISZERO(EQ)        | ~22 gas              |
| SUB               | ~20 gas              |
| XOR               | ~20 gas              |
| Potential Savings | ~2 gas per check     |

### When to Use Each Approach

#### SUB (Subtraction)
- Best for comparing numerical values or addresses
- Clearer intention in code
- No risk of bit-flip issues

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

```solidity
assembly {
    // Warning: XOR considers a value with all bits flipped as equal
    if xor(caller(), sload(owner.slot)) {
        revert(0, 0)
    }
}
```

### Security Considerations

⚠️ **XOR Vulnerability**
When using XOR for comparisons, be aware that it will consider a value with all bits flipped to be equal:
```solidity
A ⊕ B = 0           // Equal values
A ⊕ (NOT A) = 0     // Also considered equal!
```

### Best Practices

1. **Choose the Right Operation**
   - Use SUB for general equality checks
   - Use XOR only when bit manipulation is specifically needed
   - Consider readability vs gas savings

2. **Security First**
   - Avoid XOR for security-critical comparisons
   - Document the reason for using SUB/XOR over ISZERO(EQ)
   - Always test thoroughly with different inputs

3. **Context Matters**
   - Consider compiler optimizations
   - Test gas costs in your specific context
   - Balance minimal gas savings against code clarity

### When to Use This Optimization

✅ **Recommended for:**
- High-frequency equality checks
- Gas-critical loops or functions
- Simple numerical or address comparisons

❌ **Not recommended for:**
- Security-critical comparisons (when using XOR)
- Complex comparison logic
- When code clarity is paramount

**Warning**: Always verify that gas savings are meaningful in your specific context, as compiler optimizations might affect the actual benefits.

#### Gas Optimization Tips

🌟 For optimal results:
- Use SUB for most equality checks
- Avoid XOR unless specifically needed for bitwise operations
- Test gas costs with different compiler versions
- Document your optimization choices clearly
