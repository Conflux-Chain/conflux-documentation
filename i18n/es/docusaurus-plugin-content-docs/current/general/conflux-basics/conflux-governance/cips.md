---
sidebar_position: 2
title: CIPs
displayed_sidebar: generalSidebar
---

# CIPs

## Información general

Como red descentralizada, los cambios importantes en el protocolo de Conflux deben llegar a un consenso antes de que se puedan promulgar. Tales cambios se proponen en forma de **Propuesta de Mejora de Conflux**o CIP para abreviar. Una vez que se debate un CIP, se finaliza la especificación y se consigue el apoyo popular, se implanta un conjunto de CIPs y se despliega como una actualización de la red, también conocida como hard fork.

El proceso para presentar un CIP se describe en [CIP-1](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-1.md). Los CIPs tienen las siguientes etapas:

```
[ IDEA ] -> [ BORRADOR ] -> [ ÙLTIMO LLAMADO ] -> [ ACEPTADO ] -> [ FINAL ]
```

Para obtener más información, consulte [CIP-1](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-1.md).

## CIPs destacados

A continuación figuran algunos de los CIPs más significativos desde el lanzamiento de la red principal de Conflux.

- [CIP-23](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-23.md): **Firma y hash de datos estructurados tipificados**. Este CIP define los estándares de firma de Conflux, basados en [EIP-712](https://eips.ethereum.org/EIPS/eip-712) de Ethereum.
- [CIP-37](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-37.md): **Introduce Direcciones de suma de verificación Base32**. El formato de dirección Core Space que conoces de [Fluent](https://fluentwallet.com/) y otras billetear se definió en CIP-37.
- [CIP-40](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-40.md): **Reducir recompensas base de bloque a 2 CFX**. En la primera actualización del hard fork tras el lanzamiento de la mainnet, la recompensa base de los bloques se redujo de 7 CFX a 2 CFX. Este fue también el primer CIP que se confirmó en una [votación de gobernanza](https://governance.confluxnetwork.org/en/governance/).
- [CIP-43](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-43.md): **Introducir la finalización a través de la votación entre participantes de Staking**. Este CIP introdujo la idea del consenso híbrido PoW-PoS, implementado en el hard fork Hydra.
- [CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md): **Un espacio completamente compatible con EVM**. La otra actualización importante en el hard fork Hydra fue la introducción de [Conflux eSpace](https://medium.com/conflux-network/conflux-espace-a-high-level-overview-cdca29bc422a), definida en este CIP.
- [CIP-94](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-94.md): **Votación DAO On-chain para parámetros de la red**. El mecanismo on-chain para la gobernanza de la comunidad, que se pondrá en marcha en una próxima actuaización de la red.

## ¿Cómo puedo enviar un CIP?

Si desea enviar una propuesta de mejora de Conflux, debe empezar por copiar la plantilla [CIP Markdown](https://github.com/Conflux-Chain/CIPs/blob/master/cip-template.md) y rellenar algunos datos básicos en el preámbulo, como el título de este CIP, la lista de autores y el tipo de cambio que está proponiendo. Después de esto, puedes proceder a rellenar todas las secciones: `Sumario simple`, `Resúmen`, `Motivación`, `Especificación`, `Justificación`, `Retrocompatibilidad`, `Casos de Prueba`, `Implementación`, `Consideraciones de Seguridad`. Una vez que su borrador de CIP esté listo para su publicación inicial, envíelo a [CIPs GitHub repositoey](https://github.com/Conflux-Chain/CIPs) en un nuevo [PR](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

## Siguientes pasos

Una vez que su borrador CIP ha sido enviado, los editores CIP lo revisarán y abordarán cualquier cuestión de edición. En este punto, debe compartir el PIC con la comunidad Conflux, iniciar un debate, encontrar y abordar los problemas, y trabajar para lograr el apoyo popular al cambio o mejora propuestos.
