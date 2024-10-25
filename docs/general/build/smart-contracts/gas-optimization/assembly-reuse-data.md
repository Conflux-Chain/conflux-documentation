---
displayed_sidebar: generalSidebar
---

# Using Assembly for External Calls

When optimizing gas usage in Ethereum smart contracts, function calls to external contracts can be optimized using inline assembly. While Solidity's high-level interface calls are convenient, they incur additional memory expansion costs. Using assembly can help reduce gas consumption by reusing existing memory space.

**Key Points:**

- Assembly calls can save gas by reusing memory space
- Particularly effective when calldata is less than 64 bytes
- Requires careful handling of security checks
- Can save ~200-300 gas per call compared to interface calls

### Standard Interface Call vs Assembly Call

Here's a comparison of the two approaches:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Target contract
contract TargetContract {
    uint256 public value;
    
    function setValue(uint256 _value) external {
        value = _value;
    }
}

// Standard interface approach
contract StandardCaller {
    function setValueStandard(address target, uint256 num) external {
        TargetContract(target).setValue(num);
    }
}

// Optimized assembly approach
contract AssemblyCaller {
    function setValueAssembly(address target, uint256 num) external {
        assembly {
            // Function selector for setValue(uint256)
            mstore(0x00, hex"55241077") // setValue(uint256) selector
            mstore(0x04, num)          // Store the argument

            // Security check: ensure target is a contract
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

            // Check call success
            if iszero(success) {
                revert(0, 0)
            }
        }
    }
}
```

### Gas Analysis

| Approach | Approximate Gas Cost | Memory Operations |
|----------|---------------------|-------------------|
| Interface Call | ~30,570 | New memory allocation |
| Assembly Call | ~30,350 | Reuses memory space |
| Potential Savings | ~220 gas | - |

### Implementation Details

#### Function Selector Calculation

The function selector is the first 4 bytes of the keccak256 hash of the function signature. You can calculate it using:

```javascript
import { ethers } from "ethers";

const selector = ethers.id("setValue(uint256)").slice(0, 10);
console.log(selector); // "0x55241077"
```

#### Memory Layout

When using assembly for the call:

```text
Memory Position | Content
0x00 - 0x04    | Function selector (4 bytes)
0x04 - 0x24    | First parameter (32 bytes)
```

### Best Practices and Security Considerations

1. **Always Check Contract Existence**
   ```solidity
   if iszero(extcodesize(target)) {
       revert(0, 0)
   }
   ```

2. **Verify Call Success**
   ```solidity
   if iszero(success) {
       revert(0, 0)
   }
   ```

3. **Document Memory Usage**
   -