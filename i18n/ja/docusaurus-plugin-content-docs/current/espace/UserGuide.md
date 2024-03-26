---
sidebar_position: 2
title: User Guide
description: How to connect metamask to eSpace
keywords:
  - MetaMask
  - EVMSpace
displayed_sidebar: eSpaceSidebar
---

import UserGuide from '../templates/UserGuide.md';
import Image from '@theme/IdealImage';
import img1 from "./img/metamask_choose_network-0.png"
import img2 from "./img/metamask_add_network-ce.png"

<UserGuide
  space="eSpace"
  currency="CFX"
  mainnetChainId="1030"
  testnetChainId="71"
  mainnetRpcUrl="https://evm.confluxrpc.com"
  testnetRpcUrl="https://evmtestnet.confluxrpc.com"
  mainnetScanUrl="https://evm.confluxscan.io"
  testnetScanUrl="https://evmtestnet.confluxscan.io"
  components={{
    Faucet() {
 return <a href="https://efaucet.confluxnetwork.org">espace faucet</a> }, Img1() { return <Image img={img1} /> }, Img2() { return <Image img={img2} /> }, }} />
