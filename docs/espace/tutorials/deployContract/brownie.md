---
sidebar_position: 4
title: Brownie
description: Learn how to deploy an ERC-20 Token using Brownie.
keywords:
  - Conflux eSpace
  - Brownie
  - Python
  - Smart Contracts
  - ERC-20 Token
  - Deployment
  - Tutorial
  - eth-brownie
  - Virtual Environment
  - Network Configuration
  - Account Management
  - Faucet
  - Testnet
  - Mainnet
  - YAML
  - Private Key
  - Gas Price
  - Transaction
  - Customization
  - Front-End Development
  - Scripting
displayed_sidebar: eSpaceSidebar
tags: [Brownie]
 
---

[Brownie](https://eth-brownie.readthedocs.io/en/stable/) is a Python-based development and testing framework for smart contracts targeting the Ethereum Virtual Machine. In this tutorial, we will guide you through configuring Brownie (or eth-brownie) for Conflux eSpace and demonstrate how to use Brownie scripts to deploy contracts on Conflux eSpace.

## Install Brownie

:::tip

To avoid dependency conflicts, it is recommended to create virtual environments before installing `eth-brownie`. Tools like [venv](https://docs.python.org/3/library/venv.html) or [conda](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#creating-an-environment-with-commands) can be used for this purpose.

:::

Execute the following command to install Brownie:

```bash
pip install eth-brownie # or pip3 install eth-brownie
```

## Add Conflux eSpace Networks

To add the Conflux eSpace networks to Brownie, execute these commands:

```bash
brownie networks add "Conflux eSpace" conflux-espace-main name=Mainnet host=https://evm.confluxrpc.com explorer=https://evm.confluxscan.io chainid=1030
brownie networks add "Conflux eSpace" conflux-espace-test name=Testnet host=https://evmtestnet.confluxrpc.com explorer=https://evmtestnet.confluxscan.io chainid=71
```

Alternatively, import the Conflux eSpace networks to Brownie using a `yaml` file:

```yaml
live:
- name: Conflux eSpace
  networks:
  - chainid: 1030
    explorer: https://evm.confluxscan.io
    host: https://evm.confluxrpc.com
    id: conflux-espace-main
    name: Mainnet
  - chainid: 71
    explorer: https://evmtestnet.confluxscan.io
    host: https://evmtestnet.confluxrpc.com
    id: conflux-espace-test
    name: Testnet
```

Then, run the following command to add them to your network configuration:

```bash
brownie networks import ./network-config.yaml
```

Upon successful addition, the networks will appear in the Brownie network list, as shown by running `brownie networks list`:

```bash
......

Conflux eSpace
  ├─Testnet: conflux-espace-test
  └─Mainnet: conflux-espace-main

......
```

## Generate Template Token Project

To generate a template token project, run `brownie bake token`. The project will be created in the current folder. For this tutorial, we will place the project directly under the user directory:

```bash
cd ~
brownie bake token
cd token
```

## Generate/Import Your Account

You have the option to either generate a new account or import an existing one for Brownie.

### Generate a New Account

To create a new account via the command line:

```bash
brownie accounts generate <id>
```

You will be prompted to set a password for the account. Brownie will then generate a random private key and make the account accessible as `<id>`. The address of the new account will be displayed in the terminal, which you will need in subsequent steps.

Here is an example output of the command:

```bash
Brownie v1.14.5 - Python development framework for Ethereum

Generating a new private key...
mnemonic: 'park service pull home hedgehog soul grief food people uncle will series'
Enter the password to encrypt this account with: 
SUCCESS: A new account '0x960ecb222F296C1D75a111D33094Cb393ab17b09' has been generated with the id 'new'
```

### Import Your Account

If you already have an account, you can import it. To import your private key, run:

```bash
# id is the identifier of your account, used to specify the account in scripts
brownie accounts new <id>
# for example, brownie accounts new dev
```

Brownie will prompt you to enter your secret key and password:

```bash
Brownie v1.14.5 - Python development framework for Ethereum

Enter the private key you wish to add: *******************
Enter the password to encrypt this account with: **************
SUCCESS: A new account 'xxxxxxxxxxxx' has been generated with the id 'dev'


```

It's also possible to import your keystore using:

```bash
brownie accounts import <id> <path>
```

For more information, refer to [account management](https://eth-brownie.readthedocs.io/en/stable/account-management.html#account-management).

## Fund Your Account

To send transactions, you need to fund your account. The [Conflux's eSpace faucet](https://efaucet.confluxnetwork.org/) can assist with this.

After entering your account address, your account will receive funds on the eSpace testnet.

## Modify Deployment Script

The default `scripts/token.py` in the template `token` project is not directly usable for the Conflux eSpace testnet. An extra line needs to be added to the default script:

```py
#!/usr/bin/python3

from brownie import Token, accounts


def main():
    accounts.load("dev") # Specify which account to load here
    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': accounts[0]})

```

## Deployment

To deploy on the Conflux eSpace testnet, run the following command:

```bash
brownie run scripts/token.py --network conflux-espace-test
```

Brownie will ask for your password. After entering it, the script will execute and the contract will be deployed:

```bash
Brownie v1.14.5 - Python development framework for Ethereum

TokenProject is the active project.

Running 'scripts/token.py::main'...
Enter the password to unlock this account: 
Transaction sent: 0x547675979e80eccfe0665d2ab347cefc8ca3644dbdaddb0572b76cc7a62d1b7b
  Gas price: 20.0 gwei   Gas limit: 1302100   Nonce: 0
  Token.constructor confirmed - Block: 148584450   Gas used: 1043993 (80.18%)
  Token deployed at: 0x634757eFE5DD3D27ecf38480c6F2Eac6752E90DB
```

## What to Do Next?

Now that you've deployed your ERC-20 token on Conflux eSpace using Brownie, you can start building upon this foundation:

1. **Explore the Template**: Familiarize yourself with the template project you've just deployed. Investigate the functions and structure of the ERC-20 token smart contract. Understanding this template is crucial for further development.

2. **Customization**: Begin customizing the token contract. You might want to add unique features or modify the existing functionalities to suit your specific needs. This could include adjusting the token supply, implementing burning mechanisms, or adding voting capabilities.

3. **Develop Additional Scripts**: Consider developing additional Brownie scripts to automate tasks like distributing tokens, managing airdrops, or handling token allowances. These scripts can enhance your project's efficiency and functionality.

4. **Basic Front-End Development**: If you're inclined, start working on a simple front-end interface. This can be a basic web application that allows users to interact with your token for tasks such as transferring tokens or checking their balance.

By following these steps, you'll be well on your way to further developing your project on Conflux eSpace.

For more examples of using Brownie, explore [Brownie's documentation](https://eth-brownie.readthedocs.io/en/stable/index.html). You are also welcome to ask questions in our community or raise issues on our [GitHub repository](https://github.com/Conflux-Chain/conflux-documentation/issues/new/choose).
