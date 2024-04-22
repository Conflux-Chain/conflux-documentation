
# Unchecked Low-Level Calls in Smart Contracts

## Introduction

Unchecked low-level calls are a common source of vulnerabilities in smart contract development. These calls include `call()`, `delegatecall()`, `staticcall()`, and `send()`, which do not revert the transaction when they fail but instead return a boolean `false`. Failing to check these return values can lead to critical security issues.

`send()` is particularly prone to errors due to its 2300 gas limit. If the fallback function of the target address consumes more gas, the `send()` will fail. The "King of Ether" game in 2016 suffered from such issues, leading to loss of funds. For more details, see the [King of Ether postmortem](https://www.kingoftheether.com/postmortem.html).

## Improved Contract Example

Here is an improved version of a bank contract:

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
        bool transactionSuccess = payable(msg.sender).send(balance);
        require(transactionSuccess, "ETH transfer failed");
    }

    // Check contract balance
    function checkContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
```

## Attack Example and Prevention

Example of a malicious contract to simulate a withdrawal failure while the account balance is cleared:

```solidity
contract Malicious {
    SimpleBank public targetBank;

    constructor(SimpleBank _bank) {
        targetBank = _bank;
    }
    
    receive() external payable {
        revert("Cannot receive ETH");
    }

    function depositToBank() external payable {
        targetBank.depositFunds{value: msg.value}();
    }

    function attemptWithdrawal() external {
        targetBank.withdrawFunds();
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
```

## Prevention Measures

To avoid such vulnerabilities, consider the following measures:

1. **Check Return Values**: Always check the return values of `send()` and `call()`.
2. **Use Safer Methods**: Use `call()` in place of `send()` with protections against reentrancy.
3. **Utilize Helper Libraries**: Use OpenZeppelin's [Address library](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol) to ensure safe low-level calls.

## Conclusion

Unchecked low-level calls can lead to unstable and insecure contract behavior. By implementing strict checks and using verified libraries for handling funds, developers can significantly reduce risks.
