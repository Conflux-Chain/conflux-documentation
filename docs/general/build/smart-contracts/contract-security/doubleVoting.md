---
title: Addressing Double Voting in ERC20 Tokens
displayed_sidebar: generalSidebar
---

# Addressing Double Voting in ERC20 Tokens

## Overview

The use of ERC20 tokens or NFTs as voting tickets presents a significant vulnerability in decentralized applications (DApps). This is due to the potential for double voting, where attackers can vote with one address, transfer their tokens to another address, and vote again, effectively manipulating the voting outcome.

This problem is exacerbated in simple voting contracts that do not implement measures to prevent token transfer or account for changes in token ownership between votes. Here, we explore a typical scenario where this vulnerability can be exploited and propose a solution using ERC20 snapshots.

## Example of a Vulnerable Voting Contract

Consider the following smart contract, `TokenBasedVoting.sol`, which demonstrates this vulnerability:

```solidity
contract TokenBasedVoting {
    uint256 public proposalA;
    uint256 public proposalB;
    IERC20 immutable private votingToken;

    mapping(address => bool) public hasVoted;

    constructor(IERC20 _votingToken) {
        votingToken = _votingToken;
    }

    function voteForProposalA() external {
        require(!hasVoted[msg.sender], "You have already voted.");
        proposalA += votingToken.balanceOf(msg.sender);
        hasVoted[msg.sender] = true;
    }

    function voteForProposalB() external {
        require(!hasVoted[msg.sender], "You have already voted.");
        proposalB += votingToken.balanceOf(msg.sender);
        hasVoted[msg.sender] = true;
    }
}
```

In `TokenBasedVoting`, each vote weight corresponds to the voter's token balance at the time of voting. However, the contract does not prevent voters from transferring their tokens to another address and voting again, which could skew the results.

## Solution: Using ERC20 Snapshots

To mitigate the risk of double voting, it's advisable to use the ERC20 snapshot mechanism. This approach involves taking a "snapshot" of token balances at a specific block height. Once the snapshot is taken, these balances are locked for the purpose of the vote, preventing any manipulation through token transfers.

Here's an enhanced version of the contract using ERC20 Votes, which is an extension that supports voting with snapshot balances:

```solidity
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract SecureVoting {
    ERC20Votes private votingToken;

    constructor(ERC20Votes _votingToken) {
        votingToken = _votingToken;
    }

    function vote(uint256 proposalId, uint256 amount) external {
        uint256 voterBalance = votingToken.getPastVotes(msg.sender, votingToken.snapshot());
        require(voterBalance >= amount, "Insufficient balance to vote.");
        // Logic to record votes based on snapshot balance
    }
}
```

## Prevention Strategy

When designing token-based voting systems, consider the following:

1. Implement snapshot mechanisms to freeze token balances at the time of vote.
2. Ensure transparency and fairness in the voting process by allowing token holders to verify the snapshot used.
3. Regularly audit and test your smart contracts to address potential vulnerabilities related to token-based voting.

By adopting these practices, developers can create more secure and reliable voting mechanisms within their applications, protecting against common exploits like double voting.
