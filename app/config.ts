import { metaMask } from '@wagmi/connectors'
import { createConfig, http } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'

declare module 'wagmi' {
    interface Register {
      config: typeof config
    }
}

export const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
  connectors: [metaMask()]
})
