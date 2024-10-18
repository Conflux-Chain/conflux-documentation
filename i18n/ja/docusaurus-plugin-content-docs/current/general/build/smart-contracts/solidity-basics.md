---
sidebar_position: 2
title: Solidity Basics
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - Solidity
  - programming-language
  - Ethereum
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

## Intro

Solidity is a high-level programming language designed for implementing smart contracts on blockchain platforms like Ethereum and Conflux Network. It's statically typed, supports inheritance, libraries, and complex user-defined types, making it a powerful tool for creating sophisticated contracts.

- **Language Structure:** Solidity's syntax is similar to JavaScript, making it relatively accessible to new developers. It includes variables, functions, and control structures (like if-else, loops).

- **Smart Contracts in Solidity**: Contracts in Solidity are collections of code and data that reside at a specific address on the blockchain. They can define rules, store data, and automatically execute functions when conditions are met.

- **Variables and Types**: Solidity supports various data types including integers, booleans, and strings. It also supports complex types like arrays and structs, offering flexibility in data management.

- **Functions and Modifiers**: Functions are the executable units in a contract. Modifiers can be used to change the behavior of functions, often for access control.

- **Inheritance and Libraries**: Solidity supports inheritance, allowing contracts to inherit properties from other contracts. Libraries provide reusable code that can be deployed independently.

- **Gas and Optimization**: Understanding gas (the fee for executing operations) is crucial in Solidity. Writing efficient code can help in minimizing transaction costs.

- **Deployment and Interactions**: After writing and testing, contracts are deployed to the blockchain. They can interact with other contracts and be called by external users.

For a deeper understanding, we invite you to watch the following series of informative videos. These guides walk you through the fundamentals of Solidity, offering clear examples and detailed explanations to enhance your learning experience.

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

## Resources

- [Solidity documentation](https://docs.soliditylang.org/)
- [Solidity by example](https://solidity-by-example.org/)
- [Ethereum's Smart Contract Documentation](https://ethereum.org/developers/docs/smart-contracts)

## Libraries

**OpenZeppelin Contracts -** **_Library for secure smart contract development._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
