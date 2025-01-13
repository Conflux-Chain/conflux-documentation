---
sidebar_position: 5
title: 代付机制
displayed_sidebar: coreSidebar
keywords:
  - 赞助机制
  - 智能合约
  - Gas Fees
  - 存储抵押
  - SponsorWhitelistControl
  - Sponsor Balance
  - 白名单
  - Gas Sponsorship
  - Storage Sponsorship
  - 交易费用
  - User Adoption
  - Contract Deployment
  - Sponsor Replacement
  - 存储点
  - CIP-107
tags:
  - 赞助机制
---

Conflux Core 空间实现了代付机制，来补贴智能合约的使用。 这允许余额为零的新账户调用智能合约，前提是执行操作得到代付（通常由Dapp运营者提供）。 这个机制旨在降低新用户的入门门槛。
为区块链的大规模应用铺平道路。

## 简介

在区块链世界中，发送交易时支付交易费是非常常见的。 以太坊有燃气费，而Conflux Core Space不仅有燃气费，还有存储抵押费。 通常，这些费用由交易的发送方支付。 然而，很多刚进入区块链世界的新用户可能不理解这些概念，没有代币来支付这些费用，从而构成进入区块链世界的障碍。 为了解决这种障碍，Conflux Core Space引入了代付机制。

赞助机制允许合约得到赞助。 一旦进行赞助，调用合约时产生的交易费用将由赞助方支付，这意味着用户无需担心或支付这些费用。 赞助方可以是合约的所有者或其他任何人。 想象一下，一个部署在 Core Space 上的 `USDT` 代币，任何人都可以在无需支付任何费用情况下进行转账 —— 这对于新用户来说非常友好。

交易的 gas 费和存储抵押都可以被赞助，并且它们可以由两个不同的赞助方赞助。 例如，合约的燃气费可以由赞助方A赞助，而存储抵押由赞助方B赞助。

请注意，只有合约可以被赞助；赞助机制不适用于普通账户。 这意味着对于标准的CFX转账交易，燃气费需要由发送方支付。

## 如何赞助智能合约

要赞助合约，赞助方需要调用 [SponsorWhitelistControll](./internal-contracts/sponsor-whitelist-control) 内置合约。 它还会记录智能合约的赞助信息。

### Gas Sponsorship

要赞助合约的燃气费用，您可以调用 `SponsorWhitelistControl` 的 `setSponsorForGas` 方法。 此方法有两个参数：

- `contractAddr`：要赞助的合约地址。
- `upperBound`: 每笔交易中的 gas 赞助上限值, 以 Drip 为单位, 1 CFX = 10^18 Drip。 如果与同一智能合约交互的交易产生的 gas 费用 (按 gasPrice \* gasLimit 计算)超过了这一限额，则不能获得赞助。

目前， Conflux Core 网络中的最小的 gas 费用是 1 Gdrip，也就是10^9 Drip。 通常情况下，一笔交易的 gas 开销从数万到数十万不等。 因此，`upperBound` 通常被设定为 500万 GDrip 左右。 特殊情况下，这个数值可以根据具体需求加以调整。

此外，需要通过交易的 `value` 字段设置将要被代付的燃气费的总金额。 这意味着在调用此方法时，必须同时进行 CFX 转账。 此外，每笔赞助金额应足以支付至少 `1000笔交易`（1000 \* upperBound）的gas费用。 比如，如果 upperBound 被设置为 100 万 GDrip，一笔交易的代付金额就需要被设置为至少 1000 \* 1 百万 GDrip。

例如，要以 100 万 GDrip 的代付上限和 100 CFX 的总代付金额赞助合约 A ，您需要发起一个调用 `setSponsorForGas(A, 10^15)` 的交易，并将交易的 value 字段设置为 100 CFX。

这个内置合约还提供了几种方法来查询合约的赞助信息：

1. `getSponsoredGasFeeUpperBound`：查询合约 gas 费的代付上限。
2. `getSponsoredBalanceForGas`：查询合约被赞助的 gas 费剩余余额。
3. `getSponsorForGas`：查询合约 gas 费的赞助者。

如果在调用 `setSponsorForGas` 时合约已经有了赞助者，并且新的赞助者与当前赞助者相同，合约的赞助余额将会增加。 如果新的赞助者发生变动，合约的赞助余额将被被替换。 在这种情况下，赞助金额需要大于 ` currentSponsorBalance + 1000 * upperBound`。 前一个赞助者的赞助余额将被退还，剩余金额将更换为赞助者后的赞助余额。

### Storage Sponsorship

要赞助合约的存储抵押，可以调用 `SponsorWhitelistControl` 里面的 `setSponsorForCollateral` 方法。 这个方法只需要一个参数：

- `contractAddr`：想要赞助的合约地址。

赞助的**总金额**也可以通过交易的 value 来指定。 根据 CIP-107，赞助金额设定后，其中的一部分(当前为 50% )将转换为存储点。 存储点和存储赞助余额都可以用来支付合约存储抵押物的费用，存储赞助余额会被优先使用。

这个内置合约还提供了几种方法来查询合约的赞助信息：

1. `getSponsoredBalanceForCollateral`：查询合约存储抵押赞助的剩余余额。
2. `getSponsorForCollateral`：查询合约存储的赞助者。
3. `getAvailableStoragePoints`：查询合约的存储点的剩余余额。

类似的，如果在调用 `setSponsorForCollateral` 时合约已经有了赞助者，且新赞助者与当前赞助者相同，则合约的赞助余额将增加。 如果新的赞助者发生变动，合约的赞助余额将被被替换。 在这种情况下，新的代付金额需要大于 `currentSponsorBalance + currentCollateral`。 前一个赞助者的余额和抵押物将被退还，剩余金额将会作为更换代付方后的代付余额(其中一部分将转换为存储点)。

### 白名单

`SponsorWhitelistControl`还会维护每个赞助合约的白名单。 只有在这个白名单上的地址才能在与合约交互时享受赞助的好处；否则，交易费用必须由交易的发送者支付。 这个白名单可以通过 `SponsorWhitelistControl` 中的 `addPrivilegeByAdmin` 和`removePrivilegeByAdmin` 方法来修改。

```js
function addPrivilegeByAdmin(address contractAddr, address[] memory addresses) public;
function removePrivilegeByAdmin(address contractAddr, address[] memory addresses) public;
```

这两个方法只能由合约的管理员调用，合约的管理员默认是合约的创建者。 更多详情可以参考 [`AdminControl`内置合约](./internal-contracts/admin.md)。

零地址**0x0000000000000000000000000000000000000000** 是一个特殊地址。 当它被添加到白名单里面时，所有地址都会被代付。

可以使用以下方法查询白名单的当前状态：

```js
// 如果用户在合约的白名单上，则返回 true
function isWhitelisted(address contractAddr, address user) public view returns (bool)
// 如果所有用户都在合约在白名单上，则返回 true
function isAllWhitelisted(address contractAddr) public view returns (bool)
```

## 常见问题解答

### 如何查询一个合约是否已经被赞助？

您可以调用 `SponsorWhitelistControl` 的查询方法来检查合约的代付信息。 例如，使用 `getSponsorForGas` 来检查 gas 费的代付方。

您可以使用 ConfluxScan 里面的的 [Read and Write Contract 页面](https://confluxscan.io/address/cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaegg2r16ar?tab=contract-viewer) 来调用这些查询方法。

### 为什么在我已经赞助了一个合约后我的交易仍然会失败？

导致交易失败的原因可能有以下几个：

1. Gas 上限设置得太低。
2. 代付方余额不足。
3. 白名单设置不正确。

### 为什么代付方余额低于我被代付的金额？

如果发生代付方更换的情况，原先的代付方的余额将被退还给原代付方。 合约内的剩余余额将更新为新的代付方余额。

对于存储代付，代付方余额的一部分将被转换为存储点。

### 未使用的 CFX 代付资金可以退款吗？

对于未使用的 CFX 代付资金的退款仅限于全额退款。 在任何情况下都不提供部分退款。 要启动全额退款，有两种选择：

1. 终止（销毁）已经设置了代付的合约。
2. 安排新的代付方替换现有的代付方。
