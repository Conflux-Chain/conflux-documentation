---
sidebar_position: 4
title: 交易
displayed_sidebar: eSpaceSidebar
keywords:
  - Conflux eSpace
  - 交易
  - Ethereum Compatibility
  - EIP-155
  - EIP-2930
  - EIP-1559
  - EIP-4844
  - 交易生命周期
  - Block Confirmation
  - Transaction Finality
  - Safe Transactions
  - Finalized Transactions
  - Transaction Errors
  - 待处理交易
  - eth_sendRawTransaction
  - 故障排除
  - PoW
  - PoS 共识机制
  - Hardfork
  - Legacy Transactions
  - Type-1 Transactions
  - Type-2 Transactions
  - Type-3 Transactions
tags:
  - 交易生命周期
---

Conflux eSpace initially supports transactions in the Ethereum 155 format (legacy transactions). After the v2.4.0 hardfork, it starts to accept type-1 (EIP-2930) and type-2 (EIP-1559) format transactions. This compatibility enables seamless transition for mainstream Ethereum SDKs and tools. Type-3 transactions (EIP-4844) are currently not supported.

## 交易生命周期

The transaction lifecycle in eSpace mirrors that of Core Space, detailed in [Transaction Lifecycle](/docs/core/core-space-basics/transactions/lifecycle). However, it differs slightly from Ethereum’s transaction lifecycle, particularly because Ethereum transactions do not require a deferment of 5 blocks to execute.

Specifically, the `safe` and `finalized` ethereum block tag is supported in Conflux context for:

- `safe`: it means the block is confirmed by the PoW rule, corresponding to the core space's `latest_confirmed` epoch tag. A `safe` transaction means an extremely low probability of being reverted.
- `finalized`: it means the block is finalized by the Conflux PoS chain, corresponding to the core space's `latest_finalized` epoch tag. A `finalized` transaction means it has zero probability of being reverted unless the attacker possesses more than 67% of the CFX staked in PoS.

## Handling Transaction Errors

Should you encounter pending eSpace transactions or failures in execution, the troubleshooting methods are the same as those used in Core Space. For more information, refer to [Why is my transaction pending?](/docs/core/core-space-basics/transactions/why-transaction-is-pending). Additionally, the RPC’s `eth_sendRawTransaction` may encounter errors similar to those seen in Core Space, detailed in [sending transactions errors](/docs/core/build/json-rpc/rpc-behaviour/cfx_sendTransaction-errors).

## 常见问题解答

### 交易需要多少个区块确认才能被视为最终确认？

It takes about 400 block confirmation before a transaction gets finalized. What's more, the `finalized` block tag is also supported in Conflux to infer the latest finalized block.

### Does eSpace support EIP-4844?

No, eSpace does not support EIP-4844 at this time.
