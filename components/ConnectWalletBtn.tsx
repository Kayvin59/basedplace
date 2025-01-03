"use client"

import { ConnectButton } from 'thirdweb/react';
import { createWallet } from "thirdweb/wallets";

// import { inAppWallet } from "thirdweb/wallets";
import { baseSepolia } from '@/app/chains';
import { client } from '@/app/client';

export default function ConnectWalletBtn() {
  const wallets = [
    createWallet("com.coinbase.wallet"),
    createWallet("io.metamask"),
  ];

  return (
    <ConnectButton
      wallets={wallets}
      client={client}
      accountAbstraction={{
        chain: baseSepolia,
        sponsorGas: true
      }}
      connectButton={{
        label: "Connect Wallet",
      }}
      autoConnect={false}
    />
  );
}
