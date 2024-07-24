---
sidebar_position: 1
title: 交易字段
displayed_sidebar: coreSidebar
---

在编码 Conflux Core Space 交易时，以下字段是必需的：

- `from` - 发送方地址，将对交易进行签名。 这将是一个外部拥有账户（EOA），因为合约账户不能发送交易。
- `to` - 接收地址（如果是外部拥有账户，则交易将转移价值。 如果是合约账户，则交易将执行合约代码）。
- `value` - 从发送方转移到接收方的CFX数量 (以Drip为单位，其中1CFX等于1e+18Drip)。
- `nonce` - 一个有序递增的计数器，表示账户的交易编号。
- `data`（可选）：包含任意数据的字段
- `gas` - 交易可以消耗的最大 gas 单位量。 EVM 指定了每个计算步骤所需的gas单位量。
- `gasPrice` - 消耗Gas的价格，作为小费包含在交易中来奖励执行该交易的验证者。
- `storageLimit` - 该交易可消耗的最大存储空间。
- `chainId` - 区块链的ID，用于防止重放攻击。
- `epochHeight` - 区块链的纪元(epoch)编号，用于设置交易的过期时间。
- `signature`(r,s,v) – 发送者的签名。 这是在发送者的私钥签署交易并确认发送者已经授权该交易时生成的。

## 基本字段

`from`、`to` 和 `value` 是交易的基本字段。 这些字段分别对应于**发送方账户的地址**、**接收方账户的地址**和**要转移的金额**。

### from

`from` 字段标识交易的发送者。 本质上，`from` 字段告诉您谁在发起交易以及谁在支付交易费用。 并且在[签名阶段](./encoding-signning.md)，交易将用 `from` 账户的私钥进行签名，所以你不能指定任何地址作为发送者。

还要记住，账户**必须有足够的余额来支付**转账金额（`value` 字段）和**交易费用**，否则 RPC 将拒绝交易，交易将不会被发送。

值得一提的是，在一些特定的情况下，Conflux Core Space 的赞助机制可以允许其他账户支付交易费用，从而让余额为 0 的账户也能发送交易。

> 事实上，`from` 字段并没有直接包含在编码后的交易中。 一般来说，SDK 等工具会在编码前从交易中移除 `from` 字段，并用相应的私钥对交易进行签名。 其他人可以从交易的签名中恢复出发送者。

### to

`to` 字段表示交易的接收者账户。

- 如果你是进行简单的 CFX 转账，这个字段应该设置为 **CFX 接收者的账户**。
- 如果你是修改合约状态，to 字段应该设置为**合约的地址**。
- 如果你是部署一个新的合约，`to` 字段**留空**。

### value

`value` 字段表示要转移的 CFX 数量，必须**以 Drip（10e-18 CFX）为单位**设置为整数。

## nonce

`nonce` 是一个账户发送的交易的**执行序号**。 通常，你可以通过调用[`cfx_getNextNonce`](/docs/core/build/json-rpc/cfx-namespace/#cfx_getnextnonce) RPC方法来获取它。

如果你想加快交易处理速度，你可能想进一步探索[nonce管理机制](./nonce.md)。

## data

交易的 data 字段**可以留空**或设置为十六进制编码的字节。 这大致可以分为三种情况：

- 普通的 CFX 转账交易：`data` 字段通常为空，但也可以设置为十六进制编码的数据作为**交易的备注或附言**。
- 合约部署交易：`data` 需要设置为**合约的字节码和构造函数的参数**（如果有的话）
- 合约调用交易：`data` 字段用于存储合约调用的输入数据。 数据通常是**合约方法和参数 abi 编码后的结果**。

智能合约通常用高级合约开发语言（Solidity，vyper）编写。 你可以用编译器获得字节码和 abi。 SDK 会提供 abi 编码方法，用于合约方法调用的编码（编码方法名和参数）。

## 费用相关字段

交易信息中有几个与费用相关的字段，每个字段都服务于不同的目的。

### gas

在EVM中执行交易时，每个操作消耗一定量的gas。 为了防止过度消耗网络计算资源或被过度收费，有必要限制交易执行期间的gas消耗。 交易信息中的**gas**字段用于指定**交易执行的gas消耗上限**。 如果交易执行期间实际总共消耗的gas超过此限制，交易将失败。

交易执行期间实际消耗的gas量与交易的复杂性有关。 **标准的CFX转账**交易（无数据）通常消耗**21,000 gas**，而合约部署或交互可能消耗更多。

可以使用 [`cfx_estimateGasAndCollateral`](/docs/core/build/json-rpc/cfx-namespace/#cfx_estimategasandcollateral) 方法估计执行交易所需的gas量，该方法返回`gasUsed`、`gasLimit`和`storageCollaterized`字段。 建议使用gasLimit作为`gas`字段。

调用 [`cfx_estimateGasAndCollateral`](/docs/core/build/json-rpc/cfx-namespace/#cfx_estimategasandcollateral) 方法估计的gas可能不总是准确的，并且可能是更为保守的。 因此，在设置交易gas时，通常会将此方法返回的值乘以一个因子（例如1.3）以增加安全性。

有关 gas 的使用、估算和收费的更多信息，请参考 [Gas 简介](/docs/general/conflux-basics/gas.md)。

### gasPrice

gasPrice 用于设置发送方愿意为每单位gas支付的CFX金额（以Drip为单位）。 交易的总gas费用为**gasCharged \* gasPrice**。 矿工**使用gasPrice来确定交易在块中的包含顺序**。 通常来说，**使用更高的gasPrice可以被更快得使得交易被打包**。

可以使用 [`cfx_gasPrice`](/docs/core/build/json-rpc/cfx-namespace#cfx_gasprice)方法获得合适的gas价格。 在网络拥堵期间，可能需要手动设置更高的价格；详情请参考[如何设置价格](./transaction-fee.md)。

### storageLimit

在Conflux Core Space中，交易执行不仅消耗计算资源，还占用存储资源。 因此，交易会因占用存储而收费。 交易中的**storageLimit**字段类似于**gas**字段，用于指定交易可以占用的存储空间上限。 如果超过此限制，交易将失败。

[`cfx_estimateGasAndCollateral`](/docs/core/build/json-rpc/cfx-namespace/#cfx_estimategasandcollateral) 方法还可以估计交易执行将占用的存储大小。

## 其他字段

### chainId

`chainId` 字段在交易中用于识别特定的链。 例如，Core Space 的当前 chainId 是 1029，Core Space 测试网的 chainId是 1。 这个字段主要是为了防止重放攻击而包含在交易中。

通常，不需要手动填写这个字段，因为 SDK 会通过 [`cfx_getStatus`](/docs/core/build/json-rpc/cfx-namespace/#cfx_getstatus) 方法自动获取 chainId。

### epochHeight

`epochHeight` 字段用于指定交易的目标纪元范围。 交易只会在 [epochHeight - 100000, epochHeight + 100000] 的范围内执行。 如果当前链的 epoch 超过了这个范围，交易将被丢弃。

SDK也会自动将此字段设置为通过 [`cfx_epochNumber`](/docs/core/build/json-rpc/cfx-namespace/#cfx_epochnumber) 方法获取的当前纪元。

## 签名字段

交易签名由交易的发送方生成，用以证明发送方对交易的授权。 交易签名包括三个字段：r、s 和 v。 其中，r 和 s 是两个 256 位的整数，v 是一个 8 位的整数。 生成交易签名的过程如下：

1. 使用 RLP 对交易的基本信息进行编码，得到编码后的数据。
2. 对编码后的数据执行 Keccak256 哈希操作，以获得一个 256 位的哈希值。
3. 使用哈希值和发送者的私钥作为参数，调用 ECDSA 签名算法，获取签名的r、s 和 v 字段。

具体生成细节，请参考 [交易编码和签名](./encoding-signning.md)。

## 参考资料

- Core Space 交易遵循 [ Conflux 协议](https://www.confluxnetwork.org/files/Conflux_Protocol_Specification.pdf) 的定义
- eSpace 交易遵循 [EIP-155](https://eips.ethereum.org/EIPS/eip-155) 规范

## 常见问题解答

### 交易燃气限制的最大值是多少？

交易 Gas 限制的最大值是区块 Gas 限制的一半，即 3 千万 Gas 的50%（15000000）。

### Core Space 交易燃气费的最小值是多少？

最小值是 1 GDrip（10\*\*9 Drip）。

### 交易数据的最大大小是多少？

大约 200k 字节。

### 通过 SDK 发送交易需要哪些参数？

使用 JS-SDK 进行基本的 CFX 转账时，三个必要参数分别是：from（发起账户）、to（接收账户）和 value（转移的金额，以 Drip 为单位）。 其他字段可以由 SDK 自动填充。
