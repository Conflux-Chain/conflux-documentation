---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - gas-optimization
  - Solidity
  - selfdestruct
  - constructor
  - one-time-use-contracts
  - contract-deployment
  - storage-reclamation
tags:
  - Self-Destruct
  - Gas Optimization
  - Contratos Inteligentes
---

# Using selfdestruct in Constructors

In Solidity, optimizing gas usage is crucial for creating efficient smart contracts. One technique involves using the `selfdestruct` function within the constructor for contracts designed for one-time use. This approach can reduce gas costs by eliminating the contract from the blockchain once its purpose is fulfilled.

Contracts are sometimes used to deploy several contracts in a single transaction. In cases where the only function of a contract is the code within the constructor, invoking `selfdestruct` at the end of the constructor can save gas. This is because `selfdestruct` removes the contract from the blockchain, thus reclaiming the storage and returning any remaining Cfx to a specified address.

**Demo Code**

To demonstrate this, the contract `SelfDestructExample` deploys another contract in its constructor and then self-destructs, optimizing gas usage.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DeployedContract {
    uint256 public value;

    constructor(uint256 _value) {
        value = _value;
    }
}

contract SelfDestructExample {
    constructor(uint256 _value) {
        // Deploy another contract
        DeployedContract newContract = new DeployedContract(_value);

        // Perform any required operations here...

        // Self-destruct the contract to save gas
        selfdestruct(payable(msg.sender));
    }
}
```

**Using `selfdestruct` in the Constructor**

1. **Deploy another contract**: In the example, the `SelfDestructExample` contract deploys an instance of `DeployedContract` in the constructor.
2. **Perform required operations**: Any operations that need to be done during the deployment can be performed.
3. **Invoke `selfdestruct`**: Finally, the `selfdestruct` function is called to remove the contract from the blockchain, returning any remaining Cfx to the deployer's address.

Using `selfdestruct` in the constructor for one-time-use contracts is a effective technique for gas optimization in Solidity, it helps in reducing gas costs and cleaning up the blockchain state.

Recommendations for gas optimization:

🌟 For contracts that only perform operations within the constructor and do not need to persist on the blockchain, use `selfdestruct` at the end of the constructor to save on gas costs and clean up the state.
