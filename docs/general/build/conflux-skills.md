---
sidebar_position: 2
title: Conflux Skills
description: Reusable Codex skills for Conflux-related development workflows.
displayed_sidebar: generalSidebar
keywords:
  - Conflux Skills
  - Codex
  - Skills
  - Agent workflows
  - eSpace
  - Core Space
  - ConfluxScan
tags: [Skills, AI Tools, Developer Tools]
---

# Conflux Skills

[Conflux Skills](https://github.com/conflux-fans/conflux-skills/tree/main) is a small collection of reusable Codex skills for Conflux-related development workflows. Instead of re-explaining the same Conflux context in every prompt, you can install a skill that already knows the relevant tools, references, and workflows.

## Why use these skills?

- Reuse Conflux-specific workflows without rewriting prompts from scratch.
- Give coding agents better defaults for eSpace development, docs lookup, and RPC inspection.
- Keep guidance aligned with official Conflux docs and ecosystem tooling.

## Install a skill

The simplest approach is to give your agent the repository link and ask it to install the skill using its preferred workflow:

```text
https://github.com/conflux-fans/conflux-skills
```

If you want to install a specific skill yourself, you can also use `npx skills add`:

```bash
npx skills add https://github.com/conflux-fans/conflux-skills --skill conflux-dev
```

Replace `conflux-dev` with the skill you want.

## Available skills

| Skill | What it helps with | Install command |
| --- | --- | --- |
| `conflux-dev` | Build, deploy, verify smart contracts, and integrate frontends or wallets on Conflux eSpace with tools such as Hardhat, Foundry, Remix, ethers, and viem. | `npx skills add https://github.com/conflux-fans/conflux-skills --skill conflux-dev` |
| `conflux-docs` | Find official Conflux documentation for concepts, Core Space and eSpace differences, RPC endpoints, deployment, and developer guides. | `npx skills add https://github.com/conflux-fans/conflux-skills --skill conflux-docs` |
| `conflux-scan-rpc` | Run read-only eSpace state inspection workflows for transactions, receipts, balances, and contract state through RPC and ConfluxScan APIs. | `npx skills add https://github.com/conflux-fans/conflux-skills --skill conflux-scan-rpc` |

## Suggested use cases

### eSpace development

Use `conflux-dev` when you want help with deployment, verification, wallet integration, or common EVM development workflows on Conflux eSpace.

### Documentation lookup

Use `conflux-docs` when you need official Conflux references quickly, especially for space differences, RPC endpoints, and developer onboarding material.

### RPC inspection

Use `conflux-scan-rpc` for read-only debugging workflows, such as checking transaction status, balances, receipts, or contract state.

Browse the full repository here:

- [conflux-fans/conflux-skills](https://github.com/conflux-fans/conflux-skills/tree/main)
