"use client"

import { createClient } from "@/lib/supabase/client";
import { UserProfile } from "@/types/index";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useAccount } from 'wagmi';
import externalLink from '../public/external-link.svg';

export default function ProfileCard() {
    const [userProfileData, setUserProfileData] = useState<UserProfile | null>(null);
    const { address, isConnected } = useAccount();

    useEffect(() => {
        if(isConnected && address) {
            getUserProfile(address)
        }
    }, [isConnected, address])

    async function getUserProfile(address: string) {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('users_profile')
          .select('*')
          .eq('address', address)
          .maybeSingle();
    
        if (error) {
          console.error('Failed to fetch user profile');
          return null;
        }
        console.log('User profile fetched: ', data);
        setUserProfileData(data);
        return data;
    }

    return (
        <>
            <div className='flex justify-between items-center p-6 border-b'>
                <h2 className='text-2xl font-secondary'>My stats</h2>
                <Link href="/profile" className='flex hover:cursor-not-allowed'>
                    Profile
                    <span className='ml-2'>
                        <Image src={externalLink} alt="external link" width={25} height={25} />
                    </span>
                </Link>
            </div>
            <div className="p-6 flex flex-col items-center gap-6 md:gap-0 md:flex-row md:justify-between">
                <div className="w-48 flex flex-col justify-between items-center p-6 border rounded-lg bg-background hover:bg-footer hover:text-white">
                    <span className="mb-8">Pixels minted</span>
                    <span className="text-4xl font-bold font-secondary">{isConnected ? userProfileData?.pixels_minted : "-"}</span>
                </div>
                <div className="w-48 flex flex-col justify-between items-center p-6 border rounded-lg bg-background hover:bg-footer hover:text-white">
                    <span className="mb-8">VeToken</span>
                    <span className="text-4xl font-bold font-secondary">{isConnected ? userProfileData?.ve_token : "-"}</span>
                </div>
                <div className="w-48 flex flex-col justify-between items-center p-6 border rounded-lg bg-background hover:bg-footer hover:text-white">
                    <span className="mb-8">Votes</span>  
                    <span className="text-4xl font-bold font-secondary white whitespace-nowrap">{isConnected ? userProfileData?.votes : "-"}</span>
                </div>
            </div>
        </>
    )
}