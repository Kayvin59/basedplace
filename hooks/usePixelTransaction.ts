import { useCallback } from 'react'

import { prepareContractCall, sendTransaction, toWei } from 'thirdweb'
import { useActiveAccount } from "thirdweb/react"

import { BP_TOKEN_ADDRESS } from "@/app/contracts"
import { useToast } from "@/hooks/use-toast"

const BP_TOKEN_ADDRESS_WITH_PREFIX = BP_TOKEN_ADDRESS.address as `0x${string}`

export function usePixelTransaction(updatePixelColor: (index: number, color: string) => Promise<void>, refetchPoints: () => void) {
  const account = useActiveAccount()
  const { toast } = useToast()

  const handleConfirm = useCallback(async (index: number, color: string) => {
    if (!account) {
      console.error("Please connect your wallet.")
      toast({
        title: "Error",
        description: "Please connect your wallet.",
        variant: "destructive",
      })
      return
    }

    try {
      const amount = toWei("1")
      
      // Approve
      const approveTx = prepareContractCall({
        method: "function approve(address spender, uint256 amount) returns (bool)",
        params: [account.address, amount],
        contract: BP_TOKEN_ADDRESS,
      })

      console.log("Approving transaction...")
      const approveResult = await sendTransaction({ transaction: approveTx, account })
      
      if (!approveResult) {
        throw new Error("Approval transaction failed")
      }

      console.log("Approval successful, proceeding with transfer...")

      // Transfer
      const transferTx = prepareContractCall({
        contract: BP_TOKEN_ADDRESS,
        method: "function transferFrom(address from, address to, uint256 amount) returns (bool)",
        params: [account.address, BP_TOKEN_ADDRESS_WITH_PREFIX, amount],
      })

      console.log("Initiating transfer...")
      const transferResult = await sendTransaction({ transaction: transferTx, account })

      if (!transferResult) {
        throw new Error("Transfer transaction failed")
      }

      console.log("Transfer successful, updating pixel color...")
      await updatePixelColor(index, color)
      toast({
        title: "Success",
        description: "Pixel color updated successfully!",
      })
      refetchPoints()
    } catch (error) {
      console.error("Error in transaction process: ", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    }
  }, [account, updatePixelColor, refetchPoints, toast])

  return handleConfirm
}