---
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - Stratum protocol
  - solo mining
  - Conflux-Rust
  - mining protocol
  - proof-of-work
  - RPC interface
  - blockchain mining
tags:
  - Stratum Protocol
---

# Conflux-Rust中的Stratum协议

## 设计目标

Rust是开发像Conflux这样的分布式系统的优秀语言，但对于开发矿工程序来说并不是非常理想。 矿工程序通常通过像C/C++这样的语言开发，这些语言可以实现高性能和GPU操作。 因此，我们在Conflux-Rust中设计了一个类Stratum协议，以便外部矿工能够连接到Conflux。

注意，为了保持协议的简单性，这种类Stratum协议的设计目标仅限于单独挖矿，也就是说，Conflux-Rust连接的是本地或远程机器上属于同一实体的矿工进程。 它不是设计来作为矿池服务器运行的。 对于那些希望运行矿池的人来说，建议构建自己的定制代理服务器来连接Conflux-Rust。

## 一般工作流程

在一个外部矿工通过其Stratum端口（默认32525）连接到Conflux-Rust的场景中，以下是典型的工作流程。

1. 矿工通过TCP连接到Stratum端口。 Conflux-Rust必须以启用Stratum的配置运行。

2. 矿工通过 TCP 流发送 `mining.subscribe` RPC 调用。 它向Conflux-Rust通报矿工名称。 `mining.subscribe` 还执行基于密码的基本认证，其中密码可以在 Conflux-Rust 的配置文件中设置。

3. 成功订阅后，Conflux-Rust 将继续通过 TCP 流向矿工发送 `mining.notify` RPC 调用。 每个 `mining.notify` 对应于一个新的工作量证明（PoW）问题，供矿工解决。 矿工预期将处理最后接收到的工作。

4. 每当矿工解决了一个 PoW 问题，它就通过调用 `mining.submit` RPC 调用将解决方案（即 nonce）返回给 Conflux-Rust。

5. 矿工可以在此过程中随时断开连接以退出。

## RPC接口

### 服务器端RPC

#### mining.subscribe

开始订阅来自stratum服务器的工作量证明通知

##### 参数

1. WORKER_ID，字符串 - 矿工的名称
2. Secret, 空或 32 字节，对应于配置中密码的 keccak 结果的密码。 如果未启用密码，则为空。

##### 返回值

`Bool` - 如果成功，则为`true`；如果不成功，则为 `false`。

##### 示例

```
// Request
'{"jsonrpc":"2.0","method":"mining.subscribe","params":["cfxmine", ""],"id":1}'

// Response
{
  "jsonrpc": "2.0",
  "result": "true",
  "id": 1
}
```

---

#### mining.submit

向stratum服务器提交一个PoW答案

##### 参数

1. WORKER_ID，字符串 - 矿工的名称
2. JOB_ID, hex-string - 工作的标识符，通常与 PoW 问题的哈希相同。
3. NONCE，32字节的十六进制字符串 - PoW问题的nonce答案
4. HASH，32字节的十六进制字符串 - 解决的PoW问题的哈希值。

##### 返回值

`Array` - 如果成功，则为包含 `true` 的单个元素；如果不成功，第一个元素将是 `false`，第二个元素将以字符串形式解释原因。

##### 示例

```
// Request
'{"jsonrpc":"2.0","method":"mining.submit","params":["cfxmine", "0x2106e1162d1199483fa010bcaa7d4f05b23b85d456b4a7089d787ae2e880deaf","0x21b49d385865819a171ed8cd9d9f80acc468e501f3486d3600000000000c786c","0x2106e1162d1199483fa010bcaa7d4f05b23b85d456b4a7089d787ae2e880deaf"],"id":1}'

// Response
{
  "jsonrpc": "2.0",
  "result": ["true"],
  "id": 1
}

{
  "jsonrpc": "2.0",
  "result": ["false", "invlaid nonce"],
  "id": 1
}
```

---

### 客户端通知

注意，尽管服务器通过类似 RPC 的请求通知挖矿客户端，它并不是一个真正的 RPC——它不期望客户端返回任何响应。 相反，客户端将只更新它工作的 PoW 问题，并在找到解决方案时提交。

#### mining.notify

Notify the client about a new PoW problem.

##### 参数

1. JOB_ID, hex-string - 工作的标识符。
2. HASH, 32 字节 - PoW 问题的哈希。
3. BOUNDARY, U256 - 问题的难度边界。 对于 nonce 来说，结果哈希必须小于 BOUNDARY。

##### 示例

```
// Request
'{"jsonrpc":"2.0","method":"mining.notify","params":["0x4e08db21d43a7696afa3d00ed948568210f3ab3f34673f1d17198625ec175a9c","0x4e08db21d43a7696afa3d00ed948568210f3ab3f34673f1d17198625ec175a9c","0x1a4e3422948568210f3ab3f34673f1d17198625ec175a9c"],"id":3}'

---
```
