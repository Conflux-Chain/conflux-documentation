---
sidebar_position: 5
title: Sponsorship Mechanism
displayed_sidebar: coreSidebar
---

Conflux Core Space implements a sponsorship mechanism to subsidize the usage of smart contracts. Thus, a new account with zero balance is able to call smart contracts as long as the execution is sponsored (usually by the operator of Dapps). This mechanism is designed to reduce the barrier of entry for new users.
Pave the way for the mass adoption of blockchain.

## Introduction

在区块链世界, 发送交易支付交易费非常常见, 以太坊有 gas 费, Conflux Core Space 不仅有 gas 费, 还有存储抵押费用. 通常情况下, 这些费用是有交易发送者来支付的. 但是区块链世界的新用户不理解这些概念, 也没有代币来支付这些费用, 这就成为了新用户进入区块链世界的一个门槛. 为了降低这个门槛, Conflux Core Space 引入了赞助机制.

赞助机制允许一个合约被赞助, 赞助后的合约在被调用时, 交易费用由赞助者支付, 用户则不需要关心和支付此费用. 赞助者可以是合约的拥有者, 也可以是其他人. 想象一下, 一个部署在 Core Space 的 `USDT` token 可以被任何人零费用转账, 这对于新用户来说是多么友好.

交易的 gas 和 storage collateral 都是可以被赞助的, 且支持两个不同的赞助者. 例如, 一个合约的 gas 费用由 A 赞助, 而 storage collateral 由 B 赞助. 

注意, 只有合约可以被赞助, 赞助机制不适用于普通账户. 意味着普通的 CFX 转账交易, gas 需要由发送者支付.

## How to Sponsor a Contract

To sponsor a contract, the sponsor needs to call [SponsorWhitelistControl](./internal-contracts/sponsor-whitelist-control.md) internal contract. It also record the sponsorship information of smart contracts

### Gas Sponsorship

通过调用 `SponsorWhitelistControl` 的 `setSponsorForGas` 方法来赞助一个合约的 gas 费用. 该方法有两个参数:

* contractAddr: 要进行赞助的合约地址
* upperBound: 单笔交易燃气费赞助上限, 单位为 Drip, 1 CFX = 10^18 Drip. 如果同合约交互时, 交易的燃气费(gasPrice * gasLimit)超过此上限, 将无法被赞助.

当前 Conflux Core 网络的最低燃气费为 1 GDrip, 即 10^9 Drip. 通常一笔交易的 gas 为几万到几十万不等. 所以 upperBound 一般设置为 500w GDrip 即可. 特殊情况可根据需求调整.

另外赞助的燃气总金额, 需要通过交易的 `value` 字段来设置. 即在调用此方法时, 需要同时进行 CFX 转账. 且每次赞助的金额需要至少满足 `1000 次`交易(1000 * upperBound)的燃气费用. 即如果 upperBound 设置为 100w GDrip, 则每次赞助的金额至少为 1000 * 100 GDrip.

例如, 赞助合约 A, 并指定燃气上限为 100w GDrip, 总共赞助金额为 100 CFX, 则需要发起一笔调用 `setSponsorForGas(A, 10^15)` 的交易, 且交易的 value 字段为 100 CFX.

该内置合约同时提供了多个方法用于查询合约的赞助信息:

1. `getSponsoredGasFeeUpperBound`: 查询合约的燃气费赞助上限
2. `getSponsoredBalanceForGas`: 查询合约的燃气费赞助余额
3. `getSponsorForGas`: 查询合约的燃气费赞助者

如果在调用 `setSponsorForGas` 时, 合约已经有了赞助者, 如果与当前赞助者相同. 则会对合约的赞助余额进行追加. 如果不同, 则会发生替换, 此时赞助的金额需要大于 `currentSponsorBalance + 1000 * upperBound`. 其中上一个赞助者的余额会返还回去, 剩下的部分会作为更换赞助者之后的赞助余额.

### Storage Sponsorship

通过调用 `SponsorWhitelistControl` 的 `setSponsorForCollateral` 方法来赞助一个合约的存储抵押. 该方法只有一个参数:

* contractAddr: 要进行赞助的合约地址

赞助的**总金额**同样通过交易的 value 进行指定. 根据 CIP-107, 赞助设置后其中部分(目前是 50%)会被转换为存储积分, 存储积分和存储赞助余额都可以用来支付合约的存储抵押费用, 其中存储赞助余额会优先使用.

该内置合约同时提供了多个方法用于查询合约的赞助信息:

1. `getSponsoredBalanceForCollateral`: 查询合约的存储抵押赞助余额
2. `getSponsorForCollateral`: 查询合约的存储赞助者
3. `getAvailableStoragePoints`: 查询合约赞助的存储积分余额

同样如果在调用 `setSponsorForCollateral` 时, 合约已经有了赞助者, 如果与当前赞助者相同. 则会对合约的赞助余额进行追加. 如果不同, 则会发生替换, 此时赞助的金额需要大于 `currentSponsorBalance` + `currentCollateral`. 其中上一个赞助者的赞助余额和抵押会返还回去, 剩下的部分会作为更换赞助者之后的赞助余额(部分会被转换为存储积分).

### Whitelist

`SponsorWhitelistControl` 还为每个被赞助的合约维护了一个白名单, 只有在白名单的地址跟合约交互时才能享受赞助, 否则交易费只能由发送者支付. 该白名单可以通过 `SponsorWhitelistControl` 的 `addPrivilegeByAdmin` 和 `removePrivilegeByAdmin` 方法进行修改. 

```js
function addPrivilegeByAdmin(address contractAddr, address[] memory addresses) public;
function removePrivilegeByAdmin(address contractAddr, address[] memory addresses) public;
```

这两个方法只能由合约的管理员调用, 默认情况下, 合约的管理员是合约的创建者. 具体可以参看 [`AdminControl` 内置合约](./internal-contracts/admin.md).

零地址 **0x0000000000000000000000000000000000000000** 是一个特殊地址, 加入白名单后, 所有地址都可以享受赞助.

白名单的当前状态可以通过如下方法查询:

```js
// return true if the user is whitelisted for the contract
function isWhitelisted(address contractAddr, address user) public view returns (bool)
// return true if all users are whitelisted for the contract
function isAllWhitelisted(address contractAddr) public view returns (bool)
```

## FAQs

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
