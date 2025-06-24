---
displayed_sidebar: eSpaceSidebar
keywords:
  - tutorial
  - smart contracts
  - upgradeable contracts
  - UUPS
  - Hardhat
  - eSpace
tags: [ 教程, 可升级的合约 ]
---

# 使用 Hardhat 部署可升级合约（UUPS 模式）

### UUPS（通用可升级代理标准）

UUPS 是一种可升级的代理模式，解决了透明代理模式的某些局限性。 其主要特点包括：

- **升级逻辑在实现中的应用**: 升级功能被放置在实现合约中，而不是代理合约中。
- **燃气效率**: 由于无需在每个函数调用时检查调用者的身份，因此对用户来说更加节省燃气。
- **更小的代理合约**: 代理合约更简单、更小，可能减少部署成本。

### 代理模式比较

1. **UUPS vs. 透明代理**:

  - UUPS 将升级逻辑放在实现合约中，而透明代理将其放在代理合约中。
  - UUPS 对于常规函数调用更节省燃气。
  - 透明代理的代理合约较大，但实现合约更简单。

2. **UUPS vs. 传统可升级代理**:

  - UUPS provides better security against accidental contract locking.
  - 传统可升级代理更简单，但在升级过程中更容易出错。

3. **Common Features**:
  - 所有模式都允许在不更改合约地址的情况下升级合约逻辑。
  - 它们都使用委托调用（delegate calls）将函数调用转发到实现合约。

由于其在安全性、燃气效率和灵活性方面的平衡，UUPS通常更受欢迎。 在本教程中，我们将在 Conflux eSpace 上使用 UUPS 实现和部署可升级合约。

## 项目设置

1. 创建一个新目录并初始化项目：

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

3. 初始化 Hardhat 项目：

```bash
npx hardhat
```

选择"创建一个JavaScript项目".

4. 配置Hardhat

编辑`hardhat.config.js`文件:

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

5. 创建一个`.env`文件并添加你的私钥：

```
PRIVATE_KEY=your_private_key_here
```

## 编写智能合约

1. 在 `contracts/Counter.sol`中创建Counter合约的初始版本:

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

2. 在`contracts/CounterV2.sol`中创建升级版的CounterV合约:

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

## 部署脚本

在`scripts/deploy.js`中创建部署脚本：

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

## 升级脚本

在`scripts/upgrade.js`中创建升级脚本：

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

## 测试脚本

在 `scripts/testCounter.js`中创建测试脚本：

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

在`scripts/testCounterV2.js`中创建另一个测试脚本：

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

## 部署和升级过程

1. Compile the contracts:

  ```bash
  npx hardhat compile
  ```

2. Deploy the initial contract:

  ```bash
  npx hardhat run scripts/deploy.js --network eSpaceTestnet
  ```

  请确保记录下已部署的代理地址。

3. Update the proxy address in `testCounter.js`, `upgrade.js`, and `testCounterV2.js`.

4. 测试初始版本：

  ```bash
  npx hardhat run scripts/testCounter.js --network eSpaceTestnet
  ```

  预期输出：

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
