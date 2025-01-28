---
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - security
  - price-manipulation
  - dex
  - uniswap
  - oracle
  - mango-markets
  - vulnerabilities
  - erc20
  - twap
  - prevention
tags:
  - 价格操纵
  - Security
  - 智能合约
---

# 价格操纵

Price manipulation poses a significant risk to smart contracts that utilize decentralized exchanges (DEXs) like Uniswap, where asset prices are influenced by the liquidity within trading pools. These pools are vulnerable to manipulation by well-resourced entities capable of altering market balances to artificially influence prices. Such manipulative actions can severely undermine the functionality and security of financial applications that rely on this pricing data for essential operations.

**[Mango Markets 事件 (2022年10月)](https://rekt.news/mango-markets-rekt/)**：在这个引人注目的案例中， 攻击者操纵了与Mango Markets的链上数据相关联的预言机价格。 By inflating the value of collateral artificially, they were able to take out unauthorized loans, leading to significant financial losses estimated at $115 million.

这一事件凸显了迫切需要采取强有力的保障措施，以防止对链上价格数据的操纵。 确保这类数据的准确性和可靠性，对于维护依赖它的智能合约的安全性和功能性至关重要。

#### 易受攻击的合约示例

这个示例是一个遵循ERC20标准的稳定币合约。 It allows users to swap `ETH` for `OracleUSD`. The swap price is determined by a custom oracle (`fetchPrice()` function) using the instant price from the Uniswap V2 `WETH-BUSD` pool, which is susceptible to manipulation.

The `OracleUSD` contract stores state variables for addresses of `BUSD`, `WETH`, the Uniswap V2 factory, and the `WETH-BUSD` pair contract. 它包括：

- `constructor()`:初始化ERC20代币名称和符号。
- `fetchPrice()`: The price oracle function retrieving the instantaneous price from the Uniswap V2 `WETH-BUSD` pair.
- `exchange()`: 允许以预言机价格将交换`ETH`为`OracleUSD`。

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

攻击者可以通过以下方式利用`fetchPrice()`函数来操纵`WETH-BUSD`交易对的余额：

1. 在Uniswap V2的交易池中大规模使用`BUSD`购买 `WETH`可能会扰乱代币比例的平衡，导致`WETH`价格暂时飙升。
2. Swapping `ETH` for a massively inflated amount of `OracleUSD` using the manipulated price.

### 预防技术

1. **Avoid using low-liquidity pools as price oracles.**
2. **避免使用现货/即时价格，引入延迟，如时间加权平均价格([TWAP](https://chain.link/education-hub/twap-vs-vwap))等。**
3. **Employ multiple data sources, selecting the median-priced sources to counteract extreme manipulations.**
