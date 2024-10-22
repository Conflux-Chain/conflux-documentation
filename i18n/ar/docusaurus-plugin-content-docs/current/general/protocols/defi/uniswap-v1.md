---
displayed_sidebar: generalSidebar
sidebar_position: 1
keywords:
  - Uniswap V1
  - DeFi
  - decentralized trading protocol
tags:
  - Protocols
---

# Uniswap V1

## Introduction

Uniswap V1 is a decentralized trading protocol on the Ethereum blockchain, enabling token exchanges without intermediaries through an automated market maker (AMM) model. Launched in November 2018 at Devcon 4, it will persist as long as Ethereum exists due to its permissionless nature.

The protocol is designed for simplicity, providing a seamless interface for exchanging ERC20 tokens on Ethereum. By eliminating rent extraction and middlemen, it allows for faster and more efficient exchanges, prioritizing decentralization, censorship resistance, and security.

Uniswap is open source and functions as a public good, with no central token or platform fee. There is no special treatment for early investors, adopters, or developers. Token listing is open and free, and all smart contract functions are public with opt-in upgrades.

## V1 Features

- **Decentralized**: Uniswap V1 operates without a central authority, ensuring full decentralization.
- **Automated Market Maker**: The protocol uses the [constant product formula (x \* y = k)](https://github.com/runtimeverification/verified-smart-contracts/blob/uniswap/uniswap/x-y-k.pdf) to set prices.
- **Liquidity Pools**: Users can contribute tokens to liquidity pools and earn fees from trades.
- **Support for Any ERC20 Token**: The Uniswap factory contract can support any ERC20 token.
- **Join Liquidity Pools**: Users can participate in liquidity pools to earn fees on ETH-ERC20 pairs.
- **Liquidity-Sensitive Automated Pricing**: Pricing is automatically adjusted using the constant product formula.
- **Trade ETH Directly**: Users can trade any ERC20 token directly with ETH without needing to wrap it.
- **Support for Private and Custom Uniswap Exchanges**: Users can create their own private or custom Uniswap exchanges.
- **Partially Verified Smart Contracts**: The smart contracts are written in Vyper and have partial verification.
- **Funded by the Ethereum Foundation**: The project is supported by funding from the Ethereum Foundation.

## How It Works

Uniswap operates through a series of ETH-ERC20 exchange contracts. Each ERC20 token has its own exchange contract. If a token doesn't have an exchange yet, anyone can create one using the Uniswap factory contract, which acts as a public registry for all token and exchange addresses.

Each ERC20 token has a single exchange contract registered to the Uniswap factory to pool liquidity into one reserve. This exchange contract holds reserves of both ETH and the corresponding ERC20 token. Anyone can become a liquidity provider by depositing equal values of ETH and the ERC20 token into the exchange. The pooled liquidity is tracked using "pool tokens" (ERC20), which represent each provider's share. These pool tokens can be burned to withdraw a proportional share of the reserves.

Exchange contracts function as automated market makers for ETH-ERC20 pairs. Traders can swap between the two by adding to one reserve and withdrawing from the other. Since ETH is a common pair, it can facilitate direct ERC20-ERC20 trades in a single transaction. Users can also specify a different recipient address for the purchased tokens.

Uniswap uses a "constant product" formula to set exchange rates based on the sizes of the ETH and ERC20 reserves. Selling ETH for ERC20 tokens increases the ETH reserve and decreases the ERC20 reserve, raising the ERC20 token's price relative to ETH. Larger trades cause more price slippage. This formula leverages the open market to determine relative values.

A 0.30% fee is taken from each trade and added to the reserves, increasing the total reserve size over time. This fee is collected by liquidity providers when they burn their pool tokens. Arbitrage opportunities from price changes drive transactions and generate fee revenue.

Since Uniswap is on-chain, prices can change between transaction signing and block inclusion. Traders can limit price fluctuations by setting minimum buy amounts or maximum sell amounts, acting as limit orders that cancel if not filled. Transaction deadlines can also be set to cancel orders if not executed quickly.

## Advantages and Limitations

### Advantages

- **Trustless**: Users can trade without trusting any intermediaries.
- **Open**: Anyone can create new trading pairs and provide liquidity.
- **Transparent**: All transactions and liquidity information are publicly visible.
- **Low Barrier to Entry**: Users can join or exit liquidity pools at any time without complex procedures.

### Limitations

- **Slippage**: Large trades can cause significant price slippage.
- **Liquidity Risk**: Liquidity providers may face impermanent loss.
- **Limited Features**: Compared to later versions, Uniswap V1 has limited features, such as no direct ERC-20 to ERC-20 trading support.

## Development History

Uniswap V1 was launched in November 2018 as the first version of the Uniswap protocol. Its success laid the foundation for subsequent versions. As the DeFi ecosystem continues to evolve, Uniswap has iterated and released V2 and V3 versions, offering more features and improvements.

## Related Links

- [Uniswap GitHub Repository](https://github.com/Uniswap/uniswap-v1)
- [Uniswap Official Website](https://uniswap.org/)
- [Uniswap V1 Whitepaper](https://hackmd.io/@HaydenAdams/HJ9jLsfTz?type=view)
- [Uniswap V1 Overview](https://docs.uniswap.org/contracts/v1/overview)
- [Automated Market Making: Theory and Practice](http://reports-archive.adm.cs.cmu.edu/anon/2012/CMU-CS-12-123.pdf)

## Conclusion

Uniswap V1 is an important innovation in the decentralized finance (DeFi) space. Despite its limitations, it lays the foundation for decentralized trading. Through its automated market maker model and decentralized design, Uniswap V1 demonstrates the potential and advantages of decentralized trading.
