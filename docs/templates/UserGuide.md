
:::tip

This guide will help user connect their metamask  wallet to Conflux {props.space}.

:::

## Introduction

[MetaMask](https://metamask.io/) is a convenient UI for interacting with Ethereum-compatible blockchains (such as Conflux {props.space}).
For the purpose of this guide, we will assume you are already familiar with MetaMask and have it installed.
If you need help getting started with MetaMask itself, [check out Metamask documentation](https://metamask.io/faqs.html) and [Ethereum documentation](https://ethereum.org/en/).

In this tutorial we will walk through connecting MetaMask to the Conflux {props.space} Testnet.

:::note
Screenshots in this tutorial are taken from the MetaMask browser extension version 10.8.1.
:::

## Connecting MetaMask to Conflux {props.space}

### Add {props.space} through Chainlist

You can add the Conflux {props.space} network to your MetaMask wallet by following these steps:

1. Open your browser and navigate to https://chainlist.org.
2. Search for "Conflux {props.space}".
3. Click "Connect Wallet" under "Conflux {props.space}" to allow this site to send requests to Metamask.
4. Click "Add to Metamask" under "Conflux {props.space}".
5. When MetaMask prompts "Allow this site to add a network?", click "Approve".
6. When MetaMask prompts "Allow this site to switch the network?", click "Approve".

Your MetaMask wallet is now connected to Conflux {props.space}. You can switch to other networks anytime through the network selection dropdown menu in MetaMask.

### Add {props.space} manually

Alternatively, you can add Conflux {props.space} to MetaMask manually by selecting "Add Network" (or "Custom RPC") in the network selection drop-down menu:

<Img1 />

For the {props.space} **mainnet**, please use the following configuration values:

- **Network Name**: Conflux {props.space}
- **New RPC URL**: {props.mainnetRpcUrl}
- **Chain ID**: {props.mainnetChainId}
- **Currency Symbol**: {props.currency}
- **Block Explorer URL**: {props.mainnetScanUrl}

For the {props.space} **testnet**, please use the following configuration values:

- **Network Name**: Conflux {props.space} (Testnet)
- **New RPC URL**: {props.testnetRpcUrl}
- **Chain ID**: {props.testnetChainId}
- **Currency Symbol**: {props.currency}
- **Block Explorer URL**: {props.testnetScanUrl}

<Img2></Img2>

:::note
All the Conflux {props.space} RPC endpoint URLs and chain IDs can be found on our Networks page.
:::

Click `Save`, and you should see *Conflux {props.space}* is now the network selected in MetaMask.
To see MetaMask in action, we will connect it to Remix and perform some transactions.
The rest of this guide will assume your MetaMask is connected to *Conflux {props.space} (Testnet)*.

## Faucet

### Mainnet Faucet
To interact with our mainnet, you first need to receive mainnet CFX on {props.space} Mainnet. You can get mainnet CFX from [Conflux Faucets](https://conflux-faucets.com/).

These faucets will currently send you 0.02 CFX for Core Space or ESpace. This amount will be enough for 3-10 transactions on {props.space}.

### Testnet Faucet
To interact with our testnet, you first need to receive testnet CFX on {props.space} Testnet. You can get testnet CFX from our <Faucet />.
Paste your wallet address in the address input box, input the captcha and click `Claim` to receive testnet CFX.
