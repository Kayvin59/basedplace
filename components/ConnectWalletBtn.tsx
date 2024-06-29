"use client"

import { baseSepolia } from '@/app/chains';
import { client } from '@/app/client';
import { defineChain } from 'thirdweb';
import { ConnectButton } from 'thirdweb/react';
import { createWallet } from "thirdweb/wallets";

export default function ConnectWalletBtn() {
  const wallets = [
    createWallet("com.coinbase.wallet"),
    createWallet("io.metamask"),
  ];

  return (
    <ConnectButton
      wallets={wallets}
      client={client}
      chain={defineChain(baseSepolia)}
      connectButton={{
        label: "Connect Wallet",
      }}
    />
  );
}
/*     


    const { connect, isConnecting, error } = useConnect();
    return (
      <button
        onClick={() =>
          connect(async () => {
            const wallet = createWallet("io.metamask"); // pass the wallet id
            const account = await wallet.connect({ client });
            console.log(account);
   
            // if user has metamask installed, connect to it
            if (injectedProvider("io.metamask")) {
              await wallet.connect({ client });
            }
   
            // open wallet connect modal so user can scan the QR code and connect
            else {
              await wallet.connect({
                client,
                walletConnect: { showQrModal: true },
              });
            }
   
            // return the wallet
            return wallet;
          })
        }
      >
        Connect
      </button>)


const { open } = useWeb3Modal();
    const { address, isConnected } = useAccount();
    const handleOpenModal = () => {
        open();
    };

    return (
        <>
            <Button onClick={handleOpenModal} className='font-primary font-bold text-l text-white bg-footer hover:bg-foreground'>
                {isConnected ? (
                    <>
                        <span>{getEllipsisAddress(address)}</span>
                        <span className='ml-2'>
                            <Power size={16} />
                        </span>
                    </>
                ) : ('Connect Wallet')}
            </Button>
        </>
    ) */
