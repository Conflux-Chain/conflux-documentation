---
displayed_sidebar: generalSidebar
sidebar_position: 2
---
# Security Advice for Wallet Backup

## 1. Security Advice on Mnemonic Phrases/Private Keys

### Plaintext Mnemonic Phrases

Mnemonic phrases typically consist of 12 or 24 English words, following the BIP39 standard to ensure interoperability, for example: "witch collapse practice feed shame open despair creek road again ice least".

#### Security Recommendations:

- Consider using special "obfuscation modes", such as rearranging words alphabetically or reversing every other word
- Be cautious when replacing words; you can use synonyms or custom rules, but make sure you can remember them
- Example: Replace the 3rd, 7th, and 11th words with their antonyms

### Mnemonic Phrases with Passphrase

Also known as "passphrase" or "25th word", based on the [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) function, it integrates the password into the seed generation process, significantly increasing the difficulty of brute-force attacks. A mnemonic phrase can be accompanied by a passphrase, resulting in a different seed used to derive a series of private keys, public keys, and corresponding addresses; therefore, it's important to back up both the mnemonic phrase and the passphrase.

#### Security Recommendations:

- Choose a strong password, avoiding birthdays, common words, etc.
- Consider using a password manager to generate and store the password
- Example: Use [1Password](https://1password.com/) to generate a strong password like `"X2$9Pz#mK@Lq"`

### Multi-signature Wallets

Multi-signature wallets require multiple private keys to jointly authorize transactions, with common configurations like 2-of-3 and 3-of-5, supporting various multi-signature schemes such as Bitcoin's [P2SH](https://en.bitcoin.it/wiki/Pay_to_script_hash) and Ethereum's smart contract multi-signature.

#### Security Recommendations:

- Carefully plan the signing strategy, balancing security and usability
- Consider geographical distribution to avoid single points of failure
- Use hardware wallets as part of the multi-signature setup to enhance security
- Example: 3-of-5 configuration, 2 keys on hardware wallets, 2 on paper backups, 1 in encrypted cloud storage

### Shamir's Secret Sharing (SSS)

Divides the secret (e.g., seed) into multiple shares, requiring a predetermined number of shares to reconstruct the secret.

#### Security Recommendations:

- Implement using features like Trezor's Shamir Backup
- Carefully choose the number of shares and recovery threshold, such as a 5-of-8 configuration
- Securely distribute shares, considering different storage methods and locations
- Example: 3 shares kept in secure locations, 2 given to trusted family members, 3 encrypted and stored in different cloud services

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

#### Security Enhancement Measures:

- Regularly review memorized content
- Combine with other backup methods, don't rely solely on memory
- Example: Create a story with 12 scenes, each representing a mnemonic word

## 3. Backup Security Principles and Practices

### Apply Zero Trust Model

Assume all networks are insecure and implement the principle of least privilege

#### Implementation Suggestions:

- Use virtual machines or [Tails OS](https://tails.boum.org/) to handle sensitive information
- Generate and recover wallets in offline environments
- Use hardware wallets to sign all transactions

### Multi-layered Defense Strategy

Implement a multi-layered security approach to ensure comprehensive protection

#### Implementation Example:

1. Store main funds in hardware wallets
2. Use hot wallets (e.g., mobile apps) for small daily transactions
3. Use multi-signature wallets for team or large funds
4. Regularly transfer funds from hot wallets to cold storage

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
