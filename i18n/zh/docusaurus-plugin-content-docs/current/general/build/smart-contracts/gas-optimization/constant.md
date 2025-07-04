---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - gas-optimization
  - Solidity
  - constant
  - immutable
  - variable
  - deployment
  - initialization
  - SLOAD
  - gas-efficiency
tags: [ 常量 vs 不可变量(Constant vs Immutable), GAS 优化, 智能合约 ]
---

# 常量 vs 不可变量(Constant vs Immutable)

1. `常量(constant)`: 声明一个常量，必须在声明时进行初始化,之后不能再被改变。

2. `不可变量(immutable)`：声明一个不可变量，可以在声明时或在构造函数中进行初始化，但在部署之后就不能再被改变。

3. `变量(variable)`：声明一个变量，该变量可以在合约生命周期的任何阶段被赋值和修改。

以下示例说明了用不同修饰符定义的三个变量。

```solidity
```

关于 gas 优化的建议：

🌟 使用变量会导致 gas 消耗增加，所以如果可能的话尽量避免使用。

🌟 对于在部署后不需要修改的常量，**将它们定义为`不可变量`，这在功能和 gas 效率上都是最佳选择。**
