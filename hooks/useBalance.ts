// hooks/useBalance.ts
"use client"

import { formatEther } from 'viem'
import { useAccount, useBalance as useWagmiBalance } from 'wagmi'

import { BP_TOKEN_ADDRESS } from "@/app/contracts"

export function useBalance() {
    const { address } = useAccount()
    
    const { data, isError, isLoading } = useWagmiBalance({
        address,
        token: BP_TOKEN_ADDRESS.address,
    })

    const formattedBalance = data ? formatEther(data.value) : '0'

    return { 
        data: {
            ...data,
            formatted: formattedBalance
        }, 
        isError, 
        isLoading 
    }
}