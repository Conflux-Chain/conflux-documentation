---
sidebar_position: 3
title: Staking
displayed_sidebar: coreSidebar
---

## 概览

Conflux 引入了质押机制，有两个原因：第一，质押机制提供了一种更好的方式来收取存储空间的占用费用（与“一次付费，永久占用”相比）；第二，这种机制也有助于在去中心化治理中定义投票权。

从高层次来看，Conflux 实现了一个内置的**Staking**合约，用于记录所有账户的质押信息，包括普通地址和智能合约。 通过向这个合约发送交易，用户（包括外部用户和智能合约）可以存入/取出资金，这也被称为在合约中的质押。

## 质押与取回

用户（或合约）可以通过调用 `deposit(uint amount)` 来存入余额进行质押，然后 `amount` Drip 将从其`balance`转移到 `stakingBalance`。 请注意，这个函数是无需支付的，用户只需要指定要质押的金额，无需将任何资金转移到内部合约，且**最低存款金额为1 CFX**。

用户还可以通过 `withdraw(uint amount) `来提取余额。 调用者可以调用这个函数从 Staking 合约中提取一些代币。 质押本金将及时转移到用户的余额中。

## 锁定与投票权

通过锁定质押余额（stakingBalance），用户可以获得*投票权*，进而进行链上治理。 通过函数 `voteLock(uint amount, uint unlock_block_number)`，账户做出承诺："在区块号为 `unlock_block_number` 的区块之前，我的 `stakingBalance` 将始终至少有 `amount` Drip。" 账户可以做出多个承诺，比如“我今年总是至少有 10 CFX，明年总是至少有 5 CFX。”  **一旦做出了承诺，就没有办法取消它！**但是账户可以通过锁定更多的余额来覆盖旧的承诺。 每当账户试图提取 `stakingBalance` 时，内部合约将检查剩余的余额是否符合锁定的承诺。

在这里，我们通过举几个例子来介绍锁定余额的详细逻辑。 假设当前的区块号是 `base`，Conflux 在今年剩余的时间内大约会生成 `x` 个区块，在明年会生成 `y` 个区块。 由于 Conflux 每秒生成两个区块，`y` 大约等于 `2 * 60 * 60 * 24 * 365`. 而 `x` 的值取决于你阅读这篇文章的时间。

1. 如果一个账户在 `stakingBalance` 中有 10 CFX，并且它调用了 `voteLock(100 * 10^18, base + x)`，那么交易将失败，因为这个账户试图用不足的 `stakingBalance` 锁定 100 CFX。
2. 然而，如果这个账户调用了 `voteLock(8 * 10^18, base + x)`，那么交易将成功。
3. 在此之后，如果这个账户调用了 `voteLock(6 * 10^18, base + x + y)`，那么交易也将成功。 这意味着 8 - 6 = 2 CFX 将在今年年底解锁，另外 6 CFX 将在明年年底解锁。
4. 然后，如果这个账户调用了 `voteLock(0, base + x)`，什么也不会发生。 交易在执行过程中不会触发错误。 内置合约将把这个调用视为一个无意义的承诺：账户将至少质押 0 CFX。 第 2 步和第 3 步做出的旧承诺仍然有效。
5. 如果这个账户调用了 `voteLock(9 * 10^18, base + x + y)`，那么旧的两个承诺将被覆盖，因为“在明年年底之前锁定 9 CFX”是一个更强的承诺。

在任何时候，每个锁定的 Drip 都会根据其解锁时间被分配一个从 0 到 1 的*投票权*。 在一年以上解锁的 Drip 将拥有完全的投票权。 更多细节请参见 [Conflux 协议规范](https://conflux-protocol.s3-ap-southeast-1.amazonaws.com/tech-specification.pdf)第 8.3.2 节。

## 接口

这个内部合约的地址为： `0x088800000000000000000000000000000000000002`

```js
pragma solidity >=0.4.15;

contract Staking {
    /*** Query Functions ***/
    /**
     * @dev get user's staking balance
     * @param user The address of specific user
     */
    function getStakingBalance(address user) public view returns (uint256) {}

    /**
     * @dev get user's locked staking balance at given blockNumber
     * @param user The address of specific user
     * @param blockNumber The blockNumber as index.
     */
    // ------------------------------------------------------------------------
    // Note: if the blockNumber is less than the current block number, function
    // will return current locked staking balance.
    // ------------------------------------------------------------------------
    function getLockedStakingBalance(address user, uint256 blockNumber) public view returns (uint256) {}


    /**
     * @dev get user's vote power staking balance at given blockNumber
     * @param user The address of specific user
     * @param blockNumber The blockNumber as index.
     */
    // ------------------------------------------------------------------------
    // Note: if the blockNumber is less than the current block number, function
    // will return current vote power.
    // ------------------------------------------------------------------------
    function getVotePower(address user, uint256 blockNumber) public view returns (uint256) {}

    function deposit(uint256 amount) external {}

    function withdraw(uint256 amount) external {}

    function voteLock(uint256 amount, uint256 unlockBlockNumber) external {}
}
```

## 示例

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
