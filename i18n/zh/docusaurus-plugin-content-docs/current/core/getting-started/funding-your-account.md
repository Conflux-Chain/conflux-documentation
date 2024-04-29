---
sidebar_position: 2
title: 领取测试网代币
description: 如何获取测试网上的 CFX
displayed_sidebar: coreSidebar
---

您是 Conflux 区块链的新用户吗？ 或者您是一名计划在Conflux上开发Dapp的开发者吗？ 那么你可能需要一些CFX与Conflux网络进行交互。 我们提供了测试网 CFX 水龙头 的 dApp，用户可以通过它领取测试网 CFX，并在 Conflux 的测试网环境中进行体验。

## 视频教程

以下视频教程演示了如何使用 Conflux 水龙头：

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="youtube" label="Conflux Faucets Video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/MyQi99-fEM4?si=PPPJLlUHFEofnnv2" title="YouTube 视频播放器" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>
</Tabs>

## 水龙头 dApp

我们开发了一个[Faucet Dapp](https://faucet.confluxnetwork.org/)，不仅可以用于领取` CFX`，还可以领取代币，目前包括 `FC` 和 `cUSDT`。

![Dapp 水龙头](./img/Dapp-faucet-1)

要使用水龙头 Dapp，只需使用 Fluent 连接到 dapp 并点击“领取”。

### 使用步骤

默认的 Fluent 网络是 `Conflux Hydra`(主网)。 首先需要将Fluent网络切换到 `Conflux testnet`。

![切换网络](./img/SwitchNetwork)

在切换网络后，请注意关于地址更改的警告信息。

现在你可以前往[Faucet Dapp](http://faucet.confluxnetwork.org/)，并在页面上和"Connect to this web site"表单中点击`Connect`按钮。

![Fluent 连接水龙头](./img/FaucetConnectFluent)

当钱包连接成功后，您的CFX地址将出现在“连接”按钮中，此时按钮的颜色将变为绿色。 您可以在代币列表中选择`CFX`，并单击`CLAIM`按钮，然后会出现一个签名交易窗口，您可以单击确认按钮。

![签名交易](./img/SignTransaction)

如果成功，界面将返回CFX交易的哈希。 切换回 Fluent，你可以看到余额将增加 1,000 CFX。 您可以使用交易哈希在[ConfluxScan](https://testnet.confluxscan.io/)上查看交易的详细信息。

![CFX 测试地址](./img/AddressWithTestCFX)

