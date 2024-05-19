---
title: Safe Downcasting in Solidity
displayed_sidebar: generalSidebar
---

In Solidity, downcasting from a larger integer type to a smaller one can be hazardous due to the lack of automatic overflow checks. This tutorial explains the risks of downcasting, provides an example of a problematic function, and offers a solution using a library like SafeCast to ensure safe operations.

## The Problem with Downcasting

Downcasting an integer in Solidity does not automatically check for overflow. This can lead to unexpected behavior and vulnerabilities if not handled properly. Here’s an example of a function that demonstrates this issue:

```solidity
function test(int256 value) public pure returns (int8) {
    return int8(value + 1); // Overflows and does not revert
}
```

In this function, adding 1 to a large `int256` value and casting it to `int8` can cause an overflow. Because Solidity does not revert on such overflows, the result can be incorrect, leading to potential vulnerabilities in your contract logic.

## Safe Downcasting with SafeCast

To prevent overflow issues during downcasting, you can use the `SafeCast` library provided by OpenZeppelin. This library provides functions that revert the transaction if an overflow occurs, ensuring safe operations.

### Example: Safe Downcasting

Here’s how you can modify the function to safely downcast using the `SafeCast` library:

1. **Import SafeCast Library**:

   ```solidity
   import "@openzeppelin/contracts/utils/math/SafeCast.sol";
   ```

2. **Use SafeCast for Downcasting**:
   ```solidity
   function test(int256 value) public pure returns (int8) {
       return SafeCast.toInt8(value + 1); // Reverts on overflow
   }
   ```

In this updated function, `SafeCast.toInt8(value + 1)` ensures that if the value cannot be safely cast to `int8`, the transaction will revert, thus preventing overflow-related issues.

### Full Contract Example

Here’s a complete example demonstrating safe downcasting using the `SafeCast` library:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeCast.sol";

contract SafeDowncasting {
    using SafeCast for int256;

    function test(int256 value) public pure returns (int8) {
        return value.toInt8(); // Reverts on overflow
    }
}
```

## Conclusion

Downcasting in Solidity requires careful handling to prevent overflow vulnerabilities. By leveraging the `SafeCast` library, you can ensure safe downcasting operations and protect your smart contracts from potential risks. Always prioritize security and adopt safe coding practices in your Solidity development.
