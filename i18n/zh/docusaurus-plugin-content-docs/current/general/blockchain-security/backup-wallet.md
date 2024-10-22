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

# Security Advice for Wallet Backup

## 1. Mnemonic Phrases/Private Keys Backup

### Plaintext Mnemonic Phrases

Mnemonic phrases typically consist of 12 or 24 English words, following the BIP39 standard to ensure interoperability, for example: "witch collapse practice feed shame open despair creek road again ice least".

#### Security Recommendations:

- Consider using special "obfuscation modes", such as rearranging words alphabetically or reversing every other word
- Be cautious when replacing words; you can use synonyms or custom rules, but make sure you can remember them
- Example: Replace the 3rd, 7th, and 11th words with their antonyms

### Mnemonic Phrases with Passphrase

Passphrase, sometimes referred to as the “25th word,” enhances security by adding an extra layer of protection to the seed generation process, making brute-force attacks significantly more challenging. It’s crucial to back up both the mnemonic phrase and the passphrase securely.

#### Security Recommendations:

- Choose a strong password, avoiding birthdays, common words, etc.
- Consider using a password manager to generate and store the password
- Example: Use [1Password](https://1password.com/) to generate a strong password like `"X2$9Pz#mK@Lq"`

## 2. Advanced Backup Strategies

### Cloud Storage Backup

Advantages include easy access and multiple redundancies, but there are risks of potential hacking attacks and service provider data breaches.

#### Security Enhancement Measures:

- Use client-side encrypted cloud services like [Tresorit](https://tresorit.com/) or [Cryptomator](https://cryptomator.org/)
- Implement two-factor authentication (2FA)
- Use strong, unique passwords
- Apply additional encryption using [GPG](https://www.gnupg.org/) or [VeraCrypt](https://www.veracrypt.fr/) before uploading
- GPG encryption command example:
  ```
  gpg --encrypt --recipient your@email.com wallet_backup.txt
  ```

### Advanced Paper Backups

Use waterproof, fireproof paper and consider steganography techniques to further enhance the security and privacy protection of paper backups.

#### Security Enhancement Measures:

- Use password-protected QR codes to store mnemonic phrases
- Encode mnemonic phrases as stories or drawings
- Create durable backups using professional metal etching tools
- Example: Use metal storage devices like [Cryptosteel](https://cryptosteel.com/) or [Billfodl](https://shop.ledger.com/products/the-billfodl)

### Cold Storage Devices

- Use dedicated hardware wallets like [Ledger](https://www.ledger.com/) or [Trezor](https://trezor.io/)
- Use offline computers for cold storage

#### Security Enhancement Measures:

- Regularly update firmware
- Use complex PIN codes
- Enable advanced security features, such as Ledger's anti-phishing word verification
- Consider using multiple hardware wallets stored in different locations

## 3. Backup Security Principles and Practices

### Regular Security Audits

Regularly check the integrity and accessibility of all backups, and update security measures to address new threats

#### Audit Checklist:

- Verify the readability of all backups
- Test recovery processes
- Check for hardware wallet firmware updates
- Review access controls and password strength

### Social Engineering Attack Prevention

Develop a comprehensive understanding of phishing and scam tactics to enhance your security awareness and protect your digital assets.

#### Preventive Measures:

- Never share complete mnemonic phrases or private keys online
- Use official websites and apps, verify download sources
- Be wary of unsolicited "help" on social media and instant messaging
