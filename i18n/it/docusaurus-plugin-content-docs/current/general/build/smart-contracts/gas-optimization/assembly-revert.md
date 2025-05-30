---
displayed_sidebar: generalSidebar
---

# Using assembly to revert with an error message

When optimizing gas usage in smart contracts, using assembly for revert statements can lead to gas savings. While Solidity's `require` and `revert` statements are convenient, implementing the same functionality with assembly can be more gas-efficient.

Solidity charges additional gas for memory expansion and type checking when using standard revert statements. By using assembly, we can bypass these overhead costs while maintaining the same functionality.

### Gas Comparison Example

Here's a comparative example showing both approaches:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SolidityRevert {
    address owner;
    uint256 specialNumber = 1;

    constructor() {
        owner = msg.sender;
    }

    function restrictedAction(uint256 num) external {
        require(owner == msg.sender, "caller is not owner");
        specialNumber = num;
    }
}

contract AssemblyRevert {
    address owner;
    uint256 specialNumber = 1;

    constructor() {
        owner = msg.sender;
    }

    function restrictedAction(uint256 num) external {
        assembly {
            if sub(caller(), sload(owner.slot)) {
                // Store offset to error message length
                mstore(0x00, 0x20)
                // Store length of error message
                mstore(0x20, 0x13)
                // Store the error message
                mstore(0x40, 0x63616c6c6572206973206e6f74206f776e657200000000000000000000000000)

                // Revert with data (offset, size)
                revert(0x00, 0x60)
            }
        }
        specialNumber = num;
    }
}
```

### Gas Analysis

| Implementation  | Gas Cost | Gas Saved |
| --------------- | -------- | --------- |
| Solidity Revert | 24,042   | -         |
| Assembly Revert | 23,734   | 308       |

### Understanding the Assembly Implementation

The assembly revert implementation consists of several key components:

1. **Condition Check**:

```solidity
if sub(caller(), sload(owner.slot))
```

2. **Memory Layout**:

- `0x00`: Stores the offset (0x20)
- `0x20`: Stores the error message length (0x13 = 19 bytes)
- `0x40`: Stores the actual error message in hex

3. **Revert Operation**:

```solidity
revert(0x00, 0x60)
```

The first parameter (0x00) is the memory offset, and the second (0x60) is the size of the data to revert with.

**Key Points:**

- Assembly revert statements are more gas-efficient than Solidity's `require` and `revert`
- Gas savings come from avoiding memory expansion costs and compiler type checks
- The same error messages can be preserved while reducing gas costs

### Best Practices for Implementation

1. Use assembly revert in frequently called functions where gas optimization is crucial
2. Maintain clear documentation when using assembly code
3. Consider the trade-off between code readability and gas optimization
4. Test thoroughly to ensure error messages are correctly encoded

### Security Considerations

While using assembly for revert statements is safe when implemented correctly, keep in mind:

- Assembly code bypasses Solidity's safety checks
- Careful testing is required to ensure error messages are properly encoded
- Documentation is crucial for maintainability

**Note**: The gas savings shown are approximate and may vary depending on the Solidity version and optimization settings used.