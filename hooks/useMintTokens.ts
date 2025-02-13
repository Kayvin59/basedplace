"use client"

import { useState } from 'react';

import { createMerkleTreeFromAllowList, getProofsForAllowListEntry } from '@thirdweb-dev/sdk';
import { prepareContractCall } from 'thirdweb';
import { useActiveAccount, useSendTransaction } from 'thirdweb/react';

import { BP_AIRDROP_ADDRESS } from '@/app/contracts';
import { allowListProps } from '@/types';


export const useMintTokens = (allowList: allowListProps[]) => {
    const [isMinting, setIsMinting] = useState<'init' | 'pending' | 'complete' | 'error'>('init');
    const account = useActiveAccount();
    const {mutate: sendTransaction, data: transactionResult, isPending, error, } = useSendTransaction();

    // TODO: Need to store it in the backend - generate new proof if no changes in allowlist
    const getUserProof = async () => {
        if (!account) {
            throw new Error("Please connect your Wallet to mint")
        }
    
        try {
            // Get merkle proof
            const merkleTree = await createMerkleTreeFromAllowList(allowList);
            console.log("merkleTree proof", merkleTree)

            // Find user in allowlist
            const leaf = allowList.find(entry => entry.address.toLowerCase() === account.address.toLowerCase());
    
            if (!leaf) {
                throw new Error("User not found in allowlist");
            }

            const proof = await getProofsForAllowListEntry(
                merkleTree,
                {
                    address: leaf.address,
                    maxClaimable: leaf.maxClaimable.toString()
                },
                18, // Add decimals parameter (match your token's decimals)
            );

            console.log("Verification Parameters:", {
                receiver: account.address,
                quantity: 5,
                maxAllowed: leaf.maxClaimable,
                merkleRoot: merkleTree.getHexRoot() // Add this to getUserProof
              });

            return { proof: proof as `0x${string}`[], leaf };
        } catch (error) {
            console.error("Error generating user proof: ", error);
            throw new Error("Error generating user proof");
        }
    };    

    const handleMint = async () => {
        if (!account) {
            throw new Error("Please connect your Wallet to mint")
        }

        setIsMinting('pending')

        try {
            const { proof, leaf } = await getUserProof();

            if (!proof || proof.length === 0) {
                console.log("Proof is not available or invalid.");
                setIsMinting('error');
                throw new Error("Proof is not available or invalid.");
            }

            if (!leaf) {
                throw new Error("User not found in allowlist");
            }

            // Convert values to BigInt
            const quantity = BigInt(5);
            const maxClaimable = BigInt(leaf.maxClaimable);

            if (quantity > maxClaimable) {
                throw new Error(`Cannot mint more than your maximum allowance of ${maxClaimable} tokens`);
            }

            const transaction = prepareContractCall({
                contract: BP_AIRDROP_ADDRESS, 
                method: "function claim(address _receiver, uint256 _quantity, bytes32[] _proofs, uint256 _proofMaxQuantityForWallet)", 
                params: [account.address, quantity, proof, maxClaimable] 
            })

            console.log("Prepare claim transaction: ", transaction);
            sendTransaction(transaction, {
                onSuccess: (result) => {
                    console.log("Transaction successful:", result);
                    setIsMinting('complete');
                    setTimeout(() => setIsMinting('init'), 5000);
                },
                onError: (error) => {
                    console.error("Transaction error:", error);
                    setIsMinting('init');
                }
            });

            setIsMinting('complete');

        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in minting process: ", error);
                setIsMinting('error');
                throw new Error("Error in minting process: ", error)
            }
        }
    };

    return {
        handleMint,
        isMinting,
        transactionResult,
        isPending,
        error,
    };
};