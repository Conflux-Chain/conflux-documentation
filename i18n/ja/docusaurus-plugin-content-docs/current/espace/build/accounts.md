---
sidebar_position: 5
title: eSpace Mapped Addresses(Cross Space)
description: Mapped addresses in cross-space operations
displayed_sidebar: eSpaceSidebar
---

## Overview

Conflux eSpace is an independent space that is logically isolated from the Core space on Conflux Network. Accounts in the eSpace have their own balance and status. To interact with the eSpace, you need to use hex40 addresses, which are different from [base32 addresses](../../core/core-space-basics/addresses.md) used for the Core space. You can transfer funds between your Core and eSpace wallets using a [bridge service](../../general/tutorials/transferring-funds/transfer-funds-across-spaces.md).

Conflux eSpace is a new feature introduced by Conflux Network in its V2 hard fork. It is an independent space that runs on the same underlying infrastructure as the Core space, but with different rules and specifications. In the eSpace, accounts follow the Ethereum account model and use hex40 addresses instead of [base32 addresses](../../core/core-space-basics/addresses.md). This means it is ok to use the same private key in core space and espace, but the account in core space and espace will have different addresses and will have their own balance and status.

Hex40 addresses are compatible with Ethereum addresses, which means that users can easily import their Ethereum wallets to Conflux eSpace and vice versa. Learn more about basic model of eSpace accounts and addresses at [Ethereum Accounts](https://ethereum.org/en/developers/docs/accounts/).

## Mapped Addresses in Cross-Space Operations

Although the two spaces are independent, atomic-crossing of CFX and data can be achieved through the `CrossSpaceCall` internal contract. The following three methods of this contract allow CFX transfers between the two spaces. Note that `CrossSpaceCall` (like other internal contracts) can only be accessed in the Conflux Core space.

```js
function transferEVM(bytes20 to) external payable returns (bytes memory output);
function mappedBalance(address addr) external view returns (uint256);
function withdrawFromMapped(uint256 value) external;
```

**Core to eSpace**: To transfer CFX from Conflux Core to Conflux eSpace, the `transferEVM(bytes20 to)` method of this contract needs to be called. The destination address of this transfer is specified by the method parameter `to`. The cross-space transfer will be executed in a single atomic step.

**eSpace to Core**: Each account in Core Space has a **mapped account** (hex40) in eSpace. To transfer CFX from Conflux eSpace to Conflux Core, two steps are required. First, transfer CFX to the mapped account (eSpace) that belongs to the destination account (Core Space). This action requires an eSpace transaction. Second, call the `withdrawFromMapped(uint256 value)` method of the `CrossSpaceCall` internal contract. This call with transfer the CFX from the mapped account back to the corresponding destination address.

### computation

The mapped address is calculated from the base32 address in Conflux Core through the following steps:

1. Convert the base32 address to hex format, and then convert to bytes type.
2. Keccak the bytes from the previous step to get the hash.
3. Take the last 160 bits of the hash and convert it to hex40 format, which is the mapped eSpace address.

`js-conflux-sdk v2.0` provides a method to get the mapped address of the base32 address:

```js
const { address } = require('js-conflux-sdk');
const base32Address = 'cfx:aak2rra2njvd77ezwjvx04kkds9fzagfe6ku8scz91';
const mappedAddress = address.cfxMappedEVMSpaceAddress(base32Address);
// 0x12Bf6283CcF8Ad6ffA63f7Da63EDc217228d839A
```

:::note

Notes about the mapped address:

1. The mapped address is an address in eSpace, so it has a hex40 format.
2. The purpose of the mapped address is to serve as a transit address when crossing CFX back to Core space.
3. **Remember NOT to convert the base32 address directly to hex40 format as the mapped address. This action will result in the loss of your assets**

:::

## Related Topics

* Cross space dApp tutorial: [Transferring Funds Across Spaces](../../general/tutorials/transferring-funds/transfer-funds-across-spaces.md)
