---
displayed_sidebar: eSpaceSidebar
keywords:
  - tutorial
  - smart contracts
  - upgradeable contracts
  - transparent proxy
  - Foundry
  - eSpace
tags: [Tutorial, Upgradeable Contracts, Transparent Proxy]
---

# Deploying Upgradeable Contracts using Transparent Proxy with Foundry

## Introduction

This tutorial demonstrates how to deploy and upgrade smart contracts using the transparent proxy pattern with Foundry. We'll use the same Box contract example but implement it using Foundry's tools.

## Project Setup

1. Create a new Foundry project:

```bash
forge init transparent-proxy-demo
cd transparent-proxy-demo
```

2. Install OpenZeppelin contracts:

```bash
forge install OpenZeppelin/openzeppelin-contracts
```

3. Add the following to `remappings.txt`:

```
@openzeppelin/=lib/openzeppelin-contracts/
```

4. Update `foundry.toml`:

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc = "0.8.24"
```

## Writing Smart Contracts

1. Create the initial Box contract in `src/Box.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

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

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract BoxV2 is Initializable {
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
        
        vm.startBroadcast(deployerPrivateKey);

        // Deploy implementation
        Box box = new Box();
        
        // Deploy ProxyAdmin
        ProxyAdmin admin = new ProxyAdmin();
        
        // Encode initialization data
        bytes memory data = abi.encodeWithSelector(Box.initialize.selector, 42);
        
        // Deploy proxy
        TransparentUpgradeableProxy proxy = new TransparentUpgradeableProxy(
            address(box),
            address(admin),
            data
        );

        vm.stopBroadcast();

        console.log("Box implementation deployed to:", address(box));
        console.log("ProxyAdmin deployed to:", address(admin));
        console.log("Proxy deployed to:", address(proxy));
    }
}
```

2. Create the upgrade script in `script/UpgradeBox.s.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import "../src/BoxV2.sol";

contract UpgradeBox is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address proxyAddress = vm.envAddress("PROXY_ADDRESS");
        address adminAddress = vm.envAddress("ADMIN_ADDRESS");
        
        vm.startBroadcast(deployerPrivateKey);

        // Deploy new implementation
        BoxV2 boxV2 = new BoxV2();
        
        // Upgrade proxy
        ProxyAdmin admin = ProxyAdmin(adminAddress);
        admin.upgrade(
            TransparentUpgradeableProxy(payable(proxyAddress)),
            address(boxV2)
        );

        vm.stopBroadcast();

        console.log("BoxV2 implementation deployed to:", address(boxV2));
        console.log("Proxy upgraded");
    }
}
```

## Testing Scripts

Create a test file in `test/Box.t.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import "../src/Box.sol";
import "../src/BoxV2.sol";

contract BoxTest is Test {
    Box box;
    BoxV2 boxV2;
    ProxyAdmin admin;
    TransparentUpgradeableProxy proxy;

    function setUp() public {
        // Deploy implementation
        box = new Box();
        
        // Deploy ProxyAdmin
        admin = new ProxyAdmin();
        
        // Encode initialization data
        bytes memory data = abi.encodeWithSelector(Box.initialize.selector, 42);
        
        // Deploy proxy
        proxy = new TransparentUpgradeableProxy(
            address(box),
            address(admin),
            data
        );
    }

    function testBoxV1() public {
        Box proxiedBox = Box(address(proxy));
        assertEq(proxiedBox.retrieve(), 42);
        
        proxiedBox.store(100);
        assertEq(proxiedBox.retrieve(), 100);
    }

    function testUpgrade() public {
        // Deploy new implementation
        boxV2 = new BoxV2();
        
        // Upgrade
        admin.upgrade(proxy, address(boxV2));
        
        BoxV2 proxiedBoxV2 = BoxV2(address(proxy));
        
        // Test existing functionality
        assertEq(proxiedBoxV2.retrieve(), 100);
        
        // Test new functionality
        proxiedBoxV2.increment();
        assertEq(proxiedBoxV2.retrieve(), 101);
    }
}
```

## Deployment and Upgrade Process

1. Create a `.env` file:

```
PRIVATE_KEY=your_private_key_here
RPC_URL=https://evmtestnet.confluxrpc.com
```

2. Deploy the initial contract:

```bash
forge script script/DeployBox.s.sol --rpc-url $RPC_URL --broadcast
```

3. Set the proxy and admin addresses in `.env`:

```
PROXY_ADDRESS=deployed_proxy_address
ADMIN_ADDRESS=deployed_admin_address
```

4. Upgrade the contract:

```bash
forge script script/UpgradeBox.s.sol --rpc-url $RPC_URL --broadcast
```

5. Run the tests:

```bash
forge test
```

## Verification

To verify the contracts on the block explorer:

```bash
forge verify-contract <implementation-address> src/Box.sol:Box --chain-id 71 --verifier-url https://evmapi-testnet.confluxscan.io/api
forge verify-contract <proxy-address> @openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol:TransparentUpgradeableProxy --chain-id 71 --verifier-url https://evmapi-testnet.confluxscan.io/api
```

This tutorial demonstrates how to use Foundry to deploy and upgrade transparent proxy contracts. The main differences from the Hardhat version are:
- Use of Solidity for deployment scripts instead of JavaScript
- Built-in testing framework with Solidity
- Different command-line interface and tooling
- More direct interaction with the proxy contracts

The core concepts of transparent proxy and upgradeability remain the same regardless of the development framework used.