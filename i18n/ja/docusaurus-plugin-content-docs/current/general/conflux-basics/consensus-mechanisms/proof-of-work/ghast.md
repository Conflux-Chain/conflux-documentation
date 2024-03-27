---
sidebar_position: 3
title: GHAST
displayed_sidebar: generalSidebar
---

GHAST (Greedy-Heaviest-Adaptive-SubTree)

Conflux Research Group has developed the GHAST mechanism to address the "liveness attack" issue. The mechanism involves applying the heaviest chain rule but with a modified block weight system. The block type is decided based on the block's historical tree-graph structure, not the miner's discretion. Under the GHAST mechanism, the heaviest chain rule is implemented by selecting the child block with the highest weight from the current last main chain block's child tree. The calculation of block weight for the subtree is no longer based solely on block count but also the sum of the weights. The GHAST mechanism, by allowing miners to generate special blocks, increases the block difficulty and slows down the block production speed, which helps to address the "liveness attack" issue.

The core parts of the GHAST mechanism can be summarized as follows:

The heaviest chain rule is applied, but the block has three different weights: 0, 1, X. Where X is a relatively large number, for example X = 1000 (ignoring the situation involving adjustment of mining difficulty).

There are two types of blocks in the network: normal blocks and special blocks. The weight of the normal block is always 1; the weight of the special block is determined according to the difficulty of the block (Difficulty) — there are 1/X special block weights of X, while the rest are 0. Mining a normal block has the same difficulty as a special block.

The block type is determined by the historical Tree-Graph structure of the block. As the generator of a block cannot arbitrarily specify the block type.

In the absence of an attack, all newly generated honest blocks should become normal blocks; after the attacker conducts any kind of “liveliness attack” and continues for a long enough time, all newly generated honest blocks become special blocks.
