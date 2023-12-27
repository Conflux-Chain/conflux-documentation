---
title: cfx_sendRawTransaction Errors
sidebar_position: 7
description: Common errors of cfx_sendRawTransaction
displayed_sidebar: coreSidebar
---

When sending transactions in Conflux Core Space via the `cfx_sendRawTransaction` method, certain errors may arise due to incorrect transaction construction or other issues. This guide covers common errors and their solutions.

## Balance not enough

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32602,
        "message": "Invalid parameters: tx",
        "data": "\"Transaction 0xf34740b7f033b13b8670df91f24537e756700a32f17e5e09a7d297701cec6859 is discarded due to out of balance, needs 9000000000420000000000000 but account balance is 90095849479680000000000\""
    }
}
```

## Nonce Errors

### Using an already executed nonce

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32602,
        "message": "Invalid parameters: tx",
        "data": "\"Transaction 0x4a2cfa73267139d965ab86d41f2af16db09e62ff92a5abffd7f8e743f36f327c is discarded due to a too stale nonce\""
    }
}
```

**Solution:** Change the nonce to the first unused one.

### Using a nonce already sent to the transaction pool

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32602,
        "message": "Invalid parameters: tx",
        "data": "\"tx already exist\""
    }
  }
```

or

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32602,
        "message": "Invalid parameters: tx",
        "data": "Tx with same nonce already inserted. to replace it, you need to specify a gas price > {}"
    }
}
```

**Solution:** The transaction has already been sent to the transaction pool. To update or replace it, use the same nonce, modify the corresponding field, and resend it with a higher gasPrice value.

### Using a too large nonce

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32602,
        "message": "Invalid parameters: tx",
        "data":"\"Transaction 0xc875a03e1ce01268931a1a428d8f8313714ab5eb9c2b626bd327af7e5c3e8c03 is discarded due to in too distant future\""
    }
  }
```

**Solution:** Change the nonce to the first unused one.

## Gas-related Issues

### Gas too small (`<21000`) or too large (`>15m`)

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32602,
        "message": "Invalid parameters: tx",
        "data": "\"NotEnoughBaseGas { required: 21000, got: 2000 }\""
    }
}
```

**Solution:** Change the `gas` field to the right one.

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32602,
        "message": "Invalid parameters: tx",
        "data": "\"transaction gas 20000000 exceeds the maximum value 15000000, the half of pivot block gas limit\""
    }
}
```

**Solution:** Change the `gas` field to a smaller one. The maximum value is 15 million.

## Invalid gasPrice

### Gas price set to 0

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": { 
      "code": -32602,
      "message": "Invalid parameters: tx", 
      "data": "\"ZeroGasPrice\"" 
    }
}
```

**Solution:** Use return value from `cfx_gasPrice` as the `gasPrice`

### Gas price smaller than minimum gas price

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32602,
        "message": "Invalid parameters: tx",
        "data": "\"transaction gas price 1 less than the minimum value 20000000000\""
    }
}
```

## Data Size Limit Exceeded

The transaction has a size limit, with the maximum being 200k.

## Incorrect epochHeight

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32602,
        "message": "Invalid parameters: tx",
        "data": "\"EpochHeightOutOfBound { block_height: 53800739, set: 0, transaction_epoch_bound: 100000 }\""
    }
}
```

**Solution:** Use return value from `cfx_epochNumber` as the `epochHeight`

## Mismatched chainId

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32602,
        "message": "Invalid parameters: tx",
        "data": "\"ChainIdMismatch { expected: 1, got: 2 }\""
    }
}
```

**Solution:** Use `chainId` field from return value from `cfx_status` as the `chainId`

## Encoding or Signature Errors

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32602,
        "message": "Invalid parameters: raw",
        "data": "\"RlpIncorrectListLen\""
    }
}
```

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32602,
        "message": "Invalid parameters: raw",
        "data": "\"RlpExpectedToBeList\""
    }
}
```

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32602,
        "message": "Invalid parameters: tx",
        "data": "Can not recover pubkey for Ethereum like tx"
    }
}
```

**Solution:** Making sure you are using the SDK in the right way

## Full Transaction Pool

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32602,
        "message": "Invalid parameters: tx",
        "data": "txpool is full"
    }
}
```

or

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32602,
        "message": "Invalid parameters: tx",
        "data": "Failed imported to deferred pool: Transaction Pool is full"
    }
}
```

**Solution:** Wait for a while to resend the transaction and increase the gasPrice of the transaction to improve the chances of sending.

## Node in Catch-up Mode

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32077,
        "message": "Request rejected due to still in the catch up mode",
        "data": null
    }
}
```

**Solution:** Wait for the node data to sync to the latest before sending.

## Internal Error

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32602,
        "message": "Invalid parameters: tx",
        "data": "Failed to read account_cache from storage: {}"
    }
}
```

## Execution Failure

Execution failures can be due to errors that occurred during the contract execution process or errors returned when estimating gas cost through the estimate interface. To find the specific reason for the transaction failure, check the `txExecErrorMsg` under the receipt:

1.  `VmError(OutOfGas)`: The transaction specified gas fee is not enough.
2.  `VmError(ExceedStorageLimit)`: The transaction specified upper-limit storage is not enough.
3.  `NotEnoughCash`: Insufficient user balance.
4.  `Vm reverted, Reason provided by the contract: xxxx`: The contract execution failed with details provided.
5.  `VmError(BadInstruction xxxx)`: Contract deployment failed.
6.  `Vm reverted, xxxx`: The contract execution failed with no details provided.

**Solution:** Depending on the specific error message, you may need to adjust the gas fee, increase the storage limit, ensure sufficient balance, or debug the contract code to identify and fix the issues causing the failure.

Remember that when handling transaction errors, it's essential to identify the root cause of the error and apply the appropriate solution. In most cases, modifying transaction parameters, waiting for node synchronization, or debugging the contract code can help resolve the issues.
