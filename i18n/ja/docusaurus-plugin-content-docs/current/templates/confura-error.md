The Confura service have some proprietary errors, these errors are not part of the Conflux-rust client RPC implementation.

common error response format:

```json
{
    "id": 123,
    "jsonrpc": "2.0",
    "error": {
        "code": -32000,
        "message": "daily request limit exceeded: Too many requests (exceeds 100000)"
    }
}
```

Rate Limit related errors:

| message                                                                             | note                                                       |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| daily request limit exceeded: Too many requests (exceeds 100000) |                                                            |
| access forbidden by allowlists                                                      | The requested method is only available in the VIP service. |
| allowed qps exceeded: Too many requests, exceeds 50 at a time                       |                                                            |

Encountering such errors, please purchase a higher-tier service through the web3 paywall.

getLogs related errors:

| message                                                                                                                                                                                                                                                    | note |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| event logs are too stale (already pruned)                                                                                                                                                                                               |      |
| Filter must provide one of the following: (1) an epoch range through fromEpoch and toEpoch, (2) a block number range through fromBlock and toBlock, (3) a set of block hashes through blockHashes |      |
| invalid block range (from {props.basicUnitName} larger than to {props.basicUnitName})                                                                                                                                                   |      |
| Filter must provide one of the following: (1) a block number range through fromBlock and toBlock, (2) a set of block hashes through blockHash                                                                        |      |
| filter.block_hashes can contain up to 32 hashes; xxx were provided.                                                                                                                                                                   |      |
| filter.address can contain up to 32 addresses; xxx were provided.                                                                                                                                                                                          |      |
| filter.topics must be no more than 4-dimensional array; xxx were provided.                                                                                                                                                                                 |      |
| filter.topics can contain up to 32 topics per dimension; xxx were provided.                                                                                                                                                                                |      |
| query set is too large, please narrow down your filter condition                                                                                                                                                                                           |      |
| result set to be queried is too large with more than 10000 logs, please narrow down your filter condition                                                                                                                                                  |      |
| filter not found                                                                                                                                                                                                                                           |      |

service errors:

| message                                    | note |
| ------------------------------------------ | ---- |
| no full node available                     |      |
| subscription proxy error                   |      |
| query timeout with duration exceeds 3s     |      |
| server is too busy, please try again later |      |
| RPC middleware crashed                     |      |

This type of error indicates an issue with the Confura service. Please try again later or contact the service provider.
