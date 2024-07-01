---
sidebar_position: 7
title: 空间（Spaces）
displayed_sidebar: generalSidebar
---

## **Spaces介绍**

在Conflux v2.0（Hydra）升级中，通过**[CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md)**引入了一种名为“Spaces”的新特性。 Spaces是一个抽象概念，用于区分Conflux格式的交易和以太坊格式的交易。 Spaces是一种在原始Conflux网络上虚拟创建子链的方式，称为**`eSpace`**。

Core Space指的是原始Conflux网络，而eSpace指的是在Core Space网络之上运行的虚拟化以太坊链。 两个空间在逻辑上是相互独立的，不会相互影响。

换句话说，我们可以把空间看作是操作系统概念中的虚拟化技术，其中eSpace是一个虚拟化的以太坊链，在原始Conflux网络之上运行。

## **为什么要引入eSpace？**

Conflux是一个高性能、完全去中心化的公链，它采用了一种创新的树图共识算法。 Conflux的交易费用非常低，相比于其他网络如以太坊，可以看作是几乎免费的。 然而，以太坊已经建立了一个成熟的生态系统，包括工具、SDK、钱包和Solidity库。 为了降低项目和用户的迁移成本，让用户体验到Conflux低费用和高TPS的优势，eSpace被引入。

通过完全兼容的接口，以太坊的智能合约和dApps可以直接部署到eSpace，无需任何修改。 以太坊的开发工具、SDK、钱包和服务可以直接在eSpace中使用。 用户无需学习新知识，就可以使用原有的工具直接上手。

eSpace对于以太坊的开发者和用户来说非常容易使用，就像BSC、Polygon、Aurora一样。

## **两个空间之间的关系**

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

要与Conflux Core Space互动，请使用兼容Conflux的钱包（如Fluent）、SDK（*-conflux-SDK）和开发工具（如chainIDE、hardhat）。 To interact with eSpace directly, use the existing tools and products from the Ethereum ecosystem, such as Metamask, Hardhat, Ethers.js, etc. (by simply setting the RPC network of the tool to **[Conflux eSpace RPC](../../espace/network-endpoints.md)**).

## **如何在Space之间通信**

要在Conflux Core Space和eSpace之间进行通信，可以使用[CrossSpaceCall](../../core/core-space-basics/internal-contracts/crossSpaceCall.md)合约来在Core Space和eSpace之间转移CFX、部署合约，以及在Core Space中调用eSpace合约方法。 Core Space中的每个账户在eSpace中都有一个对应的[镜像地址](../../espace/build/accounts.md#mapped-addresses-in-cross-space-operations)，该地址通过解码原始Base32地址并使用Keccak哈希计算得出。 内置合约提供了CFX的**同步**跨Space转移，使其简单、安全、快捷。 内置的事件系统和链上消息传递也可以用于Space间的通信。

## **如何选择**

Conflux Core Space是一个原生空间，支持[合约代付](../../core/core-space-basics/internal-contracts/sponsor-whitelist-control.md)，并且拥有更多的网络容量（或者说更高的TPS）。 然而，它的[地址格式](../../core/core-space-basics/addresses.md)和[RPC](../../core/build/json-rpc/cfx-namespace.md)与以太坊不同，因此开发者需要采用Conflux特定的[工具链](../../core/build/sdks-and-tools/sdks.md)来开发。 因此，如果你想开发一个全新的项目，可以选择Core Space。 合约赞助机制使项目用户无需余额即可与合约互动，有助于降低区块链使用门槛，扩大用户基础。 此外，这一特性允许开发者在数字货币被严格监控的国家或地区遵守法规，开发公链应用。

如果你想部署一个以太坊项目，以利用Conflux的高性能和低成本来降低用户成本，你可以选择eSpace。 项目可以直接部署，无需任何修改。 If you are a skilled Ethereum engineer, you can also choose eSpace directly and use the tools and SDKs that you are familiar with to get started quickly.

## Reference

- [CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md).
- [Espace RPC Compatibility](../../espace/build/jsonrpc-compatibility.md).
- [Espace EVM Compatibility](../../espace/build/evm-compatibility.md).
