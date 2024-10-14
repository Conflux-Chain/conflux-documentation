---
sidebar_position: 7
title: Spaces
displayed_sidebar: generalSidebar
tags: 
- Conflux Network
- Spaces
- Core Space
- eSpace
- CIP-90
- Hydra upgrade
- Ethereum compatibility
- virtual chain
- transaction encoding
- cross-space calls
- CFX transfer
---
## **Introduction to Spaces**

In the Conflux v2.0 (Hydra) upgrade, a new feature called Spaces was introduced through **[CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md)**. Spaces is an abstract concept that is used to distinguish Conflux-format transactions from Ethereum-format transactions. Spaces is a way to virtually create a sub-chain of the original Conflux network, known as **`eSpace`**.

Core Space refers to the original Conflux network, while eSpace is the virtualized Ethereum chain running on top of the Core Space network. The two spaces are logically independent of each other and do not affect each other.

In other words, we can think of Spaces as a virtualization technology from operating system concepts, where eSpace is a virtualized Ethereum chain running on the original Conflux network.

## **Why Introduce eSpace?**

Conflux is a high-performance, fully decentralized public chain enabled by an innovative Tree-Graph consensus algorithm. The transaction fee of Conflux is very low, which can be seen as almost free compared to other networks such as Ethereum. However, Ethereum has already built a mature ecosystem, including tools, SDKs, wallets, and Solidity libraries. To reduce the migration cost of projects and users and make users experience the advantages of low fees and high TPS of Conflux, eSpace was introduced.

Through the fully compatible interface, smart contracts, and dApps of Ethereum can be directly deployed to eSpace without any modification. Development tools, SDKs, wallets, and services of Ethereum can be directly used in eSpace. Users do not need to learn new knowledge but can use the original tools to get started directly.

eSpace is very easy to use for Ethereum developers and users, just like BSC, Polygon, Aurora.

## **The Relationship Between the Two Spaces**

Core Space and eSpace share the same ledger for underlying data storage. A single block can contain transactions from both spaces, which are distinguished by their transaction encoding. However, they function as two logically independent spaces, each with its own transactions, account statuses, and contracts.

From a dApp developer's perspective, Core Space and eSpace can be seen as two separate chains with an internal bridge that allows for specific atomic calls. Transactions in each space only affect the account status within that particular space unless cross-space calls are made.

### eSpace Transaction Packing

In Conflux, eSpace transactions are only included in blocks if the block height is a multiple of 5. Since the [v2.4 hardfork](../hardforks/v2.4.md), including eSpace transactions does not affect the packing of Core Space transactions. As a result, the maximum block size can be larger at block heights that are multiples of 5 compared to those that are not.

### Graph Illustration

![spaces view from hardfork v2.4](./img/space.drawio.svg)

The graph above illustrates the relationship between the actual blocks in the ledger and the views from cSpace and eSpace. The text `H=..` indicates the block height.

#### Actual Blocks

In the Conflux ledger, blocks are organized as a Directed Acyclic Graph (DAG) and divided into epochs. For blocks whose height is a multiple of 5, eSpace transactions can be included, utilizing the isolated block space.

The parameter `block.gasLimit` represents the **expected** block size for overall Conflux blocks and is set to 60,000,000. This value can be retrieved using the [cfx_getBlockByHash](../../core/build/json-rpc/cfx-namespace.md) or similar RPC methods. The `cSpace.gasLimit` is set to 90% of `block.gasLimit` (54,000,000), while the `eSpace.gasLimit` is 50% of `block.gasLimit` (30,000,000).

Consequently, for blocks whose height is a multiple of 5, their size can reach up to `1.4 * block.gasLimit`, while for those that are not, their maximum size is `0.9 * block.gasLimit`.

:::note

Miners can adjust the block gas limit by 1% higher or lower for each block, but it is typically set to a constant value.

:::

#### cSpace View

From the Core perspective, the view is nearly the same as the actual block structure, except for the eSpace transactions. Blocks are organized as a DAG and divided into epochs, with each block having the same gas limit.

#### eSpace View

The eSpace view differs significantly from the actual block structure as it simulates the Ethereum ledger structure. Each Conflux epoch is mapped into an eSpace block. From the eSpace perspective, transactions in the epoch are included in the corresponding block. This means the maximum size of the block from the eSpace view is not fixed; it can be zero or more than twice the `eSpace.gasLimit`, depending on the blocks included in the original epoch.

In the **eSpace view** shown in the graph, empty blocks are present at heights 99, 101, 103, and 104. At heights 100 and 105, the blocks are of size equal to the `eSpace.gasLimit`. At height 102, the block size is `2 * eSpace.gasLimit`.

## Development

To interact with Core Space, use Conflux-compatible wallet (Fluent), SDK (*-conflux-SDK), and development tools (chainIDE, hardhat). To interact with eSpace directly, use the existing tools and products from the Ethereum ecosystem, such as Metamask, Hardhat, Ethers.js, etc. (by simply setting the RPC network of the tool to **[Conflux eSpace RPC](../../espace/network-endpoints.md)**).

## **How to Communicate Between Spaces**

To communicate between Conflux Core Space and eSpace, the [CrossSpaceCall](../../core/core-space-basics/internal-contracts/crossSpaceCall.md) contract can be used to transfer CFX and deploy contracts from Core Space to eSpace, as well as call eSpace contract methods in Core Space. Each account in Core Space has a corresponding [mirror address](../../espace/build/accounts.md#mapped-addresses-in-cross-space-operations) in eSpace, calculated by decoding the original Base32 address and hashing it with Keccak. The internal contract provides **synchronous** cross-space transfers of CFX, making it simple, safe, and fast. The built-in event system and On-chain Message Passing can also be used for communication between spaces.

## **Which To Choose**

Conflux Core Space is a native space that supports [contract sponsorship](../../core/core-space-basics/internal-contracts/sponsor-whitelist-control.md) and has more network capacity (higher TPS). However, its [address format](../../core/core-space-basics/addresses.md) and [RPC](../../core/build/json-rpc/cfx-namespace.md) is different from Ethereum, so developers is expected to adopt Conflux-specific [toolchains](../../core/build/sdks-and-tools/sdks.md) to develop. Therefore, if you want to develop a brand new project, you can choose the Core Space. The contract sponsorship mechanism makes it possible for project users to interact with the contract without a balance, helping to lower the threshold of blockchain usage and expand the user base. Moreover, this feature allows developers to develop public chain applications in compliance with regulations in countries or regions where digital currencies are strictly monitored.

If you want to deploy an Ethereum project to take advantage of Conflux's high performance and low cost in order to reduce user costs, you can choose eSpace. The project can be deployed directly without any modification. If you are a skilled Ethereum engineer, you can also choose eSpace directly and use the tools and SDKs that you are familiar with to get started quickly.

## Reference

- [CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md).
- [Espace RPC Compatibility](../../espace/build/jsonrpc-compatibility.md).
- [Espace EVM Compatibility](../../espace/build/evm-compatibility.md).
