---
sidebar_position: 5
title: Glossary
---

## 账户

Conflux的全局状态是用一个账户模型来描述的，基本的存储组件称为账户。 每一个能够与Conflux世界交互的参与者，无论是人还是实体，都有其必要的信息以[地址](#address)和相应状态的键/值对的形式存储在一个账户α中。 详细信息请参考[general-accounts](./accounts.md)。

## 地址

地址是[账户](#account)的标识符。 不同Conflux[空间](./spaces.md)中的地址格式不同。 例如：

``` 
// espace address
0x1e97870f263700f46aa00d967821199b9bc5a120
// Core Space Mainnet address
cfx:aatktb2te25ub7dmyag3p8bbdgr31vrbeackztm2rj
// Core Space Testnet address
cfxtest:aatktb2te25ub7dmyag3p8bbdgr31vrbeajcg9pwkc
```

详细信息请参考[general-address](./accounts.md#address)、[core-address](../../core/learn/core-space-basics/addresses.md)、[espace-address](../../espace/learn/accounts.md#mapped-addresses-in-cross-space-operations)。

## CFX

为了激励Conflux网络的维护和向用户收取资源消耗费用，Conflux有一种原生代币，Conflux币，简称为CFX。 The smallest subdenomination is denoted by Drip, in which all values processed in Conflux are integers. 一个Conflux定义为10^18 Drip。 Conflux常用的子单位如下：

| Multiplier (in Drip) |     Name     |
| -------------------- |:------------:|
| 10^0                 |     Drip     |
| 10^9                 |    GDrip     |
| 10^12                |     uCFX     |
| 10^18                | Conflux(CFX) |

作为Conflux网络的原生代币，CFX在系统稳定性方面发挥着非常重要的作用
    - 它作为PoW和PoS共识的奖励
    - 每笔交易的交易费
    - DAO投票
    - ...

关于CFX的创世创建、分配和释放的更多信息，请参考：

- [经济白皮书](https://confluxnetwork.org/files/Conflux_Economic_Paper_20201230.pdf)
- [CFX代币在Conflux网络中的作用](https://medium.com/conflux-network/the-role-of-the-cfx-token-in-the-conflux-network-5a56c2b43bb0)
- [链上DAO投票链参数](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-94.md)
- [经济学](./economics.md)

## chainId & networkId
`chainId`是一个数字，表示一笔交易打算在哪里执行。 它用于防止交易重放攻击。 Conflux的chainId是一个常数，目前为：

* mainnet: `1029`
* testnet: `1`

`networkId`用于在网络层区分不同的区块链。 目前Conflux主网/测试网的`networkId`与`chainId`相同。 你可以从`cfx_getStatus` RPC方法中获取这两个值。

## 内部交易

区块链中的内部交易指的是智能合约内部的价值转移或操作。 内部交易是由外部交易触发的，可以涉及转移代币、创建新代币、执行函数调用或与其他智能合约交互等操作。 这些交易不会单独记录在区块链上。 [ConfluxScan](https://confluxscan.io)和[trace JSON-RPC API](../../core/build/json-rpc/trace-namespace.md)可以跟踪和显示内部交易，以便进行分析和可视化。

相关链接:

- [trace JSON-RPC API](../../core/build/json-rpc/trace-namespace.md)

## 空间（spaces）

在Conflux v2.0（Hydra）升级中，引入了一种名为“Spaces”的新特性。 Spaces是一种在原始Conflux网络上虚拟创建子链的方式，称为**`eSpace`**。  Core Space指的是原始Conflux网络，而eSpace指的是在Core Space网络之上运行的虚拟化以太坊链。 The two spaces are logically independent of each other and do not affect each other.

详细信息请参考[spaces](./spaces.md)。

## 交易

Conflux交易是由一个拥有Conflux账户的外部参与者组成的单个指令，该指令使用发送者账户的私钥进行密码学签名，以防止交易伪造。 一笔交易可以涉及简单的CFX（Conflux的本地货币）转账、代币（如ERC20或ERC721）转账、新智能合约的部署或现有智能合约上的函数执行。 交易是在区块链上存储或更新数据的唯一方式。

详细信息请参考[transactions](./transactions.md)。
