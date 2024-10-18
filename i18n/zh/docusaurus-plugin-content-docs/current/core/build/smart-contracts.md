---
sidebar_position: 2
title: 智能合约
keywords:
  - conflux
  - smart contracts
  - solidity
  - EVM compatibility
  - blockchain development
  - dapp
  - virtual machine
  - contract address
  - 1820 contract
tags:
  - Core Space development
displayed_sidebar: coreSidebar
---

智能合约可以理解为一个运行在Conflux Core 链上的程序。 它是位于 Conflux Core 链上的一个特定地址的一系列代码(函数)和数据(状态)的集合。 想要进一步了解智能合约，请参考我们的[智能合约介绍](/docs/general/conflux-basics/contracts)。

## Conflux Core 上的智能合约

Conflux Core 拥有一个用来执行智能合约的内置虚拟机(VM)。 Conflux 的虚拟机几乎完全兼容以太坊虚拟机(EVM)， 这意味着绝大多数以太坊智能合约都可以在 Conflux Core 上直接部署并运行。 Conflux Core 上的智能合约同样使用**Solidity 语言**进行编写，主流的 Solidity 库都可以直接用于 Conflux Core 上的智能合约开发。

想要进一步了解 Solidity 语言，请参阅我们的[ Solidity 简介](/docs/general/build/smart-contracts/solidity-basics)和它的[官方文件](https://docs.soliditylang.org/en/)。

## 对比以太坊智能合约

Conflux 的虚拟机几乎完全兼容以太坊虚拟机(EVM)， 这意味着绝大多数以太坊智能合约都可以在 Conflux Core 上直接部署并运行。 Conflux Core 上的智能合约同样使用**Solidity 语言**进行编写，主流的 Solidity 库都可以直接用于 Conflux Core 上的智能合约开发。

然而，Ethereum 智能合约开发者有两点需要注意：

1. Conflux Core 合约地址的计算规则不同于以太坊。 如果在 Solidity 代码或交互逻辑中有任何地址计算的例子，请务必检查代码是否需要修改。
2. 在Conflux Core中，应用ERC-1820标准的合约地址与以太坊的不同。 以太坊的ERC-1820合约地址为`0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24`，而Conflux Core的ERC-1820合约地址为`0x88887eD889e776bCBe2f0f9932EcFaBcDfCd1820`。

请阅读 [Conflux VM 和 EVM 之间的差异](../core-space-basics/vm-diffce.md) 了解更多详情。

我们还提供了一个叫做 [conflux-contracts](https://github.com/conflux-fans/conflux-contracts)的 Solidity 库，其中包括 Conflux 的内部合约和地址工具的源码。

## Core Space 智能合约开发工具 {#smart-contract-development-tools}

推荐使用以下工具开发智能合约：

- Hardhat + [Conflux Network 插件](https://github.com/conflux-chain/hardhat-conflux) - 一个流行的以太坊智能合约开发环境
- [ChainIDE](https://chainide.com/) - 一个类似 Remix 的基于 Web 的智能合约开发 IDE

### Conflux Scan上的合约读写工具

Conflux Scan 提供了一个读写智能合约的工具。 您可以使用它来与 Conflux 网络上的智能合约交互。

![](../tutorials/imgs/sponsor/sponsor-read-methods.png)

任何在 Conflux Scan 上经过验证的 Conflux 智能合约都可以使用此工具进行交互。 您可以查看合约的状态，调用它的方法并向它发送交易。
