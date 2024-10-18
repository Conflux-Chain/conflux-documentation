---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - ERC20
  - ERC20Permit
  - gas-optimization
  - Solidity
  - approve
  - transferFrom
  - off-chain-signatures
  - Ethereum
  - OpenZeppelin
  - Ethers.js
tags:
  - ERC20Permit
  - Gas Optimization
  - Contratos Inteligentes
---

# ERC20Permit

In standard ERC20, users typically need to execute two separate transactions:

1. **Approval (approve)**: The user authorizes a certain amount of tokens to a recipient.
2. **Transfer (transferFrom)**: The recipient transfers tokens from the user's account.

This approach not only increases gas costs but also diminishes user experience. By using ERC20Permit, we can merge these two steps into a single transaction, thereby saving gas and simplifying the process.

### Gas Optimization Comparison

**Standard ERC20 Process**

1. User calls `approve(spender, amount)`: approximately 50,000 gas
2. Recipient calls `transferFrom(owner, recipient, amount)`: approximately 65,000 gas

**Optimized Process Using ERC20Permit**

1. User generates a signature (off-chain operation, no gas cost)
2. Recipient calls `transferWithPermit` (including permit and transferFrom): approximately 80,000 gas

**Savings**: approximately 35,000 gas, equivalent to a 30% gas reduction.

### Example Code

#### Standard ERC20 Implementation

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Standard ERC20 implementation
contract StandardToken is ERC20 {
    constructor() ERC20("StandardToken", "STD") {
        _mint(msg.sender, 1000000 * 10**decimals());
    }
}
```

#### Optimized Implementation Using ERC20Permit

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract OptimizedToken is ERC20Permit {
    constructor() ERC20("OptimizedToken", "OPT") ERC20Permit("OptimizedToken") {
        _mint(msg.sender, 1000000 * 10**decimals());
    }

    function transferWithPermit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        // Call permit to authorize the spender
        permit(owner, spender, value, deadline, v, r, s);
        
        // Transfer tokens from owner to msg.sender
        transferFrom(owner, msg.sender, value);
    }
}
```

#### Frontend Implementation

Example of implementing ERC20 Permit signature using Ethers.js v6:

```javascript
import { ethers } from "ethers";

async function signERC20Permit(contract, owner, spender, value, deadline, nonce) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  
  const domain = {
    name: await contract.name(),
    version: '1',
    chainId: (await provider.getNetwork()).chainId,
    verifyingContract: await contract.getAddress()
  };

  const types = {
    Permit: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' }
    ]
  };

  const message = {
    owner,
    spender,
    value,
    nonce,
    deadline
  };

  const signature = await signer.signTypedData(domain, types, message);
  const { v, r, s } = ethers.Signature.from(signature);

  return { v, r, s };
}

// Usage example
const abi = [
  "function transferWithPermit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)"
];

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(tokenAddress, abi, signer);

const owner = await signer.getAddress();
const spender = '0x...'; // Address to be authorized
const value = ethers.parseUnits('100', 18); // Amount to authorize
const deadline = Math.floor(Date.now() / 1000) + 60 * 60; // Expires in 1 hour
const nonce = await contract.nonces(owner);

const { v, r, s } = await signERC20Permit(contract, owner, spender, value, deadline, nonce);

// Call the transferWithPermit function of the contract
await contract.transferWithPermit(owner, spender, value, deadline, v, r, s);
```

### Advantages of ERC20Permit

- **Reduced Transaction Count**: Merges approval and transfer into a single transaction, saving gas.
- **Improved User Experience**: Token holders do not need to pay gas fees for approvals.
- **Batch Processing**: Recipients can batch multiple permit and transferFrom operations in one transaction, further reducing gas consumption.

By adopting ERC20Permit, you can create a smoother and more cost-effective token interaction experience for users while reducing the overall load on the blockchain network.

**Gas Optimization Recommendations**

🌟 In scenarios where frequent approvals and transfers are needed, consider using ERC20Permit. This can significantly reduce the number of transactions and overall gas consumption for users.
