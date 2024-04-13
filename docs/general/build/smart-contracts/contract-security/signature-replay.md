---
title: Signature Replay Attacks
displayed_sidebar: generalSidebar
---

## Signature Replay Attacks

The signature replay attack that led to the theft of 20 million $OP tokens from Wintermute exposes critical vulnerabilities in the management of digital signatures on blockchain platforms. This incident was primarily triggered by a signature replay but was compounded by an additional transactional error with Optimism, a Layer-2 Ethereum scaling solution. In this case, the tokens were mistakenly sent to a multisignature wallet address that had not yet been properly initialized on the Optimism network. 

Before Wintermute could establish the required multisig wallet on Layer-2, an opportunistic attacker exploited the situation, deploying the multisig contract with altered initialization parameters, resulting in the theft of the tokens.

For a more detailed report on this incident, you can read further on Blockworks and Decrypt:

- [Blockworks Report on the Wintermute and Optimism Incident](https://blockworks.co/news/20m-tokens-lost-as-market-maker-wintermute-takes-blame)
- [Decrypt's Coverage of the Optimism Token Theft](https://decrypt.co/99567/ethereum-layer-2-solution-optimism-loses-20-million-tokens-interlayer-snafu)

Digital signatures are crucial in blockchain technology for identifying the signer of data and verifying the integrity of that data. When transactions are sent, users sign them using their private keys, enabling verification that the transaction originated from the corresponding account. Smart contracts can also utilize the `ECDSA` algorithm to validate signatures created off-chain before executing functions like minting or transferring tokens.

There are generally two common types of signature replay attacks:

1. **Standard Replay**: A signature intended for single use is used multiple times. For example, the NBA’s “The Association” series NFTs were minted thousands of times for free due to this type of attack.
2. **Cross-chain Replay**: A signature intended for use on one blockchain is reused on another. This type of attack was exploited in the theft of 20 million $OP tokens from Wintermute.

## Example of a Vulnerable Contract

The `SigAuth` contract below is an `ERC20` token contract that includes a mint function vulnerable to signature replay attacks. It uses off-chain signatures to allow whitelisted addresses to mint a specified number of tokens. The contract stores a `signer` address to verify the authenticity of signatures.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

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

## Conclusion

In this discussion, we explored the vulnerabilities associated with signature replay in smart contracts and introduced methods to mitigate such risks, including tracking used signatures and integrating nonce and chainID in the signing process.

For more detailed information on the incident involving Wintermute and the theft of 20 million $OP tokens, [visit this link](https://example.com/wintermute-theft).
