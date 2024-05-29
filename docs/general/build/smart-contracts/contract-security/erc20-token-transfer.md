---
displayed_sidebar: generalSidebar
---

# Handling ERC20 Variants That Do Not Return True

The ERC20 specification dictates that an ERC20 token must return true when a transfer succeeds. Because most ERC20 implementations cannot fail unless the allowance is insufficient or the amount transferred is too much, most developers have become accustomed to ignoring the return value of ERC20 tokens and assuming a failed transfer will revert.

This assumption holds if you are working with a trusted ERC20 token whose behavior you know well. However, when dealing with arbitrary ERC20 tokens, you must account for variations in behavior. There is an implicit expectation in many contracts that failed transfers should always revert rather than return false because most ERC20 tokens do not have a mechanism to return false. This expectation has led to confusion in the ecosystem.

Further complicating this matter, some ERC20 tokens do not follow the protocol of returning true. Notably, Tether (USDT) and some other tokens revert on a failure to transfer, causing the revert to bubble up to the caller. To address this, some libraries wrap ERC20 token transfer calls to intercept the revert and return a boolean instead. Below are implementations from OpenZeppelin and Solady.

### OpenZeppelin SafeTransfer

OpenZeppelin provides the `SafeERC20` library to handle transfers that may not return true or may revert. It wraps the ERC20 token transfers to ensure they behave consistently.

### Solady SafeTransfer

Solady offers a similar solution with a focus on gas efficiency. It provides utilities for safe transfers that are optimized for lower gas consumption.

### Vulnerable Contract Example

Here is an example contract that incorrectly assumes all ERC20 transfers revert on failure:

```solidity
contract VulnerableTokenSwap {
    IERC20 public token;

    constructor(IERC20 _token) {
        token = _token;
    }

    function swap(uint256 amount) external {
        // Assuming transfer will revert on failure
        token.transfer(msg.sender, amount);
    }
}
```

This contract is vulnerable because it does not handle the case where `token.transfer` returns false instead of reverting.

### Secure Contract Example

Here is an improved version using OpenZeppelin's `SafeERC20` library:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SafeTokenSwap {
    using SafeERC20 for IERC20;
    IERC20 public token;

    constructor(IERC20 _token) {
        token = _token;
    }

    function swap(uint256 amount) external {
        // Safe transfer that handles non-reverting tokens
        token.safeTransfer(msg.sender, amount);
    }
}
```

### Conclusion

When dealing with ERC20 tokens, especially arbitrary ones, it is crucial to account for variations in behavior regarding transfer success indications. Using libraries like OpenZeppelin's `SafeERC20` or Solady's SafeTransfer can help ensure consistent and secure token transfers, preventing unexpected failures and vulnerabilities in your contracts.
