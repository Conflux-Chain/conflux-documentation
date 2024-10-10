---
sidebar_position: 2
title: Encoding & Signing
displayed_sidebar: coreSidebar
keywords:
  - transaction
  - signing
  - encoding
tags:
  - Transaction Signing
  - Transaction Encoding
  - RLP Encoding
  - keccak256 Hashing
  - ECDSA Signature
  - Private Key
  - Raw Transaction
  - Transaction Hash
  - cfx_sendRawTransaction
  - Cryptographic Process
  - Blockchain Security
  - Transaction Broadcast
---

After every field of a transaction is prepared, following steps are required before it can be sent to network (don't worry, these steps are already implemented by wallets or SDKs):

1. Prepare hash for signing: do [RLP encoding](https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp/) in the order of `[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data]` and then apply the `keccak256` operation to the encoded result to obtain a hash.
2. Signing: sign the hash obtained in the previous step using the **private key of the sending account** and perform the ecdsaSign signature operation to obtain the values for `r, s, v`.
3. Transaction Encoding: Do RLP encoding in the order of `[[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data], v, r, s]` and convert it into a hexadecimal string.

### Broadcast to the network

After completing the above steps, you will obtain a hex-encoded rawTx. You can then use the [`cfx_sendRawTransaction`](../../build/json-rpc/cfx-namespace.md#cfx_sendrawtransaction) method to send it to the network. Upon a successful invocation of this method, a transaction hash will be returned, which can be used to query the status of the transaction.

### Referencia

- [Elliptic Curve Digital Signature Algorithm (ECDSA)](https://fitsaleem.medium.com/ethereums-elliptic-curve-digital-signature-algorithm-ecdsa-88e1659f4879#:~:text=ECDSA%20is%20used%20in%20Ethereum,included%20in%20the%20transaction%20data.)
- [keccak256 hashing](https://ethereum.org/en/glossary/#keccak-256)
- [Recursive Length Prefix (RLP) serialization](https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp/)
