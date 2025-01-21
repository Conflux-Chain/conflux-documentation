---
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - test framework
  - node testing
  - Python tests
  - P2P messages
  - blockchain testing
  - RPC testing
  - network simulation
tags:
  - Testing
---

# 测试框架

这个框架是用 `python3`编写的。 它可以用于搭建多个Conflux节点，并在本地测试分布式系统的运行。 通过配置节点，调用RPC，或者向他们直接发送 P2P 信息来控制节点行为。

所有相关文件都包含在 `tests` 目录中。

在项目目录下，使用`cargo build --release` 编译源代码后，你可以运行 `tests/test_all.py` 来运行所有包含的Python测试。

## 示例测试

这是一个示例测试。 它配置了2个节点，使每个节点分别生成一些块，最后连接它们来检查它们是否能够收到另一方生成的块。

```python
from test_framework.test_framework import ConfluxTestFramework
from test_framework.util import *

class ExampleTest(ConfluxTestFramework):
    def set_test_params(self):
        self.setup_clean_chain = True
        self.num_nodes = 2

    def setup_network(self):
        self.setup_nodes()
        # connect_sample_nodes(self.nodes, self.log)

    def run_test(self):
        self.nodes[0].generate(1, 0)
        assert (self.nodes[0].getblockcount() == 2)

        self.nodes[1].generate(2, 0)
        assert (self.nodes[1].getblockcount() == 3)

        connect_nodes(self.nodes, 0, 1)
        sync_blocks(self.nodes)
        assert (self.nodes[0].getblockcount() == 4)
        self.log.info("PASS")

if __name__ == '__main__':
    ExampleTest().main()
```

这个框架将：

1. 调用`set_test_params`设置测试初始化参数。
2. 根据`set_test_params`中设置的参数，设置测试目录和节点配置。 默认情况下，将创建一个临时目录，并将所有文件保存在临时目录中。 例如，设置`self.num_nodes = 2` 将为两个节点初始化目录。
3. 调用`setup_network` 添加节点并连接它们。 `self.setup_nodes()`将通过在第2步设置的目录中运行预编译的Conflux可执行二进制文件来添加2个Conflux节点。 We do not connect them here because we want nodes seperated at the beginning.
4. Call `run_test` to run the actual test codes.

在运行了 `self.setup_nodes()`之后, `self.nodes` 是一个 `TestNode`列表，每个节点都可以用来与相应的Conflux节点进行交互。 例如, 要通过调用名为`getblockcount`的RPC获取字节0中的区块数量，你只需要调用`self.nodes[0].getblockcount` ，就会返回一个整数。

`connect_nodes(self.nodes, 0, 1)` 连接节点0和1. `sync_blocks(self.nodes)` waits until all nodes have the same pivot chain tip. 这两者都是通过调用RPC实现的，更多实用的功能将在[实用功能列表](#utility-function-list)中介绍。

## 发送P2P消息

在调用 `start_p2p_connection(self.nodes)` 之后，每个 `TestNode` 的 `p2p` 字段将用一个用 Python 编写的 Conflux 模拟节点进行初始化，这个模拟节点将连接到由相应 `TestNode` 控制的 Conflux 进程。 之后，你可以在 Python 代码中发送和接收 P2P 消息。 这里是一个关于如何使用 `p2p` 与 Conflux 节点进行交互的示例。

```python
    def run_test(self):
        def assert_length(_node, msg):
            assert_equal(len(msg.headers), 1)
        h = WaitHandler(self.nodes[0].p2p, GET_BLOCK_HEADERS_RESPONSE, assert_length)
        self.nodes[0].p2p.send_protocol_msg(GetBlockHeaders(hashes=[self.nodes[0].p2p.genesis.hash]))
        h.wait()
```

This example tries to get the genesis block header from node 0 with P2P requests (instead of using RPC), and asserts that only one header is returned.

`WaitHandler` 将等待指定消息类型的第一条消息，并在这条接收到的消息上运行一个函数。 `p2p.send_protocol_msg` 用于发送一个可以用 rlp 编码的消息。 `h.wait()` 等待并处理第一条接收到的`GET_BLOCK_HEADERS_RESPONSE` 消息。 注意，`WaitHandler` 在初始化后之会立即开始监听。

## 配置

默认情况下，测试将使用 `cargo` 构建的发布版本可执行二进制文件。 If you want to use a file at another path (e.g., a debug version binary), you can set the environment variable `CONFLUX` to the full path of the used binary file before running the tests.

待实现

## Utility Function List

待实现

## Introduction to Existing Python Tests

待实现
