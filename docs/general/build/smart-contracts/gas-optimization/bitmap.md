---
displayed_sidebar: generalSidebar
---

# Bitmap & Bitwise operations

Storing data on the blockchain is extremely expensive. To decrease gas costs, innovative projects implement clever techniques. The method we're discussing today is often found in the source code of leading projects.

Consider a `uint8`, represented in binary as `00000000`, where each bit can be either `0` or `1`. Traditionally, `1` is treated as true and `0` as false. This strategy allows for the effective and economical management of boolean values through bit manipulation.

In Solidity, `1 << n` represents a bit shift operation, moving the number `1` left by `n` bits, with the right-hand vacated bits filled with `0`. For example, if `n` is `2`, then `1 << 2` results in `100`.


**Demo Code**

The following demonstrates managing the same data using both a boolean array and bitwise operations.

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

In the `readBitmap` function, The `&` performs an `AND` operation on each bit of `bitmapImplementation` and `(1 << indexFromRight)`. The resulting bit is `1` only if both bits at that position are `1`, otherwise, it's `0`. This operation is commonly used to check if a specific bit is set to `1`.

### Gas Optimization Suggestions:

🌟Considering practical scenarios, bitwise operators can be used for managing certain variables to save gas.
