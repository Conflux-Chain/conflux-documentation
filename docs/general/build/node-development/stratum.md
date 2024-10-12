---
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - Stratum protocol
  - solo mining
  - Conflux-Rust
  - mining protocol
  - proof-of-work
  - RPC interface
  - blockchain mining
tags:
  - stratum-protocol
  - solo-mining
  - conflux-rust
  - mining-protocol
  - proof-of-work
  - rpc-interface
  - node-development
  - blockchain-mining
---
# Stratum Protocol in Conflux-Rust

## Design Goal

Rust is an excellent language to develop distributed systems like Conflux, but
it is not very so good for developing miners. Miners are typically developed
via languages like C/C++ that can operate with high performance and GPUs. We
therefore design a stratum-like protocol in Conflux-Rust to enable external
miners to connect to Conflux.

Note that to keep the protocol simple, the design goal of the stratum-like
protocol is for solo-mining only, i.e., Conflux-Rust are connected with miner
processes in local or remote machines that belong to the same entity. It is not
designed to run as a mining pool server. For those who wish to run a mining
pool, it is recommended to build their own customized proxy server that
connects to Conflux-Rust.

## General Workflow

In the scenario where an external miner connecting to Conflux-Rust via its
stratum port (default 32525), here is the typical workflow.

1. The miner connects via TCP to the stratum port. Conflux-Rust must run with
the configuration that enables stratum.

2. The miner sends a `mining.subscribe` RPC call via the TCP stream. It informs
Conflux-Rust the miner name. `mining.subscribe` also performs a basic password
based authentication, where the password can be set at the configuration file
of Conflux-Rust.

3. After successful subscription, Conflux-Rust will continue to send
`mining.notify` RPC calls to the miner via the TCP stream. Each `mining.notify`
corresponds to a new proof-of-work (PoW) problem for the miner to solve. Miners
are expected to work on the last received job.

4. Whenever miner solves a PoW problem, it returns the solution (i.e., the
nonce) to Conflux-Rust via calling `mining.submit` RPC calls. 

5. Miner can simply disconnect any time in this process to quit.

## RPC Interface

### Server-side RPCs

#### mining.subscribe
Start to subscribe the proof-of-work notification from the stratum server

##### Parameters
 1. WORKER_ID, string - the name of the miner
 2. Secret, empty or 32-bytes, the secret that corresponds to the keccak result
 of the password in the configuration. Empty if password is not enabled.

##### Returns
`Bool` - `true` if successful, `false` if not.

##### Example
```
// Request
'{"jsonrpc":"2.0","method":"mining.subscribe","params":["cfxmine", ""],"id":1}'

// Response
{
  "jsonrpc": "2.0",
  "result": "true",
  "id": 1
}
```
---

#### mining.submit
Submit a PoW solution to the stratum server

##### Parameters
 1. WORKER_ID, string - the name of the miner
 2. JOB_ID, hex-string - the identifier of the job, which is typically same as
 the hash of the PoW problem.
 3. NONCE, hex-string of 32-bytes - the nonce solution of the PoW problem
 4. HASH, hex-string of 32-bytes - the hash of the solved PoW problem.

##### Returns
`Array` - A single element of `true` if successful, the first element will be
`false` if not and the second element will explain reasons in string.

##### Example
```
// Request
'{"jsonrpc":"2.0","method":"mining.submit","params":["cfxmine", "0x2106e1162d1199483fa010bcaa7d4f05b23b85d456b4a7089d787ae2e880deaf","0x21b49d385865819a171ed8cd9d9f80acc468e501f3486d3600000000000c786c","0x2106e1162d1199483fa010bcaa7d4f05b23b85d456b4a7089d787ae2e880deaf"],"id":1}'

// Response
{
  "jsonrpc": "2.0",
  "result": ["true"],
  "id": 1
}

{
  "jsonrpc": "2.0",
  "result": ["false", "invlaid nonce"],
  "id": 1
}
```
---

### Client-side Notification

Note that although the server notifies the mining client via a RPC like
request, it is not a true RPC -- it does not expect the client to return any
response. Instead, the client will just update the PoW problem it works on and
submits whenever it finds solution.

#### mining.notify
Notify the client about a new PoW problem.

##### Parameters
 1. JOB_ID, hex-string - the identifier of the job.
 2. HASH, 32-bytes - the hash of the PoW problem.
 3. BOUNDARY, U256 - the difficulty boundary of the problem. For a nonce to be valid, the resulting
 hash must be smaller than the BOUNDARY.

##### Example

```
// Request
'{"jsonrpc":"2.0","method":"mining.notify","params":["0x4e08db21d43a7696afa3d00ed948568210f3ab3f34673f1d17198625ec175a9c","0x4e08db21d43a7696afa3d00ed948568210f3ab3f34673f1d17198625ec175a9c","0x1a4e3422948568210f3ab3f34673f1d17198625ec175a9c"],"id":3}'

---
