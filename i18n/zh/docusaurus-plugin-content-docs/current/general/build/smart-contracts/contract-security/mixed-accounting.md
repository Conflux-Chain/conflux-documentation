---
title: 余额核算
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
  - 余额核算
  - Security
  - 智能合约
---

Smart contracts often maintain state variables that track balances. However, direct transfers not mediated by contract functions (like direct Ether sends to a contract address or `transfer` calls for ERC20 tokens that bypass the contract's logic) can create discrepancies between the actual balance held by the contract and the balance recorded in the contract’s internal state variables.

Issues can arise if it simultaneously updates a state variable to monitor its balances and also relies on APIs such as `address(this).balance` or `balanceOf(address(this))` for balance information. This can lead to incorrect assumptions about the state of a contract, particularly when balances can be altered externally without corresponding state changes within the contract.

以下是两个示例：

**混合以太币核算**

未实现 `receive` 或 `fallback` 函数的合约无法通过常规转账 (使用`send`或者`transfer`)接收以太币。 但是，可以通过另一个合约的 `selfdestruct` 函数强制向这些合约发送以太币。 这种情况导致 `address(this).balance` (实际余额)大于记录的状态变量 `myBalance`。

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

**混合 ERC20 代币核算**

ERC20 代币可以直接发送到合约地址，绕过任何用于更新跟踪变量 (`myTokenBalance`)的`deposit` 函数。 This results in discrepancies between `token.balanceOf(address(this))` (introspected balance) and the state variable (`myTokenBalance`).

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

## 预防策略

- **避免严格的相等性检查**：在使用内省检查余额时，应避免严格使用相等性检查，因为余额可以被外部人员随意更改。
