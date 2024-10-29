---
sidebar_position: 10
title: Gas and Fees
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - gas
  - transaction fees
  - computational effort
  - gas limit
  - gas used
  - gas charged
  - base fee
  - priority fee
  - EVM opcodes
  - storage collateral
  - fixed fee
  - dynamic fee
  - fee optimization
tags:
  - Gas
---

## What is Gas?

In blockchain technology, the concept of "gas" is analogous to gasoline in vehicles. Just as cars consume gasoline to drive, with more gasoline needed the further they travel, in Conflux, "gas" represents a **unit of measurement for computational effort** needed to perform operations. The greater the computational requirement of a transaction, the more gas it consumes.

To elaborate, all transactions on Conflux are processed in its virtual machine, encompassing both regular CFX transfers and smart contract method calls. Each transaction involves a series of operations executed sequentially, represented by different opcodes, with varying computational demands for each opcode. The list of opcodes for the Ethereum Virtual Machine (EVM), which is relevant here, can be found [here](https://ethereum.org/en/developers/docs/evm/opcodes/).

:::note

In Conflux's core space, [storage collateral](../../core/core-space-basics/storage) is used as another resource other than gas for storing data required during transaction execution.

:::

## Gas Limit, Gas Used, and Gas Charged

Just like a vehicle has a limited fuel tank size, blockchain transactions have a limit on the amount of computational gas they can use. Each transaction includes a `gas` field also know as `gas limit` specifying the maximum gas it can consume. This limit prevents transactions from getting stuck in infinite loops: if the transaction uses up all its specified gas without completing, it fails. The gas limit is essential because we use Turing-complete languages for programming, making it theoretically impossible to predict a transaction's success before executing it due to the [Halting Problem](https://en.wikipedia.org/wiki/Halting_problem).

Typically, a transaction will use only part of its gas limit, referred to as `gas used`. In Conflux, if the `gas limit` is set **appropriately**, unused gas will be fully refunded to the user ensuring no extra cost. However, if the `gas limit` is set too high, the user may not receive a full refund for unused gas.

The `gas charged` is the actual amount billed to the user, calculated using the formula: `gasCharged = max(gasUsed, 3/4*gasLimit)`. Therefore, it’s crucial to set this limit correctly to avoid unnecessary costs. If the limit is too low, the transaction will fail; if too high, you may overpay.

Here is an example illustrating the relationships among `gas limit`, `gas used`, and `gas charged`:

![Gas Charged Calculation Example](./img/gas.drawio.svg)

Consider a regular CFX transfer with a gas cost of 21,000:

1. If the `gas limit` is set to 100,000, `gas charged` will be 75,000 (`max(21000, 100,000*3/4)`), leading to a refund of only 25,000 gas, at an extra cost of 54,000 gas compared to the `gas used`.
2. If the `gas limit` is set to 28,000, `gas charged` will match the actual gas used at 21,000, resulting in no extra cost.

### Setting the Transaction Gas Limit

Most users need not worry about these details as wallets(Fluent Wallet, Metamask, etc) typically manage gas settings effectively to minimize costs.

For developers, SDKs will also choose an appropriate gas limit if not sepcified. Developers can also use the [cfx_estimateGasAndCollateral](../../core/build/json-rpc/cfx-namespace.md#cfx_estimategasandcollateral) to find the proper gas limit for their transactions.

:::info

It should be mentioned that transaction might fail if the gas limit is exactly set to gas used due to [EIP-150](https://eips.ethereum.org/EIPS/eip-150).

:::

## Tarifa de gas (Gas Fee)

Each transaction on a blockchain requires computational resources for execution. To compensate for these resources and protect the network from spam, users must pay a gas fee. This fee is calculated as `gasCharged * feePerGas`. The way to specify the `feePerGas` will be discussed after introducing the `baseFeePerGas` concept.

### Base Gas Fee and Priority Fee

The transaction gas fee consists of two components: the **base fee** and the **priority fee** (tip).

1. **Base Fee:** In each Conflux epoch, the pivot block includes a `baseFeePerGas` field, which sets the minimum fee required for transaction inclusion in the block. If the specified transaction fee is lower than this base fee, the transaction will not be included in the block. The `baseFeePerGas` adjusts based on on-chain congestion: following the Conflux v2.4 hardfork, the maximum block size—and consequently the sum of the transaction gas limits—doubled. This change allows the network to handle higher payloads temporarily. If transactions exceed the original block gas limit, now referred to as the `gas target`, the base fee per gas for the current block increases. This system ensures users pay a higher fee during periods of high demand.

2. **Priority Fee:** This is an additional fee users can opt to pay to incentivize miners to prioritize their transactions. A higher priority fee can lead to faster execution of transactions as miners are encouraged to include them sooner.

Understanding these fees is crucial for effectively interacting with the blockchain and ensuring transactions are processed in a timely manner.

Here's a revised version of the section on Fixed Fee and Dynamic Fee in Conflux, aimed at enhancing clarity and simplicity:

### Fixed Fee and Dynamic Fee

:::note

To simplify this explanation, we are omitting a specific edge case related to [CIP-137 Base Fee Sharing in CIP-1559](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-137.md).

:::

Users have two options for specifying the fees they are willing to pay for their transactions:

#### Fixed Fee

Users can set the `gasPrice` directly in the transaction. The total gas fee is calculated as `gasPrice * gasCharged`. The priority fee paid to the miner is the difference between the `gasPrice` and the `baseFeePerGas`, multiplied by the `gasCharged`, which is `(gasPrice - baseFeePerGas) * gasCharged`.

#### Dynamic Fee

This method allows for more precise control over the gas fees:

- **`maxFeePerGas`**: This is the maximum total fee per gas unit that the user is willing to pay. It includes both the `baseFeePerGas` and the `priorityFeePerGas`.
- **`maxPriorityFeePerGas`**: This specifies the maximum priority fee per gas unit the user is willing to pay directly to the miner. The actual `priorityFeePerGas` paid is the lesser of `maxFeePerGas - baseFeePerGas` and `maxPriorityFeePerGas`. This ensures that if the base fee takes up most of the `maxFeePerGas`, the remaining amount will go towards the priority fee.

To illustrate, consider the following example where `maxFeePerGas` is set to 10 GDrip and `maxPriorityFeePerGas` is 5 GDrip:

![Priority Fee and Base Fee Interaction](./img/gasfee.drawio.svg)

- In the first scenario, the `baseFeePerGas` is low enough that both the base fee and the maximum priority fee fit within the `maxFeePerGas`, allowing the `priorityFeePerGas` to be 5 GDrip.
- In the second scenario, when the `baseFeePerGas` increases to 6 GDrip, the total `maxFeePerGas` is insufficient to cover both the base fee and the full `maxPriorityFeePerGas`. In this case, the transaction still processes, but the entirety of the remaining fee (after deducting the base fee from the max fee) is used as the priority fee.

## How to Pay Less in Gas Fees?

To minimize your gas fees, consider these strategies:

1. **Opt for Lower Fee Per Gas:** The `baseFeePerGas` fluctuates based on network congestion. By setting a lower `maxFeePerGas`, your transaction will process when the `baseFeePerGas` drops below this threshold. Timing your transactions during periods of lower activity can lead to significant savings.

2. **Reduce Gas Consumption:** If you are a smart contract developer, reducing gas costs is crucial. Focus on optimizing your contract's data storage, refining function executions, and using efficient looping practices. For comprehensive guidance on reducing gas usage, visit our [Gas Optimization](/docs/general/build/smart-contracts/gas-optimization/) tutorial.

## Further Readings

- [Ethereum Developer Documentation: Gas and Fees](https://ethereum.org/en/developers/docs/gas/)
