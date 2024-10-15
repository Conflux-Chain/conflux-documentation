---
sidebar_position: 1
title: Overview
displayed_sidebar: eSpaceSidebar
description: This page is meant to provide a quick overview of the different SDKs you can use when developing on Conflux eSpace.
tags:
  - SDKs
  - Conflux eSpace
  - JSON-RPC
  - Web3.js
  - Web3.py
  - Ethers.js
  - JavaScript
  - Python
  - Blockchain Interaction
  - Smart Contracts
  - ABI
  - Providers
  - Wallets
  - CFX
  - DRIP
  - Ethereum Compatibility
  - dApps
  - MetaMask
  - Unifra
  - ConfluxScan
  - Library Comparison
  - Web3 Development
---

# Overview

To interact with the Conflux blockchain through a web app, it is necessary to connect to a Conflux node. This can be done using the JSON-RPC specification, which is implemented by every Conflux client, providing a uniform set of methods for applications to rely on.

While it is possible to use vanilla JavaScript to connect with a Conflux node, there are convenient libraries within the Conflux ecosystem that simplify the process. These libraries allow developers to write intuitive, one-line methods to initialize JSON-RPC requests that interact with Conflux, abstracting away much of the complexity of directly interacting with a Conflux node and providing utility functions for easier development.

Some of the features offered by these libraries include the ability to connect to Conflux nodes using providers, such as JSON-RPC, Unifra, ConfluxScan, or MetaMask, as well as wallet functionality for creating wallets, managing keys, and signing transactions. Additionally, these libraries enable interaction with smart contract functions by reading the Application Binary Interface (ABI) of a compiled contract. The ABI is a JSON format that explains the functions of the contract and allows developers to use it like a normal JavaScript object.

Utility functions offered by these libraries also provide handy shortcuts for building with Conflux, such as converting CFX values to DRIP, as 1 CFX is equal to 1,000,000,000,000,000,000 DRIP, and working with numbers in this format can be challenging. For example, the web3.utils.toWei function can be used to convert CFX to DRIP.

Some of the most popular libraries for interacting with Conflux using JavaScript include Web3.js, which is the Ethereum JavaScript API, and Ethers.js, which is a complete Ethereum wallet implementation and utilities in JavaScript and TypeScript.
Here are the links to the documentation and GitHub repositories of the most popular libraries:

## Web3.js

Web3.js is a comprehensive set of libraries that provides seamless interactions with Ethereum nodes, whether local or remote, through various protocols such as HTTP, IPC, or WebSocket. It offers a wide range of functionalities for developers to interact with the Ethereum blockchain, making it a versatile tool for building decentralized applications (dApps) and working with Ethereum-based projects.
Documentation: https://web3js.readthedocs.io/en/v1.8.2/

## Web3.py

Web3.py is a widely used Python library that facilitates interactions with the Ethereum blockchain, particularly in decentralized applications (dApps). It provides functionalities for sending transactions, interacting with smart contracts, reading block data, and more. While its initial API was inspired by Web3.js, it has evolved to cater to the preferences and requirements of Python developers, offering a Pythonic way of interacting with Ethereum.
Documentation: https://web3py.readthedocs.io/

## Ethers.js

The ethers.js library is designed to be a comprehensive and concise solution for interacting with the Ethereum Blockchain and its ecosystem. It is widely utilized for building decentralized applications (dApps), creating wallets (e.g., MetaMask and Tally), and developing other tools and scripts that involve reading and writing to the blockchain. The documentation provides detailed information on how to effectively leverage the functionalities offered by ethers.js in a variety of use cases.
Documentation: https://docs.ethers.org/v6/

## Differences between Web3.js and Ethers.js

As the world of blockchain and decentralized applications (dApps) continues to evolve, JavaScript libraries such as web3.js and ethers.js have emerged as powerful tools for web3 developers. These libraries provide developers with the necessary functions and interfaces to interact with blockchain networks, including Ethereum. However, it is important to understand the advantages and setbacks of these libraries in order to make an informed choice based on project requirements. In this article, we will compare web3.js and ethers.js, highlighting their respective advantages and setbacks.

### Advantages of web3.js:

Web3.js, developed by the Ethereum Foundation, has the distinction of being one of the earliest JavaScript libraries for web3 development. This lends credibility to its effectiveness in design, as it benefits from a large base of contributors and regular updates. Additionally, web3.js has gained popularity due to its widespread adoption in the blockchain community and the availability of a large community of experienced developers.

### Setbacks of web3.js:

Despite its advantages, web3.js also has some setbacks. It may not be suitable for all new projects, as it may not be the best fit for different requirements or use cases. Additionally, web3.js relies on a license with restrictive limitations, such as the need to release modifications to the public, which may not be suitable for some projects. Another potential drawback is its larger size compared to other web3 libraries, which may impact the performance of a web3 site or app.

### Advantages of ethers.js:

Ethers.js, on the other hand, offers several advantages for web3 development. It has a broader license that allows for free usage and modifications, with the requirement to release source code with implemented modifications. Ethers.js is also a lightweight library (only 77kb vs 4.5MB) that supports ENS domain names and has proven support for a large number of test cases, providing developers with flexibility and reliability. Ethers.js separates the roles of a "wallet" for key management and a "provider" for connecting to the Ethereum network. This allows developers to have more flexibility in managing keys and transactions, such as using a hardware device for wallet functions and Unifra as the provider.

### Setbacks of ethers.js:

While ethers.js presents noticeable improvements over the setbacks of web3.js, it also has some potential drawbacks. Being a comparatively new library, developers may encounter difficulties in using ethers.js for older companies or projects that may have been built using other libraries. However, no specific setbacks were mentioned in the provided text.

web3.js and ethers.js are two popular JavaScript libraries for web3 development, each with its own set of advantages and setbacks. Ultimately, the choice between web3.js and ethers.js would depend on the specific needs of the project and the preferences of the developers involved.

## Educational Videos:

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
