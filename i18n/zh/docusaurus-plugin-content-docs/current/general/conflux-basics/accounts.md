---
sidebar_position: 10
title: 账户和地址
displayed_sidebar: generalSidebar
keyworks:
  - Conflux-Network
  - accounts
  - addresses
  - blockchain
  - distributed-ledger
  - Proof-of-Work
  - Proof-of-Stake
  - hybrid-consensus
  - 树图
  - GHAST
  - transaction-validation
tags:
  - 账户
---

## 概览

Accounts in Conflux can be compared to "bank accounts", as they store CFX. 用户可以创建和管理他们的账户，存入CFX，并发送交易。 账户地址是一个标识账户的唯一的字符串，用于从Conflux VM的巨大表中检索账户信息，该表存储了账户内容和余额。

:::note

The account implementation, including the account content and address computing rule is slightly different in [core space](../../core/core-space-basics/accounts.md) and [espace](../../espace/build/accounts.md).

:::

## 地址

Account addresses, like bank account numbers, identify accounts and can be examined on [ConfluxScan](https://confluxscan.io). However, the address format differs between [core space](../../core/core-space-basics/addresses.md) and espace. Core space使用CIP-37编码方案，而espace使用与以太坊相同的格式。

下面是一些示例，显示了两个空间中的地址格式：

``` 
// espace address
0x1e97870f263700f46aa00d967821199b9bc5a120
// Core Space Mainnet address
cfx:aatktb2te25ub7dmyag3p8bbdgr31vrbeackztm2rj
// Core Space Testnet address
cfxtest:aatktb2te25ub7dmyag3p8bbdgr31vrbeajcg9pwkc
```

## 账户类型

有两种账户类型，外部拥有的账户（externally-owned account, EOA）和合约账户。 EOA由拥有该账户私钥的任何人控制，而合约账户是部署在网络上的智能合约，由其代码控制。

### 外部账户和公私钥对

EOA由一对加密密钥组成：一个公钥和一个私钥。 私钥是一个64个十六进制字符的字符串，用于签署交易并掌管与该账户相关的资金。 公钥密码学确保交易不会被伪造，并且发送者可以证明交易请求的真实性。 这可以防止恶意行为者广播假交易。

这是一个作为示例的私钥：

```
c5eca1e5de819725cf7c6764f4bba7eea95549a40275b21eaff91554c59bef90
```

公钥是通过 [椭圆曲线加密算法](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm)从私钥计算出来的

```
0xa82d8039606ea598798ae1c995e2dbad90561d67ffa9555f96e0bc3dbc38c32aa1ede8ab17a137b8515b94b158b49a746c77abc432c2677cb0a6d3240be98872
```

EOA的地址从其公钥计算出来：

```
// espace address, encoded in EIP-55 checksum format
0x7058Ce27AF14B05943B879E530Df642867dFcf57
// core space mainnet address (encoded in CIP-37 format)
cfx:aajfvxvhz6mna0md1b68mpg9puygt18tm6nynadnf6
```

### 智能合约账户

[智能合约](./contracts.md)也有地址，用户可以通过发送交易与它们交互。 合约地址在合约部署时确定，计算规则在core space和espace之间有所不同。

## Comparison of Different Account Types

### 相似之处

- 它们都可以接受、持有和发送CFX。
- 它们都可以与网络中的智能合约交互

### 差异

#### 外部账户

- 创建外部账户没有成本，例如CFX或其他资源
- 它们可以向其他人发送交易
- Transactions between external accounts can only be CFX or token transactions

#### 智能合约

- 创建智能合约有成本，因为它使用了网络的存储和计算资源
- Transactions can only be sent to other contracts as a response to a received transaction
- 从外部账户发送到合约账户的交易可以触发智能合约的代码执行许多不同的操作，例如代币转移，创建新合约等。

## 相关主题

- [Ethereum Accounts](https://ethereum.org/en/developers/docs/accounts/)
- [Core space accounts](../../core/core-space-basics/accounts.md)
- [espace accounts](../../espace/build/accounts.md)
- [Core space addresses](../../core/core-space-basics/addresses.md)
