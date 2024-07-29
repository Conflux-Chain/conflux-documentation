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
在 Conflux 网络中，地址是[账户](#account)的标识符。 它是一串独特的字符，代表着区块链上的账户。 不同 Conflux [空间](./spaces.md)中的地址格式可能会有所不同。 espace 地址和 Core Space 有着不同的格式。

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

### **Blockchain Explorer**

A blockchain explorer is a tool or website that allows individuals to search and analyze the real-time and historical data of a blockchain. It functions like a search engine for blockchain transactions, blocks, and addresses. Users can view detailed information about individual transactions, including the amount transferred, the addresses involved, transaction fees, and the block in which the transaction was recorded. Blockchain explorers are essential for verifying transactions, understanding blockchain activity, and conducting audits, making them invaluable resources for users, developers, and analysts interested in the specifics of blockchain operations.

The official blockchain explorer for Conflux is [ConfluxScan](#confluxscan).

### **CFX**
CFX是Conflux网络的原生货币。 它用于激励维护Conflux网络，并向用户收取资源消耗费用。 CFX作为共识机制的奖励、每笔交易的交易费以及DAO投票的工具，在系统稳定性方面发挥着非常重要的作用。

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
`chainId`是一个数字，表示一笔交易打算在哪里执行。 它用于防止交易重放攻击。 Conflux 的 chainId 是一个常数，目前为：

- Conflux Core 主网: `1029`
- Conflux Core 测试网: `1`
- Conflux eSpace 主网: `1030`
- Conflux eSpace 测试网: `71`

`networkId`用于在网络层区分不同的区块链。 目前Conflux主网/测试网的`networkId`与`chainId`相同。 你可以从`cfx_getStatus` RPC方法中获取这两个值。

### **Conflux生态系统**
Conflux生态系统指的是在Conflux网络上构建或集成的各种项目、应用、平台和服务。 这包括去中心化应用（DApps）、去中心化金融（DeFi）平台、钱包服务等。 Conflux生态系统是一个充满活力且不断增长的开发者、用户和组织社区，他们为Conflux网络做出贡献。

### **ConfluxScan**
ConfluxScan is the official blockchain explorer for the Conflux network. 它为用户提供一个友好、详细驱动的界面，用于查看、确认和检查Conflux网络上的交易和合约。 通过Conflux Scan，用户可以追踪其交易的状态、查看账户余额、探索智能合约等等。

Links:

- 主网
  - Core Space: https://confluxscan.io or https://confluxscan.net
  - eSpace: https://evm.confluxscan.io or https://evm.confluxscan.net
- 测试网
  - Core Space: https://testnet.confluxscan.io or https://testnet.confluxscan.net
  - eSpace: https://evmtestnet.confluxscan.io or https://evmtestnet.confluxscan.net

### **共识算法**
共识算法是计算机科学中用于在分布式进程或系统中就单个数据值达成一致的过程。 在区块链中，它用于就交易的（总体）顺序达成一致。 Conflux使用基于树图（Tree-Graph）结构的独特共识算法，该算法允许在大规模去中心化网络中实现高吞吐量和低延迟。

### **DAG（有向无环图）**
在Conflux里，DAG用于表示Conflux网络的区块结构。 与遵循线性链的传统区块链系统不同，Conflux形成了区块的DAG结构，允许同时产生多个区块。 这种结构是Conflux实现高吞吐量和低延迟的关键。

### **去中心化应用（DApp）**
去中心化应用（DApp）是一种运行在分布式计算系统（如区块链）上的计算机应用。 与在中心化服务器上运行的传统应用不同，DApps利用区块链的点对点网络的力量提供透明度、不可更改性和抗审查性。 DApp的典型框架包括2层：前端或用户界面，以及作为后端逻辑在区块链上运行的智能合约。 前端使用标准语言（如HTML、CSS和JavaScript）开发，通过智能合约与区块链交互。 These smart contracts, written in languages like Solidity, define the rules and logic of the DApp, and are stored and executed on the blockchain, ensuring consistent and trustless operation.

### **Decentralized Finance (DeFi)**
Decentralized finance (DeFi) uses blockchain smart contracts to eliminate third parties and centralized institutions like banks from financial transactions. This allows for a range of financial services, such as lending, borrowing, and trading, to be conducted transparently and efficiently without intermediaries.

### **Digital Signature**
A digital signature is a mathematical scheme used to verify the authenticity and integrity of digital messages or documents. It employs asymmetric cryptography, using a private key for signing and a public key for verification. Digital signatures ensure that a document was signed by the known sender and has not been altered, providing security, authenticity, and non-repudiation. Commonly used in software distribution, financial transactions, and contract management, digital signatures are more secure than traditional handwritten signatures and can include features like timestamps for added security.

### **双花**
Double spending is a potential flaw in a digital cash scheme in which a single digital token can be spent more than once. This is possible because a digital token consists of a digital file that can be duplicated or falsified. The Conflux network, like other blockchain networks, uses a consensus mechanism to prevent double spending.

### **纪元（Epoch）**

In Conflux, an epoch is a fundamental unit used to update the world state, setting it apart from blockchain like Bitcoin or Ethereum, where updates are done by block. An epoch in Conflux is a specific partitioning of blocks that determines their total order. This partitioning is based on the pivot chain in a Tree-Graph structure, and the pivot block will be the last block in each epoch. Once the pivot chain is determined and not reverted, the partition of epochs becomes immutable, meaning the order of transactions and execution results cannot be changed.

### **ERC20**
ERC20是以太坊区块链上代币的标准。 它规定了代币合约必须实现的一组函数和事件。 这是以太坊网络上的标准，但Conflux网络上的代币也可以遵循这个标准，特别是通过[Zero Gravity protocol](../tutorials/transferring-funds/across-chains/zero-gravity.md)从以太坊网络转移过来的代币。

### **ERC721**
ERC721是以太坊区块链上非同质化代币（NFT）的标准。 与彼此相同的ERC20代币不同，每个ERC721代币都是独一无二的。 这使它们适合代表独特物品或资产的所有权。 像ERC20一样，ERC721代币也可以存在于Conflux网络上，尤其当它们是从以太坊网络转移过来的。

### **ERC1155**
ERC1155 is an Ethereum token standard that supports multiple token types, including fungible and non-fungible tokens, within a single contract. By enabling batch transfers, it efficiently reduces transaction costs. ERC1155 tokens can also exist on the Conflux network, enhancing flexibility and interoperability for digital assets in gaming, art, and beyond.

### **EVM (Ethereum Virtual Machine)**
The Ethereum Virtual Machine (EVM) is a powerful, sandboxed virtual stack embedded within each full Ethereum node, responsible for executing contract bytecode. Contracts are written in high-level languages, like Solidity, then compiled into bytecode, which the EVM can read and execute. The EVM ensures that programs do not have access to each other's state, thus allowing for the safe execution of code without risking the network's security. It is pivotal for enabling the programmability and flexibility that smart contracts offer in the Ethereum ecosystem. In the context of Conflux, EVM compatibility allows developers to deploy Ethereum contracts on the Conflux network, benefiting from Conflux's scalability and efficiency while leveraging Ethereum's robust developer tooling and ecosystem.

### **Finalization**
Finalization refers to the process by which transactions and blocks on the Conflux blockchain are considered definitive and irreversible. This process is critical for the network's security, as it prevents the possibility of double-spending attacks and ensures the blockchain's integrity. In the context of Conflux, PoS chain will periodically choose and refer to a PoW block which is created several minutes ago, thus providing finalization to all blocks (transactions) before the epoch of the specified block, ensuring they cannot be altered or removed subsequently.


### **水龙头**
A service that provides free tokens or cryptocurrency to users. Faucets are often used to distribute small amounts of cryptocurrency to new users, allowing them to test transactions and interact with decentralized applications (dApps) without needing to purchase tokens. They are commonly used on testnets and for promotional purposes to increase the adoption and usage of a particular blockchain, dispensing funds in the form of free test tokens that can be used on a testnet of its corresponding blockchain.

- [Conflux Core Space Testnet Faucet](https://faucet.confluxnetwork.org/)
- [Conflux eSpace Testnet Faucet](https://efaucet.confluxnetwork.org/)

### **分叉**
在区块链系统中，分叉表示一条链的分裂或偏离，起源于一个具有共享历史的共同点，并创建两条不同的路径。 分叉可以通过软件更新有意实施，旨在引入重大变更（硬分叉）或引入向后兼容的更改（软分叉）。 然而，分叉也可以因为同时创建区块或由于网络延迟和区块传播延迟而自然发生。

此外，旨在破坏网络、执行欺诈性交易或双花攻击的恶意活动也可以强制系统分叉。 这些无意的分叉通常是短暂的，因为随后的区块添加通常会解决临时分支。 无论分叉发生的原因如何，分叉是区块链技术动态和去中心化本质的固有部分，需要强大的共识机制来管理和缓解潜在问题。

> 请参考[硬分叉](../hardforks/hardforks.md)以了解关于 Conflux 硬分叉历史的更多信息

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

Refer to [Merkle Tree](docs/general/build/smart-contracts/merkle-tree.md) for more information.

### **Mined**
A "mined" block in the Conflux Network refers to a block in which transactions have been validated and added to the blockchain after successfully being processed through mining. This status indicates that the block has passed the network's consensus mechanism, ensuring its transactions are secured and immutable within the blockchain ledger. The term differentiates such blocks from those still awaiting validation.

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


### **TWAP**
TWAP stands for “time-weighted average price”. It’s a pricing algorithm used to calculate the average price of an asset over a set period.In DeFi, a type of decentralized exchange (DEX) known as an automated market maker (AMM) can be used to generate TWAP prices that can be used in other protocols. TWAP can also refer to a trading strategy used to execute a large-volume order by breaking it into equal parts across a set period in order to minimize slippage and signaling.

### **点对点网络（P2P）**
A peer-to-peer network is one in which each computer in the network can act as a client or server for the other computers in the network, allowing shared access to files and peripherals without the need for a central server. Conflux, like other blockchain networks, operates as a peer-to-peer network, with each node communicating directly with others.

### **Pivot Chain**
The pivot chain is a selected sequence of blocks within Conflux's Tree-Graph structure, used to determine the total order of blocks and transactions. It acts as a backbone organizing and finalizing the transaction set, ensuring consistency and finality across the network. The pivot chain is chosen through an algorithm considering various factors, such as the accumulated proof-of-work (PoW), to maintain the system's security and stability.

### **权益证明（PoS）**
Proof of Stake (PoS) is a type of consensus algorithm where block creators are chosen based on the number of tokens they hold or are willing to "stake". PoS is used in the Conflux network to prevent 51% attacks and to finalize blocks.

Refer to [PoS](../conflux-basics/consensus-mechanisms/proof-of-stake/pos_overview.md) for more information.

### **工作量证明（PoW）**
Proof of Work (PoW) is a type of consensus algorithm where the first participant to solve a complex mathematical problem gets to add a new block to the blockchain. PoW is used in many blockchains, including Bitcoin and Ethereum before September 15, 2022. While Conflux uses a unique consensus mechanism based on a Tree-Graph structure, it shares similarities with PoW in terms of incentivizing participants to maintain the network.

Refer to [PoW](../conflux-basics/consensus-mechanisms/proof-of-work/proof-of-work.mdx) for more information.

### **公钥/私钥**
A public key is a cryptographic code that allows a user to receive cryptocurrencies into his or her account. The private key is used to sign transactions or digital messages and the public key is used to verify the signature. In the context of Conflux, users have a pair of public and private keys that they use to interact with the network.


### **Bytecode**
Bytecode is a numeric representation of smart contract instructions, enabling efficient interpretation by the virtual machine. It serves as an intermediate form between the source code (Such as Solidity) and the machine code executed on the blockchain.


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

详细信息请参考 [交易](./transactions.md)。

### **树图**
In the context of Conflux, the Tree-Graph is a novel consensus mechanism that allows for high throughput and low latency in large-scale decentralized networks. Unlike traditional blockchain systems that follow a linear chain, Conflux forms a tree-like structure of blocks, allowing for multiple blocks to be produced concurrently. This structure is key to Conflux's ability to process a high number of transactions per second.

Refer to [Tree-Graph](../conflux-basics/consensus-mechanisms/proof-of-work/tree-graph.md) for more information.


### **钱包**
In the context of blockchain, a wallet is a digital place to store cryptocurrency. It can be in the form of a software (online or offline) or hardware device. In the Conflux Network, users can use wallets like Fluent to manage their CFX and interact with the network.

Refer to [Wallets](../tutorials/wallets/wallets.mdx) for more information about supported wallets.
