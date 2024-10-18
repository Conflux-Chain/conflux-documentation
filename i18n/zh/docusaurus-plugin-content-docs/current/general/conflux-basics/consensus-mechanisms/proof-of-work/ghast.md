---
sidebar_position: 3
title: GHAST
displayed_sidebar: generalSidebar
keywords:
  - Conflux-Network
  - GHAST
  - Greedy-Heaviest-Adaptive-SubTree
  - consensus-mechanism
  - liveness-attack
  - heaviest-chain-rule
  - block-weight
  - Tree-Graph-structure
  - special-blocks
  - normal-blocks
  - mining-difficulty
tags:
  - Proof-of-Work
  - GHAST
---

GHAST (Greedy-Heaviest-Adaptive-SubTree)

Conflux Research Group开发了GHAST机制，以解决“活性攻击”问题。 该机制涉及应用最重链规则，但采用了修改后的区块权重系统。 区块的类型是根据区块的历史树图结构决定的，而不是矿工的自由裁量。 在GHAST机制下，最重链规则是通过从当前最后主链区块的子树中选择权重最高的子区块来实现的。 子树的区块权重的计算不再仅基于区块数量，而且还要考虑权重之和。 GHAST机制通过允许矿工生成特殊区块，增加了区块难度并降低了区块生成速度，从而有助于解决“活性攻击”问题。

GHAST机制的核心部分可以总结如下：

应用最重链规则，但是区块有三种不同的权重：0、1、X。其中X是一个相对较大的数字，例如X=1000（忽略涉及挖矿难度调整的情况）。

网络中有两种类型的区块：普通区块和特殊区块。 普通区块的权重始终为1；特殊区块的权重根据区块的难度（Difficulty）确定——有1/X的特殊区块权重为X，其余为0。 挖掘普通区块和特殊区块具有相同的难度。

区块的类型由区块的历史树图结构决定。 作为一个区块的生成者，不能任意指定区块类型。

在没有攻击的情况下，所有由诚实参与者生成的新区块都应该成为普通区块；在攻击者进行任何形式的“活性攻击”并持续足够长时间后，所有由诚实参与者生成的新区块都变成特殊区块。
