---
sidebar_position: 5
title: Glossary
# keywords: to enrich
---

## account

The Conflux global state is described in an account model, with the basic storage component called an account. Every actor, which is either a person or an entity that is able to interact with the Conflux world, has its necessary information stored in an account α as a key/value pair of [address](#address) and corresponding state. Refer to [general-accounts](./accounts.md) for detailed information.

## address

Address is the identifier of an [account](#account). The address format differs in different Conflux [spaces](./spaces.md). For example:

``` 
// espace address
0x1e97870f263700f46aa00d967821199b9bc5a120
// Core Space Mainnet address
cfx:aatktb2te25ub7dmyag3p8bbdgr31vrbeackztm2rj
// Core Space Testnet address
cfxtest:aatktb2te25ub7dmyag3p8bbdgr31vrbeajcg9pwkc
```

Refer to [general-address](./accounts.md#address), [core-address](../../core/learn/core-space-basics/addresses.md), [espace-address](../../espace/learn/accounts.md#mapped-addresses-in-cross-space-operations) for more information.

## CFX

To incentivize the maintenance of the Conflux network and charge users for consumption of resources, Conflux has a native currency called the Conflux coin, simply denoted by CFX for short. The smallest subdenomination is denoted by Drip, in which all values processed in Conflux are integers. One Conflux is defined as 10^18 Drip. Frequently used subdenominations of Conflux are listed below:

| Multiplier (in Drip) | Name   |
| ------------- |:-------------:|
| 10^0          | Drip          |
| 10^9          | GDrip         |
| 10^12         | uCFX          |
| 10^18         | Conflux(CFX)  |

As a native token of the Conflux network, CFX plays a very important role in the stability of the system
    - It works as the reward of PoW and PoS consensus 
    - the transaction fee for each transaction.
    - DAO voting
    - ...

For more information on the genesis creation, distribution, and release of CFX, please refer to:

- [Economics white paper](https://confluxnetwork.org/files/Conflux_Economic_Paper_20201230.pdf)
- [The Role of the CFX token in the Conflux Network](https://medium.com/conflux-network/the-role-of-the-cfx-token-in-the-conflux-network-5a56c2b43bb0)
- [On-chain DAO Vote for Chain Parameters](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-94.md)
- [Economics](./economics.md)

## chainId & networkId
`chainId` is a number indicating where a transaction is intended to be executed. It is used to prevent transaction replay attacks.
The chainId of Conflux is a constant, currently:

* mainnet: `1029`
* testnet: `1`

`networkId` is used to distinguish between blockchains at the network layer. Currently Conflux mainnet/testnet's `networkId` is same as `chainId`.
You can get both of these from the `cfx_getStatus` RPC method.

## internal transactions

Internal transactions in blockchain refer to value transfers or operations within a smart contract. Internal transactions are triggered by external transactions and can involve actions such as transferring tokens, creating new tokens, executing function calls, or interacting with other smart contracts. These transactions are not recorded individually on the blockchain. [ConfluxScan](https://confluxscan.io) and [trace JSON-RPC API](../../core/build/json-rpc/trace-namespace.md) can track and display internal transactions for analysis and visibility.

Related links:

- [trace JSON-RPC API](../../core/build/json-rpc/trace-namespace.md)

## spaces

In the Conflux v2.0 (Hydra) upgrade, a new feature called "Spaces" was introduced. Spaces is a way to virtually create a sub-chain of the original Conflux network, known as **`eSpace`**.  Core Space refers to the original Conflux network, while eSpace is the virtualized Ethereum chain running on top of the Core Space network. The two spaces are logically independent of each other and do not affect each other.

Refer to [spaces](./spaces.md) for more information.

## transactions

A Conflux transaction is a single instruction composed by an external actor with a Conflux account, and this instruction is cryptographically signed using the sender account's private key to prevent transaction forge. A transaction can involve a simple transfer of CFX (the native currency of Conflux), a transfer of tokens (such as ERC20 or ERC721), a deployment of a new smart contract, or an execution of a function on an existing smart contract. Transactions are the only way to store or update data on the blockchain.

Refer to [transactions](./transactions.md) for more information.
