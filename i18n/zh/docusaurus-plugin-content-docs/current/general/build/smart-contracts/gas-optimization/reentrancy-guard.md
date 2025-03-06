---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - gas-optimization
  - Solidity
  - reentrancy-guard
  - security
  - modifiers
  - uint-variable
  - boolean-flag
  - EVM
  - ReentrancyGuardBool
  - ReentrancyGuardUint01
  - ReentrancyGuardUint12
tags:
  - Reentrancy Guard
  - GAS 优化
  - 智能合约
---

# 低成本重入保护

在智能合约中使用修饰符进行重入检查可以通过确认合约当前是否正在执行来提升安全性。 通常，布尔型标志用于控制访问权限，只有当合约尚未激活时才允许函数运行。

如果使用 uint 型变量作为锁定机制可以更加节省 gas。 这种方法利用不同的数值来指示合约的状态，提供了一种灵活的方式来管理执行流程，并可能减少频繁操作的 gas 成本。

**代码演示**

下面的演示比较了三种防止重入攻击的方法：使用布尔标志、使用在 0 和 1 之间切换的 uint 型变量，和使用在 1 和 2 之间切换的 uint 型变量。

```solidity
contract ReentrancyGuardBool {
    bool private _locked = false;
    // gas: 27757
    modifier nonReentrant() {
        require(!_locked, "REENTRANCY");
        _locked = true;
        _;
        _locked = false;
    }
}

contract ReentrancyGuardUint01 {
    uint256 private _lockState = 0;
    // gas: 27604
    modifier nonReentrant() {
        require(_lockState == 0, "REENTRANCY");
        _lockState = 1;
        _;
        _lockState = 0;
    }
}

contract ReentrancyGuardUint12 {
    uint256 private _lockState = 1;
    // gas: 13908 
    modifier nonReentrant() {
        require(_lockState == 1, "REENTRANCY");
        _lockState = 2;
        _;
        _lockState = 1;
    }
}
```

关于 gas 优化的建议：

🌟 对于重入保护而言，不同方法的效率差异显著。 布尔方法使用两个字节表示布尔值，因为 EVM 处理 32 字节字的方式而导致了更多的 gas 消耗。 考虑到重入保护修饰符通常会被多次调用，推荐使用 Uint 1-2 方法，因为它可以有效节省 gas。