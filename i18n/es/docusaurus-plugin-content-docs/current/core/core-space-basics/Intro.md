---
sidebar_position: 0
title: Intro
displayed_sidebar: coreSidebar
tags:
  - Core Space
  - Base32 Address
  - CFX
  - Gas
  - Storage
  - Sponsorship
  - CVM
  - Internal Contracts
  - Smart Contract Platform
  - Ethereum Compatibility
  - Fluent Wallet
  - Drip
  - GDrip
---

We will give you a quick introduction to Core Space. It is a smart contract platform kind of like Ethereum. If you are familiar with Ethereum, this guide will help you understand Core Space quickly.

## Base32 Address

Core Space uses Base32 address instead of hex address. The Base32 address is a base32-encoded string that starts with `cfx` or `cfxtest`. Por ejemplo:

- cfx:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg
- cfxtest:aarc9abycue0hhzgyrr53m6cxedgccrmmy8m50bu1p

Check [Address](./addresses) for more details. Additionally, the recommended wallet for Core Space is [Fluent](https://fluentwallet.com/).

## CFX

CFX is the native token of Core Space which can be used to pay for gas and storage. `Drip` is the smallest unit of `CFX`. 1 CFX = 10^18 Drip. `GDrip` is a middle unit of CFX. 1 CFX = 10^9 GDrip.

## Gas & Storage

Core Space incorporates a gas mechanism, akin to the one used in Ethereum, detailed further in the [gas mechanism overview](../../general/conflux-basics/gas). Additionally, it employs a storage collateral mechanism that serves as a pricing strategy for utilizing contract storage space. For more in-depth information, refer to the [storage specification](./storage).

## Sponsorship

Core Space features a unique sponsorship mechanism. This system enables users to cover the gas fees as well as storage collateral for other users, facilitating a more collaborative environment. For an in-depth understanding of this mechanism, please refer to [Sponsorship](./sponsor-mechanism).

## CVM

At the heart of Core Space is the Conflux Virtual Machine (CVM). While it largely aligns with the Ethereum Virtual Machine (EVM), there are notable differences. To explore these distinctions in detail, visit [CVM Differences](./vm-difference).

## Internal Contracts

Core Space is equipped with several internal contracts. These contracts are integral in providing foundational functions for the platform. For comprehensive information about these contracts, please consult [Internal Contracts](./internal-contracts) for more details.
