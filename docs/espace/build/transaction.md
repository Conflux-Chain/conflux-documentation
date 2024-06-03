---
sidebar_position: 4
title: Transaction
displayed_sidebar: eSpaceSidebar
---

eSpace initially only supports transactions in the Ethereum 155 format. Transactions in the 2930 and 1559 formats are supported starting from Conflux v2.4.0. The mainstream Ethereum SDKs and tools are seamlessly compatible.

The RPC's `eth_sendRawTransaction`'s possible errors are same as [Core Space sending transactions errors](/docs/core/build/json-rpc/rpc-behaviour/cfx_sendTransaction-errors).

The transaction lifecycle is also same Core Space [Transaction Lifecycle](/docs/core/core-space-basics/transactions/lifecycle), is slightly different from Ethereum's transaction lifecycle (Ethereum Transaction does not need defer 5 block to execute).

If your eSpace transactions are pending or have failed to execute, you can utilize the [same method with Core Space to debug and handle them](/docs/core/core-space-basics/transactions/why-transaction-is-pending).

## FAQs

### How many block confirmations are required for a transaction to be considered final?

The confirmation block number is 100 blocks, and finalized block number is 400 blocks.

### Does eSpace support EIP-4844?

No