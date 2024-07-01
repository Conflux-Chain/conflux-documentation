---
displayed_sidebar: generalSidebar
---

# 在路由器类合约中实现多调用

在 Solidity 中，可以通过将多个状态修改调用批量处理为单个交易，以在路由器类合约中实现多调用功能，显著降低燃气成本。 这种技术在像 Uniswap 和 Compound 平台的合约中非常有价值。

**代码演示**

下面的示例合约 `MulticallRouter` 展示了如何通过状态修改操作实现多调用功能。 该合约包含一个 `multicall` 函数，该函数用于执行一组已编码的函数调用，以高效地修改合约状态。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MulticallRouter {
    uint256 public counter; // State variable to demonstrate state changes
    mapping(uint256 => uint256) public data; // Mapping to store arbitrary data

    function multicall(bytes[] calldata data) external returns (bytes[] memory results) {
        results = new bytes[](data.length);
        for (uint256 i = 0; i < data.length; i++) {
            (bool success, bytes memory result) = address(this).delegatecall(data[i]);
            require(success, "Multicall execution failed");
            results[i] = result;
        }
    }

    function incrementCounter(uint256 amount) external {
        counter += amount; 
    }

    function updateData(uint256 key, uint256 value) external {
        data[key] = value; 
    }
}
```

下面的测试脚本验证了 `MulticallRouter` 的功能和效率：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "./MulticallRouter.sol";

contract MulticallTest is Test {
    MulticallRouter public router;
    bytes[] callData;

    function setUp() public {
        router = new MulticallRouter();
        callData = new bytes[](4);
        callData[0] = abi.encodeWithSelector(
            router.incrementCounter.selector,
            1
        );
        callData[1] = abi.encodeWithSelector(
            router.updateData.selector,
            0,
            100
        );
        callData[2] = abi.encodeWithSelector(
            router.incrementCounter.selector,
            2
        );
        callData[3] = abi.encodeWithSelector(
            router.updateData.selector,
            1,
            200
        );
    }

    function testIndividualCalls() public {
        uint256 gasStart = gasleft();
        router.incrementCounter(1);
        router.updateData(0, 100);
        router.incrementCounter(2);
        router.updateData(1, 200);
        uint256 gasEnd = gasleft();
        uint256 gasUsed = gasStart - gasEnd;
        emit log_named_uint("Gas used for individual calls", gasUsed);
    }

    function testMulticall() public {
        uint256 gasStart = gasleft();
        router.multicall(callData);
        uint256 gasEnd = gasleft();
        uint256 gasUsed = gasStart - gasEnd;
        emit log_named_uint("Gas used for multicall", gasUsed);
    }
}
```

通过在 Foundry 项目中运行测试，我们发现 `testIndividualCalls()` 消耗了 `166259` 燃气，而 `testMulticall()` 消耗了 `139753` 燃气，表明使用多调用功能可以在一定程度上节省燃气。

**燃气优化分析**

使用多调用的主要优势是通过避免多次交易开销来减少燃气成本。 以下是执行单个交易和一次多调用之间的燃气使用对比：

- **单个交易**：每次调用都会产生基础交易成本加上执行函数所需的燃气花费。
- **一次多调用**：仅产生一个基础交易成本，加上在循环中执行每个函数所需的燃气花费。

通过批量处理调用，多调用功能可以显著减少累计的燃气成本，在执行多个操作时尤其显著。

**燃气优化建议**

在路由器类合约中实现多调用功能可以通过减少交易数量，并利用在单个交易中执行多次操作的方法，产生较低的累计燃气花费以节省燃气。
