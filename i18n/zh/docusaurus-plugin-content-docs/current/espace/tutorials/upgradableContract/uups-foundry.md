---
displayed_sidebar: eSpaceSidebar
keywords:
  - tutorial
  - smart contracts
  - upgradeable contracts
  - UUPS
  - Foundry
  - eSpace
tags:
  - 教程
  - Upgradeable Contracts
---

# Deploying Upgradeable Contracts using UUPS with Foundry

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

## 项目设置

1. Create a new Foundry project:

```bash
forge init uups-proxy-foundry-demo
cd uups-proxy-foundry-demo
```

2. Install OpenZeppelin contracts:

```bash
forge install OpenZeppelin/openzeppelin-contracts
forge install OpenZeppelin/openzeppelin-contracts-upgradeable
```

3. Configure Foundry

Update your `foundry.toml`:

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

4. Create a `.env` file:

```
PRIVATE_KEY=your_private_key_here
RPC_URL=https://evmtestnet.confluxrpc.com
```

## Writing Smart Contracts

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

## Deployment Scripts

1. Create a deployment script in `script/DeployCounter.s.sol`:

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

## Testing

Create a test file in `test/Counter.t.sol`:

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

## Deployment and Upgrade Process

1. Deploy the initial implementation and proxy:

```bash
source .env
forge script script/DeployCounter.s.sol --rpc-url $RPC_URL --broadcast -g 200
```

> **Note:** The `-g` flag sets the gas price multiplier (in percentage). Using `-g 200` means the gas price will be 200% of the estimated price, which helps prevent "insufficient gas fee" errors during deployment.

Expected output:

```
Deploying Counter...
Implementation deployed to: <IMPLEMENTATION_ADDRESS>
Proxy deployed to: <PROXY_ADDRESS>
Initial count: 0
```

2. After deployment, save the proxy address in `.env`:

```bash
PROXY_ADDRESS=<PROXY_ADDRESS>
```

3. Upgrade to CounterV2:

```bash
forge script script/UpgradeCounter.s.sol --rpc-url $RPC_URL --broadcast -g 200
```

Expected output:

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

By following these steps, you can deploy and upgrade smart contracts using UUPS proxy pattern on Conflux eSpace with Foundry. This pattern provides a more gas-efficient alternative to the transparent proxy pattern while maintaining upgradeability. The UUPS pattern moves the upgrade logic to the implementation contract, making it more lightweight and cost-effective for users.
