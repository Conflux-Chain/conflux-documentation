---
displayed_sidebar: coreSidebar
---

## Transaction Lifecycle

Transactions go through several stages from the time they are constructed to the time they are finally confirmed on the chain. A good understanding of these stages will help users and developers better identify problems with sending transactions and ultimately ensure that transactions are successfully confirmed.

The following are the main stages of a transaction from construction to confirmation.

1. **Transaction construction**: This is the stage where users or developers create a transaction with all the necessary fields and parameters and get it signed. The transaction object can be created using various tools or libraries, such as Fluent Wallet, Conflux SDK, etc. The transaction will be encoded into a hex string as "rawTransaction" before it is sent.

2. **Broadcast**: This is the stage where users or developers send their signed transaction to a Conflux node via RPC or WebSocket. The node will validate the transaction and broadcast it to other nodes in the network if it passes the validation. The node will also return a transaction hash (a unique identifier) to the sender for tracking purposes.

3. **Packed into a block -> Mined**: This is the stage where miners select transactions from their mempool (a pool of pending transactions) and include them in their blocks. Miners will prioritize transactions with higher `gasPrice`. Once a block containing a transaction is mined, it will be propagated to other nodes in the network.

4. **Deferring 5 epochs -> Executed**: This is the stage where transactions are executed by nodes after being deferred for 5 epochs (about 5 seconds). This means that nodes will run the logic of the transactions and update their state accordingly. The execution results of each transaction will be recorded in a receipt, which contains information such as status (success or failure), gas used, logs and events emitted by smart contracts and can be retrieved using transaction hash.

5. **Waiting for about 50 epochs -> Confirmed**: This is the stage where transactions are confirmed by nodes after being executed for about 50 epochs (about 50 seconds). A transaction is executed does not mean that the status of the transaction will not change anymore. Due to the structure of blockchain, the blockchain may fork or shift the main chain due to the arrival or creation of new blocks, which may revert certain transactions. A confirmed transaction means that it has been included in a "deep" enough block and has a extremely low probability of being reverted.

6. **Waiting for PoS chain Finalization -> Finalized**: This is the final stage where transactions are finalized after specific PoW block being referenced by Conflux's [PoS chain](./consensus-mechanisms/proof-of-stake/pos_overview.md). Conflux's PoS chain periodically refers a stable PoW block to provide finality for transactions. A finalized transaction means that it has zero probability of being reverted unless the attacker possesses more than 67% of the CFX staked in PoS. It takes approximately 4-5 minutes to finalize a transaction since it is included in a block (after [CIP-113](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-113.md) activation).

![Transaction](../image/transaction-stages.png)
