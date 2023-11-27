---
sidebar_position: 5
title: Glossary
---

## Introduction

Welcome to the Glossary section of the Conflux documentation. This section is designed to provide you with clear and concise definitions of key terms and concepts used within Conflux and the broader blockchain industry.

The terms are organized in alphabetical order for easy navigation. Each term includes a straightforward definition and, where applicable, links to more detailed explanations within our documentation or external resources.

## Definitions

### **51% Attack**
A 51% attack refers to a potential attack on a blockchain network, where a single entity or organization is able to control the majority of the network's mining hash rate. This control could allow them to disrupt the network by altering the ordering of transactions, preventing new transactions from gaining confirmations, or even allowing for double spending. It's called a "51% attack" because it typically requires at least 51% control of the network's hash rate to be successful.

### **Account**
The Conflux global state is described in an account model, with the basic storage component called an account. Every actor, which is either a person or an entity that is able to interact with the Conflux world, has its necessary information stored in an account α as a key/value pair of [address](#address) and corresponding state. Refer to [general-accounts](./accounts.md) for detailed information.

### **Address**
An address in Conflux is the identifier of an [account](#account). It's a unique string of characters that represents the account on the blockchain. The format of the address can differ in different Conflux [spaces](./spaces.md). There are different formats for espace addresses and Core Space addresses.

For example:

``` 
// espace address
0x1e97870f263700f46aa00d967821199b9bc5a120
// Core Space Mainnet address
cfx:aatktb2te25ub7dmyag3p8bbdgr31vrbeackztm2rj
// Core Space Testnet address
cfxtest:aatktb2te25ub7dmyag3p8bbdgr31vrbeajcg9pwkc
```

Refer to [general-address](./accounts.md#address), [core-address](../../core/learn/core-space-basics/addresses.md), [espace-address](../../espace/build/accounts.md#mapped-addresses-in-cross-space-operations) for more information.

### **Block**
In blockchain technology, a block is a collection of transactions. It's like a page of a ledger or record book. Each block is linked to the one before it and after it, creating a chain of blocks, hence the term "blockchain". In the context of Conflux, blocks form a tree-like structure, allowing for multiple blocks to be produced concurrently.

### **Blockchain**
A blockchain is a decentralized and distributed digital ledger that records transactions across many computers so that any involved record cannot be altered retroactively, without the alteration of all subsequent blocks. This technology underpins cryptocurrencies like Bitcoin and Ethereum, and it's the foundational technology for the Conflux network.

### **CFX**
CFX is the native currency of the Conflux network. It's used to incentivize the maintenance of the Conflux network and charge users for consumption of resources. CFX plays a very important role in the stability of the system, working as the reward for consensus mechanisms, the transaction fee for each transaction, and for DAO voting.

The smallest subdenomination is denoted by Drip, in which all values processed in Conflux are integers. One Conflux is defined as 10^18 Drip. Frequently used subdenominations of Conflux are listed below:

| Multiplier (in Drip) |     Name     |
| -------------------- |:------------:|
| 10^0                 |     Drip     |
| 10^9                 |    GDrip     |
| 10^12                |     uCFX     |
| 10^18                | Conflux(CFX) |

For more information on the genesis creation, distribution, and release of CFX, please refer to:

- [Economics white paper](https://confluxnetwork.org/files/Conflux_Economic_Paper_20201230.pdf)
- [The Role of the CFX token in the Conflux Network](https://medium.com/conflux-network/the-role-of-the-cfx-token-in-the-conflux-network-5a56c2b43bb0)
- [On-chain DAO Vote for Chain Parameters](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-94.md)
- [Economics](./economics.md)

### **ChainId & NetworkId**
`chainId` is a number indicating where a transaction is intended to be executed. It is used to prevent transaction replay attacks. The chainId of Conflux chains are constant, currently:

- Conflux Core Mainnet: `1029`
- Conflux Core Testnet: `1`
- Conflux eSpace Mainnet: `1030`
- Conflux eSpace Testnet: `71`

`networkId` is used to distinguish between blockchains at the network layer. Currently Conflux mainnet/testnet's `networkId` is same as `chainId`. You can get both of these from the `cfx_getStatus` RPC method.

### **Conflux Ecosystem**
The Conflux Ecosystem refers to the various projects, applications, platforms, and services that are built on or integrated with the Conflux network. This includes decentralized applications (DApps), decentralized finance (DeFi) platforms, wallet services, and more. The Conflux Ecosystem is a vibrant and growing community of developers, users, and organizations that contribute to the Conflux network.

### **Conflux Scan**
[Conflux Scan](https://confluxscan.io/) is the official blockchain explorer for the Conflux network. It provides a user-friendly, details-driven interface for users to view, confirm, and inspect transactions and contracts on the Conflux network. With Conflux Scan, users can track the status of their transactions, view the balance of their accounts, explore smart contracts, and much more.

### **Consensus Algorithm**
A consensus algorithm is a process in computer science used to achieve agreement on a single data value among distributed processes or systems. In the context of blockchain, it's used to agree on the (total) order of transactions. Conflux uses a unique consensus algorithm based on a Tree-Graph structure, which allows for high throughput and low latency in large-scale decentralized networks.

### **DAG (Directed Acyclic Graph)**
In the context of Conflux, DAG is used to represent the block structure of the Conflux network. Unlike traditional blockchain systems that follow a linear chain, Conflux forms a DAG structure of blocks, allowing for multiple blocks to be produced concurrently. This structure is key to Conflux's ability to achieve high throughput and low latency.

### **Decentralized Application (DApp)**
A decentralized application (DApp) is a computer application that runs on a distributed computing system such as a blockchain. Unlike traditional applications that run on centralized servers, DApps leverage the power of blockchain's peer-to-peer network to provide transparency, immutability, and resistance to censorship. The typical framework of a DApp includes 2 layers: the front-end or user interface, and the smart contracts running on the blockchain acting as the back-end logic. The front-end, developed using standard languages like HTML, CSS, and JavaScript, interacts with the blockchain through smart contracts. These smart contracts, written in languages like Solidity, define the rules and logic of the DApp, and are stored and executed on the blockchain, ensuring consistent and trustless operation.

### **Double Spending**
Double spending is a potential flaw in a digital cash scheme in which a single digital token can be spent more than once. This is possible because a digital token consists of a digital file that can be duplicated or falsified. The Conflux network, like other blockchain networks, uses a consensus mechanism to prevent double spending.

### **Epoch**

In Conflux, an epoch is a fundamental unit used to update the world state, setting it apart from blockchain like Bitcoin or Ethereum, where updates are done by block. An epoch in Conflux is a specific partitioning of blocks that determines their total order. This partitioning is based on the pivot chain in a Tree-Graph structure, and the pivot block will be the last block in each epoch. Once the pivot chain is determined and not reverted, the partition of epochs becomes immutable, meaning the order of transactions and execution results cannot be changed.

### **ERC20**
ERC20 is a standard for tokens on the Ethereum blockchain. It specifies a set of functions and events that a token contract has to implement. While this is a standard on the Ethereum network, tokens on the Conflux network can also follow this standard, especially if they are transferred from the Ethereum network via the ShuttleFlow protocol.

### **ERC721**
ERC721 is a standard for non-fungible tokens (NFTs) on the Ethereum blockchain. Unlike ERC20 tokens, which are identical to each other, each ERC721 token is unique. This makes them suitable for representing ownership of unique items or assets. Like ERC20, ERC721 tokens can also exist on the Conflux network, especially if they are transferred from the Ethereum network.

### **Fork**
In blockchain, a fork is a change to the software that creates two separate versions of the blockchain with a shared history. Forks can be either "hard" or "soft", depending on whether the change is compatible with previous versions of the software. In the context of Conflux, forks are less common due to the Tree-Graph structure of the network, which allows for concurrent block production.

### **Gas**
In the context of blockchain, gas refers to the fee required to successfully conduct a transaction or execute a contract on the Ethereum blockchain. In Conflux, the concept of gas also exists, but with a unique twist: the gas fee for contract execution is paid by contract sponsors, not by users. This improves the user experience by allowing users to interact with smart contracts without worrying about gas fees.

Refer to [Gas](./gas.md) for more information.

### **GHAST**
GHAST (Greedy Heaviest Adaptive SubTree) is the Conflux protocol's rule for selecting a chain from the Tree-Graph structure. It's designed to ensure safety and liveness properties in the network. GHAST is a key part of Conflux's unique consensus mechanism.

Refer to [GHAST](../conflux-basics/consensus-mechanisms/proof-of-work/ghast.md) for more information.

### **Hard Fork**
A hard fork is a type of fork that creates a permanent divergence from the previous version of the blockchain. Nodes running the old version will not be accepted by the new version. This is a common concept in many blockchains, but due to the unique structure of Conflux, hard forks are less common.

### **Hash**
A hash is a function that converts the input data into an encrypted output of a fixed length. In the context of blockchain, a hash function is used to secure data. Each block in a blockchain has a unique hash, and any change to the block's data will result in a different hash.

### **Internal Transactions**
Internal transactions in blockchain refer to value transfers or operations within a smart contract. These transactions are triggered by external transactions and can involve actions such as transferring tokens, creating new tokens, executing function calls, or interacting with other smart contracts. These transactions are not recorded individually on the blockchain, but they can be tracked and displayed for analysis and visibility.

[ConfluxScan](https://confluxscan.io) and [trace JSON-RPC API](../../core/build/json-rpc/trace-namespace.md) can track and display internal transactions for analysis and visibility.

Related links:

- [trace JSON-RPC API](../../core/build/json-rpc/trace-namespace.md)

### **Merkle Tree**
A Merkle tree, in cryptography and computer science, is a tree in which every leaf node is labelled with the hash of a data block, and every non-leaf node is labelled with the cryptographic hash of the labels of its child nodes. Merkle trees are used in blockchains to efficiently verify the contents of large data structures.

### **Mining**
Mining is the process of validating new transactions and recording them on a blockchain. Miners use powerful computers to solve complex mathematical problems that validate transactions. The first miner to solve the problem gets to add a new block to the blockchain and is rewarded with a certain amount of cryptocurrency. In the context of Conflux, mining is used to add new blocks to the Tree-Graph structure of the network.

Refer to [Mining](../mine-stake/mine/running-mining-node.md) for more information about running a mining node.

### **Node**
In the context of blockchain, a node is a server that participates in the blockchain network. Each node keeps a copy of the blockchain in some way (depending on its type) and follows the rules of the network. Nodes validate transactions, maintaining the network's security and decentralization.

Refer to [Run a Node](../run-a-node) section for more information about running nodes.

### **Nonce**
In blockchain technology, nonce ("number only used once") has different meaning in different context.

In mining, nonce is a number added to let the block header meet the difficulty level restrictions. The nonce is the number that blockchain miners are solving for.

In transaction, nonce is the execution sequence number of transactions sent from an account. A transaction with incorrect nonce won't be included in blockchain, so correctly setting the nonce is critical to transaction execution. Refer to [nonce](../../core/learn/core-space-basics/core-transactions.md#nonce) for more information.

### **Oracles**
In the context of blockchains and smart contracts, an oracle is an agent that finds and verifies real-world occurrences and submits this information to a blockchain to be used by smart contracts. Oracles are used in the Conflux network to bring external information into smart contracts, enabling them to interact with the outside world.

### **Peer-to-Peer Network (P2P)**
A peer-to-peer network is one in which each computer in the network can act as a client or server for the other computers in the network, allowing shared access to files and peripherals without the need for a central server. Conflux, like other blockchain networks, operates as a peer-to-peer network, with each node communicating directly with others.

### **Proof of Stake (PoS)**
Proof of Stake (PoS) is a type of consensus algorithm where block creators are chosen based on the number of tokens they hold or are willing to "stake". PoS is used in the Conflux network to prevent 51% attacks and to finalize blocks.

Refer to [PoS](../conflux-basics/consensus-mechanisms/proof-of-stake/pos_overview.md) for more information.

### **Proof of Work (PoW)**
Proof of Work (PoW) is a type of consensus algorithm where the first participant to solve a complex mathematical problem gets to add a new block to the blockchain. PoW is used in many blockchains, including Bitcoin and Ethereum before September 15, 2022. While Conflux uses a unique consensus mechanism based on a Tree-Graph structure, it shares similarities with PoW in terms of incentivizing participants to maintain the network.

Refer to [PoW](../conflux-basics/consensus-mechanisms/proof-of-work/proof-of-work.mdx) for more information.

### **Public/Private Key**
A public key is a cryptographic code that allows a user to receive cryptocurrencies into his or her account. The private key is used to sign transactions or digital messages and the public key is used to verify the signature. In the context of Conflux, users have a pair of public and private keys that they use to interact with the network.

### **Smart Contract**
A smart contract is a self-executing contract with the terms of the agreement directly written into code. They run on the blockchain, so they are stored on a public database and cannot be changed. In the Conflux network, users can create and interact with smart contracts, which can automate a wide range of applications and processes.

### **Space**
In the Conflux network, "Space" refers to a specific environment within the network. For example, Core Space refers to the original Conflux network, while eSpace is the virtualized Ethereum chain running on top of the Core Space network. The two spaces are logically independent of each other and do not affect each other except for certain cross-space operations.

Refer to [Spaces](./spaces.md) for more information.

### **Sponsorship Mechanism**
In Conflux, the transaction fee for contract execution can be paid by users but also by contract sponsors. This sponsorship mechanism allows DApp users on Conflux to not worry about gas fees, improving user experience. Sponsors can set up a sponsorship by depositing CFX into a contract.

Refer to [Sponsor Mechanism](../../core/learn/core-space-basics/sponsor-mechanism.md) for more information.

### **Staking (in Conflux)**
Staking in Conflux typically refers to the PoS staking, the process of participating in the network PoS consensus by locking up a certain amount of CFX. Stakers can earn rewards for their participation. This mechanism helps to secure the network and incentivize participation.

Refer to [Staking FAQs](../mine-stake/stake/faqs.md) for more information.

### **Transactions**
A Conflux transaction is a single instruction composed by an external actor with a Conflux account, and this instruction is cryptographically signed using the sender account's private key to prevent transaction forge. A transaction can involve a simple transfer of CFX (the native currency of Conflux), a transfer of tokens (such as ERC20 or ERC721), a deployment of a new smart contract, or an execution of a function on an existing smart contract. Transactions are the only way to store or update data on the blockchain.

Refer to [Transactions](./transactions.md) for more information.

### **Tree-Graph**
In the context of Conflux, the Tree-Graph is a novel consensus mechanism that allows for high throughput and low latency in large-scale decentralized networks. Unlike traditional blockchain systems that follow a linear chain, Conflux forms a tree-like structure of blocks, allowing for multiple blocks to be produced concurrently. This structure is key to Conflux's ability to process a high number of transactions per second.

Refer to [Tree-Graph](../conflux-basics/consensus-mechanisms/proof-of-work/tree-graph.md) for more information.


### **Wallet (billetera)**
In the context of blockchain, a wallet is a digital place to store cryptocurrency. It can be in the form of a software (online or offline) or hardware device. In the Conflux Network, users can use wallets like Fluent to manage their CFX and interact with the network.

Refer to [Wallets](../tutorials/wallets/wallets.mdx) for more information about supported wallets.
