---
sidebar_position: 1
title: AdminControl
displayed_sidebar: coreSidebar
---

## Overview

The `AdminControl` contract is a debug tool for contract development. When a contract is created during a transaction, the sender for the current transaction will become the contract admin automatically.

The `admin` address can transfer the administrator rights to another **normal address** or **zero address** by calling interface `setAdmin(address contractAddr, address newAdmin)`. A contract can never be an admin.

The admin of a contract has several administrator rights. It can call interface `destroy(address contractAddr)` to destroy contract, just like a contract calling `suicide()` function. The SponsorWhitelist internal contract provides some functions can only be called by admin address. These functions can update the whitelist in sponsor mechanism. They will be introduced later.

**Note: For all the interfaces requiring administrator rights, no matter the execution success or not, no error or exception will be triggered during internal contract execution.** For example, if a non-admin address tries to transfer the admin address to itself, this transaction will success but nothing will be changed.

ConfluxScan may mark a contract as debug mode if the contract has non-zero admin address. **So remember, if you think the contract is ready for production environment, you should set admin address to zero.**


The `AdminControl` contract also provides a query interface `getAdmin(address contractAddr)` which can be called by anyone.

**Corner cases:**
1. The admin is set at the start of contract creation. So if sender `A` creates contract `B` and set admin to `C` during contract construction, the admin will be `C` when the contract is deployed.
2. However, if sender `A` calls contract `B`, then contract `B` creates contract `C` and then set admin to `D` during contract contraction, then the set will fail because the admin of `C` is `A` and the sender for creating `C` is `B`.
3. But, Conflux introduces a special policy. In case 2, if `D` is zero address, the set admin will success. This means that a contract can declare "I don't need admin" during contract creation.

## Examples

Consider you have deployed a contract whose address is `contract_addr`. The administrator can call `AdminControl.setAdmin(contract_addr, new_admin)` to change the administrator and call `AdminControl.destroy(contract_addr)` to kill the contract.

```javascript
const PRIVATE_KEY = '0xxxxxxx';
const cfx = new Conflux({
  url: 'https://test.confluxrpc.com',
  logger: console,
  networkId: 1,
});
const account = cfx.wallet.addPrivateKey(PRIVATE_KEY); // create account instance

const admin_contract = cfx.InternalContract('AdminControl')
// to change administrator
admin_contract.setAdmin(contract_addr, new_admin).sendTransaction({
  from: account,
}).confirmed();

// to kill the contract
admin_contract.destroy(contract_addr).sendTransaction({
  from: account,
}).confirmed();
```
