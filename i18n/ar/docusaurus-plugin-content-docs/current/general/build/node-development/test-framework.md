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
tags: [ Testing ]
---

# Test Framework

The framework is written in `python3`. It can setup multiple Conflux nodes and test the distributed system behavior locally. It controls the nodes behavior by setting the node configurations, calling their RPCs, or sending them P2P messages directly.

All related files are included in the directory  `tests`.

After compiling the source code with `cargo build --release` under the project directory, you can run `tests/test_all.py` to run all included python tests.

## An Example Test

Here is an example test. It setups 2 nodes, makes each node generate some blocks separately, and finally connects them to check if they can receive the blocks generated by the other.

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

The framework will

1. Call `set_test_params` to set basic test initialization parameters.
2. Setup the test directories and node configurations according to the parameters set in `set_test_params`. By default, a temp directory will be created and all files will be kept within it. For example, setting `self.num_nodes = 2` will initialize directories for two nodes.
3. Call `setup_network` to add nodes and connect them. Here `self.setup_nodes()` will add 2 Conflux nodes by running pre-compiled Conflux executable binary within the directory setupped in step 2. We do not connect them here because we want nodes seperated at the beginning.
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

TODO

## Utility Function List

TODO

## Introduction to Existing Python Tests

TODO
