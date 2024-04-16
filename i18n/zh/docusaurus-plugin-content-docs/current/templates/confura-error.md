Confura 服务存在一些特有错误，这些错误并不是因为 Conflux-rust 客户端 RPC 而导致的。

常见错误响应格式：

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

限流相关错误：

| 消息                           | 注释                 |
| ---------------------------- | ------------------ |
| 每日请求限额超标：请求过多（超过 100000）     |                    |
| 访问被白名单拒绝                     | 请求的方法仅在 VIP 服务中可用。 |
| 允许的 qps 超标：请求量过多，并发请求量超过了 50 |                    |

遇到此类错误，请通过 web3 支付墙购买更高级别的服务。

getLogs 相关错误：

| 消息                                                                                                                                                                           | 注释 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -- |
| 事件日志太旧（已被裁剪）                                                                                                                                                                 |    |
| 筛选器必须提供以下之一：(1) 一个通过 fromEpoch 和 toEpoch 提供的纪元范围，(2) 一个通过 fromBlock 和 toBlock 提供的区块号范围，(3) 一组通过 blockHashes 提供的区块哈希 |    |
| 无效的区块范围（从 {props.basicUnitName} 大于到 {props.basicUnitName})                                                                                   |    |
| 筛选器必须提供以下之一：(1) 一个通过 fromBlock 和 toBlock 提供的区块号范围，(2) 一组通过 blockHash 提供的区块哈希                                                           |    |
| filter.block_hashes 最多可以包含 32 个哈希；提供了 xxx 个。                                                                                            |    |
| filter.address 最多可以包含 32 个地址；提供了 xxx 个。                                                                                                                      |    |
| filter.topics 必须是不超过 4 维的数组；提供了 xxx 个。                                                                                                                       |    |
| filter.topics 每维最多可以包含 32 个主题；提供了 xxx 个。                                                                                                                     |    |
| 查询集太大，请缩小筛选条件                                                                                                                                                                |    |
| 要查询的结果集太大，超过 10000 条日志，请缩小筛选条件                                                                                                                                               |    |
| 未找到筛选器                                                                                                                                                                       |    |

service errors:

| 消息                                         | 注释 |
| ------------------------------------------ | -- |
| no full node available                     |    |
| subscription proxy error                   |    |
| query timeout with duration exceeds 3s     |    |
| server is too busy, please try again later |    |
| RPC middleware crashed                     |    |

This type of error indicates an issue with the Confura service. Please try again later or contact the service provider.
