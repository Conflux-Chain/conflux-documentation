---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - gas-optimization
  - Solidity
  - reentrancy-guard
  - security
  - modifiers
  - uint-variable
  - boolean-flag
  - EVM
  - ReentrancyGuardBool
  - ReentrancyGuardUint01
  - ReentrancyGuardUint12
tags:
  - Reentrancy Guard
  - Gas Optimization
  - Smart Contracts
---

# Low-Cost Reentrancy Guard

Using a modifier for re-entrancy checks in smart contracts boosts security by confirming if the contract is currently executing. Typically, a boolean flag controls access, allowing functions to run only if the contract is not already active.

Switching to a uint variable for the lock mechanism can be more gas-efficient. This method leverages different numeric values to indicate the contract's state, providing a flexible way to manage execution flow and potentially reducing gas costs for frequent operations.

**DemoCode**

The demonstration below compares three approaches for re-entrancy protection: using a Boolean flag, utilizing a uint variable toggled between 0 and 1, and employing a uint variable shifted between 1 and 2.

```solidity
contract ReentrancyGuardBool {
    bool private _locked = false;
    // gas: 27757
    modifier nonReentrant() {
        require(!_locked, "REENTRANCY");
        _locked = true;
        _;
        _locked = false;
    }
}

contract ReentrancyGuardUint01 {
    uint256 private _lockState = 0;
    // gas: 27604
    modifier nonReentrant() {
        require(_lockState == 0, "REENTRANCY");
        _lockState = 1;
        _;
        _lockState = 0;
    }
}

contract ReentrancyGuardUint12 {
    uint256 private _lockState = 1;
    // gas: 13908 
    modifier nonReentrant() {
        require(_lockState == 1, "REENTRANCY");
        _lockState = 2;
        _;
        _lockState = 1;
    }
}
```

Recommendations for gas optimization:

🌟 For re-entrancy guard, the efficiency of different methods varies significantly. The Boolean method, which uses two bytes for boolean values, requires more gas due to the EVM's 32-byte word handling. Given that re-entrancy guard modifiers are generally called multiple times, it is recommended to use the Uint 1-2 method for its gas savings.
