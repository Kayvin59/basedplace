"use client"

import { useWeb3Modal } from '@web3modal/wagmi/react';
import Image from 'next/image';
import { useAccount } from 'wagmi';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Power } from 'lucide-react';
import Link from 'next/link';
import logo from '../public/logo.svg';
import twitterLogo from '../public/twitter.svg';
import userLogo from '../public/user.svg';

export default function Header() {
    const { open } = useWeb3Modal();
    const { address, isConnected, isConnecting, isDisconnected } = useAccount()

    const handleOpenModal = () => {
        open();
    };

    const getEllipsisAddress = (str: string | undefined, n = 5) => {
        if (str) {
          return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
        }
        return "";
    };

    return (
        <header className='max-w-6xl mx-auto flex justify-between items-center sticky top-0 z-50 py-3 min-h-16 bg-white opacity-90'>
            <span className='w-14 inline-block cursor-pointer'>
                <Image src={logo} alt="Based Place Logo" />
            </span>
            <Link href='https://twitter.com/BasedPlace_' className='ml-auto mr-8'>
                <Image src={twitterLogo} alt="Twitter Logo" className='hover:text-border'/>
            </Link>
            <div className='mr-8'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className='border border-foreground focus-visible:ring-offset-0 focus-visible:ring-transparent'>
                            <Image src={userLogo} alt="user logo" />
                        </Button>
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
                    {isConnected ? (
                        <>
                            <span>{getEllipsisAddress(address)}</span>
                            <span className='ml-2'>
                                <Power size={16} />
                            </span>
                        </>
                    ) : ('Connect Wallet')}
                </Button>
            </div>
            <span className='separator w-separator absolute h-px -bottom-px bg-border left-1/2 -translate-x-1/2'></span>
        </header>
    );
}