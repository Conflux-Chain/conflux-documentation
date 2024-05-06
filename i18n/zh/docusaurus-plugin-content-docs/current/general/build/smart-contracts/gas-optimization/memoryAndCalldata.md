---
displayed_sidebar: generalSidebar
sidebar_position: 2
---

# Memory 与 Calldata

1. `memory` : 通常用于修饰函数参数和函数内的临时变量。 此类变量存储在内存中，不会永久保存在区块链上。

2. `calldata` : 与 memory 类似，存储在内存中而不会永久保存在区块链上。 主要区别是 calldata 变量是不可变的，常用于修饰函数参数。

了解更多：[数据存储位置和赋值行为](https://docs.soliditylang.org/en/latest/types.html#data-location)

以下，我们演示了如何使用 `calldata` 和 `memory` 写入数据

```solidity
contract CalldataAndMemory {
    struct Confi {
        uint16 age;
        string name;
        string wish;
    }

    Confi John;
    Confi Jane;

    function writeToJohn(Confi calldata JohnData) external {
        John = JohnData;
    }

    function writeToJane(Confi memory JaneData) external {
        Jane = JaneData;
    }
}
```

关于 gas 优化的建议：

🌟 在实际情况中，如果可以使用 `calldata`，建议使用 `calldata` 而不是 `memory`。
