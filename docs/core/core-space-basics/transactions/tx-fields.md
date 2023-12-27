---
sidebar_position: 1
title: Transaction Fields
displayed_sidebar: coreSidebar
---

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