"use client"

export { ThirdwebProvider } from "@thirdweb-dev/react";

/* 
import { wagmiConfig } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { useState } from 'react';
import { WagmiProvider } from "wagmi";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) throw new Error("Project ID is required")

createWeb3Modal({
    wagmiConfig,
    projectId: projectId || "",
})


export function Providers({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [queryClient] = useState(() => new QueryClient())
    
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}
 */