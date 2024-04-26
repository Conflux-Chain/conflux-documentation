---
displayed_sidebar: generalSidebar
---

# Oracle Manipulation

The Ethereum Virtual Machine (EVM) is a closed, isolated environment for security reasons. While smart contracts on the EVM can access on-chain data, they cannot directly fetch off-chain information, which is crucial for decentralized applications.

Oracles play a crucial role in connecting blockchain smart contracts with the outside world by providing them with external data, crucial for their operations. However, if these oracles are not implemented correctly by developers, they can become a significant security vulnerability.


The inherent trust that smart contracts place in oracles for accurate data can lead to significant security risks if this data is manipulated. Here are refined descriptions of some notable incidents:

1. **[Cream Finance Exploit (October 2021)](https://rekt.news/cream-rekt-2/)**: Cream Finance on the BNB Chain experienced a massive $130 million loss due to an oracle exploit that involved manipulating price feeds. This allowed attackers to borrow significantly more than their collateral's worth, highlighting vulnerabilities when relying on limited data sources.

2. **[Mirror Protocol Vulnerability (May 2022)](https://rekt.news/mirror-rekt/)**: Mirror Protocol was compromised, resulting in a $115 million loss when attackers exploited insecure price data fetch mechanisms, enabling them to manipulate market prices and siphon funds.

3. **[Mango Markets Incident (October 2022)](https://rekt.news/mango-markets-rekt/)**: In this case, attackers artificially inflated collateral values via oracle price manipulation on Mango Markets, leading to unauthorized loans and a substantial financial loss of $115 million.


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
4. Validate the returned data from oracle querying functions like `latestRoundData()`.
5. Thoroughly review the documentation and parameters of third-party oracles.
