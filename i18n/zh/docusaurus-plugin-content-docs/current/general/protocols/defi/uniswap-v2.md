---
displayed_sidebar: generalSidebar
sidebar_position: 2
---

# Uniswap V2

## 简介

Uniswap V2, launched in May 2020, is the second iteration of the Uniswap protocol, a decentralized trading platform on the Ethereum blockchain. Building upon the success of Uniswap V1, V2 introduces significant improvements and new features, enhancing the capabilities of the automated market maker (AMM) model.

## Key Features and Improvements

### 1. ERC20 / ERC20 Pairs

Unlike V1, which only supported ETH-ERC20 pairs, Uniswap V2 allows direct trading between any ERC20 tokens. This feature eliminates the need to route through ETH for every trade, potentially reducing fees and slippage for users.

### 2. Price Oracles

Uniswap V2 implements a new price oracle functionality that enables highly decentralized and manipulation-resistant on-chain price feeds. This is achieved by measuring prices when they are expensive to manipulate and accumulating historical data.

### 3. Flash Swaps

V2 introduces flash swaps, allowing users to withdraw ERC20 tokens from a Uniswap pool at no upfront cost. Users can execute arbitrary logic with these tokens and either pay for them or return them within the same transaction.

### 4. Core/Helper Architecture

Uniswap V2 adopts a more modular architecture, separating [core contracts](#core-contracts) from [peripheral helper contracts](#periphery-contracts). This design improves flexibility and upgradability without compromising the security of pooled funds.

### 5. Technical Improvements

Several technical enhancements have been made, including:

- Smart contracts written in Solidity instead of Vyper
- Use of CREATE2 for deterministic pair addresses
- Improved handling of "missing return" ERC20 tokens
- Enhanced re-entrancy protection
- More descriptive error messages

## How Uniswap V2 Works

Uniswap V2 continues to use the constant product formula (x \* y = k) as its automated market maker model. Each pair contract manages a liquidity pool of two ERC20 tokens.

1. **Liquidity Provision**: Users can become liquidity providers by depositing an equivalent value of both tokens in a pair. In return, they receive liquidity tokens representing their share of the pool.

2. **Trading**: Traders can swap one token for another as long as the constant product formula is maintained. A 0.30% fee is applied to each trade, which is added to the reserves.

3. **Price Determination**: The relative price of the two tokens in a pair is determined by the ratio of their reserves. This price automatically adjusts with each trade to maintain the constant product.

4. **Arbitrage**: Price discrepancies between Uniswap and external markets create arbitrage opportunities, helping to keep Uniswap prices aligned with the broader market.

## Architecture of Uniswap V2

Uniswap V2's architecture is built around the concept of pooling, where liquidity providers stake their assets in a contract, enabling decentralized trading. The core architectural components are:

### Core Contracts

1. **UniswapV2Pair**: The main contract responsible for the core logic. It accepts tokens from users and uses accumulated reserves to perform swaps. Each pair contract pools only one pair of tokens.

2. **UniswapV2Factory**: A factory contract that creates pair contracts and serves as a registry. It uses `create2` to generate deterministic pair addresses.

3. **UniswapV2ERC20**: An extended ERC20 implementation used for LP-tokens, incorporating EIP-2612 for off-chain approval of transfers.

For more details, refer to the [Uniswap V2 Core](https://github.com/Uniswap/uniswap-v2-core).

### Periphery Contracts

1. **UniswapV2Router**: The main entry point for the Uniswap UI and other applications. It provides an interface similar to the exchange contract in Uniswap V1.

2. **UniswapV2Library**: A collection of helper functions implementing important calculations.

For more details, refer to the [Uniswap V2 Periphery](https://github.com/Uniswap/uniswap-v2-periphery).

### Repository Structure

The codebase is split into two main repositories:

1. **Core**: Contains the essential contracts (UniswapV2ERC20, UniswapV2Factory, UniswapV2Pair).
2. **Periphery**: Houses contracts that facilitate easier interaction with Uniswap, including UniswapV2Router and UniswapV2Library.

This separation allows for a more modular and secure architecture. The core contracts provide low-level functionality, reducing attack surfaces, while the periphery contracts offer more user-friendly interfaces and additional features.

### Key Architectural Features

- **Pooling Mechanism**: Liquidity providers stake their assets, enabling decentralized trading.
- **Pair Contracts**: Each pair of tokens has a unique contract to prevent liquidity dilution.
- **Deterministic Addresses**: Use of `create2` for predictable pair contract addresses.
- **Modular Design**: Separation of core and periphery contracts for improved security and flexibility.

## Advantages of Uniswap V2

- **Improved Capital Efficiency**: Direct ERC20/ERC20 pairs allow for more efficient use of capital.
- **Enhanced Price Oracle**: The new price oracle system provides more reliable on-chain price data.
- **Increased Flexibility**: Flash swaps open up new possibilities for arbitrage and composability with other DeFi protocols.
- **Greater Decentralization**: The core/helper architecture allows for upgrades without compromising decentralization.

## Limitations

- **Impermanent Loss**: Liquidity providers are still exposed to impermanent loss, a risk inherent to AMM models.
- **Capital Inefficiency**: Compared to order book models, AMMs can be less capital efficient in some scenarios.
- **Slippage on Large Trades**: Significant price slippage can occur on large trades, especially in pools with lower liquidity.

## Development and Future

Uniswap V2 laid the groundwork for further innovations in the DeFi space. Its improvements over V1 demonstrated the rapid evolution of decentralized exchange protocols. The introduction of a potential protocol fee (currently set to 0) also opened discussions about sustainable funding for decentralized protocols.

## Developer Resources and Related Links

For developers looking to interact with or build on Uniswap V2, the following resources are available:

- [Uniswap V2 Whitepaper](https://uniswap.org/whitepaper.pdf): Technical details of Uniswap V2
- [Uniswap V2 Documentation](https://docs.uniswap.org/contracts/v2/overview): Official documentation for Uniswap V2
- [Uniswap V2 Core](https://github.com/Uniswap/uniswap-v2-core): Core smart contracts for Uniswap V2
- [Uniswap V2 Periphery](https://github.com/Uniswap/uniswap-v2-periphery): Peripheral smart contracts for Uniswap V2
- [Uniswap V2 SDK](https://github.com/Uniswap/sdks/tree/main/sdks/v2-sdk): JavaScript SDK for interacting with Uniswap

The Uniswap SDK can assist developers in interacting with the Uniswap V2 Protocol, providing helpful utilities and abstractions.

## 结论

Uniswap V2 represents a significant step forward in the development of decentralized exchanges. By addressing limitations of V1 and introducing new features, it has further solidified Uniswap's position as a leading DEX protocol in the Ethereum ecosystem.
