---
sidebar_position: 3
title: Developer Quickstart
description: Quickstart for developers to Ethereum developers to build on eSpace
keywords:
    - Quickstart
---

With Conflux eSpace, your favorite tools for building and testing smart contracts just work.

Since eSpace is EVM-Compatible, you’ll just need to point your favorite builder tools at a Conflux eSpace RPC Provider.

## Acquiring CFX

eSpace also uses CFX as its native currency, which will be needed to pay transaction fees for deploying and interacting with the network.

To start building on eSpace, we suggest you begin with using eSpace testnet. You'll first need to acquire some testnet CFX through [faucet](https://efaucet.confluxnetwork.org/).

Once you're ready to deploy on eSpace's mainnet, if you only have Core CFX, you can bridge over CFX from Core Space using [our space bridge](./).

## Network Configuration

### eSpace Mainnet

Use the table below to configure your Ethereum tools to the eSpace mainnet.

| Network Name       | Conflux eSpace                                     |
| ------------------ | -------------------------------------------------- |
| RPC URL            | [https://evm.confluxrpc.com](https://evm.confluxrpc.com)   |
| Chain ID           | 1030                                               |
| Currency Symbol    | CFX                                                |
| Block Explorer URL | [https://evm.confluxscan.io](https://evm.confluxscan.io) |

### eSpace Testnet

Use the table below to configure your Ethereum tools to the eSpace Testnet.

| Network Name       | Conflux eSpace Testnet                                            |
| ------------------ | ----------------------------------------------------------------- |
| RPC URL            | [https://evmtestnet.confluxrpc.com](https://evmtestnet.confluxrpc.com)  |
| Chain ID           | 71                                                                |
| Currency Symbol    | CFX                                                               |
| Block Explorer URL | [https://evmtestnet.confluxscan.io](https://evmtestnet.confluxscan.io) |

## Configure your tooling

For setting up tooling to verify a smart contract deployment, see [Verifying Smart
Contracts](./).

### Hardhat

Modify your Hardhat config file `hardhat.config.ts` to point at the eSpace Testnet public RPC.

```jsx
...

const config: HardhatUserConfig = {
  ...
  networks: {
    eSpaceTestnet: {
      url: "https://evmtestnet.confluxrpc.com" || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

...
```

A complete workflow for using Hardhat deploy contract is shown [here](./tutorials/deployContract/hardhatAndFoundry.md)

### Foundry

To deploy using the eSpace Testnet Public RPC, run:

```bash
forge create ... --rpc-url=https://evmtestnet.confluxrpc.com --legacy
```

A complete workflow for using foundry deploy contract is shown [here](./tutorials/deployContract/hardhatAndFoundry.md)

### Remix Web IDE

After compiling your contracts, the easiest way to deploy using Remix is by [setting up Metamask](./UserGuide.md), then selecting the **Conflux eSpace Testnet** network.

Now, in the “Deploy and Run Transactions” tab, use the “Environment” drop-down and select “Injected Provider - MetaMask.”

![](./img/injectedProviderMM.avif)

Connect your wallet and select the Conflux eSpace Testnet. Your account should be selected automatically in Remix, and you can click “Deploy.” A complete workflow for Remix usage is shown [here](./tutorials/deployContract/remix.md)

### Truffle

Assuming you already have a Truffle environment setup, go to the Truffle [configuration file](https://trufflesuite.com/docs/truffle/reference/configuration/), `truffle.js`. Make sure to have installed HDWalletProvider: `npm install @truffle/hdwallet-provider@1.4.0`

```js
const HDWalletProvider = require("@truffle/hdwallet-provider")
...
module.exports = {
  networks: {
    eSpaceTestnet: {
      provider: () =>
        new HDWalletProvider(process.env.PRIVATE_KEY, "https://evmtestnet.confluxrpc.com"),
      network_id: '*',
    },
  }
}
```

### Brownie

To add the eSpace Testnet, run the following command:

```bash
brownie networks add Ethereum confluxEspace host=https://evmtestnet.confluxrpc.com chainid=71
```

To set this as your default network, add the following in your project config file:

```yaml
networks:
  default: confluxEspace
```

Another way to add the eSpace Testnet is to create a `yaml` file and run a command to add it.

This is an example of a yaml file called `network-config.yaml`

```yaml
live:
- name: Ethereum
 networks:
 - chainid: 71
   explorer: https://evmtestnet.confluxscan.io
   host: https://evmtestnet.confluxrpc.com
   id: confluxEspace
   name: Conflux eSpace
```

To add the eSpace Testnet to the network list, run the following command:

```bash
brownie networks import ./network-config.yaml
```

To deploy on eSpace, run the following command. In this example, `token.py` is the script to deploy the smart contract. Replace this with the name of your script:

```bash
brownie run token.py --network confluxEspace
```

### ethers.js

Setting up a eSpace Testnet provider in an `ethers` script:

```jsx
import { ethers } from "ethers"

const provider = new ethers.providers.JsonRpcProvider("https://evmtestnet.confluxrpc.com")
```

### scaffold-eth

To deploy using Scaffold-eth, you’ll need to point both your Hardhat and React settings at the eSpace Testnet.

#### Configure Hardhat

In the `packages/hardhat/hardhat.config.js` file, you’ll add the network and select it as the default network.

```jsx
...
//
// Select the network you want to deploy to here:
//
const defaultNetwork = "eSpaceTestnet";
...
module.exports = {
...
	networks: {
...
          eSpaceTestnet: {
            url: "https://evmtestnet.confluxrpc.com",
            accounts: {
              mnemonic: mnemonic(),
            },
          },
	}
...
}
```

Be sure to fund the deployment wallet as well! Run `yarn generate` to create the wallet and `yarn account` to check its funds. Once funded, run `yarn deploy --network eSpaceTestnet` to deploy on the eSpace testnet.

:::tip

On some project forks, you'll want to disable the contract verification, which relies on Etherscan. This can be
  commented out in `packages/hardhat/deploy/00_deploy_your_contract.js`

:::

#### Configure the Frontend

To configure your frontend, you need to add the eSpace Testnet as a network option, then select it as default.

To add the network, modify `packages/react-app/src/constants.js`.

```jsx
...
export const NETWORKS = {
...
  eSpaceTestnet: {
    name: "eSpaceTestnet",
    color: "#e9d0b8",
    chainId: 71,
    rpcUrl: "https://evmtestnet.confluxrpc.com",
    blockExplorer: "https://evmtestnet.confluxscan.io",
  },
...
}
```

Next, in `packages/react-app/src/App.jsx` modify

```jsx
...
/// 📡 What chain are your contracts deployed to?
const initialNetwork = NETWORKS.eSpaceTestnet;
...
```