---
displayed_sidebar: generalSidebar
---

# Data Storage vs Event Emission

In Solidity, choosing how to store data can affect the gas cost of your contract operations, particularly when it comes to storing or modifying state variables. The Ethereum Virtual Machine (EVM) charges gas for all operations, and the choice between using variable storage and event emission can impact these costs.

**Demo Code**

Below, we present two simple contracts, `DataStorageWithVariable` and `DataStorageWithEvent`, which illustrate the difference in gas usage when storing data directly in a state variable versus emitting it through an event.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DataStorageWithVariable {
    uint256 public data;

    // use variable to store data: 22,216 gas
    function storeDataWithVariable() public {
        data = 1;
    }
}

contract DataStorageWithEvent {
    event DataUpdated(uint256 newData);

    // use event to store data: 1,189 gas
    function storeDataWithEvent() public {
        emit DataUpdated(1);
    }
}
```

When deployed and executed, the `DataStorageWithVariable` contract consumes more gas (22,216 gas) compared to the `DataStorageWithEvent` contract (1,189 gas). This difference highlights how event emissions can save significant gas compared to direct state variable updates.


The choice between using variable storage and event emission in Solidity affects gas consumption for the following reasons:

- **Variable Storage**: Storing data directly in state variables involves modifying and maintaining the state of the EVM, which is a relatively expensive operation. Each modification of a state variable consumes more gas.
- **Event Emission**: Events simply log data in the transaction logs without altering the state of the EVM. This method reduces direct state changes, thereby significantly lowering gas costs. Events are mainly used for notifying listeners about state changes, rather than serving as a means of data storage.

Recommendations for Gas Optimization:

🌟 If possible, utilize events to minimize gas costs for state updates, especially when such data does not need to be permanently stored.