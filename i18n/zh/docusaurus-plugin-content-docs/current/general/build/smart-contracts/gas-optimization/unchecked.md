---
displayed_sidebar: generalSidebar
---

# Unchecked

We know that before the Solidity version 0.8, it was necessary to manually import the SafeMath library to ensure data safety and avoid overflow, thereby preventing overflow attacks.

After Solidity version 0.8, Solidity performs a check every time there is a data change to determine whether there is an overflow, thus deciding whether to throw an exception.

This also means that the check incurs additional gas costs. By using `unchecked` wisely, it is possible to effectively remove the intermediate checking step, thus achieving the purpose of saving gas.

Learn more: [Checked or Unchecked Arithmetic](https://docs.soliditylang.org/en/v0.8.25/control-structures.html#checked-or-unchecked-arithmetic)

**Demo Code**

Below, we demonstrate using both a conventional for-loop and an `unchecked` for-loop. Note that since `iterations` is already of type `uint256`, there will not be an overflow issue.

```solidity
contract UncheckedExample {
    // gas: 1910309 
    function conventionalForLoop(uint256 iterations) external pure returns (uint256 result) {
        for (uint256 index = 0; index < iterations; index++) {
            result = index + 1;
        }
    }

    // gas: 570287 
    function uncheckedForLoop(uint256 iterations) external pure returns (uint256 result) {
        for (uint256 index = 0; index < iterations; ) {
            unchecked {
                result = index + 1;
                index++;
            }
        }
    }
}
```

Recommendations for gas optimization:

🌟 In situations where security is controllable, the unchecked block can be used to save gas.
