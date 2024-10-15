---
title: cfx_estimateGasAndCollateral Behaviour
sidebar_position: 8
description: Behaviour of cfx_estimateGasAndCollateral
displayed_sidebar: coreSidebar
keywords:
  - cfx_estimateGasAndCollateral
  - errors
toc_max_heading_level: 4
tags:
  - cfx_estimateGasAndCollateral
  - errors
  - json-rpc
  - gas-estimation
  - transaction-execution
  - troubleshooting
  - parameter-handling
  - sponsored-transactions
  - contract-execution
  - balance-checks
  - storage-collateral
  - nonce-handling
  - contract-deployment
  - error-handling
---

The `cfx_estimateGasAndCollateral` interface is a critical component of the Conflux blockchain, as it allows users to estimate the gas and storage collateral required for their transactions. This document aims to clearly outline the functioning of the `cfx_estimateGasAndCollateral` interface, with a particular emphasis on its response to various parameter configurations.

:::note

The behaviors described below are implemented by [conflux-rust](https://github.com/Conflux-Chain/conflux-rust), the official Rust implementation of the Conflux protocol.

:::

## Behavior in the Absence or Defaulting of Parameters

The response of the interface is contingent on whether specific fields in the input are present or absent:

1. **If `from` is Absent**: The interface will not perform any checks related to the `balance`. (However, execution might fail because `from` is absent).
2. **If `gas_price` is Absent**: It skips the checks for gas-related transaction fees and the [Sponsor Gas Upper Bound](../../../core-space-basics/internal-contracts/sponsor-whitelist-control.md).
3. **If `nonce` is Absent**: The interface automatically fills in the current correct nonce. Conversely, if `nonce` is provided, the transaction will proceed with the specified nonce and avoid failing due to nonce-related errors.
4. **If `value` is Absent**: The default is set to a value of 0.
5. **If `data` is Absent**: It defaults to empty.
6. **If `to` is Absent**: The interface defaults to contract creation.

:::note

Typically, the `cfx_estimateGasAndCollateral` is invoked automatically by the Conflux SDK (e.g., `js-conflux-sdk`, `java-conflux-sdk`, etc.) when sending a transaction. If you are not directly invoking `cfx_estimateGasAndCollateral`, the presence or absence of the above parameters will depend on the behavior of the SDK you are using.

:::

### Handling Redundant Parameters

While the primary function of the `cfx_estimate` is to estimate gas and storage collateral, it also accepts user inputs for these parameters. This section delineates the logic applied in such scenarios:

#### Gas is Specified

1. The transaction executes using the specified `gas`. This the only scenario for an `OutOfGas` error other than the gas consumption exceeds the 15 million limit.
2. If both `from` and `gas_price` are specified, transaction fees are deducted during the estimation. Otherwise, fees are rechecked post-execution.

#### Storage Limit is Specified

1. The specified `storage_limit` is disregarded during transaction execution estimation. After the estimation, it"s assessed whether the provided storage limit suffices.

### Other Considerations

**Sponsored Storage**: In cases where storage is sponsored, the `storage_limit` check is not performed, adhering to Conflux"s intrinsic logic.

## Errors

### Estimation isn't accurate: transaction is reverted

```json
{
    "code": -32015,
    "message": "Estimation isn't accurate: transaction is reverted. Innermost error is at CFX:TYPE.CONTRACT:ACDUZTJBPM9PPP9F0K5VT3PJU0EJUDNHP2ZM7WS35N: Vm reverted. .",
    "data": "CFX:TYPE.CONTRACT:ACDUZTJBPM9PPP9F0K5VT3PJU0EJUDNHP2ZM7WS35N: Vm reverted. \nCFX:TYPE.CONTRACT:ACD5E6SPRGMDVG15FDXF2B8AH7DAN7GMZAGXA10EPZ: Vm reverted. "
}
```

Encountering this error means that the interface failed to return the estimation result because, because transaction was reverted ( contract method code failed to execute). There are various possible causes for this error, such as: insufficient balance of related ERC-20 tokens or NFTs; parameter errors for the contract method; lack of permission or authorization, and so on.

If an error message is thrown during contract execution, the specific reason for the contract execution failure can be seen in the RPC error message. For example, the following error occurred when transferring NFT (1155), indicating insufficient balance: `Estimation isn't accurate: transaction is reverted: ERC1155: insufficient balance for transfer. Innermost error is at xxxx: Vm reverted. ERC1155: insufficient balance for transfer`.

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
