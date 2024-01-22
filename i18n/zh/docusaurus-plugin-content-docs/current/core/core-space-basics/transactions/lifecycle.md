---
sidebar_position: 5
title: 交易生命周期
displayed_sidebar: coreSidebar
keywords:
  - transaction
  - lifecycle
  - stage
  - confirmation
  - finalization
---

交易从构建时到最终在链上确认之前会经历几个阶段。 A good understanding of these stages will help users and developers better identify problems with sending transactions and ultimately ensure that transactions are successfully confirmed or even finalized.

The following are the main stages of a transaction from construction to finalization.

![Transaction](./img/transaction-stages.png)

## Transaction Stages

### 1. **Transaction construction**

This is the stage where users or developers create a transaction with all the necessary fields and parameters and get it signed. The transaction object can be created using various tools or libraries, such as [Fluent Wallet](../../getting-started/installing-a-wallet.md), [Conflux SDK](../../build/sdks-and-tools/sdks.md), etc. 在发送交易之前，交易将被编码为十六进制字符串作为“rawTransaction”。

### 2. **Send To Transaction Pool**

This is the stage where users or developers [send their signed transaction to a Conflux node via RPC](../../build/json-rpc/cfx-namespace.md#cfx_sendrawtransaction). 如果交易通过验证，节点将验证交易并将其广播到网络中的其他节点。 节点还将返回一个交易哈希（这是一个唯一标识符）给发送者以进行跟踪。

The transaction will be put into the transaction pool of the node and wait to be packed into a block by miners.

### 3. **Packed into a Block -> Mined**

This is the stage where miners select transactions from their mempool (a pool of pending transactions) and include them in their blocks. Miners will prioritize transactions with higher `gasPrice`. 一旦包含交易的区块被挖出，它将被传播到网络中的其他节点。

After a transaction is included in a block, it will be assigned a block number and a transaction index in the block.

:::note

A transaction may also be dropped from the transation pool if the pool is full and other transactions with higher `gasPrice` are received.

:::

### 4. **Deferring 5 epochs -> Executed**

This is the stage where transactions are executed by nodes after being deferred for 5 epochs (about 5 seconds). 这意味着节点将运行交易的逻辑并相应地更新其状态。 The execution results of each transaction will be recorded in a [receipt](./receipt.md), which contains information such as status (success or failure), gas used, logs or events emitted by smart contracts and can be retrieved using transaction hash.

After the execution, the account's [nonce](./nonce.md) will be increased by one and transaction's receipt will be available.

### 5. **Waiting for about 50 epochs -> Confirmed**

This is the stage where transactions are confirmed by nodes after being executed for about 50 epochs (about 50 seconds). 执行一个交易并不意味着交易的状态不会再次改变。 Due to the structure of Conflux blockchain, the blockchain may fork or shift the pivot chain due to the arrival or creation of new blocks, which may revert certain transactions. 确认的交易意味着它已经被包含在足够深的区块中，并且几乎不可能回滚。

### 6. **Waiting for PoS chain Finalization -> Finalized**

This is the final stage where transactions are finalized after specific PoW block being referenced by Conflux's [PoS chain](../../../general/conflux-basics/consensus-mechanisms/proof-of-stake/pos_overview.md). Conflux 的 PoS 链会定期引用一个稳定的 PoW 区块，以为交易提供最终性。 一个已经最终化的交易意味着它几乎没有被回滚的可能性，除非攻击者拥有 PoS 中超过 67% 的 CFX。 It takes approximately 400 Epochs(6-8 minutes) to finalize a transaction since it is included in a block (after [CIP-113](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-113.md) activation).

## 常见问题解答

### Transaction Sent Successfully, but Unable to Retrieve Transaction via getTransactionByHash?

In situations of network congestion, a transaction may be removed from the transaction pool, resulting in the inability to retrieve the transaction via getTransactionByHash.

### After a Transaction is Executed, Does it Mean the Transaction Status Won't Change?

Not necessarily. Due to the structure of the blockchain, there may be forks or a shift in the pivot chain due to the arrival or creation of new blocks, leading to the potential rollback of certain transactions. When a transaction is confirmed, it means the transaction has been included in a sufficiently deep block, and the probability of rollback is extremely low.

### After a Transaction is Confirmed, Does it Mean the Transaction Status Won't Change?

Generally, the status of a transaction won't change after confirmation. However, in extremely rare cases, a transaction may be rolled back. This occurrence has an exceptionally low probability.
