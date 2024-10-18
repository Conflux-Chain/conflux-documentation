---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - security
  - vulnerabilities
  - reentrancy-attack
  - solidity
  - dao-hack
  - fei-protocol
  - prevention
  - checks-effects-interactions
  - reentrancy-guard
tags:
  - Reentrancy Attacks
  - Security
  - 智能合约
---

# 重入攻击

重入攻击是针对智能合约最常见的攻击类型之一，攻击者利用合约的漏洞递归调用合约，使其能够从合约中转移资产或者铸造大量的代币。

2016年，DAO 合约遭到重入攻击，导致从合约中盗取了 3,600,000 ETH。 此事件导致以太坊网络分叉为两个链：ETH 和 ETC（以太坊经典）。

2022 年，算法稳定币项目 Fei 遭到重入攻击，导致损失 8000 万美元。 更多信息可以在 [此处](https://rekt.news/fei-rari-rekt/) 找到。

当合约在确保其状态正确更新之前进行外部调用时，可能会发生重入攻击。 Attackers can exploit this by making the vulnerable contract invoke an attacker-controlled contract, which then re-invokes the original contract repeatedly. 这种重复调用可以在正确更新前操纵合约的状态，导致可能的资金损失。

考虑一个简化的 `FinancialVault` 合约，它允许存入和取出 ETH，类似于银行账户：

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

在这个合约中，`withdrawFunds` 方法容易受到重入攻击。 攻击者可以利用一个设计用来在提款过程中重新进入 `FinancialVault` 合约来进行攻击：

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

## 防御机制

### 重入保护

重入保护是防止此类攻击的一个简单而有效的策略。 它涉及到在函数开始执行时设置一个标志，并在完成时重置它。 这确保了函数在还在运行时不能被重新进入。 OpenZeppelin 库提供了这种模式的实现。 下面是将重入保护应用于 `withdrawFunds` 函数的示例：

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

### 使用Checks-Effects-Interactions模式

这个模式规定，函数应该首先执行所有必要的检查，更新合约的状态，然后再进行任何外部调用。 遵循这一模式确保了所有状态更改在与外部合约交互之前都已完成。

Learn more: [Checks Effects Interactions](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html)

在 `withdrawFunds` 函数中实现这一点，将涉及在尝试发送资金给用户之前更新用户的余额：

```solidity
function withdrawFunds() external {
    uint256 fundsToWithdraw = balances[msg.sender];
    require(fundsToWithdraw > 0, "No funds available");
    
    balances[msg.sender] = 0;
    
    (bool sent, ) = msg.sender.call{value: fundsToWithdraw}("");
    require(sent, "Failed to send funds");
}
```

通过遵循这些实践，智能合约开发者可以显著降低重入攻击的风险，并确保他们的合约安全。
