---
displayed_sidebar: generalSidebar
---

# UUPS vs Transparent Proxy

When designing upgradable smart contracts, gas efficiency is critical for users interacting with the contract. There are two common upgrade patterns: **UUPS (Universal Upgradeable Proxy Standard)** and the **Transparent Upgradeable Proxy**. While both enable upgradability, the **UUPS pattern** is generally more gas efficient for users.

The transparent upgradeable proxy requires the contract to check whether the caller (`msg.sender`) is the admin on every transaction, even when an upgrade is not taking place. This extra comparison consumes additional gas. On the other hand, the **UUPS pattern** restricts the admin check only to the upgrade function, reducing the gas overhead on user transactions.

#### Key Differences:

- **Transparent Upgradeable Proxy**: Admin checks are performed on every transaction, increasing gas costs.
- **UUPS Proxy**: Admin checks occur only during the upgrade process, leading to reduced gas usage for non-upgrade functions.

**DemoCode**

The example below shows how both proxy patterns compare in gas usage for a basic function call:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Simplified Transparent Proxy
contract TransparentProxy {
    address public implementation;
    address public admin;
    
    constructor(address _implementation) {
        implementation = _implementation;
        admin = msg.sender;
    }
    
    // The fallback() function includes an admin check on every call.
    // This results in higher gas costs for every transaction due to the admin check.
    fallback() external payable {
        // Admin check on every call
        if (msg.sender == admin) {
            // Admin functions
        } else {
            // Delegate call to implementation
            (bool success, ) = implementation.delegatecall(msg.data);
            require(success, "Call failed");
        }
    }
    
    receive() external payable {}
}

// Simplified UUPS Proxy
contract UUPSProxy {
    address public implementation;
    
    constructor(address _implementation) {
        implementation = _implementation;
    }
    
    // The fallback() function directly delegates the call to the implementation without any admin check.
    fallback() external payable {
        // No admin check, directly delegate call
        (bool success, ) = implementation.delegatecall(msg.data);
        require(success, "Call failed");
    }
    
    receive() external payable {}
}

// Logic Contract for Transparent Proxy
contract TransparentLogic {
    uint256 public value;
    
    function setValue(uint256 _value) external {
        value = _value;
    }
    
    function getValue() external view returns (uint256) {
        return value;
    }
}

// Logic Contract for UUPS Proxy
contract UUPSLogic {
    uint256 public value;
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    function setValue(uint256 _value) external {
        value = _value;
    }
    
    function getValue() external view returns (uint256) {
        return value;
    }
    
    //  Admin checks only occur during the upgrade process in the UUPS pattern.
    function upgrade(address newImplementation) external {
        require(msg.sender == owner, "Not authorized");
        // Upgrade logic here
    }
}
```

#### Gas Analysis:

| Proxy Pattern     | Gas Consumption per Call                            |
| ----------------- | --------------------------------------------------- |
| Transparent Proxy | Higher due to repeated `msg.sender == admin` checks |
| UUPS Proxy        | Lower, as admin checks occur only during upgrade    |

#### Recommendations for Gas Optimization:

🌟 For upgradable smart contracts, **UUPS Proxy** are preferred for their gas efficiency during standard function calls, as they avoid unnecessary admin checks. This reduction in overhead can be significant, especially in contracts with frequent user interactions.
