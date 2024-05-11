import { Button } from '@/components/ui/button';
import { getEllipsisAddress } from "@/lib/utils";
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Power } from "lucide-react";
import { useAccount } from "wagmi";


export default function ConnectWalletBtn() {
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
    )
}