"use client";

import { formatEther } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

import { BP_TOKEN_ADDRESS } from '@/app/contracts';

export function useBalance() {
  const { address } = useAccount();
  
  const { data, isError, isLoading, error } = useReadContract({
    address: BP_TOKEN_ADDRESS.address,
    abi: BP_TOKEN_ADDRESS.abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

  const formattedBalance = data ? formatEther(data) : '0';

  return {
    data: {
      value: data,
      formatted: formattedBalance
    },
    isError,
    isLoading,
    error
  };
}