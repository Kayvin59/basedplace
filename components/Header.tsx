"use client"

import { useWeb3Modal } from '@web3modal/wagmi/react';
import Image from 'next/image';
import { useAccount } from 'wagmi';

import { Button } from '@/components/ui/button';
import logo from '../public/BPL-logo.svg';

export default function Header() {
    const { open } = useWeb3Modal();
    const { address, isConnected, isConnecting, isDisconnected } = useAccount()

    const handleOpenModal = () => {
        open();
    };

    return (
        <header className='w-full flex justify-between items-center sticky top-0 z-50 px-3 h-16 bg-background opacity-90 border-b'>
            <span className='w-14 inline-block cursor-pointer'>
                <Image src={logo} alt="Based Place Logo" />
            </span>
            <div>
                <Button onClick={handleOpenModal} className='ml-auto font-primary font-bold text-l text-white'>Connect</Button>
            </div>
        </header>
    );
}
