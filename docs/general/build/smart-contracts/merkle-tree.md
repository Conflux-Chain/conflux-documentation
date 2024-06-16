---
sidebar_position: 2
title: Merkle Tree
displayed_sidebar: generalSidebar
---

## Basic Concept

A Merkle Tree, also referred to as a hash tree, is an essential cryptographic structure in blockchain technology. It is widely implemented in blockchains such as Bitcoin and Ethereum. The construction of a Merkle Tree begins from the bottom, with each leaf node representing the hash of a data block. The non-leaf nodes are formed by hashing the combination of their two child nodes. This hierarchical structure ensures efficient and secure verification of large datasets, making Merkle Trees a critical component of blockchain integrity and security.

![Generating Merkle Tree](../../image/merkle-tree.png)

A `Merkle Tree` enables efficient and secure verification of large data structures through a mechanism known as `Merkle Proof`. In a `Merkle Tree` with `N` leaf nodes, if the root value is known, verifying the validity of a data block (i.e., whether it is a leaf node in the `Merkle Tree`) requires only `ceil(log₂N)` pieces of data, referred to as `proof`, making the process highly efficient. If the data is incorrect or the provided `proof` is invalid, the root value cannot be correctly reconstructed.

For instance, the `Merkle Proof` for leaf `L1` includes `Hash 0-1` and `Hash 1`. Using these two values, we can verify if `L1` is part of the `Merkle Tree`. Here’s how it works: starting with leaf `L1`, we can calculate `Hash 0-0`. With `Hash 0-1`, we then compute `Hash 0`. Finally, using `Hash 1`, we combine `Hash 0` and `Hash 1` to derive the `Top Hash`, which is the root node's hash.

## Generating a Merkle Tree

We can use [this webpage](https://lab.miguelmota.com/merkletreejs/example/) or the JavaScript library [merkletreejs](https://github.com/miguelmota/merkletreejs) to generate a `Merkle Tree`.

Here, we'll use the webpage to generate a `Merkle Tree` with 4 addresses as leaf nodes. Input the leaf nodes as follows:

```solidity

[
    "cfx:aanx6yaz8dpzkaxae9whk5dwnv3ht70p22kmbn53h3",
    "cfx:aamfjckr0t4egdymymjw475pz5jdng154yw4a0hcf6",
    "cfx:aaryn9u88jt23wehbwryrm52ntrfvscs62zu50kdj2",
    "cfx:aathwrjf2j9565fkumk1unrdvhn3v7e36umd4x19eg"
]

```

![Merkle Proof](../../image/merkle-tree-tool.png)

Select the options `Keccak-256`, `hashLeaves`, and `sortPairs` from the menu, and then click `Compute` to generate the `Merkle Tree`. The expanded `Merkle Tree` looks like this:

```
└─ Root: 7c673c5ecb8433fe9c80facbb70c2d229594098cdee84e4ec0fd5bc1acd4c176
   ├─ 8d4991806718c7ea7b0f068bb9d2edd409ef2345b5bd5ec3153051b03a5d35b7
   │  ├─ Leaf0: 80fb605c5563c3225af42a18df921edcabe19e0e6e22066024cce4b14bbc06ec
   │  └─ Leaf1: 3d086ece86f43ea620356709c6867a3662f54f8d51ce1f85b8e5125242c75a6d
   └─ 11f6b7dca7ed5f46ac3fa990b370f130f3db3dcfcde770a6958e676449348d97
      ├─ Leaf2: bed238de7f62b0198a0a969b9d4ed809a036b4882740d2125b81dc9fc0da1d25
      └─ Leaf3: adac58c9ca5c47917367d64baa67a6ba7ce3e67145fb19fb82b83c7766298130
```

## Merkle Proof Verification

Using the website, we can obtain the `proof` for `address 0`: `cfx:aanx6yaz8dpzkaxae9whk5dwnv3ht70p22kmbn53h3`, which consists of the hash values of the blue nodes in the second diagram:

```solidity
[
  "0x3d086ece86f43ea620356709c6867a3662f54f8d51ce1f85b8e5125242c75a6d",
  "0x11f6b7dca7ed5f46ac3fa990b370f130f3db3dcfcde770a6958e676449348d97"
]
```

![Merkle Proof](../../image/merkle-tree-proof.png)

In our smart contract, we can use the `MerkleVerification` library to verify proofs.

```solidity
library MerkleVerification {
    /**
     * @dev Returns true if a `leaf` can be proved to be a part of a Merkle tree defined by `root`.
     * For this, a `proof` must be provided, containing sibling hashes on the branch from the leaf to the root of the tree.
     */
    function verify(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf
    ) internal pure returns (bool) {
        return processProof(proof, leaf) == root;
    }

    /**
     * @dev Returns the rebuilt hash obtained by traversing a Merkle tree up from `leaf` using `proof`.
     * A `proof` is valid if and only if the rebuilt hash matches the root of the tree.
     */
    function processProof(bytes32[] memory proof, bytes32 leaf) internal pure returns (bytes32) {
        bytes32 computedHash = leaf;
        for (uint256 i = 0; i < proof.length; i++) {
            computedHash = hashPair(computedHash, proof[i]);
        }
        return computedHash;
    }

    // Sorted pair hash
    function hashPair(bytes32 a, bytes32 b) private pure returns (bytes32) {
        return a < b ? keccak256(abi.encodePacked(a, b)) : keccak256(abi.encodePacked(b, a));
    }
}
```

The `MerkleVerification` library contains three functions:

1. `verify()`: Uses the `proof` to verify if the `leaf` belongs to the `Merkle Tree` defined by the given `root`. It calls the `processProof()` function.

2. `processProof()`: Computes the `root` hash from the `leaf` and `proof`. It calls the `hashPair()` function.

3. `hashPair()`: Computes the hash of a pair of nodes using `keccak256()` after sorting them.

By inputting the hash of `address 0`, the `root`, and the corresponding `proof` into the `verify()` function, it returns `true`. This confirms that the hash of `address 0` is in the `Merkle Tree` with the given `root`, and the `proof` is correct. Changing any of these values will return `false`.

## Using Merkle Tree for NFT

If you want to use a Merkle tree to issue whitelisted NFTs on Conflux Core Space, please refer to this article: [Merkle Tree NFT Whitelist on CoreSpace using Hardhat](docs/core/tutorials/nft-tutorials/whitelists).