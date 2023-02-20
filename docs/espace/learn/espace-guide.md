---
sidebar_position: 5
title: eSpace Guide
---
This guide covers basic usage of Fluent and MetaMask to transfer funds between Conflux Core Space and Conflux eSpace.

## Installation and Setup

In this section, we'll guide you through the process of installing and configuring the wallets to connect to the Conflux Core Space eSpace spaces. 

To connect to Conflux Core Space, you'll need a Conflux-compatible wallet, such as Fluent. To connect to Conflux eSpace, you'll need an Ethereum-compatible wallet, such as MetaMask.

### Installing & Setting Up Fluent

#### Installing Fluent

Fluent is a Conflux-based wallet. A key feature of Fluent is that it includes a cross-space bridge that allows you to transfer funds between Conflux Core Space and eSpace.

To install Fluent:

1. Go to http://fluentwallet.com and click **Add to Chrome**. **Note**: Fluent is currently only supported by Google Chrome and Brave browsers.
2. In the Chrome Web Store, click again **Add to Chrome** and then confirm in the installation by click **Add extension** in the dialog.

#### Creating a new wallet in Fluent

1. Open Fluent and click the **Create** button.
2. Set your password, confirm it, and click **Create**.
3. In Create Account, click **New Seed Phrase** to create a new wallet address and click **Next**.
4. In Seed Phrase Group Name, enter a alias to identify your wallet (e.g. "Core Space Wallet").
5. In Backup Seed Phrase, copy the seed words in order, store in a secure and offline place, and click **Next**.
6. In Check Seed Phrase, confirm the seed words that you backed up in the previous step and click **Create**.

#### Connecting Fluent to Conflux Core Space

**Note**: Conflux Spaces are currently only supported in the testnet.

1. In Fluent, switch networks from Conflux Tethys (Mainnet) to Conflux Testnet (Testnet).

### Installing & Setting Up MetaMask

#### Installing MetaMask

1. Go to http://metamask.io and download and install the MetaMask wallet.

#### Creating a new wallet in MetaMask

1. Create a new wallet from MetaMask. This wallet will be your **Conflux eSpace Wallet**.

#### Connecting MetaMask to Conflux eSpace

In this section, you'll learn how to connect MetaMask to Conflux eSpace using a remote RPC endpoint.

1. In MetaMask, go to Settings.
2. In Settings, go to **Networks** and click **Add a network**.
3. In **Add a network**:
    a. Type "Conflux eSpace Testnet" as the network name.
    b. Enter `https://evmtestnet.confluxrpc.com` as the new RPC URL.
    c. Enter `71` as the chain ID.
    d. Type "CFX" as the currency symbol.

## Transferring Funds Across Spaces

### Requesting funds from the testnet faucet in Conflux Core Space

**Note**: Conflux Spaces are currently only supported in the testnet.

1. In Fluent, verify that you're connected to the Conflux testnet.
2. Go to http://faucet.confluxnetwork.org.
3. In the Conflux Testnet Faucet, click **Connect Wallet** to connect your Fluent wallet.
4. In the Fluent dialog, click **Connect** to confirm connecting Fluent to the Conflux Testnet Fauce site.
5. In the Token selection drop down menu, select **CFX** and click **Receive**.
6. In the Sign Transaction dialog, click **Confirm** to sign the transaction and receive funds from the testnet faucet.
7. Once you receive the confirmation message, go to Fluent and ensure that you have received 1000 CFX.

### Transferring funds from Core Space to eSpace

1. In Fluent, click the **Cross-Space** icon or go to https://fluentwallet.com.
2. Verify that your Conflux wallet is connected to the site.
3. In the Transfer Assets section, verify that your Conflux wallet is selected as the **From** wallet.
4. Go to MetaMask and verify that you are connected to the Conflux eSpace Testnet network.
5. Copy your Conflux eSpace wallet address.
6. Go to the EVM Subspace Destination Address field and enter (or paste) your Conflux eSpace wallet address.
7. In the Amount field, enter the amount that you want to transfer to your Conflux eSpace wallet and click **Transfer**.
8. In the Sign Transaction dialog, click **Confirm** to confirm the transaction.
9. After the transaction has been confirmed, go to MetaMask and verify that you received the funds from your Conflux Core Space wallet.

### Transferring funds from Conflux eSpace to Core Space

1. Go to https://fluentwallet.com.
2. Click the arrow to transfer from Conflux eSpace to  Core Space.
3. Copy the transfer address listed in Step 1.
4. Go to MetaMask and transfer funds to the transfer address you copied in the previous step.
5. Go back to the Fluent cross-space bridge and verify in Step 2 that you have a withdrawable amount.
6. Click **Withdraw** and confirm the transaction in the Sign Transaction dialog.
7. Go to Fluent and verify that you received the correct amount of CFX.