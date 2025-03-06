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

2022年4月，一家名为Akutar的热门NFT项目成功地进行了一次 [荷兰式拍卖](https://en.wikipedia.org/wiki/Dutch_auction)筹集了11,539.5个ETH。 However, when processing refunds for previous community pass holders, a flaw in their smart contract prevented operations, locking all funds within the contract due to a DoS vulnerability.

你可以在[解析：AKUTARS NFT事件(2022年4月)](https://www.halborn.com/blog/post/explained-the-akutars-nft-incident-april-2022)中找到更多详细信息。

在Web2环境中，拒绝服务(DoS)攻击通常涉及使用过多的流量淹没服务器，使其无法处理合法请求。 在Web3领域，这类攻击利用漏洞来破坏智能合约操作。

#### 漏洞示例

Let’s explore a simplified contract, `GameOfFunds`, that demonstrates this type of vulnerability. 该合约允许玩家在开始时存入ETH，并打算在游戏结束时退还这些存款。

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

这个合约存在漏洞，因为`processRefunds()`函数使用了`call` 方法，它会激活收件人地址的回退函数。 A malicious contract can disrupt this process.

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

1. 确保外部合同调用（包括回退函数）不会干扰或停止关键操作，即使个别交易失败，退款等流程也能继续进行。
2. 即使关键参与者永久缺席，也要保持合约功能，并允许用户自行提取退款，而不是分批发放。
3. 防止合约意外自毁并避免无限循环，以确保合约运行稳定和安全。

