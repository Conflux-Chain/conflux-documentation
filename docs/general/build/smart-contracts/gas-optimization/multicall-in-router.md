---
displayed_sidebar: generalSidebar
---

# Implement multicall in router-like contracts

In Solidity, implementing multicall functionality in router-like contracts can significantly reduce gas costs by batching multiple calls into a single transaction. This is a common feature in contracts like the Uniswap Router and the Compound Bulker. Multicall allows users to execute a sequence of calls within a single transaction, thereby optimizing gas usage and improving efficiency.

**Demo Code**

Below, we have a sample contract `MulticallRouter` that demonstrates how to implement multicall functionality. This contract includes a `multicall` function that accepts an array of encoded function calls and executes them in sequence.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MulticallRouter {
    function multicall(bytes[] calldata data) external returns (bytes[] memory results) {
        results = new bytes[](data.length);
        for (uint256 i = 0; i < data.length; i++) {
            (bool success, bytes memory result) = address(this).delegatecall(data[i]);
            require(success, "Multicall execution failed");
            results[i] = result;
        }
    }

    // Example function to demonstrate usage
    function exampleFunction1(uint256 x) external pure returns (uint256) {
        return x * 2;
    }

    function exampleFunction2(uint256 y) external pure returns (uint256) {
        return y + 3;
    }
}
```

In this example, the `multicall` function uses `delegatecall` to execute each function call in the context of the current contract. This ensures that the state changes and storage modifications occur within the same contract. 

### Usage Example

To use this `MulticallRouter` contract, you can encode the function calls and pass them to the `multicall` function. Here's an example of how to encode and call the functions using Solidity:

```solidity
contract MulticallExample {
    MulticallRouter public router;

    constructor(address _router) {
        router = MulticallRouter(_router);
    }

    function performMulticall() external {
        bytes[] memory callData = new bytes[](2);
        callData[0] = abi.encodeWithSelector(router.exampleFunction1.selector, 42);
        callData[1] = abi.encodeWithSelector(router.exampleFunction2.selector, 21);

        bytes[] memory results = router.multicall(callData);

        // Handle the results
        uint256 result1 = abi.decode(results[0], (uint256));
        uint256 result2 = abi.decode(results[1], (uint256));

        // Do something with the results
    }
}
```

**Gas Optimization Analysis**

The primary advantage of using multicall is the reduction in gas costs by avoiding multiple transaction overheads. Here’s a comparison of gas usage between individual transactions and a single multicall:

- **Individual Transactions**: Each call incurs base transaction costs plus the gas for executing the function.
- **Single Multicall**: Incurs only one base transaction cost plus the gas for executing each function within a loop.

By batching calls, multicall can significantly reduce the cumulative gas cost, especially when performing multiple operations.

**Recommendations for Gas Optimization**

Implementing multicall in router-like contracts can save gas by reducing the number of transactions and leveraging the lower cumulative gas cost of executing multiple operations in a single transaction.