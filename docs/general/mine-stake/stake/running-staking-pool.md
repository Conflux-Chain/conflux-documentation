---
sidebar_position: 4
title: Running a PoS Staking Pool
displayed_sidebar: generalSidebar
keywords: [Conflux Network, PoS, staking pool, node setup, full node, archive node, conflux-fans/pos-pool, PoS Pool contract, PoS Pool interface, web server, infrastructure, dApp, community-driven, open source, CFX holders, technical configuration]
tags: [Staking]
---

In this section we present a guide for how to deploy, configure and manage a **POS Pool** that will allow CFX holders to join to the PoS protocol just interacting with the front-end application of the PoS Pool and without dealing with the technical complexities. 

## Reference Architecture 

![Architecture](./img/PoSReferenceArchitecture.png)

Please note this configuration guide is to do the technical setup of the PoS Pool staking environment.

Conflux PoS Pool configuration has two major components: Interface application and full node. It needs technical knowledge for configuration of instances, ports, contracts deployment and storage configuration. 

The configuration of a reverse proxy and a firewall is recommended but is out of the scope of this guide.

## conflux-fans/pos-pool

[conflux-fans/pos-pool](https://github.com/conflux-fans/pos-pool) is a open source project that provides a PoS Pool interface and a PoS Pool contract. We can use it to setup a PoS Pool dApp.

### Prerequisites

The POS Pool operator needs to have the infrastructure to run the following: 

* A full/archive node
* A Web Server Farm, or a single web server to run the POS Pool application 

### Run a full/archive node

First of all, we need to run a full/archive node following the [instructions](../../run-a-node/) in the Conflux documentation.

### Deploy PoS Pool Contract

Then we need to deploy the PoS Pool contract following the [instructions](https://github.com/conflux-fans/pos-pool/tree/main/contract#setup) in pos-pool's documentation.

### Setup Pool Interface

Finally, we need to setup the PoS Pool interface following the [instructions](https://github.com/conflux-fans/pos-pool/blob/main/interface/README.md)

## Summary

**Conflux-fans/pos-pool** is just a reference implementation of a PoS Pool. Use it at your own risk. If you have encountered any problems, you can check it's [documentation](https://github.com/conflux-fans/pos-pool/tree/main/contract/docs), [faqs](https://github.com/conflux-fans/pos-pool/tree/main#faqs) and [issues](https://github.com/conflux-fans/pos-pool/issues).