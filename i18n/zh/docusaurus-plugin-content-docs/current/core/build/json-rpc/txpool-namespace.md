---
id: txpool_rpc
sidebar_position: 2
title: txpool 命名空间
keywords:
  - conflux
  - txpool-rpc
  - sdk
displayed_sidebar: coreSidebar
---

`txpool` 相关的 RPC 可以让开发者获取更多关于交易池的信息。 Which was introduced from `conflux-rust v1.1.6`.

These RPC methods require node's `public_rpc_apis` config set to `safe` or `all`, or the namespace include `txpool`

## RPCs

### txpool_nextNonce

返回交易池中一个地址的下一个可用nonce。

#### 参数

1. `ADDRESS`: CIP-37 address

```json
params: [
  "cfx:aak2rra2njvd77ezwjvx04kkds9fzagfe6ku8scz91"
]
```

#### 返回值

`QUANTITY` - Account's next usable nonce

#### 示例

请求

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "txpool_nextNonce",
    "params": ["cfx:aak2rra2njvd77ezwjvx04kkds9fzagfe6ku8scz91"]
}'
```

返回结果

```json
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "result": "0x278"
}
```
