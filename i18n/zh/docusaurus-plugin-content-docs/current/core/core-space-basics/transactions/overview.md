---
sidebar_position: 0
title: 概览
keywords:
  - 交易
tags:
  - 交易
  - Core Space
  - 交易字段
  - 交易随机序号(Nonce)
  - 燃气
  - Gas Price
  - Storage Limit
  - 交易费用
  - Encoding
  - Signing
  - 交易生命周期
  - 交易收据
  - 待处理交易
  - cfx_sendRawTransaction
  - 钱包
  - SDKs
displayed_sidebar: coreSidebar
---

交易是区块链中的一个重要概念。 如果你不熟悉交易的概念，并希望快速了解它,你可以阅读 [交易快速入门](/docs/general/conflux-basics/transactions.md)。

通常, 我们使用[钱包](../../../general/conflux-basics/wallets.md)或 [SDKs](../../build/sdks-and-tools/sdks.md) 发送交易，这些工具将帮助我们完成复杂的任务，例如构建交易、将其发送到网络，并最终等待交易被确认或完成，这些工具的存在使整个过程相对简单。

然而，如果希望更深入地了解交易原理或在发送交易时遇到问题，你可能需要了解交易细节。

## 交易字段

交易由多个字段组成，每个字段有其自身的含义和目的。 要理解它们的含义以及如何正确设置这些字段，请参阅[交易字段](./tx-fields.md)。 如果一笔交易发送失败或在被卡住而未被打包，那可能是由于某些交易字段的设置不正确。

## Nonce

交易中的`nonce`字段至关重要，因为它决定了交易的执行顺序。 Nonce更新不是实时的，因此了解 [nonce](./nonce.md) 是至关重要的，特别是在需要快速向链上发送交易时。 这种情况下提供了额外的[nonce管理指南](./nonce.md) 。

## 交易费用

`gas`，`gasPrice`以及`storageLimit`字段在交易中也非常关键。 这些字段用于设置交易的执行成本。 将`gas`设置得太低可能会导致交易失败，而将其设置得太高则会产生不必要的费用。 `gasPrice`字段影响该交易在区块中的优先级，特别是在拥挤的网络中。 `storageLimit`是一个用于指定交易可以使用的 [存储抵押品](../storage.md) 的独特字段。 了解[交易费用](./transaction-fee.md)可以帮助你更加有效地设置这些字段。

## 编码和签名

在准备好所有交易字段后, 交易在发送前需要根据特定规则 [编码和签名](./encoding-signning.md) 。 然后使用 RPC方法[`cfx_sendRawTransaction`](/docs/core/build/json-rpc/cfx-namespace#cfx_sendrawtransaction)将其发送到网络。

## 生命周期

一旦交易被发送到网络，它并不会立即被打包和执行。 相反，它经历了一系列状态变化。 了解[交易的生命周期](./lifecycle.md)可以帮助你更好地理解交易的状态变化，并解决在发送交易过程中遇到的问题。

## 交易收据

交易执行后,会产生[交易收据](./receipt.md)。 交易收据包括关于交易执行结果的信息，包括交易是否成功，支付了多少费用以及交易所在区块的详细信息。

## 交易发送失败

在发送交易过程中，可能会出现各种问题。 可能是获取交易字段值时的错误，调用RPC时的网络问题或者调用[`cfx_sendRawTransaction`](/docs/core/build/json-rpc/cfx-namespace#cfx_sendrawtransaction)方法时发生的错误。 我们已经整理了与发送交易相关的常见问题和解决方案，请参照 [交易发送常见问题](./send-tx-error.md)。

## 待处理交易

成功发送交易后，通常应在几秒内被打包。 然而，有些情况下交易依旧处在待处理状态。 这可能是由于网络拥堵和低 `gasPrice`, 或者由于不正确的`nonce` 设置(通常是由于快速发送交易引起的)。 请参阅[待处理交易原因](./why-transaction-is-pending.md) ，以避免或解决这个问题。

## 常见问题解答

[常见问题解答](./faqs.md)
