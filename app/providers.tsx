"use client"

import { ReactNode, useState } from 'react'


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThirdwebProvider } from "thirdweb/react"
import { WagmiProvider } from "wagmi"

import { config } from './config'

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}