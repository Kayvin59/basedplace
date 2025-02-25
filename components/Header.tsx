"use client"

import AccountDropdown from '@/components/AccountDropdown';
import ConnectWalletBtn from '@/components/ConnectWalletBtn';
import Logo from '@/components/Logo';
import SocialLinks from '@/components/SocialLinks';

export default function Header() {

    return (
        <header className='max-w-6xl mx-auto flex justify-between items-center sticky top-0 z-10 p-3 h-16 bg-background opacity-90 lg:py-3'>
            <Logo />
            <SocialLinks />
            <AccountDropdown />
            <ConnectWalletBtn />
            <span className='separator w-separator absolute h-px -bottom-px bg-border left-1/2 -translate-x-1/2'></span>
        </header>
    );
}
