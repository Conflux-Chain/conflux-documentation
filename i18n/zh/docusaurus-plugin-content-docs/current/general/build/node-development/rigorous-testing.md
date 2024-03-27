---
displayed_sidebar: generalSidebar
---

# Conflux的可靠性测试工具

确保像Conflux这样的区块链系统的正确性是一项非常有挑战性的任务。 Conflux Rust实现的代码库中附带了多种可靠性测试工具和脚本。

请注意，在某些终端中，默认打开的文件描述符的最大数量可能不够用。 如果您使用的是带有默认zsh终端的Mac，这一点尤其如此。 您需要按如下方式将限制更改为更大的数字：

```bash
$ ulimit -n 22288
```

## 单元测试和集成测试

单元测试与rust代码一起提供。 在编译 Conflux 的源代码之后，可以通过 `cargo test --release --all` 命令进行调用。 有关更多信息，请查看 [入门页面](https://conflux-chain.github.io/conflux-doc/get_started/)。 集成测试是在 `tests/scripts` 目录下以 `_test.py` 结尾的 python 测试脚本。 编译完 Conflux 发布的版本之后， 可以运行 `tests/test_all.py` 来一起运行所有集成测试。 每次对Conflux Rust实现进行提交时，都会定期执行这些测试。

## 共识模糊测试工具

在 `core/benchmark/consensus/test` 目录内，有一个针对共识组件的随机模糊测试工具。 它的工作原理如下。
`core/benchmark/consensus/test/gen-random-graph.cpp` 是 Conflux TreeGraph 共识算法的一个慢速 C++ 实现，它带有一个随机图生成器，可以以特殊格式生成随机 TreeGraph 区块。 `consensus_bench` 能够处理这种输入格式，运行 Conflux 共识，并与慢速 C++ 实现进行结果比较。
`iter-gen-random.py` 是一个 python 脚本，可以迭代地调用生成-处理-比较过程。 要运行这个模糊测试工具：

```bash
$ cd core/benchmark/consensus/test
$ g++ -O2 -o gen-random-graph gen-random-graph.cpp
$ ./iter-gen-random.py 10000 3 30 10 10 100
```

Python脚本将持续运行，直到它发现错误或者您手动终止它。 如果该 python 脚本找到一个错误，`rand.in` 文件将对应于触发 `consensus_bench` 程序错误的输入。 传递给 python 脚本的六个参数分别对应于每个测试案例随机生成的区块数量、 `TIMER_CHAIN_BLOCK_DIFFICULTY_RATIO` 参数，`TIMER_CHAIN_BETA`
参数，`ADAPTIVE_WEIGHT_BETA` 参数，`HEAVY_BLOCK_DIFFICULTY_RATIO` 参数和 `ERA_EPOCH_COUNT` 参数。 您可以向python脚本传递任何合法的共识参数。 这些数字是我们依据经验认为对检测bug有用的默认值。

Python脚本还会打印出测试中共识图的处理速度。 预期速度是每秒约1000个区块（在2019年的MacBook Pro笔记本电脑上）和m5a.xlarge上运行的每秒约350个区块。 如果报告的速度明显低于预期，通常意味着潜在的性能问题。 对于每个发布版本，我们都会使用默认参数至少执行一个小时的这种模糊测试。

请注意，如果您粗暴地终止这个脚本（很可能会这样做）， 它会留下两到三个带有 `__` 前缀和 `sqlite_db` 的临时目录。
您应该手动删除这些目录。

## 随机追踪测试

`tests/conflux_tracing.py` 是一个带有故障注入能力的随机测试脚本。 它将启动一个固定数量节点的Conflux网络，并在运行过程中注入节点崩溃、数据库崩溃和节点重启。 在运行过程中，它会从不同节点获取状态，并验证这些节点是否对TreeGraph和区块状态有共识。 要运行Conflux追踪测试，您需要首先从源代码编译Conflux Rust实现的发布版本。 然后，可以如下调用脚本：

```bash
$ tests/conflux_tracing.py run
```

Python脚本接着会启动10个不同的实例，以及一个模拟实例。 它会持续运行，直到发现错误（不一致状态或意外崩溃）。 对于每个版本，我们至少执行一个小时的追踪脚本。

如果发生错误，它将生成名为 `snapshot*.json` 和 `txs*.json` 的追踪文件来帮助诊断问题。 请注意，如果您强行终止这个脚本（一种很可能发生的情况）， 它也会生成这些文件，因此您可能需要手动清理它们。

## 交易传播和性能测试

`tests/scripts/one_click.sh` 以及同一目录下的其余 bash 脚本提供了在 AWS 上自动部署 Conflux 网络以测试简单支付时的 TPS 和交易池性能的方法。 您可以按照以下步骤运行这个测试：

1. 首先，您需要下载并安装AWS CLI工具。 为CLI工具正确配置AWS凭证。

2. 将您的默认公钥注册为 _the us-west-2 region_ 中的一个命名密钥对。

3. 确定您想要测试的 Conflux 仓库分支。 请注意，此脚本会实时从包含Conflux Rust实现的GitHub仓库拉取源代码并编译。 您无法用这个脚本运行本地的Conflux副本。 如果您不指定仓库/分支名称，它将从GitHub的官方Conflux-rust仓库拉取。

4. 运行以下命令：

```bash
$ cd tests/scripts
$ ./one_click.sh key-pair-name 20 branch-name [repo-name]
```

这将在us-west-2区域启动20个实例，同时启动一个随机事务生成器。 大约需要15分钟来设置实验，然后20分钟完成运行。 最后，它将报告TPS性能。 预期的良好TPS数值是约4000TPS。 如果您得到的TPS数值远低于预期，那么可能在事务池或存储层出现了性能回退。 对于每个版本，我们都会运行这个脚本来测试其性能。

## 存储基准测试

Conflux的存储层往往是性能瓶颈。
因此，`core/benchmark/storage` 包含一个基准测试工具，用于测量存储层的性能，且排除了执行中的其他层。
我们还将以太坊网络历史支付交易（前大约400万个区块）转换为基准追踪。 以下是运行存储基准测试的步骤：

1. 从 AWS S3 的 `conflux-storage-bench` 桶下载 `foundation.json` 和 `eth_from_0_to_4141811_txs.rlp.tar.gz`。

2. 解压 rlp 历史文件以获取 `eth_from_0_to_4141811_txs.rlp`。

3. 转到 `core/benchmark/storage` 并运行 `cargo build --release`来编译二进制文件 `storage_bench`。

4. 创建一个临时目录 \`tmp_storage_db，用于保存实验中生成的区块链数据库。

5. 调用以下命令：

```bash
$ cd core/benchmark/storage
$ RUST_BACKTRACE=full target/release/storage_bench run -g /path/to/foundation.json -t /path/to/eth_from_0_to_4141811_txs.rlp -d /path/to/tmp_storage_db --txs_to_process 30000000 --skip 1156773812
```

该命令将处理解析历史文件中的前3000万笔交易然后退出。 计算这个命令的运行时间以计算存储层的处理吞吐量是一个好主意。
性能很大程度上取决于底层磁盘I/O的质量。
在2019年的MacBook Pro上，吞吐量是25000-30000 TPS。 在m5a.xlarge上，吞吐量是15000-20000 TPS。 如果性能低于预期，这表明存储层可能存在潜在的性能回退。 对于每个版本，我们都会运行这个测试以检查存储层的性能。

## 共识性能基准测试工具

共识实现通常很快，能在正常情况下每秒处理近千个区块。 然而，如果TreeGraph不稳定且包含很多分支，共识组件可能会退回到慢速程序。 其在这种不稳定情景下的性能至关重要，因为它对应于DoS攻击期间的追赶速度。
`tests/attack_bench` 包含一系列 python 脚本，用于在攻击情景下对共识性能进行基准测试：

1. `fork_same_height_merge.py` 会创建一个不稳定的 TreeGraph，大约有 95000 个区块。 In the TreeGraph, it has three branches and in each branch there are
   star shape forks attached at a fixed height. It corresponds to one worst case
   scenario for the consensus procesing engine. The expected speed is \~70 blocks/s
   on MacBook Pro 2019 and \~45 blocks/s on m5a.xlarge.

2. `fork_same_height_hiding.py` tests the scenario where an attacker tries to
   actively mine at a fixed height, hides the mined blocks, and release them
   together. It measures the block generation capaiblity of the victim at this
   scenario. The expected generation speed is always faster than 1000 blocks in
   less than 1 minutes.

3. `fork_same_height_attack.py` tests a similar attack as 2 but the attacker
   does not hide the blocks. The expected generation speed is always faster than
   100 blocks in less than 10 seconds.

4. `fork_chain_hiding.py` tests the scenario where an attacker tries to
   actively mine a separate chain, hides the mined blocks, and release them
   together. The expected generation speed of the victim is always faster than 100
   blocks in less than 10 seconds.

5. `fork_chain_attack.py` tests a similar attack as 4 but the attacker does not
   hide the blocks. The expected generation speed of the victim is always faster
   than 100 blocks in less than 10 seconds.

Note that 2, 3, and 5 are long running test scripts and you can terminate the
execution after the speed stablizes. For every release, we run these scripts to
make sure that there is no performance regression.
