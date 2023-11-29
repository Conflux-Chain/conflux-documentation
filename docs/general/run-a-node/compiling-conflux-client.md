---
sidebar_position: 5
title: Compiling the Conflux Client
displayed_sidebar: generalSidebar
---

# Compiling the Conflux Client

Here is a step by step guide on how to build Conflux from the source code and get a node running.

## Install Build Dependencies

Conflux requires **Rust 1.62.0**, ```clang```, and ```sqlite``` to build.

We recommend installing Rust through [rustup](https://rustup.rs/). If you don't already have ```rustup``` or ```clang```, you can install them like this:

## Linux

```
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
$ rustup install 1.62.0
```

Other dependencies including ```clang```, ```cmake (version >= 3.12)``` and ```sqlite (version >= 3.8.3)``` can be installed with:

- Ubuntu 18.04:

```bash
# The latest cmake version on Ubuntu 18.04 is 3.10, so you'll need to install it from the Kitware repository.
$ wget -O - https://apt.kitware.com/keys/kitware-archive-latest.asc 2>/dev/null | gpg --dearmor - | sudo tee /usr/share/keyrings/kitware-archive-keyring.gpg >/dev/null
$ echo 'deb [signed-by=/usr/share/keyrings/kitware-archive-keyring.gpg] https://apt.kitware.com/ubuntu/ bionic main' | sudo tee /etc/apt/sources.list.d/kitware.list >/dev/null
$ sudo apt-get update

$ sudo apt-get install clang libsqlite3-dev pkg-config libssl-dev cmake
```

- CentOS 7 / RHEL:

```bash
$ sudo yum install epel-release
$ sudo yum install clang gcc gcc-c++ openssl-devel cmake3 wget

# This may fail if you have installed cmake with version 2.8.
# You can choose to uninstall cmake first.
$ sudo ln -s /usr/bin/cmake3 /usr/bin/cmake

# The official sqlite version on CentOS 7 is 3.7.17, so we need to install the latest version from the source code.
# The source code have be downloaded from https://www.sqlite.org/download.html
$ wget https://www.sqlite.org/2020/sqlite-autoconf-3320100.tar.gz
$ tar xfvz sqlite-autoconf-3320100.tar.gz
$ cd sqlite-autoconf-3320100
$ ./configure
$ make
$ sudo make install
```

## OSX

```
$ curl https://sh.rustup.rs -sSf | sh
$ rustup install 1.62.0
```

You might need to install ```brew``` if you need to use it to install ```clang```:

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

```clang``` comes with Xcode command line tools, and can also be installed with homebrew:

```
$ brew install llvm
```

You also need to install other dependencies with homebrew and set up the environment variables as described after the installation:

```
$ brew install openssl pkg-config cmake
```

## Windows

Make sure you have Visual Studio 2015 with C++ support installed. Next, download and run the ```rustup``` installer from [this link](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe), start ```VS2015 x64 Native Tools Command Prompt```, and use the following command to install and set up the ```msvc``` toolchain:

```
$ rustup default stable-x86_64-pc-windows-msvc
```

```clang``` can be installed with LLVM. Pre-built binaries can be downloaded from [Download LLVM](https://releases.llvm.org/download.html#8.0.0). Make sure to add LLVM to the system PATH as instructed.

Make sure that these binaries are in your ```PATH``` (the instruction will be shown after installing ```rustup```). After that, you should be able to build Conflux from source.

## Build from Source Code

After installing the dependencies mentioned above, now you can clone our repository and start building the executable binary:

```bash
# download Conflux code
$ git clone https://github.com/Conflux-Chain/conflux-rust
$ cd conflux-rust
$ git checkout v2.0.0


# build in release mode
$ cargo build --release
```

This produces an executable in the ```./target/release``` subdirectory.

Note, when compiling a crate and you receive errors, it's in most cases your outdated version of Rust, or some of your crates have to be recompiled. Cleaning the repository will most likely solve the issue if you are on the latest stable version of Rust, try:

```
$ cargo clean && cargo update
```

To start running a Conflux full node, you can follow the instructions at [Running Conflux Full Node](../../general/run-a-node/running-full-node.md).

## Install Test Dependencies

We have a test framework written in Python3 (version>=3.6). Required packages can be installed by running

```
$ ./dev-support/dep_pip3.sh
```

Solidity compiler ```solc``` is also required, and be installed as follows:

- Ubuntu

```
$ sudo add-apt-repository ppa:ethereum/ethereum
$ sudo apt-get update
$ sudo apt-get install solc
```

- OSX

```
$ brew update
$ brew upgrade
$ brew tap ethereum/ethereum
$ brew install solidity
```

- Others

You can follow the detailed instructions at [Installing the Solidity Compiler](https://docs.soliditylang.org/en/v0.5.7/installing-solidity.html#binary-packages).

Note that latest solidity compiler may be incompatible with Conflux and may cause the integration test to fail. If you encounter such problem, please install solidity compiler version 0.5.2.

To run tests, you can build the source code first and follow the instructions at [Running Test](./running-full-node.md#running-test).
