---
sidebar_position: 7
title: Send Transaction Errors
displayed_sidebar: coreSidebar
toc_max_heading_level: 4
keywords:
  - errors
---

When using SDK or the Fluent wallet to send transactions, you may encounter some errors. This document outlines some common errors and their solutions.

## Errors from RPC endpoint

### Errors from Estimation

During the construction of a transaction, it is necessary to estimate the gas fee using the `estimateGas` method. If it is an interaction with a contract, the `estimateGas` method may fail for various reasons, such as:

- Incorrect contract method call parameters, calling a non-existent method
- The caller lacks permission
- Insufficient balance of the caller
- Exceptional errors within the contract method: e.g., division by zero, array out of bounds, overflow, etc.

If the `estimateGas` method fails, it will return an error, for example:

```json
{
    "code": -32015,
    "message": "Can not estimate: transaction execution failed, all gas will be charged (execution error: NotEnoughCash { required: 18014398509481983999023437515000000, got: 0, actual_gas_cost: 0, max_storage_limit_cost: 18014398509481983999023437500000000 })",
    "data": "0x0000xxxx"
}  
```

Sometimes, the error message contains obvious information about the error, making it easy to identify the cause. In some cases, it may only show `Vm reverted`. In such cases, you may need to locate the error through repeated code verification and trials, or by using trace data to assist in finding the error.

### `cfx_sendRawTransaction` Failure

After assembling the transaction, it needs to be sent using the [`cfx_sendRawTransaction`](/docs/core/build/json-rpc/cfx-namespace#cfx_sendrawtransaction) method, which may fail for various reasons.

#### Balance not Enough

If the sender's balance is insufficient, an error will be returned (found in the `error.data` field of the RPC response):

```json
"\"Transaction 0xtxhashxxxx is discarded due to out of balance, needs 9000000000420000000000000 but account balance is 90095849479680000000000\""
```

#### Nonce Error

If the nonce is set too large, too small, or reused, it can also lead to transaction sending failure. Specific failure situations can be seen in [nonce management](./nonce.md).

#### gasPrice Error

`gasPrice` cannot be set to 0 or too small; otherwise, you may encounter an error like:

```json
"\"transaction gas price 1 less than the minimum value 20000000000\""
```

Currently, the minimum `gasPrice` in Core Space is 1 Gdrip, equivalent to 0.000000001 CFX. In eSpace, it is 20 Gdrip, equivalent to 0.00000002 CFX.

#### gas Error

If `gas` is set too low, it may result in an OutOfGas problem, causing the transaction to fail, for example:

```json
"VmError(OutOfGas)"
```

In this case, you can resolve the issue by increasing the gas.

The `gas` value cannot be set too high either; the maximum allowed value is 15 million. Exceeding this value will result in an error like:

```json
"\"transaction gas 20000000 exceeds the maximum value 15000000, the half of pivot block gas limit\""
```

#### Transaction Pool is Full

In the case of a full transaction pool, and if the gasPrice of the sent transaction is lower than the lowest gasPrice in the transaction pool, you may encounter errors like:

```json
"Failed imported to deferred pool: Transaction Pool is full"
```

或者

```json
"txpool is full"
```

In this situation, you can solve the problem by increasing the gasPrice. You can check the current network gasPrice in the upper right corner of Scan.

## Fluent Wallet Error

When users use the Fluent wallet to send transactions, essentially, they are also sending transactions by calling the [`cfx_sendRawTransaction`](/docs/core/build/json-rpc/cfx-namespace/#cfx_sendrawtransaction) method. Therefore, they may encounter the above errors, for example:

![Fluent Wallet Error](./img/same-nonce-already-inserted.jpg)

In such cases, follow the corresponding processing method.

Additionally, using an unavailable RPC node in the Fluent wallet can also lead to transaction sending failure, for example:

```json
"failed after 0 retries: timeout"
```

In this case, you can try switching the RPC node or wait for the RPC node to recover before resending the transaction.

## 总结

If there is a network issue, please wait for the network to recover or switch to a different RPC node before resubmitting the transaction. If you encounter a full transaction pool, increase the gasPrice when sending the transaction. For other errors, it is likely that there is an issue with the settings of certain transaction fields. Please follow the methods introduced earlier to correctly set the fields and resend the transaction.

## Reference

- [cfx_sendRawTransaction error list](../../build/json-rpc/rpc-behaviour/cfx_sendTransaction-errors.md)
