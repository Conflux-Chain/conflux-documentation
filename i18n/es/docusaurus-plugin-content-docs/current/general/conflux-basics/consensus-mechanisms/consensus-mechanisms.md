---
sidebar_position: 2
title: Consenso
displayed_sidebar: generalSidebar
keywords:
  - Conflux-Network
  - consensus-mechanism
  - blockchain
  - distributed-ledger
  - Proof-of-Work
  - Proof-of-Stake
  - hybrid-consensus
  - Tree Graph
  - GHAST
  - transaction-validation
  - decentralization
  - security
  - scalability
tags:
  - Consensus Mechanisms
---

En blockchain, **consenso** se refiere al proceso por el cual todos los nodos de la red están de acuerdo con el estado actual de la cadena de bloques. Para lograr el consenso, cada nodo en la red debe validar y confirmar que las nuevas transacciones añadidas a la blockchain son válidas y cumplen las reglas del protocolo. Este proceso se logra a través de un algoritmo de consenso, como Proof of Work (PoW) o Proof of Stake (PoS), que incentiva a los nodos a mantener la consistencia y la disponibilidad de la cadena de bloques.

El consenso es fundamental para la seguridad y fiabilidad de la blockchain, ya que garantiza que todos los participantes en la red tengan la misma información del estado actual de la red y que las nuevas transacciones se adjunten a la cadena.

El consenso de Conflux es un mecanismo híbrido que combina PoW y PoS. Los mineros de PoW producen bloques y los ordenan usando el algoritmo Tree-Graph, logrando un alto rendimiento y escalabilidad. Los nodos de PoS firman bloques pivot para finalizarlos, lo que reduce la probabilidad de bifurcación. Los nodos de PoS se seleccionan en función de su participación en tokens CFX, lo que los incentiva a comportarse honestamente. El consenso PoW/PoS permite a Conflux lograr un alto rendimiento sin comprometer la descentralización.

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```
