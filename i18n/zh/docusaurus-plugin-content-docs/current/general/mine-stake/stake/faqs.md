---
sidebar_position: 5
title: 常见问题解答
---

# PoS FAQs

## 新的Conflux权益证明（Proof-of-Stake）链是什么？

权益证明（PoS）链是一个与工作量证明（PoW）链并行运行的覆盖链。 权益证明（PoS）链将为工作量证明（PoW）链增加安全性，并为交易提供最终性。

## Conflux中的PoS与其他PoS链有什么不同？

Conflux将采用混合的工作量证明（PoW）-权益证明（PoS）链。 目前没有计划完全迁移到权益证明（PoS）链。

## When will the PoS upgrade be released?

The PoS upgrade will be deployed in February. You can join the tests here.

## Will the PoS upgrade break compatibility?

Yes. Users running Conflux nodes will need to update their clients to be able to run the PoS chain.

## 如何成为权益证明（PoS）链的验证者？

For instructions on how to join the PoS public tests, check the Mining section of the forum or [click here](https://forum.conflux.fun/c/English/mining).

## 权益证明（PoS）链的主要优势在于什么？

权益证明（PoS）链的两个主要优势是增强的安全性和交易最终性。

通过升级，网络可以承受51%攻击，而不会危及主链（pivot chain）的完整性。

In a scenario where an attacker successfully takes over 17% of the committee members, the PoW chain will continue to operate as usual, but it transactions won't be finalized until the attacker disappears.

To conduct a successful attack where the pivot chain can diverge, an attacker will need to to control at least 84% of the committee members.

## 作为一名开发者，PoS 升级会对我有何影响？

权益证明（PoS）升级不会影响智能合约的执行环境。

## CIP-43是做什么的？

CIP-43引入了权益证明（PoS）链作为见证链，以防止51%攻击。

## Conflux是否会在CIP-43实施之后成为一个PoS链？

In CIP-43, PoS requires the consensus from at least 84% of the PoS participants to interfere with the PoW chain's behavior. Also need to mention that according to the protocol, PoS nodes should only sign blocks that have been confirmed by the PoW consensus.

This means that unless more than 84% of staking voters unite to attack the network, Conflux acts no differently than running with only the PoW chain if there are no PoW attacks. Transaction packaging, transaction executing, and block sorting are still done by the miners.

If users believe that at least 17% of the PoS nodes are honest, then they only need to consider the PoW rules.

## Conflux不承认PoS，那么为什么选择引入它呢？

在PoS链上，拥有超过34%权益的群体可以阻止任何交易被记录到链上，从而停止该链的运行。 并且拥有超过67%的权益的群体可以完全控制整个区块链，并且可以随意发起双花攻击。 在长程攻击中，攻击者可以通过购买已经抛售的投资者的私钥来重写整个历史记录。

那CIP-43是什么呢？ 在没有51%攻击的情况下，持有34%的权益无法做任何事情，而持有67%的权益同样无法做任何事情。 (17% of the Stake can stop the PoS chain, but the PoW chain can still run as usual, just like how it behaves without CIP-43). It takes at least 84% of the Stake (>5/6) to have a tangible impact on the PoW chain, and the Long Range Attacks of PoS have almost no effects here as well.

总体上，CIP-43对于权益节点的依赖与纯PoS链完全不同。

## Proof of Stake（PoS）是否增加了交易确认的复杂性？

首先，由于Conflux共识的特殊性，交易确认不能简单地通过计算确认的区块数量来实现。 如果您了解GHOST协议，GHOST协议要求比较每个层级的子树和兄弟子树的大小。 Conflux的GHAST协议甚至更加复杂。 Conflux交易确认规则如下所示： 您在ConfluxScan上看到“安全级别”图标闪烁的过程实际上是由这些数学公式支持的。

与这些数学公式相比，查看PoS链的状态并不会耗费很多。

![Locale Dropdown](./img/4finalization.png)

![Locale Dropdown](./img/5finalization.png)

## 什么是“强制退休”？

如果一个候选人被选入委员会但在两次选举之间没有参与签名，所有锁定的投票将自动解锁。 这可能发生在您的PoS节点由于某种原因处于离线状态时。 在这种情况下，节点的PoS账户将无法在接下来的7天内获得投票权。 这个机制通常被称为*”强制退休“*

## 我可以如何安全地重新启动 PoS 节点？

为了防止在重新启动PoS节点时发生强制退休，建议按照以下步骤进行操作：

1. 在PoS节点上运行`./conflux RPC local pos stop_election`命令。 节点将返回`NULL`或未来的PoS区块号。 After running this command, the node will not apply to join the PoS committee in the next term.
2. If the command returns a block number, keep the node running. Run the same command again after the PoS block of the returned block number has been generated (est. several hours later). At this point, the command should return `NULL`. The node will no longer receive PoS rewards after this block.
3. Once the command returns `NULL`, the node can be safely stopped. The PoS voting process will resume to normal automatically after the node has been restarted (est. 2-3 hours to generate new PoS rewards).
