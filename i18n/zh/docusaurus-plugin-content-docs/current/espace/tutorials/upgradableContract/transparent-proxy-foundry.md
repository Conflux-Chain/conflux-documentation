---
displayed_sidebar: eSpaceSidebar
keywords:
  - tutorial
  - smart contracts
  - upgradeable contracts
  - transparent proxy
  - Foundry
  - eSpace
tags: [ 教程, 可升级的合约, Transparent Proxy, Foundry ]
---

# 使用 Foundry 部署可升级合约（采用透明代理模式）

## 简介

This tutorial demonstrates how to deploy and upgrade smart contracts using the transparent proxy pattern with Foundry. 透明代理模式允许您在保持相同地址和状态的情况下升级智能合约。

## 项目设置

1. 创建一个新的 Foundry 项目：

```bash
forge init transparent-proxy-foundry-demo
cd transparent-proxy-foundry-demo
```

2. 安装 OpenZepelin 合约：

```bash
forge install OpenZeppelin/openzeppelin-contracts
forge install OpenZeppelin/openzeppelin-contracts-upgradeable
```

1. 在`remappings.txt`中添加以下内容:

```
@openzeppelin/=lib/openzeppelin-contracts/
@openzeppelin-upgradeable/=lib/openzeppelin-contracts-upgradeable/
```

4. 更新`foundry.toml`:

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

## 编写智能合约

1. 在`src/Box.sol`中创建初始的 Box 合约：

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

2. 在`src/BoxV2.sol`中创建BoxV2合约:

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

## 部署脚本

1. 在`script/DeployBox.s.sol`中创建部署脚本:

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

2. 在`script/UpgradeBox.s.sol`中创建升级脚本:

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

## 环境设置

1. 创建一个 `.env` 文件：

```bash
PRIVATE_KEY=your_private_key_here
RPC_URL=https://evmtestnet.confluxrpc.com
```

## 部署流程

1. 部署初始安装和代理：

```bash
source .env
forge script script/DeployBox.s.sol --rpc-url $RPC_URL --broadcast -g 200
```

> **注意:**`-g`标志设置燃气价格乘数(以百分比表示)。 使用`-g 200`意味着燃气价格将是估计价格的200%，这有助于阻止在部署过程中出现 "燃气费用不足"的错误。

预期输出：

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

3. 升级到BoxV2：

```bash
forge script script/UpgradeBox.s.sol --rpc-url $RPC_URL --broadcast -g 200
```

预期输出：

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

通过以下步骤，您可以在 Conflux eSpace 上使用 Foundry 部署和升级智能合约（采用透明代理模式）。 这种模式不仅允许您在不更改合约地址的情况下更新合约逻辑，还通过将管理功能与用户功能分离，有效地解决了选择器冲突的问题。

本教程提供了一个完整的工作流程，涵盖每个步骤的预期输出，以帮助您成功实施可升级合约。