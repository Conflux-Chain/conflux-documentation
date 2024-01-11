---
sidebar_position: 5
id: transaction_explain
title: 交易
keywords:
  - transaction
displayed_sidebar: coreSidebar
---

发送交易是在区块链上存储或修改数据的唯一方法。 这包括 CFX 的转账和合约状态的修改。 发送交易的过程包括三个步骤：构造交易、签名交易和最后传输交易。 Most programming languages have an [SDK](../build/sdks-and-tools/sdks.md) with a convenient method that can be used for this purpose. 但是，如果你想深入了解底层的机制，或者在发送交易时遇到问题，这篇文章可能会有帮助。

## 交易字段

为了构造一个交易，需要以下字段：

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

### 基本字段

`from`、`to` 和 `value` 是交易的基本字段。 这些字段分别对应发送者账户的地址、接收者账户的地址和要转移的金额。

`from` 字段标识了交易的发送者。 本质上，from 字段告诉你谁发起了交易，谁支付了交易费用。 And in the [Signing](#Signing) phase, the transaction will be signed with the private key of the `from` account, so you cannot specify arbitary address as the sender. 还要记住，账户必须有足够的余额来支付转账金额（`value` 字段）和交易费用，否则 RPC 将拒绝交易，交易将不会被发送。 值得一提的是，在一些特定的情况下，Conflux 的赞助机制可以允许其他账户支付交易费用，从而让余额为 0 的账户也能发送交易。

> 事实上，`from` 字段并没有直接包含在编码后的交易中。 一般来说，SDK 等工具会在编码前从交易中移除 `from` 字段，并用相应的私钥对交易进行签名。 其他人可以从交易的签名中恢复出发送者。

`to` 字段表示交易的接收者账户。 如果你是进行简单的 CFX 转账，这个字段应该设置为 CFX 接收者的账户。 如果你是修改合约状态，to 字段应该设置为合约的地址。 如果你是部署一个新的合约，to 字段留空。

`value` 字段表示要转移的 CFX 数量，必须以 Drip（10**-18 CFX）为单位设置为整数。

### nonce

`nonce` 是一个账户发送的交易的执行序号。 这个字段的正确值可以用 `cfx_getNextNonce` RPC 方法查询。 这里是一些 nonce 机制的细节：

1. 区块链上的交易按照 nonce 从小到大的顺序执行。
2. Nonce 的初始值是 0，每执行一次交易，nonce 就增加 1。
3. Nonce 不能重复使用。
4. Nonce 不能跳过：假设一个账户的当前 nonce 是 n。 如果交易的 nonce 是 m，使得 m > n，那么这个交易就不会被执行，直到所有 nonce < m 的交易都被执行。
5. 通过 `cfx_sendRawTransaction` 方法发送交易后，它不会立即被执行。 你必须等待矿工先打包它。 一旦打包，它将延迟 5 个 epoch 执行。 交易执行后，账户的 nonce 将增加一。

A transaction with incorrect nonce won't be included in blockchain, so correctly setting the nonce is critical to transaction execution. A common issue for developers is that a transaction was sent but its receipt (indicating transaction is executed) is not available, which case is typically due to an accidentally skipped nonce. 这导致交易被卡在交易池中，等待之前的交易先被执行。

当使用 SDK 构造交易时，nonce 字段的值不需要手动设置，因为 SDK 会自动使用 `cfx_getNextNonce` 查询它。 但是，如果一次发送多个交易，nonce 值可能会被重复使用，因为在发送前一个交易后，`cfx_getNextNonce` 的返回值不会立即更新。 为了避免这种情况，建议开发者手动管理 nonce，通过记录交易哈希，将 nonce 加 1，并使用更新后的值来构造后续的交易。

### 费用相关字段

在 Conflux 网络中，交易由收取服务费用的矿工处理。 这个费用激励矿工参与网络并保持其顺畅运行。 费用以 CFX 支付，并由交易发起者通过交易中的 `gas`、`gasPrice` 和 `storageLimit` 字段来指定。

`gas` 字段表示执行交易时可以使用的最大 gas 量。 如果执行过程中实际消耗的 gas 超过了这个限制，交易将失败。 如果实际消耗的 `gas` 少于设置的 `gas`，发送者必须支付至少 75% 的 gas，最多 25% 可以退还，这意味着设置过高的 gas 是不鼓励的。 Gas 消耗取决于合约代码的复杂度（如果是简单的转账交易则为 `21000`），可以用 `cfx_estimateGasAndCollateral` 方法来估算，它返回 `gasUsed`、`gasLimit` 和 `storageCollaterized` 字段。 建议使用 `gasLimit` 作为 `gas` 字段。

`gasPrice` 字段是发送者愿意为每单位 gas 支付的 Drip（10**-18 CFX）数量，应该大于 1G（10**9）。 As Conflux default setting, miners prioritise transactions with higher `gasPrice`, and the `gasPrice` can be increased to speed up the processing of a stuck transaction. `cfx_gasPrice` 方法根据网络状况提供一个合理的 gas 价格。

除了交易费用外，Conflux 网络还要求在交易过程中为占用新的存储空间或修改已有的存储空间的质押 CFX。 质押的 CFX 产生 4% 的年利息，这部分利息支付给矿工，以补贴他们的存储成本。 当占用的空间被释放或被他人修改时，质押的 CFX 将被返还。 `storageLimit` 字段指定了交易可以占用的存储空间的上限。 建议使用 `cfx_estimateGasAndCollateral` 返回值中的 `storageCollaterized` 字段作为 `storageLimit` 字段。

:::info

Refer to [storage](./storage.md) for more information.

:::

发送交易时，发送者必须确保有足够的余额来支付 `value + storageLimit * (10^18/1024) + gas * gasPrice`。 如果余额不足，交易将被节点拒绝。 If the transaction is [sponsored](./internal-contracts/sponsor-whitelist-control.md), the sender only needs to ensure sufficient funds for the value cost. 当前的 SDK 提供了自动设置 `gas`、`storageLimit` 和 `gasPrice` 的合理值的方法，但用户也可以手动指定这些值。

### data

交易的 data 字段可以留空或设置为十六进制编码的字节数组。 这大致可以分为三种情况：

* 普通的 CFX 转账交易：`data` 字段通常为空，但也可以设置为十六进制编码的数据作为交易的备注或附言。
* 合约部署交易：`data` 需要设置为合约的字节码和构造函数的参数（如果有的话）
* 合约调用交易：`data` 字段用于存储合约调用的输入数据。 数据通常是合约方法和参数 abi 编码后的结果。 （当向合约发送 CFX 时，data 字段通常留空）

智能合约通常用高级合约开发语言（Solidity，vyper）编写。 你可以用编译器获得字节码和 abi。 SDK 会提供 abi 编码方法，用于合约方法调用的编码（编码方法名和参数）。

### 其他字段

交易中的 `chainId` 字段用于标识特定的链。 例如，现在 Conflux 网络的 chainId 是 1029，Conflux 测试网的 chainId 是 1。 这个字段主要是为了防止重放攻击而包含在交易中。 一般不需要手动填写这个字段，因为 SDK 会通过 `cfx_getStatus` 方法自动获取当前 RPC 的 chainId。

`epochHeight` 字段用于指定交易的目标 epoch 范围。 交易只会在 [epochHeight - 100000, epochHeight + 100000] 的范围内执行。 如果当前链的 epoch 超过了这个范围，交易将被丢弃。 SDK 也会自动将这个字段设置为通过 `cfx_epochNumber` 方法获取的当前 epoch。

## 交易签名和编码

在使用 `cfx_sendRawTransaction` 方法发送交易之前，需要准备好交易的每个字段，并进行以下步骤（不用担心，这些步骤已经由钱包或 SDK 实现）：

1. 准备签名的哈希：按照 `(nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data) `的顺序进行 RLP 编码，然后对编码后的结果应用 `keccak256` 操作，得到一个哈希。
2. 签名：使用发送账户的私钥对上一步得到的哈希进行签名，并执行 ecdsaSign 签名操作，得到 `r、s、v `的值。
3. 交易编码：按照 `((nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data), v, r, s) `的顺序进行 RLP 编码，并转换为十六进制字符串。

## Differences With Ethereum 155 Transaction

与 Ethereum `155 交易`相比，通过 Conflux 的交易有几个不同之处：

* 字段不同：多了两个字段 `storageLimit` 和 `epochHeight`。
* 编码交易时的差异：
  1. 计算交易哈希的 RLP 结构是` [nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data]`
  2. RawTx 的 RLP 结构是 `[[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data], v, r, s]`
* Conflux 中 ecdsaSign 签名得到的 `v` 值不会特别修改，而在 Ethereum 中，v 值会有一些特殊处理。

## Related topics

- [cfx_sendRawTransaction](../build/json-rpc/cfx-namespace.md#cfx_sendrawtransaction)
- [why transaction is pending](../../general/faq/core-space-transactions/why-transaction-is-pending.md)
