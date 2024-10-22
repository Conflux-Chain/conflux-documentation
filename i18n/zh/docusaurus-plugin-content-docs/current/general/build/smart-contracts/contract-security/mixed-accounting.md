---
title: Balance Accounting
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - security
  - balance-accounting
  - ether
  - erc20-tokens
  - state-variables
  - selfdestruct
  - solidity
  - prevention
  - introspection
tags:
  - Balance Accounting
  - Security
  - 智能合约
---

Smart contracts often maintain state variables that track balances. However, direct transfers not mediated by contract functions (like direct Ether sends to a contract address or `transfer` calls for ERC20 tokens that bypass the contract's logic) can create discrepancies between the actual balance held by the contract and the balance recorded in the contract’s internal state variables.

Issues can arise if it simultaneously updates a state variable to monitor its balances and also relies on APIs such as `address(this).balance` or `balanceOf(address(this))` for balance information. This can lead to incorrect assumptions about the state of a contract, particularly when balances can be altered externally without corresponding state changes within the contract.

Here are two examples:

**Mixed Ether Accounting**

Contracts that do not implement a `receive` or `fallback` function cannot receive Ether through regular transfers (using `send` or `transfer`). However, Ether can still be forcibly sent to such contracts using the `selfdestruct` function from another contract. This scenario leads to situations where `address(this).balance` (actual balance) is greater than the recorded state variable `myBalance`.

```solidity
 contract MixedAccounting {
     uint256 myBalance;

     function deposit() public payable {
         myBalance += msg.value;
     }

     function myBalanceIntrospect() public view returns (uint256) {
         return address(this).balance;
     }

     function myBalanceVariable() public view returns (uint256) {
         return myBalance;
     }

     function notAlwaysTrue() public view returns (bool) {
         return myBalanceIntrospect() == myBalanceVariable();
     }
 }
```

In this example, `myBalanceIntrospect()` queries the contract’s actual Ether balance using `address(this).balance`, which can differ from `myBalance` if Ether is sent to the contract outside of the `deposit()` function. Ether accounting method is fine, but if you use both, then the contract may have inconsistent behavior.

**Mixed ERC20 Token Accounting**

It is possible for ERC20 tokens to be sent directly to a contract's address, bypassing any `deposit` function designed to update an tracking variable (`myTokenBalance`). This results in discrepancies between `token.balanceOf(address(this))` (introspected balance) and the state variable (`myTokenBalance`).

```solidity
contract MixedAccountingERC20 {
    IERC20 token;
    uint256 myTokenBalance;

    function deposit(uint256 amount) public {
        token.transferFrom(msg.sender, address(this), amount);
        myTokenBalance += amount;
    }

    function myBalanceIntrospect() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function myBalanceVariable() public view returns (uint256) {
        return myTokenBalance;
    }

    function notAlwaysTrue() public view returns (bool) {
        return myBalanceIntrospect() == myBalanceVariable();
    }
}
```

When using `balanceOf(address(this))`, you must account for the possibility of "donations" that bypass the deposit and withdraw functions. State variables that only depend on deposit or withdraw functions cannot account for this. It has to be extremely careful if you use both Both accounting methods.

## Prevention Strategy

- **Avoid Strict Equality Checks**: When checking the balances with introspection, strict using equality checks should be avoided as the balance can be changed by an outsider at will.
