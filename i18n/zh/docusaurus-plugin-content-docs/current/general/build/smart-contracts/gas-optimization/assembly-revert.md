---
displayed_sidebar: generalSidebar
---

# Using assembly to revert with an error message

在智能合约中优化 Gas 使用时，使用汇编语言来实现 revert 语句可以节省 Gas。 While Solidity's `require` and `revert` statements are convenient, implementing the same functionality with assembly can be more gas-efficient.

Solidity 在使用标准 revert 语句时，会因内存扩展和类型检查而产生额外的 Gas 消耗。 而通过使用汇编语言，我们可以绕过这些额外的开销，同时保持相同的功能。

### Gas比较示例

下面是两种方法的比较示例：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SolidityRevert {
    address owner;
    uint256 specialNumber = 1;

    constructor() {
        owner = msg.sender;
    }

    function restrictedAction(uint256 num) external {
        require(owner == msg.sender, "caller is not owner");
        specialNumber = num;
    }
}

contract AssemblyRevert {
    address owner;
    uint256 specialNumber = 1;

    constructor() {
        owner = msg.sender;
    }

    function restrictedAction(uint256 num) external {
        assembly {
            if sub(caller(), sload(owner.slot)) {
                // Store offset to error message length
                mstore(0x00, 0x20)
                // Store length of error message
                mstore(0x20, 0x13)
                // Store the error message
                mstore(0x40, 0x63616c6c6572206973206e6f74206f776e657200000000000000000000000000)

                // Revert with data (offset, size)
                revert(0x00, 0x60)
            }
        }
        specialNumber = num;
    }
}
```

### Gas分析

| 实现方式            | Gas消耗  | 节省的Gas |
| --------------- | ------ | ------ |
| Solidity Revert | 24,042 | -      |
| Assembly Revert | 23,734 | 308    |

### 理解汇编实现

汇编中的 revert 实现由几个关键部分组成：

1. **条件检查**：

```solidity
if sub(caller(), sload(owner.slot))
```

2. **内存布局**：

- `0x00`: 存储偏移量(0x20)
- `0x20`: 存储错误消息的长度（0x13 = 19 字节）
- `0x40`: 存储实际的错误消息（十六进制表示）

3. **Revert操作**:

```solidity
revert(0x00, 0x60)
```

The first parameter (0x00) is the memory offset, and the second (0x60) is the size of the data to revert with.

**要点:**

- 汇编中的 revert 语句比 Solidity 的`require`和`revert`更节省 Gas。
- Gas 节省来自于避免了内存扩展和编译器类型检查的开销。
- The same error messages can be preserved while reducing gas costs

### Best Practices for Implementation

1. 在频繁调用的函数中使用汇编 revert，特别是在 Gas 优化至关重要的情况下。
2. 使用汇编代码时，保持清晰的文档说明。
3. Consider the trade-off between code readability and gas optimization
4. 充分测试，确保错误信息编码正确。

### 安全事项

虽然在正确实现时，使用汇编的 revert 语句是安全的，但需要注意：

- 汇编代码绕过了 Solidity 的安全检查。
- 需要仔细测试，确保错误消息正确编码。
- 文档化对可维护性至关重要。

**注意**:显示的 Gas 节省是近似值，可能会根据 Solidity 版本和优化设置的不同而有所变化。
