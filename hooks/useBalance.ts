"use client"

// import { useEffect } from "react"

import { useQuery } from "@tanstack/react-query"
import { readContract, toEther } from "thirdweb"
import { useActiveAccount } from "thirdweb/react"

import { BP_TOKEN_ADDRESS } from "@/app/contracts"

export function useBalance() {
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
/*     
    useEffect(() => {
        const intervalId = setInterval(() => {
            refetch()
            console.log('refetch balance')
        }, 30000)
    
        return () => clearInterval(intervalId)
    }, [refetch]) */

    return { formattedBalance, isLoading }
}

