---
displayed_sidebar: generalSidebar
---

# Using `selfdestruct` in Constructors for Gas Optimization

In Solidity, optimizing gas usage is crucial for creating efficient smart contracts. One technique involves using the `selfdestruct` function within the constructor for contracts designed for one-time use. This approach can significantly reduce gas costs by eliminating the contract from the blockchain once its purpose is fulfilled.

The `selfdestruct` function is set for removal in an upcoming hardfork, but it will still be supported in the constructor as per [EIP 6780](https://eips.ethereum.org/EIPS/eip-6780).

**Overview**

Contracts are sometimes used to deploy several contracts in a single transaction. In cases where the only function of a contract is the code within the constructor, invoking `selfdestruct` at the end of the constructor can save gas. This is because `selfdestruct` removes the contract from the blockchain, thus reclaiming the storage and returning any remaining Ether to a specified address.

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
3. **Invoke `selfdestruct`**: Finally, the `selfdestruct` function is called to remove the contract from the blockchain, returning any remaining Ether to the deployer's address.

**Benefits of Using `selfdestruct` in Constructors**

- **Gas Savings**: By removing the contract after its purpose is fulfilled, you save on storage costs.
- **Clean Up**: Ensures that unnecessary contracts do not remain on the blockchain, contributing to a cleaner state.
- **Ether Return**: Returns any remaining Ether in the contract to a specified address, ensuring no funds are locked.

**Considerations**

While this approach is beneficial for one-time-use contracts, it is important to note the upcoming changes in Solidity. The `selfdestruct` function is set for removal, but it will continue to be supported in constructors according to [EIP 6780](https://eips.ethereum.org/EIPS/eip-6780). Developers should stay informed about these changes and plan their contract designs accordingly.

**Conclusion**

Using `selfdestruct` in the constructor for one-time-use contracts is a powerful technique for gas optimization in Solidity. It helps in reducing gas costs and cleaning up the blockchain state. By following this approach, developers can create more efficient and cost-effective smart contracts.

Recommendations for gas optimization:

🌟 For contracts that only perform operations within the constructor and do not need to persist on the blockchain, use `selfdestruct` at the end of the constructor to save on gas costs and clean up the state.
