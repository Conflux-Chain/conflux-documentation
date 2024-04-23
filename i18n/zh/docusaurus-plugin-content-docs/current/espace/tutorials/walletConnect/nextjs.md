---
sidebar_position: 2
title: Next.js
description: Learn how to use Web3Modal in a Next.js project
keywords:
  - WalletConnect
  - Web3Modal
  - Dapp
displayed_sidebar: eSpaceSidebar
---

# Integrating WalletConnect with Next.js Project on Conflux eSpace

This tutorial provides a comprehensive guide on how to integrate WalletConnect with Web3Modal in a Next.js project, specifically targeting the Conflux eSpace network. For a hands-on example, check out the GitHub repository [web3modal-conflux-nextjs](https://github.com/ConfluxDAO/web3modal-conflux-nextjs).

## 前提条件

- Node.js installed on your system
- Basic knowledge of React and Next.js
- An account on the Conflux eSpace network

## Step 1: Set Up Your Next.js Project

First, create a new Next.js application if you haven't already:

```bash
npx create-next-app web3modal-conflux-nextjs
cd web3modal-conflux-nextjs
```

When setting up your Next.js project using `create-next-app`, you'll be prompted with a few configuration options. For the purposes of this tutorial, you can proceed with all the default settings provided by the setup. This will configure your project with optimal defaults for most applications, including a basic file structure and configuration settings.

## Step 2: Install Necessary Packages

Web3Modal SDK has support for Wagmi, which will help you interact with wallets and smart contracts.

```bash
npm install @web3modal/wagmi wagmi viem @tanstack/react-query
```

## Step 3: Configure Wagmi

Let's set up a separate file for your Wagmi configuration. Because this function needs to run on both the client and the server, it shouldn't be placed in a file that contains the `'use client'` directive.

In this example, we'll create a file named `config/index.tsx` outside of our app directory and configure it as follows:

```typescript
import { cookieStorage, createStorage } from "wagmi";
import { confluxESpace } from "wagmi/chains";

import { http, createConfig, WagmiProvider } from "wagmi";
import { walletConnect, injected, coinbaseWallet } from "wagmi/connectors";

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
export const config = createConfig({
  chains: [confluxESpace],
  transports: {
    [confluxESpace.id]: http(),
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0],
    }),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
```

For the project to access environment variables such as `projectId`, you need to set them up in a `.env.local` file in the root of your project. Here's how you can do it:

Create a file named `.env.local` and add the following line:

```typescript
NEXT_PUBLIC_PROJECT_ID = your_project_id_here;
```

Replace your_project_id_here with the actual project ID you get from https://cloud.walletconnect.com.

## Step 4: Context Provide

We'll now set up a context provider to encapsulate our application and handle the initialization of Web3Modal. It’s important to remember that `createWeb3Modal` should be called from within a React Client Component file.

For this tutorial, let's create a file named `context/index.tsx` outside our main app directory and implement the configuration as outlined.

```typescript
"use client";

import React, { ReactNode } from "react";
import { config, projectId } from "@/config";

import { createWeb3Modal } from "@web3modal/wagmi/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { State, WagmiProvider } from "wagmi";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
```

## Step 4: Use Web3ModalProvider

In the `app/layout.tsx` file, we will incorporate the `Web3ModalProvider` component and invoke Wagmi's `cookieToInitialState` function.

The `initialState` obtained from `cookieToInitialState` provides the preliminary values that will populate Wagmi's store across both server and client environments.

```typescript
import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";

import { cookieToInitialState } from "wagmi";

import { config } from "@/config";
import Web3ModalProvider from "@/context";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body>
        <Web3ModalProvider initialState={initialState}>
          {children}
        </Web3ModalProvider>
      </body>
    </html>
  );
}
```

## Step 5: Connect Conflux eSpace Network

Create a new component, `ConnectButton.tsx`, in your project, to open ConnectWallet Modal

```typescript
"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function ConnectButton() {
  // 4. Use modal hook

  const { open } = useWeb3Modal();

  return (
    <div>
      <button
        onClick={() => open()}
        className="rounded-md border-black border-solid border-2 px-1"
      >
        Open Connect Modal
      </button>
    </div>
  );
}
```

In `app/page.tsx` or any other component, use the `ConnectButton` component to connect to wallets on the Conflux eSpace

```typescript
import Image from "next/image";
import ConnectButton from "@/component/ConnectButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center ">
        <div className="text-black font-bold text-xl dark:text-white py-20">
          Next.js Demo
        </div>
        <p className="pb-2 font-semibold">
          Using WalletConnect on Conflux eSpace
        </p>
        <ConnectButton />
      </div>
    </main>
  );
}
```

By following the steps above, you now have a Next.js application setup that can connect to the Conflux eSpace network using WalletConnect and Web3Modal. This setup allows users to securely interact with the blockchain directly from their web browsers.
