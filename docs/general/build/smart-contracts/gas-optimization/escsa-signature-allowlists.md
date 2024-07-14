---
displayed_sidebar: generalSidebar
---
# Using ECDSA Signatures for Allowlists and Airdrops

In blockchain development, optimizing gas costs is a crucial consideration. This tutorial will explain how to use ECDSA (Elliptic Curve Digital Signature Algorithm) signatures instead of Merkle trees to achieve lower gas costs, especially when dealing with allowlists and airdrops.

### Why Replace Merkle Trees?

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

Let's look at a simple example demonstrating how to use ECDSA signatures instead of Merkle trees to verify an allowlist.

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
        bytes32 message = keccak256(abi.encodePacked(user, amount));
        bytes32 signedMessage = message.toEthSignedMessageHash();
        address recoveredSigner = signedMessage.recover(signature);
        return recoveredSigner == signer;
    }

    // Other contract functionalities...
}
```

In this example:

1. We define a `signer` address used to verify signatures.
2. The `isAllowed` function takes the user's address, amount, and signature as parameters.
3. We create a message using the `keccak256` hash function, containing the user's address and amount.
4. We use OpenZeppelin's ECDSA library to recover the signer's address.
5. Finally, we check if the recovered signer matches the preset `signer` address.

### How to Generate Signatures

Off-chain, you can use JavaScript code similar to the following to generate signatures:

```javascript
const ethers = require('ethers');

async function signAllowlistMessage(signer, userAddress, amount) {
    const message = ethers.utils.solidityKeccak256(
        ['address', 'uint256'],
        [userAddress, amount]
    );
    const signature = await signer.signMessage(ethers.utils.arrayify(message));
    return signature;
}
```

### Gas Cost Comparison

Here's a rough comparison of gas costs:

- Merkle tree verification: About 50,000-100,000 gas (depending on tree depth)
- ECDSA signature verification: About 3,000-6,000 gas

This means using ECDSA signatures can save approximately 90% in gas costs!

### Considerations

1. Security: Ensure the private key's safety, as it can generate valid signatures for any address and amount.
2. Revocation: Implementing a mechanism to revoke or invalidate signatures might be more complex.
3. Off-chain complexity: The process of generating and managing signatures may be more complex than building Merkle trees.

### Recommendations for gas optimization:

🌟 By using ECDSA signatures instead of Merkle trees, you can reduce gas costs, especially when dealing with large allowlists or frequent airdrop operations. However, be sure to weigh the pros and cons for your specific use case before making a decision.
