---
title: Tx Origin Attacks
displayed_sidebar: generalSidebar
---

A transaction origin attack is form of phising attack that can drain a contract of all funds.In Solidity, `tx.origin` retrieves the address of the transaction originator, distinguishing it from `msg.sender`.

Let's use an example to understand their differences. Imagine that User A calls Contract B, which then calls Contract C. For Contract C, `msg.sender` would be Contract B, while `tx.origin` would still be User A.

But use `tx.origin` for authentication in a smart contract can lead to vulnerabilities. Here's a more detailed explanation of the risk: If an attacker convinces the owner of a contract to interact with a malicious contract, the `msg.sender` will correctly show the address of the attacker's contract as the caller. However, `tx.origin` will still reflect the address of the original transaction initiator—i.e., the contract owner. Consequently, if the contract's security relies on `tx.origin` to validate permissions, this misalignment could mistakenly grant the attacker unauthorized access to perform transactions as if they were the owner.

## Example of a Vulnerable Contract

The `SimpleBank` contract below is a simple bank contract that includes a `sendFunds` function vulnerable to `tx.origin` attacks, it tracks the owner and includes a constructor and a public method:

- `Constructor`: Assigns the `bankOwner` variable during contract creation.
- `sendFunds()`: Takes two parameters, `recipient` and `amount`. It checks if `tx.origin == bankOwner` and, if true, transfers `amount` of ETH to `recipient`.

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

The malicious contract below can fish the balance from the bank contract owner to the attacker’s address. It includes two state variables `thief` and `target`, and includes a constructor and a public method:

- `Constructor`: Initializes `target` contract address.
- `launchAttack()`: When called by the bank contract’s owner, it forces a transaction from the bank to the hacker’s address.

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

**Always use `msg.sender` if you are hesitating between `msg.sender` and `tx.origin`**, `msg.sender` accurately identifies the direct caller of the contract, thereby preventing any interference by external malicious contracts.

```solidity
function sendFunds(address payable recipient, uint amount) public {
        require(msg.sender == bankOwner, "Caller is not the owner");
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Transfer failed");
    }
```
