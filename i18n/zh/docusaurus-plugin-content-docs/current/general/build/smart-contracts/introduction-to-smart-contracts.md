---
sidebar_position: 1
title: Smart Contracts Development
displayed_sidebar: generalSidebar
---

## Conflux 网络智能合约开发介绍

[**智能合约**](../../comflux-basics/contracts.md)是 Conflux 网络的一个重要组成部分，它为区块链上代码的自动执行提供了一种强大的方式。 这些自动执行的智能合约是由一系列代码组成的，这些代码能够自动执行基于预定规则的共识条款。 本篇将探讨 Conflux 生态系统内智能合约的关键概念、功能和潜在应用。

### Conflux 智能合约入门指南

开发者可以学习 [**Solidity**](solidity-basics.md) ，了解 Conflux 的独特特性，并使用 Conflux Studio 等工具进行开发和测试。

想要了解更多关于 Conflux 网络中智能合约的详细信息和资料，您可以浏览以下视频和资源：

## 自动售货机智能合约示例

让我们看看一个最简单的自动售货机智能合约实现。

```js
pragma solidity ^0.8.0;

contract VendingMachine {

    // Declare state variables of the contract
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Declare event for record purchase event
    event Purchase(address customer, uint amount);

    // When 'VendingMachine' contract is deployed:
    // 1. set the deploying address as the owner of the contract
    // 2. set the deployed smart contract's cupcake balance to 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Get user's cupcake balance
    function balanceOf(address user) public view returns(uint) {
        return cupcakeBalances[user];
    }

    // Allow the owner to increase the smart contract's cupcake balance
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Allow anyone to purchase cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 CFX per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");

        unchecked {
            cupcakeBalances[address(this)] -= amount;
        }

        cupcakeBalances[msg.sender] += amount;
        emit Purchase(msg.sender,amount);
    }
}
```

这个智能合约有两个函数：`refill` 函数允许管理员补充商品。 `purchase` 函数允许客户使用 CFX 代币购买商品。 就像自动售货机消除了销售员的需要一样，智能合约可以在许多行业消除中介。

智能合约是一组代码（合约函数）和数据（合约状态变量）。 对于 `mapping (address => uint) public cupcakeBalances;` 这一行，它声明了一个名为 cupcakeBalances 的状态变量，类型为 `mapping (address => uint)`。 你可以把它看作数据库中的一个表。 同时，智能合约中的方法 `refill` 和 `purchase` 用于读取或修改该数据库表中数据的状态。 这个状态变量也是 `public` 类型的，这意味着它是 [在函数内部外部均可见](https://docs.soliditylang.org/enarage/cheatsheet.html#function-visibility-specifiers) 的。

这个智能合约是用 `solidity` 编写的，它的语法类似于 `javascript` 。

- `pragma solidity ^0.8.0;` 表示这个合约需要用一个 `>=0.8.0` 且 `<0.9.0` 的编译器来编译。
- `contract VendingMachine` 定义了一个名为 `VendingMachine` 的智能合约；
- `address public owner;` 声明了一个公开的状态变量，名称为 `owner` 和 `address`;
- `event Purchase(address customer, uint amount);` 声明了一个名为 `Purchase` 的事件。 事件类似于其他语言中的日志记录功能。 它的作用主要是在智能合约执行时记录一些重要信息。 例如， `Purchase` 是一个在客户购买某个商品时生成购买记录的事件。
- 一旦合约被部署， `constructor` 函数便会执行。
- 以 `view` 修饰的 `balanceOf` 函数是一个只读函数，它不能用来修改合约状态。 所有只读函数必须声明为 `view` 或 `pure` 函数。
- `refill` 函数是一个普通函数，可以通过发送交易调用。 此函数将更改合约状态。
- `require(msg.sender ==  owner, "Only the owner can refill");`只有当条件 `msg.sender == owner` 满足时（即调用者是合约管理员）， 才能修改合约变量 `cupcakeBalances` 的状态来补充商品。 如果条件不满足，则会返回一条消息（在这个例子中是 `"Only the owner can refill"`），并且交易将被回滚。
- `purchase` 函数包括一个 `payable` 修饰符，表明在调用该函数的同时，你可以发送 CFX。 由于顾客需要支付 CFX 来购买，因此它被标记为一个 `payable` 函数。
- `require(msg.value >= amount 1 ether, "You must pay at least 1 CFX per cupcake")` 表明必须支付完整的 CFX 金额才能完成购买。 否则，函数将被回滚，并返回消息 `"You must pay at least 1 CFX per cupcake"` 。

> **Solidity 内置了以太单位字面量**
>
> 一个数字可以使用 `wei`, `gwei` 或 `ether` 作为后缀来指定以太的子单位，其中没有后缀的以太数字被默认为 Wei。 在 Conflux 中 **1 ether = 1 CFX**。
>
> - assert(1 wei == 1);
> - assert(1 gwei == 1e9);
> - assert(1 ether == 1e18);

- 顾客成功购买商品后，自动售货机中的商品数量会减少，而顾客拥有的商品数量（由 `cupcakeBalances[msg.sender]` 表示）会增加。

在编写智能合约后，需要将其编译，并通过发送 `transaction` 将其部署到 Conflux 网络。 然后你便可以与智能合约的函数进行交互。

## 编译

智能合约的编译是指通过编译器从目标代码生成部署所需要的元素的过程。 编译结果有两个主要部分：`合约应用二进制接口（abi）` 和 `字节码`。

- 字节码：智能合约是在以太坊虚拟机（EVM）上执行的。 字节码是 EVM 可以识别的与智能合约对应的十六进制值。
- ABI：ABI 指的是应用二进制接口，它描述了合约公开接口中每个函数的名称、修饰符、可见性、参数名称及其类型、返回值名称及其类型和事件的描述（以 JSON 格式）。 当我们从外部调用合约函数并根据 ABI 中的函数描述以某种方式编码时，我们可以得到一个 EVM 可以识别并以十六进制格式显示的值。 可以使用这个值与智能合约进行交互。

您可以使用 `solc`、[hardhat](https://hardhat.org/) 或 [foundry](https://book.getfoundry.sh/) 来编译智能合约。

我们以 `solc` 为例。

安装 solc

```sh
npm install -g solc
```

> 注意：编译器版本需要匹配合约中指定的版本。 请使用 `npm install -g solc@v0.8.1` 下载 v0.8.1 版本

编译

```sh
solcjs ./VendingMachine.sol --bin --abi
```

Generate the `bytecode` file `__...VendingMachine.bin` and the `ABI` file `__...VendingMachine.abi`

`__...VendingMachine.bin`

```sh
60806040523480156100...bfea2646970667358221220761301cb41bc1e4c37cc823f17fd695c6c09521a3e09fe1e8a7c51f6e77181a464736f6c63430008000033
```

`__...VendingMachine.abi`

```JSON
[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "customer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Purchase",
      "type": "event"
    },
    ......
]
```

## 部署

智能合约的部署是通过发送一笔交易以在 Conflux 网络上创建一个合约，其中 `data` 为字节码，并且 `to` 字段留空。

> 如果构造函数包含参数，那么 `data` 应该是 `字节码` 和 `构造函数` 的 ABI 编码的组合。

我们将使用 `js-conflux-sdk` 在 Core Space 上演示：

```javascript
const { Conflux } = require("js-conflux-sdk");

(async function () {
    const cfx = await Conflux.create({ url: "https://test.confluxrpc.com" })
    const account = cfx.wallet.addPrivateKey("0x2139FB4C55CB9AF7F0086CD800962C2E9013E2292BAE77978A9209E3BEE71D49")

    // your bytecode
    let bytecode = "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffff......0008000033"

    let deployReceipt = await cfx.sendTransaction({
        from: account.address,
        data: bytecode
    }).executed()

    // or use contract instance
    // let vendingMachine = cfx.Contract({ bytecode })
    // let deployReceipt = await vendingMachine.constructor().sendTransaction({from:account.address}).executed()

    console.log("deploy tx receipt:", deployReceipt)
})()
```

如上文例子所示，合约是在发送一笔以字节码为数据的交易之后部署的。 `transaction receipt` 中的 `contractCreated` 字段是部署后的合约地址。

```bash
deploy tx receipt: {
  blockHash: '0xe1b7f118447d3f945db4c2cf5752e592e542d4b9d24d0312b4ca5fce925c1ae5',
  contractCreated: 'CFXTEST:TYPE.CONTRACT:ACCYSPEUUR469BCA0EXRFXKXMKX651W45JFW2RN5M0',
  epochNumber: 27675623,
  from: 'CFXTEST:TYPE.USER:AAP9KTHVCTUNVF030RBKK9K7ZBZYZ12DAJP1U3SP4G',
  gasCoveredBySponsor: false,
  gasFee: 646047n,
  gasUsed: 646047n,
  index: 1,
  logs: [],
  logsBloom: '0x...',
  outcomeStatus: 0,
  stateRoot: '0xd2ada6e3c04d6e8260446deaf1b8289d57ba84e2d82387155bbb397be93e2a30',
  storageCollateralized: 1664n,
  storageCoveredBySponsor: false,
  storageReleased: [],
  to: null,
  transactionHash: '0xe19d8a7527a7f655f0325374a5d483ed4459f465a2f7f9d3ac9a23a548eac5c4',
  txExecErrorMsg: null
}
```

> 该示例直接发送交易以用于演示目的。 如果合约的构造函数包含参数，一个更好的方式是使用智能合约开发工具，如 [hardhat](https://hardhat.org/) 及 [hardhat-conflux](https://github.com/conflux-chain/hardhat-conflux)（用于Core Space）和 [hardhat](https://hardhat.org/)（用于eSpace），来进行开发、编译和部署过程。

## 调用智能合约函数

您可以在合约部署后与函数进行交互。 有两种方式：

- 通过 `cfx_call` （对于Conflux Core）或 `eth_call` （对于Conflux eSpace）进行调用：这种类型的合约调用只在 EVM 中执行，但实际上不会改变状态。 这通常用于调用只读合约函数或模拟执行交易以查看它是否能成功执行。
- 发送交易：这种类型的合约调用在执行时会改变合约状态。

调用合约时使用的数据是基于 ABI 描述的函数信息通过 [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) 编码生成的。 前4个字节是函数选择器（函数签名的 `Keccak (SHA-3)` 哈希的前4个字节），第五个字节开始是 ABI 编码的参数。

我们将使用 `js-conflux-sdk` 在 Core Space 上演示：

```javascript
const { Conflux } = require("js-conflux-sdk");

(async function () {
    const cfx = await Conflux.create({ url: "https://test.confluxrpc.com", logger: console })
    const me = cfx.wallet.addPrivateKey("0x2139FB4C55CB9AF7F0086CD800962C2E9013E2292BAE77978A9209E3BEE71D49")

    const abi = [...]
    const contract = cfx.Contract({ address: "CFXTEST:TYPE.CONTRACT:ACCYSPEUUR469BCA0EXRFXKXMKX651W45JFW2RN5M0", abi })
    let myBalance = await contract.balanceOf(me.address)
    console.log("my cupcake balance :", myBalance)

    const receipt = await contract.purchase(2).sendTransaction({ from: me.address, value: 2e18 }).executed()
    console.log("purchase receipt", receipt)

    const event = contract.abi.decodeLog(receipt.logs[0])
    console.log("purchase event:", event)

    myBalance = await contract.balanceOf(me.address)
    console.log("after purchase, my cupcake balance :", myBalance)
})()
```

从日志中，我们可以看到 `contract.cupcakeBalances(me.address)` 的相应 RPC 信息如下。

```bash
{
  data: {
    jsonrpc: '2.0',
    id: '1794b9e755639b5164925a8e',
    method: 'cfx_call',
    params: [
      {
        to: 'CFXTEST:TYPE.CONTRACT:ACCYSPEUUR469BCA0EXRFXKXMKX651W45JFW2RN5M0',
        data: '0xe18a7b9200000000000000000000000019f4bcf113e0b896d9b34294fd3da86b4adf0302'
      },
      undefined
    ]
  },
  result: '0x0000000000000000000000000000000000000000000000000000000000000000',
  duration: 33
}
```

rpc 方法为 `cfx_call`，数据是 `函数选择器加上参数列表的 ABI 编码结果`。 前4个字节 `0xe18a7b92` 是函数 `balanceOf` 的函数选择器。 该计算对balanceOf的签名`balanceOf(address)`执行keccak操作`keccak256("balanceOf(address)")`，然后取其前4个字节。 `00000000000000000000000019f4bcf113e0b896d9b34294fd3da86b4adf0302`是参数 `0x19f4bcf113e0b896d9b34294fd3da86b4adf0302` 的 ABI 编码值。

返回的值是 `0x0000000000000000000000000000000000000000000000000000000000000000`，这是类型为 uint256 的 ABI 编码值 0 的结果。

购买的RPC方法是`cfx_sendRawTransaction`，即发送交易。 这将改变合约的状态。 交易数据的编码方法也是 `函数选择器加上参数列表的 ABI 编码结果`。 您可以通过 `getTransactionByHash` 检查这一点。

```bash
{
  "jsonrpc": "2.0",
  "result": {
    "data": "0xefef39a10000000000000000000000000000000000000000000000000000000000000002",
    "hash": "0x2c188c67247d7e2bf12fb96f17ced61da8ea4143447887a10a2cc597c1fa66e1",
    "to": "CFXTEST:TYPE.CONTRACT:ACCYSPEUUR469BCA0EXRFXKXMKX651W45JFW2RN5M0",
    "value": "0x1bc16d674ec80000"
    ...
  },
  "id": 1
}
```

我们可以从`交易收据`的 `logs` 字段看到一条记录。 `logs` 显示了交易中发生的事件。

```bash
purchase receipt {
  blockHash: '0x3d4111b299e65c279184aa83021e59f9d134baa9c78969dd6d94a92bfbd340df',
  contractCreated: null,
  epochNumber: 27677382,
  from: 'CFXTEST:TYPE.USER:AAP9KTHVCTUNVF030RBKK9K7ZBZYZ12DAJP1U3SP4G',
  ......
  logs: [
    {
      address: 'CFXTEST:TYPE.CONTRACT:ACCYSPEUUR469BCA0EXRFXKXMKX651W45JFW2RN5M0',
      data: '0x00000000000000000000000019f4bcf113e0b896d9b34294fd3da86b4adf03020000000000000000000000000000000000000000000000000000000000000002',
      topics: [Array]
    }
  ],
}
```

分析结果表明：

发生了一次`购买`事件，顾客是 `cfxtest:aap9kthvctunvf030rbkk9k7zbzyz12dajp1u3sp4g`，数量是 2。

`购买`完成后，`cupcakeBalances[0x19f4bcf113e0b896d9b34294fd3da86b4adf0302]` 从 0 变为 2。 状态已改变。

```bash
{
  data: {
    jsonrpc: '2.0',
    id: '179a19eb98ed23dda1d1d516',
    method: 'cfx_call',
    params: [ [Object], undefined ]
  },
  result: '0x0000000000000000000000000000000000000000000000000000000000000002',
  duration: 30
}
```

> 注意：在 Conflux Core 上部署或调用合约时，如果在合约中占用了新的存储空间，一些 CFX 将会作为占用空间的抵押；当存储被释放后，CFX 将被退还。 欲了解更多信息，请访问 [Conflux Core 的存储抵押机制](https://juejin.cn/post/6855551378123653127)。

## Dev spaces

记住，在 Conflux 网络上开发并部署你的智能合约时，您必须选择两个 [Conflux 空间](../../commanflux-basics/spaces.md) 中的一个：

- Conflux Core
- Conflux eSpace.

Conflux eSpace是 100% 与 EVM 生态兼容的，您可以使用像 [Remix](https://remix.eferum)、[Hardat](https://hardhat.org/)、[MetaMask](https://metamask.io/) 这样的工具，以及像 [Unifra](https://unifra.io/) 这样的服务。

## 视频内容

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>

  <TabItem value="introduction" label="Introduction to Smart Contracts">
<iframe width="560" height="315" src="https://www.youtube.com/embed/Xx_qMo09-QY?si=BIfL7ZsUsIuFwQIx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>

</Tabs>

## 其他资源

除了 Solidity，您也可以使用 Vyper 来开发智能合约。

- [Solidity](https://docs.soliditylang.org/en/latest/)
- [Vyper](https://vyper.readthedocs.io/en/stable/)

其他

- [Conflux Basics](../category/conflux-basics/)
- [Ethereum's introduction of smart contract](https://ethereum.org/en/developers/docs/smart-contracts/)
