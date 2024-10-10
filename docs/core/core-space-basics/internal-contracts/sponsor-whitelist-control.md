---
sidebar_position: 2
title: SponsorWhitelistControl
tags:
    - Transaction Encoding
    - RLP Serialization
    - Transaction Fields
    - Keccak256 Hash
    - ECDSA Signing
    - Raw Transaction
    - Transaction Signature
    - Hex Encoding
displayed_sidebar: coreSidebar
---

Conflux implements a sponsorship mechanism to subsidize the usage of smart contracts. This allows a new account with a zero balance to call smart contracts, provided the execution is sponsored (usually by the operator of Dapps). The internal `SponsorWhitelistControl` contract records the sponsorship information for smart contracts.

## Interface

SponsorWhitelistControl's hex40 address is `0x0888000000000000000000000000000000000001`, with interface:

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
    // Remove commission privilege for address `user` from some contract.
    // ------------------------------------------------------------------------
    function removePrivilege(address[] memory) public {}

    /**
     * @dev get current available storage points for collateral (activated after CIP-118)
     * @param contractAddr The address of the sponsored contract
     */
    function getAvailableStoragePoints(address contractAddr) public view returns (uint256) {}
}
```

## How to Sponsor a Contract

`SponsorWhitelistControl` maintains a whitelist for each user-established contract containing accounts eligible for the subsidy. First and foremost, eligible accounts should be added into the whitelist using `addPrivilege(address[] memory)` or `addPrivilegeByAdmin(address contractAddr, address[] memory addresses)`. Specially, if a **zero address** is added to the whitelist, any account will become eligible for subsidy.

There are two resources that can be sponsored: gas consumption and storage collateral. The two resources can be sponsored separately through `payable` interfaces `setSponsorForGas(address contractAddr, uint upperBound)` and `setSponsorForCollateral(address contractAddr)`.The paid CFX will be used for future gas or storage collateral sponsorship.

:::note

The `upperBound` (unit: Drip) sets the sponsor upper bound of each transaction. And the value sent by transaction should be no less than 1000 * `upperBound`.

:::

### Example

Suppose you have the provided test contract needs sponsorship:

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

The following javascript code shows how to deploy and sponsor the provided test contract.

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

The example provided illustrates how to deploy and sponsor a test contract. The code is divided into five main sections:

- Setting Up Conflux Instance and Accounts
- Deploying the Smart Contract
- Interacting with the Deployed Contract
- Sponsoring Gas and Storage
- Sending a Transaction whose Gas and Storage are Sponsored

1. **Setting Up Conflux Instance and Accounts**:

    ```javascript
    const PRIVATE_KEY = '0x......';
    const cfx = new Conflux({
      url: 'https://test.confluxrpc.com',
      networkId: 1,
    });
    const account = cfx.wallet.addPrivateKey(PRIVATE_KEY);
    const randomAccount = cfx.wallet.addRandom();
    ```

    - `PRIVATE_KEY`: A placeholder for the private key of the user. This is essential for deploying contracts and sending transactions. **You need to replace this value with your own private key with enough CFX**
    - `account`: An account instance created using the provided private key. Will be used to deploy contract.
    - `randomAccount`: A new random account instance. This account doesn't have any CFX (Conflux's native currency) by default.

2. **Deploying the Smart Contract**:

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

    - `testContract`: A new contract instance is created using the ABI and bytecode.

3. **Interacting with the Deployed Contract**:

    ```javascript
    testContract.address = contract_addr;
    await testContract.add(randomAccount.address).sendTransaction({
      from: account.address
    }).executed();
    console.log(`random address ${randomAccount.address} added to whitelist`);
    ```

    - The address of the deployed contract is set to the `testContract` instance.
    - A transaction is sent to the contract to add the random account's address to a whitelist.

4. **Sponsoring Gas and Storage**:

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

    - The code sets an upper bound for gas sponsorship and calculates its equivalent in CFX. It makes sure if the gas sponsorship value is at least 1000 times the upper bound. If not, an error is thrown. (This is the requirement of the `SponsorWhitelistControl` interface)
    - The code then sponsors gas and storage for the deployed contract. This means users interacting with the contract won't have to pay for gas or storage, as it's covered by the sponsor.

5. **Sending a Transaction whose Gas and Storage are Sponsored**:

    ```javascript
    const receipt = await testContract.par_add(1, 3).sendTransaction({
      from: randomAccount.address
    }).executed();
    console.log(`${receipt.transactionHash} is sent`);
    console.log(`gas and storage covered by sponsor: ${receipt.gasCoveredBySponsor && receipt.storageCoveredBySponsor}`);
    ```

    - A transaction is sent to the contract, calling the `par_add` function with arguments `1` and `3`.
    - Log the transaction's hash and whether its gas and storage were covered using the transaction receipt.

## Specification

Conflux keeps the following information for each user-established contract:

- `sponsor_for_gas`: this is the account that provides the subsidy for gas consumption, and can be accessed via `SponsorWhitelistControl` or `getSponsorInfo` RPC;
- `sponsor_for_collateral`: this is the account that provides the subsidy for collateral for storage, and can be accessed via `SponsorWhitelistControl` or `getSponsorInfo` RPC;
- `sponsor_balance_for_gas`: this is the balance of subsidy available for gas consumption, and can be accessed via `SponsorWhitelistControl` or `getSponsorInfo` RPC;
- `sponsor_balance_for_collateral`: *refundable* balance of subsidy available for collateral for storage, and can be accessed via `SponsorWhitelistControl` or `getSponsorInfo` RPC;
- `availableStoragePoints`: storage points available for storage collateral, and can be accessed via `SponsorWhitelistControl` or `getSponsorInfo` RPC;
- `usedStoragePoints`: storage points available for storage collateral, can be accessed via `getSponsorInfo` RPC, can only be accessed via `getSponsorInfo` RPC;
- `sponsor_limit_for_gas_fee`: this is the upper bound for the gas fee subsidy paid for every sponsored transaction, and can be accessed via `SponsorWhitelistControl` or `getSponsorInfo` RPC;
- `whitelist`: this is the list of normal accounts that are eligible for the subsidy, where a special all-zero address refers to all normal accounts. Only the contract itself and the admin have the authority to change this list. The elements of whitelist cannot be accessed directly, instead, `isWhitelisted` interface of `SponsorWhitelistControl` can tell if an address is whitelisted.

There are two resources that can be sponsored: gas consumption and storage collateral.

- *For gas consumption*: If a transaction calls a contract with non-empty `sponsor_for_gas` and the sender is in the `whitelist` of the contract and the gas fee specified by the transaction is within the `sponsor_limit_for_gas_fee`, the gas consumption of the transaction is paid from the `sponsor_balance_for_gas` of the contract (if it is sufficient) rather than from the sender’s balance. Otherwise, the sender should pay for the gas consumption.
- *For storage collateral*: If a transaction calls a contract with non-empty `available_storage_points` or `sponsor_for_collateral` and the sender is in the `whitelist` of the contract, the collateral for storage incurred in the execution of the transaction is deducted from `sponsor_for_collateral`(with priority) or `available_storage_points` of the contract, and the owner of those modified storage entries is set to the contract address accordingly. Otherwise, the sender should pay for the collateral for storage incurred in the execution.

When a message call occurs, Conflux does not recheck sponsorship. For instance, if normal address `A` calls contract `B` and contract `B` calls contract `C`, Conflux only checks whether address `A` is sponsored by contract `B`. If `A` is sponsored, `B` will afford all the gas and/or collateral during the transaction execution, including the message call from `B` to `C`. In other words, only a transaction sender could be sponsored.  

### Storage Points

[CIP-107](https://github.com/Conflux-Chain/CIPs/blob/master/CIPs/cip-107.md) introduced the concept of storage points to improve Conflux tokenomics.

When a sponsor adds storage collateral for a contract, a proportion of the CFX tokens will be burned and corresponding amount of "storage point" will be mint. The "storage point" cannot be transferred and will not generate storage interest. But it can pay for storage collateral as CFX tokens.

The storage point system is designed to have a minimal impact on economics. Contract sponsors mainly care about the amount of tokens required to support their business operations, but aren't typically concerned about the refund of storage collaterals.

### `setSponsorForGas` and `setSponsorForCollateral` behavior

When a contract is created, its `sponsor_for_gas` and `sponsor_for_collateral` will be initialized by zero address, and the sponsor balance and storage points will be initialized by 0. Both sponsorship for gas and for collateral can be updated by calling `setSponsorForGas` and `setSponsorForCollateral` of the `SponsorWhitelistControl` contract.

However, the behavior of the mentioned interfaces varies in different situation.

#### Add Sponsor Balance

An accounts can provide sponsor balance if the sponsor is never set or the current sponsor is the account itself. In this case, the sponsor should interact with function `setSponsorForGas(address contractAddr, uint upperBound)` or `setSponsorForCollateral(address contractAddr)`.

- For `setSponsorForGas(address contractAddr, uint upperBound)`, transferred value in drip will be added to `sponsor_balance_for_gas` if following requirements meet:
  - The new value for `upperBound` should be no less than the old `upperBound` unless the current `sponsor_balance_for_gas` cannot afford the old `sponsor_limit_for_gas_fee`. Noting, if the sponsor is never set, this rule will be ignored.
  - Besides, the transferred fund should be no less than 1000 times of the new limit, which means the sponsorship should at least support 1000 calls.
  - The transferred value in drip will be added to `sponsor_balance_for_gas`.
- For `setSponsorForCollateral(address contractAddr)`, there is no extra requirement. `p` proportion of the surplus CFX provided (whereas `p * tx.value`) will be burnt and converted into storage_points. The rest (`(1-p) * tx.value`) will be added to `sponsor_balance_for_collateral`.

#### Sponsorship Replacement

##### Gas Sponsor Replacement

To replace the gas sponsor of a contract, the new sponsor must meet specific conditions：

1. The transferred fund should more than the current `sponsor_balance_for_gas` of the contract.
2. The new value for `sponsor_limit_for_gas_fee` (specified the `upperBound` parameter) should be no less than the old sponsor’s limit unless the old `sponsor_balance_for_gas` cannot afford the old `sponsor_limit_for_gas_fee`.
3. The transferred fund should be >= 1000 times of the new limit, so that it is sufficient to subsidize at least `1000` transactions calling the contract.

If the above conditions are satisfied, the remaining `sponsor_balance_for_gas` will be refunded to the old `sponsor_for_gas`, and the fund transferred to the internal contract will be added to the `sponsor_balance_for_gas` of the contract. Then the `sponsor_for_gas` and `sponsor_limit_for_gas_fee` will be updated according to the new sponsor’s specification. Otherwise, an exception will be triggered.

##### Collateral Sponsor Replacement

The replacement of collateral sponsorship is similar but more complex due to storage points. As a proportion of CFX is burnt, the new sponsor should transfer a fund more than the refundable CFX provided by the current sponsor for collateral of the contract, whereas,

`refundable storage collateral = sponsor_balance_for_collateral + (collateral_for_storage - use_storage_points / 1024)`

The origin sponsor will be refunded with the above CFX immediately after the sponsor replacement. The `collateral_for_storage` refers to storage collateral already sponsored, accessible via `cfx_getAccount` RPC with contract's address as parameter.

`p` proportion of the surplus CFX provided will be burnt and converted into storage_points, whereas,

```
surplus storage points
= p * (surplus CFX provided) * 1024
= p * (tx.value - previous refundable collateral) * 1024
= p * (tx.value - (sponsor_balance_for_collateral + (collateral_for_storage - use_storage_points / 1024))) * 1024
```

### Whitelist maintenance

Only the contract itself or contract admin can update the contract whitelist. Sponsors have no rights to change the whitelist.

A contract can call function `addPrivilege(address[] memory)` to any addresses to the whitelist. It means that if the `sponsor_for_gas` is set, the contract will pay the gas fee for the accounts in the whitelist, and if the `sponsor_for_collateral` is set, the contract will pay the CFS (collateral for storage) for the accounts in the whitelist. The zero address is a special address `0x0000000000000000000000000000000000000000`. If this address is added to whitelist, all the transactions calling this contract will be sponsored. A contract can call this function `removePrivilege(address[] memory)` to remove some normal account address from the whitelist. Remove a non-existent address will not cause an error or exception.

**Corner cases:**

1. A contract address can also be added to the whitelist, but it is meaningless since only the transaction sender could be sponsored.

The admin of a contract can use the interfaces `addPrivilegeByAdmin(address contractAddr, address[] memory addresses)` and `removePrivilegeByAdmin(address contractAddr, address[] memory addresses)` to maintain the whitelist.
