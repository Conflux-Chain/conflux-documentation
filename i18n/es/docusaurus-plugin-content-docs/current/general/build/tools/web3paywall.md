---
sidebar_position: 2
title: Web3 Paywall
displayed_sidebar: generalSidebar
---

# Web3 Paywall

## Introduction
[Web3 Paywall](https://confluxhub.io/payment/consumer/paid-apps) is a set of smart contracts on Conflux eSpace that you can purchase development resource with cryptocurrency as a consumer.

## How to purchase

1.View app resource services provided by developers. ![applist](./img/applist.png)

2.Connect Metamask or Fluent Wallet and switch to Conflux eSpace network. ![connectwallet](./img/connectwallet.png)

3.Select service to purchase, and choose the cryptocurrency you want to pay, CFX or USDT are supported. ![purchase](./img/purchase.png)

4.The purchased services show in the paid apps. ![padlist](./img/paidlist.png)

5.Click the ApiKey button to obtain the key with signature. ![sign](./img/sign.png) ![apikey](./img/apikey.png)

You can purchase mainnet subscriptions with cryptocurrency of Confura RPC and ConfluxScan API upgrade services on [**confluxhub**](https://confluxhub.io/payment/consumer/apps) currently.

### Testnet Purchase Guidance

If you want to purchase the testnet Confura RPC and ConfluxScan API upgrade service, you can visit [**confluxhub**](https://test.confluxhub.io/payment/consumer/apps) to purchase it.

Before you purchase the services of testnet, you can obtain some eSpace test tokens first.

1.Visit [**Conflux eSpace Faucet**](https://efaucet.confluxnetwork.org/)

2.Select test token, then fill the received address and the capcha code. ![faucet](./img/faucet.png)

3.Click claim button and wait for a while.

4.Follow the [above process](#how-to-purchase) to purchase the testnet Confura RPC and ConfluxScan API upgrade service.

## How to use Api Key

- Confura RPC Pro-Service: append your api key to the url of RPC endpoint (eg., `https://main.confluxrpc.com/<api-key>`)

  > Making sure your api key works: visit the interfaces not supported by free tier, e.g. `cfx_filter` for core space and `eth_filter` for espace

- ConfluxScan API Pro-Service: use api key as query (e.g. `https://api.confluxscan.io/account/transactions?account=cfx%3Aaanjcf1esdz50j6zhkm0k60wc7669tfkw28mzudg24&apiKey=<api-key>`)
