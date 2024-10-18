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
3. 调用`setup_network` 添加节点并连接它们。 Here `self.setup_nodes()` will add 2 Conflux nodes by running pre-compiled Conflux executable binary within the directory setupped in step 2. We do not connect them here because we want nodes seperated at the beginning.
4. Call `run_test` to run the actual test codes.

After running `self.setup_nodes()`, `self.nodes` is a list of `TestNode`, and each can be used to interact with the corresponding Conflux node. For example, to get the number of blocks in node 0 by calling the RPC named `getblockcount`, you simply call `self.nodes[0].getblockcount` and an integer will be returned.

`connect_nodes(self.nodes, 0, 1)` connects nodes 0 and 1. `sync_blocks(self.nodes)` waits until all nodes have the same pivot chain tip. Them are both implemented by calling RPCs, and more useful functions will be introduced in [Utility Function List](#utility-function-list).

## Sending P2P Messages

After calling `start_p2p_connection(self.nodes)`, the field `p2p` of each `TestNode` will be initialized with a simulated Conflux node written in Python, and this simulated node will be connected to the Conflux process controled by the corresponding `TestNode`. After that, you can send and receive P2P messages within python code. Here is an example about how to use `p2p` to interact with the Conflux node.

```python
    def run_test(self):
        def assert_length(_node, msg):
            assert_equal(len(msg.headers), 1)
        h = WaitHandler(self.nodes[0].p2p, GET_BLOCK_HEADERS_RESPONSE, assert_length)
        self.nodes[0].p2p.send_protocol_msg(GetBlockHeaders(hashes=[self.nodes[0].p2p.genesis.hash]))
        h.wait()
```

This example tries to get the genesis block header from node 0 with P2P requests (instead of using RPC), and asserts that only one header is returned.

`WaitHandler` will wait for the first message of the designated message type and run a function on this received message. `p2p.send_protocol_msg` is used to send a rlp-encodable message. `h.wait()` waits and handles the first received `GET_BLOCK_HEADERS_RESPONSE` message. Note that `WaitHandler` starts listening right after it's initialized.

## Configurations

By default, tests will use the release version executable binary built by `cargo`. If you want to use a file at another path (e.g., a debug version binary), you can set the environment variable `CONFLUX` to the full path of the used binary file before running the tests.

待实现

## Utility Function List

待实现

## Introduction to Existing Python Tests

待实现
