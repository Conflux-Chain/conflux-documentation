---
title: Deploying Upgradeable Contracts using Foundry
description: Learn how to deploy upgradeable contracts on Conflux eSpace using Foundry
keywords:
  - Upgrade
  - Foundry
  - 智能合约
displayed_sidebar: eSpaceSidebar
---

# Deploying Upgradeable Contracts on Conflux eSpace using Foundry

This tutorial will guide you through the process of deploying and upgrading smart contracts on Conflux eSpace using Foundry.

## 1. 项目设置

First, ensure you have Foundry installed. If not, follow the [official Foundry installation guide](https://book.getfoundry.sh/getting-started/installation).

Create a new Foundry project:

```bash
forge init upgradeable-contract-foundry-demo
cd upgradeable-contract-foundry-demo
```

## 2. Configure Foundry

Update the `foundry.toml` file to include the Conflux eSpace testnet:

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]

[rpc_endpoints]
espaceTestnet = "https://evmtestnet.confluxrpc.com"
```

## 3. Write Smart Contracts

Create the following contracts in the `src` directory:

```solidity
// src/SimpleUpgrade.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SimpleUpgrade {
    address public implementation;
    address public admin;
    string public words;

    constructor(address _implementation) {
        admin = msg.sender;
        implementation = _implementation;
    }

    fallback() external payable {
        (bool success, ) = implementation.delegatecall(msg.data);
        require(success, "Delegatecall failed");
    }

    receive() external payable {}

    function upgrade(address newImplementation) external {
        require(msg.sender == admin, "Only admin can upgrade");
        implementation = newImplementation;
    }
}
```

```solidity
// src/Logic1.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Logic1 {
    address public implementation;
    address public admin;
    string public words;

    function foo() public {
        words = "old";
    }
}
```

```solidity
// src/Logic2.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Logic2 {
    address public implementation;
    address public admin;
    string public words;

    function foo() public {
        words = "new";
    }
}
```

## 4. Deployment Script

Create a deployment script in the `script` directory:

```solidity
// script/Deploy.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/SimpleUpgrade.sol";
import "../src/Logic1.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        Logic1 logic1 = new Logic1();
        SimpleUpgrade proxy = new SimpleUpgrade(address(logic1));

        console.log("Logic1 deployed to:", address(logic1));
        console.log("Proxy deployed to:", address(proxy));

        vm.stopBroadcast();
    }
}
```

## 5. Upgrade Script

Create an upgrade script:

```solidity
// script/Upgrade.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/SimpleUpgrade.sol";
import "../src/Logic2.sol";

contract UpgradeScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address proxyAddress = vm.envAddress("PROXY_ADDRESS");

        vm.startBroadcast(deployerPrivateKey);

        Logic2 logic2 = new Logic2();
        SimpleUpgrade proxy = SimpleUpgrade(payable(proxyAddress));

        console.log("Logic2 deployed to:", address(logic2));
        console.log("Current implementation:", proxy.implementation());
        console.log("New implementation address:", address(logic2));

        proxy.upgrade(address(logic2));
        console.log("Proxy upgraded to Logic2");

        vm.stopBroadcast();
    }
}
```

## 6. Testing Before and After Upgrade

Create test scripts:

```solidity
// script/TestBeforeUpgrade.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/Logic1.sol";

contract TestBeforeUpgradeScript is Script {
    function run() external {
        address proxyAddress = vm.envAddress("PROXY_ADDRESS");
        Logic1 proxy = Logic1(proxyAddress);

        vm.startBroadcast();

        proxy.foo();
        console.log("Words after calling Logic1's foo():", proxy.words());
        console.log("Current implementation address:", proxy.implementation());

        vm.stopBroadcast();
    }
}
```

```solidity
// script/TestAfterUpgrade.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/Logic2.sol";

contract TestAfterUpgradeScript is Script {
    function run() external {
        address proxyAddress = vm.envAddress("PROXY_ADDRESS");
        Logic2 proxy = Logic2(proxyAddress);

        vm.startBroadcast();

        proxy.foo();
        console.log("Words after calling Logic2's foo():", proxy.words());
        console.log("Current implementation address:", proxy.implementation());

        vm.stopBroadcast();
    }
}
```

## 7. Deployment and Upgrade Process

1. Set up environment variables:

Create a `.env` file in the project root:

```
PRIVATE_KEY=your_private_key_here
PROXY_ADDRESS=
```

2. Deploy the initial contract:

```bash
forge script script/Deploy.s.sol:DeployScript --rpc-url espaceTestnet --broadcast -g 200
```

> **Note:** The `-g` flag sets the gas price multiplier (in percentage). Using `-g 200` means the gas price will be 200% of the estimated price, which helps prevent "insufficient gas fee" errors during deployment.

Expected output:

```
Logic1 deployed to: 0x...(Logic1's address)
Proxy deployed to: 0x...(Proxy's address)
```

3. Update the `PROXY_ADDRESS` in the `.env` file with the deployed proxy address.

4. Run the pre-upgrade test:

```bash
forge script script/TestBeforeUpgrade.s.sol:TestBeforeUpgradeScript --rpc-url espaceTestnet 
```

Expected output:

```
Words after calling Logic1's foo(): old
Current implementation address: 0x...(Logic1's address)
```

5. Upgrade the contract:

```bash
forge script script/Upgrade.s.sol:UpgradeScript --rpc-url espaceTestnet --broadcast -g 200
```

6. Run the post-upgrade test:

```bash
forge script script/TestAfterUpgrade.s.sol:TestAfterUpgradeScript --rpc-url espaceTestnet
```

Expected output:

```
Words after calling Logic2's foo(): new
Current implementation address: 0x...(Logic2's address)
```

By following this process, you can successfully deploy, test, and upgrade smart contracts on Conflux eSpace using Foundry. This example demonstrates how to use a proxy contract to achieve upgradeability, allowing you to update contract logic without changing the contract address.

Remember to replace `your_private_key_here` with your actual private key and update the `PROXY_ADDRESS` after deployment. Always keep your private keys secure and never share them publicly.