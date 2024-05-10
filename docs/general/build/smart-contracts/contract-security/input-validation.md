---
title: Improper Input Validation
displayed_sidebar: generalSidebar
---

# Improper Input Validation

If access control is about controlling who calls a function, input validation is about controlling what they call the contract with. This usually comes down to forgetting to put the proper require statements in place.

(Improper access control occurs when `msg.sender` lacks sufficient limitations. Improper input validation happens when function arguments are not adequately checked.)

Sushiswap was compromised due to improper input validation which leads to the loss of >$3.3M loss. The exploit specifically targeted a function responsible for updating swap pair routes, which did not rigorously validate its input parameters. 

Attackers were able to manipulate the parameters related to the paths for token swaps. These parameters, crucial for determining the routing of transactions, were not adequately checked for authenticity or logical integrity. By injecting malformed or deceptive input data, the attackers redirected funds to addresses under their control, effectively draining resources from legitimate liquidity pools. 

For further reading on the details of the Sushiswap exploit, you can refer to the detailed analysis: [Sushiswap Exploit Input Validation Failure](https://cointelegraph.com/news/sushiswap-approval-bug-leads-to-3-3-million-exploit).

#### Vulnerability Example

```solidity
contract UnsafeBank {
    mapping(address => uint256) public balances;

    // allow depositing on other's behalf
    function deposit(address for) public payable {
        balances[for] += msg.value;
    }

    function withdraw(address from, uint256 amount) public {
        require(balances[from] <= amount, "insufficient balance");
        balances[from] -= amount;
        msg.sender.call{value: amount}("");
    }
}
```

The contract ensures that the withdrawal amount doesn't exceed the account balance, but it doesn't prevent withdrawals from an arbitrary account.

## Prevention Strategy

External inputs to smart contracts that specifically affect certain financial transactions should be rigorously validated to prevent unauthorized actions.