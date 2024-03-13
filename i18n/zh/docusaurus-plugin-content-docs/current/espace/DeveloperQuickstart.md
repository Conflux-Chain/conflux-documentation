---
sidebar_position: 3
title: 开发者快速入门
description: 针对以太坊开发者的 eSpace 快速入门指南
keywords:
  - 快速入门
displayed_sidebar: eSpaceSidebar
---

Conflux eSpace 现在已经支持以太坊的智能合约编写和测试工具。

因为 eSpace 兼容 EVM，您只需要将您平时使用的开发工具指向 Conflux eSpace 的 RPC 提供商即可。

如果您不熟悉以太坊开发，可以先学习基础知识并通过[以太坊官方文档](https://ethereum.org/en/developers/)了解其技术栈。

## 获取 CFX

eSpace 也使用 CFX 作为其原生货币，用于支付部署合约和与网络交互产生的交易费用。

要在 eSpace 上进行开发，我们建议您首先使用 eSpace 测试网。 您需要先从[水龙头](https://efaucet.confluxnetwork.org/)获取一些测试网 CFX。

若您准备将合约部署至 eSpace 主网，但您手上只有 Core Space 的 CFX，您可以选择使用我们的[跨Space桥](../general/tutorials/transferring-funds/transfer-funds-across-spaces.md)转移至eSpace。

## 网络配置

### eSpace 主网

使用下表的配置将您的以太坊工具以连接到 eSpace 主网。

| 网络名称      | Conflux eSpace                                           |
| --------- | -------------------------------------------------------- |
| RPC URL   | [https://evm.confluxrpc.com](https://evm.confluxrpc.com) |
| 链 ID      | 1030                                                     |
| 货币符号      | CFX                                                      |
| 区块浏览器 URL | [https://evm.confluxscan.io](https://evm.confluxscan.io) |

### eSpace 测试网

使用下表的配置将您的以太坊工具以连接到 eSpace 测试网。

| 网络名称      | Conflux eSpace 测试网                                                     |
| --------- | ---------------------------------------------------------------------- |
| RPC URL   | [https://evmtestnet.confluxrpc.com](https://evmtestnet.confluxrpc.com) |
| 链 ID      | 71                                                                     |
| 货币符号      | CFX                                                                    |
| 区块浏览器 URL | [https://evmtestnet.confluxrpc.com](https://evmtestnet.confluxrpc.com) |

## 配置工具

要设置用于验证智能合约部署的工具，请参见[智能合约验证](./tutorials/VerifyContracts.md)。

### Hardhat

修改您的 Hardhat 配置文件 `hardhat.config.ts` 以指向 eSpace 测试网的公共 RPC。

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

使用 Hardhat 部署合约的完整工作流程在[这里](./tutorials/deployContract/hardhatAndFoundry.md)展示。

### Foundry

想要使用 eSpace 测试网的公共 RPC 进行部署，请运行：

```bash
forge create ... --rpc-url=https://evmtestnet.confluxrpc.com --legacy
```

使用 Foundry 部署合约的完整工作流程在[这里](./tutorials/deployContract/hardhatAndFoundry.md)展示

### Remix 网页 IDE

合约编译后，使用 Remix 进行部署的最简单方式是[设置 Metamask ](./UserGuide.md)，然后选择 **Conflux eSpace 测试网络**。

现在，在“部署和运行交易”标签页中，使用“环境”下拉菜单并选择“Injected Provider - MetaMask”。

![](./img/injectedProviderMM.avif)

连接您的钱包并选择 Conflux eSpace 测试网。 您的账户应该会在 Remix 中被自动选择，并且您可以点击“部署”。 Remix 使用的完整工作流程在 [这里](./tutorials/deployContract/remix.md)展示。

### web3.py

:::tip

建议在使用 `web3.py` 之前创建虚拟环境，以避免依赖冲突，例如使用 [venv](https://docs.python.org/3/library/venv.html) 或者 [conda](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#creating-an-environment-with-commands)。

:::

`web3.py` 是用于与以太坊区块链及其生态系统交互的最广泛使用的 Python 接口之一。 可以使用以下命令进行安装：

```bash
pip install web3 # 或 pip3 install web3
```

`web3.py` 也可以用于与 Conflux eSpace 交互。 下面的示例代码展示了如何连接到 Conflux eSpace 测试网端点并检查连接：

```py
>>> from web3 import Web3
>>> w3 = Web3(Web3.HTTPProvider("https://evmtestnet.confluxrpc.com"))
>>> w3.is_connected() 
True # 应该返回 True
```

应当注意的是，`web3.py` 的最新版本会默认为交易填充 `maxFeePerGas` 和 `maxPriorityFeePerGas` 字段，而 Conflux eSpace 只支持 EIP-1559 之前的传统交易类型。 因此，开发者需要在交易中指定 `gas_price` 字段或使用 [gas 价格 API](https://web3py.readthedocs.io/en/stable/gas_price.html)。

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

[Brownie](https://eth-brownie.readthedocs.io/en/stable/) 是一个基于 Python 的开发和测试框架，用于针对以太坊虚拟机（EVM）的智能合约。 将 Conflux eSpace 网络添加到 Brownie 中需要运行以下命令：

```bash
brownie networks add "Conflux eSpace" conflux-espace-main name=Mainnet host=https://evm.confluxrpc.com explorer=https://evm.confluxscan.io chainid=1030
brownie networks add "Conflux eSpace" conflux-espace-test name=Testnet host=https://evmtestnet.confluxrpc.com explorer=https://evmtestnet.confluxscan.io chainid=71
```

要在 eSpace 上进行部署，请使用 --network 选项指定 Conflux 网络。

```bash
brownie run scripts/token.py --network conflux-espace-test
```

`scripts/token.py` 是您希望在 Conflux eSpace 上运行的 Brownie 脚本。 在我们的 [**Brownie 教程**](./tutorials/deployContract/brownie.md)中，我们展示了如何配置一个模板 Brownie 项目以及如何在 Conflux eSpace 上运行 Brownie 脚本。

### ethers.js

在 `ethers` 脚本中设置 eSpace 测试网提供商：

```jsx
import { ethers } from "ethers"

const provider = new ethers.providers.JsonRpcProvider("https://evmtestnet.confluxrpc.com")
```

### scaffold-eth-2

[Scaffold Conflux](https://github.com/conflux-fans/conflux-scaffold) 是 [Scaffold-ETH-2](https://scaffoldeth.io/) 的一个修改版本。

- 我们调整了模板，以便您可以在 Conflux eSpace 上部署合约。
- Conflux Scaffold 使得用户能够快捷地利用前端 react 组件，这些组件通常用于构建 web3 应用。 这些组件包括预制的钱包，能够连接到 Conflux eSpace、Conflux eSpace 测试网、hardhat 等。 它还包括其他组件来显示余额，并接收地址/值输入。
- Scaffold Conflux 提供了与在 hardhat 上构建的智能合约进行交互的接口。 这简化了读取合约、写入合约和监控智能合约发出的事件的过程。
- 您可以访问我们的 [教程](./tutorials/scaffoldCfx/scaffold.md) ，它更加深入地讨论了如何设置 Scaffold Conflux 并使用一些接口/组件。

要使用 Scaffold-eth-2（hardhat）将智能合约部署到 Conflux eSpace，请在部署时指定 Conflux eSpace 网络。

```bash
yarn deploy --network confluxESpace
```

:::note
合约的部署者以及因为部署合约而成为的合约所有者，您可以通过将./packages/hardhat/.env.example 重命名为 ./packages/hardhat/.env 并在 DEPLOYER_PRIVATE_KEY= 中放入您的私钥进行更改。 然而，在默认情况下，将会使用一个“公开”的私钥用于 hardhat 测试目的。
:::

#### 配置前端钱包

要配置您的前端，您需要将钱包默认连接到的网络更改为 Conflux eSpace。 目前，它被设置为连接到 hardhat，因此您可以使用默认的 burner 钱包。 更改以下设置可以将钱包连接切换到 Conflux eSpace。

想要添加网络，请修改 `packages/nextjs/scaffold.config.ts`

将

```jsx
const scaffoldConfig = {
  targetNetworks: [chains.hardhat],
```

修改为

```jsx
const scaffoldConfig = {
  targetNetworks: [chains.confluxESpace],
```

#### 部署到 Vercel

预览应用。 您应该能够通过您的钱包连接到 Conflux eSpace。

```bash
nvm use 18
yarn start
```

一旦您准备好部署您的应用，只需运行以下命令。

```bash
yarn vercel
```
