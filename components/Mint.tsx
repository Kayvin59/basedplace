"use client"

import { Button } from '@/components/ui/button';
import { useMintTokens } from '@/hooks/useMintTokens';
import { createMerkleTreeFromAllowList } from '@thirdweb-dev/sdk';
import { CircleCheck, CircleEllipsis, CircleX } from "lucide-react";
import { useState } from 'react';

const allowList = [
  { address: "0x1F58a081369967B2B4c4E2Ad0C44aF016132ef13", maxClaimable: "15" },
  { address: "0x394e4D99286291Ad6dA6d0d3CAEB8afcEa9924c6", maxClaimable: "20" },
]; 

export default function Mint() {
    const [merkleRoot, setMerkleRoot] = useState<string | null>(null);
    const { handleMint, isMinting, isPending, error, transactionResult } = useMintTokens(allowList);

  
    // Generate Merkle Tree based on the allowList of addresses
    const generateMerkleTree = async () => {
        try {
          const merkleTree = await createMerkleTreeFromAllowList(allowList);
          console.log("Merkle Tree: ", merkleTree);
          setMerkleRoot(merkleTree.getHexRoot());
          console.log("Merkle Root: ", merkleTree.getHexRoot());
        } catch (error) {
          console.error("Error generating merkle tree: ", error)
        }
    }


    return (
      <div className="flex flex-col items-center flex-1 self-center lg:self-start">
        <p>To start playing you need some tokens</p>
        <p>You can mint 5 $BP tokens every 24H</p>
        <Button className="mt-4 mb-4 text-lg bg-footer hover:bg-foreground" onClick={generateMerkleTree}>Generate</Button>
        <Button className="mt-4 mb-4 text-lg bg-footer hover:bg-foreground" onClick={handleMint}>handleMint</Button>

        {merkleRoot && (
          <p>Merkle Root Hash: {merkleRoot}</p>
        )}

        {transactionResult && (
          <p>Transaction hash: {transactionResult.transactionHash}</p>
        )}

        {isMinting === 'init' && (
          <p>Click to start minting</p>
        )}
        {isPending && (
          <>
            <div><CircleEllipsis /></div>
            <p className="text-center text-yellow-500">Transaction pending...</p>{/* Check your wallet to approve minting */}
          </>
        )}
        {isMinting === 'complete' && (
          <>
            <div className='text-green'><CircleCheck /></div>
            <p className="text-center text-green">Minting complete. Start playing !</p>
          </>
        )}
        {error && (
          <>
            <div className="text-red-500"><CircleX className='text-red'/></div>
            <p className="text-center text-red-500 tex">Error sending transaction. {error?.message}</p> {/* Failed to mint tokens. Minting is allowed every 24H */}
          </>
        )}
      </div>
    )
}

