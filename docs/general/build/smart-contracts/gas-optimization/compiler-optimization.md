---

title: Optimize with Compiler Optimization
displayed_sidebar: generalSidebar

---

# Compiler Optimization for Gas Efficiency

Minimizing gas costs is a paramount concern for smart contract developers, given the significant expenses associated with deploying and interacting with contracts on the blockchain. Beyond strategic coding practices, leveraging compiler optimization settings is a critical, yet often overlooked, avenue for gas savings.

Solidity's compiler, solc, provides an optimization feature designed to reduce the bytecode size of your contracts, thereby lowering deployment and execution costs. This optimization process involves various techniques, such as removing unused code, simplifying expressions, and reordering instructions.

## Optimization Runs: A Double-Edged Sword

At the heart of solc's optimization feature is the concept of "optimization runs." This setting determines the number of times the compiler attempts to optimize the bytecode. A higher number of runs performs more thorough optimization, potentially leading to more significant gas savings. However, this is not without trade-offs.

- **Lower Runs**: Fewer optimization runs can result in less optimized bytecode, leading to higher gas costs during contract execution. However, the compilation process is quicker, which might be beneficial during rapid development and testing phases.

- **Higher Runs**: More optimization runs can significantly reduce gas costs for complex contracts by producing highly optimized bytecode. The downside is a longer compilation time and potentially increased complexity in debugging, as the optimized code may diverge more from the source code.

## Demonstrating the Impact

Consider a contract that performs multiple arithmetic operations and stores numerous variables:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GasOptimizationDemo {
    uint256 public result;

    function complexComputation(uint256 a, uint256 b) external {
        for (uint256 i = 0; i < 10; i++) {
            result += a * b + i;
        }
    }
}
```

Compiled without optimization, the `complexComputation` function may consume approximately 42,000 gas per transaction. By adjusting the optimization runs, we observe the following:

- **200 Runs**: Gas consumption drops to about 39,500, a modest improvement.
- **2000 Runs**: Gas consumption further reduces to approximately 37,000, showcasing more significant savings.

### Recommendations for Gas Optimization:

🌟 While determining the optimal number of optimization runs, consider the trade-off between compilation time and gas efficiency. For production contracts, especially those with complex logic and high interaction frequency, opting for a higher number of optimization runs can lead to substantial long-term savings. During development and testing, a lower number might suffice to speed up the iteration cycle.