---
sidebar_position: 5
title: 编译 Conflux 节点
displayed_sidebar: generalSidebar
tags:
  - node
---

import { confluxNodeVersion } from '../../../templates/parameters.ts'

这里是关于如何从源代码构建Conflux并运行节点的逐步指南。

## 安装构建依赖

Conflux requires **Rust 1.77.2**, `clang`, and `sqlite` to build.

我们推荐通过[rustup](https://rustup.rs/)来安装Rust。 如果您还没有安装`rustup`或`clang`，可以这样安装它们：

### Linux:

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
# you might need to run 
# source "$HOME/.cargo/env"
# to configure your shell
rustup install 1.77.2
```

其他依赖包括`clang`、`cmake（版本 >= 3.12）`和`sqlite（版本 >= 3.8.3）`可以这样安装：

- Ubuntu 18.04-22.04:

```bash
# Ubuntu 18.04上最新的cmake版本是3.10，因此您需要从Kitware仓库安装它。
# This step is not required on Ubuntu 22.04
wget -O - https://apt.kitware.com/keys/kitware-archive-latest.asc 2>/dev/null | gpg --dearmor - | sudo tee /usr/share/keyrings/kitware-archive-keyring.gpg >/dev/null
echo 'deb [signed-by=/usr/share/keyrings/kitware-archive-keyring.gpg] https://apt.kitware.com/ubuntu/ bionic main' | sudo tee /etc/apt/sources.list.d/kitware.list >/dev/null

sudo apt-get update
sudo apt-get install clang libsqlite3-dev pkg-config libssl-dev cmake
```

- CentOS 7 / RHEL:

```bash
sudo yum install epel-release
sudo yum install clang gcc gcc-c++ openssl-devel cmake3 wget

# 如果您已经安装了2.8版本的cmake，这可能会失败。
# 您可以选择先卸载cmake。
sudo ln -s /usr/bin/cmake3 /usr/bin/cmake

# CentOS 7上官方的sqlite版本是3.7.17，因此我们需要从源代码安装最新版本。
# 源代码可以从https://www.sqlite.org/download.html下载
wget https://www.sqlite.org/2020/sqlite-autoconf-3320100.tar.gz
tar xfvz sqlite-autoconf-3320100.tar.gz
cd sqlite-autoconf-3320100
./configure
make
sudo make install
```

### OSX:

```shell
curl https://sh.rustup.rs -sSf | sh
# you might need to run 
# source "$HOME/.cargo/env"
# to configure your shell
rustup install 1.77.2
```

如果您需要使用`brew`来安装`clang`，可能需要安装`brew`：

```shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

`clang`随Xcode命令行工具一起提供，也可以通过homebrew安装：

```shell
brew install llvm
```

您还需要使用homebrew安装其他依赖项，并在安装后设置环境变量：

```shell
brew install openssl pkg-config cmake bzip2 
```

### Windows

确保您安装了带有C++支持的Visual Studio 2015。 接下来，从[此链接](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe)下载并运行`rustup`安装程序，启动`VS2015 x64 Native Tools Command Prompt`，并使用以下命令安装并设置`msvc`工具链：

```shell
rustup default stable-x86_64-pc-windows-msvc
```

`clang`可以用LLVM安装。 预构建的二进制文件可以从[Download LLVM](https://releases.llvm.org/download.html#8.0.0)下载。 确保按照指示将LLVM添加到系统PATH中。

确保这些二进制文件在您的`PATH`中（安装`rustup`后会显示指令）。 之后，您应该能够从源代码构建Conflux。

## 从源代码构建

After installing the dependencies mentioned above, now you can clone our repository and start building the executable binary. The latest mainnet node version is **{confluxNodeVersion.mainnet}**.

```bash
# download Conflux code
git clone https://github.com/Conflux-Chain/conflux-rust
cd conflux-rust
git checkout <latest-released-mainnet-version> # checkout to the latest release version

# Usually, you just need the latest source code without the complete history. You can speed up the cloning process with the following command.
git clone -b <latest-released-mainnet-version> --single-branch --depth 1 https://github.com/Conflux-Chain/conflux-rust.git
cd conflux-rust

# build in release mode
cargo build --release
```

If you are building on MacOS and get the error: `could not find native static library bz2` you can try the following command:

```bash
RUSTFLAGS="-L $(brew --prefix bzip2)/lib -l bz2" cargo build
```


这将在**./target/release**子目录中生成一个名为**conflux**的可执行文件。 **conflux**二进制文件是一个客户端软件，我们可以用它来运行节点。

请注意，当编译一个 crate 时，如果出现错误，大多数情况下是因为您使用的 Rust 版本过旧，或者其中一些 crate 需要重新编译。 如果您使用的是Rust的最新稳定版本，清理仓库很可能解决问题，尝试：

```shell
cargo clean && cargo update
```
When you compiling on Linux system，By default cc is linked to gcc, you need to export the cc environment variable to point to clang

```shell
CC=clang CXX=clang++ cargo build --release
```

要开始运行Conflux完整节点，您可以按照[运行Conflux完整节点](./running-full-node.md)的说明进行操作。

## 常见问题解答

### 构建过程失败的原因是什么？

请确保您安装了所有依赖，并且您的网络状况良好以下载rust crates。 如果您在中国，可以尝试使用[rustup](https://rustup.rs/)安装rust并设置镜像为[Rust China](https://mirrors.tuna.tsinghua.edu.cn/help/rustup/)。

### 主网和测试网客户端是否兼容？

不，主网和测试网客户端不相同。

### 如何构建测试网客户端？

切换到最新的测试网标签并构建源代码： 最新的测试网节点版本号为：**{confluxNodeVersion.testnet}**。

```bash
git checkout <latest-released-testnet-version>  # 切换到最新测试网发布版本
cargo build --release
```

### 在哪里可以找到最新发布版本？

您可以在[Releases](https://github.com/Conflux-Chain/conflux-rust/releases)中找到最新发布版本。
