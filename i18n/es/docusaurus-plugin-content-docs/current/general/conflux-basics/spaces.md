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

Core Space and eSpace share the same ledger for underlying data storage. A single block can contain transactions from both spaces, which are distinguished by their transaction encoding. However, they function as two logically independent spaces, each with its own transactions, account statuses, and contracts.

From a dApp developer's perspective, Core Space and eSpace can be seen as two separate chains with an internal bridge that allows for specific atomic calls. Transactions in each space only affect the account status within that particular space unless cross-space calls are made.

### eSpace Transaction Packing

In Conflux, eSpace transactions are only included in blocks if the block height is a multiple of 5. Since the [v2.4 hardfork](../hardforks/v2.4.md), including eSpace transactions does not affect the packing of Core Space transactions. As a result, the maximum block size can be larger at block heights that are multiples of 5 compared to those that are not.

### Graph Illustration

![spaces view from hardfork v2.4](./img/space.drawio.svg)

The graph above illustrates the relationship between the actual blocks in the ledger and the views from cSpace and eSpace. The text `H=..` indicates the block height.

#### Actual Blocks

In the Conflux ledger, blocks are organized as a Directed Acyclic Graph (DAG) and divided into epochs. For blocks whose height is a multiple of 5, eSpace transactions can be included, utilizing the isolated block space.

The parameter `block.gasLimit` represents the **expected** block size for overall Conflux blocks and is set to 60,000,000. This value can be retrieved using the [cfx_getBlockByHash](../../core/build/json-rpc/cfx-namespace.md) or similar RPC methods. The `cSpace.gasLimit` is set to 90% of `block.gasLimit` (54,000,000), while the `eSpace.gasLimit` is 50% of `block.gasLimit` (30,000,000).

Consequently, for blocks whose height is a multiple of 5, their size can reach up to `1.4 * block.gasLimit`, while for those that are not, their maximum size is `0.9 * block.gasLimit`.

:::note

Miners can adjust the block gas limit by 1% higher or lower for each block, but it is typically set to a constant value.

:::

#### cSpace View

From the Core perspective, the view is nearly the same as the actual block structure, except for the eSpace transactions. Blocks are organized as a DAG and divided into epochs, with each block having the same gas limit.

#### eSpace View

The eSpace view differs significantly from the actual block structure as it simulates the Ethereum ledger structure. Each Conflux epoch is mapped into an eSpace block. From the eSpace perspective, transactions in the epoch are included in the corresponding block. This means the maximum size of the block from the eSpace view is not fixed; it can be zero or more than twice the `eSpace.gasLimit`, depending on the blocks included in the original epoch.

In the **eSpace view** shown in the graph, empty blocks are present at heights 99, 101, 103, and 104. At heights 100 and 105, the blocks are of size equal to the `eSpace.gasLimit`. At height 102, the block size is `2 * eSpace.gasLimit`.

## Development

Para interactuar con Core Space, utilice la billetera (Fluent), SDK (*-conflux-SDK), y las herramientas de desarrollo (chainIDE, hardhat) compatibles con Conflux. To interact with eSpace directly, use the existing tools and products from the Ethereum ecosystem, such as Metamask, Hardhat, Ethers.js, etc. (by simply setting the RPC network of the tool to **[Conflux eSpace RPC](../../espace/network-endpoints.md)**).

## **Cómo comunicarse entre espacios**

Para comunicarse entre el Core Space de Conflux y el eSpace, el contrato [CrossSpaceCall](../../core/core-space-basics/internal-contracts/crossSpaceCall.md) puede utilizarse para transferir CFX y desplegar contratos del Core Space al eSpace, así como también los métodos de contrato del eSpace en el Core Space. Cada cuenta en el espacio central tiene una correspondiente [dirección espejo](../../espace/build/accounts.md#mapped-addresses-in-cross-space-operations) en eSpace, calculado decodificando la dirección original Base32 y creando el hash con Keccak. El contrato interno provee transferencias de CFX a través de los espacios **sincronizadas**, haciéndolas simples, seguras y rápidas. El sistema de eventos integrado y el paso de mensajes en cadena también pueden utilizarse para la comunicación entre espacios.

## **Cuál Elegir**

Conflux Core Space es un espacio nativo que soporta [subsidios de contrato](../../core/core-space-basics/internal-contracts/sponsor-whitelist-control.md) y tiene más capacidad de red (mayor TPS). Sin embargo, su [ formato de dirección](../../core/core-space-basics/addresses.md) y [RPC](../../core/build/json-rpc/cfx-namespace.md) es diferente a Ethereum, así que se espera que los desarrolladores adopten [herramientas específicas de Conflux](../../core/build/sdks-and-tools/sdks.md) para desarrollar. Por lo tanto, si quieres desarrollar un proyecto nuevo, puedes elegir el Core Space. El mecanismo de subsidio de contratos permite a los usuarios del proyecto interactuar con contratos sin tener un saldo, reduciendo el límite de uso de la blockchain y expandiendo la base de usuarios. Además, esta característica permite a los desarrolladores desarrollar aplicaciones en cadena pública de acuerdo con las regulaciones en países o regiones donde las monedas digitales son estrictamente controladas.

Si desea desplegar un proyecto de Ethereum para aprovechar el alto rendimiento y bajo costo de Conflux reduciendo los costos del usuario, puedes elegir eSpace. El proyecto se puede desplegar directamente sin ninguna modificación. Si eres un ingeniero experto en Ethereum, también puede elegir eSpace directamente y utilizar las herramientas y SDKs con las que está familiarizado para comenzar rápidamente.

## Referencia

- [CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md).
- [Compatibilidad RPC del eSpace](../../espace/build/jsonrpc-compatibility.md).
- [Compatibilidad EVM del eSpace](../../espace/build/evm-compatibility.md).
