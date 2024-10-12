---
displayed_sidebar: eSpaceSidebar
tags:
  - tutorial
  - smart contracts
  - upgradeable contracts
  - UUPS
  - Hardhat
  - eSpace
---

# Deploying Upgradeable Contracts using UUPS with Hardhat


### UUPS (Universal Upgradeable Proxy Standard)

UUPS is an upgradeable proxy pattern that addresses some limitations of the transparent proxy pattern. Key features include:

- **Upgrade Logic in Implementation**: The upgrade functionality is placed in the implementation contract rather than the proxy.
- **Gas Efficiency**: More gas-efficient for users as there's no need to check the caller's identity on every function call.
- **Smaller Proxy Contract**: The proxy contract is simpler and smaller, potentially reducing deployment costs.

### Comparison of Proxy Patterns

1. **UUPS vs. Transparent Proxy**:

   - UUPS places upgrade logic in the implementation, while transparent proxy keeps it in the proxy contract.
   - UUPS is more gas-efficient for regular function calls.
   - Transparent proxy has a larger proxy contract but simpler implementation contracts.

2. **UUPS vs. Regular Upgradeable Proxy**:

   - UUPS provides better security against accidental contract locking.
   - Regular upgradeable proxies are simpler but may be more prone to errors during upgrades.

3. **Common Features**:
   - All patterns allow upgrading contract logic without changing the contract address.
   - They all use delegate calls to forward function calls to the implementation contract.

UUPS is often preferred for its balance of security, gas efficiency, and flexibility. In this tutorial, we'll implement and deploy upgradeable contracts using UUPS on Conflux eSpace.

## Project Setup

1. Create a new directory and initialize the project:

```bash
mkdir uups-proxy-demo
cd uups-proxy-demo
npm init -y
```

2. Install necessary dependencies:

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/hardhat-upgrades dotenv
npm install @openzeppelin/contracts-upgradeable
```

3. Initialize the Hardhat project:

```bash
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

1. Create the initial version of the Counter contract in `contracts/Counter.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

// An upgradeable counter contract with UUPS pattern
contract Counter is UUPSUpgradeable, OwnableUpgradeable {
    // Counter value
    uint256 private count;

    // Event emitted when count changes
    event CountChanged(uint256 count);

    // Initializes the contract, setting up ownership and upgrade capabilities
    // This function replaces the constructor and can only be called once due to the initializer modifier
    function initialize() public initializer {
        // Initialize the Ownable module
        // This function sets up the contract's ownership, making msg.sender the initial owner
        // It's part of the OwnableUpgradeable contract from OpenZeppelin
        __Ownable_init(msg.sender);

        // Initialize the UUPSUpgradeable module
        // This sets up the necessary state variables for the UUPS (Universal Upgradeable Proxy Standard) pattern
        // It's part of the UUPSUpgradeable contract from OpenZeppelin
        __UUPSUpgradeable_init();
    }

    // Increments the counter by 1
    function increment() public {
        count += 1;
        emit CountChanged(count);
    }

    // Returns the current count
    function getCount() public view returns (uint256) {
        return count;
    }

    // Authorizes an upgrade (only owner can call)
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}

```

2. Create the upgraded CounterV2 contract in `contracts/CounterV2.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

// An upgradeable counter contract with UUPS pattern
contract CounterV2 is UUPSUpgradeable, OwnableUpgradeable {
    // Counter value
    uint256 private count;

    // Event emitted when count changes
    event CountChanged(uint256 count);

    // Initializes the contract, setting up ownership and upgrade capabilities
    // This function replaces the constructor and can only be called once due to the initializer modifier
    function initialize() public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
    }

    // Increments the counter by 1
    function increment() public { 
        count += 1;
        emit CountChanged(count);
    }

    // Returns the current count
    function getCount() public view returns (uint256) {
        return count;
    }

    // Resets the counter to 0
    function reset() public {
        count = 0;
        emit CountChanged(count);
    }

    // Authorizes an upgrade (only owner can call)
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
```

## Deployment Script

Create a deployment script in `scripts/deploy.js`:

```javascript
const { ethers, upgrades } = require("hardhat");

async function main() {
  const Counter = await ethers.getContractFactory("Counter");
  console.log("Deploying Counter...");
  const counter = await upgrades.deployProxy(Counter, {
    initializer: "initialize",
    kind: "uups",
  });
  await counter.waitForDeployment(); // Use waitForDeployment instead of deployed
  console.log("Counter deployed to:", await counter.getAddress()); // Use getAddress to get the contract address
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
  const CounterV2 = await ethers.getContractFactory("CounterV2");
  console.log("Upgrading Counter...");
  const proxyAddress = "YOUR_PROXY_ADDRESS_HERE"; // Replace with the actual proxy address
  await upgrades.upgradeProxy(proxyAddress, CounterV2);
  console.log("Counter upgraded");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## Testing Scripts

Create a testing script in `scripts/testCounter.js`:

```javascript
const { ethers } = require("hardhat");

async function main() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = Counter.attach("YOUR_PROXY_ADDRESS_HERE"); // Replace with the actual proxy address
  const tx = await counter.increment();
  await tx.wait();
  const count = await counter.getCount();
  console.log("Counter value:", count.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Create another testing script in `scripts/testCounterV2.js`:

```javascript
const { ethers } = require("hardhat");

async function main() {
  const CounterV2 = await ethers.getContractFactory("CounterV2");
  const proxyAddress = "YOUR_PROXY_ADDRESS_HERE"; // Replace with the actual proxy address
  const counterV2 = await CounterV2.attach(proxyAddress);
  console.log("Testing CounterV2 contract...");

  console.log("Incrementing counter...");
  const incrementTx = await counterV2.increment();
  await incrementTx.wait();
  let count = await counterV2.getCount();
  console.log("CounterV2 current value:", count.toString());

  console.log("Resetting counter...");
  const resetTx = await counterV2.reset();
  await resetTx.wait();
  count = await counterV2.getCount();
  console.log("CounterV2 value after reset:", count.toString());
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

   ```bash
   npx hardhat compile
   ```

2. Deploy the initial contract:

   ```bash
   npx hardhat run scripts/deploy.js --network eSpaceTestnet
   ```

   Make sure to note the deployed proxy address.

3. Update the proxy address in `testCounter.js`, `upgrade.js`, and `testCounterV2.js`.

4. Test the initial version:

   ```bash
   npx hardhat run scripts/testCounter.js --network eSpaceTestnet
   ```

   Expected output:

   ```
   Counter value: 1
   ```

5. Upgrade the contract:

   ```bash
   npx hardhat run scripts/upgrade.js --network eSpaceTestnet
   ```

6. Test the upgraded version:

   ```bash
   npx hardhat run scripts/testCounterV2.js --network eSpaceTestnet
   ```

   Expected Output:

   ```
   Testing CounterV2 contract...
   Incrementing counter...
   CounterV2 current value: 2
   Resetting counter...
   CounterV2 value after reset: 0
   ```

By following these steps, you can deploy and upgrade contracts using the UUPS pattern on Conflux eSpace. This approach allows you to update contract logic without changing the contract address, while providing better gas efficiency and security compared to other proxy patterns.
