# Proof-of-Stake Finality Layer: Design Rationale

With the upcoming migration of Ethereum to Proof-of-Stake in the coming months, a significant amount of hashing power coming from GPUs will move on to new projects to mine.

Since Conflux also uses GPU mining, the possibility of a large influx of hashing power joining the network in a short period of time poses a risk to the network, leaving it open to 51% attacks.

This risk exists in all public Proof-of-Work (PoW)-based chains.

In theory, public PoW networks can never completely eliminate the risk of a 51% attack. In practice, conducting a 51% attack largely depends on the benefits and cost of attack. If the benefit of attacking a network is greater than the cost of attacking it, then the attacker will be incentivized to conduct such attack.

As such, all networks can do is to disincentivize these attacks, that is, to increase the cost of attack as much as possible. 

There are different ways in which we can disincentivize 51% attacks:

There were different options that were considered to prevent future attacks on Conflux:

1. Avoiding all large-scale hashing power pools. Specifically, abandoning GPU mining and changing to ASIC mining.
2. Increasing Conflux's hashrate, such that it approached (or exceeded) that of Ethereum. To accomplish this, the mining revenue should be comparable to that of Ethereum. At an issuance of 2.6 ETH per block, with block times of 13 seconds, this brings the total issuance to 17280 ETH/day. Compared to Conflux, this is 100-200 times larger than the current mining rewards, which is unfeasible at the moment.
3. Adding a Proof-of-Stake mechanism that acts as a finality layer, working alongside the Proof-of-Work layer. Transactions produced by the PoW layer are then finalized in the PoS layer. This way, if an attacker conducts a successful 51% attack against the network, the impact they would cause would be minimized to only a few blocks, those which haven't been finalized by the PoS layer.

Out of these options, we believe that the last one was the most feasible of all.

With these goals in mind, we believe that we have achieved the following goals:

* Security and reliability at the block production (Proof-of-Work) layer.
* Fast confirmation times without a significant increase in energy consumption through the finality (Proof-of-Stake) layer.
* Significant increase in the cost of attacks.
* Maintaining high throughput at both layers.