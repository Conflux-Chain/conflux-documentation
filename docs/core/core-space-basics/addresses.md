---
sidebar_position: 1
title: Base32 Addresses
displayed_sidebar: coreSidebar
---
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

In Conflux, every [account](../../general/conflux-basics/accounts.md) is associated with a pair of public and private keys, and is identified by an address. This page is about how address is presented and computed in core space. 

:::info

Refer to [General-address](../../general/conflux-basics/accounts.md#address) for the basic concepts about addresses. 

:::

## Hex and Base32 Addresses

Before the release of `Conflux-rust v1.1.1`, Conflux addresses were exclusively presented as hex-encoded strings, such as `0x1292d4955bb47f5153b88ca12c7a9e4048f09839`. This format closely resembles addresses used by Ethereum and other EVM-compatible blockchains. However, Conflux employs a unique method to compute EOA addresses, which means that **the address strings generated from the same private key will usually differ between Conflux and Ethereum.** This similarity in appearance, combined with the difference in computation, makes it all too easy for users to confuse Conflux addresses with Ethereum addresses, potentially leading to the loss of assets.

In order to address this issue, Conflux introduced a new base32-encoded address format in [CIP-37](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-37.md). The new format is **derived directly from the original hex-encoded addresses** including a **distinctive prefix** (such as "cfx"), an optional **address type**, and a **checksum**. As a result, the hex-encoded address mentioned earlier can be converted into a more easily recognizable base32 address, like `cfx:aakkfzezns4h8ymx1cgmcnd4x3aev6e2hexz250ym5`, or an alternative verbose format with an optional address type, such as `CFX:TYPE.USER:AAKKFZEZNS4H8YMX1CGMCND4X3AEV6E2HEXZ250YM5`. This new format minimizes the risk of confusion between Conflux and Ethereum addresses, offering a safer and more user-friendly experience.

:::caution

Base32 addresses are utilized throughout the Conflux Core ecosystem, with the exception of smart contract `.sol` source code. In cases where a hardcoded [EIP-55](https://eips.ethereum.org/EIPS/eip-55) checksum address is necessary within `.sol` files, developers should opt for a Conflux hex-encoded address instead of the base32 format.

:::

## Address Computation

:::info

This section is informational in nature. Typically, users or developers won't need to calculate the hex address on their own. It's advised to rely on the return values from the SDK or RPC to obtain the EOA/contract address, and to use the SDK or [online address converter](https://www.confluxscan.net/address-converter) for converting between hex and base32 address formats.

:::

### Hex Address Computation

Base32 addresses are derived directly from the original hex-encoded addresses. Therefore, we need to understand the computation of hex addresses.

A Conflux hex address is a 20-byte hex value, represented as a 42-character string starting with "0x". The hex-encoded address starts with a 1(3)-character "type indicator" that signifies the address type. There are currently three types of indicators:

- `(0x)1`: Represents the address of an EOA account.
- `(0x)8`: Represents the address of a contract
- `(0x)0`: Represents the address of an [internal contract](../core-space-basics/internal-contracts/internal-contracts.mdx), which implements hard-coded logic on the chain, or a null address (`0x0000000000000000000000000000000000000000`).

#### EOA Hex Address Computation

The computation of EOA hex address is specified in [Conflux protocol specification](https://www.confluxnetwork.org/files/Conflux_Protocol_Specification.pdf) `3.1: Accounts`. The account address is a concatenation of a 4-bit type indicator and the rightmost 156-bit Keccak digest of the associated public key of the private key.

#### Contract Address Computation

There is an example.
<Tabs>
    <TabItem label="Abi" value="AbiExampleData">
```js
[{
   "inputs": [
      {
         "internalType": "uint256",
         "name": "inputValue",
         "type": "uint256"
      }
   ],
   "name": "increment",
   "outputs": [
      {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
      }
   ],
   "stateMutability": "pure",
   "type": "function"
}]
```
    </TabItem>
    <TabItem label="Bytecode" value="bytecodeExampleData">
```
0x608060405234801561001057600080fd5b506101a1806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80637cf5dab014610030575b600080fd5b61004a600480360381019061004591906100b1565b610060565b60405161005791906100ed565b60405180910390f35b600060018261006f9190610137565b9050919050565b600080fd5b6000819050919050565b61008e8161007b565b811461009957600080fd5b50565b6000813590506100ab81610085565b92915050565b6000602082840312156100c7576100c6610076565b5b60006100d58482850161009c565b91505092915050565b6100e78161007b565b82525050565b600060208201905061010260008301846100de565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006101428261007b565b915061014d8361007b565b925082820190508082111561016557610164610108565b5b9291505056fea26469706673582212208eb410cb79fbf08652e19d496e31d076d04be7ed242c64a44aec4c5af0f2533b64736f6c63430008130033
```
    </TabItem>
</Tabs>

An contract can be deployed via `create2` opcode or not. 

:::note

The contract address computation is quite different from that of Ethereum. 

:::

If `create2` is used, the deployed address of can be computed as the following code described:

The `Create2Factory` has been deployed via [CIP-31](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-31.md), so you can use the `0x8a3a92281df6497105513b18543fd3b60c778e40` contract or deploy your own Create2Factory.

<Tabs>
    <TabItem label="Python" value="PythonCreate2Example">
```python
# using web3.py is also viable
# from web3 import Web3
from conflux_web3 import Web3

# ensure salt is a bytes32 to avoid unmatched result caused by encoding approach
def compute_address_using_salt(
    salt: bytes, bytecode_hash: bytes, create2FactoryAddress: str
):
    core_part = Web3.solidity_keccak(
        ["bytes1", "address", "bytes32", "bytes32"],
        ["0xff", create2FactoryAddress, salt, bytecode_hash],
    )
    return "0x8" + core_part.hex()[-39:]


if __name__ == "__main__":
    salt = (1111).to_bytes(32)
    bytecode_hash = Web3.solidity_keccak(["bytes"], [bytecode])
    create2FactoryAddress = "0x8A3A92281Df6497105513B18543fd3B60c778E40"

    address = compute_address_using_salt(
        salt=salt,
        bytecode_hash=bytecode_hash,
        create2FactoryAddress=create2FactoryAddress,
    )
    print(address) # 0x80ac53cc16c0b58dc5bde5af47f5ef9e84693fe4

```
    </TabItem>
        <TabItem label="Javascript" value="JavascriptCreate2Example">
```javascript
import { solidityPackedKeccak256, toBeHex } from "ethers"; // ethers v6

function computeAddressUsingSalt(
salt,
bytecode,
create2FactoryAddress = "0x8A3A92281Df6497105513B18543fd3B60c778E40"
) {
   const hash = solidityPackedKeccak256(
      ["bytes1", "address", "bytes32", "bytes32"],
      [
         "0xff",
         create2FactoryAddress,
         toBeHex(salt, 32),
         solidityPackedKeccak256(["bytes"], [bytecode]),
      ]
   );
   return `0x8${hash.slice(-39)}`;
}
computeAddressUsingSalt(1111, bytecode) // 0x80ac53cc16c0b58dc5bde5af47f5ef9e84693fe4
```
    </TabItem>

</Tabs>


If `create2` is not used:

<Tabs>
    <TabItem label="Python" value="PythonExample">
```python
# using web3.py is also viable
# from web3 import Web3
from conflux_web3 import Web3
def compute_address_using_nonce(
    nonce: int, bytecode_hash: bytes, hex_deployer_address: str
):
    core_part = Web3.solidity_keccak(
        ["bytes1", "address", "bytes32", "bytes32"],
        ["0x00", hex_deployer_address, nonce.to_bytes(32, "little"), bytecode_hash],
    )
    return "0x8" + core_part.hex()[-39:]


if __name__ == "__main__":
    nonce = 1
    bytecode_hash = Web3.solidity_keccak(["bytes"], [bytecode])
    # The address of the transaction sender "cfx:aamz08kfa8wsu69jhhcgrwkjkh69p85wj6222847yp" in hex is 0x155B792507a4E873e839c466C92849f9F67b7247.
    hex_deployer_address = "0x155B792507a4E873e839c466C92849f9F67b7247"

    address = compute_address_using_nonce(
        nonce=nonce,
        bytecode_hash=bytecode_hash,
        hex_deployer_address=hex_deployer_address,
    )
    print(address) # 0x837f77a1e8da5b860905a07bc1921e43fbfb04ef
```
    </TabItem>

    <TabItem label="Javascript" value="JavascriptExample">
```javascript
import { hexlify, solidityPackedKeccak256, toBeArray, zeroPadBytes } from "ethers";
function computeAddressUsingNonce(nonce, bytecode, hexDeployerAddress) {
  const hash = solidityPackedKeccak256(
    ["bytes1", "address", "bytes32", "bytes32"],
    [
      "0x00",
      hexDeployerAddress,
      hexlify(zeroPadBytes(toBeArray(nonce).reverse(), 32)),
      solidityPackedKeccak256(["bytes"], [bytecode]),
    ]
  );
  return `0x8${hash.slice(-39)}`;
}
computeAddressUsingNonce(1,bytecode,"0x155B792507a4E873e839c466C92849f9F67b7247") // 0x837f77a1e8da5b860905a07bc1921e43fbfb04ef

```
    </TabItem>

</Tabs>
### Base32 Address Computation

Conflux base32 address is a network-prefixed Conflux base32-checksum address defined in [CIP-37](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-37.md). The address consists of a network-prefix indicating the network on which this address is valid, a colon (`":"`), and a base32-encoded payload indicating the destination of the address and containing a checksum, e.g. `cfx:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg`. Optionally, the address can contain a list of key value pairs in the format `key.value` between the network-prefix and the payload, separated by colons, e.g. `cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg`. 

#### Network Prefix

`network-prefix` is one of the following values: `"cfx"` (mainnet, corresponds to network-id 1029), `"cfxtest"` (testnet, corresponds to network-id 1), `"net[n]"` where `n != 1, 1029` (private Conflux network)

Examples of valid network-prefixes: `"cfx"`, `"cfxtest"`, `"net17"`

Examples of invalid network-prefixes: `"bch"`, `"conflux"`, `"net1"`, `"net1029"`

#### Address Type

Address type is an optional field to provide human-readable information for the address type. For the null address (`0x0000000000000000000000000000000000000000`), address-type must be `type.null`. Otherwise,

- `0x0`: `type.builtin`
- `0x1`: `type.user`
- `0x8`: `type.contract`

#### Payload

1. Concatenate `version-byte`: concatenate the `version-byte`(`0x00`) with hex address to get a 21-byte array.
2. Base32 encode: encode the above result left-to-right, mapping each 5-bit sequence to the corresponding ASCII character (see alphabet below). Pad to the right with zero bits(should be 2 bit 0-padding) to complete any unfinished chunk at the end.
    ```
    0x00 => a    0x08 => j    0x10 => u    0x18 => 2
    0x01 => b    0x09 => k    0x11 => v    0x19 => 3
    0x02 => c    0x0a => m    0x12 => w    0x1a => 4
    0x03 => d    0x0b => n    0x13 => x    0x1b => 5
    0x04 => e    0x0c => p    0x14 => y    0x1c => 6
    0x05 => f    0x0d => r    0x15 => z    0x1d => 7
    0x06 => g    0x0e => s    0x16 => 0    0x1e => 8
    0x07 => h    0x0f => t    0x17 => 1    0x1f => 9
    ```

#### Checksum 

1. Prepare checksum input: `data` is used as the input of checksum function. It contains:
   - The lower 5 bits of each character of the `network-prefix`, e.g. `"cfx..."` becomes `0x03, 0x06, 0x18, ...`
   - A zero for the separator (5 zero bits).
   - The payload by chunks of 5 bits. If necessary, the payload is padded to the right with zero bits to complete any unfinished chunk at the end.
   - Eight zeros as a "template" for the checksum.
2. Calculate checksum: calculate using [Bitcoin Cash checksum algorithm](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/cashaddr.md#checksum) over the `data`.
3. Base32 encode: encode the returned 40-bit checksum according to the same step in [Payload-Base32 encode](#payload)

#### Final Result and Example

Concatenate the following parts to get the final address: `[network-prefix]`, `":"`, `[payload]`, `[checksum]`
   - Optionally, **address-type** can also be included: `[network-prefix]`, `":"`, `[address-type]`, `":"`, `[payload]`, `[checksum]`

Here is an example presenting each step of encoding:

```
encode(0x1a2f80341409639ea6a35bbcab8299066109aa55, "cfx")

1. address-type: "type.user"
2. version-byte: 0x00
3. payload: [0x00, 0x1a, 0x2f, 0x80, 0x34, 0x14, 0x09, 0x63, 0x9e, 0xa6, 0xa3, 0x5b, 0xbc, 0xab, 0x82, 0x99, 0x06, 0x61, 0x09, 0xaa, 0x55]
   5-bit parts: [0x00, 0x00, 0x0d, 0x02, 0x1f, 0x00, 0x01, 0x14, 0x02, 0x10, 0x04, 0x16, 0x07, 0x07, 0x15, 0x06, 0x14, 0x0d, 0x0d, 0x1b, 0x19, 0x0a, 0x1c, 0x02, 0x13, 0x04, 0x03, 0x06, 0x02, 0x02, 0x0d, 0x0a, 0x0a, 0x14]
   base32-encoded: "aarc9abycue0hhzgyrr53m6cxedgccrmmy"
4. checksum input: [0x03, 0x06, 0x18, 0x00, 0x00, 0x00, 0x0d, 0x02, 0x1f, 0x00, 0x01, 0x14, 0x02, 0x10, 0x04, 0x16, 0x07, 0x07, 0x15, 0x06, 0x14, 0x0d, 0x0d, 0x1b, 0x19, 0x0a, 0x1c, 0x02, 0x13, 0x04, 0x03, 0x06, 0x02, 0x02, 0x0d, 0x0a, 0x0a, 0x14, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
   checksum output: 688543492710
   checksum string: "ybjgh4xg"
5. concatenated result: "cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg"
```

## Use Cases for Base32 and Hex Addresses

The Conflux Core RPC methods only accept base32 address, so Conflux Core SDKs and wallets also use base32 address. Base32 is the most common address format in the Core Space.

For Conflux Core Space contract development, Ethereum toolchains are used to compile contracts. So in Solidity smart contract `.sol` files, base32 format addresses would bring about compilation errors. If a specific address needs to be hardcoded in the contract code, it should be in hex format. **This is the only situation that hex address is used in the Core Space.**

## Address Format Convert Tool

ConfluxScan provide a [Online Address Converter](https://www.confluxscan.io/address-converter) which is very useful.

![](./img/scan-address-converter.png)

## FAQs

### How to convert between base32 and hex addresses?

Use the [Online Address Converter](https://www.confluxscan.io/address-converter) or the SDKs to convert between base32 and hex addresses.

### When should I use hex addresses?

In the Core Space, hex addresses are only used in Solidity smart contract `.sol` files. In other cases, base32 addresses are used.

### Can I use Ethereum EOA addresses in Conflux Core Space?

No. Ethereum EOA addresses are not all compatible with Conflux addresses. It's recommend use Conflux Wallet or SDKs to generate Conflux base32 addresses.

### What's the [BIP-44 Coin Type](https://github.com/satoshilabs/slips/blob/master/slip-0044.md) for Conflux Core Space?

The BIP-44 coin type for Conflux Core Space is `503`.