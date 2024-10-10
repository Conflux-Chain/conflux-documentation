---
sidebar_position: 2
title: Accounts
displayed_sidebar: coreSidebar
tags:
  - Accounts
  - Core Space
  - Account Address
  - Account State
  - cfx_getAccount
  - Basic State
  - Storage State
  - Code Information
  - Staking Deposit List
  - Staking Vote Lock List
  - Nonce
  - Balance
  - CodeHash
  - StakingBalance
  - Admin
  - SponsorInfo
  - StorageCollateral
  - AccumulatedInterestReturn
---

:::note

This page is created to provide information for CORE SPACE ACCOUNTS. Refer to [General-Accounts](../../general/conflux-basics/accounts.md) for the overall introduction of the concept of ACCOUNTS.

:::

## Account Address

An account is identified by its address. For more information, refer to [Address](./addresses.md)

## Account State

### Query

The account state can be queried using [cfx_getAccount RPC](../build/json-rpc/cfx-namespace.md#cfx_getaccount).

```json
// Request
curl --data '{"jsonrpc":"2.0","method":"cfx_getAccount","params":["cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp", "latest_state"],"id":1}' -H "Content-Type: application/json" localhost:12539

// Result
{
  "jsonrpc": "2.0",
  "result": {
    "accumulatedInterestReturn": "0x0",
    "admin": "CFX:TYPE.USER:AARC9ABYCUE0HHZGYRR53M6CXEDGCCRMMYYBJGH4XG",
    "balance": "0x0",
    "codeHash": "0x45fed62dd2b7c5ed76a63628ddc811e69bb5770cf31dd55647ca219aaee5434f",
    "collateralForStorage": "0x0",
    "nonce": "0x1",
    "stakingBalance": "0x0"
  },
  "id": 1
}
```

### Illustration

The global state of Conflux is composed of individual account states, each of which is an address-state pair (key pair).

A Conflux account state includes five parts:

- ```Basic state``` is the basic state of the account.
- ```Storage state``` is a key/value database or storage space that can be used to store custom states or data of smart contracts.
- ```Code information``` is the code information of the smart contract account. It includes the contract codes and the ```address``` of the account that paid the fee for the storage space occupied by the codes.
- ```Staking deposit list``` is the list of Staking operations of the accounts (it will be removed in the next Hardfork).
- ```Staking vote lock list``` is the list of lock operations performed by the account to participate in DAO voting.

The basic status of the account consists of eight fields as follows:

- ```Nonce``` is a counter to keep track of the number of transactions sent by an account. It is also used to ensure that each transaction can only be executed once. For contract accounts, this value indicates the number of ```contracts created by this contract```.
- ```Balance``` is the number of CFX of the address in Drip. Drip is the smallest unit of CFX, where 1CFX=10^18 Drip.
- ```CodeHash``` is the hash of the code of the contract account. The user can reference the contract code, the code cannot be modified after the contract is created. The code will be executed when the contract receives a message call. For external accounts, codeHash is a hash of an empty string.
- ```StakingBalance``` is the balance of the staked amount. Similarly, the unit is Drip.
- ```Admin``` is the administrator address of the ```contract account``` recorded in the AdminControl internal contract. In default, the contract administrator is set to the account which deployed this contract when it is created. The administrator can destroy the contract it manages through the internal contract AdminControl, or give the administrator role to another account. The administrator address of an external account is itself.
- ```SponsorInfo``` is the information of the contract sponsor. It contains ```sponsor for gas```, ```sponsor for collateral```, ```sponsor gas limit```, ```sponsor balance for gas```, and ```sponsor balance for collateral```.
- ```StorageCollateral``` is the amount of Drip staked to use the storage spaces.
- ```AccumulatedInterestReturn``` is the amount of cumulative reward of the account from Staking. The unit of it is Drip. Starting with Conflux 2.0, users must also participate in PoS in order to receive the reward.

For more details about accounts, please refer to the ```Accounts``` section in [Conflux Protocol Specification](https://www.confluxnetwork.org/files/Conflux_Protocol_Specification.pdf).
