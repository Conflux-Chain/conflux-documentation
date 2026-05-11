# Conflux AI Context Counter Demo

This demo shows how to give an AI coding assistant enough Conflux eSpace context to create a small, verifiable Hardhat workflow.

The project targets:

- Conflux eSpace Testnet
- RPC URL: `https://evmtestnet.confluxrpc.com`
- Chain ID: `71`
- Native token: `CFX`
- Explorer: `https://evmtestnet.confluxscan.org`

## Files

- `AGENTS.md` and `.cursorrules.md`: reusable AI assistant rules.
- `contracts/Counter.sol`: minimal Solidity contract.
- `hardhat.config.js`: Hardhat network config for Conflux eSpace Testnet.
- `scripts/deploy.js`: deploys `Counter`.
- `scripts/increment.js`: increments an existing `Counter`.
- `transcripts/llm-interaction.md`: short interaction history.

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env` and set `PRIVATE_KEY` to a funded Conflux eSpace Testnet account. Do not commit `.env`.

## Compile

```bash
npx hardhat compile
```

## Deploy

```bash
npx hardhat run scripts/deploy.js --network eSpaceTestnet
```

The script prints the deployed contract address, transaction hash, and ConfluxScan URL.

## Interact

After deployment, set `COUNTER_ADDRESS` in `.env` or in your shell:

```bash
COUNTER_ADDRESS=0xYourDeployedAddress npx hardhat run scripts/increment.js --network eSpaceTestnet
```

The script prints the counter value before and after calling `increment()`.

## Useful Docs

- eSpace developer quickstart: https://doc.confluxnetwork.org/docs/espace/DeveloperQuickstart
- eSpace network endpoints: https://doc.confluxnetwork.org/docs/espace/network-endpoints
- eSpace verification: https://doc.confluxnetwork.org/docs/espace/tutorials/VerifyContracts
- eSpace EVM compatibility: https://doc.confluxnetwork.org/docs/espace/build/evm-compatibility
