---
displayed_sidebar: generalSidebar
---

# ERC20: Fee on Transfer

When dealing with untrusted tokens, you shouldn’t assume that your balance necessarily increases by the amount you transfer. It is possible for an ERC20 token to implement its transfer function to include a fee, which can lead to unexpected results if not handled properly.

Consider the following example where an ERC20 token applies a 1% tax to every transaction:

```solidity
contract ERC20 {
    // internally called by transfer() and transferFrom()
    // balance and approval checks happen in the caller
    function _transfer(address from, address to, uint256 amount) internal returns (bool) {
        uint256 fee = amount / 100; // 1% fee
        uint256 amountAfterFee = amount - fee;
        balanceOf[from] -= amount;
        balanceOf[to] += amountAfterFee;
        balanceOf[TREASURY] += fee;
        emit Transfer(from, to, amountAfterFee);
        emit Transfer(from, TREASURY, fee);
        return true;
    }
}
```

This token applies a 1% tax to every transaction. If a smart contract interacts with the token without accounting for this fee, it can result in unexpected reverts or stolen funds.

#### Vulnerable Contract Example

Here is an example of a staking contract that does not account for the fee on transfer:

```solidity
contract Stake {
    IERC20 public token;
    mapping(address => uint256) public balancesInContract;

    ...

    function stake(uint256 amount) public {
        token.transferFrom(msg.sender, address(this), amount);
        balancesInContract[msg.sender] += amount; // THIS IS WRONG!
    }

    function unstake() public {
        uint256 toSend = balancesInContract[msg.sender];
        delete balancesInContract[msg.sender];
        // This could revert because toSend is 1% greater than
        // the amount in the contract. Otherwise, 1% will be "stolen"
        // from other depositors.
        token.transfer(msg.sender, toSend);
    }
}
```

### Prevention Technique

To secure smart contracts interacting with fee-on-transfer tokens, accurately track transferred amounts by always checking the actual amount received or sent during transfers.


#### Secure Contract Example

Here is a corrected version of the staking contract:

```solidity
contract SecureStake {
    mapping(address => uint256) public balancesInContract;

    function stake(uint256 amount) public {
        uint256 initialBalance = token.balanceOf(address(this));
        token.transferFrom(msg.sender, address(this), amount);
        uint256 finalBalance = token.balanceOf(address(this));
        uint256 actualReceived = finalBalance - initialBalance;
        balancesInContract[msg.sender] += actualReceived;
    }

    function unstake() public {
        uint256 toSend = balancesInContract[msg.sender];
        delete balancesInContract[msg.sender];
        uint256 initialBalance = token.balanceOf(address(this));
        token.transfer(msg.sender, toSend);
        uint256 finalBalance = token.balanceOf(address(this));
        uint256 actualSent = initialBalance - finalBalance;
        require(actualSent <= toSend, "Fee on transfer too high");
    }
}
```

By tracking the actual amounts transferred and received, the contract ensures that it correctly handles tokens with transfer fees, preventing unexpected reverts and safeguarding user funds.
