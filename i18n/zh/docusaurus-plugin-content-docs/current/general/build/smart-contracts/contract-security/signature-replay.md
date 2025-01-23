---
title: 签名重放攻击
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - security
  - vulnerabilities
  - signature-replay
  - wintermute
  - optimism
  - ecdsa
  - eip-712
  - cip-23
  - solidity
  - prevention
  - nonce
  - chainid
tags:
  - Signature Replay
  - Security
  - 智能合约
---

## 签名重放攻击

The signature replay attack that led to the theft of 20 million $OP tokens from Wintermute exposes critical vulnerabilities in the management of digital signatures on blockchain platforms. This incident was primarily triggered by a signature replay but was compounded by an additional transactional error with Optimism, a Layer-2 Ethereum scaling solution. In this case, the tokens were mistakenly sent to a multisignature wallet address that had not yet been properly initialized on the Optimism network.

For a more detailed report on this incident, you can read further on Blockworks and Decrypt:

- [Blockworks对Wintermute和Optimism事件的报告](https://blockworks.co/news/20m-tokens-lost-as-market-maker-wintermute-takes-blame)
- [Decrypt对Optimism代币失窃的报道](https://decrypt.co/99567/ethereum-layer-2-solution-optimism-loses-20-million-tokens-interlayer-snafu)

数字签名在区块链技术中发挥着至关重要的作用，用于识别数据的签名者并确保数据的完整性。 When users initiate transactions, they use their private keys to sign them. This allows anyone to verify that the transactions truly originate from the stated accounts. 此外，智能合约经常使用`ECDSA`算法在执行关键功能（如代币铸造或转账）之前验证链下签名。

通常有两种常见的签名重放攻击类型：

1. **标准重放攻击**: 一次性签名被反复利用，导致对NBA的“The Association”系列NFT进行了数千次未经授权的铸造。 有关此签名重放攻击的详细信息，请参阅Decrypt的报告: [NBA在以太坊NFT发售中出现问题，'The Association'遭受攻击  - Decrypt](https://decrypt.co/99567/nba-botches-ethereum-nft-drop-as-the-association-suffers-exploit).

该文章涵盖了在NFT发布过程中被利用的安全漏洞，导致了数千次未经授权的铸造。

1. **Cross-chain Replay**: A signature intended for use on one blockchain is reused on another. This type of attack was exploited in the theft of 20 million $OP tokens from Wintermute.

## 易受签名重放攻击的合约示例

下面的`SigAuth`合约是一个`ERC20`代币合约，该合约包含一个可被签名重放攻击利用的铸造函数。 它使用链下签名来允许白名单地址铸造指定数量的代币。 The contract stores a `signer` address to verify the authenticity of signatures.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SigAuth is ERC20, Ownable {
    address public authorizedSigner;

    constructor() ERC20("SignatureToken", "SIGT") {
        authorizedSigner = msg.sender;
    }

    function vulnerableMint(address recipient, uint amount, bytes memory signature) public {
        bytes32 messageHash = keccak256(abi.encodePacked(recipient, amount));
        bytes32 ethSignedMessageHash = ECDSA.toEthSignedMessageHash(messageHash);
        require(ECDSA.recover(ethSignedMessageHash, signature) == authorizedSigner, "Invalid signature!");
        _mint(recipient, amount);
    }

    // Other helper functions...
}
```

**Note**: The `vulnerableMint()` function does not check if the `signature` has been used before, allowing the same signature to be reused for unlimited token minting.

## 预防措施

To prevent signature replay attacks, you can use the following methods:

1. **Tracking Used Signatures**: Record signatures that have been used for operations like token minting to prevent their reuse.

   ```solidity
   // Record the minted addresses
   mapping(address => bool) public alreadyMinted;

   function secureMint(address recipient, uint amount, bytes memory signature) public {
       require(!alreadyMinted[recipient], "Tokens already minted for this address");
       bytes32 messageHash = keccak256(abi.encodePacked(recipient, amount));
       bytes32 ethSignedMessageHash = ECDSA.toEthSignedMessageHash(messageHash);
       require(ECDSA.recover(ethSignedMessageHash, signature) == authorizedSigner, "Invalid signature!");
       alreadyMinted[recipient] = true;
       _mint(recipient, amount);
   }
   ```

2. **包含Nonce和ChainID**: 在签名消息中加入一个`nonce` ( 随每笔交易递增) 和`chainID`以防止标准重放攻击和跨链重放攻击。

   ```solidity
   uint public nonce = 0;

   function nonceMint(address recipient, uint amount, bytes memory signature) public {
       bytes32 messageHash = keccak256(abi.encodePacked(recipient, amount, nonce, block.chainid));
       bytes32 ethSignedMessageHash = ECDSA.toEthSignedMessageHash(messageHash);
       require(ECDSA.recover(ethSignedMessageHash, signature) == authorizedSigner, "Invalid signature!");
       _mint(recipient, amount);
       nonce++;
   }
   ```

3. **使用EIP-712处理结构化数据**：实施EIP-712，以创建更安全和结构化的数据签名体验，有助于防止在不同上下文和合约中的签名重放攻击。

   ```solidity
   // Utilizing EIP-712 to create a typed structured data signature
   using EIP712 for bytes32;

   function eip712Mint(address recipient, uint amount, bytes memory signature) public {
       bytes32 structHash = keccak256(abi.encode(
           keccak256("Mint(address recipient,uint256 amount,uint256 nonce)"),
           recipient,
           amount,
           nonce
       ));
       bytes32 digest = _hashTypedDataV4(structHash);
       require(ECDSA.recover(digest, signature) == authorizedSigner, "Invalid EIP-712 signature!");
       _mint(recipient, amount);
       nonce++;
   }
   ```

您可以在 [OpenZeppelin的EIP-712 文档](https://docs.openzeppelin.com/contracts/5.x/api/utils#EIP712)中找到更详细的执行指南和工具。

4.**实施CIP-23以提高跨链操作的安全性**:
CIP-23 是以太坊 EIP-712 在**Conflux core space**的改编版本, 旨在增强跨链操作的安全性。 它引入了特定措施来防止重放攻击，确保对于EVM兼容链的签名不能被重放到Conflux core space，反之亦然。

更多信息和详细准则可在 [Conflux CIP-23](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-23.md)找到。
