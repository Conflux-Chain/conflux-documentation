---
displayed_sidebar: eSpaceSidebar
---
# How to use ECDSA Signature

ECDSA (Elliptic Curve Digital Signature Algorithm) is a widely used digital signature algorithm in blockchain and cryptocurrency. It has the following characteristics:

- High security: Based on elliptic curve cryptography
- Short signature length: ECDSA generates more compact signatures compared to algorithms like RSA
- Fast verification: Suitable for use in smart contracts

### Basic Smart Contract Example

Here's a simple Solidity smart contract demonstrating the basic use of ECDSA signatures:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SimpleECDSAExample {
    using ECDSA for bytes32;

    function verifySignature(bytes32 message, bytes memory signature, address signer) public pure returns (bool) {
        return message.toEthSignedMessageHash().recover(signature) == signer;
    }
}
```

This contract demonstrates the basic usage of ECDSA for signature verification. It uses OpenZeppelin's ECDSA library to:
1. Convert the message to an Ethereum signed message hash
2. Recover the signer's address from the signature
3. Compare the recovered address with the provided signer address

## Creating and Verifying ECDSA Signatures

Using ethers v6, creating and verifying ECDSA signatures is straightforward. Here's an example:

```javascript
const ethers = require('ethers');

// Create a signer (using a random private key in this example)
const signer = new ethers.Wallet(ethers.id("test"));
console.log("Signer's address:", signer.address);

// Message to be signed
const message = "Sign into Conflux?";

// Sign the message
const signature = await signer.signMessage(message);
console.log("Signature:", signature);
```

This example demonstrates:
1. How to create a signer (using a random private key)
2. How to sign a message
3. How to verify a signature and recover the signer's address

Note: The `signMessage` method automatically handles message preprocessing (adding a prefix and hashing), so you don't need to perform these steps manually.

## ECDSA Signatures in Allowlists and Airdrops

### Why Replace Merkle Trees with ECDSA Signatures?

While Merkle trees are useful in many scenarios, they can lead to higher gas costs in certain situations:

1. They use a considerable amount of calldata
2. The size of Merkle proofs increases with the size of the tree
3. Verifying Merkle proofs requires multiple hash operations

In contrast, ECDSA signatures typically offer better gas efficiency.

### Advantages of ECDSA Signatures

1. Fixed size: The signature length remains constant regardless of the dataset size
2. Lower verification cost: Only one ECDSA recovery operation is needed
3. Less on-chain storage: No need to store tree roots

### Implementation Example

Here's a smart contract example using ECDSA signatures to verify an allowlist:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract ECDSAAllowlist {
    using ECDSA for bytes32;

    address public signer;

    constructor(address _signer) {
        signer = _signer;
    }

    function isAllowed(address user, uint256 amount, bytes memory signature) public view returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(user, amount));
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        address recoveredSigner = ethSignedMessageHash.recover(signature);
        return recoveredSigner == signer;
    }

    // Other contract functionalities...
}
```

### Generating Signatures

Off-chain, you can use the following JavaScript code to generate signatures:

```javascript
const ethers = require('ethers');

async function signAllowlistMessage(signer, userAddress, amount) {
    const message = ethers.solidityPacked(
        ['address', 'uint256'],
        [userAddress, amount]
    );
    const messageHash = ethers.keccak256(message);
    // Use signMessage to automatically apply EIP-191 prefix
    const signature = await signer.signMessage(ethers.getBytes(messageHash));
    return signature;
}

// Usage example
const privateKey = 'YOUR_PRIVATE_KEY';
const signer = new ethers.Wallet(privateKey);
const userAddress = 'USER_ADDRESS';
const amount = 100;

signAllowlistMessage(signer, userAddress, amount).then(signature => {
    console.log('Signature:', signature);
});
```

### Gas Cost Comparison

Here's a rough comparison of gas costs:

- Merkle tree verification: About 50,000-100,000 gas (depending on tree depth)
- ECDSA signature verification: About 3,000-6,000 gas

This means using ECDSA signatures can save approximately 90% in gas costs!


## 4. Conclusion

ECDSA signatures provide a powerful tool for optimizing gas costs, especially when dealing with large allowlists or frequent airdrop operations. By using ECDSA signatures instead of Merkle trees, you can significantly reduce gas costs and improve contract efficiency. However, be sure to weigh the pros and cons for your specific use case before making a decision.

The flexibility and efficiency of ECDSA signatures make them a valuable tool in various blockchain applications beyond just allowlists and airdrops. As you become more comfortable with these concepts, you can explore more advanced use cases such as meta-transactions, multi-sig wallets, and decentralized identity systems.
