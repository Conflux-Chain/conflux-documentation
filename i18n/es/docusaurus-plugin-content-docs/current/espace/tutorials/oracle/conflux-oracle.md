---
sidebar_position: 2
title: Conflux Price Oracle (Pyth-Compatible)
description: Migrate from Pyth Network to the Conflux-maintained price oracle before the July 31, 2026 sunset
keywords:
  - Conflux eSpace
  - Oracle
  - Price Feed
  - Pyth Network
  - Pyth sunset
  - Migration
  - Contratos Inteligentes
  - Solidity
  - Price Feed ID
  - CFX Price
  - Mainnet
  - Testnet
  - Contract Addresses
displayed_sidebar: eSpaceSidebar
tags: [ Oracles, Pyth, Migration ]
---

# Conflux Price Oracle (Pyth-Compatible)

:::danger Pyth Network sunset — July 31, 2026
Pyth Network has announced it is **shutting down Conflux eSpace support on July 31, 2026**. Contracts that read prices from the Pyth contract on eSpace will stop receiving updates after that date.

A **Conflux-maintained, Pyth-compatible price oracle** is deployed as a drop-in read-side replacement. Existing integrators can migrate by pointing at a new contract address — the read functions and price feed IDs are unchanged for the major assets.
:::

The replacement oracle is an on-chain price feed service maintained for the Conflux community, with source code at [conflux-fans/oracle-contracts](https://github.com/conflux-fans/oracle-contracts). Its spot price read API is compatible with the [Pyth SDK Solidity interface](https://github.com/pyth-network/pyth-sdk-solidity) (`getPriceUnsafe`, `getPriceNoOlderThan`), returning the same `PythStructs.Price` type. The EMA price functions are **not supported** — see [EMA prices are not available](#ema-prices-are-not-available).

## Contract addresses

| Network                                                   | Address                                      |
| --------------------------------------------------------- | -------------------------------------------- |
| Conflux eSpace Mainnet (chain id 1030) | `0x5286BD91e2C79fE066926a15193C7e531bBF6750` |
| Conflux eSpace Testnet (chain id 71)   | `0x838c40B3904FAfBc21b670c97b0dFeE7D8D0a016` |

These are the proxy addresses — the oracle uses a UUPS upgradeable proxy, so the address stays stable across logic upgrades. Always integrate against the proxy.

## Supported price feeds

All feeds use `expo = -8` (consistent with Pyth crypto feeds): real price = `price × 10⁻⁸`.

| Asset     | Price Feed ID (bytes32)                           | Update Frequency |
| --------- | -------------------------------------------------------------------- | ---------------- |
| BTC/USD   | `0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43` | 1h               |
| ETH/USD   | `0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace` | 1h               |
| USDT/USD  | `0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b` | 1h               |
| USDC/USD  | `0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a` | 1h               |
| CFX/USD   | `0x8879170230c9603342f3837cf9a8e76c61791198fb1271bb2552c9af7b33c933` | 1h               |
| BNB/USD   | `0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f` | 1h               |
| AxCNH/USD | `0x6412f0e5469e5ab64fccf0eea916ae6db2bcd56568daaaf583b3054d465e8e2d` | 1h               |

Notes:

- The BTC, ETH, USDT, USDC, CFX, and BNB feed IDs are **the same IDs Pyth uses**, so consumers of those feeds do not need to change their stored feed IDs.
- **There is no separate USDT0 feed.** USDT0 is the [LayerZero OFT form of USDT](https://docs.usdt0.to/), backed 1:1 by USDT locked on Ethereum and operated by Everdawn Labs under licence from Tether, so its price depends on that bridging layer in addition to USDT itself. Consumers that want a USDT0 price from this oracle read the USDT feed.
- AxCNH/USD is a new feed, with its ID derived from `keccak256("ConfluxOracle.AxCNH/USD")`.

## EMA prices are not available

The oracle does not provide EMA (exponentially-weighted moving average) prices. Use the spot price functions — `getPriceUnsafe` and `getPriceNoOlderThan` — for all reads.

:::warning Mainnet and testnet behave differently
On **mainnet**, `getEmaPriceUnsafe`, `getEmaPriceNoOlderThan`, and the deprecated `getEmaPrice` all revert with `EmaPrice not supported`, for every feed.

On **testnet**, these calls currently do _not_ revert — they return the spot price. Do not treat that as EMA data, and do not rely on it: code that reads EMA prices will appear to work on testnet and then revert on mainnet.
:::

If you are migrating a contract that reads `getEmaPrice*` from Pyth, switch those call sites to the spot price functions before pointing at this oracle.

## Migrating from Pyth

The oracle is push-based: authorized updaters publish prices on a roughly hourly schedule. This changes the integration in two ways compared to Pyth's pull model:

1. **Point your consumer contract at the new oracle address** (table above) instead of the Pyth contract address.
2. **Remove the Hermes/update flow.** `updatePriceFeeds(bytes[])`, `updatePriceFeedsIfNecessary(...)`, and `getUpdateFee(bytes[])` are **not implemented on this contract at all** — there is no update fee and nothing to submit. Leftover calls to them will not silently no-op; they hit the fallback and revert. Delete any code that fetched update data from Hermes and attached a fee.

Reads take a staleness bound: `getPriceNoOlderThan` reverts with `StalePrice()` when the stored price is older than the bound you pass. Since prices are published about once per hour, a stored price is continuously ageing towards that interval between updates.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IPyth} from "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import {PythStructs} from "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract CfxPriceConsumer {
    IPyth public immutable oracle;
    /// @notice Staleness bound in seconds, chosen by the integrator.
    uint public immutable maxPriceAge;
    bytes32 public constant CFX_USD =
        0x8879170230c9603342f3837cf9a8e76c61791198fb1271bb2552c9af7b33c933;

    constructor(address oracleAddress, uint maxPriceAge_) {
        oracle = IPyth(oracleAddress);
        maxPriceAge = maxPriceAge_;
    }

    /// @notice Returns the CFX/USD price with expo -8 (price × 10⁻⁸ = USD).
    function getCfxPrice() external view returns (PythStructs.Price memory) {
        // Reverts with StalePrice() if the stored price is older than maxPriceAge.
        return oracle.getPriceNoOlderThan(CFX_USD, maxPriceAge);
    }
}
```

:::caution Do not use the deprecated `getPrice(bytes32)`
`getPrice(id)` is exactly `getPriceNoOlderThan(id, getValidTimePeriod())` — it is the same code path, with the contract's own validity window supplied as the bound. That window is currently **3600 seconds**, the same ~1 hour cadence on which prices are published, so any delay in an update pushes the stored price past it and the call reverts with `StalePrice()` (`0x19abf40e`).

Because it is the same code path, passing `3600` to `getPriceNoOlderThan` reproduces the identical behaviour. What makes `getPriceNoOlderThan` usable is choosing a bound with headroom over the publish interval, not the function itself.
:::

You can verify the oracle is live from the command line:

```bash
cast call 0x5286BD91e2C79fE066926a15193C7e531bBF6750 \
  "getPriceUnsafe(bytes32)((int64,uint64,int32,uint256))" \
  0x8879170230c9603342f3837cf9a8e76c61791198fb1271bb2552c9af7b33c933 \
  --rpc-url https://evm.confluxrpc.com
```

## Trust and limitations

Understand the differences from Pyth before relying on the oracle in production:

- **Update cadence is ~1 hour.** Prices can therefore be up to roughly an hour behind spot at any given moment.
- **Push-based with role-based access control.** Prices are published by accounts holding `UPDATER_ROLE`, and the contract is upgradeable by its admin — a different trust model from Pyth's decentralized publisher network. Review the [contract source](https://github.com/conflux-fans/oracle-contracts) and its role holders as part of your own due diligence.
- **Reads revert rather than returning sentinel values.** An unknown feed ID reverts with `PriceFeedNotFound()` (`0x14aebe68`); a price older than the bound passed to `getPriceNoOlderThan` reverts with `StalePrice()` (`0x19abf40e`). Neither returns a zero or a flag, so a failed read propagates as a transaction failure unless the caller explicitly catches it.
- **`getPriceUnsafe` performs no staleness check.** It returns the stored price at any age, and reverts only when a feed has never been published. If the updater stops — key rotation, infrastructure outage, funding lapse — consumers keep reading the last published price indefinitely, with no revert and no on-chain signal. The returned `publishTime` is the only indication of age. `getPriceNoOlderThan` applies an age bound you supply and reverts with `StalePrice()` when exceeded.
- **`getValidTimePeriod()` constrains only the deprecated `getPrice` / `getEmaPrice`.** For `getPriceNoOlderThan`, the bound you pass is the only value consulted — the contract's validity window plays no part.

## Further reading

- [conflux-fans/oracle-contracts](https://github.com/conflux-fans/oracle-contracts) — source, deployment scripts, and integration examples
- [Pyth tutorial](./Pyth/priceFeed.md) — the original Pyth integration tutorial (applicable until the sunset date)
