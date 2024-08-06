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

智能合约不仅是开源库，而且他们实质上是始终运行且永不关闭的开放API服务。 智能合约提供公共函数，用户和应用程序(dapps)无需许可就可以与之交互。 任何应用程序都可以与已部署的智能合约集成，以组成功能，例如添加数据源或通证交换。 此外，任何人都可以在Conflux上部署新的智能合约，以便添加自定义功能来满足他们的应用需求。

作为一个去中心化应用程序开发者，只有你想在Conflux Core链上添加定制功能时，才需要写智能合约来实现。 你可能会发现，通过简单地与现有智能合约集成就可以实现项目大部分甚至全部需求，例如如果你想支持稳定币支付或使用去中心化交易。

## 第三层：Conflux节点

为了使应用程序与Conflux核心区块链交互, 它必须连接到一个[Conflux节点](../../general/run-a-node/Overview.md)。 连接到一个节点可以让你读取区块链数据和/或向网络发送交易。

Conflux 节点是运行一个Conflux 客户端软件的计算机。 客户端是Conflux的一个实现，它验证每个区块中的所有交易，从而确保网络安全和数据准确。 **Conflux节点就是Conflux区块链**。 它们共同存储Conflux区块链的状态，并就交易达成共识，以改变区块链的状态。

通过将你的应用程序连接到一个Conflux节点(通过 [JSON-RPC API](./json-rpc/)), 你的应用程序可以从区块链读取数据(例如，用户账户余额)，并向网络广播新的交易(例如，在用户账户之间传输CFX，或执行智能合约的功能)。

## 第四层：Conflux Core客户端APIs

许多方便的库(由Conflux的开源社区建立和维护) 允许你的应用程序连接到Conflux区块链并进行通信。

如果你的用户界面应用程序是一个Web应用程序，你可以直接在前端选择 `npm 安装`JavaScript SDK。 或者你可以选择使用Python或Java API在服务器端执行此功能。

虽然这些 API 不是栈中必需的一部分，但它们将与 Conflux 节点直接交互的许多复杂性抽象化了。 它们还提供了实用函数 (例如：将CFX转换为GDrip)，因此作为开发人员，你可以使用更少的时间处理Conflux客户端的复杂问题，从而用更多的时间专注于你的应用特有的功能。

## 第五层：终端用户应用程序

在栈的顶层是面向用户的应用程序。 These are the standard applications you regularly use and build today: primarily web and mobile apps.

开发这些用户界面的方式基本上保持不变。 通常用户不需要知道他们所使用的应用程序是使用区块链构建的。

## 了解更多

- [Web 3.0应用程序的构架](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
