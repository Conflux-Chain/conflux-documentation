---
title: Mixed Accounting
displayed_sidebar: generalSidebar
---

Mixed Accounting issue in smart contracts arises when state variables and direct balance queries return inconsistent results. This can lead to incorrect assumptions about the state of a contract, particularly when balances can be altered externally without corresponding state changes within the contract.

Smart contracts often maintain state variables that track balances. However, direct transfers not mediated by contract functions (like direct Ether sends to a contract address or `transfer` calls for ERC20 tokens that bypass the contract's logic) can create discrepancies between the actual balance held by the contract and the balance recorded in the contract’s internal state variables.

**Ether Accounting - Direct Ether Transfers**

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

In this example, `myBalanceIntrospect()` queries the contract’s actual Ether balance using `address(this).balance`, which can differ from myBalance if Ether is sent to the contract outside of the `deposit()` function.

**ERC20 Token Accounting - Direct ERC20 Transfers**

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

### Examples

1. **Ether Accounting**:

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

## Prevention Strategies

- **Consistency in Balance Updates**: Ensure that all methods of transferring assets in and out of the contract synchronize with the internal state variables.
- **Security Checks**: Implement mechanisms to prevent or flag unexpected balance changes that could affect the contract's logic.
- **Avoid Strict Equality Checks**: When checking the balances with introspection, strict using equality checks should be avoided as the balance can be changed by an outsider at will.
