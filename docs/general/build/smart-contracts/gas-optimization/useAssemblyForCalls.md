---
displayed_sidebar: generalSidebar
---

# Using Assembly for Function Calls

When optimizing gas usage in Ethereum smart contracts, interface calls can be expensive due to memory expansion costs. Using inline assembly for function calls can lead to significant gas savings by reusing existing memory space instead of allocating new memory.

Solidity's high-level interface calls automatically handle memory management but may create unnecessary memory allocations. By using assembly, we can optimize memory usage and reduce gas costs, especially for frequent function calls.

**Key Points:**

- Assembly allows reuse of existing memory space
- Can save significant gas on frequent external calls
- Requires careful handling of memory management
- Important to include contract existence checks

### Interface Calls vs Assembly Calls

Here's a comparison showing both approaches:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Standard interface approach
contract StandardCall {
    function callExternalFunction(address target, uint256 value) external {
        ITarget(target).setValue(value);
    }
}

// Optimized assembly approach
contract AssemblyCall {
    function callExternalFunction(address target, uint256 value) external {
        assembly {
            // Function selector for setValue(uint256)
            mstore(0x00, 0x55241077) // setValue(uint256) selector
            mstore(0x04, value)      // Store the parameter

            // Check if target is a contract
            if iszero(extcodesize(target)) {
                revert(0, 0)
            }

            // Make the call
            let success := call(
                gas(),      // Forward all gas
                target,     // Target address
                0,         // No ETH sent
                0x00,      // Input data start (in memory)
                0x24,      // Input data length (4 + 32 bytes)
                0x00,      // Output data start (in memory)
                0x00       // Output data length
            )

            // Check call result
            if iszero(success) {
                revert(0, 0)
            }
        }
    }
}

interface ITarget {
    function setValue(uint256 value) external;
}
```

### Gas Comparison

| Implementation          | Gas Cost (Approximate) |
| ----------------------- | ---------------------- |
| Standard Interface Call | ~30,570 gas            |
| Assembly Call           | ~30,350 gas            |
| Potential Savings       | ~220 gas               |

### Memory Layout for Assembly Calls

When using assembly for function calls, the memory is organized as follows:

```
Memory Layout:
0x00 - 0x03: Function selector (4 bytes)
0x04 - 0x23: First parameter (32 bytes)
0x24 - 0x43: Second parameter (if any)
...
```

### Best Practices

1. **Contract Existence Check**

```solidity
if iszero(extcodesize(target)) {
    revert(0, 0)
}
```

2. **Success Check**

```solidity
if iszero(success) {
    revert(0, 0)
}
```

3. **Memory Management**

- Use scratch space (0x00-0x40) for calls with small data requirements
- Reuse existing memory locations when possible
- Be careful not to overwrite important memory data

### When to Use Assembly Calls

✅ **Recommended for:**

- High-frequency function calls
- Simple function signatures
- Gas-critical operations
- When memory optimization is crucial

❌ **Not recommended for:**

- Complex function signatures
- When code readability is priority
- When maintaining type safety is crucial
- Inexperienced developers

### Security Considerations

1. Always include contract existence checks
2. Verify call success and handle errors
3. Be careful with memory management
4. Test thoroughly before deployment
5. Document assembly code clearly

**Warning**: Inline assembly is a low-level feature that bypasses many of Solidity's safety features. Use with caution and ensure thorough testing of your implementation.

### Example Gas Savings Calculation

For a contract making 1000 external calls:

- Interface calls: 30,570 \* 1000 = 30,570,000 gas
- Assembly calls: 30,350 \* 1000 = 30,350,000 gas
- Total savings: 220,000 gas

At 100 gwei gas price: 220,000 \* 100 = 22,000,000 gwei = 0.022 ETH saved

#### Recommendations for Gas Optimization:

🌟 When optimizing function calls in your smart contracts:

- Use assembly for frequently called functions where the gas savings will be significant
- Carefully manage memory usage and reuse existing memory spaces when possible
- Document your assembly code thoroughly for maintainability
- Consider the trade-off between gas savings and code complexity
