---
displayed_sidebar: eSpaceSidebar
keywords:
  - Conflux eSpace
  - ECDSA
  - Digital Signatures
  - 智能合约
  - Solidity
  - OpenZeppelin
  - 以太坊
  - Cryptography
  - Blockchain Security
  - GAS 优化
  - Allowlists
  - Airdrops
  - Merkle Trees
  - ethers.js
  - JavaScript
  - Web3 Development
  - EIP-191
  - Signature Verification
  - Elliptic Curve Cryptography
  - Off-chain Computation
  - On-chain Verification
  - Contract Efficiency
  - Decentralized Identity
  - Multi-sig Wallets
tags:
  - ECDSA
  - 教程
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
        return message.recover(signature) == signer;
    }
}
```

This contract demonstrates the basic usage of ECDSA for signature verification. It uses OpenZeppelin's ECDSA library to:

1. Recover the signer's address from the signature
2. Compare the recovered address with the provided signer address

Note: This example uses OpenZeppelin v5.0.0. If you're using an earlier version, you may need to adjust the code accordingly.

## Creating and Verifying ECDSA Signatures

Using ethers v6, creating and verifying ECDSA signatures is straightforward. Here's an example:

```javascript
const ethers = require('ethers');

// Create a signer (using a random wallet in this example)
const signer = new ethers.Wallet.createRandom()
console.log("Signer's address:", signer.address);

// Message to be signed
const message = "Sign into Conflux?";

// Sign the message
const signature = await signer.signMessage(message);
console.log("Signature:", signature);
```

This example demonstrates:

1. How to create a signer (using a random wallet)
2. How to sign a message

Note: The `signMessage` method automatically handles message preprocessing (adding a prefix and hashing), so you don't need to perform these steps manually.

## ECDSA Signatures in Allowlists and Airdrops

### Comparing ECDSA Signatures with Merkle Trees

Both ECDSA signatures and Merkle trees are useful techniques in blockchain applications, particularly for allowlists and airdrops. Let's compare their characteristics:

#### Merkle Trees:

1. **Efficiency for Large Datasets**: Excellent for verifying membership in large datasets.
2. **Gas Costs**: Can lead to higher gas costs in certain situations:
   - Use considerable amount of calldata
   - Size of Merkle proofs increases with the size of the tree
   - Verifying Merkle proofs requires multiple hash operations
3. **On-chain Storage**: Requires storing the Merkle root on-chain
4. **Flexibility**: Allows efficient updates to large datasets by only changing the affected branches

#### ECDSA Signatures:

1. **Fixed Size**: The signature length remains constant regardless of the dataset size
2. **Lower Verification Cost**: Only one ECDSA recovery operation is needed
3. **Less On-chain Storage**: No need to store tree roots
4. **Simplicity**: Can be easier to implement and understand

#### Gas Cost Comparison

Here's a rough comparison of gas costs:

- Merkle tree verification: About 50,000-100,000 gas (depending on tree depth)
- ECDSA signature verification: About 3,000-6,000 gas

This means using ECDSA signatures can save approximately 90% in gas costs!

#### Considerations:

- **Dataset Size**: For very large datasets, Merkle trees might be more efficient as they don't require individual signatures for each element
- **Update Frequency**: If the dataset changes frequently, ECDSA signatures might require more off-chain computation to generate new signatures
- **Gas Efficiency**: In many cases, ECDSA signatures offer better gas efficiency, especially for smaller datasets or when verifying individual elements

### Implementation Example

Here's a smart contract example using ECDSA signatures to verify an allowlist:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract ECDSAAllowlist {
    address public signer;

    constructor(address _signer) {
        signer = _signer;
    }

    function isAllowed(address user, uint256 amount, bytes memory signature) public view returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(user, amount));
        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(messageHash);
        address recoveredSigner = ECDSA.recover(ethSignedMessageHash, signature);
        return recoveredSigner == signer;
    }

    // Other contract functionalities...
}
```

Note: This example uses OpenZeppelin v5.0.0. If you're using an earlier version, you may need to adjust the code accordingly.

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

const privateKey = 'YOUR_PRIVATE_KEY';
const signer = new ethers.Wallet(privateKey);
const userAddress = 'USER_ADDRESS';
const amount = 100;

signAllowlistMessage(signer, userAddress, amount).then(signature => {
    console.log('Signature:', signature);
});
```

## 结论

ECDSA signatures provide a powerful tool for optimizing gas costs, especially when dealing with large allowlists or frequent airdrop operations. By using ECDSA signatures instead of Merkle trees, you can significantly reduce gas costs and improve contract efficiency. However, be sure to weigh the pros and cons for your specific use case before making a decision.

The flexibility and efficiency of ECDSA signatures make them a valuable tool in various blockchain applications beyond just allowlists and airdrops. As you become more comfortable with these concepts, you can explore more advanced use cases such as multi-sig wallets and decentralized identity systems.
