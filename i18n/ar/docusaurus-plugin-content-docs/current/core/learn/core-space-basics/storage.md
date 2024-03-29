---
sidebar_position: 3
title: Storage
keywords:
  - storage
displayed_sidebar: coreSidebar
---

Conflux introduced the Collateral for storage (CFS) mechanism as a pricing method for using storage. Compared with the one-time storage fee in Ethereum, the CFS mechanism will be more fair and reasonable. In principle, this mechanism requires a certain amount of funds to be locked as collateral to occupy storage space. Before the corresponding storage space is released or covered by others, the collateral will be locked, and the corresponding interest generated by the locked collateral will be directly allocated to the miners for the maintenance of the storage space. Therefore, the storage cost of Conflux also depends on the length of time the storage space is occupied. Conflux specifically introduced this mechanism in detail in chapter 7 of its [Conflux_Protocol_Specification](https://confluxnetwork.org/files/Conflux_Protocol_Specification.pdf).

In the Conflux network, each storage entry occupies a space of 64B (B is Bytes, byte), which is also the size of the key/value pair in the world state. It should be noted that the key in the blockchain is generally 256bits long and the value It is also 256bits long (each is 32B long, and the total is 64B long). The deposit required for storage is proportional to the minimum multiple of 64B that can cover all stored items. For each storage entry, the last account that writes to the entry is called the owner of the storage entry. If a storage item is written during the execution of contract C, and a guarantor provides guarantee for it, then C is regarded as the writer of the item and accordingly becomes the owner of the item (see section 7.1 for details). In the world state, during the entire life cycle of a storage item, the owner of the item must lock a fixed amount of CFX as a storage deposit for the storage space. Specifically, for each storage entry with a size of 64B, its owner will be locked by 1/16CFX. For occupying `1KB` space, you will pay `1CFX` as a deposit, and the corresponding formula is as follows:


![Locale Dropdown](./img/storage-formula-635173b54f6e13ba21a689cc691d4ecd.png)


When account α becomes the owner of a stored entry (whether it is created or modified), α should immediately lock 1/16 CFX for the entry. If α has enough balance, then the required deposit will be automatically locked, otherwise if α does not have enough balance, the operation will fail and α cannot create or modify the entry.

When a storage item is deleted from the world state, the corresponding 1/16 CFX deposit will be unlocked and returned to the item owner's balance. If the ownership of a storage item changes, the 1/16 CFX deposit of the old owner is unlocked, and the new owner must lock 1/16 CFX as the deposit at the same time. It is worth mentioning that the deposit refund is "quietly" added to the balance, and there is no transfer transaction available for inquiry.

## How to use storage collateral

When users send a Conflux transaction, they need to fill in a `storageLimit` field (in bytes). Storage limit plays the same role for storage as gas limit does for execution. The upper limit stipulates that the deposit increase of the deposit payer before and after the transaction is executed shall not exceed the `storage upper limit` multiplied by 1/1024 CFX. If this value is filled in too low, it will cause the deposit to exceed the upper limit after execution and the execution will fail. Therefore, in general, this field needs to be set to a value larger than the actual usage, and the excess part will not generate storage mortgage. However, it is not recommended to fill in too high, because it may cause the sender's balance to be insufficient to pay the deposit, which may result in transaction failure. Fullnode provides the RPC method `cfx_estimateGasAndCollateral` to estimate the storage size that a transaction will use.

After the transaction is executed, the `Receipt` contains several fields about storage changes:

* `storageCollateralized` This is the amount of data that is stored and collateralized
* `storageCoveredBySponsor` Whether the storage mortgage for this transaction is sponsored by the sponsor
* `storageReleased` The storage released by this transaction

You can use the `cfx_getCollateralForStorage` method to query the storage size currently mortgaged by an address, the unit is bytes, and the value divided by 1024 is the amount of CFX storage mortgaged. In addition, it can also be obtained through the `cfx_getAccount` method, and the returned information contains the `collateralForStorage` field.

### Sponsorship Mechanism and Storage Points

Conflux implements a [sponsorship mechanism](./internal-contracts/sponsor-whitelist-control.md) to subsidize the usage of smart contracts. Thus, a new account with zero balance is able to call smart contracts as long as the execution is sponsored.

As is mentioned above, CFX acts as collateral when utilizing storage space. And if the storage space in use is freed or its ownership changes, the collateralized CFX is refunded. However, circumstance slightly changes for storage collateral sponsorship with the activation of [CIP-107 DAO-Adjustable Burn of Storage Collateral](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-107.md).

When a sponsor adds storage collateral for a contract, `p` proportion (starts at 0.5 and can be adjusted by [On-Chain DAO Vote for Chain Parameters](./internal-contracts/params-control.md)) of the CFX tokens will be burned and corresponding amount of "storage point" will be minted. The converted CFX is permanently burned and non-refundable under all circumstances, including situations where the contract is destroyed or the sponsor is replaced. For every 1 CFX burned, 1024 storage points will be generated. These storage points are non-transferrable and won't generate storage interest but can be used to cover storage collateral costs.

:::note

Sponsor collateral balances are prioritized for usage over storage points.

:::

Refer to [sponsorship mechanism](./internal-contracts/sponsor-whitelist-control.md) or [CIP-107 DAO-Adjustable Burn of Storage Collateral](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-107.md) for more information of the mentioned mechanisms.
