---
sidebar_position: 10
title: Cuentas y Direcciones
displayed_sidebar: generalSidebar
keyworks:
  - Conflux-Network
  - accounts
  - addresses
  - blockchain
  - distributed-ledger
  - Proof-of-Work
  - Proof-of-Stake
  - hybrid-consensus
  - Tree Graph
  - GHAST
  - transaction-validation
tags:
  - Accounts
---

## Información general

Las cuentas en Conflux se pueden comparar con "cuentas bancarias", ya que almacenan CFX. Los usuarios pueden crear y administrar sus cuentas, depositar CFX y enviar transacciones. La dirección de la cuenta es una cadena única que identifica una cuenta y se utiliza para recuperar la información de la cuenta de la enorme tabla de la Conflux VM, que almacena la información y el saldo de la cuenta.

:::note

La implementación de la cuenta, incluyendo el contenido de la cuenta y la regla de cálculo de direcciones es ligeramente diferente en [Core Space](../../core/core-space-basics/accounts.md) y en [eSpace](../../espace/build/accounts.md).

:::

## Address

Las direcciones de las cuentas, como números de cuenta bancaria, identifican las cuentas y pueden ser examinadas en [ConfluxScan](https://confluxscan.io). Sin embargo, el formato difieren entre el [Core Space](../../core/core-space-basics/addresses.md) y el eSpace. El espacio central utiliza el esquema de codificación CIP-37, mientras que el espacio utiliza el mismo formato que Ethereum.

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

Las EOAs consisten en un par criptográfico de claves: una clave pública y privada. La clave privada, que es una cadena de 64 caracteres hexadecimales, se utiliza para firmar transacciones y garantizar la custodia de los fondos asociados a la cuenta. La clave criptográfica pública garantiza que una transacción no sea falsificada y que el remitente pueda demostrar la autenticidad de la solicitud de transacción. Esto protege contra los actores maliciosos que emiten transacciones falsas.

Aquí hay un ejemplo de clave privada:

```
c5eca1e5de819725cf7c6764f4bba7eea95549a40275b21eaff91554c59bef90
```

La clave pública es calculada a partir de la clave privada por el [Algoritmo criptográfico de curva elíptica](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm):

```
0xa82d8039606ea598798ae1c995e2dbad90561d67ffa9555f96e0bc3dbc38c32aa1ede8ab17a137b8515b94b158b49a746c77abc432c2677cb0a6d3240be98872
```

La dirección de un EOA se calcula a partir de su clave pública:

```
// dirección de eSpace, codificada en formato de suma de comprobación EIP-55
0x7058Ce27AF14B05943B879E530Df642867dFcf57
// dirección de Core Space Mainnet (codificada en formato CIP-37)
cfx:aajfvxvhz6mna0md1b68mpg9puygt18tm6nynadnf6
```

### Cuentas de Contratos Inteligentes

Los [Contratos Inteligentes](./contracts.md) también tienen direcciones, y los usuarios pueden interactuar con ellos enviando transacciones. La dirección del contrato se determina cuando se despliega el contrato, y la regla de cálculo difiere entre el Core Space y el eSpace.

## Comparación de los diferentes tipos de cuenta

### Similitudes

- Ambos pueden aceptar, recibir y enviar CFX.
- Ambos pueden interactuar con los contratos inteligentes de la red.

### Diferencias

#### Cuentas externas

- Crear cuentas externas no tiene costos, como CFX u otros recursos
- Pueden enviar transacciones a otros
- Las transacciones entre cuentas externas solamente pueden ser transacciones CFX o de tokens

#### Contratos Inteligentes

- La creación de contratos inteligentes tiene costos, ya que utiliza los recursos de almacenamiento y computacionales de la red
- Las transacciones sólo pueden ser enviadas a otros contratos como respuesta a una transacción recibida
- Las transacciones enviadas desde cuentas externas a cuentas de contratos pueden activar los códigos del contrato inteligente para realizar muchas operaciones diferentes, tales como transferencias de tokens, creación de nuevos contratos, etc.

## Temas relacionados

- [Cuentas de Ethereum](https://ethereum.org/en/developers/docs/accounts/)
- [Cuentas de Core Space](../../core/core-space-basics/accounts.md)
- [Cuentas de eSpace](../../espace/build/accounts.md)
- [Direcciones del Core Space](../../core/core-space-basics/addresses.md)
