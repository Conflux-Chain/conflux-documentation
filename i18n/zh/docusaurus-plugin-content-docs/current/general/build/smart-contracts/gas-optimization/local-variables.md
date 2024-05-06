---
displayed_sidebar: generalSidebar
---

# 局部变量

在许多常见的DeFi项目中，我们经常遇到需要定义许多新的局部变量和更新现有全局变量的各种复杂计算。 众所周知，修改存储比在内存中进行更改的成本要高得多。

**代码演示**

下面，我们展示了两种不同的方法来修改存储变量，并观察gas差异。

```solidity
contract LocalVariablesExample {
    uint globalCounter;

    // gas: 4022155
    function modifyStorageDirectly(uint iterations) external {
        for (uint i = 0; i < iterations; i++) {
            globalCounter++;
        }
    }

    // gas: 1902339
    function modifyUsingLocalVariable(uint iterations) external {
        uint localCounter = 0;
        for (uint i = 0; i < iterations; i++) {
            localCounter++;
        }
        globalCounter = localCounter;
    }
}
```

关于 gas 优化的建议：

🌟 对于复杂的计算，建议避免直接操纵存储变量以节省高昂的gas成本。 相反，推荐使用局部变量作为过渡进行修改，然后一次性更新存储变量。 这种方法显著减少了gas使用。
