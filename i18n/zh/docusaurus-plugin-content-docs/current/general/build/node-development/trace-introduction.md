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
tags:
  - Transaction Traces
---

# Introduction to Transaction Traces

Traces are used to record the transaction execution details. It can be used to debug or retrieve more information (like getting contract addresses created within transaction execution).

## 追踪类型

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

对于 `Call` 追踪，`call_type` 永远不会是 `None` 。

请注意，`gas` 是为被调用者执行提供的“提供”的燃气，因此已扣除了燃气开销。 For example, it is `0` for a simple balance transferring transaction of `21000` gas, because the base gas cost (`21000`) has been deducted in advance. The gas cost for call-related opcodes (`CALL`, `DELEGATECALL`, e.t.c.) or the 1/64 gas reserve for calling are also deducted in advance during contract execution.

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

只有当 `outcome` 为 `Success` 时，`addr` 才可使用。

### InternalTransferAction

对于由内部合约触发的余额转移的追踪将会被记录。 它包括合约自动销毁、代付方更换（包括存储抵押代付方和燃气代付方），以及质押。

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

对于合约自毁，如果退款地址是将被销毁的合约，退款余额将被销毁，所以 `to` 将是空地址而不是退款地址。

对于代付方更换，`from` 将设置为赞助商白名单合约地址 (`0x0888000000000000000000000000000000000001`,即 `cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaegg2r16ar`)。

对于质押存款，`to` 设置为质押利息合约地址 (`0x0888000000000000000000000000000000000002`,即 `cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaajrwuc9jnb`)。

对于质押提现，将记录两个 `InternalTransferAction` 追踪。 第一个是为了提现原始的质押余额（`from` 设置为质押利息合约地址），第二个是为了提现质押利息（`from` 设置为空地址）。

## 对失败的讨论

对于在合约执行内部执行的`Call` 或 `Create`，只有在执行期间实际触发陷阱后才会记录，结果在处理陷阱后记录。 如果交易/指令失败而没有触发陷阱（例如，发送者余额不足、检测到重入或栈达到最大深度），则不会记录追踪。

对于由原始交易触发的 `Call` 或 `Create`，只有通过初步检查后才会记录追踪。 首先，追踪只会记录“执行”了的交易，所以如果 nonce 不匹配，这个交易将不会执行，也就没有追踪。 如果交易被执行（发送者的 nonce 增加），但发送者没有足够的余额执行交易，也不会有追踪。 对于 `Create`，如果待创建的合约地址之前已被创建并有代码，我们也会直接返回，不记录追踪。
