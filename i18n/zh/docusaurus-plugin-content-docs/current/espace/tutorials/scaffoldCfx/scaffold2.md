---
sidebar_position: 4
title: Mint NFTs on Conflux
description: Make NFTS using Conflux Scaffold
keywords:
  - Hardhat
  - 智能合约
  - Scaffold
  - NFT
  - ERC721
  - IPFS
displayed_sidebar: eSpaceSidebar
tags:
  - Conflux eSpace
  - Scaffold-ETH-2
  - NFT
  - ERC721
  - 智能合约
  - Hardhat
  - React
  - 前端开发
  - Solidity
  - JavaScript
  - TypeScript
  - Yarn
  - Git
  - 部署
  - Vercel
  - Contract Interaction
  - 区块链
  - Web3 Development
  - dApp
  - EVM兼容性
  - NextJS
  - Environment Variables
  - 合约验证
  - Wallet Integration
  - 视频教程
  - GitHub Repository
  - Component Library
  - Hooks
  - 网络配置
  - IPFS
  - OpenZeppelin
  - Metadata
  - Token URI
  - Minting
  - Token Transfer
  - Event Logging
---

[Scaffold Conflux NFT Example](https://github.com/conflux-fans/conflux-scaffold-nft-example) is an adaptation of Scaffold-ETH-2 (https://scaffoldeth.io/) whereby we have adjusted the template to allow you to deploy a ERC721 contract on Conflux eSpace and leverage the components, integration of hardhat, and the quick deployment of Scaffold-ETH-2.

In this tutorial, we go more in-depth of how the solidity contract is used and interact with the ERC721 contract to mint NFTs on Conflux eSpace that can be transfered to other wallets.

## Video Conflux

Watch this [video](https://youtu.be/sj2ph_ctQUg) for full tutorial on how to create an app from scratch and deploy it live on Conflux eSpace.

## 克隆 Scaffold Conflux

在您的 visual studio 终端中，运行以下命令克隆仓库并安装依赖。

```bash
git clone git@github.com:conflux-fans/conflux-scaffold-nft-example.git
yarn install
```

In the folder directory of `conflux-scaffold-nft-example` you will have a similar folder structure as the typical conflux scaffold repo. However, the hardhat folder includes a new contract called "ConfluxNFT.sol" which imports a bunch of openzepplin contracts.

The [openzepplin wizard](https://wizard.openzeppelin.com/#erc721) is a useful site to put together contract code for a NFT but it is best to review the libraries from node_modules within the hardhat folder and review the functions used in the solidity contract. Once you have have compiled and deployed the contract, review the debugger section in the frontend to see if the contract is constructed to your purposes.

```bash
yarn chain
```

Once the hardhat chain is set up, open up a new terminal. 您可以测试您的智能合约然后部署它

```bash
yarn deploy
```

部署时有几个相关的文件。

- One is the deployment script in /conflux-scaffold-nft-example/packages/hardhat/deploy
- 另一个是关于您部署在哪些网络的配置。 /conflux-scaffold-nft-example/packages/hardhat/hardhat.config.ts
- 默认部署网络是 hardhat，但您可以通过以下方式更改为 Conflux eSpace 或 Conflux 测试网

```bash
yarn deploy --network confluxESpace
```

```bash
yarn deploy --network confluxESpaceTestnet
```

To verify the contract on the Conflux testnet, simply run the following command with the Contract Address. If there were any constructors, you will need to pass them in as well after the contract address.

```sh
npx hardhat verify --network confluxESpaceTestnet [Contract Address] 
```

The added instructions onto hardhat are in the packages/hardhat/hardhat.config.ts file where etherscan is adjusted to include the the block explorer url.

:::note
合约的部署者及所有者可以通过将 `./packages/hardhat/.env.example` 重命名为 `./packages/hardhat/.env` ，并在 DEPLOYER_PRIVATE_KEY= 中放入您的私钥来更改。 然而，默认使用一个默认的“公开”私钥用于 hardhat 测试目的。
:::

一旦您部署了合约，您可以启动您的前端来查看它是如何与合约进行交互的。 您应该能看到类似于以下的界面。 合约调试页面类似于其他网页端部署应用，如 Remix。

![Front-end](../img/Home.png)

## 前端

Once you have your front-end up and running, go ahead and try minting a NFT. You should be able to see the following being minted on the front-end.

![Minting NFT](../img/NFTExample.png)

The fun begins on navigating through your front-end and seeing how it all interacts with the contract.

- Navigate to conflux-scaffold-nft-example/packages/nextjs/app/myNFTs/page.tsx

You will see that the interaction with the contract is similar to Conflux Scaffold in the sense that functions that require gas and writing into the contract use writeContractAsync. The function to be used is specified "mintItem" and the arguments required in the contract are the address the NFT is to be minted to and the URI of the NFT (which is the IPFS url that contains the metadata of the NFT).

![Setting up Contract Instance for Reading or Writing into Contract Address](../img/ReadWrite.png)
![Writing into Contract](../img/MintFunction.png)

The actual metadata of the NFT to be uploaded to IPFS is contained in conflux-scaffold-nft-example/packages/nextjs/utils/simpleNFT/nftsMetadata.json

For each token that is minted, the token counter inside the smart contract is incremented by 1 and the tokenURI looks into this json file to find the metadata of the NFT that will add to IPFS and to the smart contract. The repo provides a default IPFS that one can use for testing purposes to post metadata that can be used for minting NFTs.

Other examples where Conflux Scaffold is used (and would need to be modified for any revised Contract Names) can be found in the following frontend pages.

- packages/nextjs/app/myNFTs/page.tsx
- packages/nextjs/app/myNFTs/_components/MyHoldings.tsx
- packages/nextjs/app/myNFTs/_components/NFTCard.tsx
- packages/nextjs/app/transfers/page.tsx

In each of these pages, the contract instance is set up to either read or write into the contract similar to the mint function, with the exception being the transfers page which uses events to create the logs of the transactions that take place.

## 在 Vercel 上部署应用

就是这样！ 一旦您已经准备好智能合约和前端，您就可以开始部署您的应用了。 Ensure in the front end that /packages/nextjs/scaffold.config.ts the chains.hardhat is removed if you no longer are using hardhat for testing purposes and would like to interact with contracts deployed on Conflux eSpace or Conflux Testnet.

```bash
yarn vercel
```

按照 vercel 上的指示进行部署。

If you have any questions, please refer to the video for full tutorial [video](https://youtu.be/sj2ph_ctQUg).
