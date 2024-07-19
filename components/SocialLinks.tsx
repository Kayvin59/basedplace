"use client"

import Image from "next/image";
import Link from "next/link";

import { BP_TOKEN_ADDRESS } from "@/app/contracts";
import { useEffect, useState } from "react";
import { readContract, toEther } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import mirrorLogo from '../public/mirror.svg';
import twitterLogo from '../public/twitter.svg';


export default function SocialLinks() {
    const account = useActiveAccount();
    const [formattedBalance, setFormattedBalance] = useState<string>('0')

    useEffect(() => {
        const fetchBalance = async () => {
            if (!account) {
                return;
            }
            const balance = await readContract({
                contract: BP_TOKEN_ADDRESS,
                method: 'function balanceOf(address) view returns (uint256)',
                params: [account?.address],
            });
            console.log("fetchbalance", balance);
             setFormattedBalance(toEther(balance));
        }
        if (account) {
            fetchBalance();
        }
    }, [account]);

    return <div className='flex ml-auto items-center'>
        {account && (
            <span className='flex items-center gap-1 text-2xl font-primary font-bold'>{formattedBalance} $BP</span>
        )}
        <Link href='https://mirror.xyz/0x1F58a081369967B2B4c4E2Ad0C44aF016132ef13' className='hidden sm:block mx-4 sm:mx-8'>
            <Image src={mirrorLogo} alt="Mirror Logo" />
        </Link>
        <Link href='https://twitter.com/BasedPlace_' className='mr-4 sm:mr-8'>
            <Image src={twitterLogo} alt="Twitter Logo" />
        </Link>
    </div>;
}