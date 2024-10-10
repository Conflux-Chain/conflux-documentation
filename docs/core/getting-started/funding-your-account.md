---
sidebar_position: 2
title: Funding Your Account on Testnet
description: How to get testnet CFX
displayed_sidebar: coreSidebar
tags:
  - Testnet
  - CFX
  - Faucet
  - Fluent Wallet
  - Claim Tokens
  - ConfluxScan
  - Network Switching
  - Testnet CFX
  - FC Token
  - cUSDT Token
  - Wallet Connection
  - Transaction Hash
---

Are you a new user of Conflux blockchain? Or are you a developer planning to develop a Dapp on Conflux? Then you may need some CFX to interact with the Conflux network. We provide the testnet CFX faucet dApp, which allows users to claim testnet CFX and experience it in the Conflux testnet environment.

## Video Tutorial

For a quick demo on how to use the Conflux Faucets, please refer to the following video tutorial:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="youtube" label="Conflux Faucets Video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/MyQi99-fEM4?si=PPPJLlUHFEofnnv2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>
</Tabs>


## Faucet dApp

We have developed a [Faucet Dapp](https://faucet.confluxnetwork.org/), which not only can be used to claim `CFX` but also tokens, currently includes `FC`, `cUSDT`.

![Dapp-faucet](./img/Dapp-faucet-1)

To use the Faucet Dapp, simply connect to the dapp using Fluent and click "Claim".

### Steps

The default Fluent network is `Conflux Hydra` (mainnet). The first step is to switch the Fluent network to `Conflux testnet`. 

![SwitchNetwork](./img/SwitchNetwork)

After switching the network, please note the warning message about the address change.  

Now you can go to the [Faucet Dapp](http://faucet.confluxnetwork.org/), and click on the `Connect` button in both the page and in the "Connect to this web site" form.

![FaucetConnectFluent](./img/FaucetConnectFluent)

When the wallet is connected, your CFX address appears in the Connect button and it is green now. 
You can select `CFX` in the tokens list and clic on the `CLAIM` button, a sign transaction window appears and you can click on the Confirm button . 

![SignTransaction](./img/SignTransaction)

If successful, the interface will return the hash of the CFX transaction. Switch back to Fluent and you can see that the balance will increase by 1,000 CFX. You can use the hash to view the details of the transaction on [ConfluxScan](https://testnet.confluxscan.io/).
 
![AddressWithTestCFX](./img/AddressWithTestCFX)

