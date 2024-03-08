---
sidebar_position: 11
title: 运行全节点
displayed_sidebar: generalSidebar
---

### 硬件要求

* 至少16GB 内存。

* 至少需要1TB的可用磁盘空间(建议使用SSD)。

* 稳定的互联网网络连接。

## 配置 Conflux 全节点

Conflux 可以使用 CLI 选项或配置文件进行配置。 如果 CLI 标志和配置文件在设置上有分歧，CLI 优先。

配置文件遵循 [TOML ](https://github.com/toml-lang/toml)格式。 配置文件的路径可以使用 CLI 选项` --config path/to/conflux.toml `设置。 在 `run` 目录中提供了一个默认的配置文件` hydra.toml`，并对每个配置进行了解释，您可以从那里开始定制您的配置。

您可以通过运行` $ ./conflux --help `列出所有 CLI 选项。 绝大多数 CLI 选项都映射到 TOML 文件中的设置，例如可以通过创建配置文件设置 `--public-address 127.0.0.1:32323：`

```toml
public_address="127.0.0.1:32323"
```

如果您打算设置一个节点并让它加入 Conflux 主网（测试网），您需要适当地设置` public_address`。 它应该设置为您的节点的 IP 地址，可以从互联网公开访问。 如果您的节点位于公共网关下，您可以通过在 [Google ](https://www.google.com)中搜索 "ip" 获取其公共地址。

如果您想让您的节点参与挖矿过程，您需要通过设置 `start_mining` 为 "true" 以及` mining_author` 为接收挖矿奖励的帐户地址来启用它。

如果您想打开 http 或 websocket RPC，您需要通过设置` jsonrpc_http_port `或` jsonrpc_ws_port` 来启用它。 **请注意，为了提供与交易相关的 RPC，`persist_tx_index` 也应设置为 `true`，否则节点只能处理非常近期的交易。**

## 运行测试

我们有用 Rust 编写的单元测试和用 Python 编写的集成测试。 在对代码进行一些修改后，您可以运行这些测试，看看系统是否仍然正常运行。

首先，您需要按照安装测试依赖项中的说明[安装依赖项](./compiling-conflux-client.md#install-test-dependencies)。

然后，您可以按以下方式运行测试

* Linux
  
        $ ./dev-support/test.sh

    这将自动运行我们 Rust 代码中的单元测试和 python 测试。

* 其他

    运行 Rust 中的单元测试：
  
        $ cargo test --release --all

    运行 python 集成测试：
  
        $ ./tests/test_all.py

