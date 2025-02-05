---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - security
  - vulnerabilities
  - unchecked-calls
  - low-level-calls
  - solidity
  - send
  - call
  - delegatecall
  - staticcall
  - king-of-ether
  - gas-limit
  - prevention
tags:
  - 未经检查的低级调用
  - Security
  - 智能合约
---

# 未经检查的低级调用

未经检查的低级调用在智能合约开发中是常见的漏洞来源。 这些调用包括`call()`，`delegatecall()`，`staticcall()`和 `send()`，当它们失败时不会回滚交易，而是返回布尔值`false`。 未检查这些返回值可能导致严重的安全问题。

The `send()` function in Ethereum is notoriously unreliable for transferring ether due to its strict gas limit of 2300. 这意味着如果接收地址的回退函数需要的气体超过此限额，`send()` 操作将不会成功。 如果不正确地管理这个限制，可能会导致严重的漏洞。

一个著名的例子是2016年臭名昭著的"King of Ether" 游戏。 该游戏的设计是将支付最多的玩家加冕为“国王”，并将头衔和相关的以太币转移到每个新的最高支付者。 然而，由于`send()` 函数的限制，当接收者的回退函数需要超过2300燃气时，合约未能正确地转移以太币。 As a result, some participants did not receive their due payments, leading to significant financial losses. 这一事件凸显了在智能合约中谨慎处理以太币交易的重要性。

For an in-depth analysis of what went wrong and the lessons learned, you can review the detailed [King of Ether postmortem](https://www.kingoftheether.com/postmortem.html).

### 未经检查的 `send()` 漏洞

Here is a simple bank contract that includes functions to deposit and withdraw Ethereum, it involves operations that are vulnerable to attacks due to unchecked low-level call:

- **`accountBalances`**：记录所有用户的以太币余额。

- **`depositFunds()`**：用户可以通过此函数向合约存入以太币。

- **`withdrawFunds()`**：此函数允许用户从合约中提取他们的全部余额。 首先检查用户的余额是否大于零，然后尝试将相应数量的以太币发送到用户的地址。 **如果 `send()` 调用失败，用户的余额将变为零。**

- **`checkContractBalance()`**：它只是返回合约地址的余额。

```solidity
contract SimpleBank {
    mapping (address => uint256) public accountBalances;    // User balances

    // Deposit and update balance
    function depositFunds() external payable {
        accountBalances[msg.sender] += msg.value;
    }

    // Withdraw all balance
    function withdrawFunds() external {
        uint256 balance = accountBalances[msg.sender];
        require(balance > 0, "Insufficient balance");
        accountBalances[msg.sender] = 0;
        // Unchecked low-level call
        bool transactionSuccess = payable(msg.sender).send(balance);
    }

    // Check contract balance
    function checkContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
```

Example of a malicious contract designed to simulate a scenario where a withdrawal fails but the user's balance is cleared:

```solidity
contract Exploit {
    SimpleBank public targetBank; // Stores the address of the target bank contract

    // Constructor to initialize the target bank contract address
    constructor(SimpleBank _targetBank) {
        targetBank = _targetBank;
    }

    // Fallback function to ensure failure upon receiving ETH
    receive() external payable {
        revert("ETH reception is disabled.");  // Throws an exception to block ETH reception
    }

    // Deposit function allowing users to send ETH to the target bank contract
    function performDeposit() external payable {
        targetBank.depositFunds{value: msg.value}();  // Deposits the sent ETH into the bank
    }

    // Withdrawal function to attempt to extract all deposits from the bank contract
    function performWithdrawal() external payable {
        targetBank.withdrawFunds();  // Calls the bank contract's withdrawal function
    }

    // Function to check the balance of this exploit contract
    function checkContractBalance() external view returns (uint256) {
        return address(this).balance;  // Returns the current ETH balance of the contract account
    }
}
```

未经检查的低级调用可能导致合约行为不稳定和不安全。 By implementing strict checks and using verified libraries for handling funds, developers can significantly reduce risks.

### 未经检查的`call()`漏洞

The `call()` method is often used for making external calls to other contracts. 和`send()`类似，`call()`方法返回一个布尔值，表示调用的成功或失败。 If this return value is not checked, it can lead to serious security issues where failures are silently ignored.

以下是一个说明潜在问题的示例：

```solidity
contract ExampleContract {
    uint256 public y;
    function setY(uint256 _y) external {
        require(_y > 10, "y must be greater than 10");
        y = _y;
    }
}

interface IExampleContract {
    function setY(uint256 _y) external;
}

contract VulnerableCaller {
    function setYUsingInterface(IExampleContract example, uint256 _y) external {
        example.setY(_y);
    }

    function setYUsingCall(address example, uint256 _y) external {
        (bool success, ) = example.call(abi.encodeWithSignature("setY(uint256)", _y));
        // success is not checked!
    }
}
```

在这个例子中：

- `ExampleContract`: Contains a simple function `setY()` that updates a state variable `y`. The function includes a requirement that `_y` must be greater than 10.

- `VulnerableCaller`:有两个函数来调用 ExampleContract 的`setY()`。

- `setYUsingInterface()`使用接口来调用函数，如果不满足要求，将回退。

- `setYUsingCall()` uses a low-level call to invoke `setY()`. 如果不满足要求，调用将失败，但由于没有检查返回值，交易不会回退。

以下是修改后的`VulnerableCaller`，正确处理返回值：

```solidity
contract SecureCaller {
    function setYUsingInterface(IExampleContract example, uint256 _y) external {
        example.setY(_y);
    }

    function setYUsingCall(address example, uint256 _y) external {
        (bool success, ) = example.call(abi.encodeWithSignature("setY(uint256)", _y));
        require(success, "Call to setY failed");
    }
}
```

通过检查 `call()`方法的返回值，并在调用失败时回退交易，您可以确保合约正确且安全地运行。

## 预防措施

为了避免这类漏洞，考虑以下措施：

1. **强制返回值检查**：必须始终验证`send()` 和`call()`的返回值。 忽略这些可能导致未发现的失误，从而危害合约的完整性和用户资金。

2. **优先考虑更安全的交易方法**：在以太币交易中，始终优先使用`call()` 方法而不是`send()`方法 。 `call()`允许更大的燃气灵活性，并应与稳健的安全防护措施一起使用，如重入防护，以防止常见的攻击向量，比如重入攻击。

3. **Implement Reputable Utility Libraries**: Use well-tested libraries such as OpenZeppelin’s [Address library](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol) (It wraps a low-level call to check the return value.) 安全地管理低级调用。 这些库提供了增强的安全功能，处理边缘情况和异常，确保即使发生错误，也能安全、可预测地进行管理。
