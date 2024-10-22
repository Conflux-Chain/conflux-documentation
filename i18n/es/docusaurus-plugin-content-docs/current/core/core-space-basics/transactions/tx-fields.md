---
sidebar_position: 1
title: Transaction Fields
displayed_sidebar: coreSidebar
keywords:
  - Transaction Fields
  - from
  - to
  - value
  - nonce
  - data
  - gas
  - gasPrice
  - storageLimit
  - chainId
  - epochHeight
  - CFX Transfer
  - Smart Contract Interaction
  - Contract Deployment
  - Transaction Encoding
  - Tarifa de gas (Gas Fee)
  - Storage Fee
  - Replay Protection
  - Transaction Expiration
  - RLP Encoding
tags:
  - Transaction Fields
  - Transacciones
---

In order to encode a Core Space transaction, the following fields are required:

- `from` - the address of the sender, that will be signing the transaction. This will be an externally-owned account as contract accounts cannot send transactions.
- `to` - the receiving address (if an externally-owned account, the transaction will transfer value. If a contract account, the transaction will execute the contract code)
- `value` – amount of CFX to transfer from sender to recipient (denominated in Drip, where 1CFX equals 1e+18Drip)
- `nonce` - a sequentially incrementing counter which indicates the transaction number from the account
- `data` optional field to include arbitrary data
- `gas` – the maximum amount of gas units that can be consumed by the transaction. The EVM specifies the units of gas required by each computational step
- `gasPrice` - the price of the consumed gas to be included as a tip to the validator
- `storageLimit` - the maximum amount of storage space that can be consumed by the transaction.
- `chainId` - the id of the blockchain, which is used to prevent replay attacks
- `epochHeight` - the epoch number of the blockchain, which is used to sets an expiration time for the transaction
- `signature`(r,s,v) – the identifier of the sender. This is generated when the sender's private key signs the transaction and confirms the sender has authorized this transaction

## Basic fields

The `from`, `to`, and `value` are the basic fields of a transaction. These fields correspond to the **address of sender account**, **address of the receiver account** and the **amount to be transferred**, respectively.

### from

The `from` field identifies the sender of the transaction. Essentially, the `from` field tells you who is initiating the transaction and who is paying for the transaction. And in the [Signing](./encoding-signning.md) phase, the transaction will be signed with the private key of the `from` account, so you cannot specify arbitary address as the sender.

It is also important to remember that the account **must have a sufficient balance to cover** both the transfer amount (`value` field) and the **transaction fee**, otherwise the RPC will reject the transaction and it will not be sent.

It's worth mentioning that in some specific cases, Conflux Core Space's sponsor mechanism can allow for other accounts to pay the transaction fee, allowing accounts with 0 balance to send transactions.

> In fact, the `from` field is not directly included in an encoded transaction. Generally speaking, tools such as SDKs will remove the `from` field from transaction before encoding and sign the transaction using corresponding private key. Others can recover the sender from the signature of the transaction.

### to

The `to` field indicates the recipient account of the transaction.

- If you are making a simple CFX transfer, this field should be set to the **CFX recipient's account**.
- If you are modifying the state of a contract, the to field should be set to **the address of the contract**.
- If you are deploying a new contract, the `to` field is **left empty**.

### value

The `value` field represents the amount of CFX to be transferred and must be set as an integer in **the unit of Drip** (10\*\*-18 CFX).

## nonce

The `nonce` is the **execution sequence number** of transactions sent from an account. Normally you can get it by calling the [`cfx_getNextNonce`](/docs/core/build/json-rpc/cfx-namespace/#cfx_getnextnonce) RPC method.

If you want to expedite transaction processing, you may want to explore the [nonce management mechanism](./nonce.md) further.

## data

The data field of the transaction **can be left blank** or set to a hex-encoded bytes. This can be roughly categorized into three situations:

- Regular CFX transfer transaction: The `data` field is usually blank, but hex-encoded data can be set as a **transaction remark or postscript**.
- Contract deployment transaction: `data` needs to be set as the **contract's bytecode and the parameters of the constructor** (if any)
- Contract call transaction: The `data` field is used to store the input data for the contract to call. The data is usually the **contract method and data after parameter abi encoding**.

Smart contracts are usually written in high-level contract development languages (Solidity, vyper). You can use a compiler to obtain bytecode and abi. SDK will provide abi encoding methods for the encoding of the contract method call (encoding the method name and parameters).

## Fee-Related Fields

There are several fields in the transaction information related to fees, each serving a different purpose.

### gas

During the execution of a transaction in the EVM, each operation consumes a certain amount of gas. To prevent excessive consumption of network computing resources or being charged excessively, it is necessary to limit the gas consumption during transaction execution. The **gas** field in transaction information is used to specify the **upper limit of gas consumption for transaction execution**. If the actual total gas consumed during transaction execution exceeds this limit, the transaction will fail.

The actual amount of gas consumed during transaction execution is related to the complexity of the transaction. A **standard CFX transfer** transaction (without data) typically consumes **21,000 gas**, while contract deployment or interaction may consume more.

The [`cfx_estimateGasAndCollateral`](/docs/core/build/json-rpc/cfx-namespace/#cfx_estimategasandcollateral) method can be used to estimate the required amount of gas for transaction execution, which returns the `gasUsed`, `gasLimit` and `storageCollaterized` fields. It is recommended to use `gasLimit` as the `gas` field.

The gas estimated by the [`cfx_estimateGasAndCollateral`](/docs/core/build/json-rpc/cfx-namespace/#cfx_estimategasandcollateral) method may not always be accurate and could be conservative. Therefore, when setting the transaction gas, it is common to multiply the value returned by this method by a factor, such as 1.3, for added safety.

For more information on the usage, estimation, and charging of gas, refer to [Introduction to Gas](/docs/general/conflux-basics/gas.md).

### gasPrice

The gasPrice is used to set the amount of CFX that the sender is willing to pay for one unit of gas (in Drip). The total gas fee for the transaction is **gasCharged \* gasPrice**. Miners **use the gasPrice to determine the order in which transactions are included in a block**. Generally, **higher gasPrice results in faster transaction inclusion**.

The [`cfx_gasPrice`](/docs/core/build/json-rpc/cfx-namespace#cfx_gasprice) method can be used to obtain an appropriate gas price. During periods of network congestion, it may be necessary to manually set a higher price; details can be found in [How to Set Prices](./transaction-fee.md).

### storageLimit

In Conflux Core Space, transaction execution not only consumes computing resources but also occupies storage resources. Therefore, transactions are charged for storage usage. The **storageLimit** field in a transaction is similar to the **gas** field and is used to specify the upper limit of storage space that a transaction can occupy. If this limit is exceeded, the transaction will fail.

The [`cfx_estimateGasAndCollateral`](/docs/core/build/json-rpc/cfx-namespace/#cfx_estimategasandcollateral) method also estimates the storage size that a transaction execution will occupy.

## Other Fields

### chainId

The `chainId` field in transactions is used to identify the specific chain. For example, the current chainId of the Core Space is **1029** and that of the Core Space testnet is **1**. This field is included in transactions primarily to prevent replay attacks.

It's generally not necessary to fill in this field manually, as the SDK will automatically obtain the chainId through the [`cfx_getStatus`](/docs/core/build/json-rpc/cfx-namespace/#cfx_getstatus) method.

### epochHeight

The `epochHeight` field is used to specify the target epoch range for a transaction. Transactions will only be executed within the range of [epochHeight - 100000, epochHeight + 100000]. If the epoch of the current chain exceeds this range, the transaction will be discarded.

The SDK will also automatically set this field to the current epoch obtained by the [`cfx_epochNumber`](/docs/core/build/json-rpc/cfx-namespace/#cfx_epochnumber) method.

## Signature Fields

The transaction signature is generated by the sender of the transaction to prove the sender's authorization of the transaction. The transaction signature consists of three fields: **r, s, and v**. Among them, r and s are two 256-bit integers, and v is an 8-bit integer. The process of generating a transaction signature is as follows:

1. Encode the basic information of the transaction using RLP, resulting in the encoded data.
2. Perform a Keccak256 hash operation on the encoded data to obtain a 256-bit hash value.
3. Use the hash value and the sender's private key as parameters to invoke the ECDSA signature algorithm, obtaining the signature's r, s, and v fields.

For specific generation details, refer to [Transaction Encoding and Signature](./encoding-signning.md).

## References

- Core Space transactions follow the definition of [Conflux Protocol](https://www.confluxnetwork.org/files/Conflux_Protocol_Specification.pdf)
- eSpace transactions follow the [EIP-155](https://eips.ethereum.org/EIPS/eip-155) specification

## FAQs

### What's max value of transaction gas limit?

It's half of the block gas limit, whereas 30 million gas \* 0.5 (15000000).

### What's minimum value of Core Space transaction gasPrice?

1 GDrip (10\*\*9 Drip).

### What's the max size of transaction data?

It's about 200k bytes.

### What Parameters are Required for Sending Transactions via SDK?

When using the JS-SDK for basic CFX transfers, three parameters are essential: `from` (the originating account), `to` (the recipient account), and `value` (the amount to be transferred, measured in Drip). Other fields can be automatically populated by SDK.
