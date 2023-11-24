---
sidebar_position: 7
title: Contract Verification
---

After deploying your smart contracts, it's important to verify your code on a block explorer. This can be done in an automated way using your developer tooling or the Web UI.

## Using Developer Tools

Most smart contract tooling has plugins for verifying your contracts easily on ConfluxScan. 

| Network    | Scan API |
| ---------- | ----------------------------- |
| Mainnet | https://evmapi.confluxscan.io/api/   |
| Testnet | https://evmapi-testnet.confluxscan.io/api/   |

### Hardhat

Modify `hardhat.config.ts` to point to Conflux eSpace's RPC and block explorer API. A dummy `apiKey` value is required, but anything works for its value. 

For example, if you are using eSpace testnet, your config will look like this:
```javascript
...

const config: HardhatUserConfig = {
  ...
  solidity: "0.8.19",
  networks: {
    espaceTestnet: {
      url: "https://evm.confluxrpc.com",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  sourcify: {
    enabled: false,
  },
  etherscan: {
    apiKey: {
      espaceTestnet: 'espace',
    },
    customChains: [
      {
        network: 'espaceTestnet',
        chainId: 71,
        urls: {
          apiURL: 'https://evmapi-testnet.confluxscan.io/api/',
          browserURL: 'https://evmtestnet.confluxscan.io/',
        },
      },
    ],
  },
}

...
```

Now you can verify the smart contract by running the following command.

```solidity
npx hardhat verify --network espaceTestnet <contract address> <space separated constructor parameters>
```

For example, this is how a smart contract that receives two uint parameters in the constructor should look:

```solidity
npx hardhat verify --network espaceTestnet 0xD9880690bd717189cC3Fbe7B9020F27fae7Ac76F 123 456
```

### Foundry

When using Foundry, the `verify-contract` command helps automate the process of verifying contracts. If your contract has constructor arguments, you can specify these in ABI-encoded form with the `--constructor-args` option. For example, if your constructor takes two `uint256` variables:
```bash
 --constructor-args $(cast abi-encode "constructor(uint256,uint256)" 0 7)
```

Refer to the [Foundry documentation](https://book.getfoundry.sh/reference/forge/forge-verify-contract) for further options you can specify.


```bash
forge verify-contract <contract address> <contract name> \
  --verifier-url https://evmapi-testnet.confluxscan.io/api/ \
  --etherscan-api-key <anything is ok> \
  --constructor-args <your constructor arguments>
```
<Aside type="caution" title="Caution">
  Do not specify the chain ID.
</Aside>
