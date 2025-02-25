import { useCallback, useState } from 'react'

import { useAccount, useSimulateContract, useWriteContract } from 'wagmi'

import { basedPlaceAbi } from '@/abi/BasedPlaceABI'
import { BP_TOKEN_ADDRESS } from '@/app/contracts'

export function usePixelTransaction(
  updatePixelColor: (index: number, color: string) => Promise<void>,
  refetchStats: () => void
) {
  const { address, isConnected } = useAccount()
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaySuccess, setIsPlaySuccess] = useState(false)

  // Use writeContract hook for the play function
  const { writeContract: play, isPending: isPlayPending } = useWriteContract()

  // Simulate the play function call (play requires no arguments)
  const { data: playSimData } = useSimulateContract({
    address: BP_TOKEN_ADDRESS.address,
    abi: basedPlaceAbi,
    functionName: 'play',
    args: [],
    account: address,
  })

  const handleConfirm = useCallback(async (index: number, color: string) => {
    if (!isConnected) {
      throw new Error("Please connect your Wallet to play")
    }

    setIsLoading(true)
    setIsPlaySuccess(false)

    try {
      console.log("Simulating play transaction...")
      if (playSimData?.request) {
        await play(playSimData.request)
        setIsPlaySuccess(true)
      }

      console.log("Play transaction successful, updating pixel color...")
      await updatePixelColor(index, color)
      refetchStats()
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error in transaction process: " + error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }, [isConnected, play, playSimData, updatePixelColor, refetchStats])

  return {
    handleConfirm,
    isLoading: isLoading || isPlayPending,
    isPlaySuccess,
  }
}
