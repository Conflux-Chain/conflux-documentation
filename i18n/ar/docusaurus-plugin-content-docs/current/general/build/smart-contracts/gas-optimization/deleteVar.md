---
displayed_sidebar: generalSidebar
---

# ResetVariable

In Solidity, using the `delete` keyword to remove a state variable resets it to the default value for its type. The default values differ according to the data type:

- **boolean**: The default value is `false`.
- **string**: The default value is an empty string `""`.
- **int**: The default value is `0`.
- **uint**: The default value is `0`.
- **enum**: The default value is the first element of the enumeration.
- **address**: The default value is `0x0000000000000000000000000000000000000000` (or `address(0)`).
- **function**: For `internal` functions, the default is an empty internal function, and for `external` functions, it is an empty external function.
- **mapping**: All elements are set to their default values.
- **struct**: All members are set to their default values.
- **Dynamic arrays**: The length is reset to `0`, effectively making it an empty array `[]`.
- **Static arrays**: All elements are set to their default values.

Compared to directly updating the state variable to its default value, the gas costs differ. When a state variable is removed using the `delete` keyword, Solidity generates a specific opcode, `SSTORE`, to set the variable's value to its type's default value. The `delete` operation is a high-level action recognized and optimized by the compiler, which can clear all related storage at once, whereas manually resetting might require more operations and higher gas costs.

**DemoCode**

The smart contract `ResetVariable` below defines a state variable `balance` and two different methods to delete the `balance` state variable data. These methods consume different amounts of gas:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract ResetVariable {
    uint balance;

    // Normal update of balance: 22238 gas
    function normalUpdate() external {
        balance = 1;
    }

    // Update and delete: 2316 gas
    function deleteAfterUpdate() external {
        balance = 1;
        delete balance;
    }

    // Update and assign to default value: 2360 gas
    function resetToDefault() external {
        balance = 1;
        balance = 0;
    }
}
```

Recommendations for gas optimization:

🌟 Compared to directly updating a state variable to its default value, using the delete keyword to remove the variable consumes less gas.
