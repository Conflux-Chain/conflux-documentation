---
displayed_sidebar: eSpaceSidebar
keywords:
  - tutorial
  - smart contracts
  - upgradeable contracts
  - transparent proxy
  - Foundry
  - eSpace
tags:
  - 教程
  - 可升级的合约
  - Transparent Proxy
  - Foundry
---

# Deploying Upgradeable Contracts using Transparent Proxy with Foundry

## 简介

This tutorial demonstrates how to deploy and upgrade smart contracts using the transparent proxy pattern with Foundry. The transparent proxy pattern allows you to upgrade your smart contracts while maintaining the same address and state.

## 项目设置

1. Create a new Foundry project:

```bash
forge init transparent-proxy-foundry-demo
cd transparent-proxy-foundry-demo
```

2. Install OpenZeppelin contracts:

```bash
forge install OpenZeppelin/openzeppelin-contracts
forge install OpenZeppelin/openzeppelin-contracts-upgradeable
```

1. Add the following to `remappings.txt`:

```
@openzeppelin/=lib/openzeppelin-contracts/
@openzeppelin-upgradeable/=lib/openzeppelin-contracts-upgradeable/
```

4. Update `foundry.toml`:

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc = "0.8.24"

remappings = [
    "@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",
    "@openzeppelin/contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/contracts/"
]
```

## Writing Smart Contracts

1. Create the initial Box contract in `src/Box.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Box is Initializable {
    uint256 private _value;

    event ValueChanged(uint256 value);

    function initialize(uint256 initialValue) public initializer {
        _value = initialValue;
        emit ValueChanged(initialValue);
    }

    function store(uint256 value) public {
        _value = value;
        emit ValueChanged(value);
    }

    function retrieve() public view returns (uint256) {
        return _value;
    }
}
```

2. Create BoxV2 contract in `src/BoxV2.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract BoxV2 is Initializable {
    uint256 private _value;

    event ValueChanged(uint256 value);

    function initialize(uint256 initialValue) public initializer {
        _value = initialValue;
    }

    function store(uint256 value) public {
        _value = value;
        emit ValueChanged(value);
    }

    function retrieve() public view returns (uint256) {
        return _value;
    }

    // New added function
    function increment() public {
        _value = _value + 1;
        emit ValueChanged(_value);
    }
}
```

## Deployment Scripts

1. Create the deployment script in `script/DeployBox.s.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import "../src/Box.sol";

contract DeployBox is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        vm.startBroadcast(deployerPrivateKey);

        // Deploy implementation contract
        Box box = new Box();
        
        // Encode initialization data
        bytes memory data = abi.encodeWithSelector(Box.initialize.selector, 42);
        
        // Deploy proxy contract
        TransparentUpgradeableProxy proxy = new TransparentUpgradeableProxy(
            address(box),
            deployer,
            data
        );

        // Get actual ProxyAdmin address
        address proxyAdminAddress = address(uint160(uint256(vm.load(
            address(proxy),
            bytes32(uint256(keccak256("eip1967.proxy.admin")) - 1)
        ))));

        vm.stopBroadcast();

        console.log("Box implementation deployed to:", address(box));
        console.log("Proxy deployed to:", address(proxy));
        console.log("ProxyAdmin deployed to:", proxyAdminAddress);
    }
}
```

2. Create the upgrade script in `script/UpgradeBox.s.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import "../src/Box.sol";
import "../src/BoxV2.sol";

contract UpgradeBox is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address proxyAddress = vm.envAddress("PROXY_ADDRESS");
        address adminAddress = vm.envAddress("ADMIN_ADDRESS");
        
        // Test before upgrade
        console.log("============ Before Upgrade ============");
        Box box = Box(proxyAddress);
        uint256 valueBefore = box.retrieve();
        console.log("Current value:", valueBefore);
        
        vm.startBroadcast(deployerPrivateKey);

        // Deploy new implementation
        BoxV2 boxV2 = new BoxV2();
        console.log("\n============ Deploying New Implementation ============");
        console.log("New implementation:", address(boxV2));

        // Upgrade using ProxyAdmin
        ProxyAdmin proxyAdmin = ProxyAdmin(adminAddress);
        proxyAdmin.upgradeAndCall(
            ITransparentUpgradeableProxy(proxyAddress),
            address(boxV2),
            ""
        );
        
        vm.stopBroadcast();

        // Test after upgrade
        console.log("\n============ After Upgrade ============");
        BoxV2 upgradedBox = BoxV2(proxyAddress);
        uint256 valueAfter = upgradedBox.retrieve();
        console.log("Value after upgrade:", valueAfter);
        console.log("Testing new increment function...");
        
        vm.startBroadcast(deployerPrivateKey);
        upgradedBox.increment();
        vm.stopBroadcast();
        
        uint256 valueAfterIncrement = upgradedBox.retrieve();
        console.log("Value after increment:", valueAfterIncrement);
        
        // Verify upgrade results
        require(valueAfter == valueBefore, "State verification failed: Value changed during upgrade");
        require(valueAfterIncrement == valueAfter + 1, "Function verification failed: Increment not working");
        
        console.log("\n============ Upgrade Successful ============");
        console.log("1. State preserved: Initial value maintained after upgrade");
        console.log("2. New function working: Increment successfully added");
    }
}
```

## Environment Setup

1. Create a `.env` file:

```bash
PRIVATE_KEY=your_private_key_here
RPC_URL=https://evmtestnet.confluxrpc.com
```

## Deployment Process

1. Deploy the initial implementation and proxy:

```bash
source .env
forge script script/DeployBox.s.sol --rpc-url $RPC_URL --broadcast -g 200
```

> **Note:** The `-g` flag sets the gas price multiplier (in percentage). Using `-g 200` means the gas price will be 200% of the estimated price, which helps prevent "insufficient gas fee" errors during deployment.

Expected output:

```
== Return ==
Box implementation deployed to: <IMPLEMENTATION_ADDRESS>
Proxy deployed to: <PROXY_ADDRESS>
ProxyAdmin deployed to: <ADMIN_ADDRESS>
```

2. After deployment, save the addresses in `.env`:

```bash
PROXY_ADDRESS=<PROXY_ADDRESS>
ADMIN_ADDRESS=<ADMIN_ADDRESS>
```

3. Upgrade to BoxV2:

```bash
forge script script/UpgradeBox.s.sol --rpc-url $RPC_URL --broadcast -g 200
```

Expected output:

```

============ Before Upgrade ============
Current value: 42

============ Deploying New Implementation ============
New implementation: <IMPLEMENTATION_V2_ADDRESS>

============ After Upgrade ============
Value after upgrade: 42
Testing new increment function...
Value after increment: 43

============ Upgrade Successful ============
1. State preserved: Initial value maintained after upgrade
2. New function working: Increment successfully added

```

By following these steps, you can deploy and upgrade smart contracts using transparent proxy on Conflux eSpace with Foundry. This pattern not only allows you to update contract logic without changing the contract address but also effectively addresses selector conflicts by separating management functions from user functions.

The tutorial provides a complete workflow with all expected outputs at each step to help you successfully implement upgradeable contracts.
