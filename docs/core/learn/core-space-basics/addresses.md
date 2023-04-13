---
sidebar_position: 1
title: 地址
---

在Conflux中，每个[账户](../../../general/conflux-basics/accounts.md)都与一对公钥和私钥相关联，并由一个地址来标识。本页面介绍地址在core space中的表示和计算方式。 

:::info

请参考[General-address](../../../general/conflux-basics/accounts.md#address)了解有关地址的基本概念。

:::

## Hex地址和Base32地址

在`Conflux-rust v1.1.1`发布之前，Conflux地址只能使用十六进制编码的字符串进行表示，例如`0x1292d4955bb47f5153b88ca12c7a9e4048f09839`。这种格式与Ethereum和其他兼容EVM的区块链使用的地址非常相似。然而，Conflux采用一种独特的方法来计算EOA地址，这意味着使用相同私钥生成的地址字符串在Conflux和Ethereum之间通常会有所不同。这种外观上的相似性，再加上计算方式的不同，使得用户很容易将Conflux地址与Ethereum地址混淆，从而可能导致资产的丢失。

为了解决这个问题，Conflux在CIP-37中引入了一种新的基于Base32编码的地址格式。新的地址格式直接派生自原始的十六进制编码地址，包括一个独特的前缀（例如“cfx”）、可选的地址类型和一个校验和。因此，前面提到的十六进制编码地址可以被转换成一个更容易识别的Base32地址，例如`cfx:aakkfzezns4h8ymx1cgmcnd4x3aev6e2hexz250ym5`，或者使用另一种详细格式，包括可选的地址类型，例如`CFX:TYPE.USER:AAKKFZEZNS4H8YMX1CGMCND4X3AEV6E2HEXZ250YM5`。这种新的格式最大程度地减少了Conflux地址和Ethereum地址之间混淆的风险，提供了更安全、更用户友好的体验。

:::caution

除了智能合约`.sol`    源代码之外，Base32地址在整个Conflux核心生态系统中得到了广泛应用。在`.sol`文件中需要硬编码[EIP-55](https://eips.ethereum.org/EIPS/eip-55)校验和地址的情况下，开发人员应该选择使用Conflux的十六进制编码地址，而不是Base32格式。

:::

## 地址计算

:::info

本节内容仅供信息参考，通常用户或开发者不需要自己计算十六进制地址。建议依靠SDK或RPC返回的值来获取EOA/合约地址，并使用SDK或[在线地址转换器](https://www.confluxscan.net/address-converter)在十六进制和Base32地址格式之间进行转换。

:::

### 十六进制地址计算

Base32地址直接由原始的十六进制编码地址派生而来。因此，我们需要了解十六进制地址的计算方法。

Conflux的十六进制地址是一个由20个字节组成的十六进制值，以“0x”开头的42个字符字符串表示。十六进制编码的地址以一个1(3)字符的“类型指示器”开头，表示地址类型。目前有三种类型的指示器：

- `(0x)1`: 代表一个EOA账户的地址
- `(0x)8`: 代表一个合约的地址
- `(0x)0`:表示[内部合约地址](../core-space-basics/internal-contracts/internal-contracts.mdx)的地址，该地址在链上实现硬编码逻辑，或者是空地址 [internal contract](../core-space-basics/internal-contracts/internal-contracts.mdx) (`0x0000000000000000000000000000000000000000`).

#### EOA 十六进制地址的计算

计算EOA十六进制地址的规定详见[Conflux协议规范](https://www.confluxnetwork.org/files/Conflux_Protocol_Specification.pdf)`3.1：账户`。账户地址由4位类型指示符和与私钥相关联的公钥的右侧156位Keccak摘要串联而成。

#### 合约地址计算

一个合约可以通过`create2`操作码进行部署，也可以不用。

:::note

合约地址的计算方式与以太坊有很大不同。 

:::

如果使用了`create2`，可以使用以下Python代码计算部署地址：

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

如果没有使用`create2`：

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

CoConflux的Base32地址是在[CIP-37](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-37.md)中定义的网络前缀的Conflux Base32校验和地址。该地址由表示该地址有效的网络的网络前缀、一个冒号（`":"`）和一个Base32编码有效载荷组成，其中包含一个校验和，例如`cfx:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg`。地址可以有选择地在网络前缀和有效载荷之间包含一组键值对，格式为`key.value`，以冒号分隔，例如`cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg`。

#### 网络前缀

`network-prefix`是以下值之一：`"cfx"` (主网, 对应网络ID 1029), `"cfxtest"` (测试网, 对应网络ID 1), `"net[n]"` 其中 `n != 1, 1029` (私有Conflux网络)

有效的 network-prefix 示例： `"cfx"`, `"cfxtest"`, `"net17"`

无效的network-prefixes的示例： `"bch"`, `"conflux"`, `"net1"`, `"net1029"`

#### 地址类型

地址类型是一个可选字段，为地址类型提供可读的信息。对于空地址(`0x0000000000000000000000000000000000000000`), 地址类型必须是`type.null`。其他为：

- `0x0`: `type.builtin`
- `0x1`: `type.user`
- `0x1`: `type.contract`

#### 负载（payload）

1. 拼接 `版本字节`（`version-type`）: 将`版本字节`(`0x00`)与十六进制地址连接起来，得到一个21字节的数组。
2. Base32编码：从左到右编码上述结果，将每个5位序列映射到相应的ASCII字符（见下面的字母表）。 在结尾补零位（应为2个零位），以完成未完成的任何块。
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

#### 校验和（checksum）

1. 准备校验和输入：`数据` 被用作校验和函数的输入。它包括以下内容： 
   - `网络前缀`每个字符的低5位。 - 例如， `"cfx..."` 变成了 `0x03, 0x06, 0x18, ...`
   - 分隔符用0表示（5个零位）。
   - Payload按5位一组分块。如果需要，Payload会用零位填充到右侧，以便在结尾处完成任何未完成的块。
   - 八个零作为校验和的"模板"。
2. 计算校验和：使用[比特币现金校验和算法](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/cashaddr.md#checksum) 计算`数据`的校验和。
3. Base32编码：将返回的40位checksum按照[Payload-Base32 encode](#payload)编码的步骤进行编码。

#### 最终结果和示例

将以下部分连接起来得到最终地址：`[network-prefix]`, `":"`, `[payload]`, `[checksum]`
   - 可以选择在地址中包含 **address-type**：`[network-prefix]`, `":"`, `[address-type]`, `":"`, `[payload]`, `[checksum]`

以下是一个展示编码的每个步骤的例子：

```
编写(0x1a2f80341409639ea6a35bbcab8299066109aa55, "cfx")

1. 地址类型: "type.user"
2. 版本字节（`version-type`）: 0x00
3. 负载（payload）: [0x00, 0x1a, 0x2f, 0x80, 0x34, 0x14, 0x09, 0x63, 0x9e, 0xa6, 0xa3, 0x5b, 0xbc, 0xab, 0x82, 0x99, 0x06, 0x61, 0x09, 0xaa, 0x55]
   5-bit parts: [0x00, 0x00, 0x0d, 0x02, 0x1f, 0x00, 0x01, 0x14, 0x02, 0x10, 0x04, 0x16, 0x07, 0x07, 0x15, 0x06, 0x14, 0x0d, 0x0d, 0x1b, 0x19, 0x0a, 0x1c, 0x02, 0x13, 0x04, 0x03, 0x06, 0x02, 0x02, 0x0d, 0x0a, 0x0a, 0x14]
   base32-encoded: "aarc9abycue0hhzgyrr53m6cxedgccrmmy"
4. 校验和输入: [0x03, 0x06, 0x18, 0x00, 0x00, 0x00, 0x0d, 0x02, 0x1f, 0x00, 0x01, 0x14, 0x02, 0x10, 0x04, 0x16, 0x07, 0x07, 0x15, 0x06, 0x14, 0x0d, 0x0d, 0x1b, 0x19, 0x0a, 0x1c, 0x02, 0x13, 0x04, 0x03, 0x06, 0x02, 0x02, 0x0d, 0x0a, 0x0a, 0x14, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
   校验和输出: 688543492710
   校验和字符: "ybjgh4xg"
5. 链接结果: "cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg"
```
