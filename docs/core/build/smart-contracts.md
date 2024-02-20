---
sidebar_position: 2
title: Smart Contracts
displayed_sidebar: coreSidebar
---

A "smart contract" is simply a program that runs on the Conflux Core blockchain. It's a collection of code (its functions) and data (its state) that resides at a specific address on the Conflux Core blockchain.

Smart contracts are a type of Conflux account. This means they have a balance and can be the target of transactions. However they're not controlled by a user, instead they are deployed to the network and run as programmed. User accounts can then interact with a smart contract by submitting transactions that execute a function defined on the smart contract. Smart contracts can define rules, like a regular contract, and automatically enforce them via the code. Smart contracts cannot be deleted by default, and interactions with them are irreversible.

## Smart contract languages {#smart-contract-languages}

Although at the underlying level, Conflux Core can only understand EVM bytecode, developers can use a variety of languages to write smart contracts. Currently, the most popular smart contract programming language is Solidity, which is specifically designed for the Ethereum Virtual Machine (EVM). Conflux Core also supports the Solidity language.

Solidity is an object-oriented, high-level language for implementing smart contracts. Smart contracts are programs that govern the behavior of accounts within the VM state.

### Resources

- [Solidity documentation](https://docs.soliditylang.org/)
- [Solidity by example](https://solidity-by-example.org/)
- [Ethereum's Smart Contract Documentation](https://ethereum.org/developers/docs/smart-contracts)

### Libraries

**OpenZeppelin Contracts -** **_Library for secure smart contract development._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Community Forum](https://forum.openzeppelin.com/c/general/16)

Conflux Solidity Library

- [conflux-contracts](https://github.com/conflux-fans/conflux-contracts) including source code of Conflux's Internal Contracts and utilities.

## Compare to Ethereum Smart Contract

Conflux's VM is almost entirely compatible with EVM, meaning that the majority of Ethereum smart contracts can be deployed and run directly on Conflux Core. Conflux Core smart contracts are also written in the Solidity language, and mainstream Solidity libraries can be used directly for developing Conflux Core smart contracts.

However, there are two points to note for Ethereum smart contract developers:

1. The calculation rules for Conflux Core contract addresses are different from Ethereum. If there are any instances of address calculations in Solidity code or interaction logic, it is important to check whether modifications are needed.
2. The 1820 contract address in Conflux Core is different from Ethereum. The Ethereum 1820 contract address is `0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24`, while the Conflux Core 1820 contract address is `0x88887eD889e776bCBe2f0f9932EcFaBcDfCd1820`.

Check [Differences between Conflux VM and EVM](../core-space-basics/vm-difference.md) for more details.

## Conflux Smart contract development tools {#smart-contract-development-tools}

It's recommended to use the following tools for smart contract development:

- Hardhat + [Conflux Network plugin](https://github.com/conflux-chain/hardhat-conflux) - A popular Ethereum development environment for smart contracts
- [ChainIDE](https://chainide.com/) - A Remix like web-based IDE for smart contract development

### Scan contract read write tool

Conflux Scan provides a tool to read and write smart contracts. You can use it to interact with smart contracts on the Conflux network.

![](../tutorials/imgs/sponsor/sponsor-read-methods.png)

Any contract on the Conflux network that has been verified on Conflux Scan can be interacted with using this tool. You can read the contract's state, call its methods, and send transactions to it.

## Smart contract resources {#smart-contract-resources}

- [EVM opcodes reference](https://www.evm.codes/)

## Further reading {#further-reading}

- [Coinbase: What is a smart contract?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: What is a smart contract?](https://chain.link/education/smart-contracts)
- [Video: Simply Explained - Smart Contracts](https://youtu.be/ZE2HxTmxfrI)