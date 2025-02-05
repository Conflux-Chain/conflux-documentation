---
displayed_sidebar: generalSidebar
keywords:
  - smart contracts
  - gas optimization
  - Solidity
  - ERC20
  - non-zero balances
  - storage variables
  - Conflux
  - Core Space
  - eSpace
  - SSTORE
  - OpenZeppelin
  - reentrancy guard
tags:
  - 非零余额
  - GAS 优化
  - 智能合约
---

# 非零余额

Initializing a storage variable from zero to a non-zero value is one of the most gas-intensive operations a contract can perform. It requires a total of 22,100 gas, including 20,000 gas for changing the value from zero to non-zero and 2,100 gas for cold storage access.

这就是为什么OpenZeppelin的重入保护机制使用1和2而不是0和1来标记函数的活跃和非活跃状态。 Changing a storage variable from one non-zero value to another only costs 5,000 gas.

在ERC20的实际应用中，应该避免ERC20代币余额降至零。 始终在余额中保留少量代币。 这种方法可以实现类似的效果。 If an address frequently empties and reloads its account balance, it will lead to many zero-to-one writes, which are costly in terms of gas.

**Conflux Core Space 和 eSpace 的区别**

Conflux为智能合约提供了两种不同的环境：Core Space和eSpace。 Core Space is optimized for high throughput and low latency, while eSpace is compatible with Ethereum, allowing for easy porting of Ethereum-based contracts.

In Core Space, the gas cost for storage operations is generally lower due to its unique consensus mechanism. eSpace, being Ethereum-compatible, follows a similar gas cost structure to Ethereum, but there are subtle differences due to the underlying Conflux blockchain architecture. Specific gas costs for the `SSTORE` opcode in eSpace might differ slightly from Ethereum's due to these optimizations.

For instance, while Ethereum charges 20,000 gas for a zero-to-non-zero storage write, eSpace might have slight variations based on the latest protocol updates.

### 改进的合约实现

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

### Recommendations for Gas Optimization

🌟1. **Use Non-Zero Balances**: Ensure that token balances do not drop to zero. 如果余额降至零，执行逻辑将其重置为一个小的正值。

🌟2. **Optimize Storage Initialization**: Start storage variables at a non-zero value to avoid costly initializations and manage subsequent updates carefully to keep modifications within non-zero values.
