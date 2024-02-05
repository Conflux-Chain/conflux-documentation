---
sidebar_position: 7
title: Espacios
displayed_sidebar: generalSidebar
---

## **Introducción a los Espacios**

En la actualización de Conflux v2.0 (Hydra), se introdujo una nueva característica llamada Spaces a través de **[CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md)**. Los espacios son un concepto abstracto que se utiliza para distinguir las transacciones en formato Conflux de las transacciones en formato Ethereum. Los espacios son una manera de crear virtualmente una subcadena de la red original de Conflux, conocida como **`eSpace`**.

Core Space se refiere a la red original de Conflux, mientras que eSpace es un sub-espacio completamente compatible con la máquina virtual de Ethereum corriendo sobre la misma infraestructura. Los dos espacios son lógicamente independientes entre sí y no se afectan mutuamente.

En otras palabras, podemos pensar en los Espacios como una tecnología de virtualización de los conceptos del sistema operativo, donde eSpace es una cadena virtualizada de Ethereum corriendo en la red Conflux original.

## **¿Por qué introducir eSpace?**

Conflux es una cadena pública de alto rendimiento, totalmente descentralizada, activada por un innovador algoritmo de consenso Tree-Graph. La tasa de transacción de Conflux es muy baja, que se puede considerar casi gratuita en comparación con otras redes como Ethereum. Sin embargo, Ethereum ya ha construido un ecosistema maduro, incluyendo herramientas, SDKs, billeteras y bibliotecas de Solidity. Para reducir el coste de migración de proyectos y usuarios y hacer que los usuarios experimenten las ventajas de las tarifas bajas y el alto TPS de Conflux, eSpace fue introducido.

A través de la interfaz totalmente compatible, los contratos inteligentes y dApps de Ethereum pueden ser desplegados directamente en eSpace sin ninguna modificación. Herramientas de desarrollo, SDKs, billeteras y servicios de Ethereum pueden utilizarse directamente en eSpace. Los usuarios no necesitan aprender nuevos conocimientos pero pueden utilizar las herramientas originales para empezar directamente.

eSpace es muy fácil de usar para desarrolladores y usuarios de Ethereum, al igual que BSC, Polygon, Aurora.

## **La relación entre los dos espacios**

El Core Space y el eSpace son dos espacios lógicamente independientes con sus propias transacciones, estado de cuenta y contratos. Comparten el mismo registro (cadena) para el almacenamiento de datos subyacente. Un bloque puede contener transacciones de ambos Espacios, y sólo se diferencian por el tipo de transacción cuando las transacciones son ejecutadas. Cada uno sólo afectará el estado de la cuenta en su propio espacio.

Para interactuar con Core Space, utilice la billetera (Fluent), SDK (*-conflux-SDK), y las herramientas de desarrollo (chainIDE, hardhat) compatibles con Conflux. Para interactuar directamente con eSpace, utilice las herramientas y productos existentes del ecosistema Ethereum, como Metamask, Hardhat, Ethers. s, etc. (simplemente configurando la red RPC de la herramienta a **[Conflux eSpace RPC](../../espace/network-endpoints.md)**.

## **Cómo comunicarse entre espacios**

Para comunicarse entre el Core Space de Conflux y el eSpace, el contrato [CrossSpaceCall](../../core/core-space-basics/internal-contracts/crossSpaceCall.md) puede utilizarse para transferir CFX y desplegar contratos del Core Space al eSpace, así como también los métodos de contrato del eSpace en el Core Space. Cada cuenta en el espacio central tiene una correspondiente [dirección espejo](../../espace/build/accounts.md#mapped-addresses-in-cross-space-operations) en eSpace, calculado decodificando la dirección original Base32 y creando el hash con Keccak. El contrato interno provee transferencias de CFX a través de los espacios **sincronizadas**, haciéndolas simples, seguras y rápidas. El sistema de eventos integrado y el paso de mensajes en cadena también pueden utilizarse para la comunicación entre espacios.

## **Cuál Elegir**

Conflux Core Space es un espacio nativo que soporta [subsidios de contrato](../../core/core-space-basics/internal-contracts/sponsor-whitelist-control.md) y tiene más capacidad de red (mayor TPS). Sin embargo, su [ formato de dirección](../../core/core-space-basics/addresses.md) y [RPC](../../core/build/json-rpc/cfx-namespace.md) es diferente a Ethereum, así que se espera que los desarrolladores adopten [herramientas específicas de Conflux](../../core/build/sdks-and-tools/sdks.md) para desarrollar. Por lo tanto, si quieres desarrollar un proyecto nuevo, puedes elegir el Core Space. El mecanismo de subsidio de contratos permite a los usuarios del proyecto interactuar con contratos sin tener un saldo, reduciendo el límite de uso de la blockchain y expandiendo la base de usuarios. Además, esta característica permite a los desarrolladores desarrollar aplicaciones en cadena pública de acuerdo con las regulaciones en países o regiones donde las monedas digitales son estrictamente controladas.

Si desea desplegar un proyecto de Ethereum para aprovechar el alto rendimiento y bajo costo de Conflux reduciendo los costos del usuario, puedes elegir eSpace. El proyecto se puede desplegar directamente sin ninguna modificación. Si eres un ingeniero experto en Ethereum, también puede elegir eSpace directamente y utilizar las herramientas y SDKs con las que está familiarizado para comenzar rápidamente.

## Referencia

- [CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md).
- [Compatibilidad RPC del eSpace](../../espace/build/jsonrpc-compatibility.md).
- [Compatibilidad EVM del eSpace](../../espace/build/evm-compatibility.md).
