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
  - 智能合约
---

# 闪电贷治理攻击

闪电贷是一种强大的去中心化金融（DeFi）功能，允许用户在无需抵押的情况下借入资产，前提是他们在同一交易中归还借入的金额。 This feature has enabled unique financial strategies, but it also poses significant risks for governance systems.

考虑一个使用具有投票功能的 ERC20 代币的DeFi协议。 通常情况下，投票权与代币余额成正比。 However, flashloans can be exploited to manipulate votes. An attacker can borrow a large number of tokens, use them to influence a vote, and return them all within a single transaction. 如果协议在交易过程中对余额进行快照，以确定投票权，这可能会造成特别严重的破坏。

## 闪电贷攻击示例

下面我们来看一个容易受到这种攻击的简单智能合约

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

在这个合约中，`exploitFlashLoan()` 允许借款人在代币归还前随意使用代币，包括参与投票。 这一漏洞可以被用来左右治理决策。

#### 真实案例

**MakerDAO治理攻击尝试**

2020年，有人尝试利用闪电贷对MakerDAO进行治理攻击。 攻击者试图借入大量MKR代币以影响治理投票。 尽管这次尝试没有成功，但它凸显了DeFi治理系统中的潜在风险和漏洞。 [Learn more](https://www.theblock.co/post/82721/makerdao-issues-warning-after-a-flash-loan-is-used-to-pass-a-governance-vote).

## 预防策略

为了防止此类攻击，设计针对大额、突然代币余额变化有抵抗力的治理机制至关重要。 一些潜在的策略包括：

- **使用更长的快照历史**：使用历史余额来确定投票权，而不是在投票活动临近时进行快照。
- **锁定周期**：要求代币在使用投票前必须持有一定时间。
- **禁用闪电贷交易**：在关键的治理事件期间，识别并阻止涉及闪电贷的交易。
