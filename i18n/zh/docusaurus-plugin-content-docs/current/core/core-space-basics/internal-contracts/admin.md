---
sidebar_position: 1
title: AdminControl
displayed_sidebar: coreSidebar
---

## 概览

`AdminControl` 合约是一个用于合约开发调试的工具。  当在一个交易中创建一个合约时，当前交易的发送方将自动成为合约的管理员。

`admin`地址可以通过调用接口`setAdmin(address contractAddr, address newAdmin)`将管理员权限转移给其他**普通地址**或**零地址**。 **A contract can never be an admin**.

管理员在合约中有多种管理员权限。 它可以调用接口 `destroy(address contractAddr)` 来销毁合约，就像合约调用 `suicide()` 函数一样。 SponsorWhitelist 内部合约提供了一些只能被管理员地址调用的功能。 这些函数可以更新赞助人机制中的白名单。 他们稍后会被介绍。

**注意：所有需要管理员权限的接口，在内置合约执行期间，无论执行成功与否，都不会触发错误或异常。**例如，如果一个非管理员地址试图将管理员地址设置为自己的地址，该交易将成功，但不会发生任何变化。

ConfluxScan 可能会将具有非零管理员地址的合约标记为调试模式。 **所以请记住，如果您认为合约已经准备好进入生产环境，您应该将管理员地址设置为零。**


`AdminControl` 合约还提供了一个查询接口 `getAdmin(address contractAddr)`，任何人都可以调用。

**边界情况：**
1. 管理员在合约创建时就被设置了。 因此，如果发送方 `A` 创建合约 `B` 并在合约构造期间将管理员设置为 `C`，则合约部署时管理员将为 `C`。
2. 然而，如果发送者 `A` 调用合约 `B`，然后合约 `B` 创建合约 `C` 并在合约构造期间将管理员设置为 `D`，那么该设置将失败，因为 `C` 的管理员是 `A`，而创建 `C` 的发送者是 `B`。
3. 但是，Conflux 引入了一种特殊策略。 在情况2中，如果 `D` 是零地址，则设置管理员会成功。 **This means that a contract can declare "I don't need admin" during contract creation.**

## Interface

AdminControl's hex40 address is `0x0888000000000000000000000000000000000000`, with interface:

```js
pragma solidity >=0.4.15;

contract AdminControl {
    /*** Query Functions ***/
    /**
     * @dev get admin of specific contract
     * @param contractAddr The address of specific contract
     */
    function getAdmin(address contractAddr) public view returns (address) {}

    /**
     * @dev Contract admin set the administrator of contract `contractAddr` to `newAdmin`.
     * @param contractAddr The address of the contract
     * @param newAdmin The new admin address
     */
    function setAdmin(address contractAddr, address newAdmin) public {}

   /**
     * @dev Contract admin destroy contract `contractAddr`.
     * @param contractAddr The contract to be destroied
     */
    function destroy(address contractAddr) public {}
}
```

## JS Example

Consider you have deployed a contract whose address is `contractAddr`. The administrator can call `AdminControl.setAdmin(contractAddr, new_admin)` to change the administrator and call `AdminControl.destroy(contractAddr)` to kill the contract.

```javascript
const { Conflux } = require('js-conflux-sdk');

function main() {
    const cfx = new Conflux({
    url: 'https://test.confluxrpc.com',
    networkId: 1,
    });

    const PRIVATE_KEY = '0xxxxxxx';
    const account = cfx.wallet.addPrivateKey(PRIVATE_KEY); // create account instance

    const adminContract = cfx.InternalContract('AdminControl');

    // make sure account is the admin of contractAddr
    const contractAddr = 'cfxtest:acepe88unk7fvs18436178up33hb4zkuf62a9dk1gv';

    // to change administrator
    adminContract.setAdmin(contractAddr, new_admin).sendTransaction({
    from: account,
    }).executed();

    // to kill the contract
    adminContract.destroy(contractAddr).sendTransaction({
    from: account,
    }).executed();
}

main();
```
