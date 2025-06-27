---
displayed_sidebar: eSpaceSidebar
keywords:
  - tutorial
  - smart contracts
  - upgradeable contracts
  - UUPS
  - Foundry
  - eSpace
tags: [ 教程, 可升级的合约 ]
---

# 使用 Foundry 部署可升级合约（UUPS）

### UUPS（Universal Upgradeable Proxy Standard，通用可升级代理标准）

UUPS是一种可升级代理模式，解决了透明代理模式的一些局限性。 其主要特点包括：

- **升级逻辑在实现中的应用**: 升级功能被放置在实现合约中，而不是代理合约中。
- **燃气效率**: 由于无需在每个函数调用时检查调用者的身份，因此对用户来说更加节省燃气。
- **较小的代理合约**: 代理合约更简单且更小，可能减少部署成本。

### 代理模式比较

1. **UUPS 与透明代理**:

  - UUPS将升级逻辑放在实现合约中，而透明代理则将其保留在代理合约中。
  - UUPS在正常函数调用时更节省燃气。
  - 透明代理的代理合约较大，但实现合约更简单。

2. **UUPS 与常规可升级代理**:

  - UUPS 提供了更好的安全性，以防止合约被意外锁定。
  - 常规可升级代理更简单，但在升级过程中可能更容易出现错误。

3. **共同特征**：
  - 所有模式都允许在不更改合约地址的情况下升级合约逻辑。
  - 它们都使用委托调用（delegate calls）将函数调用转发到实现合约。

由于其在安全性、燃气效率和灵活性方面的平衡，UUPS通常更受欢迎。 在本教程中，我们将在 Conflux eSpace 上使用 UUPS 实现和部署可升级合约。

## 项目设置

1. 创建一个新的 Foundry 项目：

```bash
forge init uups-proxy-foundry-demo
cd uups-proxy-foundry-demo
```

2. 安装 OpenZepelin 合约：

```bash
forge install OpenZeppelin/openzeppelin-contracts
forge install OpenZeppelin/openzeppelin-contracts-upgradeable
```

3. 配置 Foundry

更新您的`foundry.toml`文件:

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

4. 创建一个 `.env` 文件：

```
PRIVATE_KEY=your_private_key_here
RPC_URL=https://evmtestnet.confluxrpc.com
```

## 编写智能合约

1. Create the initial Counter contract in `src/Counter.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract Counter is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    uint256 public number;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        number = 0;
    }

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }

    function getCount() public view returns (uint256) {
        return number;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}

```

2. Create CounterV2 in `src/CounterV2.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract CounterV2 is UUPSUpgradeable, OwnableUpgradeable {
    uint256 private count;

    event CountChanged(uint256 count);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
    }

    function increment() public {
        count += 1;
        emit CountChanged(count);
    }

    function getCount() public view returns (uint256) {
        return count;
    }

    function reset() public {
        count = 0;
        emit CountChanged(count);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
} 
```

## 部署脚本

1. 在`script/DeployCounter.s.sol`中创建一个部署脚本：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/Counter.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract DeployCounter is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy implementation
        Counter counter = new Counter();
        console.log("Implementation deployed to:", address(counter));

        // Encode initialize function call
        bytes memory data = abi.encodeWithSelector(Counter.initialize.selector);

        // Deploy proxy
        ERC1967Proxy proxy = new ERC1967Proxy(
            address(counter),
            data
        );
        console.log("Proxy deployed to:", address(proxy));

        // Verify deployment
        Counter proxiedCounter = Counter(address(proxy));
        console.log("Initial count:", proxiedCounter.getCount());

        vm.stopBroadcast();
    }
} 
```

2. Create an upgrade script in `script/UpgradeCounter.s.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/Counter.sol";
import "../src/CounterV2.sol";

contract UpgradeCounter is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address proxyAddress = vm.envAddress("PROXY_ADDRESS");

        // Test before upgrade
        console.log("============ Before Upgrade ============");
        Counter counter = Counter(proxyAddress);
        uint256 valueBefore = counter.getCount();
        console.log("Current count:", valueBefore);

        vm.startBroadcast(deployerPrivateKey);

        // Deploy new implementation
        CounterV2 counterV2 = new CounterV2();
        console.log("\n============ Deploying New Implementation ============");
        console.log("New implementation:", address(counterV2));

        // Upgrade proxy to new implementation
        Counter(proxyAddress).upgradeToAndCall(
            address(counterV2),
            "" // Empty bytes string since we don't need to call any initialization function
        );

        vm.stopBroadcast();

        // Test after upgrade
        console.log("\n============ After Upgrade ============");
        CounterV2 upgradedCounter = CounterV2(proxyAddress);
        uint256 valueAfter = upgradedCounter.getCount();
        console.log("Count after upgrade:", valueAfter);

        vm.startBroadcast(deployerPrivateKey);
        upgradedCounter.increment();
        vm.stopBroadcast();

        uint256 valueAfterIncrement = upgradedCounter.getCount();
        console.log("Count after increment:", valueAfterIncrement);

        vm.startBroadcast(deployerPrivateKey);
        upgradedCounter.reset();
        vm.stopBroadcast();

        uint256 valueAfterReset = upgradedCounter.getCount();
        console.log("Count after reset:", valueAfterReset);

        // Verify upgrade results
        require(valueAfter == valueBefore, "State verification failed: Value changed during upgrade");
        require(valueAfterIncrement == valueAfter + 1, "Function verification failed: Increment not working");
        require(valueAfterReset == 0, "Function verification failed: Reset not working");

        console.log("\n============ Upgrade Successful ============");
        console.log("1. State preserved: Initial count maintained after upgrade");
        console.log("2. New functions working: Increment and Reset successfully added");
    }
}
```

## 测试

在`test/Counter.t.sol`中创建一个测试文件:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/Counter.sol";
import "../src/CounterV2.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract CounterTest is Test {
    Counter public implementation;
    CounterV2 public implementationV2;
    ERC1967Proxy public proxy;
    address owner = address(this);

    function setUp() public {
        // Deploy implementation
        implementation = new Counter();
        
        // Encode initialize function call
        bytes memory data = abi.encodeWithSelector(Counter.initialize.selector);
        
        // Deploy proxy
        proxy = new ERC1967Proxy(
            address(implementation),
            data
        );
    }

    function testIncrement() public {
        Counter(address(proxy)).increment();
        assertEq(Counter(address(proxy)).getCount(), 1);
    }

    function testUpgrade() public {
        // Deploy new implementation
        implementationV2 = new CounterV2();
        
        // Upgrade
        Counter(address(proxy)).upgradeTo(address(implementationV2));
        
        // Test new functionality
        CounterV2(address(proxy)).increment();
        assertEq(CounterV2(address(proxy)).getCount(), 1);
        
        CounterV2(address(proxy)).reset();
        assertEq(CounterV2(address(proxy)).getCount(), 0);
    }
}
```

## 部署和升级过程

1. 部署初始实现和代理：

```bash
source .env
forge script script/DeployCounter.s.sol --rpc-url $RPC_URL --broadcast -g 200
```

> **注意:**`-g`标志设置燃气价格乘数(以百分比表示)。 使用`-g 200`意味着燃气价格将是估计价格的200%，这有助于阻止在部署过程中出现 "燃气费用不足"的错误。

预期输出：

```
Deploying Counter...
Implementation deployed to: <IMPLEMENTATION_ADDRESS>
Proxy deployed to: <PROXY_ADDRESS>
Initial count: 0
```

2. 部署完毕后，请在 `.env` 中保存代理地址：

```bash
PROXY_ADDRESS=<PROXY_ADDRESS>
```

3. 升级到CounterV2：

```bash
forge script script/UpgradeCounter.s.sol --rpc-url $RPC_URL --broadcast -g 200
```

预期输出：

```
============ Before Upgrade ============
Current count: 0

============ Deploying New Implementation ============
New implementation: <IMPLEMENTATION_V2_ADDRESS>

============ After Upgrade ============
Count after upgrade: 0
Count after increment: 1
Count after reset: 0

============ Upgrade Successful ============
1. State preserved: Initial count maintained after upgrade
2. New functions working: Increment and Reset successfully added
```

通过以下步骤，您可以在 Conflux eSpace 上使用 Foundry 部署和升级智能合约，采用 UUPS 代理模式。 与透明代理模式相比，该模式提供了更节省燃气的替代方案，同时保持合约的可升级性。 UUPS 模式将升级逻辑移到实现合约中，使其对用户来说更加轻量和具有成本效益。


