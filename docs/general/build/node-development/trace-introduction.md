---
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - transaction traces
  - debugging
  - smart contracts
  - Call traces
  - CallResult
  - Create traces
  - CreateResult
  - InternalTransferAction
tags: [Transaction Traces]
---
# Introduction to Transaction Traces

Traces are used to record the transaction execution details. It can be used to debug or retrieve more information (like getting contract addresses created within transaction execution).

## Trace Types

### Call

The trace is recorded for all `Call` operations, including balance transferring or contract calling, executed either by the transaction itself or inside a contract.

```rust
pub struct Call {
    /// The sending account.
    pub from: Address,
    /// The destination account.
    pub to: Address,
    /// The value transferred to the destination account.
    pub value: U256,
    /// The gas available for executing the call.
    pub gas: U256,
    /// The input data provided to the call.
    pub input: Bytes,
    /// The type of the call.
    pub call_type: CallType,
}

pub enum CallType {
    /// Not a CALL.
    None,
    /// CALL.
    Call,
    /// CALLCODE.
    CallCode,
    /// DELEGATECALL.
    DelegateCall,
    /// STATICCALL
    StaticCall,
}
```

If a transaction itself is calling a contract (`to` is a contract address), this trace will always be the first one in the trace list of this transaction.

`call_type` can never be `None` for `Call` traces.

Note that `gas` is the "provided" gas for the execution of the callee, so the gas overhead has been deducted. For example, it is `0` for a simple balance transferring transaction of `21000` gas, because the base gas cost (`21000`) has been deducted in advance. The gas cost for call-related opcodes (`CALL`, `DELEGATECALL`, e.t.c.) or the 1/64 gas reserve for calling are also deducted in advance during contract execution.

### CallResult

The trace is recorded after a `Call` operation finishes.

```rust
pub struct CallResult {
    /// The outcome of the result
    pub outcome: Outcome,
    /// The amount of gas left
    pub gas_left: U256,
    /// Output data
    pub return_data: Bytes,
}
```

```rust
pub enum Outcome {
    Success,
    Reverted,
    Fail,
}
```

### Create

The trace is recorded for all operations that create contracts, including executing contract creation transactions or successfully executing the `CREATE`/`CREATE2` opcode.

```rust
pub struct Create {
    /// The address of the creator.
    pub from: Address,
    /// The value with which the new account is endowed.
    pub value: U256,
    /// The gas available for the creation init code.
    pub gas: U256,
    /// The init code.
    pub init: Bytes,
}
```

Similar to `Call`, the `gas` is the "provided" gas for the `Create` operation.

### CreateResult

The trace is recorded after a `Create` operation finishes.

```rust
pub struct CreateResult {
    /// The outcome of the create
    pub outcome: Outcome,
    /// The created contract address
    pub addr: Address,
    /// The amount of gas left
    pub gas_left: U256,
    /// Output data
    pub return_data: Bytes,
```

`addr` can only be used if `outcome` is `Success`.

### InternalTransferAction

The trace is recorded for the balance transfer triggered by internal contracts. It includes contract suicide, sponsor replacement (including storage collateral sponsor and gas sponsor) , and staking.

```rust
pub struct InternalTransferAction {
    /// The source address. If it is zero, then it is an interest mint action.
    pub from: Address,
    /// The destination address. If it is zero, then it is a burnt action.
    pub to: Address,
    /// The amount of CFX
    pub value: U256,
}
```

For contract suicide, if the refund address is the to-be-destroyed contract , the refund balance will be burnt, so `to` will be the null address instead of the refund address.

For sponsor replacement, `from` is set to the sponsor whitelist contract address (`0x0888000000000000000000000000000000000001`, i.e., `cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaegg2r16ar`).

For staking deposit, `to` is set to the staking interest contract address (`0x0888000000000000000000000000000000000002`, i.e., `cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaajrwuc9jnb`).

For staking withdraw, two `InternalTransferAction` traces will be recorded. The first is for withdrawing the original staked balance (`from` is set to the staking interest contract address), and the second is for withdrawing the staking interest (`from` is set to the null address).

## Discussion of Failure

For `Call` or `Create` executed within contract execution, it is only recorded after the actual trap is triggered during execution, and the result is recorded after the trap is processed. If the transaction/instruction fails without triggering the trap (for example, the sender does not have enough balance, reentrancy is detected, or the stack has reached the max depth), no trace will be recorded.

For `Call` or `Create` triggered by the original transaction, the trace is only recorded after passing the preliminary checks. First, traces will only be recorded for "executed" transactions, so if the nonce does not match, this transaction will not be executed and there will be no trace. If the transaction is executed (the nonce of the sender increases), but the sender does not have enough balance to execute the transactions, there are also no traces. For `Create`, if the to-be-created contract address was created before and has code, we will also return directly without recording traces. 
