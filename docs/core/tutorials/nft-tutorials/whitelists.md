---
title: Merkle Tree Whitelist
displayed_sidebar: coreSidebar
---

# Merkle Tree NFT Whitelist on CoreSpace using Hardhat

### Requirements

- Node.js installed on your system.
- A Conflux CoreSpace wallet and access to ConfluxPortal.
- Hardhat setup on your machine.

## Step 1: Setting Up Your Environment

Open your terminal and run:

```bash
mkdir conflux-nft-merkletree-whitelist
cd conflux-nft-merkletree-whitelist
npm init -y
npm install --save-dev hardhat
npx hardhat
```

When prompted, choose the default project setup by pressing Enter for all questions. This will create a basic Hardhat project setup with all the necessary configurations.

## Step 2: Installing Dependencies

Install OpenZeppelin contracts, which provide a secure, audited implementation of ERC721 tokens, And Install Hardhat-Conflux-Plugin, which is built on top of js-conflux-sdk, making its usage for deployment and interaction very similar to that of js-conflux-sdk:

```bash
npm install @openzeppelin/contracts hardhat-conflux js-conflux-sdk
```

## Step 3: Configuring Hardhat

Update `hardhat.config.js` to include the Conflux network configuration:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-conflux");

const PRIVATE_KEY = "YOUR_PRIVATE_KEY_HERE";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "cfxTestnet",
  networks: {
    cfx: {
      url: "https://main.confluxrpc.com",
      accounts: [PRIVATE_KEY],
      chainId: 1029,
    },
    cfxTestnet: {
      url: "https://test.confluxrpc.com",
      accounts: [PRIVATE_KEY],
      chainId: 1,
    },
  },
};
```

## Step 4: Writing the Smart Contract

Create a new file `MerkleTreeNFT.sol` in the `contracts` directory:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MerkleTreeNFT is ERC721 {
   bytes32 public immutable merkleRoot;
   mapping(address => bool) public hasMinted;

   constructor(string memory name, string memory symbol, bytes32 root)
   ERC721(name, symbol) {
       merkleRoot = root;
   }

   function mint(address account, uint256 tokenId, bytes32[] calldata proof) external {
       require(_verify(_leaf(account), proof), "Invalid merkle proof");
       require(!hasMinted[account], "Already minted!");
       _mint(account, tokenId);
       hasMinted[account] = true;
   }

   function _leaf(address account) internal pure returns (bytes32) {
       return keccak256(abi.encodePacked(account));
   }

   function _verify(bytes32 leaf, bytes32[] memory proof) internal view returns (bool) {
       return MerkleVerification.verify(proof, merkleRoot, leaf);
   }
}
```

You will need to create or find an implementation for `MerkleVerification` that suits your needs.

Run `npx hardhat compile` in your terminal.

### Step 5: Generating a Merkle Tree

1. **Generate the Merkle Tree:**

   Use a JavaScript script to create a Merkle Tree from your whitelist addresses. You can use libraries like `merkletreejs` and `keccak256`.

   ```javascript
   const { MerkleTree } = require("merkletreejs");
   const keccak256 = require("keccak256");
   const whitelist = ["0x...", "0x..."]; // List of addresses
   const leaves = whitelist.map((addr) => keccak256(addr));
   const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
   const root = tree.getRoot().toString("hex");
   ```

   Save this root in your smart contract deployment script.

## Step 6: Deploying the Contract

1. **Write the Deployment Script:**

   Create a new script in the `scripts` directory to deploy your contract.

   ```javascript
   const hre = require("hardhat");

   async function main() {
     const signers = await hre.conflux.getSigners();
     const defaultAccount = signers[0];

     const ConfluxCRC721NFT = await hre.conflux.getContractFactory(
       "MerkleTreeNFT"
     );
     const receipt = await ConfluxCRC721NFT.constructor("Confi", "Confi", "0x123..."); // Use your Merkle root)
       .sendTransaction({
         from: defaultAccount.address,
       })
       .executed();

     console.log(
       `Contract deployment ${
         receipt.outcomeStatus === 0 ? "succeeded" : "failed"
       }`
     );

     console.log("MerkleTreeNFT deployed to:", receipt.contractCreated);
   }

   main()
     .then(() => process.exit(0))
     .catch((error) => {
       console.error(error);
       process.exit(1);
     });
   ```

Run your script with Hardhat to Deploy to Conflux CoreSpace

```bash
npx hardhat run scripts/deploy.js --network confluxCore
```

## Step 6: Minting an NFT with Whitelist

To mint an NFT, you can use a script that interacts directly with the `mint` function in your smart contract. This script will mint an NFT to a specified address.

Create another script in the `scripts` folder and name it `mintNFT.js`:

This script sets the URI of a specific token, where `YOUR_CONTRACT_ADDRESS` is the address of your deployed NFT contract and `NFT_RECEIVER_ADDRESS` is the address of the NFT you want mint to.

```javascript
const hre = require("hardhat");

async function main() {
  const signers = await hre.conflux.getSigners();
  const defaultAccount = signers[0];

  const contractAddress = "YOUR_CONTRACT_ADDRESS";
  const recipientAddress = "NFT_RECEIVER_ADDRESS"; // Address to receive the NFT
  const tokenURI =
    "https://raw.githubusercontent.com/conflux-fans/dual-space-nft-metadata/main/2023040104"; //  Replace the example tokenURI with the actual metadata URI for the NFT

  const ConfluxCRC721NFT = await hre.conflux.getContractAt(
    "MerkleTreeNFT",
    contractAddress
  );

  const receipt = await ConfluxCRC721NFT.mint(recipientAddress, tokenURI)
    .sendTransaction({
      from: defaultAccount.address,
    })
    .executed();

  console.log(
    `Minted NFT to ${recipientAddress}: Transaction Hash: ${receipt.transactionHash}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

Replace `YOUR_CONTRACT_ADDRESS` with your contract's address and `RECIPIENT_WALLET_ADDRESS` with the address of the wallet that should receive the NFT.

These steps and scripts allow you to manage the lifecycle of your NFT, from minting to setting metadata, directly through Hardhat scripts. Adjust the `tokenURI` in both scripts to match your NFT's metadata location.

You will see the following message after successful deployment
[![Deploy Success](../imgs/nft-tutorials/deploy-success.png)](../imgs/nft-tutorials/deploy-success.png)

### Conclusion

This setup provides a cost-efficient way to distribute NFTs to a whitelist of addresses using a Merkle Tree. Each step is essential for ensuring the security and efficiency of your NFT distribution. Be sure to test thoroughly in a test environment before deploying to the main network.
