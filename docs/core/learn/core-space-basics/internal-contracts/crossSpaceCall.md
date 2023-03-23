---
sidebar_position: 6
title: CrossSpaceCall
---

## CrossSpaceCall Interface

[CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md) introduces a new internal contract: `CrossSpaceCall`. This contract is located at address `cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa2sn102vjv` (`0x0888000000000000000000000000000000000006`) in the Core Space. `CrossSpaceCall` enables **CFX and data** to be transferred between the two spaces.

NOTE: The `CrossSpaceCall` contract is deployed in the Core Space. It can only be call from the Core Space.

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

## Cross-Space CFX Transfer

### From Core to eSpace

Transferring CFX from Conflux Core to eSpace can be done by calling the `CrossSpaceCall.transferEVM(bytes20 to)` method. When calling this method, you also need to specify the destination address (`to`). The amount of CFX to be transferred is specified as the value of this transaction.

Take js-conflux-sdk (v2) as an example：

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

As long as the `CrossSpaceCall.transferEVM(bytes20 to)` method is called successfully, you can see the change by looking up the balance of the desination address in eSpace.

### From eSpace back to Core

Transferring CFX from eSpace back to Conflux Core requires two steps.

1. Transfer CFX to the mapped account of the receiver Core Space address in eSpace.
2. Call `CrossSpaceCall.withdrawFromMapped(amount)` in Core with the receiver address to withdraw the CFX.

Example of using js-conflux-sdk (v2) to cross back CFX:

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

The above example is intended to demonstrate the technical details of transferring CFX between Conflux Core and Conflux eSpace. Users can use the [Space Bridge Dapp](https://confluxhub.io/espace-bridge/cross-space) to cross CFX directly through their wallets.

## Refers

* [Mainnet Space Bridge](https://confluxhub.io/espace-bridge/cross-space)
* [Testnet Space Bridge](https://test.confluxhub.io/espace-bridge/cross-space)
