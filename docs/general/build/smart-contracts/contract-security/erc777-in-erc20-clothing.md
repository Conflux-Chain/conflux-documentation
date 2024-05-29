---
displayed_sidebar: generalSidebar
---

# ERC777 in ERC20 Clothing

ERC20 tokens, when implemented according to the standard, do not have transfer hooks, and thus the `transfer` and `transferFrom` functions do not have a reentrancy issue. However, there are meaningful advantages to tokens with transfer hooks, which is why all NFT standards implement them and why ERC777 was finalized. Despite these benefits, ERC777 has caused enough confusion that OpenZeppelin deprecated its ERC777 library.

If you want your protocol to be compatible with tokens that behave like ERC20 tokens but have transfer hooks, then it’s a simple matter of treating the functions `transfer` and `transferFrom` as if they will issue a function call to the receiver. This approach is essential because it addresses the potential for reentrancy issues, which have been exploited in past incidents.

### The Uniswap Incident

A notable instance of this ERC777 reentrancy issue occurred with Uniswap. OpenZeppelin documented the exploit, highlighting the vulnerability caused by transfer hooks in ERC777 tokens. This incident underscores the importance of recognizing and mitigating reentrancy risks when working with tokens that include transfer hooks.

### Understanding Transfer Hooks

Transfer hooks allow a contract to execute specific code during the token transfer process. While this functionality adds flexibility and utility, it also introduces new attack vectors, particularly reentrancy attacks, which can compromise contract security if not properly handled.

### Mitigation Techniques

1. **Assume Transfer Hooks are Present**: Always design your smart contracts under the assumption that `transfer` and `transferFrom` functions may include transfer hooks and could issue external calls.

2. **Implement Reentrancy Guards**: Use reentrancy guards, such as the `nonReentrant` modifier from OpenZeppelin, to prevent reentrancy attacks.

3. **Follow Best Practices**: Adhere to secure coding practices and stay updated with the latest standards and libraries to mitigate risks associated with transfer hooks.

### Example Code

Below is an example of an ERC20 token contract designed with precautions for transfer hooks. This contract uses OpenZeppelin's ReentrancyGuard to prevent reentrancy attacks.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SafeERC20 is ERC20, ReentrancyGuard {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function transfer(address recipient, uint256 amount) public override nonReentrant returns (bool) {
        return super.transfer(recipient, amount);
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override nonReentrant returns (bool) {
        return super.transferFrom(sender, recipient, amount);
    }
}
```

By integrating the `ReentrancyGuard` from OpenZeppelin, this contract ensures that the transfer functions are protected against reentrancy attacks, even if the tokens involved have transfer hooks.

### Conclusion

While ERC777 offers advantages through transfer hooks, it also introduces reentrancy risks that must be carefully managed. By treating ERC20-like tokens with transfer hooks as if they may reenter and implementing appropriate safeguards, developers can create more secure smart contracts. Always stay informed about the latest security practices and updates in the ecosystem to protect your contracts from known vulnerabilities.
