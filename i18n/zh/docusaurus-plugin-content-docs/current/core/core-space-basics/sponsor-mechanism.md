---
sidebar_position: 3
title: 赞助机制
displayed_sidebar: coreSidebar
---

Conflux Core 空间实现了赞助机制，来补贴智能合约的使用。 这允许余额为零的新账户调用智能合约，前提是执行操作得到赞助（通常由Dapp运营者提供）。 这个机制旨在降低新用户的入门门槛。
为区块链的大规模应用铺平道路。

## 简介

在区块链世界中，发送交易时支付交易费是非常常见的。 以太坊有燃气费，而Conflux Core Space不仅有燃气费，还有存储抵押费。 通常，这些费用由交易的发送方支付。 然而，很多刚进入区块链世界的新用户可能不理解这些概念，没有代币来支付这些费用，从而构成进入区块链世界的障碍。 为了解决这种障碍，Conflux Core Space引入了赞助机制。

赞助机制允许合约得到赞助。 一旦进行赞助，调用合约时产生的交易费用将由赞助方支付，这意味着用户无需担心或支付这些费用。 赞助方可以是合约的所有者或其他任何人。 想象一下，一个部署在 Core Space 上的 `USDT` 代币，任何人都可以在无需支付任何费用情况下进行转账 —— 这对于新用户来说非常友好。

交易的 gas 费和存储抵押都可以被赞助，并且它们可以由两个不同的赞助方赞助。 例如，合约的燃气费可以由赞助方A赞助，而存储抵押由赞助方B赞助。

请注意，只有合约可以被赞助；赞助机制不适用于普通账户。 这意味着对于标准的CFX转账交易，燃气费需要由发送方支付。

## 如何赞助智能合约

要赞助合约，赞助方需要调用 [SponsorWhitelistControll](./internal-contracts/sponsor-whitelist-control) 内置合约。 它还会记录智能合约的赞助信息。

### 燃气费赞助

要赞助合约的燃气费用，您可以调用 `SponsorWhitelistControl` 的 `setSponsorForGas` 方法。 此方法有两个参数：

- `contractAddr`：要赞助的合约地址。
- `upperBound`: 每笔交易中的 gas 赞助上限值, 以 Drip 为单位, 1 CFX = 10^18 Drip。 如果与同一智能合约交互的交易产生的 gas 费用 (按 gasPrice \* gasLimit 计算)超过了这一限额，则不能获得赞助。

目前， Conflux Core 网络中的最小的 gas 费用是 1 Gdrip，也就是10^9 Drip。 通常情况下，一笔交易的 gas 开销从数万到数十万不等。 因此，`upperBound` 通常被设定为 500万 GDrip 左右。 特殊情况下，这个数值可以根据具体需求加以调整。

Additionally, the total amount of gas to be sponsored needs to be set through the `value` field of the transaction. 这意味着在调用此方法时，必须同时进行 CFX 转账。 此外，每笔赞助金额应足以支付至少 `1000笔交易`（1000 \* upperBound）的gas费用。 For instance, if the upperBound is set to 1 million GDrip, then each sponsorship amount should be at least 1000 \* 1 million GDrip.

For example, to sponsor Contract A with a gas limit of 1 million GDrip and a total sponsorship amount of 100 CFX, you would initiate a transaction calling `setSponsorForGas(A, 10^15)`, with the transaction's value field set to 100 CFX.

这个内置合约还提供了几种方法来查询合约的赞助信息：

1. `getSponsoredGasFeeUpperBound`: To query the upper limit of gas fee sponsorship for a contract.
2. `getSponsoredBalanceForGas`：查询合约被赞助的 gas 费剩余余额。
3. `getSponsorForGas`：查询合约 gas 费的赞助者。

如果在调用 `setSponsorForGas` 时合约已经有了赞助者，并且新的赞助者与当前赞助者相同，合约的赞助余额将会增加。 如果新的赞助者发生变动，合约的赞助余额将被被替换。 在这种情况下，赞助金额需要大于 ` currentSponsorBalance + 1000 * upperBound`。 前一个赞助者的赞助余额将被退还，剩余金额将更换为赞助者后的赞助余额。

### 关于存储的赞助

要赞助合约的存储抵押，可以调用 `SponsorWhitelistControl` 里面的 `setSponsorForCollateral` 方法。 这个方法只需要一个参数：

- `contractAddr`：想要赞助的合约地址。

赞助的**总金额**也可以通过交易的 value 来指定。 根据 CIP-107，赞助金额设定后，其中的一部分(当前为 50% )将转换为存储点。 存储点和存储赞助余额都可以用来支付合约存储抵押物的费用，存储赞助余额会被优先使用。

这个内置合约还提供了几种方法来查询合约的赞助信息：

1. `getSponsoredBalanceForCollateral`：查询合约存储抵押赞助的剩余余额。
2. `getSponsorForCollateral`：查询合约存储的赞助者。
3. `getAvailableStoragePoints`：查询合约的存储点的剩余余额。

类似的，如果在调用 `setSponsorForCollateral` 时合约已经有了赞助者，且新赞助者与当前赞助者相同，则合约的赞助余额将增加。 如果新的赞助者发生变动，合约的赞助余额将被替换。 In this case, the amount of sponsorship needs to be greater than `currentSponsorBalance` + `currentCollateral`. The balance and collateral of the previous sponsor will be refunded, and the remaining amount will serve as the sponsorship balance after the change of sponsor (a portion of which will be converted into storage points).

### Whitelist

`SponsorWhitelistControl` also maintains a whitelist for each sponsored contract. Only addresses on this whitelist can enjoy the benefits of the sponsorship when interacting with the contract; otherwise, the transaction fees must be paid by the sender. This whitelist can be modified using the `addPrivilegeByAdmin` and `removePrivilegeByAdmin` methods of `SponsorWhitelistControl`.

```js
function addPrivilegeByAdmin(address contractAddr, address[] memory addresses) public;
function removePrivilegeByAdmin(address contractAddr, address[] memory addresses) public;
```

These two methods can only be called by the administrator of the contract, who by default is the creator of the contract. For more details, you can refer to the [`AdminControl` built-in contract](./internal-contracts/admin.md).

The zero address **0x0000000000000000000000000000000000000000** is a special address. When added to the whitelist, it allows all addresses to enjoy the sponsorship benefits.

The current status of the whitelist can be queried using the following methods:

```js
// return true if the user is whitelisted for the contract
function isWhitelisted(address contractAddr, address user) public view returns (bool)
// return true if all users are whitelisted for the contract
function isAllWhitelisted(address contractAddr) public view returns (bool)
```

## 常见问题解答

### How to check if a contract is sponsored?

You can call `SponsorWhitelistControl`'s query methods to check the sponsorship information of a contract. For example, `getSponsorForGas` to check the gas sponsor.

You can use ConfluxScan's [Read and Write Contract page](https://confluxscan.io/address/cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaegg2r16ar?tab=contract-viewer) to call the query methods.

### I sponsored a contract, but the transaction still failed. Why?

There are several reasons that may cause the transaction to fail:

1. Upperbound is too small.
2. The sponsor balance is not enough.
3. The whitelist is not set correctly.

### Why the sponsor balance is small than what I sponsored?

If sponsor replacement happens, the previous sponsor balance will be returned to the sponsor. The remaining balance will be used as the new sponsor balance.

And for the storage sponsorship, part of the sponsor balance will be converted to storage points.
