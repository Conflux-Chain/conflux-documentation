---
title: Transactions
sidebar_position: 9
keywords:
  - transaction
displayed_sidebar: generalSidebar
---

:::info

This section introduces transaction concepts from a high level. For more details on core space transactions, please refer to [core space transactions](../../core/learn/core-space-basics/core-transactions.md). For espace transactions, you may find it helpful to refer to [Ethereum transactions](https://ethereum.org/developers/docs/transactions/) as they are almost exactly same in format and functionality.

:::

## Concept of Transaction

A transaction is a single instruction composed by an external actor with a Conflux account, and this instruction is cryptographically signed using the sender account’s private key. A transaction can involve a simple transfer of CFX (the native currency of Conflux), a transfer of tokens (such as ERC20 or ERC721), a deployment of a new smart contract, or an execution of a function on an existing smart contract. Transactions are the only way to store or update data on the blockchain.

## Transaction Fields

Generally speaking, a transaction contains:

- Who send the transaction: A `from` field in an unsigned transaction or the transaction signature fields indicating the signer. This tells the network who is responsible for initiating the transaction and who will pay for the fees.

- What this transaction will do, including:

  - Who will be the transaction receiver or which smart contract to interact with(`to` field). This specifies the destination address of the transaction, which can be either user account or a smart contract that can execute some logic or empty to create a contract.

  -  How much native token will be send(`value` field). This indicates how much CFX (the native token of Conflux) will be transferred from the sender to the receiver. If the receiver is a smart contract, this value can also be used as an input parameter for its logic.

  -  How to interact with a smart contract(`data` field). This contains additional information for calling a smart contract function or deploying a new smart contract. It can encode the name and arguments of the function to be invoked or the bytecode of the new contract to be created.

-  Transaction fee information, including:
   - Field(s) indicating base transaction fee (`gas` in both spaces, and extra `storageLimit` field in core space). These fields is determine according to how much computational resources are required to execute the transaction and (in core space) how much storage space are occupied by its effects.
 
   -  Field indicating how much "tip" sender is willing to pay to miner(`gasPrice` field). This field allows senders to adjust their priority in getting their transactions packed by miners. A higher `gasPrice` means a higher chance of being included in a block sooner.

- Field indicating when or where the transaction is "valid" (`chainId`, `nonce` in both spaces, and `epochHeight` in core space). `chainId` prevents a transaction being executed on another chain and `nonce` field ensures the sent transactions are executed in the expected order. `epochHeight` field sets an expiration time for the transaction based on the epoch number (a concept similar to "block number" in Ethereum). A transaction can only be executed within an epoch range associated with `epochHeight`.

:::info

Transaction fields are slightly different between [spaces](./spaces.md). Core space transactions follow the definition of [Conflux Protocol](https://www.confluxnetwork.org/files/Conflux_Protocol_Specification.pdf). Espace transactions follow the [EIP-155](https://eips.ethereum.org/EIPS/eip-155) specification.

:::

## Transaction Lifecycle

Transactions go through several stages from the time they are constructed to the time they are finally confirmed on the chain. A good understanding of these stages will help users and developers better identify problems with sending transactions and ultimately ensure that transactions are successfully confirmed.

The following are the main stages of a transaction from construction to confirmation.

1. **Transaction construction**: This is the stage where users or developers create a transaction with all the necessary fields and parameters and get it signed. The transaction object can be created using various tools or libraries, such as Fluent Wallet, Conflux SDK, etc. The transaction will be encoded into a hex string as "rawTransaction" before it is sent.

2. **Broadcast**: This is the stage where users or developers send their signed transaction to a Conflux node via RPC or WebSocket. The node will validate the transaction and broadcast it to other nodes in the network if it passes the validation. The node will also return a transaction hash (a unique identifier) to the sender for tracking purposes.

3. **Packed into a block -> Mined**: This is the stage where miners select transactions from their mempool (a pool of pending transactions) and include them in their blocks. Miners will prioritize transactions with higher `gasPrice`. Once a block containing a transaction is mined, it will be propagated to other nodes in the network.

4. **Deferring 5 epochs -> Executed**: This is the stage where transactions are executed by nodes after being deferred for 5 epochs (about 5 seconds). This means that nodes will run the logic of the transactions and update their state accordingly. The execution results of each transaction will be recorded in a receipt, which contains information such as status (success or failure), gas used, logs and events emitted by smart contracts and can be retrieved using transaction hash.

5. **Waiting for about 50 epochs -> Confirmed**: This is the stage where transactions are confirmed by nodes after being executed for about 50 epochs (about 50 seconds). A transaction is executed does not mean that the status of the transaction will not change anymore. Due to the structure of blockchain, the blockchain may fork or shift the main chain due to the arrival or creation of new blocks, which may revert certain transactions. A confirmed transaction means that it has been included in a "deep" enough block and has a extremely low probability of being reverted.

6. **Waiting for PoS chain Finalization -> Finalized**: This is the final stage where transactions are finalized after specific PoW block being referenced by Conflux's [PoS chain](./consensus-mechanisms/proof-of-stake/pos_overview.md). Conflux's PoS chain periodically refers a stable PoW block to provide finality for transactions. A finalized transaction means that it has zero probability of being reverted unless the attacker possesses more than 67% of the CFX staked in PoS. It takes approximately 4-5 minutes to finalize a transaction since it is included in a block (after [CIP-113](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-113.md) activation).

![Transaction](./img/transaction-stages)
