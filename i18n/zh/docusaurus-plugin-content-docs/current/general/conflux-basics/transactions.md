---
title: 交易
sidebar_position: 9
keywords:
  - transaction
---

:::info

本节更深入地介绍了交易的概念。 有关Core Space交易的更多详细信息，请参见[core space 交易](../../core/learn/core-space-basics/core-transactions.md)。 对于 eSpace 交易，您可能会发现参考[Ethereum 交易](https://ethereum.org/developers/docs/transactions/)有所帮助，因为它们在格式和功能上几乎完全相同。

:::

## 交易的概念

交易为拥有 Conflux 账户的外部参与者编写的单个指令，并由发送者使用其账户私钥进行了密码学签名。 一笔交易可以涉及简单的CFX（Conflux的本地货币）转账、代币（如ERC20或ERC721）转账、新智能合约的部署或现有智能合约上的函数执行。 交易是在区块链上存储或更新数据的唯一方式。

## 交易字段

一般而言，一个交易包含以下内容：

- Who send the transaction: A `from` field in an unsigned transaction or the transaction signature fields indicating the signer. This tells the network who is responsible for initiating the transaction and who will pay for the fees.

- What this transaction will do, including:

  - Who will be the transaction receiver or which smart contract to interact with(`to` field). This specifies the destination address of the transaction, which can be either user account or a smart contract that can execute some logic or empty to create a contract.

  -  How much native token will be send(`value` field). This indicates how much CFX (the native token of Conflux) will be transferred from the sender to the receiver. If the receiver is a smart contract, this value can also be used as an input parameter for its logic.

  -  How to interact with a smart contract(`data` field). This contains additional information for calling a smart contract function or deploying a new smart contract. It can encode the name and arguments of the function to be invoked or the bytecode of the new contract to be created.

-  Transaction fee information, including:
   - Field(s) indicating base transaction fee (`gas` in both spaces, and extra `storageLimit` field in core space). These fields is determine according to how much computational resources are required to execute the transaction and (in core space) how much storage space are occupied by its effects.

   -  Field indicating how much "tip" sender is willing to pay to miner(`gasPrice` field). This field allows senders to adjust their priority in getting their transactions packed by miners. A higher `gasPrice` means a higher chance of being included in a block sooner.

- Field indicating when or where the transaction is "valid" (`chainId`, `nonce` in both spaces, and `epochHeight` in core space). `chainId` prevents a transaction being executed on another chain and `nonce` field ensures the sent transactions are executed in the expected order. `epochHeight` field sets an expiration time for the transaction based on the epoch number (a concept similar to "block number" in Ethereum). A transaction can only be executed within an epoch range associated with `epochHeight`.

:::info

Transaction fields are slightly different between [spaces](./spaces.md). Core space transactions follow the definition of [Conflux Protocol](https://www.confluxnetwork.org/files/Conflux_Protocol_Specification.pdf). Espace transactions follow the [EIP-155](https://eips.ethereum.org/EIPS/eip-155) specification.

:::

## 交易生命周期

Transactions go through several stages from the time they are constructed to the time they are finally confirmed on the chain. A good understanding of these stages will help users and developers better identify problems with sending transactions and ultimately ensure that transactions are successfully confirmed.

The following are the main stages of a transaction from construction to confirmation.

1. **Transaction construction**: This is the stage where users or developers create a transaction with all the necessary fields and parameters and get it signed. 交易对象可以使用各种工具或库创建，如 Fluent Wallet、Conflux SDK 等。 在发送交易之前，交易将被编码为十六进制字符串作为“rawTransaction”。

2. **Broadcast**: This is the stage where users or developers send their signed transaction to a Conflux node via RPC or WebSocket. 如果交易通过验证，节点将验证交易并将其广播到网络中的其他节点。 节点还将返回一个交易哈希（这是一个唯一标识符）给发送者以进行跟踪。

3. **Packed into a block -> Mined**: This is the stage where miners select transactions from their mempool (a pool of pending transactions) and include them in their blocks. 矿工将优先考虑具有更高`gasPrice`的交易。 一旦包含交易的区块被挖出，它将被传播到网络中的其他节点。

4. **Deferring 5 epochs -> Executed**: This is the stage where transactions are executed by nodes after being deferred for 5 epochs (about 5 seconds). 这意味着节点将运行交易的逻辑并相应地更新其状态。 每个交易的执行结果将记录在收据（Receipt）中，其中包含诸如状态（成功或失败）、已使用的 gas、智能合约发出的日志和事件等信息，并可使用交易哈希检索。

5. **Waiting for about 50 epochs -> Confirmed**: This is the stage where transactions are confirmed by nodes after being executed for about 50 epochs (about 50 seconds). 执行一个交易并不意味着交易的状态不会再次改变。 由于区块链的结构，区块链可能会因为新块而分叉或转移主链，这可能会导致某些交易回滚。 确认的交易意味着它已经被包含在足够深的区块中，并且几乎不可能回滚。

6. **Waiting for PoS chain Finalization -> Finalized**: This is the final stage where transactions are finalized after specific PoW block being referenced by Conflux's [PoS chain](./consensus-mechanisms/proof-of-stake/pos_overview.md). Conflux 的 PoS 链会定期引用一个稳定的 PoW 区块，以为交易提供最终性。 一个已经最终化的交易意味着它几乎没有被回滚的可能性，除非攻击者拥有 PoS 中超过 67% 的 CFX。 It takes approximately 4-5 minutes to finalize a transaction since it is included in a block (after [CIP-113](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-113.md) activation).

![Transaction](./img/transaction-stages)
