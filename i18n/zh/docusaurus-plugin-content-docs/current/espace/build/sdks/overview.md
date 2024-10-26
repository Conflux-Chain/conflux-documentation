---
sidebar_position: 1
title: 概览
displayed_sidebar: eSpaceSidebar
description: 此页面旨在为您提供使用Conflux eSpace开发时可以使用的不同SDK的快速概览。
keywords:
  - SDKs
  - Conflux eSpace
  - JSON-RPC
  - Web3.js
  - Web3.py
  - Ethers.js
  - JavaScript
  - Python
  - Blockchain Interaction
  - 智能合约
  - ABI
  - Providers
  - 钱包
  - CFX
  - DRIP
  - Ethereum Compatibility
  - dApps
  - MetaMask
  - Unifra
  - ConfluxScan
  - Library Comparison
  - Web3 Development
tags:
  - eSpace SDKs
  - SDK
---

# 概览

要通过Web应用程序与Conflux区块链交互，需要连接到一个Conflux节点。 这可以通过JSON-RPC规范来实现，该规范由每个Conflux客户端实现，为应用程序提供了一组统一的方法。

虽然可以使用原生JavaScript连接到Conflux节点，但Conflux生态系统中有方便的库简化了这一过程。 这些库让开发者可以编写少量简单且直观的代码来初始化并与Conflux JSON-RPC进行请求，并且抽象了与Conflux交互的减少了复杂性，提供了许多使用功能以简化开发。

这些库提供的一些功能包括使用提供者（如JSON-RPC、Unifra、ConfluxScan或MetaMask）连接到Conflux节点，以及钱包功能，用于创建钱包、管理密钥和签名交易。 此外，这些库通过读取编译合约的应用程序二进制接口（ABI）来启用与智能合约函数的交互。 ABI是一个JSON格式，解释了合约的函数，并允许开发者像使用普通JavaScript对象那样使用它。

这些库提供的实用函数还为在Conflux构建提供了便捷的快捷方式，例如将CFX值转换为DRIP，因为1 CFX等于1,000,000,000,000,000,000 DRIP，以这种格式处理数字可能会有挑战性。 例如，可以使用web3.utils.toWei函数将CFX转换为DRIP。

使用JavaScript与Conflux进行交互的一些最受欢迎的库包括Web3.js（它是以太坊的JavaScript API）和Ethers.js（它是JavaScript和TypeScript中完整的以太坊钱包实现和实用工具）。
以下是最受欢迎的库的文档和GitHub仓库的链接：

## Web3.js

Web3.js是一套全面的库，提供与以太坊节点的无缝交互，无论是本地还是远程，通过HTTP、IPC或WebSocket等各种协议。 它为开发者提供了与以太坊区块链交互的广泛功能，使其成为构建去中心化应用程序（dApps）和处理基于以太坊的项目的多功能工具。
文档：https://web3js.readthedocs.io/en/v1.8.2/

## Web3.py

Web3.py是一个广泛使用的Python库，便于与以太坊区块链交互，特别是在去中心化应用程序（dApps）中。 它提供发送交易、与智能合约交互、读取区块数据等功能。 虽然最初的API受到了Web3.js的启发，但它已经发展成满足Python开发人员的偏好和要求，提供了一种Python方式与以太坊交互的方式。
文档：https://web3py.readthedocs.io/

## Ethers.js

Ethers.js库旨在成为与以太坊区块链及其生态系统交互的全面且简洁的解决方案。 它广泛用于构建去中心化应用程序（dApps）、创建钱包（如MetaMask和Tally）以及开发涉及读写区块链的其他工具和脚本。 文档详细介绍了如何在各种用例中有效利用ethers.js提供的功能。
文档：https://docs.ethers.org/v6/

## Web3.js和Ethers.js之间的区别

随着区块链和去中心化应用程序（dApps）世界的持续发展，如web3.js和ethers.js这样的JavaScript库已经成为web3开发者的强大工具。 这些库为开发人员提供了与包括以太坊在内的区块链网络进行交互的必要函数和接口。 然而，为了根据项目需求做出明智的选择，了解这些库的优势和缺点是非常重要的。 本文中，我们将比较web3.js和ethers.js，突出它们各自的优势和缺点。

### web3.js的优势：

由以太坊基金会开发的Web3.js是web3开发的最早的JavaScript库之一。 这使得它在设计上具有可信度，因为它受益于庞大的贡献者群体和定期更新。 此外，由于web3.js因其在区块链社区中的广泛采用以及拥有大量经验丰富的开发人员社区而备受推崇。

### web3.js的缺点：

尽管有其优点，web3.js也有一些缺点。 它可能不适合所有新项目，因为它可能不是不同需求或用例的最佳选择。 此外，web3.js依赖于具有限制性限制的许可证，例如需要向公众发布修改，这可能不适合某些项目。 另一个潜在的缺点是与其他web3库相比，其大小较大，可能会影响web3网站或应用程序的性能。

### ethers.js的优势：

另一方面，ethers.js为web3开发提供了几个优势。 它有一个更宽松的许可证，允许免费使用和修改，并要求发布实施修改的源代码。 Ethers.js还是一个轻量级库（仅77kb vs 4.5MB），支持ENS域名，并已经证实支持大量的测试用例，为开发者提供了灵活性和可靠性。 Ethers.js将用于密钥管理的"钱包"和用于连接到以太坊网络的"提供者"角色分离开。 这允许开发人员在管理密钥和交易方面有更多的灵活性，例如使用硬件设备进行钱包功能和使用Unifra作为提供者。

### ethers.js的缺点：

虽然ethers.js相比web3.js有明显的改进，但它也有一些潜在的缺点。 作为一个相对新的库，开发人员可能会在使用ethers.js遇到困难，尤其是对于可能使用其他库构建的老公司或项目。 但是，提供的文本中没有提到具体的缺点。

web3.js和ethers.js是两个流行的web3开发JavaScript库，各自都具有一系列优势和不足。 最终，选择web3.js还是ethers.js将取决于项目的具体需求和涉及的开发人员的偏好。

## 教育视频：

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
    <TabItem value="youtube" label="Exploring Web3 Libraries">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/tkG30ac9VXg?si=RVXtQqR_5EcMevOB" title="Exploring Web3 Libraries" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </TabItem>
    <TabItem value="youtube5" label="Differences Between web3.js and ethers.js">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/mbDdGlaG9lc?si=gMWU8iQUqNtp3jWh" title="Differences Between web3.js and ethers.js" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 
    </TabItem>

</Tabs>
