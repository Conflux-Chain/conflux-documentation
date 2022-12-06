
## Introduction

[Conflux](https://confluxnetwork.org) is a high performance distributed ledger based on the Tree-Graph concensus protocol.
Conflux supports the Conflux native token CFX, and numerous other crypto assets including [CRC20](https://confluxscan.io/tokens/crc20) and [NFT](https://confluxscan.io/tokens/crc721) tokens.
You can now use your **Ledger Nano S** or **Ledger Nano X** hardware wallet to securely store your assets on Conflux.
In this guide, we will show you how to install the Conflux app on your Ledger device, how to import your accounts into Fluent, and how to transfer assets on Conflux.

:::note
This guide is for Conflux Core. If you would like to use your Ledger device with the EVM-compatible Conflux eSpace, click [here]().
:::

## Before You Start

Before you start, make sure that you have done the following:

- Initialized your [Nano S](https://support.ledger.com/hc/en-us/articles/360000613793-Set-up-your-Ledger-Nano-S?docs=true) or [Nano X](https://support.ledger.com/hc/en-us/articles/360018784134-Set-up-your-Ledger-Nano-X?docs=true) device.
- Updated your [Nano S](https://support.ledger.com/hc/en-us/articles/360002731113-Update-Ledger-Nano-S-firmware?docs=true) or [Nano X](https://support.ledger.com/hc/en-us/articles/360013349800-Update-Ledger-Nano-X-firmware?docs=true) device to the latest firmware version.
- Installed [Ledger Live](https://www.ledger.com/ledger-live) and updated it to the latest version.
- Installed [Fluent Wallet](https://fluentwallet.com/) on a compatible desktop browser.

If you encounter any issues, find us on [Discord](https://discord.com/invite/aCZkf2C) or [Telegram](https://t.me/Conflux_English), we are happy to help.

## Installation

:::note
The Conflux Ledger app is currently available as an **unaudited developer release**. Please use it at your own risk.
:::

You can install the **Conflux app** on your Ledger device by following these steps:

1. Connect your Ledger Nano S or Ledger Nano X device to your computer through USB.
1. Unlock your device by entering your PIN.
1. Open Ledger Live.
1. Click on the gear icon in the top right corner to open Settings.
1. Go to "Experimental features" and enable "Developer mode".
1. In the menu on the left, click "Manager" to open the Ledger Live app manager.
1. When your Ledger device displays "Allow Ledger manager", press both buttons to continue.
1. Back in Ledger Live, under the "App catalog" tab, enter "Conflux" in the search field.
1. Once Ledger Live shows the Conflux app, press "Install".

The Conflux app is now installed successfully.

<!---
![conflux-app-in-ledger-live](/img/ledger/conflux-app-in-ledger-live.png)
-->

## Connecting Your Ledger Device to Fluent

You can import accounts from your Ledger device into your Fluent wallet by following these steps:

0. Quit Ledger Live if it is currently opened.
1. Connect your Ledger Nano S or Ledger Nano X device to your computer through USB.
1. Unlock your device by entering your PIN.
1. Navigate to the Conflux app on your device and press both buttons to open it.
1. In Fluent, open the menu in the top right corner and select "Account Management".
1. Click "Add" and select "Hardware Wallet". Read the instructions carefully and click "Ready".
1. On the "Connect your Ledger" page, click "Connect".
1. A browser popup will appear saying "Fluent wants to connect". Select your Ledger device from the list and click "Connect".
1. After a few seconds, the "Choose Address" page shows up in Fluent. Select one or more accounts that you would like to import to Fluent and click "Import".

Your account is now available in Fluent as "LedgerNanoS-1" (or similar).

<!---
![add-ledger-accounts-in-fluent](/img/ledger/add-ledger-accounts-in-fluent.png)
-->

## Using Ledger: Sending Crypto Assets

Assuming your account on the Ledger device has some CFX tokens, the steps below show how to make a CFX transfer on Conflux.

:::note
If you do not have CFX, you can purchase at one of the exchanges listed [here](https://123cfx.com/#Exchanges).
:::

Make sure you have already imported your Ledger account into your Fluent wallet by following the steps in the previous section. Quit Ledger Live if it is currently opened.

1. Connect your Ledger Nano S or Ledger Nano X device to your computer through USB.
1. Unlock your device by entering your PIN.
1. Navigate to the **Conflux app** on your device and press both buttons to open it.
1. In Fluent, select your Ledger account (e.g., "LedgerNanoS-1").
1. Click "Send" and enter the recipient address (should start with `0x`).
1. Under "Token and Amount", enter the amount of CFX to transfer and click "Next".
1. Double check the transaction details, and click "Confirm".
1. Your Ledger device will now show "Review transaction". **Carefully review the transaction amount and receipient address** by repeatedly pressing the right button on your device.
1. If everything looks correct, press both buttons at the "Accept and send" screen to approve the transaction. Otherwise, press both buttons at the "Reject" screen to reject the transaction.

After the transaction has been approved, it is now signed and sent to the Conflux Network. You can see the transaction status in Fluent. If you click on "History", then click on the arrow icon at the top right corner of your transaction, you can see more details on [Conflux Scan](https://confluxscan.io).

<!---
![send-tx-using-ledger](/img/ledger/send-tx-using-ledger.png)
-->

## Next Steps

You can learn more about Conflux at [confluxnetwork.org](https://confluxnetwork.org) or at the [Conflux Developer Portal](http://developer.confluxnetwork.org). You can check transaction and account details on [Conflux Scan](https://confluxscan.io).

If you encounter any issues, find us on [Discord](https://discord.com/invite/aCZkf2C) or [Telegram](https://t.me/Conflux_English), we are happy to help.
