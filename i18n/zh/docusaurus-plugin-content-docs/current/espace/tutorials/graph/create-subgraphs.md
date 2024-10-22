---
sidebar_position: 2
title: 创建子图
displayed_sidebar: eSpaceSidebar
keywords:
  - The Graph
  - Subgraphs
  - GraphQL
  - Graph CLI
  - Subgraph Manifest
  - Schema Definition
  - AssemblyScript
  - 智能合约
  - Data Indexing
  - Blockchain Data
  - Subgraph Studio
  - 以太坊
  - ABI
  - Event Handling
  - Entity Creation
  - Data Sources
  - Subgraph Deployment
tags:
  - The Graph
  - Subgraphs
---


Subgraph是一种从区块链中提取数据，处理数据并存储数据的技术，可以通过GraphQL进行查询。

Subgraph的定义包含了几个文件：

- `subgraph.yaml`：一个包含subgraph清单的YAML文件
- `schema.graphql`：一个GraphQL模式，定义了你的subgraph存储的数据，以及如何通过GraphQL查询它
- `AssemblyScript Mappings`： [AssemblyScript](https://github.com/AssemblyScript/assemblyscript) 代码，将事件数据转换为你的模式中定义的实体（例如本教程中的` mapping.ts` ）

> 为了在The Graph的去中心化网络上使用你的subgraph，你需要创建一个API密钥。 建议你给你的subgraph添加至少10,000 GRT的通证。

在你详细了解清单文件的内容之前，你需要安装 [Graph CLI](https://github.com/graphprotocol/graph-cli) ，它是你构建和部署subgraph所需要的工具。

## 安装Graph CLI

Graph CLI是用JavaScript编写的，你需要安装 `yarn`或 `npm`来使用它；在接下来的内容中，我们假设你已经安装了yarn。

一旦你安装了 `yarn`，就可以通过运行以下命令来安装Graph CLI：

**使用yarn安装：**

`yarn global add @graphprotocol/graph-cli`

**使用npm安装：**

`npm install -g @graphprotocol/graph-cli`

安装完成后，`graph init` 命令可以用来设置一个新的subgraph项目，可以从一个现有的合约或一个示例subgraph开始。 这个命令可以用来在Subgraph Studio上创建一个subgraph，只需传入 `graph init --product subgraph-studio`。 如果你已经将智能合约部署到你喜欢的网络上，那么从该合约引导一个新的subgraph可以是一个很好的开始方式。

## 从现有的合约开始

以下命令创建了一个子图，用于索引现有合约的所有事件。 它尝试从 Etherscan 获取合约 ABI，如果失败则请求本地文件路径。 如果任何可选参数缺失，则会引导您通过交互式表单进行设置。

```
graph init \
  --product subgraph-studio
  --from-contract <CONTRACT_ADDRESS> \
  [--network <ETHEREUM_NETWORK>] \
  [--abi <FILE>] \
  <SUBGRAPH_SLUG> [<DIRECTORY>]
```

`<SUBGRAPH_SLUG>` 是 Subgraph Studio 中您的子图的 ID，在Subgraph详细信息页面可以找到。

## 从示例 Subgraph 开始

第二种模式`graph init`支持从示例 subgraph 创建新项目。 使用以下命令来执行此操作：

```
graph init --studio <SUBGRAPH_SLUG>
```

该示例子图基于Dani Grant的Gravity合约，该合约管理用户头像并在创建或更新头像时发出 `NewGravatar` 或 `UpdateGravatar` 事件。 该子图通过将`Gravatar`实体写入图节点存储来处理这些事件，并根据事件确保这些实体被更新。 以下章节将介绍构成此示例子图的文件。

## 在现有的 Subgraph 中添加新的数据源

自从`v0.31.0`，`graph-cli`支持通过`graph add`命令将新的数据源添加到现有的子图中。

```
graph add <address> [<subgraph-manifest default: "./subgraph.yaml">]

Options:

      --abi <path>              Path to the contract ABI (default: download from Etherscan)
      --contract-name           Name of the contract (default: Contract)
      --merge-entities          Whether to merge entities with the same name (default: false)
      --network-file <path>     Networks config file path (default: "./networks.json")
```

`add`命令将从Etherscan获取ABI（除非使用`--abi`选项指定ABI路径），并以与`graph init`命令创建`dataSource``--from-contract`相同的方式创建新的`dataSource`，并相应地更新架构和映射。

`--merge-entities` 选项指定了开发者希望如何处理实体和事件名称冲突：

- 如果设置为`true`：新的`dataSource`应该使用现有的`eventHandlers`和`entities`。
- 如果设置为`false`，将创建一个新的实体和事件处理程序，其名称将为`${dataSourceName}{EventName}`。

合约的 address 将会被写入到相应网络的 networks.json 文件中。

> 注意：使用交互式命令行界面时，在成功运行graph init之后，您将被提示添加新的数据源。
