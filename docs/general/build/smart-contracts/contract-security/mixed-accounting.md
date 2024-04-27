---
title: Handling Mixed Accounting in Smart Contracts
displayed_sidebar: generalSidebar
---

The **Mixed Accounting issue** in smart contracts arises when internal state variables and direct balance queries return inconsistent results. This can lead to incorrect assumptions about the state of a contract, particularly when balances can be altered externally without corresponding state changes within the contract.

## Problem Overview

Smart contracts often maintain internal state variables that track balances, either of Ether or ERC20 tokens. However, direct transfers not mediated by contract functions (like direct Ether sends to a contract address or `transfer` calls for ERC20 tokens that bypass the contract's logic) can create discrepancies between the actual balance held by the contract and the balance recorded in the contract’s internal state variables.

### Specific Challenges

1. **Direct Ether Transfers**: Contracts that do not implement a `receive` or `fallback` function cannot receive Ether through regular transfers (using `send` or `transfer`). However, Ether can still be forcibly sent to such contracts using the `selfdestruct` function from another contract. This scenario leads to situations where `address(this).balance` (actual balance) is greater than the recorded internal state variable `myBalance`.

2. **Direct ERC20 Transfers**: It is possible for ERC20 tokens to be sent directly to a contract's address, bypassing any `deposit` function designed to update an internal tracking variable (`myTokenBalance`). This results in discrepancies between `token.balanceOf(address(this))` (introspected balance) and the internal state variable (`myTokenBalance`).

### Examples

1. **Ether Accounting**:
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

    In this example, `myBalanceIntrospect()` queries the contract’s actual Ether balance using `address(this).balance`, which can differ from `myBalance` if Ether is sent to the contract outside of the `deposit()` function.

2. **ERC20 Token Accounting**:
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

## Recommendations

- **Avoid Reliance on State Variables for Balance Checks**: Relying solely on internal state variables for balance checks can lead to incorrect behaviors or vulnerabilities if external interactions change the balance without updating these variables.
- **Consistency in Balance Updates**: Ensure that all methods of transferring assets in and out of the contract synchronize with the internal state variables.
- **Security Checks**: Implement mechanisms to prevent or flag unexpected balance changes that could affect the contract's logic.
- **Avoid Strict Equality Checks**: When validating balances with internal state variables, avoid using strict equality checks as external factors might change the balances unpredictably.

By addressing these aspects, developers can ensure that their smart contracts behave as intended and are resilient against unforeseen modifications to their state.
