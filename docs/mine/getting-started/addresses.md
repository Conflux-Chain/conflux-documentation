---
sidebar_position: 1
---

# Addresses

## Overview

Each Conflux [account](https://hackmd.io/@thegaram/rymwcvajq) is identified by its address. When sending tokens to someone or interacting with a smart contract, you will need to know their address. You can also share your address with other people so that you can receive token transfers.

The address of an account is derived from its [private key](https://hackmd.io/@thegaram/rymwcvajq):

```
private key (secret) --> public key (public) --> address (public)
```

If you view an account as a mailbox, then the private key is the key that opens it, while the address is the name and address written on the mailbox.

Your accounts and addresses are usually managed by wallets like [Fluent](https://fluentwallet.com/) and [MetaMask](https://metamask.io/). It is also possible to create and process addresses programmatically.

## eSpace

Below are some examples of valid eSpace addresses:

```
0x123456789abcdef0123456789abcdef012345678
0x0000000000000000000000000000000000000000
0x9BAfD0857532f4Ed6FaE2b9aA49390E16a285d38
```

Such addresses are called hex addresses. They begin with a ``` 0x ``` indicating hex encoding, followed by 40 hexadecimal digits.

To generate eSpace addresses, simply use MetaMask or any other EVM-compatible wallet.

## Core Space

Below are some examples of valid Core Space addresses:

```
cfx:aakdjzx2xm8r76awgvnhvgz6552berc0ta2dgfsdkf
CFX:TYPE.USER:AAKDJZX2XM8R76AWGVNHVGZ6552BERC0TA2DGFSDKF

cfxtest:ace41xttaevym36kztg88akdjzx2xm8r76rytme9nh
CFXTEST:TYPE.CONTRACT:ACE41XTTAEVYM36KZTG88AKDJZX2XM8R76RYTME9NH
```

This address format is called base32 checksum address, or CIP-37 address since it was defined in [CIP-37](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-37.md).

Each base32 address begins with a network prefix: ```cfx``` for mainnet, ```cfxtest``` for testnet addresses. Since base32 addresses use a checksum, if you make a typo, the resulting address will become invalid.

```diff
- cfx:aakdjzx2xm8r76awgvnhvgz6552berc0ta2dgfsdk0
```

## Advanced

- Under the hood, addresses are 20-byte binary data that have multiple string representations, including base32 and hex.
- For a custom network, the network prefix becomes ```net[id]```. Example: ```net11:aakdjzx2xm8r76awgvnhvgz6552berc0ta21v8h0fr```
- Core Space RPCs typically expect base32 addresses. However, in Solidity source code, you will need to use the hex checksum address format defined in [EIP-55](https://eips.ethereum.org/EIPS/eip-55). You can use [this tool](https://confluxscan.io/address-converter) to convert between base32 and hex format.
- In hex representation, Core Space user addresses start with ```0x1```, contract addresses start with ```0x8```, and [internal contract](https://hackmd.io/@thegaram/rymwcvajq) addresses start with ```0x0```. Any other prefix is invalid on Core Space.
- The same private key might result in different addresses on Core Space and eSpace. ⚠️ Do not use a hex-encoded Core Space address on eSpace. For cross-space transfers, please refer to the [relevant documentation](https://hackmd.io/@thegaram/rymwcvajq).
- When generating HD wallet accounts following the [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) standard, we use the following derivation paths: ```m/44'/60'/0'/0``` for eSpace, ```m/44'/503'/0'/0``` for Core Space, as defined in [SLIP-0044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md).

