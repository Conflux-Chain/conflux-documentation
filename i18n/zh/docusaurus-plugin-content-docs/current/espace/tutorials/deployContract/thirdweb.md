---
sidebar_position: 3
title: thirdweb
description: 使用 thirdweb 部署合约
displayed_sidebar: eSpaceSidebar
keywords:
  - Conflux eSpace
  - thirdweb
  - 智能合约
  - 部署
  - 教程
  - CLI
  - ERC20
  - ERC721
  - ERC1155
  - Solidity
  - IPFS
  - 非同质化代币（NFTs）
  - Tokens
  - Marketplace
  - EVM兼容性
  - Contract Compilation
  - 合约验证
  - Hardhat
  - Foundry
  - Dashboard Interface
  - 视频教程
  - Prebuilt Contracts
  - Contract Extensions
  - Royalties
tags:
  - thirdwebm Tutorial
---

## Create Contract

想使用 thirdweb 命令行创建新的智能合约，请按照以下步骤操作：

1. 在您的命令行界面运行以下命令：

   ```bash
   npx thirdweb create contract
   ```

2. 根据命令行提示输入您的选择：
   1. 给您的项目命名
   2. 选择您偏好的框架：Hardhat 或 Foundry
   3. 命名您的智能合约
   4. 选择基础合约类型：空、[ERC20](https://portal.thirdweb.com/solidity/base-contracts/erc20base)、 [ERC721](https://portal.thirdweb.com/solidity/base-contracts/erc721base)、 或者 [ERC1155](https://portal.thirdweb.com/solidity/base-contracts/erc1155base)
   5. 添加所需的[扩展](https://portal.thirdweb.com/solidity/extensions)

3. 创建完成后，将跳转到您项目的目录，并在您偏好的代码编辑器中打开。

4. 如果您打开 `contracts` 文件夹，您将在这找到您的智能合约；这是您用 Solidity 编写的智能合约。

   以下是没有指定扩展的 ERC721Base 合约的代码。 它实现了 [`ERC721Base.sol`](https://github.com/thirdweb-dev/contracts/blob/main/contracts/base/ERC721Base.sol) 合约内的所有逻辑；该合约实现了 [`ERC721A`](https://github.com/thirdweb-dev/contracts/blob/main/contracts/eip/ERC721A.sol) 标准。

   ```solidity
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@thirdweb-dev/contracts/base/ERC721Base.sol";

   contract Contract is ERC721Base {
       constructor(
           string memory _name,
           string memory _symbol,
           address _royaltyRecipient,
           uint128 _royaltyBps
       ) ERC721Base(_name, _symbol, _royaltyRecipient, _royaltyBps) {}
   }
   ```

   这个合约通过以下步骤继承了 ERC721Base 的功能：

   - 导入 ERC721Base 合约
   - 通过声明我们的合约是一个 ERC721Base 合约来继承合约
   - 实现所需的方法，如构造函数。

5. 在使用所需的自定义逻辑修改完您的合约之后，可以使用 [Deploy](https://portal.thirdweb.com/deploy) 将其部署到 Conflux。

---

或者您可以从 thirdweb Explore 页面直接部署预构建的合约，可以用于 NFT、代币或市场：

1. 访问 thirdweb Explore 页面：https://thirdweb.com/explore

   ![thirdweb Explore page](/img/thirdweb-explore.png)

2. 从可用选项中选择您想要部署的合约类型：NFT、代币、市场等。

3. 按照屏幕上的提示配置并部署您的合约。

> 想要了解 Explore 上不同合约的更多信息，请查看 [thirdweb 文档](https://portal.thirdweb.com/pre-built-contracts)。

## 部署合约

Deploy 让您无需配置 RPC URL、暴露私钥、编写脚本以及其他额外设置（如验证合约）就可以将智能合约部署到任何 EVM 兼容网络。

1. 想要使用 deploy 部署您的智能合约，请导航至您项目的根目录并执行以下命令：

   ```bash
   npx thirdweb deploy
   ```

   执行这个命令后将触发以下操作：

   - 编译当前目录中的所有合约。
   - 提供了你可以选择部署哪些合约的选项。
   - 将合约源代码（ABI）上传到 IPFS。

2. 完成后，它将打开仪表板界面以填写参数。
   - `_name`：合约名称
   - `_symbol`：符号或 "ticker"
   - `_royaltyRecipient`：接收二次销售版税的钱包地址
   - `_royaltyBps`：每次二次销售将给予版税接收者的基本点数 (bps)，例如 500 = 5%

3. Select `Conflux eSpace` as the network

4. 根据需要管理您合约仪表板上的额外设置，例如上传 NFT、配置权限等。

更多 Deploy 信息请参考 [thirdweb 文档](https://portal.thirdweb.com/deploy)。

如果您在过程中有任何问题或遇到任何问题，请联系 thirdweb 寻求支持 [support.thirdweb.com](http://support.thirdweb.com/)。

## 视频教程

在下面的视频中，您可以找到如何使用 thirdweb 在 Conflux eSpace 部署智能合约的实操演示：

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="youtube" label="thirdweb tutorial">
<iframe width="560" height="315" src="https://www.youtube.com/embed/Ilkj3ay0Uu4?si=CJmPLankHKlPgkAy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>
</Tabs>
