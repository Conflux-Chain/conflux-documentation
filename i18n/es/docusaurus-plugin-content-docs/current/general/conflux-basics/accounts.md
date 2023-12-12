---
sidebar_position: 10
title: Cuentas y Direcciones
displayed_sidebar: generalSidebar
---

## Información general

Las cuentas en Conflux se pueden comparar con "cuentas bancarias", ya que almacenan CFX. Los usuarios pueden crear y administrar sus cuentas, depositar CFX y enviar transacciones. La dirección de la cuenta es una cadena única que identifica una cuenta y se utiliza para recuperar la información de la cuenta de la enorme tabla de la Conflux VM, que almacena la información y el saldo de la cuenta.

:::note

The account implementation, including the account content and address computing rule is slightly different in [core space](../../core/core-space-basics/accounts.md) and [espace](../../espace/build/accounts.md).

:::

## Address

Las direcciones de las cuentas, como números de cuenta bancaria, identifican las cuentas y pueden ser examinadas en [ConfluxScan](https://confluxscan.io). However, the address format differs between [core space](../../core/core-space-basics/addresses.md) and espace. El espacio central utiliza el esquema de codificación CIP-37, mientras que el espacio utiliza el mismo formato que Ethereum.

Estos son ejemplos que muestran el formato de las direcciones en los 2 espacios:

``` 
// espace address
0x1e97870f263700f46aa00d967821199b9bc5a120
// Core Space Mainnet address
cfx:aatktb2te25ub7dmyag3p8bbdgr31vrbeackztm2rj
// Core Space Testnet address
cfxtest:aatktb2te25ub7dmyag3p8bbdgr31vrbeajcg9pwkc
```

## Tipos de cuentas

Existen dos tipos de cuentas, las cuentas de propiedad externa (EOA) y las cuentas de los contratos. La EOA está controlada por quien posea las claves privadas de la cuenta, mientras que la cuenta de un contrato es un Smart Contract (contrato inteligente) desplegado en la red, controlado por su código.

### Cuentas de propiedad externa (EOA) y pares de claves pública-privada

EOAs consist of a cryptographic pair of keys: a public and a private key. The private key, which is a 64 hexadecimal character string, is used to sign transactions and grants custody over the funds associated with the account. Public-key cryptography ensures that a transaction is not forged and that the sender can prove the authenticity of the transaction request. This protects against malicious actors broadcasting fake transactions.

Here is an example of private key:

```
c5eca1e5de819725cf7c6764f4bba7eea95549a40275b21eaff91554c59bef90
```

The public key is calculated from the private key by the [Elliptic Curve Cryptography Algorithm](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm):

```
0xa82d8039606ea598798ae1c995e2dbad90561d67ffa9555f96e0bc3dbc38c32aa1ede8ab17a137b8515b94b158b49a746c77abc432c2677cb0a6d3240be98872
```

An EOA's address is then computed from its public key:

```
// espace address, encoded in EIP-55 checksum format
0x7058Ce27AF14B05943B879E530Df642867dFcf57
// core space mainnet address (encoded in CIP-37 format)
cfx:aajfvxvhz6mna0md1b68mpg9puygt18tm6nynadnf6
```

### Smart Contract Accounts

[Smart contracts](./contracts.md) also have addresses, and users can interact with them by sending transactions. The contract address is determined when the contract is deployed, and the computation rule differs between core space and espace.

## Comparison of Different Account Types

### Similarities

- Both of them can accept, hold, and send CFX.
- Both of them can interact with smart contracts in the network

### Differences

#### External Accounts

- Creating external accounts does not have costs, such as CFX or other resources
- They can send transactions to others
- Transactions between external accounts can only be CFX or token transactions

#### Smart Contracts

- Creating smart contracts does have costs, as it uses the network's storage and computational resources
- Transactions can only be sent to other contracts as a response to a received transaction
- Transactions sent from external accounts to contract accounts can trigger the smart contract's codes to perform many different operations, such as token transfers, creating new contracts, etc.

## Related Topics

- [Ethereum Accounts](https://ethereum.org/en/developers/docs/accounts/)
- [Core space accounts](../../core/core-space-basics/accounts.md)
- [espace accounts](../../espace/build/accounts.md)
- [Core space addresses](../../core/core-space-basics/addresses.md)
