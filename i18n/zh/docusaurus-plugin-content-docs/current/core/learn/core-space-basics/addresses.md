---
sidebar_position: 1
title: 地址
---

在Conflux中，每个 [账户](../../../general/conflux-basics/accounts.md) 都与一个公私钥对相关联，并由一个“地址”标识。 本页面介绍地址在core space中的表示和计算方式。

:::info

请参考 [General-address](../../../general/conflux-basics/accounts.md#address)了解有关地址的基本概念。

:::

## Hex地址 和 Base32 地址

在 `Conflux-rust v1.1.1`发布之前，Conflux 地址完全以十六进制编码字符串形式呈现，例如 `0x1292d4955b47f5153b88c12c7a94048f09839` 此格式与Etherum和其他兼容的EVM区块链使用的地址非常相似。 然而，Conflux 采用独特的方法来计算EOA地址， 这意味着由同一私钥生成的地址字符串在Conflux 和 Etherum之间通常是不同的。 这种表面上的相似性，加上计算上的差异， 使得用户很容易将Conflux地址与Ethereum 地址混淆，从而可能导致资产损失。

为了解决这个问题，Conflux在 [CIP-37](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-37.md) 中引入了一个新的基于 base32 编码地址格式。 新格式直接来自原有的十六进制编码地址，包括一个独特的前缀(例如"cfx")、一个可选的地址类型和一个校验和。 因此，上文提到的Hex编码地址可以转换成更容易识别的base32地址。例如 `cfx:aakkfzezns4h8ymx1cgmcnd4x3aev6e2hexz250ym5`, 可选的，也可以表示为详细格式地址，详细格式包含了非必须的地址类型信息, 例如 `CFX:TYPE .USER：AAKKFZEZNS4H8YMX1CGMCN4X3AEV6E2HEXZ250YM5`. 这种新格式最大限度地减少了Conflux 和 Etherum地址之间混淆的风险，提供了更安全和更方便的用户体验。

:::caution

Base32 addresses are utilized throughout the Conflux core ecosystem, with the exception of smart contract `.sol` source code. In cases where a hardcoded [EIP-55](https://eips.ethereum.org/EIPS/eip-55) checksum address is necessary within `.sol` files, developers should opt for a Conflux hex-encoded address instead of the base32 format.

:::

## 地址计算

:::info

本节内容仅供信息参考。 用户或开发者通常不需要自己计算十六进制地址。 It's advised to rely on the return values from the SDK or RPC to obtain the EOA/contract address, and to use the SDK or [online address converter](https://www.confluxscan.net/address-converter) for converting between hex and base32 address formats.

:::

### 十六进制地址计算

Base32地址直接由原始的十六进制编码地址派生而来。 因此，我们需要理解十六进制地址的计算方法。

Conflux 十六进制地址是一个20字节的十六进制值，以“0x”开头的包括42个字符的字符串表示。 十六进制编码地址以一个1(3)字符“类型标识”开头，表示地址类型。 目前有三种类型的标识：

- `(0x)1`: 代表一个EOA 帐户的地址
- `(0x)8`: 代表一个合约的地址
- `(0x)0`: Represents the address of an [internal contract](../core-space-basics/internal-contracts/internal-contracts.mdx), which implements hard-coded logic on the chain, or a null address (`0x0000000000000000000000000000000000000000`).

#### EOA 十六进制地址计算

The computaion of EOA hex address is specified in [Conflux protocol specification](https://www.confluxnetwork.org/files/Conflux_Protocol_Specification.pdf) `3.1: Accounts`. The account address is a concatenation of a 4-bit type indicator and the rightmost 156-bit Keccak digest of the associated public key of the private key.

#### Contract Address Computation

An contract can be deployed via `create2` opcode or not.

:::note

合约地址的计算方式与以太坊有很大不同。

:::

如果使用 `create2` ，可以使用以下Python代码计算部署地址：

```python
# using web3.py is also viable
# from web3 import Web3
from conflux_web3 import Web3

# ensure salt is a bytes32 to avoid unmatched result caused by encoding approach
def compute_address_using_salt(salt: bytes, bytecode_hash: bytes, hex_deployer_address: str):
    core_part = Web3.solidityKeccak(
        ["bytes1", "address", "bytes32", "bytes32"],
        ["0xff", hex_deployer_address, salt, bytecode_hash]
    )
    return "0x8"+ core_part.hex()[-39:]
```

如果 `create2` 未被使用：

```python
# using web3.py is also viable
# from web3 import Web3
from conflux_web3 import Web3

def compute_address_using_nonce(nonce: int, bytecode_hash: bytes, hex_deployer_address: str):
    core_part = Web3.solidityKeccak(
        ["bytes1", "address", "bytes32", "bytes32"],
        ["0x00", hex_deployer_address, nonce.to_bytes(32, "little"), bytecode_hash]
    )
    return "0x8"+ core_part.hex()[-39:]
```

### Base32地址计算

Conflux的 base32 地址指由 [CIP-37](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-37.md) 定义的具有网络前缀的Conflux Base32校验和地址。 The address consists of a network-prefix indicating the network on which this address is valid, a colon (`":"`), and a base32-encoded payload indicating the destination of the address and containing a checksum, e.g. `cfx:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg`. Optionally, the address can contain a list of key value pairs in the format `key.value` between the network-prefix and the payload, separated by colons, e.g. `cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg`.

#### Network Prefix

`network-prefix` is one of the following values: `"cfx"` (mainnet, corresponds to network-id 1029), `"cfxtest"` (testnet, corresponds to network-id 1), `"net[n]"` where `n != 1, 1029` (private Conflux network)

Examples of valid network-prefixes: `"cfx"`, `"cfxtest"`, `"net17"`

Examples of invalid network-prefixes: `"bch"`, `"conflux"`, `"net1"`, `"net1029"`

#### Address Type

Address type is an optional field to provide human-readable information for the address type. For the null address (`0x0000000000000000000000000000000000000000`), address-type must be `type.null`. Otherwise,

- `0x0`: `type.builtin`
- `0x1`: `type.user`
- `0x1`: `type.contract`

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

1. Prepare checksum input: `data` is used as the input of checksum function. It
   - The lower 5 bits of each character of the `network-prefix`. - e.g. `"cfx..."` becomes `0x03, 0x06, 0x18, ...`
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
