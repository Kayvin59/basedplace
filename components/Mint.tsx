'use client';

import { useEffect } from 'react';

import { useAccount } from 'wagmi';

import { useMintTokens } from '@/hooks/useMintTokens';

export default function Mint() {
  const { address } = useAccount();
  const { handleMint, isPending, error, reset } = useMintTokens();

  useEffect(() => reset(), [address, reset]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md max-w-sm min-h-300 w-full">
      <h2 className="text-2xl font-bold mb-4">Mint Tokens</h2>
      <p className="text-center mb-4">To start playing, you need some tokens.</p>
      <p className="text-center mb-6">You can mint 5 $BP tokens every 24 hours.</p>
      
      <button 
        className={`w-full py-2 px-4 transition-colors duration-200 text-white font-semibold rounded-lg shadow-md ${
          isPending ? 'bg-gray-400' : 'bg-footer hover:bg-foreground'
        }`}
        onClick={handleMint}
        disabled={isPending}
      >
        {isPending ? 'Minting...' : 'Mint Tokens'}
      </button>

      {error && (
        <div className="mt-4 flex items-center text-red-500">
          <span className="max-w-fit break-words">
            Error: {error.message}
          </span>
        </div>
      )}
    </div>
  );
}