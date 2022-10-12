---
id: send_tx_error
sidebar_position: 7
title: cfx_sendRawTransaction errors
custom_edit_url: https://github.com/Conflux-Chain/conflux-doc/edit/master/docs/RPCs/send-tx-error.md
keywords:
  - rpc
  - error
---

When sending transaction through `cfx_sendRawTransaction` method, if the transaction is not build correctly, the method will failed and return some error message.
Below are the most common errrors.

## Incorrect `nonce`

### tx already exist

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
        "data": "Tx with same nonce already inserted. To replace it, you need to specify a gas price > {}"
    }
}
```

To replace transaction in pool, specify a bigger gasPrice and resend.

### tool stale nonce

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

### too distant future

```js
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "error": {
        "code": -32602,
        "message": "Invalid parameters: tx",
        "data": "\"Transaction 0xc875a03e1ce01268931a1a428d8f8313714ab5eb9c2b626bd327af7e5c3e8c03 is discarded due to in too distant future\""
    }
}
```

## Incorrect `gas`

### NotEnoughBaseGas

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

### exceeds the maximum value 15000000

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

## Incorrect `gasPrice`

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

## Incorrect `epochHeight`

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

## Incorrect `to` address

```js
{
  "jsonrpc": "2.0",
  "id": "15922956697249514502",
  "error": {
      "code": -32602,
      "message": "Invalid parameters: tx",
      "data": "Unsupported receiver address type"
  }
}
```

## Incorrect `chainId`

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

## Encode or Signature error

### Rlp encode

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

### Signature error

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

## Fullnode error

### txpool is full

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

### catch up mode

```js
{
  "jsonrpc": "2.0",
  "id": "15922956697249514502",
  "error": {
      "code": -32077,
      "message": "Request rejected due to still in the catch up mode.",
      "data": null
  }
}
```

### Other

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
