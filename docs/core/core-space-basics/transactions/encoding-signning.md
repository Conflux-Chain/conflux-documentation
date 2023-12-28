---
sidebar_position: 2
title: Encoding & Signing
displayed_sidebar: coreSidebar
---

## Transaction signing and encoding

After every field of a transaction is prepared, following steps are required before it can be sent using the `cfx_sendRawTransaction` method (don't worry, these steps are already implemented by wallets or SDKs):

1. Prepare hash for signing: do RLP encoding in the order of `(nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data)` and then apply the `keccak256` operation to the encoded result to obtain a hash.
2. Signing: sign the hash obtained in the previous step using the private key of the sending account and perform the ecdsaSign signature operation to obtain the values for `r, s, v`.
3. Transaction Encoding: Do RLP encoding in the order of `((nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data), v, r, s)` and convert it into a hexadecimal string.

## Differences With Ethereum 155 Transaction

Compared to Ethereum `155 transaction`, transactions through Conflux have several differences:

* Fields are different: with 2 more field `storageLimit`, and `epochHeight`.
* Differences when encoding transactionss:
  1. The RLP structure to compute transaction hash is `[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data]`
  2. The RLP structure of a rawTx is `[[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data], v, r, s]`
* The `v` value signed by ecdsaSign will not be specifically modified in Conflux, while in Ethereum, there will be some special treatments to the v value.

1. 如何发送
- [cfx_sendRawTransaction](../build/json-rpc/cfx-namespace.md#cfx_sendrawtransaction)