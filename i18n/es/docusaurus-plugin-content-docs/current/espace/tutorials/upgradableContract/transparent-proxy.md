---
displayed_sidebar: eSpaceSidebar
keywords:
  - tutorial
  - smart contracts
  - upgradeable contracts
  - transparent proxy
  - Hardhat
  - eSpace
tags:
  - Tutorial
  - Upgradeable Contracts
  - Transparent Proxy
---

# Deploying Upgradeable Contracts using Transparent Proxy with Hardhat

## Introduction to Transparent Proxy and Selector Conflicts

Before diving into the tutorial, let's briefly introduce the concepts of transparent proxy and selector conflicts:

### Transparent Proxy

Transparent proxy is a special type of proxy contract that addresses selector conflict issues by separating management functions from user functions. Key features include:

- **Separation of Management Functions**: The proxy contract contains specific management functions (such as upgrades) that can only be called by the administrator.
- **Transparency**: For regular users, the existence of the proxy contract is "transparent," allowing them to interact with it as if they were directly interacting with the logic contract.
- **Permission Checks**: The proxy contract checks the caller's identity on each invocation to determine whether to execute its own functions or delegate the call to the logic contract.

### Selector Conflicts

Selector conflicts refer to issues that may arise when there are functions with the same name in both the proxy and logic contracts. Por ejemplo:

- If both the proxy and logic contracts have a function named `upgrade()`, it becomes unclear which contract's function should be executed when a user calls `upgrade()`.

Transparent proxy resolve this issue by:

- Executing the function in the proxy contract (if it exists) when the caller is the administrator.
- Always delegating the call to the logic contract when the caller is not the administrator.

This approach ensures the security of management functions while providing a seamless experience for regular users.

Next, we will learn how to implement and deploy upgradeable contracts using transparent proxy on Conflux eSpace.

## Project Setup

1. Create a new directory and initialize the project:

```
mkdir transparent-proxy-demo
cd transparent-proxy-demo
npm init -y
```

2. Install necessary dependencies:

```
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/hardhat-upgrades @openzeppelin/contracts dotenv
```

3. Initialize the Hardhat project:

```
npx hardhat
```

Choose "Create a JavaScript project".

4. Configure Hardhat

Edit the `hardhat.config.js` file:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    eSpaceTestnet: {
      url: "https://evmtestnet.confluxrpc.com",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
```

5. Create a `.env` file and add your private key:

```
PRIVATE_KEY=your_private_key_here
```

## Writing Smart Contracts

1. Create the initial version of the Box contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Box {
    uint256 private _value;

    event ValueChanged(uint256 value);

    function store(uint256 value) public {
        _value = value;
        emit ValueChanged(value);
    }

    function retrieve() public view returns (uint256) {
        return _value;
    }
}
```

2. Create the upgraded BoxV2 contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BoxV2 {
    uint256 private _value;

    event ValueChanged(uint256 value);

    function store(uint256 value) public {
        _value = value;
        emit ValueChanged(value);
    }

    function retrieve() public view returns (uint256) {
        return _value;
    }

    function increment() public {
        _value = _value + 1;
        emit ValueChanged(_value);
    }
}
```

## Deployment Script

Create a deployment script in `scripts/deploy.js`:

```javascript
const { ethers, upgrades } = require("hardhat");

async function main() {
  const Box = await ethers.getContractFactory("Box");
  console.log("Deploying Box...");
  const box = await upgrades.deployProxy(Box, [42], { initializer: "store" });
  await box.waitForDeployment();
  console.log("Box deployed to:", await box.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## Upgrade Script

Create an upgrade script in `scripts/upgrade.js`:

```javascript
const { ethers, upgrades } = require("hardhat");

async function main() {
  const BoxV2 = await ethers.getContractFactory("BoxV2");
  console.log("Upgrading Box...");
  await upgrades.upgradeProxy("YOUR_PROXY_ADDRESS_HERE", BoxV2);
  console.log("Box upgraded");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## Testing Scripts

Create a testing script in `scripts/testBox.js`:

```javascript
const { ethers } = require("hardhat");

async function main() {
  const Box = await ethers.getContractFactory("Box");
  const box = Box.attach("YOUR_PROXY_ADDRESS_HERE");

  await box.store(23);
  const value = await box.retrieve();
  console.log("Box value:", value.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Create another testing script in `scripts/testBoxV2.js`:

```javascript
const { ethers, upgrades } = require("hardhat");

async function main() {
  const BoxV2 = await ethers.getContractFactory("BoxV2");
  const proxyAddress = "YOUR_PROXY_ADDRESS_HERE";
  const boxV2 = await BoxV2.attach(proxyAddress);

  console.log("Testing BoxV2 contract...");

  console.log("Storing value 23...");
  const storeTx = await boxV2.store(23);
  await storeTx.wait();

  let value = await boxV2.retrieve();
  console.log("BoxV2 current value:", value.toString());

  console.log("Calling increment function...");
  const incrementTx = await boxV2.increment();
  await incrementTx.wait();

  value = await boxV2.retrieve();
  console.log("Value after increment:", value.toString());

  console.log("Calling increment function again...");
  const incrementTx2 = await boxV2.increment();
  await incrementTx2.wait();

  value = await boxV2.retrieve();
  console.log("Final value:", value.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## Deployment and Upgrade Process

1. Compile the contracts:
   ```
   npx hardhat compile
   ```

2. Deploy the initial contract:

   ```
   npx hardhat run scripts/deploy.js --network eSpaceTestnet
   ```

3. Test the initial version:

   ```
   npx hardhat run scripts/testBox.js --network eSpaceTestnet
   ```

   Expected output:

   ```
   Box value: 23
   ```

4. Upgrade the contract:

   ```
   npx hardhat run scripts/upgrade.js --network eSpaceTestnet
   ```

5. Test the upgraded version:

   ```
   npx hardhat run scripts/testBoxV2.js --network eSpaceTestnet
   ```

   Expected Output:

   ```
   BoxV2 current value: 23
   Value after increment: 24
   Final value: 25
   ```

By following these steps, you can deploy and upgrade upgradeable contracts using transparent proxy on Conflux eSpace, which not only allows you to update contract logic without changing the contract address but also effectively addresses selector conflicts by separating management functions from user functions.
