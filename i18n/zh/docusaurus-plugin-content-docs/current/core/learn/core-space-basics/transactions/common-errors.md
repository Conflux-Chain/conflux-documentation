---
sidebar_position: 2
title: Common Errors
---

# Common Error

When sending a transaction via method `cfx_sendRawTransaction`, if the transaction is not constructed correctly, the sending will fail. Some of the common errors are:

- using a nonce that has already been executed
- using a nonce that has already been sent to the transaction pool

There are also several other cases where sending fails:

- The chainId is under mismatch.
- epochHeight is too large
- gas exceeds 15 million (half of block gas limit)
- gas is less than 21000
- data is too large (exceeds 200K)
- gasPrice is set to 0
- Signature error
- Transaction pool is full

The following are the RPC errors returned by the `cfx_sendRawTransaction` method when a transaction fails

## Nonce Usage Error

### using a nonce that has already been executed

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

In this case, the nonce needs to be changed to a currently available (unused) one

### using a nonce that has already been sent to the transaction pool

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

For both cases, the transaction has already been sent to the transaction pool. If you want to update or replace it, you can use the same nonce, modify the corresponding field, and resend it with a higher gasPrice value.

### using a too large nonce

The nonce for sending a transaction cannot be too large for the user's current nonce. If it exceeds 2000, the following error will be found:

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

### Gas

If the gas traded is too small (`<21000`) or too large (`>15m`) the following error is returned:

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

### gasPrice

The gasPrice of the transaction cannot be set to 0:

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

### Data

The transaction has a size limit. The maximum is 200k.

### epochHeight

If the epochHeight of a transaction is smaller than the epochNumber of the current network by more than 100k, the following error will be found.

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

### chainId Usage Error

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

### Encoding or Signature Error

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
        "message": "Invalid parameters: tx",
        "data": "Can not recover pubkey for Ethereum like tx"
    }
}
```

### Full Transaction Pool

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

In this case, you can wait for a while to resend the transaction and increase the gasPrice of the transaction to help improve the chances of sending

## Others

### the node is in catch-up mode

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32077,
        "message": "Request rejected due to still in the catch up mode,
        "data": null
    }
}
```

Wait for the node data to sync to the latest before sending

### internal error

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

