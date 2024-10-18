---
sidebar_position: 1
title: Smart Contracts Development
displayed_sidebar: generalSidebar
keywords:
  - smart-contracts
  - Conflux-Network
  - Solidity
  - EVM
  - contract-development
  - vending-machine
  - bytecode
  - ABI
  - deployment
  - function-calls
  - gas-optimization
tags: [Smart Contracts, Tutorial]
---

## Introduction to Smart Contracts Development on Conflux Network

[**Smart contracts**](../../conflux-basics/contracts.md) are an essential component of the Conflux Network, offering a powerful way to automate and execute code on the blockchain. These self-executing contracts consist of code that automatically implements the terms of an agreement based on predefined rules. This introduction will explore the key concepts, functionalities, and potential applications of smart contracts within the Conflux ecosystem.

### Getting Started with Smart Contracts on Conflux
Developers can start by learning [**Solidity**](solidity-basics.md), understanding Conflux's unique features, and using tools like Conflux Studio for development and testing.

For more detailed information and resources on smart contracts within the Conflux Network, you can explore the following videos and resources:

## Example Vending Machine Smart Contract
Let's look at one of the simplest smart contract implementations of a vending machine.

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

This contract has two functions: method `refill` enables administrators to refill the products. Method `purchase` enables the customers to purchase products using CFX tokens. Just like how vending machines eliminate the need for salesmen, smart contracts can eliminate intermediaries in many industries.

The smart contract is a set of code (contract functions) and data (contract state variables). For the line `mapping (address => uint) public cupcakeBalances;` , it declares a state variable named cupcakeBalances with type `mapping (address => uint)`. You can see it as a table in the database. Meanwhile, the contract methods `refill` and `purchase` are used to read or modify the state of the data in that database table. Also this state variable is `public` and this means it's [public-accessible](https://docs.soliditylang.org/en/latest/cheatsheet.html#function-visibility-specifiers).

This contract is written in `solidity`, whose syntax is similar to `javascript`.

- `pragma solidity ^0.8.0;` indicates that this contract needs to be compiled with a `>=0.8.0<0.9.0` compiler.
- contract `VendingMachine` assigns the contract name as `VendingMachine` ;
- `address public owner;` defines a public state variable with the name `owner` and type `address`;
- `event Purchase(address customer, uint amount);` defines the `event` with the name `Purchase`. event is similar to the logging function in other languages. Its role is mainly to record some important information when the contract is executed. For example, `Purchase` is an event that generates a purchase record when a customer purchases an item.
- The `constructor` function is executed exactly once the contract is deployed.
- The `balanceOf` function marked with the `view` is a read-only function that can't be used to modify the contract state. All read-only functions must be declared as `view` or `pure` functions.
- `refill` function is an ordinary function, can be called by sending a transaction. This function will change the contract state.
- `require(msg.sender ==  owner, "Only the owner can refill");` indicates that only when the condition `msg.sender == owner` is fullfilled (that is, the caller is the contract admin), the state of contract variable `cupcakeBalances` can be modified to refill the products. If the condition is not fullfilled then a messaged will be returner (in this case `"Only the owner can refill"`) and the transaction will be reverted.
- `purchase` function includes a `payable`, indicating you can send CFX at the same time the function is called. Since customers need to pay CFX to purchase it's marked as a `payable` function.
- `require(msg.value >= amount 1 ether, "You must pay at least 1 CFX per cupcake")` indicates the full amount of CFX must be paid in order to complete the purchase. Otherwhise the function will be reverted and will return the `"You must pay at least 1 CFX per cupcake"` message.

>
> **Solidity has built-in literal Ether Units**
>
>A literal number can take a suffix of `wei`, `gwei` or `ether` to specify a subdenomination of Ether, where Ether numbers without a postfix are assumed to be Wei. In **Conflux 1 ether = 1 CFX**.
>
> - assert(1 wei == 1);
> - assert(1 gwei == 1e9);
> - assert(1 ether == 1e18);
>

- The number of products in the vending machine decreases after a successful purchase and the number of goods owned by the customers (indicated by `cupcakeBalances[msg.sender]`) increases.

After writing the smart contract, you need to compile it and then deploy it to the Conflux Network by sending a `transaction`. Then you can interact with the smart contract functions.

## Compilation

Smart contract compilation is the process of generating the elements required when deploying the contract from the contract code through the compiler. There are two main parts in the compilation result, `The Contract Application Binary Interface (abi)` and `bytecode`.

- Bytecode: Smart contracts are executed on the Ethereum Virtual Machine (EVM). The bytecode is the hexadecimal value corresponding to the smart contract that the EVM can recognize.
- ABI: ABI refers to the Application Binary Interface, which describes each function name, modifier, visibility, parameters name, and its type, returns value name and its type and description of events in the public interface of contract (in JSON format). When we call the contract function externally and encode it in a certain way based on the description of the function in the ABI, we can get a value that the EVM can recognize and display in hexadecimal format. You can use this value to interact with the smart contract.

You can use `solc`, or [hardhat](https://hardhat.org/) or [foundry](https://book.getfoundry.sh/) to compile the smart contract.

Here we take `solc` as example.

Install solc

```sh
npm install -g solc
```

> Attention: The compiler version needs to match the version specified in the contract. To download the v0.8.1 version, use `npm install -g solc@v0.8.1`

Compilation

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

## Deploy 

The smart contract deployment is creating a contract on the Conflux Network by sending a transaction with the `data` as `bytecode` and `to` left empty.

> If the constructor contains parameters, `data` should be a combination of `bytecode` and the ABI encoding of the `constructor`.

We will use `js-conflux-sdk` to demonstrate on Core Space:

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

As shown in the example above, the contract is deployed after sending a transaction with data as bytecode. The `contractCreated` field of the `transaction receipt` is the contract address after deployment.

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

> The example directly sending transaction for demonstration purpose. If the contract constructor contains parameters, a better way is to use smart contract development tools as [hardhat](https://hardhat.org/) and [hardhat-conflux](https://github.com/conflux-chain/hardhat-conflux) (for Core Space) and [hardhat](https://hardhat.org/) (for eSpace) to develop, compile and deploy process.

## Calling smart contract functions

After the contract is deployed you can interact with the functions. There are two ways:

- Calling through the RPC `cfx_call` (for Conflux Core) or `eth_call` (for Conflux eSpace): this type of contract calling is only executed in the EVM but does not actually change the state. This is usually used to call read-only contract functions or to simulate the execution of a transaction to see if it can be executed successfully.
- Sending a transaction: this type of contract calling will change the contract state when executed.

The data used when calling the contract is generated by [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) encoding based on the function information described by the ABI. The first 4 bytes are the function selector (the first 4 bytes of the `Keccak (SHA-3)` hash of the function signature), and the fifth byte starts with the ABI-encoded parameter.

We will use js-conflux-sdk to demonstrate.

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

From the log, we can see that the corresponding RPC information of `contract.cupcakeBalances(me.address)` is as follows.

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

rpc method is `cfx_call`, data is the result of `function selector + ABI-encoded result of parameter list`. The first 4 bytes `0xe18a7b92` is the function selector of function `balanceOf`. The calculation takes keccak operation `keccak256("balanceOf(address)")` on the signature `balanceOf(address)` of `balanceOf` and then takes the first 4 bytes. `00000000000000000000000019f4bcf113e0b896d9b34294fd3da86b4adf0302` is the ABI-encoded value of paramter `0x19f4bcf113e0b896d9b34294fd3da86b4adf0302`.

The returned value is `0x0000000000000000000000000000000000000000000000000000000000000000` wich is the result of ABI-encoded value 0 with the `uint256` type.

The RPC method for purchase is `cfx_sendRawTransaction`, which is sending transaction. This will change the state of the contract. The encoding method for the transaction's data is also `function selector + ABI-encoded result of parameter list`. You can check this through `getTransactionByHash`.

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

We can see a record from the `logs` field of `transaction receipt`. `logs` indicate the event that happened in the transaction.

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

When analysing the result:

It indicates that one `Purchase` event happened, customer is `cfxtest:aap9kthvctunvf030rbkk9k7zbzyz12dajp1u3sp4g`, quantity is 2.

After `purchase` is complete, `cupcakeBalances[0x19f4bcf113e0b896d9b34294fd3da86b4adf0302]` changed from 0 to 2. State has changed.

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

> Attention: When deploying or calling contracts on the Conflux Core, if new storage space is occupied in the contract, some CFX will be collateralized for the occupied space; this will be refunded after the storage is released. For more information, please visit [storage collateral mechanism of Conflux Core](https://juejin.cn/post/6855551378123653127).

## Dev spaces 

Remember that when developing your smart contract and deploying it on the Conflux network you must select one of the two development [Conflux spaces](../../conflux-basics/spaces.md): 

- Conflux Core
- Conflux eSpace.

Conflux eSpace is 100% compatible with the EVM ecosystem and you can use tools like [Remix](https://remix.ethereum.org/), [Hardat](https://hardhat.org/), [MetaMask](https://metamask.io/) and services like [Unifra](https://unifra.io/).


## Video Content

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs>

  <TabItem value="introduction" label="Introduction to Smart Contracts">
<iframe width="560" height="315" src="https://www.youtube.com/embed/Xx_qMo09-QY?si=BIfL7ZsUsIuFwQIx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>

</Tabs>


## Additional resources

In addition to Solidity you can use also Vyper for developing smart contracts.

- [Solidity](https://docs.soliditylang.org/en/latest/)
- [Vyper](https://vyper.readthedocs.io/en/stable/)

Other

- [Conflux Basics](../../conflux-basics/conflux-basics.mdx)
- [Ethereum's introduction of smart contract](https://ethereum.org/en/developers/docs/smart-contracts/)
