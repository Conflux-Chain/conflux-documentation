---
sidebar_position: 0
title: Intro
displayed_sidebar: coreSidebar
---

We will give you a quick introduction to Core Space. It is a smart contract platform kind of like Ethereum. If you are familiar with Ethereum, this guide will help you understand Core Space quickly.

## Base32 Address

Core Space uses Base32 address instead of hex address. The Base32 address is a base32 encoded string that starts with `cfx` or `cfxtest`. For example:

* cfx:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg
* cfxtest:aarc9abycue0hhzgyrr53m6cxedgccrmmy8m50bu1p

Check [Address](./addresses.md) for more details. Core Space's wallet is [Fluent](https://fluentwallet.com/)

## CFX

CFX is the native token of Core Space. It is used to pay for gas and storage. `Drip` is the smallest unit of `CFX`. 1 CFX = 10^18 Drip. `GDrip` is a middle unit of CFX. 1 CFX = 10^9 GDrip.

## Gas & Storage

Core Space has a gas mechanism. It is similar to Ethereum's gas mechanism. It also has a storage mechanism as a **pricing method for using storage**, check [storage specification](./storage.md) for details.

## Sponsorship

Core Space has a sponsorship mechanism. It allows users to pay for the gas fee of other users. Check [Sponsorship](./sponsorship.md) for more details.

## CVM

Core Space has a virtual machine called CVM. It is compatible with EVM in most cases, but there are some differences. Check [CVM Differences](./vm-difference.md) for more details.

## Internal Contracts

Core Space has several internal contracts. They are used to provide some basic functions. Check [Internal Contracts](./internal-contracts.md) for more details.