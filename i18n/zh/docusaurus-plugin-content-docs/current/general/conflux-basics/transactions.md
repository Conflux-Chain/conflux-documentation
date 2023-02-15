---
title: Transactions
keywords:
  - transaction
  - to modify
---

Sending transactions is one of the most frequent operations in the blockchain world. Transactions go through several stages from the time they are constructed to the time they are finally cofirmed on the chain. A good understanding of the stages of a transaction will help users and developers better identify problems with sending transactions and ultimately ensure that transactions are successfully confirmed.

Transactions go through the following stages from construction to confirmation.

1. Preparing the private key and address of the sender (from) of the transaction
2. Preparing the metadata of the transaction, assemble it, then sign it and encode it -> RawTransaction
3. Sending RawTransaction to fullnode via cfx_sendRawTransaction RPC method -> transaction is put into transaction pool
4. The transaction is packed into a block by a miner -> Minded in Block
5. Deferring 5 epochs -> Executed
6. Waiting for about 50 epochs -> Confirmed
7. Waiting to be referenced by PoS chain -> Finalized


<!---
![image|347x500](/img/transaction/transaction-stages.png) 
-->
## Detailed Explanation of the Transaction Stages

### Preparing the account‘s private key and address

All transactions sent need to be signed with a private key in order to be accepted and successfully executed by the blockchain. Therefore, before sending a transaction, you need to prepare the private key of the sender, which can be used to derive the address of the account.

In addition, a certain CFX fee is required to send a transaction, so the sender's account needs to have some CFX in order to send the transaction successfully. The CFX of the testnet can be obtained through the faucet.

There is one situation in the Conflux network that does not require the sender to pay the transaction fee.

1. The recipient of the transaction is a contract, and
2. Someone has sponsored the gas and storage of the contract, and
3. The address of the sender of the transaction is on the contract's gas whitelist (the whitelist can be fully opened so that everyone can be sponsored), and
4. The gas fee for the transaction is less than the maximum amount of gas sponsorship set by the contract sponsor

To learn more details about Conflux sponsorship, you can refer to the introduction of the SponsorWhitelistControl in the built-in contract.

### Prepare the transaction metadata, sign, and encode it

After preparing the private key for the sending account, you need to construct the transaction. The first step in constructing the transaction is to determine the meta information of the transaction according to the transaction details, including:

* to: the recipient of the transaction
* nonce: the sequence number of the transaction
* value: the transaction amount, valued in Drip
* data: transaction data
* chainId: the chain ID of the transaction execution
* epochHeight: the height that the transaction execution targets
* gas: maximum gas amount
* gasPrice: the gas price
* storageLimit: storage staking limit

If you want to know the meaning of each keyword of the transaction and how to specify it, please refer to [Conflux Transaction Explanation](http://developer.confluxnetwork.org/sending-tx/en/transaction_explain/?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhY2Nlc3NfcmVzb3VyY2UiLCJleHAiOjE2MzkzNjIyNTAsImciOiJrM3RkMzl3UmNydHZZNnlUIiwiaWF0IjoxNjM5MzYxOTUwLCJ1c2VySWQiOjUzMDEyMDA1fQ.OGlihO7cyqo_5UqcFlB8BGugCywJ_Sb3g95r2IwO4Gs)

After the meta-information is prepared, they need to be encoded in a fixed order by RLP encoding and generate the hash. Then the transaction signature is obtained from the secp256k1 signing operation by using the private key.

Finally, the meta information and signature are combined for RLP encoding and converted to hex format to get the raw transaction (RawTransaction) that can be sent to the Conflux nodes.

Usually, the wallet and SDK will automatically assemble, sign, and encode the transactions without manual processing.

### Send RawTransaction to the node transaction pool

The raw transaction is sent to the nodes via the full node's cfx_sendRawTransaction RPC method. The node will first check the transaction. If there is a problem with the constructed transaction, it will fail. Possible failures are:

1. set nonce incorrectly (reuse it or set a too large value)
2. set a too large value to gas, generally more than 1500w
3. created wrong signature
4. used a wrong chainId
5. set epochHeight more than 100,000 away from the current value
6. Other: the transaction pool is full

If the check passes, the transaction will be put into the node's transaction pool and the hash of the transaction will be returned.

At this point, the transaction can be retrieved through the RPC method cfx_getTransactionByHash, but since the transaction has yet been packaged, fields related to the block information (blockHash) and the execution result (contractCreated, status, transactionIndex) of the transaction are empty.

Since the transaction has not been executed, the receipt for the transaction has not been generated.

### Packing transactions by miners

Transactions in the transaction pool may have three states.

1. nonce skipping
2. ready to pack

Transactions in the first two states will be considered as pending in the pool and will not become ready to pack until all the nonces before this transaction nonce have been executed.

Transactions that fulfill the packing condition will be packed into blocks by miners in roughly the order of gasPrice, from highest to lowest.

### Delay block execution

The Conflux network has a block execution delaying mechanism, which means that after a block is packed, it will not be executed immediately, but be delayed by 5 Epochs before it is executed. The essence of block execution is that all transactions in the block are executed.

The transaction information, obtained by the cfx_getTransactionByHash method after the transaction execution, contains the blockHash, status, and other keywords.

At this point, you can also get the receipt of the transaction via the cfx_getTransactionReceipt method.

The execution of a transaction won't be always successful. The status of the transaction can be determined by the status field of the transaction or the outcomeStatus field of the receipt.

* 0 - execution succeeded
* 1 - execution failed
* 2 or null - the transaction is not executed and is skipped

### Confirm the transaction after a certain number of Epochs

That a transaction is executed does not mean that the status of the transaction will not change anymore. Due to the chain structure of blockchain, the blockchain may fork or shift the main chain due to the arrival or creation of new blocks, which may revert certain transactions.

Usually, after the transaction blocks are packaged, the transaction cannot be finally confirmed until a certain number of new blocks are generated.

In the Conflux network, you can compare the epochNumber in the transaction receipt with the latest confirmed epochNumber. If the latest confirmed epochNumber is larger, then the transaction is confirmed.

You can use the cfx_epochNumber method and pass the latest_confirmed parameter, to get the latest confirmed EpochNumber


### Transaction finalized because of PoS chain

Conflux introduces a PoS finality mechanism to prevent 51% attacks, so that blocks will not be reverted in case of low hashing power.

By introducing a separate PoS chain to finalize the PoW blocks, the state of all the blocks that are voted as finalized will reach finality.

Starting from v1.2.0, a new tag latest_finalized will be introduced. You can use this tag to request the cfx_epochNumber method to get the latest epochNumber that has been finalized.

## FAQ

### Why is the transaction failed to send?

If a transaction failed by calling the cfx_sendRawTransaction method, it is likely that there is a problem with the transaction construction and the meta-information of the transaction needs to be adjusted.

If the error message returned is "txpool is full", you can wait for a moment and try to resend the transaction with a slightly higher gasPrice.

### Why has the transaction not been executed on the chain?

After the transaction is successfully sent, but the transaction does not show as successfully executed on Conflux Scan, then the transaction is probably pending in the transaction pool. There are three possible cases:

1. The transaction does not use a continuous nonce: the nonce of the transaction needs to be set correctly
2. The network is congested: If the network is congested, miners will pack the transactions roughly in order of gasPrice from highest to lowest. You can speed up transaction execution by increasing the gasPrice of the transaction

You can use the cfx_getAccountPendingTransactions method to get the user's current Pending transactions and the reason for them.

### Can a transaction be canceled or replaced?

If a transaction has not been packed into a block and is in the transaction pool, it can be replaced by sending a new transaction with the same nonce and a higher gasPrice.

Transactions cannot be canceled but can be replaced with a transaction of value 0. This is a way to reach the same result as canceling the transaction.

### How to speed up a transaction?

If you want to speed up the execution of a transaction, you can increase the gasPrice of the transaction and resend it.
