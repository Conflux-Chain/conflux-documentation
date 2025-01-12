---
id: pos_rpc
sidebar_position: 3
title: pos 命名空间
description: The `pos` namespace includes RPCs related to PoS consensus.
keywords:
  - pos-rpc
  - proof-of-stake
  - consensus
  - committee
  - epoch
  - block
  - 交易
  - rewards
  - voting power
  - PoS chain
  - finality
  - pivot decision
  - account status
  - committee election
tags:
  - PoS 共识机制
  - JSON-RPC
displayed_sidebar: coreSidebar
---

`conflux-rust`从版本2.0.0开始引入了权益证明（PoS）最终性，以加速区块的最终性并防止51%攻击。 PoS finality将引入一个独立的PoS链用于PoS共识和确认PoW块的最终性。 对应地，PoS也有自己的RPC方法，用于从PoS链中获取数据。

目前，只有conflux-rust的存档节点可以向公众提供PoS RPC服务。 `public_rpc_apis` needs to be configured to open RPC.

您可以将`pos`组添加到当前RPC方法组中。

```js
public_rpc_apis = "safe,pos"
```

又或者，你可以将`public_rpc_apis`设置为`all`以打开所有RPC方法。

```js
public_rpc_apis = "all"
```

## 基本概念

### epoch

纪元（Epoch）是 PoS 中也使用的概念。 However, different from the epoch in PoW, an epoch in PoS represents the term of a committee, starting from term `1`. 每个纪元的平均时长为`半小时`。 每个 epoch 结束后，委员会的一部分成员会被替换。 The rewards for participating in PoS consensus are also given on an epoch basis.

### round

A PoS chain will on average perform one round of consensus `30 seconds` (i.e. try to generate a PoS block). 这意味着每个epoch将有` 60 `个回合，每次`新的epoch`开始后，回合编号会重新从` 1 `开始计数。

注意：并不是每个回合都会生成一个块。 there may be network or consensus failures preventing a block from generating.

### block.number

区块的block.number是指该区块的`高度`，每生成一个新的区块，该值就会加一。

After a PoS block is proposed by a committee member, it will be sent to the network for voting. 当该区块收集到足够的投票时，它被标记为` voted `（已投票）。 However, the block has yet been committed. When three consecutive blocks are created, the block corresponding to the first round will be submitted. 然后，它的状态将从`voted`更改为`committed`。

### pivotDecision

pivotDecision is the PoS chain's final decision on a block in the PoW chain. Once a block in the PoW is referenced by the PoS, the PoW block is finalized and there will be no further reversion. PoS链中的区块将包括PivotDecision属性，表明该PoS区块已经对PoW链中的一个区块进行了最终确认。 The pivotDecision is the block number or hash value of a block in the PoW chain.

### PoS Address

不同于 PoW 地址的格式，PoS 账户地址是一个 256 位的哈希值，例如：

`0x046ca462890f25ed9394ca9f92c979ff48e1738a81822ecab96d83813c1a433c`

## PoS Model

### 账户状态

当账户注册参与PoS共识或增加质押投票后，这些投票将首先进入 `inQueue` 状态，并在`13天`后`锁定`。 当用户执行解锁命令时，要解锁的票数将首先进入 `outQueue` 状态。 Then it takes `1 day` to become `unlocked`.


* `availableVotes`: `QUANTITY` - 当前账户可用的票数。 等于 `sum inQueue` + `locked` 的总和
* `forfeited`: `QUANTITY` - the number of votes that are locked and cannot be retrieved if the account is identified as malicious.
* `forceRetired`: [`QUANTITY`] - 票数被取消的区块号
* `inQueue`: `Array` of [VotesInQueue](#votesinqueue) - the number of votes that are currently waiting to be locked
* `locked`: `QUANTITY` - the number of votes that are currently locked
* `outQueue`: `Array` of [VotesInQueue](#votesinqueue) - the number of votes that are currently waiting to be unlocked
* `unlocked`: `QUANTITY` - the number of users total unlocked votes in history

### Decision

The PoS chain's decision on the height of the PoW chain. The block of the PoW that is decided by the PoS chain is the Finalized block.

* `height`: `QUANTITY` - PoW 区块的高度
* `blockHash`: `HASH` - PoW 区块的哈希值

#### VotesInQueue

The information regarding a user's in-queue votes.

* `endBlockNumber`: `QUANTITY` - block number when the state ends
* `power`: `QUANTITY` - 当前状态中的投票数

## RPCs

### pos_getStatus

返回 PoS 链的当前状态。

#### 参数

`Empty`

#### 返回值

`Object` - PoS 状态对象。

* `epoch`: `QUANTITY` - PoS 链的当前纪元编号。
* `latestCommitted`: `QUANTITY` - 最新提交区块的编号。 提交的区块不会被回滚
* `latestVoted`: [`QUANTITY`] - The number of the latest successfully voted block, or `null` (if there are no blocks completed voting).
* `pivotDecision`: [`Decision`](#decision) - The PoS chain's finalized decision about the latest PoW pivot block.

#### 示例

请求

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

获取 PoS 账户信息

#### 参数

1. `ADDRESS`: 32 Bytes - PoS 账户地址
2. [`QUANTITY`]: block number, optional for querying the status of the account at a certain block height

```json
params: [
  "0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
  "0x100"
]
```

#### 返回值

`Object` - 账户对象，如果对应地址的账户不存在则为 `null`

* `address`: `ADDRESS` - 账户地址
* `blockNumber`: `QUANTITY` - 对应状态的区块编号
* `status`: `OBJECT` - 用户当前状态，请参阅[账户状态](#accountstatus)获取更多信息

#### 示例

请求

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

响应

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

1. [`QUANTITY`]:  区块编号，可选，用于查询特定区块高度处的委员会信息

#### 返回值

* `currentCommittee`: `OBJECT` -  current committee members, see [CurrentCommittee](#currentcommittee) for more information
* `elections`: `Array` - nodes who are running for election

##### CurrentCommittee

当前委员会信息

* `epochNumber`: `QUANTITY` - 委员会任期的纪元编号
* `nodes`: `Array` of [CommitteNode](#committenode) - 委员会成员列表
* `quorumVotingPower`: `QUANTITY` - 达成共识所需的最低票数
* `totalVotingPower`: `QUANTITY` - the total number of votes of the current committee members

##### CommitteNode

委员会成员信息

* `address`: `ADDRESS` - 账户地址
* `votingPower`: `QUANTITY` - 票数

##### Election

* `isFinalized`: `BOOLEAN` - whether the election is finalized or not
* `startBlockNumber`: `QUANTITY` - the starting block number
* `topElectingNodes`: `Array` of [CommitteNode](#committenode) - the top ranked 50 nodes after election

#### 示例

请求

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

响应

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

通过其哈希值获取区块信息

#### 参数

1. `HASH`: 区块的哈希值

```json
params: [
  "0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"
]
```

#### 返回值

* `epoch`: `QUANTITY` - 区块所在的纪元
* `hash`: `HASH` - 区块的哈希值
* `height`: `QUANTITY` - 区块高度
* `miner`: [`ADDRESS`] - 区块创建者，可以为 `null`
* `lastTxNumber`: `QUANTITY` - 当前区块的最后交易编号
* `parentHash`: `HASH` - 父区块的哈希值
* `pivotDecision`: [`Decision`](#decision) - 对 PoW 链的决策
* `round`: `QUANTITY` - 当前轮次
* `signatures`: `Array` of [Signature](#signature) - 区块的签名信息
* `timestamp`: `QUANTITY` - 区块的时间戳

##### Signature

签名信息

* `account`: `ADDRESS` - 签名的账户地址
* `votes`: `QUANTITY` - 签名账户的票数

#### 示例

请求

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

响应

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

与 [pos_getBlockByHash](#pos_getblockbyhash) 相同

#### 示例

请求

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

* `accountRewards`: `Array`，其中包含 [AccountReward](#accountreward) 的信息
* `powEpochHash`: `HASH` - 在奖励产生时的 PoW 区块的哈希值

##### 账户奖励

* `posAddress`: `ADDRESS` - PoS 账户地址
* `powAddress`: `BASE32` - PoW 账户地址
* `reward`: `QUANTITY` - 奖励数量，以 Drip 为单位

##### 示例

请求

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

响应

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

1. `QUANTITY`: 交易编号

```json
params: [
  "0x4a"
]
```

#### 返回值

交易详情

* `hash`: `HASH` - 交易的哈希值
* `from`: `ADDRESS` - 发送者的地址
* `number`: `QUANTITY` - 交易编号
* `blockHash`: [`HASH`] - 该交易所属区块的哈希值
* `blockNumber`: [`QUANTITY`] - the block number of the block that the transaction belongs to
* `payload`: [`OBJECT`] - 交易信息。 The content of the payload differs with different transaction types.
* `status`: [`ENUM`] - 交易的状态。 Possible values are `Executed`, `Failed`, `Discard`
* `timestamp`: [`QUANTITY`] - 交易的时间戳
* `type`: `ENUM` 交易的类型。 可能的值有 `BlockMetadata（区块元数据）`、`Election（选举）`、`Retire（退出）`、`Register（注册）`、`UpdateVotingPower（更新投票权）`、`PivotDecision（主轴决策）`、`Dispute（争议）`、`Other（其他）`

There are six types of payload（the payload of BlockMetadata transactions is null）:

Register:

* vrfPublicKey: `STRING` - VRF公钥
* publicKey: `STRING` - 公钥

```json
{
  "publicKey": "0x90901cc921cd86c6a67bdb7652a3dc4e03e069c6ef6d8294eb4e856e396bb10e2191996a914eaaa9dfdaa75f2a3d70a3",
  "vrfPublicKey": "0x02a0c4e36a2e9a3a2804486b7c849d0eb6f30094e3fe91a9015e9c16f9279fbff8"
}
```

Election:

* publicKey: `STRING` - 公钥
* targetTerm: `QUANTITY` - the committee number under election (epoch)
* vrfProof: `STRING` - VRF证明
* vrfPublicKey: `STRING` - VRF公钥

```json
{
  "publicKey": "0x8abc04b696da9699601c595cf3a9539e657262d42eef6b63fb324bb5b987418bf5491b04ed21edce4296174cb6d95fcc",
  "targetTerm": "0x7",
  "vrfProof": "0x03c09bec671c32ca143f67f3f965cf913993a53cc268f12954649d54548afe70e75c87fda23fbd01cd9e4af184aa06af01adfa0fce92697e811635190935cecf48aca9804a12e604df6f19455d1ca59f4f",
  "vrfPublicKey": "0x03862bbe4b6591457ebf5d410ab12fe8e9bebe80171a8d2f73db45c5933a8173a4"
}
```

UpdateVotingPower:

* address: `HASH` - PoS账户地址
* votingPower: `QUANTITY` - the number of increased votes

```json
{
  "address": "0x52893f0ecd91f68b7db8a6eb04eb888b5ca1b208009eb9dfb434ad5da372f6f2",
  "votingPower": "0xb"
}
```

Retire:

* address: `HASH` - PoS账户地址
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
* vrfPublicKey: `STRING` - VRF公钥
* conflictingVotes: `ConflictingVotes` - information of the conflicting votes

The structure of ConflictingVotes is shown as below:

* conflictVoteType: `STRING` - the type of the conflict vote. Possible values are `proposal`, `vote`
* first: `STRING` - the first vote
* second: `STRING` - the second vote


##### 示例

请求

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

响应

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
