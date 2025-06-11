---
title: Flashloan Governance Attacks
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - security
  - flashloans
  - governance-attacks
  - defi
  - erc20
  - voting
  - makerdao
  - solidity
  - prevention-strategies
tags:
  - Flashloan
  - Governance Attacks
  - Security
  - Smart Contracts
---

# Flashloan Governance Attacks

Flashloans are a powerful feature in decentralized finance (DeFi) that allows users to borrow assets without collateral, under the condition that they return the borrowed amount within the same transaction. This feature has enabled unique financial strategies, but it also poses significant risks for governance systems.

Consider a DeFi protocol that uses an ERC20 token with voting capabilities. Normally, the voting power is proportional to the token balance. However, flashloans can be exploited to manipulate votes. An attacker can borrow a large number of tokens, use them to influence a vote, and return them all within a single transaction. This can be particularly damaging if the protocol takes a snapshot of balances during the transaction to determine voting rights.

## Example of a Flashloan Attack

Here’s a look at a simple smart contract that could be vulnerable to such an attack

```solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IGovernanceParticipant {
    function participateInGovernance() external;
}

contract GovernanceExploit {
    IERC20 public token;
    uint256 public constant amount = 1000000 * 10**18;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function exploitFlashLoan() external {
        uint256 initialBalance = token.balanceOf(address(this));
        require(initialBalance >= amount, "Insufficient tokens in contract");

        // Transfer tokens to the caller temporarily
        token.transfer(msg.sender, amount);

        // Caller participates in governance
        IGovernanceParticipant(msg.sender).participateInGovernance();

        // Require the caller to return the tokens after participating
        require(token.transferFrom(msg.sender, address(this), amount), "Tokens must be returned!");

        // Check to ensure the tokens are returned
        require(token.balanceOf(address(this)) >= initialBalance, "Tokens were not returned correctly!");
    }
}

```

In this contract, `exploitFlashLoan()` allows the borrower to use the tokens as they wish, including participating in a vote, before they are returned. This vulnerability can be exploited to swing governance decisions.

#### Real-World Examples

**MakerDAO Governance Attack Attempt**

In 2020, there was an attempted governance attack on MakerDAO using a flashloan. The attacker tried to borrow a significant number of MKR tokens to influence a governance vote. Although this attempt was unsuccessful, it highlighted the potential risks and vulnerabilities in DeFi governance systems. [Learn more](https://www.theblock.co/post/82721/makerdao-issues-warning-after-a-flash-loan-is-used-to-pass-a-governance-vote).

## Prevention Strategies

To prevent such attacks, it's crucial to design governance mechanisms that are resistant to large, sudden changes in token balances. Some potential strategies include:

- **Using a longer snapshot history**: Instead of taking snapshots close to voting events, use historical balances to determine voting power.
- **Locking periods**: Require that tokens be held for a certain period before they can be used to vote.
- **Disabling flashloan transactions**: Identify and block transactions that involve flashloans during critical governance events.
