---
id: pos_overview
title: PoS 概览
sidebar_position: 2
displayed_sidebar: generalSidebar
keywords:
  - Conflux-Network
  - Proof-of-Stake
  - PoS 共识机制
  - consensus-mechanism
  - 51-attack
  - PoW-chain
  - pivot-block
  - voting-committee
  - BLS
  - VRF
  - staking
  - CFX
  - incentive-plan
  - security
tags:
  - Proof-of-Stake
---

本文是介绍 Conflux PoS 最终性的概念，而不涉及具体的细节。 它是帮助读者一般地理解 PoS 的，也是阅读其他技术文档的基础。

在 PoW 链的早期阶段，当算力较低时，可能会存在 `51%` 攻击的问题。 随着公链的发展，算力租赁平台的出现使这个问题更加严重。 Ethereum Classic, Grin, and Verge have all been the victims of the 51% attack last year.

为了应对 51% 攻击带来的威胁，Conflux 将引入一条独立的 PoS 链。 PoS 链上的共识参与者将定期对树图结构的枢轴区块进行签名。 所有 PoW 矿工应该选择有足够签名的枢轴区块进入主链，即使它的兄弟区块有更高的权重。 简单来说，PoS 链指定了一个枢轴区块，所有 PoW 矿工都应该遵循这个区块。

这意味着只要 PoS 共识对一个枢轴区块进行了投票，即使 51% 的攻击者试图回滚这个区块，它也不会被 PoW 节点所认可。

Conflux 要求 PoS 共识有限制地指定枢轴区块。 一个区块必须在 PoW 规则下被确认几分钟后，诚实的 PoS 节点才会对它进行签名。 这意味着树图结构中的区块排序和确认仍然是由 PoW 矿工完成的。

* PoS 链只用于应对 51% 的攻击。 因此，它只包含基本的功能，如枢轴区块投票和投票委员会选举。 它不包含一般区块链的功能，如交易和合约执行。
* PoS 链的功能是 Conflux 节点中内置的功能。 从外部来看，仍然只有一个程序：conflux-rust。
* 在本文中，Conflux 链指的是运行中的区块链，PoS 链指的是新引入的链。
* There is approximately 1 PoS block generated per minute. All the times stated below are corresponding to the number of blocks.

## PoS Account

### 地址

Generally speaking, the account model on a blockchain is: a private key creates a public key, and a public key produces an address. The accounts on the PoS chain are similar, but there are two private keys called the BLS private key and the VRF private key, corresponding to the BLS public key and the VRF public key respectively. The two public keys are hashed to obtain the PoS address, which is currently 256-bit long.


```js
0xd731d7633dd38c47769c2a62926b9a54d288a5e664f4d2108ac5bb6601bb30f5
```

### 钱包

The primary responsibility of a PoS account is to maintain the Conflux consensus protocol. Each PoS account should run an independent Conflux node. Thus, the Conflux core code has the built-in wallet functionality for PoS accounts, including: When the Conflux node is launched for the first time and is running in the PoS account mode, it will automatically generate the PoS private key and require users to provide the password. The private key that is encrypted by the supplied password is stored locally.

* When the Conflux node restarts, the user is required to enter the password to unlock the private key file if the encrypted private key file is detected.
* The transactions are automatically processed under the consensus protocol of PoS during operation, without user intervention.
* Since the wallet is implemented by a full node, the interaction with the wallet is primitive, which may involve copying files manually, etc.

### Become a consensus node

After a PoS account is created, it can only become a legal consensus node by staking and registering on the PoW chain.

* Staking: no difference from the current staking process.
* Registration: interact with specific internal contact on the Conflux chain; submit relevant information provided by the full node; lock the staked amount, one vote per `1000` locked CFX.

After completing the registration, the PoW account that staked and the PoS account form a one-to-one binding relationship. The PoS account cannot change its bound PoW account. The PoW account can bind to another PoS account as long as it releases the previous binding relationship.

## Participating in PoS Consensus

### Get voting rights

PoS accounts can get voting rights by locking CFX. (refer to chapter “Become a consensus node”)

* Conflux-rust will automatically monitor the registration information. Therefore, after the PoS account is registered, it will perform corresponding operations without the user’s intervention.
* Users can lock more CFX tokens on the Conflux chain at any time to obtain more voting rights.
* After the token is locked, it takes about `10 minutes` to synchronize the state from the Conflux chain to the PoS chain. The user will get the voting rights after the synchronization.

### Withdraw voting rights

The PoS account can withdraw the voting rights and unlock CFX.

* Users need to use the bound PoW account to send transactions on the Conflux chain to apply for unlocking tokens (referred to as ‘retirement’ in the code). Users can unlock any number of locked tokens.
* Users can apply for unlocking at any time. Once the unlock is requested, the corresponding voting rights will become invalid immediately. However, the tokens will be unlocked only when the following conditions are met:
  1. The tokens have been locked for at least 14 days.
  2. The request for unlocking has passed for 1 days
* If there are multiple transactions locking tokens, they will be unlocked in chronological order until the required unlocking quantity is met.

### 示例

Suppose that user A locks 2000 CFX on Jan 1st, 3rd, and 5th, respectively, and applies to unlock 3000 CFX on Jan 9th.

* The 2000 CFX locked on Jan 1st will unlock first.
* 14-day requirement for locking: Jan 1st + 14 days = Jan 15th.
* 1-day requirement after unlocking request: Jan 9th + 1 days = Jan 10th.
* Therefore, there will be 2000 CFX unlocked on Jan 15th.
* After that, 1000 CFX on Jan 3rd will unlock.
* 14-day requirement for locking: Jan 3rd + 14 days = Jan 17th.
* 1-day requirement after unlocking request: Jan 9th + 1 days = Jan 10th.
* Therefore, there will be 1000 CFX unlocked on Jan 17th, which will satisfy the requested unlocking amount, 3000.

At the end, the user is left with 1000 CFX locked on Jan 3rd and 2000 CFX locked on Jan 5th.

## The Work of PoS Consensus

The following content is about what the PoS node does automatically, for your information.

### Candidate committee

* The PoS account will join the election of a committee of up to `300` seats through VRF.
* The committee consists of 6 groups of members, each with 50 seats.
* Every hour, one of the 6 groups that served the longest time will retire, and a new group succeeds.
* The election starts 1.5 hours in advance and ends half an hour in advance.
* The vote of each PoS account is regarded as an independent candidate at the time of election. If a PoS account has 10 votes, it will be considered as 10 different candidates participating in the election. If 2 votes of this account have been elected, it will occupy 2 seats in this committee, and the remaining 8 votes can participate in the next election.
* The PoS account submits the result of the VRF during the election period. The hash value is calculated based on the result, and the 50 votes with the smallest hash value will be selected.

For instance, if the VRF result is x, and the PoS account has 5 votes, then the hash value is hash(x, 0) ~ hash(x, 4).

### As a member

* The members of the committee will participate in the PoS consensus and vote on the pivot block of the Conflux chain.

### Incentive Plan

**The existing staking interest for Conflux will be cancelled.**

* After the PoS account participates in the election or becomes a committee member, points will be awarded based on different actions it takes. The total point is 6,000,000.
* The points are settled when the committee changes (every 60 blocks). The interest generated by the Conflux chain during this period will be divided into 6,000,000 shares evenly. The interest will be distributed to the PoW accounts that are bound to the PoS accounts according to the points they have.
* The points produced by a committee may be less than 6,000,000. The interest that is not distributed will be burned.

### Points composition

* The 10000 votes that participate in the election and have the smallest hash value get 120 points each, forming a total of 1.2M points.
* 15,000 points will be awarded to PoS accounts per elected vote. There will be a total of 4.5M points for 300 committee votes.
* Becoming the leader of a PoS block will be awarded 3,000 points. There are 60 blocks for a total of 180,000 points.
* Each PoS block requires 201 out of 300 signatures, but the leader can pack more than 200 signatures. Starting with the 200th signature, each additional signature will receive 20 points up to 2,000 points. There are 60 blocks for a maximum of 120,000 points.

### Accrued interest

* Since the amount of staking and the total issuance of CFX are changing, the interest generated by each Conflux chain block is also changing. The interest generated by each block on the Conflux chain is:  sqrt(total staking amount / total CFX circulating) * 4% / number of blocks per year.
* No interest will be accrued if the PoS committee has not been changed after 7,200 consecutive blocks on the Conflux chain. Interest accruing will resume only after the current interest is distributed. This is to prevent PoS nodes from deliberately slowing down the consensus to obtain more interest.

## Risk Reminder

### Principal Loss

If a PoS account signs two different PoS blocks with the same height, its CFX tokens will be locked permanently. This situation may occur when:

* The account attacks the consensus protocol by modifying the Conflux node;
* Using the same PoS account on multiple Conflux nodes. (This will cause the same account to perform conflicting operations, which is considered as an attack to the consensus protocol.)
* Losing PoS private key files.

### Liquidity Risk

* All the locked votes will unlock automatically if a candidate is elected to join the committee but does not participate in signing between two elections. All newly locked votes will unlock automatically in the next `1` days as well.

### Revenue Loss

* If the node bound to the PoS account is not launched successfully, there may be no gains.

