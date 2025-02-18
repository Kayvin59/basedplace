// hooks/useMintTokens.ts
'use client';

import { useAccount, useSimulateContract, useWriteContract } from 'wagmi';

import { basedPlaceAbi } from '@/abi/BasedPlaceABI';
import { config } from '@/app/config';

export function useMintTokens() {
  const { address } = useAccount();
  const { 
    data: simulation, 
    error: simulateError,
    isPending: isSimulating 
  } = useSimulateContract({
    config,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: basedPlaceAbi,
    functionName: 'claimTokens',
    args: [],
    query: {
      enabled: !!address
    }
  });

  const { 
    writeContract, 
    isPending: isWriting,
    error: writeError,
    reset
  } = useWriteContract();

  const handleMint = async () => {
    console.log('Minting tokens...:');
      if (simulation?.request) {
        console.log('simulation:', simulation);
      writeContract(simulation.request);
    }
  };

  return {
    handleMint,
    isPending: isSimulating || isWriting,
    error: simulateError || writeError,
    reset
  };
}