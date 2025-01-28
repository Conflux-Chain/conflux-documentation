---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - gas-optimization
  - clone
  - new
  - create2
  - factory-contracts
  - EIP1167
  - minimal-proxies
  - Solidity
  - deployment-strategies
  - gas-efficiency
tags:
  - Clone 和 New/Create2 关键字
  - GAS 优化
  - 智能合约
---

# Clone 和 New/Create2 关键字

In factory contracts, we often need to create several child contracts, and there are three common ways to do this:

- 使用 `new` 通过现有合约创建：new 关键字允许通过现有合约的代码库直接实例化子合约。 这种方法涉及到将子合约的字节码纳入工厂合约本身，需要同时部署。 This method is straightforward and intuitive but requires careful management to avoid bloating the factory contract, especially given the Ethereum network's contract size limitations.

- 使用 `create2` 通过创建代码创建：这种方法在创建任何子合约之前，需要将创建代码加载到工厂合约中。 create2 的一个重要优点是其在生成合约地址时的可预测性，这可以在实际合约部署之前预先确定，促进更复杂的部署方案和交互。

- Using `clone` to clone an existing contract, the clone technique leverages the concept of minimal proxies as specified in EIP1167 to duplicate an already deployed contract. By cloning an existing contract, developers can significantly reduce the gas costs associated with deploying numerous contract instances. This method requires a pre-deployed copy of the child contract, from which clones are created with their own state but sharing the same codebase.

**代码演示**

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

关于 gas 优化的建议：

🌟 When using the `new` operator, while convenient, it can easily lead to a situation where the size of the child contract causes the factory contract to exceed the 24kB limit.

🌟 与 `create2` 和 `clone` 相比，为了 gas 优化，更推荐使用克隆。
