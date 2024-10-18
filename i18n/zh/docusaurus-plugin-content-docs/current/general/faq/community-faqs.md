---
title: 社区常见问题
sidebar_position: 2
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - 常见问题解答
  - community questions
  - storageLimit
  - epochHeight
  - transaction nonce
  - ExceedStorageLimit error
  - keystore format
  - node synchronization
  - sponsor payment
  - CFX token
  - OpenZeppelin
  - testnet faucet
  - 枢轴链
  - base fee
  - 全节点
  - 归档节点
  - transaction failure
  - tx revert
  - websocket service
  - docker
  - block height
  - transaction signing
  - gas units
  - EVM opcodes
  - transaction lifecycle
---

# 社区常见问题

### **关于常规交易中的`storageLimit`和`epochHeight`字段，我们需要注意什么？**

- 在调用合约时，SDK会根据**`cfx_estmastGasAndCollateral`**自动设置**`storageLimit`**，根据**`cfx_getEpochNumber`**自动设置**`epochHeight`**。
- 在转移CFX时，**`storageLimit`**自动设置为0，**`epochHeight`**设置为当前纪元号。

### **我想一次发送多个交易，但没有方法设置nonce。 我该如何解决？**

你需要自己维护nonce，每个交易加1。

### **发送交易时出现“ExceedStorageLimit”错误是什么意思？**

**`storagelimit`**值设置得比实际需要的值低。

### **如何将私钥转换为keystore格式？**

- 在**`go-conflux-sdk`**中，使用**`AccountManager.ImportKey`**将私钥导入keystore文件。
- 在**`js-conflux-sdk`**中，使用**`sign.encrypt`**基于私钥生成keystore对象。

### **为什么节点在更改配置后需要重新同步数据？**

重启节点程序不会从头开始同步数据。 相反，它会从数据库恢复数据，并从上一个检查点开始同步。 这是因为最后一个检查点的数据存储在内存中，当程序关闭时，内存中的数据会丢失，使得看起来数据正在被重新同步。

### **代付功能是否可以在测试链上正常测试？**

可以。

### **CFX是ERC777合约吗？**

CFX不是合约代币。 CFX相当于以太坊的ETH。

### **Conflux支持以太坊库OpenZeppelin吗？**

支持。 你可以直接引用它。 但请注意，Conflux链上的ERC1820合约地址与以太坊不同。 在Conflux上，ERC1820合约地址是：0x88887ed889e776bcbe2f0f9932ecfabcdfcd1820。

### **测试网水龙头在哪里？**

- 要接收CFX测试代币，你可以直接从水龙头门户网站获取。
    - 核心空间测试网水龙头：https://faucet.confluxnetwork.org/
    - eSpace测试网水龙头：https://efaucet.confluxnetwork.org/
    - 主网水龙头：https://conflux-faucets.com/

### **为什么当我使用`latest_confirmed`获取纪元时，值有时会显得较小？**

这可能发生在网络连接不佳的情况下，主要是由于高区块同步延迟造成的。

### **开发者在启动节点时需要进行什么设置？**

你可以在[此处](../run-a-node/)找到所有与节点相关的文档。

### **CFX有查询计算能力的API吗？**

https://www.confluxscan.io/v1/plot?interval=514&limit=10

### **什么是枢轴链切换？**

枢轴链指的是根据区块哈希连接主区块形成的链。 当某个纪元中的非主区块B的子树比先前的主区块A更重时，B成为该纪元的主区块。 这就是枢轴链切换。

### **如何确定枢轴链切换是否发生？**

当旧的枢轴链切换到新的枢轴链时，最新挖掘的纪元号将是不大于上次获得的最新挖掘纪元号的值。

如下所示，之前的最新纪元是10，此刻的最新纪元是9，表明纪元9的枢纽区块已从9A变为9B，发生了枢轴链切换。

```css
cssCopy code
[1]···[8]---[9A]---[10A] 旧枢轴链
        \
          \
            [9B] 新枢轴链

```

**开发者如何监控？**

1. 启动一个完整节点（归档节点）并启用websocket RPC服务。
2. 使用**`rpc_subscribeEpoch`**订阅**`最新挖掘纪元`**事件。
3. 等待最新挖掘的纪元B，并与之前获得的最新挖掘纪元A进行比较。
4. 如果`B <= A`，则发生了枢轴链切换。
5. 回到步骤3。

**开发者如何同步区块和交易状态？**

如果需要保持本地数据对区块和交易的最新和准确状态，那么当枢轴链切换发生时（假设最新挖掘纪元号从A变为B，且`B <= A`）：

- 假设在最新挖掘纪元号为A时获得的最新状态纪元号为A'。
- 假设在最新挖掘纪元号为B时获得的最新状态纪元号为B'。
1. 如果B > A'，更新(A', B']（即，这种情况不会影响已执行的区块和交易，正常处理）。

```css

-----A'------A
--------B'-B

```

1. 如果`B <= A'`，删除[B, A']之间的数据。

```css

-----A'------A
----B

```

1. 更新[B', B]。
2. 回到步骤1。

希望这个诠释能帮助您更好地理解内容！ If you have any further questions or need clarification on any points, please let me know.

### 什么是存储抵押，它是如何计算的？ For example, how many drips are required for 1kb storage?

存储抵押是指在合约中添加新的存储使用时需要抵押相应数量的cfx。 对于每个存储条目，最后写入此条目的账户称为此存储条目的拥有者。 The storage collateral fee will be returned to the owner after the storage is released. 每1kb的存储需要1cfx的抵押。

> 更多详细信息，请参考[此部分](../../core/core-space-basics/storage)。

### cfx_getTransactionReceipt返回的GasFee包括哪些费用？ 它包括存储抵押费用吗？

- Gasfee不包括存储费用。 Gasfee = gasUsed * gasPrice，交易执行后gasfee被消耗。
- storageCollateralized代表实际使用的存储抵押费用。 存储抵押费用将在释放存储时返还。

### In a block, if a transaction has both blockHash and status as null, does it mean it has been processed in another block?

- 通常是的。 这是因为该交易没有在这个区块中执行。 如果一个交易被重复打包，交易将在最早纪元的区块中执行。
- 另一种情况是包含交易的区块已被打包但尚未执行。 每个区块在打包后5秒钟执行。

### 一个纪元内是否可能没有区块？

不会，至少会有一个区块。

### js-conflux-sdk如何解码函数数据？

请参考[API文档](https://github.com/Conflux-Chain/js-conflux-sdk/blob/master/docs/api.md)：

```csharp
transaction = await conflux.getTransactionByHash('0x2055f3287f1a6ce77d91f5dfdf7517a531b3a560fee1265f27dc1ff92314530b');
contract.abi.decodeData(transaction.data)

```

### 已部署的合约能否被替换， 而不是创建新合约？

合约不能被替换或升级；只能部署新的合约。

### 有没有适用于安卓的SDK？

安卓可以使用java-conflux-sdk。

### conflux sdk有哪些版本可用？

所有Conflux SDK的信息可以在[这里](../../core/build/sdks-and-tools/sdks)找到。

### 区块中的nonce与交易中的nonce是否相同？

交易的nonce表示特定地址发出的交易数量，而区块的nonce指的是在PoW计算中使用的随机数。

### What are the chainIds for the mainnet and testnet? 如何查询？

主网是1029，测试网是1。 可以使用rpc "cfx_getStatus" 或 SDK 的getStatus方法获取。

### 如何查看我正在运行的节点的启动节点数据？

- 如果是测试网或主网节点，启动节点列表是toml配置文件中的bootnodes配置。
- 对于本地节点，它本身就是启动节点（或者没有启动节点）。

### 交易不被打包的原因有哪些？

以下情况可能导致交易不被打包：

1. 余额必须满足：balance >= value + gas * gasprice + storagelimit/1024 Nonce必须连续。
2. Nonce必须连续。 只有当低nonce的交易被打包后，更高nonce的交易才会被打包。

### 如何查看每笔交易扣除的实际费用？

检查交易收据中的gasFee。

### 交易中的epochHeight是否与TransactionReceipt中的epochNumber相同？

交易中的epochHeight用于指定交易执行的纪元范围为(epochHeight, epochHeight + 10000)。 TransactionReceipt中的epochNumber指示执行交易的纪元号。

### 如何确定某个特定矿工是否挖掘了一个区块？ Conflux区块中的第一笔交易是否也像比特币中的coinbase交易？

Conflux没有coinbase交易。 可以使用block.miner确定矿工。

### **主网上显示为合约创建的交易`0x2952a64d3afa6d39310c4928860abcd6bc097342dcc1b271b52f7809fd63f228`，但返回的`contractCreated`字段为null？ 此时如何获取这个合约的地址？**

这是创世区块的交易。 这里的交易非常特殊。 未来只要是合约创建，**`contractCreated`**就会有合约地址。

### **全节点与归档节点有什么区别？**

全节点只保存最近一个时代的所有区块头和交易。 归档节点将保存所有区块头和交易。

### **如何检查交易失败的原因？**

交易收据中的**`txExecErrorMsg`**提供了交易的错误信息。

### **交易回退的情况有哪些？**

交易回退意味着合约执行失败。 合约开发者应该在可能发生异常的地方使用带有错误消息的**`require`**。 这样，交易收据的**`txExecErrorMsg`**中就会看到合约执行错误。

### **这个错误是什么意思？ `导入到延迟池失败：已插入具有相同nonce的交易。 要替换它，您需要指定的gas price > 20000000000`**

已经有一个具有相同nonce的交易。 要么等待它被打包，要么发送一个新的具有相同nonce的交易，但需要提高gasPrice。

### **js-conflux-sdk中是否有方法解析tx中的数据？**

首先，使用abi初始化合约，然后使用**`contract.abi.decodeData()`**。

### **Can the logger of the Conflux class in js-conflux-sdk use something other than console?**

Any object that has implemented the methods error, info, and log can be used.

### **If you use a sponsorship contract, does it mean that all users operate the contract, regardless of which method of the contract is called, are they all paid according to a unified standard?**

是。

### **有关于conflux代付模式的更多信息吗？**

[这里是链接。](../../core/core-space-basics/sponsor-mechanism)

### **在Conflux网络中，ERC20/ERC777是否仍以此方式命名？**

两者都可以使用。 它们仍被称为ERC20/ERC777，但在某些情况下，你也可以看到它们被称为CRC20/CRC777。

### **主网和测试网的官方节点的websocket服务端口是什么？**

您可以在以下页面找到所有网络端点：

- [Core Space 网络端点](../../core/conflux_rpcs)
- [eSpace网络端点](../../espace/network-endpoints.md)

### **当`docker pull confluxchain/conflux-rust`提示“no such file”时，如何解决？**

可能是网络问题。 你可以尝试为docker设置一个镜像：

```json

{
  "registry-mirrors": [
    "https://at8ak49f.mirror.aliyuncs.com"
  ],
  "experimental": false,
  "debug": true
}

```

### **什么是区块高度？**

区块链是一个接一个的区块，不断增长。 区块高度指的是从这个区块到创世区块的距离。

### **什么是交易签名？**

交易签名是指使用私钥通过签名算法从交易中获得的签名。 验证者可以通过此签名和交易信息获得对应私钥的地址，从而证明交易确实是由该账户地址发起的。

### **Conflux系统中的计量单位及其转换关系是什么？**

Conflux中最小的单位是drip。

- 1cfx = 10^18 drip
- 1gdrip = 10^9 drip

### **`estimateGasAndColletral`错误是什么意思？ "Cannot estimate: transaction execution failed, all gas will be charged"**

```
无法估计：交易执行失败，所有燃气将被收取（执行错误：VmError(BadInstruction { instruction: 169 }））
```

原因：部署合约时构造函数无效；通常是由于在调用合约时忘记写入**`to`**地址引起的。

### **开发者如何启动节点？**

你可以在[此处](../run-a-node/)找到所有与节点相关的文档。


### **交易生命周期是什么？**

您可以在[此部分](../../general/conflux-basics/transactions/#transaction-lifecycle)找到关于交易生命周期的所有细节。
