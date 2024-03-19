---
title: cfx_estimateGasAndCollatory 行为
sidebar_position: 8
description: cfx_estimateGasAndCollatory 的行为
displayed_sidebar: coreSidebar
keywords:
  - cfx_estimateGasAndCollateral
  - errors
toc_max_heading_level: 4
tags:
  - cfx_estimateGasAndCollateral
  - errors
---

`cfx_estimateGasAndCollateral` 接口是 Conflux 区块链中的一个关键组成部分，该接口允许用户可在发起交易前，估算交互所需交易费用和存储抵押费用 本文档旨在清晰地概述 `cfx_estimateGasAndCollateral` 接口的功能，特别强调其对各种参数配置的响应。

:::note

以下描述的行为是由 [conflux-rust](https://github.com/Conflux-Chain/conflux-rust) 实现的，这是Conflux协议的官方Rust实现。

:::

## 参数缺失或默认情况下的行为

接口的响应取决于输入中特定字段是否存在：

1. **如果 `from` 字段缺失**：接口将不会执行与`余额`相关的检查。 （然而，因为`from`字段缺失，执行可能会失败）。
2. **如果 `gas_price` 缺失**：则跳过与gas相关的交易费用检查和[代付gas上限](../../../core-space-basics/internal-contracts/sponsor-whitelist-control.md)检查。
3. **如果 `nonce` 缺失**：接口自动填充当前正确的nonce。 相反，如果提供了 `nonce` ，交易将使用指定的nonce进行，避免由于与nonce相关的错误而失败。
4. **如果 `value` 缺失**：默认设置为0。
5. **如果 `data` 缺失**：默认为空。
6. **如果 `to` 缺失**：接口默认为合约创建。

:::note

通常，Conflux SDK（例如，js-conflux-sdk、java-conflux-sdk等）会自动调用 `cfx_estimateGasAndCollateral` ， 若要发起交易。 如果你没有直接调用 `cfx_estimateGasAndCollateral` ，上述参数的存在与否将取决于你使用的SDK的行为。

:::

### 处理多余的参数

虽然 `cfx_estimate` 的主要功能是用于估算gas和存储抵押，但它也接受由用户输入这些参数。 本节概述了在这些情况下应用的逻辑：

#### 指定gas

1. 交易使用指定的 `gas` 执行。 这是除了 `gas` 消耗超过1500万限制之外，唯一可能出现 `OutOfGas` 错误的情况。
2. 如果同时指定了 `from` 和 `gas_price` ，在估算过程中将扣除交易费用。 否则，费用将在执行后重新检查。

#### 指定存储限制

1. 在交易执行估算期间，指定的 `storage_limit` 会被忽略。 估算后，将评估所指定的存储限制是否足够。

### 其他考量

**存储代付**：在存储被代付的情况下，不执行 `storage_limit` 检查，遵循Conflux的内在逻辑。

## 错误

### Estimation isn't accurate: transaction is reverted

```json
{
    "code": -32015,
    "message": "Estimation isn't accurate: transaction is reverted. Innermost error is at CFX:TYPE.CONTRACT:ACDUZTJBPM9PPP9F0K5VT3PJU0EJUDNHP2ZM7WS35N: Vm reverted. .",
    "data": "CFX:TYPE.CONTRACT:ACDUZTJBPM9PPP9F0K5VT3PJU0EJUDNHP2ZM7WS35N: Vm reverted. \nCFX:TYPE.CONTRACT:ACD5E6SPRGMDVG15FDXF2B8AH7DAN7GMZAGXA10EPZ: Vm reverted. "
}
```

遇到此错误意味着接口未能返回估算结果，因为交易被回滚（合约方法代码未能执行）。 这个错误可能有多种原因，例如：相关ERC-20代币或NFT的余额不足；合约方法的参数错误；缺乏权限或授权等。

如果在合约执行期间抛出错误消息，可以在RPC错误消息中看到合约执行失败的具体原因。 例如，当转移NFT（1155）时出现以下错误，表示余额不足：`Estimation isn't accurate: transaction is reverted: ERC1155: insufficient balance for transfer. Innermost error is at xxxx: Vm reverted. ERC1155: insufficient balance for transfer`.

**解决方案**：你应该根据错误提示检查合约的逻辑。 在特定场景下（例如当抛出**solidity自定义错误**时），错误可能不会在错误字符串中显示。 在这种情况下，使用 `cfx_call` 与相同的参数将返回对应的十六进制错误字符串。 建议参考Solidity或特定语言的SDK中的[自定义错误](https://soliditylang.org/blog/2021/04/21/custom-errors/) ，了解如何解决十六进制错误字符串。

### Can not estimate: transaction execution failed, all gas will be charged

#### VmError(OutOfGas)

```json
{
    "jsonrpc": "2.0",
    "error": {
        "code": -32602,
        "message": "Can not estimate: transaction execution failed, all gas will be charged (execution error: VmError(OutOfGas))"
    },
    "id": "15922956697249514502"
}
```

**解决方案**：此错误意味着 `gas` 不足以执行交易，通常意味着gas超过了单个交易的最大金额，即区块气体限制的一半（15,000,000）。 需要优化合约执行逻辑以减少gas消耗。 值得注意的是，如果在估算请求中指定了 `gas` ，即使所需gas少于1500万，仍然可能发生 `OutOfGas` 错误。

#### NotEnoughCash

```json
{
    "jsonrpc": "2.0",
    "id": 8,
    "error": {
        "code": -32015,
        "message": "Can not estimate: transaction execution failed, all gas will be charged (execution error: NotEnoughCash { required: 1000, got: 0, actual_gas_cost: 0, max_storage_limit_cost: 0 })",
        "data": "NotEnoughCash { required: 1000, got: 0, actual_gas_cost: 0, max_storage_limit_cost: 0 }"
    }
}
```

此错误意味着 `from` 账户没有足够的余额来支付交易成本，包括 `value` + `gas` + `storage collateral`。

**解决方案**：

- 如果 `to` 合约没有[代付](../../../core-space-basics/internal-contracts/sponsor-whitelist-control.md)，请确保 `from` 账户有足够的CFX余额。
- 如果 `to` 合约被赞助，建议通过调用 [cfx_checkBalanceAgainstTransaction](../cfx-namespace.md#cfx_checkbalanceagainsttransaction) RPC检查为什么赞助没有生效。 实际原因可能是：
  - `from` 账户不在[赞助白名单](../../../core-space-basics/internal-contracts/sponsor-whitelist-control.md#whitelist-maintenance)中。 增加
  - `SpongoredBalanceForGas` 或 `SpongoredBalanceForboratoral` 不足以支付交易成本，其价值可以从 [cfx_getSponsorInfo](../cfx-namespace.md#cfx_getsponsorinfo) RPC得到。 在这种情况下，追加赞助余额将解决这个问题。
  - 交易gas成本(`gas limit` \* `gas price`) 超过代付`upperBound`设置，它的价值可以从cfx_getSponsorInfo](../cfx-namespace.md#cfx_getsponsorinfo)中获得。 在这种情况下，您需要调用 [setSponsorForGas](../../../../core-space-basics/internal-contracts/sponsor-whitelist-control#setsponsorforgas-setsponsorfortor-behavior)来增加gas代付上限。

#### ConflictAddress(0x...)

```json
{
  "code": -32015,
  "message": "Can not estimate: transaction execution failed, all gas will be charged (execution error: VmError(ConflictAddress(0x87e69792aab04a1e54faa54b41a688335199c1bb)))
",
  "data": "VmError(ConflictAddress(0x87e69792aab04a1e54faa54b41a688335199c1bb))"
}
```

This means the operation being estimated will deploy the contract to an address with contract existed. 部署的合约地址由部署者地址、部署者的“nonce”和合约的字节代码决定。 而这个问题通常是由于指定了一个已经使用过的nonce。

**解决方案**：检查估算参数中指定的 `nonce` 是否被重新使用并使用正确的 `nonce` 字段。

#### VmError(BadInstruction 214)

```json
{
  "code": -32015,
  "message": "Can not estimate: transaction execution failed, all gas will be charged (execution error: VmError(BadInstruction { instruction: 214 }))
",
  "data": "VmError(BadInstruction { instruction: 214 })"
}
```

这意味着`data`字段包含错误的指示。 这个错误的发生通常是因为缺少“to”字段，所以“data”无法按预期解析。

**解决方案**：检查估算请求中是否缺少`to`字段，并填写正确的值。
