---

title: Optimizing with `staticcall` for Gas Efficiency
displayed_sidebar: generalSidebar

---

# Optimizing with `staticcall` for Gas Efficiency

One of the subtler, yet powerful, optimization techniques in Solidity involves the judicious use of `staticcall`, particularly when interacting with external contracts. `staticcall` is a type of Ethereum Virtual Machine (EVM) call that is used for executing external contract functions that do not alter the state. This kind of call ensures that no state modification occurs, making it a safer and, in some scenarioes, a more gas-efficient alternative to regular calls.

## Understanding `staticcall`

In Ethereum, every call to an external contract function can potentially modify the state of the blockchain, which requires a certain amount of gas. However, operations that purely read data without altering the state consume less gas. `staticcall` is specifically designed for these scenarios. By using `staticcall`, you explicitly signal to the EVM and to other developers that the called function does not write to the blockchain. This can save gas in certain situations and also adds a layer of security to your contract by preventing state changes during the call.

## How It Works

Solidity abstracts `staticcall` through its language syntax, primarily through the `view` and `pure` function modifiers. When you call a function marked as `view` or `pure` on an external contract interface, Solidity automatically uses `staticcall`. However, you can also manually invoke `staticcall` through low-level calls for more complex scenarios or when interacting with contracts without a Solidity interface.

## Benefits of `staticcall`

- **Gas Efficiency**: For functions that only need to read data from the blockchain, `staticcall` is more gas-efficient than a regular call.
- **Security**: By preventing state changes, `staticcall` ensures that the called function cannot alter the contract's state or the state of other contracts. This makes contracts more predictable and secure.

You're right; the example provided for demonstrating the benefits of `staticcall` might not fully showcase its advantages, especially since `staticcall` is implicitly used in Solidity for `view` and `pure` functions. To better illustrate the benefits, let's delve into a scenario where the explicit use of `staticcall` can optimize gas consumption, particularly when interacting with contracts in a more granular manner.

### Example

Consider a case where you have a contract that interacts with various external contracts, and you need to ensure that these interactions do not alter the state, aiming to optimize for gas. In such scenarios, explicitly using `staticcall` can help, especially when you're working with contracts that don't have Solidity interfaces or when you need to ensure that a fallback function does not alter the state.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExternalPriceFeed {
    function getPrice() external pure returns (uint256) {
        return 100; // Simplified example
    }
}

contract PriceChecker {
    /*
        Explicitly uses low-level calls to interact with another contract.
        This method ensures that the call is a 'static' call, meaning it cannot alter the state.
        Useful for interacting with contracts where you want to guarantee no state changes.
    */

    function checkPrice(address priceFeedAddress) external returns (uint256) {
        (bool success, bytes memory data) = priceFeedAddress.staticcall(
            abi.encodeWithSignature("getPrice()")
        );
        require(success, "Static call failed");
        return abi.decode(data, (uint256));
    }
}
```

In this refined example, `PriceChecker` uses a low-level `staticcall` to interact with `ExternalPriceFeed`. The key here is the explicit control over the type of call made to the external contract, ensuring it's a read-only operation. This approach can prevent unintended state changes, which is particularly important in complex systems where contracts interact with various external components. It provides an extra layer of security and optimizes gas usage by ensuring that only necessary state changes are paid for.

### Recommendations for Gas Optimization:

🌟 Utilize `staticcall` (implicitly or explicitly) when interacting with external contracts for read-only operations. This not only optimizes gas consumption but also adds an extra layer of security by ensuring that these calls cannot perform state modifications. Always assess the function being called to confirm that a `staticcall` is appropriate for the intended interaction.