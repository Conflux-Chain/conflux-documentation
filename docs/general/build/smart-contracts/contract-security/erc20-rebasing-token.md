---
displayed_sidebar: generalSidebar
---

# Handling Rebasing Tokens

Rebasing tokens, such as those popularized by [Olympus DAO’s sOhm token](https://docs.olympusdao.finance/main/user-guides/using-website/staking/) and [Ampleforth’s AMPL token](https://www.ampleforth.org/), pose unique challenges to smart contract developers. These tokens automatically adjust their supply based on demand, which can lead to unexpected behaviors if not handled properly.


When a token rebases, the total supply changes and everyone’s balance increases or decreases depending on the rebase direction. This behavior can break smart contracts that are not designed to handle such changes.

### Vulnerable Contract Example

The following contract is vulnerable when dealing with a rebasing token. It uses a mapping to track user balances and transfers tokens based on these balances without considering the possibility of supply changes due to rebasing.

```solidity
contract WillBreak {
    mapping(address => uint256) public balanceHeld;
    IERC20 private rebasingToken;

    function deposit(uint256 amount) external {
        balanceHeld[msg.sender] = amount;
        rebasingToken.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw() external {
        uint256 amount = balanceHeld[msg.sender];
        delete balanceHeld[msg.sender];
        // ERROR: amount might exceed the actual balance held by the contract
        rebasingToken.transfer(msg.sender, amount);
    }
}
```

In this contract, the `withdraw` function may attempt to transfer more tokens than the contract actually holds, leading to a failure.

### Safe Handling of Rebasing Tokens

To safely handle rebasing tokens, the contract should check the actual balance of the token held by the contract before making any transfers. Here’s how you can modify the contract to safely handle rebasing tokens:

#### Secure Contract Example

```solidity
contract SafeRebasing {
    mapping(address => uint256) public balanceHeld;
    IERC20 private rebasingToken;
    uint256 public totalDeposited;

    function deposit(uint256 amount) external {
        balanceHeld[msg.sender] = balanceHeld[msg.sender] + amount;
        totalDeposited = totalDeposited + amount;
        rebasingToken.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw(uint256 amount) external {
        uint256 userBalance = balanceHeld[msg.sender];
        require(amount <= userBalance, "Withdraw amount exceeds balance");

        // Update user and contract balance
        balanceHeld[msg.sender] = userBalance - amount;
        totalDeposited = totalDeposited - amount;

        // Calculate the actual balance held by the contract
        uint256 contractBalance = rebasingToken.balanceOf(address(this));
        // Calculate the actual token amount user should receive
        uint256 actualAmount = (contractBalance * amount) / totalDeposited;

        rebasingToken.transfer(msg.sender, actualAmount);
    }
}
```
**Key Changes and Benefits:**

1. **Tracking Total Deposits:** Added a `totalDeposited` variable to track the total deposits by all users in the contract.
2. **Proportional Withdrawals:** Calculate the actual withdrawal amount based on the user's deposit proportion and the contract's actual token balance.

