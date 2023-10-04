---
sidebar_position: 6
title: Node Configuration
---

# Node Configuration 

Configuring a Conflux node allows you to tailor its operation to your specific needs and system capabilities.  

Here's a step-by-step guide to configuring a Conflux node. 

## Step 1: Install Conflux Node 

If you haven't already installed the Conflux node, please refer to the previous tutorial on how to run a Conflux network node for installation instructions. 

## Step 2: Locate Configuration File 

Conflux provides a sample configuration file that you can use as a starting point. This file is usually named hydra.toml or similar, depending on the network version. You'll find it in the run directory of the Conflux repository. 

## Step 3: Create a Custom Configuration File 

Copy the sample configuration file to a new file that you'll edit: 
```
cp ./run/hydra.toml ./run/hydra.toml 
``` 

## Step 4: Edit the Configuration File 

Open the custom configuration file in a text editor: 
```
nano ./run/hydra.toml 
``` 

Here are some common parameters you might want to configure: 

```
mode: Defines the synchronization mode. Options include "full" for a full node, "archive" for an archive node, and "light" for a light node. 

net_conf/listen_ip: The IP address that the node will listen on. Default is "0.0.0.0", meaning it will listen on all available network interfaces. 

net_conf/listen_port: The port number that the node will listen on. Default is 32323. 

net_conf/public_address: If your node is behind a NAT, you can set this to the public IP address and port that other nodes can use to connect to your node. 

storage/data: The directory where the blockchain data will be stored. 

mining/miner_author: The address that mining rewards will be sent to if you are mining. 

mining/stratum_listen_address: If you are running a mining pool, this sets the address that the stratum server will listen on. 

log_conf: Path to the log configuration file. 

jsonrpc_local_http_port: Port for the local JSON-RPC HTTP service. 

jsonrpc_public_http_port: Port for the public JSON-RPC HTTP service. 

```

Edit these and any other parameters as needed, then save and exit the file. 

## Step 5: Start the Node with the Custom Configuration 

Start the Conflux node using the custom configuration file: 

```
./target/release/conflux --config ./run/hydra.toml 
```