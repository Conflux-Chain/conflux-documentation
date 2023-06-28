---
sidebar_position: 1
title: Across Spaces
---

# Transferring Funds Across Spaces

## ConfluxHub

The easiest way to transfer assets between Core Space and eSpace is to use [ConfluxHub](https://confluxhub.io/espace-bridge/cross-space). We recommend that you set up two wallets: [Fluent](https://fluentwallet.com/) for Core Space and [MetaMask](https://metamask.io/) for eSpace.


![Locale Dropdown](./img/transferAssets-0c1a3f76a3a0ea978d3697997283f63a.png)

Follow these steps to make a cross-space transfer:

- Start by clicking on ```Connect Wallet``` to connect your Fluent and MetaMask wallets to ConfluxHub.
- ```To: Conflux eSpace``` at the top shows that you are making a transfer from Core Space to eSpace. If you would like to make a transfer in the other direction, click on the arrow next to this text.
- In the ```Conflux eSpace Destination Address``` field, type in your eSpace address or click the MetaMask icon on the right to fill this field automatically.
- Next, select the token that you want to transfer and enter the transfer amount.
- If the button on the bottom says ```Approve```, click on it to submit an ERC20 token approval first.
- Once the button on the bottom says ```Transfer```, click on it to make the transfer.

Making a cross-space transfer from eSpace to Core Space follows a similar process but it has two main steps: First, transfer the token to the bridge on eSpace. Second, withdraw the token from the bridge on Core Space. Please follow the site’s instructions.

**⚠️ When making a cross-space transfer, always double check your addresses to avoid accidental asset loss.**

## Cross-Space Transfers for Developers

Below we will discuss how to make cross-space transfers programmatically.

### Internal Contract

[CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md) introduced the concept of two spaces running on one blockchain, and defined a new [internal contract](https://hackmd.io/@thegaram/S15_VAwh5) to connect the two. This contract is available under the address [```cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa2sn102vjv```](https://confluxscan.io/address/cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa2sn102vjv) (hex: ```0x0888000000000000000000000000000000000006```) on Core Space.

```js
interface CrossSpace {
    /* methods for cross-space CFX transfers */

    function transferEVM(bytes20 to) external payable returns (bytes memory output);
    
    function withdrawFromMapped(uint256 value) external;

    function mappedBalance(address addr) external view returns (uint256);
    
    /* methods for other cross-space operations */

    function callEVM(bytes20 to, bytes calldata data) external payable returns (bytes memory output);

    function staticCallEVM(bytes20 to, bytes calldata data) external view returns (bytes memory output);
    
    // ...
}

```
