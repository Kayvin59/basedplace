"use client"

import { ReactNode, useEffect } from 'react';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThirdwebProvider } from "thirdweb/react";
import { WagmiProvider } from "wagmi";
import { baseSepolia } from 'wagmi/chains';

import { wagmiConfig } from '@/app/config';

// Create a new QueryClient instance
const queryClient = new QueryClient()

function Web3Provider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      console.log("Metamask is installed");
      window.ethereum.on('chainChanged', () => window.location.reload());
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <ThirdwebProvider>
            {children}
          </ThirdwebProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Web3Provider>
      <OnchainKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        chain={baseSepolia}
      >
        {children}
      </OnchainKitProvider>
    </Web3Provider>
  )
}