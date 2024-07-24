---
sidebar_position: 2
title: 编码和签名
displayed_sidebar: coreSidebar
keywords:
  - 交易
  - 签名
  - 编码
---

在交易的每个字段都准备好后，需要按照以下步骤，才能将其发送到网络 (别担心， 这些步骤已经由钱包或SDK实现)：

1. 准备签名哈希: 按照`[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data]` 的顺序进行[RLP编码](https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp/) ，然后将`keccak256`操作应用到编码结果上，以获取哈希。
2. 签名：使用发送账户的私钥对上一步获得的哈希进行签名，并执行ecdsaSign签名操作，得到 r、s、v 的值。
3. 交易编码: 按照 `[[nonce, gasPrice, gas, to, value, storageLimit, epochHeight, chainId, data], v, r, s]` 的顺序进行RLP编码，并将其转换为十六进制字符串。

### 广播到网络

完成上述步骤后，你将获得一个十六进制编码的原始交易 （rawTx）。 你可以使用 [`cfx_sendRawTransaction`](../../build/json-rpc/cfx-namespace.md#cfx_sendrawtransaction) 方法将其发送到网络。 成功调用此方法后，将返回一个交易哈希，可用来查询交易状态。

### 参考

- [椭圆曲线数字签名算法(ECDSA)](https://fitsaleem.medium.com/ethereums-elliptic-curve-digital-signature-algorithm-ecdsa-88e1659f4879#:~:text=ECDSA%20is%20used%20in%20Ethereum,included%20in%20the%20transaction%20data.)
- [keccak256哈希](https://ethereum.org/en/glossary/#keccak-256)
- [递归长度前缀(RLP)序列化](https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp/)
