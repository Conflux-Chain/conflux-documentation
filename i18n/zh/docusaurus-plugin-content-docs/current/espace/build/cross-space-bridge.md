---
sidebar_position: 5
title: CrossSpaceCall 合约
description: 对CrossSpaceCall合约的详细解释
displayed_sidebar: eSpaceSidebar
tags:
  - CIP-90
  - Conflux eSpace
  - Conflux Core
  - EVM兼容性
  - CrossSpaceCall
  - Internal Contract
  - Cross-Space Operations
  - CFX Transfer
  - 智能合约
  - Mapped Addresses
  - Ethereum Compatibility
  - Transaction Format
  - Address Generation
  - Base32 地址
  - Hex Addresses
  - EIP-155
  - CIP-37
  - EIP-55
  - Atomic Operations
  - Layer-1 Security
  - js-conflux-sdk
  - Solidity
  - RPC Methods
  - Blockchain Interoperability
  - Cross-Chain Communication
  - Contract Deployment
  - Contract Interaction
---

Conflux eSpace 和 Core Space 是两个独立的 space，您不能直接将 CFX 从 base32 地址发送到十六进制地址。 您只能使用 [Confluxhub Space Bridge](https://confluxhub.io/espace-bridge/cross-space) 在 eSpace 和 Core Space 之间转移 CFX。

在底层，Core Space 中有一个名为 CrossSpaceCall 的内置合约，用于在 eSpace 和 Core Space 之间转移 CFX。 通过CrossSpaceCall，在Core Space内直接与eSpace合约进行互动成为可能。 这个合约是由 [CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md) 引入的。

## CrossSpaceCall 接口

这个合约在 Core Space 中可用，地址为：

- base32 地址：['cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa2sn102vjv'](https://confluxscan.io/address/cfx:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaa2sn102vjv)
- 十六进制地址（在 solidity 中使用）：`0x0888000000000000000000000000000000000006`

以下是这个合约的接口：

```js
interface CrossSpaceCall {
    /**
     * @dev 在 eSpace 中部署一个合约
     * @param init bytes - 合约初始化字节码
     * @return bytes20 - 部署合约的十六进制地址
     */
    function createEVM(bytes calldata init) external payable returns (bytes20);
    /* 跨空间 CFX 转移的方法 */

    /**
     * @dev 将 CFX 从 Core space 转移到 eSpace 指定地址。转移金额由交易值指定。
     * @param to bytes20 - 接收方在 eSpace 的十六进制地址
     * @return output bytes - 交易输出
     */
    function transferEVM(bytes20 to) external payable returns (bytes memory output);
    
    /**
     * @dev 从 eSpace 映射账户余额中提取 CFX
     * @param value uint256 - 需要提取的 CFX 数量
     */ 
    function withdrawFromMapped(uint256 value) external;

    /**
     * @dev 查询 eSpace 映射账户的 CFX 余额
     * @param addr address - 需要查询的 core 地址
     * @return uint256 - 余额
     */
    function mappedBalance(address addr) external view returns (uint256);

    /**
     * @dev 查询 eSpace 映射账户的 nonce
     * @param addr address - 需要查询的 core 地址
     * @return uint256 - Nonce 值
     */ 
    function mappedNonce(address addr) external view returns (uint256);
    
    /* 其他跨空间操作的方法 */

    /**
     * @dev 从 Core space 调用 eSpace 合约方法
     * @param to bytes20 - eSpace 中合约的十六进制地址
     * @param data bytes - 合约方法调用数据
     * @return output bytes - 方法调用结果
     */ 
    function callEVM(bytes20 to, bytes calldata data) external payable returns (bytes memory output);

    /**
     * @dev 从 Core space 静态调用 eSpace 合约方法
     * @param to bytes20 - eSpace 中合约的十六进制地址
     * @param data bytes - 合约方法调用数据
     * @return output bytes - 方法调用结果
     */ 
    function staticCallEVM(bytes20 to, bytes calldata data) external view returns (bytes memory output);
}
```

## 在 eSpace 和 Core Space 之间转移 CFX

通过调用 CrossSpaceCall 内置合约的相关方法，可以实现在 eSpace 和 Core Space 之间转移 CFX。

注意，CrossSpaceCall（如同其他内置合约一样）只能在 Conflux Core Space 中访问。

### 从 Core Space 到 eSpace

**从 Core 到 eSpace**：要将 CFX 从 Conflux Core 转移到 Conflux eSpace，需要调用该合约的 `transferEVM(bytes20 to)` 方法。 此转移的目的地址由方法参数 `to` 指定。 跨空间转移将在一个单一的原子步骤中执行。

```js
function transferEVM(bytes20 to) external payable returns (bytes memory output);
```

#### JS 示例

```js
const { Conflux, Drip } = require('js-conflux-sdk');

const conflux = new Conflux({
  url: 'https://main.confluxrpc.com',
  networkId: 1029,
});

const account = conflux.wallet.addPrivateKey(process.env.PRIVATE_KEY);

const crossSpaceCall = conflux.InternalContract('CrossSpaceCall');

async function main() {
    const eSpaceAddress = '0x3D69D968e3673e188B2D2d42b6a385686186258f';

    const receipt = await crossSpaceCall.transferEVM(eSpaceAddress)
        .sendTransaction({
            from: account,
            value: Drip.fromCFX(1),  // transfer 1 CFX, the amount is specify by value
        }).executed();

    console.log(`Transfer to ${eSpaceAddress} ${receipt.outcomeStatus === 0 ? 'succeed' : 'failed'}`);
}

main()
```

### 从 eSpace 到 Core Space

#### 跨空间操作中的映射地址

要将 CFX 从 eSpace 转移到 Core Space，需要一个映射地址。 Core Space 中的每个地址在 eSpace 中都有一个 **映射地址** （hex40）。 只有 Core space 地址可以从其映射地址提取 CFX。

有关映射地址的详细信息，请参阅[映射地址](./accounts.md#mapped-addresses-in-cross-space-operations)。

#### 转移步骤

要将 CFX 从 Conflux eSpace 转移到 Conflux Core，需要两个步骤。

1. 将 CFX 转移到属于 Core 目标地址的 eSpace 映射地址。 这个操作需要一个 eSpace 交易。
2. 调用 `CrossSpaceCall` 内部合约的 `withdrawFromMapped(uint256 value)` 方法。 这个调用将把 CFX 从映射账户转回到相应的目标地址。 另一个方法 `mappedBalance` 可用于查询一个 core 地址的映射地址余额。

```js
function withdrawFromMapped(uint256 value) external;

// 参数 addr 是一个 core 账户地址
function mappedBalance(address addr) external view returns (uint256);
```

#### JS 示例

步骤 1: 使用 js-conflux-sdk 的地址工具方法获取 Core Space 目标账户的映射地址。

```js
const { address } = require('js-conflux-sdk');

const base32Address = 'cfx:aak2rra2njvd77ezwjvx04kkds9fzagfe6ku8scz91';

const mappedAddress = address.cfxMappedEVMSpaceAddress(base32Address);

// 0x12Bf6283CcF8Ad6ffA63f7Da63EDc217228d839A
```

步骤 2: 通过钱包或 ethers.js 在 eSpace 中向映射地址转移 CFX

步骤 3: 在 Core Space 中调用 `CrossSpaceCall` 内部合约的 `withdrawFromMapped` 方法，从映射地址提取 CFX。

```js
const { Conflux, Drip, address } = require('js-conflux-sdk');

const conflux = new Conflux({
  url: 'https://main.confluxrpc.com',
  chainId: 1029,
});

const account = conflux.wallet.addPrivateKey(process.env.PRIVATE_KEY);

const crossSpaceCall = conflux.InternalContract('CrossSpaceCall');

async function main() {
    const receipt = await crossSpaceCall.withdrawFromMapped(Drip.fromCFX(1))
        .sendTransaction({
            from: account,
        }).executed();

    console.log(`从 eSpace 提取 ${receipt.outcomeStatus === 0 ?' succeed' : 'failed'}`);
}

main();
```

## 从 Core Space 调用 eSpace 合约

通过 CrossSpaceCall 合约，可以从 Core Space 读取或写入 eSpace 合约的状态。 我们将给出一个简单的示例，展示如何从 Core Space 调用 eSpace 合约。

以下是在 eSpace 中部署的合约，地址为 `0x8c2a2b6b4c3b6e7e7d3b5e8b4b6b6b6b6b6b6b6b`：

```js
contract SimpleStore {
    uint256 public value;

    function setValue(uint256 _value) public {
        value = _value;
    }
}
```

以下是在 Core Space 中部署的合约：

```js

contract CrossCallExample {

    CrossSpace public crossSpaceCall = CrossSpace(0x0888000000000000000000000000000000000006);

    function readValue() public returns (uint256) {
        bytes20 to = bytes20(0x8c2a2b6b4c3b6e7e7d3b5e8b4b6b6b6b6b6b6b6b);
        bytes memory num = crossSpaceCall.staticCallEVM(to, abi.encodeWithSignature("value()"));
        return abi.decode(num, (uint256));
    }

    function setValue(uint256 _value) public {
        bytes20 to = bytes20(0x8c2a2b6b4c3b6e7e7d3b5e8b4b6b6b6b6b6b6b6b);
        bytes memory data = abi.encodeWithSignature("setValue(uint256)", 100);
        crossSpaceCall.callEVM(to, data);
    }
}

```

## 其他资源

- [CIP-90](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-90.md)
- [关于映射地址](./accounts.md#mapped-addresses-in-cross-space-operations)
- [CrossSpaceCall](../../core/core-space-basics/internal-contracts/crossSpaceCall.md)
- [eSpace 虚拟交易](./evm-compatibility.md#phantom-transactions)
