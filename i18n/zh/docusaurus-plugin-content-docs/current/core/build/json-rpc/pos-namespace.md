---
id: pos_rpc
sidebar_position: 3
title: pos 命名空间
description: The `pos` namespace includes RPCs related to PoS consensus.
keywords:
  - pos-rpc
displayed_sidebar: coreSidebar
---

`conflux-rust`从版本2.0.0开始引入了权益证明（PoS）最终性，以加速区块的最终性并防止51%攻击。 PoS finality将引入一个独立的PoS链用于PoS共识和确认PoW块的最终性。 对应地，PoS也有自己的RPC方法，用于从PoS链中获取数据。

Currently, only the archive nodes of conflux-rust can provide PoS RPC service to the public. `public_rpc_apis` needs to be configured to open RPC.

You can add the `pos` group to the current RPC method group.

```js
public_rpc_apis = "safe,pos"
```

Or just set `public_rpc_apis` to `all` to open all RPC methods.

```js
public_rpc_apis = "all"
```

## Basic Concepts

### epoch

The concept of epoch is also used in PoS. However, different from the epoch in PoW, an epoch in PoS represents the term of a committee, starting from term `1`. Each epoch is equivalent to `half hour` on average. After each epoch, a part of the members of the committee are replaced. The rewards for participating in PoS consensus are also given on an epoch basis.

### round

A PoS chain will on average perform one round of consensus `30 seconds` (i.e. try to generate a PoS block). This means that each epoch will have `60` rounds, and with each `new epoch`, the round will start from `1` again.

Note: Not every round will generate a block. there may be network or consensus failures preventing a block from generating.

### block.number

The block.number is the `height` of the block, and is added by one for each new block generated.

After a PoS block is proposed by a committee member, it will be sent to the network for voting. When the block collects enough votes, it is labeled as `voted`. However, the block has yet been committed. When three consecutive blocks are created, the block corresponding to the first round will be submitted. Then its state will change from `voted` to `committed`.

### pivotDecision

pivotDecision is the PoS chain's final decision on a block in the PoW chain. Once a block in the PoW is referenced by the PoS, the PoW block is finalized and there will be no further reversion. Blocks in the PoS chain will include PivotDecision attributes, indicating that this PoS block has finalized a block in the PoW chain. The pivotDecision is the block number or hash value of a block in the PoW chain.

### PoS Address

Unlike the format of the PoW address, the PoS account address is a 256-bit hash value, e.g:

`0x046ca462890f25ed9394ca9f92c979ff48e1738a81822ecab96d83813c1a433c`

## PoS Model

### AccountStatus

After an account registers to participate in PoS consensus, or adds staking to votes, the votes will first go into the `inQueue` state and then become `locked` after `seven days`. When the user makes an unlock command, the votes to be unlocked will first go into the `outQueue` state. Then it also takes `seven days` to become `unlocked`.


* `availableVotes`: `QUANTITY` - the number of votes currently available for the account. Equals to `sum inQueue` + `locked`
* `forfeited`: `QUANTITY` - the number of votes that are locked and cannot be retrieved if the account is identified as malicious.
* `forceRetired`: [`QUANTITY`] - the block number when the votes was retired
* `inQueue`: `Array` of [VotesInQueue](#votesinqueue) - the number of votes that are currently waiting to be locked
* `locked`: `QUANTITY` - the number of votes that are currently locked
* `outQueue`: `Array` of [VotesInQueue](#votesinqueue) - the number of votes that are currently waiting to be unlocked
* `unlocked`: `QUANTITY` - the number of users total unlocked votes in history

### Decision

The PoS chain's decision on the height of the PoW chain. The block of the PoW that is decided by the PoS chain is the Finalized block.

* `height`: `QUANTITY` - the height of the PoW block
* `blockHash`: `HASH` - the hash value of the PoW block

#### VotesInQueue

The information regarding a user's in-queue votes.

* `endBlockNumber`: `QUANTITY` - block number when the state ends
* `power`: `QUANTITY` - number of votes in the current status

## RPCs

### pos_getStatus

Returns the current status of the PoS chain.

#### 参数

`Empty`

#### 返回值

`Object` - PoS status object.

* `epoch`: `QUANTITY` - The current epoch number of the PoS chain.
* `latestCommitted`: `QUANTITY` - The number of the latest committed block. Committed blocks will not be reverted
* `latestVoted`: [`QUANTITY`] - The number of the latest successfully voted block, or `null` (if there are no blocks completed voting).
* `pivotDecision`: [`Decision`](#decision) - The PoS chain's finalized decision about the latest PoW pivot block.

#### 示例

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "pos_getStatus",
    "params": []
}'
```

Result

```json
{
    "jsonrpc": "2.0",
    "result": {
        "epoch": "0x56",
        "latestCommitted": "0x140c",
        "latestVoted": "0x140e",
        "pivotDecision": {
          "height": "0x113af0",
          "blockHash": "0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"
        }
    },
    "id": 1
}
```

### pos_getAccount

Get the PoS account information

#### 参数

1. `ADDRESS`: 32 Bytes - PoS account address
2. [`QUANTITY`]: block number, optional for querying the status of the account at a certain block height

```json
params: [
  "0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
  "0x100"
]
```

#### 返回值

`Object` - the account object, or `null` (if the account corresponding to the address does not exist)

* `address`: `ADDRESS` - the account address
* `blockNumber`: `QUANTITY` - the block number corresponding to the status
* `status`: `OBJECT` - the user's current status, see [Account Status](#accountstatus) for more information

#### 示例

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "pos_getAccount",
    "params": ["0x046ca462890f25ed9394ca9f92c979ff48e1738a81822ecab96d83813c1a433c"]
}'
```

Response

```json
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0x046ca462890f25ed9394ca9f92c979ff48e1738a81822ecab96d83813c1a433c",
        "blockNumber": "0x14a7",
        "status": {
            "availableVotes": "0x513",
            "forfeited": "0x0",
            "forceRetired": null,
            "inQueue": [],
            "locked": "0x513",
            "outQueue": [],
            "unlocked": "0x0"
        }
    },
    "id": 1
}
```

### pos_getCommittee

Get the current PoS committee information in default. It is also able to get the committee information for a block in history by specifying the blockNumber.

#### 参数

1. [`QUANTITY`]:  block number, optional for querying the committee information at a certain block height

#### 返回值

* `currentCommittee`: `OBJECT` -  current committee members, see [CurrentCommittee](#currentcommittee) for more information
* `elections`: `Array` - nodes who are running for election

##### CurrentCommittee

Current committee information

* `epochNumber`: `QUANTITY` - epoch number of the committee term
* `nodes`: `Array` of [CommitteNode](#committenode) - list of committee members
* `quorumVotingPower`: `QUANTITY` - the minimum number of votes needed to reach consensus
* `totalVotingPower`: `QUANTITY` - the total number of votes of the current committee members

##### CommitteNode

Committee member information

* `address`: `ADDRESS` - account address
* `votingPower`: `QUANTITY` - number of votes

##### Election

* `isFinalized`: `BOOLEAN` - whether the election is finalized or not
* `startBlockNumber`: `QUANTITY` - the starting block number
* `topElectingNodes`: `Array` of [CommitteNode](#committenode) - the top ranked 50 nodes after election

#### 示例

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "pos_getCommittee",
    "params": []
}'
```

Response

```json
{
    "jsonrpc": "2.0",
    "result": {
        "currentCommittee": {
            "epochNumber": "0x5a",
            "nodes": [
                {
                    "address": "0x046ca462890f25ed9394ca9f92c979ff48e1738a81822ecab96d83813c1a433c",
                    "votingPower": "0xc8"
                },
                {
                    "address": "0x459b19e745eb410c3696ff1ed15f9de9bb46aa5fefc27b0b6e8b8d7aaadfe8c0",
                    "votingPower": "0x32"
                }
            ],
            "quorumVotingPower": "0xa7",
            "totalVotingPower": "0xfa"
        },
        "elections": [
            {
                "isFinalized": false,
                "startBlockNumber": "0x1518",
                "topElectingNodes": [
                    {
                        "address": "0x046ca462890f25ed9394ca9f92c979ff48e1738a81822ecab96d83813c1a433c",
                        "votingPower": "0x2a"
                    },
                    {
                        "address": "0x459b19e745eb410c3696ff1ed15f9de9bb46aa5fefc27b0b6e8b8d7aaadfe8c0",
                        "votingPower": "0x8"
                    }
                ]
            },
            {
                "isFinalized": false,
                "startBlockNumber": "0x1554",
                "topElectingNodes": []
            }
        ]
    },
    "id": 1
}
```

### pos_getBlockByHash

Get block information by its hash value

#### 参数

1. `HASH`: the hash value of the block

```json
params: [
  "0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"
]
```

#### 返回值

* `epoch`: `QUANTITY` - the epoch that the block is in
* `hash`: `HASH` - the hash value of the block
* `height`: `QUANTITY` - the block height
* `miner`: [`ADDRESS`] - block creator, can be `null`
* `lastTxNumber`: `QUANTITY` - the number of the current block's last transaction
* `parentHash`: `HASH` - the hash value of the parent block
* `pivotDecision`: [`Decision`](#decision) - the decision to PoW chain
* `round`: `QUANTITY` - current round
* `signatures`: `Array` of [Signature](#signature) - the signatures of the block
* `timestamp`: `QUANTITY` - the timestamp of the block

##### Signature

Block signature info

* `account`: `ADDRESS` - the account address of the signature
* `votes`: `QUANTITY` - the number of votes of the signing account

#### 示例

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "pos_getBlockByHash",
    "params": ["0x2b8b9d33e79e1735817a1278a9c8c5be828101b281bd4190531686153bee317b"]
}'
```

Response

```json
{
    "jsonrpc": "2.0",
    "result": {
        "epoch": "0x5a",
        "hash": "0x2b8b9d33e79e1735817a1278a9c8c5be828101b281bd4190531686153bee317b",
        "height": "0x14ef",
        "miner": "0x046ca462890f25ed9394ca9f92c979ff48e1738a81822ecab96d83813c1a433c",
        "lastTxNumber": "0x1da7",
        "parentHash": "0x89cf3089296679dfef822d3dca037decab2a301de6f047e56c69cb34ae0b79e2",
        "pivotDecision": {
          "height": "0x113af0",
          "blockHash": "0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"
        },
        "round": "0x13",
        "signatures": [
            {
                "account": "0x046ca462890f25ed9394ca9f92c979ff48e1738a81822ecab96d83813c1a433c",
                "votes": "0xc8"
            },
            {
                "account": "0x459b19e745eb410c3696ff1ed15f9de9bb46aa5fefc27b0b6e8b8d7aaadfe8c0",
                "votes": "0x32"
            }
        ],
        "timestamp": "0x5cce0e869522a"
    },
    "id": 1
}
```

### pos_getBlockByNumber

Get block information by its block number

#### 参数

1. `QUANTITY|TAG`: block number or block TAG（`latest_committed`, `latest_voted`）

#### 返回值

the same as [pos_getBlockByHash](#pos_getblockbyhash)

#### 示例

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "pos_getBlockByNumber",
    "params": ["0x14ef"]
}'
```

### pos_getRewardsByEpoch

returns the rewards information of a PoS epoch

#### 参数

1. `QUANTITY`: epoch number

```json
params: [
  "0x4a"
]
```

#### 返回值

* `accountRewards`: `Array` of [AccountReward](#accountreward)
* `powEpochHash`: `HASH` - the hash value of the PoW block when the rewards are made

##### AccountReward

* `posAddress`: `ADDRESS` - PoS account address
* `powAddress`: `BASE32` - PoW account address
* `reward`: `QUANTITY` - the number of rewards, in the unit of Drip

##### 示例

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "pos_getRewardsByEpoch",
    "params": ["0x4a"]
}'
```

Response

```json
{
    "jsonrpc": "2.0",
    "result": {
        "accountRewards": [
            {
                "posAddress": "0x459b19e745eb410c3696ff1ed15f9de9bb46aa5fefc27b0b6e8b8d7aaadfe8c0",
                "powAddress": "NET8888:TYPE.USER:AAKSNR7XKKFFAM17MNESKAGU076T8FAG3YJ6PTHN16",
                "reward": "0x14931d20aa21eae3e6f"
            },
            {
                "posAddress": "0x046ca462890f25ed9394ca9f92c979ff48e1738a81822ecab96d83813c1a433c",
                "powAddress": "NET8888:TYPE.USER:AAPXUPNXG96GZ4077DAV0151K7P8498N9A6DMAWK1N",
                "reward": "0x2d49549e023888cd390"
            }
        ],
        "powEpochHash": "0x361cb0f19fd13c30da467d20a84ef01aabcd55e9812c5e2fd0721ea11a52e9f1"
    },
    "id": 1
}
```

### pos_getTransactionByNumber

Get the transaction information by transaction number

#### 参数

1. `QUANTITY`: transaction number

```json
params: [
  "0x4a"
]
```

#### 返回值

交易详情

* `hash`: `HASH` - the hash value of the transaction
* `from`: `ADDRESS` - the address of the sender
* `number`: `QUANTITY` - transaction number
* `blockHash`: [`HASH`] - the hash value of the block that the transaction belongs to
* `blockNumber`: [`QUANTITY`] - the block number of the block that the transaction belongs to
* `payload`: [`OBJECT`] - information of the transaction. The content of the payload differs with different transaction types.
* `status`: [`ENUM`] - the status of the transaction. Possible values are `Executed`, `Failed`, `Discard`
* `timestamp`: [`QUANTITY`] - the timestamp of the transaction
* `type`: `ENUM` the type of the transaction. Possible values are `BlockMetadata`, `Election`, `Retire`, `Register`, `UpdateVotingPower`, `PivoteDecision`, `Dispute`, `Other`

There are six types of payload（the payload of BlockMetadata transactions is null）:

Register:

* vrfPublicKey: `STRING` - the VRF public key
* publicKey: `STRING` - the public key

```json
{
  "publicKey": "0x90901cc921cd86c6a67bdb7652a3dc4e03e069c6ef6d8294eb4e856e396bb10e2191996a914eaaa9dfdaa75f2a3d70a3",
  "vrfPublicKey": "0x02a0c4e36a2e9a3a2804486b7c849d0eb6f30094e3fe91a9015e9c16f9279fbff8"
}
```

Election:

* publicKey: `STRING` - the public key
* targetTerm: `QUANTITY` - the committee number under election (epoch)
* vrfProof: `STRING` - the VRF proof
* vrfPublicKey: `STRING` - the VRF public key

```json
{
  "publicKey": "0x8abc04b696da9699601c595cf3a9539e657262d42eef6b63fb324bb5b987418bf5491b04ed21edce4296174cb6d95fcc",
  "targetTerm": "0x7",
  "vrfProof": "0x03c09bec671c32ca143f67f3f965cf913993a53cc268f12954649d54548afe70e75c87fda23fbd01cd9e4af184aa06af01adfa0fce92697e811635190935cecf48aca9804a12e604df6f19455d1ca59f4f",
  "vrfPublicKey": "0x03862bbe4b6591457ebf5d410ab12fe8e9bebe80171a8d2f73db45c5933a8173a4"
}
```

UpdateVotingPower:

* address: `HASH` - PoS account address
* votingPower: `QUANTITY` - the number of increased votes

```json
{
  "address": "0x52893f0ecd91f68b7db8a6eb04eb888b5ca1b208009eb9dfb434ad5da372f6f2",
  "votingPower": "0xb"
}
```

Retire:

* address: `HASH` - PoS account address
* votingPower: `QUANTITY` - the number of retired votes

```json
{
  "address": "c70a93136ddff3023c4c5244c2be9141d242cdcb11d7ed15c053728c959b87bc",
  "votingPower": "0xa"
}
```

PivotDecision:

* height: `QUANTITY` - the height of the pivot decision
* blockHash: `HASH` - the hash value of the pivot decision

```json
{
  "blockHash": "0x0abf7b384d8bb02a98f21d1582e6d465b1e2382978d5473cbceb473039b0eef3",
  "height": "0x2900"
}
```

Dispute:

* address: `HASH` - account address
* blsPublicKey: `STRING` - the BLS public key
* vrfPublicKey: `STRING` - the VRF public key
* conflictingVotes: `ConflictingVotes` - information of the conflicting votes

The structure of ConflictingVotes is shown as below:

* conflictVoteType: `STRING` - the type of the conflict vote. Possible values are `proposal`, `vote`
* first: `STRING` - the first vote
* second: `STRING` - the second vote


##### 示例

Request

```sh
curl --location --request POST 'http://localhost:12537' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "pos_getTransactionByNumber",
    "params": ["0x71"]
}'
```

Response

```json
{
    "jsonrpc": "2.0",
    "result": {
        "blockHash": "0x355497700fc4c530c4eefa47c90deb052baaba4950934dfa6143f3c7321f3df1",
        "blockNumber": "0x3a",
        "from": "0x6f2e774cb8b83957d29e6a0b06551c11e632e1a0f46bee0d82b2fdc2b82fe4f9",
        "hash": "0x5505191e2f783e141fb8c84193829e494a27f197840987821514a12a0e04a10c",
        "number": "0x71",
        "payload": {
            "blockHash": "0xd66e1d6050d7070cab189a524782381e211508fa204a0674ea35fa1523cfba90",
            "height": "0x129"
        },
        "status": "Executed",
        "timestamp": "0x5cd05bea6a9b0",
        "type": "PivotDecision"
    },
    "id": 1
}
```
