import { createConfig, http } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [coinbaseWallet({ appName: 'Create Wagmi'})],
  transports: {
    [baseSepolia.id]: http(),
  },
});
