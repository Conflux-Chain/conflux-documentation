---
sidebar_position: 1
title: Transaction Fields
displayed_sidebar: coreSidebar
---

In order to construct a Core Space transaction, the following fields are required:

* `from` - the address of the sender, that will be signing the transaction. This will be an externally-owned account as contract accounts cannot send transactions.
* `to` - the receiving address (if an externally-owned account, the transaction will transfer value. If a contract account, the transaction will execute the contract code)
* `value` – amount of CFX to transfer from sender to recipient (denominated in Drip, where 1CFX equals 1e+18Drip)
* `nonce` - a sequentially incrementing counter which indicates the transaction number from the account
* `data` optional field to include arbitrary data
* `gas` – the maximum amount of gas units that can be consumed by the transaction. The EVM specifies the units of gas required by each computational step
* `gasPrice` - the price of the consumed gas to be included as a tip to the validator
* `storageLimit` - the maximum amount of storage space that can be consumed by the transaction. 
* `chainId` - the id of the blockchain, which is used to prevent replay attacks
* `epochHeight` - the epoch number of the blockchain, which is used to sets an expiration time for the transaction
* `signature`(r,s,v) – the identifier of the sender. This is generated when the sender's private key signs the transaction and confirms the sender has authorized this transaction

## Basic fields

The `from`, `to`, and `value` are the basic fields of a transaction. These fields correspond to the **address of sender account**, **address of the receiver account** and the **amount to be transferred**, respectively.

The `from` field identifies the sender of the transaction. Essentially, the `from` field tells you who is initiating the transaction and who is paying for the transaction. And in the [Signing](./fake-link) phase, the transaction will be signed with the private key of the `from` account, so you cannot specify arbitary address as the sender.

It is also important to remember that the account must have a sufficient balance to cover both the transfer amount (`value` field) and the **transaction fee**, otherwise the RPC will reject the transaction and it will not be sent.

It's worth mentioning that in some specific cases, Conflux Core Space's sponsor mechanism can allow for other accounts to pay the transaction fee, allowing accounts with 0 balance to send transactions.

> In fact, the `from` field is not directly included in an encoded transaction. Generally speaking, tools such as SDKs will remove the `from` field from transaction before encoding and sign the transaction using corresponding private key. Others can recover the sender from the signature of the transaction.

The `to` field indicates the recipient account of the transaction.

* If you are making a simple CFX transfer, this field should be set to the **CFX recipient's account**. 
* If you are modifying the state of a contract, the to field should be set to **the address of the contract**. 
* If you are deploying a new contract, the `to` field is **left empty**.

The `value` field represents the amount of CFX to be transferred and must be set as an integer in **the unit of Drip** (10**-18 CFX).

## nonce

The `nonce` is the **execution sequence number** of transactions sent from an account. Normally you can get it by calling the `cfx_getNextNonce` RPC method.

If you want to expedite transaction processing, you may want to explore the [nonce management mechanism](./nonce.md) further.

## data

The data field of the transaction can be left blank or set to a hex-encoded byte array. This can be roughly categorized into three situations:

* Regular CFX transfer transaction: The `data` field is usually blank, but hex-encoded data can be set as a **transaction remark or postscript**.
* Contract deployment transaction: `data` needs to be set as the **contract's bytecode and the parameters of the constructor** (if any)
* Contract call transaction: The `data` field is used to store the input data for the contract to call. The data is usually the **contract method and data after parameter abi encoding**.

Smart contracts are usually written in high-level contract development languages (Solidity, vyper). You can use a compiler to obtain bytecode and abi. SDK will provide abi encoding methods for the encoding of the contract method call (encoding the method name and parameters).

## Fee-Related Fields

交易信息中有多个是关于手续费的，各自有不同的作用

### gas

在 EVM 执行交易的过程中，每步操作都会消耗一定的 gas，为了避免交易过多消耗网络计算资源或被收取过多费用，需要对交易执行消耗的 gas 进行限制，交易信息的 **gas** 字段即是用来指定交易执行可消耗燃气的上限。如果交易执行实际所消耗的 gas 总和超过此上限，交易执行将会失败。

交易执行实际消耗的 gas 数量跟交易的复杂度有关，普通的 CFX 转账交易(不带data)会花费 21000 gas, 合约部署或交互花费的 gas 会更多。可通过 `cfx_estimateGasAndCollateral` 方法来预估交易执行所需的 gas 数量。

`cfx_estimateGasAndCollateral` 方法预估的 gas 有时并不是很准确，可能偏小，所以在设置交易 gas 时，会在该方法返回数值的基础上乘一个系数， 例如 1.3，这样更加稳妥。

关于 gas 的用途，预估，收费方式可参看 [gas 介绍](/docs/general/conflux-basics/gas.md)

### gasPrice

gasPrice 是用来设置交易发送者愿意为一单位 gas 支付的 CFX 数量（单位为 Drip）, 交易总 gas 费为 **gasCharged * gasPrice**. 矿工是根据 gasPrice 来决定交易打包的顺序，通常 gasPrice 越高，交易打包越快

通常情况可使用 `cfx_gasPrice` 方法来获取合适的燃气价格，在交易拥堵时往往需要手动设置更高的价格，详情参看[如何设置价格](./gas-fee.md)

### storageLimit

在 Conflux Core Space 中，交易执行不仅消耗计算资源，也会占用存储资源，因此交易也会被收取一定存储费用，具体收取方式参看 [Storage Collateral](../../core-space-basics/storage.md)

交易的 `storageLimit` 字段与 `gas` 字段类似，是用来指定交易执行所能占用存储空间的上限，超过上限也会失败。

`cfx_estimateGasAndCollateral` 方法也会同时预估交易执行会占用的存储大小。

## Other Fields

### chainId

The `chainId` field in transactions is used to identify the specific chain. For example, the current chainId of the Core Space is **1029** and that of the Core Space testnet is **1**. This field is included in transactions primarily to prevent replay attacks. 

It's generally not necessary to fill in this field manually, as the SDK will automatically obtain the current RPC chainId through the `cfx_getStatus` method.

### epochHeight

The `epochHeight` field is used to specify the target epoch range for a transaction. Transactions will only be executed within the range of [epochHeight - 100000, epochHeight + 100000]. If the epoch of the current chain exceeds this range, the transaction will be discarded. 

The SDK will also automatically set this field to the current epoch obtained by the `cfx_epochNumber` method.

### signature

交易签名是由交易的发送者生成的，用于证明发送者对交易的授权。交易签名由三个字段组成：r, s, v。其中 r 和 s 是两个 256 位的大整数，v 是一个 8 位的整数。交易签名的生成过程如下：

1. 将交易的基本信息进行 RLP 编码，得到编码后的数据
2. 对编码后的数据进行 Keccak256 哈希运算，得到 256 位的哈希值
3. 将哈希值和发送者的私钥作为参数，调用 ECDSA 签名算法，得到签名的 r, s, v 字段

具体生成细节参看[交易编码和签名](./fake-link)

## References

- Core Space transactions follow the definition of [Conflux Protocol](https://www.confluxnetwork.org/files/Conflux_Protocol_Specification.pdf)
- eSpace transactions follow the [EIP-155](https://eips.ethereum.org/EIPS/eip-155) specification
