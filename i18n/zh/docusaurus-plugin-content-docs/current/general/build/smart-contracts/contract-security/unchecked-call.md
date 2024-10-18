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
  - Unchecked Low-Level Calls
  - Security
  - 智能合约
---

# Unchecked Low-Level Calls

Unchecked low-level calls are a common source of vulnerabilities in smart contract development. These calls include `call()`, `delegatecall()`, `staticcall()`, and `send()`, which do not revert the transaction when they fail but instead return a boolean `false`. Failing to check these return values can lead to critical security issues.

The `send()` function in Ethereum is notoriously unreliable for transferring ether due to its strict gas limit of 2300. This limitation means that if the fallback function of the receiving address requires more gas than this allowance, the `send()` operation will not succeed. This limitation can lead to dangerous vulnerabilities if not properly managed.

A notable example of this was the "King of Ether" game, which became infamous in 2016. The game was designed to crown the player who paid the most as the "King," transferring the title and associated ether to each new top payer. However, due to the restrictive gas limit of the `send()` function, the contract failed to transfer ether correctly when the recipients had complex fallback functions requiring more than 2300 gas. As a result, some participants did not receive their due payments, leading to significant financial losses. The incident highlights the critical importance of handling ether transactions with care in smart contracts.

For an in-depth analysis of what went wrong and the lessons learned, you can review the detailed [King of Ether postmortem](https://www.kingoftheether.com/postmortem.html).

### Unchecked `send()` Vulnerabilities

Here is a simple bank contract that includes functions to deposit and withdraw Ethereum, it involves operations that are vulnerable to attacks due to unchecked low-level call:

- **`accountBalances`**: Records the Ethereum balances of all users.

- **`depositFunds()`**: Users can deposit ETH into the contract through this function.

- **`withdrawFunds()`**: This function allows users to withdraw their entire balance from the contract. It first checks if the user's balance is greater than zero, then attempts to send the corresponding amount of ETH to the user's address. **If the `send()` call fails, the user's balance will become zero.**

- **`checkContractBalance()`**: It simply returns the balance of the contract address.

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

Unchecked low-level calls can lead to unstable and insecure contract behavior. By implementing strict checks and using verified libraries for handling funds, developers can significantly reduce risks.

### Unchecked `call()` Vulnerabilities

The `call()` method is often used for making external calls to other contracts. Similar to `send()`, the `call()` method returns a boolean value indicating the success or failure of the call. If this return value is not checked, it can lead to serious security issues where failures are silently ignored.

Here's an example to illustrate the potential problem:

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

In this example:

- `ExampleContract`: Contains a simple function `setY()` that updates a state variable `y`. The function includes a requirement that `_y` must be greater than 10.

- `VulnerableCaller`: Has two functions to call `setY()` on `ExampleContract`.

- `setYUsingInterface()` uses an interface to call the function, which will revert if the requirement is not met.

- `setYUsingCall()` uses a low-level call to invoke `setY()`. If the requirement is not met, the call will fail, but the transaction will not revert because the return value is not checked.

Here’s a revised version of `VulnerableCaller` with proper handling of the return value:

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

By checking the return value of the `call()` method and reverting the transaction if the call fails, you can ensure that the contract behaves correctly and securely.

## Prevention Measures

To avoid such vulnerabilities, consider the following measures:

1. **Mandate Return Value Checks**: It is imperative to consistently verify the return values of `send()` and `call()`. Ignoring these can lead to undetected failures that jeopardize contract integrity and user funds.

2. **Prioritize Safer Transaction Methods**: Always prefer the `call()` method over `send()` for ether transactions. `call()` allows for greater gas flexibility and should be used with robust safeguards such as reentrancy guards to prevent common attack vectors like reentry attacks.

3. **Implement Reputable Utility Libraries**: Use well-tested libraries such as OpenZeppelin’s [Address library](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol) (It wraps a low-level call to check the return value.) to manage low-level calls safely. These libraries provide enhanced security features that handle edge cases and exceptions, ensuring that even if errors occur, they are managed securely and predictably.
