import { createConfig, http } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { coinbaseWallet, metaMask } from 'wagmi/connectors'

declare module 'wagmi' {
    interface Register {
      config: typeof wagmiConfig
    }
}

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: 'Based Place',
    }),
    metaMask(),
/*     injected({
      target: 'metaMask',
    }), */
  ],
  ssr: true,
  transports: {
    [baseSepolia.id]: http(),
  },
})
