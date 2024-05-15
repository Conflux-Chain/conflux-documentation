---
displayed_sidebar: generalSidebar
---

# Non-Zero Balances

Initializing a storage variable from zero to a non-zero value is one of the most gas-intensive operations a contract can perform. It requires a total of 22,100 gas, including 20,000 gas for changing the value from zero to non-zero and 2,100 gas for cold storage access.

This is why the OpenZeppelin reentrancy guard marks functions as active or inactive using 1 and 2 instead of 0 and 1. Changing a storage variable from one non-zero value to another only costs 5,000 gas.

In practical applications of ERC20, you should avoid having ERC20 token balances drop to zero. Always keep a small amount in the balance. This approach can help achieve a similar effect. If an address frequently empties and reloads its account balance, it will lead to many zero-to-one writes, which are costly in terms of gas.

**DemoCode**

Below, we provide an improved contract implementation to manage balance updates efficiently:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract BalanceManagement {
    mapping(address => uint256) public balances;

    // Initialize with non-zero to avoid expensive zero to one write
    constructor() {
        balances[msg.sender] = 1; // Starts with 1 instead of 0
    }

    // Increment balance safely
    function incrementBalance(uint256 amount) external {
        require(amount > 0, "Amount must be positive");
        balances[msg.sender] += amount;
    }

    // Decrement balance, avoiding going to zero
    function decrementBalance(uint256 amount) external {
        require(balances[msg.sender] > amount, "Insufficient funds to decrement");
        balances[msg.sender] -= amount;
        if (balances[msg.sender] == 0) {
            balances[msg.sender] = 1; // Reset to 1 to avoid zero balance
        }
    }
}
```

Recommendations for gas optimization:

🌟1. **Use Zero Balances**: Ensure that token balances do not drop to zero. Implement logic to reset the balance to a small positive value if it ever reaches zero.

🌟2. **Optimize Storage Initialization**: Start storage variables at a non-zero value to avoid costly initializations and manage subsequent updates carefully to keep modifications within non-zero values.
