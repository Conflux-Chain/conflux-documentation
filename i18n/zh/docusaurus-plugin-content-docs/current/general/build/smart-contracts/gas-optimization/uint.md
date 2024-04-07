---
displayed_sidebar: generalSidebar
---

# Uint 类型 Gas 比较

在Solidity中，通常认为使用较小的整数类型如 `uint8`, `uint16`, `uint32`, `uint64`, `uint128`, 和 `uint256` 可能会因为它们的尺寸较小而节省gas。 然而，情况并非总是如此。

以太坊虚拟机（EVM）为每个存储变量分配一个256位的槽。 例如，如果我们声明了一个 `uint8` 类型的变量，EVM会用 `0` 填充缺失的位以适应一个单独的槽。 Additionally, during execution, the EVM converts `uintN` types to `uint256` for computations.

**代码演示**

让我们测试 `uint8`, `uint32`, 和 `uint256` ，观察它们在写入数据时的行为。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Uint8Example {
    uint8 public uint8val;

    // gas 22234
    function set() external {
        uint8val = 1;
    }

    // gas 53427
    function compute() external returns (uint8) {
        uint8 target = 50;
        for (uint8 i = 0; i < target; i++) {
            uint8val += 1;
        }
        return uint8val;
    }
}

contract Uint32Example {

    uint32 public uint32val;

    // gas 22234
    function set() external {
        uint32val = 1;
    }

    // gas 53895
    function compute() external returns (uint32) {
        uint32 target = 50;
        for (uint32 i = 0; i < target; i++) {
            uint32val += 1;
        }
        return uint32val;
    }
}

contract Uint256Example {
    uint256 public uint256val;

    // gas 22238
    function set() external {
        uint256val = 1;
    }

    // gas 42950
    function compute() external returns (uint256) {
        uint256 target = 50;
        for (uint256 i = 0; i < target; i++) {
            uint256val += 1;
        }
        return uint256val;
    }
}


```

如观察所见，在循环计算中，`uint256` 节省了超过10,000 gas。 因此，较小的变量并不一定等同于节省gas。

关于 gas 优化的建议：

🌟如果变量不能被一起打包，使用 `uint` 或 `uint256` 是最佳选择。
