"use client"

import { useState } from 'react';

import { createMerkleTreeFromAllowList } from '@thirdweb-dev/sdk';
import { CircleCheck, CircleEllipsis, CircleX } from 'lucide-react';
import { useActiveAccount } from 'thirdweb/react';

import { Button } from '@/components/ui/button';
import { useMintTokens } from '@/hooks/useMintTokens';
import { allowListProps } from '@/types';


const allowList: allowListProps[] = [
    { address: "0x1F58a081369967B2B4c4E2Ad0C44aF016132ef13", maxClaimable: 25 },
    { address: "0x394e4D99286291Ad6dA6d0d3CAEB8afcEa9924c6", maxClaimable: 25 },
    { address: "0xC11Fba40AC00f57A5A33d80C2bFa983852C45608", maxClaimable: 25 },
    { address: "0x9904C36EFf3eF8c649551c493496bd2BAB0AF4B7", maxClaimable: 25 },
    { address: "0x29848267BeddEbBa79F68Af949f8C4276E195CA4", maxClaimable: 25 },    // BP user2
    { address: "0x6741938ae594c00466bac9777528b3bf8be7f9d2", maxClaimable: 25 },
];

export default function Mint() {
    const [merkleRoot, setMerkleRoot] = useState<string | null>(null);
    const { handleMint, isMinting, isPending, error, transactionResult } = useMintTokens(allowList);
    const account = useActiveAccount();
    
    const handleMintProcess = async () => {
        try {
            const merkleTree = await createMerkleTreeFromAllowList(allowList);
            const root = merkleTree.getHexRoot();
            setMerkleRoot(root);
            await handleMint();
        } catch (error) {
            console.error("Error in minting process:", error);
            throw new Error("Error in minting process")
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md max-w-sm min-h-300 w-full">
            <h2 className="text-2xl font-bold mb-4">Mint Tokens</h2>
            <p className="text-center mb-4">To start playing, you need some tokens.</p>
            <p className="text-center mb-6">You can mint 5 $BP tokens every 24 hours.</p>
            
            <Button 
                className="w-full py-2 px-4 bg-footer hover:bg-foreground transition-colors duration-200 text-white font-semibold rounded-lg shadow-md"
                onClick={handleMintProcess}
                disabled={isMinting === 'complete' || isPending}
            >
                {isMinting === 'pending' ? 'Minting in Progress...' : 'Mint Tokens'}
            </Button>

            {isPending && (
                <div className="mt-4 flex items-center">
                    <CircleEllipsis className="animate-spin mr-2" />
                    <p className="text-yellow-500">Transaction pending...</p>
                </div>
            )}

            {isMinting === 'complete' && (
                <div className="mt-4 flex items-center text-green">
                    <CircleCheck className="mr-2" />
                    <p>Minting complete. Start playing!</p>
                </div>

            )}

            {error && (
                <div className="mt-4 flex items-center text-red-500">
                    <CircleX className="mr-2" />
                    <p className="max-w-fit break-words">{error.message || 'An unknown error occurred'}</p>
                </div>
            )}

        </div>
    );
}