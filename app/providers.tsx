"use client"

import { ReactNode } from 'react';


import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from "wagmi";
import { baseSepolia } from 'wagmi/chains';

import { wagmiConfig } from '@/app/config';

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={baseSepolia}
        >
          {children}
      </OnchainKitProvider>
    </QueryClientProvider>
    </WagmiProvider>
  )
}