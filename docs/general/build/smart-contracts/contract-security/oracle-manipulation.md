## Price Oracle Security Overview

### Introduction to Ethereum and Oracles

The Ethereum Virtual Machine (EVM) is a closed, isolated environment for security reasons. While smart contracts on the EVM can access on-chain data, they cannot directly fetch off-chain information, which is crucial for decentralized applications.

Oracles bridge this gap by retrieving data from off-chain sources and making it available on-chain, with price oracles being a common type. They fetch market data from various sources, critical for applications like:

- Decentralized lending platforms (e.g., AAVE) use oracles to determine when borrowers reach liquidation thresholds.
- Synthetic asset platforms (e.g., Synthetix) rely on oracles for up-to-date asset pricing, facilitating zero-slippage trades.
- Platforms like MakerDAO use price oracles to ascertain collateral values and issue stablecoins like $DAI.

### The Risks with Price Oracles

Improper use of oracles can pose significant security risks:

- In October 2021, Cream Finance on the BNB Chain suffered a $130 million loss due to an oracle exploit ([source](https://rekt.news/cream-rekt-2/)).
- In May 2022, Mirror Protocol on the Terra chain was exploited for $115 million because of an oracle vulnerability ([source](https://rekt.news/mirror-rekt/)).
- In October 2022, Mango Markets on Solana faced a $115 million loss due to an oracle issue ([source](https://rekt.news/mango-markets-rekt/)).

### Case Study: The `oUSD` Contract Vulnerability

The `oUSD` contract is a stablecoin following the ERC20 standard, similar to platforms like Synthetix. It allows users to swap `ETH` for `oUSD` (Oracle USD) at zero slippage. The swap price is determined by a custom oracle (`getPrice()` function) using the instant price from the Uniswap V2 `WETH-BUSD` pool, which is susceptible to manipulation.

#### Contract Overview

The `oUSD` contract stores state variables for addresses of `BUSD`, `WETH`, the Uniswap V2 factory, and the `WETH-BUSD` pair contract. It includes:

- Constructor: Initializes the ERC20 token name and symbol.
- `fetchPrice()`: The price oracle function retrieving the instantaneous price from the Uniswap V2 `WETH-BUSD` pair.
  ```solidity
  function fetchPrice() public view returns (uint256 price) {
      (uint112 reserve0, uint112 reserve1, ) = pair.getReserves();
      price = reserve0 / reserve1;
  }
  ```
- `exchange()`: Allows swapping `ETH` for `oUSD` at the oracle's price.

```solidity
contract OracleUSD is ERC20{
    // Mainnet addresses
    address public constant FACTORY_V2 = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address public constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address public constant BUSD = 0x4Fabb145d64652a948d72533023f6E7A623C7C53;

    IUniswapV2Factory public factory = IUniswapV2Factory(FACTORY_V2);
    IUniswapV2Pair public pair = IUniswapV2Pair(factory.getPair(WETH, BUSD));
    IERC20 public weth = IERC20(WETH);
    IERC20 public busd = IERC20(BUSD);

    constructor() ERC20("Oracle USD","oUSD"){}

    function fetchPrice() public view returns (uint256 price) {
        (uint112 reserve0, uint112 reserve1, ) = pair.getReserves();
        price = reserve0 / reserve1;
    }

    function exchange() external payable returns (uint256 amount){
        uint price = fetchPrice();
        amount = price * msg.value;
        _mint(msg.sender, amount);
    }
}
```

### Attack Strategy

The attack exploits the `fetchPrice()` function by manipulating the `WETH-BUSD` pair's balance using:

1. Large-scale `BUSD` purchases of `WETH` from the Uniswap V2 pool.
2. Swapping `ETH` for a massively inflated amount of `oUSD` using the manipulated price.

### Prevention Techniques

Blockchain security expert `samczsun` outlines several prevention strategies in a [blog post](https://www.paradigm.xyz/2020/11/so-you-want-to-use-a-price-oracle):

1. Avoid using low-liquidity pools as price oracles.
2. Refrain from using spot/instant prices; incorporate delays like Time Weighted Average Price (TWAP).
3. Utilize decentralized oracles.
4. Employ multiple data sources, selecting the median-priced sources to counteract extreme manipulations.
5. Validate the returned data from oracle querying functions like latestRoundData().
6. Thoroughly review the documentation and parameters of third-party oracles.
