---
sidebar_position: 2
title: SponsorWhitelistControl
displayed_sidebar: coreSidebar
---

Conflux实现了赞助机制，来补贴智能合约的使用。 这允许余额为零的新账户调用智能合约，前提是执行操作得到赞助（通常由Dapp运营者提供）。 内部的 `SponsorWhitelistControl` 合约记录了智能合约的赞助信息。

## 接口

SponsorWhitelistControl 合约的十六进制地址是 `0x0888000000000000000000000000000000000001`, 接口是:

```js
pragma solidity >=0.4.15;

contract SponsorWhitelistControl {
    /*** Query Functions ***/
    /**
     * @dev get gas sponsor address of specific contract
     * @param contractAddr The address of the sponsored contract
     */
    function getSponsorForGas(address contractAddr) public view returns (address) {}

    /**
     * @dev get current Sponsored Balance for gas
     * @param contractAddr The address of the sponsored contract
     */
    function getSponsoredBalanceForGas(address contractAddr) public view returns (uint256) {}

    /**
     * @dev get current Sponsored Gas fee upper bound
     * @param contractAddr The address of the sponsored contract
     */
    function getSponsoredGasFeeUpperBound(address contractAddr) public view returns (uint256) {}

    /**
     * @dev get collateral sponsor address
     * @param contractAddr The address of the sponsored contract
     */
    function getSponsorForCollateral(address contractAddr) public view returns (address) {}

    /**
     * @dev get current Sponsored Balance for collateral
     * @param contractAddr The address of the sponsored contract
     */
    function getSponsoredBalanceForCollateral(address contractAddr) public view returns (uint256) {}

    /**
     * @dev check if a user is in a contract's whitelist
     * @param contractAddr The address of the sponsored contract
     * @param user The address of contract user
     */
    function isWhitelisted(address contractAddr, address user) public view returns (bool) {}

    /**
     * @dev check if all users are in a contract's whitelist
     * @param contractAddr The address of the sponsored contract
     */
    function isAllWhitelisted(address contractAddr) public view returns (bool) {}

    /*** for contract admin only **/
    /**
     * @dev contract admin add user to whitelist
     * @param contractAddr The address of the sponsored contract
     * @param addresses The user address array
     */
    function addPrivilegeByAdmin(address contractAddr, address[] memory addresses) public {}

    /**
     * @dev contract admin remove user from whitelist
     * @param contractAddr The address of the sponsored contract
     * @param addresses The user address array
     */
    function removePrivilegeByAdmin(address contractAddr, address[] memory addresses) public {}

    // ------------------------------------------------------------------------
    // Someone will sponsor the gas cost for contract `contractAddr` with an
    // `upper_bound` for a single transaction.
    // ------------------------------------------------------------------------
    function setSponsorForGas(address contractAddr, uint upperBound) public payable {}

    // ------------------------------------------------------------------------
    // Someone will sponsor the storage collateral for contract `contractAddr`.
    // ------------------------------------------------------------------------
    function setSponsorForCollateral(address contractAddr) public payable {}

    // ------------------------------------------------------------------------
    // Add commission privilege for address `user` to some contract.
    // ------------------------------------------------------------------------
    function addPrivilege(address[] memory) public {}

    // ------------------------------------------------------------------------
    // 从一些合约的地址`user`中移除佣金特权。
    // ------------------------------------------------------------------------
    function removePrivilege(address[] memory) public {}

    /**
     * @dev get current available storage points for collateral (activated after CIP-118)
     * @param contractAddr The address of the sponsored contract
     */
    function getAvailableStoragePoints(address contractAddr) public view returns (uint256) {}
}
```

## 如何赞助智能合约

`SponsorWhitelistControl` 为每个用户建立的合约维护一个白名单，包含有资格获得补贴的账户。 首先，应该使用 `addPrivilege(address[] memory)` 或 `addPrivilegeByAdmin(address contractAddr, address[] memory addresses)` 将合格账户添加到白名单中。 值得一提的是，如果将**零地址**添加到白名单，那么任何账户都将有资格获得补贴。

有两种资源可以被赞助：gas消耗和存储抵押。 这两种资源可以通过 `payable` 接口 `setSponsorForGas(address contractAddr, uint upperBound)` 和 `setSponsorForCollateral(address contractAddr)` 分别进行赞助。

:::note

`upperBound`（单位：Drip）设置了每笔交易的赞助上限。 交易发送的价值应不低于1000 * `upperBound`。

:::

### 示例

假定您有一个测试合约需要赞助：

```js
pragma solidity >=0.8.0;

import "https://github.com/Conflux-Chain/conflux-rust/blob/master/internal_contract/contracts/SponsorWhitelistControl.sol";

contract CommissionPrivilegeTest {
    mapping(uint => uint) public ss;

    function add(address account) public {
        SponsorWhitelistControl cpc = SponsorWhitelistControl(0x0888000000000000000000000000000000000001);
        address[] memory a = new address[](1);
        a[0] = account;
        cpc.addPrivilege(a);
    }

    function remove(address account) public {
        SponsorWhitelistControl cpc = SponsorWhitelistControl(0x0888000000000000000000000000000000000001);
        address[] memory a = new address[](1);
        a[0] = account;
        cpc.removePrivilege(a);
    }

    function par_add(uint start, uint end) public {
        for (uint i = start; i < end; i++) {
            ss[i] = 1;
        }
    }
}
```

提供的示例说明了如何部署和赞助测试合约。

```javascript
"use strict"
const { Conflux, Drip } = require("js-conflux-sdk")
// you need to change the path to the compiled contract
const { abi, bytecode } = require("path/to/CommissionPrivilegeTest.json");

async function main() {
  // your secret key to deploy contract
  // testnet token can be claimed at https://faucet.confluxnetwork.org/
  const PRIVATE_KEY = '0x......';
  const cfx = new Conflux({
    url: 'https://test.confluxrpc.com',
    // logger: console,
    networkId: 1,
  });
  const account = cfx.wallet.addPrivateKey(PRIVATE_KEY); // create account instance
  const randomAccount = cfx.wallet.addRandom() // a random account with no cfx
  const testContract = cfx.Contract({
    abi,
    bytecode
  })

  const contract_addr = (await testContract.constructor().sendTransaction({
    from: account.address
  }).executed()).contractCreated
  console.log(`contract deployed at ${contract_addr}`)

  testContract.address = contract_addr
  await testContract.add(randomAccount.address).sendTransaction({
    from: account.address
  }).executed()
  console.log(`random address ${randomAccount.address} added to whitelist`)

  const sponsor_contract = cfx.InternalContract('SponsorWhitelistControl');

  const upperBound = 10n**15n
  const upperBoundCfx = Drip(upperBound).toCFX()
  const gasSponsorVal = 10n**18n
  const storageSponsorVal = 10n ** 18n
  if( gasSponsorVal < upperBound * 1000n ) {
    throw new Error(`gas sponsor value should be greater than 1000 * upperBound`)
  }
  await sponsor_contract.setSponsorForGas(contract_addr, upperBound).sendTransaction({
    from: account,
    value: gasSponsorVal
  }).executed();
  console.log(`Gas is sponsored with upper bound ${upperBound} Drip (${upperBoundCfx} CFX)`)
  await sponsor_contract.setSponsorForCollateral(contract_addr).sendTransaction({
    from: account,
    value: storageSponsorVal
  }).executed();
  console.log("Storage collateral is sponsored")

  const receipt = await testContract.par_add(1, 3).sendTransaction({
    from: randomAccount.address
  }).executed()
  console.log(`${receipt.transactionHash} is sent`)
  console.log(`gas and storage covered by sponsor: ${receipt.gasCoveredBySponsor && receipt.storageCoveredBySponsor}`)
}

main().catch(
  console.error
)
```

提供的示例说明了如何部署和赞助测试合约。 代码分为五个主要部分：

- 设置Conflux实例和账户
- 部署智能合约
- 与已部署合约进行交互
- 赞助Gas和存储
- 发送Gas和存储被赞助的交易

1. **设置Conflux实例和账户**：

    ```javascript
    const PRIVATE_KEY = '0x......';
    const cfx = new Conflux({
      url: 'https://test.confluxrpc.com',
      networkId: 1,
    });
    const account = cfx.wallet.addPrivateKey(PRIVATE_KEY);
    const randomAccount = cfx.wallet.addRandom();
    ```

    - `PRIVATE_KEY`：用户私钥的占位符。 这对于部署合约和发送交易至关重要。 **您需要用您自己的私钥替换这个值，并且确保有足够的 CFX**
    - `account`：使用提供的私钥创建的账户实例。 将用于部署合约。
    - `randomAccount`：一个新的随机账户实例。 这个账户默认没有任何CFX（Conflux的原生货币）。

2. **部署智能合约**：

    ```javascript
    const testContract = cfx.Contract({
      abi,
      bytecode
    });
    const contract_addr = (await testContract.constructor().sendTransaction({
      from: account.address
    }).executed()).contractCreated;
    console.log(`contract deployed at ${contract_addr}`);
    ```

    - `testContract`：使用ABI和字节码创建的新合约实例。

3. **与已部署合约进行交互**：

    ```javascript
    testContract.address = contract_addr;
    await testContract.add(randomAccount.address).sendTransaction({
      from: account.address
    }).executed();
    console.log(`random address ${randomAccount.address} added to whitelist`);
    ```

    - 将部署合约的地址设置给`testContract`实例。
    - 向合约发送交易，将随机账户的地址添加到白名单中。

4. **赞助Gas和存储**：

    ```javascript
    const sponsor_contract = cfx.InternalContract('SponsorWhitelistControl');
    const upperBound = 10n**15n;
    const upperBoundCfx = Drip(upperbound).toCFX();
    const gasSponsorVal = 10n**18n;
    const storageSponsorVal = 10n ** 18n;
    if( gasSponsorVal < upperBound * 1000n ) {
      throw new Error(`gas sponsor value should be greater than 1000 * upperBound`);
    }
    await sponsor_contract.setSponsorForGas(contract_addr, upperBound).sendTransaction({
      from: account,
      value: gasSponsorVal
    }).executed();
    console.log(`Gas is sponsored with upper bound ${upperBound} Drip (${upperBoundCfx} CFX)`);
    await sponsor_contract.setSponsorForCollateral(contract_addr).sendTransaction({
      from: account,
      value: storageSponsorVal
    }).executed();
    console.log("Storage collateral is sponsored");
    ```

    - 代码设置了gas赞助的上限，并计算其等值的CFX。 确保如果gas赞助值至少是上限的1000倍。 如果不是，抛出错误。 这是`SponsorWhitelistControl`接口的要求）
    - 然后，代码为部署的合约赞助gas和存储。 这意味着与合约交互的用户无需支付gas或存储费用，因为这些费用由赞助方承担。

5. **发送Gas和存储被赞助的交易**：

    ```javascript
    const receipt = await testContract.par_add(1, 3).sendTransaction({
      from: randomAccount.address
    }).executed();
    console.log(`${receipt.transactionHash} is sent`);
    console.log(`gas and storage covered by sponsor: ${receipt.gasCoveredBySponsor && receipt.storageCoveredBySponsor}`);
    ```

    - 向合约发送交易，调用`par_add`函数，参数为`1`和`3`。
    - 记录交易的哈希值以及其gas和存储是否通过交易收据被赞助方支付。

## 规范

Conflux为每个用户建立的合约保留以下信息：

- `sponsor_for_gas`：为gas消耗提供补贴的账户，可通过`SponsorWhitelistControl`或`getSponsorInfo` RPC访问；
- `sponsor_for_collateral`：为存储抵押提供补贴的账户，可通过`SponsorWhitelistControl`或`getSponsorInfo` RPC访问；
- `sponsor_balance_for_gas`：用于gas消耗的补贴余额，可通过`SponsorWhitelistControl`或`getSponsorInfo RPC`访问；
- `sponsor_balance_for_collateral`：用于存储抵押的 *可退款* 赞助余额，可以通过 `SponsorWhitelistControl` 或 `getSponsorInfo` RPC访问。
- `availableStoragePoints`: 用于存储抵押的可用存储点，可以通过 `SponsorWhitelistControl` 或 `getSponsorInfo` RPC访问；
- `usedStoragePoints`: 用于存储抵押的已使用存储点，能且只能通过 `getSponsorInfo` RPC 访问；
- `sponsor_limit_for_gas_fee` : 这是为每个受赞助的交易支付的燃气费补贴的上限，可以通过 `SponsorWhitelistControl` 或 `getSponsorInfo RPC` 访问；
- `whitelist`: 这是有资格获得补贴的普通账户列表，其中一个特殊的全零地址指代所有普通账户。 只有合约本身和管理员有权更改这个列表。 白名单的元素不能直接访问，而是通过 `SponsorWhitelistControl` 的 `isWhitelisted` 接口来判断一个地址是否在白名单中。

有两种资源可以被赞助：gas消耗和存储抵押。

- 如果交易调用了一个有非空 `sponsor_for_gas` 的合约，且发送者在合约的 `白名单` 中，且交易指定的燃气费在 `sponsor_limit_for_gas_fee` 内，则交易的燃气消耗从合约的 `sponsor_balance_for_gas` 支付（如果足够），而不是从发送者的余额中支付。 否则，发送者应该支付gas消耗。
- *For storage collateral*如果交易调用了一个有非空 `available_storage_points` 或 `sponsor_for_collateral` 的合约，且发送者在合约的 `白名单` 中，则在执行交易过程中产生的存储抵押从合约的 `sponsor_for_collateral` （优先）或 `available_storage_points` 中扣除，且这些被修改的存储条目的所有者相应地设置为合约地址。 否则，发送者应该支付交易执行过程中产生的存储抵押。

当消息调用发生时，Conflux不会重新检查赞助。 例如，如果普通地址 `A` 调用合约 `B` ，合约 `B` 调用合约`C` ，Conflux 只会检查地址 `A` 是否得到合约 `B` 的赞助。 如果`A`被赞助，`B`将承担交易执行过程中的所有gas和/或存储抵押，包括从`B`到`C`的消息调用。 换句话说，只有一个交易发送者才能被赞助。

### 存储点

[CIP-107](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-107.md) 引入了存储点的概念，以改善Conflux的代币经济。

当赞助者为合约增加存储抵押时，一部分的CFX代币将被销毁，并相应地铸造出"存储点"。 "存储点"不能转移，也不会产生存储利息。 但它可以像CFX代币一样支付存储抵押。

存储点系统旨在对代币经济产生最小影响。 合约赞助者主要关心支持其业务运营所需的代币数量，而通常不关心存储抵押的退款。

### `setSponsorForGas` 和 `setSponsorForCollateral` 的行为

当合约创建时，其 `sponsor_for_gas` 和 `sponsor_for_collateral` 将由零地址初始化，赞助余额和存储点将初始化为0。 通过调用 `SponsorWhitelistControl` 合约的 `setSponsorForGas` 和 `setSponsorForCollateral` ，可以更新gas和抵押的赞助。

然而，上述接口的行为在不同情况下有所不同。

#### 增加赞助余额

如果赞助从未设置过或当前赞助者就是该账户本身，账户可以提供赞助余额。 在这种情况下，赞助者应与函数 `setSponsorForGas(address contractAddr, uint upperBound)` 或 `setSponsorForCollateral(address contractAddr)` 进行交互。

- 对于 `setSponsorForGas(address contractAddr, uint upperBound)` ，如果满足以下要求，以drip为单位计算的转移价值将被添加到 `sponsor_balance_for_gas` ：
  - 新 `upperBound` 的值应不低于旧 `upperBound` ，除非当前 `sponsor_balance_for_gas` 负担不起旧 `sponsor_limit_for_gas_fee` 。 但如果赞助从未设置，这条规则将被忽略。
  - 此外，转移资金应不低于新限制的1000倍，这意味着赞助至少应支持1000次调用。
  - 以drip为单位计算的的转移价值将被添加到 `sponsor_balance_for_gas` 。
- 对于 `setSponsorForCollateral(address contractAddr)` ，没有额外要求。 提供的剩余CFX的 `p` 比例（即p * tx.value）将被烧毁并转换为 storage_points 。 剩余的部分( `(1-p) * tx.value` )将被加到 `sponsor_balance_for_collateral` （存储抵押的赞助余额）中。

#### 赞助替换

##### 燃气赞助替换

要替换合约的燃气赞助商，新的赞助商必须满足特定条件：

1. 转移的资金应该大于合约当前的`sponsor_balance_for_gas`。
2. 新的`sponsor_limit_for_gas_fee`（由`upperBound`参数指定）应该不低于旧赞助者的限制，除非旧的`sponsor_balance_for_gas`不能负担旧的`sponsor_limit_for_gas_fee`。
3. 转移的资金应该 >=新限制的1000倍，这样才能足以补贴至少`1000次`调用合约的交易。

如果满足以上条件，剩余的`sponsor_balance_for_gas`将退还给旧的`sponsor_for_gas`，而被转移到内部合约的资金将加到合约的`sponsor_balance_for_gas`中。 然后，根据新赞助者的指定，更新`sponsor_for_gas`和`sponsor_limit_for_gas_fee`。 否则，将触发一个异常。

##### 抵押赞助者替换

抵押赞助的替换类似但更为复杂，因为涉及到存储点。 由于一部分 CFX 会被燃烧，新的赞助商应转移的资金超过当前赞助商为合约的抵押提供的可退款 CFX，其中，

`可退款的存储抵押 = sponsor_balance_for_collateral + (collateral_for_storage - use_storage_points / 1024)`

赞助替换后，原赞助商将立即退还上述 CFX。 `collateral_for_storage` 指的是已赞助的存储抵押，可以通过 `cfx_getAccount RPC` 访问，参数为合约地址。

提供的剩余 CFX 的 `p` 比例部分将被燃烧并转换成存储点，其中，

```
剩余存储点
= p * (提供的剩余 CFX ) * 1024
= p * (tx.value - 之前的可退款抵押) * 1024
= p * (tx.value - (sponsor_balance_for_collateral + (collateral_for_storage - use_storage_points / 1024))) * 1024
```

### 白名单维护

只有合约本身或合约管理员可以更新合约的白名单。 赞助者没有修改白名单的权力。

一个合约可以调用函数`addPrivilege(address[] memory)`将任何地址添加到白名单中。 这意味着如果设置了`sponsor_for_gas`，合约将为白名单中的账户支付gas费用，如果设置了`sponsor_for_collateral`，合约将为白名单中的账户支付CFS（存储抵押）。 零地址是一个特殊的地址`0x0000000000000000000000000000000000000000`。 如果这个地址被添加到白名单中，所有调用这个合约的交易都将被赞助。 一个合约可以调用函数`removePrivilege(address[] memory)`从白名单中移除一些普通账户地址。 移除一个不存在的地址不会导致错误或异常。

**边界情况：**

1. 合约地址也能被添加到白名单列表中，但这个行为没有意义。因为只有交易的发送者才能被赞助。

合约的管理员可以使用接口`addPrivilegeByAdmin(address contractAddr, address[] memory addresses)`和`removePrivilegeByAdmin(address contractAddr, address[] memory addresses)`来维护白名单。
