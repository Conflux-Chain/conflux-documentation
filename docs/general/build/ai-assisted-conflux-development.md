---
sidebar_position: 3
title: AI-Assisted Conflux Development
description: A practical prompt and context workflow for building Conflux eSpace dApps with AI coding assistants.
displayed_sidebar: generalSidebar
keywords:
  - Conflux
  - AI
  - LLM
  - Prompting
  - Cursor
  - Codex
  - Claude
  - eSpace
  - Hardhat
  - DApp
tags: [AI Tools, Developer Tools, eSpace, Hardhat]
---

# AI-Assisted Conflux Development

LLM coding assistants work best when they receive the same project context that an experienced Conflux developer would check first: which Conflux space is targeted, which RPC endpoint is safe to use, which wallet and explorer to test against, and which commands prove that the generated code actually works.

This guide shows a repeatable way to prepare that context before asking an AI assistant to build or modify a Conflux eSpace dApp. The example focuses on eSpace because it can reuse standard Ethereum tooling such as Hardhat, ethers, viem, Foundry, Remix, MetaMask, and Solidity libraries.

## When to Use This Workflow

Use this workflow when you want an assistant to:

- Scaffold a small Conflux eSpace demo.
- Add Conflux eSpace network configuration to an existing Ethereum project.
- Write deploy or interaction scripts.
- Diagnose deployment, gas, or verification problems.
- Keep generated code aligned with official Conflux docs instead of generic Ethereum defaults.

For Core Space work, give the assistant a different context package that names Core Space explicitly and points it to `js-conflux-sdk`, Core Space RPC endpoints, CIP-37 addresses, and Core Space transaction behavior.

## Context Packet

Paste a short context packet before asking for code changes. Keep it close to the project so future contributors can reuse it.

```md
Project target:
- Chain: Conflux eSpace Testnet
- RPC URL: https://evmtestnet.confluxrpc.com
- Chain ID: 71
- Currency: CFX
- Explorer: https://evmtestnet.confluxscan.org

Tooling:
- Solidity contracts
- Hardhat
- ethers.js
- MetaMask configured for Conflux eSpace Testnet

Constraints:
- Never hardcode a private key.
- Read PRIVATE_KEY from the environment.
- Keep deployment scripts idempotent enough to rerun safely.
- Add verification or smoke-test commands when code changes.
- Prefer official Conflux docs when network behavior differs from Ethereum.

Useful docs:
- eSpace developer quickstart: /docs/espace/DeveloperQuickstart
- eSpace network endpoints: /docs/espace/network-endpoints
- eSpace verification: /docs/espace/tutorials/VerifyContracts
- eSpace EVM compatibility: /docs/espace/build/evm-compatibility
```

## Repository Rules File

Most coding assistants can read a repository-level rules file. For Cursor, create `.cursorrules.md`. For Codex, use `AGENTS.md`. For other assistants, use the nearest supported project-instructions file and keep the same content.

```md title=".cursorrules.md or AGENTS.md"
# Conflux eSpace Development Rules

This project targets Conflux eSpace Testnet unless a task says otherwise.

Network:
- RPC URL: https://evmtestnet.confluxrpc.com
- Chain ID: 71
- Native token: CFX
- Explorer: https://evmtestnet.confluxscan.org

Implementation rules:
- Use standard EVM tooling for eSpace: Solidity, Hardhat, ethers, viem, Foundry, or Remix.
- Do not use Core Space concepts for eSpace code unless explicitly requested.
- Do not hardcode private keys, mnemonics, RPC secrets, or funded addresses.
- Put secrets in environment variables and document them in `.env.example`.
- Include a compile command and at least one smoke-test or deploy command in every code change.
- If gas estimation fails on eSpace, check Conflux eSpace docs before changing contract logic.
- When using Foundry scripts on eSpace, remember the documented `-g 250` multiplier guidance.

Review checklist:
- `npm install` or `yarn install` is documented.
- `npx hardhat compile` succeeds.
- The selected network uses chain ID 71 for eSpace Testnet or 1030 for eSpace Mainnet.
- Deployment scripts print the deployed address and transaction hash.
- README links to the relevant Conflux docs.
```

## Prompt Template

Use a prompt that asks the assistant to make a small, testable change and to report the exact commands it ran.

```text
You are helping me build a Conflux eSpace dApp.

Use this project context:
- Conflux eSpace Testnet RPC: https://evmtestnet.confluxrpc.com
- Chain ID: 71
- Explorer: https://evmtestnet.confluxscan.org
- Tooling: Hardhat, ethers.js, Solidity
- Secrets must come from environment variables only.

Task:
Create a minimal Counter contract workflow:
1. Solidity Counter contract with `number`, `setNumber(uint256)`, and `increment()`.
2. Hardhat config for Conflux eSpace Testnet.
3. Deploy script that reads PRIVATE_KEY from `.env`.
4. Interaction script that reads COUNTER_ADDRESS and calls `increment()`.
5. README with install, compile, deploy, and interact commands.

Validation:
- Run or provide the command for `npx hardhat compile`.
- Explain any command that cannot be run locally.
- Keep the implementation small and production-safe.
```

## Example Demo Project

This documentation repository includes a minimal demo scaffold at:

```text
examples/ai-context-counter
```

The demo is intentionally small. It gives an AI assistant enough structure to add or modify Conflux eSpace functionality without guessing the network, chain ID, or secret-handling rules.

### Files

```text
examples/ai-context-counter/
  AGENTS.md
  .cursorrules.md
  .env.example
  README.md
  contracts/Counter.sol
  hardhat.config.js
  package.json
  scripts/deploy.js
  scripts/increment.js
  transcripts/llm-interaction.md
```

### Validation Commands

From the demo directory:

```bash
npm install
npx hardhat compile
cp .env.example .env
# edit .env and add a funded testnet PRIVATE_KEY
npx hardhat run scripts/deploy.js --network eSpaceTestnet
COUNTER_ADDRESS=0xYourDeployedAddress npx hardhat run scripts/increment.js --network eSpaceTestnet
```

## Short LLM Interaction History

Keep the transcript short enough that reviewers can understand how the output was produced. Five rounds is usually enough.

```md
Round 1
User: Build a minimal Conflux eSpace Hardhat demo for a Counter contract. Use chain ID 71 and read PRIVATE_KEY from `.env`.
Assistant: Proposed a Hardhat project with Counter.sol, eSpace Testnet config, deploy script, increment script, and README validation commands.

Round 2
User: Add persistent project instructions so future AI edits do not confuse eSpace with Core Space.
Assistant: Added AGENTS.md and .cursorrules.md with eSpace RPC, chain ID, secret-handling, and validation rules.

Round 3
User: Make the deploy output useful for ConfluxScan review.
Assistant: Updated deploy.js to print the contract address, transaction hash, and eSpace Testnet explorer link.

Round 4
User: Add a safe interaction script.
Assistant: Added scripts/increment.js that requires COUNTER_ADDRESS and prints the before/after counter value.

Round 5
User: Add README commands and note what cannot run without a private key.
Assistant: Documented install, compile, deploy, and interaction commands, plus `.env` setup and testnet funding requirements.
```

## Common Corrections to Ask For

If the assistant gives generic Ethereum output, steer it back with specific Conflux instructions:

- "Use Conflux eSpace Testnet chain ID 71, not Sepolia or another Ethereum testnet."
- "Keep CFX as the native token in docs and UI text."
- "Use https://evmtestnet.confluxrpc.com for eSpace Testnet."
- "Do not use CIP-37 addresses in ethers.js eSpace scripts."
- "Add a ConfluxScan link for the deployed contract."
- "Document any command that needs a funded private key."

## Review Checklist

Before submitting an AI-assisted Conflux contribution:

- The target space is explicit: eSpace or Core Space.
- RPC URL, chain ID, explorer, and currency are correct.
- Secrets are not committed.
- Generated code has a compile or smoke-test path.
- The README points readers to the relevant Conflux docs.
- The interaction history is short and shows how Conflux context was supplied.
