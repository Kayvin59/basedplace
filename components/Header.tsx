"use client"

/* import { useState } from "react";
 */
import { Button } from '@/components/ui/button';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';

export default function Header() {
    const { open } = useWeb3Modal();
    const { address, isConnecting, isDisconnected } = useAccount()

    const handleOpenModal = () => {
        open();
    };

    return (
        <header>
            <Button onClick={handleOpenModal} className='ml-auto font-primary text-l text-white'>Connect</Button>
            {isConnecting && <div>Connecting…</div>}
            {isDisconnected && <div>Disconnected</div>}
            {address && <div>{address}</div>}
        </header>
    );
}
