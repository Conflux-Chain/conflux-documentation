---
displayed_sidebar: generalSidebar
keywords:
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
tags:
  - 整数溢出
  - Security
  - 智能合约
---

# 整数溢出

2018年4月，BeautyChain（BEC）代币上发生了一起涉及整数溢出漏洞的重大事件。 该漏洞使攻击者能够凭空生成大量的BEC代币，导致了巨额财务损失，并削弱了该代币的价值。

有关BeautyChain事件的更详细信息，您可以访问以下资源：

- 该漏洞的概览可以在Tenable的 [CVE-2018-10299 页面上](https://www.tenable.com/cve/CVE-2018-10299)找到。
- Detailed discussions of the event and its implications on smart contract security are available on [PeckShield's blog](https://peckshield.com/2018/04/22/batchOverflow/) and in a [Medium article](https://medium.com/secbit-media/a-disastrous-vulnerability-found-in-smart-contracts-of-beautychain-bec-dbf24ddbc30e).

These sources provide a comprehensive look at how such vulnerabilities can be exploited and the profound impacts they can have on digital assets.

Integer overflow vulnerability (Arithmetic Over/Under Flows) is a classic issue in programming that became less common in Solidity starting from version 0.8 due to the integration of the SafeMath library.

以太坊虚拟机（EVM）为整数设置了固定大小，因此它们只能表示特定范围内的数字。 For example, a `uint8` can only represent numbers within the range of [0,255]. 将值 `257`分配给一个`uint8`类型变量会导致溢出，从而将值更改为`1`;同样，将`-1`赋给 uint8类型的变量会导致下溢，将值更改为 `255`。

Attackers can exploit this vulnerability: imagine a hacker with a balance of `$0` spends `$1`, their balance could suddenly turn to `$2^256 - 1`.

#### 易受攻击的合约示例

This example is a simple token contract inspired by the `Ethernaut` contracts. It features `2` state variables: `accounts` records each address's balance, `supplyCap` represents the total token supply.

它包括 `3`个函数:

- `constructor()`: 初始化总代币供应量。
- `send()`: 用于转移代币的函数。
- `getBalance()`: 用于检查余额的函数。

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

#### 预防策略

1. 在Solidity `0.8.0`之前，在合约中使用[SafeMath 库](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.0/contracts/utils/math/SafeMath.sol)，可以在整数溢出的情况下抛出错误。

2. 在Solidity `0.8.0`之后, 内置了SafeMath,使得这类问题变得罕见。 然而,开发人员有时候会使用`unchecked`块来节省gas ，暂时禁用整数溢出检查。 For additional information on this technique and its implications for gas optimization, refer to the [Gas Optimization - Unchecked guide](../gas-optimization/unchecked.md). Always ensure there is no potential for integer overflow vulnerabilities when using this approach.
