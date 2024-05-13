---
sidebar_position: 1
title: CRC20 Tokens Cross Space
displayed_sidebar: coreSidebar
---
This tutorial outlines the process of transferring any CRC20 token from Core Space to eSpace, using FansCoin (FC) as an example:

**Problem**: How to transfer a CRC20 token (A) issued on Core to become an ERC20 token (eA) in eSpace?

(At this time, there is no corresponding token in eSpace, so it's not possible to use the official cross-chain bridge directly.)

[image1](image1)

### Official Cross-Space Contract Deployment

Before initiating cross-space operations, let's review several key contracts associated with the cross-space bridge:

On Core Space:

BeaconProxy Proxy Contract:

Address: `cfx:acfcrckktgx99scxwr6jtjx81yhm4ggsfatprwzb3x`

BeaconProxy Logic Contract, ConfluxSide:

Address: `cfx:acc7gpd3380pv6v112s5c2y3g3g6jvm32egm5mhnk7`

On eSpace:

BeaconProxy Proxy Contract:

Address: `0x4fa28072bd5b551dde70213aa02cb05bd022e34b`

BeaconProxy Logic Contract, EvmSide: `0x4fa28072bd5b551dde70213aa02cb05bd022e34b`

Debank Address: `0xcc5ad7b5e64e3fcbb42c6f42ad06a94a49134e05` creates BeaconProxy's proxy and logic contracts.

### Cross-Space Methods

#### Registering a Core Space ERC20 Token to eSpace

1. First, call the `registerMetadata` method in the BeaconProxy on Core Space, passing the token address `Address_A`. This function invokes the crossSpaceCall contract for cross-space operations, registering the A contract in the EVM space. The code is as follows:

```solidity
// Register token metadata to EVM space
function registerMetadata(IERC20 _token) public override {
    require(
        sourceTokens[address(_token)] == address(0),
        "ConfluxSide: token is mapped from EVM space"
    );
    // Cross-space call to EVM contract EvmSide, which is the BeaconProxy proxy contract in eSpace
    crossSpaceCall.callEVM(
        bytes20(evmSide),
        abi.encodeWithSelector(
            // Calls eSpace's BeaconProxy contract's registerCRC20 to register the current token address in eSpace contract
            IEvmSide.registerCRC20.selector,
            address(_token),
            _token.name(),
            _token.symbol(),
            _token.decimals()
        )
    );
}
```

After registration, the `crc20Metadata` function in eSpace's BeaconProxy contract can retrieve the CRC20 token's metadata in eSpace as `name (string), symbol (string), decimals (uint8), registered (bool)`.

### Creating Token Mapping

2. In eSpace's BeaconProxy contract, call the `createMappedToken` method, passing the CRC20 token address.

```solidity
function createMappedToken(address _crc20) public override {
    require(crc20Metadata[_crc20].registered, "EvmSide: not registered");
    TokenMetadata memory d = crc20Metadata[_crc20];
    _deploy(_crc20, d.name, d.symbol, d.decimals);
}

...

function _deploy(
        address _token,
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) internal returns (address mappedToken) {
        if (mappedTokens[_token] == address(0)) {
            mappedToken = address(
                new BeaconProxy{salt: keccak256(abi.encodePacked(_token))}(
                    beacon,
                    ""
                )
            );
            UpgradeableERC20(mappedToken).initialize(
                _name,
                _symbol,
                _decimals,
                owner()
            );
            mappedTokens[_token] = mappedToken;
            sourceTokens[mappedToken] = _token;
            mappedTokenList.push(_token);
        } else {
            mappedToken = mappedTokens[_token];
        }
    }
```

This operation creates a new `BeaconProxy` contract and deploys an `UpgradeableERC20` contract, setting the new `BeaconProxy` contract address as the corresponding `mappedToken` for the CRC20 token.

At this point, the CRC20 and ERC20 tokens on both Core Space and eSpace are fully paired.

#### Using the Official Cross-Space Bridge for Transfer

3. Now you can perform cross-space operations through the official cross-chain bridge at https://confluxhub.io/espace-bridge/cross-space, which involves calling the

 `crossToEVM` function in Core Space's BeaconProxy contract (after first approving the CRC20 token to the BeaconProxy contract).

### Updating Logo and Token Tag Information

4. The remaining issue is that after crossing to eSpace, the token lacks logo and tag information. This might require official action through the Announcement contract.

### Display on the Conflux Cross-Space Bridge

5. To be displayed on the official cross-chain bridge, modify the `native_token_list_mainnet.json` file and submit a pull request to the repository at [https://github.com/Conflux-Chain/conflux-evm-bridge/](https://github.com/Conflux-Chain/conflux-evm-bridge/commits?author=posaggen), requesting to add your token to the default display.

You can also visit the community-deployed version at bridge.fanscoin.org, or submit a PR at [https://github.com/ConfluxDAO/conflux-evm-bridge/](https://github.com/Conflux-Chain/conflux-evm-bridge/commits?author=posaggen) to directly display your token on the community cross-space bridge.
```

