---
displayed_sidebar: generalSidebar
---

# 位图和位运算

在区块链上存储数据的成本极高。 很多项目创新性地使用了一些巧妙的方法来降低gas费用。 我们今天将会讨论那些常见于龙头项目的源代码中的方法。

对于一个 `uint8` 类型数据，用二进制表示为 `00000000`，其中每个位可以是 `0` 或 `1`。 默认情况下，`1` 被视为真，`0` 被视为假。 这种策略允许通过位运算高效且低成本地管理布尔值。

在Solidity中，`1 << n` 代表一个位移操作，将数字 `1` 向左移动 `n` 位，右侧空出的位用 `0` 填充。 例如，如果 `n` 是 `2`，则 `1 << 2` 的结果是 `100`。

**代码演示**

以下演示了使用布尔数组和位运算管理同一数据的方法。

```solidity
contract Bitmap {
    bool[8] boolArrayImplementation;
    uint8 bitmapImplementation;

    function setBoolArrayData(bool[8] memory data) external {
        boolArrayImplementation = data;
    }

    function setBitmapData(uint8 data) external {
        bitmapImplementation = data;
    }

    // gas:35729
    function readBoolArray(uint8 index) external returns (bool) {
        return boolArrayImplementation[index];
    }

    // gas:22366
    function readBitmap(uint indexFromRight) external returns (bool) {
        uint256 bitAtIndex = bitmapImplementation & (1 << indexFromRight);
        return bitAtIndex > 0;
    }
}
```

在 `readBitmap` 函数中， `&` 执行了 `bitmapImplementation` 和 `(1 << indexFromRight)` 每一位上的 `AND` 操作。 只有当该位置的两个位都为 `1` 时，结果位才为 `1` ，否则为 `0`。 这种操作通常用于检查特定位是否被设置为 `1`。

### Gas优化建议：

🌟Considering practical scenarios, bitwise operators can be used for managing certain variables to save gas.
