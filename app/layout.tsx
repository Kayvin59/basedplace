"use client"

// import type { Metadata } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { WagmiProvider } from "wagmi";

import { wagmiConfig } from "@/config";
import { abril_fatface, merriweather } from './font';
import "./globals.css";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

/* export const metadata: Metadata = {
  title: "Based Place",
  description: "Community experiment",
}; */

// Setup Query Client
const queryClient = new QueryClient();


// COLOR : #0052FF

createWeb3Modal({
  wagmiConfig,
  projectId: projectId || "",
})


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
            <Analytics />
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
