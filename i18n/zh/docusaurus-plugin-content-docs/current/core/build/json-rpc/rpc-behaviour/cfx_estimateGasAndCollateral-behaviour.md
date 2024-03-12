---
title: cfx_estimateGasAndCollateral Behaviour
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

**Solution**: You should review the logic of the contract based on the error message. In specific scenarios (like when a **solidity custom error** is thrown), the error might not be shown in the error string. In such cases, using `cfx_call` with identical parameters will return the into the corresponding hex error string. You are advised to refer to [Custom Errors in Solidity](https://soliditylang.org/blog/2021/04/21/custom-errors/) or language-specific SDKs to understand how to resolve the hex error string.

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

**Solution**: This error means `gas` is not enough for transaction execution and it typically means the gas exceeds the maximum amount for a single transaction, which is half of the block gas limit (15,000,000). There's a need to optimize the logic of your contract execution to reduce the gas consumption. Notably, if `gas` is specified in the estimation request, an `OutOfGas` error can still occur even though the required gas is less than 15 million.

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

This error means the `from` account does not have enough balance to pay for transaction cost, including `value` + `gas cost` + `storage collateral`.

**Solution**:

- If the `to` contract is not [sponsored](../../../core-space-basics/internal-contracts/sponsor-whitelist-control.md), ensure that `from` account is having enough CFX as balance.
- If the `to` contract is sponsored, it is recommended to check why the sponsorship does not take effect by calling [cfx_checkBalanceAgainstTransaction](../cfx-namespace.md#cfx_checkbalanceagainsttransaction) RPC. And the actual reason could be:
  - The `from` account is not in [sponsor whitelist](../../../core-space-basics/internal-contracts/sponsor-whitelist-control.md#whitelist-maintenance). Adding
  - `SponsoredBalanceForGas` or `SponsoredBalanceForCollateral` is not enough to pay for transaction cost, which value can be get from [cfx_getSponsorInfo](../cfx-namespace.md#cfx_getsponsorinfo) RPC. In this case, appending sponsored balance will solve the issue.
  - Transaction gas cost(`gas limit` \* `gas price`) exceeds the sponsorship `upperBound` setting, which value can be get from [cfx_getSponsorInfo](../cfx-namespace.md#cfx_getsponsorinfo) RPC. In this case, you need to call [setSponsorForGas](../../../core-space-basics/internal-contracts/sponsor-whitelist-control#setsponsorforgas-and-setsponsorforcollateral-behavior) to increase gas sponsorship uppper bound.

#### ConflictAddress(0x...)

```json
{
  "code": -32015,
  "message": "Can not estimate: transaction execution failed, all gas will be charged (execution error: VmError(ConflictAddress(0x87e69792aab04a1e54faa54b41a688335199c1bb)))
",
  "data": "VmError(ConflictAddress(0x87e69792aab04a1e54faa54b41a688335199c1bb))"
}
```

This means the operation being estimated will deploy the contract to an address with contract existed. The deployed contract address is determined by the deployer"s address, the deployer"s nonce and the contract"s bytecode. And this issue typically incurred because a nonce already used is specified.

**Solution**: Check if the `nonce` specified in the estimation parameters is reused and use the correct `nonce` field.

#### VmError(BadInstruction 214)

```json
{
  "code": -32015,
  "message": "Can not estimate: transaction execution failed, all gas will be charged (execution error: VmError(BadInstruction { instruction: 214 }))
",
  "data": "VmError(BadInstruction { instruction: 214 })"
}
```

This means the `data` field contains bad instruction. This error typically occurs because the `to` field is missing so the `data` cannot be resolved as expected.

**Solution**: Check if `to` field is missing from the estimation request and fill the right value.
