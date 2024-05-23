---
sidebar_position: 1
title: Retrieve Random Numbers
description: Learn how to Use Pyth Oracle on Conflux eSpace to Retrieve Random Numbers
keywords:
  - Hardhat
  - Smart Contracts
  - Oracle
displayed_sidebar: eSpaceSidebar
---

# Retrieve Random Numbers

This tutorial will guide you through building a project on Conflux eSpace using Hardhat and retrieving random numbers through the Pyth oracle.

## Prerequisites

Before starting, ensure you have the following software installed:

1. Node.js and npm
2. Hardhat
3. ConfluxPortal wallet extension

## Step 1: Create a Hardhat Project

First, we need to create a new Hardhat project.

```bash
mkdir conflux-pyth-random
cd conflux-pyth-random
npx hardhat
```

Follow the prompts to create a basic JavaScript project and install the required dependencies.

## Step 2: Install Necessary Dependencies

Install the Pyth client library and Conflux-related dependencies.

```bash
npm install @pythnetwork/client conflux-sdk ethers
```

## Step 3: Configure Hardhat

Configure the Conflux eSpace network in `hardhat.config.js`.

```javascript
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  networks: {
    conflux: {
      url: "https://evm.confluxrpc.com",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
```

## Step 4: Write the Smart Contract

Create a file named `RandomNumber.sol` in the `contracts` directory and add the following code:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@pythnetwork/client/PythClient.sol";

contract RandomNumber {
    PythClient private pythClient;

    constructor(address _pythClient) {
        pythClient = PythClient(_pythClient);
    }

    function getRandomNumber(bytes32 jobId) public view returns (uint256) {
        // Get oracle data
        bytes memory result = pythClient.getPythData(jobId);
        // Assume result is a bytes array containing a random number
        uint256 randomNumber = abi.decode(result, (uint256));
        return randomNumber;
    }
}
```

## Step 5: Deploy the Smart Contract

Create a file named `deploy.js` in the `scripts` directory and add the following code:

```javascript
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const PythClientAddress = "PythClient contract address"; // Replace with the actual PythClient contract address

  const RandomNumber = await ethers.getContractFactory("RandomNumber");
  const randomNumber = await RandomNumber.deploy(PythClientAddress);

  console.log("RandomNumber contract deployed to:", randomNumber.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## Step 6: Run the Deployment Script

Deploy the contract using the following command:

```bash
npx hardhat run scripts/deploy.js --network conflux
```

## Step 7: Interact with the Contract

After deployment, you can interact with the contract using the Hardhat console or a script. For example, create a file named `interact.js` in the `scripts` directory:

```javascript
async function main() {
  const [deployer] = await ethers.getSigners();

  const RandomNumber = await ethers.getContractFactory("RandomNumber");
  const randomNumber = RandomNumber.attach("RandomNumber contract address"); // Replace with the actual contract address

  const jobId = "Pyth oracle job ID"; // Replace with the actual job ID
  const randomNumberResult = await randomNumber.getRandomNumber(jobId);
  console.log("Random Number:", randomNumberResult.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Run the script using the following command:

```bash
npx hardhat run scripts/interact.js --network conflux
```

## Summary

Through this tutorial, you have learned how to build a project on Conflux eSpace using Hardhat and retrieve random numbers through the Pyth oracle. For more information, refer to the [Pyth Oracle official documentation](https://docs.pyth.network/).
