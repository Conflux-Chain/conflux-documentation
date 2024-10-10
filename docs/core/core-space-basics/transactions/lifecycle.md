---
sidebar_position: 5
title: Transaction Lifecycle
displayed_sidebar: coreSidebar
keywords:
    - transaction
    - lifecycle
    - stage
    - confirmation
    - finalization
tags:
    - Transaction Lifecycle
    - Transaction Stages
    - Transaction Construction
    - Transaction Pool
    - Block Mining
    - Transaction Execution
    - Transaction Confirmation
    - Transaction Finalization
    - PoS Chain
    - Epoch
    - Transaction Receipt
    - Nonce
    - Gas Price
    - Mempool
---

Transactions go through several stages from the time they are constructed to the time they are finally confirmed on the chain. A good understanding of these stages will help users and developers better identify problems with sending transactions and ultimately ensure that transactions are successfully confirmed or even finalized.

The following are the main stages of a transaction from construction to finalization.

![Transaction](./img/transaction-stages.png)

## Transaction Stages

### 1. **Transaction construction**

This is the stage where users or developers create a transaction with all the necessary fields and parameters and get it signed. The transaction object can be created using various tools or libraries, such as [Fluent Wallet](../../getting-started/installing-a-wallet.md), [Conflux SDK](../../build/sdks-and-tools/sdks.md), etc. The transaction will be encoded into a hex string as "rawTransaction" before it is sent.

### 2. **Send To Transaction Pool**

This is the stage where users or developers [send their signed transaction to a Conflux node via RPC](../../build/json-rpc/cfx-namespace.md#cfx_sendrawtransaction). The node will validate the transaction and broadcast it to other nodes in the network if it passes the validation. The node will also return a transaction hash (a unique identifier) to the sender for tracking purposes.

The transaction will be put into the transaction pool of the node and wait to be packed into a block by miners.

### 3. **Packed into a Block -> Mined**

This is the stage where miners select transactions from their mempool (a pool of pending transactions) and include them in their blocks. Miners will prioritize transactions with higher `gasPrice`. Once a block containing a transaction is mined, it will be propagated to other nodes in the network. 

After a transaction is included in a block, it will be assigned a block number and a transaction index in the block.

:::note

A transaction may also be dropped from the transation pool if the pool is full and other transactions with higher `gasPrice` are received.

:::

### 4. **Deferring 5 epochs -> Executed**

This is the stage where transactions are executed by nodes after being deferred for 5 epochs (about 5 seconds). This means that nodes will run the logic of the transactions and update their state accordingly. The execution results of each transaction will be recorded in a [receipt](./receipt.md), which contains information such as status (success or failure), gas used, logs or events emitted by smart contracts and can be retrieved using transaction hash. 

After the execution, the account's [nonce](./nonce.md) will be increased by one and transaction's receipt will be available.

### 5. **Waiting for about 50 epochs -> Confirmed**

This is the stage where transactions are confirmed by nodes after being executed for about 50 epochs (about 50 seconds). A transaction is executed does not mean that the status of the transaction will not change anymore. Due to the structure of Conflux blockchain, the blockchain may fork or shift the pivot chain due to the arrival or creation of new blocks, which may revert certain transactions. A confirmed transaction means that it has been included in a "deep" enough block and has a extremely low probability of being reverted.

### 6. **Waiting for PoS chain Finalization -> Finalized**

This is the final stage where transactions are finalized after specific PoW block being referenced by Conflux's [PoS chain](../../../general/conflux-basics/consensus-mechanisms/proof-of-stake/pos_overview.md). Conflux's PoS chain periodically refers a stable PoW block to provide finality for transactions. A finalized transaction means that it has zero probability of being reverted unless the attacker possesses more than 67% of the CFX staked in PoS. It takes approximately 400 Epochs(6-8 minutes) to finalize a transaction since it is included in a block (after [CIP-113](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-113.md) activation).

## FAQs

### Transaction Sent Successfully, but Unable to Retrieve Transaction via getTransactionByHash?

In situations of network congestion, a transaction may be removed from the transaction pool, resulting in the inability to retrieve the transaction via getTransactionByHash.

### After a Transaction is Executed, Does it Mean the Transaction Status Won't Change?

Not necessarily. Due to the structure of the blockchain, there may be forks or a shift in the pivot chain due to the arrival or creation of new blocks, leading to the potential rollback of certain transactions. When a transaction is confirmed, it means the transaction has been included in a sufficiently deep block, and the probability of rollback is extremely low.

### After a Transaction is Confirmed, Does it Mean the Transaction Status Won't Change?

Generally, the status of a transaction won't change after confirmation. However, in extremely rare cases, a transaction may be rolled back. This occurrence has an exceptionally low probability.
