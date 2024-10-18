---
sidebar_position: 5
title: Sponsorship Mechanism
displayed_sidebar: coreSidebar
keywords:
  - Sponsorship Mechanism
  - Contratos Inteligentes
  - Gas Fees
  - Storage Collateral
  - SponsorWhitelistControl
  - Sponsor Balance
  - Whitelist
  - Gas Sponsorship
  - Storage Sponsorship
  - Transaction Fees
  - User Adoption
  - Contract Deployment
  - Sponsor Replacement
  - Storage Points
  - CIP-107
tags:
  - Sponsorship Mechanism
---

Conflux Core Space implements a sponsorship mechanism to subsidize the usage of smart contracts. Thus, a new account with zero balance is able to call smart contracts as long as the execution is sponsored (usually by the operator of Dapps). This mechanism is designed to reduce the barrier of entry for new users.
Pave the way for the mass adoption of blockchain.

## Introduction

In the blockchain world, it is very common to pay transaction fees when sending transactions. Ethereum has gas fees, and Conflux Core Space has not only gas fees but also storage collateral fees. Typically, these costs are paid by the sender of the transaction. However, new users in the blockchain world may not understand these concepts and may not have the tokens to pay these fees, creating a barrier to entry into the blockchain world. To lower this barrier, Conflux Core Space has introduced a sponsorship mechanism.

The sponsorship mechanism allows a contract to be sponsored. Once sponsored, the transaction fees incurred when the contract is called are paid by the sponsor, meaning that users do not need to worry about or pay these fees. The sponsor can be the owner of the contract or someone else. Imagine a `USDT` token deployed on Core Space that can be transferred by anyone without any fees – this is incredibly user-friendly for new users.

Both the gas and storage collateral for a transaction can be sponsored, and they support two different sponsors. For example, the gas fees for a contract could be sponsored by Sponsor A, while the storage collateral is sponsored by Sponsor B.

Note that only contracts can be sponsored; the sponsorship mechanism does not apply to regular accounts. This means that for standard CFX transfer transactions, the gas fees need to be paid by the sender.

## How to Sponsor a Contract

To sponsor a contract, the sponsor needs to call [SponsorWhitelistControl](./internal-contracts/sponsor-whitelist-control) internal contract. It also record the sponsorship information of smart contracts

### Gas Sponsorship

To sponsor the gas fees of a contract, you call the `setSponsorForGas` method of the `SponsorWhitelistControl`. This method has two parameters:

- `contractAddr`: The address of the contract to be sponsored.
- `upperBound`: The upper limit for gas fee sponsorship per transaction, measured in Drip, where 1 CFX = 10^18 Drip. If the gas fee (calculated as gasPrice \* gasLimit) for a transaction interacting with the same contract exceeds this limit, it cannot be sponsored.

Currently, the minimum gas fee on the Conflux Core network is 1 GDrip, which is 10^9 Drip. Typically, the gas for a transaction ranges from tens of thousands to several hundred thousand. Therefore, it's common to set the `upperBound` to around 5 million GDrip. This can be adjusted according to specific needs in special cases.

Additionally, the total amount of gas fees to be sponsored needs to be set through the `value` field of the transaction. This means that when calling this method, a CFX transfer must be made simultaneously. Moreover, each sponsorship amount should be sufficient to cover the gas fees for at least `1000 transactions` (1000 \* upperBound). For instance, if the upperBound is set to 1 million GDrip, then each sponsorship amount should be at least 1000 \* 1 million GDrip.

For example, to sponsor Contract A with a sponsorship upperbound of 1 million GDrip and a total sponsorship amount of 100 CFX, you would initiate a transaction calling `setSponsorForGas(A, 10^15)`, with the transaction's value field set to 100 CFX.

This built-in contract also provides several methods for querying sponsorship information of a contract:

1. `getSponsoredGasFeeUpperBound`: To query the upper limit of gas fee sponsorship for a contract.
2. `getSponsoredBalanceForGas`: To query the remaining balance of gas fee sponsorship for a contract.
3. `getSponsorForGas`: To query the sponsor of the gas fee for a contract.

If a sponsor already exists for the contract when calling `setSponsorForGas`, and if the new sponsor is the same as the current one, the sponsorship balance for the contract will be topped up. If the new sponsor is different, a replacement will occur. In this case, the amount of sponsorship needs to be greater than `currentSponsorBalance + 1000 * upperBound`. The balance of the previous sponsor will be refunded, and the remaining amount will serve as the sponsorship balance after the change of sponsor.

### Storage Sponsorship

To sponsor the storage collateral of a contract, you can call the `setSponsorForCollateral` method of the `SponsorWhitelistControl`. This method has only one parameter:

- `contractAddr`: The address of the contract to be sponsored.

The **total amount** of sponsorship is also specified through the `value` of the transaction. According to CIP-107, a portion of the sponsorship (currently 50%) is converted into storage points after the sponsorship is set. Both storage points and the storage sponsorship balance can be used to pay for the contract's storage collateral fees, with the storage sponsorship balance being used first.

This built-in contract also provides several methods for querying sponsorship information of a contract:

1. `getSponsoredBalanceForCollateral`: To query the remaining balance of storage collateral sponsorship for a contract.
2. `getSponsorForCollateral`: To query the sponsor of the storage for a contract.
3. `getAvailableStoragePoints`: To query the remaining balance of storage points sponsored for a contract.

Similarly, if a sponsor already exists for the contract when calling `setSponsorForCollateral`, and if the new sponsor is the same as the current one, the sponsorship balance for the contract will be topped up. If the new sponsor is different, a replacement will occur. In this case, the amount of sponsorship needs to be greater than `currentSponsorBalance` + `currentCollateral`. The balance and collateral of the previous sponsor will be refunded, and the remaining amount will serve as the sponsorship balance after the change of sponsor (a portion of which will be converted into storage points).

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

## FAQs

### How to check if a contract is sponsored?

You can call `SponsorWhitelistControl`'s query methods to check the sponsorship information of a contract. For example, `getSponsorForGas` to check the gas sponsor.

You can use ConfluxScan's [Read and Write Contract page](https://confluxscan.io/address/cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaegg2r16ar?tab=contract-viewer) to call the query methods.

### Why Did My Transaction Fail Even After I Sponsored a Contract?

There are several reasons that may cause the transaction to fail:

1. Upperbound is too small.
2. The sponsor balance is not enough.
3. The whitelist is not set correctly.

### Why is the Sponsor Balance Lower than the Amount I Sponsored?

If sponsor replacement happens, the previous sponsor balance will be returned to the sponsor. The remaining balance will be used as the new sponsor balance.

And for the storage sponsorship, part of the sponsor balance will be converted to storage points.

### Can Unused CFX Sponsorship Funds be Refunded?

Refunds for unused CFX in sponsorship are restricted to full refunds. Partial refunds are not available under any circumstances. To initiate a full refund, there are two options:

1. Terminate (destroy) the sponsored contract.
2. Arrange for a new sponsor to replace the existing one.
