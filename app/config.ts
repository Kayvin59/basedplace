import { createConfig, http, injected } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { coinbaseWallet, metaMask } from 'wagmi/connectors'

declare module 'wagmi' {
    interface Register {
      config: typeof wagmiConfig
    }
}

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  ssr: true,
  transports: {
    [baseSepolia.id]: http(),
  },
  connectors: [
    metaMask(),
    coinbaseWallet({
      appName: 'Based Place',
    }),
    injected({
      target: 'metaMask',
      shimDisconnect: true,
    }),
  ]
})
