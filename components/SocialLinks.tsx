"use client"

import Image from "next/image"
import Link from "next/link"

import { useActiveAccount } from "thirdweb/react"

import { Skeleton } from "@/components/ui/skeleton"
import { useBalance } from "@/hooks/useBalance"

import mirrorLogo from '../public/mirror.svg'
import twitterLogo from '../public/twitter.svg'


export default function SocialLinks() {
    const account = useActiveAccount()
    const { data, isLoading } = useBalance()
    console.log("data", data.formatted)

    return (
        <div className='flex ml-auto items-center'>
            {account && (
                <div className="flex items-center gap-1 text-xl font-primary font-bold min-w-[100px]">
                    {isLoading ? (
                        <Skeleton className="h-7 w-20" />
                    ) : (
                        <span>{data?.formatted ?? '0'} $BP</span>
                    )}
                </div>
            )}
            <Link href='https://mirror.xyz/0x1F58a081369967B2B4c4E2Ad0C44aF016132ef13' target='_blank' className='hidden sm:block mx-4 sm:mx-8'>
                <Image src={mirrorLogo} alt="Mirror Logo" />
            </Link>
            <Link href='https://twitter.com/BasedPlace_' target='_blank' className='mr-4 sm:mr-8'>
                <Image src={twitterLogo} alt="Twitter Logo" />
            </Link>
        </div>
    )
}