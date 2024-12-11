"use client"

import { useState } from 'react';

import { createMerkleTreeFromAllowList, getProofsForAllowListEntry } from '@thirdweb-dev/sdk';
import { prepareContractCall, toWei } from 'thirdweb';
import { useActiveAccount, useSendTransaction } from 'thirdweb/react';

import { BP_AIRDROP_ADDRESS } from '@/app/contracts';
import { allowListProps } from '@/types';


export const useMintTokens = (allowList: allowListProps[]) => {
    const [isMinting, setIsMinting] = useState<'init' | 'pending' | 'complete' | 'error'>('init');
    const account = useActiveAccount();
    const {mutate: sendTransaction, data: transactionResult, isPending, error, } = useSendTransaction();

    // Get proof for the user address
    const getUserProof = async () => {
        if(account === undefined) {
          console.error("Please connect your wallet to mint.");
          return;
        }

        try {
            console.log("AllowList: ", allowList);
            const merkleTree = await createMerkleTreeFromAllowList(allowList);
            const leaf = {
              "address": account.address,
              "maxClaimable": "20"
            };
            const proof = await getProofsForAllowListEntry(merkleTree, leaf);
            return proof as `0x${string}`[];
        } catch (error) {
            console.error("Error generating user proof: ", error);
            return null;
        }
    };

    const handleMint = async () => {
        if(account === undefined) {
            console.error("Please connect your wallet to mint.");
            // Add a toast message here
            return;
        }

        setIsMinting('pending')

        try {
            const userProof = await getUserProof();
            console.log("User Proof: ", userProof);
            if (!userProof || userProof.length === 0) {
                console.error("Proof is not available or invalid.");
                setIsMinting('error');
                return;
            }

            const transaction = prepareContractCall({
                contract: BP_AIRDROP_ADDRESS, 
                method: "function claim(address _receiver, uint256 _quantity, bytes32[] _proofs, uint256 _proofMaxQuantityForWallet)", 
                params: [account.address, toWei("5"), userProof, toWei("20")] 

            })
            console.log("Sending transaction with params: ", account.address, toWei("5"), userProof, toWei("20"));
            console.log("Type of Quantity:", typeof toWei("5"));
    
            await sendTransaction(transaction)
            setIsMinting('complete');
            console.log("Transaction: ", transaction);
            console.log("transactionResult: ", transactionResult);

        } catch (error) {
            console.error("Minting failed: ", error);
            console.error("Error isMinting: ", isMinting);
            setIsMinting('error');
            console.error("Error minting tokens: ", error);
            return;
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