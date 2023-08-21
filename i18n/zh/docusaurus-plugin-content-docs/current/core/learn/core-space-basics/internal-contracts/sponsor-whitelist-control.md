---
sidebar_position: 2
title: SponsorWhitelistControl
---

## 概览

Conflux实现了赞助机制，来补贴智能合约的使用。 因此，一个零余额的新账户只要得到赞助（通常是由Dapps的运营者提供），就能够调用智能合约。 Conflux 引入了内置的SponsorControl合约，用来记录智能合约的赞助信息。

当一个子调用（message call）发生时，Conflux不会再次检查赞助。 例如，如果普通地址`A`调用合约`B`，合约`B`调用合约`C`，Conflux只会检查地址`A`是否被合约`B`赞助。 如果`A`被赞助，`B`将承担交易执行过程中的所有gas和/或存储抵押，包括从`B`到`C`的消息调用。 换句话说，只有一个交易发送者才能被赞助。

**SponsorControl**合约为每个用户建立的合约保存以下信息：
+ `sponsor_for_gas`: 这是提供gas消耗补贴的账户；
+ `sponsor_for_collateral`: 这是提供存储抵押补贴的账户；
+ `sponsor_balance_for_gas`: 这是可用于gas消耗补贴的余额；
+ `sponsor_balance_for_collateral`: 这是可用于存储抵押补贴的余额；
+ `sponsor_limit_for_gas_fee`: 这是每个赞助交易支付的gas费用补贴的上限；
+ `whitelist`: 这是有资格获得补贴的普通账户列表，其中一个特殊的全零地址指代所有普通账户。 只有合约本身和管理员有权更改这个列表。

有两种资源可以被赞助：gas消耗和存储抵押。

+ *For gas consumption*: If a transaction calls a contract with non-empty `sponsor_for_gas` and the sender is in the `whitelist` of the contract and the gas fee specified by the transaction is within the `sponsor_limit_for_gas_fee`, the gas consumption of the transaction is paid from the `sponsor_balance_for_gas` of the contract (if it is sufficient) rather than from the sender’s balance. 否则，发送者应该支付gas消耗。
+ *对于存储抵押*：如果一个交易调用了一个`sponsor_for_collateral`非空的合约，并且发送者在合约的`whitelist`中，那么交易执行过程中产生的存储抵押将从合约的`sponsor_balance_for_collateral`中扣除，同时将那些被修改的存储条目的所有者设置为相应的合约地址。 否则，发送者应该支付交易执行过程中产生的存储抵押。

当一个合约被创建时，它的`sponsor_for_gas`和`sponsor_for_collateral`将被初始化为零地址，赞助余额将被初始化为0。 Gas和存储抵押的赞助都可以通过调用SponsorControl合约来更新。 当前的赞助者可以调用这个合约来转移资金，直接增加赞助余额，当前的gas赞助者也可以在不转移新资金的情况下增加`sponsor_limit_for_gas_fee`。 其他普通账户可以通过调用这个合约并提供更多的赞助资金来替换当前的赞助者。

## 赞助替换

要替换一个合约的`sponsor_for_gas`，新的赞助者应该调用函数`setSponsorForGas(address contractAddr, uint upperBound)`并向内部合约转移一笔资金。 替换gas赞助者需要满足以下条件：

1. 转移的资金应该大于合约当前的`sponsor_balance_for_gas`。
2. 新的`sponsor_limit_for_gas_fee`（由`upperBound`参数指定）应该不低于旧赞助者的限制，除非旧的`sponsor_balance_for_gas`不能负担旧的`sponsor_limit_for_gas_fee`。
3. 转移的资金应该 >=新限制的1000倍，这样才能足以补贴至少`1000次`调用合约的交易。

如果满足以上条件，剩余的`sponsor_balance_for_gas`将退还给旧的`sponsor_for_gas`，而被转移到内部合约的资金将加到合约的`sponsor_balance_for_gas`中。 然后，根据新赞助者的指定，更新`sponsor_for_gas`和`sponsor_limit_for_gas_fee`。 否则，将触发一个异常。

替换`sponsor_for_collateral`与此类似，只是没有gas费用限制的类似物。 函数是`setSponsorForCollateral(address contractAddr)`。 新的赞助者应该转移一笔大于当前赞助者为合约提供的存储抵押资金的资金。 然后，当前的`sponsor_for_collateral`将被全额退还，即`sponsor_balance_for_collateral`和合约使用的存储抵押总额之和，并相应地按照新赞助者的请求改变两个存储抵押赞助字段。

Conflux也允许一个合约账户成为一个赞助者。

## 增加赞助余额

赞助者可以在不替换赞助者的情况下提供额外的赞助余额。 在这种情况下，赞助者应该也要与函数`setSponsorForGas(address contractAddr, uint upperBound)`或`setSponsorForCollateral(address contractAddr)`交互，并满足所有的要求，除了条件1。 如果满足要求，转移的资金将被加到赞助余额中，`sponsor_limit_for_gas_fee`也将相应地更新。

## 白名单维护

只有合约本身或合约管理员可以更新合约的白名单。 赞助者没有权利改变白名单。

一个合约可以调用函数`addPrivilege(address[] memory)`将任何地址添加到白名单中。 这意味着如果设置了`sponsor_for_gas`，合约将为白名单中的账户支付gas费用，如果设置了`sponsor_for_collateral`，合约将为白名单中的账户支付CFS（存储抵押）。 零地址是一个特殊的地址`0x0000000000000000000000000000000000000000`。 如果这个地址被添加到白名单中，所有调用这个合约的交易都将被赞助。 一个合约可以调用函数`removePrivilege(address[] memory)`从白名单中移除一些普通账户地址。 移除一个不存在的地址不会导致错误或异常。

**边界情况：**
1. 一个合约地址也可以被添加到白名单中，但这是没有意义的，因为只有交易发送者才能被赞助。

合约的管理员可以使用接口`addPrivilegeByAdmin(address contractAddr, address[] memory addresses)`和`removePrivilegeByAdmin(address contractAddr, address[] memory addresses)`来维护白名单。

## 示例

比如说你有一个像这样的合约：
```solidity
pragma solidity >=0.4.15;

import "https://github.com/Conflux-Chain/conflux-rust/blob/master/internal_contract/contracts/SponsorWhitelistControl.sol";

contract CommissionPrivilegeTest {
    mapping(uint => uint) public ss;

    function add(address account) public payable {
        SponsorWhitelistControl cpc = SponsorWhitelistControl(0x0888000000000000000000000000000000000001);
        address[] memory a = new address[](1);
        a[0] = account;
        cpc.addPrivilege(a);
    }

    function remove(address account) public payable {
        SponsorWhitelistControl cpc = SponsorWhitelistControl(0x0888000000000000000000000000000000000001);
        address[] memory a = new address[](1);
        a[0] = account;
        cpc.removePrivilege(a);
    }

    function foo() public payable {
    }

    function par_add(uint start, uint end) public payable {
        for (uint i = start; i < end; i++) {
            ss[i] = 1;
        }
    }
}
```

部署合约后，如果地址是`contract_addr`，如果有人想赞助gas消耗，他/她可以发送一个像下面这样的交易：
```javascript
const PRIVATE_KEY = '0xxxxxxx';
const cfx = new Conflux({
  url: 'https://test.confluxrpc.com',
  logger: console,
  networkId: 1,
});
const account = cfx.wallet.addPrivateKey(PRIVATE_KEY); // create account instance

const sponsor_contract = cfx.InternalContract('SponsorWhitelistControl');
sponsor_contract.setSponsorForGas(contract_addr, your_upper_bound).sendTransaction({
  from: account,
  value: your_sponsor_value
}).confirmed();
```

至于赞助存储抵押，你可以简单地将函数`setSponsorForGas(contract_addr, your_upper_bound)`替换为`setSponsorForCollateral(contract_addr)`。

之后你可以使用`addPrivilege`和`removePrivilege`来维护你的合约的`whitelist`。 全零地址`0x0000000000000000000000000000000000000000`是一个特殊的地址，意味着每个人都在`whitelist`中。 你需要谨慎使用它。

```javascript
you_contract.add(white_list_addr).sendTransaction({
  from: account,
})

you_contract.remove(white_list_addr).sendTransaction({
  from: account,
})
```

之后，`whitelist`中的账户在调用`you_contract.foo()`或`you_contract.par_add(1, 10)`时将不用支付任何费用。
