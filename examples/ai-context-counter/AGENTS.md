# Conflux eSpace Development Rules

This demo targets Conflux eSpace Testnet.

Network:
- RPC URL: https://evmtestnet.confluxrpc.com
- Chain ID: 71
- Native token: CFX
- Explorer: https://evmtestnet.confluxscan.org

Implementation rules:
- Use standard EVM tooling for eSpace: Solidity, Hardhat, and ethers.js.
- Do not use Core Space concepts for this eSpace demo unless explicitly requested.
- Do not hardcode private keys, mnemonics, RPC secrets, or funded addresses.
- Put secrets in environment variables and document them in `.env.example`.
- Include a compile command and at least one smoke-test or deploy command in every code change.

Review checklist:
- `npm install` is documented.
- `npx hardhat compile` succeeds.
- The selected network uses chain ID 71 for eSpace Testnet.
- Deployment scripts print the deployed address, transaction hash, and ConfluxScan URL.
