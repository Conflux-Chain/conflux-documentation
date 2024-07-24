---
sidebar_position: 4
title: Nonce 管理
displayed_sidebar: coreSidebar
keywords:
  - 交易
  - nonce
---

在Conflux中，每个账户都有一个nonce值，表示该账户执行的交易序号。 可以使用RPC方法[`cfx_getNextNonce`](/docs/core/build/json-rpc/cfx-namespace/#cfx_getnextnonce)获取此值。 交易中的nonce字段用于指定执行顺序，较低的nonce值表示较早地执行。 通常情况下，可以直接将这个值作为下一次交易的nonce。

然而，在网络交易量高(拥堵)或需要快速提交交易的情况下，获取nonce值变得更为复杂。 本文将详细解释nonce更新机制以及如何在特殊情况下管理交易的nonce。

## Nonce机制

这里是一些**nonce机制**的细节:

1. 在区块链上，交易的执行顺序是按照账户的nonce值从小到大的顺序执行的。
2. Nonce 的初始值是 0，每执行一次交易，nonce 就增加 1。
3. Nonce 不能重复使用。
4. Nonce 不能跳过：假设一个账户的当前 nonce 是 n。 如果交易的nonce值为m，且m > n, 那么该交易**不会被执行** 直到所有**nonce < m的交易都被执行**。
5. 通过[`cfx_sendRawTransaction`](/docs/core/build/json-rpc/cfx-namespace#cfx_sendrawtransaction) 方法发送交易后, **不会立即执行**。 你必须等待矿工先打包它。 一旦打包，它将延迟 5 个 epoch 执行。 交易执行后，账户的 nonce 将增加一。

## Nonce 使用不当引起的问题

用户在发送交易时设置 nonce 不正确可能会导致交易失败或在交易池中卡住，无法被打包和执行。 以下是一些常见的错误消息及其相应的解决方案。

### 由于nonce值过时而被丢弃

如果新发送的交易的nonce小于账户的当前nonce，则该交易将被拒绝，并返回如下的错误消息：

```json
"\"Transaction 0x0101010110 is discarded due to a too stale nonce\""
```

此错误表示使用的nonce 值已经过时或已被重新使用，需要更新到最新的nonce值。

### 交易的nonce与交易池中的交易相同

如果交易已发送到交易池但尚未执行，再发送具有相同nonce的交易将导致如下错误消息，比如：

```json
"Tx with the same nonce already inserted. To replace it, you need to specify a gas price > {}""
```

在这种情况下，你应该等待交易池中的交易被执行。 如果想替换交易池中的交易，则需要设置更高的燃气价格并重新发送。

有时，错误消息也可能是：

```json
"\"tx already exist\""
```

处理方式与上面相同。

### 由于nonce值过大而被丢弃

如果交易的nonce值过大，比用户当前nonce值大2000以上，将返回如下错误消息：

```json
"\"Transaction 0x0101010101010101 is discarded due to in too distant future\""
```

解决方案: 发送交易时使用正确的nonce值。

除了nonce配置错误导致交易失败外，还会有一些其他情况。 欲了解更多详情，请参阅[发送交易错误](./send-tx-error.md)。

### 发送交易后无法获取交易收据

有一种情况是，在发送交易后，在长时间内无法获取交易收据。 这通常是由于交易使用非连续的nonce值导致的。 在这种情况下，交易被卡在交易池内，等待先前交易的执行完成。

例如，如果账户的当前nonce为1，而你发送一个带有nonce为5的交易，它将被卡在交易池中，等待发送和执行nonce为1、2、3和4的交易。

为确保执行此交易，你需要将nonce为1、2、3和4的交易发送到交易池。 一旦这些交易被打包，nonce 5 的交易将自动被包含和执行。

有关待处理交易的更多信息，请参考[交易待定](./why-transaction-is-pending.md)。

## 通过手动nonce管理实现快速交易处理

在大多数情况下，交易是按顺序发送的：发送一笔交易，等待其执行，然后发送下一笔交易。 在这种情况下, `cfx_getNextNonce` 可以直接获取每笔交易的nonce。 然而，这种方法处理时间较慢，通常每笔交易平均15秒左右。

为了快速处理交易，手动管理nonce值至关重要。 这种办法的一般步骤是：

1. **初始Nonce获取**：在开始交易过程之前，获取你账户当前的nonce，称为 `nextNonce`。

2. **交易提交**：对于每笔交易:
   - 使用`nextNonce`进行交易。
   - 交易成功发送到 RPC 节点后，`next Nonce`递增加一 。
   - 记录每笔交易的哈希和nonce。

3. **重复执行**：对多笔交易继续执行步骤2。

4. **交易监控**：
   - 使用`cfx_getTransactionByHash` 和`cfx_getTransactionReceipt`进行交易状态更新。
   - 如果收据得到确认，则停止监测该交易。
   - 如果交易被丢弃或回滚，则使用相同的nonce重新发送。
   - 对于可能由于网络拥堵造成的延迟交易，考虑增加`gasPrice`并将其重新发送。

**其他注意事项**:

- **待处理交易管理**：目标是将待处理交易保持在可管理的范围内，理想情况下在100-200之间。 超过这个范围可能会在交易延迟或回滚时使处理变得复杂。

- **足够的资金**: 确保账户有足够的CFX，既能支付转账金额，又能支付交易费用，以防止交易处理的延迟。

- **使用多账户以提高速度（在某些情况下）**: 可以并行使用多个账户进行交易，以进一步提高处理速度。

## 常见问题解答

### 如何获得正确的nonce？

通过[`cfx_getNextNonce`](/docs/core/build/json-rpc/cfx-namespace/#cfx_getnextnonce) RPC, 可以获取账户的下一个可用的nonce。 使用过的 nonce 值不能再次使用。 如果使用一个大于当前 nonce 值的 nonce，交易将无法被打包。

### 交易中的nonce值何时以及如何变化？

交易中的nonce值在交易执行时递增加一，无论交易成功与否。 如果想在发送交易之后查询 [`cfx_getNextNonce`](/docs/core/build/json-rpc/cfx-namespace/#cfx_getnextnonce) , 它可能看起来没有变化。 这种状态未改变的原因是，要么交易还在交易池中等待被打包进区块，要么已经被打包到区块中，但处于'延迟'状态等待执行。

请参阅 [nonce机制](./nonce.md#nonce-mechanism) 获取更多示例。

### 如果您想批量发送交易，如何管理 nonce？

当批量发送交易时，需要手动管理 nonce 值。 每次发送交易时，需要手动将 nonce 值加一。
在这种情况下，如果有一个交易失败，导致它的 nonce 没有被使用，您需要手动调整交易参数并重新发送该交易。
因此，在批量发送交易时，您需要保留所有交易的哈希值，并监控这些交易的状态。

### 为什么账户的nonce在交易被打包进区块后不会立即增加呢？

账户的nonce并不会在交易出现在区块链上后立即增加。 相反，在交易被打包并执行后，nonce才会增加。
