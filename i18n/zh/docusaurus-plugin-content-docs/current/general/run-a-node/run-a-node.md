---
sidebar_position: 1
title: 运行节点
displayed_sidebar: generalSidebar
---

Conflux Network is a scalable blockchain platform that aims to achieve high throughput and security. Running a Conflux node allows you to participate in the network, validate transactions, and interact with the Conflux blockchain.

Running a Conflux node is a valuable way to participate in the Conflux network and contribute to its decentralization. The process involves installing dependencies, building the Conflux software, configuring the node, and running it.

Here's a step-by-step guide to setting up and running a Conflux node.

## Requirements

Requirements depend on the type of node. For the specific requirements of each type of node, please visit the section [Node Types](./node-types)

For a Full Node, requirements are the following:

* At least 4GB of RAM (8GB or more is recommended).
* A minimum of 1TB free disk space (SSD is recommended).
* A stable internet connection.

## Steps

### Step 1: Install Dependencies

Before installing the Conflux node software, you'll need to install some dependencies.

On Linux (Ubuntu)
```
sudo apt-get update 

sudo apt upgrade –y 

sudo apt install -y cargo curl git build-essential cmake libssl-dev pkg-config python3 python3-dev 
```


On macOS


```
brew install cmake git openssl 
```

### Step 2: Using Snapshot Tool (Optional)

The Conflux Snapshot Tool (aka Archive-Tool) is designed to help users quickly set up a Conflux node from a snapshot. This tool provides the download links, and by default, it downloads the DB snapshot data of the current day. The Snapshot tool can help save weeks of time required to download and sync all the blockchain data at the moment of running a node. Using this tool is optional, but highly recommended.

For more information about this tool, visit [this](./snapshot-tool) section or the [github repository](https://github.com/conflux-fans/archive-tool).


#### Usage Example: (Linux & Mac - Mainnet - full node)

First, download the snapshot downloading software:
```
wget <https://conflux-blockchain-data.oss-cn-beijing.aliyuncs.com/fullnode-db/M/download.sh> 
```
Second, run the "download" program:

```
bash download.sh 
```

### Step 3: Download/Build the Conflux Client

There are two options, downloading a pre-built Conflux Client, or compiling the Conflux Client from Source.

#### Option 1: Downloading the Conflux Client

The [release](https://github.com/Conflux-Chain/conflux-rust/releases) page on the conflux-rust GitHub repository providers pre-built binaries that you can download and run directly. For more detailed instructions, please visit [this](./advanced-topics/downloading-conflux-client.md) page.

#### Option 2: Compiling the Conflux Client
Compiling the Conflux Client is another option, and can be done in two steps:

1. Clone the Conflux repository:

```
git clone https://github.com/Conflux-Chain/conflux-rust.git 
```
2. Build the Conflux Client:

``` 
cd conflux-rust 
cargo build --release 
```
For more detailed instructions, please visit [this](./advanced-topics/compiling-conflux-client.md) page.

### Step 4: Configure the Node

You may want to configure your Conflux node by editing the configuration file. You can find a sample configuration file in the Conflux repository, usually named hydra.toml or similar, depending on the network version.

Copy the sample configuration file and edit it as needed:
```
cp ./run/hydra.toml ./target/release/hydra.toml 
nano ./run/hydra.toml 
```

Make sure to review and modify the settings according to your preferences and system capabilities.

For more detailed instructions, please visit [this](./advanced-topics/node-configuration.md) page.

### Step 5: Running the Node

You can start the Conflux node by running the following command:

The maximum number of open files are advised to set to 10000. In Linux, the default value is 1024, which is insufficient. You can configure this using the following command on the Linux terminal

```
ulimit -n 10000 
```

Finally, to run the node, go to the conflux-rust folder and use the following command to launch the Conflux Client using the specified configuration file:

```
./target/release/conflux --config ./run/hydra.toml 
```

This will start the Conflux node using the configuration file you edited earlier.

### Step 6: Interacting with the Node

You can interact with your Conflux node using RPC calls. The Conflux node exposes an HTTP JSON-RPC service that you can use to send requests and interact with the blockchain.



Example:
```
curl -H "Content-Type: application/json" -X POST –data '{"jsonrpc":"2.0","method":"cfx_clientVersion","params":[],"id":67}' 127.0.0.1:12539 
```


### Step 7: Keeping Your Node Updated

Make sure to keep your Conflux node software updated to the latest version to ensure compatibility with the network and to include the latest features and security patches.


## Video Tutorial

<Tabs>
  <TabItem value="youtube" label="Video source: YouTube">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/ocsbQRkL9fQ?si=wRmI5Aa6Ewfv-BCx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
    </iframe>
  </TabItem>
</Tabs>