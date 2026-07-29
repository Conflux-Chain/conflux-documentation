---
sidebar_position: 5
title: "Advanced: Scalable Indexing with Envio"
description: Build a production-grade GraphQL indexer for Conflux eSpace using Envio HyperIndex
keywords:
  - Conflux eSpace
  - Indexer
  - Envio
  - HyperIndex
  - GraphQL
  - Hasura
  - TypeScript
  - 智能合约
  - Event Logging
  - Blockchain Data
  - RPC
  - Chain Reorganization
  - Factory Contracts
  - Uniswap V3
  - DEX
  - Scalability
  - 教程
  - GitHub Repository
displayed_sidebar: eSpaceSidebar
tags: [ Indexer, Envio, GraphQL, 教程 ]
---

# Advanced: Scalable Indexing with Envio

The [basic indexer tutorial](./indexer.md) shows how to read logs with a hand-written script and store them in a database. That approach is great for learning how event logs work, but it does not scale well to production:

- **You manage the sync loop yourself** — batching `eth_getLogs` calls, respecting RPC block-range limits, resuming after crashes, and tracking which blocks you have already processed.
- **No reorg handling** — if the chain reorganizes, your database silently keeps stale rows.
- **Manual ABI decoding** — every event needs hand-written, error-prone decoding code.
- **No query layer** — you still have to build and secure an API on top of your database.

[Envio HyperIndex](https://docs.envio.dev/docs/HyperIndex/overview) solves all of this. You declare your contracts and events in a config file, define your data model as a GraphQL schema, and write type-safe TypeScript handlers. Envio manages the sync engine, automatic ABI decoding, chain-reorg rollbacks, checkpointing, and serves your data through a ready-made GraphQL API (Hasura). It is the same developer model as The Graph's subgraphs, but with faster sync, plain TypeScript instead of AssemblyScript, and a much simpler local development loop.

## Reference project: the GinsengSwap indexer

This tutorial follows a real, production-grade indexer running on Conflux eSpace:

**[github.com/intrepidcanadian/indexer-example-conflux](https://github.com/intrepidcanadian/indexer-example-conflux)**

It indexes GinsengSwap — a Uniswap V3-style DEX on Conflux eSpace — covering:

- The **factory contract** and every pool it creates (dynamic contract registration)
- Pool events: `Initialize`, `Mint`, `Burn`, `Swap`, `Collect`
- **NFT position manager** events for per-position liquidity history
- An **ERC-4626 vault** (Ginseng Earn) with a full governance/audit event trail
- Derived analytics: USD pricing, TVL, volume, fees, and day/hour aggregates

Clone it to follow along:

```bash
git clone https://github.com/intrepidcanadian/indexer-example-conflux
cd indexer-example-conflux
```

## 前提条件

- [Node.js](https://nodejs.org/) v22 or newer
- [pnpm](https://pnpm.io/installation) (recommended)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (runs the local Postgres + Hasura stack)

## Starting a new indexer from scratch

For your own contracts, scaffold a project with:

```bash
pnpx envio init
```

Choose **Contract Import → Local ABI** and provide your contract's ABI JSON. (The block-explorer import flow does not list Conflux, so importing from an ABI file — or copying the structure of the reference project — is the way to go.)

An Envio project has three core pieces:

| File             | Purpose                                                                           |
| ---------------- | --------------------------------------------------------------------------------- |
| `config.yaml`    | Which chains, contracts, and events to index                                      |
| `schema.graphql` | The entities (tables) your handlers write and your app queries |
| `src/` handlers  | TypeScript that turns decoded events into entity updates                          |

## Configuring Conflux eSpace

Conflux eSpace is not yet on Envio's [HyperSync network list](https://docs.envio.dev/docs/HyperSync/hypersync-supported-networks), so the indexer uses [RPC as the data source](https://docs.envio.dev/docs/HyperIndex/rpc-sync) — Envio supports any EVM chain this way. The relevant part of the reference project's `config.yaml`:

```yaml
name: gswap_v3
rollback_on_reorg: true # roll back cleanly on chain reorganizations

contracts:
  - name: UniswapV3Factory
    events:
      - event: PoolCreated(address indexed token0, address indexed token1, uint24 indexed fee, int24 tickSpacing, address pool)
  - name: UniswapV3Pool
    events:
      - event: Initialize(uint160 sqrtPriceX96, int24 tick)
      - event: Mint(address sender, address indexed owner, int24 indexed tickLower, int24 indexed tickUpper, uint128 amount, uint256 amount0, uint256 amount1)
      - event: Burn(address indexed owner, int24 indexed tickLower, int24 indexed tickUpper, uint128 amount, uint256 amount0, uint256 amount1)
      - event: Swap(address indexed sender, address indexed recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)
        field_selection:
          transaction_fields: [hash, gasPrice, from]

chains:
  - id: 1030 # Conflux eSpace mainnet
    start_block: 119639200 # deployment block of the factory — don't sync from genesis
    rpc:
      url: ${ENVIO_CONFLUX_RPC_URL:-https://evm.confluxrpc.com}
      for: sync
    contracts:
      - name: UniswapV3Factory
        address: 0x62Aa0294cB42Aae39b7772313eAdfa5d489146eC
      - name: UniswapV3Pool # no address — pools are registered dynamically
```

Key points for Conflux:

- **`id: 1030`** is Conflux eSpace mainnet (use `71` for testnet).
- **`rpc` with `for: sync`** tells Envio to do historical sync over RPC. The public endpoint `https://evm.confluxrpc.com` (testnet: `https://evm-test.confluxrpc.com`) works; for a large historical backfill, a dedicated endpoint from an RPC provider will sync considerably faster and avoid public rate limits. You can tune batch sizes with the [advanced RPC parameters](https://docs.envio.dev/docs/HyperIndex/rpc-sync) (`initial_block_interval`, `interval_ceiling`, etc.) to match your provider's limits.
- **`${ENVIO_CONFLUX_RPC_URL:-...}`** uses Envio's [environment variable interpolation](https://docs.envio.dev/docs/HyperIndex/environment-variables) — the indexer defaults to the public endpoint, and anyone can point it at their own keyed RPC URL via `.env` without committing the key to source control.
- **`start_block`** should be your contract's deployment block, not 0.
- **`rollback_on_reorg: true`** keeps the database consistent through reorgs — one line replaces logic that is very hard to hand-write.
- **`field_selection`** adds transaction fields (hash, sender, gas price) to events where the handlers need them.

## Defining the schema

`schema.graphql` declares the entities the indexer maintains. Envio generates type-safe entity APIs from it. A trimmed sample from the reference project:

```graphql
type Pool {
  id: ID! # chainId-poolAddress
  token0: Token!
  token1: Token!
  feeTier: BigInt!
  liquidity: BigInt!
  volumeUSD: BigDecimal!
  totalValueLockedUSD: BigDecimal!
  txCount: BigInt!
}

type Swap {
  id: ID!
  pool: Pool!
  sender: String!
  recipient: String!
  amount0: BigDecimal!
  amount1: BigDecimal!
  amountUSD: BigDecimal!
  timestamp: BigInt!
  transactionHash: String!
}
```

Every entity becomes a queryable GraphQL type — no extra API code required.

## Writing event handlers

Handlers are plain TypeScript registered against a contract/event pair. Two patterns from the reference project are worth highlighting.

### Dynamic contract registration (factory pattern)

A DEX creates a new pool contract for every trading pair, so the pool addresses are unknown ahead of time. Envio's `contractRegister` hook lets the factory's `PoolCreated` event register each new pool for indexing — from that moment, all `UniswapV3Pool` events from that address flow into your handlers:

```typescript
// src/handlers/poolCreated.ts
import { indexer } from "envio";

indexer.contractRegister(
  { contract: "UniswapV3Factory", event: "PoolCreated" },
  async ({ event, context }) => {
    context.chain.UniswapV3Pool.add(event.params.pool);
  }
);
```

This replaces the fixed, single-address filter of the basic tutorial with automatic discovery of an unbounded set of contracts — a key scalability difference.

### Event handlers with typed params

Events arrive fully decoded and typed. A simplified version of the swap handler:

```typescript
// src/handlers/swap.ts
import { indexer } from "envio";

indexer.onEvent(
  { contract: "UniswapV3Pool", event: "Swap" },
  async ({ event, context }) => {
    const poolId = `${event.chainId}-${event.srcAddress.toLowerCase()}`;
    const pool = await context.Pool.get(poolId);
    if (!pool) return;

    context.Swap.set({
      id: `${event.transaction.hash}-${event.logIndex}`,
      pool_id: poolId,
      sender: event.params.sender,
      recipient: event.params.recipient,
      amount0: event.params.amount0,
      amount1: event.params.amount1,
      timestamp: event.block.timestamp,
      transactionHash: event.transaction.hash,
    });
  }
);
```

Compare this to the basic tutorial's manual topic slicing and `AbiCoder` calls — the decoding, batching, and persistence are all handled for you.

### Fetching contract state with the Effect API

Some data is not in events — token names, symbols, and decimals must be read from the contracts. The reference project uses Envio's [Effect API](https://docs.envio.dev/docs/HyperIndex/effect-api) (`src/handlers/utils/tokenMetadataEffect.ts`) to make cached, batched RPC calls from inside handlers, so each token's metadata is fetched exactly once no matter how many events reference it.

## Running locally

With Docker running:

```bash
pnpm install
pnpm codegen   # generate typed APIs from config.yaml + schema.graphql
pnpm dev
```

`pnpm dev` starts Postgres and Hasura in Docker, syncs from `start_block`, and opens the Hasura console (local password: `testing`). Handler files hot-reload as you edit them; changes to `config.yaml` or `schema.graphql` need a restart (`pnpm envio start -r`).

Your data is immediately queryable with GraphQL at `http://localhost:8080/v1/graphql`:

```graphql
query RecentSwaps {
  Swap(limit: 10, order_by: { timestamp: desc }) {
    pool { token0 { symbol } token1 { symbol } }
    amount0
    amount1
    amountUSD
    timestamp
    transactionHash
  }
}
```

## Deploying to production

- **[Envio Cloud](https://docs.envio.dev/docs/HyperIndex/hosted-service)** — push your repo, and Envio builds, hosts, and monitors the indexer with a git-based deploy workflow (free development tier available).
- **[Self-hosting](https://docs.envio.dev/docs/HyperIndex/self-hosting)** — run the same Docker + Postgres + Hasura stack on your own infrastructure.

## Using AI assistants with Envio

Envio's documentation is agent-friendly, which makes AI coding assistants very effective at writing and debugging indexers:

- **Docs index for LLMs:** [https://docs.envio.dev/llms.txt](https://docs.envio.dev/llms.txt)

- **MCP server** (for Claude Code, Cursor, and other MCP-compatible clients):

  ```bash
  claude mcp add --transport http envio-docs https://docs.envio.dev/mcp
  ```

  The server exposes `docs_search` (full-text search) and `docs_fetch` (fetch a page as Markdown).

- **Envio CLI** (v3.1+) offers the same tools without any MCP setup: `envio tools search-docs <query>` and `envio tools fetch-docs <url>`.

## 了解更多

- [Conflux indexer example source](https://github.com/intrepidcanadian/indexer-example-conflux) — the complete reference project
- [HyperIndex configuration reference](https://docs.envio.dev/docs/HyperIndex/configuration-file)
- [Dynamic contracts / factories](https://docs.envio.dev/docs/HyperIndex/dynamic-contracts)
- [Testing handlers without syncing](https://docs.envio.dev/docs/HyperIndex/testing)
- [Performance optimization](https://docs.envio.dev/docs/HyperIndex/performance)
