---
title: 社区常见问题
sidebar_position: 2
displayed_sidebar: generalSidebar
---

# 社区常见问题

### **Do we need to pay attention to the `storageLimit` and `epochHeight` fields in regular transactions?**

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

### **Can the sponsor payment function be tested normally on the test chain?**

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

### **What settings do developers need to make when starting a node?**

你可以在[此处](../run-a-node/)找到所有与节点相关的文档。

### **CFX有查询计算能力的API吗？**

https://www.confluxscan.io/v1/plot?interval=514&limit=10

### **什么是枢轴链切换？**

A pivot chain refers to a chain formed by connecting pivot blocks based on block hashes. When a non-pivot block B in a certain epoch has a subtree heavier than the previous pivot block A, B becomes the pivot block for that epoch. This is a pivot chain switch.

### **How to determine if a pivot chain switch has occurred?**

When the old pivot chain switches to the new pivot chain, the latest mined epoch number will be a value not greater than the last obtained latest mined epoch number.

如下所示，之前的最新纪元是10，此刻的最新纪元是9，表明纪元9的枢纽区块已从9A变为9B，发生了枢轴链切换。

```css
cssCopy code
[1]···[8]---[9A]---[10A] 旧枢轴链
        \
          \
            [9B] 新枢轴链

```

**How can developers monitor?**

1. 启动一个完整节点（归档节点）并启用websocket RPC服务。
2. 使用**`rpc_subscribeEpoch`**订阅**`最新挖掘纪元`**事件。
3. 等待最新挖掘的纪元B，并与之前获得的最新挖掘纪元A进行比较。
4. 如果`B <= A`，则发生了枢轴链切换。
5. 回到步骤3。

**开发者如何同步区块和交易状态？**

If local data needs to be kept up-to-date and accurate for blocks and transactions, then when a pivot chain switch occurs (assuming the latest mined epoch number changes from A to B, and `B <= A`):

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

存储抵押是指在合约中添加新的存储使用时需要抵押相应数量的cfx。 For each storage entry, the last account that writes to this entry is called the owner of this storage entry. The storage collateral fee will be returned to the owner after the storage is released. 每1kb的存储需要1cfx的抵押。

> 更多详细信息，请参考[此部分](../../core/core-space-basics/storage)。

### cfx_getTransactionReceipt返回的GasFee包括哪些费用？ 它包括存储抵押费用吗？

- Gasfee不包括存储费用。 Gasfee = gasUsed * gasPrice, and the gasfee is spent after the transaction is executed.
- storageCollateralized represents the actual storage collateral fee used. The storage collateral fee will be returned when the storage is released.

### In a block, if a transaction has both blockHash and status as null, does it mean it has been processed in another block?

- Generally, yes. This is because the tx was not executed in this block. If a tx is packaged repeatedly, the tx will be executed in the block of the earliest epoch.
- Another situation is that the block containing the transaction has been packaged but not yet executed. Every block is executed 5 seconds after being packaged.

### Can an epoch have no blocks?

No, there will be at least one.

### How does js-conflux-sdk decode function data?

Refer to the API documentation: [link](https://github.com/Conflux-Chain/js-conflux-sdk/blob/master/docs/api.md)

```csharp
transaction = await conflux.getTransactionByHash('0x2055f3287f1a6ce77d91f5dfdf7517a531b3a560fee1265f27dc1ff92314530b');
contract.abi.decodeData(transaction.data)

```

### Can an already deployed contract be replaced? Without creating a new contract?

Contracts cannot be replaced or upgraded; you can only deploy a new one.

### Is there any SDKs for Android?

Android can use java-conflux-sdk.

### What versions of the conflux sdk are available?

You can find all the Conflux SDKs in [THIS](../../core/build/sdks-and-tools/sdks) section

### Is the nonce in a block the same as the nonce in a transaction?

The nonce of a transaction indicates the number of transactions from a specific address, while the nonce of a block refers to the random number used in PoW calculations.

### What are the chainIds for the mainnet and testnet? How to query?

The mainnet is 1029, and the testnet is 1. You can obtain them using the rpc "cfx_getStatus" or the SDK's getStatus method.

### How to view the bootnode data of the node I'm running?

- If it's a testnet or mainnet node, the bootnode list is the bootnodes configuration in the toml configuration file.
- For a local node, it itself is the bootnode (or it doesn't have a bootnode).

### What are the reasons for a transaction not being packaged?

The following conditions can lead to a transaction not being packaged:

1. The balance must satisfy: balance >= value + gas * gasprice + storagelimit/1024
2. The nonce must be consecutive. Only when a transaction with a lower nonce is packaged will a transaction with a higher nonce be packaged.

### How to view the actual fee deducted for each transaction?

Check the gasFee in the transaction receipt.

### Is the epochHeight in Transaction the same as the epochNumber in TransactionReceipt?

The epochHeight in a Transaction is used to specify the epoch range for tx execution as (epochHeight, epochHeight + 10000). The epochNumber in TransactionReceipt indicates the epoch number at which the transaction was executed.

### How to determine if a block was mined by a specific miner? Is the first transaction in a Conflux block also a coinbase transaction, like in Bitcoin?

Conflux doesn't have a coinbase transaction. You can determine the miner using block.miner.

### **What is the transaction `0x2952a64d3afa6d39310c4928860abcd6bc097342dcc1b271b52f7809fd63f228` on the mainnet showing as contract creation, but the returned field `contractCreated` is null? How do you get the address of this contract at this time?**

This is a transaction from the genesis block. The transaction here is quite special. In the future, as long as it is a contract creation, **`contractCreated`** will have the contract's address.

### **What's the difference between a full node and an archive node?**

A full node only saves all block headers and transactions from the most recent era. An archive node will save all block headers and transactions.

### **How to check the reason for transaction failure?**

The **`txExecErrorMsg`** in the transaction receipt provides the error information for the transaction.

### **What are the situations for tx revert?**

Tx revert means the contract execution failed. Contract developers should use **`require`** with an error message where an exception might occur. This way, the contract execution error will be seen in the **`txExecErrorMsg`** of the transaction receipt.

### **What does this error mean? `Failed imported to deferred pool: Tx with same nonce already inserted. To replace it, you need to specify a gas price > 20000000000`**

There is already a transaction with the same nonce. Either wait for it to be packaged or send a new one with the same nonce, but you need to raise the gasPrice.

### **Is there a method in js-conflux-sdk to parse the data in tx?**

First, initialize the contract using abi, then use **`contract.abi.decodeData()`**.

### **Can the logger of the Conflux class in js-conflux-sdk use something other than console?**

Any object that has implemented the methods error, info, and log can be used.

### **If you use a sponsorship contract, does it mean that all users operate the contract, regardless of which method of the contract is called, are they all paid according to a unified standard?**

Yes.

### **Is there any information on the conflux sponsorship mode?**

[Here's the link](../../core/core-space-basics/sponsor-mechanism).

### **Are ERC20/ERC777 still called this way in the Conflux network?**

Both can be used. They are still referred to as ERC20/ERC777, but in some contexts you can find them reffered as CRC20/CRC777.

### **What are the websocket service ports of the official nodes of the mainnet and testnet?**

You can find all the Network Endpoints in the following pages:

- [Core Space Network Endpoints](../../core/conflux_rpcs)
- [eSpace Network Endpoints](../../espace/network-endpoints.md)

### **When `docker pull confluxchain/conflux-rust` prompts "no such file", how to solve it?**

It might be a network issue. You can try setting a registry for docker:

```json

{
  "registry-mirrors": [
    "https://at8ak49f.mirror.aliyuncs.com"
  ],
  "experimental": false,
  "debug": true}

```

### **What is block height?**

A blockchain is a block followed by another block, continuously growing. Block height refers to the distance from this block to the genesis block.

### **What is transaction signing?**

Transaction signing refers to a signature obtained from a transaction through a signing algorithm using a private key. The verifier can obtain the address corresponding to the private key through this signature and transaction information, thereby proving that the transaction was indeed initiated by this account address.

### **What are the measurement units in the conflux system and their conversion relationships?**

The smallest unit in conflux is drip.

- 1cfx = 10^18 drip
- 1gdrip = 10^9 drip

### **What does the error `estimateGasAndColletral` mean? "Cannot estimate: transaction execution failed, all gas will be charged"**

```
Cannot estimate: transaction execution failed, all gas will be charged (execution error: VmError(BadInstruction { instruction: 169 }))
```

Reason: The constructor was invalid when deploying the contract; it is usually caused by forgetting to write the **`to`** address when calling the contract.

### **How do developers start a node?**

你可以在[此处](../run-a-node/)找到所有与节点相关的文档。


### **What is the Transactions Lifecycle?**

You can find allthe details on the Transaction Lifecycle in [THIS](../../general/conflux-basics/transactions/#transaction-lifecycle) section.
