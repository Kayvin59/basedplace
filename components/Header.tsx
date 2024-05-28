"use client"

import AccountDropdown from '@/components/AccountDropdown';
import ConnectWalletBtn from '@/components/ConnectWalletBtn';
import Logo from '@/components/Logo';
import SocialLinks from '@/components/SocialLinks';

import { useAccount, useBalance } from 'wagmi';

export default function Header() {
    const { address, isConnected } = useAccount()
    const result = useBalance({
        address: address,
        token: '0x5ddaf93e4E7873B5A34a181d3191742B116aeF9B',
    })

    return (
        <header className='max-w-6xl mx-auto flex justify-between items-center sticky top-0 z-50 p-3 min-h-16 bg-background opacity-90 lg:py-3'>
            <Logo />
            <SocialLinks isConnected={isConnected} balance={result.data?.value} />
            <AccountDropdown />
            <ConnectWalletBtn />
            <span className='separator w-separator absolute h-px -bottom-px bg-border left-1/2 -translate-x-1/2'></span>
        </header>
    );
}
