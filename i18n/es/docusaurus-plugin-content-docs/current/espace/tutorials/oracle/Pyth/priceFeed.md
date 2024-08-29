---
sidebar_position: 1
title: Retrieve Price
description: Learn how to Use Pyth Oracle on Conflux eSpace to Retrieve CFX Price
keywords:
  - Hardhat
  - Contratos Inteligentes
  - Oracle
  - Pyth
  - CFX Price
displayed_sidebar: eSpaceSidebar
---

# Retrieve Price

This tutorial will guide you through building a project on Conflux eSpace using Hardhat and retrieving the CFX price through the Pyth oracle.

## Prerequisites

Before starting, ensure you have the following software installed:

1. Node.js and npm
2. Hardhat
3. Conflux wallet extension

## Step 1: Create a Hardhat Project

First, create a new Hardhat project:

```bash
mkdir conflux-pyth-cfx-price
cd conflux-pyth-cfx-price
npx hardhat
```

Follow the prompts to create a basic JavaScript project.

## Step 2: Install Necessary Dependencies

Install the Pyth SDK and other required dependencies:

```bash
npm install @pythnetwork/pyth-sdk-solidity @pythnetwork/pyth-evm-js dotenv
```

## Step 3: Configure Hardhat

Update `hardhat.config.js` to include the Conflux eSpace Testnet:

```javascript
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    confluxTestnet: {
      url: "https://evmtestnet.confluxrpc.com",
      accounts: [process.env.PRIVATE_KEY], // Your private key here
    },
  },
};
```

Make sure to set your private key as an environment variable for security.

## Step 4: Write the Smart Contract

Create `CFXPrice.sol` in the `contracts` directory:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract CFXPrice {
    IPyth pyth;
    bytes32 constant CFX_USD_PRICE_ID = 0x8879170230c9603342f3837cf9a8e76c61791198fb1271bb2552c9af7b33c933;

    constructor(address pythContract) {
        pyth = IPyth(pythContract);
    }

    function getCFXPrice(bytes[] calldata priceUpdateData) public payable returns (int64, uint) {
        uint fee = pyth.getUpdateFee(priceUpdateData);
        pyth.updatePriceFeeds{value: fee}(priceUpdateData);

        PythStructs.Price memory price = pyth.getPrice(CFX_USD_PRICE_ID);
        return (price.price, price.conf);
    }
}
```

## Step 5: Deploy the Smart Contract

Create `deploy.js` in the `scripts` directory:

```javascript
const hre = require("hardhat");

async function main() {
  const pythContractAddress = "0xDd24F84d36BF92C65F92307595335bdFab5Bbd21"; // Pyth contract address on Conflux eSpace Testnet

  const CFXPrice = await hre.ethers.getContractFactory("CFXPrice");
  const cfxPrice = await CFXPrice.deploy(pythContractAddress);

  await cfxPrice.waitForDeployment();

  console.log("CFXPrice deployed to:", await cfxPrice.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

## Step 6: Run the Deployment Script

Deploy the contract using:

```bash
npx hardhat run scripts/deploy.js --network confluxTestnet
```

## Step 7: Interact with the Contract

Create `interact.js` in the `scripts` directory:

```javascript
const hre = require("hardhat");
const { EvmPriceServiceConnection } = require("@pythnetwork/pyth-evm-js");

async function main() {
  const CFXPrice = await hre.ethers.getContractFactory("CFXPrice");
  const cfxPrice = await CFXPrice.attach("YOUR_DEPLOYED_CONTRACT_ADDRESS"); // Replace with your actual deployed address

  const connection = new EvmPriceServiceConnection(
    "https://hermes.pyth.network" // Use Hermes price service
  );

  const priceIds = [
    "0x8879170230c9603342f3837cf9a8e76c61791198fb1271bb2552c9af7b33c933", // CFX/USD price feed ID
  ];

  try {
    const priceUpdateData = await connection.getPriceFeedsUpdateData(priceIds);
    
    // Estimate gas
    const gasEstimate = await cfxPrice.getCFXPrice.estimateGas(priceUpdateData, {
      value: hre.ethers.parseEther("0.01"), // Send some CFX to pay for the update fee, adjust as needed
    });

    console.log("Estimated gas:", gasEstimate.toString());

    // Call getCFXPrice function
    const tx = await cfxPrice.getCFXPrice(priceUpdateData, {
      value: hre.ethers.parseEther("0.01"), // Send some CFX to pay for the update fee, adjust as needed
    });

    console.log("Transaction sent:", tx.hash);

    // Wait for transaction confirmation
    const receipt = await tx.wait();

    console.log("Transaction confirmed in block:", receipt.blockNumber);

    // Get the price directly using staticCall
    const [price, confidence] = await cfxPrice.getCFXPrice.staticCall(priceUpdateData, {
      value: hre.ethers.parseEther("0.01"),
    });

    console.log("CFX/USD Price:", hre.ethers.formatUnits(price, 8)); // Pyth prices are usually in 8 decimals
    console.log("Confidence:", hre.ethers.formatUnits(confidence, 8));

  } catch (error) {
    console.error("Error occurred:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

Run the interaction script:

```bash
npx hardhat run scripts/interact.js --network confluxTestnet
```

![Get CFX Price Success](../../img/get-cfx-price-success.png)

## Summary

This tutorial demonstrates how to deploy a smart contract on Conflux eSpace Testnet that fetches the CFX/USD price using Pyth Network. Key points:

1. We use the correct CFX/USD price feed ID for Pyth.
2. The contract is deployed on Conflux eSpace Testnet.
3. We use the Hermes price service for fetching update data.
4. The interaction script estimates gas, sends a transaction to update the price, and then retrieves the latest price.

Remember to always use testnet tokens and addresses when testing. For production use, you'd switch to mainnet addresses and endpoints.

For more information, refer to the [Pyth Network documentation](https://docs.pyth.network/)
