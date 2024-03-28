---
displayed_sidebar: generalSidebar
---

# Variable Packing

The Ethereum Virtual Machine (EVM) stores variables in consecutive 32-bytes slots. When we place multiple variables within a single slot, this is referred to as variable packing.

If the variables we try to pack exceed the 32-bytes limit of the current slot, they will be stored in a new slot. It's crucial to determine which variables are best grouped together to minimize wasted space. 

Although Solidity automatically tries to pack smaller basic types into the same slot, poor struct member ordering can prevent the compiler from doing so.

Learn More: [Layout of State Variables in Storage](https://docs.soliditylang.org/en/v0.8.25/internals/layout_in_storage.html)

**DemoCode**

Below, we demonstrate how to use packing in contracts to compare gas usage.

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

Recommendations for gas optimization:

🌟Pay attention to variable packing when choosing data types. If it's possible to pack a variable with others into a single storage slot, opting for a smaller data type can be beneficial.
