"use client"

import AccountDropdown from '@/components/AccountDropdown';
import ConnectWalletBtn from '@/components/ConnectWalletBtn';

import Image from 'next/image';
import Link from 'next/link';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { abi } from '../app/abi';
import logo from '../public/logo.png';
import mirrorLogo from '../public/mirror.svg';
import twitterLogo from '../public/twitter.svg';
  

export default function Header() {
    
    const { address, isConnected } = useAccount()
    const account = useAccount();
    const { writeContractAsync, isPending } = useWriteContract()

    const result = useReadContract({
        abi,
        address: '0x5ddaf93e4E7873B5A34a181d3191742B116aeF9B',
        functionName: 'name',
    })

    const { data: balance } = useReadContract({
        address: '0x5ddaf93e4E7873B5A34a181d3191742B116aeF9B',
        abi,
        functionName: 'balanceOf',
        args: ['0x1F58a081369967B2B4c4E2Ad0C44aF016132ef13'] // TODO: replace with account.address
    })

    const handleMint = async () => {
        if(account.address === undefined) {
            console.error("Please connect your wallet to mint.");
            return;
        }

        try {
            await writeContractAsync({
                address: '0x5ddaf93e4E7873B5A34a181d3191742B116aeF9B',
                abi,
                functionName: 'mint',
            },
            {
                onSuccess: () => {
                    console.log("Transaction Complete: ");
                },
                onError: (error) => {
                    console.error("Error minting: ", error);
                }
            })
        } catch (e) {
            console.error("Error minting BP token", e);
        }
    }

    return (
        <header className='max-w-6xl mx-auto flex justify-between items-center sticky top-0 z-50 p-3 min-h-16 bg-background opacity-90 lg:py-3'>
            <span className='w-14 inline-block cursor-pointer'>
                <Link href="/">
                    <Image src={logo} alt="Based Place Logo" />
                </Link>
            </span>
            <div>Total Supply: {result ? result.data : 'Loading...'}</div>
            <div>Balance: {balance?.toString()}</div>
            <button 
                onClick={handleMint}
            >
                Mint
            </button>
            <Link href='https://mirror.xyz/0x1F58a081369967B2B4c4E2Ad0C44aF016132ef13' className='hidden sm:block ml-auto mr-4 sm:mr-8'>
                <Image src={mirrorLogo} alt="Mirror Logo" />
            </Link>
            <Link href='https://twitter.com/BasedPlace_' className='mr-4 sm:mr-8'>
                <Image src={twitterLogo} alt="Twitter Logo" />
            </Link>
            <AccountDropdown />
            <ConnectWalletBtn />
            <span className='separator w-separator absolute h-px -bottom-px bg-border left-1/2 -translate-x-1/2'></span>
        </header>
    );
}

