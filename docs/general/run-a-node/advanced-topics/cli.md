---
id: cli_sub_commands
title: CLI Sub-commands
sidebar_position: 8
keywords:
  - conflux
  - cli
  - sdk
displayed_sidebar: generalSidebar
---

Conflux CLI sub-commands is a collection of command line interfaces which allows you to interact with a local or remote Conflux node.

## Manage Accounts
`account` sub-command allows you to manage accounts at local machine.

### new
Create a new account at local machine.
#### Usage
```text
$ ./conflux account new --help
Create a new account (and its associated key) for the given --chain (default conflux).

USAGE:
    conflux account new [OPTIONS]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
        --keys-iterations <NUM>    Specify the number of iterations to use when deriving key from the password (bigger is more secure). [default: 10240]
        --password <FILE>          Provide a file containing a password for unlocking an account. Leading and trailing whitespace is trimmed.
```
#### Example
`./conflux account new`

### list
List all accounts at local machine.
#### Usage
```text
$ ./conflux account list --help
List existing accounts of the given --chain (default conflux).

USAGE:
    conflux account list

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information
```
#### Example
`./conflux account list`

### import
Import accounts from JSON UTC keystore files.
#### Usage
```text
$ ./conflux account import --help
Import accounts from JSON UTC keystore files to the specified --chain (default conflux)

USAGE:
    conflux account import --import-path <PATH>...

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
        --import-path <PATH>...    A list of file paths to import.
```
#### Example
`./conflux account import --import-path ./keystores`

## Public APIs
Public API allows you to interact with a local or remote Conflux node via HTTP connection in JSON-RPC protocol. All public APIs are under `rpc` sub-command, and access to the JSON-RPC API at local machine with default `url` option.

```text
OPTIONS:
        --url <url>    URL of RPC server [default: http://localhost:12539]
```
To access JSON-RPC API of remote Conflux node, please specify the  correct `--url` option (e.g. http://10.1.5.6:12537). By default, JSON-RPC is enabled only for local access for security consideration. You can manually enable remote access by configuring `jsonrpc_http_port` in ***default.toml*** file.

```toml
# jsonrpc_tcp_port=12536
jsonrpc_http_port=12537
# jsonrpc_local_tcp_port=12538
jsonrpc_local_http_port=12539
```
All available commands are as following:
```text
$ ./conflux rpc --help
RPC based subcommands to query blockchain information and send transactions

USAGE:
    conflux rpc [OPTIONS] <SUBCOMMAND>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
        --url <url>    URL of RPC server [default: http://localhost:12539]

SUBCOMMANDS:
    balance                  Get balance of specified account
    best-block-hash          Get the best block hash
    block-by-epoch           Get block by epoch
    block-by-hash            Get block by hash
    block-with-assumption    Get block by hash with pivot chain assumption
    blocks                   Get blocks of specified epoch
    call                     Executes a new message call immediately without creating a transaction
    code                     Get bytecode of specified contract
    local                    Local subcommands (requires jsonrpc_local_http_port configured)
    epoch                    Get epoch number
    estimate-gas             Executes a call request immediately without creating a transaction and returns the gas used
    help                     Prints this message or the help of the given subcommand(s)
    nonce                    Get nonce of specified account
    price                    Get recent mean gas price
    receipt                  Get receipt by transaction hash
    send                     Send a signed transaction and return its hash
    tx                       Get transaction by hash
```

### Get balance
`./conflux rpc balance --address cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg`

### Get nonce
`./conflux rpc nonce --address cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg`

### Get current epoch number
`./conflux rpc epoch`

### Get block(s)
- Get Best block hash: `./conflux rpc best-block-hash`
- Get block by epoch: `./conflux rpc block-by-epoch --epoch latest_state`
- Get block by height: `./conflux rpc block-by-epoch --epoch 0x10`
- Get blocks in epoch: `./conflux rpc blocks --epoch latest_state`

### Get transaction
`./conflux rpc tx --hash 0x718532fe76dbd8c4208c6c5a79588db35c0bf97e7d8a0faa5988ba66ad88b74c`

### Get receipt
`./conflux rpc receipt --hash 0x718532fe76dbd8c4208c6c5a79588db35c0bf97e7d8a0faa5988ba66ad88b74c`

### Send signed transaction
Send a signed transaction which encoded in HEX format. Generally, this API is used for Java-Script API to send encoded transaction. To send a transaction with CLI, suggest to use private API [send transaction](#send-transaction).

`./conflux rpc send --raw-bytes 0x...`

### Misc
- Get contract code: `./conflux rpc code --address cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp`
- Get recent mean gas price: `./conflux rpc price`

## Private APIs
Private API allows you to interact with local Conflux node **only** via HTTP connection in JSON-RPC protocol. Private APIs are provided for user to manage the local Conflux node, and requires the `jsonrpc_local_http_port` configured in ***default.toml*** configuration file.

In addition, private APIs also helps developers to debug, test, and monitor the runtime of Conflux node.

All private APIs are under `local` sub-command, and access to the JSON-RPC API at local machine with default `url` option.

```text
$ ./conflux rpc local --help
Debug subcommands (requires jsonrpc_local_http_port configured)

USAGE:
    conflux rpc local [OPTIONS] <SUBCOMMAND>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
        --url <url>    URL of RPC server [default: http://localhost:12539]

SUBCOMMANDS:
    consensus-graph-state    Get the consensus graph state
    help                     Prints this message or the help of the given subcommand(s)
    net                      Network subcommands
    send                     Send a transaction and return its hash
    sync-phase               Get the current synchronization phase
    test                     Test subcommands (used for test purpose only)
    txpool                   Transaction pool subcommands
```
### net
`net` sub-command helps you to inspect the P2P network status.

#### Examples
- List all connected P2P nodes: `./conflux rpc local net session`
- List a single P2P node: `./conflux rpc local net session --id <node_id>`
- Check network egress: `./conflux rpc local net throttling`

### txpool
`txpool` sub-command helps you to inspect the transaction pool.

#### Examples
- List transaction pool status: `./conflux rpc local txpool status`
- List transactions in details: `./conflux rpc local txpool content`
- List summary of transactions: `./conflux rpc local txpool inspect`
- Inspect a transaction in detail: `./conflux rpc local txpool inspect-one --hash <tx_hash>`

### sync-phase
Get the synchronization phase of local conflux node.

`./conflux rpc local sync-phase`

### Send transaction
Send a transaction to local Conflux node.

#### Usage
```text
$ ./conflux rpc local send --help
Send a transaction and return its hash

USAGE:
    conflux rpc local send [OPTIONS] --from <ADDRESS> --value <HEX>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
        --data <HEX>           Hash of the method signature and encoded parameters
        --from <ADDRESS>       Transaction from address
        --gas <HEX>            Gas provided for transaction execution [default: 0x5208]
        --gas-price <HEX>      Transaction gas price [default: 0x2540BE400]
        --nonce <HEX>          Transaction nonce
        --to <ADDRESS>         Transaction to address (empty to create contract)
        --url <url>            URL of RPC server [default: http://localhost:12537]
        --value <HEX>          value sent with this transaction
```

#### Example
Alice transfer 5 Drip (1 CFX = 10^18 Drip) to Bob. Note, the address of Alice must exist at local machine, otherwise please [create](#new) account for alice at first.

`./conflux rpc local send --from <alice_address> --to <bob_address> --value 0x5 --password 123456`

Alice create a contract with gas 3,000,000. You can use ***solc*** to compile contract to get the bytecodes.

`./conflux rpc local send --from <alice_address> --value 0x0 --gas 0x2DC6C0 --data <HEX_contract_bytecodes> --password 123456`
