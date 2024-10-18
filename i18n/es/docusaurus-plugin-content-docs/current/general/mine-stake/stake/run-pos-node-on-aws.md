---
sidebar_position: 5
title: Run a PoS Node on AWS
displayed_sidebar: generalSidebar
keywords:
  - Conflux Network
  - PoS
  - AWS
  - EC2 instance
  - Ubuntu Server
  - node setup
  - SSH
  - key pair
  - server configuration
  - Conflux client
  - archive node snapshot
  - node synchronization
  - PoW block
  - PoS block
  - hydra.toml
  - PoS encryption password
tags:
  - Staking
---

This tutorial will help you set up a Conflux node on AWS.

## Setting up an AWS Instance

In this section, you’ll configure and launch an AWS EC2 instance where your Conflux PoS staking pool will be hosted.

1. Create an AWS account or log in your existing account.
2. In AWS, go to Services > EC2 Management Console and launch a new EC2 instance.
3. Click select on the Ubuntu Server 20.04 64-bit (x86) image. You can optionally use other Linux or Windows-based images, but we’ll stick to this one in this tutorial.
4. Select the t2.large instance type and click Next: Configure Instance Details.
5. Leave the default Configure Instance Details parameters and click Next: Add Storage.
6. In Add Storage, set an image size of 1000 GiB and click Review and Launch. :::note  
   You can resize this later to 400 GiB, but this will greatly speed up the node setup process.
:::
7. Review the instance details and click Launch.

You have successfully created and launched an EC2 instance. Now let’s log in to it from our local machine.

## Logging in to the EC2 Instance

1. In this section, you’ll login to the EC2 instance for the first time.
2. Once your instance is created, in the EC2 Management Console go to Network & Security > Key Pairs. If you already have an AWS key pair, you can skip to Step 6.
3. In Key Pairs, click Create key pair.
4. Create and download a key pair.
5. In Create key pair, enter a name for your key pair (in this case, we’ll enter the name conflux), then click create Create key pair.
6. Download the newly-created key pair.
7. In the EC2 Management Console, go to Instances > Instances.
8. Go to your newly-created instance details by click its Instance ID.
9. In the Instance summary, ensure that the instance state is “Running” and copy its Public IPv4 address.
10. Go to your local machine’s terminal, and connect to your instance. You can do this by typing:

:::note
You’ll need to change your key pair file’s permissions.
:::

```shell
ssh -i <path to your key pair> ubuntu@<your machine's IP address or IPv4 DNS> 
```

11. Enter the password that you defined in your key pair.

You have successfully logged in to your EC2 instance! Now let’s log in to our instance and prepare the server.

## First Steps on the Server

Some of the recommended first steps are the following:

- Upgrade currently installed applications.

```shell
sudo apt-get update
sudo apt-get upgrade
```

- Adding a new dedicated user for your PoS node.
- Add your user to sudoers.
- Changing your server’s hostname.

None of these are essential steps, so you can skip them or save them for later.

Now that you have done this initial set up on your server, let’s move on and set up a Conflux node following the initial steps described on this guide.

## Setting Up Your Conflux Node

In this section, you’ll download, install, configure, run, synchronize your Conflux node.

This will be, roughly, a two-step process:

1. Installing and configuring the Conflux client.
2. Running the Conflux client and syncing the node.

## Installing & Configuring the Conflux Client

1. Download the archive node snapshot. This will help us speed up the node synchronization process by downloading a recent snapshot of the chain.

:::note
The archivenode snapshot has a file size of around 200GB. Downloading it might take a few hours.
:::

```shell
wget https://conflux-blockchain-data.oss-cn-beijing.aliyuncs.com/fullnode-db/M/download.sh
```

2. Follow the instructions on downloading the Conflux client pre-built binaries [here](../../run-a-node/advanced-topics/downloading-conflux-client)

3. Extract the archive node snapshot to conflux-rust/run

```shell
tar -xvzf <archive-node-snapshot>.tar.gz conflux-rust/run 
```

4. Follow the instructions on configuring and running a Conflux node [here](../../run-a-node)

## Running the Conflux Client and Syncing the Node

In this process, we’ll run a Conflux node. Once the node is running, it will first sync to the latest PoW block. Once this process is done it will then sync to the latest PoS block.

1. Run the Conflux client.

```shell
cd run 
./conflux --config hydra.toml 
```

2. Set a secure PoS encryption password.
3. Wait for the PoS node to sync.

:::note
This step might take a few hours.
:::

You have successfully installed, configured, and ran a fully-synched Conflux PoS node!
