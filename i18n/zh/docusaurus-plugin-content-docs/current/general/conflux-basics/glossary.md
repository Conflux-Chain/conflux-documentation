---
sidebar_position: 5
title: 术语表
displayed_sidebar: generalSidebar
---

## 简介

欢迎来到Conflux文档的术语表部分。 本节旨在为您提供Conflux及更广泛的区块链行业内关键术语和概念的清晰、简洁定义。

术语按字母顺序排列，便于查找。 每个术语都包括一个直接的定义，并在适用的情况下，链接到我们文档中的更详细解释或外部资源。

## 定义

### **51%攻击**
51%攻击指的是对区块链网络的潜在攻击，其中单个实体或组织能够控制网络大部分的挖矿哈希率。 这种控制允许他们通过改变交易的顺序、阻止新交易获得确认，甚至允许双重支付来破坏网络。 之所以称为“51%攻击”，是因为通常需要至少控制51%的网络哈希率才能成功。

### **账户**
Conflux的全局状态是用一个账户模型来描述的，基本的存储组件称为账户。 每一个能够与Conflux世界交互的参与者，无论是人还是实体，都有其必要的信息以[地址](#address)和相应状态的键/值对的形式存储在一个账户α中。 详细信息请参考[general-accounts](./accounts.md)。

### **地址**
An address in Conflux is the identifier of an [account](#account). It's a unique string of characters that represents the account on the blockchain. The format of the address can differ in different Conflux [spaces](./spaces.md). There are different formats for espace addresses and Core Space addresses.

例如：

``` 
// espace address
0x1e97870f263700f46aa00d967821199b9bc5a120
// Core Space Mainnet address
cfx:aatktb2te25ub7dmyag3p8bbdgr31vrbeackztm2rj
// Core Space Testnet address
cfxtest:aatktb2te25ub7dmyag3p8bbdgr31vrbeajcg9pwkc
```

Refer to [general-address](./accounts.md#address), [core-address](../../core/core-space-basics/addresses.md), [espace-address](../../espace/build/accounts.md#mapped-addresses-in-cross-space-operations) for more information.

### **区块**
在区块链技术中，区块是交易的集合。 它就像账本或记录簿的一页。 每个区块都与前后的区块相连，形成一连串的区块，因此得名“区块链”。 在Conflux中，区块形成树状结构，允许同时产生多个区块。

### **区块链**
区块链是一种去中心化和分布式的数字账本，可以跨多台计算机记录交易，使任何涉及的记录都无法在不更改所有后续区块的情况下被追溯性地更改。 这种技术是比特币和以太坊等加密货币的基础，也是Conflux网络的基础技术。

### **CFX**
CFX是Conflux网络的原生货币。 It's used to incentivize the maintenance of the Conflux network and charge users for consumption of resources. CFX作为共识机制的奖励、每笔交易的交易费以及DAO投票的工具，在系统稳定性方面发挥着非常重要的作用。

最小的子单位称为Drip，Conflux处理的所有Drip的值都是整数。 一个Conflux定义为10^18 Drip。 Conflux常用的子单位如下：

| Multiplier (in Drip) |      名称      |
| -------------------- |:------------:|
| 10^0                 |     Drip     |
| 10^9                 |    GDrip     |
| 10^12                |     uCFX     |
| 10^18                | Conflux(CFX) |

关于CFX的创世创建、分配和释放的更多信息，请参考：

- [经济白皮书](https://confluxnetwork.org/files/Conflux_Economic_Paper_20201230.pdf)
- [CFX代币在Conflux网络中的作用](https://medium.com/conflux-network/the-role-of-the-cfx-token-in-the-conflux-network-5a56c2b43bb0)
- [链上DAO投票链参数](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-94.md)
- [经济模型](./economics.md)

### **ChainId & NetworkId**
`chainId`是一个数字，表示一笔交易打算在哪里执行。 它用于防止交易重放攻击。 The chainId of Conflux chains are constant, currently:

- Conflux Core Mainnet: `1029`
- Conflux Core Testnet: `1`
- Conflux eSpace Mainnet: `1030`
- Conflux eSpace Testnet: `71`

`networkId`用于在网络层区分不同的区块链。 目前Conflux主网/测试网的`networkId`与`chainId`相同。 你可以从`cfx_getStatus` RPC方法中获取这两个值。

### **Conflux生态系统**
The Conflux Ecosystem refers to the various projects, applications, platforms, and services that are built on or integrated with the Conflux network. This includes decentralized applications (DApps), decentralized finance (DeFi) platforms, wallet services, and more. The Conflux Ecosystem is a vibrant and growing community of developers, users, and organizations that contribute to the Conflux network.

### **Conflux Scan**
[Conflux Scan](https://confluxscan.io/) is the official blockchain explorer for the Conflux network. It provides a user-friendly, details-driven interface for users to view, confirm, and inspect transactions and contracts on the Conflux network. With Conflux Scan, users can track the status of their transactions, view the balance of their accounts, explore smart contracts, and much more.

### **共识算法**
A consensus algorithm is a process in computer science used to achieve agreement on a single data value among distributed processes or systems. In the context of blockchain, it's used to agree on the (total) order of transactions. Conflux uses a unique consensus algorithm based on a Tree-Graph structure, which allows for high throughput and low latency in large-scale decentralized networks.

### **DAG（有向无环图）**
In the context of Conflux, DAG is used to represent the block structure of the Conflux network. Unlike traditional blockchain systems that follow a linear chain, Conflux forms a DAG structure of blocks, allowing for multiple blocks to be produced concurrently. This structure is key to Conflux's ability to achieve high throughput and low latency.

### **去中心化应用（DApp）**
A decentralized application (DApp) is a computer application that runs on a distributed computing system such as a blockchain. Unlike traditional applications that run on centralized servers, DApps leverage the power of blockchain's peer-to-peer network to provide transparency, immutability, and resistance to censorship. The typical framework of a DApp includes 2 layers: the front-end or user interface, and the smart contracts running on the blockchain acting as the back-end logic. The front-end, developed using standard languages like HTML, CSS, and JavaScript, interacts with the blockchain through smart contracts. These smart contracts, written in languages like Solidity, define the rules and logic of the DApp, and are stored and executed on the blockchain, ensuring consistent and trustless operation.

### **双花**
Double spending is a potential flaw in a digital cash scheme in which a single digital token can be spent more than once. This is possible because a digital token consists of a digital file that can be duplicated or falsified. The Conflux network, like other blockchain networks, uses a consensus mechanism to prevent double spending.

### **纪元（Epoch）**

In Conflux, an epoch is a fundamental unit used to update the world state, setting it apart from blockchain like Bitcoin or Ethereum, where updates are done by block. An epoch in Conflux is a specific partitioning of blocks that determines their total order. This partitioning is based on the pivot chain in a Tree-Graph structure, and the pivot block will be the last block in each epoch. Once the pivot chain is determined and not reverted, the partition of epochs becomes immutable, meaning the order of transactions and execution results cannot be changed.

### **ERC20**
ERC20是以太坊区块链上代币的标准。 它规定了代币合约必须实现的一组函数和事件。 这是以太坊网络上的标准，但Conflux网络上的代币也可以遵循这个标准，特别是通过[Zero Gravity protocol](../tutorials/transferring-funds/across-chains/zero-gravity.md)从以太坊网络转移过来的代币。

### **ERC721**
ERC721是以太坊区块链上非同质化代币（NFT）的标准。 与彼此相同的ERC20代币不同，每个ERC721代币都是独一无二的。 这使它们适合代表独特物品或资产的所有权。 像ERC20一样，ERC721代币也可以存在于Conflux网络上，尤其当它们是从以太坊网络转移过来的。

### **分叉**

A fork in a blockchain system denotes a split or divergence in the chain, originating from a common point with a shared history and creating two distinct paths. They can be implemented intentionally via software updates to either bring about significant changes (hard fork) or introduce backward-compatible alterations (soft fork). However, forks can also occur organically due to simultaneous block creation or as a result of network latencies and block propagation delays.

Additionally, malicious activities aimed at disrupting the network, performing deceptive transactions, or double-spending can also force a fork in the system. These inadvertent forks are typically short-lived as subsequent block addition commonly results in the resolution of temporary branches. No matter the reason for their occurrence, forks are an inherent part of the dynamic and decentralized nature of blockchain technology, necessitating robust consensus mechanisms to manage and mitigate potential issues.

> Refer to [Hard Forks](../hardforks/hardforks.md) for more information of Conflux history hard forks.

Further reading:

- [What is a fork?](https://www.coinbase.com/learn/crypto-basics/what-is-a-fork)
- [Wikipedia: Fork(blockchain)](https://en.wikipedia.org/wiki/Fork_(blockchain))

### **燃气**

In the context of blockchain, "gas" is a term primarily associated with networks like Ethereum. Gas is a measure of computational effort required to execute specific operations. Each operation has a fixed amount of gas associated with it, related to the complexity of the operation.

Gas must be paid when user initiate transactions or execute smart contracts, essentially serving as a transaction fee. The concept of gas incentivizes miners to validate and add transactions to the blockchain. Additionally, by attaching a cost to every operation, gas prevents spam on the network and discourages inefficient code, enhancing overall network security and efficiency.

Gas is also required for transaction execution in either Conflux Core Space or eSpace. And in Core Space, besides gas, [collateral for storage](../../core/core-space-basics/storage.md) is also introduced as transaction fee.

Refer to [Gas](./gas.md) for more information.

### **GHAST**
GHAST（贪婪最重适应子树 Greedy Heaviest Adaptive SubTree ）是Conflux协议用于从树图结构中选择链的规则。 它旨在确保网络中的安全性和活性属性。 GHAST是Conflux独特共识机制的关键部分。

更多信息请参考[GHAST](../conflux-basics/consensus-mechanisms/proof-of-work/ghast.md)。

### **哈希**

A hash is a function that transforms input data into a fixed length output, also known as a "hash value". Various hash functions, such as the SHA-256 (Secure Hash Algorithm 256-bit) used primarily in Bitcoin and the Keccak-256 employed in Ethereum as well as Conflux, serve pivotal roles in assuring blockchain security. Hash function plays a crucial role in blockchain as they ensure a unique hash is generated for  every block within the blockchain has. For example, these hash functions are used in generating unique identifiers for blockchain blocks and in creating a secure linkage between blocks in a blockchain, with each block bearing a unique hash.

Significant to note is the principle of hash invertibility. A hash function is considered as a 'one-way' function, meaning while data can be converted into a hash value, the process cannot be reversed. That is, it is computationally infeasible to derive the original input data solely from the hash value. The data held by the hash is, therefore, deemed to be secure, reinforcing the integrity and security of blockchains, hence making them a fundamental component in the technology. This uniqueness and inability to reverse engineer the original data from the hash, reinforces the integrity and security of the blockchain.

### **内部交易**
区块链中的内部交易指的是智能合约内部的价值转移或操作。 These transactions are triggered by external transactions and can involve actions such as transferring tokens, creating new tokens, executing function calls, or interacting with other smart contracts. These transactions are not recorded individually on the blockchain, but they can be tracked and displayed for analysis and visibility.

[ConfluxScan](https://confluxscan.io)和[trace JSON-RPC API](../../core/build/json-rpc/trace-namespace.md)可以跟踪和显示内部交易，以便进行分析和可视化。

相关链接:

- [trace JSON-RPC API](../../core/build/json-rpc/trace-namespace.md)

### **默克尔树**
在密码学和计算机科学中，默克尔树是一种树状结构，其中每个叶子节点都被赋予了一个数据块哈希值的标签，而每个非叶子节点的标签则是由其所有子节点的标签的值经过哈希计算得来的。 默克尔树在区块链中用于高效验证大型数据结构的内容。

### **挖矿**
Mining is like a competition where people use powerful computers to solve puzzles. Each puzzle solved helps confirm new transactions and safely add them to the blockchain. Think of **miners** as special participants who use advanced equipment, like ASICs or high-performance GPUs, to take part in this puzzle-solving contest. The contest involves lots of trial and error to find a special code (hash value) that fits certain rules. When a miner finds the right code, it's like they win the round, allowing them to add a page (block) of confirmed transactions to the ledger. The first one to do this gets a prize in the form of digital money (cryptocurrency). In the Conflux network, this process helps to build a unique ledger structure known as the Tree-Graph, which organizes transactions in a special way.

Refer to [Mining](../mine-stake/mine/running-mining-node.md) for more information about running a mining node.

### **节点**
In the context of blockchain, a node is a server that participates in the blockchain network. Each node keeps a copy of the blockchain in some way (depending on its type) and follows the rules of the network. Nodes validate transactions, maintaining the network's security and decentralization.

Refer to [Run a Node](../run-a-node) section for more information about running nodes.

### **Nonce**
In blockchain technology, nonce ("number only used once") has different meaning in different context.

In mining, nonce is a number added to let the block header meet the difficulty level restrictions. The nonce is the number that blockchain miners are solving for.

In transaction, nonce is the execution sequence number of transactions sent from an account. A transaction with incorrect nonce won't be included in blockchain, so correctly setting the nonce is critical to transaction execution. Refer to [nonce](/docs/core/core-space-basics/transactions/tx-fields.md#nonce) for more information.

### **预言机**
In the context of blockchains and smart contracts, an oracle is an agent that finds and verifies real-world occurrences and submits this information to a blockchain to be used by smart contracts. Oracles are used in the Conflux network to bring external information into smart contracts, enabling them to interact with the outside world.

### **点对点网络（P2P）**
A peer-to-peer network is one in which each computer in the network can act as a client or server for the other computers in the network, allowing shared access to files and peripherals without the need for a central server. Conflux, like other blockchain networks, operates as a peer-to-peer network, with each node communicating directly with others.

### **权益证明（PoS）**
Proof of Stake (PoS) is a type of consensus algorithm where block creators are chosen based on the number of tokens they hold or are willing to "stake". PoS is used in the Conflux network to prevent 51% attacks and to finalize blocks.

Refer to [PoS](../conflux-basics/consensus-mechanisms/proof-of-stake/pos_overview.md) for more information.

### **工作量证明（PoW）**
Proof of Work (PoW) is a type of consensus algorithm where the first participant to solve a complex mathematical problem gets to add a new block to the blockchain. PoW is used in many blockchains, including Bitcoin and Ethereum before September 15, 2022. While Conflux uses a unique consensus mechanism based on a Tree-Graph structure, it shares similarities with PoW in terms of incentivizing participants to maintain the network.

Refer to [PoW](../conflux-basics/consensus-mechanisms/proof-of-work/proof-of-work.mdx) for more information.

### **公钥/私钥**
A public key is a cryptographic code that allows a user to receive cryptocurrencies into his or her account. The private key is used to sign transactions or digital messages and the public key is used to verify the signature. In the context of Conflux, users have a pair of public and private keys that they use to interact with the network.

### **智能合约**
A smart contract is a self-executing contract with the terms of the agreement directly written into code. They run on the blockchain, so they are stored on a public database and cannot be changed. In the Conflux network, users can create and interact with smart contracts, which can automate a wide range of applications and processes.

### **Space**
在Conflux网络中，“Space”指的是网络内的特定环境。 For example, Core Space refers to the original Conflux network, while eSpace is the virtualized Ethereum chain running on top of the Core Space network. 这两个空间在逻辑上是相互独立的，除了某些跨空间操作外，它们不会相互影响。

Refer to [Spaces](./spaces.md) for more information.

### **赞助机制**

In Conflux **Core Space**, the transaction fee for contract execution can be paid by users but also by contract sponsors. 这种代付机制允许Conflux上的DApp用户不必担心燃气费用，从而改善用户体验。 代付方可以通过向合约存入CFX来设置代付。

更多信息请参考[代付机制](../../core/core-space-basics/sponsor-mechanism.md)。

### **质押（在Conflux中）**
Staking in Conflux typically refers to the PoS staking, the process of participating in the network PoS consensus by locking up a certain amount of CFX. Stakers can earn rewards for their participation. This mechanism helps to secure the network and incentivize participation.

Refer to [Staking FAQs](../mine-stake/stake/faqs.md) for more information.

### **Collateral for Storage**

Collateral for storage (CFS for short, or storage collateral) mechanism is introduced in Conflux **Core Space** as a pricing method for the usage of storage, which is more fair and reasonable than the one-off storage fee in Ethereum. In principle, this mechanism requires a fund being locked as collateral for any occupation of storage space. The collateral is locked until the corresponding storage is freed or overwritten by someone else, and the corresponding interest generated by the locked collateral is assigned directly to miners for the maintenance of storage. Thus, the cost of storage in Conflux also depends on the duration of space occupation.

For more information, refer to [Storage Collateral](../../core/core-space-basics/storage.md).

### **交易**
Conflux交易是由一个拥有Conflux账户的外部参与者组成的单个指令，该指令使用发送者账户的私钥进行密码学签名，以防止交易伪造。 一笔交易可以涉及简单的CFX（Conflux的本地货币）转账、代币（如ERC20或ERC721）转账、新智能合约的部署或现有智能合约上的函数执行。 交易是在区块链上存储或更新数据的唯一方式。

Refer to [Transactions](./transactions.md) for more information.

### **树图**
In the context of Conflux, the Tree-Graph is a novel consensus mechanism that allows for high throughput and low latency in large-scale decentralized networks. Unlike traditional blockchain systems that follow a linear chain, Conflux forms a tree-like structure of blocks, allowing for multiple blocks to be produced concurrently. This structure is key to Conflux's ability to process a high number of transactions per second.

Refer to [Tree-Graph](../conflux-basics/consensus-mechanisms/proof-of-work/tree-graph.md) for more information.


### **钱包**
In the context of blockchain, a wallet is a digital place to store cryptocurrency. It can be in the form of a software (online or offline) or hardware device. In the Conflux Network, users can use wallets like Fluent to manage their CFX and interact with the network.

Refer to [Wallets](../tutorials/wallets/wallets.mdx) for more information about supported wallets.
