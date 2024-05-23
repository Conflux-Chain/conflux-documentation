---
sidebar_position: 1
title: Get Real-time Price Data
description: Learn how to Use Pyth Oracle on Conflux eSpace to Get Real-time Price Data
keywords:
  - Hardhat
  - Smart Contracts
  - Oracle
displayed_sidebar: eSpaceSidebar
---

# Using Pyth Oracle on Conflux eSpace to Get Real-time CFX/USD Price Data

This tutorial will guide you on how to use the Pyth oracle on Conflux eSpace to get real-time CFX/USD price data. We will use Hardhat to build the project.

## Prerequisites

Before you start, make sure you have the following software installed:

- Node.js
- npm
- Git

## Step 1: Create and Set Up the Project

1. Open the terminal and create a new project folder:

   ```bash
   mkdir pyth-conflux
   cd pyth-conflux
   ```

2. Initialize a new npm project:

   ```bash
   npm init -y
   ```

3. Install Hardhat:

   ```bash
   npm install --save-dev hardhat
   ```

4. Create a new Hardhat project:

   ```bash
   npx hardhat
   ```

   Select “Create a basic sample project” and follow the prompts to complete the initialization.

5. Install the necessary dependencies for Conflux eSpace and Pyth:

   ```bash
   npm install --save @confluxproject/conflux-sdk pyth-sdk-solidity
   ```

## Step 2: Write the Smart Contract

1. Create a new contract file `PythPriceConsumer.sol` in the `contracts` folder:

   ```solidity
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "pyth-sdk-solidity/Pyth.sol";

   contract PythPriceConsumer {
       Pyth public pyth;

       constructor(address pythContract) {
           pyth = Pyth(pythContract);
       }

       function getCFXUSDPrice(bytes32 priceID) public view returns (int64) {
           Pyth.Price memory price = pyth.getPrice(priceID);
           return price.price;
       }
   }
   ```

2. Create a deployment script `deploy.js` in the `scripts` folder:

   ```javascript
   const { Conflux } = require("js-conflux-sdk");
   const hre = require("hardhat");

   async function main() {
     // Get the Pyth contract address
     const pythAddress = "PYTH_CONTRACT_ADDRESS"; // Replace with the actual address

     // Deploy the PythPriceConsumer contract
     const PythPriceConsumer = await hre.ethers.getContractFactory(
       "PythPriceConsumer"
     );
     const pythPriceConsumer = await PythPriceConsumer.deploy(pythAddress);

     await pythPriceConsumer.deployed();

     console.log("PythPriceConsumer deployed to:", pythPriceConsumer.address);
   }

   main()
     .then(() => process.exit(0))
     .catch((error) => {
       console.error(error);
       process.exit(1);
     });
   ```

## Step 3: Configure Hardhat

1. Open `hardhat.config.js` and add the Conflux eSpace network configuration:

   ```javascript
   require("@nomiclabs/hardhat-waffle");

   module.exports = {
     solidity: "0.8.4",
     networks: {
       conflux: {
         url: "https://evm.confluxrpc.com",
         accounts: [`0x${process.env.PRIVATE_KEY}`],
       },
     },
   };
   ```

   Make sure you set the `PRIVATE_KEY` environment variable in a `.env` file.

## Step 4: Fetch Pyth Oracle Data

1. Create a script `getPrice.js` in the `scripts` folder to fetch the CFX/USD price:

   ```javascript
   const { ethers } = require("hardhat");

   async function main() {
     const pythPriceConsumerAddress = "PYTH_PRICE_CONSUMER_ADDRESS"; // Replace with the actual address
     const priceID = "CFX_USD_PRICE_ID"; // Replace with the actual price ID

     const PythPriceConsumer = await ethers.getContractFactory(
       "PythPriceConsumer"
     );
     const pythPriceConsumer = await PythPriceConsumer.attach(
       pythPriceConsumerAddress
     );

     const price = await pythPriceConsumer.getCFXUSDPrice(priceID);
     console.log("CFX/USD Price:", price.toString());
   }

   main()
     .then(() => process.exit(0))
     .catch((error) => {
       console.error(error);
       process.exit(1);
     });
   ```

## Step 5: Run Deployment and Query Scripts

1. Deploy the smart contract:

   ```bash
   npx hardhat run scripts/deploy.js --network conflux
   ```

2. Fetch the real-time CFX/USD price data:

   ```bash
   npx hardhat run scripts/getPrice.js --network conflux
   ```

You should now be able to see the real-time CFX/USD price data.

## Conclusion

Congratulations! You have successfully used the Pyth oracle on Conflux eSpace to get real-time CFX/USD price data. For more details about the Pyth oracle, please visit the [Pyth documentation](https://docs.pyth.network/).
