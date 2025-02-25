"use client"

import { ReactNode, useEffect } from 'react';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from "wagmi";
import { baseSepolia } from 'wagmi/chains';

import { wagmiConfig } from '@/app/config';

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      console.log("Metamask is installed");
      window.ethereum.on('chainChanged', () => window.location.reload());
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={baseSepolia}
        >
          {children}
        </OnchainKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}