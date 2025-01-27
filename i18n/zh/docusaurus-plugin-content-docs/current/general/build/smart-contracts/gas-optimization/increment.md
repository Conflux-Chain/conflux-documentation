---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - Solidity
  - gas-optimization
  - increment-operations
  - pre-increment
  - post-increment
  - arithmetic-operations
  - comparison
  - DemoCode
tags:
  - Increment
  - GAS 优化
  - 智能合约
---

# 更好的增量

在合约开发中，增量操作是基础操作，由于它们在计数和循环机制中经常使用。 Each method of incrementing has subtle nuances that may affect gas consumption and readability:

- `count += 1`: 这个表达式直接将1加到`count`的值上。 It is clear and explicit, which enhances readability. This form is ideal when you want to emphasize the incrementation by a specific value.

- `count = count + 1`: This method explicitly shows the operation being performed on `count`. It's very straightforward, making the code easy to understand. Although it may seem redundant compared to `count += 1`, it is sometimes preferred for its clarity in demonstrating that `count` is being incremented by exactly one.

- `count++`: Known as the post-increment operator, this increments `count` by one but returns the original value before it was incremented. It is useful in loops and when the increment operation needs to be done after the current value has been used.

- `++count`: The pre-increment operator increments `count` before its value is used in any operation. It's slightly more efficient than `count++` when the updated value is needed immediately, as it avoids the temporary copy that post-increment might involve.

**代码演示**

Here we use different methods to increment, observing the gas differences.

```solidity
contract IncrementerA {
    //gas:204
    function incrementA() external pure {
        uint count;
        count += 1;
    }
}

contract IncrementerB {
    // gas:204
    function incrementB() external pure {
        uint count;
        count = count + 1;
    }
}

contract IncrementerC {
    // gas: 198
    function incrementC() external pure {
        uint count;
        count++;
    }
}

contract IncrementerD {
    // gas: 193
    function incrementD() external pure {
        uint count;
        ++count;
    }
}
```

关于 gas 优化的建议：

🌟 It is recommended to use the `++n` form for incrementing.
