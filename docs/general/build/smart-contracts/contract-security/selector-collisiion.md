---
title: Selector Collision Attack
displayed_sidebar: generalSidebar
tags: 
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
---

The **selector collision attack** was one of the key reasons behind the hacking of the Poly Network cross-chain bridge.

In August 2021, the cross-chain bridge contracts of Poly Network on ETH, BSC, and Polygon were hacked, resulting in losses of up to $611 million. This was the largest blockchain hack of 2021 and ranked second in the history of stolen amounts, we can learn more about the detailed attack incidents from [this article](https://rekt.news/polynetwork-rekt/).

In Ethereum smart contracts, a function selector is the first `4` bytes (`8` hexadecimal digits) of the hash of the function signature `"<function name>(<function inputTypes>)"`. When a user calls a contract's function, the first `4` bytes of the `calldata` are the target function's selector, which determines which function to call.

Due to the function selector being only `4` bytes long, it's quite short and prone to collisions: it's relatively easy to find two different functions that share the same function selector. For example, `mint(address,uint256)` and `cat642998653(address,uint256)` have the same selector: `0x23b872dd`.

**Vulnerable Contract Example** 

Let's examine a vulnerable contract example. The `SelectorCollisionTest` contract has a state variable `isCompleted` initialized as `false`. The attacker needs to change it to `true`. The contract mainly has `2` functions.

1. `activateKey()`: The attacker can call this function to change `isCompleted` to `true`, completing the attack. However, this function checks `msg.sender == address(this)`, meaning the caller must be the contract itself.

2. `triggerAction()`: It can call functions within the contract, but the function parameter types and the target function are not quite the same: the target function's parameters are `(bytes)`, while the function being called has parameters `(bytes,bytes,uint64)`.

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

**Attack Method** 

By utilizing the `triggerAction()` function, it's possible to invoke the contract's `activateKey()` function, aiming for the specific selector `0x4bb3d55c`. 

Within the `triggerAction()` mechanism, the selector emerges from combining the `_action` parameter with the function signature `"(bytes,bytes,uint64)"`. Thus, selecting a fitting `_action` enables the calculated selector to match `0x4bb3d55c`, thereby achieving the objective of the attack.