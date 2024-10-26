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

Conflux eSpace最初支持Ethereum 155格式的交易 (传统交易)。 在v2.4.0硬分叉之后，开始接受类型-1（EIP-2930）和类型-2（EIP-1559）格式的交易。 这种兼容性实现了主流Ethereum SDK和工具的无缝过渡。 目前不支持类型-3的交易（EIP-4844）。

## 交易生命周期

eSpace的交易生命周期与Core Space类似，详情参见[交易生命周期](/docs/core/core-space-basics/transactions/lifecycle)。 然而，它不同于以太坊的交易生命周期，特别是因为以太坊交易不需要延迟5个区块才能执行。

具体来说，Conflux环境中支持的以太坊区块标签有：`safe`和`finalized`。

- `safe`：表示该区块已通过PoW规则确认，对应于Core Space的`latest_confirmed epoch`标签。 `safe`交易意味着极低的被回滚概率。
- `finalized`：表示该区块已通过Conflux PoS链最终确定，对应于Core Space的`latest_finalized epoch`标签。 `最终确定`的交易意味着除非攻击者拥有超过67%的PoS中质押的CFX，否则它不会被回滚。

## 处理交易错误

如果遇到待处理的eSpace交易或执行失败，故障排除方法与Core Space相同。 更多详细信息，请参阅 [为什么我的交易待处理？](/docs/core/core-space-basics/transactions/why-transaction-is-pending)。 此外，RPC的`eth_sendRawTransaction`可能会遇到与Core Space中发送交易错误类似的错误。详情见[发送交易错误](/docs/core/build/json-rpc/rpc-behaviour/cfx_sendTransaction-errors).

## 常见问题解答

### 交易需要多少个区块确认才能被视为最终确认？

大约需要400次区块确认交易才会最终确定。 此外，Conflux还支持`finalized`区块标签来推断最新的已完成区块。

### eSpace支持EIP-4844吗？

目前，eSpace不支持EIP-4844。
