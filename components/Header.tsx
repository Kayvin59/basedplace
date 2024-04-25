"use client"

import { useWeb3Modal } from '@web3modal/wagmi/react';
import Image from 'next/image';
import { useAccount } from 'wagmi';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
            <div className='ml-auto mr-8'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className='border border-foreground focus-visible:ring-offset-0 focus-visible:ring-transparent'>Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>Playground</DropdownMenuItem>
                            <DropdownMenuItem>Dashboard</DropdownMenuItem>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>Docs</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div>
                <Button onClick={handleOpenModal} className='ml-auto font-primary font-bold text-l text-white'>
                    {isConnected ? address : 'Connect'}
                </Button>
            </div>
        </header>
    );
}