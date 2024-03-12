---
sidebar_position: 4
title: Transaction
displayed_sidebar: eSpaceSidebar
---

eSpace's transaction is same as Ethereum 155 transaction, which means developers can use the same tools and libraries(ethers.js) to construct and send transaction. Currently Ethereum 1559 and EIP-2718 are not supported.

The RPC's `eth_sendRawTransaction`'s possible errors are same as [Core Space sending transactions errors](/docs/core/build/json-rpc/rpc-behaviour/cfx_sendTransaction-errors).

The transaction lifecycle is also same Core Space [Transaction Lifecycle](/docs/core/core-space-basics/transactions/lifecycle), is slightly different from Ethereum's transaction lifecycle (Ethereum Transaction does not need defer 5 block to execute).

If your eSpace transactions are pending or have failed to execute, you can utilize the [same method with Core Space to debug and handle them](/docs/core/core-space-basics/transactions/why-transaction-is-pending).

## 常见问题解答

### How many block confirmations are required for a transaction to be considered final?

The confirmation block number is 100 blocks, and finalized block number is 400 blocks.
