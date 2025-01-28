---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - gas-optimization
  - Solidity
  - delete-keyword
  - state-variables
  - default-values
  - SSTORE
  - ResetVariable
  - gas-costs
  - comparison
tags:
  - ResetVariable
  - GAS 优化
  - 智能合约
---

# ResetVariable

在Solidity中，使用`delete`关键字来移除状态变量将其重置为其类型的默认值。 默认值根据数据类型而异：

- **布尔类型（boolean）**：默认值为 `false`。
- **字符串（string）**：默认值为一个空字符串`""`。
- **整数（int）**：默认值为`0`。
- **无符号整数（uint）**：默认值为 `0`。
- **枚举（enum）**：默认值为枚举的第一个元素。
- **地址（address）**：默认值为`0x0000000000000000000000000000000000000000` (或`address(0)`)。
- **function**: For `internal` functions, the default is an empty internal function, and for `external` functions, it is an empty external function.
- **映射（mapping）**：所有元素都设置为它们的默认值。
- **结构体（struct）**：所有成员都设置为它们的默认值。
- **动态数组**：长度重置为0，有效地使其成为空数组[]。
- **静态数组**：所有元素都设置为它们的默认值。

Compared to directly updating the state variable to its default value, the gas costs differ. 当使用 `delete`关键字删除一个状态变量时，Solidity会生成一个特定的操作码，`SSTORE`，将该变量的值设置为其类型的默认值。 The `delete` operation is a high-level action recognized and optimized by the compiler, which can clear all related storage at once, whereas manually resetting might require more operations and higher gas costs.

**代码演示**

下面的智能合约 `ResetVariable`定义了一个状态变量`balance` 和两种不同的方法来删除`balance`状态变量的数据。 These methods consume different amounts of gas:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract ResetVariable {
    uint balance;

    // Normal update of balance: 22238 gas
    function normalUpdate() external {
        balance = 1;
    }

    // Update and delete: 2316 gas
    function deleteAfterUpdate() external {
        balance = 1;
        delete balance;
    }

    // Update and assign to default value: 2360 gas
    function resetToDefault() external {
        balance = 1;
        balance = 0;
    }
}
```

关于 gas 优化的建议：

🌟 Compared to directly updating a state variable to its default value, using the delete keyword to remove the variable consumes less gas.
