"use client"

//import type { Metadata } from "next";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { WagmiProvider } from "wagmi";
import { baseSepolia } from "wagmi/chains";

import { abril_fatface, merriweather } from './font';
import "./globals.css";


import { createConfig, http } from "wagmi";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";

// Setup Query Client
const queryClient = new QueryClient();

// PorjectId for walletConnect
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
console.log('projectId', projectId)

const Web3ModalData = {
    name: 'Web3Modal',
    description: 'Web3Modal Test'
}

// COLOR : #0052FF

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  ssr: true,
  connectors: [
    walletConnect({ projectId, Web3ModalData, showQrModal: false } as any),
    coinbaseWallet({
      appName: 'Based Place',
    }),
  ],
  transports: {
    [baseSepolia.id]: http(),
  },
})

createWeb3Modal({
  wagmiConfig,
  projectId: projectId || "",
})

/* 
export const metadata: Metadata = {
  title: "Based Place",
  description: "Community experiment",
}; */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${abril_fatface.variable} ${merriweather.variable} relative`}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
