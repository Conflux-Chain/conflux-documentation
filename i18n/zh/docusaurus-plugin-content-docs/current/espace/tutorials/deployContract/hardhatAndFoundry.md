---
sidebar_position: 1
title: Hardhat 和 Foundry
description: 使用 Hardhat 和 Foundry 部署智能合约
displayed_sidebar: eSpaceSidebar
---

import { DiscordLink } from "../../../templates/links.tsx"

eSpace 测试网允许任何人在 eSpace 上部署智能合约。 在本教程中，您将学习使用针对以太坊的常用开发工具在 eSpace 测试网上部署合约。 在这个 [GitHub 仓库](https://github.com/conflux-fans/espace-contract-guide) 中展示了使用 [Hardhat](https://hardhat.org/) 和 [Foundry](https://github.com/foundry-rs/foundry)部署合约的过程。

在开始部署合约之前，您需要先从[ eSpace 水龙头](https://efaucet.confluxnetwork.org/)获取测试代币。

## 使用 Hardhat 部署智能合约

1. 如果您尚未安装，请先安装 [nodejs](https://nodejs.org/en/download/) 和 [yarn](https://classic.yarnpkg.com/lang/en/docs/install)。

2. 克隆仓库并安装依赖项：

   ```shell
   git clone https://github.com/conflux-fans/espace-contract-guide
   cd espace-contract-guide
   yarn install
   ```

3. 按照根目录中的 `.env.example` 示例创建一个 `.env` 文件。 将 `.env` 中的 `PRIVATE_KEY` 更改为您自己账户的私钥。

4. 运行 `yarn compile` 来编译合约。

5. 运行 `yarn deploy:eSpaceTestnet` 在 eSpace 测试网上部署合约。

6. 运行 `yarn test` 进行 hardhat 测试。

### 视频教程

以下视频展示了如何使用 Hardhat 部署智能合约：

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="overview" label="Hardhat Overview">
<iframe width="560" height="315" src="https://www.youtube.com/embed/p0Bzc2Y_0Kc?si=sfchFwTtSHlHyK4w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</TabItem>

<TabItem value="tutorial" label="Hardhat Tutorial">
<iframe width="560" height="315" src="https://www.youtube.com/embed/SBzhyV3TSGg?si=HXxu0XdHAsNNJPkf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</TabItem>

</Tabs>

## 使用 Foundry 部署智能合约

1. 克隆仓库：

   ```shell
   git clone https://github.com/conflux-fans/espace-contract-guide
   cd espace-contract-guide
   ```

2. 安装 Foundry：

   ```shell
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   ```

3. 运行 `forge build` 来构建项目。

4. 使用 Foundry 部署您的合约：

   ```bash
   forge create --rpc-url https://evmtestnet.confluxrpc.com \
     --value <lock_amount> \
     --constructor-args <unlock_time> \
     --private-key <your_private_key> \
     --legacy \
     contracts/Lock.sol:Lock
   ```

   - `<lock_amount> ` 是需要锁定在合约中的测试 CFX 数量。 尝试将其设置为一些小数额，比如 `0.0000001ether`。&#x20
   - `<unlock_time>` 是锁定在合约中的资金可供提取的 Unix 时间戳。 尝试将其设置为未来的某个 Unix 时间戳，比如 `1730390400`（这个 Unix 时间戳对应于 2024 年 10 月 1 日）。

   例如：

   ```bash
   forge create --rpc-url https://evmtestnet.confluxrpc.com \
     --value 0.00000000002ether \
     --constructor-args 1696118400 \
     --private-key 0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1 \
     --legacy contracts/Lock.sol:Lock
   ```

## 常见问题解答

### Invalid parameters: tx

在部署合约时，您可能会遇到像 `Invalid parameters: tx` 这样的错误消息。 请确保您的部署账户有足够的测试代币来部署合约。 您可以从 [eSpace 水龙头](https://efaucet.confluxnetwork.org/) 请求测试代币。
更多可能的原因，请参考 [发送交易错误](/docs/core/core-space-basics/transactions/send-tx-error) 和 [sendRawTransaction RPC方法错误](/docs/core/build/json-rpc/rpc-behaviour/cfx_sendTransaction-errors.md) 的信息

## 反馈

感谢您参与并在 eSpace 测试网上进行开发！ 如果您遇到任何问题,请加入我们的 <DiscordLink>Discord</DiscordLink> 并在其中向我们提问。
