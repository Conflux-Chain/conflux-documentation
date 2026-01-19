---
id: common-enums
sidebar_position: 9
title: Common Enums
displayed_sidebar: coreSidebar
---

Commonly used enum types in RPC return data.

## Receipt Status

Transaction status in the Receipt, numeric type.

| Value       | Description   |
| ----------- | ------------- |
| 0x0         | Success       |
| 0x1         | Failure       |
| 0x2         | Skipped       |

## Space

Enum type representing the storage space, string type.

| Value       | Description   |
| ----------- | ------------- |
| native      | Core Space    |
| ethereum    | eSpace        |

## Action Type

Enum type representing the transaction action type, string type.

| Value                    | Description              |
| ------------------------ | ------------------------ |
| call                     | Method call              |
| create                   | Create contract          |
| call_result              | Method call result       |
| create_result            | Contract creation result |
| internal_transfer_action | Internal transfer action |
| set_auth                 | 7702 Set Authorization(This type is not currently available for Core Space traces.)   |
| suicide                  | Contract self-destruct   |

## Create Type

Contract creation type, string type.

| Value    | Description                  |
| -------- | ---------------------------- |
| create   | Normal contract creation     |
| create2  | Contract created via CREATE2 |

## Call Type

Method call type, string type.

| Value        | Description             |
| ------------ | ----------------------- |
| call         | Normal contract call    |
| staticcall   | Static call             |
| delegatecall | Delegate call           |
| callcode     | Code call (deprecated)  |

## Pocket Type

Account balance type, string type.

| Value                          | Description                        |
| ------------------------------ | ---------------------------------- |
| balance                        | Account balance                    |
| staking_balance                | Staking balance                    |
| storage_collateral             | Storage collateral                 |
| sponsor_balance_for_gas        | Gas sponsor balance                |
| sponsor_balance_for_collateral | Storage collateral sponsor balance |
| mint_or_burn                   | Mint or burn                       |
| gas_payment                    | Gas payment                        |

## Action Status Type

Transaction trace action status type, string type.

| Value     | Description        |
| --------- | ------------------ |
| success   | Action succeeded    |
| reverted  | Action reverted     |
| failed    | Action failed       |

## SetAuth Outcome Type

Set authorization outcome type, string type.

| Value        | Description               |
| ------------ | ------------------------- |
| success      | Set Auth success        |
| invalid_chain_id      |  Chain ID is not equal to the current chain ID also not equal to 0     |
| invalid_nonce    | Nonce is not equal to the current nonce |
| nonce_overflow | Nonce is overflow  |
| invalid_signature | Signature is invalid  |
| account_can_not_set_auth | Only account is empty or already delegated can set auth  |