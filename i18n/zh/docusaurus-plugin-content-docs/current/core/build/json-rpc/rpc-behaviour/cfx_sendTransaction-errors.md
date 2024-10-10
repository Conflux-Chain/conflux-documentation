---
title: cfx_sendRawTransaction 接口错误
sidebar_position: 7
description: Cfx_sendRawTransaction的常见错误
displayed_sidebar: coreSidebar
keywords:
  - cfx_sendRawTransaction
  - errors
label:
  - cfx_sendRawTransaction
  - errors
tags:
  - cfx_sendRawTransaction
  - errors
  - json-rpc
  - transaction-execution
  - troubleshooting
  - balance
  - nonce
  - gas
  - gasPrice
  - epochHeight
  - chainId
  - transaction-pool
  - 编码
  - signature
  - catch-up-mode
  - error-handling
  - debugging
  - transaction-validation
  - network-issues
  - node-synchronization
  - transaction-replacement
  - gas-estimation
  - transaction-size
  - rlp-encoding
  - transaction-pool-management
---

这些错误是由 Conflux 协议的官方实现 [conflux-rust](https://github.com/Conflux-Chain/conflux-rust)定义的。

:::

在Conflux Core空间中通过`cfx_sendRawTransaction` 方法发送交易时,可能会因为不正确的交易构建或其他问题而出现一些错误。 本指南涵盖了常见错误及其解决方法。

## 余额不足

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

## Nonce 错误

### 使用已执行过的nonce

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

**解决方案：**将nonce更改为第一个未使用的nonce。

### 使用一个已经发送到交易池的nonce

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

或者

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

**解决方案：**交易已经发送到交易池。 请使用相同的nonce更新或替换它，同时修改相应的字段，并使用更高的gasPrice值重新发送。

### 使用过大的nonce

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

**解决方案：**将nonce更改为第一个未使用的nonce。

## 与gas相关的问题

### Gas设置过小 (`<21000`) 或者过大 (`>15m`)

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

**解决方法:**将`gas`字段改为正确的字段。

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

**解决方法:**将`gas`字段改小一点。 最大值为1500万。

## 无效的gasPrice

### GasPrice价格设置为0

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

**解决方法:** 使用`cfx_gasPrice`的返回值作为`gasPrice`。

### GasPrice低于最低的gas价格

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

## 超过数据大小限制

交易的大小有限制，最大为 200K。

## epochHeight错误

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

**解决方法:**使用`cfx_epochNumber`的返回值作为`epochHeight`

## chainId不匹配

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

**解决方法:** 使用`cfx_status`返回值中的`chainId`字段作为`chainId`。

## 编码或者签名错误

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

**解决方法:** 确保你正确地使用SDK。

## 交易池已满

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

或者

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

**解决方案：**等待一段时间后重新发送交易，并提高交易的gasPrice以增加发送的机会。

## 处于追赶模式的节点

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

**解决方案：**在发送之前，等待节点数据同步到最新。

## 内部错误

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
