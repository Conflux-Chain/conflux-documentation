---
displayed_sidebar: generalSidebar
---

# Clone vs New/Create2

In factory contracts, we often need to create several child contracts, and there are three common ways to do this:

- Using `new` to create through an existing contract, the new keyword allows for the instantiation of child contracts directly through an existing contract's codebase. This approach involves incorporating the child contract's bytecode within the factory contract itself, necessitating its deployment simultaneously. This method is straightforward and intuitive but requires careful management to avoid bloating the factory contract, especially given the Ethereum network's contract size limitations.
- Using `create2` to create through creation code, this method requires loading the creation code into the factory contract before any child. A significant advantage of create2 is its predictability in generating contract addresses, which can be predetermined before the actual contract deployment, facilitating more complex deployment schemes and interactions.
- Using `clone` to clone an existing contract, the clone technique leverages the concept of minimal proxies as specified in EIP1167 to duplicate an already deployed contract. By cloning an existing contract, developers can significantly reduce the gas costs associated with deploying numerous contract instances. This method requires a pre-deployed copy of the child contract, from which clones are created with their own state but sharing the same codebase.

**DemoCode**

Below, we create child contracts using all three methods to observe the difference in gas consumption:

```solidity
// Deploying with 'new', Gas: 79515
function deployNewExample() external returns (address) {
    DemoContract demo = new DemoContract();
    return address(demo);
}

// Deploying with 'create2', Gas: 93031
function deployWithCreate2(uint256 salt) external payable returns (address) {
    address deployedAddress;
    bytes memory contractBytecode = predefinedCreationCode;
    assembly {
        deployedAddress := create2(0, add(contractBytecode, 32), mload(contractBytecode), salt)
        if iszero(extcodesize(deployedAddress)) {
            revert(0, 0)
        }
    }
    return deployedAddress;
}

// Deploying with 'clone', Gas: 41493
function deployClone(address prototype) internal returns (address deployedClone) {
    bytes20 prototypeBytes = bytes20(prototype);
    assembly {
        let cloneBuffer := mload(0x40)
        mstore(
            cloneBuffer,
            0x3d602d80600a3d3981f3363d3d373d3d3d363d73ffffffffffffffffffffffffffffffffffffffff
        )
        mstore(add(cloneBuffer, 0x14), prototypeBytes)
        mstore(
            add(cloneBuffer, 0x28),
            0x5af43d82803e903d91602b57fd5bf3ffffffffffffffffffffffffffffffffffffffff
        )
        deployedClone := create(0, cloneBuffer, 0x37)
    }
}
```

Recommendations for gas optimization:

🌟 When using the `new` operator, while convenient, it can easily lead to a situation where the size of the child contract causes the factory contract to exceed the 24kB limit. 

🌟 Compared to `create2` and `clone`, cloning is more recommended for gas optimization.
