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
  - Smart Contracts
  - Solidity
  - Price Feed ID
  - CFX Price
  - Mainnet
  - Testnet
  - Contract Addresses
displayed_sidebar: eSpaceSidebar
tags: [Oracles, Pyth, Migration]
---

# Conflux Price Oracle (Pyth-Compatible)

:::danger Pyth Network sunset — July 31, 2026
Pyth Network has announced it is **shutting down Conflux eSpace support on July 31, 2026**. Contracts that read prices from the Pyth contract on eSpace will stop receiving updates after that date.

A **Conflux-maintained, Pyth-compatible price oracle** is deployed as a drop-in read-side replacement. Existing integrators can migrate by pointing at a new contract address — the read functions and price feed IDs are unchanged for the major assets.
:::

The replacement oracle is an on-chain price feed service maintained for the Conflux community, with source code at [conflux-fans/oracle-contracts](https://github.com/conflux-fans/oracle-contracts). Its read API is fully compatible with the [Pyth SDK Solidity interface](https://github.com/pyth-network/pyth-sdk-solidity) (`getPriceUnsafe`, `getPriceNoOlderThan`, `getEmaPriceUnsafe`, `getEmaPriceNoOlderThan`), returning the same `PythStructs.Price` type.

## Contract addresses

| Network | Address |
| --- | --- |
| Conflux eSpace Mainnet (chain id 1030) | `0x5286BD91e2C79fE066926a15193C7e531bBF6750` |
| Conflux eSpace Testnet (chain id 71) | `0x838c40B3904FAfBc21b670c97b0dFeE7D8D0a016` |

These are the proxy addresses — the oracle uses a UUPS upgradeable proxy, so the address stays stable across logic upgrades. Always integrate against the proxy.

## Supported price feeds

All feeds use `expo = -8` (consistent with Pyth crypto feeds): real price = `price × 10⁻⁸`.

| Asset | Price Feed ID (bytes32) | Update Frequency |
| --- | --- | --- |
| BTC/USD | `0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43` | 1h |
| ETH/USD | `0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace` | 1h |
| USDT/USD | `0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b` | 1h |
| USDC/USD | `0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a` | 1h |
| CFX/USD | `0x8879170230c9603342f3837cf9a8e76c61791198fb1271bb2552c9af7b33c933` | 1h |
| BNB/USD | `0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f` | 1h |
| AxCNH/USD | `0x6412f0e5469e5ab64fccf0eea916ae6db2bcd56568daaaf583b3054d465e8e2d` | 1h |

Notes:

- The BTC, ETH, USDT, USDC, CFX, and BNB feed IDs are **the same IDs Pyth uses**, so consumers of those feeds do not need to change their stored feed IDs.
- USDT0 uses the same feed ID as USDT (prices are identical per spec).
- AxCNH/USD is a new feed, with its ID derived from `keccak256("ConfluxOracle.AxCNH/USD")`.
- EMA read functions exist for compatibility, but **EMA values are not currently updated** — use the spot price functions.

## Migrating from Pyth

The oracle is push-based: authorized updaters publish prices on a roughly hourly schedule. This changes the integration in two ways compared to Pyth's pull model:

1. **Point your consumer contract at the new oracle address** (table above) instead of the Pyth contract address.
2. **Remove the Hermes/update flow.** There is no `updatePriceFeeds(bytes[])` call to make and no update fee to pay — you only read. Any code that fetched update data from Hermes and attached a fee can be deleted.

Since prices update about once per hour, pass an appropriate staleness bound when reading. For example, accepting prices up to 24 hours old:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IPyth} from "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import {PythStructs} from "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract CfxPriceConsumer {
    IPyth public immutable oracle;
    bytes32 public constant CFX_USD =
        0x8879170230c9603342f3837cf9a8e76c61791198fb1271bb2552c9af7b33c933;

    constructor(address oracleAddress) {
        oracle = IPyth(oracleAddress);
    }

    /// @notice Returns the CFX/USD price with expo -8 (price × 10⁻⁸ = USD).
    function getCfxPrice() external view returns (PythStructs.Price memory) {
        // Reverts if the stored price is older than 24 hours.
        return oracle.getPriceNoOlderThan(CFX_USD, 86400);
    }
}
```

You can verify the oracle is live from the command line:

```bash
cast call 0x5286BD91e2C79fE066926a15193C7e531bBF6750 \
  "getPriceUnsafe(bytes32)((int64,uint64,int32,uint256))" \
  0x8879170230c9603342f3837cf9a8e76c61791198fb1271bb2552c9af7b33c933 \
  --rpc-url https://evm.confluxrpc.com
```

## Trust and limitations

Understand the differences from Pyth before relying on the oracle in production:

- **Update cadence is ~1 hour.** This is suitable for slow-moving use cases (collateral valuation with conservative parameters, accounting, display), but not for latency-sensitive applications like liquidation engines tuned to minutes or perps pricing.
- **Push-based with role-based access control.** Prices are published by accounts holding `UPDATER_ROLE`, and the contract is upgradeable by its admin — a different trust model from Pyth's decentralized publisher network. Review the [contract source](https://github.com/conflux-fans/oracle-contracts) and its role holders as part of your own due diligence.
- Maximum result staleness is controlled by the contract's valid time period and the age bound you pass to `getPriceNoOlderThan`.

## Further reading

- [conflux-fans/oracle-contracts](https://github.com/conflux-fans/oracle-contracts) — source, deployment scripts, and integration examples
- [Pyth tutorial](./Pyth/priceFeed.md) — the original Pyth integration tutorial (applicable until the sunset date)
