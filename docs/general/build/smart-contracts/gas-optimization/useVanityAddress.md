---
displayed_sidebar: generalSidebar
---

# Using Vanity Address

When optimizing gas usage in Ethereum smart contracts, every byte counts. One often overlooked optimization technique involves the use of vanity addresses and the `CREATE2` opcode. This approach can lead to gas savings, especially when contract addresses are frequently used as function arguments.

Ethereum charges `4` gas for a zero byte of calldata and `16` gas for a non-zero byte. This pricing model applies both during normal function calls and contract deployment. As a result, addresses with more leading zeros can lead to gas savings when used as function arguments.

**Key Points:**

- Vanity addresses with leading zeros save calldata gas cost.
- Savings occur when the address is used as a function argument, not when calling the address directly.
- This principle applies to both contract addresses and EOAs (Externally Owned Accounts).

**Example:**
OpenSea's Seaport contract uses a vanity address: `0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC`

### Using CREATE2 for Vanity Contract Address

The CREATE2 opcode allows for deterministic contract address generation. By carefully choosing the salt value, we can create contract addresses with desired patterns, such as leading zeros.

#### CREATE2 Address Calculation

The CREATE2 opcode uses the following formula to calculate the contract address:

```solidity
keccak256(0xff ++ deployingAddress ++ salt ++ keccak256(initcode))[12:]
```

Where:

- `deployingAddress` is the address of the contract or EOA creating the new contract
- `salt` is a 32-byte value used to randomize the contract address
- `initcode` is the contract creation code

**DemoCode**

Here's an simple example of how to use CREATE2 to deploy contracts with vanity addresses:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VanityAddressFactory {
    event ContractDeployed(address deployedAt);

    function deploy(bytes32 salt, bytes memory bytecode) public {
        address addr;
        assembly {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }
        emit ContractDeployed(addr);
    }

    function computeAddress(bytes32 salt, bytes memory bytecode) public view returns (address) {
        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(this),
                salt,
                keccak256(bytecode)
            )
        );
        return address(uint160(uint(hash)));
    }
}

contract SimpleContract {
    uint256 public value;

    function setValue(uint256 _value) external {
        value = _value;
    }
}
```

### Using Different Salts to Calculate Contract Address

Here's a script demonstrating how to use different salts to find a vanity address:

```javascript
import { ethers } from "ethers";

async function findVanityAddress(prefix, bytecode, factoryAddress) {
  let salt = 0n;
  while (true) {
    const saltHex = ethers.zeroPadValue(ethers.toBeHex(salt), 32);
    const address = ethers.getCreate2Address(
      factoryAddress,
      saltHex,
      ethers.keccak256(bytecode)
    );

    if (address.toLowerCase().startsWith(prefix.toLowerCase())) {
      console.log(`Found matching address: ${address}`);
      console.log(`Salt: ${salt}`);
      return { address, salt };
    }

    salt++;
    if (salt % 1000000n === 0n) {
      console.log(`Checked ${salt} salts...`);
    }
  }
}

// Usage example
const factoryAddress = "0x..."; // Your VanityAddressFactory address
const bytecode = "0x..."; // Bytecode of the contract to deploy
findVanityAddress("0x000000", bytecode, factoryAddress);
```

### Gas Analysis

| Scenario                           | Gas Consumption                   |
| ---------------------------------- | --------------------------------- |
| Function call with regular address | Higher due to more non-zero bytes |
| Function call with vanity address  | Lower due to more zero bytes      |

#### Recommendations for Gas Optimization:

🌟 When designing systems where contract addresses will be frequently used as function arguments, consider using CREATE2 to generate vanity addresses with leading zeros.

**Security Note**: While generating vanity addresses for smart contracts is safe, be cautious when generating vanity addresses for EOAs. There have been [hacks](https://www.halborn.com/blog/post/explained-the-profanity-address-generator-hack-september-2022) where insufficiently random private keys led to security vulnerabilities in EOA vanity addresses.
