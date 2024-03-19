---
sidebar_position: 4
title: Brownie
description: 学习如何使用 Brownie 部署 ERC-20 代币。
keywords:
  - Brownie
  - 智能合约
  - Python
displayed_sidebar: eSpaceSidebar
---

[Brownie](https://eth-brownie.readthedocs.io/en/stable/) 是一个基于 Python 的开发和测试框架，用于针对以太坊虚拟机（EVM）的智能合约。 在本教程中，我们将指导您如何配置 Brownie（或 eth-brownie）以适应 Conflux eSpace，并将演示如何使用 Brownie 脚本在 Conflux eSpace 上部署合约。

## 安装 Brownie

:::tip

为避免依赖冲突，建议在安装 `eth-brownie` 之前创建虚拟环境。 可以使用 [venv](https://docs.python.org/3/library/venv.html) 和 [conda](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#creating-an-environment-with-commands) 等工具实现。

:::

执行以下命令安装 Brownie：

```bash
pip install eth-brownie # 或者 pip3 install eth-brownie
```

## 添加 Conflux eSpace 网络

要将 Conflux eSpace 网络添加到 Brownie 中，请执行以下命令：

```bash
brownie networks add "Conflux eSpace" conflux-espace-main name=Mainnet host=https://evm.confluxrpc.com explorer=https://evm.confluxscan.io chainid=1030
brownie networks add "Conflux eSpace" conflux-espace-test name=Testnet host=https://evmtestnet.confluxrpc.com explorer=https://evmtestnet.confluxscan.io chainid=71
```

或者使用 yaml 文件将导入 Conflux eSpace 网络到 Brownie 中：

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

然后，运行以下命令将其添加到您的网络配置：

```bash
brownie networks import ./network-config.yaml
```

成功添加后，您的网络将出现在 Brownie 网络列表中，可以通过运行 ` brownie networks list` 显示：

```bash
......

Conflux eSpace
  ├─Testnet: conflux-espace-test
  └─Mainnet: conflux-espace-main

......
```

## 生成代币项目的模板

运行 `brownie bake token` 生成一个代币项目模板。 项目将在当前文件夹中创建。 在本教程中，我们将项目直接放在用户目录下：

```bash
cd ~
brownie bake token
cd token
```

## 生成和导入您的帐户

您可以选择生成一个新账户或导入现有账户到 Brownie 中。

### 生成新账户

通过此命令行创建新账户：

```bash
brownie accounts generate <id>
```

您将被提示设置账户的密码。 Brownie 将生成一个随机私钥并使账户能以 `<id>` 的形式被访问。 新账户的地址将在终端中显示，您会在后续步骤中需要它。

下面是命令的示例输出：

```bash
Brownie v1.14.5 - Python development framework for Ethereum

Generating a new private key...
mnemonic: 'park service pull home hedgehog soul grief food people uncle will series'
Enter the password to encrypt this account with: 
SUCCESS: A new account '0x960ecb222F296C1D75a111D33094Cb393ab17b09' has been generated with the id 'new'
```

### 导入您的帐户

如果您已有账户，您可以将其导入。 为了导入您的私钥，请运行一下命令：

```bash
# id 是您账户的标识符，用于在脚本中指定账户
brownie accounts new <id>
# 例如，brownie accounts new dev
```

Brownie 将提示您输入您的私钥和密码：

```bash
Brownie v1.14.5 - Python development framework for Ethereum

Enter the private key you wish to add: *******************
Enter the password to encrypt this account with: **************
SUCCESS: A new account 'xxxxxxxxxxxx' has been generated with the id 'dev'


```

也可以使用以下方式导入您的密钥库：

```bash
brownie accounts import <id> <path>
```

更多信息请查看[账户管理](https://eth-brownie.readthedocs.io/en/stable/account-management.html#account-management)。

## 为您的账户充值

要发送交易，您需要为您的账户充值。 Conflux 的[ eSpace 水龙头](https://efaucet.confluxnetwork.org/)可以协助您实现这一点。

输入您的账户地址之后，您的账户将收到 eSpace 测试网上的资金。

## 修改部署脚本

`代币`项目模板中默认的 `scripts/token.py` 在 Conflux eSpace 测试网上不能直接使用。 需要向默认脚本中添加额外的一行：

```py
#!/usr/bin/python3

from brownie import Token, accounts

def main():
    accounts.load("dev") # 在这里指定要加载的账户
    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': accounts[0]})

```

## 部署

要在 Conflux eSpace 测试网上进行部署，请运行以下命令：

```bash
brownie run scripts/token.py --network conflux-espace-test
```

Brownie 会要求您输入密码。 输入密码后，脚本将自动执行并部署合约：

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

## 接下来是？

目前您已经使用 Brownie 在 Conflux eSpace 部署了您的 ERC-20 代币，您可以开始在此基础上构建：

1. **探索模板**：熟悉您刚刚部署的模板项目。 研究 ERC-20 代币智能合约的功能和结构。 理解这个模板对于您进一步的开发至关重要。

2. **定制化**：开始定制代币合约。 您可能想要添加独特的功能或修改现有的功能以适应您的特定需求。 这可能包括调整代币供应量、实现销毁机制或添加投票功能。

3. **开发附加脚本**：您可以考虑开发附加的 Brownie 脚本以自动化任务，如分发代币、空投管理或处理代币授权。 这些脚本可以提高项目的效率和功能。

4. **基础的前端开发**：如果您对此有兴趣，可以开始构建一个简单的前端界面。 这可以是一个非常基本的网页应用，允许用户与您的代币进行交互，如转移代币或检查余额等操作。

遵循这些步骤，您将顺利地在 Conflux eSpace 上进一步开发您的项目。

要了解更多使用 Brownie 的示例，请访问 [Brownie 官方文档](https://eth-brownie.readthedocs.io/en/stable/index.html)。 You are also welcome to ask questions in our community or raise issues on our [GitHub repository](https://github.com/Conflux-Chain/conflux-documentation/issues/new/choose).
