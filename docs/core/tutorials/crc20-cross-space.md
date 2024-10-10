---
sidebar_position: 1
title: CRC20 Tokens Cross Space
displayed_sidebar: coreSidebar
tags:
  - CRC-20
  - Cross-Space
  - Token Bridge
  - Smart Contract
  - Solidity
  - Core Space
  - eSpace
  - Token Mapping
  - Contract Deployment
  - CrossSpaceCall
  - Hardhat
  - js-conflux-sdk
  - Token Transfer
  - ERC-20
  - Contract Interaction
  - Blockchain Interoperability
---

This tutorial guides developers on transferring any CRC20 token from Core Space to eSpace, The goal is to transfer a CRC20 token (A) issued on coreSpace to become an ERC20 token (eA) in eSpace. Currently, if there is no corresponding token in eSpace, it's not possible to use the official [cross-space bridge](https://confluxhub.io/espace-bridge/cross-space) directly.

![Can not cross space](./imgs/cross-space/cannot-cross-space.jpg)
Before initiating cross-space operations, let's review several key contracts associated with the cross-space bridge:

**On CoreSpace:**

- BeaconProxy Proxy Contract: `cfx:acfcrckktgx99scxwr6jtjx81yhm4ggsfatprwzb3x`
- BeaconProxy Logic Contract - ConfluxSide: `cfx:acc7gpd3380pv6v112s5c2y3g3g6jvm32egm5mhnk7`

**On eSpace:**

- BeaconProxy Proxy Contract: `0x4f9e3186513224cf152016ccd86019e7b9a3c809`
- BeaconProxy Logic Contract - EvmSide: `0x4fa28072bd5b551dde70213aa02cb05bd022e34b`

## Cross-Space Methods

### Step 1: Registering a Core Space ERC20 Token to eSpace

First, call the `registerMetadata` method (Write as Proxy) in the BeaconProxy proxy contract on coreSpace, passing the token address `Address_A`. This function invokes the crossSpaceCall contract for cross-space operations, registering the A contract in the EVM space. The code is as follows:

![call the `registerMetadata` method](./imgs/cross-space/call-beacon-proxy-core.jpg)

After registration, the `crc20Metadata` function in eSpace's BeaconProxy contract can retrieve the CRC20 token's metadata in eSpace as `name (string), symbol (string), decimals (uint8), registered (bool)`.

![metadata](./imgs/cross-space/fanscoin-metadata.jpg)

### Step 2: Creating Token Mapping

In eSpace's BeaconProxy contract, call the `createMappedToken` method, passing the CRC20 token address.

![create map token](./imgs/cross-space/create-map-token.jpg)

This operation creates a new `BeaconProxy` contract and deploys an `UpgradeableERC20` contract, setting the new `BeaconProxy` contract address as the corresponding `mappedToken` for the CRC20 token.

At this point, the CRC20 and ERC20 tokens on both Core Space and eSpace are fully paired.

### Step 3: Using the Official Cross-Space Bridge

Now you can perform cross-space operations through the official [cross-space bridge](https://confluxhub.io/espace-bridge/cross-space), which involves calling the
`crossToEVM` function in coreSpace's BeaconProxy contract (after first approving the CRC20 token to the BeaconProxy contract).

![use cross space](./imgs/cross-space/use-cross-space.jpg)

### Step 4: Updating Logo and Token Tag Information

The remaining issue is that after crossing to eSpace, the token lacks logo and tag information. This might require official action through the Announcement contract.

![add logo](./imgs/cross-space/add-logo.jpg)

### Step 5: Displaying on Cross-Space Bridge

To be displayed on the official cross-chain bridge, modify the `native_token_list_mainnet.json` file and submit a pull request to the [conflux-evm-bridge](https://github.com/Conflux-Chain/conflux-evm-bridge) repository, requesting to add your token to the default display.

![default display](./imgs/cross-space/default-display.png)

The frontend code of ConfluxHub is hosted at [conflux-dapps](https://github.com/Conflux-Chain/conflux-dapps). You can also customize your own version of token list as you wish by modifying the parameter [innerTokenListUrl(in dapps/cross-space/src/components/TokenList/tokenListStore.ts)](https://github.com/Conflux-Chain/conflux-dapps/blob/dev/dapps/cross-space/src/components/TokenList/tokenListStore.ts) and then deploy it.

![community default display](./imgs/cross-space/fanscoin-bridge.png)
