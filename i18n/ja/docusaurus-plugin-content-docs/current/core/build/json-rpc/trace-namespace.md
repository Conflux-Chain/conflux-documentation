---
id: trace_rpc
sidebar_position: 5
title: trace Namespace
keywords:
  - trace-rpc
displayed_sidebar: coreSidebar
---

Through `trace` RPCs we can know the transaction executive details. To use these RPC Conflux archive node need set two additional config:

```toml
executive_trace = true
public_rpc_apis = "safe,trace"  // or public_rpc_apis = "all"
```

Note: An existing archive node need clear all blockchain data to open `executive_trace` config.

**Note**: From Conflux-rust v2.0 trace RPC have some breaking change, [Read below](#v20-trace-breaking-change) for details.

## Trace object

A `Trace` trace object contain below field:

* `type`: `STRING` - Type of trace. Avaliable value is `call`, `create`, `call_result`, `create_result`, `internal_transfer_action`
* `action`: `OBJECT` - Trace's action info，different type trace's action have different fields.

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
  "type": "call"
}
```

Check this [document](https://github.com/Conflux-Chain/conflux-doc/blob/master/docs/trace_introduction.md) to get detail explanation of Conflux trace

## RPCs

### trace_block

Get block traces by block hash

#### Parameters

1. DATA, 32 Bytes - hash of a block

#### Returns

* `blockHash`: `HASH` - Hash of block
* `epochHash`: `HASH` - Hash of epoch
* `epochNumber`: `QUANTITY` - Number of epoch
* `transactionTraces`: `Array` -  Array of `TransactionTrace` info

##### TransactionTrace

* `transactionHash`: `HASH` - Hash of transaction
* `transactionPosition`: `QUANTITY` - Position of transaction in block
* `traces`: `Array` - Array of `Trace`

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
                            "callType": "call",
                            "from": "CFXTEST:TYPE.USER:AAJSUKECFVZF2MG8GZYR9GNAKZYSX9P6VU29DWZ6T2",
                            "gas": "0x171e2",
                            "input": "0x9c312cfd",
                            "to": "CFXTEST:TYPE.CONTRACT:ACE8BSDS7WN52KHYK29NEBZWFPVZ5RPPD28KCXETJ8",
                            "value": "0x1d6e3"
                        },
                        "type": "call"
                    },
                    {
                        "action": {
                            "callType": "call",
                            "from": "CFXTEST:TYPE.CONTRACT:ACE8BSDS7WN52KHYK29NEBZWFPVZ5RPPD28KCXETJ8",
                            "gas": "0x14ac7",
                            "input": "0xb281a7bd00000000000000000000000089e0b86eec97bc24f44e3eb206b22b235db58c1e",
                            "to": "CFXTEST:TYPE.CONTRACT:ACFNPY71HJHAMY075XYPS56124ZJE5154UX9NTE7VT",
                            "value": "0x1d6e3"
                        },
                        "type": "call"
                    },
                    {
                        "action": {
                            "callType": "delegatecall",
                            "from": "CFXTEST:TYPE.CONTRACT:ACFNPY71HJHAMY075XYPS56124ZJE5154UX9NTE7VT",
                            "gas": "0x14157",
                            "input": "0xb281a7bd00000000000000000000000089e0b86eec97bc24f44e3eb206b22b235db58c1e",
                            "to": "CFXTEST:TYPE.CONTRACT:ACEMTZA4ZJN1FCUTZWN6P8EKDBF2X8DCZY4TEESNH8",
                            "value": "0x1d6e3"
                        },
                        "type": "call"
                    },
                    {
                        "action": {
                            "callType": "staticcall",
                            "from": "CFXTEST:TYPE.CONTRACT:ACFNPY71HJHAMY075XYPS56124ZJE5154UX9NTE7VT",
                            "gas": "0x13464",
                            "input": "0xf0940002",
                            "to": "CFXTEST:TYPE.CONTRACT:ACE8BSDS7WN52KHYK29NEBZWFPVZ5RPPD28KCXETJ8",
                            "value": "0x0"
                        },
                        "type": "call"
                    },
                    {
                        "action": {
                            "gasLeft": "0x11ae8",
                            "outcome": "success",
                            "returnData": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001f00adf0308dce89889061254123a68747470733a2f2f6170692e62696e616e63652e636f6d2f6170692f76332f7469636b65722f70726963653f73796d626f6c3d434658555344541a168418778218646570726963658218571a000f4240185b1257123668747470733a2f2f7777772e6f6b65782e636f6d2f6170692f696e6465782f76332f4346582d5553442f636f6e7374697475656e74731a1d8518778218666464617461821864646c6173748218571a000f4240185b1247122e68747470733a2f2f646174612e676174656170692e696f2f617069322f312f7469636b65722f6366785f757364741a15841877821864646c6173748218571a000f4240185b1264123d68747470733a2f2f7777772e6d78632e636f6d2f6f70656e2f6170692f76322f6d61726b65742f7469636b65723f73796d626f6c3d4346585f555344541a23871877821861646461746182181800821867646c61737418728218571a000f4240185b125b123568747470733a2f2f6170692e626b65782e63632f76322f712f7469636b65722f70726963653f73796d626f6c3d4346585f555344541a228618778218616464617461821818008218646570726963658218571a000f4240185b1a0d0a0908051205fa3fc000001003220d0a0908051205fa3fc000001003100a186420012846308094ebdc0300000000000000000000000000000000"
                        },
                        "type": "call_result"
                    },
                    {
                        "action": {
                            "callType": "staticcall",
                            "from": "CFXTEST:TYPE.CONTRACT:ACFNPY71HJHAMY075XYPS56124ZJE5154UX9NTE7VT",
                            "gas": "0xce86",
                            "input": "0x0adf0308dce89889061254123a68747470733a2f2f6170692e62696e616e63652e636f6d2f6170692f76332f7469636b65722f70726963653f73796d626f6c3d434658555344541a168418778218646570726963658218571a000f4240185b1257123668747470733a2f2f7777772e6f6b65782e636f6d2f6170692f696e6465782f76332f4346582d5553442f636f6e7374697475656e74731a1d8518778218666464617461821864646c6173748218571a000f4240185b1247122e68747470733a2f2f646174612e676174656170692e696f2f617069322f312f7469636b65722f6366785f757364741a15841877821864646c6173748218571a000f4240185b1264123d68747470733a2f2f7777772e6d78632e636f6d2f6f70656e2f6170692f76322f6d61726b65742f7469636b65723f73796d626f6c3d4346585f555344541a23871877821861646461746182181800821867646c61737418728218571a000f4240185b125b123568747470733a2f2f6170692e626b65782e63632f76322f712f7469636b65722f70726963653f73796d626f6c3d4346585f555344541a228618778218616464617461821818008218646570726963658218571a000f4240185b1a0d0a0908051205fa3fc000001003220d0a0908051205fa3fc000001003100a186420012846308094ebdc03",
                            "to": "CFXTEST:TYPE.BUILTIN:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJK7B54454",
                            "value": "0x0"
                        },
                        "type": "call"
                    },
                    {
                        "action": {
                            "gasLeft": "0xcd8a",
                            "outcome": "success",
                            "returnData": "0xdccb9be50637c331c1c66ef1b0c2779f0a1893661c017c530b641dcec02010dc"
                        },
                        "type": "call_result"
                    },
                    {
                        "action": {
                            "gasLeft": "0x8fe9",
                            "outcome": "success",
                            "returnData": "0x0000000000000000000000000000000000000000000000000000000000001662"
                        },
                        "type": "call_result"
                    },
                    {
                        "action": {
                            "gasLeft": "0x94d5",
                            "outcome": "success",
                            "returnData": "0x0000000000000000000000000000000000000000000000000000000000001662"
                        },
                        "type": "call_result"
                    },
                    {
                        "action": {
                            "gasLeft": "0x713e",
                            "outcome": "success",
                            "returnData": "0x"
                        },
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

#### Returns

### trace_transaction

Get transaction's trace by it's hash

#### Parameters

1. DATA, 32 Bytes - hash of a transaction

#### Returns

* `type`: `string` - Avaliable value is `call`, `create`, `call_result`, `create_result`, `internal_transfer_action`
* `transactionPosition`: `QUANTITY` - Position of transaction in block
* `transactionHash`: `HASH` - Hash of transaction
* `epochNumber`: `QUANTITY` - Number of epoch
* `epochHash`: `HASH` - Hash of epoch
* `blockHash`: `HASH` - Hash of block
* `action`: `OBJECT` - Trace info

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
            "action": {
                "callType": "call",
                "from": "CFXTEST:TYPE.USER:AAJSUKECFVZF2MG8GZYR9GNAKZYSX9P6VU29DWZ6T2",
                "gas": "0x171e2",
                "input": "0x9c312cfd",
                "to": "CFXTEST:TYPE.CONTRACT:ACE8BSDS7WN52KHYK29NEBZWFPVZ5RPPD28KCXETJ8",
                "value": "0x1d6e3"
            },
            "blockHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochNumber": "0x28968d0",
            "transactionHash": "0x8437fd07e33ffaff9dc1b360cb8b0450847b15a164059b50736c65762e6629ad",
            "transactionPosition": "0x0",
            "type": "call"
        },
        {
            "action": {
                "callType": "call",
                "from": "CFXTEST:TYPE.CONTRACT:ACE8BSDS7WN52KHYK29NEBZWFPVZ5RPPD28KCXETJ8",
                "gas": "0x14ac7",
                "input": "0xb281a7bd00000000000000000000000089e0b86eec97bc24f44e3eb206b22b235db58c1e",
                "to": "CFXTEST:TYPE.CONTRACT:ACFNPY71HJHAMY075XYPS56124ZJE5154UX9NTE7VT",
                "value": "0x1d6e3"
            },
            "blockHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochNumber": "0x28968d0",
            "transactionHash": "0x8437fd07e33ffaff9dc1b360cb8b0450847b15a164059b50736c65762e6629ad",
            "transactionPosition": "0x0",
            "type": "call"
        },
        {
            "action": {
                "callType": "delegatecall",
                "from": "CFXTEST:TYPE.CONTRACT:ACFNPY71HJHAMY075XYPS56124ZJE5154UX9NTE7VT",
                "gas": "0x14157",
                "input": "0xb281a7bd00000000000000000000000089e0b86eec97bc24f44e3eb206b22b235db58c1e",
                "to": "CFXTEST:TYPE.CONTRACT:ACEMTZA4ZJN1FCUTZWN6P8EKDBF2X8DCZY4TEESNH8",
                "value": "0x1d6e3"
            },
            "blockHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochNumber": "0x28968d0",
            "transactionHash": "0x8437fd07e33ffaff9dc1b360cb8b0450847b15a164059b50736c65762e6629ad",
            "transactionPosition": "0x0",
            "type": "call"
        },
        {
            "action": {
                "callType": "staticcall",
                "from": "CFXTEST:TYPE.CONTRACT:ACFNPY71HJHAMY075XYPS56124ZJE5154UX9NTE7VT",
                "gas": "0x13464",
                "input": "0xf0940002",
                "to": "CFXTEST:TYPE.CONTRACT:ACE8BSDS7WN52KHYK29NEBZWFPVZ5RPPD28KCXETJ8",
                "value": "0x0"
            },
            "blockHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochNumber": "0x28968d0",
            "transactionHash": "0x8437fd07e33ffaff9dc1b360cb8b0450847b15a164059b50736c65762e6629ad",
            "transactionPosition": "0x0",
            "type": "call"
        },
        {
            "action": {
                "gasLeft": "0x11ae8",
                "outcome": "success",
                "returnData": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001f00adf0308dce89889061254123a68747470733a2f2f6170692e62696e616e63652e636f6d2f6170692f76332f7469636b65722f70726963653f73796d626f6c3d434658555344541a168418778218646570726963658218571a000f4240185b1257123668747470733a2f2f7777772e6f6b65782e636f6d2f6170692f696e6465782f76332f4346582d5553442f636f6e7374697475656e74731a1d8518778218666464617461821864646c6173748218571a000f4240185b1247122e68747470733a2f2f646174612e676174656170692e696f2f617069322f312f7469636b65722f6366785f757364741a15841877821864646c6173748218571a000f4240185b1264123d68747470733a2f2f7777772e6d78632e636f6d2f6f70656e2f6170692f76322f6d61726b65742f7469636b65723f73796d626f6c3d4346585f555344541a23871877821861646461746182181800821867646c61737418728218571a000f4240185b125b123568747470733a2f2f6170692e626b65782e63632f76322f712f7469636b65722f70726963653f73796d626f6c3d4346585f555344541a228618778218616464617461821818008218646570726963658218571a000f4240185b1a0d0a0908051205fa3fc000001003220d0a0908051205fa3fc000001003100a186420012846308094ebdc0300000000000000000000000000000000"
            },
            "blockHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochNumber": "0x28968d0",
            "transactionHash": "0x8437fd07e33ffaff9dc1b360cb8b0450847b15a164059b50736c65762e6629ad",
            "transactionPosition": "0x0",
            "type": "call_result"
        },
        {
            "action": {
                "callType": "staticcall",
                "from": "CFXTEST:TYPE.CONTRACT:ACFNPY71HJHAMY075XYPS56124ZJE5154UX9NTE7VT",
                "gas": "0xce86",
                "input": "0x0adf0308dce89889061254123a68747470733a2f2f6170692e62696e616e63652e636f6d2f6170692f76332f7469636b65722f70726963653f73796d626f6c3d434658555344541a168418778218646570726963658218571a000f4240185b1257123668747470733a2f2f7777772e6f6b65782e636f6d2f6170692f696e6465782f76332f4346582d5553442f636f6e7374697475656e74731a1d8518778218666464617461821864646c6173748218571a000f4240185b1247122e68747470733a2f2f646174612e676174656170692e696f2f617069322f312f7469636b65722f6366785f757364741a15841877821864646c6173748218571a000f4240185b1264123d68747470733a2f2f7777772e6d78632e636f6d2f6f70656e2f6170692f76322f6d61726b65742f7469636b65723f73796d626f6c3d4346585f555344541a23871877821861646461746182181800821867646c61737418728218571a000f4240185b125b123568747470733a2f2f6170692e626b65782e63632f76322f712f7469636b65722f70726963653f73796d626f6c3d4346585f555344541a228618778218616464617461821818008218646570726963658218571a000f4240185b1a0d0a0908051205fa3fc000001003220d0a0908051205fa3fc000001003100a186420012846308094ebdc03",
                "to": "CFXTEST:TYPE.BUILTIN:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJK7B54454",
                "value": "0x0"
            },
            "blockHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochNumber": "0x28968d0",
            "transactionHash": "0x8437fd07e33ffaff9dc1b360cb8b0450847b15a164059b50736c65762e6629ad",
            "transactionPosition": "0x0",
            "type": "call"
        },
        {
            "action": {
                "gasLeft": "0xcd8a",
                "outcome": "success",
                "returnData": "0xdccb9be50637c331c1c66ef1b0c2779f0a1893661c017c530b641dcec02010dc"
            },
            "blockHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochNumber": "0x28968d0",
            "transactionHash": "0x8437fd07e33ffaff9dc1b360cb8b0450847b15a164059b50736c65762e6629ad",
            "transactionPosition": "0x0",
            "type": "call_result"
        },
        {
            "action": {
                "gasLeft": "0x8fe9",
                "outcome": "success",
                "returnData": "0x0000000000000000000000000000000000000000000000000000000000001662"
            },
            "blockHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochNumber": "0x28968d0",
            "transactionHash": "0x8437fd07e33ffaff9dc1b360cb8b0450847b15a164059b50736c65762e6629ad",
            "transactionPosition": "0x0",
            "type": "call_result"
        },
        {
            "action": {
                "gasLeft": "0x94d5",
                "outcome": "success",
                "returnData": "0x0000000000000000000000000000000000000000000000000000000000001662"
            },
            "blockHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochNumber": "0x28968d0",
            "transactionHash": "0x8437fd07e33ffaff9dc1b360cb8b0450847b15a164059b50736c65762e6629ad",
            "transactionPosition": "0x0",
            "type": "call_result"
        },
        {
            "action": {
                "gasLeft": "0x713e",
                "outcome": "success",
                "returnData": "0x"
            },
            "blockHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochHash": "0x4c4db64db7ddaf4fd6c9d0eb5398d4c7838252ceaefdfb6b1be27aa301428369",
            "epochNumber": "0x28968d0",
            "transactionHash": "0x8437fd07e33ffaff9dc1b360cb8b0450847b15a164059b50736c65762e6629ad",
            "transactionPosition": "0x0",
            "type": "call_result"
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

TODO

### trace_filter

Returns all traces matching the provided filter.

#### Parameters

1. `Object` - A trace filter object:
    * `fromEpoch`: `QUANTITY|TAG` - (optional) the epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-default-epochnumber-parameter) Search will be applied from this epoch number.
    * `toEpoch`: `QUANTITY|TAG` - (optional) the epoch number, or the string `"latest_state"`, `"latest_confirmed"`, `"latest_checkpoint"` or `"earliest"`, see the [epoch number parameter](#the-default-epochnumber-parameter). Search will be applied up until (and including) this epoch number.
    * `fromAddress`: `BASE32` - (optional).
    * `toAddres`: `BASE32` - (optional).
    * `blockHashes`: `Array` of `DATA` - (optional, default: `null`) Array of up to 128 block hashes that the search will be applied to. This will override from/to epoch fields if it's not `null`.
    * `actionTypes`: `Array` of action type enum - (optional) If None, match all. If specified, trace must match one of these action types.
    * `after`: `QUANTITY` - (optional) The offset trace number.
    * `count`: `QUANTITY` - (optional) The number of traces to display in a batch.

#### Returns

Same as `trace_transaction`

## Note

1. One `call` trace, will have one corresponding `call_result` trace. A `create` trace will also have one corresponding `create_result` trace
2. `call` trace's `result` field have three possible value: `success`, `fail`, `revert`
3. Only traces which's `callType` value is `call` and have `success` result status, that can indicate CFX transfer

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
        "toPocket": "mint_burn",
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

Besides these five values, the "pocket" could be two special values `mint_burn` and `gas_payment`.

* fromPocket = `mint_burn`: mint CFX, e.g., generate staking interest
* toPocket = `mint_burn`: burn CFX, e.g., when a contract is killed, its staking balance will be burnt.
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
