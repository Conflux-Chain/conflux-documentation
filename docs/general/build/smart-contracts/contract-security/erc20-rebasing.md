---
displayed_sidebar: generalSidebar
---

# Handling Rebasing Tokens in Smart Contracts

Rebasing tokens, such as those popularized by Olympus DAO’s sOhm token and Ampleforth’s AMPL token, pose unique challenges to smart contract developers. These tokens automatically adjust their supply, which can lead to unexpected behaviors if not handled properly. Coingecko maintains a list of rebasing ERC20 tokens.

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

    function deposit(uint256 amount) external {
        balanceHeld[msg.sender] = amount;
        rebasingToken.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw() external {
        uint256 amount = balanceHeld[msg.sender];
        delete balanceHeld[msg.sender];

        uint256 contractBalance = rebasingToken.balanceOf(address(this));
        if (amount > contractBalance) {
            amount = contractBalance;
        }

        rebasingToken.transfer(msg.sender, amount);
    }
}
```

### Key Changes and Benefits

1. **Checking Actual Balance:** Before transferring tokens back to the user, the contract checks the actual balance of the token held by the contract (`rebasingToken.balanceOf(address(this))`). This ensures that it does not attempt to transfer more tokens than it holds.

2. **Adjusting Transfer Amount:** If the user’s requested withdrawal amount exceeds the contract’s balance, the contract adjusts the transfer amount to the actual balance. This prevents transfer failures due to insufficient balance.

### Best Practices

1. **Avoid Using Rebasing Tokens:** If possible, avoid using rebasing tokens in your contracts, as they introduce complexity and potential risks.

2. **Regular Audits:** Regularly audit your contracts to ensure they handle all edge cases, including changes in token supply due to rebasing.

3. **Thorough Testing:** Perform thorough testing, including scenarios where the token supply changes, to ensure your contract behaves as expected under all conditions.

By implementing these changes and following best practices, you can create more robust and secure smart contracts that handle rebasing tokens effectively.
