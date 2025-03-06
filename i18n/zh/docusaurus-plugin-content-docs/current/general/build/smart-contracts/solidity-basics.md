---
sidebar_position: 2
title: Solidity 基础
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - Solidity
  - programming-language
  - 以太坊
  - Conflux-Network
  - variables
  - functions
  - inheritance
  - libraries
  - gas-optimization
  - deployment
tags:
  - Solidity
---

## 介绍

Solidity 是为在以太坊和 Conflux 等区块链平台上编写智能合约而设计的高级编程语言。 它是静态类型的，支持继承、库以及复杂的用户定义类型，这些特性使其成为创建复杂合约的有力工具。

- **语言结构**：Solidity 的语法类似于 JavaScript，使其对新开发者相对容易上手。 它包括变量、函数和控制结构（如 if-else、循环）。

- **Solidity 中的智能合约**：Solidity 中的合约是一组代码和数据的集合，位于区块链上的特定地址。 它们可以定义规则、存储数据，并在满足条件时自动执行函数。

- **变量和类型**：Solidity 支持包括整数、布尔值和字符串在内的各种数据类型。 它还支持数组和结构体等复杂类型，使得对数据的管理更加灵活。

- **函数和修饰符**：函数是智能合约中的可执行单元。 修饰符可以用来改变函数的行为，通常用于访问控制。

- **继承和库**：Solidity 支持继承，允许合约从其他合约继承属性。 库提供了可以独立部署的可重用代码。

- **Gas 和优化**：理解 gas（执行操作的费用）在 Solidity 中至关重要。 编写高效的代码有助于降低交易成本。

- **部署和交互**：在进行编写和测试之后，合约会被部署到区块链上。 它们可以与其他合约交互，也可以被外部用户调用。

为了更深入地理解 Solidity，我们邀请您观看以下一系列视频。 这些指导将带您深入了解 Solidity 的基础知识，提供清晰的示例和详细的解释，以增强您的学习体验。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>

  <TabItem value="variables" label="Variables">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/M_uUHR9Ezfk?si=sYHGnbHhncQOZF-x" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>

  <TabItem value="conditionals" label="Conditional Statements">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/rvoBU77d1p4?si=VKGT4L6fenbscPTk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>

   <TabItem value="loops" label="Loops">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/6OZYrJSsrl0?si=gHdyazGoWRbdb4GS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>

  <TabItem value="arrays" label="Arrays">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/6RLn4_osP8Q?si=iNOcLaiSVEii2-80" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>

  <TabItem value="mappings" label="Mappings">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/7ojW9iJNxL0?si=gaT5TaTFV9baiaVo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>

  <TabItem value="functions" label="Functions">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/7ZszJrfnV24?si=YuewLUg440wWKJxE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>

</Tabs>

<Tabs>

  <TabItem value="enums" label="Enums & Structs">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/LqH-SSp_J24?si=qaxcQOeIUElF-gUZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>

  <TabItem value="constructors" label="Constructors">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/ALQXL9BVc_I?si=G_vCwwmasfP_6cz9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>

   <TabItem value="inheritance" label="Inheritance">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/1hPMpxIWEvo?si=0u-CH7fkbIv8JvXY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>

  <TabItem value="libraries" label="Libraries">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/U5CXH01dD_4?si=Wxn1t5xWohy-9ky8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>

  <TabItem value="events" label="Events">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/dbRDYul2Qv4?si=FnNXHYVyfutX1qk3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>

</Tabs>

## 其他资源

- [Solidity 开发文档](https://docs.soliditylang.org/)
- [Solidity 示例](https://solidity-by-example.org/)
- [以太坊智能合约开发文档](https://ethereum.org/developers/docs/smart-contracts)

## 相关的库

**OpenZeppelin Contracts -** **_用于智能合约安全开发的库。_**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)

