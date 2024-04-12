---
displayed_sidebar: generalSidebar
---

# Local Variables

In many common DeFi projects, we frequently encounter various complex calculations that inevitably require defining many new local variables and updating existing global variables. It's well-known that modifying storage is significantly more expensive than making changes in memory.

**代码演示**

Below, we present two different methods to modify storage variables and observe the gas difference.

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

🌟 For complex calculations, bypass direct storage variable manipulation to save on high gas costs. Instead, use local variables for interim modifications, then update storage variables in one go. This approach significantly reduces gas usage.
