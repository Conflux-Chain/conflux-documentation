---
displayed_sidebar: generalSidebar
---

# Alternatives to OpenZeppelin

While OpenZeppelin is a widely used and respected smart contract library, there are alternative libraries that offer improved gas efficiency. Two notable examples are **Solmate** and **Solady**. These libraries have been tested and recommended by developers for their focus on gas optimization.

#### OpenZeppelin

[OpenZeppelin](https://www.openzeppelin.com/contracts) is a library for secure smart contract development. It provides implementations of standards like ERC20 and ERC721 which you can deploy as-is or extend to suit your needs, as well as Solidity components to build custom contracts and more complex decentralized systems.

#### Solmate

[Solmate](https://github.com/transmissions11/solmate) is a gas-optimized smart contract library created by Rari Capital. It provides highly optimized contract implementations for common use cases in Ethereum development, with a focus on minimalism and gas efficiency.

- Minimalist and gas-efficient implementations
- Fewer safety checks, assuming developers will implement their own
- Optimized for common DeFi patterns

#### Solady

[Solady](https://github.com/Vectorized/solady) is a gas-optimized Solidity library that prioritizes using assembly for core operations. It's designed for projects that require extreme gas optimization and are willing to trade off some readability for efficiency.

- Extreme gas optimization using assembly
- Unchecked arithmetic operations where safe
- Specialized functions for bit manipulation and other low-level operations

#### Key Differences:

- **OpenZeppelin**: Comprehensive, well-audited, but may have higher gas costs due to additional safety checks.
- **Solmate**: Focuses on gas-efficient implementations of common smart contract patterns.
- **Solady**: Emphasizes extreme gas optimization, often utilizing assembly for core functions.

**DemoCode**

The example below compares a simple ERC20 token implementation using OpenZeppelin, Solmate, and Solady:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// OpenZeppelin Implementation
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OpenZeppelinToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("OpenZeppelinToken", "OZT") {
        _mint(msg.sender, initialSupply);
    }
}

// Solmate Implementation
import {ERC20 as SolmateERC20} from "solmate/tokens/ERC20.sol";

contract SolmateToken is SolmateERC20 {
    constructor(uint256 initialSupply) ERC20("SolmateToken", "SMT", 18) {
        _mint(msg.sender, initialSupply);
    }
}

// Solady Implementation
import {ERC20 as SoladyERC20} from "solady/tokens/ERC20.sol";

contract SoladyToken is SoladyERC20 {
    constructor(uint256 initialSupply) {
        _mint(msg.sender, initialSupply);
    }

    function name() public pure override returns (string memory) {
        return "SoladyToken";
    }

    function symbol() public pure override returns (string memory) {
        return "SDT";
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
```

#### Gas Analysis:

Here's an estimated gas comparison for common ERC20 operations:

| Operation    | OpenZeppelin               | Solmate                  | Solady                   |
| ------------ | -------------------------- | ------------------------ | ------------------------ |
| Deploy       | ~1,500,000 | ~750,000 | ~500,000 |
| Transfer     | ~51,000    | ~44,000  | ~40,000  |
| Approve      | ~46,000    | ~44,000  | ~40,000  |
| TransferFrom | ~60,000    | ~54,000  | ~50,000  |

Solady consistently uses the least gas across all operations, Solmate offers significant gas savings compared to OpenZeppelin but not as much as Solady, and the deployment cost shows the most significant difference with Solady being about 66% cheaper to deploy than OpenZeppelin.

Note: These gas estimates are approximate and may vary based on the specific Solidity compiler version, optimization settings, and the exact implementation details.

**Recommendations for Gas Optimization:**

🌟 For high-volume or gas-sensitive applications, consider using Solmate or Solady instead of OpenZeppelin. While these alternatives offer gas savings, ensure you understand and account for any safety checks they might omit.
