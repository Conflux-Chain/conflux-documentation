---
displayed_sidebar: generalSidebar
tags: 
  - smart-contracts
  - security
  - vulnerabilities
  - integer-overflow
  - beautychain
  - bec
  - solidity
  - safeMath
  - arithmetic-operations
  - evm
  - prevention
---
# Integer Overflow

One of the most significant incidents involving an integer overflow vulnerability occurred with the BeautyChain (BEC) token in April 2018. This exploit allowed attackers to generate an astronomical number of BEC tokens from thin air, leading to a substantial financial loss and undermining the token's value.

For more detailed information on the BeautyChain incident, you can visit the following resources:

- An overview of the vulnerability can be found on the [CVE-2018-10299 page at Tenable](https://www.tenable.com/cve/CVE-2018-10299).
- Detailed discussions of the event and its implications on smart contract security are available on [PeckShield's blog](https://peckshield.com/2018/04/22/batchOverflow/) and in a [Medium article](https://medium.com/secbit-media/a-disastrous-vulnerability-found-in-smart-contracts-of-beautychain-bec-dbf24ddbc30e).

These sources provide a comprehensive look at how such vulnerabilities can be exploited and the profound impacts they can have on digital assets.

Integer overflow vulnerability (Arithmetic Over/Under Flows) is a classic issue in programming that became less common in Solidity starting from version 0.8 due to the integration of the SafeMath library.

The Ethereum Virtual Machine (EVM) sets fixed sizes for integers, thus they can only represent numbers within a specific range. For example, a `uint8` can only represent numbers within the range of [0,255]. Assigning the value `257` to a `uint8` type variable results in an overflow, changing the value to `1`; similarly, assigning `-1` results in an underflow, changing the value to `255`.

Attackers can exploit this vulnerability: imagine a hacker with a balance of `$0` spends `$1`, their balance could suddenly turn to `$2^256 - 1`.

#### Vulnerable Contract Example

This example is a simple token contract inspired by the `Ethernaut` contracts. It features `2` state variables: `accounts` records each address's balance, `supplyCap` represents the total token supply.

It includes `3` functions:

- `constructor()`: Initializes the total token supply.
- `send()`: Function for transferring tokens.
- `getBalance()`: Function to check balance.

The vulnerability in the `send()` function occurs because the check `require(accounts[msg.sender] - _amount >= 0);` always passes due to integer overflow, allowing users to transfer unlimited tokens.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

contract Asset {
  mapping(address => uint) accounts;
  uint public supplyCap;

  constructor(uint _startingSupply) {
    accounts[msg.sender] = supplyCap = _startingSupply;
  }

  function send(address _recipient, uint _amount) public returns (bool) {
    require(accounts[msg.sender] - _amount >= 0);
    accounts[msg.sender] -= _amount;
    accounts[_recipient] += _amount;
    return true;
  }

  function getBalance(address _owner) public view returns (uint balance) {
    return accounts[_owner];
  }
}
```

#### Prevention Strategies

1. Before Solidity `0.8.0`, use the [SafeMath Library](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.0/contracts/utils/math/SafeMath.sol) in contracts to throw an error in case of integer overflow.

2. After Solidity `0.8.0`, SafeMath is built in, making such issues rare. However, developers sometimes use the `unchecked` block to save gas by temporarily disabling integer overflow checks. For additional information on this technique and its implications for gas optimization, refer to the [Gas Optimization - Unchecked guide](../gas-optimization/unchecked.md). Always ensure there is no potential for integer overflow vulnerabilities when using this approach.
