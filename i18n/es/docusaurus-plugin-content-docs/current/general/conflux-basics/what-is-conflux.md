---
sidebar_position: 1
title: '¿Qué es Conflux?'
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - blockchain
  - consensus mechanism
  - Tree Graph
  - GHAST
  - Prueba de trabajo (Proof of Work)
  - Proof de Stake (Prueba de participación)
  - hybrid consensus
  - high throughput
  - low latency
  - decentralization
  - Core Space
  - eSpace
  - cross-space communication
tags:
  - What is Conflux
---

Conflux se destaca como una blockchain pública con un rendimiento superior, un mecanismo de consenso único y un innovador diseño dual-space. Estas características permiten que Conflux ofrezca una plataforma rápida, segura y descentralizada que es adecuada para diversas aplicaciones, incluidas las finanzas descentralizadas y los juegos.

Conflux utiliza un [mecanismo de consenso](./consensus-mechanisms/consensus-mechanisms.md) híbrido, combinando Prueba de Trabajo (PoW) y Prueba de Participación (PoS), garantizando alta seguridad, rendimiento y descentralización. El consenso PoW de Conflux aprovecha la estructura [ Tree-Graph](./consensus-mechanisms/proof-of-work/tree-graph.md) y el [algoritmo GHAST](./consensus-mechanisms/proof-of-work/ghast.md), ofreciendo un alto rendimiento de hasta 3,000 TPS y una latencia de confirmación de 1 minuto, manteniendo el mismo nivel de descentralización que Bitcoin y Ethereum. El consenso PoS de Conflux ofrece la finalidad de la red, mitigando el riesgo de un [ataque del 51%](./consensus-mechanisms/proof-of-stake/why-pos.md).  En consecuencia, Conflux tiene la capacidad de manejar eficientemente un gran número de transacciones, convirtiéndola en una plataforma robusta y fiable para una amplia gama de aplicaciones.

La red Conflux comprende dos distintos [espacios](./spaces.md): Conflux [Core Space](../../core/Overview.md) y Conflux [eSpace](../../espace/build/cip90.md). El Core Space es la red blockchain principal que utiliza el mecanismo de consenso híbrido y cuenta con un [mecanismo de subsidio de gas](../../core/core-space-basics/internal-contracts/sponsor-whitelist-control.md). El mecanismo de subsidio permite a los usuarios del proyecto interactuar con contratos sin tener un saldo, reduciendo el límite de uso de la blockchain y expandiendo la base de usuarios. El eSpace es totalmente compatible con la máquina virtual de Ethereum (EVM), que permite a los desarrolladores migrar fácilmente sus contratos inteligentes de Ethereum a Conflux eSpace y beneficiarse de su alto rendimiento y escalabilidad. Conflux Core Space y eSpace pueden comunicarse entre sí a través del contrato [CrossSpaceCall](../../core/core-space-basics/internal-contracts/crossSpaceCall.md), que facilita la transferencia atómica de fondos y la ejecución atómica de llamadas de contratos inteligentes entre los dos espacios.

Si quieres aprender más sobre Conflux, echa un vistazo a este vídeo que cubre su único Algoritmo de Tree-Graph, GHAST, Espacios y el Mecanismo de Consenso Hibrido PoW + PoS :

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="youtube" label="What is Conflux?">
<iframe width="560" height="315" src="https://www.youtube.com/embed/5JwUO3v2sW0?si=lNvkMZqhHKnzBNIm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>
</Tabs>

:::tip

Bienvenidos al sitio de documentación de Conflux, su punto de partida para aprender sobre los conceptos básicos y el desarrollo de Conflux. ¡Disfrute la visita!

:::