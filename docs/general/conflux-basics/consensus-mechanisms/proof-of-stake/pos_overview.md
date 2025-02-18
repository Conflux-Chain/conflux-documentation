---
id: pos_overview
title: PoS Technical Overview
sidebar_position: 1
displayed_sidebar: generalSidebar
keywords:
  - Conflux-Network
  - Proof-of-Stake
  - PoS
  - consensus-mechanism
  - 51-attack
  - PoW-chain
  - pivot-block
  - voting-committee
  - BLS
  - VRF
  - staking
  - CFX
  - incentive-plan
  - security
tags: [Proof-of-Stake]
---

# Conflux PoS Technical Overview

This document provides a technical overview of Conflux's Proof of Stake (PoS) mechanism. For practical staking guides, see our [Staking Guide](/docs/general/mine-stake/stake/staking-overview.mdx).

## Purpose and Design

Conflux implements a hybrid consensus mechanism that combines Proof of Work (PoW) with Proof of Stake (PoS). This unique approach serves three critical purposes:

1. **Protection Against 51% Attacks**: In early network stages when hash power is limited, PoS provides an additional security layer against potential attacks.
2. **Chain Finality**: The PoS mechanism ensures definitive finality for the PoW chain through committee voting.
3. **Enhanced Security**: The dual-layer consensus creates a more robust security model than either mechanism alone.

For a comprehensive analysis of this hybrid approach, see [Why PoS](/docs/general/conflux-basics/consensus-mechanisms/proof-of-stake/why-pos).

## Technical Architecture

### PoS Chain Design
The PoS chain in Conflux is purposefully minimalist, focusing solely on essential security functions:
- Operates as a standalone chain dedicated to pivot block voting and committee election
- Integrates directly into conflux-rust nodes for seamless operation
- Maintains approximately 1-minute block time
- Excludes general blockchain features to optimize for its security role

### PoS Account Structure

The PoS account system employs a dual-key architecture for enhanced security:

#### Address Format
Each PoS account requires:
- A BLS key pair for consensus signatures
- A VRF key pair for random committee selection

These keys combine to generate a unique 256-bit address:
```js
0xd731d7633dd38c47769c2a62926b9a54d288a5e664f4d2108ac5bb6601bb30f5
```

The PoS account can be bound to a PoW account. The bound PoW account will receive the interest from the PoS chain.

#### Node Wallet Implementation
The wallet functionality is built directly into Conflux nodes for secure and automated operation:
- **Automated Setup**: First-time node launch generates keys and prompts for encryption password
- **Secure Storage**: Keys are stored locally with password encryption for protection
- **Autonomous Operation**: Handles consensus participation automatically without user intervention
- **Basic Interface**: Provides essential CLI commands for wallet management and monitoring

## Consensus Participation

The PoS consensus mechanism relies on a structured voting system and carefully designed committee organization to ensure network security and efficient decision-making.

### Voting Rights
Participation in consensus requires staking CFX tokens:
1. **Token Locking**: Users must lock CFX tokens to gain voting power
2. **Voting Power**: Each 1,000 CFX locked grants 1 vote
3. **State Synchronization**: Changes take effect after ~10 minute sync period
4. **Getting Started**: See our [Staking Guide](/docs/general/mine-stake/stake/stake) for detailed instructions

### Committee Structure
The committee is designed to balance decentralization with efficient consensus:
- **Size**: Maximum 300 seats ensures broad participation while maintaining efficiency
- **Organization**: Divided into 6 groups of 50 members for systematic rotation
- **Rotation**: Hourly replacement of oldest group maintains fresh participation
- **Selection Process**:
  - Forward planning with 1.5-hour election lead time
  - VRF-based randomness for fair selection
  - Flexible seat allocation allowing multiple seats per account based on stake

## Incentive Mechanism

The PoS incentive system is designed to encourage active participation and maintain network security through a balanced point distribution:

### Point System
A total of 6,000,000 points are allocated per committee cycle across four key activities:

1. **Election Participation (1.2M points)**
   Early engagement is rewarded with 120 points for each of the first 10,000 votes with lowest hash values, encouraging broad participation.

2. **Committee Membership (4.5M points)**
   Each elected vote receives 15,000 points, incentivizing long-term commitment to network security.

3. **Block Leadership (180K points)**
   Block proposers earn 3,000 points per PoS block, rewarding efficient block production.

4. **Additional Signatures (120K points max)**
   Extra rewards for signatures beyond the minimum threshold promote high participation rates.

### Reward Distribution
The point system directly ties to financial incentives:

- Points are calculated and settled every 60 blocks (one committee cycle)
- Network interest is divided proportionally based on accumulated points, and the binded PoW account will receive the interest
- Any undistributed interest (from unfilled point allocations) is burned
- Current reward rates can be found in the [Staking Guide](/docs/general/mine-stake/stake/staking-overview.mdx#benefits-of-staking)

### Accrued Interest Formula
The network interest rate is dynamically adjusted based on total staking participation:
```
Interest per block = sqrt(total_staking / total_circulation) * 4% / blocks_per_year
```

For security purposes, interest accrual stops if a committee remains unchanged for 7,200 blocks.

## Lock-up Periods and Examples

The locking mechanism is designed to ensure network stability while providing predictable token availability.

### Standard Timeline
A carefully structured timeline ensures both network security and token holder flexibility:
1. **Initial Period**: 13-day mandatory staking duration
2. **Status Transition**: Automatic change from staking to staked status
3. **Unstaking Window**: 1-day processing period
4. **Total Duration**: Minimum 14-day commitment required

### Example Scenarios
To illustrate how the locking mechanism works in practice:

#### Case 1: Standard Unstake
This represents the optimal path for token unlocking:
1. Initial stake on Day 1
2. Unstake request on Day 13 (after minimum staking period)
3. Tokens become available at end of Day 14

#### Case 2: Early Unstake
Demonstrates the impact of early withdrawal requests:
1. Initial stake on Day 1
2. Early unstake request on Day 2
3. Tokens still locked until end of Day 14 (mandatory lock period applies)

For current staking rates and detailed instructions, refer to our comprehensive [Staking Guide](/docs/general/mine-stake/stake/staking-overview.mdx).

## Security Measures

The security of the PoS system is maintained through a comprehensive set of penalties and protective measures. For a detailed understanding of:
- Slashing conditions and amounts
- Security risk factors
- Preventive measures
Visit our detailed guide on [Penalties and Slashing](/docs/general/conflux-basics/consensus-mechanisms/proof-of-stake/penalties_and_slash)
