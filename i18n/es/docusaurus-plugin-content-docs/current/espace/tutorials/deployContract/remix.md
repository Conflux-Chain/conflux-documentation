---
sidebar_position: 2
title: Remix IDE
description: Deploying an ERC-20 Token using Remix IDE
displayed_sidebar: eSpaceSidebar
---

## Introduction

Remix IDE is a powerful online development environment specifically designed for building, deploying, and debugging smart contracts for the Ethereum network and other EVM-compatible blockchains like Conflux eSpace. This tutorial will guide you through the process of deploying an ERC20 token smart contract on Conflux eSpace using Remix IDE. If you're looking to deploy a different smart contract, you can use [Cookbook](../cookbook.md) to access a comprehensive library of pre-written Solidity code, allowing you to find and utilize the specific smart contract functionalities you need.

## Deploying an ERC-20 Token on Conflux eSpace using Remix IDE
In a new tab, open the Remix IDE at [remix.ethereum.org](https://remix.ethereum.org). It might take a minute to load, but once it has, create a new file `ERC20Token.sol` in the workspace panel on the left:

![Remix-new-file](../img/remix_new_file-1.png)

Copy and paste the following code into the central editor panel:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor (string memory name, string memory symbol) ERC20(name, symbol) {
        // Mint 10000 tokens to msg.sender
        // Similar to how 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        _mint(msg.sender, 10000 * 10 ** uint(decimals()));
    }
}
```

Click the `Solidity Compile` button on the far left panel (the second icon down); ensure your selected Solidity compiler version is 0.8 (minor versions within 0.8, e.g., 0.8.4 work too), and click `Compile ERC20Token.sol`.


![Remix-solidity-compile](../img/remix_solidity_compile-1f459820c9caef73c47d3af1c87e71a6-1f459820c9caef73c47d3af1c87e71a6.png)

Once the contract is compiled, click the `Deploy & run transactions` button in the far left panel (the icon below the Solidity compiler). In the `ENVIRONMENT` drop-down select `Injected Web3`.

![Remix-inject-web3](../img/remix_injected_web3-dbb0d671a1703239451d7d4e133f68ba-dbb0d671a1703239451d7d4e133f68ba.png)

You will see a MetaMask pop-up window asking you to give the Remix IDE permission to access it. Click `Next` and then `Connect` to grant access.

![Remix-connect-metamask](../img/remix_connect_with_metamask-9d8214740f372d3b41e489cbe23c5884-9d8214740f372d3b41e489cbe23c5884.png)

Back in the Remix interface, click the arrow next to the `DEPLOY` section of the left panel. Fill in the token details with whatever you like (`GoldenToken` and `GLD` in the example), and click `transact`.

![Remix-deploy-contract](../img/remix_deploy_contract-6423d60330003a7ffc0dc28ee5cd8178-6423d60330003a7ffc0dc28ee5cd8178.png)

Another MetaMask pop-up will appear asking you to confirm the transaction. Click `Confirm`.

![Remix-deploy-contract-metamask-confirm](../img/remix_deploy_contract_metamask_confirm-6b4f8c2a751ec4a4b6ad9df96584c623-6b4f8c2a751ec4a4b6ad9df96584c623.png)


After a few moments the transaction will be confirmed by the network. You will see a success message in the bottom panel and the contract listed under `Deployed Contracts` on the left panel. Click the copy button to copy the address of the newly deployed contract.

![Remix-deploy-contract-confirmed](../img/remix_deploy_contract_confirmed-59390e985747c30736f46356a88b4ff1-59390e985747c30736f46356a88b4ff1.png)


Now that the contract is deployed on the Conflux eSpace, we can interact with it via MetaMask.

## Adding an ERC-20 Token to MetaMask

In the MetaMask interface (with the Conflux EVM Testnet network still selected), click the `Add Token` button:

![MetaMask-add-token-button](../img/metam-import-token-b2a756a7a4ed3ac17f1a75fca77bf738.png)


Paste the token address copied from Remix in the previous step. The remaining token details should fill in automatically as MetaMask finds the contract on-chain. Click `Next`:

![MetaMask-add-token](../img/mm-import-token-short-1-71f005c4fdb996d2a4b5651ceb6bc7bd.png)


On the next screen you see the balance (100 tokens), as minted in our contract constructor. Click `Add Tokens`:

![MetaMask-add-token-confirm](../img/mm-import-token-short-2.png)



The token has now been added to MetaMask and we can use the MetaMask interface to view the token balance and to transfer the token to others.

## Transferring an ERC-20 Token with MetaMask

Continuing from the previous step, click the `Send` button in the MetaMask interface:

![MetaMask-my-token](../img/start-send-gld-b56abfa83bb02864b94c3a5adcbcc0d0.jpeg)


Select a recipient (if you have multiple accounts in MetaMask you can simply select another account), and an amount of tokens to send. Click `Next`:

![MetaMask-send-my-token](../img/send-gld-1-da8b6feee94ca0dfe89afc5118267c89.jpeg)

:::note
Once again the gas price should be set to zero, but this will change going forward.
:::

Click `Confirm` to send the transaction to the network:


![MetaMask-send-my-token-confirm](../img/send-gld-confirm-7789e263d3d53e45e2e4bebbf1d057cb.jpeg)

After a few moments the transaction will be confirmed by the network. You can see the updated balance your account holds in the MetaMask interface:

![MetaMask-my-token-sent-account1](../img/token-transfer-balance-changed-24a5b4588118295da68d10d9a3cea0cf.jpeg)

If you transferred to another MetaMask account you hold then you can follow the aforementioned instructions for adding the token to MetaMask on the other account, and view its balance also.


![MetaMask-add-token-account2](../img/mm-token-balance-changed-c59c6e2434009c0dcb6e03ef79ba5e60.png)


## Video Tutorial

For an on-hands demonstration of how to deploy a smart contract using Remix IDE, please refer to the following video:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="youtube" label="Remix IDE Video Tutorial">
<iframe width="560" height="315" src="https://www.youtube.com/embed/WLbUXQ1FS8M?si=kJD-6-QN3ZqFf0_v" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>
</Tabs>
