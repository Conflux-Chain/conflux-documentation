---
displayed_sidebar: generalSidebar
---

# 变量打包

以太坊虚拟机（EVM）以连续的 32 字节槽存储变量。 当我们将多个变量放在单个槽中时，这称为变量打包。

如果我们试图打包的变量超过了当前槽的 32 字节限制，它们将被存储在一个新的槽中。 确定变量之间最优的组合方式，以最大化地减少空间浪费非常重要。

尽管 Solidity 会自动尝试将较小的基本类型打包到同一个槽中，但不良的结构成员排序可能会阻止编译器这样做。

了解更多：[存储中的状态变量分布](https://docs.soliditylang.org/en/v0.8.25/internals/layout_in_storage.html)

**代码演示**

以下，我们演示了如何在合约中使用打包，并对比了 gas 使用情况。

```solidity

// gas: 188616
contract Standard {
    uint64 a = 5;
    uint256 b = 5;
    uint64 c = 5;
}

// gas: 166178
contract OptimizedPacking {
    uint256 b = 5;
    uint64 a = 5;
    uint64 c = 5;
}
```

关于 gas 优化的建议：

🌟在选择数据类型时注意变量打包。 尽可能将不同的变量打包到一个存储槽中，并尽可能选择使用更小的数据类型。
