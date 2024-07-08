---
id: cli_sub_commands
title: 命令行子命令
sidebar_position: 8
keywords:
  - conflux
  - cli
  - sdk
displayed_sidebar: generalSidebar
---

Conflux CLI子命令是一个命令行接口集，允许你与本地或远程Conflux节点进行交互

## 管理账户（Account）
`account`的若干子命令允许你在本地机器上管理账户。

### new
在本地机器上创建一个新账号。
#### 用法
```text
$ ./conflux account new --help
为一个给定的 --chain （默认值为conflux）创建一个新账户（及其关联的密钥）。

用法:
    conflux account new [OPTIONS] 

标志:
    -h, --help       打印帮助信息
    -V, --version    打印版本信息

选项:
    --keys-iterations <NUM>    指定从密码派成密钥时要使用的迭代次数（次数越多越安全） [默认值: 10240]
    --password <FILE>          提供包含解锁账户密码的文件 前导和尾随的空格都会被删除。
```
#### 示例
`./conflux account new`

### list
列出本地机器上的所有账户。
#### 用法
```text
$ ./conflux account list --help
列出一个给定的 --chain （默认值为conflux) 的现有账户

用法:
    conflux account list

标志:
    -h, --help       打印帮助信息
    -V, --version    打印版本信息
```
#### 示例
`./conflux account list`

### import
从JSON UTC keystore文件中导入账户。
#### 用法
```text
$ ./conflux account import --help
从JSON UTC keystore文件导入账户到指定的 --chain （默认为conflux）

用法:
    conflux account import --import-path <PATH>...

标志:
    -h, --help       打印帮助信息
    -V, --version    打印版本信息

选项:
    --import-path <PATH>...    一个要导入的文件路径列表
```
#### 示例
`./conflux account import --import-path ./keystores`

## 公共应用程序编程接口
公共应用程序编程接口（简称公共API）允许你使用JSON-RPC 协议中的 HTTP 连接与本地或远程Conflux节点进行交互。 所有公共API都在`rpc`子命令下, 并通过默认的`url`选项访问本地机器上的JSON-RPC接口。

```text
选项:
   --url <url>    URL of RPC server [默认: http://localhost:12539]
```
要访问远程Conflux 节点的JSON-RPC的API, 请指定正确的`--url`选项 (例如 http://10.1.5.6:12537)。 出于安全考虑，默认情况下JSON-RPC仅可本地访问。 你可以在***default.toml***文件中配置`jsonrpc_http_port` 来手动启用远程访问。

```toml
# jsonrpc_tcp_port=12536
jsonrpc_http_port=12537
# jsonrpc_local_tcp_port=12538
jsonrpc_local_http_port=12539
```
所有可用的命令如下：
```text
$ ./conflux rpc --help
基于RPC的子命令，用于查询区块链信息和发送交易

用法:
    conflux rpc [OPTIONS] <SUBCOMMAND>

标志:
    -h, --help       打印帮助信息
    -V, --version    打印版本信息

选项:
    --url <url>    RPC服务器的URL [默认值: http://localhost:12539]

子命令:
    balance                  获取指定账户的余额
    best-block-hash          获取最新区块哈希
    block-by-epoch          根据epoch获取区块
    block-by-hash            根据哈希获取区块
    block-with-assumption    假设使用主链，根据哈希获取区块
    blocks                   获取指定epoch的区块
    call                     立即执行新的消息调用，无需创建交易
    code                     获取指定合约的字节码
    local                    本地子命令 (需要配置jsonrpc_local_http_port)
    epoch                    获取epoch号
    estimate-gas             立即执行调用请求，无需创建交易并返回gas估算值
    help                    打印此消息或给定子命令的帮助
    nonce                    获取指定账户的nonce 
    price                   获取最近的平均gas价格
    receipt                  根据交易哈希获取收据 
    send                     发送签署的交易并返回其哈希
    tx                       根据哈希获取交易
```

### 获取账户余额
`./conflux rpc balance --address cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg`

### 获取账户的nonce
`./conflux rpc nonce --address cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg`

### 获取当前的epoch号
`./conflux rpc epoch`

### 获取区块
- 获取最佳区块哈希: `./conflux rpc best-block-hash``</li>
<li>按epoch获取区块: <code>./conflux rpc block-by-epoch --epoch latest_state`
- 根据区块高度获取区块: `./conflux rpc block-by-epoch --epoch 0x10`
- 获取epoch中的区块: `./conflux rpc blocks --epoch latest_state`

### 获取交易
`./conflux rpc tx --hash 0x718532fe76dbd8c4208c6c5a79588db35c0bf97e7d8a0faa5988ba66ad88b74c`

### 获取收据
`./conflux rpc receipt --hash 0x718532fe76dbd8c4208c6c5a79588db35c0bf97e7d8a0faa5988ba66ad88b74c`

### 发送已签名的交易
发送一个以十六进制格式编码的已签名交易。 通常，此API用JavaScript API发送已编码的交易。 若要使用CLI发送交易，建议使用私有API[发送交易](#send-transaction)。

`./conflux rpc send --raw-bytes 0x...`

### 其他
- 获取合约代码: `./conflux rpc code --address cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp`
- 获取最近的平均gas价格 : `./conflux rpc price`

## 私有应用程序编程接口
私有应用程序编程接口(简称私有API)允许你**仅仅**使用JSON-RPC协议中的HTTP连接与本地Conflux节点进行交互。 用户使用私有APIs来管理本地Conflux节点，要求在 ***default.toml*** 配置文件中配置`jsonrpc_local_http_port` 。

此外，私有API还帮助开发人员调试、测试和监视Conflux节点的运行时的状态和行为。

所有的私有API都在本地`local`子命令下，可以通过默认的`url`选项访问本地机器上的JSON-RPC API。

```text
$ ./conflux rpc local --help
调试子命令(需要配置 jsonrpc_local_http_port )

用法:
    conflux rpc local [选项] <SUBCOMMAND>

标志:
    -h, --help       打印帮助信息
    -V, --version    打印版本信息

选项:
        --url <url>    RPC 服务器的URL [默认值: http://localhost:12539]

子命令:
    consensus-graph-state    获取共识图状态
    help                     打印此消息或者给定子命令的帮助信息
    net                      网络子命令
    send                     发送交易并返回其哈希
    sync-phase              获取当前同步阶段
    test                     获取子命令（仅用于测试目的）
    txpool                   交易池子命令
```
### net
`net` 子命令帮助你检查 P2P 网络状态。

#### 示例
- 列出所有已连接的P2P节点: `./conflux rpc local net session`
- 列出单个P2P节点: `./conflux rpc local net session --id <node_id>`
- 检查网络出口: `./conflux rpc local net throttling`

### txpool
`txpool` 子命令帮助你检查交易池.

#### 示例
- 列出交易池状态: `./conflux rpc local txpool status`
- 列出交易的详细信息: `./conflux rpc local txpool content`
- 列出交易摘要: `./conflux rpc local txpool inspect`
- 检查一个交易的细节: `./conflux rpc local txpool inspect-one --hash <tx_hash>`

### sync-phase
获取本地Conflux节点的同步阶段。

`./conflux rpc local sync-phase`

### send
向本地Conflux节点发送一个交易。

#### 用法
```text
$ ./conflux rpc local send --help
发送交易并返回其哈希值

用法:
    conflux rpc local send [OPTIONS] --from <ADDRESS> --value <HEX>

标志:
    -h, --help       打印帮助信息。
    -V, --version    打印版本信息。

选项:
    --data <HEX>           方法签名和编码参数的哈希
    --from <ADDRESS>       交易发起地址
    --gas <HEX>            用于交易执行的Gas [默认值: 0x5208]
    --gas-price <HEX>      交易gas价格 [默认值: 0x2540BE400]
    sync-phase--nonce <HEX>   交易 nonce
    --to <ADDRESS>         交易目标地址(为空则创建合约)
    --url <url>            RPC服务器的URL [默认值: http://localhost:12537]
    --value <HEX>          与此交易一起发送的value
```

#### 示例
从 Alice 转移 5 Drip (1 CFX = 10^18 Drip) 给Bob。 请注意，Alice 的地址必须存在于本地机器上，否则请首先为 Alice [创建](#new)一个账户。

`./conflux rpc local send --from <alice_address> --to <bob_address> --value 0x5 --password 123456`

Alice使用300万gas创建了一个合约。 你可以使用***合约编译工具solc*** 编译合约来获取字节码。

`./conflux rpc local send --from <alice_address> --value 0x0 --gas 0x2DC6C0 --data <HEX_contract_bytecodes> --password 123456`
