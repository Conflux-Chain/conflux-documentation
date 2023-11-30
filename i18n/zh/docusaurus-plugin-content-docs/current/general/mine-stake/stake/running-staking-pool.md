---
sidebar_position: 4
title: Running a PoS Staking Pool
displayed_sidebar: generalSidebar
---

In this section we present a guide for how to deploy, configure and manage a POS Pool that will allow CONFLUX holders to join to the PoS protocol just interacting with the front-end application of the PoS Pool and without dealing with the technical complexities.

**Prerequisites**:

The POS Pool operator needs to have the infrastructure to run the following:

* A full/archive node
* A Web Server Farm, or a single web server to run the POS Pool application

## Reference Architecture

![Architecture](./img/PoSReferenceArchitecture.png)

Please note this configuration guide is to do the technical setup of the PoS Pool staking environment.

Conflux PoS Pool configuration has two major components: Interface application and full node. It needs technical knowledge for configuration of instances, ports, contracts deployment and storage configuration.

The configuration of a reverse proxy and a firewall is recommended but is out of the scope of this guide.

For the Conflux’s full node configuration, you need to have in place the following:

* A Server with Ubuntu (recommended) or Windows
* Hard disk with 500GB of available space, ideally a SSD with NVMe drivers
* Nodejs and Yarn frameworks installed in the server
* Configure the server following the full node configuration [guide](../../run-a-node/running-full-node.md)

It’s important to have the latest release of Conflux, you can download the node client from: https://github.com/Conflux-Chain/conflux-rust/releases

# PoSPool contract

This is the contract code of PoS pool, which are developed by Solidity. Featured with:

* Pool share ratio configuable
* Upgradeable
* Provide `PoolManager` to manage serveral PoS pool

Note: To operation a PoS pool, a stable Conflux PoS node is required. **Especially do not let your PoS node forceRetired** If your Pool PoS Node is force retired you need manually [do some operation](https://github.com/conflux-fans/pos-pool/blob/main/contract/PoolForceRetired.md) to correct the Pool's vote state.

## Main contracts

All contracts are in the `contracts` folder:

* `PoSPool.sol`: This is the pool logic methods
* `PoSPoolProxy1967.sol`: This is the pool proxy contract, used to make the pool logic upgradable.
* `PoolManager.sol`: A simple manager contract just store pool's address.

## Deploy process

1. Deploy `PoolManager.sol` then get pool manager's address `PMA`.
2. Deploy `PoSPool.sol` then get pool's address `P`.
3. Deploy `PoSPoolProxy1967.sol`, use `P` as constructor's parameter, then get poolProxy's address `PA`.
4. Invoke `PA`'s `setPoolName` to set pool's name
5. Invoke `PA`'s register method (with `PoSPool`'s ABI) to regist it in PoS, the votePower is `1 vote`, which mean `1000 CFX`
6. Invoke `PMA`'s `addPool` method to add `PA` to PoolManager.

If want to add more pool to PoolManager then walk through step `2-6`.

`PoSPool.sol` have several method to config Pool's contract:

1. `setPoolUserShareRatio` to set poolUserShareRatio, which's default value is 90%
2. `setLockPeriod` to set pool stake&unstake lock period, which's default value is `7 day block number`(`2 * 3600 * 24 * 7`)

## Bootstrap

Clone the code, and install the dependencies with npm

```sh
$ git clone https://github.com/conflux-fans/pos-pool.git
$ cd contract
$ npm install
```

Then compile the contracts

```sh
$ npx hardhat compile
```

## CLI

There is a CLI in `bin`, which can used to deploy contract and setup them.

First you need create a `.env` from it's template `.env.example` and set the `CFX_RPC_URL`, `CFX_NETWORK_ID`, `PRIVATE_KEY` and make sure the `PRIVATE_KEY`'s address have enough CFX.

```sh
To gain a performance boost install @conflux-dev/conflux-address-rust
Usage: pool [options] [command]

Options:
  -V, --version                      output the version number
  -d, --debug                        output extra debugging
  -h, --help                         display help for command

Commands:
  chainStatus [type]
  poolStatus [address]
  registerPool
  setLockPeriod <number>
  setPoolName <name>
  Pool <method> [arg] [value]
  restake <amount>
  retireUserStake <user> <endBlock>
  deploy <ContractName>
  deployProxy <logicAddress>
  deployDebugPool
  upgradePoolContract <address>
  QueryPoolProxy
  QueryPool <method> [arg]
  QueryPoolManager <method>
  PoolManager <method> <arg>
  help [command]                     display help for command
```

### Step 1 - Deploy PoolManager

```sh
$ bin/pool.js deploy PoolManager
Deploy success: NET8888:TYPE.CONTRACT:ACC7ANC643M4W2VUHRNP5F0ZGZHUW8ZK6AENY2XB11
```

Config `POOL_MANAGER_ADDRESS` with new deployed `PoolManager` address in `.env`

### Step 2 - Deploy PoSPool contract

Then you can deploy the `PoSPool`

```sh
$ bin/pool.js deploy Pool
Deploy success: NET8888:TYPE.CONTRACT:ACED7ZXFESKFFVR595J9KVS702C7D66SCUAMGHDPAA
```

### Step 3 - Deploy PoSPoolProxy1967 contract

Then you can deploy the `PoSPoolProxy1967`

```sh
$ bin/pool.js deployProxy NET8888:TYPE.CONTRACT:ACED7ZXFESKFFVR595J9KVS702C7D66SCUAMGHDPAA
Deploy success: NET8888:TYPE.CONTRACT:ACF0H9U3WYZ1EUSH5EW04MPK6GN43HA1A6FWG7ZB0W
```

Config `POOL_ADDRESS` with new deployed `PoolProxy1967` address in `.env`

**Note POOL_ADDRESS is configured to PoolProxy address**

### Step 4 - Set poolName

```sh
$ bin/pool.js Pool setPoolName YourChoosePoolName
```

### Step 5 - Regist pool

Set your PoS node's register data and set `POS_REGIST_DATA` in `.env`.

```sh
$ bin/pool.js registerPool
```

### Step 6 - Add pool to poolManager

```sh
$ bin/pool.js PoolManager addPool NET8888:TYPE.CONTRACT:ACF0H9U3WYZ1EUSH5EW04MPK6GN43HA1A6FWG7ZB0W
```

## Pool deploy and setup scripts

There is also a scripts can quickly deply a new PoS pool and regist it, also add it to PoolManager

```sh
$ node scripts/deployPool.js THE-REGISTER-DATA
```

You need set PoS pool name manually.

## Check PoS node's status

If one PoS node is force retired for some reason, all it's votes will be force retired. In this case the pool runner need **manually call PoS pool contract's `_retireUserStakes` method to unlock user's votes in contract**.

There also is a scripts can do this:

```js
$ node scripts/unLockUserVotes.js
```

So it is necessary to have some way monitor your PoS node's status.

# Pos Pool Interface

## Setup

First we need to install the project dependencies.

```sh
$ cd interface
$ yarn # install the npm packages
```

Second a config file `pool.config.js` is need to create

```sh
$ cp pool.config.sample.js pool.config.js
```

The config.sample file's content is like this:

```js
module.exports = {
  defaultLang: 'en',
  testnet: {
    poolManagerAddress: 'cfxtest:xxxxxxxxxxxxxxxxxxxxxxxxxx',
    RPC: 'https://test.confluxrpc.com',
    networkId: 1
  },
  mainnet: {
    poolManagerAddress: 'cfx:xxxxxxxxxxxxxxxxxxxxxx',
    RPC: 'https://main.confluxrpc.com',
    networkId: 1029
  }
}
```

**Note: The `poolManagerAddress` need to replace with your deployed PoolManagerContract address.**

The dev mode (yarn start) will use the `testnet` config

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### add i18n text

First, add a folder named target language key to the interface/public/locales folder. copy the translation.json file from the locales/en folder.

Then change the value in the copied translation.json file to the translation of the target language.

Next, import the new language file in locales/index.js and add it to the resources field. (You can change the default language by modifying the lng field.)

Finally, in Interface/src/pages/components/Header/index.js, add an Option corresponding to the language key under Language Select.


## One-Click PoS Pool

One-Click PoS Pool is a an application that enables users without code experience to run a PoS pool in an easy way. PoS one click uses docker technology and consists in 3 parts:
1. Node part, this part use bash script to run a Conflux PoS node
2. PosPool website and contract, in this part, it provide a stake website which allow user to stake their CFX token, and an automatically script to deploy the website, contract and verify the contract.
3. Admin website, a .net core web application, which only allow admin to login, admin can login to monitor the pool status, adjust pool name/performance fee, withdraw profit, it also allow admin to upgrade node and contract by just click a few buttons.

[Github Repo](https://bitbucket.org/abc-cfxpool/posoneclick/src/main/)

## Additional Documentation

1. [How to deploy Conflux Core PoS pool](https://github.com/conflux-fans/pos-pool/blob/main/contract/docs/HowToDeployCorePoolContract.md)
2. [How to upgrade Core Pool Contract](https://github.com/conflux-fans/pos-pool/blob/main/contract/docs/HowToUpgradeContract.md)
3. [How to deal with PoS force retire](https://github.com/conflux-fans/pos-pool/blob/main/contract/docs/PoolForceRetired.md)
4. [How to deploy eSpace pool contract](https://github.com/conflux-fans/pos-pool/blob/main/contract/docs/HowToDeployEspacePool.md)

## 参考资料
- [PoS Pool](https://github.com/conflux-fans/pos-pool)
- [PoS Pool Contract](https://github.com/conflux-fans/pos-pool/blob/main/contract/README.md)
- [PoS Pool Interface](https://github.com/conflux-fans/pos-pool/blob/main/interface/README.md)



