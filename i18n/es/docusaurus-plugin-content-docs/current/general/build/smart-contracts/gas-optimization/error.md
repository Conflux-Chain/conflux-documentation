---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - Solidity
  - gas-optimization
  - error-handling
  - revertir
  - require
  - assert
  - custom-errors
  - gas-consumption
  - EVM
tags:
  - Error
  - Gas Optimization
  - Contratos Inteligentes
---

# Error

In Solidity, developers can define errors in three main forms: `revert`, `require`, and `assert`. The main differences between these methods from a functional perspective are two-fold:

1. Whether they can throw developer-defined error reasons;
2. Whether they can throw developer-defined errors carrying variables;

The main differences are as follows:

| Type      | Custom Reason | Carries Variable | Example                                                                                                   |
| --------- | ------------- | ---------------- | --------------------------------------------------------------------------------------------------------- |
| `revert`  | ✅             | ✅                | Reason: UnauthorizedAccess(0x05D01CAF54524A610CCF187082201120757f7AE5) |
| `require` | ✅             | ❌                | Reason: UnauthorizedAccess                                                                |
| `assert`  | ❌             | ❌                | Reason: Assertion violated                                                                |

**DemoCode**

Below, we use the three forms of errors to observe the changes in gas usage:

```solidity
contract Error {
    error UnauthorizedAccess();

    // gas: 164
    function errorRevert() external pure {
        if (true) revert UnauthorizedAccess();
    }

    // gas: 268
    function errorRequire() external pure {
        require(false, "UnauthorizedAccess");
    }

    // gas: 180
    function errorAssert() external pure {
        assert(false);
    }
}
```

the gas optimization suggestions are as follows:

🌟1. `revert` is the most recommended as it can throw error messages as well as related variables.

🌟2. The string in `require` is stored on-chain, which not only consumes more gas but also increases the contract size. It is recommended to choose based on actual needs.

🌟3. If there's a scenario where `assert` is used, it's suggested to replace it with `revert`.
