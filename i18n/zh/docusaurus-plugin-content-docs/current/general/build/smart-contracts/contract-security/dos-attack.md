---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - security
  - vulnerabilities
  - dos
  - denial-of-service
  - ethereum
  - solidity
  - refunds
  - fallback-function
  - prevention
  - gameoffunds
tags:
  - Denial of Service
  - Security
  - 智能合约
---

# 拒绝服务攻击

In April 2022, a popular NFT project called Akutar conducted a successful [Dutch auction](https://en.wikipedia.org/wiki/Dutch_auction) to raise funds, amassing 11,539.5 ETH. However, when processing refunds for previous community pass holders, a flaw in their smart contract prevented operations, locking all funds within the contract due to a DoS vulnerability.

You can find more detailed information in [EXPLAINED: THE AKUTARS NFT INCIDENT (APRIL 2022)](https://www.halborn.com/blog/post/explained-the-akutars-nft-incident-april-2022)

Denial of Service (DoS) attacks in the Web2 context typically involve overwhelming a server with excessive traffic, rendering it unable to serve legitimate requests. In the Web3 realm, such attacks exploit vulnerabilities to disrupt smart contract operations.

#### Vulnerability Example

Let’s explore a simplified contract, `GameOfFunds`, that demonstrates this type of vulnerability. The contract allows players to deposit ETH at the beginning and intends to refund these deposits once the game concludes.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract GameOfFunds {
    bool public refundsComplete;
    mapping(address => uint256) public deposits;
    address[] public participantList;

    // Players deposit ETH into the contract
    function contribute() external payable {
        require(!refundsComplete, "Game Over");
        require(msg.value > 0, "Please deposit ETH");
        deposits[msg.sender] = msg.value;
        participantList.push(msg.sender);
    }

    // Refund players at the end of the game
    function processRefunds() external {
        require(!refundsComplete, "Game Over");
        for (uint256 i = 0; i < participantList.length; i++) {
            address participant = participantList[i];
            uint256 refundAmount = deposits[participant];
            (bool success, ) = participant.call{value: refundAmount}("");
            require(success, "Refund Failed!");
            deposits[participant] = 0;
        }
        refundsComplete = true;
    }

    function getBalance() external view returns(uint256) {
        return address(this).balance;
    }
}
```

This contract is vulnerable because the `processRefunds()` function uses the `call` method, which activates the fallback function of recipient addresses. A malicious contract can disrupt this process.

```solidity
contract Malicious {
    fallback() external payable {
        revert("DoS Attack!");
    }

    function initiateAttack(address gameAddress) external payable {
        GameOfFunds game = GameOfFunds(gameAddress);
        game.contribute{value: msg.value}();
    }
}
```

## 预防策略

1. Ensure external contract calls, including fallback functions, do not interfere with or halt critical operations, allowing processes like refunds to continue even if individual transactions fail.
2. Maintain contract functionality even if key participants are permanently absent, and allow users to withdraw refunds themselves rather than distributing them in batches.
3. Prevent contracts from unintentionally self-destructing and avoid infinite loops to ensure stable and secure contract operations.
