"use client"

import { Button } from '@/components/ui/button';
import { CircleCheck, CircleEllipsis, CircleX } from "lucide-react";
import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
// import { abi } from '../app/abi';
import { BPAbi } from '@/abi/BPAbi';

export default function Mint() {
    const [isMinting, setIsMinting] = useState<'init' | 'pending' | 'complete' | 'error'>('init');

    const { address } = useAccount();
    const { writeContractAsync } = useWriteContract()

    const handleMint = async () => {
        if(address === undefined) {
            console.error("Please connect your wallet to mint.");
            return;
        }
    
        setIsMinting('pending')
    
        try {
            await writeContractAsync({
                address: '0x5ddaf93e4E7873B5A34a181d3191742B116aeF9B',
                abi: BPAbi,
                functionName: 'mint',
            },
            {
                onSuccess: () => {
                    console.log("Transaction Complete! ");
                    setIsMinting('complete')
                },
                onError: (error) => {
                    console.error("Error minting: ", error);
                    setIsMinting('error')
                }
            })
        } catch (e) {
            console.error("Error minting BP token", e);
            setIsMinting('error')
        }
    };

    return (
      <div className="flex flex-col items-center flex-1 self-center lg:self-start">
        <p>To start playing you need some tokens</p>
        <p>You can mint 5 $BP tokens every 24H</p>
        <Button className="mt-4 mb-4 text-lg bg-footer hover:bg-foreground" onClick={handleMint}>Start Minting</Button>
        {isMinting === 'init' && (
          <p>Click to start minting</p>
        )}
        {isMinting === 'pending' && (
          <>
            <div><CircleEllipsis /></div>
            <p className="text-center text-yellow-500">Check your wallet to approve minting</p>
          </>
        )}
        {isMinting === 'complete' && (
          <>
            <div className='text-green'><CircleCheck /></div>
            <p className="text-center text-green">Minting complete. Start playing !</p>
          </>
        )}
        {isMinting === 'error' && (
          <>
            <div className="text-red-500"><CircleX className='text-red'/></div>
            <p className="text-center text-red-500 tex">Failed to mint tokens. Minting is allowed every 24H</p>
          </>
        )}
      </div>
    )
}

