---
title: Private Variables Security
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - security
  - solidity
  - private variables
  - blockchain
  - transparency
  - storage slots
  - best-practices
tags:
  - Private Variables
  - Security
  - Smart Contracts
---

When developing smart contracts, it's crucial to understand that marking variables as `private` does not make them confidential. This tutorial explains why private variables are still accessible and provides best practices for handling sensitive information in smart contracts.

In Solidity, the `private` keyword only prevents other contracts from accessing the variable directly through code. However, all data stored on the blockchain is publicly visible, including private variables.

Consider this simple smart contract with a private variable:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PrivateDataExample {
    uint256 private secretNumber;
    
    constructor(uint256 _secret) {
        secretNumber = _secret;
    }
}
```

While this variable cannot be accessed by other smart contracts, anyone can read its value by directly querying the blockchain storage.

#### Vulnerability Explanation

The blockchain is a transparent, distributed ledger where all data must be accessible to validators to verify transactions. Private variables are stored in specific storage slots that can be read using web3 libraries or blockchain explorers.

Here's how someone could read the private variable:

```javascript
import { ethers } from "ethers";

async function readPrivateData(contractAddress) {
    const provider = new ethers.JsonRpcProvider("YOUR_RPC_URL");
    
    // Read storage slot 0 where 'secretNumber' is stored
    const data = await provider.getStorage(contractAddress, 0);
    
    // In v6, formatUnits is a standalone function
    console.log("Secret number:", ethers.formatUnits(BigInt(data), 0));
}
```

#### Real-World Implications

This transparency has led to several security incidents where developers mistakenly stored sensitive information in private variables, thinking they were secure. Common examples include:

- Private keys or seeds
- Authentication credentials
- Confidential business logic parameters

#### Best Practices

1. **Never store sensitive data on-chain**: Any data that needs to remain confidential should not be stored on the blockchain, even in private variables.

2. **Use commit-reveal patterns**: For data that needs temporary privacy:

```solidity
contract CommitReveal {
    mapping(address => bytes32) private commits;
    
    function commit(bytes32 commitHash) external {
        commits[msg.sender] = commitHash;
    }
    
    function reveal(string calldata solution) external {
        bytes32 commit = commits[msg.sender];
        require(commit == keccak256(abi.encodePacked(solution)), "Invalid solution");
        // Process the revealed solution
    }
}
```

3. **Use off-chain storage**: Store sensitive data off-chain and only put hashes on-chain:

```solidity
contract SecureStorage {
    mapping(bytes32 => bool) private dataHashes;
    
    function storeHash(bytes32 hash) external {
        dataHashes[hash] = true;
    }
    
    function verifyData(string calldata data) external view returns (bool) {
        return dataHashes[keccak256(abi.encodePacked(data))];
    }
}
```

4. **Use encryption**: If you must store sensitive data on-chain, encrypt it first:

```solidity
contract EncryptedStorage {
    mapping(address => bytes) private encryptedData;
    
    function storeEncrypted(bytes calldata _encryptedData) external {
        // Store data that was encrypted off-chain
        encryptedData[msg.sender] = _encryptedData;
    }
}
```

Remember: The blockchain is fundamentally transparent. If your application requires true data privacy, carefully consider whether blockchain storage is appropriate for that particular data.
