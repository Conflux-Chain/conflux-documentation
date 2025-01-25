---
title: Tx Origin Attacks
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - security
  - vulnerabilities
  - tx-origin
  - phishing-attacks
  - solidity
  - authentication
  - msg-sender
  - prevention
  - simple-bank
tags:
  - Tx Origin Attacks
  - Security
  - 智能合约
---

A transaction origin attack is form of phising attack that can drain a contract of all funds.In Solidity, `tx.origin` retrieves the address of the transaction originator, distinguishing it from `msg.sender`.

让我们通过一个例子来理解它们之间的差异。 假设用户A调用合约B，然后合约B调用合约C。对于合约C，`msg.sender` 将是合约B，而`tx.origin`仍然是用户A。

但是，在智能合约中使用`tx.origin` 进行身份验证可能导致漏洞。 以下是该风险的更详细的解释：如果攻击者说服合约的所有者与恶意合约交互，`msg.sender` 将正确显示攻击者的合约地址作为调用者。 然而，`tx.origin`仍将反映原始交易发起者的地址，即合约所有者。 因此，如果合约的安全性依赖于`tx.origin` 来验证权限，这种不一致可能会错误地授予攻击者未经授权的访问权限，使其可以像所有者那样执行交易。

## 易受攻击的合约示例

The `SimpleBank` contract below is a simple bank contract that includes a `sendFunds` function vulnerable to `tx.origin` attacks, it tracks the owner and includes a constructor and a public method:

- `Constructor`：在合约创建时分配`bankOwner` 变量。
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

以下是一个恶意合约，可以将银行合约所有者的余额转移到攻击者的地址。 它包括两个状态变量`thief` 和`target`，以及一个构造函数（constructor ）和一个公共方法：

- `Constructor`：初始化`target`合约地址。
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

#### 预防策略

\*\*如果在 `msg.sender`和`tx.origin`之间犹豫不决，始终使用`msg.sender` \*\*。`msg.sender`可以准确地识别合约的直接调用者，从而防止外部恶意合约的任何干扰。

```solidity
function sendFunds(address payable recipient, uint amount) public {
        require(msg.sender == bankOwner, "Caller is not the owner");
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Transfer failed");
    }
```
