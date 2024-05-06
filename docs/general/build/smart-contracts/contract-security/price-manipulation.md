---
displayed_sidebar: generalSidebar
---

# Price Manipulation

Price manipulation poses a significant risk to smart contracts that utilize decentralized exchanges (DEXs) like Uniswap, where asset prices are influenced by the liquidity within trading pools. These pools are vulnerable to manipulation by well-resourced entities capable of altering market balances to artificially influence prices. Such manipulative actions can severely undermine the functionality and security of financial applications that rely on this pricing data for essential operations.

**[Mango Markets Incident (October 2022)](https://rekt.news/mango-markets-rekt/)**: In this notable case, attackers manipulated the oracle prices linked to Mango Markets' on-chain data. By inflating the value of collateral artificially, they were able to take out unauthorized loans, leading to significant financial losses estimated at $115 million.

This incident highlights the urgent need for robust safeguards to prevent the manipulation of on-chain price data. Ensuring the accuracy and reliability of such data is crucial to maintaining the security and functionality of smart contracts that depend on it.

#### Vulnerable Contract Example

This example is a stablecoin contract following the ERC20 standard. It allows users to swap `ETH` for `OracleUSD`. The swap price is determined by a custom oracle (`fetchPrice()` function) using the instant price from the Uniswap V2 `WETH-BUSD` pool, which is susceptible to manipulation.

The `OracleUSD` contract stores state variables for addresses of `BUSD`, `WETH`, the Uniswap V2 factory, and the `WETH-BUSD` pair contract. It includes:

- `constructor()`: Initializes the ERC20 token name and symbol.
- `fetchPrice()`: The price oracle function retrieving the instantaneous price from the Uniswap V2 `WETH-BUSD` pair.
- `exchange()`: Allows swapping `ETH` for `OracleUSD` at the oracle's price.

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

Attacker can exploit the `fetchPrice()` function by manipulating the `WETH-BUSD` pair's balance using:

1. Large-scale purchases of `WETH` using `BUSD` in the Uniswap V2 pool can disrupt the balance of token ratios, leading to a temporary spike in `WETH` prices.
1. Swapping `ETH` for a massively inflated amount of `OracleUSD` using the manipulated price.

### Prevention Techniques

1. **Avoid using low-liquidity pools as price oracles.**
2. **Refrain from using spot/instant prices, incorporate delays like Time Weighted Average Price ([TWAP](https://chain.link/education-hub/twap-vs-vwap)).**
3. **Employ multiple data sources, selecting the median-priced sources to counteract extreme manipulations.**
