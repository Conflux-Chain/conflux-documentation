---
sidebar_position: 3
title: 开发者快速入门
description: Quickstart for developers to Ethereum developers to build on eSpace
keywords:
  - Quickstart
displayed_sidebar: eSpaceSidebar
---

With Conflux eSpace, your favorite tools for building and testing smart contracts just work.

Since eSpace is EVM-Compatible, you’ll just need to point your favorite builder tools at a Conflux eSpace RPC Provider.

If you are not familiar with Ethereum development, you can start by learning the basics and understanding its stack through [Ethereum's official documentation](https://ethereum.org/en/developers/)

## Acquiring CFX

eSpace also uses CFX as its native currency, which will be needed to pay transaction fees for deploying and interacting with the network.

To start building on eSpace, we suggest you begin with using eSpace testnet. You'll first need to acquire some testnet CFX through [faucet](https://efaucet.confluxnetwork.org/).

Once you're ready to deploy on eSpace's mainnet, if you only have Core CFX, you can bridge over CFX from Core Space using [our space bridge](./).

## Network Configuration

### eSpace Mainnet

Use the table below to configure your Ethereum tools to the eSpace mainnet.

| Network Name       | Conflux eSpace                                           |
| ------------------ | -------------------------------------------------------- |
| RPC URL            | [https://evm.confluxrpc.com](https://evm.confluxrpc.com) |
| Chain ID           | 1030                                                     |
| Currency Symbol    | CFX                                                      |
| Block Explorer URL | [https://evm.confluxscan.io](https://evm.confluxscan.io) |

### eSpace Testnet

Use the table below to configure your Ethereum tools to the eSpace Testnet.

| Network Name       | Conflux eSpace Testnet                                                 |
| ------------------ | ---------------------------------------------------------------------- |
| RPC URL            | [https://evmtestnet.confluxrpc.com](https://evmtestnet.confluxrpc.com) |
| Chain ID           | 71                                                                     |
| Currency Symbol    | CFX                                                                    |
| Block Explorer URL | [https://evmtestnet.confluxscan.io](https://evmtestnet.confluxscan.io) |

## Configure your tooling

For setting up tooling to verify a smart contract deployment, see Verifying Smart
Contracts.

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

### web3.py

:::tip

It is recommended to create virtual environments before using `web3.py` to avoid dependency conflicts, for example, by using [venv](https://docs.python.org/3/library/venv.html) or [conda](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#creating-an-environment-with-commands).

:::

`web3.py` is one of the most widely used Python interfaces for interacting with the Ethereum blockchain and ecosystem. It can be installed using the command:

```bash
pip install web3 # or pip3 install web3
```

`web3.py` can also be used to interact with Conflux eSpace. The example code below shows how to connect to the Conflux eSpace testnet endpoint and check the connection:

```py
>>> from web3 import Web3
>>> w3 = Web3(Web3.HTTPProvider("https://evmtestnet.confluxrpc.com"))
>>> w3.is_connected() 
True # should return True
```

It should be noted that the latest version of `web3.py` populates `maxFeePerGas` and `maxPriorityFeePerGas` for transactions by default, while Conflux eSpace only supports the legacy transaction type prior to EIP-1559. Therefore, developers need to specify the `gas_price` field in transactions or use the [gas price API](https://web3py.readthedocs.io/en/stable/gas_price.html).

```python
from web3 import Web3
from web3.middleware.signing import construct_sign_and_send_raw_middleware
from web3.gas_strategies.rpc import rpc_gas_price_strategy

w3 = Web3(Web3.HTTPProvider("https://evmtestnet.confluxrpc.com"))
assert w3.is_connected()
acct = w3.eth.account.from_key("xxxxxx") # your secret key

w3.middleware_onion.add(construct_sign_and_send_raw_middleware(acct))
w3.eth.default_account = acct.address

# Set gas price strategy
w3.eth.set_gas_price_strategy(rpc_gas_price_strategy)

w3.eth.send_transaction({"from": acct.address, "value": 0, "to": acct.address})
```

### Brownie

[Brownie](https://eth-brownie.readthedocs.io/en/stable/) is a Python-based development and testing framework for smart contracts targeting the Ethereum Virtual Machine. To add the Conflux eSpace networks to Brownie, run the following command:

```bash
brownie networks add "Conflux eSpace" conflux-espace-main name=Mainnet host=https://evm.confluxrpc.com explorer=https://evm.confluxscan.io chainid=1030
brownie networks add "Conflux eSpace" conflux-espace-test name=Testnet host=https://evmtestnet.confluxrpc.com explorer=https://evmtestnet.confluxscan.io chainid=71
```

To deploy on eSpace, specify the Conflux network by using the `--network` option.

```bash
brownie run scripts/token.py --network conflux-espace-test
```

The `scripts/token.py` is the Brownie script you want to run on Conflux eSpace. In our [**Brownie tutorial**](./tutorials/deployContract/brownie.md), we show the complete workflow of how to configure a template Brownie project and how to run Brownie scripts on Conflux eSpace.

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
