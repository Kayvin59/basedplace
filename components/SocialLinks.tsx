"use client"

import Image from "next/image";
import Link from "next/link";
import { formatUnits } from 'viem';

import { useEffect, useState } from "react";
import mirrorLogo from '../public/mirror.svg';
import twitterLogo from '../public/twitter.svg';

interface LinkProps {
    isConnected: boolean;
    balance: bigint | undefined;
}

export default function SocialLinks({ isConnected, balance }: LinkProps) {
    const [formattedBalance, setFormattedBalance] = useState<string>('')
    useEffect(() => {
        if (balance) {
            const formatted = formatUnits(balance, 18);
            setFormattedBalance(`${formatted} $BP`);
        } else {
            setFormattedBalance('');
        }
    }, [balance]);

    return <div className='flex ml-auto items-center'>
        {isConnected && (
            <span className='flex items-center gap-1 text-2xl font-secondary'>{formattedBalance}</span>
        )}
        <Link href='https://mirror.xyz/0x1F58a081369967B2B4c4E2Ad0C44aF016132ef13' className='hidden sm:block mx-4 sm:mx-8'>
            <Image src={mirrorLogo} alt="Mirror Logo" />
        </Link>
        <Link href='https://twitter.com/BasedPlace_' className='mr-4 sm:mr-8'>
            <Image src={twitterLogo} alt="Twitter Logo" />
        </Link>
    </div>;
}