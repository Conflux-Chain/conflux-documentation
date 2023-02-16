---
sidebar_position: 1
title: What is Transaction?
keywords:
  - transaction
---

Sending a transaction is the only way to store or update data on the blockchain. Whether it is sending CFX or updating a contract state, it can only be achieved through transactions. Sending a transaction involves three phases: transaction construction, signing, and sending. Usually, the SDK of each language will provide a packaged method that can be called directly. However, if you want to know more low-level details, or if you encounter problems when sending transactions, this article may be helpful.

## How to construct a transaction
To construct a transaction, first, you need to prepare the various fields of the transaction, including:
* `from`
* `to`
* `value`
* `nonce`
* `data`
* `gas`
* `gasPrice`
* `storageLimit`
* `chainId`
* `epochHeight`

### Basic fields
`from`, `to`, `value` are basic fields of a transaction that correspond to the `originating account`, `destination account`, and `amount` of the transaction, respectively.

`from` is fairly easy to determine. You can simply select an external account (non-contract account) address with CFX balance. If the destination account of the transaction is a contract that is sponsored, the initiating account does not even require a CFX balance. The balance of the account can be queried through the RPC `cfx_getBalance` RPC method.

`to` is the destination account of the transaction: if you just want to initiate a CFX transfer, then `to` can be directly set as the CFX destination account; if you need to change the contract status, `to` needs to be set as the contract address; if you are deploying a new contract, `to` is left blank.

`value` represents the CFX transfer amount of a transaction, and it needs to set an integer with the unit of Drip.

### nonce
`nonce` is the number of transactions sent by an account. In other words, it is the execution sequence number of transactions sent by an account. It can be queried through the RPC method `cfx_getNextNonce`. It has the following characteristics:

1. The execution of transactions on the blockchain is in the order of nonce from small to large.
2. The initial value of nonce is 0, and the nonce will be increased by 1 for every transaction execution.
3. The nonce cannot be reused.
4. Nonce cannot be skipped: Assume that the current nonce of an account is n. If the nonce of the transaction is m such that m > n, then the transaction will not be executed until all transactions with nonce < m have been executed.
5. After the transaction is sent through the `cfx_sendRawTransaction` method, it will not be executed immediately. You need to wait for the miner to pack it first. After being packed, it will be executed after a delay of 5 Epochs. After the transaction is executed, the nonce of the account will increase by one.

Setting the nonce correctly is the key to a smooth transaction execution. Many developers will encounter the situation when the transaction is sent successfully but the execution result (receipt) does not exist. (This suggests that the transaction has not been executed. In most cases, this is due to inadvertently skipping a nonce. A skipped nonce will cause the transaction to be stuck in the transaction pool while awaiting for the previous transaction to be executed.

When using the SDK to construct a transaction, the nonce does not need to be set manually. The SDK will automatically call `cfx_getNonce` to obtain the nonce. However, if you want to send transactions in batches, using `cfx_getNonce` to obtain nonce will cause the reuse of nonce due to the difference in time consumed for transaction send and execution. This means that, if you send multiple transactions through the SDK simultaneously, they will all use the same nonce and only one of them will be executed. (It takes a while for the transaction to be executed after it is sent while sending the transactions doesn't require much time to process.) In this case, the developer needs to manage the nonce manually: record the hash of the transaction for each transaction sent, add one to the nonce, and use the updated nonce to construct the transaction.

### Fee-related fields
After the transactions are sent to the network, they are packaged and executed by miners. Miners will charge a service fee for packaging transactions. This provides incentives for miners to participate in mining and keep the network running. In the Conflux network, transaction fees are paid in CFX. Fees are specified by the transaction initiator through the `gas` and `gasPrice` fields of the transaction.

The `gas` field is used to specify the upper limit of the maximum amount of gas that can be paid when a transaction is executed. This can be understood as the `limit` of the gas that can be consumed by the transaction execution, that is, `gasLimit`. When a miner executes a transaction, many instructions are executed internally, and different instructions consume different amounts of gas. If the total amount of gas consumed by the transaction exceeds the `gasLimit` specified by the transaction,  the execution of the transaction will fail. Regular CFX transfer transactions consume `21000` gas. If interacting with a contract, the gas consumption will depend on the complexity of the contract's corresponding bytecode, which can be estimated using the `cfx_estimateGasAndCollateral` method. This method will return two gas-related fields:  gasUsed and `gasLimit`. The gasUsed is the actual amount of gas consumed by the transaction execution at the time of estimation. The `gasLimit` is the `gas` value set by transaction sending recommendation (slightly larger than `gasUsed`) to avoid transaction failure caused by inaccurate (smaller) estimation. Only 25% of the exceeding actual gas (compared to the `gasLimit` value) will be returned. Therefore it is important to set the transaction `gasLimit` appropriately.

To help miners estimate their revenue with reasonable accuracy, at most 25% of the overall `gas` provided will be refunded. In other words, **the sender needs to pay at least 75% of the gas costs, even if the actual transaction execution consumed much less gas**. Therefore it is important to set the transaction gas limit appropriately.

`gasPrice` is the amount of CFX that the transaction initiator is willing to pay per gas. The unit is Drip. Thus, the calculation of the upfront gas fee charged for transaction execution is gas * gasPrice. As mentioned before, up to 25% of this fee can be refunded to the sender.

Miners will pack transactions with higher payouts first. If the network is congested, you can speed up the packing of transactions by increasing the `gasPrice` value. If the transaction is stuck for some reason, or if you want to speed up the packing of the transaction, try raising `gasPrice` and resending the transaction with the same nonce. Fullnode provides an RPC method `cfx_gasPrice` that returns a reasonable `gasPrice` value based on the current network conditions.

In addition to transaction fees, in the Conflux network, if new storage space is occupied during the transaction's execution, some CFX are pledged for that space occupation. The annualized %4 interest generated by the pledged CFX will be paid to the miners to subsidize their storage costs. If the occupied space is released, the pledged CFX will be released and returned to the sender of the transaction. For every 1KB of new space taken, 1 CFX is pledged. The `storageLimit` field is used to specify the upper limit of the space (in bytes) occupied by a transaction execution. If the transaction tries to occupy more storage than allowed by the storageLimit field, the transaction fails and no CFX is pledged.

Therefore, when sending a transaction, you need to ensure the sending account has enough balance to pay: `value + storageLimit * (10^18/1024) + gas * gasPrice`. If the balance is insufficient, instead of failing directly, the transaction may get stuck in the transaction pool and get executed once the sender's balance is sufficient. If the transaction is interacting with the contract, and the contract has a sponsor, you only need to ensure that the balance is enough to pay for value.

The current SDK automatically calls the `cfx_estimateGasAndCollateral` method to set reasonable `gas`, `storageLimit` values for the transaction and the `cfx_gasPrice` method to set a reasonable `gasPrice` value. Of course, the users can also specify more reasonable values manually.

### data
The data field of the transaction can be left blank or set to a hex-encoded byte array. This can be roughly categorized into three situations:

* Regular CFX transfer transaction: The `data` field is usually blank, but hex-encoded data can be set as a transaction remark or postscript.
* Contract deployment transaction: `data` needs to be set as the contract's bytecode and the parameters of the constructor (if any)
* Contract call transaction: The `data` field is used to store the input data for the contract to call. The data is usually the contract method and data after parameter abi encoding. (When sending CFX to a contract, the data field is usually left blank)

Smart contracts are usually written in high-level contract development languages (Solidity, vyper). You can use a compiler to obtain bytecode and abi. SDK will provide abi encoding methods for the encoding of the contract method call (encoding the method name and parameters).

### Other
`chainId` is used to identify a chain. The current chainId of the Conflux Tethys network is `1029`, while that of the Conflux testnet is `1`. The chainId is included in the transaction mainly to prevent transaction replay attacks.  This field usually does not need to be filled manually. SDK will automatically obtain the current RPC chainId through the `cfx_getStatus` method.

`epochHeight` is used to specify the target Epoch range for a transaction. Transactions will only be executed in the range of [Te − 100000, Te + 100000]. If the Epoch of the current chain exceeds that range, the transaction will be discarded. SDK also sets this field to the current Epoch obtained by the `cfx_epochNumber` method automatically.


## Transaction encoding and signature
After the fields of the transaction are determined, transactions need to be rlp encoded in a specific format, and the encoded keccak256 hash will be signed by the private key of the sending account. Finally, a rawTransaction will be assembled. The rawTransaction can be sent to the Conflux network through the `cfx_sendRawTransaction` method, awaiting to be packaged and executed by the miners.

The specific steps are as follows (take js-conflux-sdk as an example):

1. Parse each field of the transaction into buffer
2. Assemble each field into an array or tuple in the order of `(nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data)` and perform rlp encoding.
3. Perform the `keccak256` operation on the encoded result to obtain a hash
4. Use the private key of the sending account to perform the ecdsaSign signature operation to the hash obtained in the previous step. After that, r, s, v are obtained.
5. Assemble all the information according to `((nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data), v, r, s)` and perform rlp encoding.
6. Finally, convert the encoded buffer in the previous step into a hex string, and then, you will get a rawTransaction that can be sent directly.

## How to check transaction details and status
After the transaction is successfully sent, it will first be placed in the transaction pool. When the packaging conditions are met, the transaction will be packaged by the miner into the latest block. At this time, you can query the information and status of the transaction through `cfx_getTransactionByHash` The `status` field of the returned result indicates the execution status of the transaction:

* `null`: not executed
* `0x0`: Execution successful
* `0x1`: Execution failed, transaction was reverted
* `0x2`: The transaction was skipped

```json
{
    "jsonrpc": "2.0",
    "result": {
        "blockHash": "0x398879d9e7d37e2cc87af268fcd2207a689e2e84986e9251a5343dafca3d93b7",
        "chainId": "0x405",
        "contractCreated": null,
        "data": "0x",
        "epochHeight": "0xd03609",
        "from": "CFX:TYPE.USER:AAKETJH9TKJ5G2K4ZX3KFVB9VKKU8NR956N0EN4FHE",
        "gas": "0x5208",
        "gasPrice": "0x2540be400",
        "hash": "0xa76efec071e0779785b6653aebb2382a5e460b60a163a1b166df3c8164cec6d9",
        "nonce": "0xa08d9",
        "r": "0x38e661ad41790c069a4795df21eade5ef9605dbcbdfd5dabbb0dc322e833e4c1",
        "s": "0x66ca875464c554261033f4522281d564bdba4f0189d357579dcbf2b1ed98936b",
        "status": "0x0",
        "storageLimit": "0x0",
        "to": "CFX:TYPE.USER:AATT0JGE4J70V4H0Z43VJ9M29ZJ7ASNS0YA238MGZC",
        "transactionIndex": "0x1",
        "v": "0x0",
        "value": "0xde0b93b7d70bec0"
    },
    "id": "15922956697249514502"
}
```

The transaction will not be executed immediately after it's packaged, and the transaction's `status` is `null` at that point. After a delay of 4 Epochs, the status of the transaction would change to `0x0`, `0x1`, or `0x2`. (`0x0` for success, `0x1` for failure, and `0x2` for skip.)

You can also get the transaction execution receipt through `cfx_getTransactionReceipt`. This can only be obtained after the transaction has been executed, otherwise, it will return `null`. The receipt contains a field `outcomeStatus` which can also be used to determine whether the transaction is executed successfully: `0x0` indicates success, others indicate failure.

```json
{
    "jsonrpc": "2.0",
    "result": {
        "blockHash": "0x398879d9e7d37e2cc87af268fcd2207a689e2e84986e9251a5343dafca3d93b7",
        "contractCreated": null,
        "epochNumber": "0xd0360f",
        "from": "CFX:TYPE.USER:AAKETJH9TKJ5G2K4ZX3KFVB9VKKU8NR956N0EN4FHE",
        "gasCoveredBySponsor": false,
        "gasFee": "0xbefe6f672000",
        "gasUsed": "0x5208",
        "index": "0x1",
        "logs": [],
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "outcomeStatus": "0x0",
        "stateRoot": "0x8c05b8eb6b9dc69f2e7bb235621487022e694ce3969202b94e76227673a0b86b",
        "storageCollateralized": "0x0",
        "storageCoveredBySponsor": false,
        "storageReleased": [],
        "to": "CFX:TYPE.USER:AATT0JGE4J70V4H0Z43VJ9M29ZJ7ASNS0YA238MGZC",
        "transactionHash": "0xa76efec071e0779785b6653aebb2382a5e460b60a163a1b166df3c8164cec6d9",
        "txExecErrorMsg": null
    },
    "id": "15922956697249514502"
}
```

## How to determine if a transaction is confirmed
In the blockchain, a block can be reverted after being executed. Accordingly, a transaction can also be reversed after being executed. The status of the transaction can only be considered final once the block has been confirmed. There are two ways to determine whether a transaction (block) is confirmed in Conflux:

1. If the latest `confirmed epochNumber` of the network is greater than the epochNumber of the transaction, the transaction is confirmed. By calling `cfx_epochNumber` method and passing `latest_confirmed` parameter, you can obtain the latest confirmed `epochNumber`. epochNumber of the transaction is in its receipt.
2. You can obtain a block's confirmation risk value by calling the method `cfx_getConfirmationRiskByHash`. If *risk/MAX_UINT256 is less than 1e-8*, the block is confirmed and will not be reverted. The block hash of the transaction can be obtained through `cfx_getTransactionByHash`.

In Conflux, usually, a block can be confirmed after 50 epochs (within one minute). If the transaction involves a large amount, you might need to wait for more epochs according to the situation.

## Reasons for transaction failure
Based on the stage in which the transaction fails, there are three categories of failures:

### Rejected by RPC
The sending transaction is directly rejected by RPC. The reason for rejection can be found in the `message` field of RPC Response.

1. `Invalid parameters: tx', 'data': '"Failed imported to deferred pool: Tx with same nonce already inserted. To replace it, you need to specify a gas price > 5` The error code indicates that the same nonce has been used in the transaction pool and cannot be reused. However, you can replace an existing transaction by sending a transaction with the same nonce but higher gas price.
2. `'Invalid parameters: tx', 'data': '"Transaction 0x2004b0aea956e8cfad601cd6daad5630c1a95624bad446d1966895973325136c is discarded due to a too stale nonce` This indicates that the same nonce used has been used in history and cannot be used again.
3. `Sending transactions to invalid address. The first four bits must be 0x0 (built-in/reserved), 0x1 (user-account), or 0x8 (contract).` This indicates that the receiving address of the transaction is wrong.
4. `Transaction {:?} is discarded due to in too distant future` This indicates that the transaction is using a nonce that is too large for the account's current nonce
5. `tx already exist` This indicates that the transaction already exists.

Sometimes, the `data` of Response will also contain some error information. （This field is a hex-encoded string. The parsing method is: hex -> buffer -> UTF8 string）

### Stuck in the transaction pool
The transaction is sent successfully but not be packaged. There are two possible reasons:

1. The skipped nonce is used, and the transaction of the previous nonce has not been generated or executed.
2. The account sending this transaction does not have enough balance to pay the transaction.

### Execution failed
Execution failure is usually due to an error that occurred during the execution process of the contract, which then caused the transaction failure. Such errors are mostly caused by contract execution failures or errors returned when estimating gas cost through the estimate interface. You can check the specific reason for the transaction failure in the `txExecErrorMsg` under receipt:

1. `VmError(OutOfGas)` The transaction specified gas fee is not enough
2. `VmError(ExceedStorageLimit)` The transaction specified upper-limit storage is not enough
3. `NotEnoughCash` Insufficient user balance
4. `Vm reverted, Reason provided by the contract: xxxx` The contract execution failed with details provided.
5. `VmError(BadInstruction xxxx)` Contract deployment failed
6. `Vm reverted, xxxx` The contract execution failed with no details provided.

## Differences between Conflux and Ethereum

Compared to Ethereum `155 transaction`, transactions through Conflux have several differences:

* Two more fields: `storageLimit`, and `epochNumber`.
* The RLP encoding assembly method of the transaction is different.
  1. When compute transaction hash the RLP structure is `[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data]`
  2. When assemble rawTx the RLP structure is `[[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data], v, r, s]`
* The `v` value signed by ecdsaSign will not be specifically modified in Conflux; while In Ethereum, there will be some special treatments to the v value.
* Finally, while Ethereum nodes directly reject transactions if the sender has insufficient balance, Conflux nodes accept such transactions but only pack them info blocks once the user's balance can cover it
