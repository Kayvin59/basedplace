"use client"

import { useEffect } from "react"

import Image from "next/image"
import Link from "next/link"

import { useQuery } from "@tanstack/react-query"
import { readContract, toEther } from "thirdweb"
import { useActiveAccount } from "thirdweb/react"

import { BP_TOKEN_ADDRESS } from "@/app/contracts"
import { Skeleton } from "@/components/ui/skeleton"

import mirrorLogo from '../public/mirror.svg'
import twitterLogo from '../public/twitter.svg'


export default function SocialLinks() {
    const account = useActiveAccount()

    const fetchBalance = async () => {
        if (!account) {
            return '0'
        }
        const balance = await readContract({
            contract: BP_TOKEN_ADDRESS,
            method: 'function balanceOf(address) view returns (uint256)',
            params: [account.address],
        })
        return parseFloat(toEther(balance)).toFixed(2)
    }

    const { data: formattedBalance, isLoading, refetch } = useQuery({
        queryKey: ['balance', account?.address],
        queryFn: fetchBalance,
        enabled: !!account,
    })

    useEffect(() => {
        const intervalId = setInterval(() => {
            refetch()
            console.log('refetch balance')
        }, 30000)

        return () => clearInterval(intervalId)
    }, [refetch])

    return (
        <div className='flex ml-auto items-center'>
            {account && (
                <div className="flex items-center gap-1 text-xl font-primary font-bold min-w-[100px]">
                    {isLoading ? (
                        <Skeleton className="h-7 w-20" />
                    ) : (
                        <span>{formattedBalance ?? '0'} $BP</span>
                    )}
                </div>
            )}
            <Link href='https://mirror.xyz/0x1F58a081369967B2B4c4E2Ad0C44aF016132ef13' className='hidden sm:block mx-4 sm:mx-8'>
                <Image src={mirrorLogo} alt="Mirror Logo" />
            </Link>
            <Link href='https://twitter.com/BasedPlace_' className='mr-4 sm:mr-8'>
                <Image src={twitterLogo} alt="Twitter Logo" />
            </Link>
        </div>
    )
}