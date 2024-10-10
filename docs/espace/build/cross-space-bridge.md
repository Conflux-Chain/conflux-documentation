---
sidebar_position: 5
title: CrossSpaceCall Contract
description: Detail explain of CrossSpaceCall contract
displayed_sidebar: eSpaceSidebar
tags:
  - CIP-90
  - Conflux eSpace
  - Conflux Core
  - EVM Compatibility
  - CrossSpaceCall
  - Internal Contract
  - Cross-Space Operations
  - CFX Transfer
  - Smart Contracts
  - Mapped Addresses
  - Ethereum Compatibility
  - Transaction Format
  - Address Generation
  - Base32 Addresses
  - Hex Addresses
  - EIP-155
  - CIP-37
  - EIP-55
  - Atomic Operations
  - Layer-1 Security
  - js-conflux-sdk
  - Solidity
  - RPC Methods
  - Blockchain Interoperability
  - Cross-Chain Communication
  - Contract Deployment
  - Contract Interaction
---

Conflux eSpace and Core space are two separate space, you can not send CFX from base32 address to hex address directly. You can only use [Confluxhub Space Bridge](https://confluxhub.io/espace-bridge/cross-space) to cross CFX between eSpace and Core Space.

Under the hood there is a internal contract named `CrossSpaceCall` in Core Space, which is used to transfer CFX between eSpace and Core Space. With CrossSpaceCall, it becomes feasible to directly engage with eSpace contracts from within Core Space. This contract is introduced by [CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md). 

## CrossSpaceCall Interface

This contract is available on Core Space under the address:

* base32 address: [`cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa2sn102vjv`](https://confluxscan.io/address/cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa2sn102vjv)
* hex address(use in solidity): `0x0888000000000000000000000000000000000006`

Below is the interface of this contract:

```js
interface CrossSpaceCall {
    /**
     * @dev Deploy a contract in eSpace
     * @param init bytes -  The contract init bytecode
     * @return bytes20 - The hex address of the deployed contract
     */
    function createEVM(bytes calldata init) external payable returns (bytes20);
    /* methods for cross-space CFX transfers */

    /**
     * @dev Transfer CFX from Core space to eSpace specify address. Transfer amount is specified by transaction value.
     * @param to bytes20 - The hex address of the receiver address in eSpace
     * @return output bytes
     */
    function transferEVM(bytes20 to) external payable returns (bytes memory output);
    
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
    
    /* methods for other cross-space operations */

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
}
```

## Transfer CFX between eSpace and Core Space

Cross CFX between eSpace and Core Space can be achieved through call `CrossSpaceCall` internal contract's related methods.

Note that `CrossSpaceCall` (like other internal contracts) can only be accessed in the Conflux Core space.

### From Core Space to eSpace

**Core to eSpace**: To transfer CFX from Conflux Core to Conflux eSpace, the `transferEVM(bytes20 to)` method of this contract needs to be called. The destination address of this transfer is specified by the method parameter `to`. The cross-space transfer will be executed in a single atomic step.

```js
function transferEVM(bytes20 to) external payable returns (bytes memory output);
```

#### JS Example

```js
const { Conflux, Drip } = require('js-conflux-sdk');

const conflux = new Conflux({
  url: 'https://main.confluxrpc.com',
  networkId: 1029,
});

const account = conflux.wallet.addPrivateKey(process.env.PRIVATE_KEY);

const crossSpaceCall = conflux.InternalContract('CrossSpaceCall');

async function main() {
    const eSpaceAddress = '0x3D69D968e3673e188B2D2d42b6a385686186258f';

    const receipt = await crossSpaceCall.transferEVM(eSpaceAddress)
        .sendTransaction({
            from: account,
            value: Drip.fromCFX(1),  // transfer 1 CFX, the amount is specify by value
        }).executed();

    console.log(`Transfer to ${eSpaceAddress} ${receipt.outcomeStatus === 0 ? 'succeed' : 'failed'}`);
}

main()
```

### From eSpace to Core Space

#### Mapped Addresses in Cross-Space Operations

To cross CFX from eSpace to Core Space, a mapped address is required. Each account in Core Space has a **mapped account** (hex40) in eSpace. Only the Core space account can withdraw CFX from it's mapped account.

For details about the mapped address, see [Mapped Addresses](./accounts.md#mapped-addresses-in-cross-space-operations).

#### Transfer Steps

To transfer CFX from Conflux eSpace to Conflux Core, two steps are required. 

1. Transfer CFX to the eSpace mapped account that belongs to the Core destination account. This action requires an eSpace transaction.
2. Call the `withdrawFromMapped(uint256 value)` method of the `CrossSpaceCall` internal contract. This call with transfer the CFX from the mapped account back to the corresponding destination address. Another method `mappedBalance` can be used to query the balance of one core address's mapped address.

```js
function withdrawFromMapped(uint256 value) external;

// parameter addr is a core account address
function mappedBalance(address addr) external view returns (uint256);
```

#### JS Example

Step1: use js-conflux-sdk's address utility method to get the mapped address of the Core Space destination account.

```js
const { address } = require('js-conflux-sdk');

const base32Address = 'cfx:aak2rra2njvd77ezwjvx04kkds9fzagfe6ku8scz91';

const mappedAddress = address.cfxMappedEVMSpaceAddress(base32Address);

// 0x12Bf6283CcF8Ad6ffA63f7Da63EDc217228d839A
```

Step2: transfer CFX to the mapped address in eSpace through wallet or ethers.js

Step3: invoke the `withdrawFromMapped` method of `CrossSpaceCall` internal contract in Core Space to withdraw CFX from the mapped address.

```js
const { Conflux, Drip, address } = require('js-conflux-sdk');

const conflux = new Conflux({
  url: 'https://main.confluxrpc.com',
  chainId: 1029,
});

const account = conflux.wallet.addPrivateKey(process.env.PRIVATE_KEY);

const crossSpaceCall = conflux.InternalContract('CrossSpaceCall');

async function main() {
    const receipt = await crossSpaceCall.withdrawFromMapped(Drip.fromCFX(1))
        .sendTransaction({
            from: account,
        }).executed();

    console.log(`Withdraw from eSpace ${receipt.outcomeStatus === 0 ? 'succeed' : 'failed'}`);
}

main()
```

## Call eSpace Contract from Core Space

Through CrossSpaceCall contract, it is possible the read or write eSpace contract's state from Core Space. We will give a simple example to show how to call eSpace contract from Core Space.

Below is a contract deployed in eSpace at address `0x8c2a2b6b4c3b6e7e7d3b5e8b4b6b6b6b6b6b6b6b`:

```js
contract SimpleStore {
    uint256 public value;

    function setValue(uint256 _value) public {
        value = _value;
    }
}
```

And below is a contract deployed in Core Space:

```js

contract CrossCallExample {

    CrossSpace public crossSpaceCall = CrossSpace(0x0888000000000000000000000000000000000006);

    function readValue() public returns (uint256) {
        bytes20 to = bytes20(0x8c2a2b6b4c3b6e7e7d3b5e8b4b6b6b6b6b6b6b6b);
        bytes memory num = crossSpaceCall.staticCallEVM(to, abi.encodeWithSignature("value()"));
        return abi.decode(num, (uint256))
    }

    function setValue(uint256 _value) public {
        bytes20 to = bytes20(0x8c2a2b6b4c3b6e7e7d3b5e8b4b6b6b6b6b6b6b6b);
        bytes memory data = abi.encodeWithSignature("setValue(uint256)", 100);
        crossSpaceCall.callEVM(to, data);
    }
}

```

## Resources

* [CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md)
* [Mapped Addresses](./accounts.md#mapped-addresses-in-cross-space-operations)
* [CrossSpaceCall](../../core/core-space-basics/internal-contracts/crossSpaceCall.md)
* [eSpace Phantom Transactions](./evm-compatibility.md#phantom-transactions)
