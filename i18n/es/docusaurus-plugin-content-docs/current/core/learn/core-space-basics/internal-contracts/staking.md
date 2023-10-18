---
sidebar_position: 3
title: Staking
---

## Overview

Conflux introduces the staking mechanism for two reasons: first, staking mechanism provides a better way to charge the occupation of storage space (comparing to “pay once, occupy forever”); and second, this mechanism also helps in defining the voting power in decentralized governance.

At a high level, Conflux implements a built-in **Staking** contract to record the staking information of all accounts, for both normal addresses and smart contracts. By sending a transaction to this contract, users (both external users and smart contracts) can deposit/withdraw funds, which is also called stakes in the contract.

A user (or a contract) can deposit balance for staking by calling `deposit(uint amount)` and then `amount` Drip will be moved from its `balance` to `stakingBalance`. Notice that this function is non-payable, the user only needs to specify the amount to be staked without transferring any funds to internal contract and the minimum deposit amount is `1 CFX`.

The user can also withdraw balance by `withdraw(uint amount)`. The caller can call this function to withdraw some tokens from the Conflux Internal Staking Contract. The staking capital will be transferred to the user's balance in time.

## Locking and Vote Power

By locking the staking balance, the user can obtain *vote power* for further on-chain governance. With function `voteLock(uint amount, uint unlock_block_number)`, the account makes a promise that "My `stakingBalance` will always have at least `amount` Drip before the block with block number `unlock_block_number`". The account can make multiple promises, like "I will always at least 10 CFX in this year, and then always stake at least 5 CFX in the next year."  **Once the promise has been made, there is no way to cancel it!** But the account can overwrite old promise by locking more balance. Whenever the account tries to withdraw `stakingBalance`, the internal contract will check whether the rest balance matches the locking promise.

Here we introduce the detailed logic for locking balance by illustrating several examples. Suppose the current block number is `base`, Conflux will generate about `x` blocks in the rest of this year and `y` blocks in the next year. Since Conflux generates two block per second, `y` approximately equals to `2 * 60 * 60 * 24 * 365`. And the value of `x` depends on when you read this article.

1. If an account has 10 CFX in `stakingBalance`, and it calls `voteLock(100 * 10^18, base + x)`, then the transaction will  fail because this account tries to lock 100 CFX with insufficient `stakingBalance`.
2. However, if this account calls `voteLock(8 * 10^18, base + x)`, the transaction will success.
3. After that, if this account calls `voteLock(6 * 10^18, base + x + y)`, the transaction will also success. It means that 8 - 6 = 2 CFX will be unlocked until the end of this year, and another 6 CFX will be locked until the end of next year.
4. Then, if this account calls `voteLock(0, base + x)`, nothing will happen. The transaction will not trigger an error during execution. The internal contract will regard this call as a meaningless promise: the account will stake at least 0 CFX. The old promises made in step 2 and step 3 will still hold.
5. If this account calls `voteLock(9 * 10^18, base + x + y)`, the old two promises will be overwritten because "locking 9 CFX until the end of the next year" is a stronger promise.

At any time, each locked Drip will be assigned a *vote power* from 0 to 1 according to its unlock time. The Drips to be unlocked in more than one year will have a full vote power. See section 8.3.2 in the [Conflux Protocol Specification](https://conflux-protocol.s3-ap-southeast-1.amazonaws.com/tech-specification.pdf) for more details.

## Examples

```javascript
const PRIVATE_KEY = '0xxxxxxx';
const cfx = new Conflux({
  url: 'https://test.confluxrpc.com',
  logger: console,
  networkId: 1,
});
const account = cfx.wallet.addPrivateKey(PRIVATE_KEY); // create account instance

const staking_contract = cfx.InternalContract('Staking');
// deposit some amount of tokens
staking_contract.deposit(your_number_of_tokens).sendTransaction({
  from: account,
}).confirmed();

// withdraw some amount of tokens
staking_contract.withdraw(your_number_of_tokens).sendTransaction({
  from: account,
}).confirmed();

// lock some tokens until some block number
staking_contract.voteLock(your_number_of_tokens, your_unlock_block_number).sendTransaction({
  from: account,
}).confirmed();
```
