---
displayed_sidebar: generalSidebar
tags:
  - smart-contracts
  - gas-optimization
  - Solidity
  - contract-deployment
  - address-prediction
  - account-nonce
  - LibRLP
  - Solady
  - DataStorage
  - DataWriter
  - DeploymentManager
---

# Predicting Contract Addresses Using Account Nonce

In Solidity, predicting contract addresses before their deployment can save substantial gas, especially when deploying interdependent contracts. This method eliminates the need for setter functions and storage variables, which are costly in terms of gas usage. We can use the [LibRLP](https://github.com/Vectorized/solady/blob/6c54795ef69838e233020e9ab29f3f6288efdf06/src/utils/LibRLP.sol#L27) library from Solady to deterministically compute the addresses based on the deployer's nonce.

In scenarios where two contracts are interdependent, like a `DataStorage` contract and a `DataWriter` contract, managing their addresses effectively is crucial. Typically, after deploying both contracts, you would set the address of one contract in the other using a setter function. However, this approach involves multiple transactions and storage operations, which are expensive.

**DemoCode**

Instead of using setter functions, we can compute the address of each contract before deployment and pass these addresses to the constructors, reducing gas costs.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {LibRLP} from "https://github.com/vectorized/solady/blob/main/src/utils/LibRLP.sol";

contract DataStorage {
    address immutable public dataWriter;
    uint256 public value;

    constructor(address _dataWriter) {
        dataWriter = _dataWriter;
    }

    // cost: 47158 gas
    function storeValue(uint256 newValue) external {
        require(msg.sender == address(dataWriter), "Only DataWriter can update value");
        value = newValue;
    }
}

contract DataWriter {
    DataStorage immutable public dataStorage;

    constructor(DataStorage _dataStorage) {
        dataStorage = _dataStorage;
    }

    function writeValue(uint256 newValue) external {
        dataStorage.storeValue(newValue);
    }
}

contract DeploymentManager {
    using LibRLP for address;

    function deployContracts() public returns(DataStorage dataStorage, address dataWriter) {
        DataStorage precomputedDataStorage = DataStorage(address(this).computeAddress(2));
        dataWriter = address(new DataWriter(precomputedDataStorage));
        dataStorage = new DataStorage(dataWriter);

        require(dataStorage == precomputedDataStorage, "Computed address mismatch");
    }
}
```

By precomputing addresses and using immutable storage for contract references, we can reduce the gas cost of writeValue(). This method not only lowers gas consumption but also simplifies the deployment process by eliminating the need for post-deployment setup calls.


Recommendations for gas optimization:

🌟 Use the account nonce to predict the addresses of interdependent smart contracts, reducing gas consumption and simplifying deployment by avoiding storage variables and post-deployment setup calls.
