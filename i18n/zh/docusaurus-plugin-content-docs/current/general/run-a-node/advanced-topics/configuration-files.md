---
sidebar_position: 7
title: 节点配置文件
keywords:
  - config
  - node
displayed_sidebar: generalSidebar
---

以下是一个主网节点配置文件，其中包含所有支持的选项以及一些在注释中的说明。 您也可以在[conflux-rust Github存储库的run文件夹](https://github.com/Conflux-Chain/conflux-rust/tree/master/run)中找到最新版本的配置文件。 文件名为`hydra.toml`或`testnet.toml`。 您还可以在相同的文件夹中找到日志配置文件[`log.yaml`](https://github.com/Conflux-Chain/conflux-rust/blob/master/run/log.yaml)。

注意：从Conflux-rust v2.0版本开始，主网的配置文件已从`tethys.toml`更名为`hydra.toml`。

```toml
# bootnodes是一个Conflux节点信任的节点列表，当节点启动时，将用于同步区块链。 
# 该值是一个由逗号分隔的字符串，每个条目表示一个节点
# 一个节点由cfxnode://NODEID@PUBLICIP:PORT标识
# 默认情况下，没有提供任何bootnodes。 这里提供的是Conflux团队在全球范围内维护的节点列表。

bootnodes="cfxnode://25265e1aa470d9d8667947820c4830a64e9f9678d6cb23ecde91e0447527f4926257b9637923a305ce91e15c929ed28164e6c32b76213764eb4a9624120ae1d7@39.97.180.246:32323,cfxnode://2b72adc3f52a80945db10fa35c3f6d02c73f65ff98b4a9eae4f7b244e8a51f01690e7dcef7a30bfb67fb07fcb2949e67c27487169623d40f6a9e55a8d04ca34f@39.107.143.220:32323,cfxnode://5da942ac58e392e9f68784876a1800ffe5756f8498aa1a7a9a869fe9370c2e838a114dfce33fff9674633700a0094aed8b46722fb6b03619842602a2473223de@39.97.170.199:32323,cfxnode://28d3cdf07b7deb41bb52dee0a952fc599f46f6b89cc513ecfd1020d5a66e73e7cfe68543e64962aefbcae7123a6c390a43144f5900f0bc181c3c89ffdf9ff81b@39.97.225.254:32323,cfxnode://49ff58db6b4c5f92c2145e69ea0625134cbe35885f0e5979191ba9c67e4c9374234ed7fbeb65f82d4d197568110a4f100f078bfbac896f391b362bec77be19ea@39.103.68.228:32323,cfxnode://97497107e94ac463f6bad526d74e0058d46154e97cbf758edaf3d360e2f3347ae5946ca337eb0d201df8f625e7ae5bfc32e8394d2ce37bd2dc35fa5a4bcecd01@8.131.69.64:32323,cfxnode://c22ad0736f5cc2cc3b11ce5f43345213c2e44994dfaa5e3b0cebe8bd9c78cc52e1a22949ff5953aea80476f648e42b502172e04629c172f4400a0af4caf97efb@8.131.68.192:32323,cfxnode://04cee414977f68a0c2f0215199dde4ec1c27350e447ea855ce000054336f4ccb1c43f0c5ebe8172ad51c7d7b88ac98c037a85ae949e79734449ac38a23fd1d60@106.14.64.36:32323,cfxnode://f1750b818c5828fc5f22667f4b45d4a39b17a1cf40f71ae8f74b6195485a93bf16892a3785bda36132ebae64b83b91b216eaccb7a02185a01f37c7ad89c513ad@101.132.133.254:32323,cfxnode://72a21ec3d2d7c5545b4a46656eaca6ab4ec3ac85628f665bd205e7c52273d345d1583efface277b967fca963a81fbf8b7a81ae97f0a46234cd5fb34853c95fd2@47.101.39.91:32323,cfxnode://b7aeba1f1b2b3e5dfdc7ac93df4281a440ccbdc89894444e094f15242ffa1578d90f9fd447b899be89a57542616e26a82180bd2bfb3b81f82a4dffdfe180f44e@8.210.110.149:32323,cfxnode://07faaf8be8bff4243b496363fb02bd0a21be97e291febcd9aabb29996de90d0a10065f3383beff09f05cb0bdfaa9655d90550c8abcbf97be0658ce6efd8f9b64@47.254.67.249:32323,cfxnode://b77e95cb41cae81dd82a29a07b776549ff37d93954b46214aa32036280c412cefee57350f3e1a4e9db21785ee5a4370961a55a856f7fcb664e511f2fb17f7881@35.171.101.208:32323,cfxnode://0f69308d246238e5a5a91769ab1757962e787bbdbf2c478a60cb6aed1cee8c57045d0402cdea5ee0227a884e92d72ede7742c6a3ac6f2eeb283e68ceb9503a7f@52.52.5.142:32323,cfxnode://cac5aed8c474dab7815d53a8c16434893d750455341252590e09353608106a6bc47c5e78409a47f740ca2c88be83140a660d20ceb665e8e6dd8d5ce57851a891@54.94.4.66:32323,cfxnode://e5189aed19303ee171be0a8cc206324fd7a5fe4a2a52a02aba5d869a01ba6a7865e6aeeab32db97b9bbd216e7b7ebc72bb1aed53df659cf13142a65c13cd3dd9@15.184.179.185:32323,cfxnode://70dba74973f9deac76fb6e3987c07f434d8d162cb3f5ae9db4aa717caf02c6f5c5fefac4e21b01635a697127ef9333465eeb5e2f3a539ffbcba786875c075433@18.132.169.41:32323,cfxnode://be27a2f6f4b06919ecc76fa1263b5beb067a1011746371747786ec1c75e1186254f26d7209ac3b7185109db208fcb098032f1d616cb93227bec750226f246f45@13.51.0.234:32323,cfxnode://838ee636dd6ebd18cbc50eb1448dc41b54fb9e7c2de679f2b119ef52df60fa23797d9cba41111c1431693b29aba9a3351c8ae29d3691ddb8261d677d7e1b7cd8@18.158.251.2:32323,cfxnode://b69865a15548528c3734f581294a022dc8f3c8a14e2d1fe82f5cbce63906316c5af321990c984c9ebe2c990b77d7991d389645d278e31e86c64a32b1f41f3a9a@18.136.130.20:32323,cfxnode://e7f13b08d8bd80cf62dff22bd57d423bade2aa8a87c7c5ad7332ccd57d7c642956a3dae898a9d56c3542200de1b696689f1105132196916cd5c82cf3e5a5c2a0@3.114.73.12:32323,cfxnode://c65a039e657bfe5ec6005feca4450a705f43cd36656ae45033d68425edc8c002983a9ec941e6eb2529580888fa7348934ccc9a5396c2fe3d0d5036ed4e806efd@3.37.149.79:32323,cfxnode://6d6d9c474f792bcb7fa68ec04e81831e9cb18407a3b3b37b9140e32f94403b820193920a281c97875717c01c3827429ee3eefef30dc0c65b1436228d065e8179@18.163.95.162:32323"

# Set the node type to Full node, Archive node, or Light node.
# 取值可以为 "full"（完整节点）、"archive"（归档节点）或 "light"（轻节点）。
# 命令行参数 `--full`、`--archive` 或 `--light` 将覆盖此参数设置。
#
# node_type = "full"

# 一些预设的开发配置。
# 在生产环境中不应该设置此参数。
#
# 对于`test`和`dev`模式，我们将：
#     * 将初始难度设置为4
#
# `test`模式用于Conflux的测试和调试，我们将：
#     * 增加与节点连接的延迟
#     * 跳过握手加密检查
#     * 跳过头部时间戳验证
#     * 在catch-up模式下处理NewBlockHash事件
#     * 允许数据传播测试
#     * 允许设置创世账户并从密钥生成交易
#
# `dev`模式用于用户运行单个节点，自动生成具有固定间隔的区块
#     * 如果您希望使用RPC功能，还需要设置`jsonrpc_ws_port`、`jsonrpc_tcp_port`和`jsonrpc_http_port`。
#     * 在收到交易后或固定时间间隔内生成区块（参见`dev_block_interval_ms'`)
#     * 即使没有节点，也跳过catch-up模式
#
# mode = ""

# 如果您想设置一个运行Conflux进行开发的单个节点。 您应该
# 注释掉bootnodes设置，并使用以下参数：

mode = "dev"

``dev_block_interval_ms''控制开发模式下的挖矿速率。
#
# 如果未设置，将仅在接收到交易后生成区块。
# 否则，每隔``dev_block_interval_ms''毫秒自动生成区块。
#
# dev_block_interval_ms = 250

# ----------------- 挖矿配置 -----------------

# `mining_author`是接收挖矿奖励的地址。
# 如果设置了，`mining_type`将默认为"stratum"。
# 该值为一个40位十六进制字符串或有效的CIP-37 base32地址。
# 默认情况下，该值未设置。
#
# mining_author="cfx:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg"

# `mining_type` 控制挖矿过程是否通过stratum协议、使用CPU挖矿，或禁用挖矿。
# 可能的取值为 "stratum"、"cpu" 和 "disable"。
# 如果设置了`mining_author`，则默认值为 "stratum"。
# 如果设置了该值且不为 "disable"，则必须设置`mining_author`。
#
# mining_type = "stratum"

# Stratum的监听地址
#
# stratum_listen_address = "127.0.0.1"

# Stratum的端口号。
#
# stratum_port = 32525

# PoW管理器的窗口大小
#
# pow_problem_window_size = 1

# Stratum的密钥。
# 值为64位十六进制字符串。
# 如果未设置，RPC订阅将不会检查授权。
#
# stratum_secret = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"

# -------------- 与日志相关的配置 -------------

# `log_conf` 是log4rs配置文件的路径。 文件中的配置将覆盖`log_level`设置的值。
# 默认情况下，该值未设置。
#
log_conf="log.yaml"

# `log_file` 是日志文件的路径"
# 如果未设置，日志只会打印到stdout，不会保存到文件中。
# 默认情况下，该值未设置。
#
# log_file="conflux.log"

# `log_level` 是打印的日志级别。
# 值应为 "error"、"warn"、"info"、"debug"、"trace"、"off" 中的一个

# log_level="info"

# -------------- 网络配置 -------------

# `public_address` 是此节点的地址，用于其他节点连接。
# 如果未设置，进程将尽力找出公网IP，并使用`tcp_port`作为公共端口。
# 但是，强烈建议手动设置该值，特别是对于通过NAT转换的机器。
#
# public_address="1.1.1.1"

# `tcp_port` 是进程用于监听P2P消息的TCP端口。 默认为 32323。
#
# tcp_port=32323

# `public_tcp_port` 是其他节点应该连接的公共TCP端口。 它可能与tcp_port不同
# 如果机器位于NAT后面的话。 默认值与`tcp_port`相同。
#
# public_tcp_port=32323

# `udp_port` is the UDP port used for node discovery.
# 如果未设置，它将与 `port` 相同。
#
# udp_port=32323

# `jsonrpc_http_threads` 用于控制处理HTTP RPC请求的线程数。
#
# jsonrpc_http_threads=1

# `jsonrpc_http_keep_alive` 用于控制是否为RPC HTTP连接设置KeepAlive。
#
# jsonrpc_http_keep_alive=false

# `jsonrpc_cors` 用于控制RPC域验证策略。
#
# jsonrpc_cors="none"

# 值应为 "none"、"all" 或由逗号分隔的字符串列表（不包含空格）。
# 如果未设置，将禁用域验证。
# 默认情况下，值未设置。
#
# jsonrpc_cors="all"

# 以下参数是节点提供RPC服务的端口。 如果未设置，
# 节点将不会启动RPC服务。 默认情况下，`jsonrpc_local_http_port`被设置，
# 以支持Conflux CLI子命令。 What's provided here is the recommended
# value if you want to start rpc services for other front-end applications.
# 注意，为了提供与交易相关的RPC服务，`persist_tx_index`也应设置为`true`，
# 否则节点只能处理最近的交易。
#
# jsonrpc_ws_port=12535
# jsonrpc_tcp_port=12536
# jsonrpc_http_port=12537
# jsonrpc_local_tcp_port=12538
# jsonrpc_local_http_port=12539
# jsonrpc_local_ws_port=12540
# jsonrpc_http_eth_port=8545
# jsonrpc_ws_eth_port=8546

# 使用逗号分隔的API名称列表，指定通过公共JSON-RPC接口（HTTP、TCP、WebSocket）提供的API。
# 可能的名称有：all, safe, cfx, pos, debug, pubsub, test, trace, txpool。
# `safe` 只包括 `cfx`、`pubsub` 和 `txpool`。
#
# public_rpc_apis = "safe"
# public_evm_rpc_apis = "evm"

# --------------- Performance-related Network Parameters ----------------------

# Timeout for block-related requests (GetBlock, GetCmpctBlock, GetBlockTxn)
#
# blocks_request_timeout_ms = 20_000

# Time interval to check timeout requests periodically.
#
# check_request_period_ms=5000

# 快照检索的块大小
#
# chunk_size_byte = 4194304

# 控制是否降级对等节点为不可信任
#
# demote_peer_for_timeout = false

# 当达到最大网络队列大小大小时 队列将拒绝任何新的数据。
# 单位是 MB。
#
# egress_queue_capacity = 256

# 按比例进行限流的最小队列大小。
# 单位是 MB。
#
# egress_min_throttle = 10

# 按比例进行限流的最大队列大小。
# 单位是 MB。
#
# egress_max_throttle = 10

# 定期进行垃圾回收以清理不可用于块图的块的时间间隔。
#
# expire_block_gc_period_s = 900

# 头部相关请求（GetBlockHeaders）的超时时间
#
# headers_request_timeout_ms=10_000

# 定期以心跳的形式广播状态的时间间隔
#
# heartbeat_period_interval_ms = 30_000

# 维护交易摘要在传输状态下的时间。
#
# inflight_pending_tx_index_maintain_timeout_ms = 30_000

# 在`timeout_observing_period_s`中允许的最大超时次数。
# 如果达到最大值，将断开与对等节点的连接。
# `demote_peer_for_timeout` 控制在这种情况下是否降级对等节点。
#
# max_allowed_timeout_in_observing_period = 10

# 从中下载状态块的最大对等节点数。
#
# max_download_state_peers = 8

# 同时进行握手会话的最大数量。
#
# max_handshakes = 64

# 入站连接的最大数量。
#
# max_incoming_peers = 64

# 出站连接的最大数量。
#
# max_outgoing_peers = 16

# 与存档节点的出站连接的最大数量。 0表示
# 不需要连接到存档节点。 例如， 轻节点或完整节点
# 不需要连接到存档节点。
#
# max_outgoing_peers_archive = 0

# 每个对等节点的传输中请求的最大数量。
# 如果达到最大值，请求将被缓冲，直到传输中的请求得到响应或超时。
#
# max_inflight_request_count = 64

# 广播交易摘要的最大节点数。
#
# max_peers_tx_propagation = 128

# 等待处理的最大缓存接收块大小。
#
# max_unprocessed_block_size_mb = 128

# 广播交易摘要的最小对等节点数。
#
# min_peers_tx_propagation = 8

# Minimum number of normal-phase peers to estimate the current global latest epoch for phase change.
#
# min_phase_change_normal_peer_count = 3

# The time to maintain received transactions to avoid duplicated requests.
#
# received_tx_index_maintain_timeout_ms = 300_000

# 在追赶过程中是否使用公钥请求块，以避免恢复交易的公钥。
#
# request_block_with_public = false

# 定期广播交易摘要的时间间隔。
#
# send_tx_period_ms = 1300

# 请求快照候选项的超时时间。
#
# snapshot_candidate_request_timeout_ms = 10_000

# 请求快照块的超时时间。
#
# snapshot_chunk_request_timeout_ms = 30_000

# 请求快照清单的超时时间。
#
# snapshot_manifest_request_timeout_ms = 30_000

# `throttling_conf` 是以TOML格式的配置文件，用于限制RPC、P2P消息。
# 仅在指定了参数时才启用限流。
#
# throttling_conf="throttling.toml"

# 观察对等节点是否有过多超时的时间周期。
#
# timeout_observing_period_s = 600

# 交易请求的超时时间。
#
# transaction_request_timeout_ms = 30_000

# 维护已发送交易信息以回答请求的时间。
#
# tx_maintained_for_peer_timeout_ms = 600_000

# --------------- 对等节点管理参数 -------------

# 当没有足够的出站连接时，刷新发现协议的超时时长。
#
# discovery_fast_refresh_timeout_ms = 10_000

# 初始化节点连接管理的超时时长。
#
# discovery_housekeeping_timeout_ms = 1_000

# 同一当前发现过程的连续轮之间的时间间隔。
#
# discovery_round_timeout_ms = 500

# `enable_discovery` 用于控制节点是否会向其邻居请求新的节点，
# 以及是否会响应其他节点的发现请
#
# enable_discovery=true

# `netconf_dir` 是用于存储与网络相关的持久化数据的目录，
# 包括 `net_key`、受信任节点列表和不受信任节点列表。
#
# 默认情况下，它存储在配置了 `conflux_data_dir` 的目录下，目录名为 `net_config`。
#
# 如果设置了该参数，则目录路径将不再与 `conflux_data_dir` 相关。
#
# netconf_dir="./blockchain_data/net_config"

# `net_key` 是生成该节点的唯一节点 Id 的 256 位私钥。
# 值为64位十六进制字符串。
#
# 如果未设置，则节点将尝试从 `netconf_dir` 目录下的文件 "key" 中读取。
#
# 如果找不到该文件，则节点将生成一个随机的密钥。
# 默认情况下，该值未设置。
#
# 如果节点重新启动，建议保持密钥不变。
#
# net_key="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"

# 持久化节点表的超时时长。
#
# node_table_timeout_s = 300

# 提升的连接生命周期阈值。
#
# node_table_promotion_timeout_s = 259200

# `session_ip_limits` 限制每个 IP 地址或子网的 TCP 连接数，以确保安全性。
#
# 其格式为 "n1,n2,n3,n4"，其中 n1 是单个 IP 地址的 TCP 连接配额，n2/n3/n4 是子网 a/b/c 的配额。 默认值为 "1,8,4,2"，表示：
#   1) 单个 IP 地址只允许 1 个 TCP 连接。
#   2) 子网 a（例如 192.xxx.xxx.xxx/8）允许 8 个 TCP 连接。
#   3) 子网 b（例如 192.168.xxx.xxx/16）允许 4 个 TCP 连接。
#   4) 子网 c（例如 192.169.0.xxx/24）允许 2 个 TCP 连接。
# 注意，0 表示无限制。
#
# session_ip_limits="1,8,4,2"

# subnet_quota 限制存储在数据库中的子网 B（例如 192.168.xxx.xxx/16）的节点数量。
# 数据库中的节点用于建立用于 P2P 通信的出站 TCP 连接。
# 注意，0表示无限制。
#
# 子网配额=32

# ---------------- 区块号索引参数 -----------------

# 是否持久化区块号索引。
# 只有在您希望使用以区块号作为输入的RPC时才需要启用此选项。
#
# persist_block_number_index = true

# ---------------- 交易缓存参数 -----------------

# 是否持久化交易索引。
# 只有在您希望可靠地回答与交易相关的RPC时才需要启用此选项。
#
# persist_tx_index = false

# 在内存交易缓存中保留交易的时间。
#
# tx_cache_index_maintain_timeout_ms = 300_000

# 交易池中允许的最大交易数。
#
# tx_pool_size = 50_000

# Minimum allowed transaction gas price for two spaces in the transaction pool.
#
# tx_pool_min_native_tx_gas_price = 1_000_000_000
# tx_pool_min_eth_tx_gas_price = 20_000_000_000

# ------------------ Storage Parameters ----------------------

# The number of additional snapshot before the current stable checkpoint that we will maintain.
# 如果为0，则所有稳定创世之前的快照将被删除，状态将不可用。
#
# additional_maintained_snapshot_count = 0

# 在当前epoch创世检查点之前，保留不同类型数据的额外epoch数。
# 对于完整节点/轻节点，默认值为0，意味着检查点之前的所有数据将被删除。
# 对于归档节点，保留所有这些数据是默认行为，而手动设置这些参数将覆盖相应数据类型的默认行为，并相应进行垃圾回收。
#
# additional_maintained_block_body_epoch_count = 0
# additional_maintained_execution_result_epoch_count = 0
# additional_maintained_reward_epoch_count = 0
# additional_maintained_trace_epoch_count = 0
# additional_maintained_transaction_index_epoch_count = 0

# 从内存数据缓存中清除旧数据的时间间隔。
#
# block_cache_gc_period_ms = 5_000

# Database type to store block-related data.
# Supported: rocksdb, sqlite.
#
# block_db_type = "rocksdb"

# The root directory of all data (block data, state data, and node database).
#
# conflux_data_dir = "./blockchain_data"

# The directory to store block-related data.
#
# By default, it is stored under the directory configured with `conflux_data_dir` with the directory name `blockchain_db`.
#
# 如果设置了该参数，则目录路径将不再与 `conflux_data_dir` 相关。
#
# block_db_dir = "./blockchain_data/blockchain_db"

# Maximum size of cached ledger data (block, receipts, e.t.c.)
# 单位是 MB。
#
# ledger_cache_size = 1024

# Rocksdb cache size.
# Only applies if `block_db_type = "rocksdb"`.
#
# rocksdb_cache_size = 128

# Rocksdb compaction file path.
# Only applies if `block_db_type = "rocksdb"`.
# If not set, compaction configuration will be set automatically by rocksdb.
#
# rocksdb_compaction_profile = "./compact_file.conf"

# State storage parameters.
# Refer to the documentation for details.
#
# storage_delta_mpts_cache_recent_lfu_factor=4.0
# storage_delta_mpts_cache_size=20000000
# storage_delta_mpts_cache_start_size=1000000
# storage_delta_mpts_node_map_vec_size=80000000
# storage_delta_mpts_slab_idle_size=200000

# Configure the maximal open MPT count. Open MPTs are maintained as an LRU cache, and we will close the database handle
# for the evicted MPT once its usage finishes. Every MPT contains the data written in 2000 epochs.
# Accessing a state involves opening both its delta MPT and intermediate MPT,
# so setting this to 4 allows to access two states at the same time. A full node always needs one latest state to
# process new epochs, so with the default value we can frequently access one old state (by calling state-related RPCs)
# efficiently without the overhead of opening/closing databases.
#
# Idealy, if the RPC working set involves accessing X state ranges frequently (each range has 2000 epochs),
# this value should be set to 2+2X to avoid thrashing.
# However, increasing the value may increase the system memory usage by opening more database instances at the same
# time, and the memory usage of an MPT is affected by `rocksdb_cache_size`.
#
# storage_max_open_mpt_count = 4

# Configure if we strictly check the tx index before garbage collection.
# Setting it to `false` will improve the performance. But if the value is `false`, it's possible that although the
# epoch where a tx is executed should not be garbage collected, the tx index of this tx is removed because it's packed
# in an already garbage collected epoch.
#
# strict_tx_index_gc = true

# The epoch number where we want to download the state and start re-executing transactions.
# For full nodes, if the value is not set, the parameter will not take effects.
# For archive node, the default value is 0.
#
# sync_state_starting_epoch = 0

# The number of epochs needed between our best_epoch and our neighbours' best_epoch that we want to
# start downloading states during catching up.
#
# sync_state_epoch_gap = 20

# ------------------ Light Node Parameters ----------------------

# Header sync parameters.
# ln_header_request_batch_size = 30
# ln_header_request_timeout_sec = 2
# ln_max_headers_in_flight = 1000

# Epoch sync parameters.
# ln_epoch_request_batch_size = 100
# ln_epoch_request_timeout_sec = 2
# ln_max_parallel_epochs_to_request = 10
# ln_num_epochs_to_request = 200
# ln_num_waiting_headers_threshold = 1000

# -------------------- Trace Parameters -------------------

# Whether to trace EVM execution and records the result in database.
#
# executive_trace = false


# -------------------- Others -------------------

# Time (in milliseconds) after which accounts are re-read from disk.
#
# account_provider_refresh_time_ms = 1000

# Whether to allow execution without deferring if the execution thread is idle.
#
# enable_optimistic_execution = true

# Maximum number of blocks whose timestamp is in the near future is maintained in memory.
#
# future_block_buffer_capacity = 32768

# Maximum number of log entries returned from cfx_getLogs and eth_getLogs.
# If not set, cfx_getLogs and eth_getLogs will not limit the number of logs returned.
#
get_logs_filter_max_limit = 5000

# Epoch batch size used in log filtering.
# Larger batch sizes may improve performance but might also prevent consensus from making progress under high RPC load.
#
# get_logs_epoch_batch_size = 32

# The maximal allowed number of epochs between `from_epoch` and `to_epoch` in the filter to call `cfx_getLogs`.
# If not set, there is no limit on the gap.
# By default it is not set.
#
# get_logs_filter_max_epoch_range = 10000

# The maximal allowed number of blocks between `from_block` and `to_block` in the filter to call `cfx_getLogs`.
# If not set, there is no limit on the gap.
# By default it is not set.
#
# get_logs_filter_max_block_number_range = 10000

# Maximum number of transactions allowed for peers to send to a catch-up node.
#
# max_trans_count_received_in_catch_up = 60_000

# The chain ID of Conflux Network (Conflux space)
# 1 for testnet
# 1029 for Mainnet (Hydra)
#
chain_id = 1029

# The EVM chain ID of Conflux Network (EVM space)
# 1030 for Mainnet (Hydra)
#
evm_chain_id = 1030
hydra_transition_number = 92060600
hydra_transition_height = 36935000
cip43_init_end_number = 92751800
pos_reference_enable_height = 37400000
```
