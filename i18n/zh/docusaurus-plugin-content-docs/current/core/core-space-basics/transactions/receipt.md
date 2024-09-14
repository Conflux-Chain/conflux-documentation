---
sidebar_position: 6
title: 交易收据
displayed_sidebar: coreSidebar
keywords:
  - 交易
---

交易收据是一个包含有关交易执行结果信息的数据结构。

## 交易收据

收据可以通过RPC方法[`cfx_getTransactionReceipt`](/docs/core/build/json-rpc/cfx-namespace#cfx_gettransactionreceipt)获得。 这个方法将交易哈希作为参数，并在交易未执行时返回`null`，或在执行完成后返回一个收据对象。

## 收据字段

收据包含以下类型的信息：

- 基本交易信息：`transactionHash`, `from`, `to`
- 链上交易信息：`blockHash`、`epochNumber`、`index`
- 交易执行结果：`outcomeStatus` (成功为`0` ,失败为 `1`)
- Gas和存储费用信息：`gasUsed`、`gasFee`、`storageCollateralized`、`gasCoveredBySponsor`、`storageCoveredBySponsor`、`storageReleased`
- 部署合约地址：`contractCreated` (如果是一个部署交易的合约)
- 合约执行日志: `logs`
- 执行错误信息：`txExecErrorMsg` (如果交易执行失败)

如果想了解每个字段的详细信息, 请参阅[`cfx_getTransactionReceipt`](/docs/core/build/json-rpc/cfx-namespace#cfx_gettransactionreceipt)的API文档。

### 日志

Receipt(收据)中的日志字段(logs)是一个数组，其包含在交易执行过程中生成的所有日志。 当与合约交互时，合约可以使用emit语句生成日志或事件。 交易执行后，这些日志被记录在交易收据中。 在Solidity中，[事件](https://docs.soliditylang.org/en/v0.8.23/contracts.html#events) 被设计用于记录有关合约方法执行的信息，通过事件提供有关合约执行的详细信息。

你可以使用 [cfx_getLogs](/docs/core/build/json-rpc/cfx-namespace#cfx_getlogs) 方法检索日志，并使用 [abi.decode](https://docs.soliditylang.org/en/v0.8.23/contracts.html#events) 方法解码日志数据。 Conflux SDKs also provide methods to help decoding the logs, for example, [javascript](https://confluxnetwork.gitbook.io/js-conflux-sdk/docs/interact_with_contract#how-to-decode-log) and [python](https://python-conflux-sdk.readthedocs.io/en/latest/examples/05-interact_with_contracts_and_process_logs.html#process-logs).

## 执行失败

执行失败可能是由于在合约执行过程中发生的错误或通过估算接口估算Gas成本时返回的错误导致的。 要找到交易失败的具体原因，请检查收据中的`txExecErrorMsg`字段：

1. `VmError(OutOfGas)`：在交易执行过程中，指定的`gas`已经用尽。
2. `VmError(ExceedStorageLimit)`：指定的`storageLimit`(可使用的存储上限)不足。
3. `NotEnoughCash`：用户余额不足以支付交易成本。
4. `Vm reverted, Reason provided by the contract: xxxx`: 合约执行失败，并提供了详细信息。
5. `VmError(BadInstruction xxxx)`: 合约部署失败。
6. `Vm reverted, xxxx`: 合约执行失败，未提供详细信息。

**解决方案：** 根据具体的错误信息, 你可能需要增加`gas`，增加`storageLimit`，确保足够的余额，或者调试合约代码以识别并修复导致失败的问题。

记住在处理交易错误时，关键是识别错误根源并找到适宜的解决方案。 在大多数情况下，修改交易参数、等待节点同步或调试合约代码可以帮助解决这些问题。

## 常见问题解答

### 什么是交易收据，它包含哪些信息？

收据是交易的收据信息。 通过收据，你可以了解交易执行的一些结果，如交易是否成功，是否创建了合约，Gas费用的使用情况，交易执行生成的eventLog等等。

### 为什么我无法检索交易收据？

交易的收据信息只能在交易成功执行后获得。 如果交易尚未完成，收据将为`null`。

### 交易的收据信息可以改变吗？

交易执行并被包含在一个区块中后，收据信息可能会立即改变。 然而，一旦交易完成，收据信息将不会改变。

### 如何知道交易是否成功执行？

检查交易的`status` 字段或收据的`outcomeStatus` 字段，如果返回值为0表示交易成功，返回值为1则表示交易失败。

### 为什么交易的执行会失败？

[执行失败](./receipt.md#execution-failure)。

### 如何知道一个交易是否安全并得到确认？

如果交易所属纪元的纪元数小于当前已确认的纪元数，则认为这笔交易是安全的。
你还可以通过[`cfx_getConfirmationRiskByHash`](/docs/core/build/json-rpc/cfx-namespace/#cfx_getconfirmationriskbyhash)的RPC获取交易所属区块的确认风险。
如果获取的值小于 1e-8，则认为是安全的。

### 交易的状态如何变化？

通过RPC提交交易后，它将经历如下几个状态：等待打包 -> 打包 -> 执行 -> 确认。

### 为什么交易一直在等待被打包？

如果交易长时间没有被打包，可能是因为 nonce 设置不正确或余额不足。
