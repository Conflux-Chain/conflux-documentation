---
displayed_sidebar: generalSidebar
---

# UUPS vs Transparent Proxy

When designing upgradable smart contracts, gas efficiency is critical for users interacting with the contract. There are two common upgrade patterns: **UUPS (Universal Upgradeable Proxy Standard)** and the **Transparent Upgradeable Proxy**. While both enable upgradability, the **UUPS pattern** is generally more gas efficient for users.

The transparent upgradeable proxy requires the contract to check whether the caller (`msg.sender`) is the admin on every transaction, even when an upgrade is not taking place. This extra comparison consumes additional gas. On the other hand, the **UUPS pattern** restricts the admin check only to the upgrade function, reducing the gas overhead on user transactions.

### Key Differences:
- **Transparent Upgradeable Proxy**: Admin checks are performed on every transaction, increasing gas costs.
- **UUPS Proxy**: Admin checks occur only during the upgrade process, leading to reduced gas usage for non-upgrade functions.

**DemoCode**

The example below shows how both proxy patterns compare in gas usage for a basic function call:

```solidity
// Transparent Upgradeable Proxy
contract TransparentProxyExample {
    address private admin;
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    function upgrade(address newImplementation) external onlyAdmin {
        // Upgrade logic
    }

    function userFunction() external {
        // Each call checks if the sender is the admin
        // Gas: Higher due to repeated admin checks
    }
}

// UUPS Proxy
contract UUPSProxyExample {
    address private admin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    function upgrade(address newImplementation) external onlyAdmin {
        // Upgrade logic
        // Admin check only occurs here
    }

    function userFunction() external {
        // No admin check, gas: lower for normal function calls
    }
}
```

### Gas Analysis:

| Proxy Pattern          | Gas Consumption per Call |
|------------------------|--------------------------|
| Transparent Proxy       | Higher due to repeated `msg.sender == admin` checks |
| UUPS Proxy              | Lower, as admin checks occur only during upgrade |

### Recommendations for Gas Optimization:

🌟 For upgradable smart contracts, **UUPS proxies** are preferred for their gas efficiency during standard function calls, as they avoid unnecessary admin checks. This reduction in overhead can be significant, especially in contracts with frequent user interactions.
