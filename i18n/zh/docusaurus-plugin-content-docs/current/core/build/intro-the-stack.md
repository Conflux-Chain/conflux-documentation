---
sidebar_position: 0
title: Intro to the Stack
displayed_sidebar: coreSidebar
---

像任何软件堆栈一样，完整的"Conflux核心堆栈"将根据你的目标因项目而异。

Conflux的核心组件提供了一个思维模型，这种模型说明了软件应用程序如何与Conflux核心区块链交互。 了解堆栈的分层将帮助你理解将Conflux集成到软件项目中的不同方法。

## 第一层：虚拟机

虚拟机是Conflux Core Space上智能合约的运行环境。 它与EVM几乎兼容。 Conflux区块链上的所有智能合约和状态改变都通过[交易](../core-space-basics/transactions/overview.md)执行。 虚拟机处理Conflux Core Space上的所有交易处理。

与任何虚拟机一样，虚拟机在执行代码和执行机器(Conflux节点)之间创建抽象层。 目前，虚拟机正在全球范围内的数千个节点上运行。

在底层，虚拟机使用一组操作码指令来执行特定任务。 这些(共140个)操作码使虚拟机成为[图灵完备](https://zh.wikipedia.org/wiki/%E5%9C%96%E9%9D%88%E5%AE%8C%E5%82%99%E6%80%A7), 这意味着只要提供足够的资源，虚拟机几乎可以计算任何东西。

作为去中心化应用程序的开发者，你不需要了解更多关于虚拟机的信息，就可以在Conflux上畅通无阻地授权所有应用程序。

## 第二层：智能合约

[智能合约](./smart-contracts)是在Conflux Core链上运行的可执行程序。

智能合约是使用特定的编程语言(Solidity)编写的，可以编译为EVM字节码(称为操作码的低级机器语言)。

智能合约不仅是开源库，而且他们实质上是始终运行且永不关闭的开放API服务。 智能合约提供公共函数，用户和应用程序(dapps)无需许可就可以与之交互。 任何应用程序都可以与已部署的智能合约集成，以组成功能，例如添加数据源或通证交换。 Additionally, anyone can deploy new smart contracts to Conflux in order to add custom functionality to meet their application's needs.

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
