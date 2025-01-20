---
displayed_sidebar: generalSidebar
sidebar_position: 2
keywords:
  - wallet backup
  - mnemonic phrase
  - private key
  - passphrase
  - cold storage
  - hardware wallet
  - cloud storage
  - paper backup
  - security audit
  - social engineering
tags:
  - 钱包
---

# 钱包备份的安全建议

## 1. 助记词/私钥备份

### 纯文本助记词

助记词通常由12或24个英文单词组成，遵循BIP39标准以确保互操作性，例如： "witch collapse practice feed shame open despair creek road again ice least"。

#### 安全建议：

- 考虑使用特殊的 "混淆模式"，例如按字母顺序重新排列单词或反转每一个字。
- 替换单词时要谨慎，可以使用同义词或自定义规则，但务必确保你能记住它们。
- 示例：将第3个、第7个和第11个单词替换为它们的反义词。

### 带密码的助记词

密码（有时称为“第25个单词”）通过在种子生成过程中增加额外的保护层来增强安全性，使得暴力破解攻击更加困难。 安全地备份助记词和密码是至关重要的。

#### 安全建议：

- 选择强密码，避免使用生日、常见词语等。
- 考虑使用密码管理器来生成和存储密码。
- 示例:使用 [1Password](https://1password.com/)生成强密码，如`"X2$9Pz#mK@Lq"`

## 2. 高级备份策略

### 云存储备份

云存储的优势在于易于访问和多重冗余，但也存在潜在的黑客攻击和服务提供商数据泄露的风险。

#### 安全强化措施：

- 使用客户端加密的云服务[Tresorit](https://tresorit.com/) or [Cryptomator](https://cryptomator.org/)
- 实现双因素身份验证 (2FA)
- 使用强且唯一的密码
- 在上传前使用[GPG](https://www.gnupg.org/)或者[VeraCrypt](https://www.veracrypt.fr/)进行额外加密
- GPG加密命令示例:
  ```
  gpg --encrypt --recipient your@email.com wallet_backup.txt
  ```

### 高级纸质备份

使用防水、防火的纸张，并考虑使用隐写术等技术来进一步增强纸质备份的安全性和隐私保护。

#### 安全强化措施：

- 使用密码保护的二维码存储助记词
- 将助记词编码成故事或图画
- 使用专业的金属蚀刻工具创建耐用备份
- 示例:使用像[Cryptosteel](https://cryptosteel.com/)或者 [Billfodl](https://shop.ledger.com/products/the-billfodl)这样的金属存储设备

### 冷存储设备

- 使用专业的硬件钱包，比如[Ledger](https://www.ledger.com/)或[Trezor](https://trezor.io/)
- 使用离线计算机进行冷存储

#### 安全强化措施：

- 定期更新固件
- 使用复杂的PIN码
- 启用高级安全功能，例如Ledger的反钓鱼词验证
- 考虑使用存储在不同位置的多个硬件钱包

## 3. 备份安全原则和实践

### 定期安全审计

定期检查所有备份的完整性和可访问性，并更新安全措施以应对新威胁。

#### 审计检查清单：

- 验证所有备份的可读性
- 测试恢复过程
- 检查硬件钱包固件更新
- 审查访问控制和密码强度

### 社交工程攻击防范

全面了解钓鱼和诈骗策略，以提高安全意识并保护你的数字资产。

#### 预防措施：

- 永远不要在网上共享完整的助记词或私钥
- 使用官方网站和应用程序，验证下载来源
- 对社交媒体和即时消息中非请求的"帮助"保持警惕。
