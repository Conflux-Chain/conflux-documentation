---
displayed_sidebar: eSpaceSidebar
keywords:
  - tutorial
  - smart contracts
  - upgradeable contracts
  - UUPS
  - Foundry
  - eSpace
tags: [Tutorial, Upgradeable Contracts]
---

# Deploying Upgradeable Contracts using UUPS with Foundry

### UUPS (Universal Upgradeable Proxy Standard)

[Keep the same UUPS explanation section as in the original tutorial...]

## Project Setup

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

3. Configure remappings by creating a `remappings.txt` file:

```txt
@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/
@openzeppelin/contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/contracts/
```

4. Update your `foundry.toml`:

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

5. Create a `.env` file:

```env
PRIVATE_KEY=your_private_key_here
RPC_URL=https://evmtestnet.confluxrpc.com
```

6. Load environment variables (for Unix-based systems):

```bash
source .env
```

For Windows PowerShell:
```powershell
$env:PRIVATE_KEY="your_private_key_here"
$env:RPC_URL="https://evmtestnet.confluxrpc.com"
```

## Writing Smart Contracts

1. Create the initial Counter contract in `src/Counter.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Counter is UUPSUpgradeable, OwnableUpgradeable {
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
        address deployer = vm.addr(deployerPrivateKey);

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
        Counter(proxyAddress).upgradeTo(address(counterV2));

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

1. Build the contracts:

```bash
forge build
```

2. Deploy the initial contract:

```bash
forge script script/DeployCounter.s.sol:DeployCounter --rpc-url $RPC_URL --broadcast
```

3. Update your `.env` file with the proxy address:

```
PROXY_ADDRESS=<deployed_proxy_address>
```

4. Upgrade the contract:

```bash
forge script script/UpgradeCounter.s.sol:UpgradeCounter --rpc-url $RPC_URL --broadcast
```

5. Run the tests:

```bash
forge test
```

## Interacting with the Contract

You can interact with your contract using the Foundry's `cast` command:

```bash
# Get the current count
cast call $PROXY_ADDRESS "getCount()" --rpc-url $RPC_URL

# Increment the counter
cast send $PROXY_ADDRESS "increment()" --private-key $PRIVATE_KEY --rpc-url $RPC_URL

# After upgrade, reset the counter
cast send $PROXY_ADDRESS "reset()" --private-key $PRIVATE_KEY --rpc-url $RPC_URL
```

This tutorial demonstrates how to implement, deploy, and upgrade UUPS contracts using Foundry on Conflux eSpace. The approach maintains the same functionality as the Hardhat version but leverages Foundry's tools and testing framework.
