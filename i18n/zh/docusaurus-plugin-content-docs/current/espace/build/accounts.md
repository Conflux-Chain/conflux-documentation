---
sidebar_position: 5
title: eSpace 映射地址（跨空间）
description: 跨空间操作中的映射地址
displayed_sidebar: eSpaceSidebar
tags:
  - Conflux eSpace
  - Conflux Core
  - Mapped Addresses
  - Cross-Space Operations
  - Hex40 Addresses
  - Base32 地址
  - Account Model
  - Ethereum Compatibility
  - CrossSpaceCall
  - Internal Contract
  - CFX Transfer
  - V2 Hard Fork
  - js-conflux-sdk
  - Address Conversion
  - Keccak Hash
  - Bridge Service
  - Atomic Operations
  - Account Balance
  - Private Keys
  - Wallet Compatibility
  - transferEVM
  - mappedBalance
  - withdrawFromMapped
---

## 概览

Conflux的eSpace是一个独立的空间，与 Conflux 网络上的Core Space在逻辑上隔离开来。 eSpace中的账户有自己的余额和状态。 要与 eSpace 互动，您需要使用 hex40 地址，这与用于 Core 空间的 [base32 addresses](../../core/core-space-basics/addresses.md) 地址不同。 您可以使用[跨链桥](../../general/tutorials/transferring-funds/transfer-funds-across-spaces.md)服务在 Core 和 eSpace 钱包之间转移资金

Conflux eSpace 是 Conflux Network 在其 V2 硬分叉中引入的新特性。 它是一个独立的空间，运行在与Core Space相同的底层基础设施上，但具有不同的规则和规范。 eSpace 中的账户遵循以太坊账户模型，使用 hex40 地址而非 [base32 地址](../../core/core-space-basics/addresses.md)。 这意味着在Core Space和 eSpace 中使用相同的私钥是可以的，但是Core Space和 eSpace 中的账户将具有不同的地址，并且将拥有自己的余额和状态。

Hex40 地址与以太坊地址兼容，这意味着用户可以轻松地将他们的以太坊钱包导入 Conflux eSpace，反之亦然。 在[以太坊账户](https://ethereum.org/en/developers/docs/accounts/)中了解更多关于 eSpace 账户和地址的基本模型。

## 跨空间操作中的映射地址

虽然两个空间是独立的，但可以通过 `CrossSpaceCall` 内置合约实现 CFX 和数据的原子跨链。 该合约的以下三种方法允许两个空间之间进行 CFX 转移。 注意，`CrossSpaceCall`（像其他内置合约一样）只能在 Conflux Core Space中访问。

```js
function transferEVM(bytes20 to) external payable returns (bytes memory output);
function mappedBalance(address addr) external view returns (uint256);
function withdrawFromMapped(uint256 value) external;
```

**Core到 eSpace**：要将 CFX 从 Conflux Core Space转移到 Conflux eSpace，需要调用该合约的 `transferEVM(bytes20 to)` 方法。 该转移的目标地址由方法参数 `to` 指定。 跨空间转移将在一个单一的原子步骤中执行。

**eSpace 到Core**：Core Space中的每个账户在 eSpace 中都有一个**映射账户**（hex40）。 要将 CFX 从 Conflux eSpace 转移到 Conflux Core，需要两个步骤。 首先，将 CFX 转移到属于目标账户（Core Space）的映射账户（eSpace）。 这个操作需要一个 eSpace 交易。 其次，调用 `CrossSpaceCall` 内置合约的 `withdrawFromMapped(uint256 value)` 方法。 这个调用将把 CFX 从映射账户转回到相应的目标地址。

### 计算方法

映射地址是通过以下步骤从 Conflux Core 中的 base32 地址计算出来的：

1. 将 base32 地址转换为十六进制格式，然后转换为字节类型。
2. 对前一步中获得的字节进行 Keccak，得到哈希值。
3. 取哈希值的最后 160 位，并转换为 hex40 格式，这就是映射的 eSpace 地址。

`js-conflux-sdk v2.0` 提供了一种方法来获取 base32 地址的映射地址：

```js
const { address } = require('js-conflux-sdk');
const base32Address = 'cfx:aak2rra2njvd77ezwjvx04kkds9fzagfe6ku8scz91';
const mappedAddress = address.cfxMappedEVMSpaceAddress(base32Address);
// 0x12Bf6283CcF8Ad6ffA63f7Da63EDc217228d839A
```

:::附录

关于映射地址的注意事项：

1. 映射地址是 eSpace 中的一个地址，所以它是 hex40 格式。
2. 映射地址的目的是在将 CFX 跨回Core Space时作为一个中转地址。
3. **记住不要直接将 base32 地址转换为 hex40 格式作为映射地址。 这样做会导致您的资产丢失。**

:::

## 相关主题

* 跨空间的 dApp 教程： [跨空间转移资金](../../general/tutorials/transferring-funds/transfer-funds-across-spaces.md)
