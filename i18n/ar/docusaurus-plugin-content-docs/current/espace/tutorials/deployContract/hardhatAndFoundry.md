---
sidebar_position: 1
title: Hardhat and Foundry
description: Deploying smart contracts using Hardhat and Foundry
displayed_sidebar: eSpaceSidebar
tags:
  - Conflux eSpace
  - Smart Contracts
  - Deployment
  - Hardhat
  - Foundry
  - Tutorial
  - Testnet
  - NodeJS
  - Yarn
  - Environment Variables
  - Private Key
  - Faucet
  - Test Tokens
  - CLI
  - RPC URL
  - Unix Timestamp
  - Troubleshooting
  - Video Guides
  - GitHub Repository
  - Ethereum Compatibility
  - JavaScript
  - Solidity
  - Rust
  - Gas Fees
  - Contract Compilation
  - Testing
---

import { DiscordLink } from "../../../templates/links.tsx"

The eSpace Testnet allows anyone to deploy a smart contract on eSpace. In this tutorial, you will learn how to deploy a contract on eSpace Testnet using common tools for developing on Ethereum. This [demo repo](https://github.com/conflux-fans/espace-contract-guide) illustrates contract deployment with [Hardhat](https://hardhat.org/) and [Foundry](https://github.com/foundry-rs/foundry).

Before you start deploying the contract, **you need to request test tokens** from a [eSpace faucet](https://efaucet.confluxnetwork.org/).

## Deploying smart contracts with Hardhat

1. If you haven't already, install [nodejs](https://nodejs.org/en/download/) and [yarn](https://classic.yarnpkg.com/lang/en/docs/install).

2. Clone the repo and install dependencies:

   ```shell
   git clone https://github.com/conflux-fans/espace-contract-guide
   cd espace-contract-guide
   yarn install
   ```

3. Create a `.env` file following the example `.env.example` in the root directory. Change `PRIVATE_KEY` to your own account private key in the `.env`.

4. Run `yarn compile` to compile the contract.

5. Run `yarn deploy:eSpaceTestnet` to deploy the contract on the eSpace Testnet.

6. Run `yarn test` for hardhat tests.

### Video Guides

To learn more about smart contract deployment using Hardhat, please refer to the following videos:

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

## Deploying smart contracts with Foundry

1. Clone the repo:

   ```shell
   git clone https://github.com/conflux-fans/espace-contract-guide
   cd espace-contract-guide
   ```

2. Install Foundry:

   ```shell
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   ```

3. Run `forge build` to build the project.

4. Deploy your contract with Foundry:

   ```bash
   forge create --rpc-url https://evmtestnet.confluxrpc.com \
     --value <lock_amount> \
     --constructor-args <unlock_time> \
     --private-key <your_private_key> \
     --legacy \
     contracts/Lock.sol:Lock
   ```

   - `<lock_amount>` is the amount of test `CFX` to be locked in the contract. Try setting this to some small amount, like `0.0000001ether`.&#x20
   - `<unlock_time>` is the Unix timestamp after which the funds locked in the contract will become available for withdrawal. Try setting this to some Unix timestamp in the future, like `1730390400` (this Unix timestamp corresponds to October 1, 2024).

   For example:

   ```bash
   forge create --rpc-url https://evmtestnet.confluxrpc.com \
     --value 0.00000000002ether \
     --constructor-args 1696118400 \
     --private-key 0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1 \
     --legacy contracts/Lock.sol:Lock
   ```

## FAQs

### Invalid parameters: tx

You may encounter error messages like `Invalid parameters: tx` when deploying a contract. Please make sure that your deploy account has enough test tokens to deploy the contract. You can request test tokens from the [eSpace faucet](https://efaucet.confluxnetwork.org/).
For more possible reasons, please refer to the [Sending Transaction Errors](/docs/core/core-space-basics/transactions/send-tx-error) and [sendRawTransaction RPC method error messages](/docs/core/build/json-rpc/rpc-behaviour/cfx_sendTransaction-errors.md)

## Feedback

Thank you for participating in and developing on the eSpace Testnet! If you encounter any issues, join our <DiscordLink>Discord</DiscordLink> and ask us in it.
