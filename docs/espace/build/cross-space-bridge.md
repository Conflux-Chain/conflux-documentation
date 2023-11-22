---
sidebar_position: 4
title: CrossSpace Bridge
---

[CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md) introduces the internal contract [CrossSpaceCall](../../core/learn/core-space-basics/internal-contracts/crossSpaceCall.md) in **Core Space**, allowing for the seamless transfer of CFX and data between two spaces.

With CrossSpaceCall, it becomes feasible to directly engage with eSpace contracts from within Core Space. This functionality provides eSpace developers with the tools they need to create versatile cross-space applications. For a deeper understanding of this concept, you can explore the following resources:

* [CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md)
* [Mapped Addresses](../learn/accounts.md#mapped-addresses-in-cross-space-operations)
* [CrossSpaceCall](../../core/learn/core-space-basics/internal-contracts/crossSpaceCall.md)
* [eSpace Phantom Transactions](./evm-compatibility.md#phantom-transactions)

### CrossSpaceCall Interface

This contract is available under the address [`cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa2sn102vjv`](https://confluxscan.io/address/cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa2sn102vjv) (hex: `0x0888000000000000000000000000000000000006`) on Core Space.

```js
interface CrossSpace {
    /* methods for cross-space CFX transfers */

    function transferEVM(bytes20 to) external payable returns (bytes memory output);
    
    function withdrawFromMapped(uint256 value) external;

    function mappedBalance(address addr) external view returns (uint256);
    
    /* methods for other cross-space operations */

    function callEVM(bytes20 to, bytes calldata data) external payable returns (bytes memory output);

    function staticCallEVM(bytes20 to, bytes calldata data) external view returns (bytes memory output);
}

```
