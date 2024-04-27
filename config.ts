import { baseSepolia } from "wagmi/chains";

import { createConfig, http } from "wagmi";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";

// PorjectId for walletConnect
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

const Web3ModalData = {
    name: 'Web3Modal',
    description: 'Web3Modal Test'
}

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