---
sidebar_position: 6
title: Transaction  Receipt
displayed_sidebar: coreSidebar
---

Transaction Receipt is a data structure that contains information about the transaction execution result.

## Transaction Receipt

The receipt can be obtained through the RPC method [`cfx_getTransactionReceipt`](/docs/core/build/json-rpc/cfx-namespace#cfx_gettransactionreceipt). This method takes the transaction hash as a parameter and returns `null` if the transaction has not been executed, or a Receipt object after execution is completed.

## Receipt Fields

The Receipt contains the following types of information:

- Basic transaction information: transactionHash, from, to
- On-chain transaction information: blockHash, epochNumber, index
- Transaction execution result: outcomeStatus (0 for success, 1 for failure)
- Gas & storage fee information: gasUsed, gasFee, storageCollateralized, gasCoveredBySponsor, storageCoveredBySponsor, storageReleased
- Deployed contract address: contractCreated (if it is a contract deployment transaction)
- Contract execution logs: logs
- Execution error information: txExecErrorMsg (if the transaction execution fails)

For detailed information about each field, you can refer to the API documentation for [`cfx_getTransactionReceipt`](/docs/core/build/json-rpc/cfx-namespace#cfx_gettransactionreceipt).

### logs

The logs field in the Receipt is an array containing all the logs generated during the transaction execution process. When interacting with a contract, the contract can produce logs or events using emit statements. After the transaction is executed, these logs are recorded in the Receipt. In Solidity, [Events](https://docs.soliditylang.org/en/v0.8.23/contracts.html#events) are designed to log information about the execution of contract methods, providing detailed information about contract execution through events.

You can retrieve logs using the [cfx_getLogs](/docs/core/build/json-rpc/cfx-namespace#cfx_getlogs) method and decode the log data using the [abi.decode](https://docs.soliditylang.org/en/v0.8.23/contracts.html#events) method.

## Execution Failure

Execution failures can be due to errors that occurred during the contract execution process or errors returned when estimating gas cost through the estimate interface. To find the specific reason for the transaction failure, check the `txExecErrorMsg` under the receipt:

1. `VmError(OutOfGas)`: The transaction specified gas fee is not enough.
2. `VmError(ExceedStorageLimit)`: The transaction specified upper-limit storage is not enough.
3. `NotEnoughCash`: Insufficient user balance.
4. `Vm reverted, Reason provided by the contract: xxxx`: The contract execution failed with details provided.
5. `VmError(BadInstruction xxxx)`: Contract deployment failed.
6. `Vm reverted, xxxx`: The contract execution failed with no details provided.

**Solution:** Depending on the specific error message, you may need to adjust the gas fee, increase the storage limit, ensure sufficient balance, or debug the contract code to identify and fix the issues causing the failure.

Remember that when handling transaction errors, it's essential to identify the root cause of the error and apply the appropriate solution. In most cases, modifying transaction parameters, waiting for node synchronization, or debugging the contract code can help resolve the issues.

## FAQs

### Why can't I retrieve the receipt for a transaction?

The receipt information for a transaction can only be obtained after the transaction has been successfully executed. If the transaction has not been completed, the receipt will be `null`.

### Can the receipt information for a transaction change?

The receipt information may change immediately after a transaction is executed and included in a block. However, once the transaction is finalized, the receipt information will not change.
