---
sidebar_position: 4
title: Transaction
displayed_sidebar: eSpaceSidebar
---

eSpace的交易与以太坊EIP-155的交易相同，这意味着开发人员可以使用相同的工具和库(ethers.js) 来构建和发送交易。 目前尚不支持以太坊EIP-1559和EIP-2718。

The RPC's `eth_sendRawTransaction`'s possible errors are same as [Core Space sending transactions errors](/docs/core/build/json-rpc/rpc-behaviour/cfx_sendTransaction-errors).

交易生命周期也和Core空间[交易生命周期](/docs/core/core-space-basics/transactions/lifecycle)相同, 与 以太坊的交易生命周期 (以太坊交易不需要延迟5个区块才能执行)略有不同。

如果你的eSpace交易处于挂起状态或者未能执行，你可以利用和[Core Space同样的方法调试和处理它们](/docs/core/core-space-basics/transactions/why-transaction-is-pending)。

## 常见问题解答

### 交易需要多少个区块确认才能被视为最终确认？

The confirmation block number is 100 blocks, and finalized block number is 400 blocks.
