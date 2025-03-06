---
title: 不当的输入验证
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - security
  - input-validation
  - vulnerabilities
  - sushiswap
  - exploit
  - solidity
  - access-control
  - require-statements
  - prevention
tags:
  - Input Validation
  - Security
  - 智能合约
---

# 不当的输入验证

如果访问控制是关于控制谁调用函数，那么输入验证就是要控制他们用什么参数来调用合约。 这一般归结为忘记放置恰当的require语句。

(当`msg.sender`缺乏足够的限制时，就会出现不恰当的访问控制。 如果没有对函数参数进行充分检查，就会出现不恰当的输入验证)。

Sushiswap由于输入验证不恰当导致发生超过 330 万美元的损失。 该漏洞专门针对一个负责更新交换对路由的函数，该函数没有严格验证其输入参数。

攻击者能够操纵与代币交换路径相关的参数。 这些参数对确定交易路由至关重要，但却没有充分检查其真实性或逻辑完整性。 通过注入格式错误或欺骗性的输入数据，攻击者可以将资金重定向到他们控制的地址，从而有效地从合法流动性池中耗尽资源。

有关Sushiswap漏洞的详细信息，请参阅详细分析：[Sushiswap Exploit Input Validation Failure](https://cointelegraph.com/news/sushiswap-approval-bug-leads-to-3-3-million-exploit)。

#### 漏洞示例

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

该合约可以确保取款金额不超过账户余额，但并不阻止从任意账户提款。

## 预防策略

智能合约的外部输入，特别是影响某些财务交易的输入，应该严格验证，以防止未经授权的操作。