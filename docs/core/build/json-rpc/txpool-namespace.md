---
id: txpool_rpc
sidebar_position: 2
title: txpool Namespace
custom_edit_url: https://github.com/Conflux-Chain/conflux-doc/edit/master/docs/RPCs/txpool-rpc.md
keywords:
  - conflux
  - txpool-rpc
  - sdk
---

`txpool` related RPCs which can enable developer get more info about transaction pool. Which was introduced from `conflux-rust v1.1.6`.

These RPC methods require node's `public_rpc_apis` config set to `safe` or `all`, or the namespace include `txpool`

## RPCs

### txpool_nextNonce

Return one address's next usable nonce in transaction pool.

#### Parameters

1. `ADDRESS`: CIP-37 address

```json
params: [
  "cfx:aak2rra2njvd77ezwjvx04kkds9fzagfe6ku8scz91"
]
```

#### Returns

`QUANTITY` - Account's next usable nonce

#### Example

Request

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

Response

```json
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "result": "0x278"
}
```