---
displayed_sidebar: generalSidebar
---

# ERC20Permit


In standard ERC20, users typically need to execute two separate transactions:
1. **Approval (approve)**: The user authorizes a certain amount of tokens to a recipient.
2. **Transfer (transferFrom)**: The recipient transfers tokens from the user's account.

This approach not only increases gas costs but also diminishes user experience. By using ERC20Permit, we can merge these two steps into a single transaction, thereby saving gas and simplifying the process.

### Gas Optimization Comparison

**Standard ERC20 Process**

1. User calls `approve(spender, amount)`: approximately 50,000 gas
2. Recipient calls `transferFrom(owner, recipient, amount)`: approximately 65,000 gas

**Optimized Process Using ERC20Permit**

1. User generates a signature (off-chain operation, no gas cost)
2. Recipient calls `transferWithPermit` (including permit and transferFrom): approximately 80,000 gas

**Savings**: approximately 35,000 gas, equivalent to a 30% gas reduction.

### Example Code

#### Standard ERC20 Implementation

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract OptimizedToken is ERC20Permit {
    constructor() ERC20("OptimizedToken", "OPT") ERC20Permit("OptimizedToken") {
        _mint(msg.sender, 1000000 * 10**decimals());
    }

    function transferWithPermit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        // Call permit to authorize the spender
        permit(owner, spender, value, deadline, v, r, s);
        
        // Transfer tokens from owner to msg.sender
        transferFrom(owner, msg.sender, value);
    }
}
```


### Advantages of ERC20Permit

- **Reduced Transaction Count**: Merges approval and transfer into a single transaction, saving gas.
- **Improved User Experience**: Token holders do not need to pay gas fees for approvals.
- **Batch Processing**: Recipients can batch multiple permit and transferFrom operations in one transaction, further reducing gas consumption.


By adopting ERC20Permit, you can create a smoother and more cost-effective token interaction experience for users while reducing the overall load on the blockchain network.


**Gas Optimization Recommendations**

🌟 In scenarios where frequent approvals and transfers are needed, consider using ERC20Permit. This can significantly reduce the number of transactions and overall gas consumption for users. 
