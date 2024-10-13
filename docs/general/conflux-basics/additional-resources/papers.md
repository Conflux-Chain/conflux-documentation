---
sidebar_position: 1
id: conflux_papers
title: Papers
keywords:
  - conflux
  - papers
displayed_sidebar: generalSidebar
tags:
  - Conflux-Protocol
  - research-papers
  - yellow-paper
  - consensus-mechanism
  - Tree-Graph
  - GHAST
  - high-throughput
  - fast-confirmation
  - decentralized-blockchain
  - adaptive-weighted-blocks
  - technical-presentation
---

The Conflux Protocol is defined and analyzed in a number of research papers.

## [Conﬂux Protocol Specification (Yellow paper)](https://www.confluxnetwork.org/files/Conflux_Protocol_Specification.pdf)
The [Protocol Specification](https://www.confluxnetwork.org/files/Conflux_Protocol_Specification.pdf) serves as a reference of the Conflux protocol. It describes the ledger structure, the consensus mechanism, Proof of Work, the incentive mechanism, and many others aspects of the system.

## [A Decentralized Blockchain with High Throughput and Fast Confirmation](https://www.usenix.org/conference/atc20/presentation/li-chenxing)
This paper presents Conflux, a scalable and decentralized blockchain system that provides high throughput and fast confirmation. Conflux operates on a novel consensus protocol which optimistically processes concurrent blocks without discarding any forks and adaptively assigns weights to blocks based on their topology in the Conflux ledger structure (called Tree-Graph). The adaptive weight mechanism enables Conflux to detect and thwart liveness attack by automatically switching between an optimistic strategy for fast confirmation in normal scenarios and a conservative strategy to ensure consensus progress during liveness attacks. 

## [GHAST: Breaking Confirmation Delay Barrier in Nakamoto Consensus via Adaptive Weighted Blocks](https://arxiv.org/abs/2006.01072)
This paper has been published at https://arxiv.org/. In it, we present a new consensus protocol named GHAST (Greedy Heaviest Adaptive Sub-Tree) which organizes blocks in a Tree-Graph structure (i.e., a directed acyclic graph (DAG) with a tree embedded) that allows fast and concurrent block generation.

## [Technical Presentation](https://confluxnetwork.org/files/Conflux_Technical_Presentation_20200309.pdf)
This is a technical presentation about Conflux's main ideas and architecture, you can find how it's designed, and how Conflux achieves safety against double spending attacks and robustness against liveness attacks.
