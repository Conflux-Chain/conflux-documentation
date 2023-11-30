---
sidebar_position: 8.5
id: transaction_explain
title: Transactions
keywords:
  - transaction
displayed_sidebar: coreSidebar
---

The act of sending a transaction is the only method of storing or modifying data on the blockchain. This includes both the transfer of CFX and the modification of contract states. The process of sending a transaction consists of three steps: constructing the transaction, signing it, and finally transmitting it. Most programming languages have an [SDK](../../build/sdks-and-tools/sdks.md) with a convenient method that can be used for this purpose. However, if you are looking for a deeper understanding of the underlying mechanics or if you are experiencing problems when sending transactions, this article may help.

## Transaction Fields

In order to construct a transaction, the following fields are required:

* `from`
* `to`
* `value`
* `nonce`
* `data`
* `gas`
* `gasPrice`
* `storageLimit`
* `chainId`
* `epochHeight`

### Basic fields

The `from`, `to`, and `value` are the basic fields of a transaction. These fields correspond to the address of sender account, address of the receiver account and the amount to be transferred, respectively.

The `from` field identifies the sender of the transaction. Essentially, the 'from' field tells you who is initiating the transaction and who is paying for the transaction. And in the [Signing](#Signing) phase, the transaction will be signed with the private key of the `from` account, so you cannot specify arbitary address as the sender. It is also important to remember that the account must have a sufficient balance to cover both the transfer amount (`value` field) and the transaction fee, otherwise the RPC will reject the transaction and it will not be sent. It's worth mentioning that in some specific cases, Conflux's sponsor mechanism can allow for other accounts to pay the transaction fee, allowing accounts with 0 balance to send transactions.

> In fact, the `from` field is not directly included in an encoded transaction. Generally speaking, tools such as SDKs will remove the `from` field from transaction before encoding and sign the transaction using corresponding private key. Others can recover the sender from the signature of the transaction.

The `to` field indicates the recipient account of the transaction. If you are making a simple CFX transfer, this field should be set to the CFX recipient's account. If you are modifying the state of a contract, the to field should be set to the address of the contract. If you are deploying a new contract, the to field is left empty.

The `value` field represents the amount of CFX to be transferred and must be set as an integer in the unit of Drip (10**-18 CFX).

### nonce

The `nonce` is the execution sequence number of transactions sent from an account. The correct value of this field can be queried using the `cfx_getNextNonce` RPC method. And here are some details about the nonce mechanism:

1. The execution of transactions on the blockchain is in the order of nonce from small to large.
2. The initial value of nonce is 0, and the nonce is incremented by 1 for each transaction execution.
3. The nonce cannot be reused.
4. The nonce cannot be skipped: Suppose that the current nonce of an account is n. If the nonce of the transaction is m such that m > n, then the transaction will not be executed until all transactions with nonce < m have been executed.
5. After the transaction is sent via the `cfx_sendRawTransaction` method, it will not be executed immediately. You must wait for the miner to pack it first. Once packed, it will be executed with a delay of 5 epochs. After the transaction is executed, the nonce of the account will be increased by one.

A transaction with incorrect nonce won't be included in blockchain, so correctly setting the nonce is critical to transaction execution. A common issue for developers is that a transaction was sent but its receipt (indicating transaction is executed) is not available, which case is typically due to an accidentally skipped nonce. This results in the transaction being stuck in the transaction pool, waiting for previous transactions to be executed first.

When using an SDK to construct a transaction, value of nonce field do not need to be set manually as the SDK will automatically query it using `cfx_getNextNonce`. However, if multiple transactions are sent at once, the nonce values may be reused because the return value of `cfx_getNextNonce` is not updated immediately after the previous transaction is sent. To avoid this, the developer is advised to manage the nonce manually by recording the transaction hash, incrementing the nonce by 1, and using the updated value to construct subsequent transactions.

### Fee-related fields

In the Conflux network, transactions are processed by miners who charge a fee for their service. This fee incentivises miners to participate in the network and keep it running smoothly. The fees are paid in CFX and are specified by the transaction initiator through the `gas`, `gasPrice` and `storageLimit` fields in the transaction.

The `gas` field represents the maximum amount of gas that can be used to execute the transaction. If the actual amount of gas consumed during the execution exceeds this limit, the transaction will fail. And if the actual consumption was less than the `gas` set, the sender must pay at least 75% of the `gas`, and up to 25% can be refunded, which means setting the `gas` too high is not encouraged. The gas consumption depends on the complexity of the contract code (or `21000` if it is a simple transfer transaction) and can be estimated using the `cfx_estimateGasAndCollateral` method, which returns the `gasUsed`, `gasLimit` and `storageCollaterized` fields. It is recommended to use `gasLimit` as the `gas` field.

The `gasPrice` field is the amount of Drip(10**-18 CFX) the sender is willing to pay per unit of gas, and should be greater than 1G(10**9). As Conflux default setting, miners prioritise transactions with higher `gasPrice`, and the `gasPrice` can be increased to speed up the processing of a stuck transaction. The `cfx_gasPrice` method provides a reasonable gas price based on network conditions.

In addition to transaction fees, the Conflux network requires the pledging of CFX for occupying new storage space or modifying existed storage during a transaction. The pledged CFX generates a 4% annual interest, which is paid to miners to subsidise their storage costs. When the occupied space is released or modified by others, the pledged CFX is returned. The `storageLimit` field specifies the upper limit of the storage space that can be occupied by a transaction. And it is recommended to use the `storageCollaterized` field of returned value from `cfx_estimateGasAndCollateral` as the `storageLimit` field.

:::info

Refer to [storage](./storage.md) for more information.

:::

When sending a transaction, the sender must ensure that there is sufficient balance to cover the `value + storageLimit * (10^18/1024) + gas * gasPrice`. If the balance is insufficient, the transaction will be rejected by nodes. If the transaction is [sponsored](./internal-contracts/sponsor-whitelist-control.md), the sender only needs to ensure sufficient funds for the value cost. The current SDK provides methods to automatically set reasonable values for `gas`, `storageLimit`, and `gasPrice`, but users can also specify these values manually.

### data

The data field of the transaction can be left blank or set to a hex-encoded byte array. This can be roughly categorized into three situations:

* Regular CFX transfer transaction: The `data` field is usually blank, but hex-encoded data can be set as a transaction remark or postscript.
* Contract deployment transaction: `data` needs to be set as the contract's bytecode and the parameters of the constructor (if any)
* Contract call transaction: The `data` field is used to store the input data for the contract to call. The data is usually the contract method and data after parameter abi encoding. (When sending CFX to a contract, the data field is usually left blank)

Smart contracts are usually written in high-level contract development languages (Solidity, vyper). You can use a compiler to obtain bytecode and abi. SDK will provide abi encoding methods for the encoding of the contract method call (encoding the method name and parameters).

### Other Fields

The `chainId` field in transactions is used to identify the specific chain. For example, the current chainId of the Conflux network is 1029 and that of the Conflux testnet is 1. This field is included in transactions primarily to prevent replay attacks. It's generally not necessary to fill in this field manually, as the SDK will automatically obtain the current RPC chainId through the `cfx_getStatus` method.

The `epochHeight` field is used to specify the target epoch range for a transaction. Transactions will only be executed within the range of [epochHeight - 100000, epochHeight + 100000]. If the epoch of the current chain exceeds this range, the transaction will be discarded. The SDK will also automatically set this field to the current epoch obtained by the `cfx_epochNumber` method.

## Transaction signing and encoding

After every field of a transaction is prepared, following steps are required before it can be sent using the `cfx_sendRawTransaction` method (don't worry, these steps are already implemented by wallets or SDKs):

1. Prepare hash for signing: do RLP encoding in the order of `(nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data)` and then apply the `keccak256` operation to the encoded result to obtain a hash.
2. Signing: sign the hash obtained in the previous step using the private key of the sending account and perform the ecdsaSign signature operation to obtain the values for `r, s, v`.
3. Transaction Encoding: Do RLP encoding in the order of `((nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data), v, r, s)` and convert it into a hexadecimal string.

## Differences between Conflux and Ethereum

Compared to Ethereum `155 transaction`, transactions through Conflux have several differences:

* Fields are different: with 2 more field `storageLimit`, and `epochHeight`.
* Differences when encoding transactionss:
  1. The RLP structure to compute transaction hash is `[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data]`
  2. The RLP structure of a rawTx is `[[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data], v, r, s]`
* The `v` value signed by ecdsaSign will not be specifically modified in Conflux, while in Ethereum, there will be some special treatments to the v value.

## Related topics

- [cfx_sendRawTransaction](../../build/json-rpc/cfx-namespace.md#cfx_sendrawtransaction)
- [why transaction is pending](../../../general/faq/core-space-transactions/why-transaction-is-pending.md)
