---
id: trace_rpc
sidebar_position: 5
title: trace Namespace
keywords:
  - trace-rpc
  - transaction tracing
  - execution details
  - block traces
  - epoch traces
  - trace filter
  - debug
  - conflux
tags: [transaction tracing, debugging]
displayed_sidebar: coreSidebar
---

Through `trace` RPCs we can know the transaction executive details. To use these RPC Conflux archive node need set two additional config:

```toml
executive_trace = true
public_rpc_apis = "safe,trace"  // or public_rpc_apis = "all"
```

Note: An existing archive node need clear all blockchain data to open `executive_trace` config.

**Note**: From Conflux-rust v2.0 trace RPC have some breaking change, [Read below](#v20-trace-breaking-change) for details.

## Action object

An `action` object corresponds to an operation executed by the underlying EVM, which could be a call (`call`), contract creation (`create`), or an internal transfer (`internal transfer`).
Currently, there are several types of actions:

1. `call`: Represents a method call operation.
2. `call_result`: Represents the result of a method call operation.
3. `create`: Represents a contract creation operation.
4. `create_result`: Represents the result of a contract creation operation.
5. `internal_transfer_action`: Represents an internal transfer operation.
6. `set_auth`: EIP-7702 setting authorization.
7. `suicide`: Contract self-destruct.

Among these, `call` and `call_result`, as well as `create` and `create_result`, always appear in pairs, while the other types appear individually.

### call

| Field | Type | Optional | Description |
| ---| --- | --- | --- |
| space | [Space Enum](./enums.md)| | |
| from| Address | | |
| to |Address | | |
| value | U256 | | |
| gas |U256 | | |
| input | Bytes | | |
| callType | [CallType Enum](./enums.md) | | |

### call_result

| Field | Type | Optional | Description |
| ---| --- | --- | --- |
| outcome | [ActionStatus Enum](./enums.md)| | |
| gasLeft | U256| | |
| returnData | Bytes | | |

### create

| Field | Type | Optional | Description |
| ---| --- | --- | --- |
| space | [Space Enum](./enums.md)| | |
| from| Address | | |
| value | U256 | | |
| gas |U256 | | |
| init | Bytes | | |
| createType | [CreateType Enum](./enums.md) | | |

### create_result

| Field | Type | Optional | Description |
| ---| --- | --- | --- |
| outcome | [ActionStatus Enum](./enums.md)| | |
| addr | Address | | 
| gasLeft | U256| | |
| returnData | Bytes | | |

### internal_transfer_action

| Field | Type | Optional | Description |
| ---| --- | --- | --- |
| fromSpace | [Space Enum](./enums.md)| | |
| fromPocket| [Pocket Enum](./enums.md) | | |
| from |Address | | |
| toSpace | [Space Enum](./enums.md)| | |
| toPocket| [Pocket Enum](./enums.md) | | |
| to |Address | | |
| value | U256 | | |

### set_auth

| Field | Type | Optional | Description |
| ---| --- | --- | --- |
| space | [Space Enum](./enums.md)| | |
| address| Address | | Impl address |
| chainId |Uint256 | | |
| nonce | Uint256| | |
| outcome| [SetAuthOutcome Enum](./enums.md) | | |
| author |Address | ✅ | The authorizer address |

Note: Core Space does not support this type of action, which means that traces from Core Space will not contain this action type.

### suicide

| Field | Type | Optional | Description |
| ---| --- | --- | --- |
| space | [Space Enum](./enums.md)| | |
| address| Address | | Contract address |
| balance |Uint256 | | |
| refundAddress | Address|  | Refund address |

## Trace object

A `Trace` trace object contain below field:

| Field | Type | Optional | Description |
| ---| --- | --- | --- |
| type | [ActionType Enum](./enums.md)| | |
| action | Action Object| | |
| valid | Boolean| | |

Example:

```json
{
  "action": {
    "callType": "call",
    "from": "CFXTEST:TYPE.USER:AAJSUKECFVZF2MG8GZYR9GNAKZYSX9P6VU29DWZ6T2",
    "gas": "0x171e2",
    "input": "0x9c312cfd",
    "to": "CFXTEST:TYPE.CONTRACT:ACE8BSDS7WN52KHYK29NEBZWFPVZ5RPPD28KCXETJ8",
    "value": "0x1d6e3"
  },
  "type": "call",
  "valid": true
}
```

## trace RPCs

### trace_block

Get block traces by block hash

#### Parameters

1. DATA, 32 Bytes - hash of a block

#### Returns

* `BlockTrace` -  Block trace object

##### TransactionTrace object

| Field | Type | Optional | Description |
| ---| --- | --- | --- |
| transactionHash | Hash| | |
| transactionPosition| QUANTITY | | |
| traces | Array of Trace | | |

##### BlockTrace object

| Field | Type | Optional | Description |
| ---| --- | --- | --- |
| blockHash | Hash| | |
| epochHash| Hash | | |
| epochNumber | QUANTITY| | |
| transactionTraces | Array of TransactionTrace | | |

```json
// Request
curl --location --request POST 'http://testnet-rpc:12537' \
--header 'Content-Type: application/json' \
--data-raw ' {
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "method": "trace_block",
    "params": ["0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369"]
  }'

// Response
{
    "jsonrpc": "2.0",
    "result": {
        "blockHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
        "epochHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
        "epochNumber": "0x28968d0",
        "transactionTraces": [
            {
                "traces": [
                    {
                        "action": {
                            "space": "native",
                            "callType": "call",
                            "from": "CFXTEST:TYPE.USER:AAJSUKECFVZF2MG8GZYR9GNAKZYSX9P6VU29DWZ6T2",
                            "gas": "0x171e2",
                            "input": "0x9c312cfd",
                            "to": "CFXTEST:TYPE.CONTRACT:ACE8BSDS7WN52KHYK29NEBZWFPVZ5RPPD28KCXETJ8",
                            "value": "0x1d6e3"
                        },
                        "valid": true,
                        "type": "call"
                    },
                    {
                        "action": {
                            "space": "native",
                            "callType": "call",
                            "from": "CFXTEST:TYPE.CONTRACT:ACE8BSDS7WN52KHYK29NEBZWFPVZ5RPPD28KCXETJ8",
                            "gas": "0x14ac7",
                            "input": "0xb281a7bd00000000000000000000000089e0b86eec97bc24f44e3eb206b22b235db58c1e",
                            "to": "CFXTEST:TYPE.CONTRACT:ACFNPY71HJHAMY075XYPS56124ZJE5154UX9NTE7VT",
                            "value": "0x1d6e3"
                        },
                        "valid": true,
                        "type": "call"
                    },
                    {
                        "action": {
                            "space": "native",
                            "callType": "delegatecall",
                            "from": "CFXTEST:TYPE.CONTRACT:ACFNPY71HJHAMY075XYPS56124ZJE5154UX9NTE7VT",
                            "gas": "0x14157",
                            "input": "0xb281a7bd00000000000000000000000089e0b86eec97bc24f44e3eb206b22b235db58c1e",
                            "to": "CFXTEST:TYPE.CONTRACT:ACEMTZA4ZJN1FCUTZWN6P8EKDBF2X8DCZY4TEESNH8",
                            "value": "0x1d6e3"
                        },
                        "valid": true,
                        "type": "call"
                    },
                    {
                        "action": {
                            "space": "native",
                            "callType": "staticcall",
                            "from": "CFXTEST:TYPE.CONTRACT:ACFNPY71HJHAMY075XYPS56124ZJE5154UX9NTE7VT",
                            "gas": "0x13464",
                            "input": "0xf0940002",
                            "to": "CFXTEST:TYPE.CONTRACT:ACE8BSDS7WN52KHYK29NEBZWFPVZ5RPPD28KCXETJ8",
                            "value": "0x0"
                        },
                        "valid": true,
                        "type": "call"
                    },
                    {
                        "action": {
                            "gasLeft": "0x11ae8",
                            "outcome": "success",
                            "returnData": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001f00adf0308dce89889061254123a68747470733a2f2f6170692e62696e616e63652e636f6d2f6170692f76332f7469636b65722f70726963653f73796d626f6c3d434658555344541a168418778218646570726963658218571a000f4240185b1257123668747470733a2f2f7777772e6f6b65782e636f6d2f6170692f696e6465782f76332f4346582d5553442f636f6e7374697475656e74731a1d8518778218666464617461821864646c6173748218571a000f4240185b1247122e68747470733a2f2f646174612e676174656170692e696f2f617069322f312f7469636b65722f6366785f757364741a15841877821864646c6173748218571a000f4240185b1264123d68747470733a2f2f7777772e6d78632e636f6d2f6f70656e2f6170692f76322f6d61726b65742f7469636b65723f73796d626f6c3d4346585f555344541a23871877821861646461746182181800821867646c61737418728218571a000f4240185b125b123568747470733a2f2f6170692e626b65782e63632f76322f712f7469636b65722f70726963653f73796d626f6c3d4346585f555344541a228618778218616464617461821818008218646570726963658218571a000f4240185b1a0d0a0908051205fa3fc000001003220d0a0908051205fa3fc000001003100a186420012846308094ebdc0300000000000000000000000000000000"
                        },
                        "valid": true,
                        "type": "call_result"
                    },
                    {
                        "action": {
                            "space": "native",
                            "callType": "staticcall",
                            "from": "CFXTEST:TYPE.CONTRACT:ACFNPY71HJHAMY075XYPS56124ZJE5154UX9NTE7VT",
                            "gas": "0xce86",
                            "input": "0x0adf0308dce89889061254123a68747470733a2f2f6170692e62696e616e63652e636f6d2f6170692f76332f7469636b65722f70726963653f73796d626f6c3d434658555344541a168418778218646570726963658218571a000f4240185b1257123668747470733a2f2f7777772e6f6b65782e636f6d2f6170692f696e6465782f76332f4346582d5553442f636f6e7374697475656e74731a1d8518778218666464617461821864646c6173748218571a000f4240185b1247122e68747470733a2f2f646174612e676174656170692e696f2f617069322f312f7469636b65722f6366785f757364741a15841877821864646c6173748218571a000f4240185b1264123d68747470733a2f2f7777772e6d78632e636f6d2f6f70656e2f6170692f76322f6d61726b65742f7469636b65723f73796d626f6c3d4346585f555344541a23871877821861646461746182181800821867646c61737418728218571a000f4240185b125b123568747470733a2f2f6170692e626b65782e63632f76322f712f7469636b65722f70726963653f73796d626f6c3d4346585f555344541a228618778218616464617461821818008218646570726963658218571a000f4240185b1a0d0a0908051205fa3fc000001003220d0a0908051205fa3fc000001003100a186420012846308094ebdc03",
                            "to": "CFXTEST:TYPE.BUILTIN:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJK7B54454",
                            "value": "0x0"
                        },
                        "valid": true,
                        "type": "call"
                    },
                    {
                        "action": {
                            "gasLeft": "0xcd8a",
                            "outcome": "success",
                            "returnData": "0xdccb9be50637c331c1c66ef1b0c2779f0a1893661c017c530b641dcec02010dc"
                        },
                        "valid": true,
                        "type": "call_result"
                    },
                    {
                        "action": {
                            "gasLeft": "0x8fe9",
                            "outcome": "success",
                            "returnData": "0x0000000000000000000000000000000000000000000000000000000000001662"
                        },
                        "valid": true,
                        "type": "call_result"
                    },
                    {
                        "action": {
                            "gasLeft": "0x94d5",
                            "outcome": "success",
                            "returnData": "0x0000000000000000000000000000000000000000000000000000000000001662"
                        },
                        "valid": true,
                        "type": "call_result"
                    },
                    {
                        "action": {
                            "gasLeft": "0x713e",
                            "outcome": "success",
                            "returnData": "0x"
                        },
                        "valid": true,
                        "type": "call_result"
                    }
                ],
                "transactionHash": "0x8437fd07e33ffaff9dc1b360cb8b0450847b15a164059b50736c65762e6629ad",
                "transactionPosition": "0x0"
            }
        ]
    },
    "id": "15922956697249514502"
}
```

### trace_transaction

Get transaction's trace by it's hash

#### Parameters

1. DATA, 32 Bytes - hash of a transaction

#### Returns

* `Array` -  Array of `LocalizedTrace` info

##### LocalizedTrace Object

| Field | Type | Optional | Description |
| ---| --- | --- | --- |
| type | [ActionType Enum](./enums.md) | | |
| blockHash | Hash| | |
| epochHash| Hash | | |
| epochNumber | QUANTITY| | |
| transactionHash | Hash| | |
| transactionPosition| QUANTITY | | |
| valid | Boolean | | |
| action | Action Object| | |


```json
// Request
curl --location --request POST 'http://testnet-rpc:12537' \
--header 'Content-Type: application/json' \
--data-raw ' {
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "method": "trace_transaction",
    "params": ["0x8437fd07e33ffaff9dc1b360cb8b0450847b15a164059b50736c65762e6629ad"]
  }'

// Response
{
    "jsonrpc": "2.0",
    "result": [
        {
            "type": "internal_transfer_action",
            "action": {
                "from": "CFX:TYPE.USER:AAR5P39N0JGA6GN2JB4Z93E46SU6BG7ARP8152HUR2",
                "fromPocket": "balance",
                "fromSpace": "native",
                "to": "CFX:TYPE.NULL:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0SFBNJM2",
                "toPocket": "gas_payment",
                "toSpace": "none",
                "value": "0x1c13f6519ca00"
            },
            "valid": true,
            "epochHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "epochNumber": "0x83f0b14",
            "blockHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "transactionPosition": "0x1",
            "transactionHash": "0xb817af2240cccc0311419651bd7b563775c6701842a0ea42043a20ad02a1128e"
        },
        {
            "type": "call",
            "action": {
                "space": "native",
                "from": "CFX:TYPE.USER:AAR5P39N0JGA6GN2JB4Z93E46SU6BG7ARP8152HUR2",
                "to": "CFX:TYPE.CONTRACT:ACAD67180SED348RWSFUR34DZ6VS8MMCAJ8TV9B69E",
                "value": "0x0",
                "gas": "0x73739",
                "input": "0xddbbce3b",
                "callType": "call"
            },
            "valid": true,
            "epochHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "epochNumber": "0x83f0b14",
            "blockHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "transactionPosition": "0x1",
            "transactionHash": "0xb817af2240cccc0311419651bd7b563775c6701842a0ea42043a20ad02a1128e"
        },
        {
            "type": "call",
            "action": {
                "space": "native",
                "from": "CFX:TYPE.CONTRACT:ACAD67180SED348RWSFUR34DZ6VS8MMCAJ8TV9B69E",
                "to": "CFX:TYPE.CONTRACT:ACFVDMF5XK7R0FDH9FBGRX3D579D3M3EFJRH3BX1JJ",
                "value": "0x0",
                "gas": "0x706ac",
                "input": "0xddbbce3b",
                "callType": "delegatecall"
            },
            "valid": true,
            "epochHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "epochNumber": "0x83f0b14",
            "blockHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "transactionPosition": "0x1",
            "transactionHash": "0xb817af2240cccc0311419651bd7b563775c6701842a0ea42043a20ad02a1128e"
        },
        {
            "type": "call",
            "action": {
                "space": "native",
                "from": "CFX:TYPE.CONTRACT:ACAD67180SED348RWSFUR34DZ6VS8MMCAJ8TV9B69E",
                "to": "CFX:TYPE.CONTRACT:ACCRDADJNXBX75X5MX6523FAJWX3K81B12EUGEC37V",
                "value": "0x0",
                "gas": "0x6ce13",
                "input": "0x82df7a3b",
                "callType": "staticcall"
            },
            "valid": true,
            "epochHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "epochNumber": "0x83f0b14",
            "blockHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "transactionPosition": "0x1",
            "transactionHash": "0xb817af2240cccc0311419651bd7b563775c6701842a0ea42043a20ad02a1128e"
        },
        {
            "type": "call",
            "action": {
                "space": "native",
                "from": "CFX:TYPE.CONTRACT:ACCRDADJNXBX75X5MX6523FAJWX3K81B12EUGEC37V",
                "to": "CFX:TYPE.CONTRACT:ACF81PBPVSEP9HMCCWVHGP0SXX72EKTCNPZN8HBUE9",
                "value": "0x0",
                "gas": "0x69f2a",
                "input": "0x82df7a3b",
                "callType": "delegatecall"
            },
            "valid": true,
            "epochHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "epochNumber": "0x83f0b14",
            "blockHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "transactionPosition": "0x1",
            "transactionHash": "0xb817af2240cccc0311419651bd7b563775c6701842a0ea42043a20ad02a1128e"
        },
        {
            "type": "call_result",
            "action": {
                "outcome": "success",
                "gasLeft": "0x418ce",
                "returnData": "0x0000000000000000000000000000000000000000000000000000000000000285"
            },
            "valid": true,
            "epochHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "epochNumber": "0x83f0b14",
            "blockHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "transactionPosition": "0x1",
            "transactionHash": "0xb817af2240cccc0311419651bd7b563775c6701842a0ea42043a20ad02a1128e"
        },
        {
            "type": "call_result",
            "action": {
                "outcome": "success",
                "gasLeft": "0x4338a",
                "returnData": "0x0000000000000000000000000000000000000000000000000000000000000285"
            },
            "valid": true,
            "epochHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "epochNumber": "0x83f0b14",
            "blockHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "transactionPosition": "0x1",
            "transactionHash": "0xb817af2240cccc0311419651bd7b563775c6701842a0ea42043a20ad02a1128e"
        },
        {
            "type": "call",
            "action": {
                "space": "native",
                "from": "CFX:TYPE.CONTRACT:ACAD67180SED348RWSFUR34DZ6VS8MMCAJ8TV9B69E",
                "to": "CFX:TYPE.BUILTIN:AAEJUAAAAAAAAAAAAAAAAAAAAAAAAAAAA2SN102VJV",
                "value": "0x0",
                "gas": "0x42724",
                "input": "0xbea05ee3e9af34e140ab2a30e1ec1f39917aa506504b8c320000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000002401cfc7f8000000000000000000000000000000000000000000000000000000000000028500000000000000000000000000000000000000000000000000000000",
                "callType": "call"
            },
            "valid": true,
            "epochHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "epochNumber": "0x83f0b14",
            "blockHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "transactionPosition": "0x1",
            "transactionHash": "0xb817af2240cccc0311419651bd7b563775c6701842a0ea42043a20ad02a1128e"
        },
        {
            "type": "internal_transfer_action",
            "action": {
                "from": "CFX:TYPE.BUILTIN:AAEJUAAAAAAAAAAAAAAAAAAAAAAAAAAAA2SN102VJV",
                "fromPocket": "balance",
                "fromSpace": "native",
                "to": "CFX:TYPE.UNKNOWN:AD9CWFZA79RKKB8FW3T6WJJNH6V4E99NVA4CJ5FFTP",
                "toPocket": "balance",
                "toSpace": "evm",
                "value": "0x0"
            },
            "valid": true,
            "epochHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "epochNumber": "0x83f0b14",
            "blockHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "transactionPosition": "0x1",
            "transactionHash": "0xb817af2240cccc0311419651bd7b563775c6701842a0ea42043a20ad02a1128e"
        },
        {
            "type": "call_result",
            "action": {
                "outcome": "success",
                "gasLeft": "0x33d45",
                "returnData": "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000"
            },
            "valid": true,
            "epochHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "epochNumber": "0x83f0b14",
            "blockHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "transactionPosition": "0x1",
            "transactionHash": "0xb817af2240cccc0311419651bd7b563775c6701842a0ea42043a20ad02a1128e"
        },
        {
            "type": "call",
            "action": {
                "space": "native",
                "from": "CFX:TYPE.CONTRACT:ACAD67180SED348RWSFUR34DZ6VS8MMCAJ8TV9B69E",
                "to": "CFX:TYPE.CONTRACT:ACCRDADJNXBX75X5MX6523FAJWX3K81B12EUGEC37V",
                "value": "0x0",
                "gas": "0x339f4",
                "input": "0xd68076c3000000000000000000000000803e76feb3883cebcd938b06e743af22ef294202",
                "callType": "staticcall"
            },
            "valid": true,
            "epochHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "epochNumber": "0x83f0b14",
            "blockHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "transactionPosition": "0x1",
            "transactionHash": "0xb817af2240cccc0311419651bd7b563775c6701842a0ea42043a20ad02a1128e"
        },
        {
            "type": "call",
            "action": {
                "space": "native",
                "from": "CFX:TYPE.CONTRACT:ACCRDADJNXBX75X5MX6523FAJWX3K81B12EUGEC37V",
                "to": "CFX:TYPE.CONTRACT:ACF81PBPVSEP9HMCCWVHGP0SXX72EKTCNPZN8HBUE9",
                "value": "0x0",
                "gas": "0x32aa6",
                "input": "0xd68076c3000000000000000000000000803e76feb3883cebcd938b06e743af22ef294202",
                "callType": "delegatecall"
            },
            "valid": true,
            "epochHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "epochNumber": "0x83f0b14",
            "blockHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "transactionPosition": "0x1",
            "transactionHash": "0xb817af2240cccc0311419651bd7b563775c6701842a0ea42043a20ad02a1128e"
        },
        {
            "type": "call_result",
            "action": {
                "outcome": "success",
                "gasLeft": "0x2d6b4",
                "returnData": "0x0000000000000000000000000000000000000000000000000000000000000000"
            },
            "valid": true,
            "epochHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "epochNumber": "0x83f0b14",
            "blockHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "transactionPosition": "0x1",
            "transactionHash": "0xb817af2240cccc0311419651bd7b563775c6701842a0ea42043a20ad02a1128e"
        },
        {
            "type": "call_result",
            "action": {
                "outcome": "success",
                "gasLeft": "0x2e366",
                "returnData": "0x0000000000000000000000000000000000000000000000000000000000000000"
            },
            "valid": true,
            "epochHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "epochNumber": "0x83f0b14",
            "blockHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "transactionPosition": "0x1",
            "transactionHash": "0xb817af2240cccc0311419651bd7b563775c6701842a0ea42043a20ad02a1128e"
        },
        {
            "type": "call_result",
            "action": {
                "outcome": "success",
                "gasLeft": "0x2ef0a",
                "returnData": "0x"
            },
            "valid": true,
            "epochHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "epochNumber": "0x83f0b14",
            "blockHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "transactionPosition": "0x1",
            "transactionHash": "0xb817af2240cccc0311419651bd7b563775c6701842a0ea42043a20ad02a1128e"
        },
        {
            "type": "call_result",
            "action": {
                "outcome": "success",
                "gasLeft": "0x30b6d",
                "returnData": "0x"
            },
            "valid": true,
            "epochHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "epochNumber": "0x83f0b14",
            "blockHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "transactionPosition": "0x1",
            "transactionHash": "0xb817af2240cccc0311419651bd7b563775c6701842a0ea42043a20ad02a1128e"
        },
        {
            "type": "internal_transfer_action",
            "action": {
                "from": "CFX:TYPE.NULL:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0SFBNJM2",
                "fromPocket": "gas_payment",
                "fromSpace": "none",
                "to": "CFX:TYPE.USER:AAR5P39N0JGA6GN2JB4Z93E46SU6BG7ARP8152HUR2",
                "toPocket": "balance",
                "toSpace": "native",
                "value": "0x704fca5fc000"
            },
            "valid": true,
            "epochHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "epochNumber": "0x83f0b14",
            "blockHash": "0x20b2241f1c4ad1f64a1fbb677ebbf5a4f1e334120a8ee5e7e1c1d5cf96e286a7",
            "transactionPosition": "0x1",
            "transactionHash": "0xb817af2240cccc0311419651bd7b563775c6701842a0ea42043a20ad02a1128e"
        }
    ],
    "id": "15922956697249514502"
}
```

### trace_epoch

Get whole epoch transaction's trace by it's number

#### Parameters

1. `QUANTITY|TAG` - the epoch number, or the string `"latest_mined"`, `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-default-epochnumber-parameter).

#### Returns

| Field | Type | Optional | Description |
| ---| --- | --- | --- |
| cfxTraces | Array of LocalizedTrace| | |
| ethTraces | Array of eSpaceTraceObject| | |
| mirrorAddressMap | Map<Address, Base32>| | hex address to base32 address |

eSpaceTraceObject

| Field | Type | Optional | Description |
| ---| --- | --- | --- |
| action | Call or Create or SelfDestruct| | |
| result | CallResult or CreateResult Or None | | |
| error | String | ✅| |
| traceAddress | Array of Number | | [explanation](https://docs.erigon.tech/interacting-with-erigon/interacting-with-erigon/trace#traceaddress-field) |
| subtraces | Number | | Count of subtraces |
| transactionPosition | Number | | |
| transactionHash | Hash | | |
| blockNumber | Number | | |
| blockHash | Hash | | |
| valid | Boolean | | |

### trace_filter

Returns all traces matching the provided filter.

#### Parameters

1. `Object` - A trace filter object

| Field | Type | Optional | Description |
| ---| --- | --- | --- |
| fromEpoch |QUANTITY or TAG | ✅| the epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-default-epochnumber-parameter) Search will be applied from this epoch number.|
| toEpoch |QUANTITY or TAG | ✅| the epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-default-epochnumber-parameter). Search will be applied up until (and including) this epoch number.|
| fromAddress |Base32 |✅ | |
| toAddress |Base32 | ✅| |
| blockHashes |Array of Hash | ✅| default: `null` Array of up to 128 block hashes that the search will be applied to. This will override from/to epoch fields if it's not `null`.|
| actionTypes |Array of [ActionType Enum](./enums.md) | ✅|If None, match all. If specified, trace must match one of these action types. |
| after |QUANTITY | ✅|The offset trace number. |
| count |QUANTITY | ✅|The number of traces to display in a batch. |
#### Returns

Same as `trace_transaction`

## Note

Only traces which's `callType` value is `call` and have `success` result status, that can indicate CFX transfer.

## V2.0 trace breaking change

From Conflux-rust v2.0 the trace RPC have imported some breaking change, below is a quick introduction of the updates, there also is [detail document here](https://github.com/Conflux-Chain/CIPs/issues/88)

**Note: To use the new trace data, the fullnode data should be cleaned and resynchronization.**

### New added field `valid`

A new field `valid` is added to trace to indicate whether the corresponding trace is reverted.

**Note: If the old trace data is not cleaned and resynchronization, the `valid` filed will always be true.**

### Gas consume and refund trace was introduced

Any transaction bumping nonce during execution will generate one or two traces with type "internal_transfer_action" to indicate gas payment and gas refund.

Consider a transaction has gas limit 40000 and gas price 3 Drip.

```js
{
    "action": {
        "from": <contract_address>,
        "fromPocket": "sponsor_balance_for_gas",
        "to": <zero_address>,
        "toPocket": "gas_payment",
        "value": 120000, 
    }
    "type": "internal_transfer_action"
    ......
}
```

If the transaction is not sponsored, the trace will be

```js
{
    "action": {
        "from": <sender_address>,
        "fromPocket": "balance",
        "to": <zero_address>,
        "toPocket": "gas_payment",
        "value": 120000, 
    }
    "type": "internal_transfer_action"
    ......
}
```

This should be the first trace of most transactions.

After execution, if this transaction costs 25000 gas, up to 1/4 of gas limit, i.e., 10000 gas (30000 Drip when gas price = 3) will be refunded, then it will generate a trace

```js
{
    "action": {
        "from": <zero_address>,
        "fromPocket": "gas_payment",
        "to": ...,
        "toPocket": ...,
        "value": 30000, 
    },
    "type": "internal_transfer_action",
    ...
}
```

### Trace for storage collateral.

Consider a transaction collateralize 10 Drip (it can not happen in a real Conflux system, just for example).

If the transaction is sponsored,

```js
{
    "action": {
        "from": <contract_address>,
        "fromPocket": "sponsor_balance_for_collateral",
        "to": <contract_address>,
        "toPocket": "storage_collateral",
        "value": 10, 
    },
    "type": "internal_transfer_action",
    ...
}
```

If the transaction is not sponsored,

```js
{
    "action": {
        "from": <sender_address>,
        "fromPocket": "balance",
        "to": <sender_address>,
        "toPocket": "storage_collateral",
        "value": 10, 
    },
    "type": "internal_transfer_action",
    ...
}
```

When releasing storage, the value will be returned to the same route.

### Indicator for kill contract

Each time a contract is killed, it will produce such a trace,

```js
{
    "action": {
        "from": <contract_address>,
        "fromPocket": "balance",
        "to": <zero_address>, 
        "toPocket": "mint_or_burn",
        "value": ...,
        ...
    },
    "type": "internal_transfer_action",
    ...
}
```

### New added `space` field

The `call` and `create` type action will add a new field `space` indicate wich space the trace is occured, the possible value are:

* `native`
* `ethereum`
* `none`

### Four new field added to `internal_transfer_action`

* `fromPocket`
* `toPocket`
* `fromSpace`
* `toSpace`

#### Specification for pocket

In Conflux, each account could have several pockets to store CFX.

* `balance`
* `staking_balance`
* `storage_collateral`
* `sponsor_balance_for_gas`
* `sponsor_balance_for_collateral`

The fromPocket field and toPocket field could be one of them.

Besides these five values, the "pocket" could be two special values `mint_or_burn` and `gas_payment`.

* fromPocket = `mint_or_burn`: mint CFX, e.g., generate staking interest
* toPocket = `mint_or_burn`: burn CFX, e.g., when a contract is killed, its staking balance will be burnt.
* fromPocket = `gas_payment`: gas payment, usually equals to gas_price * gas_limit
* toPocket = `gas_payment`: gas refund after transaction execution.

#### Specification for space

* native
* evm
* none

### Changes in integrity constraints

#### Before change

* The balance increasing (or decreasing) of an address (except the internal contract) during transaction execution corresponds to a trace whose "to" (or "from") is this address.

#### After change

* The balance increasing (or decreasing) of an address (all the address) during transaction execution corresponds to a trace whose "to" (or "from") is this address and "toPocket" (or "fromPocket") is "balance". (Note: for trace type except "interal_transfer_action", the "fromPocket" and "toPocket" equal to "balance" implicitly.)
* The staking balance/collateral balance/sponsor balance for gas/sponsor balance for collateral increasing (or decreasing) of an address during transaction execution corresponds to an internal_transfer type trace whose "to" (or "from") is this address and "toPocket" (or "fromPocket") is "sponsor_balance"/"storage_collateral"/"sponsor_balance_for_gas"/"sponsor_balance_for_collateral".
