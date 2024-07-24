---
sidebar_position: 2
title: 账户
displayed_sidebar: coreSidebar
---

:::note

本页面是为了提供有关 CORE SPACE ACCOUNTS 的信息。 请参阅 [General-Accounts](../../general/conflux-basics/accounts.md) 以获取账户概念的整体介绍。

:::

## 账户地址

账户由其地址来标识。 欲了解更多信息，请参阅 [地址](./addresses.md)

## 账户状态

### 查询

账户状态可以使用 [cfx_getAccount` RPC](../build/json-rpc/cfx-namespace.md#cfx_getaccount) 查询。

```json
// Request
curl --data '{"jsonrpc":"2.0","method":"cfx_getAccount","params":["cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp", "latest_state"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": {
    "accumulatedInterestReturn": "0x0",
    "admin": "CFX:TYPE.USER:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG",
    "balance": "0x0",
    "codeHash": "0x45fed62dd2b7c5ed76a63628ddc811e69bb5770cf31dd55647ca219aaee5434f",
    "collateralForStorage": "0x0",
    "nonce": "0x1",
    "stakingBalance": "0x0"
  },
  "id": 1
}
```

### 详细解释

Conflux 的全局状态由各个账户状态组成，每个账户状态是一个地址-状态对（键值对）。

Conflux 账户状态包括五个部分：

- `Basic state`是账户的基本状态。
- `Storage state` 是一个键/值数据库或存储空间，可以用于存储智能合约的自定义状态或数据。
- `Code information` 是智能合约账户的代码信息。 它包括合约代码和支付代码占用存储空间费用的账户`address`。
- `Staking deposit list` 是账户的质押操作列表（它将在下一次硬分叉中被移除）。
- `Staking vote lock list` 是账户为了参与 DAO 投票而执行的锁定操作列表。

账户的基本状态由以下八个字段组成：

- `Nonce` 是一个计数器，用于跟踪一个账户发送的交易数量。 它也用于确保每个交易只能被执行一次。 对于合约账户，这个值表示`该合约创建的合约数量`。
- `Balance` 是地址中 CFX 的数量，单位是 Drip。 Drip 是 CFX 的最小单位，其中 1CFX=10e18 Drip。
- `CodeHash` 是合约账户代码的哈希值。 用户可以引用合约代码，合约创建后，代码不能被修改。 当合约收到消息调用时，代码将被执行。 对于外部账户，codeHash 是一个空字符串的哈希。
- `StakingBalance` 是已质押的余额。 同样，单位是 Drip。
- `Admin` 是`合约账户`在 AdminControl 内置合约中记录的管理员地址。 默认情况下，合约管理员在合约创建时被设置为部署该合约的账户。 管理员可以通过内部合约 AdminControl 销毁它管理的合约，或者将管理员角色转给另一个账户。 外部账户的管理员地址是它自己。
- `SponsorInfo` 是合约赞助者的信息。 它包括`gas 的赞助者`、`存储抵押的赞助者`、`赞助的 gas 限制`、` gas 的赞助余额`和`存储抵押的赞助余额`。
- `StorageCollateral` 是用于使用存储空间而质押的 Drip 数量。
- `AccumulatedInterestReturn` 是账户从质押中获得的累积奖励金额。 它的单位是 Drip。 从 Conflux 2.0 开始，用户必须参与 PoS 才能获得奖励。

关于`账户`的更多细节，请参考 [Conflux 协议规范](https://www.confluxnetwork.org/files/Conflux_Protocol_Specification.pdf)中的账户部分。
