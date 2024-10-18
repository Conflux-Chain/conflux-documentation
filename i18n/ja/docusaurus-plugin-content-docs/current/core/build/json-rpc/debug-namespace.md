---
id: debug_rpc
sidebar_position: 4
title: debug Namespace
description: A set of methods related to debugging
keywords:
  - debug-rpc
  - cfx_getEpochReceipts
  - epoch receipts
  - debugging
  - JSON-RPC
  - transaction receipts
  - blockchain analysis
  - smart contract debugging
  - gas usage
  - event logs
tags:
  - debugging
  - JSON-RPC
displayed_sidebar: coreSidebar
---

## RPCs

### cfx_getEpochReceipts

Get one epoch's all receipts in one RPC call

#### Parameters

1. `QUANTITY`: Epoch number

```json
params: [
  "0x1001"
]
```

#### Response

`ARRAY` - Receipt array

#### Example

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "cfx_getEpochReceipts",
    "params": ["0x1001"]
}'
```

Response

```json
{
    "jsonrpc": "2.0",
    "id": "15922956697249514502",
    "result": [{
    "blockHash": "0xbb1eea3c8a574dc19f7d8311a2096e23a39f12e649a20766544f2df67aac0bed",
    "contractCreated": null,
    "epochNumber": "0x87431b",
    "from": "CFX:TYPE.USER:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG",
    "gasCoveredBySponsor": true,
    "gasFee": "0x108ca",
    "gasUsed": "0x8465",
    "index": "0x0",
    "logs": [{
      "address": "CFX:TYPE.CONTRACT:ACC7UAWF5UBTNMEZVHU9DHC6SGHEA0403Y2DGPYFJP",
      "data": "0x00000000000000000000000019a3224214fe29107d84af9baa02118b614e46d5",
      "topics": ["0x233e08777131763a85257b15eafc9f96ef08f259653d9944301ff924b3917cf5"]
    }],
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000080000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000",
    "outcomeStatus": "0x0",
    "stateRoot": "0x1bc37c63c03d7e7066f9427f69e515988d19ebb26998087d75b50d2235e55ee7",
    "storageCollateralized": "0x40",
    "storageCoveredBySponsor": true,
    "storageReleased": [{
      "address": "CFX:TYPE.USER:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG",
      "collaterals": "0x40"
    }],
    "to": "CFX:TYPE.CONTRACT:ACC7UAWF5UBTNMEZVHU9DHC6SGHEA0403Y2DGPYFJP",
    "transactionHash": "0x53fe995edeec7d241791ff32635244e94ecfd722c9fe90f34ddf59082d814514"
  }]
}
```
