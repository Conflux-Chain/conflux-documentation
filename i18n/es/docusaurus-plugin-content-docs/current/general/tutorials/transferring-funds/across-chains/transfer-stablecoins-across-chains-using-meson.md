---
sidebar_position: 2
title: Meson
displayed_sidebar: generalSidebar
keywords:
  - Meson
  - Stablecoins
  - Cross-chain transfer
  - Conflux Network
  - eSpace
  - USDC
  - USDT
  - BNB Chain
  - MetaMask
---

# Transfer Stablecoins Across Chains Using Meson

[Meson](https://meson.fi/zh) is a stablecoin cross-chain swap protocol that supports multiple networks. With Meson, you can bridge either USDC or USDT tokens from different networks into Conflux eSpace, or from Conflux eSpace to other networks.
- In this guide, we'll bridge USDC on BNB Chain to USDT on Conflux eSpace through Meson.

## Prerequisites

- A USDC or USDT stablecoin on any of the following networks:
- Ethereum (USDC/USDT)
- BNB Chain (USDC/USDT)
- Tron (USDT)
- Avalanche (USDC)
- Fantom (USDC)
- Polygon (USDC)
- Conflux (USDC/USDT)
- Your MetaMask wallet connected to Conflux eSpace.

## Bridging Stablecoins to Conflux eSpace with Meson

1. Go to [Meson](https://meson.fi/zh).​
2. Click **Connect Wallet** to connect MetaMask to Meson.

![meson1](./img/meson1.webp)

3. Select the account(s) that you wish to use on Meson and click Next.

![meson](./img/meson.webp)

4. Confirm the connection to the site by clicking **Connect**.

![meson2](./img/meson2.webp)

Your MetaMask wallet is now connected to Meson. Let's now bridge our tokens.

5. In the **FROM** drop-down list, select the network that you'll transfer your assets from (for example: BNB Chain).

![meson3](./img/meson3.webp)

6. In the token type drop-down list, select **USDC**.

![meson4](./img/meson4.webp)

7. Enter the amount of USDC that you want to transfer.

![meson5](./img/meson5.webp)

8. In the **TO** drop-down list, select **Conflux eSpace**.

![meson6](./img/meson6.webp)

9. Confirm the transaction details and click **Swap**.

![meson7](./img/meson7.webp)

10. In the Approve dialog, click **Approve** to invoke MetaMask and grant Meson permission to access your funds.

![meson8](./img/meson8.webp)

:::note  
The approval operation requires a gas fee, however, this is the only time you'll need to pay for gas, the gas fee for other steps are on Meson.
:::

11. In MetaMask, click **Confirm** to give permission to Meson to access your funds.

![meson9](./img/meson9.webp)

12. Once you grant permission to MetaMask, click **Confirm** in the Swap Summary to confirm the swap transaction you're about to do.

![meson10](./img/meson10.webp)

13. Now, in MetaMask, click **Sign** to sign and proceed with the transaction.

![meson11](./img/meson11.webp)

14. In the Swap Summary, wait for the swap request to be processed. :::note    
    This may take around 1 minute.
:::

![meson12](./img/meson12.webp)

15. Once the swap request transaction is processed, click **Sign** on MetaMask to release the funds in Conflux.

![meson13](./img/meson13.webp)

You have now bridged your funds to Conflux eSpace!

## Verifying Transactions

To verify the transaction:

1. Open the wallet menu.

![meson14](./img/meson14.webp)

2. Click on the Swap ID to open the Meson transaction explorer.

![meson15](./img/meson15.webp)

3. You can verify the transactions on both networks' transaction explorers.

![meson16](./img/meson16.webp)

## Recursos Adicionales

- To learn more about Meson, check out [Meson's blog](https://medium.com/@mesonfi.)
