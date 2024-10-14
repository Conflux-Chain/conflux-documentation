---
sidebar_position: 11
title: Base Fee
displayed_sidebar: generalSidebar
tags: 
- Conflux Network
- base fee
- gas price
- transaction fees
- EIP-1559
- CIP-1559
- CIP-137
- blockchain congestion
- fee burning
- eSpace
- Core Space
- pivot block
- non-pivot blocks
- transaction execution
---

In Conflux, the block data queried from the RPC includes a `baseFeePerGas` field, which indicates the network's congestion status and determines the minimum fee per gas required for a transaction. This mechanism, introduced in the [Conflux v2.4 hardfork](../hardforks/v2.4.md) as part of [CIP-1559](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-1559.md), is based on Ethereum's base fee model but adapted for Conflux's tree-graph block structure. Details of this adaptation are documented in [CIP-1559](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-1559.md) and [CIP-137](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-137.md).

This article provides an overview of the base fee and its workings in Conflux. For a comparison with Ethereum's implementation, refer to the section [Differences from Ethereum Base Fee](#differences-from-ethereum-base-fee).

## Minimum Gas Price For Transaction Packing

The `baseFeePerGas` is the minimum fee per gas required for a transaction to be included in a block. If a transaction's `gasPrice` (for legacy or type 1 transactions) or `maxFeePerGas` (for type 2 transactions) is less than the block's `baseFeePerGas`, it will not be included.

During periods of high network congestion, the `baseFeePerGas` increases, requiring users to pay higher fees for their transactions to be processed. Conversely, when congestion decreases, the `baseFeePerGas` falls, allowing transactions with lower fees to be included.

Type 2 transactions benefit from the `maxFeePerGas` and `maxPriorityFeePerGas` fields, enabling users to set a higher `maxFeePerGas` while only paying the actual fee determined by current network conditions. More information about the dynamic fees can be found in [gas and fees](./gas.md)

## Calculation of `baseFeePerGas`

The `baseFeePerGas` for each block is based on the previous block's `baseFeePerGas` and current block's gas usage, calculated as `sum(transaction gas limit) / gas target`. The gas target is 50% of the space gas limit. For example, the core space gas limit is typically set to 54,000,000, making the gas target 27,000,000. In eSpace, the gas limit is typically set to 30,000,000, with a gas target of 15,000,000.

If the sum of the transaction gas limits exceeds the gas target, the `baseFeePerGas` increases; otherwise, it decreases. The maximum rate of change for `baseFeePerGas` per block is 12.5%. An empty block results in a 12.5% decrease, while a full block results in a 12.5% increase.

![delta rate](./img/delta_rate.png)

Current block's `baseFeePerGas` can then be computed from the previous block's `baseFeePerGas` and the `deltaRate`: `newBaseFeePerGas = previousBaseFeePerGas * (1 + deltaRate)`.

In core space, the `previousBaseFeePerGas` is from the direct parent block, while in eSpace, it is from a parent block five blocks back as eSpace transactions are only packed on these specific heights.

## Fee Burnt and Base Fee Sharing

Unlike Ethereum's EIP-1559, where all the base fee is burned, Conflux's CIP-137 allocates a portion of the base fee to miners. This ratio, initially set to 50%, is determined by an [on-chain DAO vote](../../core/core-space-basics/internal-contracts/params-control.md).

Transaction fees in Conflux are composed of 3 parts:

1. The portion of the base fee that is burned.
2. The portion of the base fee distributed to miners.
3. The priority fee (distributed to miners).

This base fee burning ratio also affects non-pivot block transaction processing and the mechanism is detailed in the next part.

## Uniform Base Gas Price for Epoch

While the block base gas price sets the minimum gas price for miners to pack transactions, during execution, the entire epoch's base gas price is determined by the pivot block's `baseFeePerGas`. For instance, in a pivot chain `Genesis <- A <- C <- E <- H`, block `B` in the C epoch has its base gas price determined by C's `baseFeePerGas`.

![Tree Graph](./img/tree_graph.jpg)

### Special Handling for eSpace

Since espace transactions can only be packaged at heights that are multiples of 5, for other heighs the eSpace base gas price remains unchanged.

### Minimum Fee Per Gas During Transaction Execution

During transaction execution, the minimum fee per gas is determined by the epoch’s pivot block's `baseFeePerGas`. This can lead to a situation where transactions in non-pivot blocks have a `gasPrice` or `maxFeePerGas` lower than the epoch's `baseFeePerGas`, causing many transactions to fail.

To address this, CIP-137 divides the base fee into two parts: the portion that is burned and the portion distributed to miners. This proposal allows a more lenient threshold for transaction validity during execution. Specifically, a transaction is valid if it provides sufficient fee for the portion that is burned. This can be expressed as:

`gasPrice >= pivotBlock.baseFeePerGas * burntRatio` or `maxFeePerGas >= pivotBlock.baseFeePerGas * burntRatio`.

The remaining fee is paid to the miners. This rule is particularly beneficial for transactions in non-pivot blocks, as pivot block transactions must already meet the block's `baseFeePerGas` to be included.

However, if a transaction’s gas price does not meet the burnt gas price threshold, the transaction will fail. Importantly, Conflux handles this by introducing a special transaction status: the transaction fails but does not increment the account’s nonce. This means the original transaction remains valid and can be repacked in future blocks. In such cases, the Conflux node implementation (conflux-rust) will immediately resend the failed transaction back to the transaction pool, allowing it to be included once the network conditions align with the transaction's fee settings.

## Differences from Ethereum Base Fee

### Adjustment Based on the Current Block's Gas Limit

In Ethereum’s EIP-1559, the base fee per gas is adjusted based on the gas used by the parent block. In contrast, Conflux’s CIP-1559 uses the current block's gas limit for this adjustment.

The cip-1559 has made an [explanation](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-1559.md#why-adjust-gas-using-the-current-blocks-gas-limit) on the reason of this difference: Due to the presence of a deferred execution mechanism, it is impossible to adjust the base gas price using the gas used; therefore, the gas limit is used instead. Using the gas limit from the previous block would require accessing transaction blocks from five heights prior for espace blocks, which would increase the overhead in the consensus process.

### Fee Burnt

In Ethereum, all of the base fee is burnt while in Conflux, only partial of the base fee is burnt, with the rest paying to miners. The ratio is determined by the Conflux on-chain DAO vote and is initiated to 50%. The burned gas fee can be found in the transaction's receipt under the `burntGasFee` field.

### Execution Checking

Conflux performs an additional base fee check during transaction execution due to the deferred execution of transactions, which occurs 5 epochs after their inclusion in a block. During execution, the minimum gas price is not the `block.baseFeePerGas` but the `pivotBlock.baseFeePerGas * burntRatio`. This ensures that the portion of the transaction fee that should be burned is covered, while the remaining fee is paid to the miner.

If a transaction's gas price does not meet this threshold, it will fail but will not increment the sender’s nonce. The Conflux node implementation will then send the original transaction back to the node's mempool, allowing it to be repacked in future blocks when the network conditions are favorable.
