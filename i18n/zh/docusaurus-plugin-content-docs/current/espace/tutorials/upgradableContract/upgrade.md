---
sidebar_position: 1
title: 使用Hardhat部署可升级合约
description: Learn how to deploy upgradeable contracts on Conflux eSpace using Hardhat
keywords:
  - tutorial
  - smart contracts
  - upgradeable contracts
  - Hardhat
  - eSpace
  - proxy pattern
displayed_sidebar: eSpaceSidebar
tags: [ 教程, 可升级的合约, Hardhat ]
---

# 在Conflux eSpace上使用Hardhat部署可升级合约

<!-- # Implementing Upgradeable Contracts: Basic Principles -->

在深入学习教程之前，我们先简要解释一下实现可升级合约的基本原理：

1. **关注点分离**: 合约逻辑与存储通过两个合约进行分离。

  - A Proxy contract that holds the state and receives user interactions.
  - A Logic contract (Implementation contract) that contains the actual code logic.

2. **委托调用**:代理合约使用`delegatecall`将函数调用转发到逻辑合约。

3. **可升级性**: 通过部署一个新的逻辑合约并更新代理指向它来实现升级。

4. **回退函数**: 代理合约使用回退函数捕获并委托所有函数调用

5. **Storage Layout**: Ensure new versions of the Logic contract maintain the same storage layout to prevent data corruption.

可升级合约的工作流程如下：

1. 代理合约存储当前逻辑合约的地址。
2. When the Proxy is called, it triggers the fallback function.
3. The fallback function uses `delegatecall` to forward the call to the Logic contract.
4. The Logic contract executes the function in the context of the Proxy's storage.
5. To upgrade, deploy a new Logic contract and update the Proxy's reference.

This pattern allows for upgrading contract logic while preserving the contract's state and address, providing a seamless experience for users and other contracts interacting with the upgradeable contract.

Next, we'll proceed with the tutorial on how to implement this pattern on Conflux eSpace using Hardhat.

## 1. 项目设置

首先，确保你已经安装了 Node.js 和 npm。 然后，创建一个新目录并初始化项目：

```
mkdir upgradeable-contract-demo
cd upgradeable-contract-demo
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv
```

接下来，初始化Hardhat项目并选择JavaScript默认模板：

```
npx hardhat
```

When prompted, choose "Create a JavaScript project". This will create a basic Hardhat project structure, including `contracts`, `scripts`, and `test` directories, as well as a default `hardhat.config.js` file.

After completing these steps, you'll have a basic Hardhat project structure using JavaScript, ready for writing and deploying upgradeable contracts.

## 2. 配置Hardhat

创建Hardhat配置文件:

```javascript
require("@nomicfoundation/hardhat-toolbox");
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

Create a .env file and add your private key:

```
PRIVATE_KEY=your_private_key_here
```

## 3. 编写智能合约

Create a contracts directory and add the following contracts:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SimpleUpgrade {
    // Address of the current implementation contract
    address public implementation;
    // Address of the admin who can upgrade the contract
    address public admin;
    // A string variable to demonstrate state changes
    string public words;

    // Constructor sets the initial implementation and admin
    constructor(address _implementation) {
        admin = msg.sender;
        implementation = _implementation;
    }

    // Fallback function to delegate calls to the implementation contract
    fallback() external payable {
        (bool success, ) = implementation.delegatecall(msg.data);
        require(success, "Delegatecall failed");
    }

    // Receive function to accept Ether
    receive() external payable {
    }

    // Function to upgrade the implementation contract
    // Only the admin can call this function
    function upgrade(address newImplementation) external {
        require(msg.sender == admin, "Only admin can upgrade");
        implementation = newImplementation;
    }
}
```

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;


contract Logic1 {
    // Address of the current implementation contract
    address public implementation;
    // Address of the admin who can upgrade the contract
    address public admin;
    // A string variable to demonstrate state changes
    string public words;

    // Function to set the 'words' variable
    function foo() public {
        words = "old";
    }
}
```

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Logic2 {
    // Address of the current implementation contract
    address public implementation;
    // Address of the admin who can upgrade the contract
    address public admin;
    // A string variable to demonstrate state changes
    string public words;

    // Function to set the 'words' variable
    // Note: This function is different from Logic1
    function foo() public {
        words = "new";
    }
}
```

## 4. 部署脚本

Create a scripts directory and add the following script:

```javascript
const hre = require("hardhat");

async function main() {
  // Deploy Logic1 contract
  const Logic1 = await hre.ethers.getContractFactory("Logic1");
  const logic1 = await Logic1.deploy();
  await logic1.waitForDeployment();
  console.log("Logic1 deployed to:", await logic1.getAddress());

  // Deploy SimpleUpgrade (Proxy) contract
  const SimpleUpgrade = await hre.ethers.getContractFactory("SimpleUpgrade");
  const proxy = await SimpleUpgrade.deploy(await logic1.getAddress());
  await proxy.waitForDeployment();
  console.log("Proxy deployed to:", await proxy.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## 5. 升级脚本

```javascript
const hre = require("hardhat");

async function main() {
  // Address of the deployed proxy contract
  const proxyAddress = "YOUR_PROXY_CONTRACT_ADDRESS";

  // Deploy Logic2 contract
  const Logic2 = await hre.ethers.getContractFactory("Logic2");
  const logic2 = await Logic2.deploy();
  await logic2.waitForDeployment();
  console.log("Logic2 deployed to:", await logic2.getAddress());

  // Attach to the existing proxy contract
  const SimpleUpgrade = await hre.ethers.getContractFactory("SimpleUpgrade");
  const proxy = SimpleUpgrade.attach(proxyAddress);

  // Log current contract information
  console.log("Admin address:", await proxy.admin());
  console.log("Current implementation:", await proxy.implementation());
  console.log("New implementation address:", await logic2.getAddress());

  // Get the signer (account that will send the transaction)
  const [signer] = await hre.ethers.getSigners();
  console.log("Caller address:", await signer.getAddress());

  // Upgrade the proxy to point to the new implementation
  await proxy.upgrade(await logic2.getAddress(), {
    gasLimit: 1000000,
    maxFeePerGas: ethers.parseUnits("20", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),
  });
  console.log("Proxy upgraded to Logic2");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## 6. 升级前后的测试

Create testBeforeUpgrade.js and testAfterUpgrade.js:

```javascript
const hre = require("hardhat");

async function main() {
  // Address of the deployed proxy contract
  const proxyAddress = "YOUR_PROXY_CONTRACT_ADDRESS";

  // Attach to the proxy contract using Logic1 ABI
  const Logic1 = await hre.ethers.getContractFactory("Logic1");
  const proxy = Logic1.attach(proxyAddress);

  // Call the foo() function
  const tx = await proxy.foo();
  console.log("Waiting for on-chain confirmation...");
  await tx.wait();

  // Read the 'words' variable
  const words = await proxy.words();
  console.log("Words after calling Logic1's foo():", words);

  // Get the current implementation address
  const implementationAddress = await proxy.implementation();
  console.log("Current implementation address:", implementationAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

The content of testAfterUpgrade.js is similar to testBeforeUpgrade.js, but you need to change Logic1 to Logic2 and expect the value of the words variable to be "new".

## 7. 部署和升级过程

1. Compile the contracts:

```
npx hardhat compile
```

2. Deploy the initial contract:

```
npx hardhat run scripts/deploy.js --network eSpaceTestnet
```

3. Run the pre-upgrade test:

```
npx hardhat run scripts/testBeforeUpgrade.js --network eSpaceTestnet
```

预期输出：

```
Words after calling Logic1's foo(): old
Current implementation address: 0x...(Logic1's address)
```

4. Upgrade the contract:

```
npx hardhat run scripts/upgrade.js --network eSpaceTestnet
```

5. Run the post-upgrade test:

```
npx hardhat run scripts/testAfterUpgrade.js --network eSpaceTestnet
```

预期输出：

```
Words after calling Logic2's foo(): new
Current implementation address: 0x...(Logic2's address)
```

通过这个过程，您可以成功地在 Conflux eSpace 上部署、测试和升级智能合约。 This example demonstrates how to use a proxy contract to achieve upgradeability, allowing you to update contract logic without changing the contract address.
