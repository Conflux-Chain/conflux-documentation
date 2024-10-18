---
sidebar_position: 0
title: Intro to the Stack
keywords:
  - conflux
  - blockchain stack
  - virtual machine
  - smart contracts
  - nodes
  - client APIs
  - dapps
  - web3
  - development
tags:
  - architecture overview
  - blockchain stack
displayed_sidebar: coreSidebar
---

Como cualquier paquete de software, las herramientas y tecnologías de desarrollo de "Conflux Core" variarán de un proyecto a otro, dependiendo de sus objetivos.

Sin embargo, existen componentes básicos de Conflux que ayudan a proporcionar un modelo mental de cómo las aplicaciones de los software interactúan con la blockchain de Conflux Core. Understanding the layers of the stack will help you understand the different ways that Conflux can be integrated into software projects.

## Level 1: Virtual Machine

The Virtual Machine is the runtime environment for smart contracts on Conflux Core Space. It is almost compatible with EVM. All smart contracts and state changes on the Conflux blockchain are executed by [transactions](../core-space-basics/transactions/overview.md). The VM handles all of the transaction processing on the Conflux Core Space.

As with any virtual machine, the VM creates a level of abstraction between the executing code and the executing machine (an Conflux node). Currently, the VM is running on thousands of nodes distributed across the world.

Under the hood, the VM uses a set of opcode instructions to execute specific tasks. These (140 unique) opcodes allow the VM to be [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness), which means the VM is able to compute just about anything, given enough resources.

As a dapp developer, you don't need to know much about the VM other than it exists and that it reliably powers all applications on Conflux without downtime.

## Level 2: Smart contracts

[Smart contracts](./smart-contracts) are the executable programs that run on the Conflux Core blockchain.

Smart contracts are written using specific programming languages(Solidity) that compile to EVM bytecode (low-level machine instructions called opcodes).

Not only do smart contracts serve as open source libraries, they are essentially open API services that are always running and can't be taken down. Smart contracts provide public functions which users and applications (dapps) may interact with, without needing permission. Any application may integrate with deployed smart contracts to compose functionality, such as adding data feeds or to support token swaps. Additionally, anyone can deploy new smart contracts to Conflux in order to add custom functionality to meet their application's needs.

As a dapp developer, you'll need to write smart contracts only if you want to add custom functionality on the Conflux Core blockchain. You may find you can achieve most or all of your project's needs by merely integrating with existing smart contracts, for instance if you want to support payments in stablecoins or enable decentralized exchange of tokens.

## Level 3: Conflux nodes

In order for an application to interact with the Conflux Core blockchain, it must connect to an [Conflux node](../../general/run-a-node/Overview.md). Connecting to a node allows you to read blockchain data and/or send transactions to the network.

Conflux nodes are computers running software - an Conflux client. A client is an implementation of Conflux that verifies all transactions in each block, keeping the network secure and the data accurate. **Conflux nodes are the Conflux blockchain**. They collectively store the state of the Conflux blockchain and reach consensus on transactions to mutate the blockchain state.

By connecting your application to an Conflux node (via the [JSON-RPC API](./json-rpc/)), your application is able to read data from the blockchain (such as user account balances) as well as broadcast new transactions to the network (such as transferring CFX between user accounts or executing functions of smart contracts).

## Level 4: Conflux Core Client APIs

Many convenience libraries (built and maintained by Conflux's open source community) allow your applications to connect to and communicate with the Conflux blockchain.

If your user-facing application is a web app, you may choose to `npm install` a JavaScript SDK directly in your frontend. Or perhaps you'll choose to implement this functionality server-side, using a Python or Java API.

While these APIs are not a necessary piece of the stack, they abstract away much of the complexity of interacting directly with an Conflux node. They also provide utility functions (e.g. converting CFX to GDrip) so as a developer you can spend less time dealing with the intricacies of Conflux clients and more time focused on the functionality specific to your application.

## Level 5: End-user applications

At the top level of the stack are user-facing applications. These are the standard applications you regularly use and build today: primarily web and mobile apps.

The way you develop these user interfaces remains essentially unchanged. Often users will not need to know the application they're using is built using a blockchain.

## Further reading

- [The Architecture of a Web 3.0 application](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
