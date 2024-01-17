---
title: FAQs
sidebar_position: 15
displayed_sidebar: coreSidebar
---

## How to send a transaction?

The easiest way to send a transaction is to use a wallet such as Conflux Fluent, and click “send” to directly set the amount. If you are a developer, you can use the Conflux SDK (JS, Java, Go) to construct the transaction yourself, and then send it to the chain via the node RPC.

## What are the gas and storage fees when sending a transaction?

The gas fee is a fee required for transaction execution. Miners need to charge a certain amount of fee for packaging and executing the transaction. The way to calculate the gas fee is gasFee = gasPrice * gasUsed. 
Additionally, the execution of the transaction may occupy new storage space. Even though you don't need to pay for the occupation of this space, a certain amount of CFX needs to be staked for the use of this storage. As the storage is released, the staked CFX will be returned. 
The storage fee refers to the amount of staked CFX for the storage used, and 1 CFX is required per 1024 bytes used.

## What information (parameters) need to be specified when using the SDK to send transactions？

If you make simple CFX transfers using JS-SDK, you only need to specify `from` (transfer from which account), `to` (send to which account), `value` (quantity to send, unit: Drip).

## How to get the correct nonce?

Through the  [`cfx_getNextNonce`](/docs/core/build/json-rpc/cfx-namespace/#cfx_getnextnonce) RPC, the next available nonce of an account can be obtained. The used nonce cannot be used again. The transaction will not be packaged if using a nonce with a value greater than the current nonce.

## When will the nonce increase by 1? Will the nonce increase by 1 if the transaction fails? Why has the nonce not changed when the transaction has been sent?

The nonce increases once the transaction is executed, whether it succeeds or fails.
After the transaction is sent, the nonce queried through [`cfx_getNextNonce`](/docs/core/build/json-rpc/cfx-namespace/#cfx_getnextnonce) stays unchanged because the transaction has not been executed. At this time, the transaction may be in the transaction pool and has not been packed, or it may have just been packed and be in the `defer` state, waiting to be executed.

## How to calculate the gas fee actually used in the transaction?

On ConfluxScan, users can view gas usage, gas price, gas fee, and other relevant information of a transaction, which is obtained through `cfx_getTransactionReceipt`: `gasFee = gasCharged * gasPrice`, but the gasCharged is not necessarily equal to gasUsed. 
There is a rule in Conflux: `gas` is used to set the upper limit of gas that can be used in a transaction. It must be greater than the actual gas used value (gasUsed). 
For the excessive part, at most, only 1/4 will be refunded: if the excessive part is less than 1/4 of the gasLimit, all will be refunded, but if it is greater than 1/4, only 1/4 will be returned. Hence, try to give an accurate gas value when sending a transaction.

## Why has the balance not changed after interacting with a contract and the gas fee is paid for this transaction?

The Conflux network has a sponsor mechanism. If a contract has a sponsor, the gas and storage fees for this contract’s interactions will be paid by the sponsor.

## If you want to send transactions in batches, how to manage nonce?

When sending transactions in batches, you need to manually manage the nonce. Every time you send a transaction, the nonce is manually incremented by one. 
In this case, for a failed transaction of which nonce is not used, you need to manually adjust the transaction parameters to resend it. 
Therefore, you need to keep all transaction hashes and monitor the status of the transactions when sending in batches. 

## How to know the amount of gas and storage used by a transaction?

The [`cfx_estimateGasAndCollateral`](/docs/core/build/json-rpc/cfx-namespace/#cfx_estimategasandcollateral) RPC can be used to estimate the amount of gas and storage that a transaction needs to use, but the estimation is not 100% accurate. 
Hence, the returned gas can be adjusted manually, such as multiplying by `1.3`.

## How does the status of the transaction change?

After the transaction is submitted through RPC, it will go through several states: Waiting for packaging -> packaging -> execution -> confirmation.

## Why does a transaction keep on waiting to be packaged?

If a transaction has not been packaged for a long time, it’s likely that either the nonce is set incorrectly or the balance is not sufficient.

## Why would a transaction execution fail?

Transaction execution failures are roughly divided into the following situations:

* Vm reverted, Reason provided by the contract: ’xxxxx’: the contract execution failed, and the contract returned detailed information
* VmError(ExceedStorageLimit): the specified storage limit is not enough
* NotEnoughCash {required: 22625000000010862646, got: 22062499999972687418, actual_gas_cost: 10862646, max_storage_limit_cost: 22625000000000000000}: insufficient balance
* VmError(OutOfGas): the specified gas fee is not enough
* VmError(BadInstruction {instruction: 238 }): contract deployment failed
* Vm reverted: the contract execution failed, but the contract did not return detailed information.

