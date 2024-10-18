---
title: Signature Replay Attacks
displayed_sidebar: generalSidebar
keywords: 
  - smart-contracts
  - security
  - vulnerabilities
  - signature-replay
  - wintermute
  - optimism
  - ecdsa
  - eip-712
  - cip-23
  - solidity
  - prevention
  - nonce
  - chainid
tags: [Signature Replay, Security, Smart Contracts]
---

## Signature Replay Attacks

The signature replay attack that led to the theft of 20 million $OP tokens from Wintermute exposes critical vulnerabilities in the management of digital signatures on blockchain platforms. This incident was primarily triggered by a signature replay but was compounded by an additional transactional error with Optimism, a Layer-2 Ethereum scaling solution. In this case, the tokens were mistakenly sent to a multisignature wallet address that had not yet been properly initialized on the Optimism network.

For a more detailed report on this incident, you can read further on Blockworks and Decrypt:

- [Blockworks Report on the Wintermute and Optimism Incident](https://blockworks.co/news/20m-tokens-lost-as-market-maker-wintermute-takes-blame)
- [Decrypt's Coverage of the Optimism Token Theft](https://decrypt.co/99567/ethereum-layer-2-solution-optimism-loses-20-million-tokens-interlayer-snafu)

Digital signatures play a pivotal role in blockchain technology, serving to identify the signer of data and to ensure the integrity of that data. When users initiate transactions, they use their private keys to sign them. This allows anyone to verify that the transactions truly originate from the stated accounts. Additionally, smart contracts often employ the `ECDSA` algorithm to authenticate off-chain signatures before performing critical functions such as token minting or transfers.

There are generally two common types of signature replay attacks:

1. **Standard Replay**: A signature meant for a single use was repeatedly exploited, leading to thousands of unauthorized mints of the NBA’s “The Association” series NFTs. For details on this signature replay attack, read Decrypt’s report on the exploit: [NBA Botches Ethereum NFT Drop as 'The Association' Suffers Exploit - Decrypt](https://decrypt.co/99567/nba-botches-ethereum-nft-drop-as-the-association-suffers-exploit).

This article covers the security vulnerabilities that were exploited during the NFT drop, leading to thousands of unauthorized mints.

1. **Cross-chain Replay**: A signature intended for use on one blockchain is reused on another. This type of attack was exploited in the theft of 20 million $OP tokens from Wintermute.

## Example of a Vulnerable Contract

The `SigAuth` contract below is an `ERC20` token contract that includes a mint function vulnerable to signature replay attacks. It uses off-chain signatures to allow whitelisted addresses to mint a specified number of tokens. The contract stores a `signer` address to verify the authenticity of signatures.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SigAuth is ERC20, Ownable {
    address public authorizedSigner;

    constructor() ERC20("SignatureToken", "SIGT") {
        authorizedSigner = msg.sender;
    }

    function vulnerableMint(address recipient, uint amount, bytes memory signature) public {
        bytes32 messageHash = keccak256(abi.encodePacked(recipient, amount));
        bytes32 ethSignedMessageHash = ECDSA.toEthSignedMessageHash(messageHash);
        require(ECDSA.recover(ethSignedMessageHash, signature) == authorizedSigner, "Invalid signature!");
        _mint(recipient, amount);
    }

    // Other helper functions...
}
```

**Note**: The `vulnerableMint()` function does not check if the `signature` has been used before, allowing the same signature to be reused for unlimited token minting.

## Prevention Measures

To prevent signature replay attacks, you can use the following methods:

1. **Tracking Used Signatures**: Record signatures that have been used for operations like token minting to prevent their reuse.

   ```solidity
   // Record the minted addresses
   mapping(address => bool) public alreadyMinted;

   function secureMint(address recipient, uint amount, bytes memory signature) public {
       require(!alreadyMinted[recipient], "Tokens already minted for this address");
       bytes32 messageHash = keccak256(abi.encodePacked(recipient, amount));
       bytes32 ethSignedMessageHash = ECDSA.toEthSignedMessageHash(messageHash);
       require(ECDSA.recover(ethSignedMessageHash, signature) == authorizedSigner, "Invalid signature!");
       alreadyMinted[recipient] = true;
       _mint(recipient, amount);
   }
   ```

2. **Including Nonce and ChainID**: Incorporate a `nonce` (which increments with each transaction) and the `chainID` in the signature message to prevent both standard and cross-chain replays.

   ```solidity
   uint public nonce = 0;

   function nonceMint(address recipient, uint amount, bytes memory signature) public {
       bytes32 messageHash = keccak256(abi.encodePacked(recipient, amount, nonce, block.chainid));
       bytes32 ethSignedMessageHash = ECDSA.toEthSignedMessageHash(messageHash);
       require(ECDSA.recover(ethSignedMessageHash, signature) == authorizedSigner, "Invalid signature!");
       _mint(recipient, amount);
       nonce++;
   }
   ```

3. **Using EIP-712 for Structured Data**:
Implement EIP-712 to create a more secure and structured data signing experience, which helps prevent signature replays across different contexts and contracts.

   ```solidity
   // Utilizing EIP-712 to create a typed structured data signature
   using EIP712 for bytes32;

   function eip712Mint(address recipient, uint amount, bytes memory signature) public {
       bytes32 structHash = keccak256(abi.encode(
           keccak256("Mint(address recipient,uint256 amount,uint256 nonce)"),
           recipient,
           amount,
           nonce
       ));
       bytes32 digest = _hashTypedDataV4(structHash);
       require(ECDSA.recover(digest, signature) == authorizedSigner, "Invalid EIP-712 signature!");
       _mint(recipient, amount);
       nonce++;
   }
   ```

You can find more detailed implementation guidelines and tools in [OpenZeppelin's EIP-712 documentation](https://docs.openzeppelin.com/contracts/5.x/api/utils#EIP712).

4.**Implementing CIP-23 for Cross-Chain Safety**:
CIP-23 is an adaptation of Ethereum's EIP-712 for **Conflux core space**, designed to enhance security in cross-chain operations. It introduces specific measures to prevent replay attacks, ensuring that signatures for EVM-compatible chains cannot be replayed for Conflux core space, and vice versa. 

More information and detailed guidelines can be found on the [Conflux CIP-23](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-23.md)
