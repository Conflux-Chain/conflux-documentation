---
title: Community FAQs
sidebar_position: 2
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - FAQs
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
  - cadena pivote
  - base fee
  - full node
  - archive node
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

# Community FAQs

### **Do we need to pay attention to the `storageLimit` and `epochHeight` fields in regular transactions?**

- When calling a contract, the SDK will automatically set **`storageLimit`** based on **`cfx_estmastGasAndCollateral`** and **`epochHeight`** based on **`cfx_getEpochNumber`**.
- When transferring CFX, **`storageLimit`** is automatically set to 0, and **`epochHeight`** is set to the current epoch number.

### **I want to send multiple transactions at once, but there's no method to set nonce. How can I solve this?**

You need to maintain the nonce yourself, adding one for each transaction.

### **What does the error "ExceedStorageLimit" mean when sending a transaction?**

The **`storagelimit`** value is set lower than the actual required value.

### **How do I convert a private key into keystore format?**

- In **`go-conflux-sdk`**, use **`AccountManager.ImportKey`** to import a private key into a keystore file.
- In **`js-conflux-sdk`**, use **`sign.encrypt`** to generate a keystore object based on the private key.

### **Why do nodes need to re-sync data after changing configurations?**

Restarting the node program doesn't start syncing data from scratch. Instead, it restores data from the database and starts syncing from the last checkpoint. This is because the data of the last checkpoint is stored in memory, and when the program is closed, the data in memory is lost, making it seem like data is being re-synced.

### **Can the sponsor payment function be tested normally on the test chain?**

Yes, it can.

### **Is CFX an ERC777 contract?**

No, CFX is not a contract token. CFX is equivalent to Ethereum's ETH.

### **Does Conflux support the Ethereum library OpenZeppelin?**

Yes, it's supported. You can directly reference it. However, note that the ERC1820 contract address on the Conflux chain is different from Ethereum. On Conflux, the ERC1820 contract address is: 0x88887ed889e776bcbe2f0f9932ecfabcdfcd1820.

### **Where is the testnet faucet?**

- To receive CFX test tokens, you can get them directly from the faucet portals.
    - Core Space Testnet Faucet: https://faucet.confluxnetwork.org/
    - eSpace Testnet Faucet: https://efaucet.confluxnetwork.org/
    - Mainnet Faucets: https://conflux-faucets.com/

### **Why does the value sometimes appear smaller when I use `latest_confirmed` to get the epoch?**

This can happen in cases of poor network connectivity, primarily due to high block synchronization delays.

### **What settings do developers need to make when starting a node?**

You can find all node related documentation on [THIS](../run-a-node/) section.

### **Does CFX have an API to query computing power?**

https://www.confluxscan.io/v1/plot?interval=514&limit=10

### **What is a pivot chain switch?**

A pivot chain refers to a chain formed by connecting pivot blocks based on block hashes. When a non-pivot block B in a certain epoch has a subtree heavier than the previous pivot block A, B becomes the pivot block for that epoch. This is a pivot chain switch.

### **How to determine if a pivot chain switch has occurred?**

When the old pivot chain switches to the new pivot chain, the latest mined epoch number will be a value not greater than the last obtained latest mined epoch number.

As shown below, the latest epoch at the previous moment was 10, and the latest epoch at this moment is 9, indicating that the pivot block for epoch 9 has changed from 9A to 9B, and a pivot chain switch has occurred.

```css
cssCopy code
[1]···[8]---[9A]---[10A] old pivot chain
        \
          \
            [9B] new pivot chain

```

**How can developers monitor?**

1. Start a full node (archive node) and enable the websocket RPC service.
2. Subscribe to the **`latest mined epoch`** event using **`rpc_subscribeEpoch`**.
3. Wait for the latest mined epoch B and compare it with the previously obtained latest mined epoch A.
4. If `B <= A`, a pivot chain switch has occurred.
5. Go to step 3.

**How can developers synchronize block and transaction status?**

If local data needs to be kept up-to-date and accurate for blocks and transactions, then when a pivot chain switch occurs (assuming the latest mined epoch number changes from A to B, and `B <= A`):

- Assume the latest state epoch number obtained when the latest mined epoch number was A is A'.
- Assume the latest state epoch number obtained when the latest mined epoch number was B is B'.
1. If B > A', update (A', B'] (i.e., this situation will not affect the executed blocks and transactions, process normally).

```css

-----A'------A
--------B'-B

```

1. If `B <= A'`, delete the data between [B, A'].

```css

-----A'------A
----B

```

1. Update [B', B].
2. Go to step 1.

I hope this translation helps you understand the content better! If you have any further questions or need clarification on any points, please let me know.

### What is storage collateral, and how is it calculated? For example, how many drips are required for 1kb storage?

Storage collateral refers to the need to collateralize a corresponding amount of cfx when adding new storage usage in a contract. For each storage entry, the last account that writes to this entry is called the owner of this storage entry. The storage collateral fee will be returned to the owner after the storage is released. Every 1kb of storage requires a collateral of 1cfx.

> For more details, please refer to [THIS](../../core/core-space-basics/storage) section.

### What fees are included in the GasFee returned by cfx_getTransactionReceipt? Does it include storage collateral fees?

- Gasfee does not include storage fees. Gasfee = gasUsed * gasPrice, and the gasfee is spent after the transaction is executed.
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

You can find all node related documentation on [THIS](../run-a-node/) section.


### **What is the Transactions Lifecycle?**

You can find allthe details on the Transaction Lifecycle in [THIS](../../general/conflux-basics/transactions/#transaction-lifecycle) section.
