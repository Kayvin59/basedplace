"use client"

import { useEffect } from "react"

import { Coins, PaintBucket, Trophy } from 'lucide-react'
import { prepareContractCall, sendTransaction, toWei } from 'thirdweb'
import { useActiveAccount } from "thirdweb/react"

import { BP_TOKEN_ADDRESS } from "@/app/contracts"
import Mint from "@/components/Mint"
import PixelGrid from "@/components/PixelGrid"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { useBalance } from "@/hooks/useBalance"
import { usePixels } from "@/hooks/usePixels"
import { useUserPoints } from "@/hooks/useUserPoints"
import { createClient } from "@/lib/supabase/client"
import { PixelsProps } from "@/types/index"

const BP_TOKEN_ADDRESS_WITH_PREFIX = BP_TOKEN_ADDRESS.address as `0x${string}`

export default function Playground({ initialPixels }: { initialPixels: PixelsProps[] }) {
  const account = useActiveAccount()
  const { formattedBalance, isLoading: isBalanceLoading } = useBalance()
  const { userPoints, isLoading: isPointsLoading, error: pointsError, refetch: refetchPoints } = useUserPoints()
  const { pixels, updatePixelColor } = usePixels(initialPixels)
  const { toast } = useToast()

  const handleConfirm = async (index: number, color: string) => {
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
  }

  useEffect(() => {
    const supabase = createClient()
    const channel = supabase.channel('square_pixels_changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'square_pixels' },
        (payload: { new: PixelsProps }) => {
          updatePixelColor(payload.new.id, payload.new.color)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [updatePixelColor])

  return (
    <>
      <h2 className="p-6 text-2xl font-secondary border-b">Playground</h2>
      <div className="px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-12">
        {account ? (
          <>
            <Mint />
            <PixelGrid pixels={pixels} onConfirm={handleConfirm} />
            <div className="flex-1 self-center md:self-start">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Player Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Coins className="mr-2 text-yellow" />
                    {isBalanceLoading ? (
                        <Skeleton className="h-7 w-20" />
                    ) : (
                        <span>{formattedBalance ?? '0'} $BP</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Trophy className="mr-2 text-blue-500" />
                    <span>Points: 
                      {isPointsLoading ? (
                        <Skeleton className="h-4 w-5 ml-1" />
                      ) : (
                        <span className="ml-1">{userPoints}</span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <PaintBucket className="mr-2 text-green" />
                    <span>Total Pixels: 100</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-60 h-60 my-12 mx-auto border border-foreground hover:cursor-not-allowed bg-white" />
        )}
      </div>
    </>
  )
}