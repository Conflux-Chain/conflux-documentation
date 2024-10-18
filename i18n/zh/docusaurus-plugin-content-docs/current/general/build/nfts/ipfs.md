---
id: ipfs
title: IPFS 概览
sidebar_position: 1
keywords:
  - conflux
  - ipfs
  - nft storage
  - decentralized storage
  - content addressing
  - distributed file system
  - blockchain
tags:
  - IPFS
  - NFT
displayed_sidebar: generalSidebar
---

## IPFS简介

IPFS（InterPlanetary File System，星际文件系统）是一个点对点的分布式文件系统，允许用户在去中心化的网络中存储和访问文件。 IPFS提供了一种安全、可扩展、容错的方式来存储和分享文件，使其成为NFT存储的理想选择。

## IPFS如何工作？

IPFS使用内容寻址系统，这意味着文件是通过它们的内容来识别的，而不是通过它们的位置。 当一个文件被添加到IPFS时，它被分解成称为块的小片段，每个块都被赋予一个代表其内容的唯一哈希值。 这些块然后存储在网络中的不同节点上，文件可以通过请求任何拥有这些块副本的节点来检索。

## 如何使用IPFS

要使用IPFS，您需要下载并安装一个IPFS客户端，如IPFS Desktop或IPFS Companion。 一旦您安装了客户端，您可以使用命令行界面或使用基于web的界面将文件添加到IPFS。 当您将文件添加到IPFS时，您将收到一个代表文件的内容寻址哈希值，您可以使用此哈希值从网络中的任何节点检索文件。

## IPFS的优点和缺点

使用IPFS进行NFT存储的一些优点包括：

- 去中心化：文件存储在一个分布式网络上，使它们能够抵抗审查和数据丢失。
- 内容寻址：文件是通过它们的内容来识别的，这确保了它们的真实性和不可变性。
- 速度：IPFS可以通过将文件缓存到离用户更近的位置来提供更快的文件检索时间。
- 可扩展性：IPFS可以处理大量的数据，并可以扩展以满足增长的需求。

使用IPFS进行NFT存储的一些缺点包括：

- 复杂性：IPFS可能很复杂，特别是对于非技术用户。
- 集中化：虽然IPFS被设计为一个去中心化的网络，但仍然存在一些集中化的风险，如依赖于网关提供商和种子节点。
- 安全性：IPFS不提供内置的加密或访问控制，这可能使其容易受到攻击或未经授权的访问。

为了降低使用IPFS的复杂性，许多项目使用像Pinata这样的工具，可以很容易地上传和管理IPFS中的文件。

## 其他资源:

- [https://docs.ipfs.tech/](https://docs.ipfs.tech/)
- [https://www.freecodecamp.org/news/technical-guide-to-ipfs-decentralized-storage-of-web3/](https://www.freecodecamp.org/news/technical-guide-to-ipfs-decentralized-storage-of-web3/)
- [https://decrypt.co/resources/how-to-use-ipfs-the-backbone-of-web3](https://decrypt.co/resources/how-to-use-ipfs-the-backbone-of-web3)
