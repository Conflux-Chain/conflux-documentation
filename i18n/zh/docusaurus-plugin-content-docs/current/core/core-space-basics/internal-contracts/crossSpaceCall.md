---
sidebar_position: 6
title: CrossSpaceCall
displayed_sidebar: coreSidebar
---

[CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md) 引入了一个新的内置合约：`CrossSpaceCall`. CrossSpaceCall enables **CFX and data** to be transferred between the two spaces.

## 接口

This contract's hex40 address is `0x0888000000000000000000000000000000000006` with interface:

```js
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

interface CrossSpaceCall {
    event Call(bytes20 indexed sender, bytes20 indexed receiver, uint256 value, uint256 nonce, bytes data);

    event Create(bytes20 indexed sender, bytes20 indexed contract_address, uint256 value, uint256 nonce, bytes init);

    event Withdraw(bytes20 indexed sender, address indexed receiver, uint256 value, uint256 nonce);

    event Outcome(bool success);

    /**
     * @dev Deploy a contract in eSpace
     * @param init bytes -  The contract init bytecode
     * @return bytes20 - The hex address of the deployed contract
     */
    function createEVM(bytes calldata init) external payable returns (bytes20);

    /**
     * @dev Transfer CFX from Core space to eSpace specify address. Transfer amount is specified by transaction value.
     * @param to bytes20 - The hex address of the receiver address in eSpace
     * @return output bytes
     */
    function transferEVM(bytes20 to) external payable returns (bytes memory output);

    /**
     * @dev Call eSpace contract method from Core space
     * @param to bytes20 - The hex address of the contract in eSpace
     * @param data bytes - The contract method call data
     * @return output bytes - Method call result
     */ 
    function callEVM(bytes20 to, bytes calldata data) external payable returns (bytes memory output);

    /**
     * @dev Static call eSpace contract method from Core space
     * @param to bytes20 - The hex address of the contract in eSpace
     * @param data bytes - The contract method call data
     * @return output bytes - Method call result
     */ 
    function staticCallEVM(bytes20 to, bytes calldata data) external view returns (bytes memory output);

    /**
     * @dev Widthdraw CFX from eSpace mapped account's balance
     * @param value uint256 - The amount of CFX to be withdrawn
     */ 
    function withdrawFromMapped(uint256 value) external;

    /**
     * @dev Query eSpace mapped account's CFX balance
     * @param addr address - The core address to query
     * @return uint256 - Balance
     */
    function mappedBalance(address addr) external view returns (uint256);

    /**
     * @dev Query eSpace mapped account's nonce
     * @param addr address - The core address to query
     * @return uint256 - Balance
     * */ 
    function mappedNonce(address addr) external view returns (uint256);
}
```

注意：`CrossSpaceCall`合约部署在Core Space。 它只能从Core Space调用。

## Further Explain

For detail information about how to use `CrossSpaceCall` contract cross CFX and data between Core Space and eSpace [check here](/docs/espace/build/cross-space-bridge). You can also find  JS and Solidity examples in there.

## Space Bridge Dapp

Common users can use the [Space Bridge Dapp](https://confluxhub.io/espace-bridge/cross-space) to cross CFX directly through their wallets(Fluent and MetaMask) easily.

* [Mainnet Space Bridge](https://confluxhub.io/espace-bridge/cross-space)
* [Testnet Space Bridge](https://test.confluxhub.io/espace-bridge/cross-space)
