---
displayed_sidebar: eSpaceSidebar
keywords:
  - Conflux eSpace
  - ECDSA
  - Digital Signatures
  - 智能合约
  - Solidity
  - OpenZeppelin
  - 以太坊
  - Cryptography
  - Blockchain Security
  - GAS 优化
  - Allowlists
  - Airdrops
  - Merkle Trees
  - ethers.js
  - JavaScript
  - Web3 Development
  - EIP-191
  - Signature Verification
  - Elliptic Curve Cryptography
  - Off-chain Computation
  - On-chain Verification
  - Contract Efficiency
  - Decentralized Identity
  - Multi-sig Wallets
tags:
  - ECDSA
  - 教程
---

# 如何使用 ECDSA 签名

ECDSA (椭圆曲线数字签名算法)是区块链和加密货币中广泛使用的一种数字签名算法。 它具有以下特点：

- 高安全性：基于椭圆曲线密码学
- 短签名长度：与 RSA 等算法相比，ECDSA 生成的签名更简洁
- 快速验证：适合在智能合约中使用

### 基本智能合约示例

下面是一个简单的 Solidity 智能合约，演示了 ECDSA 签名的基本用法：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SimpleECDSAExample {
    using ECDSA for bytes32;

    function verifySignature(bytes32 message, bytes memory signature, address signer) public pure returns (bool) {
        return message.recover(signature) == signer;
    }
}
```

This contract demonstrates the basic usage of ECDSA for signature verification. It uses OpenZeppelin's ECDSA library to:

1. 从签名中恢复签名者的地址
2. 将恢复的地址与提供的签名者地址进行比较

注意：此示例使用 OpenZeppelin v5.0.0。 如果您使用的是较早版本，可能需要相应地调整代码。

## 创建和验证ECDSA签名

使用ethers v6，创建和验证ECDSA签名非常简单。 下面是一个示例：

```javascript
const ethers = require('ethers');

// Create a signer (using a random wallet in this example)
const signer = new ethers.Wallet.createRandom()
console.log("Signer's address:", signer.address);

// Message to be signed
const message = "Sign into Conflux?";

// Sign the message
const signature = await signer.signMessage(message);
console.log("Signature:", signature);
```

这个示例展示了：

1. 如何创建一个签名者(使用随机钱包)
2. 如何签名一条消息

注意:`signMessage`方法会自动处理消息预处理（添加前缀和哈希），所以您不用手动进行这些步骤。

## ECDSA 签名在白名单和空投中的应用

### 将ECDSA签名与Merkle树进行比较

ECDSA 签名和 Merkle 树都是区块链应用中非常有用的技术，特别是在白名单和空投中。 Let's compare their characteristics:

#### Merkle树:

1. **大数据集的效率**:在验证大数据集中的成员资格时表现出色。
2. **Gas消耗**: 在某些情况下可能会导致更高的gas费用
   - 需要大量的calldata
   - Merkle 证明的大小随树的大小而增加
   - 验证 Merkle 证明需要多次哈希操作
3. **链上存储**:需要在链上存储Merkle根
4. **灵活性**: 允许通过仅更改受影响的分支，可以高效更新大数据集

#### ECDSA签名:

1. **固定大小**: 签名长度不随数据集大小变化
2. **较低的验证成本**: 只需要一次 ECDSA 恢复操作
3. **较少的链上存储**: 无需存储树根
4. **简单性**: 实现和理解起来更简单

#### Gas费用比较

以下是gas费用的粗略比较：

- Merkle树验证:大约50,000-100,000 gas (取决于树的深度)
- ECDSA签名认证: 大约3,000-6,000 gas

这意味着使用ECDSA签名可以节省大约90%的gas费用!

#### 注意事项:

- **数据集大小**:对于非常大的数据集，Merkle 树可能更高效，因为它们不需要为每个元素生成单独的签名
- **更新频率**: 如果数据集频繁变化，ECDSA 签名可能需要更多的链下计算来生成新签名
- **Gas 效率**:在许多情况下，ECDSA 签名提供了更好的 gas 效率，特别是对于较小的数据集或者验证单个元素时

### 实现示例

下面是一个使用 ECDSA 签名来验证白名单的智能合约示例：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract ECDSAAllowlist {
    address public signer;

    constructor(address _signer) {
        signer = _signer;
    }

    function isAllowed(address user, uint256 amount, bytes memory signature) public view returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(user, amount));
        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(messageHash);
        address recoveredSigner = ECDSA.recover(ethSignedMessageHash, signature);
        return recoveredSigner == signer;
    }

    // Other contract functionalities...
}
```

注意：此示例使用 OpenZeppelin v5.0.0。 如果您使用的是较早版本，可能需要相应地调整代码。

### 生成签名

链下，您可以使用以下 JavaScript 代码生成签名：

```javascript
const ethers = require('ethers');

async function signAllowlistMessage(signer, userAddress, amount) {
    const message = ethers.solidityPacked(
        ['address', 'uint256'],
        [userAddress, amount]
    );
    const messageHash = ethers.keccak256(message);
    // Use signMessage to automatically apply EIP-191 prefix
    const signature = await signer.signMessage(ethers.getBytes(messageHash));
    return signature;
}

const privateKey = 'YOUR_PRIVATE_KEY';
const signer = new ethers.Wallet(privateKey);
const userAddress = 'USER_ADDRESS';
const amount = 100;

signAllowlistMessage(signer, userAddress, amount).then(signature => {
    console.log('Signature:', signature);
});
```

## 结论

ECDSA 签名为优化 gas 成本提供了强大的工具，特别是在处理大型白名单或频繁的空投操作时。 通过使用 ECDSA 签名代替 Merkle 树，可以显著降低 gas 费用并提高合约效率。 但是，在做出决策之前，请务必权衡针对您的具体用例的利弊。

ECDSA 签名的灵活性和效率使其在各种区块链应用中成为宝贵的工具，不仅限于白名单和空投。 随着您对这些概念的熟悉，您可以探索更高级的用例，例如多重签名钱包和去中心化身份系统。
