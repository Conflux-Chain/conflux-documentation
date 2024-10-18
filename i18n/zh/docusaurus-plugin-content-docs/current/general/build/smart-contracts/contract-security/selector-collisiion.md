---
title: Selector Collision Attack
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - security
  - vulnerabilities
  - selector-collision
  - poly-network-hack
  - solidity
  - function-selectors
  - cross-chain-bridge
  - prevention
  - keccak256
tags:
  - Selector Collision
  - Security
  - 智能合约
---

The **selector collision attack** was one of the key reasons behind the hacking of the Poly Network cross-chain bridge.

In August 2021, the cross-chain bridge contracts of Poly Network on ETH, BSC, and Polygon were hacked, resulting in losses of up to $611 million. This was the largest blockchain hack of 2021 and ranked second in the history of stolen amounts, we can learn more about the detailed attack incidents from [this article](https://rekt.news/polynetwork-rekt/).

In Ethereum smart contracts, a function selector is the first `4` bytes (`8` hexadecimal digits) of the hash of the function signature `"<function name>(<function inputTypes>)"`. When a user calls a contract's function, the first `4` bytes of the `calldata` are the target function's selector, which determines which function to call.

Due to the function selector being only `4` bytes long, it's quite short and prone to collisions: it's relatively easy to find two different functions that share the same function selector. For example, `mint(address,uint256)` and `cat642998653(address,uint256)` have the same selector: `0x23b872dd`.

**Vulnerable Contract Example**

让我们通过一个具有漏洞的合约示例来学习一下。 `SelectorCollisionTest` 合约有一个状态变量 `isCompleted`，初始值为 `false`。 攻击者需要将其改为 `true`。 合约主要有 `2` 个函数。

1. `activateKey()`：攻击者可以调用这个函数将 `isCompleted` 改为 `true`，完成攻击。 然而，这个函数检查 `msg.sender == address(this)`，意味着调用者必须是合约本身。

2. `triggerAction()`：它可以调用合约内的函数，但函数参数类型和目标函数不完全相同：目标函数的参数是 `(bytes)`，而被调用的函数的参数是 `(bytes,bytes,uint64)`。

```solidity
contract SelectorCollisionTest {
    bool public isCompleted; // Whether the attack was successful

    // The attacker needs to call this function, but the caller msg.sender must be this contract.
    function activateKey(bytes memory data) public {
        require(msg.sender == address(this), "Unauthorized");
        isCompleted = true;
    }

    // Vulnerable, the attacker can change the _action variable to collide with the function selector and call the target function to complete the attack.
    function triggerAction(bytes memory _action, bytes memory data, bytes memory extraData, uint64 timestamp) public returns(bool executed){
        (executed, ) = address(this).call(
            abi.encodePacked(
                bytes4(
                    keccak256(abi.encodePacked(_action, "(bytes,bytes,uint64)")
                    )
                ),
                abi.encode(data, extraData, timestamp)));
    }
}
```

**攻击方法**

通过利用 `triggerAction()` 函数，可以调用合约的 `activateKey()` 函数，目标是特定的选择器 `0x4bb3d55c`。

在 `triggerAction()` 机制中，选择器来自于将 `_action` 参数与函数签名 `"(bytes,bytes,uint64)"` 结合。 因此，选择一个合适的 `_action` 使得计算出的选择器匹配 `0x4bb3d55c`，从而实现攻击目标。
