---
displayed_sidebar: generalSidebar
---

# Implement multicall in router-like contracts

In Solidity, implementing multicall functionality in router-like contracts can significantly reduce gas costs by batching multiple state-modifying calls into a single transaction. This technique is invaluable in contracts similar to those used by platforms like Uniswap and Compound.

**代码演示**

Below, we have a sample contract `MulticallRouter` that demonstrates how to implement multicall functionality with state-modifying operations. This contract includes a `multicall` function that executes an array of encoded function calls, modifying contract state in an efficient manner.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MulticallRouter {
    uint256 public counter; // State variable to demonstrate state changes
    mapping(uint256 => uint256) public data; // Mapping to store arbitrary data

    function multicall(bytes[] calldata data) external returns (bytes[] memory results) {
        results = new bytes[](data.length);
        for (uint256 i = 0; i < data.length; i++) {
            (bool success, bytes memory result) = address(this).delegatecall(data[i]);
            require(success, "Multicall execution failed");
            results[i] = result;
        }
    }

    function incrementCounter(uint256 amount) external {
        counter += amount; 
    }

    function updateData(uint256 key, uint256 value) external {
        data[key] = value; 
    }
}
```

To verify the functionality and efficiency of the `MulticallRouter`, here is the corresponding testing script:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "./MulticallRouter.sol";

contract MulticallTest is Test {
    MulticallRouter public router;
    bytes[] callData;

    function setUp() public {
        router = new MulticallRouter();
        callData = new bytes[](4);
        callData[0] = abi.encodeWithSelector(
            router.incrementCounter.selector,
            1
        );
        callData[1] = abi.encodeWithSelector(
            router.updateData.selector,
            0,
            100
        );
        callData[2] = abi.encodeWithSelector(
            router.incrementCounter.selector,
            2
        );
        callData[3] = abi.encodeWithSelector(
            router.updateData.selector,
            1,
            200
        );
    }

    function testIndividualCalls() public {
        uint256 gasStart = gasleft();
        router.incrementCounter(1);
        router.updateData(0, 100);
        router.incrementCounter(2);
        router.updateData(1, 200);
        uint256 gasEnd = gasleft();
        uint256 gasUsed = gasStart - gasEnd;
        emit log_named_uint("Gas used for individual calls", gasUsed);
    }

    function testMulticall() public {
        uint256 gasStart = gasleft();
        router.multicall(callData);
        uint256 gasEnd = gasleft();
        uint256 gasUsed = gasStart - gasEnd;
        emit log_named_uint("Gas used for multicall", gasUsed);
    }
}
```

By running the tests in the Foundry project, we found that `testIndividualCalls()` consumes `166259` gas, while `testMulticall()` consumes `139753` gas, indicating that using Multicall can save gas to some extent.

**Gas Optimization Analysis**

The primary advantage of using multicall is the reduction in gas costs by avoiding multiple transaction overheads. Here’s a comparison of gas usage between individual transactions and a single multicall:

- **Individual Transactions**: Each call incurs base transaction costs plus the gas for executing the function.
- **Single Multicall**: Incurs only one base transaction cost plus the gas for executing each function within a loop.

By batching calls, multicall can significantly reduce the cumulative gas cost, especially when performing multiple operations.

**Recommendations for Gas Optimization**

Implementing multicall in router-like contracts can save gas by reducing the number of transactions and leveraging the lower cumulative gas cost of executing multiple operations in a single transaction.
