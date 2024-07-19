import { BP_AIRDROP_ADDRESS } from '@/app/contracts';
import { allowListProps } from '@/types';
import { createMerkleTreeFromAllowList, getProofsForAllowListEntry } from '@thirdweb-dev/sdk';
import { useState } from 'react';
import { prepareContractCall, toWei } from 'thirdweb';
import { useActiveAccount, useSendTransaction } from 'thirdweb/react';


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
            const merkleTree = await createMerkleTreeFromAllowList(allowList);
            const leaf = {
              "address": account.address,
              "maxClaimable": "20"
            };
    
            const proof = await getProofsForAllowListEntry(merkleTree, leaf);
            console.log("Proof: ", proof); 
            console.log("proofHash: ", proof[0]);
            return proof as `0x${string}`[];
        } catch (error) {
            console.error("Error generating user proof: ", error);
            return null;
        }
    };

    const handleMint = async () => {
        if(account === undefined) {
            console.error("Please connect your wallet to mint.");
            return;
        }

        setIsMinting('pending')

        try {
            const userProof = await getUserProof();
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
    
            sendTransaction(transaction)
            setIsMinting('complete');
            console.log("Transaction: ", transaction);
            console.log("transactionResult: ", transactionResult);

        } catch (error) {
            console.error("Minting failed: ", error);
            setIsMinting('error');
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