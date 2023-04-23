---
sidebar_position: 6
title: CrossSpaceCall
---

## CrossSpaceCall 接口

[CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md) 引入了一个新的内置合约：`CrossSpaceCall`. 这个合约位于Core Space的地址`cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa2sn102vjv` (`0x0888000000000000000000000000000000000006`)。 `CrossSpaceCall`可以实现**CFX和数据**在两个空间之间的转移。

注意：`CrossSpaceCall`合约部署在Core Space。 它只能从Core Space调用。

```js
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

interface CrossSpaceCall {
    event Call(bytes20 indexed sender, bytes20 indexed receiver, uint256 value, uint256 nonce, bytes data);

    event Create(bytes20 indexed sender, bytes20 indexed contract_address, uint256 value, uint256 nonce, bytes init);

    event Withdraw(bytes20 indexed sender, address indexed receiver, uint256 value, uint256 nonce);

    event Outcome(bool success);

    /**
     * @dev Deploy a contract in eSpace
     * @param init bytes -  The contract init bytecode
     * @return bytes20 - The hex address of the deployed contract
     */
    function createEVM(bytes calldata init) external payable returns (bytes20);

    /**
     * @dev Transfer CFX from Core space to eSpace specify address. Transfer amount is specified by transaction value.
     * @param to bytes20 - The hex address of the receiver address in eSpace
     * @return output bytes
     */
    function transferEVM(bytes20 to) external payable returns (bytes memory output);

    /**
     * @dev Call eSpace contract method from Core space
     * @param to bytes20 - The hex address of the contract in eSpace
     * @param data bytes - The contract method call data
     * @return output bytes - Method call result
     */ 
    function callEVM(bytes20 to, bytes calldata data) external payable returns (bytes memory output);

    /**
     * @dev Static call eSpace contract method from Core space
     * @param to bytes20 - The hex address of the contract in eSpace
     * @param data bytes - The contract method call data
     * @return output bytes - Method call result
     */ 
    function staticCallEVM(bytes20 to, bytes calldata data) external view returns (bytes memory output);

    /**
     * @dev Widthdraw CFX from eSpace mapped account's balance
     * @param value uint256 - The amount of CFX to be withdrawn
     */ 
    function withdrawFromMapped(uint256 value) external;

    /**
     * @dev Query eSpace mapped account's CFX balance
     * @param addr address - The core address to query
     * @return uint256 - Balance
     */
    function mappedBalance(address addr) external view returns (uint256);

    /**
     * @dev Query eSpace mapped account's nonce
     * @param addr address - The core address to query
     * @return uint256 - Balance
     * */ 
    function mappedNonce(address addr) external view returns (uint256);
}
```

## 跨空间CFX转移

### 从Core到eSpace

将CFX从Conflux核心转移到eSpace可以通过调用`CrossSpaceCall.transferEVM(bytes20 to)`方法来实现。 调用这个方法时，你还需要指定目标地址（`to`）。 通过设置该交易的 value 来指定要转移的 CFX 数量。

以js-conflux-sdk (v2)为例：

```js
const { Conflux, format, Drip, CONST } = require('js-conflux-sdk');

// Init Conflux instance
const conflux = new Conflux({
  url: "https://test.confluxrpc.com",
  networkId: 1
});

// Add account private key
const account = conflux.wallet.addPrivateKey(process.env.PRIVATE_KEY);  // Replace PRIVTE_KEY with your own private key

const CrossSpaceCall = conflux.InternalContract('CrossSpaceCall');

async function main() {
  // The eSpace receiver address
  const receiverAddress = "0x02e1A5817ABf2812f04c744927FC91F03099C0f4";

  const receipt = await CrossSpaceCall
    .transferEVM(receiverAddress)
    .sendTransaction({
      from: account.address,
      value: Drip.fromCFX(1),
    })
    .executed();

  console.log('Cross-space transfer: ', receipt.outcomeStatus === CONST.TX_STATUS.SUCCESS ? 'Success' : 'Fail');
}

main().catch(console.log);
```

只要成功调用了`CrossSpaceCall.transferEVM(bytes20 to)`方法，你就可以通过查看eSpace中目标地址的余额来看到变化。

### 从eSpace回到Core

将CFX从eSpace回到Conflux Core Space需要两个步骤。

1. 将CFX转移到接收者Core Space地址在eSpace中的映射账户。
2. 在Core Space用接收者地址调用`CrossSpaceCall.withdrawFromMapped(amount)`来提取CFX。

使用js-conflux-sdk (v2)跨回CFX的示例：

```js
// Check above init code
async function main() {
  const mappedBalance = await CrossSpaceCall.mappedBalance(account.address);
  console.log('Mapped account balance: ', Drip.toCFX(`${mappedBalance}`));

  const receipt = await CrossSpaceCall
    .withdrawFromMapped(Drip.fromCFX(1))
    .sendTransaction({
      from: account.address,
    })
    .executed();

  console.log('Cross-space transfer: ', receipt.outcomeStatus === CONST.TX_STATUS.SUCCESS ? 'Success' : 'Fail');
}

main().catch(console.log);
```

上面的示例是为了演示在Conflux Core Space和Conflux eSpace之间转移CFX的技术细节。 用户可以使用[Space Bridge Dapp](https://confluxhub.io/espace-bridge/cross-space) 直接通过他们的钱包跨CFX。

## 参考

* [Mainnet Space Bridge](https://confluxhub.io/espace-bridge/cross-space)
* [Testnet Space Bridge](https://test.confluxhub.io/espace-bridge/cross-space)
