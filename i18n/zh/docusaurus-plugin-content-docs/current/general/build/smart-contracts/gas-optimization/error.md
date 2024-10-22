---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - Solidity
  - gas-optimization
  - error-handling
  - 回滚
  - require
  - assert
  - custom-errors
  - gas-consumption
  - EVM
tags:
  - 错误
  - GAS 优化
  - 智能合约
---

# 错误

在Solidity中，开发者可以以三种主要形式定义错误： `revert`、 `require` 和 `assert`。 从功能角度来看，这些方法的主要区别有两个：

1. 它们是否可以抛出开发者定义的错误原因；
2. 它们是否可以抛出携带变量的开发者定义错误；

主要区别如下：

| 类型        | 自定义原因 | 携带变量 | 示例                                                                                                        |
| --------- | ----- | ---- | --------------------------------------------------------------------------------------------------------- |
| `revert`  | ✅     | ✅    | Reason: UnauthorizedAccess(0x05D01CAF54524A610CCF187082201120757f7AE5) |
| `require` | ✅     | ❌    | 原因：UnauthorizedAccess                                                                                     |
| `assert`  | ❌     | ❌    | 原因： Assertion violated                                                                                    |

**代码演示**

下面，我们使用三种形式的错误来观察gas使用的变化：

```solidity
contract Error {
    error UnauthorizedAccess();

    // gas: 164
    function errorRevert() external pure {
        if (true) revert UnauthorizedAccess();
    }

    // gas: 268
    function errorRequire() external pure {
        require(false, "UnauthorizedAccess");
    }

    // gas: 180
    function errorAssert() external pure {
        assert(false);
    }
}
```

gas优化建议如下：

🌟1. `revert` 最为推荐，因为它既可以抛出错误消息，也可以抛出相关变量。

🌟2. `require` 中的字符串存储在链上，这不仅消耗更多的gas，还增加了合约大小。 建议根据实际需求选择。

🌟3. 如果有使用 `assert` 的场景，建议用 `revert` 替换。
