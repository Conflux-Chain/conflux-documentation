---
title: Using Ledger with MetaMask on Conflux eSpace
id: using_ledger_on_espace
custom_edit_url: https://github.com/Conflux-Chain/conflux-developer-site/edit/master/docs/guides/en/using-ledger-on-espace.md
keywords:
  - Ledger
  - MetaMask
  - eSpace
  - Hardware wallet
---

## Introduction

[Conflux eSpace](/conflux-doc/docs/EVM-Space/intro_of_evm_space) is the new EVM-compatible subsystem of [Conflux](https://confluxnetwork.org).
Conflux eSpace supports the Conflux native token [CFX](/introduction/en/conflux_basics), and numerous other crypto assets including [ERC20](https://evm.confluxscan.io/tokens) and [NFT](https://evm.confluxscan.io/tokens-nft) tokens.
You can now use your **Ledger Nano S** or **Ledger Nano X** hardware wallet to securely store your assets on eSpace.
In this guide, we will show you how to install the Conflux eSpace app on your Ledger device, how to import your accounts into MetaMask, and how to transfer assets on eSpace.

:::note
**The Conflux eSpace Ledger app is not yet available in Ledger Live as it is currently under review.**
:::

## Before You Start

Before you start, make sure that you have done the following:

- Initialized your [Nano S](https://support.ledger.com/hc/en-us/articles/360000613793-Set-up-your-Ledger-Nano-S?docs=true) or [Nano X](https://support.ledger.com/hc/en-us/articles/360018784134-Set-up-your-Ledger-Nano-X?docs=true) device.
- Updated your [Nano S](https://support.ledger.com/hc/en-us/articles/360002731113-Update-Ledger-Nano-S-firmware?docs=true) or [Nano X](https://support.ledger.com/hc/en-us/articles/360013349800-Update-Ledger-Nano-X-firmware?docs=true) device to the latest firmware version.
- Installed [Ledger Live](https://www.ledger.com/ledger-live) and updated it to the latest version.
- Installed [MetaMask](https://MetaMask.io) on a compatible desktop browser.

If you encounter any issues, find us on [Discord](https://discord.com/invite/aCZkf2C) or [Telegram](https://t.me/Conflux_English), we are happy to help.

## Installation

You can install the **Conflux eSpace app** on your Ledger device by following these steps:

1. Connect your Ledger Nano S or Ledger Nano X device to your computer through USB.
1. Unlock your device by entering your PIN.
1. Open Ledger Live.
1. In the menu on the left, click "Manager" to open the Ledger Live app manager.
1. When your Ledger device displays "Allow Ledger manager", press both buttons to continue.
1. Back in Ledger Live, under the "App catalog" tab, enter "Conflux eSpace" in the search field.
1. Once Ledger Live shows the Conflux eSpace app, press "Install".
1. The Conflux eSpace app is now installed successfully.


## Setting up MetaMask

### Connecting Your MetaMask Wallet to Conflux eSpace

You can add the Conflux eSpace network to your MetaMask wallet by following these steps:

1. Open your browser and navigate to https://evmchainlist.org.
1. Search for "Conflux eSpace".
1. Click "Connect Wallet" to allow this site to send requests to MetaMask.
1. Click "Add to MetaMask" under "Conflux eSpace".
1. When MetaMask prompts "Allow this site to add a network?", click "Approve".
1. When MetaMask prompts "Allow this site to switch the network?", click "Approve".

Your MetaMask wallet is now connected to Conflux eSpace. You can switch to other networks anytime through the network selection dropdown menu in MetaMask.

Alternatively, you can add Conflux eSpace to MetaMask manually under "Settings", "Networks", "Add Network":

- **Network Name**: Conflux eSpace
- **New RPC URL**: https://evm.confluxrpc.com
- **Chain ID**: 1030
- **Currency Symbol**: CFX
- **Block Explorer URL**: https://evm.confluxscan.net


### Connecting Your Ledger Device to MetaMask

You can import accounts from your Ledger device into your MetaMask wallet by following these steps:

0. Quit Ledger Live if it is currently opened.
1. Connect your Ledger Nano S or Ledger Nano X device to your computer through USB.
1. Unlock your device by entering your PIN.
1. Navigate to the Conflux eSpace app on your device and press both buttons to open it.
1. In MetaMask, navigate to "Settings", "Advanced", "Preferred Ledger Connection Type" and choose "WebHID".
1. Open the menu in the top right corner in MetaMask and click "Connect Hardware Wallet".
1. Select "Ledger" and click "Continue".
1. A browser popup will appear saying "MetaMask wants to connect to a HID device". Select your Ledger device from the list and click "Connect".
1. After a few seconds, the "Select an Account" page shows up in MetaMask. Select one or more accounts that you would like to import to MetaMask and click "Unlock".
1. Your account is now visible in MetaMask as "Ledger 1".


## Using Ledger

### Sending Crypto Assets

Assuming your account on the Ledger device has some CFX tokens, the steps below show how to make a CFX transfer on Conflux eSpace.

*Note: If you do not have CFX, you can purchase at one of the exchanges listed [here](https://123cfx.com/#Exchanges).*

0. Make sure you have already imported your Ledger account into your MetaMask wallet by following the steps in the previous section. Quit Ledger Live if it is currently opened.
1. Connect your Ledger Nano S or Ledger Nano X device to your computer through USB.
1. Unlock your device by entering your PIN.
1. Navigate to the Conflux eSpace app on your device and press both buttons to open it.
1. In MetaMask, select your Ledger account (e.g., "Ledger 1").
1. Click "Send" and enter the recipient address (should start with `0x`).
1. Under "Amount", enter the amount of CFX to transfer and click "Next".
1. Double check the transaction details, and click "Confirm".
1. Your Ledger device will now show "Review transaction". **Carefully review the transaction amount and receipient address** by repeatedly pressing the right button on your device.
1. If everything looks correct, press both buttons at the "Accept and send" screen to approve the transaction. Otherwise, press both buttons at the "Reject" screen to reject the transaction.
1. After the transaction has been approved, it is now signed and sent to the Conflux Network. You can see the transaction status in MetaMask. If you click on the transaction and click "View on block explorer", you can see more details on [Conflux Scan](https://evm.confluxscan.io).

### Receiving Crypto Assets

In order to receive CFX and ERC20 tokens to your Ledger wallet account, simply copy your address from MetaMask and share it with the sender. You only need to sign transactions using your Ledger device when sending funds, not when receiving them. MetaMask can also provide you with an easy-to-use QR code under "Account details".

### Obtaining CFX

There are multiple ways of obtaining CFX and other tokens on Conflux eSpace.

- You can obtain CFX and withdraw it to Conflux eSpace through a variety of centralized exchanges (e.g., [KuCoin](https://www.kucoin.com)).
- You can also use a decentralized exchange like [Swappi](https://app.swappi.io/#/swap).
- Finally, you can also transfer crypto assets from other chains to Conflux eSpace through cross-chain apps like [Multichain](https://app.multichain.org/#/router), [meson.fi](https://meson.fi/), [cBridge](https://cbridge.celer.network/#/transfer), or the [Conflux eSpace Bridge](https://confluxhub.io/espace-bridge).


### Checking Your Balance

The easiest way to check your CFX and ERC20 token balances held by your Ledger account is to simply view them in MetaMask.
<!---
![conflux-app-in-ledger-live](/img/ledger/metamask-view-balance.png)
--->

Alternatively, you can click on "View Account in Explorer", or navigate to https://evm.confluxscan.net and manually search for your address to see your token balances and transaction history.
<!---
![conflux-app-in-ledger-live](/img/ledger/scan-view-balance.png)
--->

## Next Steps

You can learn more about Conflux at [confluxnetwork.org](https://confluxnetwork.org) or at the [Conflux Developer Portal](http://developer.confluxnetwork.org). You can check transaction and account details on [Conflux Scan](https://evm.confluxscan.io).

If you encounter any issues, find us on [Discord](https://discord.com/invite/aCZkf2C) or [Telegram](https://t.me/Conflux_English), we are happy to help.