:::tip

This guide will help user connect their metamask  wallet to Conflux {props.space}.

:::

## 简介

[MetaMask](https://metamask.io/)是一个便捷访问以太坊兼容链（如Conflux{props.space}）的应用接口
基于本指南的目的，我们将假定您已熟悉 MetaMask 并已安装它。
If you need help getting started with MetaMask itself, [check out Metamask documentation](https://metamask.io/faqs.html) and [Ethereum documentation](https://ethereum.org/en/).

In this tutorial we will walk through connecting MetaMask to the Conflux {props.space} Testnet.

:::note
Screenshots in this tutorial are taken from the MetaMask browser extension version 10.8.1.
:::

## Connecting MetaMask to Conflux {props.space}

### Add {props.space} through Chainlist

You can add the Conflux {props.space} network to your MetaMask wallet by following these steps:

1. 打开您的浏览器，访问 https://chainlist.org。
2. Search for "Conflux {props.space}".
3. Click "Connect Wallet" under "Conflux {props.space}" to allow this site to send requests to Metamask.
4. Click "Add to Metamask" under "Conflux {props.space}".
5. 当 MetaMask 提示“允许此站点添加网络？”时，点击“批准”。
6. 当 MetaMask 提示“允许此站点切换网络？”时，点击“批准”。

Your MetaMask wallet is now connected to Conflux {props.space}. 您可以随时通过Metamask中的网络选择菜单切换到其他网络。

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

Click `Save`, and you should see _Conflux {props.space}_ is now the network selected in MetaMask.
为了让您体验 MetaMask操作情况，我们将把它连接到 Remix 并执行一些交易。
The rest of this guide will assume your MetaMask is connected to _Conflux {props.space} (Testnet)_.

## 水龙头

To interact with our testnet, you first need to receive testnet CFX on {props.space} Testnet. You can get testnet CFX from our <Faucet />.
Paste your wallet address in the address input box, input the captcha and click `Claim` to receive testnet CFX.
