---
sidebar_position: 2
title: SponsorWhitelistControl
---

## Overview

Conflux implements a sponsorship mechanism to subsidize the usage of smart contracts. Thus, a new account with zero balance is able to call smart contracts as long as the execution is sponsored (usually by the operator of Dapps). The built-in SponsorControl contract is introduced to record the sponsorship information of smart contracts. 

When a message call happens, Conflux does not check sponsorship again. For example, if normal address `A` calls contract `B` and contract `B` calls contract `C`, Conflux only checks whether address `A` is sponsored by contract `B`. If `A` is sponsored, `B` will afford all the gas and/or collateral during the transaction execution, including the message call from `B` to `C`. In other words, only a transaction sender could be sponsored.  

The **SponsorControl** contract keeps the following information for each user-established contract:
+ `sponsor_for_gas`: this is the account that provides the subsidy for gas consumption;
+ `sponsor_for_collateral`: this is the account that provides the subsidy for collateral for storage;
+ `sponsor_balance_for_gas`: this is the balance of subsidy available for gas consumption;
+ `sponsor_balance_for_collateral`: this is the balance of subsidy available for collateral for storage;
+ `sponsor_limit_for_gas_fee`: this is the upper bound for the gas fee subsidy paid for every sponsored transaction;
+ `whitelist`: this is the list of normal accounts that are eligible for the subsidy, where a special all-zero address refers to all normal accounts. Only the contract itself and the admin have the authority to change this list.

There are two resources that can be sponsored: gas consumption and storage collateral.

+ *For gas consumption*: If a transaction calls a contract with non-empty `sponsor_for_gas` and the sender is in the `whitelist` of the contract and the gas fee specified by the transaction is within the `sponsor_limit_for_gas_fee`, the gas consumption of the transaction is paid from the `sponsor_balance_for_gas` of the contract (if it is sufficient) rather than from the sender’s balance, and the execution of the transaction would fail if the `sponsor_balance_for_gas` cannot afford the gas consumption. Otherwise, the sender should pay for the gas consumption.
+ *For storage collateral*: If a transaction calls a contract with non-empty `sponsor_for_collateral` and the sender is in the `whitelist` of the contract,  the collateral for storage incurred in the execution of the transaction is deducted from `sponsor_balance_for_collateral` of the contract, and the owner of those modified storage entries is set to the contract address accordingly. Otherwise, the sender should pay for the collateral for storage incurred in the execution.

When a contract is created, its `sponsor_for_gas` and `sponsor_for_collateral` will be initialized by zero address, and the sponsor balance will be initialized by 0. Both sponsorship for gas and for collateral can be updated by calling the SponsorControl contract. The current sponsor can call this contract to transfer funds to increase the sponsor balances directly, and the current sponsor for gas is also allowed to increase the `sponsor_limit_for_gas_fee` without transferring new funds. Other normal accounts can replace the current sponsor by calling this contract and providing more funds for sponsorship.

## Sponsorship Replacement

To replace the `sponsor_for_gas` of a contract, the new sponsor should call function `setSponsorForGas(address contractAddr, uint upperBound)` and transfer to the internal contract a fund. The following conditions are required to replace sponsor for gas:

1. The transferred fund should more than the current `sponsor_balance_for_gas` of the contract.
2. The new value for `sponsor_limit_for_gas_fee` (specified the `upperBound` parameter) should be no less than the old sponsor’s limit unless the old `sponsor_balance_for_gas` cannot afford the old `sponsor_limit_for_gas_fee`.
3. The transferred fund should be >= 1000 times of the new limit, so that it is sufficient to subsidize at least `1000` transactions calling the contract.

If the above conditions are satisfied, the remaining `sponsor_balance_for_gas` will be refunded to the old `sponsor_for_gas`, and the fund transferred to the internal contract will be added to the `sponsor_balance_for_gas` of the contract. Then the `sponsor_for_gas` and `sponsor_limit_for_gas_fee` will be updated according to the new sponsor’s specification. Otherwise, an exception will be triggered. 

The replacement of `sponsor_for_collateral` is similar except that there is no analog of the limit for gas fee. The function is `setSponsorForCollateral(address contractAddr)`. The new sponsor should transfer a fund more than the fund provided by the current sponsor for collateral of the contract. Then the current `sponsor_for_collateral` will be fully refunded, i.e. the sum of `sponsor_balance_for_collateral` and the total collateral for storage used by the contract, and both collateral sponsorship fields are changed as the new sponsor’s request accordingly. 

Conflux also allows a contract account to be a sponsor. 

## Add Sponsor Balance  

The sponsor can provide additional sponsor balance without sponsorship replacement. In this case, the sponsor should also interact with function `setSponsorForGas(address contractAddr, uint upperBound)` or `setSponsorForCollateral(address contractAddr)`, and meet all the requirements except condition 1. If requirements are satisfied, the transferred fund will be added to sponsor balance and the `sponsor_limit_for_gas_fee` will be updated accordingly.

## Whitelist maintenance

Only the contract itself or contract admin can update the contract whitelist. The sponsors have no rights for changing whitelist. 

A contract can call function `addPrivilege(address[] memory)` to any addresses to the whitelist. It means that if the `sponsor_for_gas` is set, the contract will pay the gas fee for the accounts in the whitelist, and if the `sponsor_for_collateral` is set, the contract will pay the CFS (collateral for storage) for the accounts in the whitelist. The zero address is a special address `0x0000000000000000000000000000000000000000`. If this address is added to whitelist, all the transactions calling this contract will be sponsored. A contract can call this function `removePrivilege(address[] memory)` to remove some normal account address from the whitelist. Remove a non-existent address will not cause an error or exception. 

**Corner cases:**
1. A contract address can also be added to the whitelist, but it is meaningless because only the transaction sender could be sponsored. 

The admin of a contract can use the interfaces `addPrivilegeByAdmin(address contractAddr, address[] memory addresses)` and `removePrivilegeByAdmin(address contractAddr, address[] memory addresses)` to maintain the whitelist.

## Examples

Suppose you have a simple contract like this.
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

After deploying the contract and the address is `contract_addr`, if someone wants to sponsor the gas consumption, he/she can send a transaction like below:
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

As for sponsor the storage collateral, you can simply replace the function `setSponsorForGas(contract_addr, your_upper_bound)` to `setSponsorForCollateral(contract_addr)`.

After that you can maintain the `whitelist` for your contract using `addPrivilege` and `removePrivilege`. The special address `0x0000000000000000000000000000000000000000` with all zeros means everyone is in the `whitelist`. You need to use it carefully.

```javascript
you_contract.add(white_list_addr).sendTransaction({
  from: account,
})

you_contract.remove(white_list_addr).sendTransaction({
  from: account,
})
```

After that the accounts in `whiltelist` will pay nothing while calling `you_contract.foo()` or `you_contract.par_add(1, 10)`.
