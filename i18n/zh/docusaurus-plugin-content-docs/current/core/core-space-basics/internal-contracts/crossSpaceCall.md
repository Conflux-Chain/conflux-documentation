---
sidebar_position: 6
title: CrossSpaceCall
keywords:
  - conflux
  - crossspacecall
  - 内置合约
  - core space
  - espace
  - cross-space transfer
  - CFX transfer
tags:
  - CrossSpaceCall
  - 内置合约
displayed_sidebar: coreSidebar
---

[CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md) 引入了一个新的内置合约：`CrossSpaceCall`. CrossSpaceCall 允许在两个空间之间转移 **CFX 和数据**。

## 接口

这个合约的十六进制地址是 `0x0888000000000000000000000000000000000006` ，接口为:

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
     * @dev Transfer CFX from Core space to eSpace specify address. 转账金额由交易值指定。
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

## 进一步说明

有关如何使用 `CrossSpaceCall` 合约在Core Space 和 eSpace 之间跨域 CFX 和数据的详细信息，请[查看此处](/docs/espace/build/cross-space-bridge)。 你也可以在那里找到 JS 和 Solidity 的示例。

## 跨空间桥 Dapp

普通用户可以直接通过其钱包（ Fluent 和 MetaMask ）轻松地使用[空间桥 Dapp](https://confluxhub.io/espace-bridge/cross-space) 跨 CFX。

* [Mainnet Space Bridge](https://confluxhub.io/espace-bridge/cross-space)
* [Testnet Space Bridge](https://test.confluxhub.io/espace-bridge/cross-space)
