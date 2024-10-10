---
id: common_rpc_error
sidebar_position: 7
title: 常见 RPC 错误
keywords:
  - rpc
  - error
  - json-rpc
  - troubleshooting
  - method not found
  - invalid parameters
  - invalid address
  - invalid hash
  - estimate error
  - debugging
  - error codes
  - error messages
  - parameter validation
  - gas estimation
tags:
  - RPC
  - JSON-RPC
  - 错误
  - 故障排除
  - API
  - Method-Not-Found
  - Invalid-Parameters
  - Invalid-Address
  - Invalid-Hash
  - Estimate-Error
  - Error-Codes
  - Error-Messages
  - Parameter-Validation
  - Gas-Estimation
  - Debugging
  - Base32-Address
  - Block-Hash
  - Transaction-Hash
  - Out-Of-Gas
  - Error-Handling
  - API-Errors
  - RPC-Responses
  - JSON-Parsing
displayed_sidebar: coreSidebar
---

## 常见错误

### Method not found

```json
{
    "jsonrpc": "2.0",
    "error": {
        "code": -32601,
        "message": "Method not found"
    },
    "id": "15922956697249514502"
}
```

### Lacking parameters

```json
{
    "jsonrpc": "2.0",
    "error": {
        "code": -32602,
        "message": "Invalid params: invalid length 0, expected a tuple of size 1."
    },
    "id": "15922956697249514502"
}
```

### Passing extra parameters

```json
{
    "jsonrpc": "2.0",
    "error": {
        "code": -32602,
        "message": "Invalid params: invalid length 2, expected fewer elements in array."
    },
    "id": "15922956697249514502"
}
```

### Invalid base32 address passed

```json
{
    "jsonrpc": "2.0",
    "error": {
        "code": -32602,
        "message": "Invalid params: Invalid base32 address: input net8888:aak2rra2njvd77ezwjvx04kkds9fzagfe6xm1vavv4dd error invalid checksum (actual 1122 != 0)."
    },
    "id": "15922956697249514502"
}
```

### Invalid block/transaction hash passed

```json
{
    "jsonrpc": "2.0",
    "error": {
        "code": -32602,
        "message": "Invalid params: invalid length 65, expected a (both 0x-prefixed or not) hex string with length of 64."
    },
    "id": "15922956697249514502"
}
```

### Estimate error

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
